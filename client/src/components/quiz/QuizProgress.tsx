// Componente criado usando snippets ES7 React/Redux/React-Native/JS
// Usando snippet "rafce" + Tab para criar componente

import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useLoadingState, useAnalytics, useViewport } from '@/hooks/useQuizHooks';
import { cn } from '@/lib/utils';
import { CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';

// Usando snippet "interface" + Tab para criar interface
interface QuizQuestion {
  id: string;
  question: string;
  answers: Array<{
    id: string;
    text: string;
    value: string;
    points: number;
  }>;
}

interface QuizProgressProps {
  questions: QuizQuestion[];
  onComplete: (results: Record<string, any>) => void;
  className?: string;
}

// Usando snippet "memo" + Tab para otimizar performance
const QuizProgress: React.FC<QuizProgressProps> = React.memo(({ 
  questions, 
  onComplete, 
  className 
}) => {
  // Usando snippet "useState" + Tab para gerenciar estados
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  
  // Usando custom hooks criados com snippets
  const { loading, startLoading, stopLoading } = useLoadingState();
  const { trackEvent } = useAnalytics();
  const { isMobile, isTablet } = useViewport();
  
  // Usando snippet "useMemo" + Tab para otimizar cálculos
  const progress = useMemo(() => {
    return ((currentQuestion + 1) / questions.length) * 100;
  }, [currentQuestion, questions.length]);
  
  const isLastQuestion = useMemo(() => {
    return currentQuestion === questions.length - 1;
  }, [currentQuestion, questions.length]);
  
  const canProceed = useMemo(() => {
    return selectedAnswer !== '';
  }, [selectedAnswer]);
  
  // Usando snippet "useCallback" + Tab para otimizar funções
  const handleAnswerSelect = useCallback((answerId: string) => {
    setSelectedAnswer(answerId);
    trackEvent('answer_selected', { 
      questionId: questions[currentQuestion].id, 
      answerId 
    });
  }, [currentQuestion, questions, trackEvent]);
  
  const handleNext = useCallback(async () => {
    if (!canProceed) return;
    
    startLoading();
    
    // Simular delay para melhor UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: selectedAnswer
    };
    
    setAnswers(newAnswers);
    setSelectedAnswer('');
    
    if (isLastQuestion) {
      trackEvent('quiz_completed', { answers: newAnswers });
      onComplete(newAnswers);
    } else {
      setCurrentQuestion(prev => prev + 1);
      trackEvent('question_answered', { 
        questionId: questions[currentQuestion].id,
        questionNumber: currentQuestion + 1
      });
    }
    
    stopLoading();
  }, [
    canProceed,
    startLoading,
    stopLoading,
    answers,
    selectedAnswer,
    currentQuestion,
    questions,
    isLastQuestion,
    onComplete,
    trackEvent
  ]);
  
  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(answers[questions[currentQuestion - 1].id] || '');
      trackEvent('question_previous', { questionNumber: currentQuestion });
    }
  }, [currentQuestion, answers, questions, trackEvent]);
  
  const handleReset = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedAnswer('');
    trackEvent('quiz_reset');
  }, [trackEvent]);
  
  // Usando snippet "dob" + Tab para destructuring
  const { question, answers: questionAnswers } = questions[currentQuestion] || {};
  
  return (
    <Card className={cn(
      'w-full max-w-2xl mx-auto p-6 lg:p-8',
      'bg-gradient-to-br from-white to-gray-50',
      'shadow-lg border-2 border-gray-100',
      'transition-all duration-300 hover:shadow-xl',
      className
    )}>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Pergunta {currentQuestion + 1} de {questions.length}
          </span>
          <span className="text-sm font-medium text-blue-600">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress 
          value={progress} 
          className="h-2 bg-gray-200"
          style={{
            '--progress-background': 'linear-gradient(to right, #3B82F6, #1D4ED8)',
            transition: 'all 0.5s ease-in-out'
          } as React.CSSProperties}
        />
      </div>
      
      {/* Question */}
      <div className="mb-8">
        <h2 className={cn(
          'font-bold text-gray-800 leading-tight',
          isMobile ? 'text-xl' : 'text-2xl lg:text-3xl'
        )}>
          {question}
        </h2>
      </div>
      
      {/* Answers */}
      <div className="space-y-3 mb-8">
        {questionAnswers?.map((answer) => (
          <button
            key={answer.id}
            onClick={() => handleAnswerSelect(answer.id)}
            disabled={loading}
            className={cn(
              'w-full p-4 text-left rounded-lg border-2 transition-all duration-200',
              'hover:bg-blue-50 hover:border-blue-300',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              selectedAnswer === answer.id
                ? 'bg-blue-100 border-blue-500 text-blue-700'
                : 'bg-white border-gray-200 text-gray-700'
            )}
          >
            <div className="flex items-center justify-between">
              <span className={cn(
                'font-medium',
                isMobile ? 'text-sm' : 'text-base'
              )}>
                {answer.text}
              </span>
              {selectedAnswer === answer.id && (
                <CheckCircle className="w-5 h-5 text-blue-500" />
              )}
            </div>
          </button>
        ))}
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {currentQuestion > 0 && (
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {isMobile ? 'Voltar' : 'Anterior'}
            </Button>
          )}
          
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={loading}
            className="text-gray-600 hover:text-gray-800"
          >
            Reiniciar
          </Button>
        </div>
        
        <Button
          onClick={handleNext}
          disabled={!canProceed || loading}
          className={cn(
            'flex items-center gap-2 px-6 py-2',
            'bg-gradient-to-r from-blue-500 to-blue-600',
            'hover:from-blue-600 hover:to-blue-700',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-all duration-200'
          )}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span className="font-medium">
                {isLastQuestion ? 'Finalizar' : 'Próxima'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </Card>
  );
});

// Usando snippet para definir displayName
QuizProgress.displayName = 'QuizProgress';

export default QuizProgress;
