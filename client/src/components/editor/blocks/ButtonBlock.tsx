import React from 'react';
import { InlineEditableText } from './InlineEditableText';
import type { BlockComponentProps } from '@/types/blocks';

const ButtonBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const { 
    text = 'Texto do Botão', 
    style = 'primary', 
    size = 'default',
    fullWidth = false,
    url = '',
    action = 'link'
  } = block.properties;

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const styleClasses: Record<string, string> = {
    primary: 'bg-[#B89B7A] hover:bg-[#a08965] text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    accent: 'bg-[#432818] hover:bg-[#2a1910] text-white'
  };

  const sizeClasses: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm',
    default: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <div 
      className={`
        p-4 rounded-lg cursor-pointer transition-all duration-200 flex justify-center
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-[#B89B7A]/40 hover:bg-[#FAF9F7]'
        }
        ${className}
      `}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      <div 
        className={`
          rounded-lg font-medium transition-colors duration-200 flex items-center justify-center cursor-pointer
          ${styleClasses[style]}
          ${sizeClasses[size]}
          ${fullWidth ? 'w-full' : 'w-auto'}
        `}
      >
        <InlineEditableText
          tag="span"
          value={text}
          onSave={(value: string) => handlePropertyChange('text', value)}
          className="text-inherit"
          placeholder="Texto do botão"
        />
      </div>
    </div>
  );
};

export default ButtonBlock;
