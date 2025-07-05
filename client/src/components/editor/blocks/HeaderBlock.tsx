import React from 'react';
import { InlineEditableText } from './InlineEditableText';
import type { BlockComponentProps } from '@/types/blocks';

const HeaderBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const { 
    title = 'Título Principal', 
    subtitle = '', 
    titleSize = 'large', 
    alignment = 'center' 
  } = block.properties;

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const titleSizeClasses: Record<string, string> = {
    small: 'text-2xl md:text-3xl',
    medium: 'text-3xl md:text-4xl',
    large: 'text-4xl md:text-5xl'
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
        tag="h1"
        value={title}
        onSave={(value: string) => handlePropertyChange('title', value)}
        className={`font-bold text-[#aa6b5d] ${titleSizeClasses[titleSize]}`}
        placeholder="Título do cabeçalho"
      />
      
      <InlineEditableText
        tag="p"
        value={subtitle}
        onSave={(value: string) => handlePropertyChange('subtitle', value)}
        className="text-lg mt-4 text-[#432818] max-w-2xl mx-auto"
        placeholder="Subtítulo opcional"
      />
    </div>
  );
};

export default HeaderBlock;
