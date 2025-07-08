
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';

interface ProductCarouselBlockProps extends BlockComponentProps {
  block: {
    id: string;
    type: 'product-carousel';
    properties: {
      title?: string;
      subtitle?: string;
      products: Array<{
        id: string;
        name: string;
        description: string;
        price: string;
        originalPrice?: string;
        discount?: string;
        image: string;
        rating?: number;
        reviews?: number;
        features?: string[];
        ctaText?: string;
        ctaUrl?: string;
      }>;
      showArrows?: boolean;
      showDots?: boolean;
      autoplay?: boolean;
      autoplayInterval?: number;
      itemsPerView?: number;
      gap?: number;
      backgroundColor?: string;
      textColor?: string;
    };
  };
}

const ProductCarouselBlock: React.FC<ProductCarouselBlockProps> = ({
  block,
  isSelected = false,
  onClick,
  className = ''
}) => {
  const {
    title = 'Nossos Produtos',
    subtitle = '',
    products = [],
    showArrows = true,
    showDots = true,
    autoplay = false,
    autoplayInterval = 5000,
    itemsPerView = 3,
    gap = 20,
    backgroundColor = '#ffffff',
    textColor = '#374151'
  } = block.properties;

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev >= products.length - itemsPerView ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev <= 0 ? products.length - itemsPerView : prev - 1
    );
  };

  const getResponsiveItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
    }
    return itemsPerView;
  };

  const responsiveItems = getResponsiveItemsPerView();

  React.useEffect(() => {
    if (autoplay) {
      const interval = setInterval(nextSlide, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayInterval]);

  return (
    <div 
      className={`
        w-full p-6 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-[#B89B7A]/40 hover:bg-[#FAF9F7]'
        }
        ${className}
      `}
      style={{ backgroundColor, color: textColor }}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: textColor }}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        {/* Products Grid */}
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / responsiveItems)}%)`,
            gap: `${gap}px`
          }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              style={{ 
                width: `calc(${100 / responsiveItems}% - ${gap * (responsiveItems - 1) / responsiveItems}px)`
              }}
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                    {product.discount}
                  </div>
                )}
              </div>

              {/* Product Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < product.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    {product.reviews && (
                      <span className="ml-2 text-sm text-gray-500">
                        ({product.reviews} avaliações)
                      </span>
                    )}
                  </div>
                )}

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <ul className="mb-4">
                    {product.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-center mb-1">
                        <span className="w-1.5 h-1.5 bg-[#B89B7A] rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-[#B89B7A]">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                {product.ctaText && (
                  <button
                    className="w-full bg-[#B89B7A] hover:bg-[#8F7A6A] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (product.ctaUrl) {
                        window.open(product.ctaUrl, '_blank');
                      }
                    }}
                  >
                    {product.ctaText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {showArrows && products.length > responsiveItems && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {showDots && products.length > responsiveItems && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: Math.ceil(products.length - responsiveItems + 1) }).map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex ? 'bg-[#B89B7A]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCarouselBlock;
