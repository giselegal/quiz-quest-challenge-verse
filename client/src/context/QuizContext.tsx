
import React, { createContext, useContext, useState } from 'react';
import { StyleResult } from '@/types/quiz';

interface QuizContextType {
  quizResult: StyleResult[] | null;
  setQuizResult: (result: StyleResult[] | null) => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quizResult, setQuizResult] = useState<StyleResult[] | null>(null);

  const resetQuiz = () => {
    setQuizResult(null);
    localStorage.removeItem('quizResult');
  };

  return (
    <QuizContext.Provider value={{
      quizResult,
      setQuizResult,
      resetQuiz
    }}>
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
