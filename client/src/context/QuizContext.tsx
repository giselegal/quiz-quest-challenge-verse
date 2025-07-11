
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface QuizQuestion {
  id: string;
  title: string;
  type: 'single' | 'multiple' | 'text' | 'image' | 'both' | 'strategic';
  options?: QuizOption[];
  required_selections?: number;
}

interface QuizOption {
  id: string;
  text: string;
  points: { [styleType: string]: number };
  image_url?: string;
  style_code?: string;
}

interface UserResponse {
  questionId: string;
  selectedOptions: string[];
  timestamp: number;
}

interface QuizContextType {
  currentQuestionIndex: number;
  questions: QuizQuestion[];
  responses: UserResponse[];
  isCompleted: boolean;
  nextQuestion: () => void;
  previousQuestion: () => void;
  addResponse: (response: UserResponse) => void;
  resetQuiz: () => void;
  setQuestions: (questions: QuizQuestion[]) => void;
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const addResponse = (response: UserResponse) => {
    setResponses(prev => {
      const existing = prev.findIndex(r => r.questionId === response.questionId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = response;
        return updated;
      }
      return [...prev, response];
    });
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setResponses([]);
    setIsCompleted(false);
  };

  const value: QuizContextType = {
    currentQuestionIndex,
    questions,
    responses,
    isCompleted,
    nextQuestion,
    previousQuestion,
    addResponse,
    resetQuiz,
    setQuestions
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};
