import React from 'react';

interface SpacerBlockProps {
  properties?: {
    height?: string;
  };
  isSelected?: boolean;
  onClick?: () => void;
  onSaveInline?: (blockId: string, field: string, value: any) => void;
  disabled?: boolean;
  block?: any;
}

export const SpacerBlock: React.FC<SpacerBlockProps> = ({ 
  properties = {}, 
  isSelected = false,
  onClick,
  disabled = false
}) => {
  const { height = '50px' } = properties;

  return (
    <div 
      className={`
        rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-[#B89B7A]/40 hover:bg-[#FAF9F7]'
        }
      `}
      style={{ height }}
      onClick={onClick}
    >
      <span className="text-xs text-gray-400 font-mono">
        Espaçador ({height})
      </span>
    </div>
  );
};
