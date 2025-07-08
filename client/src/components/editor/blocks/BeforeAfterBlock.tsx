
import React, { useState, useRef, useEffect } from 'react';
import { InlineEditableText } from './InlineEditableText';
import { ChevronLeft, ChevronRight, Quote, ArrowRightLeft } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';
import { Card, CardContent } from '@/components/ui/card';

interface Transformation {
  id: string;
  name: string;
  age?: string;
  location?: string;
  beforeImage?: string;
  afterImage?: string;
  combinedImage?: string;
  testimonial?: string;
  results?: string[];
  style?: string;
}

interface BeforeAfterBlockProps extends BlockComponentProps {
  block: {
    id: string;
    type: 'before-after';
    properties: {
      title?: string;
      subtitle?: string;
      transformations?: Transformation[];
      beforeImage?: string;
      afterImage?: string;
      beforeLabel?: string;
      afterLabel?: string;
      displayMode?: 'transformations' | 'slider';
      showTestimonials?: boolean;
      showResults?: boolean;
      backgroundColor?: string;
      textColor?: string;
      cardStyle?: 'minimal' | 'elegant' | 'bold';
    };
  };
}

const BeforeAfterBlock: React.FC<BeforeAfterBlockProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    title = 'Transformações Reais',
    subtitle = 'Veja as transformações incríveis de nossas clientes',
    transformations = [
      {
        id: 'transformation-1',
        name: 'Maria Silva',
        age: '34 anos',
        location: 'São Paulo',
        combinedImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/before-after-1.webp',
        testimonial: 'Nunca pensei que pudesse me sentir tão confiante! O guia de estilo mudou completamente minha relação com a moda.',
        results: ['Autoestima elevada', 'Guarda-roupa organizado', 'Compras mais inteligentes'],
        style: 'Elegante'
      }
    ],
    beforeImage = '',
    afterImage = '',
    beforeLabel = 'Antes',
    afterLabel = 'Depois',
    displayMode = 'transformations',
    showTestimonials = true,
    showResults = true,
    backgroundColor = '#ffffff',
    textColor = '#432818',
    cardStyle = 'elegant'
  } = block.properties;

  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const nextSlide = () => {
    if (transformations && transformations.length > 1) {
      setCurrentSlide((prev) => (prev + 1) % transformations.length);
    }
  };

  const prevSlide = () => {
    if (transformations && transformations.length > 1) {
      setCurrentSlide((prev) => (prev - 1 + transformations.length) % transformations.length);
    }
  };

  const getCardStyleClasses = () => {
    const baseClasses = 'relative overflow-hidden transition-all duration-300';
    
    switch (cardStyle) {
      case 'minimal':
        return `${baseClasses} bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md`;
      case 'bold':
        return `${baseClasses} bg-gradient-to-br from-[#B89B7A] to-[#A68A6A] text-white rounded-xl shadow-lg hover:shadow-xl`;
      case 'elegant':
      default:
        return `${baseClasses} bg-white border border-[#B89B7A]/20 rounded-lg shadow-md hover:shadow-lg hover:border-[#B89B7A]/40`;
    }
  };

  const renderTransformation = (transformation: Transformation, index: number) => (
    <div key={transformation.id} className="w-full">
      <Card className={getCardStyleClasses()}>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-[#432818] mb-2">
              {transformation.name}
            </h3>
            {(transformation.age || transformation.location) && (
              <p className="text-sm text-[#6B4F43] mb-2">
                {[transformation.age, transformation.location].filter(Boolean).join(' • ')}
              </p>
            )}
            {transformation.style && (
              <span className="inline-block px-3 py-1 bg-[#B89B7A] text-white text-xs rounded-full">
                Estilo {transformation.style}
              </span>
            )}
          </div>

          <div className="mb-6">
            {transformation.combinedImage ? (
              <div className="relative max-w-md mx-auto">
                <img
                  src={transformation.combinedImage}
                  alt={`Transformação de ${transformation.name}`}
                  className="w-full h-auto rounded-lg shadow-md"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/600x400/cccccc/333333?text=Antes+%26+Depois';
                  }}
                />
                <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                  <ArrowRightLeft className="w-3 h-3 inline mr-1" />
                  Antes & Depois
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {transformation.beforeImage && (
                  <div className="relative">
                    <img
                      src={transformation.beforeImage}
                      alt={`${transformation.name} - Antes`}
                      className="w-full h-auto rounded-lg shadow-md"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                      Antes
                    </div>
                  </div>
                )}
                {transformation.afterImage && (
                  <div className="relative">
                    <img
                      src={transformation.afterImage}
                      alt={`${transformation.name} - Depois`}
                      className="w-full h-auto rounded-lg shadow-md"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                      Depois
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {showResults && transformation.results && transformation.results.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-sm text-[#432818] mb-2">Resultados:</h4>
              <ul className="space-y-1">
                {transformation.results.map((result, idx) => (
                  <li key={idx} className="text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#B89B7A] rounded-full flex-shrink-0" />
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {showTestimonials && transformation.testimonial && (
            <div className="relative">
              <Quote className="absolute top-0 left-0 w-6 h-6 text-[#B89B7A] opacity-50" />
              <blockquote className="pl-8 italic text-gray-600 text-sm leading-relaxed">
                "{transformation.testimonial}"
              </blockquote>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  if (!transformations || transformations.length === 0) {
    return (
      <div
        className={`
          bg-gray-100 p-6 rounded-lg text-gray-500 flex flex-col items-center justify-center min-h-[300px] cursor-pointer transition-all duration-200
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
        <ArrowRightLeft className="w-12 h-12 mb-4 opacity-50" />
        <p className="text-center">Configure as transformações no painel de propriedades.</p>
      </div>
    );
  }

  return (
    <div
      className={`
        py-8 px-4 cursor-pointer transition-all duration-200 w-full
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
      {title && (
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            <InlineEditableText
              value={title}
              onSave={(value: string) => handlePropertyChange('title', value)}
              className="inline-block"
              placeholder="Título das transformações"
              tag="h2"
            />
          </h2>
          {subtitle && (
            <p className="text-lg text-opacity-80 max-w-2xl mx-auto">
              <InlineEditableText
                value={subtitle}
                onSave={(value: string) => handlePropertyChange('subtitle', value)}
                className="inline-block"
                placeholder="Subtítulo das transformações"
                tag="p"
              />
            </p>
          )}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {transformations.length > 1 ? (
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {transformations.map((transformation, index) => (
                  <div key={transformation.id} className="w-full flex-shrink-0 px-4">
                    {renderTransformation(transformation, index)}
                  </div>
                ))}
              </div>
            </div>

            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 z-10"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              disabled={isEditing}
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 z-10"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              disabled={isEditing}
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {transformations.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide 
                      ? 'bg-[#B89B7A] scale-110' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
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
          <div className="max-w-2xl mx-auto">
            {renderTransformation(transformations[0], 0)}
          </div>
        )}
      </div>

      {isEditing && (
        <div className="mt-6 p-3 bg-[#FAF9F7] border border-[#B89B7A]/20 rounded-md">
          <p className="text-sm text-[#8F7A6A]">
            Modo de edição: {transformations.length} transformação(ões) • 
            Slide atual: {currentSlide + 1}
          </p>
        </div>
      )}
    </div>
  );
};

export default BeforeAfterBlock;
