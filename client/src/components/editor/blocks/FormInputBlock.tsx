import React from 'react';
import { InlineEditableText } from './InlineEditableText';
import { TextCursorInput } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';

const FormInputBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    label = 'Campo de entrada',
    placeholder = 'Digite aqui...',
    type = 'text',
    required = false
  } = block.properties;

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  return (
    <div
      className={`
        py-4 cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'outline-2 outline-blue-500 outline-offset-2' 
          : 'hover:shadow-sm'
        }
        ${className}
      `}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      <div className="space-y-2 max-w-md mx-auto">
        <label className="text-sm font-medium text-[#432818] block">
          <InlineEditableText
            value={label}
            onSave={(value: string) => handlePropertyChange('label', value)}
            className="inline-block"
            placeholder="Rótulo do campo"
            tag="span"
          />
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          type={type || 'text'}
          placeholder={placeholder || 'Digite aqui...'}
          className="w-full h-12 text-base border-2 border-[#B89B7A]/30 focus:border-[#B89B7A] rounded-xl bg-white focus:ring-2 focus:ring-[#B89B7A]/20 px-4"
          disabled // Desabilitado no editor para evitar interação real
          readOnly
        />
      </div>
    </div>
  );
};

export default FormInputBlock;
