import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { InlineEditText } from './InlineEditText';

interface QuestionOption {
  id: string;
  text: string;
  value?: string;
  imageUrl?: string;
  category?: string;
}

interface QuestionMultipleBlockProps {
  block: {
    id: string;
    type: string;
    properties: {
      question?: string;
      options?: QuestionOption[];
      multipleSelection?: boolean;
      maxSelections?: number;
      showImages?: boolean;
      progressLabel?: string;
      progressValue?: number;
      backgroundColor?: string;
      textColor?: string;
    };
  };
  isSelected?: boolean;
  onClick?: () => void;
  onPropertyChange?: (key: string, value: any) => void;
  disabled?: boolean;
  className?: string;
}

const QuestionMultipleBlock: React.FC<QuestionMultipleBlockProps> = ({
  block,
  isSelected = false,
  onClick,
  onPropertyChange,
  disabled = false,
  className
}) => {
  const {
    question = 'Qual é a sua preferência?',
    options = [],
    multipleSelection = false,
    maxSelections = 1,
    showImages = true,
    progressLabel = 'Questão 1 de 10',
    progressValue = 10,
    backgroundColor = '#ffffff',
    textColor = '#432818'
  } = block.properties;

  return (
    <div
      className={cn(
        'relative w-full min-h-[500px] p-8 rounded-lg border-2 border-dashed',
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
        <InlineEditText
          value={question}
          onSave={(newValue) => onPropertyChange?.('question', newValue)}
          placeholder="Digite a pergunta..."
          disabled={disabled}
          multiline={true}
          as="h2"
          className="text-2xl md:text-3xl font-bold mb-4"
          style={{ color: textColor }}
        />
        
        {multipleSelection && (
          <Badge variant="outline" className="mb-4">
            Selecione até {maxSelections} opção{maxSelections > 1 ? 'ões' : ''}
          </Badge>
        )}
      </div>

      {/* Options Grid */}
      <div className={cn(
        'grid gap-4 max-w-4xl mx-auto',
        showImages ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 max-w-2xl'
      )}>
        {options.map((option) => (
          <div
            key={option.id}
            className={cn(
              'relative p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors cursor-pointer',
              'hover:shadow-md'
            )}
            style={{ borderColor: '#e5e7eb' }}
          >
            {/* Image */}
            {showImages && option.imageUrl && (
              <div className="mb-4">
                <img
                  src={option.imageUrl}
                  alt={option.text}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Text */}
            <div className="text-center">
              <p className="text-lg font-medium mb-2" style={{ color: textColor }}>
                {option.text}
              </p>
              
              {option.category && (
                <Badge variant="secondary" className="text-xs">
                  {option.category}
                </Badge>
              )}
            </div>

            {/* Selection indicator (placeholder) */}
            <div className="absolute top-2 right-2 w-6 h-6 rounded-full border-2 border-gray-300 bg-white">
              <div className="hidden w-full h-full rounded-full bg-blue-500"></div>
            </div>
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
        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
          Questão - {options.length} opções
        </div>
      )}
    </div>
  );
};

export default QuestionMultipleBlock;