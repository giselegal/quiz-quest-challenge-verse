
import React from 'react';
import { InlineEditableText } from './InlineEditableText';
import { DollarSign, TrendingUp } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';

interface DynamicPricingBlockProps extends BlockComponentProps {
  originalPrice?: number;
  currentPrice?: number;
  currency?: string;
  discountLabel?: string;
  priceLabel?: string;
}

const DynamicPricingBlock: React.FC<DynamicPricingBlockProps> = ({
  block,
  originalPrice = 197,
  currentPrice = 97,
  currency = 'R$',
  discountLabel = 'Oferta Especial',
  priceLabel = 'Apenas hoje',
  isSelected = false,
  onClick,
  className = ''
}) => {
  const {
    originalPrice: blockOriginalPrice = originalPrice,
    currentPrice: blockCurrentPrice = currentPrice,
    currency: blockCurrency = currency,
    discountLabel: blockDiscountLabel = discountLabel,
    priceLabel: blockPriceLabel = priceLabel
  } = block.properties;

  const handlePropertyChange = (key: string, value: any) => {
    // This would be handled by the parent component
    console.log('Property change:', key, value);
  };

  const discountPercentage = Math.round(((blockOriginalPrice - blockCurrentPrice) / blockOriginalPrice) * 100);

  return (
    <div
      className={`
        bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 text-center cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'ring-1 ring-gray-400/40 bg-gray-50/30' 
          : 'hover:shadow-lg hover:from-green-100 hover:to-emerald-100'
        }
        ${className}
      `}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      <div className="flex items-center justify-center gap-2 mb-3">
        <TrendingUp className="w-5 h-5 text-green-600" />
        <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">
          <InlineEditableText
            value={blockDiscountLabel}
            onChange={(value: string) => handlePropertyChange('discountLabel', value)}
            className="inline-block"
            placeholder="Rótulo do desconto"
          />
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2">
          <span className="text-lg text-gray-500 line-through">
            {blockCurrency} {blockOriginalPrice}
          </span>
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-bold">
            -{discountPercentage}%
          </span>
        </div>
        
        <div className="flex items-center justify-center gap-2">
          <DollarSign className="w-6 h-6 text-green-600" />
          <span className="text-3xl font-bold text-green-600">
            {blockCurrency} {blockCurrentPrice}
          </span>
        </div>
        
        <p className="text-sm text-gray-600">
          <InlineEditableText
            value={blockPriceLabel}
            onChange={(value: string) => handlePropertyChange('priceLabel', value)}
            className="inline-block"
            placeholder="Rótulo do preço"
          />
        </p>
      </div>
    </div>
  );
};

export default DynamicPricingBlock;
