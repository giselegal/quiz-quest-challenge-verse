
import React from 'react';
import { useQuiz } from '@/context/QuizContext';
import QuizResult from '@/components/QuizResult';

const ResultPage: React.FC = () => {
  const { quizResult } = useQuiz();

  if (!quizResult) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Resultado não encontrado. Por favor, refaça o quiz.</p>
      </div>
    );
  }

  return (
    <QuizResult
      primaryStyle={quizResult.primaryStyle}
      secondaryStyles={quizResult.secondaryStyles}
    />
  );
};

export default ResultPage;
