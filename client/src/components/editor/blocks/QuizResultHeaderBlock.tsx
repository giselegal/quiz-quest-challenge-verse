import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import type { BlockComponentProps } from '@/types/blocks';

const QuizResultHeaderBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    logoUrl = 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
    logoAlt = 'Logo Gisele Galvão',
    logoHeight = '60px',
    userName = 'Querida',
    title = 'Parabéns, {userName}!',
    subtitle = 'Seu resultado personalizado está pronto',
    backgroundColor = '#FFFBF7',
    textColor = '#432818',
    showLogo = true
  } = block.properties;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const formattedTitle = title.replace('{userName}', userName);

  return (
    <div
      className={`
        w-full py-8 px-4 transition-all duration-200
        ${isSelected 
          ? 'ring-1 ring-gray-400/40 bg-gray-50/30' 
          : 'hover:shadow-sm'
        }
        ${className}
      `}
      style={{ backgroundColor }}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      <AnimatedWrapper show={isLoaded}>
        <div className="flex flex-col items-center justify-center text-center max-w-xs sm:max-w-lg md:max-w-4xl mx-auto">
          {/* Logo */}
          {showLogo && (
            <div className="flex items-center justify-center mb-6">
              <img 
                src={logoUrl} 
                alt={logoAlt}
                style={{ height: logoHeight }}
                className="max-w-full h-auto"
              />
            </div>
          )}

          {/* Content Container */}
          <div className="flex flex-col items-center gap-2">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold" style={{ color: textColor }}>
              {formattedTitle}
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg text-gray-600">
              {subtitle}
            </p>
          </div>
        </div>
      </AnimatedWrapper>
    </div>
  );
};

export default QuizResultHeaderBlock;
