import React from 'react';
import { cn } from '@/lib/utils';
import { BlockData } from '@/types/blocks';
import { ChevronRight, Sparkles } from 'lucide-react';

interface CaktoQuizIntroProps {
  block: BlockData;
  isSelected?: boolean;
  onClick?: () => void;
  onPropertyChange?: (key: string, value: any) => void;
  disabled?: boolean;
  className?: string;
}

export const CaktoQuizIntro: React.FC<CaktoQuizIntroProps> = ({
  block,
  isSelected = false,
  onClick,
  onPropertyChange,
  disabled = false,
  className
}) => {
  const {
    title = 'Bem-vindo ao Quiz de Estilo',
    subtitle = 'Descubra seu estilo ideal em poucos minutos',
    description = 'Responda às questões com sinceridade para obter um resultado personalizado',
    buttonText = 'Começar Quiz',
    backgroundImage,
    primaryColor = '#B89B7A',
    textColor = '#2D2D2D',
    benefits = [
      'São apenas 10 perguntas rápidas',
      'Leva menos de 3 minutos',
      'Resultado personalizado imediato'
    ]
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
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 py-8 text-center">
        
        {/* Ícone decorativo */}
        <div className="mb-8">
          <div 
            className="inline-flex p-4 rounded-full bg-white/10 backdrop-blur-sm"
            style={{ color: primaryColor }}
          >
            <Sparkles className="w-12 h-12" />
          </div>
        </div>

        {/* Título principal */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          {title}
        </h1>

        {/* Subtítulo */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-medium mb-6 text-gray-600">
          {subtitle}
        </h2>

        {/* Descrição */}
        <p className="text-lg md:text-xl mb-10 text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>

        {/* Lista de benefícios */}
        {benefits && benefits.length > 0 && (
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {benefits.map((benefit: string, index: number) => (
                <div 
                  key={index}
                  className="flex items-center justify-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-gray-800 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botão de início */}
        <div className="mb-8">
          <button
            className={cn(
              'group relative inline-flex items-center justify-center',
              'px-12 py-4 text-xl font-semibold text-white rounded-full',
              'hover:scale-105 hover:shadow-xl transition-all duration-300',
              'focus:outline-none focus:ring-4 focus:ring-opacity-50'
            )}
            style={{
              backgroundColor: primaryColor,
              boxShadow: `0 10px 30px ${primaryColor}40`
            }}
          >
            <span className="mr-2">{buttonText}</span>
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Indicador de progresso */}
        <div className="flex justify-center">
          <div className="flex space-x-2">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-300',
                  i === 0 ? 'opacity-100' : 'opacity-30'
                )}
                style={{
                  backgroundColor: i === 0 ? primaryColor : '#D1D5DB'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Marca do CaktoQuiz */}
      <div className="absolute bottom-6 right-6 z-30">
        <div className="px-4 py-2 rounded-lg text-white font-medium text-sm bg-black bg-opacity-20 backdrop-blur-sm">
          CaktoQuiz
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full opacity-20 animate-pulse" style={{ backgroundColor: primaryColor }} />
      <div className="absolute bottom-20 left-20 w-16 h-16 rounded-full opacity-10 animate-bounce" style={{ backgroundColor: primaryColor }} />
      <div className="absolute top-20 right-20 w-12 h-12 rounded-full opacity-15 animate-pulse" style={{ backgroundColor: primaryColor }} />
    </div>
  );
};

export default CaktoQuizIntro;
