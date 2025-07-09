import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Heart } from 'lucide-react';

interface QuizQuestionBlockProps {
  question?: string;
  options?: Array<{ id: string; text: string; imageUrl?: string }>;
  allowMultiple?: boolean;
  showImages?: boolean;
  className?: string;
}

const QuizQuestionBlock: React.FC<QuizQuestionBlockProps> = ({
  question = 'Qual dessas opções representa melhor seu estilo?',
  options = [
    { id: '1', text: 'Clássico e elegante', imageUrl: 'https://res.cloudinary.com/dtx0k4ue6/image/upload/v1710847234/estilo-classico_urkpfx.jpg' },
    { id: '2', text: 'Moderno e descolado', imageUrl: 'https://res.cloudinary.com/dtx0k4ue6/image/upload/v1710847235/estilo-moderno_hqxmzv.jpg' },
    { id: '3', text: 'Natural e autêntico', imageUrl: 'https://res.cloudinary.com/dtx0k4ue6/image/upload/v1710847236/estilo-natural_wnxkdi.jpg' }
  ],
  allowMultiple = true,
  showImages = true,
  className
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());

  const handleOptionClick = (optionId: string) => {
    const newSelected = new Set(selectedOptions);
    
    if (allowMultiple) {
      if (newSelected.has(optionId)) {
        newSelected.delete(optionId);
      } else if (newSelected.size < 3) { // Máximo 3 seleções
        newSelected.add(optionId);
      }
    } else {
      newSelected.clear();
      newSelected.add(optionId);
    }
    
    setSelectedOptions(newSelected);
  };

  return (
    <div className={cn("py-8", className)}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Question Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#aa6b5d] mb-4 leading-tight">
            {question}
          </h2>
          {allowMultiple && (
            <p className="text-[#8F7A6A] text-sm">
              Você pode escolher até 3 opções que mais combinam com você
            </p>
          )}
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {options.map((option) => {
            const isSelected = selectedOptions.has(option.id);
            
            return (
              <div
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className={cn(
                  "relative cursor-pointer rounded-xl border-2 transition-all duration-300 transform hover:scale-105",
                  "bg-white hover:shadow-lg",
                  isSelected 
                    ? "border-[#B89B7A] bg-[#fff7f3] shadow-lg" 
                    : "border-gray-200 hover:border-[#B89B7A]/50"
                )}
              >
                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className="w-6 h-6 bg-[#B89B7A] rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}

                {/* Option Image */}
                {showImages && option.imageUrl && (
                  <div className="aspect-square w-full rounded-t-xl overflow-hidden">
                    <img 
                      src={option.imageUrl} 
                      alt={option.text}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Option Text */}
                <div className={cn(
                  "p-4 text-center",
                  showImages && option.imageUrl ? "" : "py-8"
                )}>
                  <h3 className={cn(
                    "font-semibold text-[#432818] leading-tight",
                    showImages ? "text-base" : "text-lg"
                  )}>
                    {option.text}
                  </h3>
                </div>

                {/* Hover Effect */}
                <div className={cn(
                  "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300",
                  "bg-gradient-to-t from-[#B89B7A]/10 to-transparent",
                  "hover:opacity-100"
                )} />
              </div>
            );
          })}
        </div>

        {/* Selection Counter */}
        {allowMultiple && (
          <div className="text-center mt-6">
            <div className="inline-flex items-center gap-2 bg-[#f9f4ef] px-4 py-2 rounded-full border border-[#B89B7A]/20">
              <Heart className="w-4 h-4 text-[#B89B7A]" />
              <span className="text-sm text-[#8F7A6A]">
                {selectedOptions.size} de 3 selecionadas
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizQuestionBlock;