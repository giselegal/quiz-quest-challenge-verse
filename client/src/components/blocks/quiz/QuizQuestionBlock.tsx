import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

/**
 * QuizQuestionBlock - Componente de pergunta de quiz 100% reutilizável e editável
 * 
 * Props editáveis via editor visual:
 * - question: string - Texto da pergunta
 * - description?: string - Descrição opcional
 * - options: QuestionOption[] - Array de opções
 * - multipleSelection?: boolean - Permite múltipla seleção
 * - maxSelections?: number - Máximo de seleções (quando múltipla)
 * - required?: boolean - Campo obrigatório
 * - alignment?: 'left' | 'center' | 'right' - Alinhamento
 * - optionLayout?: 'vertical' | 'horizontal' | 'grid' - Layout das opções
 * - showImages?: boolean - Exibir imagens nas opções
 * - onAnswer?: (answers: string[]) => void - Callback de resposta
 * 
 * @example
 * <QuizQuestionBlock
 *   blockId="quiz-question-1"
 *   question="Qual o seu tipo de roupa favorita?"
 *   options={[
 *     { id: 'natural', text: 'Conforto e praticidade', imageUrl: '...', value: 'natural' },
 *     { id: 'classico', text: 'Discrição e sobriedade', imageUrl: '...', value: 'classico' }
 *   ]}
 *   multipleSelection={true}
 *   maxSelections={3}
 *   required={true}
 *   onAnswer={(answers) => console.log('Respostas:', answers)}
 * />
 */

export interface QuestionOption {
  id: string;
  text: string;
  value: string;
  imageUrl?: string;
  category?: string;
}

export interface QuizQuestionBlockProps {
  // Identificação
  blockId: string;
  className?: string;
  style?: React.CSSProperties;

  // Conteúdo editável
  question: string;
  description?: string;
  options: QuestionOption[];

  // Configurações de seleção
  multipleSelection?: boolean;
  maxSelections?: number;
  minSelections?: number;
  required?: boolean;

  // Layout e apresentação
  alignment?: 'left' | 'center' | 'right';
  optionLayout?: 'vertical' | 'horizontal' | 'grid';
  showImages?: boolean;
  
  // Callbacks
  onAnswer?: (answers: string[]) => void;
  onValidationError?: (error: string) => void;

  // Estados
  selectedAnswers?: string[];
  disabled?: boolean;
}

const QuizQuestionBlock: React.FC<QuizQuestionBlockProps> = ({
  blockId,
  className = '',
  style = {},
  question,
  description,
  options = [],
  multipleSelection = false,
  maxSelections = 1,
  minSelections = 1,
  required = false,
  alignment = 'center',
  optionLayout = 'grid',
  showImages = true,
  onAnswer,
  onValidationError,
  selectedAnswers = [],
  disabled = false
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selectedAnswers);
  const [validationError, setValidationError] = useState<string>('');

  // Sincronizar com selectedAnswers externo
  useEffect(() => {
    setSelectedOptions(selectedAnswers);
  }, [selectedAnswers]);

  const handleOptionClick = (optionId: string) => {
    if (disabled) return;

    let newSelection: string[];

    if (multipleSelection) {
      if (selectedOptions.includes(optionId)) {
        // Remover seleção
        newSelection = selectedOptions.filter(id => id !== optionId);
      } else {
        // Adicionar seleção
        if (selectedOptions.length >= maxSelections) {
          const error = `Você pode selecionar no máximo ${maxSelections} opções`;
          setValidationError(error);
          onValidationError?.(error);
          return;
        }
        newSelection = [...selectedOptions, optionId];
      }
    } else {
      // Seleção única
      newSelection = [optionId];
    }

    setSelectedOptions(newSelection);
    setValidationError('');
    onAnswer?.(newSelection);
  };

  const validate = () => {
    if (required && selectedOptions.length === 0) {
      const error = 'Esta pergunta é obrigatória';
      setValidationError(error);
      onValidationError?.(error);
      return false;
    }

    if (multipleSelection && selectedOptions.length < minSelections) {
      const error = `Selecione pelo menos ${minSelections} opções`;
      setValidationError(error);
      onValidationError?.(error);
      return false;
    }

    return true;
  };

  const getGridCols = () => {
    switch (optionLayout) {
      case 'horizontal':
        return 'grid-cols-1 md:grid-cols-4';
      case 'vertical':
        return 'grid-cols-1';
      case 'grid':
      default:
        return 'grid-cols-1 md:grid-cols-2';
    }
  };

  return (
    <div 
      className={`quiz-question-block ${className}`}
      style={style}
      data-block-id={blockId}
    >
      <div className="py-6">
        <div className="space-y-6">
          {/* Pergunta */}
          <div className={`text-${alignment}`}>
            <h3 className="text-xl md:text-2xl font-semibold text-[#432818] leading-relaxed font-playfair">
              {question || 'Qual é a sua pergunta?'}
            </h3>
            {description && (
              <p className="text-[#6B5B73] text-lg mt-2">
                {description}
              </p>
            )}
          </div>

          {/* Opções */}
          <div className={`grid gap-4 ${getGridCols()}`}>
            {options.map((option, index) => {
              const isSelected = selectedOptions.includes(option.id);
              
              return (
                <div
                  key={option.id}
                  onClick={() => handleOptionClick(option.id)}
                  className={`
                    border-2 rounded-xl transition-all duration-200 cursor-pointer group
                    ${isSelected 
                      ? 'border-[#B89B7A] bg-[#f9f4ef] shadow-md' 
                      : 'border-[#B89B7A]/30 hover:border-[#B89B7A] hover:bg-[#f9f4ef]'
                    }
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {/* Imagem da opção */}
                  {showImages && option.imageUrl && (
                    <div className="aspect-[4/3] overflow-hidden rounded-t-xl">
                      <img
                        src={option.imageUrl}
                        alt={option.text}
                        className={`w-full h-full object-cover transition-transform duration-300 ${
                          !disabled ? 'group-hover:scale-105' : ''
                        }`}
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Texto da opção */}
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <span className={`
                        font-bold text-lg min-w-[24px] transition-transform
                        ${isSelected ? 'text-[#B89B7A] scale-110' : 'text-[#B89B7A]'}
                        ${!disabled ? 'group-hover:scale-110' : ''}
                      `}>
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span className={`
                        text-sm leading-relaxed
                        ${isSelected ? 'text-[#432818] font-medium' : 'text-[#432818]'}
                      `}>
                        {option.text}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Instruções para múltipla seleção */}
          {multipleSelection && (
            <div className="text-center text-sm text-[#6B5B73] italic">
              Selecione até {maxSelections} opções
              {selectedOptions.length > 0 && (
                <span className="ml-2 text-[#B89B7A] font-medium">
                  ({selectedOptions.length}/{maxSelections} selecionadas)
                </span>
              )}
            </div>
          )}

          {/* Erro de validação */}
          {validationError && (
            <div className="text-center text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {validationError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestionBlock;
