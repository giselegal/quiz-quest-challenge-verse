
import { useState, useEffect } from 'react';
import { UserResponse, QuizQuestion } from '@/types/quiz';

export const useQuizLogic = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);

  // Mock data with proper type
  const questions: QuizQuestion[] = [
    {
      id: 'q1',
      type: 'multiple-choice',
      question: 'Qual é o seu estilo preferido?',
      options: [
        { id: 'opt1', text: 'Clássico', imageUrl: '', styleCategory: 'classic' },
        { id: 'opt2', text: 'Moderno', imageUrl: '', styleCategory: 'modern' },
        { id: 'opt3', text: 'Casual', imageUrl: '', styleCategory: 'casual' }
      ]
    }
  ];

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex] || null;
  const nextQuestion = questions[currentQuestionIndex + 1] || null;
  const canProceed = currentAnswers.length >= 1;
  const isLastQuestion = currentQuestionIndex >= totalQuestions - 1;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoadComplete(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAnswerSubmit = async (response: UserResponse) => {
    if (response.selectedOptions) {
      setCurrentAnswers(response.selectedOptions);
      
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setCurrentAnswers([]);
      } else {
        localStorage.setItem('quizCompleted', 'true');
        window.location.href = '/resultado';
      }
    }
  };

  const calculateResults = (clickOrder?: string[]) => {
    // Mock calculation
    const result = {
      primaryStyle: { category: 'classic', name: 'Clássico' },
      secondaryStyles: []
    };
    setQuizResult(result);
    return result;
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setCurrentAnswers([]);
    setQuizResult(null);
  };

  return {
    currentQuestion,
    nextQuestion,
    currentQuestionIndex,
    currentAnswers,
    canProceed,
    isLastQuestion,
    totalQuestions,
    isInitialLoadComplete,
    handleAnswerSubmit,
    quizResult,
    calculateResults,
    resetQuiz
  };
};
