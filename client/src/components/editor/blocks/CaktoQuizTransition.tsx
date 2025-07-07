import React from 'react';
import { cn } from '@/lib/utils';
import { BlockData } from '@/types/blocks';
import { Loader2, Sparkles } from 'lucide-react';

interface CaktoQuizTransitionProps {
  block: BlockData;
  isSelected?: boolean;
  onClick?: () => void;
  onPropertyChange?: (key: string, value: any) => void;
  disabled?: boolean;
  className?: string;
}

export const CaktoQuizTransition: React.FC<CaktoQuizTransitionProps> = ({
  block,
  isSelected = false,
  onClick,
  onPropertyChange,
  disabled = false,
  className
}) => {
  const {
    title = 'Analisando suas respostas...',
    subtitle = 'Estamos criando seu perfil de estilo personalizado',
    progress = 75,
    backgroundImage,
    primaryColor = '#B89B7A',
    textColor = '#2D2D2D',
    loadingMessages = [
      'Analisando suas preferências...',
      'Identificando seu estilo...',
      'Preparando recomendações...',
      'Quase pronto!'
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
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 py-8 text-center">
        
        {/* Ícone de loading animado */}
        <div className="mb-8">
          <div className="relative">
            <div 
              className="inline-flex p-6 rounded-full bg-white/10 backdrop-blur-sm animate-pulse"
              style={{ color: primaryColor }}
            >
              <Sparkles className="w-16 h-16" />
            </div>
            
            {/* Círculo de loading rotativo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 
                className="w-24 h-24 animate-spin opacity-60"
                style={{ color: primaryColor }}
              />
            </div>
          </div>
        </div>

        {/* Título principal */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          {title}
        </h1>

        {/* Subtítulo */}
        <p className="text-lg md:text-xl mb-12 text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>

        {/* Barra de progresso */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">Progresso</span>
            <span className="text-sm font-bold" style={{ color: primaryColor }}>
              {progress}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
              style={{ 
                width: `${progress}%`,
                backgroundColor: primaryColor
              }}
            >
              {/* Efeito shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>

        {/* Mensagens de loading */}
        {loadingMessages && loadingMessages.length > 0 && (
          <div className="mb-8">
            <div className="space-y-3 max-w-md mx-auto">
              {loadingMessages.map((message: string, index: number) => (
                <div 
                  key={index}
                  className={cn(
                    'flex items-center p-3 rounded-lg transition-all duration-500',
                    index < Math.floor(progress / 25) 
                      ? 'bg-white/80 backdrop-blur-sm text-gray-800' 
                      : 'bg-white/20 backdrop-blur-sm text-gray-500'
                  )}
                >
                  <div 
                    className={cn(
                      'w-4 h-4 rounded-full mr-3 transition-all duration-300',
                      index < Math.floor(progress / 25) ? 'opacity-100' : 'opacity-30'
                    )}
                    style={{
                      backgroundColor: index < Math.floor(progress / 25) ? primaryColor : '#D1D5DB'
                    }}
                  />
                  <span className="text-sm font-medium">{message}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Indicador de etapas completadas */}
        <div className="flex justify-center">
          <div className="flex space-x-2">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-300',
                  i < 7 ? 'opacity-100' : 'opacity-30'
                )}
                style={{
                  backgroundColor: i < 7 ? primaryColor : '#D1D5DB'
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

      {/* Elementos decorativos animados */}
      <div className="absolute top-20 left-20 w-2 h-2 rounded-full opacity-40 animate-ping" style={{ backgroundColor: primaryColor }} />
      <div className="absolute top-40 right-32 w-1 h-1 rounded-full opacity-30 animate-pulse" style={{ backgroundColor: primaryColor }} />
      <div className="absolute bottom-32 left-40 w-3 h-3 rounded-full opacity-20 animate-bounce" style={{ backgroundColor: primaryColor }} />
    </div>
  );
};

export default CaktoQuizTransition;
