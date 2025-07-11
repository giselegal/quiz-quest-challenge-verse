
import React, { useState } from 'react';
import { QuizQuestion } from './QuizQuestion';
import { QuizWelcome } from './QuizWelcome';
import { useQuiz } from '@/context/QuizContext';
import { quizQuestions } from '@/data/quizQuestions';
import { UserResponse } from '@/types/quiz';

const QuizPage: React.FC = () => {
  const { quizResult } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [answers, setAnswers] = useState<{ [questionId: string]: string[] }>({});

  // Se já temos resultado, mostra o resultado
  if (quizResult) {
    return <div>Quiz completed!</div>;
  }

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleAnswer = (response: UserResponse) => {
    setAnswers(prev => ({
      ...prev,
      [response.questionId]: response.selectedOptions
    }));

    // Auto advance to next question
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 500);
    }
  };

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-background">
        <QuizWelcome onStart={handleStart} />
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-background">
      {currentQuestion && (
        <QuizQuestion
          question={currentQuestion}
          onAnswer={handleAnswer}
          currentAnswers={answers[currentQuestion.id] || []}
        />
      )}
    </div>
  );
};

export default QuizPage;
