
import { useState, useEffect } from 'react';
import { UserResponse, QuizQuestion } from '@/types/quiz';
import { preloadImages } from '../utils/imageManager';

export const useQuizLogic = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  // Mock data for now - replace with actual quiz data
  const questions: QuizQuestion[] = [
    {
      id: 'q1',
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
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsInitialLoadComplete(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAnswerSubmit = async (response: UserResponse) => {
    if (response.selectedOptions) {
      setCurrentAnswers(response.selectedOptions);
      
      // Move to next question or finish quiz
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setCurrentAnswers([]);
      } else {
        // Quiz completed - navigate to results
        localStorage.setItem('quizCompleted', 'true');
        window.location.href = '/resultado';
      }
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentAnswers([]);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setCurrentAnswers([]);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setCurrentAnswers([]);
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
    goToNextQuestion,
    goToPreviousQuestion,
    resetQuiz
  };
};
