
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { QuizResult, UserResponse } from '@/types/quiz';

interface QuizContextType {
  quizResult: QuizResult | null;
  userResponses: UserResponse[];
  setQuizResult: (result: QuizResult) => void;
  addUserResponse: (response: UserResponse) => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);

  const addUserResponse = (response: UserResponse) => {
    setUserResponses(prev => [...prev, response]);
  };

  const resetQuiz = () => {
    setQuizResult(null);
    setUserResponses([]);
  };

  return (
    <QuizContext.Provider 
      value={{ 
        quizResult, 
        userResponses, 
        setQuizResult, 
        addUserResponse, 
        resetQuiz 
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
