import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { PropertySchema } from '@/config/blockDefinitions';

interface PropertyInputProps {
  schema: PropertySchema;
  currentValue: any;
  onValueChange: (newValue: any) => void;
  // Para array-editor
  onAddItem?: () => void;
  onRemoveItem?: (index: number) => void;
  onUpdateItem?: (index: number, field: string, value: any) => void;
}

export const PropertyInput: React.FC<PropertyInputProps> = ({
  schema,
  currentValue,
  onValueChange,
  onAddItem,
  onRemoveItem,
  onUpdateItem
}) => {
  const handleInputChange = (value: any) => {
    onValueChange(value);
  };

  // Renderizar preview de imagem
  const renderImagePreview = (url: string) => {
    if (!url) return null;
    return (
      <img 
        src={url} 
        alt="Preview" 
        className="mt-2 max-w-32 h-20 object-cover rounded border"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  };

  switch (schema.type) {
    case 'text-input':
      return (
        <div className="space-y-2">
          <Label htmlFor={schema.key}>{schema.label}</Label>
          <Input
            id={schema.key}
            value={currentValue || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value)}
            placeholder={schema.placeholder}
          />
          {schema.description && (
            <p className="text-xs text-gray-500">{schema.description}</p>
          )}
        </div>
      );

    case 'textarea':
      return (
        <div className="space-y-2">
          <Label htmlFor={schema.key}>{schema.label}</Label>
          <Textarea
            id={schema.key}
            value={currentValue || ''}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e.target.value)}
            placeholder={schema.placeholder}
            rows={schema.rows || 3}
          />
          {schema.description && (
            <p className="text-xs text-gray-500">{schema.description}</p>
          )}
        </div>
      );

    case 'number-input':
      return (
        <div className="space-y-2">
          <Label htmlFor={schema.key}>{schema.label}</Label>
          <Input
            id={schema.key}
            type="number"
            value={currentValue || ''}
            onChange={(e) => handleInputChange(Number(e.target.value))}
            placeholder={schema.placeholder}
            min={schema.min}
            max={schema.max}
          />
          {schema.description && (
            <p className="text-xs text-gray-500">{schema.description}</p>
          )}
        </div>
      );

    case 'boolean-switch':
      return (
        <div className="flex items-center space-x-2">
          <Switch
            id={schema.key}
            checked={currentValue || false}
            onCheckedChange={handleInputChange}
          />
          <Label htmlFor={schema.key}>{schema.label}</Label>
          {schema.description && (
            <p className="text-xs text-gray-500 ml-2">{schema.description}</p>
          )}
        </div>
      );

    case 'color-picker':
      return (
        <div className="space-y-2">
          <Label htmlFor={schema.key}>{schema.label}</Label>
          <div className="flex items-center space-x-2">
            <Input
              id={schema.key}
              type="color"
              value={currentValue || '#000000'}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-16 h-10 p-1 border rounded"
            />
            <Input
              type="text"
              value={currentValue || ''}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
          {schema.description && (
            <p className="text-xs text-gray-500">{schema.description}</p>
          )}
        </div>
      );

    case 'select':
      return (
        <div className="space-y-2">
          <Label htmlFor={schema.key}>{schema.label}</Label>
          <select
            id={schema.key}
            value={currentValue || ''}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Selecione...</option>
            {schema.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {schema.description && (
            <p className="text-xs text-gray-500">{schema.description}</p>
          )}
        </div>
      );

    case 'image-url':
      return (
        <div className="space-y-2">
          <Label htmlFor={schema.key}>{schema.label}</Label>
          <Input
            id={schema.key}
            type="url"
            value={currentValue || ''}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={schema.placeholder}
          />
          {currentValue && renderImagePreview(currentValue)}
          {schema.description && (
            <p className="text-xs text-gray-500">{schema.description}</p>
          )}
        </div>
      );

    case 'video-url':
      return (
        <div className="space-y-2">
          <Label htmlFor={schema.key}>{schema.label}</Label>
          <Input
            id={schema.key}
            type="url"
            value={currentValue || ''}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={schema.placeholder}
          />
          {currentValue && (
            <video 
              src={currentValue} 
              controls 
              className="mt-2 max-w-full h-32 rounded border"
            />
          )}
          {schema.description && (
            <p className="text-xs text-gray-500">{schema.description}</p>
          )}
        </div>
      );

    case 'array-editor':
      const arrayValue = Array.isArray(currentValue) ? currentValue : [];
      
      return (
        <div className="space-y-2">
          <Label>{schema.label}</Label>
          <div className="space-y-2 p-3 border border-gray-200 rounded">
            {arrayValue.map((item, index) => (
              <div key={index} className="flex items-start space-x-2 p-2 bg-gray-50 rounded">
                <div className="flex-1 space-y-2">
                  {schema.itemSchema?.map((itemProp) => (
                    <PropertyInput
                      key={itemProp.key}
                      schema={itemProp}
                      currentValue={item[itemProp.key]}
                      onValueChange={(value) => 
                        onUpdateItem?.(index, itemProp.key, value)
                      }
                    />
                  ))}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveItem?.(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={onAddItem}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar {schema.label}
            </Button>
          </div>
          {schema.description && (
            <p className="text-xs text-gray-500">{schema.description}</p>
          )}
        </div>
      );

    case 'json-editor':
      const jsonValue = currentValue ? JSON.stringify(currentValue, null, 2) : '';
      
      return (
        <div className="space-y-2">
          <Label htmlFor={schema.key}>{schema.label}</Label>
          <Textarea
            id={schema.key}
            value={jsonValue}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              try {
                const parsed = JSON.parse(e.target.value);
                handleInputChange(parsed);
              } catch (error) {
                // Manter o valor como string até ser válido
                console.warn('JSON inválido:', error);
              }
            }}
            placeholder={schema.placeholder}
            rows={schema.rows || 6}
            className="font-mono text-sm"
          />
          {schema.description && (
            <p className="text-xs text-gray-500">{schema.description}</p>
          )}
        </div>
      );

    default:
      return (
        <div className="space-y-2">
          <Label>{schema.label}</Label>
          <p className="text-sm text-red-500">
            Tipo de campo não suportado: {schema.type}
          </p>
        </div>
      );
  }
};
