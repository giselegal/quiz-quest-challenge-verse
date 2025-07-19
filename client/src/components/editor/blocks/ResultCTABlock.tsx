import React from 'react';
import { cn } from '@/lib/utils';
import { ShoppingCart, CheckCircle, Lock } from 'lucide-react';

interface ResultCTABlockProps {
  block: {
    id: string;
    type: string;
    properties: {
      mainTitle?: string;
      subtitle?: string;
      ctaText?: string;
      ctaUrl?: string;
      valueItems?: string[];
      priceOriginal?: string;
      priceDiscount?: string;
      priceCurrent?: string;
      showValueStack?: boolean;
      showSecureElements?: boolean;
      backgroundColor?: string;
      textColor?: string;
      buttonColor?: string;
      buttonTextColor?: string;
    };
  };
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
  className?: string;
}

const ResultCTABlock: React.FC<ResultCTABlockProps> = ({
  block,
  isSelected,
  isEditing,
  onClick,
  className
}) => {
  const {
    mainTitle = 'Vista-se de Você — na Prática',
    subtitle = 'Agora que você conhece seu estilo, é hora de aplicá-lo com clareza e intenção.',
    ctaText = 'Quero meu Guia de Estilo Agora',
    ctaUrl = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
    valueItems = [
      'Looks com intenção e identidade',
      'Cores, modelagens e tecidos a seu favor',
      'Imagem alinhada aos seus objetivos',
      'Guarda-roupa funcional, sem compras por impulso'
    ],
    priceOriginal = 'R$ 175,00',
    priceCurrent = 'R$ 39,00',
    showValueStack = true,
    showSecureElements = true,
    backgroundColor = '#f9f4ef',
    textColor = '#432818',
    buttonColor = '#4CAF50',
    buttonTextColor = '#ffffff'
  } = block.properties;

  const handleCTAClick = () => {
    if (ctaUrl) {
      window.open(ctaUrl, '_blank');
    }
  };

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
      {/* CTA Section - Mobile First Layout */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-4 md:p-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4" style={{ color: textColor, fontFamily: 'Playfair Display, serif' }}>
            {mainTitle}
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Value Proposition Grid - Mobile First */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 items-start mb-8">
          {/* Value Items */}
          {showValueStack && (
            <div className="space-y-4 sm:space-y-3 md:space-y-4 order-1">
              <h3 className="text-xl md:text-xl font-semibold" style={{ color: textColor }}>
                O que você vai receber:
              </h3>
              {valueItems.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 md:space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 md:w-5 md:h-5 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="h-3 w-3 md:h-3 md:w-3 text-white" />
                  </div>
                  <span className="text-base md:text-base text-gray-700 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* Price Stack */}
          <div className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-6 rounded-lg border border-gray-100 order-2">
            <div className="text-center">
              <h3 className="text-lg md:text-lg font-semibold mb-4 md:mb-4" style={{ color: textColor }}>
                Oferta Especial
              </h3>
              
              {/* Preço com desconto */}
              <div className="space-y-2 mb-6 md:mb-6">
                <div className="relative">
                  <span className="text-gray-500 text-lg md:text-lg line-through">
                    {priceOriginal}
                  </span>
                </div>
                <div>
                  <span className="text-3xl sm:text-2xl md:text-3xl font-bold" style={{ color: buttonColor }}>
                    {priceCurrent}
                  </span>
                </div>
                <p className="text-sm md:text-sm text-gray-600">Pagamento único</p>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleCTAClick}
                className="w-full py-4 sm:py-3 md:py-4 px-6 sm:px-4 md:px-6 rounded-lg font-semibold text-lg md:text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 mb-4"
                style={{
                  backgroundColor: buttonColor,
                  color: buttonTextColor,
                  boxShadow: `0 4px 14px ${buttonColor}40`
                }}
              >
                <ShoppingCart className="w-5 h-5 md:w-5 md:h-5" />
                <span className="text-base md:text-base font-semibold">{ctaText}</span>
              </button>

              {/* Security Elements */}
              {showSecureElements && (
                <div className="flex flex-row flex-wrap justify-center gap-3 sm:gap-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Lock className="w-4 h-4" />
                    <span>100% Seguro</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>7 Dias Garantia</span>
                  </div>
                </div>
              )}
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

export default ResultCTABlock;
