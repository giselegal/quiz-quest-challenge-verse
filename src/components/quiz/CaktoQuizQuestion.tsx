import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check, ArrowRight } from 'lucide-react';
import type { QuizQuestion, QuizResponse, StyleType } from '@/types/quiz';
import { processMultipleSelections, validateQuestionResponse } from '@/lib/caktoQuizEngine';

interface CaktoQuizQuestionProps {
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (response: QuizResponse) => void;
  onNext: () => void;
  isLastQuestion?: boolean;
}

export const CaktoQuizQuestion: React.FC<CaktoQuizQuestionProps> = ({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
  onNext,
  isLastQuestion = false
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<NodeJS.Timeout | null>(null);

  const isNormalQuestion = question.type === 'normal';
  const requiredSelections = isNormalQuestion ? 3 : 1;
  const maxSelections = isNormalQuestion ? (question.multiSelect || 3) : 1;
  
  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  // Limpar seleções quando a questão muda
  useEffect(() => {
    setSelectedOptions([]);
    setIsAnswered(false);
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
      setAutoAdvanceTimer(null);
    }
  }, [question.id]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
      }
    };
  }, [autoAdvanceTimer]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOptions(prev => {
      let newSelections: string[];
      
      if (prev.includes(optionId)) {
        // Desmarcar opção
        newSelections = prev.filter(id => id !== optionId);
      } else {
        // Marcar opção
        if (prev.length < maxSelections) {
          newSelections = [...prev, optionId];
        } else {
          // Se já tem o máximo, substituir a primeira (para questões normais)
          newSelections = isNormalQuestion 
            ? [...prev.slice(1), optionId]
            : [optionId]; // Para estratégicas, só permite 1
        }
      }

      // Verificar se atingiu o número necessário de seleções
      if (newSelections.length === requiredSelections) {
        const selectedStyles = newSelections
          .map(id => question.options.find(opt => opt.id === id)?.style)
          .filter(Boolean) as StyleType[];

        const response = processMultipleSelections(
          question.id,
          newSelections,
          selectedStyles
        );

        onAnswer(response);
        setIsAnswered(true);

        // Auto-advance para questões normais
        if (isNormalQuestion && !isLastQuestion) {
          const timer = setTimeout(() => {
            onNext();
          }, 500); // Delay de 500ms para feedback visual
          setAutoAdvanceTimer(timer);
        }
      } else {
        setIsAnswered(false);
      }

      return newSelections;
    });
  };

  const handleManualNext = () => {
    if (isAnswered) {
      onNext();
    }
  };

  const getSelectionText = () => {
    const remaining = requiredSelections - selectedOptions.length;
    if (remaining > 0) {
      return isNormalQuestion 
        ? `Selecione mais ${remaining} opção${remaining > 1 ? 'ões' : ''}`
        : 'Selecione uma opção';
    }
    return isNormalQuestion ? 'Avançando automaticamente...' : 'Clique em Continuar';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Questão {questionIndex + 1} de {totalQuestions}
            </span>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {question.question}
          </h1>
          
          {/* Selection Counter */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
            <div className="flex gap-1">
              {Array.from({ length: requiredSelections }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < selectedOptions.length ? 'bg-pink-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">{getSelectionText()}</span>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {question.options.map((option) => {
            const isSelected = selectedOptions.includes(option.id);
            const selectionOrder = selectedOptions.indexOf(option.id) + 1;
            
            return (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  isSelected 
                    ? 'ring-2 ring-pink-500 bg-pink-50 border-pink-200' 
                    : 'border-gray-200 hover:border-pink-300'
                }`}
                onClick={() => handleOptionSelect(option.id)}
              >
                <div className="relative p-4">
                  {/* Selection Order Badge */}
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {selectionOrder}
                    </div>
                  )}

                  {/* Option Image */}
                  {option.imageUrl && (
                    <div className="mb-4">
                      <img
                        src={option.imageUrl}
                        alt={option.text}
                        className="w-full h-48 object-cover rounded-lg"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Option Text */}
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected 
                        ? 'bg-pink-500 border-pink-500' 
                        : 'border-gray-300'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{option.text}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Next Button (only for strategic questions or manual override) */}
        {(!isNormalQuestion || isLastQuestion) && (
          <div className="text-center">
            <Button
              onClick={handleManualNext}
              disabled={!isAnswered}
              size="lg"
              className="px-8 py-3 bg-pink-600 hover:bg-pink-700 disabled:opacity-50"
            >
              {isLastQuestion ? 'Ver Resultado' : 'Continuar'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Auto-advance message for normal questions */}
        {isNormalQuestion && isAnswered && !isLastQuestion && (
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Avançando automaticamente...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaktoQuizQuestion;
