import React from 'react';
import { cn } from '@/lib/utils';
import { InlineEditableText } from './InlineEditableText';

interface QuizTitleBlockProps {
  block: {
    id: string;
    type: string;
    properties: {
      title?: string;
      fontSize?: string;
      fontWeight?: string;
      textAlign?: string;
      color?: string;
      margin?: string;
    };
  };
  isSelected?: boolean;
  onClick?: () => void;
  onSaveInline?: (blockId: string, key: string, newValue: string) => void;
  disabled?: boolean;
  className?: string;
}

const QuizTitleBlock: React.FC<QuizTitleBlockProps> = ({
  block,
  isSelected = false,
  onClick,
  onSaveInline,
  disabled = false,
  className
}) => {
  const { 
    title = 'Teste de Estilo Pessoal',
    fontSize = '3xl',
    fontWeight = 'bold',
    textAlign = 'center',
    color = 'text-foreground',
    margin = 'mb-6'
  } = block.properties;

  return (
    <div
      className={cn(
        'relative w-full p-4 rounded-lg border-2 border-dashed',
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white',
        'cursor-pointer hover:border-gray-400 transition-colors',
        className
      )}
      onClick={onClick}
    >
      {/* Title */}
      <div className="min-h-[1.25rem] min-w-full">
        <InlineEditableText
          tag="h1"
          value={title}
          onSave={(newValue) => onSaveInline?.(block.id, 'title', newValue)}
          placeholder="Título do quiz..."
          disabled={disabled}
          className={cn(
            'min-w-full',
            `text-${fontSize}`,
            `font-${fontWeight}`,
            `text-${textAlign}`,
            color,
            margin
          )}
        />
      </div>
      
      {/* Editable Properties Panel */}
      {isSelected && !disabled && (
        <div className="mt-4 p-3 bg-gray-50 rounded border-t">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Tamanho da Fonte</label>
              <select 
                value={fontSize}
                onChange={(e) => onSaveInline?.(block.id, 'fontSize', e.target.value)}
                className="w-full px-2 py-1 border rounded text-xs"
              >
                <option value="lg">Grande (lg)</option>
                <option value="xl">Extra Grande (xl)</option>
                <option value="2xl">2XL</option>
                <option value="3xl">3XL</option>
                <option value="4xl">4XL</option>
                <option value="5xl">5XL</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Peso da Fonte</label>
              <select 
                value={fontWeight}
                onChange={(e) => onSaveInline?.(block.id, 'fontWeight', e.target.value)}
                className="w-full px-2 py-1 border rounded text-xs"
              >
                <option value="normal">Normal</option>
                <option value="medium">Medium</option>
                <option value="semibold">Semibold</option>
                <option value="bold">Bold</option>
                <option value="extrabold">Extra Bold</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Alinhamento</label>
              <select 
                value={textAlign}
                onChange={(e) => onSaveInline?.(block.id, 'textAlign', e.target.value)}
                className="w-full px-2 py-1 border rounded text-xs"
              >
                <option value="left">Esquerda</option>
                <option value="center">Centro</option>
                <option value="right">Direita</option>
                <option value="justify">Justificado</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Cor</label>
              <select 
                value={color}
                onChange={(e) => onSaveInline?.(block.id, 'color', e.target.value)}
                className="w-full px-2 py-1 border rounded text-xs"
              >
                <option value="text-foreground">Padrão</option>
                <option value="text-primary">Primária</option>
                <option value="text-secondary">Secundária</option>
                <option value="text-muted">Muted</option>
                <option value="text-accent">Accent</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizTitleBlock;