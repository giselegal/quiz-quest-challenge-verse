import React from 'react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface StyleResultCardBlockProps {
  block: {
    id: string;
    type: string;
    properties: {
      styleCategory?: string;
      stylePercentage?: number;
      styleDescription?: string;
      styleImage?: string;
      guideImage?: string;
      secondaryStyles?: Array<{
        name: string;
        percentage: number;
      }>;
      showSecondaryStyles?: boolean;
      backgroundColor?: string;
      textColor?: string;
      accentColor?: string;
    };
  };
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
  className?: string;
}

const StyleResultCardBlock: React.FC<StyleResultCardBlockProps> = ({
  block,
  isSelected,
  isEditing,
  onClick,
  className
}) => {
  const {
    styleCategory = 'Elegante',
    stylePercentage = 85,
    styleDescription = 'Você tem um estilo sofisticado e refinado, que busca a elegância em cada detalhe.',
    styleImage = 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/14_l2nprc.webp',
    guideImage = 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp',
    secondaryStyles = [
      { name: 'Clássico', percentage: 20 },
      { name: 'Contemporâneo', percentage: 15 }
    ],
    showSecondaryStyles = true,
    backgroundColor = '#ffffff',
    textColor = '#432818',
    accentColor = '#B89B7A'
  } = block.properties;

  return (
    <div
      className={cn(
        'w-full border-2 border-transparent transition-all duration-200 rounded-lg p-6',
        isSelected && 'border-blue-500 shadow-lg',
        className
      )}
      onClick={onClick}
      style={{
        backgroundColor,
        color: textColor
      }}
    >
      {/* Main Result Card - Mobile First Responsive */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-4 md:p-6">
        {/* Header com percentual */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                Seu estilo predominante
              </span>
              <span className="font-medium" style={{ color: accentColor }}>
                {stylePercentage}%
              </span>
            </div>
            <Progress 
              value={stylePercentage} 
              className="h-2 sm:h-2.5 bg-gray-100 rounded-full" 
              indicatorClassName="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full"
            />
          </div>
        </div>

        {/* Content Grid - Force Vertical in Mobile */}
        <div className="space-y-8 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0 items-start">
          {/* Text Content */}
          <div className="space-y-6 sm:space-y-4 order-1">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold" style={{ color: accentColor }}>
              {styleCategory}
            </h3>
            <p className="text-gray-700 leading-relaxed text-base sm:text-sm md:text-base">
              {styleDescription}
            </p>
            
            {/* Secondary Styles */}
            {showSecondaryStyles && secondaryStyles.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4 sm:p-3 md:p-4 space-y-3 sm:space-y-2">
                <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-2" style={{ color: textColor }}>
                  Estilos Complementares
                </h4>
                <div className="space-y-2 md:space-y-1">
                  {secondaryStyles.map((style, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm md:text-sm text-gray-600">{style.name}</span>
                      <span className="text-sm md:text-sm font-semibold" style={{ color: accentColor }}>
                        {style.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Images Section - Single Column Mobile, Grid Only on Desktop */}
          <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 order-2">
            {/* Style Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[300px] lg:max-w-[200px]">
                <img 
                  src={styleImage}
                  alt={`Estilo ${styleCategory}`}
                  className="w-full h-auto aspect-[4/5] object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-image.jpg';
                  }}
                />
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-r-2" style={{ borderColor: accentColor }}></div>
                <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-l-2" style={{ borderColor: accentColor }}></div>
              </div>
            </div>

            {/* Guide Preview */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[300px] lg:max-w-[200px]">
                <img 
                  src={guideImage}
                  alt={`Guia de Estilo ${styleCategory}`}
                  className="w-full h-auto aspect-[4/5] object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-guide.jpg';
                  }}
                />
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full shadow-lg text-xs font-medium transform rotate-12">
                  Exclusivo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full"></div>
      )}
    </div>
  );
};

export default StyleResultCardBlock;
