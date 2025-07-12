
import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { UserResponse } from '@/types/quiz';
import { strategicQuestions } from '@/data/strategicQuestions';

interface StrategicQuestionsProps {
  currentQuestionIndex: number;
  answers: Record<string, string[]>;
  onAnswer: (response: UserResponse) => void;
}

export const StrategicQuestions: React.FC<StrategicQuestionsProps> = ({
  currentQuestionIndex,
  answers,
  onAnswer
}) => {
  const question = strategicQuestions[currentQuestionIndex];
  
  if (!question) {
    return <div>Pergunta não encontrada</div>;
  }

  const handleOptionSelect = (optionId: string) => {
    onAnswer({
      questionId: question.id,
      selectedOptionId: optionId,
      selectedOptionIds: [optionId],
      timestamp: Date.now()
    });
  };

  return (
    <Card className="p-8 space-y-6 bg-white shadow-md">
      <div className="space-y-4">
        <h2 className="text-2xl font-playfair text-[#432818] text-center">
          {question.question}
        </h2>
        
        <div className="grid grid-cols-1 gap-4">
          {question.options?.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              className="p-4 h-auto text-left border-[#B89B7A] hover:bg-[#B89B7A]/10"
              onClick={() => handleOptionSelect(option.id)}
            >
              <span className="block">{option.text}</span>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};
