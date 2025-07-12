
import React, { useEffect } from 'react';
import { QuizQuestion } from '../QuizQuestion';
import { UserResponse } from '@/types/quiz';
import { QuizHeader } from './QuizHeader';
import { StrategicQuestions } from './StrategicQuestions';
import { useQuizTracking, useAutoClickTracking } from '@/hooks/useQuizTracking';
import { useScrollTracking } from '@/hooks/useScrollTracking';

interface QuizContentWithTrackingProps {
  user: any;
  currentQuestionIndex: number;
  totalQuestions: number;
  showingStrategicQuestions: boolean;
  currentStrategicQuestionIndex: number;
  currentQuestion: any;
  currentAnswers: string[];
  handleAnswerSubmit: (response: UserResponse) => void;
  onNavigate?: (direction: 'next' | 'back', fromIndex: number, toIndex?: number) => void;
}

export const QuizContentWithTracking: React.FC<QuizContentWithTrackingProps> = ({
  user,
  currentQuestionIndex,
  totalQuestions,
  showingStrategicQuestions,
  currentStrategicQuestionIndex,
  currentQuestion,
  currentAnswers,
  handleAnswerSubmit,
  onNavigate,
}) => {
  const userName = user?.userName || localStorage.getItem('userName') || '';
  
  // Hooks de tracking
  const {
    trackQuizOptionClick,
    trackAnswerSubmission,
    trackNavigation,
    trackCTAClick,
    trackUIInteraction
  } = useQuizTracking(currentQuestionIndex);

  // Auto-tracking de cliques (opcional)
  useAutoClickTracking(true);

  // Scroll tracking
  const { resetTrackedPercentages } = useScrollTracking(true);

  // Determinar seleções necessárias
  const requiredSelections = showingStrategicQuestions ? 1 : (currentQuestion?.multiSelect || 3);
  const canProceed = currentAnswers?.length === requiredSelections;

  // Track mudança de questão
  useEffect(() => {
    if (currentQuestion) {
      // Reset scroll tracking para nova questão
      resetTrackedPercentages();
      
      trackUIInteraction(
        'question_view',
        currentQuestion.id
      );
    }
  }, [currentQuestion, currentQuestionIndex, showingStrategicQuestions, trackUIInteraction, resetTrackedPercentages]);

  // Função modificada para rastrear cliques em opções
  const handleOptionClick = (optionId: string, optionText: string, event?: React.MouseEvent) => {
    const position = event ? { x: event.clientX, y: event.clientY } : undefined;
    
    trackQuizOptionClick(
      optionId,
      optionText,
      currentQuestion.id,
      position
    );
  };

  // Função modificada para rastrear submissão de respostas
  const handleTrackedAnswerSubmit = (response: UserResponse) => {
    // Calcular pontos de estilo baseado na resposta
    const stylePoints: Record<string, number> = {};
    
    if (currentQuestion && response.selectedOptions) {
      response.selectedOptions.forEach(optionId => {
        const option = currentQuestion.options?.find((opt: any) => opt.id === optionId);
        if (option && option.styleCategory) {
          stylePoints[option.styleCategory] = (stylePoints[option.styleCategory] || 0) + 1;
        }
      });
    }

    // Track submissão
    trackAnswerSubmission(
      currentQuestion.id,
      currentQuestion.question,
      response.selectedOptions || [],
      response.selectedOptions?.map(optionId => {
        const option = currentQuestion.options?.find((opt: any) => opt.id === optionId);
        return option?.text || optionId;
      }) || [],
      stylePoints
    );

    // Chamar função original
    handleAnswerSubmit(response);
  };

  // Função para rastrear navegação
  const handleTrackedNavigation = (direction: 'next' | 'back') => {
    const fromIndex = currentQuestionIndex;
    const toIndex = direction === 'next' ? fromIndex + 1 : fromIndex - 1;
    
    trackNavigation(direction, fromIndex, toIndex);
    
    if (onNavigate) {
      onNavigate(direction, fromIndex, toIndex);
    }
  };

  return (
    <>
      <QuizHeader 
        userName={userName}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        showingStrategicQuestions={showingStrategicQuestions}
        currentStrategicQuestionIndex={currentStrategicQuestionIndex}
      />

      <div className="container mx-auto px-4 py-8 w-full max-w-5xl">
        {showingStrategicQuestions ? (
          <StrategicQuestions
            currentQuestionIndex={currentStrategicQuestionIndex}
            answers={{}}
            onAnswer={handleTrackedAnswerSubmit}
          />
        ) : (
          <QuizQuestion
            question={currentQuestion}
            onAnswer={handleTrackedAnswerSubmit}
            currentAnswers={currentAnswers}
            showQuestionImage={true}
          />
        )}

        {/* Botões de navegação com tracking */}
        <div className="flex justify-between mt-8">
          {currentQuestionIndex > 0 && (
            <button
              onClick={() => handleTrackedNavigation('back')}
              className="px-4 py-2 text-[#aa6b5d] border border-[#aa6b5d] rounded-md hover:bg-[#aa6b5d] hover:text-white transition-colors"
              data-tracking="navigation_back"
            >
              Voltar
            </button>
          )}
          
          {canProceed && currentQuestionIndex < totalQuestions - 1 && (
            <button
              onClick={() => handleTrackedNavigation('next')}
              className="px-6 py-2 bg-[#aa6b5d] text-white rounded-md hover:bg-[#aa6b5d]/90 transition-colors ml-auto"
              data-tracking="navigation_next"
            >
              Próxima
            </button>
          )}
        </div>
      </div>
    </>
  );
};

// Hook para integrar tracking em componentes existentes
export const useQuizElementTracking = () => {
  const { trackCTAClick, trackUIInteraction } = useQuizTracking();

  const trackButtonClick = (buttonType: string, buttonText: string, targetUrl?: string) => {
    trackCTAClick(buttonType, buttonText, targetUrl);
  };

  const trackFormInteraction = (formType: string, fieldName: string, action: string) => {
    trackUIInteraction('form_field', fieldName);
  };

  const trackProgressUpdate = (currentStep: number, totalSteps: number, percentage: number) => {
    trackUIInteraction('progress_update', 'quiz_progress');
  };

  return {
    trackButtonClick,
    trackFormInteraction,
    trackProgressUpdate
  };
};
