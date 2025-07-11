
import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { UserResponse, QuizQuestion as QuizQuestionType } from '@/types/quiz';
import { AnimatedWrapper } from './ui/animated-wrapper';

export interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (response: UserResponse) => void;
  currentAnswers: string[];
  showQuestionImage?: boolean;
  autoAdvance?: boolean;
  isStrategicQuestion?: boolean;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  currentAnswers,
  showQuestionImage = false,
  autoAdvance = false,
  isStrategicQuestion = false
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(currentAnswers);

  useEffect(() => {
    setSelectedOptions(currentAnswers);
  }, [currentAnswers, question.id]);

  const handleOptionSelect = (optionId: string) => {
    let newSelection: string[];
    
    if (question.multiSelect && question.multiSelect > 1) {
      if (selectedOptions.includes(optionId)) {
        newSelection = selectedOptions.filter(id => id !== optionId);
      } else if (selectedOptions.length < question.multiSelect) {
        newSelection = [...selectedOptions, optionId];
      } else {
        return;
      }
    } else {
      newSelection = [optionId];
    }
    
    setSelectedOptions(newSelection);
    
    if (autoAdvance && newSelection.length === (question.multiSelect || 1)) {
      setTimeout(() => {
        onAnswer({
          questionId: question.id,
          selectedOptions: newSelection,
          timestamp: Date.now()
        });
      }, 300);
    }
  };

  const handleSubmit = () => {
    onAnswer({
      questionId: question.id,
      selectedOptions: selectedOptions,
      timestamp: Date.now()
    });
  };

  const canSubmit = selectedOptions.length === (question.multiSelect || 1);

  return (
    <AnimatedWrapper show={true}>
      <Card className="p-8 space-y-6 bg-white shadow-md">
        <div className="space-y-4">
          <h2 className="text-2xl font-playfair text-[#432818] text-center">
            {question.question}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options.map((option) => (
              <Button
                key={option.id}
                variant={selectedOptions.includes(option.id) ? "default" : "outline"}
                className={`p-4 h-auto text-left ${
                  selectedOptions.includes(option.id) 
                    ? 'bg-[#B89B7A] hover:bg-[#A38A69]' 
                    : 'border-[#B89B7A] hover:bg-[#B89B7A]/10'
                }`}
                onClick={() => handleOptionSelect(option.id)}
              >
                <div className="space-y-2">
                  {showQuestionImage && option.imageUrl && (
                    <img 
                      src={option.imageUrl} 
                      alt={option.text}
                      className="w-full h-32 object-cover rounded"
                    />
                  )}
                  <span className="block">{option.text}</span>
                </div>
              </Button>
            ))}
          </div>
          
          {!autoAdvance && (
            <div className="text-center">
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="bg-[#B89B7A] hover:bg-[#A38A69] text-white px-8 py-2"
              >
                Continuar
              </Button>
            </div>
          )}
        </div>
      </Card>
    </AnimatedWrapper>
  );
};
