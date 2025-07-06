import React from 'react';
import { cn } from '@/lib/utils';
import { InlineEditableText } from './InlineEditableText';

interface QuizNameInputBlockProps {
  block: {
    id: string;
    type: string;
    properties: {
      label?: string;
      placeholder?: string;
      required?: boolean;
      inputType?: string;
      value?: string;
      helperText?: string;
    };
  };
  isSelected?: boolean;
  onClick?: () => void;
  onSaveInline?: (blockId: string, key: string, newValue: string) => void;
  disabled?: boolean;
  className?: string;
}

const QuizNameInputBlock: React.FC<QuizNameInputBlockProps> = ({
  block,
  isSelected = false,
  onClick,
  onSaveInline,
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
      {/* Input Field */}
      <div className="grid w-full items-center gap-1.5">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          <InlineEditableText
            value={label}
            onSave={(newValue) => onSaveInline?.(block.id, 'label', newValue)}
            placeholder="Label do campo..."
            disabled={disabled}
            className="inline-block font-medium"
          />
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        <input 
          className="flex h-10 w-full rounded-md border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-inherit placeholder:opacity-50 text-base text-left p-4" 
          placeholder={placeholder}
          type={inputType}
          value={value}
          disabled={disabled}
          readOnly
        />
        
        {helperText && (
          <p className="text-xs text-gray-500 mt-1">{helperText}</p>
        )}
      </div>
      
      {/* Editable Properties Panel */}
      {isSelected && !disabled && (
        <div className="mt-4 p-3 bg-gray-50 rounded border-t">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Placeholder</label>
              <input 
                type="text"
                value={placeholder}
                onChange={(e) => onSaveInline?.(block.id, 'placeholder', e.target.value)}
                className="w-full px-2 py-1 border rounded text-xs"
                placeholder="Digite aqui..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Tipo de Input</label>
              <select 
                value={inputType}
                onChange={(e) => onSaveInline?.(block.id, 'inputType', e.target.value)}
                className="w-full px-2 py-1 border rounded text-xs"
              >
                <option value="text">Texto</option>
                <option value="email">Email</option>
                <option value="tel">Telefone</option>
                <option value="number">Número</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Texto de Ajuda</label>
              <input 
                type="text"
                value={helperText}
                onChange={(e) => onSaveInline?.(block.id, 'helperText', e.target.value)}
                className="w-full px-2 py-1 border rounded text-xs"
                placeholder="Texto opcional..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Campo Obrigatório</label>
              <input 
                type="checkbox"
                checked={required}
                onChange={(e) => onSaveInline?.(block.id, 'required', e.target.checked.toString())}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizNameInputBlock;