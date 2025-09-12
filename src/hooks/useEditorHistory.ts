import { useState, useCallback, useEffect, useRef } from 'react';

export interface HistoryEntry {
  id: string;
  timestamp: number;
  action: string;
  description: string;
  data: any;
  metadata?: {
    blockId?: string;
    stepId?: string;
    actionType: 'add' | 'remove' | 'edit' | 'move' | 'reorder';
  };
}

export interface HistoryState {
  entries: HistoryEntry[];
  currentIndex: number;
  maxHistorySize: number;
}

export interface UseEditorHistoryConfig {
  maxHistorySize?: number;
  persistToStorage?: boolean;
  storageKey?: string;
  onUndo?: (entry: HistoryEntry) => void;
  onRedo?: (entry: HistoryEntry) => void;
}

export const useEditorHistory = (
  initialData: any,
  config: UseEditorHistoryConfig = {}
) => {
  const {
    maxHistorySize = 50,
    persistToStorage = true,
    storageKey = 'quiz-editor-history',
    onUndo,
    onRedo
  } = config;

  // Estado do histórico
  const [historyState, setHistoryState] = useState<HistoryState>(() => {
    // Tentar carregar do localStorage
    if (persistToStorage && typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            entries: parsed.entries || [],
            currentIndex: parsed.currentIndex ?? -1,
            maxHistorySize
          };
        }
      } catch (error) {
        console.warn('Erro ao carregar histórico do localStorage:', error);
      }
    }

    return {
      entries: [],
      currentIndex: -1,
      maxHistorySize
    };
  });

  // Dados atuais
  const [currentData, setCurrentData] = useState(initialData);
  const currentDataRef = useRef(currentData);

  // Atualizar ref quando os dados mudarem
  useEffect(() => {
    currentDataRef.current = currentData;
  }, [currentData]);

  // Persistir histórico no localStorage
  useEffect(() => {
    if (persistToStorage && typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, JSON.stringify({
          entries: historyState.entries,
          currentIndex: historyState.currentIndex
        }));
      } catch (error) {
        console.warn('Erro ao salvar histórico no localStorage:', error);
      }
    }
  }, [historyState, persistToStorage, storageKey]);

  // Adicionar entrada ao histórico
  const addHistoryEntry = useCallback((
    action: string,
    description: string,
    newData: any,
    metadata?: HistoryEntry['metadata']
  ) => {
    setHistoryState(prevState => {
      // Criar nova entrada
      const newEntry: HistoryEntry = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        action,
        description,
        data: JSON.parse(JSON.stringify(newData)), // Deep clone
        metadata
      };

      // Remover entradas futuras se estivermos no meio do histórico
      const entries = prevState.entries.slice(0, prevState.currentIndex + 1);

      // Adicionar nova entrada
      entries.push(newEntry);

      // Limitar tamanho do histórico
      while (entries.length > maxHistorySize) {
        entries.shift();
      }

      return {
        ...prevState,
        entries,
        currentIndex: entries.length - 1
      };
    });

    // Atualizar dados atuais
    setCurrentData(newData);
  }, [maxHistorySize]);

  // Desfazer (undo)
  const undo = useCallback(() => {
    if (historyState.currentIndex <= 0) {
      console.warn('Nenhuma ação para desfazer');
      return false;
    }

    const previousIndex = historyState.currentIndex - 1;
    const targetEntry = historyState.entries[previousIndex];

    if (targetEntry) {
      setCurrentData(targetEntry.data);
      setHistoryState(prev => ({
        ...prev,
        currentIndex: previousIndex
      }));

      onUndo?.(targetEntry);
      return true;
    }

    return false;
  }, [historyState, onUndo]);

  // Refazer (redo)
  const redo = useCallback(() => {
    if (historyState.currentIndex >= historyState.entries.length - 1) {
      console.warn('Nenhuma ação para refazer');
      return false;
    }

    const nextIndex = historyState.currentIndex + 1;
    const targetEntry = historyState.entries[nextIndex];

    if (targetEntry) {
      setCurrentData(targetEntry.data);
      setHistoryState(prev => ({
        ...prev,
        currentIndex: nextIndex
      }));

      onRedo?.(targetEntry);
      return true;
    }

    return false;
  }, [historyState, onRedo]);

  // Ir para uma entrada específica
  const goToEntry = useCallback((index: number) => {
    if (index < 0 || index >= historyState.entries.length) {
      return false;
    }

    const targetEntry = historyState.entries[index];
    if (targetEntry) {
      setCurrentData(targetEntry.data);
      setHistoryState(prev => ({
        ...prev,
        currentIndex: index
      }));
      return true;
    }

    return false;
  }, [historyState]);

  // Limpar histórico
  const clearHistory = useCallback(() => {
    setHistoryState(prev => ({
      ...prev,
      entries: [],
      currentIndex: -1
    }));

    if (persistToStorage && typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
    }
  }, [persistToStorage, storageKey]);

  // Verificar se pode desfazer/refazer
  const canUndo = historyState.currentIndex > 0;
  const canRedo = historyState.currentIndex < historyState.entries.length - 1;

  // Estatísticas do histórico
  const historyStats = {
    totalEntries: historyState.entries.length,
    currentIndex: historyState.currentIndex,
    canUndo,
    canRedo,
    memoryUsage: JSON.stringify(historyState.entries).length
  };

  return {
    // Dados atuais
    currentData,
    setCurrentData,

    // Controle do histórico
    addHistoryEntry,
    undo,
    redo,
    goToEntry,
    clearHistory,

    // Estado do histórico
    historyEntries: historyState.entries,
    currentIndex: historyState.currentIndex,
    canUndo,
    canRedo,
    historyStats
  };
};

// Hook para atalhos de teclado
export const useHistoryShortcuts = (
  undo: () => boolean,
  redo: () => boolean
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+Z ou Cmd+Z para desfazer
      if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        undo();
        return;
      }

      // Ctrl+Y ou Ctrl+Shift+Z ou Cmd+Shift+Z para refazer
      if (
        ((event.ctrlKey || event.metaKey) && event.key === 'y') ||
        ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'Z')
      ) {
        event.preventDefault();
        redo();
        return;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);
};