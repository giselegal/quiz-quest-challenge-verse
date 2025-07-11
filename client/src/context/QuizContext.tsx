
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface QuizQuestion {
  id: string;
  title: string;
  type: 'single' | 'multiple';
  options?: Array<{
    id: string;
    text: string;
    points: Record<string, number>;
  }>;
}

interface QuizResponse {
  questionId: string;
  selectedOptions: string[];
  timestamp: number;
}

interface QuizContextType {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  responses: QuizResponse[];
  isCompleted: boolean;
  setQuestions: (questions: QuizQuestion[]) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  addResponse: (response: QuizResponse) => void;
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
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<QuizResponse[]>([]);

  const isCompleted = currentQuestionIndex >= questions.length && questions.length > 0;

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentQuestionIndex(questions.length);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const addResponse = (response: QuizResponse) => {
    setResponses(prev => {
      const filtered = prev.filter(r => r.questionId !== response.questionId);
      return [...filtered, response];
    });
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setResponses([]);
  };

  const value: QuizContextType = {
    questions,
    currentQuestionIndex,
    responses,
    isCompleted,
    setQuestions,
    nextQuestion,
    previousQuestion,
    addResponse,
    resetQuiz
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};
