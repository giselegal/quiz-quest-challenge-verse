import React from 'react';
import { InlineEditableText } from './InlineEditableText';

interface TextBlockProps {
  properties: {
    content?: string;
    fontSize?: 'small' | 'medium' | 'large';
    alignment?: 'left' | 'center' | 'right';
  };
  isSelected?: boolean;
  onClick?: () => void;
  onSaveInline?: (key: string) => (newValue: string) => void;
}

export const TextBlock: React.FC<TextBlockProps> = ({ 
  properties, 
  isSelected = false,
  onClick,
  onSaveInline
}) => {
  const { content = 'Conteúdo do texto aqui...', fontSize = 'medium', alignment = 'left' } = properties;

  const fontSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div 
      className={`
        p-4 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-[#B89B7A]/40 hover:bg-[#FAF9F7]'
        }
        ${alignmentClasses[alignment]}
      `}
      onClick={onClick}
    >
      {onSaveInline ? (
        <InlineEditableText
          tag="div"
          isTextArea={true}
          value={content}
          onSave={onSaveInline('content')}
          className={`text-[#432818] ${fontSizeClasses[fontSize]} whitespace-pre-wrap`}
          placeholder="Digite o conteúdo do texto aqui..."
        />
      ) : (
        <div 
          className={`text-[#432818] ${fontSizeClasses[fontSize]} whitespace-pre-wrap`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
};
