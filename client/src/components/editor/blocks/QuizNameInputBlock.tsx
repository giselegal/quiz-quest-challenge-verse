import React from 'react';
import { cn } from '@/lib/utils';
import { InlineEditText } from './InlineEditText';
import type { BlockComponentProps } from '@/types/blocks';

interface QuizNameInputBlockProps extends BlockComponentProps {
  onPropertyChange?: (key: string, value: any) => void;
  disabled?: boolean;
  className?: string;
}

const QuizNameInputBlock: React.FC<QuizNameInputBlockProps> = ({
  block,
  isSelected = false,
  onClick,
  onPropertyChange,
  disabled = false,
  className
}) => {
  const { 
    label = 'NOME',
    placeholder = 'Digite seu nome aqui...',
    required = true,
    inputType = 'text',
    value = '',
    helperText = ''
  } = block.properties;

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

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
      {/* Input Field - Visual Only */}
      <div className="grid w-full items-center gap-1.5">
        <div className="flex items-center">
          <InlineEditText
            value={label}
            onSave={(value: string) => handlePropertyChange('label', value)}
            placeholder="Label do campo"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            disabled={disabled}
            as="span"
          />
          {required && <span className="text-red-500 ml-1">*</span>}
        </div>
        
        <div className="relative group">
          <input 
            className="flex h-10 w-full rounded-md border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 text-base text-left p-4" 
            placeholder={placeholder}
            type={inputType}
            value={value}
            disabled={disabled}
            readOnly
          />
          {!disabled && (
            <div 
              className="absolute inset-0 bg-transparent cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                // Focus na edição do placeholder via modal ou overlay
              }}
              title="Clique para editar o placeholder"
            >
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                Editar placeholder
              </div>
            </div>
          )}
        </div>
        
        {/* Placeholder Editor - Separado */}
        <div className="text-xs text-gray-500">
          <span className="font-medium">Placeholder: </span>
          <InlineEditText
            value={placeholder}
            onSave={(value: string) => handlePropertyChange('placeholder', value)}
            placeholder="Digite o placeholder..."
            className="inline"
            disabled={disabled}
            as="span"
          />
        </div>
        
        {helperText && (
          <InlineEditText
            value={helperText}
            onSave={(value: string) => handlePropertyChange('helperText', value)}
            placeholder="Texto de ajuda"
            className="text-xs text-gray-500 mt-1"
            disabled={disabled}
            as="p"
          />
        )}
      </div>
    </div>
  );
};

export default QuizNameInputBlock;