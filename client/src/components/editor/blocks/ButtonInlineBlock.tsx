import React from 'react';
import { InlineEditableText } from './InlineEditableText';
import type { BlockComponentProps } from '@/types/blocks';

const ButtonInlineBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onPropertyChange,
  className = ''
}) => {
  const { 
    text = 'Clique Aqui',
    style = 'primary',
    size = 'default',
    fullWidth = false,
    url = '',
    action = 'link'
  } = block.properties;

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const styleClasses = {
    primary: 'bg-[#B89B7A] hover:bg-[#a08965] text-white border-[#B89B7A] hover:border-[#a08965]',
    secondary: 'bg-white hover:bg-gray-50 text-gray-800 border-gray-300 hover:border-gray-400',
    accent: 'bg-[#432818] hover:bg-[#2a1910] text-white border-[#432818] hover:border-[#2a1910]',
    outline: 'bg-transparent hover:bg-[#B89B7A] text-[#B89B7A] hover:text-white border-[#B89B7A]'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    default: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg'
  };

  return (
    <div 
      className={`
        inline-flex items-center justify-center max-w-fit mx-auto
        p-3 rounded-lg transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-transparent hover:border-blue-300 hover:bg-blue-50/30'
        }
        ${className}
      `}
    >
      <button
        className={`
          rounded-lg font-medium transition-all duration-200 
          border-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          ${styleClasses[style as keyof typeof styleClasses]}
          ${sizeClasses[size as keyof typeof sizeClasses]}
          ${fullWidth ? 'w-full' : 'w-auto'}
          hover:transform hover:scale-105 active:scale-95
        `}
        type="button"
      >
        <InlineEditableText
          value={text}
          onChange={(value) => handlePropertyChange('text', value)}
          placeholder="Texto do botão"
          className="min-w-0 outline-none bg-transparent text-inherit font-inherit"
        />
      </button>
    </div>
  );
};

export default ButtonInlineBlock;