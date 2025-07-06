import React from 'react';
import type { BlockComponentProps } from '@/types/blocks';

const TextBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onClick,
  className = ''
}) => {
  const { 
    content = 'Este é um bloco de texto. Clique para editar.',
    fontSize = 'base',
    alignment = 'left',
    color = 'text-gray-800'
  } = block.properties;

  const fontSizeClasses: Record<string, string> = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  };

  const alignmentClasses: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  };

  return (
    <div 
      className={`
        p-4 rounded-lg cursor-pointer transition-all duration-200
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
          ${fontSizeClasses[fontSize]} 
          ${alignmentClasses[alignment]} 
          ${color}
          leading-relaxed whitespace-pre-wrap
        `}
      >
        {content}
      </div>
    </div>
  );
};

export default TextBlock;