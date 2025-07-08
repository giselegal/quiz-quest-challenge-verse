import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { InlineEditableText } from './InlineEditableText';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Heart,
  MessageCircle,
  MapPin,
  CheckCircle,
  Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import type { BlockComponentProps } from '@/types/blocks';

interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  location?: string;
  occupation?: string;
  text: string;
  rating: number;
  date?: string;
  verified?: boolean;
  image?: string;
  video?: string;
  style?: string;
  transformation?: string;
}

interface TestimonialsBlockProps extends BlockComponentProps {
  block: {
    id: string;
    type: 'testimonials-grid';
    properties: {
      title?: string;
      subtitle?: string;
      testimonials?: Testimonial[];
      layout?: 'grid' | 'carousel' | 'masonry' | 'list';
      columns?: number;
      showRating?: boolean;
      showAvatar?: boolean;
      showLocation?: boolean;
      showDate?: boolean;
      cardStyle?: 'minimal' | 'elegant' | 'bold' | 'gradient';
      backgroundColor?: string;
      textColor?: string;
      autoplay?: boolean;
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
    subtitle = 'Veja as transformações e depoimentos de quem já descobriu seu estilo único',
    testimonials = [
      { 
        id: 'test-1',
        name: 'Juliana Santos',
        avatar: 'https://placehold.co/100x100/cccccc/333333?text=JS',
        location: 'São Paulo, SP',
        occupation: 'Empresária',
        text: 'Depois do quiz, descobri que meu estilo é Romântico! Agora sei exatamente que peças escolher e me sinto muito mais feminina e confiante.',
        rating: 5,
        date: '2024-01-15',
        verified: true,
        style: 'Romântico',
        transformation: 'Descobriu seu estilo e ganhou confiança'
      },
      { 
        id: 'test-2',
        name: 'Camila Rodrigues',
        avatar: 'https://placehold.co/100x100/cccccc/333333?text=CR',
        location: 'Rio de Janeiro, RJ',
        occupation: 'Designer',
        text: 'O resultado foi perfeito! Sou Contemporânea e finalmente entendi como misturar praticidade com estilo. Meu guarda-roupa faz muito mais sentido agora.',
        rating: 5,
        date: '2024-01-14',
        verified: true,
        style: 'Contemporâneo',
        transformation: 'Organizou o guarda-roupa e ganhou clareza'
      },
      { 
        id: 'test-3',
        name: 'Marina Oliveira',
        avatar: 'https://placehold.co/100x100/cccccc/333333?text=MO',
        location: 'Belo Horizonte, MG',
        occupation: 'Advogada',
        text: 'Sempre me achei sem estilo, mas descobri que sou Natural! O quiz me mostrou como valorizar minha beleza de forma autêntica e sem esforço.',
        rating: 5,
        date: '2024-01-13',
        verified: true,
        style: 'Natural',
        transformation: 'Descobriu sua autenticidade e beleza natural'
      },
      { 
        id: 'test-4',
        name: 'Beatriz Costa',
        avatar: 'https://placehold.co/100x100/cccccc/333333?text=BC',
        location: 'Brasília, DF',
        occupation: 'Consultora',
        text: 'Eu tinha medo de ousar, mas descobri que meu estilo é Dramático! Agora uso peças mais marcantes e me sinto poderosa em cada look.',
        rating: 5,
        date: '2024-01-12',
        verified: true,
        style: 'Dramático',
        transformation: 'Ganhou coragem para ousar e se expressar'
      }
    ],
    layout = 'grid',
    columns = 2,
    showRating = true,
    showAvatar = true,
    showLocation = true,
    showDate = false,
    cardStyle = 'elegant',
    backgroundColor = '#ffffff',
    textColor = '#432818',
    autoplay = false
  } = block.properties;

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1
  });
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const getCardStyleClasses = () => {
    const baseClasses = 'relative overflow-hidden transition-all duration-300 hover:shadow-lg group h-full';
    
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

  const renderTestimonial = (testimonial: Testimonial, index: number) => (
    <motion.div
      key={testimonial.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="w-full"
    >
      <Card className={getCardStyleClasses()}>
        <CardContent className="p-6 space-y-4">
          {/* Header with avatar and info */}
          <div className="flex items-start gap-4">
            {showAvatar && (
              <Avatar className="w-12 h-12 flex-shrink-0">
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback className="bg-[#B89B7A] text-white">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-gray-900 truncate">
                  {isEditing ? (
                    <InlineEditableText
                      value={testimonial.name}
                      onSave={(value: string) => {
                        const updatedTestimonials = testimonials.map((t, i) => 
                          i === index ? { ...t, name: value } : t
                        );
                        handlePropertyChange('testimonials', updatedTestimonials);
                      }}
                      className="font-semibold text-gray-900"
                      placeholder="Nome do cliente"
                      tag="span"
                    />
                  ) : (
                    testimonial.name
                  )}
                </h4>
                {testimonial.verified && (
                  <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                )}
              </div>
              
              {testimonial.occupation && (
                <p className="text-sm text-gray-600 mb-1">{testimonial.occupation}</p>
              )}
              
              {showLocation && testimonial.location && (
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                  <MapPin className="w-3 h-3" />
                  {testimonial.location}
                </div>
              )}

              {testimonial.style && (
                <Badge variant="outline" className="text-xs mb-2">
                  Estilo {testimonial.style}
                </Badge>
              )}
            </div>
            
            {showDate && testimonial.date && (
              <div className="text-xs text-gray-400">
                {new Date(testimonial.date).toLocaleDateString('pt-BR')}
              </div>
            )}
          </div>

          {/* Quote */}
          <div className="relative">
            <Quote className="absolute -top-2 -left-1 w-8 h-8 text-[#B89B7A] opacity-20" />
            <blockquote className="pl-6 italic text-gray-700 leading-relaxed">
              {isEditing ? (
                <InlineEditableText
                  value={`"${testimonial.text}"`}
                  onSave={(value: string) => {
                    const cleanText = value.replace(/^"|"$/g, '');
                    const updatedTestimonials = testimonials.map((t, i) => 
                      i === index ? { ...t, text: cleanText } : t
                    );
                    handlePropertyChange('testimonials', updatedTestimonials);
                  }}
                  className="italic text-gray-700"
                  placeholder="Depoimento do cliente"
                  tag="span"
                />
              ) : (
                `"${testimonial.text}"`
              )}
            </blockquote>
          </div>

          {/* Transformation highlight */}
          {testimonial.transformation && (
            <div className="bg-[#FAF9F7] p-3 rounded-lg border-l-4 border-[#B89B7A]">
              <p className="text-sm font-medium text-[#432818]">Transformação:</p>
              <p className="text-sm text-gray-600">{testimonial.transformation}</p>
            </div>
          )}

          {/* Rating */}
          {showRating && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {testimonial.rating}/5
                </span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-400">
                <button className="hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Media */}
          {(testimonial.image || testimonial.video) && (
            <div className="mt-4">
              {testimonial.video ? (
                <div className="relative bg-gray-100 rounded-lg h-32 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                  <Play className="w-8 h-8 text-gray-600" />
                  <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded">
                    Vídeo depoimento
                  </span>
                </div>
              ) : testimonial.image && (
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt="Transformação"
                    className="w-full h-32 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  if (!testimonials || testimonials.length === 0) {
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
        <Quote className="w-16 h-16 mb-4 opacity-50" />
        <p className="text-center text-lg font-medium mb-2">Nenhum depoimento configurado</p>
        <p className="text-center">Configure os depoimentos no painel de propriedades.</p>
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <InlineEditableText
                tag="h2"
                value={title}
                onSave={(value: string) => handlePropertyChange('title', value)}
                className="text-2xl font-bold text-[#432818] text-center"
                placeholder="Título dos depoimentos"
              />
            </h2>
            {subtitle && (
              <p className="text-lg text-opacity-80 max-w-3xl mx-auto">
                <InlineEditableText
                  value={subtitle}
                  onSave={(value: string) => handlePropertyChange('subtitle', value)}
                  className="inline-block"
                  placeholder="Subtítulo dos depoimentos"
                  tag="p"
                />
              </p>
            )}
          </div>
        )}
        
        {/* Content */}
        {layout === 'carousel' ? (
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`flex-shrink-0 ${
                      columns === 1 ? 'w-full' :
                      columns === 2 ? 'w-1/2' :
                      'w-1/3'
                    }`}
                  >
                    {renderTestimonial(testimonial, index)}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            {testimonials.length > columns && (
              <>
                <Button
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    emblaApi?.scrollPrev();
                  }}
                  disabled={isEditing}
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </Button>
                <Button
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    emblaApi?.scrollNext();
                  }}
                  disabled={isEditing}
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className={`grid gap-6 ${
            layout === 'masonry' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
            layout === 'list' ? 'grid-cols-1' :
            columns === 1 ? 'grid-cols-1' :
            columns === 2 ? 'grid-cols-1 md:grid-cols-2' :
            columns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
          }`}>
            {testimonials.map((testimonial, index) => renderTestimonial(testimonial, index))}
          </div>
        )}
      </div>

      {isEditing && (
        <div className="mt-8 p-4 bg-[#FAF9F7] border border-[#B89B7A]/20 rounded-md">
          <p className="text-sm text-[#8F7A6A]">
            Modo de edição: {testimonials.length} depoimento(s) • 
            Layout: {layout} • 
            Colunas: {columns} • 
            Estilo: {cardStyle}
          </p>
        </div>
      )}
    </div>
  );
};

export default TestimonialsBlock;
