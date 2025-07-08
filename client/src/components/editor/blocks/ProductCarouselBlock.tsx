import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

interface ProductCarouselBlockProps {
  title?: string;
  products?: Array<{
    title: string;
    description: string;
    price: number;
    image: string;
    originalPrice?: number;
    badge?: string;
  }>;
  autoPlay?: boolean;
  showDots?: boolean;
  itemsPerView?: number;
  className?: string;
}

const ProductCarouselBlock: React.FC<ProductCarouselBlockProps> = ({
  title = 'Nossos Produtos',
  products = [
    {
      title: 'Análise Completa de Estilo',
      description: 'Descubra seu estilo pessoal único',
      price: 97,
      originalPrice: 197,
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
      badge: 'MAIS VENDIDO'
    },
    {
      title: 'Consultoria Premium',
      description: 'Consultoria individual personalizada',
      price: 297,
      originalPrice: 497,
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
      badge: 'PREMIUM'
    },
    {
      title: 'Curso Completo',
      description: 'Aprenda a montar looks incríveis',
      price: 197,
      originalPrice: 397,
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp'
    }
  ],
  autoPlay = true,
  showDots = true,
  itemsPerView = 3,
  className
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev === products.length - itemsPerView ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? products.length - itemsPerView : prev - 1
    );
  };

  // Auto play functionality
  useEffect(() => {
    if (autoPlay && products.length > itemsPerView) {
      const interval = setInterval(nextSlide, 4000);
      return () => clearInterval(interval);
    }
  }, [autoPlay, products.length, itemsPerView]);

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className={cn("py-12 bg-white", className)}>
      <div className="max-w-7xl mx-auto px-6">
        {title && (
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            {title}
          </h2>
        )}

        <div className="relative">
          {/* Products Grid/Carousel */}
          <div className="overflow-hidden">
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {products.map((product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden h-48 bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {product.badge}
                      </div>
                    )}
                  </div>

                  {/* Product Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {product.description}
                    </p>

                    {/* Pricing */}
                    <div className="flex items-center mb-4">
                      {product.originalPrice && (
                        <span className="text-gray-500 text-sm line-through mr-2">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-green-600">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    {/* Buy Button */}
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Adquirir Agora
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {products.length > itemsPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </>
          )}
        </div>

        {/* Dots Indicator */}
        {showDots && products.length > itemsPerView && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: products.length - itemsPerView + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  currentIndex === index ? "bg-blue-600" : "bg-gray-300"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCarouselBlock;