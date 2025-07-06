import { useState, useCallback, useEffect, useRef } from 'react';

export interface InlineEditConfig {
  value: string;
  onSave: (newValue: string) => void;
  multiline?: boolean;
  autoSelect?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  saveOnBlur?: boolean;
  validateOnSave?: (value: string) => boolean;
}

export const useInlineEdit = (config: InlineEditConfig) => {
  const {
    value: initialValue,
    onSave,
    multiline = false,
    autoSelect = true,
    preventDefault = true,
    stopPropagation = true,
    saveOnBlur = true,
    validateOnSave
  } = config;

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(initialValue);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Sincronizar valor externo
  useEffect(() => {
    setEditValue(initialValue);
  }, [initialValue]);

  // Controle de montagem (para SSR)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-foco e seleção quando entrar em modo de edição
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      
      if (autoSelect && 'select' in inputRef.current) {
        inputRef.current.select();
      }
    }
  }, [isEditing, autoSelect]);

  const startEdit = useCallback((e?: React.MouseEvent) => {
    if (preventDefault && e) e.preventDefault();
    if (stopPropagation && e) e.stopPropagation();
    
    setEditValue(initialValue);
    setIsEditing(true);
  }, [initialValue, preventDefault, stopPropagation]);

  const cancelEdit = useCallback(() => {
    setEditValue(initialValue);
    setIsEditing(false);
  }, [initialValue]);

  const saveEdit = useCallback(() => {
    // Validação opcional
    if (validateOnSave && !validateOnSave(editValue)) {
      return false;
    }

    // Só salva se houve mudança
    if (editValue !== initialValue) {
      onSave(editValue);
    }
    
    setIsEditing(false);
    return true;
  }, [editValue, initialValue, onSave, validateOnSave]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (multiline && !e.ctrlKey) {
        // Em textarea, Enter normal insere quebra de linha
        return;
      }
      // Enter simples (input) ou Ctrl+Enter (textarea) salva
      e.preventDefault();
      saveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    }
  }, [multiline, saveEdit, cancelEdit]);

  const handleBlur = useCallback(() => {
    if (saveOnBlur) {
      saveEdit();
    }
  }, [saveOnBlur, saveEdit]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditValue(e.target.value);
  }, []);

  return {
    // Estado
    isEditing,
    editValue,
    mounted,
    
    // Referências
    inputRef,
    
    // Controles
    startEdit,
    cancelEdit,
    saveEdit,
    setEditValue,
    
    // Handlers
    handleKeyDown,
    handleBlur,
    handleChange
  };
};