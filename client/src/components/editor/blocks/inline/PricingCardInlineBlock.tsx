import React from 'react';
import { cn } from '@/lib/utils';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';

/**
 * PricingCardInlineBlock - Componente modular de preço
 * Mostra oferta de produto de forma compacta e independente
 */
const PricingCardInlineBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  onClick,
  className = ''
}) => {
  const {
    productTitle = 'Guia de Estilo',
    originalPrice = 'R$ 97,00',
    offerPrice = 'R$ 39,90',
    discount = '60% OFF',
    badge = 'OFERTA ESPECIAL',
    showBadge = true,
    cardStyle = 'standard' // standard, highlight, minimal
  } = block.properties;

  const styleClasses = {
    standard: 'bg-white border-[#B89B7A]/20',
    highlight: 'bg-gradient-to-br from-[#B89B7A]/10 to-[#A1835D]/5 border-[#B89B7A]/30',
    minimal: 'bg-gray-50 border-gray-200'
  };

  return (
    <div
      className={cn(
        // Layout inline responsivo
        'flex-shrink-0 w-full sm:w-72 md:w-80',
        // Visual baseado no estilo
        styleClasses[cardStyle as keyof typeof styleClasses],
        'rounded-xl border shadow-lg hover:shadow-xl',
        'p-6 transition-all duration-300',
        // Estados
        isSelected && 'ring-2 ring-blue-500',
        'cursor-pointer hover:scale-105',
        'relative overflow-hidden',
        className
      )}
      onClick={onClick}
    >
      {/* Badge flutuante */}
      {showBadge && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#B89B7A] to-[#A1835D] text-white text-xs font-bold px-3 py-1 rounded-full transform rotate-12 shadow-lg">
          {badge}
        </div>
      )}

      {/* Título do produto */}
      <h3 className="font-bold text-[#432818] text-lg mb-3 text-center">
        {productTitle}
      </h3>

      {/* Preços */}
      <div className="text-center mb-4">
        <p className="text-sm text-gray-500 line-through mb-1">
          De {originalPrice}
        </p>
        <p className="text-2xl font-bold text-[#B89B7A] mb-1">
          {offerPrice}
        </p>
        <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
          {discount}
        </span>
      </div>

      {/* CTA Button */}
      <button className="w-full bg-[#432818] hover:bg-[#5a3520] text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
        <ShoppingCart className="w-4 h-4" />
        <span>Quero Este Guia</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PricingCardInlineBlock;
