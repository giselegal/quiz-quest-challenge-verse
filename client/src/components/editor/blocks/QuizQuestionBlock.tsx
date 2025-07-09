import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuizQuestionBlockProps {
  question?: string;
  options?: Array<{ id: string; text: string; imageUrl?: string }>;
  allowMultiple?: boolean;
  showImages?: boolean;
  maxSelections?: number;
  autoAdvance?: boolean;
  autoAdvanceDelay?: number;
  onNext?: () => void;
  progressPercent?: number;
  className?: string;
  block?: any;
  isSelected?: boolean;
  onPropertyChange?: (key: string, value: any) => void;
}

const QuizQuestionBlock: React.FC<QuizQuestionBlockProps> = ({
  question = 'Etapa 1: Qual dessas opções representa melhor seu estilo predominante?',
  options = [
    { id: '1', text: 'Clássico e elegante', imageUrl: 'https://res.cloudinary.com/dtx0k4ue6/image/upload/v1710847234/estilo-classico_urkpfx.jpg' },
    { id: '2', text: 'Moderno e descolado', imageUrl: 'https://res.cloudinary.com/dtx0k4ue6/image/upload/v1710847235/estilo-moderno_hqxmzv.jpg' },
    { id: '3', text: 'Natural e autêntico', imageUrl: 'https://res.cloudinary.com/dtx0k4ue6/image/upload/v1710847236/estilo-natural_wnxkdi.jpg' },
    { id: '4', text: 'Casual e descontraído' }
  ],
  allowMultiple = true,
  showImages = true,
  maxSelections = 3,
  autoAdvance = true, // AUTO-AVANÇO ATIVADO por padrão
  autoAdvanceDelay = 1500, // 1.5 segundos de delay
  onNext,
  progressPercent = 0,
  className,
  block,
  isSelected = false,
  onPropertyChange
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);

  // Auto-avanço quando atingir máximo de seleções
  useEffect(() => {
    if (autoAdvance && allowMultiple && selectedOptions.size === maxSelections) {
      setIsAutoAdvancing(true);
      const timer = setTimeout(() => {
        onNext?.();
        setIsAutoAdvancing(false);
      }, autoAdvanceDelay);
      
      return () => clearTimeout(timer);
    }
  }, [selectedOptions.size, autoAdvance, allowMultiple, maxSelections, autoAdvanceDelay, onNext]);

  const handleOptionClick = (optionId: string) => {
    const newSelected = new Set(selectedOptions);
    
    if (allowMultiple) {
      if (newSelected.has(optionId)) {
        newSelected.delete(optionId);
      } else if (newSelected.size < maxSelections) {
        newSelected.add(optionId);
      }
    } else {
      newSelected.clear();
      newSelected.add(optionId);
      // Auto-avanço imediato para seleção única
      if (autoAdvance) {
        setTimeout(() => onNext?.(), autoAdvanceDelay);
      }
    }
    
    setSelectedOptions(newSelected);
  };

  const canProceed = allowMultiple 
    ? selectedOptions.size === maxSelections 
    : selectedOptions.size > 0;

  return (
    <div className={cn(
      "w-full h-full flex flex-col bg-white",
      // Layout responsivo HORIZONTAL - MÁXIMO 2 COLUNAS - LARGURA 100%
      "p-4 md:p-6 rounded-lg border border-gray-200",
      // LARGURA 100% DO CONTAINER - SEM ARGUMENTOS VERTICAIS
      "min-h-[200px] max-w-full",
      isSelected && "ring-2 ring-blue-500 bg-blue-50",
      className
    )}>
      {/* Progress Bar */}
      {progressPercent > 0 && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500">Progresso</span>
            <span className="text-xs text-gray-500">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#B89B7A] h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Question Header */}
      <div className="text-center mb-6">
        <h2 className="text-lg md:text-xl font-bold text-[#aa6b5d] mb-3 leading-tight">
          {question}
        </h2>
        {allowMultiple && (
          <p className="text-[#8F7A6A] text-xs md:text-sm">
            {autoAdvance 
              ? `Escolha até ${maxSelections} opções - avanço automático ativado` 
              : `Você pode escolher até ${maxSelections} opções que mais combinam com você`
            }
          </p>
        )}
      </div>

      {/* Options Grid - RESPONSIVO MÁXIMO 2 COLUNAS - LAYOUT HORIZONTAL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 flex-1 w-full">
        {options.map((option) => {
          const isOptionSelected = selectedOptions.has(option.id);
          
          return (
            <div
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className={cn(
                "relative cursor-pointer rounded-lg border-2 transition-all duration-200",
                "bg-white hover:shadow-md flex flex-col",
                isOptionSelected 
                  ? "border-[#B89B7A] bg-[#fff7f3] shadow-md" 
                  : "border-gray-200 hover:border-[#B89B7A]/50"
              )}
            >
              {/* Selection Indicator */}
              {isOptionSelected && (
                <div className="absolute -top-1 -right-1 z-10">
                  <div className="w-5 h-5 bg-[#B89B7A] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

              {/* Option Image */}
              {showImages && option.imageUrl && (
                <div className="aspect-video w-full rounded-t-lg overflow-hidden">
                  <img 
                    src={option.imageUrl} 
                    alt={option.text}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Option Text */}
              <div className={cn(
                "p-3 text-center flex-1 flex items-center justify-center",
                !showImages && "py-6"
              )}>
                <h3 className={cn(
                  "font-medium text-[#432818] leading-tight text-center",
                  showImages ? "text-sm" : "text-base"
                )}>
                  {option.text}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Footer */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          {/* Selection Counter */}
          {allowMultiple ? (
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#B89B7A]" />
              <span className="text-xs text-[#8F7A6A]">
                {selectedOptions.size} de {maxSelections} selecionadas
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#B89B7A]" />
              <span className="text-xs text-[#8F7A6A]">
                {selectedOptions.size > 0 ? 'Selecionado' : 'Selecione uma opção'}
              </span>
            </div>
          )}

          {/* Next Button ou Auto-advance Status */}
          {!autoAdvance && canProceed && (
            <Button
              onClick={onNext}
              size="sm"
              className="bg-[#B89B7A] hover:bg-[#aa6b5d] text-white"
            >
              Próximo <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}

          {autoAdvance && isAutoAdvancing && (
            <div className="flex items-center gap-2 text-xs text-[#B89B7A]">
              <div className="w-3 h-3 border-2 border-[#B89B7A] border-t-transparent rounded-full animate-spin" />
              Avançando...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestionBlock;