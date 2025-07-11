
import React, { useState } from 'react';
import { QuizIntroBlockProps } from '@/interfaces/quiz';

// Create proper interface for InlineEditableText
interface InlineEditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  isTextArea?: boolean;
  disabled?: boolean;
}

const InlineEditableText: React.FC<InlineEditableTextProps> = ({
  value,
  onChange,
  className = '',
  style,
  placeholder = '',
  isTextArea = false,
  disabled = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onChange(editValue);
    setIsEditing(false);
  };

  if (isEditing && !disabled) {
    return isTextArea ? (
      <textarea
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.ctrlKey) {
            handleSave();
          }
        }}
        className={`${className} border rounded p-2`}
        style={style}
        placeholder={placeholder}
        autoFocus
      />
    ) : (
      <input
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSave();
          }
        }}
        className={`${className} border rounded p-2`}
        style={style}
        placeholder={placeholder}
        autoFocus
      />
    );
  }

  return (
    <div
      onClick={() => !disabled && setIsEditing(true)}
      className={`${className} ${!disabled ? 'cursor-pointer hover:bg-gray-50' : ''}`}
      style={style}
    >
      {value || placeholder}
    </div>
  );
};

const QuizIntroBlock: React.FC<QuizIntroBlockProps> = ({
  blockId = 'quiz-intro',
  data = {
    title: 'Descubra seu estilo!',
    subtitle: 'Faça o quiz e encontre as roupas perfeitas para você.',
    description: 'Responda algumas perguntas rápidas e descubra qual estilo de roupa mais combina com a sua personalidade.',
    buttonText: 'Começar o Quiz',
    titleColor: '#333',
    subtitleColor: '#666',
    descriptionColor: '#888',
    buttonColor: '#007bff',
    buttonTextColor: '#fff',
    imageUrl: 'https://via.placeholder.com/800x400',
    imageAlt: 'Quiz Intro Image'
  },
  onUpdate,
  className = '',
  isEditing = false
}) => {
  return (
    <div className={`quiz-intro-block ${className}`} data-block-id={blockId}>
      <div className="container mx-auto py-12">
        <div className="text-center">
          <InlineEditableText
            value={data.title}
            onChange={(value: string) => onUpdate({ ...data, title: value })}
            className="text-2xl md:text-4xl font-bold mb-6 text-center"
            style={{ color: data.titleColor }}
            placeholder="Título principal do quiz"
          />

          <InlineEditableText
            value={data.subtitle}
            onChange={(value: string) => onUpdate({ ...data, subtitle: value })}
            className="text-lg md:text-xl text-gray-600 mb-8 text-center max-w-2xl mx-auto"
            style={{ color: data.subtitleColor }}
            placeholder="Subtítulo ou descrição"
          />

          <InlineEditableText
            value={data.description}
            onChange={(value: string) => onUpdate({ ...data, description: value })}
            className="text-base text-gray-700 mb-8 text-center max-w-xl mx-auto leading-relaxed"
            style={{ color: data.descriptionColor }}
            placeholder="Descrição detalhada do quiz"
            isTextArea={true}
          />

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded"
            style={{
              backgroundColor: data.buttonColor,
              color: data.buttonTextColor
            }}
          >
            <InlineEditableText
              value={data.buttonText}
              onChange={(value: string) => onUpdate({ ...data, buttonText: value })}
              placeholder="Texto do botão"
              disabled={!isEditing}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizIntroBlock;
export type { QuizIntroBlockProps };
