
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { QuizResult } from '@/types/quiz';

interface QuizContextType {
  quizResult: QuizResult | null;
  setQuizResult: (result: QuizResult | null) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  return (
    <QuizContext.Provider value={{ quizResult, setQuizResult }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
