import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

/**
 * QuizTransitionBlock - Componente de transição do quiz 100% reutilizável e editável
 * 
 * Props editáveis via editor visual:
 * - title?: string - Título da transição
 * - subtitle?: string - Subtítulo
 * - message?: string - Mensagem principal
 * - showAnimation?: boolean - Exibir animação
 * - animationType?: 'loading' | 'celebration' | 'progress' - Tipo de animação
 * - showContinueButton?: boolean - Exibir botão continuar
 * - continueButtonText?: string - Texto do botão continuar
 * - autoAdvance?: boolean - Avançar automaticamente
 * - autoAdvanceDelay?: number - Delay para auto-avanço (ms)
 * - backgroundColor?: string - Cor de fundo
 * - textColor?: string - Cor do texto
 * - alignment?: 'left' | 'center' | 'right' - Alinhamento
 * 
 * @example
 * <QuizTransitionBlock
 *   blockId="quiz-transition-1"
 *   title="Perfeito!"
 *   subtitle="Agora vamos descobrir mais sobre você"
 *   message="Suas respostas estão nos ajudando a criar seu perfil único."
 *   showAnimation={true}
 *   animationType="celebration"
 *   continueButtonText="Continuar"
 *   onContinue={() => goToNextSection()}
 * />
 */

export interface QuizTransitionBlockProps {
  // Identificação
  blockId: string;
  className?: string;
  style?: React.CSSProperties;

  // Conteúdo editável
  title?: string;
  subtitle?: string;
  message?: string;
  image?: string;
  imageAlt?: string;

  // Configurações de animação
  showAnimation?: boolean;
  animationType?: 'loading' | 'celebration' | 'progress' | 'sparkles';
  animationDuration?: number;

  // Configurações de navegação
  showContinueButton?: boolean;
  continueButtonText?: string;
  autoAdvance?: boolean;
  autoAdvanceDelay?: number;

  // Estilos
  backgroundColor?: string;
  textColor?: string;
  alignment?: 'left' | 'center' | 'right';
  minHeight?: string;

  // Callbacks
  onContinue?: () => void;
  onAutoAdvance?: () => void;

  // Estados
  loading?: boolean;
}

const QuizTransitionBlock: React.FC<QuizTransitionBlockProps> = ({
  blockId,
  className = '',
  style = {},
  title = 'Perfeito!',
  subtitle,
  message = 'Suas respostas estão sendo processadas...',
  image,
  imageAlt,
  showAnimation = true,
  animationType = 'celebration',
  animationDuration = 2000,
  showContinueButton = true,
  continueButtonText = 'Continuar',
  autoAdvance = false,
  autoAdvanceDelay = 3000,
  backgroundColor,
  textColor,
  alignment = 'center',
  minHeight = '400px',
  onContinue,
  onAutoAdvance,
  loading = false
}) => {
  const [animationActive, setAnimationActive] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Iniciar animação
    if (showAnimation) {
      setAnimationActive(true);
      
      // Mostrar conteúdo após delay
      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 500);

      // Parar animação após duração
      const animationTimer = setTimeout(() => {
        setAnimationActive(false);
      }, animationDuration);

      return () => {
        clearTimeout(contentTimer);
        clearTimeout(animationTimer);
      };
    } else {
      setShowContent(true);
    }
  }, [showAnimation, animationDuration]);

  useEffect(() => {
    // Auto-avanço
    if (autoAdvance && showContent) {
      const timer = setTimeout(() => {
        if (onAutoAdvance) {
          onAutoAdvance();
        } else if (onContinue) {
          onContinue();
        }
      }, autoAdvanceDelay);

      return () => clearTimeout(timer);
    }
  }, [autoAdvance, autoAdvanceDelay, showContent, onAutoAdvance, onContinue]);

  const getAnimationComponent = () => {
    switch (animationType) {
      case 'loading':
        return (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-[#B89B7A] rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-[#B89B7A] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-[#B89B7A] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        );

      case 'celebration':
        return (
          <div className="relative">
            <div className={`text-6xl ${animationActive ? 'animate-bounce' : ''}`}>
              🎉
            </div>
            {animationActive && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-[#B89B7A] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        );

      case 'progress':
        return (
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-[#B89B7A] rounded-full transition-all duration-1000 ${
                animationActive ? 'w-full' : 'w-0'
              }`}
            ></div>
          </div>
        );

      case 'sparkles':
        return (
          <div className="relative">
            <Sparkles 
              className={`w-12 h-12 text-[#B89B7A] ${
                animationActive ? 'animate-pulse' : ''
              }`} 
            />
            {animationActive && (
              <>
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-ping" />
                <Sparkles className="absolute -bottom-2 -left-2 w-4 h-4 text-pink-400 animate-ping" style={{ animationDelay: '0.5s' }} />
                <Sparkles className="absolute top-0 left-8 w-3 h-3 text-blue-400 animate-ping" style={{ animationDelay: '1s' }} />
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const handleContinue = () => {
    if (onContinue && !loading) {
      onContinue();
    }
  };

  return (
    <div 
      className={`quiz-transition-block ${className}`}
      style={{ 
        backgroundColor, 
        color: textColor,
        minHeight,
        ...style 
      }}
      data-block-id={blockId}
    >
      <div className={`flex flex-col items-center justify-center h-full py-12 px-6 text-${alignment}`}>
        
        {/* Animação */}
        {showAnimation && (
          <div className="mb-8">
            {getAnimationComponent()}
          </div>
        )}

        {/* Imagem personalizada */}
        {image && (
          <div className="mb-6">
            <img
              src={image}
              alt={imageAlt || 'Transição'}
              className="max-w-xs h-auto rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Conteúdo */}
        <div className={`space-y-4 max-w-2xl mx-auto transition-all duration-500 ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          
          {/* Título */}
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-[#432818] font-playfair">
              {title}
            </h2>
          )}

          {/* Subtítulo */}
          {subtitle && (
            <h3 className="text-xl md:text-2xl font-semibold text-[#6B5B73]">
              {subtitle}
            </h3>
          )}

          {/* Mensagem */}
          {message && (
            <p className="text-lg text-[#6B5B73] leading-relaxed">
              {message}
            </p>
          )}
        </div>

        {/* Botão Continuar */}
        {showContinueButton && showContent && !autoAdvance && (
          <div className="mt-8">
            <Button
              onClick={handleContinue}
              disabled={loading}
              className="px-8 py-3 bg-[#B89B7A] hover:bg-[#A1835D] text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Carregando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>{continueButtonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </div>
        )}

        {/* Indicador de auto-avanço */}
        {autoAdvance && showContent && (
          <div className="mt-6 text-sm text-[#6B5B73] opacity-75">
            Avançando automaticamente em {Math.ceil(autoAdvanceDelay / 1000)}s...
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizTransitionBlock;
