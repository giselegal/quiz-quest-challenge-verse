import React from 'react';
import { InlineEditableText } from './InlineEditableText';
import type { BlockComponentProps } from '@/types/blocks';

const TextInlineBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
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

  const sizeClasses = {
    small: 'text-sm sm:text-base',
    medium: 'text-base sm:text-lg',
    large: 'text-lg sm:text-xl'
  };

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div 
      className={`
        w-full flex items-center justify-center
        p-3 rounded-lg transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-transparent hover:border-blue-300 hover:bg-blue-50/30'
        }
        ${className}
      `}
    >
      <p 
        className={`
          text-gray-700 leading-relaxed
          ${sizeClasses[fontSize as keyof typeof sizeClasses]}
          ${alignmentClasses[alignment as keyof typeof alignmentClasses]}
        `}
      >
        <InlineEditableText
          value={content}
          onChange={(value) => handlePropertyChange('content', value)}
          placeholder="Digite seu texto aqui..."
          className="min-w-0 outline-none bg-transparent"
          multiline
        />
      </p>
    </div>
  );
};

export default TextInlineBlock;