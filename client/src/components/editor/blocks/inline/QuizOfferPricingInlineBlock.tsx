import React, { useState, useEffect } from 'react';
import { ShoppingCart, TrendingUp, Clock, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import type { BlockComponentProps } from '@/types/blocks';

/**
 * QuizOfferPricingInlineBlock - Bloco de preços da oferta (modular)
 * Renderiza apenas a seção de preços com CTA
 */
const QuizOfferPricingInlineBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    originalPrice = 'R$ 175,00',
    finalPrice = 'R$ 39,90',
    paymentOptions = 'ou 5x de R$ 8,83',
    ctaText = 'QUERO DESCOBRIR MEU ESTILO AGORA',
    ctaUrl = '#checkout',
    discountText = 'Economia de R$ 135,10 (77% OFF)',
    backgroundColor = '#ffffff',
    textColor = '#432818',
    accentColor = '#B89B7A',
    // Propriedades de grid para responsividade
    gridColumns = 1,
    spacing = 'md'
  } = block.properties;

  const [isLoaded, setIsLoaded] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

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

  const handleCTAClick = () => {
    if (ctaUrl && ctaUrl !== '#') {
      if (window.innerWidth >= 768) {
        window.open(ctaUrl, '_blank');
      } else {
        window.location.href = ctaUrl;
      }
    }
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
        <div className="max-w-lg mx-auto">
          {/* Card de Preços */}
          <div
            className="relative bg-white rounded-2xl p-8 lg:p-10 border-4 border-double border-opacity-30 overflow-hidden"
            style={{
              borderColor: accentColor,
              boxShadow: "0 20px 40px rgba(184,155,122,0.15), 0 0 0 1px rgba(255,255,255,0.8) inset",
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(249,244,239,0.95) 100%)",
            }}
          >
            {/* Elemento decorativo */}
            <div 
              className="absolute top-0 right-0 w-32 h-32 bg-opacity-10 rounded-full transform translate-x-16 -translate-y-16"
              style={{ backgroundColor: accentColor }}
            />

            <div className="relative z-10 text-center space-y-6">
              {/* Preço Original */}
              <p className="text-lg lg:text-xl font-semibold" style={{ color: textColor }}>
                De{" "}
                <span 
                  className="font-bold text-xl lg:text-2xl line-through"
                  style={{ color: accentColor }}
                >
                  {originalPrice}
                </span>{" "}
                por apenas:
              </p>

              {/* Preço Final */}
              <div className="space-y-2">
                <p 
                  className="text-4xl lg:text-5xl font-extrabold"
                  style={{
                    background: `linear-gradient(to right, ${accentColor}, #aa6b5d)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {finalPrice}
                </p>
                <p className="text-lg lg:text-xl font-bold text-green-600">
                  {paymentOptions}
                </p>
              </div>

              {/* Economia */}
              <div className="inline-flex items-center justify-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-bold text-green-600">
                  {discountText}
                </span>
              </div>
            </div>
          </div>

          {/* Alerta de Urgência */}
          <div className="mt-8">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-orange-700 text-sm">
                <Clock className="w-4 h-4 animate-pulse" />
                <span>Esta oferta expira quando você sair desta página</span>
              </div>
            </div>
          </div>

          {/* Botão CTA */}
          <div className="text-center">
            <Button
              onClick={handleCTAClick}
              className="group relative text-white font-bold py-6 px-8 sm:px-12 lg:px-16 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 w-full"
              style={{
                background: "linear-gradient(135deg, #4CAF50 0%, #43a047 50%, #388e3c 100%)",
                boxShadow: "0 20px 40px rgba(76, 175, 80, 0.3), 0 0 0 1px rgba(255,255,255,0.2) inset",
              }}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <span className="flex items-center justify-center gap-2 sm:gap-3">
                <ShoppingCart className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-transform duration-300 ${isButtonHovered ? 'scale-110' : ''}`} />
                <span className="leading-tight text-white font-bold">
                  {ctaText}
                </span>
                <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
              </span>

              {/* Efeito de brilho */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
            </Button>
          </div>
        </div>
      </AnimatedWrapper>
    </div>
  );
};

export default QuizOfferPricingInlineBlock;
