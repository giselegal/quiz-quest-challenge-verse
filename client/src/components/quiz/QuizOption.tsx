
import React from 'react';
import { cn } from '@/lib/utils';

interface QuizOptionProps {
  option: {
    id: string;
    text: string;
    imageUrl?: string;
  };
  isSelected: boolean;
  onSelect: (optionId: string) => void;
  type: 'text' | 'image' | 'both';
  questionId: string;
  isDisabled?: boolean;
  isStrategicOption?: boolean;
}

export const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  onSelect,
  type,
  questionId,
  isDisabled = false,
  isStrategicOption = false
}) => {
  const handleClick = () => {
    if (!isDisabled) {
      onSelect(option.id);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={cn(
        "w-full p-4 text-left rounded-lg border transition-all",
        isSelected
          ? "border-[#B89B7A] bg-[#FAF9F7] text-[#432818]"
          : isDisabled
            ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
            : "border-gray-200 hover:border-[#B89B7A] text-[#8F7A6A]"
      )}
    >
      {type === 'image' || type === 'both' ? (
        <div className="space-y-2">
          {option.imageUrl && (
            <img
              src={option.imageUrl}
              alt={option.text}
              className="w-full h-32 object-cover rounded"
            />
          )}
          <p>{option.text}</p>
        </div>
      ) : (
        <p>{option.text}</p>
      )}
    </button>
  );
};
