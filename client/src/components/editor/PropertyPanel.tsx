
import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { EditorBlock } from '@/types/editor';

interface PropertySchema {
  key: string;
  type: string;
  label: string;
  default?: any;
  options?: any[];
  itemSchema?: PropertySchema[];
}

interface PropertyPanelProps {
  selectedComponent: EditorBlock | null;
  onChange: (updatedComponent: EditorBlock) => void;
}

export default function PropertyPanel({ 
  selectedComponent,
  onChange 
}: PropertyPanelProps) {
  if (!selectedComponent) {
    return (
      <div className="p-4 text-center text-gray-500">
        <div className="mb-4 text-4xl">🎯</div>
        <h3 className="mb-2 font-medium">Propriedades</h3>
        <p className="text-sm">Selecione um componente para editar suas propriedades</p>
      </div>
    );
  }

  const updateProperty = (key: string, value: any) => {
    const updated = {
      ...selectedComponent,
      content: {
        ...selectedComponent.content,
        [key]: value
      }
    };
    onChange(updated);
  };

  // Define basic schema for common properties
  const getSchemaForBlock = (blockType: string): PropertySchema[] => {
    const commonSchemas: PropertySchema[] = [
      { key: 'title', type: 'text', label: 'Título' },
      { key: 'subtitle', type: 'text', label: 'Subtítulo' },
      { key: 'text', type: 'textarea', label: 'Texto' }
    ];

    switch (blockType) {
      case 'headline':
        return [
          { key: 'text', type: 'text', label: 'Texto do Título' },
          { key: 'level', type: 'select', label: 'Nível', options: [
            { value: '1', label: 'H1' },
            { value: '2', label: 'H2' },
            { value: '3', label: 'H3' }
          ]}
        ];
      case 'image':
        return [
          { key: 'src', type: 'text', label: 'URL da Imagem' },
          { key: 'alt', type: 'text', label: 'Texto Alternativo' }
        ];
      case 'text':
        return [
          { key: 'content', type: 'textarea', label: 'Conteúdo' }
        ];
      default:
        return commonSchemas;
    }
  };

  const schema = getSchemaForBlock(selectedComponent.type);

  const renderPropertyInput = (prop: PropertySchema) => {
    const currentValue = selectedComponent.content?.[prop.key] || prop.default || '';

    switch (prop.type) {
      case 'text':
        return (
          <Input
            value={currentValue}
            onChange={(e) => updateProperty(prop.key, e.target.value)}
            placeholder={`Digite ${prop.label.toLowerCase()}`}
          />
        );
      case 'textarea':
        return (
          <Textarea
            value={currentValue}
            onChange={(e) => updateProperty(prop.key, e.target.value)}
            placeholder={`Digite ${prop.label.toLowerCase()}`}
            rows={3}
          />
        );
      case 'select':
        return (
          <Select 
            value={currentValue}
            onValueChange={(value) => updateProperty(prop.key, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Selecione ${prop.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {prop.options?.map((option: any) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return (
          <Input
            value={currentValue}
            onChange={(e) => updateProperty(prop.key, e.target.value)}
            placeholder={`Digite ${prop.label.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h3 className="font-medium">Propriedades</h3>
      
      <div>
        <Label htmlFor="component-type">Tipo</Label>
        <div className="mt-1 rounded border bg-gray-50 p-2 text-sm capitalize">
          {selectedComponent.type || 'Componente'}
        </div>
      </div>

      <div>
        <Label htmlFor="component-id">ID</Label>
        <Input 
          id="component-id"
          type="text" 
          value={selectedComponent.id || ''}
          onChange={(e) => onChange({...selectedComponent, id: e.target.value})}
          placeholder="ID único do componente"
        />
      </div>

      {schema.map((prop) => (
        <div key={prop.key}>
          <Label htmlFor={`prop-${prop.key}`}>{prop.label}</Label>
          {renderPropertyInput(prop)}
        </div>
      ))}
    </div>
  );
}
