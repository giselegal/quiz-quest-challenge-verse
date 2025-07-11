
import React from 'react';
import { QuizQuestion } from './QuizQuestion';
import { QuizWelcome } from './QuizWelcome';
import { useQuiz } from '@/context/QuizContext';

const QuizPage: React.FC = () => {
  const { quizResult } = useQuiz();

  // Se já temos resultado, mostra o resultado
  if (quizResult) {
    return <div>Quiz completed!</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <QuizWelcome />
      <QuizQuestion />
    </div>
  );
};

export default QuizPage;
