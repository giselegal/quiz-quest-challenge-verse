/**
 * Context do Editor - Gerenciamento de estado centralizado
 */

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { EditorState, EditorAction, EditorContextValue, EditorBlock, EditorPage } from './EditorTypes';

// Estado inicial
const initialState: EditorState = {
  currentProject: null,
  currentPageId: null,
  selectedBlockId: null,
  isEditing: false,
  isDirty: false,
};

// Reducer para gerenciar estado
function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'SET_PROJECT':
      return {
        ...state,
        currentProject: action.payload,
        isDirty: false,
      };

    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPageId: action.payload,
        selectedBlockId: null,
      };

    case 'SELECT_BLOCK':
      return {
        ...state,
        selectedBlockId: action.payload,
        isEditing: true,
      };

    case 'DESELECT_BLOCK':
      return {
        ...state,
        selectedBlockId: null,
        isEditing: false,
      };

    case 'ADD_BLOCK':
      if (!state.currentProject || !state.currentPageId) return state;
      
      const newBlock: EditorBlock = {
        id: `block-${Date.now()}`,
        type: action.payload.type,
        content: action.payload.content || {},
        metadata: {
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          pages: state.currentProject.pages.map(page =>
            page.id === state.currentPageId
              ? { ...page, blocks: [...page.blocks, newBlock] }
              : page
          ),
        },
        selectedBlockId: newBlock.id,
        isDirty: true,
      };

    case 'UPDATE_BLOCK':
      if (!state.currentProject || !state.currentPageId) return state;

      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          pages: state.currentProject.pages.map(page =>
            page.id === state.currentPageId
              ? {
                  ...page,
                  blocks: page.blocks.map(block =>
                    block.id === action.payload.id
                      ? {
                          ...block,
                          ...action.payload.updates,
                          metadata: {
                            ...block.metadata,
                            updatedAt: new Date(),
                          },
                        }
                      : block
                  ),
                }
              : page
          ),
        },
        isDirty: true,
      };

    case 'DELETE_BLOCK':
      if (!state.currentProject || !state.currentPageId) return state;

      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          pages: state.currentProject.pages.map(page =>
            page.id === state.currentPageId
              ? { ...page, blocks: page.blocks.filter(block => block.id !== action.payload) }
              : page
          ),
        },
        selectedBlockId: state.selectedBlockId === action.payload ? null : state.selectedBlockId,
        isDirty: true,
      };

    case 'ADD_PAGE':
      if (!state.currentProject) return state;

      const newPage: EditorPage = {
        id: `page-${Date.now()}`,
        title: `Página ${state.currentProject.pages.length + 1}`,
        blocks: [],
      };

      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          pages: [...state.currentProject.pages, newPage],
        },
        currentPageId: newPage.id,
        isDirty: true,
      };

    case 'DELETE_PAGE':
      if (!state.currentProject) return state;

      const updatedPages = state.currentProject.pages.filter(page => page.id !== action.payload);
      
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          pages: updatedPages,
        },
        currentPageId: state.currentPageId === action.payload 
          ? (updatedPages[0]?.id || null) 
          : state.currentPageId,
        selectedBlockId: null,
        isDirty: true,
      };

    case 'SET_DIRTY':
      return {
        ...state,
        isDirty: action.payload,
      };

    default:
      return state;
  }
}

// Context
const EditorContext = createContext<EditorContextValue | null>(null);

// Provider
export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  // Actions
  const addBlock = useCallback((type: string, content?: Record<string, any>) => {
    dispatch({ type: 'ADD_BLOCK', payload: { type, content } });
  }, []);

  const updateBlock = useCallback((id: string, updates: Partial<EditorBlock>) => {
    dispatch({ type: 'UPDATE_BLOCK', payload: { id, updates } });
  }, []);

  const deleteBlock = useCallback((id: string) => {
    dispatch({ type: 'DELETE_BLOCK', payload: id });
  }, []);

  const selectBlock = useCallback((id: string) => {
    dispatch({ type: 'SELECT_BLOCK', payload: id });
  }, []);

  const deselectBlock = useCallback(() => {
    dispatch({ type: 'DESELECT_BLOCK' });
  }, []);

  const addPage = useCallback(() => {
    dispatch({ type: 'ADD_PAGE' });
  }, []);

  const deletePage = useCallback((id: string) => {
    dispatch({ type: 'DELETE_PAGE', payload: id });
  }, []);

  const switchPage = useCallback((id: string) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: id });
  }, []);

  const saveProject = useCallback(async () => {
    // TODO: Implementar salvamento
    console.log('Salvando projeto:', state.currentProject);
    dispatch({ type: 'SET_DIRTY', payload: false });
  }, [state.currentProject]);

  const loadProject = useCallback(async (id: string) => {
    // TODO: Implementar carregamento
    console.log('Carregando projeto:', id);
  }, []);

  const exportProject = useCallback(() => {
    return JSON.stringify(state.currentProject, null, 2);
  }, [state.currentProject]);

  const contextValue: EditorContextValue = {
    state,
    dispatch,
    addBlock,
    updateBlock,
    deleteBlock,
    selectBlock,
    deselectBlock,
    addPage,
    deletePage,
    switchPage,
    saveProject,
    loadProject,
    exportProject,
  };

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  );
}

// Hook para usar o context
export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor deve ser usado dentro de EditorProvider');
  }
  return context;
}
