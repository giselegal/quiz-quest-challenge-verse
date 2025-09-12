import React, { useState, useCallback, useRef, useEffect } from 'react';

interface HistoryEntry<T = any> {
  id: string;
  data: T;
  action: string;
  timestamp: Date;
  description: string;
}

interface HistoryState<T = any> {
  entries: HistoryEntry<T>[];
  currentIndex: number;
  maxEntries: number;
}

interface HistoryManagerConfig {
  maxEntries: number;
  debounceMs: number;
  skipDuplicates: boolean;
  enabled: boolean;
}

interface UseHistoryReturn<T> {
  canUndo: boolean;
  canRedo: boolean;
  undo: () => T | null;
  redo: () => T | null;
  addEntry: (data: T, action: string, description?: string) => void;
  clearHistory: () => void;
  getHistory: () => HistoryEntry<T>[];
  getCurrentEntry: () => HistoryEntry<T> | null;
  jumpToEntry: (index: number) => T | null;
  historyState: HistoryState<T>;
}

export const useHistory = <T>(
  initialData: T,
  config: Partial<HistoryManagerConfig> = {}
): UseHistoryReturn<T> => {
  const defaultConfig: HistoryManagerConfig = {
    maxEntries: 50,
    debounceMs: 500,
    skipDuplicates: true,
    enabled: true,
    ...config
  };

  const [historyState, setHistoryState] = useState<HistoryState<T>>({
    entries: [{
      id: 'initial',
      data: initialData,
      action: 'init',
      timestamp: new Date(),
      description: 'Estado inicial'
    }],
    currentIndex: 0,
    maxEntries: defaultConfig.maxEntries
  });

  const debounceTimeoutRef = useRef<NodeJS.Timeout>();

  const addEntry = useCallback((data: T, action: string, description?: string) => {
    if (!defaultConfig.enabled) return;

    // Clear debounce timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setHistoryState(prevState => {
        const newEntry: HistoryEntry<T> = {
          id: `${Date.now()}-${Math.random()}`,
          data: structuredClone(data), // Deep copy
          action,
          timestamp: new Date(),
          description: description || `Ação: ${action}`
        };

        // Skip if duplicate and enabled
        if (defaultConfig.skipDuplicates && prevState.entries.length > 0) {
          const lastEntry = prevState.entries[prevState.currentIndex];
          if (JSON.stringify(lastEntry.data) === JSON.stringify(data)) {
            return prevState;
          }
        }

        // Remove entries after current index (when adding after undo)
        const newEntries = prevState.entries.slice(0, prevState.currentIndex + 1);
        newEntries.push(newEntry);

        // Limit entries to maxEntries
        if (newEntries.length > prevState.maxEntries) {
          newEntries.shift();
        }

        return {
          ...prevState,
          entries: newEntries,
          currentIndex: newEntries.length - 1
        };
      });
    }, defaultConfig.debounceMs);
  }, [defaultConfig.enabled, defaultConfig.debounceMs, defaultConfig.skipDuplicates]);

  const undo = useCallback((): T | null => {
    if (historyState.currentIndex <= 0) return null;

    const newIndex = historyState.currentIndex - 1;
    setHistoryState(prev => ({ ...prev, currentIndex: newIndex }));
    return historyState.entries[newIndex].data;
  }, [historyState.currentIndex, historyState.entries]);

  const redo = useCallback((): T | null => {
    if (historyState.currentIndex >= historyState.entries.length - 1) return null;

    const newIndex = historyState.currentIndex + 1;
    setHistoryState(prev => ({ ...prev, currentIndex: newIndex }));
    return historyState.entries[newIndex].data;
  }, [historyState.currentIndex, historyState.entries]);

  const jumpToEntry = useCallback((index: number): T | null => {
    if (index < 0 || index >= historyState.entries.length) return null;

    setHistoryState(prev => ({ ...prev, currentIndex: index }));
    return historyState.entries[index].data;
  }, [historyState.entries]);

  const clearHistory = useCallback(() => {
    setHistoryState(prev => ({
      ...prev,
      entries: [prev.entries[prev.currentIndex]], // Keep only current entry
      currentIndex: 0
    }));
  }, []);

  const getHistory = useCallback(() => {
    return [...historyState.entries];
  }, [historyState.entries]);

  const getCurrentEntry = useCallback(() => {
    return historyState.entries[historyState.currentIndex] || null;
  }, [historyState.entries, historyState.currentIndex]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return {
    canUndo: historyState.currentIndex > 0,
    canRedo: historyState.currentIndex < historyState.entries.length - 1,
    undo,
    redo,
    addEntry,
    clearHistory,
    getHistory,
    getCurrentEntry,
    jumpToEntry,
    historyState
  };
};

// History panel component
interface HistoryPanelProps<T> {
  history: UseHistoryReturn<T>;
  isVisible: boolean;
  onClose: () => void;
  onRestoreEntry: (data: T) => void;
}

export const HistoryPanel = <T,>({
  history,
  isVisible,
  onClose,
  onRestoreEntry
}: HistoryPanelProps<T>) => {
  if (!isVisible) return null;

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Agora';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}min atrás`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h atrás`;
    return date.toLocaleDateString('pt-BR');
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'init': return '🎯';
      case 'add': return '➕';
      case 'delete': return '🗑️';
      case 'edit': return '✏️';
      case 'move': return '🔄';
      case 'import': return '📥';
      default: return '📝';
    }
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-lg w-96 max-h-[60vh] z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">📜 Histórico</h3>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>
        <p className="text-indigo-100 text-sm mt-1">
          {history.historyState.entries.length} entradas • Posição {history.historyState.currentIndex + 1}
        </p>
      </div>

      {/* Controls */}
      <div className="p-3 border-b bg-gray-50 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => {
              const data = history.undo();
              if (data) onRestoreEntry(data);
            }}
            disabled={!history.canUndo}
            className="px-3 py-1 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 disabled:text-gray-400 text-blue-700 rounded text-sm font-medium transition"
            title="Ctrl+Z"
          >
            ↶ Desfazer
          </button>
          <button
            onClick={() => {
              const data = history.redo();
              if (data) onRestoreEntry(data);
            }}
            disabled={!history.canRedo}
            className="px-3 py-1 bg-green-100 hover:bg-green-200 disabled:bg-gray-100 disabled:text-gray-400 text-green-700 rounded text-sm font-medium transition"
            title="Ctrl+Y"
          >
            ↷ Refazer
          </button>
        </div>
        <button
          onClick={history.clearHistory}
          className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm font-medium transition"
          title="Limpar histórico"
        >
          🗑️ Limpar
        </button>
      </div>

      {/* History List */}
      <div className="overflow-y-auto max-h-80">
        {history.historyState.entries.map((entry, index) => (
          <div
            key={entry.id}
            className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition ${
              index === history.historyState.currentIndex 
                ? 'bg-blue-50 border-l-4 border-l-blue-500' 
                : ''
            }`}
            onClick={() => {
              const data = history.jumpToEntry(index);
              if (data) onRestoreEntry(data);
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">{getActionIcon(entry.action)}</span>
                <span className="font-medium text-gray-900 text-sm">
                  {entry.description}
                </span>
                {index === history.historyState.currentIndex && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Atual
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 capitalize">
                {entry.action}
              </span>
              <span className="text-xs text-gray-500">
                {formatTime(entry.timestamp)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 bg-gray-50 border-t text-center">
        <p className="text-xs text-gray-600">
          💡 Use Ctrl+Z/Ctrl+Y ou clique nas entradas para navegar
        </p>
      </div>
    </div>
  );
};

// Keyboard shortcuts hook
export const useHistoryShortcuts = <T,>(
  history: UseHistoryReturn<T>,
  onRestoreEntry: (data: T) => void,
  enabled = true
) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'z':
            event.preventDefault();
            const undoData = history.undo();
            if (undoData) onRestoreEntry(undoData);
            break;
          case 'y':
            event.preventDefault();
            const redoData = history.redo();
            if (redoData) onRestoreEntry(redoData);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history, onRestoreEntry, enabled]);
};

export default useHistory;