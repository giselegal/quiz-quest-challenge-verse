import React, { useState, useEffect } from 'react';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import type { BlockComponentProps } from '@/types/blocks';

const QuizOfferHeroBlock: React.FC<BlockComponentProps> = ({
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
    title = 'Descubra Seu Estilo Predominante',
    subtitle = 'Tenha finalmente um guarda-roupa que funciona 100%',
    heroImage = 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911574/ELEGANTE_PREDOMINANTE_awmgit.webp',
    backgroundColor = '#FFFBF7',
    textColor = '#432818',
    showLogo = true,
    showImage = true
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
        <div className="flex flex-col items-center justify-center text-center max-w-xs sm:max-w-lg md:max-w-4xl mx-auto gap-6">
          {/* Logo */}
          {showLogo && (
            <div className="flex items-center justify-center">
              <img 
                src={logoUrl} 
                alt={logoAlt}
                style={{ height: logoHeight }}
                className="max-w-full h-auto"
              />
            </div>
          )}

          {/* Content Container */}
          <div className="flex flex-col items-center gap-4">
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold" style={{ color: textColor }}>
              {title}
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 max-w-xs sm:max-w-lg md:max-w-3xl">
              {subtitle}
            </p>
          </div>
          
          {/* Hero Image */}
          {showImage && (
            <div className="flex justify-center max-w-xs sm:max-w-sm md:max-w-md">
              <img
                src={heroImage}
                alt="Hero Image"
                className="w-full rounded-lg shadow-xl"
              />
            </div>
          )}
        </div>
      </AnimatedWrapper>
    </div>
  );
};

export default QuizOfferHeroBlock;
