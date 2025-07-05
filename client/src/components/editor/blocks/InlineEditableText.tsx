import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface InlineEditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  isTextArea?: boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const InlineEditableText: React.FC<InlineEditableTextProps> = ({
  value,
  onSave,
  tag = 'div',
  isTextArea = false,
  className = '',
  placeholder = 'Clique para editar...',
  disabled = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLInputElement || inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleClick = () => {
    if (!disabled) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    if (tempValue !== value) {
      onSave(tempValue);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isTextArea) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    } else if (e.key === 'Enter' && e.ctrlKey && isTextArea) {
      e.preventDefault();
      handleSave();
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  if (isEditing) {
    const commonProps = {
      ref: inputRef as any,
      value: tempValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTempValue(e.target.value),
      onKeyDown: handleKeyDown,
      onBlur: handleBlur,
      className: `${className} border-2 border-blue-500 focus:outline-none`,
      placeholder
    };

    return isTextArea ? (
      <Textarea
        {...commonProps}
        rows={Math.max(3, tempValue.split('\n').length)}
      />
    ) : (
      <Input {...commonProps} />
    );
  }

  const Tag = tag as keyof JSX.IntrinsicElements;
  const displayValue = value || placeholder;
  const isPlaceholder = !value;

  return (
    <Tag
      className={`${className} ${isPlaceholder ? 'text-gray-400 italic' : ''} cursor-text hover:bg-gray-50 transition-colors duration-200 ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
      onClick={handleClick}
      title={disabled ? 'Edição desabilitada' : 'Clique para editar'}
    >
      {displayValue}
    </Tag>
  );
};
