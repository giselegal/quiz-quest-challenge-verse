import React, { useState, useEffect } from 'react';
import { Gift, Star, CheckCircle } from 'lucide-react';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import type { BlockComponentProps } from '@/types/blocks';

/**
 * BonusListInlineBlock - Bloco de lista de bônus (modular)
 * Renderiza apenas a lista de bônus/produtos
 */
const BonusListInlineBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    title = 'Bônus Exclusivos Inclusos',
    bonuses = [
      {
        title: 'Guia Completo do Seu Estilo',
        description: 'Material exclusivo com dicas personalizadas para seu estilo único',
        value: 'R$ 97,00',
        image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_NATURAL_fzp6fc.webp',
        badge: 'GUIA PRINCIPAL'
      },
      {
        title: 'Paleta de Cores Personalizada',
        description: 'Suas cores ideais baseadas no resultado do quiz',
        value: 'R$ 47,00',
        image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp',
        badge: 'BÔNUS EXCLUSIVO'
      }
    ],
    backgroundColor = '#ffffff',
    textColor = '#432818',
    accentColor = '#B89B7A',
    // Propriedades de grid para responsividade
    gridColumns = 1,
    spacing = 'md'
  } = block.properties;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Classes de espaçamento
  const spacingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12'
  };

  // Classes de grid baseadas na propriedade gridColumns
  const gridClasses = {
    1: 'w-full',
    2: 'w-full md:w-1/2'
  };

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  return (
    <div
      className={`
        ${gridClasses[gridColumns as keyof typeof gridClasses] || gridClasses[1]}
        ${spacingClasses[spacing as keyof typeof spacingClasses] || spacingClasses.md}
        transition-all duration-200
        ${isSelected 
          ? 'ring-1 ring-blue-500 bg-blue-50/30' 
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
        <div className="max-w-6xl mx-auto">
          {/* Título */}
          {title && (
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Gift className="w-6 h-6" style={{ color: accentColor }} />
                <h3 className="text-2xl lg:text-3xl font-bold" style={{ color: textColor }}>
                  {title}
                </h3>
              </div>
              <div 
                className="w-24 h-1 mx-auto rounded-full"
                style={{
                  background: `linear-gradient(to right, ${accentColor}, #aa6b5d)`
                }}
              />
            </div>
          )}

          {/* Grid de Bônus */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bonuses.map((bonus: any, index: number) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 lg:p-8 border border-opacity-15 transition-all duration-500 hover:scale-105 hover:shadow-2xl relative"
                style={{
                  borderColor: accentColor,
                  boxShadow: "0 8px 24px rgba(184, 155, 122, 0.15)"
                }}
              >
                {/* Badge */}
                <div className="absolute -top-4 -right-4 z-10">
                  <span
                    className="text-xs font-bold px-4 py-2 rounded-full text-white shadow-lg transform rotate-12"
                    style={{
                      background: index === 0 
                        ? `linear-gradient(to right, ${accentColor}, #aa6b5d)`
                        : `linear-gradient(to right, #aa6b5d, ${accentColor})`
                    }}
                  >
                    {bonus.badge || (index === 0 ? 'PRINCIPAL' : 'BÔNUS')}
                  </span>
                </div>

                {/* Imagem */}
                {bonus.image && (
                  <div 
                    className="relative mb-6 rounded-xl p-4 overflow-hidden"
                    style={{
                      backgroundColor: '#f9f4ef',
                      boxShadow: "0 2px 4px rgba(184, 155, 122, 0.08)"
                    }}
                  >
                    <img
                      src={bonus.image}
                      alt={bonus.title}
                      className="w-full h-32 object-contain transition-all duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-opacity-10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"
                      style={{ backgroundColor: accentColor }}
                    />
                  </div>
                )}

                {/* Conteúdo */}
                <div className="text-left space-y-4">
                  <h4 className="font-bold text-lg lg:text-xl leading-tight" style={{ color: textColor }}>
                    {bonus.title}
                  </h4>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                    {bonus.description}
                  </p>

                  {/* Valor */}
                  <div className="pt-4 border-t border-opacity-10" style={{ borderColor: accentColor }}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Valor individual:
                      </span>
                      <span 
                        className="text-lg font-bold line-through"
                        style={{ color: accentColor }}
                      >
                        {bonus.value}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Valor Total */}
          <div className="mt-12 text-center">
            <div 
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2"
              style={{
                backgroundColor: `${accentColor}10`,
                borderColor: `${accentColor}30`
              }}
            >
              <Star className="w-5 h-5" style={{ color: accentColor }} />
              <span className="font-semibold" style={{ color: textColor }}>
                Valor total dos bônus: 
              </span>
              <span 
                className="text-xl font-bold"
                style={{ color: accentColor }}
              >
                R$ 144,00
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              <CheckCircle className="w-4 h-4 inline mr-1 text-green-500" />
              Inclusos gratuitamente na sua compra
            </p>
          </div>
        </div>
      </AnimatedWrapper>
    </div>
  );
};

export default BonusListInlineBlock;
