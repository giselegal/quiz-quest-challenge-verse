import React from 'react';
import { ShoppingCart, Check } from 'lucide-react';

interface ProductOfferBlockProps {
  properties: {
    productName?: string;
    productImage?: string;
    originalPrice?: string;
    discountPrice?: string;
    buttonText?: string;
    buttonUrl?: string;
    features?: Array<{ text: string }>;
  };
  isSelected?: boolean;
  onClick?: () => void;
}

export const ProductOfferBlock: React.FC<ProductOfferBlockProps> = ({ 
  properties, 
  isSelected = false,
  onClick 
}) => {
  const { 
    productName = 'Produto Incrível',
    productImage,
    originalPrice = 'R$ 297,00',
    discountPrice = 'R$ 197,00',
    buttonText = 'ADQUIRIR AGORA',
    buttonUrl,
    features = []
  } = properties;

  return (
    <div 
      className={`
        p-6 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-[#B89B7A]/40 hover:bg-[#FAF9F7]'
        }
      `}
      onClick={onClick}
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Imagem do Produto */}
        {productImage && (
          <div className="aspect-video bg-gray-100">
            <img 
              src={productImage} 
              alt={productName}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-6">
          {/* Nome do Produto */}
          <h3 className="text-xl font-bold text-[#432818] mb-4">
            {productName}
          </h3>
          
          {/* Preços */}
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-sm text-gray-500 line-through">
              {originalPrice}
            </span>
            <span className="text-2xl font-bold text-[#B89B7A]">
              {discountPrice}
            </span>
          </div>
          
          {/* Benefícios */}
          {features.length > 0 && (
            <div className="space-y-2 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Botão */}
          <button 
            className="w-full bg-[#B89B7A] hover:bg-[#a08965] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>{buttonText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
