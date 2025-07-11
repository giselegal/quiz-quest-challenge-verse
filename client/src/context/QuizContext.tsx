
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { QuizResult, UserResponse } from '@/types/quiz';

interface QuizContextType {
  currentQuestion: number;
  responses: UserResponse[];
  result: QuizResult | null;
  isCompleted: boolean;
  addResponse: (response: UserResponse) => void;
  setResult: (result: QuizResult) => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const addResponse = (response: UserResponse) => {
    setResponses(prev => [...prev, response]);
    setCurrentQuestion(prev => prev + 1);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setResponses([]);
    setResult(null);
    setIsCompleted(false);
  };

  return (
    <QuizContext.Provider value={{
      currentQuestion,
      responses,
      result,
      isCompleted,
      addResponse,
      setResult,
      resetQuiz
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
