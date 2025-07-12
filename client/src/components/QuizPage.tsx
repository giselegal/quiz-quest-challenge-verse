
import React, { useState } from 'react';
import { QuizWelcome } from './QuizWelcome';
import { QuizContent } from './quiz/QuizContent';
import { useQuizState } from '@/hooks/useQuizState';
import { UserResponse } from '@/types/quiz';

const QuizPage: React.FC = () => {
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);
  
  const {
    currentStep,
    currentOverallIndex,
    totalQuestions,
    userName,
    currentQuestion,
    startQuiz,
    submitAnswer,
    goToPrevious
  } = useQuizState();

  const handleAnswerSubmit = (response: UserResponse) => {
    submitAnswer(response);
    setCurrentAnswers([]); // Reset answers for next question
  };

  const handleNextClick = () => {
    // This can be used for additional navigation logic if needed
  };

  if (currentStep === 'welcome') {
    return <QuizWelcome onStart={startQuiz} />;
  }

  if (currentStep === 'result') {
    return (
      <div className="min-h-screen bg-[#FFFAF0] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-[#432818]">Quiz Concluído!</h2>
          <p className="text-[#8F7A6A]">Obrigado por participar, {userName}!</p>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-[#432818]">Seu resultado foi salvo e em breve você receberá mais informações.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-[#FFFAF0] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#8F7A6A]">Carregando pergunta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFAF0]">
      <QuizContent
        user={{ userName }}
        currentQuestionIndex={currentOverallIndex}
        totalQuestions={totalQuestions}
        showingStrategicQuestions={currentStep === 'strategic'}
        currentStrategicQuestionIndex={currentStep === 'strategic' ? currentOverallIndex - 10 : 0}
        currentQuestion={currentQuestion}
        currentAnswers={currentAnswers}
        handleAnswerSubmit={handleAnswerSubmit}
        handleNextClick={handleNextClick}
        handlePrevious={goToPrevious}
      />
    </div>
  );
};

export default QuizPage;
