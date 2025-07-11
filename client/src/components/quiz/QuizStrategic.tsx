import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuizQuestion } from '@/types/quiz';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface QuizStrategicProps {
  question: QuizQuestion;
  onAnswer: (optionId: string) => void;
  onNext: () => void;
  selectedOption?: string;
  className?: string;
}

export const QuizStrategic: React.FC<QuizStrategicProps> = ({
  question,
  onAnswer,
  onNext,
  selectedOption,
  className
}) => {
  const isMobile = useIsMobile();
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const handleOptionSelect = (optionId: string) => {
    onAnswer(optionId);
  };

  return (
    <div className={cn(
      "w-full h-full flex flex-col",
      "bg-gradient-to-br from-background to-muted/20",
      className
    )}>
      <Card className="flex-1 p-6 border-0 shadow-lg">
        <div className="h-full flex flex-col">
          {/* Question Title */}
          <div className="text-center mb-8">
            <h2 className={cn(
              "font-playfair font-bold text-primary mb-4",
              isMobile ? "text-xl" : "text-2xl"
            )}>
              {question.title || question.question}
            </h2>
            
            {question.imageUrl && (
              <div className="max-w-md mx-auto mb-6">
                <img
                  src={question.imageUrl}
                  alt="Strategic question"
                  className="w-full h-auto rounded-lg shadow-md"
                  loading="lazy"
                />
              </div>
            )}
          </div>

          {/* Options */}
          <div className="flex-1 flex flex-col gap-4 justify-center">
            {question.options.map((option) => (
              <Button
                key={option.id}
                variant={selectedOption === option.id ? "default" : "outline"}
                className={cn(
                  "w-full h-auto p-6 text-left justify-start",
                  "transition-all duration-300 ease-in-out",
                  "border-2 rounded-xl",
                  selectedOption === option.id 
                    ? "border-primary bg-primary text-primary-foreground shadow-lg scale-105" 
                    : "border-border hover:border-primary/50",
                  hoveredOption === option.id && "scale-102 shadow-md"
                )}
                onClick={() => handleOptionSelect(option.id)}
                onMouseEnter={() => setHoveredOption(option.id)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                <div className="w-full">
                  <div className={cn(
                    "font-medium mb-2",
                    isMobile ? "text-base" : "text-lg"
                  )}>
                    {option.text}
                  </div>
                  {option.description && (
                    <div className={cn(
                      "text-sm opacity-80",
                      selectedOption === option.id ? "text-primary-foreground/90" : "text-muted-foreground"
                    )}>
                      {option.description}
                    </div>
                  )}
                </div>
              </Button>
            ))}
          </div>

          {/* Next Button */}
          {selectedOption && (
            <div className="mt-8 text-center">
              <Button
                onClick={onNext}
                size="lg"
                className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
              >
                Continuar
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default QuizStrategic;