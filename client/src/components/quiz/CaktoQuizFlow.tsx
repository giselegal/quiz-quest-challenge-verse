
import React, { useState } from 'react';
import { QuizQuestion, QuizResult, UserResponse } from '@/types/quiz';
import CaktoQuizQuestion from './CaktoQuizQuestion';
import CaktoQuizResult from './CaktoQuizResult';

interface CaktoQuizFlowProps {
  questions: QuizQuestion[];
  onComplete: (result: QuizResult) => void;
}

const CaktoQuizFlow: React.FC<CaktoQuizFlowProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserResponse[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleAnswer = (response: UserResponse) => {
    setAnswers(prev => [...prev, response]);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate result with all required properties
      const calculatedResult: QuizResult = {
        id: `result-${Date.now()}`,
        primaryStyle: {
          style: 'Natural',
          category: 'Natural',
          points: 100,
          percentage: 100,
          rank: 1,
          score: 100
        },
        secondaryStyles: [],
        responses: answers,
        completedAt: Date.now()
      };
      setResult(calculatedResult);
      setIsCompleted(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleContinue = () => {
    if (result) {
      onComplete(result);
    }
  };

  if (isCompleted && result) {
    return (
      <CaktoQuizResult 
        result={result} 
        onContinue={handleContinue}
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  
  // Ensure question has required text property
  const questionWithText = {
    ...currentQuestion,
    text: currentQuestion.text || currentQuestion.question || ''
  };

  return (
    <CaktoQuizQuestion
      question={questionWithText}
      onAnswer={handleAnswer}
      onNext={handleNext}
    />
  );
};

export default CaktoQuizFlow;
