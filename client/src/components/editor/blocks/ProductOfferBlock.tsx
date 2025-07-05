import React from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { InlineEditableText } from './InlineEditableText';
import type { BlockComponentProps } from '@/types/blocks';

const ProductOfferBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const { 
    productName = 'Produto Incrível',
    productImage = '',
    originalPrice = 'R$ 297,00',
    discountPrice = 'R$ 197,00',
    buttonText = 'ADQUIRIR AGORA',
    buttonUrl = '',
    features = []
  } = block.properties;

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  return (
    <div 
      className={`
        p-6 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-[#B89B7A]/40 hover:bg-[#FAF9F7]'
        }
        ${className}
      `}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
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
          <InlineEditableText
            value={productName}
            onSave={(value: string) => handlePropertyChange('productName', value)}
            className="text-xl font-bold text-[#432818] mb-4"
            placeholder="Nome do produto"
            tag="h3"
          />
          
          {/* Preços */}
          <div className="flex items-center space-x-3 mb-4">
            <InlineEditableText
              value={originalPrice}
              onSave={(value: string) => handlePropertyChange('originalPrice', value)}
              className="text-sm text-gray-500 line-through"
              placeholder="Preço original"
              tag="span"
            />
            <InlineEditableText
              value={discountPrice}
              onSave={(value: string) => handlePropertyChange('discountPrice', value)}
              className="text-2xl font-bold text-[#B89B7A]"
              placeholder="Preço com desconto"
              tag="span"
            />
          </div>
          
          {/* Benefícios */}
          {features.length > 0 && (
            <div className="space-y-2 mb-6">
              {features.map((feature: any, index: number) => (
                <div key={index} className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {isEditing ? (
                    <InlineEditableText
                      value={feature.text}
                      onSave={(value: string) => {
                        const updatedFeatures = features.map((feat: any, i: number) => 
                          i === index ? { ...feat, text: value } : feat
                        );
                        handlePropertyChange('features', updatedFeatures);
                      }}
                      className="text-sm text-gray-700"
                      placeholder="Benefício do produto"
                      tag="span"
                    />
                  ) : (
                    <span className="text-sm text-gray-700">{feature.text}</span>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Botão */}
          <button 
            className="w-full bg-[#B89B7A] hover:bg-[#a08965] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <InlineEditableText
              value={buttonText}
              onSave={(value: string) => handlePropertyChange('buttonText', value)}
              className="text-white font-bold"
              placeholder="Texto do botão"
              tag="span"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductOfferBlock;
