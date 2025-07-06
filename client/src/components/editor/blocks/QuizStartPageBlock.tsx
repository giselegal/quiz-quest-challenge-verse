import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InlineEditText } from './InlineEditText';

interface QuizStartPageBlockProps {
  block: {
    id: string;
    type: string;
    properties: {
      title?: string;
      subtitle?: string;
      description?: string;
      buttonText?: string;
      benefits?: string[];
      imageUrl?: string;
      backgroundColor?: string;
      textColor?: string;
    };
  };
  isSelected?: boolean;
  onClick?: () => void;
  onPropertyChange?: (key: string, value: any) => void;
  disabled?: boolean;
  className?: string;
}

const QuizStartPageBlock: React.FC<QuizStartPageBlockProps> = ({
  block,
  isSelected = false,
  onClick,
  onPropertyChange,
  disabled = false,
  className
}) => {
  const {
    title = 'Descubra Seu Estilo Pessoal',
    subtitle = 'Quiz personalizado para descobrir seu estilo único',
    description = 'Responda algumas perguntas e descubra seu estilo pessoal.',
    buttonText = 'Começar Quiz',
    benefits = [],
    imageUrl,
    backgroundColor = '#ffffff',
    textColor = '#432818'
  } = block.properties;

  return (
    <div
      className={cn(
        'relative w-full min-h-[400px] p-8 rounded-lg border-2 border-dashed',
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white',
        'cursor-pointer hover:border-gray-400 transition-colors',
        className
      )}
      onClick={onClick}
      style={{ backgroundColor, color: textColor }}
    >
      {/* Content */}
      <div className="max-w-2xl mx-auto text-center">
        {/* Badge */}
        <Badge variant="outline" className="mb-4">
          Quiz de Estilo
        </Badge>

        {/* Title */}
        <InlineEditText
          value={title}
          onSave={(newValue) => onPropertyChange?.('title', newValue)}
          placeholder="Título do quiz..."
          disabled={disabled}
          as="h1"
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: textColor }}
        />

        {/* Subtitle */}
        <InlineEditText
          value={subtitle}
          onSave={(newValue) => onPropertyChange?.('subtitle', newValue)}
          placeholder="Subtítulo do quiz..."
          disabled={disabled}
          as="p"
          className="text-xl mb-6 opacity-80"
          style={{ color: textColor }}
        />

        {/* Description */}
        <InlineEditText
          value={description}
          onSave={(newValue) => onPropertyChange?.('description', newValue)}
          placeholder="Descrição do quiz..."
          disabled={disabled}
          multiline={true}
          as="p"
          className="text-lg mb-8 opacity-70"
          style={{ color: textColor }}
        />

        {/* Benefits */}
        {benefits.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4" style={{ color: textColor }}>
              O que você vai descobrir:
            </h3>
            <ul className="space-y-2 text-left max-w-md mx-auto">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span style={{ color: textColor }}>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Image */}
        {imageUrl && (
          <div className="mb-8">
            <img
              src={imageUrl}
              alt="Quiz Preview"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* CTA Button */}
        <div className="inline-block">
          <InlineEditText
            value={buttonText}
            onSave={(newValue) => onPropertyChange?.('buttonText', newValue)}
            placeholder="Texto do botão..."
            disabled={disabled}
            as="span"
            className="inline-block"
          />
        </div>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
          Página Inicial
        </div>
      )}
    </div>
  );
};

export default QuizStartPageBlock;