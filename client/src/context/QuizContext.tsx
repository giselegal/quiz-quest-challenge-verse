
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { QuizQuestion, QuizResult, UserResponse } from '@/types/quiz';

interface QuizContextType {
  currentQuestion: number;
  questions: QuizQuestion[];
  responses: UserResponse[];
  result: QuizResult | null;
  addResponse: (response: UserResponse) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);

  const addResponse = (response: UserResponse) => {
    setResponses(prev => [...prev, response]);
  };

  const nextQuestion = () => {
    setCurrentQuestion(prev => prev + 1);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setResponses([]);
    setResult(null);
  };

  return (
    <QuizContext.Provider value={{
      currentQuestion,
      questions,
      responses,
      result,
      addResponse,
      nextQuestion,
      resetQuiz
    }}>
      {children}
    </QuizContext.Provider>
  );
};
