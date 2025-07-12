
import React from 'react';

interface QuizHeaderProps {
  userName: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  showingStrategicQuestions: boolean;
  currentStrategicQuestionIndex: number;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  userName,
  currentQuestionIndex,
  totalQuestions,
  showingStrategicQuestions,
  currentStrategicQuestionIndex
}) => {
  const progress = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  return (
    <div className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-[#432818]">
            Olá, {userName}!
          </h1>
          <span className="text-sm text-[#8F7A6A]">
            {showingStrategicQuestions 
              ? `Pergunta ${currentStrategicQuestionIndex + 1} de ${totalQuestions - 10}`
              : `Pergunta ${currentQuestionIndex + 1} de ${totalQuestions}`
            }
          </span>
        </div>
        
        <div className="w-full bg-[#F3E8E6] rounded-full h-2">
          <div 
            className="bg-[#B89B7A] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
