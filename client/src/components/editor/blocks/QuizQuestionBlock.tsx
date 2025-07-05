import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { InlineEditableText } from './InlineEditableText';
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
    multiSelect = false,
    required = true,
    options = [],
    showProgress = true,
    progressPercent = 10
  } = block.properties;

  const handleOptionSelect = (optionId: string) => {
    let newAnswers: string[];
    
    if (multiSelect) {
      // Múltipla escolha
      if (selectedAnswers.includes(optionId)) {
        newAnswers = selectedAnswers.filter(id => id !== optionId);
      } else {
        newAnswers = [...selectedAnswers, optionId];
      }
    } else {
      // Escolha única
      newAnswers = [optionId];
    }
    
    setSelectedAnswers(newAnswers);
    setHasAnswered(newAnswers.length > 0);
    
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

  const canProceed = !required || hasAnswered;

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col justify-center p-6',
        'transition-all duration-200',
        isSelected && 'ring-2 ring-blue-500 ring-offset-2',
        className
      )}
      onClick={handleClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      {/* Progress Bar */}
      {showProgress && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="h-2 bg-gray-200">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto w-full space-y-8">
        {/* Question Header */}
        <div className="text-center space-y-4">
          <InlineEditableText
            value={title}
            onChange={(value) => handlePropertyChange('title', value)}
            className="text-2xl md:text-3xl font-bold text-gray-900"
            isEditing={isEditing}
            placeholder="Digite sua pergunta aqui"
          />
          
          {description && (
            <InlineEditableText
              value={description}
              onChange={(value) => handlePropertyChange('description', value)}
              className="text-lg text-gray-600"
              isEditing={isEditing}
              placeholder="Contexto adicional da pergunta"
            />
          )}
          
          {multiSelect && (
            <p className="text-sm text-gray-500">
              Você pode selecionar múltiplas opções
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
                  'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                  isSelected 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                )}
              >
                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
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
                  <div className="text-center">
                    <p className={cn(
                      'font-medium',
                      isSelected ? 'text-blue-900' : 'text-gray-900'
                    )}>
                      {option.text}
                    </p>
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
            className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Anterior
          </button>
          
          <div className="text-center">
            {required && !hasAnswered && (
              <p className="text-sm text-gray-500">
                Selecione uma opção para continuar
              </p>
            )}
          </div>
          
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={cn(
              'px-6 py-3 rounded-lg font-medium transition-all',
              canProceed
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            )}
          >
            Próximo →
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestionBlock;
