import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, User, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import type { BlockComponentProps } from '@/types/blocks';

/**
 * TestimonialsInlineBlock - Bloco de depoimentos (modular)
 * Renderiza apenas a seção de depoimentos
 */
const TestimonialsInlineBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    title = 'O que nossas clientes dizem',
    testimonials = [
      {
        name: 'Marina Santos',
        text: 'Finalmente descobri meu estilo! Agora me visto com muito mais confiança e recebo elogios todos os dias.',
        rating: 5,
        profession: 'Advogada',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      {
        name: 'Juliana Rodrigues',
        text: 'O guia transformou completamente meu guarda-roupa. Agora sei exatamente o que comprar e como combinar.',
        rating: 5,
        profession: 'Empresária',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      },
      {
        name: 'Carla Mendes',
        text: 'Nunca pensei que descobrir meu estilo seria tão fácil e prático. Recomendo para todas as amigas!',
        rating: 5,
        profession: 'Designer',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face'
      }
    ],
    backgroundColor = '#ffffff',
    textColor = '#432818',
    accentColor = '#B89B7A',
    layout = 'grid', // 'grid' ou 'carousel'
    showRatings = true,
    showProfessions = true,
    // Propriedades de grid para responsividade
    gridColumns = 1,
    spacing = 'lg'
  } = block.properties;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Classes de espaçamento
  const spacingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12'
  };

  // Classes de grid baseadas na propriedade gridColumns
  const gridClasses = {
    1: 'w-full',
    2: 'w-full md:w-1/2'
  };

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div
      className={`
        ${gridClasses[gridColumns as keyof typeof gridClasses] || gridClasses[1]}
        ${spacingClasses[spacing as keyof typeof spacingClasses] || spacingClasses.lg}
        transition-all duration-200
        ${isSelected 
          ? 'ring-1 ring-blue-500 bg-blue-50/30' 
          : 'hover:shadow-sm'
        }
        ${className}
      `}
      style={{ backgroundColor }}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      <AnimatedWrapper show={isLoaded}>
        <div className="max-w-6xl mx-auto">
          {/* Título */}
          {title && (
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MessageSquare className="w-6 h-6" style={{ color: accentColor }} />
                <h3 className="text-2xl lg:text-3xl font-bold" style={{ color: textColor }}>
                  {title}
                </h3>
              </div>
              <div 
                className="w-24 h-1 mx-auto rounded-full"
                style={{
                  background: `linear-gradient(to right, ${accentColor}, #aa6b5d)`
                }}
              />
            </div>
          )}

          {/* Grid de Depoimentos */}
          <div className={`grid gap-8 ${
            layout === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {testimonials.map((testimonial: any, index: number) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  {/* Aspas decorativas */}
                  <div className="text-4xl opacity-20 mb-4" style={{ color: accentColor }}>
                    "
                  </div>

                  {/* Texto do depoimento */}
                  <p className="text-gray-700 leading-relaxed mb-6 italic">
                    {testimonial.text}
                  </p>

                  {/* Rating */}
                  {showRatings && testimonial.rating && (
                    <div className="flex justify-center mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                  )}

                  {/* Informações do cliente */}
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    {testimonial.image ? (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${accentColor}20` }}
                      >
                        <User className="w-6 h-6" style={{ color: accentColor }} />
                      </div>
                    )}

                    {/* Nome e profissão */}
                    <div>
                      <h4 className="font-semibold" style={{ color: textColor }}>
                        {testimonial.name}
                      </h4>
                      {showProfessions && testimonial.profession && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Briefcase className="w-3 h-3" />
                          <span>{testimonial.profession}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Estatística de satisfação */}
          <div className="mt-12 text-center">
            <div 
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2"
              style={{
                backgroundColor: `${accentColor}10`,
                borderColor: `${accentColor}30`
              }}
            >
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-semibold" style={{ color: textColor }}>
                97% das clientes recomendam
              </span>
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Baseado em mais de 1.500 avaliações
            </p>
          </div>
        </div>
      </AnimatedWrapper>
    </div>
  );
};

export default TestimonialsInlineBlock;
