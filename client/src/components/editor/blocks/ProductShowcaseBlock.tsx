import React from 'react';
import { cn } from '@/lib/utils';

interface ProductShowcaseBlockProps {
  block: {
    id: string;
    type: string;
    properties: {
      mainTitle?: string;
      subtitle?: string;
      products?: Array<{
        image: string;
        title: string;
        description: string;
        value?: string;
      }>;
      layout?: 'grid' | 'horizontal';
      showValues?: boolean;
      backgroundColor?: string;
      textColor?: string;
      accentColor?: string;
    };
  };
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
  className?: string;
}

const ProductShowcaseBlock: React.FC<ProductShowcaseBlockProps> = ({
  block,
  isSelected,
  isEditing,
  onClick,
  className
}) => {
  const {
    mainTitle = 'Transformação Completa',
    subtitle = 'Tudo que você precisa para descobrir e aplicar seu estilo',
    products = [
      {
        image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp',
        title: 'Guia Personalizado',
        description: 'Para seu estilo específico',
        value: 'R$ 67,00'
      },
      {
        image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp',
        title: 'Bônus: Peças-Chave',
        description: 'Guarda-roupa funcional',
        value: 'R$ 79,00'
      },
      {
        image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp',
        title: 'Bônus: Visagismo',
        description: 'Valorize seus traços',
        value: 'R$ 29,00'
      }
    ],
    layout = 'horizontal',
    showValues = true,
    backgroundColor = '#ffffff',
    textColor = '#432818',
    accentColor = '#B89B7A'
  } = block.properties;

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
      {/* Product Showcase Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 
            className="text-3xl font-bold mb-4"
            style={{ 
              color: textColor,
              fontFamily: 'Playfair Display, serif' 
            }}
          >
            {mainTitle}
          </h2>
          <p className="text-lg text-gray-600">
            {subtitle}
          </p>
        </div>

        {/* Products Grid - Horizontal Layout */}
        <div className={cn(
          'gap-6 items-start',
          layout === 'horizontal' ? 'flex overflow-x-auto space-x-6' : 'grid grid-cols-1 md:grid-cols-3'
        )}>
          {products.map((product, index) => (
            <div 
              key={index}
              className={cn(
                'bg-gray-50 rounded-lg p-6 text-center transition-all duration-200 hover:shadow-lg',
                layout === 'horizontal' ? 'flex-none w-80' : 'w-full'
              )}
            >
              {/* Product Image */}
              <div className="aspect-[4/5] bg-white rounded-lg mb-4 flex items-center justify-center overflow-hidden shadow-sm border border-gray-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 
                  className="text-xl font-semibold"
                  style={{ color: textColor }}
                >
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {product.description}
                </p>
                
                {/* Value */}
                {showValues && product.value && (
                  <div 
                    className="text-lg font-bold mt-3"
                    style={{ color: accentColor }}
                  >
                    {product.value}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Total Value - Horizontal Display */}
        {showValues && (
          <div className="mt-8 bg-gradient-to-r from-gray-50 to-white p-6 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Valor Total</p>
                  <p className="text-2xl font-bold text-gray-500 line-through">R$ 175,00</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Hoje por apenas</p>
                  <p 
                    className="text-4xl font-bold"
                    style={{ color: accentColor }}
                  >
                    R$ 39,00
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Economia</p>
                  <p className="text-xl font-semibold text-green-600">R$ 136,00</p>
                </div>
              </div>
              
              <div 
                className="px-6 py-3 rounded-full text-white font-semibold"
                style={{ backgroundColor: accentColor }}
              >
                77% OFF
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full"></div>
      )}
    </div>
  );
};

export default ProductShowcaseBlock;
