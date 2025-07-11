
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Block } from '@/types/editor';
import { X, Plus, Trash2 } from 'lucide-react';

interface PropertyPanelProps {
  selectedBlock: Block | null;
  onClose: () => void;
  onUpdate: (blockId: string, properties: any) => void;
  onDelete: (blockId: string) => void;
}

export function PropertyPanel({ selectedBlock, onClose, onUpdate, onDelete }: PropertyPanelProps) {
  if (!selectedBlock) {
    return (
      <div className="h-full bg-white flex flex-col items-center justify-center p-6">
        <div className="text-center text-gray-500">
          <h3 className="text-lg font-medium mb-2">Propriedades</h3>
          <p className="text-sm">Selecione um bloco para editar suas propriedades</p>
        </div>
      </div>
    );
  }

  const handlePropertyChange = (key: string, value: any) => {
    const updatedProperties = {
      ...selectedBlock.properties,
      [key]: value
    };
    onUpdate(selectedBlock.id, updatedProperties);
  };

  const renderPropertyInput = (key: string, value: any) => {
    // Handle common property types
    if (typeof value === 'boolean') {
      return (
        <div key={key} className="space-y-2">
          <Label htmlFor={key}>{key}</Label>
          <Switch
            id={key}
            checked={value}
            onCheckedChange={(checked) => handlePropertyChange(key, checked)}
          />
        </div>
      );
    }

    if (typeof value === 'string') {
      if (value.length > 100 || key.includes('description') || key.includes('content')) {
        return (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>{key}</Label>
            <Textarea
              id={key}
              value={value}
              onChange={(e) => handlePropertyChange(key, e.target.value)}
              placeholder={`Digite ${key}...`}
              rows={3}
            />
          </div>
        );
      } else {
        return (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>{key}</Label>
            <Input
              id={key}
              value={value}
              onChange={(e) => handlePropertyChange(key, e.target.value)}
              placeholder={`Digite ${key}...`}
            />
          </div>
        );
      }
    }

    if (typeof value === 'number') {
      return (
        <div key={key} className="space-y-2">
          <Label htmlFor={key}>{key}</Label>
          <Input
            id={key}
            type="number"
            value={value}
            onChange={(e) => handlePropertyChange(key, parseFloat(e.target.value) || 0)}
          />
        </div>
      );
    }

    // Handle arrays
    if (Array.isArray(value)) {
      return (
        <div key={key} className="space-y-2">
          <Label>{key}</Label>
          <div className="space-y-2">
            {value.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={typeof item === 'string' ? item : JSON.stringify(item)}
                  onChange={(e) => {
                    const newArray = [...value];
                    newArray[index] = e.target.value;
                    handlePropertyChange(key, newArray);
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newArray = value.filter((_, i) => i !== index);
                    handlePropertyChange(key, newArray);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                handlePropertyChange(key, [...value, '']);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </div>
      );
    }

    // Handle objects
    if (typeof value === 'object' && value !== null) {
      return (
        <div key={key} className="space-y-2">
          <Label>{key}</Label>
          <Textarea
            value={JSON.stringify(value, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                handlePropertyChange(key, parsed);
              } catch {
                // Invalid JSON, don't update
              }
            }}
            rows={4}
            className="font-mono text-sm"
          />
        </div>
      );
    }

    // Fallback to string input
    return (
      <div key={key} className="space-y-2">
        <Label htmlFor={key}>{key}</Label>
        <Input
          id={key}
          value={String(value)}
          onChange={(e) => handlePropertyChange(key, e.target.value)}
          placeholder={`Digite ${key}...`}
        />
      </div>
    );
  };

  const getBlockTitle = () => {
    switch (selectedBlock.type) {
      case 'headline': return 'Título';
      case 'text': return 'Texto';
      case 'image': return 'Imagem';
      case 'button': return 'Botão';
      case 'spacer': return 'Espaçador';
      case 'divider': return 'Divisor';
      case 'testimonial': return 'Depoimento';
      case 'testimonials': return 'Depoimentos';
      case 'benefits': return 'Benefícios';
      case 'offer': return 'Oferta';
      case 'guarantee': return 'Garantia';
      case 'pricing': return 'Preço';
      case 'cta': return 'CTA';
      case 'header': return 'Cabeçalho';
      case 'hero-section': return 'Seção Hero';
      case 'bonus-carousel': return 'Carrossel de Bônus';
      case 'style-result': return 'Resultado de Estilo';
      case 'secondary-styles': return 'Estilos Secundários';
      case 'products': return 'Produtos';
      case 'quiz-question': return 'Pergunta do Quiz';
      case 'component-reference': return 'Referência de Componente';
      default: return selectedBlock.type;
    }
  };

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold text-gray-900">{getBlockTitle()}</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Propriedades do Bloco</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedBlock.properties && Object.entries(selectedBlock.properties).map(([key, value]) => 
              renderPropertyInput(key, value)
            )}
            
            {(!selectedBlock.properties || Object.keys(selectedBlock.properties).length === 0) && (
              <p className="text-sm text-gray-500">
                Nenhuma propriedade editável disponível para este tipo de bloco.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="p-4 border-t">
        <Button
          variant="destructive"
          onClick={() => onDelete(selectedBlock.id)}
          className="w-full"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Excluir Bloco
        </Button>
      </div>
    </div>
  );
}
