/**
 * useEditor Hook - ES7 Pattern
 * Hook principal para gerenciar estado do editor
 */

import { useState, useCallback, useReducer, useEffect } from 'react';
import { EditorState, EditorBlock, EditorAction, BlockContent } from '../types/EditorTypes';
import { EDITOR_CONFIG } from '../config/EditorConfig';

// Actions do editor
export const EDITOR_ACTIONS = {
  ADD_BLOCK: 'ADD_BLOCK',
  UPDATE_BLOCK: 'UPDATE_BLOCK',
  DELETE_BLOCK: 'DELETE_BLOCK',
  SELECT_BLOCK: 'SELECT_BLOCK',
  MOVE_BLOCK: 'MOVE_BLOCK',
  UNDO: 'UNDO',
  REDO: 'REDO',
  CLEAR_SELECTION: 'CLEAR_SELECTION',
  SET_BLOCKS: 'SET_BLOCKS',
  SAVE_STATE: 'SAVE_STATE'
} as const;

// Reducer do editor
const editorReducer = (state: EditorState, action: EditorAction): EditorState => {
  switch (action.type) {
    case EDITOR_ACTIONS.ADD_BLOCK: {
      const newBlock: EditorBlock = {
        id: `block-${Date.now()}`,
        type: action.payload.type,
        content: action.payload.content || {},
        order: state.blocks.length,
        metadata: {
          createdAt: new Date(),
          updatedAt: new Date(),
          version: '1.0.0'
        }
      };
      
      return {
        ...state,
        blocks: [...state.blocks, newBlock],
        selectedBlockId: newBlock.id,
        isDirty: true
      };
    }
    
    case EDITOR_ACTIONS.UPDATE_BLOCK: {
      const updatedBlocks = state.blocks.map(block =>
        block.id === action.payload.id
          ? {
              ...block,
              content: { ...block.content, ...action.payload.updates },
              metadata: {
                ...block.metadata!,
                updatedAt: new Date()
              }
            }
          : block
      );
      
      return {
        ...state,
        blocks: updatedBlocks,
        isDirty: true
      };
    }
    
    case EDITOR_ACTIONS.DELETE_BLOCK: {
      const filteredBlocks = state.blocks.filter(block => block.id !== action.payload.id);
      
      return {
        ...state,
        blocks: filteredBlocks,
        selectedBlockId: state.selectedBlockId === action.payload.id ? null : state.selectedBlockId,
        isDirty: true
      };
    }
    
    case EDITOR_ACTIONS.SELECT_BLOCK:
      return {
        ...state,
        selectedBlockId: action.payload.id
      };
    
    case EDITOR_ACTIONS.CLEAR_SELECTION:
      return {
        ...state,
        selectedBlockId: null
      };
    
    case EDITOR_ACTIONS.SET_BLOCKS:
      return {
        ...state,
        blocks: action.payload.blocks,
        isDirty: false
      };
    
    default:
      return state;
  }
};

// Estado inicial
const initialState: EditorState = {
  blocks: [],
  selectedBlockId: null,
  isEditing: false,
  history: [],
  currentHistoryIndex: -1,
  isDirty: false,
  lastSaved: null
};

// Hook principal
export const useEditor = () => {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Adicionar bloco
  const addBlock = useCallback((type: string, content?: Partial<BlockContent>) => {
    dispatch({
      type: EDITOR_ACTIONS.ADD_BLOCK,
      payload: { type, content },
      meta: { timestamp: new Date(), undoable: true }
    });
  }, []);

  // Atualizar bloco
  const updateBlock = useCallback((id: string, updates: Partial<BlockContent>) => {
    dispatch({
      type: EDITOR_ACTIONS.UPDATE_BLOCK,
      payload: { id, updates },
      meta: { timestamp: new Date(), blockId: id, undoable: true }
    });
  }, []);

  // Deletar bloco
  const deleteBlock = useCallback((id: string) => {
    dispatch({
      type: EDITOR_ACTIONS.DELETE_BLOCK,
      payload: { id },
      meta: { timestamp: new Date(), blockId: id, undoable: true }
    });
  }, []);

  // Selecionar bloco
  const selectBlock = useCallback((id: string | null) => {
    dispatch({
      type: id ? EDITOR_ACTIONS.SELECT_BLOCK : EDITOR_ACTIONS.CLEAR_SELECTION,
      payload: { id },
      meta: { timestamp: new Date() }
    });
  }, []);

  // Obter bloco selecionado
  const selectedBlock = state.selectedBlockId 
    ? state.blocks.find(block => block.id === state.selectedBlockId) || null
    : null;

  // Auto-save
  useEffect(() => {
    if (!EDITOR_CONFIG.autoSave.enabled || !state.isDirty) return;

    const timeoutId = setTimeout(() => {
      localStorage.setItem(
        EDITOR_CONFIG.autoSave.storageKey,
        JSON.stringify(state.blocks)
      );
    }, EDITOR_CONFIG.autoSave.interval);

    return () => clearTimeout(timeoutId);
  }, [state.blocks, state.isDirty]);

  // Carregar do localStorage
  const loadFromStorage = useCallback(() => {
    try {
      const savedData = localStorage.getItem(EDITOR_CONFIG.autoSave.storageKey);
      if (savedData) {
        const blocks = JSON.parse(savedData);
        dispatch({
          type: EDITOR_ACTIONS.SET_BLOCKS,
          payload: { blocks },
          meta: { timestamp: new Date() }
        });
      }
    } catch (err) {
      setError('Erro ao carregar dados salvos');
    }
  }, []);

  // Salvar manualmente
  const save = useCallback(async () => {
    setIsLoading(true);
    try {
      // Aqui você pode adicionar lógica para salvar no servidor
      localStorage.setItem(
        EDITOR_CONFIG.autoSave.storageKey,
        JSON.stringify(state.blocks)
      );
      
      dispatch({
        type: EDITOR_ACTIONS.SAVE_STATE,
        payload: {},
        meta: { timestamp: new Date() }
      });
      
      setError(null);
    } catch (err) {
      setError('Erro ao salvar');
    } finally {
      setIsLoading(false);
    }
  }, [state.blocks]);

  return {
    // Estado
    blocks: state.blocks,
    selectedBlock,
    selectedBlockId: state.selectedBlockId,
    isEditing: state.isEditing,
    isDirty: state.isDirty,
    isLoading,
    error,
    
    // Ações
    addBlock,
    updateBlock,
    deleteBlock,
    selectBlock,
    save,
    loadFromStorage,
    
    // Utilitários
    getBlockById: (id: string) => state.blocks.find(block => block.id === id),
    getBlocksByType: (type: string) => state.blocks.filter(block => block.type === type),
    clearError: () => setError(null)
  };
};

export default useEditor;
