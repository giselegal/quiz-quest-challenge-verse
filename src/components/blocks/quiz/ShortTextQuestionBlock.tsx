import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Type } from 'lucide-react';
import { analyticsService } from '../../../services/analyticsService';

/**
 * ShortTextQuestionBlock - Componente para perguntas de resposta curta/texto livre
 * 
 * Props editáveis via editor visual:
 * - question: string - Texto da pergunta
 * - description?: string - Descrição opcional
 * - placeholder?: string - Placeholder do campo de texto
 * - maxLength?: number - Máximo de caracteres
 * - minLength?: number - Mínimo de caracteres
 * - multiline?: boolean - Campo de múltiplas linhas (textarea)
 * - required?: boolean - Campo obrigatório
 * - alignment?: 'left' | 'center' | 'right' - Alinhamento
 * - onAnswer?: (answer: string) => void - Callback de resposta
 */

export interface ShortTextQuestionBlockProps {
  // Identificação
  blockId: string;
  className?: string;
  style?: React.CSSProperties;

  // Conteúdo editável
  question: string;
  description?: string;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  multiline?: boolean;

  // Header properties
  logoUrl?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  progressPercent?: number;

  // Configurações
  required?: boolean;
  alignment?: 'left' | 'center' | 'right';
  
  // Callbacks
  onAnswer?: (answer: string) => void;
  onValidationError?: (error: string) => void;
  
  // Editor integration props
  onClick?: () => void;
  isSelected?: boolean;
  block?: any;

  // Estados
  currentAnswer?: string;
  disabled?: boolean;
}

const ShortTextQuestionBlock: React.FC<ShortTextQuestionBlockProps> = ({
  blockId,
  className = '',
  style = {},
  question,
  description,
  placeholder = 'Digite sua resposta aqui...',
  maxLength = 500,
  minLength = 1,
  multiline = false,
  
  // Header props
  logoUrl = '/api/placeholder/96/96',
  showBackButton = true,
  onBack,
  progressPercent = 65,
  
  // Config props
  required = true,
  alignment = 'center',
  
  // Callbacks
  onAnswer,
  onValidationError,
  
  // Editor integration
  onClick,
  isSelected = false,
  
  // Estados
  currentAnswer = '',
  disabled = false
}) => {
  const [answer, setAnswer] = useState<string>(currentAnswer);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setAnswer(currentAnswer);
  }, [currentAnswer]);

  useEffect(() => {
    validateAnswer(answer);
  }, [answer, required, minLength]);

  const validateAnswer = (value: string) => {
    const trimmedValue = value.trim();
    let valid = true;
    let error = '';

    if (required && trimmedValue.length === 0) {
      valid = false;
      error = 'Este campo é obrigatório.';
    } else if (trimmedValue.length > 0 && trimmedValue.length < minLength) {
      valid = false;
      error = `Resposta deve ter pelo menos ${minLength} caracteres.`;
    } else if (trimmedValue.length > maxLength) {
      valid = false;
      error = `Resposta deve ter no máximo ${maxLength} caracteres.`;
    }

    setIsValid(valid);
    
    if (!valid && hasAnswered && onValidationError) {
      onValidationError(error);
    }
    
    return valid;
  };

  const handleAnswerChange = (value: string) => {
    setAnswer(value);
    setHasAnswered(true);
    
    if (onAnswer) {
      onAnswer(value);
    }
  };

  const handleSubmit = () => {
    const trimmedAnswer = answer.trim();
    if (validateAnswer(trimmedAnswer) && onAnswer) {
      // Track analytics
      analyticsService.trackEvent('quiz_question_answered', {
        question_type: 'short_text',
        question_id: blockId,
        answer_length: trimmedAnswer.length,
        is_multiline: multiline,
        time_to_answer: Date.now() // Could be improved with actual timing
      });
      
      onAnswer(trimmedAnswer);
    }
  };

  const alignmentClass = {
    'left': 'text-left',
    'center': 'text-center',
    'right': 'text-right'
  }[alignment];

  const characterCount = answer.length;
  const isOverLimit = characterCount > maxLength;
  const isUnderLimit = hasAnswered && answer.trim().length < minLength;

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br from-[#F5F3F0] to-[#E8E2D8] flex flex-col ${className} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={style}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          {showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-gray-200"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
          <img 
            src={logoUrl} 
            alt="Logo" 
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">{progressPercent}%</div>
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#B89B7A] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className={`max-w-2xl w-full space-y-8 ${alignmentClass}`}>
          
          {/* Question */}
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
              {question}
            </h1>
            
            {description && (
              <p className="text-lg text-gray-600 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Text Input Area */}
          <div className="space-y-4">
            <div className="relative">
              <Type className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              
              {multiline ? (
                <Textarea
                  value={answer}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder={placeholder}
                  disabled={disabled}
                  maxLength={maxLength}
                  className={`
                    w-full pl-12 pr-4 py-3 text-lg border-2 rounded-lg resize-none min-h-[120px]
                    transition-all duration-200 focus:outline-none focus:ring-2
                    ${isValid || !hasAnswered
                      ? 'border-gray-300 focus:border-[#B89B7A] focus:ring-[#B89B7A]/20' 
                      : 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    }
                    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
                  `}
                />
              ) : (
                <Input
                  value={answer}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder={placeholder}
                  disabled={disabled}
                  maxLength={maxLength}
                  className={`
                    w-full pl-12 pr-4 py-3 text-lg border-2 rounded-lg h-14
                    transition-all duration-200 focus:outline-none focus:ring-2
                    ${isValid || !hasAnswered
                      ? 'border-gray-300 focus:border-[#B89B7A] focus:ring-[#B89B7A]/20' 
                      : 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    }
                    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
                  `}
                />
              )}
            </div>

            {/* Character Count */}
            <div className="flex justify-between items-center text-sm">
              <div>
                {required && (
                  <span className="text-gray-500">* Campo obrigatório</span>
                )}
              </div>
              <div className={`
                ${isOverLimit ? 'text-red-500' : 
                  characterCount > maxLength * 0.8 ? 'text-orange-500' : 'text-gray-400'
                }
              `}>
                {characterCount}/{maxLength} caracteres
              </div>
            </div>

            {/* Validation Messages */}
            {hasAnswered && !isValid && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {isUnderLimit && `Resposta deve ter pelo menos ${minLength} caracteres.`}
                {isOverLimit && `Resposta deve ter no máximo ${maxLength} caracteres.`}
                {required && answer.trim().length === 0 && 'Este campo é obrigatório.'}
              </div>
            )}

            {/* Success Message */}
            {hasAnswered && isValid && answer.trim().length > 0 && (
              <div className="text-green-600 text-sm bg-green-50 p-3 rounded-lg">
                ✅ Resposta registrada!
              </div>
            )}
          </div>

          {/* Submit Button (opcional para envio manual) */}
          {hasAnswered && answer.trim().length > 0 && (
            <div className="flex justify-center">
              <Button
                onClick={handleSubmit}
                disabled={!isValid || disabled}
                size="lg"
                className={`
                  px-8 py-3 text-lg font-medium transition-all duration-200
                  ${isValid 
                    ? 'bg-[#B89B7A] hover:bg-[#A68B6A] text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                Confirmar Resposta
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShortTextQuestionBlock;