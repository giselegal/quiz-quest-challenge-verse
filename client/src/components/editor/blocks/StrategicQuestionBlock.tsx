import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface StrategicQuestionBlockProps {
  block: {
    id: string;
    type: string;
    properties: {
      question?: string;
      options?: Array<{
        id: string;
        text: string;
        value?: string;
        category?: string;
      }>;
      progressLabel?: string;
      progressValue?: number;
      backgroundColor?: string;
      textColor?: string;
    };
  };
  isSelected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const StrategicQuestionBlock: React.FC<StrategicQuestionBlockProps> = ({
  block,
  isSelected = false,
  onClick,
  disabled = false,
  className
}) => {
  const {
    question = 'Questão estratégica',
    options = [],
    progressLabel = 'Questão Estratégica',
    progressValue = 80,
    backgroundColor = '#ffffff',
    textColor = '#432818'
  } = block.properties;

  return (
    <div
      className={cn(
        'relative w-full min-h-[400px] p-8 rounded-lg border-2 border-dashed',
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white',
        'cursor-pointer hover:border-gray-400 transition-colors',
        className
      )}
      onClick={onClick}
      style={{ backgroundColor, color: textColor }}
    >
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium opacity-70">{progressLabel}</span>
          <span className="text-sm font-medium opacity-70">{progressValue}%</span>
        </div>
        <Progress value={progressValue} className="h-2" />
      </div>

      {/* Question */}
      <div className="text-center mb-8">
        <Badge variant="outline" className="mb-4">
          Questão Estratégica
        </Badge>
        <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: textColor }}>
          {question}
        </h2>
      </div>

      {/* Options */}
      <div className="grid gap-4 max-w-2xl mx-auto">
        {options.map((option) => (
          <div
            key={option.id}
            className="p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors cursor-pointer text-center"
          >
            <p className="text-lg font-medium" style={{ color: textColor }}>
              {option.text}
            </p>
            {option.category && (
              <Badge variant="secondary" className="text-xs mt-2">
                {option.category}
              </Badge>
            )}
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <div className="text-center mt-8">
        <Button
          size="lg"
          className="px-8 py-3 bg-primary hover:bg-primary/90"
          disabled={disabled}
        >
          Continuar
        </Button>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
          Questão Estratégica
        </div>
      )}
    </div>
  );
};

export default StrategicQuestionBlock;