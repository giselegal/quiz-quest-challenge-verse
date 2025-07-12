
import React from 'react';
import type { BlockComponentProps } from '@/types/blocks';
import { TwoColumnsHeader } from './two-columns/TwoColumnsHeader';
import { ColumnLayout } from './two-columns/ColumnLayout';

interface TwoColumnsBlockProps extends Omit<BlockComponentProps, 'block'> {
  block: BlockComponentProps['block'] & {
    properties: {
      title?: string;
      subtitle?: string;
      leftContent: {
        type: 'text' | 'image' | 'video' | 'list';
        title?: string;
        content?: string;
        imageUrl?: string;
        videoUrl?: string;
        items?: string[];
        alignment?: 'left' | 'center' | 'right';
      };
      rightContent: {
        type: 'text' | 'image' | 'video' | 'list';
        title?: string;
        content?: string;
        imageUrl?: string;
        videoUrl?: string;
        items?: string[];
        alignment?: 'left' | 'center' | 'right';
      };
      columnRatio?: '50-50' | '60-40' | '40-60' | '70-30' | '30-70';
      verticalAlignment?: 'top' | 'center' | 'bottom';
      gap?: number;
      mobileStack?: boolean;
      backgroundColor?: string;
      textColor?: string;
    };
  };
}

const TwoColumnsBlock: React.FC<TwoColumnsBlockProps> = ({
  block,
  isSelected = false,
  onClick,
  className = ''
}) => {
  const {
    title = '',
    subtitle = '',
    leftContent,
    rightContent,
    columnRatio = '50-50',
    verticalAlignment = 'top',
    gap = 32,
    mobileStack = true,
    backgroundColor = '#ffffff',
    textColor = '#374151'
  } = block.properties;

  return (
    <div 
      className={`
        w-full p-6 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-[#B89B7A]/40 hover:bg-[#FAF9F7]'
        }
        ${className}
      `}
      style={{ backgroundColor, color: textColor }}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      <TwoColumnsHeader 
        title={title}
        subtitle={subtitle}
        textColor={textColor}
      />

      <ColumnLayout
        leftContent={leftContent}
        rightContent={rightContent}
        columnRatio={columnRatio}
        verticalAlignment={verticalAlignment}
        gap={gap}
        mobileStack={mobileStack}
        textColor={textColor}
      />
    </div>
  );
};

export default TwoColumnsBlock;
