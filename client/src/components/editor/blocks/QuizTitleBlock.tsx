import React from 'react';
import { cn } from '@/lib/utils';

interface QuizTitleBlockProps {
  block: {
    id: string;
    type: string;
    properties: {
      title?: string;
      fontSize?: string | number;
      fontWeight?: string;
      textAlign?: string;
      colors?: {
        text?: string;
        background?: string;
      };
      textStyle?: string;
      spacing?: number;
      margin?: string;
    };
  };
  isSelected?: boolean;
  onClick?: () => void;
  onSaveInline?: (blockId: string, key: string, newValue: string) => void;
  disabled?: boolean;
  className?: string;
}

const QuizTitleBlock: React.FC<QuizTitleBlockProps> = ({
  block,
  isSelected = false,
  onClick,
  disabled = false,
  className
}) => {
  const { 
    title = 'Teste de Estilo Pessoal',
    fontSize = 24,
    fontWeight = '700',
    textAlign = 'center',
    colors = { text: '#f29c68', background: 'transparent' },
    textStyle = '',
    spacing = 16,
    margin = 'mb-6'
  } = block.properties;

  // Convert fontSize to CSS
  const fontSizeClass = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
  
  // Convert textAlign to CSS class
  const textAlignClass = textAlign === 'left' ? 'text-left' : 
                        textAlign === 'right' ? 'text-right' : 
                        'text-center';

  // Convert fontWeight to CSS class
  const fontWeightClass = fontWeight === '400' ? 'font-normal' :
                         fontWeight === '500' ? 'font-medium' :
                         fontWeight === '600' ? 'font-semibold' :
                         'font-bold';

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
      <h1 
        className={cn(
          textAlignClass,
          fontWeightClass,
          textStyle?.includes('italic') ? 'italic' : '',
          textStyle?.includes('underline') ? 'underline' : '',
          margin
        )}
        style={{
          fontSize: fontSizeClass,
          color: colors.text,
          backgroundColor: colors.background,
          marginBottom: `${spacing}px`,
          textDecoration: textStyle?.includes('underline') ? 'underline' : 'none'
        }}
      >
        {title}
      </h1>
    </div>
  );
};

export default QuizTitleBlock;