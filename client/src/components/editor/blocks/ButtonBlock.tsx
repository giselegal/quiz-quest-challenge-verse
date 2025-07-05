import React from 'react';
import { InlineEditableText } from './InlineEditableText';

interface ButtonBlockProps {
  properties: {
    text?: string;
    style?: 'primary' | 'secondary' | 'accent';
    size?: 'sm' | 'default' | 'lg';
    fullWidth?: boolean;
  };
  isSelected?: boolean;
  onClick?: () => void;
  onSaveInline?: (key: string) => (newValue: string) => void;
}

export const ButtonBlock: React.FC<ButtonBlockProps> = ({ 
  properties, 
  isSelected = false,
  onClick,
  onSaveInline
}) => {
  const { 
    text = 'Texto do Botão', 
    style = 'primary', 
    size = 'default',
    fullWidth = false 
  } = properties;

  const styleClasses = {
    primary: 'bg-[#B89B7A] hover:bg-[#a08965] text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    accent: 'bg-[#432818] hover:bg-[#2a1910] text-white'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    default: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <div 
      className={`
        p-4 rounded-lg cursor-pointer transition-all duration-200 flex justify-center
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-[#B89B7A]/40 hover:bg-[#FAF9F7]'
        }
      `}
      onClick={onClick}
    >
      <div 
        className={`
          rounded-lg font-medium transition-colors duration-200 flex items-center justify-center
          ${styleClasses[style]}
          ${sizeClasses[size]}
          ${fullWidth ? 'w-full' : 'w-auto'}
        `}
      >
        {onSaveInline ? (
          <InlineEditableText
            tag="span"
            value={text}
            onSave={onSaveInline('text')}
            className="text-inherit"
            placeholder="Texto do botão"
          />
        ) : (
          text
        )}
      </div>
    </div>
  );
};
