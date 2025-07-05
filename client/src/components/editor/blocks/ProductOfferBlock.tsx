import React from 'react';
import { InlineEditableText } from './InlineEditableText';
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
  onSaveInline?: (key: string) => (newValue: string) => void;
}

export const ProductOfferBlock: React.FC<ProductOfferBlockProps> = ({ 
  properties, 
  isSelected = false,
  onClick,
  onSaveInline
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
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
        
        <div className="p-6">
          {/* Nome do Produto */}
          {onSaveInline ? (
            <InlineEditableText
              tag="h3"
              value={productName}
              onSave={onSaveInline('productName')}
              className="text-xl font-bold text-[#432818] mb-4"
              placeholder="Nome do produto"
            />
          ) : (
            <h3 className="text-xl font-bold text-[#432818] mb-4">
              {productName}
            </h3>
          )}
          
          {/* Preços */}
          <div className="flex items-center space-x-3 mb-4">
            {onSaveInline ? (
              <>
                <InlineEditableText
                  tag="span"
                  value={originalPrice}
                  onSave={onSaveInline('originalPrice')}
                  className="text-sm text-gray-500 line-through"
                  placeholder="Preço original"
                />
                <InlineEditableText
                  tag="span"
                  value={discountPrice}
                  onSave={onSaveInline('discountPrice')}
                  className="text-2xl font-bold text-[#B89B7A]"
                  placeholder="Preço com desconto"
                />
              </>
            ) : (
              <>
                <span className="text-sm text-gray-500 line-through">
                  {originalPrice}
                </span>
                <span className="text-2xl font-bold text-[#B89B7A]">
                  {discountPrice}
                </span>
              </>
            )}
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
          <div className="w-full bg-[#B89B7A] hover:bg-[#a08965] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            {onSaveInline ? (
              <InlineEditableText
                tag="span"
                value={buttonText}
                onSave={onSaveInline('buttonText')}
                className="text-center text-white"
                placeholder="Texto do botão"
              />
            ) : (
              <span>{buttonText}</span>
            )}
          </div>
        </div>

        {/* Nota sobre edição via painel */}
        {isSelected && (
          <div className="p-3 bg-blue-50 border-t border-blue-200">
            <p className="text-xs text-blue-700">
              💡 Para editar os benefícios e URL, use o painel de propriedades à direita
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
