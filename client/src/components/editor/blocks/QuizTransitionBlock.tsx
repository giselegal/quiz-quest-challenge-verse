import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { InlineEditableText } from './InlineEditableText';
import type { BlockComponentProps } from '@/types/blocks';
import { Loader2 } from 'lucide-react';

/**
 * QuizTransitionBlock - Página de transição entre etapas do quiz
 * 
 * Características:
 * - Animação de loading personalizada
 * - Textos rotativos motivacionais
 * - Transição automática para próxima etapa
 * - Usado especialmente antes das questões estratégicas
 */

interface QuizTransitionBlockProps extends BlockComponentProps {
  onComplete?: () => void;
}

const QuizTransitionBlock: React.FC<QuizTransitionBlockProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  onComplete,
  className = '',
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Extrair propriedades do schema - USANDO DADOS REAIS DO FUNIL
  const {
    title = '🕐 Enquanto calculamos o seu resultado...',
    subtitle = 'Queremos te fazer algumas perguntas que vão tornar sua experiência ainda mais completa.',
    description = 'A ideia é simples: te ajudar a enxergar com mais clareza onde você está agora — e para onde pode ir com mais intenção, leveza e autenticidade.',
    motivationalText = '💬 Responda com sinceridade. Isso é só entre você e a sua nova versão.',
    loadingTexts = [
      'Analisando suas preferências de estilo...',
      'Calculando compatibilidade com diferentes looks...',
      'Preparando recomendações personalizadas...',
      'Finalizando seu perfil único de estilo...'
    ],
    duration = 5, // segundos
    animationType = 'spinner',
    backgroundColor = '#fffaf7',
    showProgressBar = true
  } = block.properties;

  useEffect(() => {
    const totalDuration = duration * 1000; // converter para ms
    const textInterval = totalDuration / loadingTexts.length;
    const progressInterval = 50; // atualizar a cada 50ms

    // Rotacionar textos
    const textTimer = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, textInterval);

    // Atualizar progresso
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const increment = (progressInterval / totalDuration) * 100;
        const newProgress = prev + increment;
        
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => {
            if (onComplete) {
              onComplete();
            }
          }, 500);
          return 100;
        }
        
        return newProgress;
      });
    }, progressInterval);

    return () => {
      clearInterval(textTimer);
      clearInterval(progressTimer);
    };
  }, [duration, loadingTexts.length, onComplete]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const renderAnimation = () => {
    switch (animationType) {
      case 'spinner':
        return <Loader2 className="w-12 h-12 animate-spin text-[#B89B7A]" />;
      
      case 'dots':
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-[#B89B7A] rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        );
      
      case 'progress':
        return (
          <div className="w-32 h-2 bg-[#F9F6F2] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#B89B7A] transition-all duration-200 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        );
      
      default:
        return <Loader2 className="w-12 h-12 animate-spin text-[#B89B7A]" />;
    }
  };

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col items-center justify-center p-8',
        'transition-all duration-200',
        isSelected && 'ring-2 ring-[#B89B7A] ring-offset-2',
        className
      )}
      style={{ backgroundColor }}
      onClick={handleClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Título principal */}
        <div className="space-y-4">
          <InlineEditableText
            value={title}
            onSave={(value: string) => handlePropertyChange('title', value)}
            className="text-3xl md:text-4xl font-bold text-[#432818]"
            placeholder="Título da transição"
            tag="h1"
          />
          
          <InlineEditableText
            value={subtitle}
            onSave={(value: string) => handlePropertyChange('subtitle', value)}
            className="text-lg md:text-xl text-[#8F7A6A]"
            placeholder="Subtítulo explicativo"
            tag="p"
          />
        </div>

        {/* Animação de loading */}
        <div className="flex justify-center py-8">
          {renderAnimation()}
        </div>

        {/* Texto rotativo - EDITÁVEL INLINE */}
        <div className="min-h-[2.5rem] flex items-center justify-center">
          <InlineEditableText
            value={loadingTexts[currentTextIndex]}
            onSave={(value: string) => {
              const newTexts = [...loadingTexts];
              newTexts[currentTextIndex] = value;
              handlePropertyChange('loadingTexts', newTexts);
            }}
            className="text-base text-[#8F7A6A] animate-fade-in"
            placeholder="Texto de loading..."
            tag="p"
          />
        </div>

        {/* Barra de progresso global */}
        {showProgressBar && (
          <div className="space-y-2">
            <div className="w-full max-w-md mx-auto h-2 bg-[#F9F6F2] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#B89B7A] transition-all duration-200 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-[#8F7A6A]">
              {Math.round(progress)}% concluído
            </p>
          </div>
        )}

        {/* Mensagem adicional - EDITÁVEL INLINE */}
        <div className="space-y-3 pt-4">
          <InlineEditableText
            value={description}
            onSave={(value: string) => handlePropertyChange('description', value)}
            className="text-[#8F7A6A]"
            placeholder="Descrição adicional..."
            tag="p"
          />
          <InlineEditableText
            value={motivationalText}
            onSave={(value: string) => handlePropertyChange('motivationalText', value)}
            className="text-sm font-medium text-[#432818]"
            placeholder="Texto motivacional..."
            tag="p"
          />
        </div>
      </div>
    </div>
  );
};

export default QuizTransitionBlock;
