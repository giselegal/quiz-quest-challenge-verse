import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PropertyInput } from './block-properties/PropertyInput';
import { blockDefinitions, findBlockDefinition, type PropertySchema } from '@/config/blockDefinitions';
import { type FunnelBlock, type FunnelData } from '@/services/funnelService';

interface DynamicPropertiesPanelProps {
  selectedBlock: FunnelBlock | null;
  funnelConfig: FunnelData['config'];
  setFunnelConfig: (config: FunnelData['config']) => void;
  updateBlockSetting: (key: string | null, value: any) => void;
  updateBlockStyle: (key: string, value: any) => void;
  // Funções para arrays (implementar conforme necessário)
  updateQuestionOption?: (index: number, field: string, value: any) => void;
  addQuestionOption?: () => void;
  removeQuestionOption?: (index: number) => void;
}

export const DynamicPropertiesPanel: React.FC<DynamicPropertiesPanelProps> = ({
  selectedBlock,
  funnelConfig,
  setFunnelConfig,
  updateBlockSetting,
  updateBlockStyle,
  updateQuestionOption,
  addQuestionOption,
  removeQuestionOption
}) => {
  
  // Função para obter valor de propriedade aninhada (ex: colors.primary)
  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  // Função para definir valor de propriedade aninhada
  const setNestedValue = (obj: any, path: string, value: any): any => {
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    const target = keys.reduce((current, key) => {
      if (!current[key]) current[key] = {};
      return current[key];
    }, obj);
    
    target[lastKey] = value;
    return { ...obj };
  };

  // Handler para mudanças de propriedades
  const handlePropertyChange = (schema: PropertySchema, value: any) => {
    if (schema.nestedPath) {
      // Para propriedades aninhadas (ex: colors.primary)
      const currentSettings = selectedBlock?.settings || {};
      const updatedSettings = setNestedValue(currentSettings, schema.nestedPath, value);
      updateBlockSetting(null, updatedSettings);
    } else {
      // Para propriedades simples
      updateBlockSetting(schema.key, value);
    }
  };

  // Handler para arrays
  const handleArrayAdd = (schema: PropertySchema) => {
    if (schema.key === 'options' && addQuestionOption) {
      addQuestionOption();
    } else {
      // Implementação genérica para outros arrays
      const currentValue = selectedBlock?.settings?.[schema.key] || [];
      const newItem = schema.itemSchema?.reduce((item, itemProp) => {
        item[itemProp.key] = itemProp.defaultValue || '';
        return item;
      }, {} as any) || {};
      
      updateBlockSetting(schema.key, [...currentValue, newItem]);
    }
  };

  const handleArrayRemove = (schema: PropertySchema, index: number) => {
    if (schema.key === 'options' && removeQuestionOption) {
      removeQuestionOption(index);
    } else {
      // Implementação genérica
      const currentValue = selectedBlock?.settings?.[schema.key] || [];
      const newValue = currentValue.filter((_: any, i: number) => i !== index);
      updateBlockSetting(schema.key, newValue);
    }
  };

  const handleArrayUpdate = (schema: PropertySchema, index: number, field: string, value: any) => {
    if (schema.key === 'options' && updateQuestionOption) {
      updateQuestionOption(index, field, value);
    } else {
      // Implementação genérica
      const currentValue = selectedBlock?.settings?.[schema.key] || [];
      const newValue = currentValue.map((item: any, i: number) => 
        i === index ? { ...item, [field]: value } : item
      );
      updateBlockSetting(schema.key, newValue);
    }
  };

  // Se nenhum bloco selecionado, mostrar configurações do funil
  if (!selectedBlock) {
    return (
      <ScrollArea className="h-full">
        <div className="p-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Configurações do Funil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <PropertyInput
                schema={{
                  key: 'name',
                  label: 'Nome do Funil',
                  type: 'text-input',
                  placeholder: 'Quiz CaktoQuiz'
                }}
                currentValue={funnelConfig.name}
                onValueChange={(value) => setFunnelConfig({ ...funnelConfig, name: value })}
              />
              
              <PropertyInput
                schema={{
                  key: 'description',
                  label: 'Descrição',
                  type: 'textarea',
                  placeholder: 'Descrição do funil...',
                  rows: 3
                }}
                currentValue={funnelConfig.description}
                onValueChange={(value) => setFunnelConfig({ ...funnelConfig, description: value })}
              />
              
              <PropertyInput
                schema={{
                  key: 'isPublished',
                  label: 'Publicado',
                  type: 'boolean-switch'
                }}
                currentValue={funnelConfig.isPublished}
                onValueChange={(value) => setFunnelConfig({ ...funnelConfig, isPublished: value })}
              />
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    );
  }

  // Encontrar a definição do bloco selecionado
  const blockDefinition = findBlockDefinition(selectedBlock.type);
  
  if (!blockDefinition) {
    return (
      <ScrollArea className="h-full">
        <div className="p-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-500">
                Tipo de bloco não reconhecido: {selectedBlock.type}
              </p>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        {/* Cabeçalho do bloco */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">
                {blockDefinition.name}
              </CardTitle>
              {blockDefinition.isNew && (
                <Badge variant="secondary" className="text-xs">
                  Novo!
                </Badge>
              )}
            </div>
            <p className="text-xs text-gray-500">
              {blockDefinition.description}
            </p>
          </CardHeader>
        </Card>

        {/* Propriedades do bloco */}
        {blockDefinition.propertiesSchema && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Propriedades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {blockDefinition.propertiesSchema.map((schema) => {
                const currentValue = schema.nestedPath 
                  ? getNestedValue(selectedBlock.settings, schema.nestedPath)
                  : selectedBlock.settings?.[schema.key];

                return (
                  <PropertyInput
                    key={schema.key}
                    schema={schema}
                    currentValue={currentValue}
                    onValueChange={(value) => handlePropertyChange(schema, value)}
                    onAddItem={() => handleArrayAdd(schema)}
                    onRemoveItem={(index) => handleArrayRemove(schema, index)}
                    onUpdateItem={(index, field, value) => handleArrayUpdate(schema, index, field, value)}
                  />
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Estilos gerais */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Estilos Gerais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <PropertyInput
              schema={{
                key: 'marginTop',
                label: 'Margem Superior',
                type: 'text-input',
                placeholder: '0px, 1rem, etc.'
              }}
              currentValue={selectedBlock.style?.marginTop}
              onValueChange={(value) => updateBlockStyle('marginTop', value)}
            />
            
            <PropertyInput
              schema={{
                key: 'marginBottom',
                label: 'Margem Inferior',
                type: 'text-input',
                placeholder: '0px, 1rem, etc.'
              }}
              currentValue={selectedBlock.style?.marginBottom}
              onValueChange={(value) => updateBlockStyle('marginBottom', value)}
            />
            
            <PropertyInput
              schema={{
                key: 'backgroundColor',
                label: 'Cor de Fundo',
                type: 'color-picker'
              }}
              currentValue={selectedBlock.style?.backgroundColor}
              onValueChange={(value) => updateBlockStyle('backgroundColor', value)}
            />
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};
