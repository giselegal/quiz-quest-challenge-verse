import React from 'react';
import { cn } from '@/lib/utils';
import { useInlineEdit } from '@/hooks/useInlineEdit';

interface InlineEditTextProps {
  value: string;
  onSave: (newValue: string) => void;
  placeholder?: string;
  multiline?: boolean;
  disabled?: boolean;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  style?: React.CSSProperties;
}

export const InlineEditText: React.FC<InlineEditTextProps> = ({
  value,
  onSave,
  placeholder = 'Clique para editar...',
  multiline = false,
  disabled = false,
  className = '',
  as = 'p',
  style
}) => {
  const {
    isEditing,
    editValue,
    setEditValue,
    startEdit,
    cancelEdit,
    saveEdit,
    handleKeyDown
  } = useInlineEdit(value, onSave);

  if (disabled) {
    const Component = as;
    return (
      <Component className={className} style={style}>
        {value || placeholder}
      </Component>
    );
  }

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'w-full resize-none border border-blue-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500',
            className
          )}
          style={style}
          autoFocus
          rows={3}
        />
      );
    } else {
      return (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'w-full border border-blue-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500',
            className
          )}
          style={style}
          autoFocus
        />
      );
    }
  }

  const Component = as;
  return (
    <Component
      className={cn(
        'cursor-pointer hover:bg-blue-50 hover:ring-1 hover:ring-blue-200 rounded px-2 py-1 transition-colors',
        className
      )}
      style={style}
      onClick={startEdit}
      title="Clique para editar"
    >
      {value || (
        <span className="text-gray-400 italic">{placeholder}</span>
      )}
    </Component>
  );
};