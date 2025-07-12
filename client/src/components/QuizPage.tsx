
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useRouter } from 'wouter';
import { QuizProvider, useQuiz } from '@/context/QuizContext';
import { UserResponse } from '@/types/quiz';
import { useQuizLogic } from '@/hooks/useQuizLogic';
import { useQuizNavigation } from '@/hooks/useQuizNavigation';
import { useQuizTracking } from '@/hooks/useQuizTracking';
import { QuizContent } from './quiz/QuizContent';
import { LoadingSpinner } from './ui/loading-spinner';
import { ErrorBoundary } from 'react-error-boundary';
import { toast } from 'sonner';
import { preloadImages } from '@/utils/imageManager';
import { AnimatedWrapper } from './ui/animated-wrapper';

interface QuizErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const QuizErrorFallback: React.FC<QuizErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <p className="text-red-500 font-bold">Something went wrong:</p>
      <pre className="text-sm text-gray-700 mt-2">{error.message}</pre>
      <button
        onClick={() => resetErrorBoundary()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      >
        Try again
      </button>
    </div>
  );
};

const QuizPageContent: React.FC = () => {
  const [, navigate] = useRouter();
  const [location] = useLocation();
  
  // Get user data from quiz context
  const quizContext = useQuiz();
  const user = { userName: localStorage.getItem('userName') || '' };
  
  const {
    currentQuestionIndex,
    totalQuestions,
    currentQuestion,
    currentAnswers,
    isInitialLoadComplete,
    handleAnswerSubmit: handleQuizAnswerSubmit
  } = useQuizLogic();

  const { trackQuizFinish } = useQuizTracking(currentQuestionIndex);

  const [isLoading, setIsLoading] = useState(true);
  const [showingStrategicQuestions] = useState(false);
  const [currentStrategicQuestionIndex] = useState(0);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleResultNavigation = useCallback((result: any) => {
    if (result?.predominantStyle?.category) {
      localStorage.setItem('quizResult', JSON.stringify(result));
      trackQuizFinish(result);
      navigate('/resultado');
    } else {
      console.error("Resultado do quiz inválido:", result);
      toast.error("Não foi possível calcular o resultado. Tente novamente.");
    }
  }, [navigate, trackQuizFinish]);

  if (isLoading || !isInitialLoadComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <LoadingSpinner size="lg" color="#B89B7A" className="mx-auto" />
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Nenhuma pergunta encontrada.</p>
        </div>
      </div>
    );
  }

  // Preload images when quiz starts
  useEffect(() => {
    if (currentQuestion?.options) {
      const imageUrls = currentQuestion.options
        .map((option: any) => option.imageUrl)
        .filter((url: string | undefined): url is string => Boolean(url));
      
      if (imageUrls.length > 0) {
        preloadImages(imageUrls);
      }
    }
  }, [currentQuestion]);

  const handleAnswerSubmit = useCallback(async (response: UserResponse) => {
    try {
      await handleQuizAnswerSubmit(response);
    } catch (error) {
      console.error('Erro ao submeter resposta:', error);
      toast.error('Erro ao processar resposta. Tente novamente.');
    }
  }, [handleQuizAnswerSubmit]);

  return (
    <AnimatedWrapper show={isInitialLoadComplete} className="min-h-screen bg-[#F8F6F3]">
      <QuizContent
        user={user}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        showingStrategicQuestions={showingStrategicQuestions}
        currentStrategicQuestionIndex={currentStrategicQuestionIndex}
        currentQuestion={currentQuestion}
        currentAnswers={currentAnswers}
        handleAnswerSubmit={handleAnswerSubmit}
      />
    </AnimatedWrapper>
  );
};

const QuizPage: React.FC = () => {
  return (
    <ErrorBoundary
      FallbackComponent={QuizErrorFallback}
      onError={(error: Error, errorInfo: any) => {
        console.error('Quiz Error:', error, errorInfo);
      }}
    >
      <QuizProvider>
        <QuizPageContent />
      </QuizProvider>
    </ErrorBoundary>
  );
};

export default QuizPage;
