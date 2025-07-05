import React from 'react';
import { InlineEditableText } from './InlineEditableText';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  content: string;
  avatar?: string;
  rating?: number;
}

interface TestimonialsBlockProps {
  properties: {
    title?: string;
    testimonials?: Testimonial[];
    columns?: number;
    showRating?: boolean;
  };
  isSelected?: boolean;
  onClick?: () => void;
  onSaveInline?: (key: string) => (newValue: string) => void;
}

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({ 
  properties, 
  isSelected = false,
  onClick,
  onSaveInline
}) => {
  const { 
    title = 'O que nossos clientes dizem',
    testimonials = [
      { 
        name: 'Maria Silva', 
        content: 'Excelente produto! Recomendo a todos.',
        avatar: 'https://via.placeholder.com/60x60?text=MS',
        rating: 5
      },
      { 
        name: 'João Santos', 
        content: 'Mudou completamente minha vida. Muito obrigado!',
        avatar: 'https://via.placeholder.com/60x60?text=JS',
        rating: 5
      }
    ],
    columns = 2,
    showRating = true
  } = properties;

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div 
      className={`
        p-6 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-[#B89B7A]/40 hover:bg-[#FAF9F7]'
        }
      `}
      onClick={onClick}
    >
      {/* Título */}
      {onSaveInline ? (
        <InlineEditableText
          tag="h3"
          value={title}
          onSave={onSaveInline('title')}
          className="text-2xl font-bold text-[#432818] mb-8 text-center"
          placeholder="Título dos depoimentos"
        />
      ) : (
        <h3 className="text-2xl font-bold text-[#432818] mb-8 text-center">
          {title}
        </h3>
      )}

      {/* Grid de depoimentos */}
      <div className={`grid gap-6 ${gridCols[columns as keyof typeof gridCols]}`}>
        {testimonials.map((testimonial, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
          >
            {/* Rating */}
            {showRating && testimonial.rating && (
              <div className="flex items-center mb-3">
                {renderStars(testimonial.rating)}
              </div>
            )}

            {/* Conteúdo */}
            <blockquote className="text-gray-700 mb-4 italic">
              "{testimonial.content}"
            </blockquote>

            {/* Autor */}
            <div className="flex items-center">
              {testimonial.avatar && (
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-3 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <div>
                <cite className="font-medium text-[#432818] not-italic">
                  {testimonial.name}
                </cite>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nota sobre edição via painel */}
      {isSelected && (
        <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700">
            💡 Para editar os depoimentos, use o painel de propriedades à direita
          </p>
        </div>
      )}
    </div>
  );
};
