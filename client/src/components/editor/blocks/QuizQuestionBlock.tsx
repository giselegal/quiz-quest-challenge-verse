import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { InlineEditText } from './InlineEditText';
import type { BlockComponentProps } from '@/types/blocks';
import { Check } from 'lucide-react';

/**
 * QuizQuestionBlock - Schema-driven component for quiz questions
 * 
 * Suporta:
 * - Múltipla escolha (single/multi-select)
 * - Opções com texto e/ou imagem
 * - Progresso visual
 * - Edição inline
 * - Validação de respostas
 */

interface QuizQuestionBlockProps extends BlockComponentProps {
  onAnswer?: (answers: string[]) => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

const QuizQuestionBlock: React.FC<QuizQuestionBlockProps> = ({
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
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [hasAnswered, setHasAnswered] = useState(false);

  // Extrair propriedades do schema
  const {
    questionId = 'question-1',
    title = 'Qual dessas opções mais combina com você?',
    description = '',
    questionType = 'both', // 'both', 'text', 'image'
    multiSelect = true,
    maxSelections = 3, // QUESTÕES NORMAIS: 3 obrigatórias | ESTRATÉGICAS: 1 obrigatória
    required = true,
    options = [],
    showProgress = true,
    progressPercent = 10,
    isStrategicQuestion = false, // Diferencia questões normais das estratégicas
    autoAdvance = false // Auto-avanço para questões normais
  } = block.properties;

  const handleOptionSelect = (optionId: string) => {
    let newAnswers: string[];
    
    if (isStrategicQuestion) {
      // QUESTÕES ESTRATÉGICAS: apenas 1 seleção
      newAnswers = [optionId];
    } else {
      // QUESTÕES NORMAIS: múltipla escolha (3 obrigatórias)
      if (selectedAnswers.includes(optionId)) {
        // Remover seleção
        newAnswers = selectedAnswers.filter(id => id !== optionId);
      } else {
        // Adicionar seleção (respeitando limite de 3)
        if (selectedAnswers.length < maxSelections) {
          newAnswers = [...selectedAnswers, optionId];
        } else {
          return; // Não permite mais de 3 seleções
        }
      }
    }
    
    setSelectedAnswers(newAnswers);
    setHasAnswered(newAnswers.length > 0);
    
    // AUTO-AVANÇO para questões normais após 3ª seleção
    if (!isStrategicQuestion && newAnswers.length === maxSelections && autoAdvance) {
      setTimeout(() => {
        if (onNext) {
          onNext();
        }
      }, 500); // Pequeno delay para feedback visual
    }
    
    if (onAnswer) {
      onAnswer(newAnswers);
    }
  };

  const handleNext = () => {
    if (!required || hasAnswered) {
      if (onNext) {
        onNext();
      }
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

  const canProceed = isStrategicQuestion 
    ? hasAnswered // Estratégicas: 1 seleção
    : selectedAnswers.length === maxSelections; // Normais: 3 seleções obrigatórias

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

      <div className="max-w-4xl mx-auto w-full space-y-8">
        {/* Question Header */}
        <div className="text-center space-y-4">
          <InlineEditText
            value={title}
            onSave={(value: string) => handlePropertyChange('title', value)}
            className="text-2xl md:text-3xl font-bold text-gray-900"
            placeholder="Digite sua pergunta aqui"
            as="h2"
            disabled={!isEditing}
          />
          
          {description && (
            <InlineEditText
              value={description}
              onSave={(value: string) => handlePropertyChange('description', value)}
              className="text-lg text-[#8F7A6A]" // brand-light-coffee
              placeholder="Contexto adicional da pergunta"
              as="p"
              disabled={!isEditing}
            />
          )}
          
          {!isStrategicQuestion && (
            <p className="text-sm text-[#8F7A6A]">
              Selecione exatamente 3 opções ({selectedAnswers.length}/3)
            </p>
          )}
          
          {isStrategicQuestion && (
            <p className="text-sm text-[#8F7A6A]">
              Selecione uma opção para continuar
            </p>
          )}
        </div>

        {/* Options Grid */}
        <div className={cn(
          'grid gap-4',
          options.length <= 2 ? 'grid-cols-1 md:grid-cols-2' :
          options.length <= 4 ? 'grid-cols-1 md:grid-cols-2' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        )}>
          {options.map((option: any, index: number) => {
            const isSelected = selectedAnswers.includes(option.id);
            const showImage = questionType === 'both' || questionType === 'image';
            const showText = questionType === 'both' || questionType === 'text';
            
            return (
              <button
                key={option.id || index}
                onClick={() => handleOptionSelect(option.id)}
                className={cn(
                  'relative p-4 rounded-lg border-2 transition-all duration-200',
                  'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#B89B7A]/20',
                  'hover:scale-105 hover:border-[#B89B7A]/40',
                  isSelected 
                    ? 'border-[#B89B7A] bg-[#B89B7A]/10 shadow-md' // brand-gold
                    : 'border-[#B89B7A]/20 hover:border-[#B89B7A]/40 bg-white'
                )}
              >
                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-[#B89B7A] rounded-full flex items-center justify-center"> {/* brand-gold */}
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                
                {/* Option Image */}
                {showImage && option.imageUrl && (
                  <div className="mb-3">
                    <img
                      src={option.imageUrl}
                      alt={option.text}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                )}
                
                {/* Option Text */}
                {showText && (
                  <div className="text-center space-y-1">
                    {isEditing ? (
                      <InlineEditText
                        value={option.text}
                        onSave={(value: string) => {
                          const updatedOptions = options.map((opt: any, i: number) => 
                            i === index ? { ...opt, text: value } : opt
                          );
                          handlePropertyChange('options', updatedOptions);
                        }}
                        className={cn(
                          'font-medium text-base',
                          isSelected ? 'text-[#432818]' : 'text-[#432818]' // brand-coffee
                        )}
                        placeholder="Texto da opção"
                        as="p"
                      />
                    ) : (
                      <p className={cn(
                        'font-medium text-base',
                        isSelected ? 'text-[#432818]' : 'text-[#432818]' // brand-coffee
                      )}>
                        {option.text}
                      </p>
                    )}
                    {option.description && (
                      isEditing ? (
                        <InlineEditText
                          value={option.description}
                          onSave={(value: string) => {
                            const updatedOptions = options.map((opt: any, i: number) => 
                              i === index ? { ...opt, description: value } : opt
                            );
                            handlePropertyChange('options', updatedOptions);
                          }}
                          className={cn(
                            'text-sm',
                            isSelected ? 'text-[#8F7A6A]' : 'text-[#8F7A6A]' // brand-light-coffee
                          )}
                          placeholder="Descrição da opção"
                          as="p"
                        />
                      ) : (
                        <p className={cn(
                          'text-sm',
                          isSelected ? 'text-[#8F7A6A]' : 'text-[#8F7A6A]' // brand-light-coffee
                        )}>
                          {option.description}
                        </p>
                      )
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8">
          <button
            onClick={handlePrevious}
            className="px-6 py-3 text-[#8F7A6A] hover:text-[#432818] transition-colors" // brand colors
          >
            ← Anterior
          </button>
          
          <div className="text-center">
            {!canProceed && (
              <p className="text-sm text-[#8F7A6A]">
                {isStrategicQuestion 
                  ? 'Selecione uma opção para continuar'
                  : `Selecione ${maxSelections - selectedAnswers.length} opção(ões) para prosseguir`
                }
              </p>
            )}
            {!isStrategicQuestion && canProceed && autoAdvance && (
              <p className="text-sm text-[#10b981]">
                Avançando automaticamente...
              </p>
            )}
          </div>
          
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={cn(
              'px-6 py-3 rounded-lg font-medium transition-all',
              'focus:outline-none focus:ring-4 focus:ring-[#B89B7A]/20',
              canProceed
                ? 'bg-[#B89B7A] text-white hover:bg-[#A38A69] shadow-md hover:shadow-lg hover:scale-105' // brand-gold
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            )}
          >
            {isStrategicQuestion ? 'Continuar' : 'Próximo'} →
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestionBlock;
