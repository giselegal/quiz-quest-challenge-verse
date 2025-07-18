import React, { useState, useEffect } from 'react';
import { Star, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import type { BlockComponentProps } from '@/types/blocks';

const QuizOfferTestimonialsBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    title = 'O que nossas clientes dizem',
    textColor = '#432818',
    backgroundColor = '#f9fafb',
    testimonials = [
      {
        name: 'Marina S.',
        text: 'Finalmente entendi meu estilo! Agora me visto com muito mais confiança.',
        rating: 5
      },
      {
        name: 'Juliana R.',
        text: 'O guia transformou completamente meu guarda-roupa. Vale cada centavo!',
        rating: 5
      },
      {
        name: 'Carla M.',
        text: 'Nunca pensei que descobrir meu estilo seria tão fácil e prático.',
        rating: 5
      }
    ],
    showStats = true,
    totalCustomers = '+10.000 mulheres transformadas',
    averageRating = '4.9/5 estrelas'
  } = block.properties;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  return (
    <div
      className={`
        w-full py-16 px-4 transition-all duration-200
        ${isSelected 
          ? 'ring-1 ring-gray-400/40 bg-gray-50/30' 
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
        <div className="max-w-xs sm:max-w-lg md:max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12" style={{ color: textColor }}>
            {title}
          </h3>
          
          {/* Carrossel para mobile */}
          <div className="flex md:hidden">
            <div className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-4 px-4 -mx-4 w-full">
              {testimonials.map((testimonial: any, index: number) => (
                <Card key={index} className="flex-none w-[85vw] sm:w-[80vw] snap-start shadow-lg border-0">
                  <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6 text-center gap-3 sm:gap-4">
                    <div className="flex justify-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 fill-current text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 italic">
                      "{testimonial.text}"
                    </p>
                    <p className="font-semibold" style={{ color: textColor }}>
                      {testimonial.name}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Indicador de scroll */}
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                {testimonials.map((_: any, index: number) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full bg-gray-300"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Layout desktop com Flexbox */}
          <div className="hidden md:flex md:flex-row md:flex-wrap md:justify-center lg:justify-between gap-6 lg:gap-8">
            {testimonials.map((testimonial: any, index: number) => (
              <Card key={index} className="flex-1 md:max-w-[calc(50%-12px)] lg:max-w-[calc(50%-16px)] shadow-lg border-0">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center gap-4">
                  <div className="flex justify-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold" style={{ color: textColor }}>
                    {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {showStats && (
            <div className="flex justify-center mt-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="text-sm sm:text-base">{totalCustomers}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 sm:w-5 h-4 sm:h-5 fill-current text-yellow-400" />
                  <span className="text-sm sm:text-base">{averageRating}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </AnimatedWrapper>
    </div>
  );
};

export default QuizOfferTestimonialsBlock;
