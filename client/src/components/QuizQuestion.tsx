
import React from 'react';
import { QuizQuestion as QuizQuestionType, UserResponse } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (response: UserResponse) => void;
  currentAnswers: string[];
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({ 
  question, 
  onAnswer, 
  currentAnswers 
}) => {
  const handleOptionClick = (optionId: string) => {
    const response: UserResponse = {
      questionId: question.id,
      selectedOptions: [optionId],
      timestamp: Date.now()
    };
    onAnswer(response);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {question.title || question.text}
          </h2>
          {question.imageUrl && (
            <img 
              src={question.imageUrl} 
              alt="Question" 
              className="mx-auto mb-4 rounded-lg max-w-full h-auto"
            />
          )}
        </div>
        
        <div className="space-y-3">
          {question.options.map((option) => (
            <Button
              key={option.id}
              variant={currentAnswers.includes(option.id) ? "default" : "outline"}
              className="w-full text-left justify-start h-auto p-4"
              onClick={() => handleOptionClick(option.id)}
            >
              <div className="flex items-center gap-3">
                {option.imageUrl && (
                  <img 
                    src={option.imageUrl} 
                    alt={option.text}
                    className="w-12 h-12 rounded object-cover"
                  />
                )}
                <span>{option.text}</span>
              </div>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};
