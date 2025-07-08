import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InlineEditableText } from './InlineEditableText';
import { Star, Quote, ChevronLeft, ChevronRight, Heart, Play, Users } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: string;
  name: string;
  text: string;
  image: string;
  rating: number;
  occupation?: string;
  location?: string;
  featured?: boolean;
  videoUrl?: string;
  style?: string;
  beforeAfter?: {
    before: string;
    after: string;
  };
}

interface TestimonialsBlockProps extends BlockComponentProps {
  block: {
    id: string;
    type: 'testimonials';
    properties: {
      title?: string;
      subtitle?: string;
      testimonials?: Testimonial[];
      layout?: 'grid' | 'carousel' | 'masonry' | 'featured';
      columns?: number;
      showRating?: boolean;
      showVideo?: boolean;
      autoplay?: boolean;
      backgroundColor?: string;
      cardStyle?: 'modern' | 'elegant' | 'minimal';
    };
  };
}

const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({ 
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const { 
    title = 'O que nossas clientes dizem',
    subtitle = 'Histórias reais de transformação e autoestima',
    testimonials = [
      { 
        id: 'test-1',
        name: 'Juliana Santos', 
        text: 'Depois do quiz, descobri que meu estilo é Romântico! Agora sei exatamente que peças escolher e me sinto muito mais feminina e confiante.',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
        rating: 5,
        occupation: 'Arquiteta',
        location: 'São Paulo',
        featured: true,
        style: 'Romântico'
      },
      { 
        id: 'test-2',
        name: 'Camila Rodrigues', 
        text: 'O resultado foi perfeito! Sou Contemporânea e finalmente entendi como misturar praticidade com estilo. Meu guarda-roupa faz muito mais sentido agora.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        rating: 5,
        occupation: 'Marketing',
        location: 'Rio de Janeiro',
        style: 'Contemporâneo'
      },
      { 
        id: 'test-3',
        name: 'Marina Oliveira', 
        text: 'Sempre me achei sem estilo, mas descobri que sou Natural! O quiz me mostrou como valorizar minha beleza de forma autêntica e sem esforço.',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        rating: 5,
        occupation: 'Professora',
        location: 'Belo Horizonte',
        style: 'Natural'
      },
      { 
        id: 'test-4',
        name: 'Beatriz Costa', 
        text: 'Eu tinha medo de ousar, mas descobri que meu estilo é Dramático! Agora uso peças mais marcantes e me sinto poderosa em cada look.',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
        rating: 5,
        occupation: 'Executiva',
        location: 'Porto Alegre',
        style: 'Dramático'
      }
    ],
    layout = 'grid',
    columns = 2,
    showRating = true,
    showVideo = false,
    autoplay = false,
    backgroundColor = '#ffffff',
    cardStyle = 'modern'
  } = block.properties;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'carousel':
        return 'flex overflow-hidden';
      case 'masonry':
        return 'columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6';
      case 'featured':
        return 'grid grid-cols-1 lg:grid-cols-3 gap-6';
      case 'grid':
      default:
        return `grid grid-cols-1 ${columns === 1 ? '' : columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6`;
    }
  };

  const getCardStyleClasses = () => {
    const baseClasses = 'h-full transition-all duration-300 group hover:shadow-lg';
    
    switch (cardStyle) {
      case 'elegant':
        return `${baseClasses} bg-white border border-[#B89B7A]/20 rounded-lg shadow-md hover:border-[#B89B7A]/40`;
      case 'minimal':
        return `${baseClasses} bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md`;
      case 'modern':
      default:
        return `${baseClasses} bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1`;
    }
  };

  const renderTestimonial = (testimonial: Testimonial, index: number) => (
    <motion.div
      key={testimonial.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        layout === 'masonry' && 'break-inside-avoid mb-6',
        layout === 'featured' && index === 0 && 'lg:col-span-2'
      )}
    >
      <Card className={getCardStyleClasses()}>
        <CardContent className="p-6 relative">
          {/* Quote decoration */}
          <div className="absolute top-4 left-4 opacity-20">
            <Quote className="w-8 h-8 text-[#B89B7A]" />
          </div>

          {/* Featured badge */}
          {testimonial.featured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-[#B89B7A] text-white">
                ⭐ Destaque
              </Badge>
            </div>
          )}

          {/* Testimonial content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#B89B7A]/20"
                  onError={(e) => {
                    e.currentTarget.src = `https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=64&h=64&fit=crop&crop=face`;
                  }}
                />
                
                {/* Video play button */}
                {showVideo && testimonial.videoUrl && (
                  <Button
                    size="sm"
                    className="absolute -bottom-1 -right-1 w-6 h-6 p-0 bg-[#B89B7A] hover:bg-[#A68A6A] rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPlayingVideo(testimonial.id);
                    }}
                  >
                    <Play className="w-3 h-3 text-white" />
                  </Button>
                )}
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-[#432818] mb-1">
                  {isEditing ? (
                    <InlineEditableText
                      value={testimonial.name}
                      onSave={(value: string) => {
                        const updatedTestimonials = testimonials.map((t: Testimonial) => 
                          t.id === testimonial.id ? { ...t, name: value } : t
                        );
                        handlePropertyChange('testimonials', updatedTestimonials);
                      }}
                      className="inline-block"
                      placeholder="Nome do cliente"
                      tag="span"
                    />
                  ) : (
                    testimonial.name
                  )}
                </h4>
                
                <div className="flex flex-col gap-1">
                  {testimonial.occupation && (
                    <p className="text-sm text-[#8F7A6A]">{testimonial.occupation}</p>
                  )}
                  
                  {testimonial.location && (
                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                  )}
                  
                  {testimonial.style && (
                    <Badge variant="outline" className="w-fit text-xs border-[#B89B7A] text-[#B89B7A]">
                      Estilo {testimonial.style}
                    </Badge>
                  )}
                </div>
                
                {/* Rating */}
                {showRating && (
                  <div className="flex items-center gap-1 mt-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star 
                        key={i} 
                        className={cn(
                          'w-4 h-4',
                          i < testimonial.rating 
                            ? 'text-yellow-500 fill-current' 
                            : 'text-gray-300'
                        )} 
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Testimonial text */}
            <blockquote className="text-[#432818] leading-relaxed mb-4 pl-4 border-l-4 border-[#B89B7A]/30">
              {isEditing ? (
                <InlineEditableText
                  value={`"${testimonial.text}"`}
                  onSave={(value: string) => {
                    const cleanText = value.replace(/^"|"$/g, '');
                    const updatedTestimonials = testimonials.map((t: Testimonial) => 
                      t.id === testimonial.id ? { ...t, text: cleanText } : t
                    );
                    handlePropertyChange('testimonials', updatedTestimonials);
                  }}
                  className="italic"
                  placeholder="Depoimento do cliente"
                  tag="span"
                />
              ) : (
                <span className="italic">"{testimonial.text}"</span>
              )}
            </blockquote>

            {/* Before/After images */}
            {testimonial.beforeAfter && (
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="relative">
                  <img 
                    src={testimonial.beforeAfter.before}
                    alt="Antes"
                    className="w-full h-20 object-cover rounded"
                  />
                  <span className="absolute bottom-1 left-1 bg-red-500 text-white text-xs px-1 rounded">
                    Antes
                  </span>
                </div>
                <div className="relative">
                  <img 
                    src={testimonial.beforeAfter.after}
                    alt="Depois"
                    className="w-full h-20 object-cover rounded"
                  />
                  <span className="absolute bottom-1 left-1 bg-green-500 text-white text-xs px-1 rounded">
                    Depois
                  </span>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-[#B89B7A]"
                onClick={(e) => {
                  e.stopPropagation();
                  // Like functionality
                }}
              >
                <Heart className="w-4 h-4 mr-1" />
                Útil
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (!testimonials || testimonials.length === 0) {
    return (
      <div
        className={cn(
          'bg-gray-100 p-8 rounded-lg text-gray-500 flex flex-col items-center justify-center min-h-[300px] cursor-pointer transition-all duration-200',
          isSelected 
            ? 'outline-2 outline-[#B89B7A] outline-offset-2' 
            : 'hover:shadow-sm',
          className
        )}
        onClick={onClick}
        data-block-id={block.id}
        data-block-type={block.type}
      >
        <Users className="w-12 h-12 mb-4 opacity-50" />
        <p className="text-center">Configure os depoimentos no painel de propriedades.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'py-12 px-4 cursor-pointer transition-all duration-200',
        isSelected 
          ? 'outline-2 outline-[#B89B7A] outline-offset-2' 
          : 'hover:shadow-sm',
        className
      )}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
      style={{ backgroundColor }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-[#432818] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <InlineEditableText
              value={title}
              onSave={(value: string) => handlePropertyChange('title', value)}
              className="inline-block"
              placeholder="Título dos depoimentos"
              tag="span"
            />
          </motion.h2>
          
          {subtitle && (
            <motion.p 
              className="text-lg text-[#8F7A6A] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <InlineEditableText
                value={subtitle}
                onSave={(value: string) => handlePropertyChange('subtitle', value)}
                className="inline-block"
                placeholder="Subtítulo dos depoimentos"
                tag="span"
              />
            </motion.p>
          )}
        </div>

        {/* Testimonials */}
        {layout === 'carousel' ? (
          <div className="relative">
            <div className="overflow-hidden rounded-lg">
              <motion.div 
                className="flex transition-transform duration-300"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    {renderTestimonial(testimonial, index)}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation */}
            <Button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              disabled={isEditing}
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </Button>
            
            <Button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              disabled={isEditing}
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </Button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    'w-3 h-3 rounded-full transition-all duration-200',
                    index === currentSlide 
                      ? 'bg-[#B89B7A] scale-110' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(index);
                  }}
                  disabled={isEditing}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className={getLayoutClasses()}>
            {testimonials.map((testimonial, index) => renderTestimonial(testimonial, index))}
          </div>
        )}

        {/* Stats */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-wrap justify-center gap-8 text-sm text-[#8F7A6A]">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              Avaliação média: 4.9/5
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              +2.847 clientes satisfeitas
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              98% recomendam
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setPlayingVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-2xl w-full aspect-video bg-black rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30"
                onClick={() => setPlayingVideo(null)}
              >
                ✕
              </Button>
              {/* Video player would go here */}
              <div className="w-full h-full flex items-center justify-center text-white">
                Vídeo depoimento carregando...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Debug info */}
      {isEditing && (
        <motion.div 
          className="mt-8 p-4 bg-[#FAF9F7] border border-[#B89B7A]/20 rounded-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-sm text-[#8F7A6A]">
            Modo de edição: {testimonials.length} depoimento(s) • 
            Layout: {layout} • 
            Colunas: {columns} • 
            Slide atual: {currentSlide + 1} • 
            Estilo: {cardStyle}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default TestimonialsBlock;
