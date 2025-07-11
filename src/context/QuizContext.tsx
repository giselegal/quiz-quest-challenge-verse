import React, { createContext, useContext, useState, ReactNode } from 'react';

interface QuizState {
  currentQuestionIndex: number;
  answers: Record<string, any>;
  userName: string | null;
  userEmail: string | null;
  isCompleted: boolean;
}

interface QuizContextType {
  quizState: QuizState;
  setCurrentQuestionIndex: (index: number) => void;
  setAnswer: (questionId: string, answer: any) => void;
  setUserInfo: (name: string, email: string) => void;
  setQuizCompleted: (completed: boolean) => void;
  resetQuiz: () => void;
}

const initialState: QuizState = {
  currentQuestionIndex: 0,
  answers: {},
  userName: null,
  userEmail: null,
  isCompleted: false,
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [quizState, setQuizState] = useState<QuizState>(initialState);

  const setCurrentQuestionIndex = (index: number) => {
    setQuizState(prev => ({ ...prev, currentQuestionIndex: index }));
  };

  const setAnswer = (questionId: string, answer: any) => {
    setQuizState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer }
    }));
  };

  const setUserInfo = (name: string, email: string) => {
    setQuizState(prev => ({ ...prev, userName: name, userEmail: email }));
  };

  const setQuizCompleted = (completed: boolean) => {
    setQuizState(prev => ({ ...prev, isCompleted: completed }));
  };

  const resetQuiz = () => {
    setQuizState(initialState);
  };

  const value = {
    quizState,
    setCurrentQuestionIndex,
    setAnswer,
    setUserInfo,
    setQuizCompleted,
    resetQuiz,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};