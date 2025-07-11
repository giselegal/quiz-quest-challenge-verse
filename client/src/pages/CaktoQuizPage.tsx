
import React from 'react';
import CaktoQuizFlow from '@/components/quiz/CaktoQuizFlow';
import { QuizQuestion, QuizResult } from '@/types/quiz';
import { caktoQuizQuestions } from '@/data/caktoquizQuestions';

const CaktoQuizPage: React.FC = () => {
  const handleComplete = (result: QuizResult) => {
    console.log('Quiz completed:', result);
    // Handle quiz completion
  };

  return (
    <div className="min-h-screen bg-[#FFFAF0] py-8">
      <CaktoQuizFlow 
        questions={caktoQuizQuestions}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default CaktoQuizPage;
