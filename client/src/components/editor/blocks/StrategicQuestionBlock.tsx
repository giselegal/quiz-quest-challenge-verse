import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { InlineEditableText } from './InlineEditableText';
import type { BlockComponentProps } from '@/types/blocks';
import { Check } from 'lucide-react';

/**
 * StrategicQuestionBlock - Component específico para questões estratégicas
 * 
 * Características:
 * - 1 seleção obrigatória por questão
 * - NÃO pontuam para o resultado
 * - SEM auto-avanço
 * - Botão "Continuar" em vez de "Próximo"
 */

interface StrategicQuestionBlockProps extends BlockComponentProps {
  onAnswer?: (answer: string) => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

const StrategicQuestionBlock: React.FC<StrategicQuestionBlockProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  onAnswer,
  onNext,
  onPrevious,
  className = '',
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [hasAnswered, setHasAnswered] = useState(false);

  // Extrair propriedades do schema
  const {
    questionId = 'strategic-1',
    title = 'Para personalizar ainda mais, qual sua faixa etária?',
    description = 'Esta informação nos ajuda a dar recomendações mais precisas.',
    options = [],
    showProgress = true,
    progressPercent = 70,
    purpose = 'demographic' // 'demographic', 'preference', 'behavior', 'segmentation'
  } = block.properties;

  const handleOptionSelect = (optionId: string) => {
    setSelectedAnswer(optionId);
    setHasAnswered(true);
    
    if (onAnswer) {
      onAnswer(optionId);
    }
  };

  const handleNext = () => {
    if (hasAnswered && onNext) {
      onNext();
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    }
  };

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

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col justify-center p-6 bg-[#fffaf7] text-[#432818]', // brand colors
        'transition-all duration-200',
        isSelected && 'ring-2 ring-[#B89B7A] ring-offset-2',
        className
      )}
      onClick={handleClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      {/* Progress Bar */}
      {showProgress && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="h-2 bg-[#F9F6F2]"> {/* brand-light-cream */}
            <div
              className="h-full bg-[#B89B7A] transition-all duration-300" // brand-gold
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto w-full space-y-8">
        {/* Question Header */}
        <div className="text-center space-y-4">
          <InlineEditableText
            value={title}
            onSave={(value: string) => handlePropertyChange('title', value)}
            className="text-2xl md:text-3xl font-bold text-gray-900"
            placeholder="Digite sua pergunta estratégica aqui"
            tag="h2"
          />
          
          {description && (
            <InlineEditableText
              value={description}
              onSave={(value: string) => handlePropertyChange('description', value)}
              className="text-lg text-[#8F7A6A]" // brand-light-coffee
              placeholder="Contexto da pergunta estratégica"
              tag="p"
            />
          )}
          
          <p className="text-sm text-[#8F7A6A]">
            Selecione uma opção para continuar
          </p>
        </div>

        {/* Options List - Layout mais simples para questões estratégicas */}
        <div className="space-y-3 max-w-2xl mx-auto">
          {options.map((option: any, index: number) => {
            const isSelectedOption = selectedAnswer === option.id;
            
            return (
              <button
                key={option.id || index}
                onClick={() => handleOptionSelect(option.id)}
                className={cn(
                  'w-full p-4 rounded-lg border-2 transition-all duration-200 text-left',
                  'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#B89B7A]/20',
                  'hover:scale-102 hover:border-[#B89B7A]/40',
                  isSelectedOption 
                    ? 'border-[#B89B7A] bg-[#B89B7A]/10 shadow-md' // brand-gold
                    : 'border-[#B89B7A]/20 hover:border-[#B89B7A]/40 bg-white'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-[#432818]">
                      {option.text}
                    </p>
                    {option.description && (
                      <p className="text-sm text-[#8F7A6A] mt-1">
                        {option.description}
                      </p>
                    )}
                  </div>
                  
                  {/* Selection Indicator */}
                  {isSelectedOption && (
                    <div className="w-6 h-6 bg-[#B89B7A] rounded-full flex items-center justify-center ml-4">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation - Estratégicas precisam de clique manual */}
        <div className="flex justify-between items-center pt-8">
          <button
            onClick={handlePrevious}
            className="px-6 py-3 text-[#8F7A6A] hover:text-[#432818] transition-colors"
          >
            ← Anterior
          </button>
          
          <div className="text-center">
            {!hasAnswered && (
              <p className="text-sm text-[#8F7A6A]">
                Selecione uma opção para continuar
              </p>
            )}
          </div>
          
          <button
            onClick={handleNext}
            disabled={!hasAnswered}
            className={cn(
              'px-6 py-3 rounded-lg font-medium transition-all',
              'focus:outline-none focus:ring-4 focus:ring-[#B89B7A]/20',
              hasAnswered
                ? 'bg-[#B89B7A] text-white hover:bg-[#A38A69] shadow-md hover:shadow-lg hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            )}
          >
            Continuar →
          </button>
        </div>
      </div>
    </div>
  );
};

export default StrategicQuestionBlock;
