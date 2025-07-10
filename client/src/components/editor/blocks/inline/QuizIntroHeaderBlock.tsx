import React from 'react';
import { cn } from '@/lib/utils';
import type { BlockData } from '@/types/blocks';

interface QuizIntroHeaderProps {
  block: BlockData;
  className?: string;
  onUpdate?: (updates: Partial<BlockData>) => void;
  isSelected?: boolean;
  onSelect?: () => void;
}

const QuizIntroHeaderBlock: React.FC<QuizIntroHeaderProps> = ({
  block,
  className,
  onUpdate,
  isSelected,
  onSelect
}) => {
  const properties = block.properties || {};
  const {
    logoUrl = 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
    logoAlt = 'Logo da Marca',
    logoWidth = 96,
    logoHeight = 96,
    progressValue = 0,
    progressMax = 100,
    showBackButton = false
  } = properties;

  const handleClick = () => {
    onSelect?.();
  };

  return (
    <div
      className={cn(
        'quiz-intro-header w-full bg-white border-b border-gray-200',
        'p-4 flex items-center justify-between',
        'transition-all duration-200',
        isSelected && 'ring-2 ring-blue-500 bg-blue-50',
        className
      )}
      onClick={handleClick}
    >
      {/* Logo */}
      <div className="flex items-center">
        <img
          src={logoUrl}
          alt={logoAlt}
          width={logoWidth}
          height={logoHeight}
          className="object-contain"
          style={{ width: logoWidth, height: logoHeight }}
        />
      </div>

      {/* Progresso */}
      <div className="flex items-center space-x-4">
        {showBackButton && (
          <button
            type="button"
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="Voltar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
        )}
        
        <div className="flex flex-col items-end min-w-[120px]">
          <div className="text-sm text-gray-600 mb-1">
            {progressValue}% completo
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#B89B7A] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(progressValue / progressMax) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizIntroHeaderBlock;
