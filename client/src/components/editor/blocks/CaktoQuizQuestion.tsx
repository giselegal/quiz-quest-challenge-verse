import React from 'react';
import { cn } from '@/lib/utils';
import { BlockData } from '@/types/blocks';

interface CaktoQuizQuestionProps {
  block: BlockData;
  isSelected?: boolean;
  onClick?: () => void;
  onPropertyChange?: (key: string, value: any) => void;
  disabled?: boolean;
  className?: string;
}

export const CaktoQuizQuestion: React.FC<CaktoQuizQuestionProps> = ({
  block,
  isSelected = false,
  onClick,
  onPropertyChange,
  disabled = false,
  className
}) => {
  const {
    questionNumber = 1,
    title = 'Questão sem título',
    description,
    options = [],
    questionType = 'multiple-choice',
    backgroundImage,
    primaryColor = '#B89B7A',
    textColor = '#2D2D2D'
  } = block.properties || {};

  return (
    <div
      className={cn(
        'w-full min-h-screen flex flex-col justify-center items-center relative overflow-hidden',
        'bg-gradient-to-br from-neutral-50 to-neutral-100',
        isSelected && 'ring-4 ring-blue-500 ring-opacity-50',
        !disabled && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: textColor
      }}
    >
      {/* Overlay escuro se houver imagem de fundo */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
      )}

      {/* Conteúdo principal */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 py-8 text-center">
        
        {/* Número da questão */}
        <div className="mb-6">
          <span 
            className="inline-block px-6 py-2 rounded-full text-white font-semibold text-lg"
            style={{ backgroundColor: primaryColor }}
          >
            Questão {questionNumber}
          </span>
        </div>

        {/* Título da questão */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          {title}
        </h1>

        {/* Descrição opcional */}
        {description && (
          <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        )}

        {/* Opções de resposta */}
        {options.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {options.map((option: any, index: number) => (
              <button
                key={index}
                className={cn(
                  'group relative p-6 bg-white/90 backdrop-blur-sm rounded-2xl',
                  'border-2 border-transparent hover:border-opacity-60 transition-all duration-300',
                  'text-left hover:shadow-lg hover:scale-105 hover:-translate-y-1',
                  'focus:outline-none focus:ring-4 focus:ring-opacity-50'
                )}
                style={{
                  borderColor: `${primaryColor}40`,
                  '--hover-border-color': primaryColor,
                  '--focus-ring-color': primaryColor
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = primaryColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${primaryColor}40`;
                }}
              >
                {/* Número da opção */}
                <div 
                  className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  {String.fromCharCode(65 + index)}
                </div>

                {/* Imagem da opção (se houver) */}
                {option.image && (
                  <div className="mb-4">
                    <img
                      src={option.image}
                      alt={option.text}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Texto da opção */}
                <div className="text-gray-800 font-medium text-lg">
                  {option.text || option.label || `Opção ${index + 1}`}
                </div>

                {/* Descrição da opção (se houver) */}
                {option.description && (
                  <div className="text-gray-600 text-sm mt-2">
                    {option.description}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Indicador de progresso */}
        <div className="mt-12 flex justify-center">
          <div className="flex space-x-2">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-300',
                  i < questionNumber ? 'opacity-100' : 'opacity-30'
                )}
                style={{
                  backgroundColor: i < questionNumber ? primaryColor : '#D1D5DB'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Marca do CaktoQuiz */}
      <div className="absolute bottom-6 right-6 z-30">
        <div 
          className="px-4 py-2 rounded-lg text-white font-medium text-sm bg-black bg-opacity-20 backdrop-blur-sm"
        >
          CaktoQuiz
        </div>
      </div>
    </div>
  );
};

export default CaktoQuizQuestion;
