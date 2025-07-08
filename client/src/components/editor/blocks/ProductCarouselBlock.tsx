import React, { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { InlineEditableText } from './InlineEditableText';
import { ChevronLeft, ChevronRight, ShoppingCart, Star, Heart, Eye, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import type { BlockComponentProps } from '@/types/blocks';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category?: string;
  rating?: number;
  reviews?: number;
  features?: string[];
  isBestseller?: boolean;
  isNew?: boolean;
  ctaText?: string;
}

interface ProductCarouselBlockProps extends BlockComponentProps {
  block: {
    id: string;
    type: 'product-carousel';
    properties: {
      title?: string;
      subtitle?: string;
      products?: Product[];
      displayMode?: 'grid' | 'carousel' | 'masonry';
      slidesPerView?: number;
      showPrices?: boolean;
      showRatings?: boolean;
      showFeatures?: boolean;
      backgroundColor?: string;
      textColor?: string;
      cardStyle?: 'minimal' | 'elegant' | 'bold' | 'gradient';
      autoplay?: boolean;
      loop?: boolean;
    };
  };
}

const ProductCarouselBlock: React.FC<ProductCarouselBlockProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    title = 'Nossos Produtos Exclusivos',
    subtitle = 'Descubra produtos selecionados especialmente para o seu estilo',
    products = [
      {
        id: 'product-1',
        name: 'Guia Completo de Estilo Romântico',
        price: 197,
        originalPrice: 297,
        discount: 33,
        image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/product-guide-romantic.webp',
        category: 'Guias Digitais',
        rating: 4.9,
        reviews: 342,
        features: ['120+ looks inspiradores', 'Paleta de cores personalizada', 'Dicas de styling'],
        isBestseller: true,
        ctaText: 'Quero Descobrir'
      },
      {
        id: 'product-2',
        name: 'Consultoria de Estilo Personalizada',
        price: 497,
        originalPrice: 697,
        discount: 29,
        image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/product-consultation.webp',
        category: 'Serviços',
        rating: 5.0,
        reviews: 128,
        features: ['Análise completa do guarda-roupa', '2h de consultoria online', 'Plano de ação personalizado'],
        isNew: true,
        ctaText: 'Agendar Agora'
      }
    ],
    displayMode = 'carousel',
    slidesPerView = 2,
    showPrices = true,
    showRatings = true,
    showFeatures = true,
    backgroundColor = '#ffffff',
    textColor = '#432818',
    cardStyle = 'elegant',
    autoplay = false,
    loop = true
  } = block.properties;

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop,
    align: 'start',
    slidesToScroll: 1
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const getCardStyleClasses = () => {
    const baseClasses = 'relative overflow-hidden transition-all duration-300 hover:shadow-lg group';
    
    switch (cardStyle) {
      case 'minimal':
        return `${baseClasses} bg-white border border-gray-200 rounded-lg shadow-sm`;
      case 'bold':
        return `${baseClasses} bg-gradient-to-br from-[#B89B7A] to-[#A68A6A] text-white rounded-xl shadow-lg`;
      case 'gradient':
        return `${baseClasses} bg-gradient-to-br from-white to-[#FAF9F7] border border-[#B89B7A]/20 rounded-xl shadow-md`;
      case 'elegant':
      default:
        return `${baseClasses} bg-white border border-[#B89B7A]/20 rounded-lg shadow-md hover:shadow-xl hover:border-[#B89B7A]/40`;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const renderProduct = (product: Product, index: number) => (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={displayMode === 'carousel' ? 'flex-shrink-0 w-full' : 'w-full'}
    >
      <Card className={getCardStyleClasses()}>
        <CardContent className="p-0">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/400x400/cccccc/333333?text=Produto';
              }}
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isBestseller && (
                <Badge className="bg-[#B89B7A] text-white hover:bg-[#A68A6A]">
                  Mais Vendido
                </Badge>
              )}
              {product.isNew && (
                <Badge className="bg-green-500 text-white hover:bg-green-600">
                  Novo
                </Badge>
              )}
              {product.discount && (
                <Badge className="bg-red-500 text-white hover:bg-red-600">
                  -{product.discount}%
                </Badge>
              )}
            </div>

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                <Heart className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                <Eye className="w-4 h-4" />
              </Button>
            </div>

            {/* Overlay CTA */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button className="bg-white text-[#432818] hover:bg-gray-100">
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.ctaText || 'Ver Detalhes'}
              </Button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-3">
            {product.category && (
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
            )}

            <div>
              <h3 className="font-semibold text-lg line-clamp-2 mb-2">
                {product.name}
              </h3>

              {showRatings && product.rating && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} avaliações)
                  </span>
                </div>
              )}

              {showFeatures && product.features && product.features.length > 0 && (
                <ul className="text-sm text-gray-600 space-y-1 mb-3">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#B89B7A] rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              {showPrices && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-[#432818]">
                    R$ {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      R$ {product.originalPrice}
                    </span>
                  )}
                </div>
              )}
            </div>

            <Button className="w-full bg-[#B89B7A] hover:bg-[#A68A6A] text-white">
              {product.ctaText || 'Adicionar ao Carrinho'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (!products || products.length === 0) {
    return (
      <div
        className={`
          bg-gray-100 p-8 rounded-lg text-gray-500 flex flex-col items-center justify-center min-h-[400px] cursor-pointer transition-all duration-200
          ${isSelected 
            ? 'outline-2 outline-[#B89B7A] outline-offset-2' 
            : 'hover:shadow-sm'
          }
          ${className}
        `}
        onClick={onClick}
        data-block-id={block.id}
        data-block-type={block.type}
      >
        <ShoppingCart className="w-16 h-16 mb-4 opacity-50" />
        <p className="text-center text-lg font-medium mb-2">Nenhum produto configurado</p>
        <p className="text-center">Configure os produtos no painel de propriedades.</p>
      </div>
    );
  }

  return (
    <div
      className={`
        py-12 px-4 cursor-pointer transition-all duration-200 w-full
        ${isSelected 
          ? 'outline-2 outline-[#B89B7A] outline-offset-2' 
          : 'hover:shadow-sm'
        }
        ${className}
      `}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
      style={{ backgroundColor, color: textColor }}
    >
      {/* Header */}
      {title && (
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <InlineEditableText
              value={title}
              onSave={(value: string) => handlePropertyChange('title', value)}
              className="inline-block"
              placeholder="Título dos produtos"
              tag="h2"
            />
          </h2>
          {subtitle && (
            <p className="text-lg text-opacity-80 max-w-2xl mx-auto">
              <InlineEditableText
                value={subtitle}
                onSave={(value: string) => handlePropertyChange('subtitle', value)}
                className="inline-block"
                placeholder="Subtítulo dos produtos"
                tag="p"
              />
            </p>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {displayMode === 'carousel' ? (
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className={`flex-shrink-0 ${
                      slidesPerView === 1 ? 'w-full' :
                      slidesPerView === 2 ? 'w-1/2' :
                      slidesPerView === 3 ? 'w-1/3' :
                      'w-1/4'
                    }`}
                  >
                    {renderProduct(product, index)}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            {products.length > slidesPerView && (
              <>
                <Button
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollPrev();
                  }}
                  disabled={!canScrollPrev || isEditing}
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </Button>
                <Button
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollNext();
                  }}
                  disabled={!canScrollNext || isEditing}
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </Button>
              </>
            )}

            {/* Dots Navigation */}
            {products.length > slidesPerView && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: Math.ceil(products.length / slidesPerView) }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentSlide 
                        ? 'bg-[#B89B7A] scale-110' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      emblaApi?.scrollTo(index);
                    }}
                    disabled={isEditing}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className={`grid gap-6 ${
            displayMode === 'masonry' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
            slidesPerView === 1 ? 'grid-cols-1' :
            slidesPerView === 2 ? 'grid-cols-1 md:grid-cols-2' :
            slidesPerView === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }`}>
            {products.map((product, index) => renderProduct(product, index))}
          </div>
        )}
      </div>

      {isEditing && (
        <div className="mt-8 p-4 bg-[#FAF9F7] border border-[#B89B7A]/20 rounded-md">
          <p className="text-sm text-[#8F7A6A]">
            Modo de edição: {products.length} produto(s) • 
            Exibição: {displayMode} • 
            {displayMode === 'carousel' && `Slide atual: ${currentSlide + 1}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCarouselBlock;
