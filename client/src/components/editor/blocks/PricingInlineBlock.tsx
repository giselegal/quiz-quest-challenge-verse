import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Crown, Edit3 } from 'lucide-react';

interface PricingInlineBlockProps {
  title?: string;
  badge?: string;
  price?: string;
  originalPrice?: string;
  discount?: string;
  period?: string;
  isPopular?: boolean;
  onClick?: () => void;
  className?: string;
  onPropertyChange?: (key: string, value: any) => void;
  disabled?: boolean;
}

const PricingInlineBlock: React.FC<PricingInlineBlockProps> = ({
  title = 'Plano Premium',
  badge = 'Mais Popular',
  price = 'R$ 39,90',
  originalPrice = 'R$ 47,00',
  discount = '15% Off',
  period = 'à vista',
  isPopular = true,
  onClick,
  className,
  onPropertyChange,
  disabled = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      role="button"
      tabIndex={0}
      className={cn(
        "group/canvas-item inline-block cursor-pointer hover:opacity-75 transition-all ease-in-out",
        "min-w-[280px] max-w-[350px] w-full",
        "min-h-[1.25rem] relative border border-zinc-200 rounded-md bg-transparent",
        "hover:border-2 hover:border-blue-500",
        isHovered && "border-2 border-blue-500",
        disabled && "opacity-75 cursor-not-allowed",
        className
      )}
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="w-full h-fit p-2 bg-[#B89B7A] flex items-center justify-center rounded-t-md">
          <p 
            className="text-sm font-bold text-white cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (onPropertyChange && !disabled) {
                const newBadge = prompt('Novo texto do badge:', badge);
                if (newBadge !== null) onPropertyChange('badge', newBadge);
              }
            }}
          >
            {badge}
          </p>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full h-auto flex flex-row justify-between items-center p-4">
        {/* Title Section */}
        <div className="w-auto h-auto flex flex-row justify-start items-start gap-2">
          <Crown className="w-5 h-5 text-[#B89B7A] mt-1" />
          <h3 
            className="text-xl font-bold text-[#432818] cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (onPropertyChange && !disabled) {
                const newTitle = prompt('Novo título:', title);
                if (newTitle !== null) onPropertyChange('title', newTitle);
              }
            }}
          >
            {title}
          </h3>
        </div>

        {/* Price Section */}
        <div className="w-auto h-fit p-3 flex-col items-start justify-start bg-[#B89B7A]/10 rounded-md border-none">
          <div 
            className="text-xs font-light w-full h-auto text-left leading-4 text-[#aa6b5d] cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (onPropertyChange && !disabled) {
                const newDiscount = prompt('Novo desconto:', discount);
                if (newDiscount !== null) onPropertyChange('discount', newDiscount);
              }
            }}
          >
            {discount}
          </div>
          <div 
            className="text-2xl font-bold w-full h-auto text-center leading-none text-[#432818] cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (onPropertyChange && !disabled) {
                const newPrice = prompt('Novo preço:', price);
                if (newPrice !== null) onPropertyChange('price', newPrice);
              }
            }}
          >
            {price}
          </div>
          <div 
            className="text-xs font-light w-full h-auto text-right text-[#8F7A6A] cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (onPropertyChange && !disabled) {
                const newPeriod = prompt('Novo período:', period);
                if (newPeriod !== null) onPropertyChange('period', newPeriod);
              }
            }}
          >
            {period}
          </div>
          {originalPrice && (
            <div 
              className="text-xs text-gray-500 line-through text-center w-full mt-1 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (onPropertyChange && !disabled) {
                  const newOriginalPrice = prompt('Preço original:', originalPrice);
                  if (newOriginalPrice !== null) onPropertyChange('originalPrice', newOriginalPrice);
                }
              }}
            >
              {originalPrice}
            </div>
          )}
        </div>
      </div>

      {/* Edit indicator */}
      {!disabled && (
        <div className="absolute top-2 right-2 opacity-0 group-hover/canvas-item:opacity-100 transition-opacity">
          <Edit3 className="w-4 h-4 text-blue-500" />
        </div>
      )}
    </div>
  );
};

export default PricingInlineBlock;