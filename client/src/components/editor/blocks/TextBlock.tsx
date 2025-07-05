import React from 'react';
import { InlineEditableText } from './InlineEditableText';
import type { BlockComponentProps } from '@/types/blocks';

const TextBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const { 
    content = 'Conteúdo do texto aqui...', 
    fontSize = 'medium', 
    alignment = 'left' 
  } = block.properties;

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const fontSizeClasses: Record<string, string> = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  const alignmentClasses: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div 
      className={`
        p-4 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-[#B89B7A]/40 hover:bg-[#FAF9F7]'
        }
        ${alignmentClasses[alignment]}
        ${className}
      `}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      <InlineEditableText
        tag="div"
        value={content}
        onSave={(value: string) => handlePropertyChange('content', value)}
        className={`text-[#432818] ${fontSizeClasses[fontSize]} whitespace-pre-wrap`}
        placeholder="Digite seu conteúdo aqui..."
      />
    </div>
  );
};

export default TextBlock;
