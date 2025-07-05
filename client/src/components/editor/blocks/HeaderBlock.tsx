import React from 'react';

interface HeaderBlockProps {
  properties: {
    title?: string;
    subtitle?: string;
    titleSize?: 'small' | 'medium' | 'large';
    alignment?: 'left' | 'center' | 'right';
  };
  isSelected?: boolean;
  onClick?: () => void;
}

export const HeaderBlock: React.FC<HeaderBlockProps> = ({ 
  properties, 
  isSelected = false,
  onClick 
}) => {
  const { title = 'Título Principal', subtitle, titleSize = 'large', alignment = 'center' } = properties;

  const titleSizeClasses = {
    small: 'text-2xl md:text-3xl',
    medium: 'text-3xl md:text-4xl',
    large: 'text-4xl md:text-5xl'
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
      <h1 className={`font-bold text-[#aa6b5d] ${titleSizeClasses[titleSize]}`}>
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg mt-4 text-[#432818] max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};
