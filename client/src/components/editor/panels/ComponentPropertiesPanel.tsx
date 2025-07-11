import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { getComponentConfig, validateComponentPropsByPath } from '../services/editableComponentsService';
import { cn } from '@/lib/utils';

interface ComponentInstance {
  id: string;
  componentPath: string;
  componentName: string;
  props: Record<string, any>;
  visible: boolean;
  order: number;
}

interface ComponentPropertiesPanelProps {
  selectedBlock?: {
    id: string;
    type: string;
    properties: {
      componentPath?: string;
      componentName?: string;
      props?: Record<string, any>;
      [key: string]: any;
    };
  };
  selectedComponent?: ComponentInstance;
  onUpdateProperties?: (blockId: string, properties: Record<string, any>) => void;
  onUpdateProps?: (componentId: string, newProps: Record<string, any>) => void;
  className?: string;
}

const ComponentPropertiesPanel: React.FC<ComponentPropertiesPanelProps> = ({
  selectedBlock,
  selectedComponent,
  onUpdateProperties,
  onUpdateProps,
  className
}) => {
  const [editedProps, setEditedProps] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<string[]>([]);

  // Determinar componente ativo (prioridade para selectedComponent)
  const activeComponent = selectedComponent || (selectedBlock?.type === 'component-reference' ? {
    id: selectedBlock.id,
    componentPath: selectedBlock.properties.componentPath || '',
    componentName: selectedBlock.properties.componentName || '',
    props: selectedBlock.properties.props || {},
    visible: true,
    order: 0
  } : null);

  // Carregar propriedades quando componente ativo muda
  useEffect(() => {
    if (activeComponent) {
      setEditedProps(activeComponent.props || {});
      setErrors([]);
    } else {
      setEditedProps({});
      setErrors([]);
    }
  }, [activeComponent?.id, activeComponent?.componentPath]);

  // Se não há componente ativo
  if (!activeComponent) {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle className="text-lg font-playfair text-[#432818]">
            Propriedades do Componente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-[#8F7A6A] py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#B89B7A]/10 flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
            <p className="text-sm">
              Selecione um componente editável para ver suas propriedades
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { componentPath, componentName } = activeComponent;
  const componentConfig = getComponentConfig(componentPath || '');

  if (!componentConfig) {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle className="text-lg font-playfair text-[#432818]">
            Componente Não Configurado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-600 py-4">
            <p>Configuração não encontrada para:</p>
            <code className="bg-red-50 px-2 py-1 rounded text-xs mt-2 block">
              {componentPath}
            </code>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Função para atualizar uma propriedade
  const updateProperty = (key: string, value: any) => {
    const newProps = { ...editedProps, [key]: value };
    setEditedProps(newProps);
    
    // Validar e chamar callback apropriado
    const validation = validateComponentPropsByPath(componentPath, newProps);
    setErrors(validation.valid ? [] : validation.errors);
    
    if (selectedComponent && onUpdateProps) {
      onUpdateProps(selectedComponent.id, newProps);
    } else if (selectedBlock && onUpdateProperties) {
      onUpdateProperties(selectedBlock.id, { 
        ...selectedBlock.properties, 
        props: newProps 
      });
    }
  };

  // Função para salvar as alterações (para compatibilidade)
  const saveChanges = () => {
    if (errors.length > 0) return;
    // As alterações já são salvas automaticamente via updateProperty
  };

  // Renderizar campo baseado no tipo da propriedade
  const renderPropertyField = (fieldName: string) => {
    const currentValue = editedProps[fieldName];
    const defaultValue = componentConfig.defaultProps[fieldName];
    
    // Determinar tipo do campo baseado no valor padrão
    const fieldType = typeof defaultValue;
    
    switch (fieldType) {
      case 'boolean':
        return (
          <div key={fieldName} className="flex items-center justify-between">
            <Label 
              htmlFor={fieldName}
              className="text-sm font-medium text-[#432818] capitalize"
            >
              {fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </Label>
            <Switch
              id={fieldName}
              checked={currentValue ?? defaultValue}
              onCheckedChange={(checked) => updateProperty(fieldName, checked)}
            />
          </div>
        );
        
      case 'string':
        if (fieldName.includes('Color')) {
          return (
            <div key={fieldName} className="space-y-2">
              <Label 
                htmlFor={fieldName}
                className="text-sm font-medium text-[#432818] capitalize"
              >
                {fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </Label>
              <div className="flex gap-2">
                <Input
                  id={fieldName}
                  type="color"
                  value={currentValue || defaultValue || '#000000'}
                  onChange={(e) => updateProperty(fieldName, e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={currentValue || defaultValue || ''}
                  onChange={(e) => updateProperty(fieldName, e.target.value)}
                  placeholder="Código da cor"
                />
              </div>
            </div>
          );
        }
        
        if (fieldName.includes('description') || fieldName.includes('subtitle')) {
          return (
            <div key={fieldName} className="space-y-2">
              <Label 
                htmlFor={fieldName}
                className="text-sm font-medium text-[#432818] capitalize"
              >
                {fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </Label>
              <Textarea
                id={fieldName}
                value={currentValue || defaultValue || ''}
                onChange={(e) => updateProperty(fieldName, e.target.value)}
                placeholder={`Digite ${fieldName}...`}
                rows={3}
              />
            </div>
          );
        }
        
        return (
          <div key={fieldName} className="space-y-2">
            <Label 
              htmlFor={fieldName}
              className="text-sm font-medium text-[#432818] capitalize"
            >
              {fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </Label>
            <Input
              id={fieldName}
              value={currentValue || defaultValue || ''}
              onChange={(e) => updateProperty(fieldName, e.target.value)}
              placeholder={`Digite ${fieldName}...`}
            />
          </div>
        );
        
      case 'number':
        return (
          <div key={fieldName} className="space-y-2">
            <Label 
              htmlFor={fieldName}
              className="text-sm font-medium text-[#432818] capitalize"
            >
              {fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </Label>
            <Input
              id={fieldName}
              type="number"
              value={currentValue || defaultValue || 0}
              onChange={(e) => updateProperty(fieldName, Number(e.target.value))}
            />
          </div>
        );
        
      case 'object':
        if (Array.isArray(defaultValue)) {
          return (
            <div key={fieldName} className="space-y-2">
              <Label className="text-sm font-medium text-[#432818] capitalize">
                {fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </Label>
              <div className="text-xs text-[#8F7A6A] bg-[#B89B7A]/5 p-2 rounded">
                Array com {Array.isArray(currentValue) ? currentValue.length : Array.isArray(defaultValue) ? defaultValue.length : 0} itens
                <br />
                <em>Edição avançada de arrays será implementada</em>
              </div>
            </div>
          );
        }
        break;
        
      default:
        return (
          <div key={fieldName} className="space-y-2">
            <Label className="text-sm font-medium text-[#432818] capitalize">
              {fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </Label>
            <div className="text-xs text-[#8F7A6A] bg-gray-50 p-2 rounded">
              Tipo: {fieldType} - {JSON.stringify(currentValue || defaultValue).substring(0, 50)}...
            </div>
          </div>
        );
    }
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-playfair text-[#432818] flex items-center gap-2">
          <span>Propriedades</span>
          <Badge variant="outline" className="text-xs bg-[#B89B7A]/10 text-[#B89B7A]">
            {componentConfig.category}
          </Badge>
        </CardTitle>
        <p className="text-sm text-[#8F7A6A]">
          {componentName}
        </p>
        {componentConfig.description && (
          <p className="text-xs text-[#6B5B4E] italic">
            {componentConfig.description}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Campos editáveis */}
        <div className="space-y-4">
          {componentConfig.editableFields.map(fieldName => renderPropertyField(fieldName))}
        </div>
        
        {/* Erros de validação */}
        {errors.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <Label className="text-sm font-medium text-red-600">Erros de Validação:</Label>
              {errors.map((error, index) => (
                <div key={index} className="text-xs text-red-600 bg-red-50 p-2 rounded">
                  {error}
                </div>
              ))}
            </div>
          </>
        )}
        
        {/* Botões de ação */}
        <Separator />
        <div className="flex gap-2">
          <Button
            onClick={saveChanges}
            disabled={errors.length > 0}
            className="flex-1 bg-[#B89B7A] hover:bg-[#aa6b5d] text-white"
          >
            Aplicar Alterações
          </Button>
          <Button
            variant="outline"
            onClick={() => setEditedProps(selectedBlock.properties.props || {})}
            className="border-[#B89B7A]/30 text-[#B89B7A] hover:bg-[#B89B7A]/5"
          >
            Resetar
          </Button>
        </div>
        
        {/* Informações técnicas */}
        <Separator />
        <div className="text-xs text-[#8F7A6A] space-y-1">
          <div>
            <strong>Caminho:</strong> {componentPath}
          </div>
          <div>
            <strong>Campos editáveis:</strong> {componentConfig.editableFields.length}
          </div>
          {componentConfig.requiredProps && componentConfig.requiredProps.length > 0 && (
            <div>
              <strong>Campos obrigatórios:</strong> {componentConfig.requiredProps.join(', ')}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComponentPropertiesPanel;
