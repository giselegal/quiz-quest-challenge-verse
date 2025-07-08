import React from 'react';
import { InlineEditableText } from './InlineEditableText';
import type { BlockComponentProps } from '@/types/blocks';

const HeadingInlineBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onPropertyChange,
  className = ''
}) => {
  const { 
    content = 'Seu Título Aqui',
    level = 'h2',
    size = 'large',
    alignment = 'center'
  } = block.properties;

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const sizeClasses = {
    small: 'text-lg sm:text-xl',
    medium: 'text-xl sm:text-2xl lg:text-3xl',
    large: 'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl'
  };

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const HeadingTag = level as keyof JSX.IntrinsicElements;

  return (
    <div 
      className={`
        inline-flex items-center justify-center max-w-fit mx-auto
        p-3 rounded-lg transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-transparent hover:border-blue-300 hover:bg-blue-50/30'
        }
        ${className}
      `}
    >
      <HeadingTag 
        className={`
          font-bold text-gray-800 leading-tight
          ${sizeClasses[size as keyof typeof sizeClasses]}
          ${alignmentClasses[alignment as keyof typeof alignmentClasses]}
        `}
      >
        <InlineEditableText
          value={content}
          onChange={(value) => handlePropertyChange('content', value)}
          placeholder="Digite o título aqui..."
          className="min-w-0 outline-none bg-transparent"
        />
      </HeadingTag>
    </div>
  );
};

export default HeadingInlineBlock;