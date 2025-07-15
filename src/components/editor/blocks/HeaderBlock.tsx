import React from 'react';
import type { BlockComponentProps } from '@/types/blocks';

const HeaderBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onClick,
  className = ''
}) => {
  const { 
    title = 'Título Principal', 
    subtitle = '', 
    titleSize = 'large', 
    alignment = 'center' 
  } = block.properties;

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
        ${className}
      `}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      <div className={`${alignmentClasses[alignment]} space-y-2`}>
        <h1 className={`${titleSizeClasses[titleSize]} font-bold text-[#432818] leading-tight`}>
          {title}
        </h1>
        {subtitle && (
          <h2 className="text-lg md:text-xl text-[#6B5B73] font-medium">
            {subtitle}
          </h2>
        )}
      </div>
    </div>
  );
};

export default HeaderBlock;