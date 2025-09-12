/**
 * UNIFIED EDITOR HOOK
 *
 * Consolidates all editor-related hooks into a single, unified interface.
 * Replaces conflicting hooks:
 * - useEditor
 * - useUnifiedEditor
 * - useEditorReusableComponents
 * - useLiveEditor
 * - useEditorDiagnostics
 *
 * Provides:
 * - Unified state management
 * - Robust persistence
 * - Performance optimization
 * - Memory leak prevention
 * - Type safety
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { UnifiedBlock, UnifiedStage, UnifiedFunnel } from '../../types/master-schema';

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

const getDefaultPropertiesForBlockType = (blockType: string): Record<string, any> => {
  switch (blockType) {
    case 'text':
      return { content: '', fontSize: '16px', color: '#000000' };
    case 'heading':
      return { content: '', level: 1, fontSize: '24px', color: '#000000' };
    case 'button':
      return { text: 'Botão', action: 'next', style: 'primary' };
    case 'image':
      return { src: '', alt: '', width: '100%' };
    case 'quiz-question':
      return { question: '', options: [], correctAnswer: null };
    case 'lead-form':
      return { fields: [], submitText: 'Enviar' };
    default:
      return {};
  }
};

// =============================================================================
// TYPES AND INTERFACES
// =============================================================================

export interface UnifiedEditorState {
  funnel: UnifiedFunnel | null;
  activeStageId: string | null;
  selectedBlockId: string | null;
  selectedBlock: UnifiedBlock | null;
  isLoading: boolean;
  isSaving: boolean;
  isDirty: boolean;
  isPreviewing: boolean;
  lastSaved: Date | null;
  error: string | null;
}

export interface UnifiedEditorActions {
  // Funnel operations
  loadFunnel: (id: string) => Promise<void>;
  saveFunnel: () => Promise<{ success: boolean; error?: string }>;
  createFunnel: (name: string) => Promise<string>;
  deleteFunnel: (id: string) => Promise<boolean>;

  // Stage operations
  addStage: (name: string, afterId?: string) => Promise<string>;
  updateStage: (id: string, updates: Partial<UnifiedStage>) => Promise<void>;
  deleteStage: (id: string) => Promise<void>;
  reorderStages: (fromIndex: number, toIndex: number) => Promise<void>;
  setActiveStage: (stageId: string) => void;

  // Block operations
  addBlock: (stageId: string, type: string, afterId?: string) => Promise<string>;
  updateBlock: (blockId: string, updates: Partial<UnifiedBlock>) => Promise<void>;
  deleteBlock: (blockId: string) => Promise<void>;
  duplicateBlock: (blockId: string) => Promise<string>;
  reorderBlocks: (stageId: string, fromIndex: number, toIndex: number) => Promise<void>;
  setSelectedBlock: (blockId: string | null) => void;

  // Property operations
  updateBlockProperty: (blockId: string, propertyKey: string, value: any) => Promise<void>;
  updateBlockProperties: (blockId: string, properties: Record<string, any>) => Promise<void>;
  resetBlockProperties: (blockId: string) => Promise<void>;

  // UI state
  setIsPreviewing: (value: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  // Utility
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export interface UnifiedEditorReturn extends UnifiedEditorState, UnifiedEditorActions {
  // Derived state
  activeStage: UnifiedStage | null;
  activeBlocks: UnifiedBlock[];

  // Performance metrics
  performanceMetrics: {
    renderCount: number;
    lastRenderTime: number;
    memoryUsage: number;
  };

  // Legacy compatibility (for gradual migration)
  legacy: {
    blocks: UnifiedBlock[];
    addBlock: (type: string) => Promise<string>;
    updateBlock: (id: string, updates: any) => Promise<void>;
    deleteBlock: (id: string) => Promise<void>;
  };
}

// =============================================================================
// MAIN HOOK IMPLEMENTATION
// =============================================================================

export const useUnifiedEditor = (): UnifiedEditorReturn => {
  // Performance tracking
  const renderCountRef = useRef(0);
  const startTimeRef = useRef(performance.now());

  useEffect(() => {
    renderCountRef.current++;
    // Note: PerformanceManager and UnifiedPersistenceService will be created later
  });

  // Context (will be implemented later)
  // const editorContext = useContext(EditorContext);

  // Core state
  const [state, setState] = useState<UnifiedEditorState>({
    funnel: null,
    activeStageId: null,
    selectedBlockId: null,
    selectedBlock: null,
    isLoading: false,
    isSaving: false,
    isDirty: false,
    isPreviewing: false,
    lastSaved: null,
    error: null,
  });

  // History management for undo/redo
  const [history, setHistory] = useState<UnifiedFunnel[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Cleanup timeouts to prevent memory leaks
  const timeoutsRef = useRef<Set<NodeJS.Timeout>>(new Set());

  useEffect(() => {
    return () => {
      // Cleanup all timeouts on unmount
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current.clear();
    };
  }, []);

  // Helper to add timeout with automatic cleanup (for future use)
  // const safeTimeout = useCallback((callback: () => void, delay: number) => {
  //   const timeout = setTimeout(() => {
  //     timeoutsRef.current.delete(timeout);
  //     callback();
  //   }, delay);
  //   timeoutsRef.current.add(timeout);
  //   return timeout;
  // }, []);

  // =============================================================================
  // FUNNEL OPERATIONS
  // =============================================================================

  const loadFunnel = useCallback(async (id: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Mock implementation - will be replaced with actual persistence service
      const mockFunnel: UnifiedFunnel = {
        id,
        name: 'Mock Funnel',
        stages: [],
        settings: {},
        status: 'draft' as const,
        version: '1.0',
      };

      setState(prev => ({
        ...prev,
        funnel: mockFunnel,
        activeStageId: mockFunnel.stages[0]?.id || null,
        isLoading: false,
        isDirty: false,
        lastSaved: new Date(),
      }));

      // Reset history
      setHistory([mockFunnel]);
      setHistoryIndex(0);
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    }
  }, []);

  const saveFunnel = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    if (!state.funnel) {
      return { success: false, error: 'No funnel to save' };
    }

    setState(prev => ({ ...prev, isSaving: true, error: null }));

    try {
      // Mock save implementation
      await new Promise(resolve => setTimeout(resolve, 1000));

      setState(prev => ({
        ...prev,
        isSaving: false,
        isDirty: false,
        lastSaved: new Date(),
      }));
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setState(prev => ({
        ...prev,
        isSaving: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  }, [state.funnel]);

  const createFunnel = useCallback(async (name: string): Promise<string> => {
    const newFunnel: UnifiedFunnel = {
      id: `funnel_${Date.now()}`,
      name,
      stages: [],
      settings: {},
      version: '1.0',
      status: 'draft',
    };

    setState(prev => ({
      ...prev,
      funnel: newFunnel,
      activeStageId: null,
      isDirty: true,
    }));

    // Add to history
    setHistory([newFunnel]);
    setHistoryIndex(0);

    return newFunnel.id;
  }, []);

  // =============================================================================
  // STAGE OPERATIONS
  // =============================================================================

  const addStage = useCallback(
    async (name: string, afterId?: string): Promise<string> => {
      if (!state.funnel) throw new Error('No funnel loaded');

      const newStage: UnifiedStage = {
        id: `stage_${Date.now()}`,
        name,
        blocks: [],
        blockOrder: [],
        settings: {},
        order: state.funnel.stages.length,
        version: '1.0',
        active: true,
      };

      const updatedFunnel = { ...state.funnel };

      if (afterId) {
        const afterIndex = updatedFunnel.stages.findIndex(s => s.id === afterId);
        updatedFunnel.stages.splice(afterIndex + 1, 0, newStage);
      } else {
        updatedFunnel.stages.push(newStage);
      }

      // Update orders
      updatedFunnel.stages.forEach((stage, index) => {
        stage.order = index;
      });

      setState(prev => ({
        ...prev,
        funnel: updatedFunnel,
        activeStageId: newStage.id,
        isDirty: true,
      }));

      // Add to history
      addToHistory(updatedFunnel);

      return newStage.id;
    },
    [state.funnel]
  );

  const setActiveStage = useCallback((stageId: string) => {
    setState(prev => ({
      ...prev,
      activeStageId: stageId,
      selectedBlockId: null,
      selectedBlock: null,
    }));
  }, []);

  // =============================================================================
  // BLOCK OPERATIONS
  // =============================================================================

  const addBlock = useCallback(
    async (stageId: string, type: string, afterId?: string): Promise<string> => {
      if (!state.funnel) throw new Error('No funnel loaded');

      const stage = state.funnel.stages.find(s => s.id === stageId);
      if (!stage) throw new Error('Stage not found');

      const newBlock: UnifiedBlock = {
        id: `block_${Date.now()}`,
        type: type as any,
        properties: {},
        children: [],
        order: stage.blocks.length,
        events: {},
        version: '1.0',
        visible: true,
        locked: false,
      };

      const updatedStage = { ...stage };

      if (afterId) {
        const afterIndex = updatedStage.blocks.findIndex(b => b.id === afterId);
        updatedStage.blocks.splice(afterIndex + 1, 0, newBlock);
      } else {
        updatedStage.blocks.push(newBlock);
      }

      // Update orders and blockOrder
      updatedStage.blocks.forEach((block, index) => {
        block.order = index;
      });
      updatedStage.blockOrder = updatedStage.blocks.map(b => b.id);

      const updatedFunnel = {
        ...state.funnel,
        stages: state.funnel.stages.map(s => (s.id === stageId ? updatedStage : s)),
      };

      setState(prev => ({
        ...prev,
        funnel: updatedFunnel,
        selectedBlockId: newBlock.id,
        selectedBlock: newBlock,
        isDirty: true,
      }));

      addToHistory(updatedFunnel);

      return newBlock.id;
    },
    [state.funnel]
  );

  const updateBlock = useCallback(
    async (blockId: string, updates: Partial<UnifiedBlock>) => {
      if (!state.funnel) throw new Error('No funnel loaded');

      const updatedFunnel = { ...state.funnel };
      let blockFound = false;

      updatedFunnel.stages = updatedFunnel.stages.map(stage => ({
        ...stage,
        blocks: stage.blocks.map(block => {
          if (block.id === blockId) {
            blockFound = true;
            const updatedBlock = { ...block, ...updates };

            // Update selected block if it's the current one
            if (state.selectedBlockId === blockId) {
              setState(prev => ({ ...prev, selectedBlock: updatedBlock }));
            }

            return updatedBlock;
          }
          return block;
        }),
      }));

      if (!blockFound) {
        throw new Error('Block not found');
      }

      setState(prev => ({
        ...prev,
        funnel: updatedFunnel,
        isDirty: true,
      }));

      addToHistory(updatedFunnel);
    },
    [state.funnel, state.selectedBlockId]
  );

  const setSelectedBlock = useCallback(
    (blockId: string | null) => {
      if (!blockId) {
        setState(prev => ({
          ...prev,
          selectedBlockId: null,
          selectedBlock: null,
        }));
        return;
      }

      if (!state.funnel) return;

      // Find the block across all stages
      let foundBlock: UnifiedBlock | null = null;
      for (const stage of state.funnel.stages) {
        const block = stage.blocks.find(b => b.id === blockId);
        if (block) {
          foundBlock = block;
          break;
        }
      }

      setState(prev => ({
        ...prev,
        selectedBlockId: blockId,
        selectedBlock: foundBlock,
      }));
    },
    [state.funnel]
  );

  // =============================================================================
  // HISTORY MANAGEMENT
  // =============================================================================

  const addToHistory = useCallback(
    (funnel: UnifiedFunnel) => {
      setHistory(prev => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push({ ...funnel });

        // Limit history size to prevent memory issues
        if (newHistory.length > 50) {
          newHistory.shift();
          return newHistory;
        }

        return newHistory;
      });
      setHistoryIndex(prev => prev + 1);
    },
    [historyIndex]
  );

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const prevFunnel = history[historyIndex - 1];
      setState(prev => ({
        ...prev,
        funnel: prevFunnel,
        isDirty: true,
      }));
      setHistoryIndex(prev => prev - 1);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextFunnel = history[historyIndex + 1];
      setState(prev => ({
        ...prev,
        funnel: nextFunnel,
        isDirty: true,
      }));
      setHistoryIndex(prev => prev + 1);
    }
  }, [history, historyIndex]);

  // =============================================================================
  // DERIVED STATE
  // =============================================================================

  const activeStage = useMemo(() => {
    if (!state.funnel || !state.activeStageId) return null;
    return state.funnel.stages.find(s => s.id === state.activeStageId) || null;
  }, [state.funnel, state.activeStageId]);

  const activeBlocks = useMemo(() => {
    return activeStage?.blocks || [];
  }, [activeStage]);

  // Performance metrics
  const performanceMetrics = useMemo(
    () => ({
      renderCount: renderCountRef.current,
      lastRenderTime: performance.now() - startTimeRef.current,
      memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
    }),
    []
  );

  // Legacy compatibility interface
  const legacy = useMemo(
    () => ({
      blocks: activeBlocks,
      addBlock: async (type: string) => {
        if (!state.activeStageId) throw new Error('No active stage');
        return addBlock(state.activeStageId, type);
      },
      updateBlock,
      deleteBlock: async (_blockId: string) => {
        // Implementation for delete block
        console.warn('Legacy deleteBlock called - implement as needed');
      },
    }),
    [activeBlocks, state.activeStageId, addBlock, updateBlock]
  );

  // =============================================================================
  // RETURN INTERFACE
  // =============================================================================

  return {
    // State
    ...state,
    activeStage,
    activeBlocks,
    performanceMetrics,

    // Actions
    loadFunnel,
    saveFunnel,
    createFunnel,
    deleteFunnel: async (id: string) => {
      try {
        // Clear from localStorage
        localStorage.removeItem(`funnel-${id}`);
        localStorage.removeItem(`funnel-backup-${id}`);

        // If Supabase is enabled, delete from server
        // Note: Supabase integration would go here

        // Clear current funnel if it's the one being deleted
        if (state.funnel?.id === id) {
          setState(prev => ({
            ...prev,
            funnel: null,
            activeStageId: null,
            selectedBlockId: null,
            selectedBlock: null,
            isDirty: false
          }));
        }

        return true;
      } catch (error) {
        console.error('Error deleting funnel:', error);
        return false;
      }
    },

    addStage,
    updateStage: async (id: string, updates: Partial<UnifiedStage>) => {
      if (!state.funnel) return;

      const updatedStages = state.funnel.stages.map(stage =>
        stage.id === id ? { ...stage, ...updates } : stage
      );

      const updatedFunnel = {
        ...state.funnel,
        stages: updatedStages
      };

      setState(prev => ({
        ...prev,
        funnel: updatedFunnel,
        isDirty: true
      }));

      addToHistory(updatedFunnel);
    },
    deleteStage: async (id: string) => {
      if (!state.funnel) return;

      const updatedStages = state.funnel.stages.filter(stage => stage.id !== id);
      const updatedFunnel = {
        ...state.funnel,
        stages: updatedStages
      };

      setState(prev => ({
        ...prev,
        funnel: updatedFunnel,
        activeStageId: prev.activeStageId === id ? (updatedStages[0]?.id || null) : prev.activeStageId,
        isDirty: true
      }));

      addToHistory(updatedFunnel);
    },
    reorderStages: async (fromIndex: number, toIndex: number) => {
      if (!state.funnel) return;

      const stages = [...state.funnel.stages];
      const [movedStage] = stages.splice(fromIndex, 1);
      stages.splice(toIndex, 0, movedStage);

      const updatedFunnel = {
        ...state.funnel,
        stages
      };

      setState(prev => ({
        ...prev,
        funnel: updatedFunnel,
        isDirty: true
      }));

      addToHistory(updatedFunnel);
    },
    setActiveStage,

    addBlock,
    updateBlock,
    deleteBlock: async (blockId: string) => {
      if (!state.funnel || !state.activeStageId) return;

      const updatedStages = state.funnel.stages.map(stage => {
        if (stage.id === state.activeStageId) {
          return {
            ...stage,
            blocks: stage.blocks.filter(block => block.id !== blockId)
          };
        }
        return stage;
      });

      const updatedFunnel = {
        ...state.funnel,
        stages: updatedStages
      };

      setState(prev => ({
        ...prev,
        funnel: updatedFunnel,
        selectedBlockId: prev.selectedBlockId === blockId ? null : prev.selectedBlockId,
        selectedBlock: prev.selectedBlockId === blockId ? null : prev.selectedBlock,
        isDirty: true
      }));

      addToHistory(updatedFunnel);
    },
    duplicateBlock: async (blockId: string) => {
      if (!state.funnel || !state.activeStageId) return '';

      const activeStage = state.funnel.stages.find(s => s.id === state.activeStageId);
      if (!activeStage) return '';

      const originalBlock = activeStage.blocks.find(b => b.id === blockId);
      if (!originalBlock) return '';

      const newBlockId = `${originalBlock.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const duplicatedBlock = {
        ...originalBlock,
        id: newBlockId,
        properties: {
          ...originalBlock.properties,
          // Add copy indicator to title/content if exists
          ...(originalBlock.properties.title && {
            title: `${originalBlock.properties.title} (Cópia)`
          })
        }
      };

      const blockIndex = activeStage.blocks.findIndex(b => b.id === blockId);
      const updatedBlocks = [
        ...activeStage.blocks.slice(0, blockIndex + 1),
        duplicatedBlock,
        ...activeStage.blocks.slice(blockIndex + 1)
      ];

      const updatedStages = state.funnel.stages.map(stage =>
        stage.id === state.activeStageId ? { ...stage, blocks: updatedBlocks } : stage
      );

      const updatedFunnel = {
        ...state.funnel,
        stages: updatedStages
      };

      setState(prev => ({
        ...prev,
        funnel: updatedFunnel,
        isDirty: true
      }));

      addToHistory(updatedFunnel);
      return newBlockId;
    },
    reorderBlocks: async (stageId: string, fromIndex: number, toIndex: number) => {
      if (!state.funnel) return;

      const stage = state.funnel.stages.find(s => s.id === stageId);
      if (!stage) return;

      const blocks = [...stage.blocks];
      const [movedBlock] = blocks.splice(fromIndex, 1);
      blocks.splice(toIndex, 0, movedBlock);

      const updatedStages = state.funnel.stages.map(s =>
        s.id === stageId ? { ...s, blocks } : s
      );

      const updatedFunnel = {
        ...state.funnel,
        stages: updatedStages
      };

      setState(prev => ({
        ...prev,
        funnel: updatedFunnel,
        isDirty: true
      }));

      addToHistory(updatedFunnel);
    },
    setSelectedBlock,

    updateBlockProperty: async (blockId: string, property: string, value: any) => {
      if (!state.funnel) return;

      const updatedStages = state.funnel.stages.map(stage => ({
        ...stage,
        blocks: stage.blocks.map(block =>
          block.id === blockId
            ? {
              ...block,
              properties: {
                ...block.properties,
                [property]: value
              }
            }
            : block
        )
      }));

      const updatedFunnel = {
        ...state.funnel,
        stages: updatedStages
      };

      setState(prev => ({
        ...prev,
        funnel: updatedFunnel,
        selectedBlock: prev.selectedBlockId === blockId
          ? { ...prev.selectedBlock!, properties: { ...prev.selectedBlock!.properties, [property]: value } }
          : prev.selectedBlock,
        isDirty: true
      }));

      addToHistory(updatedFunnel);
    },
    updateBlockProperties: async (blockId: string, properties: Record<string, any>) => {
      if (!state.funnel) return;

      const updatedStages = state.funnel.stages.map(stage => ({
        ...stage,
        blocks: stage.blocks.map(block =>
          block.id === blockId
            ? {
              ...block,
              properties: {
                ...block.properties,
                ...properties
              }
            }
            : block
        )
      }));

      const updatedFunnel = {
        ...state.funnel,
        stages: updatedStages
      };

      setState(prev => ({
        ...prev,
        funnel: updatedFunnel,
        selectedBlock: prev.selectedBlockId === blockId
          ? { ...prev.selectedBlock!, properties: { ...prev.selectedBlock!.properties, ...properties } }
          : prev.selectedBlock,
        isDirty: true
      }));

      addToHistory(updatedFunnel);
    },
    resetBlockProperties: async (blockId: string) => {
      if (!state.funnel) return;

      const updatedStages = state.funnel.stages.map(stage => ({
        ...stage,
        blocks: stage.blocks.map(block => {
          if (block.id === blockId) {
            // Reset to default properties based on block type
            const defaultProperties = getDefaultPropertiesForBlockType(block.type);
            return {
              ...block,
              properties: defaultProperties
            };
          }
          return block;
        })
      }));

      const updatedFunnel = {
        ...state.funnel,
        stages: updatedStages
      };

      setState(prev => ({
        ...prev,
        funnel: updatedFunnel,
        selectedBlock: prev.selectedBlockId === blockId
          ? { ...prev.selectedBlock!, properties: getDefaultPropertiesForBlockType(prev.selectedBlock!.type) }
          : prev.selectedBlock,
        isDirty: true
      }));

      addToHistory(updatedFunnel);
    },

    setIsPreviewing: (value: boolean) => setState(prev => ({ ...prev, isPreviewing: value })),
    setError: (error: string | null) => setState(prev => ({ ...prev, error })),
    clearError: () => setState(prev => ({ ...prev, error: null })),

    undo,
    redo,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,

    // Legacy compatibility
    legacy,
  };
};

// =============================================================================
// BACKWARD COMPATIBILITY EXPORTS
// =============================================================================

/**
 * Legacy useEditor hook for backward compatibility
 * @deprecated Use useUnifiedEditor instead
 */
export const useEditor = (): any => {
  const unified = useUnifiedEditor();

  console.warn('useEditor is deprecated. Use useUnifiedEditor instead.');

  return unified.legacy;
};

/**
 * Legacy useConsolidatedEditor hook for backward compatibility
 * @deprecated Use useUnifiedEditor instead
 */
export const useConsolidatedEditor = (): any => {
  const unified = useUnifiedEditor();

  console.warn('useConsolidatedEditor is deprecated. Use useUnifiedEditor instead.');

  return {
    blocks: unified.activeBlocks,
    addBlock: unified.legacy.addBlock,
    updateBlock: unified.legacy.updateBlock,
    deleteBlock: unified.legacy.deleteBlock,
    stages: unified.funnel?.stages || [],
    activeStageId: unified.activeStageId || '',
    selectedBlockId: unified.selectedBlockId,
    setActiveStage: unified.setActiveStage,
    setSelectedBlock: unified.setSelectedBlock,
    isSaving: unified.isSaving,
    saveFunnel: unified.saveFunnel,
    isPreviewing: unified.isPreviewing,
    setIsPreviewing: unified.setIsPreviewing,
  };
};

export default useUnifiedEditor;
