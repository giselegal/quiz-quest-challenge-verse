import React from 'react';
import { cn } from '@/lib/utils';
import { ShoppingCart, ArrowRight, Lock, Shield } from 'lucide-react';

interface OfferCTABlockProps {
  block: {
    id: string;
    type: string;
    properties: {
      ctaText?: string;
      ctaUrl?: string;
      priceInstallments?: string;
      priceTotal?: string;
      discountText?: string;
      urgencyText?: string;
      trustElements?: Array<{
        icon: string;
        text: string;
      }>;
      showTrustElements?: boolean;
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

const OfferCTABlock: React.FC<OfferCTABlockProps> = ({
  block,
  isSelected,
  isEditing,
  onClick,
  className
}) => {
  const {
    ctaText = 'Garantir Minha Transformação',
    ctaUrl = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
    priceInstallments = '5x de R$ 8,83',
    priceTotal = 'R$ 39,90',
    discountText = '77% OFF - Economia de R$ 135,10',
    urgencyText = 'Oferta por tempo limitado',
    trustElements = [
      { icon: 'lock', text: '100% Seguro' },
      { icon: 'shield', text: '7 Dias Garantia' }
    ],
    showTrustElements = true,
    backgroundColor = '#ffffff',
    textColor = '#432818',
    buttonColor = '#4CAF50',
    buttonTextColor = '#ffffff'
  } = block.properties;

  const handleCTAClick = () => {
    if (ctaUrl) {
      window.open(ctaUrl, '_blank');
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'lock':
        return <Lock className="w-4 h-4" />;
      case 'shield':
        return <Shield className="w-4 h-4" />;
      default:
        return <Lock className="w-4 h-4" />;
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
      {/* CTA Section - Horizontal Layout */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Price Display */}
          <div className="text-center md:text-left">
            {/* Urgency Text */}
            <p className="text-sm text-orange-600 font-semibold mb-4">
              {urgencyText}
            </p>

            {/* Price Stack */}
            <div className="space-y-2 mb-6">
              <div>
                <span className="text-sm text-gray-600">Parcelamento: </span>
                <span className="text-2xl font-bold" style={{ color: buttonColor }}>
                  {priceInstallments}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-600">ou à vista: </span>
                <span className="text-3xl font-bold" style={{ color: buttonColor }}>
                  {priceTotal}
                </span>
              </div>
              <p className="text-sm text-green-600 font-semibold">
                {discountText}
              </p>
            </div>

            {/* Trust Elements */}
            {showTrustElements && (
              <div className="flex items-center justify-center md:justify-start space-x-6 text-sm text-gray-500">
                {trustElements.map((element, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    {getIcon(element.icon)}
                    <span>{element.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - CTA Button */}
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleCTAClick}
              className="w-full py-6 px-8 rounded-lg font-bold text-xl transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-3"
              style={{
                backgroundColor: buttonColor,
                color: buttonTextColor,
                boxShadow: `0 6px 20px ${buttonColor}30`
              }}
            >
              <ShoppingCart className="w-6 h-6" />
              <span>{ctaText}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Secondary Info */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Processamento seguro via Hotmart
              </p>
              <p className="text-xs text-gray-500">
                Acesso imediato após confirmação
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Guarantee Bar */}
        <div 
          className="mt-8 p-4 rounded-lg text-center"
          style={{ backgroundColor: `${buttonColor}10` }}
        >
          <p className="text-sm font-semibold" style={{ color: buttonColor }}>
            ✓ Garantia de 7 dias | ✓ Suporte especializado | ✓ Acesso vitalício
          </p>
        </div>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full"></div>
      )}
    </div>
  );
};

export default OfferCTABlock;
