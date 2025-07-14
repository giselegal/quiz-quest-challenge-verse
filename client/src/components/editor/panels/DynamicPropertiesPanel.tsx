import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface DynamicPropertiesPanelProps {
  selectedBlock?: any;
  onPropertyChange: (key: string, value: any) => void;
  onNestedPropertyChange: (path: string, value: any) => void;
}

export const DynamicPropertiesPanel: React.FC<DynamicPropertiesPanelProps> = ({
  selectedBlock,
  onPropertyChange,
  onNestedPropertyChange
}) => {
  if (!selectedBlock) {
    return (
      <div className="p-4 text-center">
        <h4 className="text-sm font-medium text-gray-900 mb-2">
          Nenhum bloco selecionado
        </h4>
        <p className="text-xs text-gray-500">
          Selecione um bloco no canvas para editar suas propriedades.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">
          {selectedBlock.type}
        </h4>
        <p className="text-xs text-gray-500">
          ID: {selectedBlock.id}
        </p>
      </div>

      <div className="space-y-4">
        {/* Propriedades básicas comuns */}
        {selectedBlock.properties?.text && (
          <div>
            <Label htmlFor="text" className="text-xs">Texto</Label>
            <Textarea
              id="text"
              value={selectedBlock.properties.text || ''}
              onChange={(e) => onPropertyChange('text', e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>
        )}

        {selectedBlock.properties?.title && (
          <div>
            <Label htmlFor="title" className="text-xs">Título</Label>
            <Input
              id="title"
              value={selectedBlock.properties.title || ''}
              onChange={(e) => onPropertyChange('title', e.target.value)}
              className="mt-1"
            />
          </div>
        )}

        {selectedBlock.properties?.subtitle && (
          <div>
            <Label htmlFor="subtitle" className="text-xs">Subtítulo</Label>
            <Input
              id="subtitle"
              value={selectedBlock.properties.subtitle || ''}
              onChange={(e) => onPropertyChange('subtitle', e.target.value)}
              className="mt-1"
            />
          </div>
        )}

        {selectedBlock.properties?.buttonText && (
          <div>
            <Label htmlFor="buttonText" className="text-xs">Texto do Botão</Label>
            <Input
              id="buttonText"
              value={selectedBlock.properties.buttonText || ''}
              onChange={(e) => onPropertyChange('buttonText', e.target.value)}
              className="mt-1"
            />
          </div>
        )}

        {selectedBlock.properties?.imageUrl && (
          <div>
            <Label htmlFor="imageUrl" className="text-xs">URL da Imagem</Label>
            <Input
              id="imageUrl"
              value={selectedBlock.properties.imageUrl || ''}
              onChange={(e) => onPropertyChange('imageUrl', e.target.value)}
              className="mt-1"
              placeholder="https://..."
            />
          </div>
        )}

        {typeof selectedBlock.properties?.visible !== 'undefined' && (
          <div className="flex items-center justify-between">
            <Label htmlFor="visible" className="text-xs">Visível</Label>
            <Switch
              id="visible"
              checked={selectedBlock.properties.visible !== false}
              onCheckedChange={(checked) => onPropertyChange('visible', checked)}
            />
          </div>
        )}

        {/* Propriedades específicas do tipo */}
        <div className="pt-4 border-t border-gray-200">
          <h5 className="text-xs font-medium text-gray-700 mb-2">
            Propriedades Específicas
          </h5>
          <div className="space-y-2">
            {Object.entries(selectedBlock.properties || {}).map(([key, value]) => {
              if (['text', 'title', 'subtitle', 'buttonText', 'imageUrl', 'visible'].includes(key)) {
                return null;
              }
              
              return (
                <div key={key}>
                  <Label htmlFor={key} className="text-xs capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <Input
                    id={key}
                    value={String(value || '')}
                    onChange={(e) => onPropertyChange(key, e.target.value)}
                    className="mt-1"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicPropertiesPanel;
