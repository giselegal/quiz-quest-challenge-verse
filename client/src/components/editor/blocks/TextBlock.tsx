import React from 'react';

interface TextBlockProps {
  properties: {
    content?: string;
    fontSize?: 'small' | 'medium' | 'large';
    alignment?: 'left' | 'center' | 'right';
  };
  isSelected?: boolean;
  onClick?: () => void;
}

export const TextBlock: React.FC<TextBlockProps> = ({ 
  properties, 
  isSelected = false,
  onClick 
}) => {
  const { content = 'Conteúdo do texto aqui...', fontSize = 'medium', alignment = 'left' } = properties;

  const fontSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  const alignmentClasses = {
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
      `}
      onClick={onClick}
    >
      <div 
        className={`text-[#432818] ${fontSizeClasses[fontSize]} whitespace-pre-wrap`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};
