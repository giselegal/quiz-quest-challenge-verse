import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, X } from 'lucide-react';
import { analyticsService } from '../../../services/analyticsService';

/**
 * TrueFalseQuestionBlock - Componente para perguntas de Verdadeiro/Falso
 * 
 * Props editáveis via editor visual:
 * - question: string - Texto da pergunta
 * - description?: string - Descrição opcional
 * - correctAnswer?: boolean - Resposta correta (true/false)
 * - required?: boolean - Campo obrigatório
 * - alignment?: 'left' | 'center' | 'right' - Alinhamento
 * - onAnswer?: (answer: boolean) => void - Callback de resposta
 */

export interface TrueFalseQuestionBlockProps {
  // Identificação
  blockId: string;
  className?: string;
  style?: React.CSSProperties;

  // Conteúdo editável
  question: string;
  description?: string;
  correctAnswer?: boolean;

  // Header properties
  logoUrl?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  progressPercent?: number;

  // Configurações
  required?: boolean;
  alignment?: 'left' | 'center' | 'right';
  
  // Callbacks
  onAnswer?: (answer: boolean | null) => void;
  onValidationError?: (error: string) => void;
  
  // Editor integration props
  onClick?: () => void;
  isSelected?: boolean;
  block?: any;

  // Estados
  selectedAnswer?: boolean | null;
  disabled?: boolean;
}

const TrueFalseQuestionBlock: React.FC<TrueFalseQuestionBlockProps> = ({
  blockId,
  className = '',
  style = {},
  question,
  description,
  correctAnswer,
  
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
  selectedAnswer,
  disabled = false
}) => {
  const [currentAnswer, setCurrentAnswer] = useState<boolean | null>(selectedAnswer || null);
  const [hasAnswered, setHasAnswered] = useState(false);

  useEffect(() => {
    if (selectedAnswer !== undefined) {
      setCurrentAnswer(selectedAnswer);
    }
  }, [selectedAnswer]);

  const handleAnswerSelect = (answer: boolean) => {
    if (disabled) return;
    
    setCurrentAnswer(answer);
    setHasAnswered(true);
    
    // Track analytics
    analyticsService.trackEvent('quiz_question_answered', {
      question_type: 'true_false',
      question_id: blockId,
      answer: answer,
      is_correct: correctAnswer !== undefined ? answer === correctAnswer : null,
      time_to_answer: Date.now() // Could be improved with actual timing
    });
    
    if (onAnswer) {
      onAnswer(answer);
    }
  };

  const validateAnswer = () => {
    if (required && currentAnswer === null) {
      const error = 'Por favor, selecione uma resposta.';
      if (onValidationError) {
        onValidationError(error);
      }
      return false;
    }
    return true;
  };

  const alignmentClass = {
    'left': 'text-left',
    'center': 'text-center',
    'right': 'text-right'
  }[alignment];

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

          {/* True/False Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* True Option */}
            <Button
              variant={currentAnswer === true ? "default" : "outline"}
              size="lg"
              onClick={() => handleAnswerSelect(true)}
              disabled={disabled}
              className={`
                w-full sm:w-48 h-16 text-lg font-medium transition-all duration-200
                ${currentAnswer === true
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-white hover:bg-green-50 text-gray-700 border-2 border-gray-300 hover:border-green-300'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <Check className="w-5 h-5 mr-2" />
              Verdadeiro
            </Button>

            {/* False Option */}
            <Button
              variant={currentAnswer === false ? "default" : "outline"}
              size="lg"
              onClick={() => handleAnswerSelect(false)}
              disabled={disabled}
              className={`
                w-full sm:w-48 h-16 text-lg font-medium transition-all duration-200
                ${currentAnswer === false
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-white hover:bg-red-50 text-gray-700 border-2 border-gray-300 hover:border-red-300'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <X className="w-5 h-5 mr-2" />
              Falso
            </Button>
          </div>

          {/* Feedback */}
          {hasAnswered && currentAnswer !== null && (
            <div className={`
              text-center p-4 rounded-lg
              ${currentAnswer === correctAnswer 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
              }
            `}>
              {correctAnswer !== undefined ? (
                currentAnswer === correctAnswer 
                  ? '✅ Resposta registrada!' 
                  : '📝 Resposta registrada!'
              ) : (
                '✅ Resposta registrada!'
              )}
            </div>
          )}

          {/* Required indicator */}
          {required && !hasAnswered && (
            <p className="text-sm text-gray-500 text-center">
              * Esta pergunta é obrigatória
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrueFalseQuestionBlock;