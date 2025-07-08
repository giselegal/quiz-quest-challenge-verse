import React from 'react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface SocialProofBlockProps {
  title?: string;
  testimonials?: Array<{
    name: string;
    text: string;
    rating?: number;
    image?: string;
  }>;
  showRating?: boolean;
  layout?: 'grid' | 'carousel' | 'list';
  className?: string;
}

const SocialProofBlock: React.FC<SocialProofBlockProps> = ({
  title = 'O que nossos clientes dizem',
  testimonials = [
    { name: 'Maria Silva', text: 'Transformou meu guarda-roupa!', rating: 5 },
    { name: 'Ana Costa', text: 'Finalmente encontrei meu estilo!', rating: 5 }
  ],
  showRating = true,
  layout = 'grid',
  className
}) => {
  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "w-4 h-4",
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        )}
      />
    ));
  };

  const renderTestimonial = (testimonial: any, index: number) => (
    <div
      key={index}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full"
    >
      <div className="flex flex-col h-full">
        {showRating && testimonial.rating && (
          <div className="flex items-center mb-3">
            {renderStars(testimonial.rating)}
          </div>
        )}
        <p className="text-gray-700 mb-4 flex-grow italic">
          "{testimonial.text}"
        </p>
        <div className="flex items-center">
          {testimonial.image && (
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-10 h-10 rounded-full mr-3 object-cover"
            />
          )}
          <div>
            <p className="font-semibold text-gray-900">{testimonial.name}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn("py-8", className)}>
      {title && (
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
          {title}
        </h2>
      )}
      
      <div className={cn(
        "max-w-6xl mx-auto",
        layout === 'grid' && "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
        layout === 'list' && "space-y-6",
        layout === 'carousel' && "flex overflow-x-auto gap-6 pb-4"
      )}>
        {testimonials.map((testimonial, index) => renderTestimonial(testimonial, index))}
      </div>
    </div>
  );
};

export default SocialProofBlock;