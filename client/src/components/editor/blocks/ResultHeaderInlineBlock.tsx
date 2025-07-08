import React from 'react';
import { InlineEditableText } from './InlineEditableText';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import type { BlockComponentProps } from '@/types/blocks';

const ResultHeaderInlineBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onPropertyChange,
  className = ''
}) => {
  const { 
    title = 'Seu Estilo Predominante',
    percentage = 85,
    description = 'Descubra como aplicar seu estilo pessoal único na prática...',
    imageUrl = 'https://via.placeholder.com/238x320?text=Estilo',
    guideImageUrl = 'https://via.placeholder.com/540x300?text=Guia+de+Estilo',
    progressColor = '#B89B7A',
    badgeText = 'Exclusivo'
  } = block.properties;

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  return (
    <div 
      className={`
        w-full
        p-3 rounded-lg transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-transparent hover:border-blue-300 hover:bg-blue-50/30'
        }
        ${className}
      `}
    >
      <Card className="p-6 bg-white shadow-md border border-[#B89B7A]/20">
        <div className="text-center mb-8">
          <div className="max-w-md mx-auto mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[#8F7A6A]">
                <InlineEditableText
                  value={title}
                  onChange={(value) => handlePropertyChange('title', value)}
                  placeholder="Título do resultado"
                  className="text-sm text-[#8F7A6A]"
                />
              </span>
              <span 
                className="text-[#aa6b5d] font-medium cursor-pointer"
                onClick={() => {
                  const newPercentage = prompt('Nova porcentagem (0-100):', percentage.toString());
                  if (newPercentage !== null && !isNaN(Number(newPercentage))) {
                    handlePropertyChange('percentage', Math.max(0, Math.min(100, Number(newPercentage))));
                  }
                }}
              >
                {percentage}%
              </span>
            </div>
            <Progress 
              value={percentage} 
              className="h-2 bg-[#F3E8E6]" 
              style={{ 
                '--progress-color': progressColor 
              } as React.CSSProperties}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p className="text-[#432818] leading-relaxed">
              <InlineEditableText
                value={description}
                onChange={(value) => handlePropertyChange('description', value)}
                placeholder="Descrição do estilo predominante..."
                className="text-[#432818] leading-relaxed"
                multiline
              />
            </p>
          </div>
          
          <div className="max-w-[238px] mx-auto relative">
            <img 
              src={imageUrl}
              alt="Estilo"
              className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => {
                const newUrl = prompt('Nova URL da imagem:', imageUrl);
                if (newUrl !== null) handlePropertyChange('imageUrl', newUrl);
              }}
            />
            {/* Decorative corners */}
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#B89B7A]"></div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#B89B7A]"></div>
          </div>
        </div>

        <div className="mt-8 max-w-[540px] mx-auto relative">
          <img 
            src={guideImageUrl}
            alt="Guia de Estilo"
            className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => {
              const newUrl = prompt('Nova URL da imagem do guia:', guideImageUrl);
              if (newUrl !== null) handlePropertyChange('guideImageUrl', newUrl);
            }}
          />
          
          {/* Badge */}
          <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium transform rotate-12 cursor-pointer"
               onClick={() => {
                 const newBadge = prompt('Novo texto do badge:', badgeText);
                 if (newBadge !== null) handlePropertyChange('badgeText', newBadge);
               }}>
            {badgeText}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResultHeaderInlineBlock;
