import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, ShoppingCart, Edit3 } from 'lucide-react';

interface CTAInlineBlockProps {
  text?: string;
  buttonText?: string;
  price?: string;
  showPrice?: boolean;
  onClick?: () => void;
  className?: string;
  onPropertyChange?: (key: string, value: any) => void;
  disabled?: boolean;
}

const CTAInlineBlock: React.FC<CTAInlineBlockProps> = ({
  text = 'Transforme seu estilo hoje',
  buttonText = 'Quero meu Guia',
  price = 'R$ 97,00',
  showPrice = true,
  onClick,
  className,
  onPropertyChange,
  disabled = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "inline-flex items-center gap-3 p-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-lg text-white",
        "transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer",
        "min-w-[320px] max-w-[480px] w-full",
        disabled && "opacity-75 cursor-not-allowed",
        className
      )}
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Shopping Icon */}
      <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
        <ShoppingCart className="w-5 h-5 text-white" />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <p 
          className="text-sm font-medium mb-1 truncate"
          onClick={(e) => {
            e.stopPropagation();
            if (onPropertyChange && !disabled) {
              const newText = prompt('Novo texto:', text);
              if (newText !== null) onPropertyChange('text', newText);
            }
          }}
        >
          {text}
        </p>
        
        <div className="flex items-center justify-between">
          <span 
            className="text-sm font-semibold truncate"
            onClick={(e) => {
              e.stopPropagation();
              if (onPropertyChange && !disabled) {
                const newButtonText = prompt('Novo texto do botão:', buttonText);
                if (newButtonText !== null) onPropertyChange('buttonText', newButtonText);
              }
            }}
          >
            {buttonText}
          </span>
          
          {showPrice && (
            <span 
              className="text-lg font-bold ml-2"
              onClick={(e) => {
                e.stopPropagation();
                if (onPropertyChange && !disabled) {
                  const newPrice = prompt('Novo preço:', price);
                  if (newPrice !== null) onPropertyChange('price', newPrice);
                }
              }}
            >
              {price}
            </span>
          )}
        </div>
      </div>
      
      {/* Arrow Icon */}
      <div className="flex-shrink-0">
        <ArrowRight 
          className={cn(
            "w-5 h-5 text-white transition-transform duration-200",
            isHovered && "translate-x-1"
          )} 
        />
      </div>
      
      {/* Edit indicator */}
      {!disabled && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Edit3 className="w-4 h-4 text-white/70" />
        </div>
      )}
    </div>
  );
};

export default CTAInlineBlock;