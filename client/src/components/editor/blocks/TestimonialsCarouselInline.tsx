import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import InlineBaseWrapper from './base/InlineBaseWrapper';
import InlineEditableText from './base/InlineEditableText';
import type { BlockComponentProps } from '@/types/blocks';
import { 
  getPersonalizedText, 
  trackComponentView, 
  trackComponentClick,
  RESPONSIVE_PATTERNS,
  INLINE_ANIMATIONS
} from '@/utils/inlineComponentUtils';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Quote,
  User,
  Play,
  Pause
} from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
  verified?: boolean;
}

const TestimonialsCarouselInline: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  onPropertyChange,
  className = ''
}) => {
  const {
    testimonials = [
      {
        id: '1',
        name: 'Maria Silva',
        role: 'Empresária',
        content: 'Mudou completamente minha vida! Recomendo para todas as mulheres.',
        rating: 5,
        verified: true
      },
      {
        id: '2', 
        name: 'Ana Costa',
        role: 'Designer',
        content: 'Resultados incríveis em poucos dias. Superou todas as expectativas.',
        rating: 5,
        verified: true
      },
      {
        id: '3',
        name: 'Julia Santos',
        role: 'Consultora',
        content: 'O melhor investimento que já fiz. Vale cada centavo!',
        rating: 5,
        verified: true
      }
    ],
    autoPlay = true,
    autoPlaySpeed = 5000,
    showRating = true,
    showAvatar = true,
    showVerified = true,
    carouselStyle = 'modern',
    useUsername = false,
    usernamePattern = 'Como {{username}}, elas também tiveram sucesso!',
    trackingEnabled = false,
    animation = 'slideInFromLeft',
    theme = 'primary'
  } = block.properties;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isHovered, setIsHovered] = useState(false);

  // Get username from context (placeholder)
  const username = 'Usuário';

  useEffect(() => {
    if (trackingEnabled) {
      trackComponentView(block.id, 'testimonials-carousel-inline');
    }
  }, [trackingEnabled, block.id]);

  useEffect(() => {
    if (isPlaying && !isHovered && testimonials.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, autoPlaySpeed);
      
      return () => clearInterval(timer);
    }
  }, [isPlaying, isHovered, testimonials.length, autoPlaySpeed]);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const handleNext = () => {
    if (trackingEnabled) {
      trackComponentClick(block.id, 'testimonials-carousel-inline', 'next_testimonial');
    }
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    if (trackingEnabled) {
      trackComponentClick(block.id, 'testimonials-carousel-inline', 'prev_testimonial');
    }
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    if (trackingEnabled) {
      trackComponentClick(block.id, 'testimonials-carousel-inline', 'select_testimonial');
    }
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentTestimonial = testimonials[currentIndex] || testimonials[0];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={cn(
          "w-4 h-4",
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        )} 
      />
    ));
  };

  const personalizedTitle = getPersonalizedText(
    'Depoimentos de Clientes',
    usernamePattern,
    username,
    useUsername
  );

  return (
    <InlineBaseWrapper
      block={block}
      isSelected={isSelected}
      onPropertyChange={onPropertyChange}
      className={cn(className, INLINE_ANIMATIONS[animation as keyof typeof INLINE_ANIMATIONS])}
      minHeight="6rem"
      editLabel="Editar Depoimentos"
    >
      <div 
        className="w-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header com controles */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex-1">
            <InlineEditableText
              value={personalizedTitle}
              onChange={(value) => handlePropertyChange('title', value)}
              placeholder="Título dos depoimentos..."
              fontSize="lg"
              fontWeight="semibold"
              className="text-gray-800"
            />
          </div>
          
          <div className="flex items-center gap-2">
            {/* Play/Pause Button */}
            {testimonials.length > 1 && (
              <button
                onClick={togglePlayPause}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </button>
            )}
            
            {/* Navigation */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Main Testimonial Content */}
        <div className="p-6">
          <div className="flex items-start gap-4">
            {/* Quote Icon */}
            <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
              <Quote className="w-4 h-4 text-blue-600" />
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Rating */}
              {showRating && (
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(currentTestimonial.rating)}
                </div>
              )}
              
              {/* Testimonial Text */}
              <InlineEditableText
                value={currentTestimonial.content}
                onChange={(value) => {
                  const updatedTestimonials = [...testimonials];
                  updatedTestimonials[currentIndex] = {
                    ...updatedTestimonials[currentIndex],
                    content: value
                  };
                  handlePropertyChange('testimonials', updatedTestimonials);
                }}
                placeholder="Conteúdo do depoimento..."
                fontSize="base"
                multiline={true}
                maxLines={3}
                className="text-gray-700 leading-relaxed mb-4"
              />
              
              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                {showAvatar && (
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    {currentTestimonial.avatar ? (
                      <img 
                        src={currentTestimonial.avatar} 
                        alt={currentTestimonial.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                )}
                
                {/* Name and Role */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <InlineEditableText
                      value={currentTestimonial.name}
                      onChange={(value) => {
                        const updatedTestimonials = [...testimonials];
                        updatedTestimonials[currentIndex] = {
                          ...updatedTestimonials[currentIndex],
                          name: value
                        };
                        handlePropertyChange('testimonials', updatedTestimonials);
                      }}
                      placeholder="Nome..."
                      fontSize="sm"
                      fontWeight="semibold"
                      className="text-gray-900"
                    />
                    
                    {showVerified && currentTestimonial.verified && (
                      <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        ✓ Verificado
                      </div>
                    )}
                  </div>
                  
                  <InlineEditableText
                    value={currentTestimonial.role}
                    onChange={(value) => {
                      const updatedTestimonials = [...testimonials];
                      updatedTestimonials[currentIndex] = {
                        ...updatedTestimonials[currentIndex],
                        role: value
                      };
                      handlePropertyChange('testimonials', updatedTestimonials);
                    }}
                    placeholder="Profissão/Cargo..."
                    fontSize="xs"
                    className="text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots Navigation */}
        {testimonials.length > 1 && (
          <div className="px-6 pb-4 flex items-center justify-center gap-2">
            {testimonials.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex 
                    ? "bg-blue-600 w-6" 
                    : "bg-gray-300 hover:bg-gray-400"
                )}
              />
            ))}
          </div>
        )}

        {/* Progress Bar (for auto-play) */}
        {isPlaying && testimonials.length > 1 && (
          <div className="h-1 bg-gray-100">
            <div 
              className="h-full bg-blue-600 transition-all duration-100 ease-linear"
              style={{
                width: `${((Date.now() % autoPlaySpeed) / autoPlaySpeed) * 100}%`
              }}
            />
          </div>
        )}
      </div>
    </InlineBaseWrapper>
  );
};

export default TestimonialsCarouselInline;
