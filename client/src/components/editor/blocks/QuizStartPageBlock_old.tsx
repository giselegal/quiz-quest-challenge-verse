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
      nameInputPlaceholder?: string;
      showNameInput?: boolean;
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
  style?: React.CSSProperties;
}

const QuizStartPageBlock: React.FC<QuizStartPageBlockProps> = ({
  block,
  isSelected = false,
  onClick,
  onPropertyChange,
  disabled = false,
  className,
  style
}) => {
  const {
    title = 'Descubra Seu Estilo Pessoal',
    subtitle = 'Chega de guarda-roupa lotado e sensação de "não tenho nada para vestir"',
    description = 'Um quiz personalizado que vai te ajudar a descobrir seu estilo único e como aplicá-lo no dia a dia com confiança.',
    buttonText = 'Quero descobrir meu estilo',
    benefits = [
      'Descubra seu estilo predominante em 5 minutos',
      'Receba dicas personalizadas para seu perfil',
      'Aprenda a criar looks que combinam com você',
      'Ganhe confiança para se vestir todos os dias'
    ],
    nameInputPlaceholder = 'Digite seu nome aqui...',
    showNameInput = true,
    imageUrl,
    backgroundColor = '#fffaf7',
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
        'relative w-full h-full flex flex-col bg-white rounded-lg border border-gray-200',
        'p-4 md:p-6 max-w-[500px] min-w-[300px]', // Largura fixa responsiva
        isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : '',
        'cursor-pointer hover:shadow-md transition-all duration-200',
        className
      )}
      onClick={onClick}
      style={{ backgroundColor, color: textColor }}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <Badge variant="outline" className="mb-3 text-xs">
          Quiz de Estilo Pessoal
        </Badge>

        {/* Title */}
        <InlineEditText
          as="h1"
          value={title}
          onSave={(newValue) => handlePropertyChange('title', newValue)}
          placeholder="Título do quiz..."
          disabled={disabled}
          className="text-lg md:text-xl font-bold mb-2 leading-tight"
          style={{ color: textColor }}
        />

        {/* Subtitle */}
        <InlineEditText
          as="p"
          value={subtitle}
          onSave={(newValue) => handlePropertyChange('subtitle', newValue)}
          placeholder="Subtítulo do quiz..."
          disabled={disabled}
          className="text-sm mb-3 opacity-80 leading-relaxed"
          style={{ color: textColor }}
        />
      </div>

      {/* Description */}
      <InlineEditText
        as="p"
        value={description}
        onSave={(newValue) => handlePropertyChange('description', newValue)}
        placeholder="Descrição do quiz..."
        disabled={disabled}
        className="text-xs md:text-sm mb-4 opacity-75 text-center leading-relaxed"
        style={{ color: textColor }}
      />

      {/* Benefits List */}
      {benefits && benefits.length > 0 && (
        <div className="mb-4">
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-xs">
                <span className="text-green-500 mt-0.5">✓</span>
                <span style={{ color: textColor }}>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Name Input */}
      {showNameInput && (
        <div className="mb-4">
          <input
            type="text"
            placeholder={nameInputPlaceholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={disabled}
          />
        </div>
      )}

      {/* CTA Button */}
      <div className="mt-auto">
        <Button 
          className="w-full bg-[#B89B7A] hover:bg-[#aa6b5d] text-white text-sm"
          disabled={disabled}
        >
          {buttonText}
        </Button>
      </div>

      {/* Footer Info */}
      <div className="text-center mt-3">
        <p className="text-xs opacity-60" style={{ color: textColor }}>
          ⏱️ Leva apenas 5 minutos • 100% gratuito
        </p>
      </div>
          placeholder="Descrição do quiz..."
          disabled={disabled}
          multiline={true}
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
        <Button
          size="lg"
          className="text-lg px-8 py-3 bg-primary hover:bg-primary/90"
          disabled={disabled}
        >
          <InlineEditText
            as="span"
            value={buttonText}
            onSave={(newValue) => handlePropertyChange('buttonText', newValue)}
            placeholder="Texto do botão..."
            disabled={disabled}
            className="inline-block"
            style={{ color: 'white' }}
          />
        </Button>
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