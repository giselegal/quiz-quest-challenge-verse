import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InlineEditText } from './InlineEditText';

interface ResultPageBlockProps {
  block: {
    id: string;
    type: string;
    properties: {
      title?: string;
      description?: string;
      resultTitle?: string;
      resultDescription?: string;
      recommendations?: string[];
      ctaText?: string;
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

const ResultPageBlock: React.FC<ResultPageBlockProps> = ({
  block,
  isSelected = false,
  onClick,
  onPropertyChange,
  disabled = false,
  className
}) => {
  const {
    title = 'Seu Resultado',
    description = 'Baseado em suas respostas, identificamos seu estilo pessoal',
    resultTitle = 'Estilo Clássico',
    resultDescription = 'Você tem um estilo elegante e atemporal.',
    recommendations = [],
    ctaText = 'Ver Consultoria Personalizada',
    backgroundColor = '#ffffff',
    textColor = '#432818'
  } = block.properties;

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  return (
    <div
      className={cn(
        'relative w-full min-h-[500px] p-8 rounded-lg border-2 border-dashed',
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white',
        'cursor-pointer hover:border-gray-400 transition-colors',
        className
      )}
      onClick={onClick}
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <Badge variant="outline" className="mb-4">
          Resultado do Quiz
        </Badge>

        {/* Main Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: textColor }}>
          {title}
        </h1>

        {/* Description */}
        <p className="text-lg mb-8 opacity-80" style={{ color: textColor }}>
          {description}
        </p>

        {/* Result Card */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8 mb-8">
          <div className="text-6xl mb-4">✨</div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: textColor }}>
            {resultTitle}
          </h2>
          
          <p className="text-lg mb-6 opacity-90" style={{ color: textColor }}>
            {resultDescription}
          </p>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="text-left max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-4" style={{ color: textColor }}>
                Recomendações para você:
              </h3>
              <ul className="space-y-2">
                {recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span style={{ color: textColor }}>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Button
          size="lg"
          className="text-lg px-8 py-3 bg-primary hover:bg-primary/90"
          disabled={disabled}
        >
          {ctaText}
        </Button>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
          Página de Resultado
        </div>
      )}
    </div>
  );
};

export default ResultPageBlock;