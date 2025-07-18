
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
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label';
  style?: React.CSSProperties;
  autoSelect?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  saveOnBlur?: boolean;
  validateOnSave?: (value: string) => boolean;
}

export const InlineEditText: React.FC<InlineEditTextProps> = ({
  value,
  onSave,
  placeholder = 'Clique para editar...',
  multiline = false,
  disabled = false,
  className = '',
  as = 'p',
  style,
  autoSelect = true,
  preventDefault = true,
  stopPropagation = true,
  saveOnBlur = true,
  validateOnSave
}) => {
  const {
    isEditing,
    editValue,
    mounted,
    inputRef,
    startEdit,
    handleKeyDown,
    handleBlur,
    handleChange
  } = useInlineEdit({
    value,
    onSave,
    multiline,
    autoSelect,
    preventDefault,
    stopPropagation,
    saveOnBlur,
    validateOnSave
  });

  // Estado de carregamento para SSR
  if (!mounted) {
    const Component = as;
    return (
      <Component className={className} style={style}>
        {value || placeholder}
      </Component>
    );
  }

  // Estado desabilitado
  if (disabled) {
    const Component = as;
    return (
      <Component className={className} style={style}>
        {value || placeholder}
      </Component>
    );
  }

  // Estado de edição
  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={editValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'w-full resize-none border-2 border-blue-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white',
            className
          )}
          style={{
            ...style,
            minHeight: '80px',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            fontWeight: 'inherit',
            lineHeight: 'inherit'
          }}
          rows={3}
        />
      );
    } else {
      return (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="text"
          value={editValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'w-full border-2 border-blue-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white',
            className
          )}
          style={{
            ...style,
            fontFamily: 'inherit',
            fontSize: 'inherit',
            fontWeight: 'inherit',
            lineHeight: 'inherit',
            backgroundColor: 'white',
            color: '#000'
          }}
        />
      );
    }
  }

  // Estado de exibição normal
  const Component = as;
  return (
    <Component
      className={cn(
        'cursor-pointer hover:bg-blue-50 hover:ring-1 hover:ring-blue-200 rounded px-2 py-1 transition-colors min-h-[1.5em] inline-block',
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