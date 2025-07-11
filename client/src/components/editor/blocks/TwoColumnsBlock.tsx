
import React from 'react';
import type { BlockComponentProps } from '@/types/blocks';

interface TwoColumnsBlockProps extends BlockComponentProps {
  block: {
    id: string;
    type: 'two-columns';
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

  const renderContent = (content: any) => {
    const getTextAlign = (alignment?: string) => {
      const aligns: Record<string, string> = {
        'left': 'text-left',
        'center': 'text-center',
        'right': 'text-right'
      };
      return aligns[alignment || 'left'] || 'text-left';
    };

    switch (content.type) {
      case 'text':
        return (
          <div className={getTextAlign(content.alignment)}>
            {content.title && (
              <h3 className="text-xl font-semibold mb-4" style={{ color: textColor }}>
                {content.title}
              </h3>
            )}
            {content.content && (
              <div 
                className="prose prose-gray max-w-none"
                style={{ color: textColor }}
                dangerouslySetInnerHTML={{ __html: content.content }}
              />
            )}
          </div>
        );

      case 'image':
        return (
          <div className={getTextAlign(content.alignment)}>
            {content.title && (
              <h3 className="text-xl font-semibold mb-4" style={{ color: textColor }}>
                {content.title}
              </h3>
            )}
            {content.imageUrl && (
              <img
                src={content.imageUrl}
                alt={content.title || 'Imagem'}
                className="w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
            )}
          </div>
        );

      case 'video':
        return (
          <div className={getTextAlign(content.alignment)}>
            {content.title && (
              <h3 className="text-xl font-semibold mb-4" style={{ color: textColor }}>
                {content.title}
              </h3>
            )}
            {content.videoUrl && (
              <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                <iframe
                  src={content.videoUrl}
                  title={content.title || 'Vídeo'}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        );

      case 'list':
        return (
          <div className={getTextAlign(content.alignment)}>
            {content.title && (
              <h3 className="text-xl font-semibold mb-4" style={{ color: textColor }}>
                {content.title}
              </h3>
            )}
            {content.items && content.items.length > 0 && (
              <ul className="space-y-3">
                {content.items.map((item: any, index: number) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3"
                    style={{ color: textColor }}
                  >
                    <span className="w-2 h-2 bg-[#B89B7A] rounded-full mt-2 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      default:
        return (
          <div className="text-gray-400 text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
            Conteúdo não configurado
          </div>
        );
    }
  };

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
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: textColor }}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Two Columns Grid */}
      <div 
        className={`
          grid grid-cols-1 ${mobileStack ? getRatioClasses() : getRatioClasses().replace('lg:', '')}
          ${getAlignmentClasses()}
        `}
        style={{ gap: `${gap}px` }}
      >
        {/* Left Column */}
        <div className="w-full">
          {renderContent(leftContent)}
        </div>

        {/* Right Column */}
        <div className="w-full">
          {renderContent(rightContent)}
        </div>
      </div>
    </div>
  );
};

export default TwoColumnsBlock;
