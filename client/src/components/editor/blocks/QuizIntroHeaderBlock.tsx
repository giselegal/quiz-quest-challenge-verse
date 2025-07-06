import React from 'react';
import { cn } from '@/lib/utils';
import { InlineEditableText } from './InlineEditableText';

interface QuizIntroHeaderBlockProps {
  block: {
    id: string;
    type: string;
    properties: {
      logoUrl?: string;
      logoAlt?: string;
      progressValue?: number;
      progressMax?: number;
      showBackButton?: boolean;
      logoWidth?: number;
      logoHeight?: number;
    };
  };
  isSelected?: boolean;
  onClick?: () => void;
  onSaveInline?: (blockId: string, key: string, newValue: string) => void;
  disabled?: boolean;
  className?: string;
}

const QuizIntroHeaderBlock: React.FC<QuizIntroHeaderBlockProps> = ({
  block,
  isSelected = false,
  onClick,
  onSaveInline,
  disabled = false,
  className
}) => {
  const { 
    logoUrl = 'https://cakto-quiz-br01.b-cdn.net/uploads/47fd613e-91a9-48cf-bd52-a9d4e180d5ab.png',
    logoAlt = 'Logo',
    progressValue = 7.14,
    progressMax = 100,
    showBackButton = true,
    logoWidth = 96,
    logoHeight = 96
  } = block.properties;

  return (
    <div
      className={cn(
        'relative w-full p-4 rounded-lg border-2 border-dashed',
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white',
        'cursor-pointer hover:border-gray-400 transition-colors',
        className
      )}
      onClick={onClick}
    >
      {/* Header with Back Button, Logo and Progress */}
      <div className="flex flex-row w-full h-auto justify-center relative">
        {/* Back Button */}
        {showBackButton && (
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ghost hover:bg-primary hover:text-foreground h-10 w-10 absolute left-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left h-4 w-4">
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
          </button>
        )}
        
        {/* Logo and Progress Container */}
        <div className="flex flex-col w-full customizable-width justify-start items-center gap-4">
          {/* Logo */}
          <img 
            width={logoWidth} 
            height={logoHeight} 
            className="max-w-24 object-cover" 
            alt={logoAlt} 
            src={logoUrl}
          />
          
          {/* Progress Bar */}
          <div 
            aria-valuemax={progressMax} 
            aria-valuemin="0" 
            role="progressbar" 
            data-state="indeterminate" 
            data-max={progressMax} 
            className="relative w-full overflow-hidden rounded-full bg-zinc-300 h-2"
          >
            <div 
              data-state="indeterminate" 
              data-max={progressMax} 
              className="progress h-full w-full flex-1 bg-primary transition-all" 
              style={{ transform: `translateX(-${100 - progressValue}%)` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Editable Properties Panel */}
      {isSelected && !disabled && (
        <div className="mt-4 p-3 bg-gray-50 rounded border-t">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">URL da Logo</label>
              <input 
                type="url"
                value={logoUrl}
                onChange={(e) => onSaveInline?.(block.id, 'logoUrl', e.target.value)}
                className="w-full px-2 py-1 border rounded text-xs"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Alt da Logo</label>
              <input 
                type="text"
                value={logoAlt}
                onChange={(e) => onSaveInline?.(block.id, 'logoAlt', e.target.value)}
                className="w-full px-2 py-1 border rounded text-xs"
                placeholder="Logo"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Progresso (%)</label>
              <input 
                type="number"
                min="0"
                max="100"
                value={progressValue}
                onChange={(e) => onSaveInline?.(block.id, 'progressValue', e.target.value)}
                className="w-full px-2 py-1 border rounded text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Mostrar Botão Voltar</label>
              <input 
                type="checkbox"
                checked={showBackButton}
                onChange={(e) => onSaveInline?.(block.id, 'showBackButton', e.target.checked.toString())}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizIntroHeaderBlock;