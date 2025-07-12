
import React from 'react';
import { ContentRenderer } from './ContentRenderer';

interface ColumnLayoutProps {
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
  columnRatio: '50-50' | '60-40' | '40-60' | '70-30' | '30-70';
  verticalAlignment: 'top' | 'center' | 'bottom';
  gap: number;
  mobileStack: boolean;
  textColor: string;
}

export const ColumnLayout: React.FC<ColumnLayoutProps> = ({
  leftContent,
  rightContent,
  columnRatio,
  verticalAlignment,
  gap,
  mobileStack,
  textColor
}) => {
  const getRatioClasses = () => {
    const ratios = {
      '50-50': 'lg:grid-cols-2',
      '60-40': 'lg:grid-cols-[3fr_2fr]',
      '40-60': 'lg:grid-cols-[2fr_3fr]',
      '70-30': 'lg:grid-cols-[7fr_3fr]',
      '30-70': 'lg:grid-cols-[3fr_7fr]'
    };
    return ratios[columnRatio] || 'lg:grid-cols-2';
  };

  const getAlignmentClasses = () => {
    const alignments = {
      'top': 'items-start',
      'center': 'items-center',
      'bottom': 'items-end'
    };
    return alignments[verticalAlignment] || 'items-start';
  };

  return (
    <div 
      className={`
        grid grid-cols-1 ${mobileStack ? getRatioClasses() : getRatioClasses().replace('lg:', '')}
        ${getAlignmentClasses()}
      `}
      style={{ gap: `${gap}px` }}
    >
      {/* Left Column */}
      <div className="w-full">
        <ContentRenderer content={leftContent} textColor={textColor} />
      </div>

      {/* Right Column */}
      <div className="w-full">
        <ContentRenderer content={rightContent} textColor={textColor} />
      </div>
    </div>
  );
};
