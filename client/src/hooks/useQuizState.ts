
import { useState, useCallback, useMemo } from 'react';
import { UserResponse, QuizResult, StyleResult } from '@/types/quiz';
import { quizQuestions } from '@/data/quizQuestions';
import { strategicQuestions } from '@/data/strategicQuestions';

export const useQuizState = () => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'quiz' | 'strategic' | 'result'>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentStrategicQuestionIndex, setCurrentStrategicQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [userName, setUserName] = useState('');

  // Memoize total questions count
  const totalQuestions = useMemo(() => 
    quizQuestions.length + strategicQuestions.length, 
    []
  );

  // Memoize current overall progress
  const currentOverallIndex = useMemo(() => {
    if (currentStep === 'quiz') return currentQuestionIndex;
    if (currentStep === 'strategic') return quizQuestions.length + currentStrategicQuestionIndex;
    return totalQuestions;
  }, [currentStep, currentQuestionIndex, currentStrategicQuestionIndex, totalQuestions]);

  const startQuiz = useCallback((name: string) => {
    setUserName(name);
    localStorage.setItem('userName', name);
    setCurrentStep('quiz');
  }, []);

  const submitAnswer = useCallback((response: UserResponse) => {
    setResponses(prev => [...prev, response]);
    
    if (currentStep === 'quiz') {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setCurrentStep('strategic');
        setCurrentStrategicQuestionIndex(0);
      }
    } else if (currentStep === 'strategic') {
      if (currentStrategicQuestionIndex < strategicQuestions.length - 1) {
        setCurrentStrategicQuestionIndex(prev => prev + 1);
      } else {
        completeQuiz();
      }
    }
  }, [currentStep, currentQuestionIndex, currentStrategicQuestionIndex]);

  const completeQuiz = useCallback(() => {
    // Simple result calculation
    const result: QuizResult = {
      id: `quiz-${Date.now()}`,
      primaryStyle: {
        style: 'natural',
        category: 'Natural',
        points: 100,
        percentage: 100,
        rank: 1,
        score: 100
      },
      secondaryStyles: [],
      responses,
      completedAt: Date.now(),
      participantName: userName
    };

    // Save to localStorage
    localStorage.setItem('quizResult', JSON.stringify(result));
    
    setCurrentStep('result');
  }, [responses, userName]);

  const goToPrevious = useCallback(() => {
    if (currentStep === 'quiz' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (currentStep === 'strategic' && currentStrategicQuestionIndex > 0) {
      setCurrentStrategicQuestionIndex(prev => prev - 1);
    } else if (currentStep === 'strategic' && currentStrategicQuestionIndex === 0) {
      setCurrentStep('quiz');
      setCurrentQuestionIndex(quizQuestions.length - 1);
    }
  }, [currentStep, currentQuestionIndex, currentStrategicQuestionIndex]);

  const resetQuiz = useCallback(() => {
    setCurrentStep('welcome');
    setCurrentQuestionIndex(0);
    setCurrentStrategicQuestionIndex(0);
    setResponses([]);
    setUserName('');
    localStorage.removeItem('userName');
    localStorage.removeItem('quizResult');
  }, []);

  // Get current question based on step
  const currentQuestion = useMemo(() => {
    if (currentStep === 'quiz') {
      return quizQuestions[currentQuestionIndex];
    } else if (currentStep === 'strategic') {
      return strategicQuestions[currentStrategicQuestionIndex];
    }
    return null;
  }, [currentStep, currentQuestionIndex, currentStrategicQuestionIndex]);

  return {
    // State
    currentStep,
    currentQuestionIndex,
    currentStrategicQuestionIndex,
    currentOverallIndex,
    totalQuestions,
    responses,
    userName,
    currentQuestion,
    
    // Actions
    startQuiz,
    submitAnswer,
    goToPrevious,
    resetQuiz,
    completeQuiz
  };
};
