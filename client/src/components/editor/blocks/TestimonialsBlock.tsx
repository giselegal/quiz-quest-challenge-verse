import React from 'react';
import { InlineEditableText } from './InlineEditableText';
import { Star } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';

const TestimonialsBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const { 
    title = 'O que nossos clientes dizem',
    testimonials = [
      { 
        name: 'Maria Silva', 
        text: 'O quiz me ajudou a entender melhor meu estilo! Agora me visto com muito mais confiança.',
        image: 'https://via.placeholder.com/80x80?text=MS',
        rating: 5
      },
      { 
        name: 'Ana Costa', 
        text: 'Incrível! Descobri cores e estilos que nunca imaginei que ficassem bem em mim.',
        image: 'https://via.placeholder.com/80x80?text=AC',
        rating: 5
      }
    ],
    columns = 2
  } = block.properties;

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

  return (
    <div 
      className={`
        p-6 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-[#B89B7A]/40 hover:bg-[#FAF9F7]'
        }
        ${className}
      `}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      <div className="max-w-6xl mx-auto">
        <InlineEditableText
          tag="h3"
          value={title}
          onSave={(value: string) => handlePropertyChange('title', value)}
          className="text-2xl font-bold text-[#432818] text-center mb-8"
          placeholder="Título dos depoimentos"
        />
        
        <div className={`grid gap-6 ${columns === 1 ? 'grid-cols-1' : columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {testimonials.map((testimonial: any, index: number) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/48x48?text=${testimonial.name.charAt(0)}`;
                  }}
                />
                <div>
                  {isEditing ? (
                    <InlineEditableText
                      value={testimonial.name}
                      onSave={(value: string) => {
                        const updatedTestimonials = testimonials.map((t: any, i: number) => 
                          i === index ? { ...t, name: value } : t
                        );
                        handlePropertyChange('testimonials', updatedTestimonials);
                      }}
                      className="font-semibold text-[#432818]"
                      placeholder="Nome do cliente"
                      tag="h4"
                    />
                  ) : (
                    <h4 className="font-semibold text-[#432818]">{testimonial.name}</h4>
                  )}
                  <div className="flex space-x-1 mt-1">
                    {renderStars(testimonial.rating || 5)}
                  </div>
                </div>
              </div>
              {isEditing ? (
                <InlineEditableText
                  value={`"${testimonial.text}"`}
                  onSave={(value: string) => {
                    const cleanText = value.replace(/^"|"$/g, ''); // Remove aspas
                    const updatedTestimonials = testimonials.map((t: any, i: number) => 
                      i === index ? { ...t, text: cleanText } : t
                    );
                    handlePropertyChange('testimonials', updatedTestimonials);
                  }}
                  className="text-gray-600 leading-relaxed italic"
                  placeholder="Depoimento do cliente"
                  tag="p"
                />
              ) : (
                <p className="text-gray-600 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsBlock;
