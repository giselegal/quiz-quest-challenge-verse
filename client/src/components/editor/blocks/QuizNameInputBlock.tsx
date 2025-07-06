import React from 'react';
import { cn } from '@/lib/utils';

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
      {/* Input Field - Visual Only */}
      <div className="grid w-full items-center gap-1.5">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
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
    </div>
  );
};

export default QuizNameInputBlock;