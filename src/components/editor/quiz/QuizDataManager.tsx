/**
 * QuizDataManager.tsx - Data Management and Persistence Component
 * ✅ Handles state persistence and data management
 * ✅ Auto-save functionality
 * ✅ Mode-aware data handling
 */

import React, { useEffect, useCallback, useRef } from 'react';
import { QuizMode, QuizState } from './QuizFlowPage';

export interface QuizDataManagerProps {
  mode: QuizMode;
  quizState: QuizState;
  onStateUpdate: (updates: Partial<QuizState>) => void;
  enableAutoSave?: boolean;
  autoSaveInterval?: number;
  storageKey?: string;
  onDataSaved?: (data: any) => void;
  onDataLoaded?: (data: any) => void;
  onError?: (error: string) => void;
}

export const QuizDataManager: React.FC<QuizDataManagerProps> = ({
  mode,
  quizState,
  onStateUpdate,
  enableAutoSave = true,
  autoSaveInterval = 10000, // 10 seconds
  storageKey = 'quiz-quest-state',
  onDataSaved,
  onDataLoaded,
  onError,
}) => {
  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null);
  const lastSavedState = useRef<string>('');

  // Generate storage key based on mode and user
  const getStorageKey = useCallback(() => {
    const baseKey = storageKey;
    const userKey = quizState.userName ? `-${quizState.userName}` : '';
    return `${baseKey}-${mode}${userKey}`;
  }, [storageKey, mode, quizState.userName]);

  // Save state to localStorage
  const saveToStorage = useCallback(async () => {
    try {
      const dataToSave = {
        ...quizState,
        timestamp: new Date().toISOString(),
        mode,
        version: '1.0',
      };

      const serializedData = JSON.stringify(dataToSave);
      
      // Check if data has changed
      if (serializedData === lastSavedState.current) {
        return;
      }

      localStorage.setItem(getStorageKey(), serializedData);
      lastSavedState.current = serializedData;

      if (onDataSaved) {
        onDataSaved(dataToSave);
      }

      console.log(`[QuizDataManager] State saved for mode: ${mode}`);
    } catch (error) {
      const errorMessage = `Failed to save quiz state: ${error instanceof Error ? error.message : 'Unknown error'}`;
      console.error('[QuizDataManager]', errorMessage);
      
      if (onError) {
        onError(errorMessage);
      }
    }
  }, [quizState, mode, getStorageKey, onDataSaved, onError]);

  // Load state from localStorage
  const loadFromStorage = useCallback(async () => {
    try {
      const key = getStorageKey();
      const storedData = localStorage.getItem(key);

      if (!storedData) {
        console.log(`[QuizDataManager] No stored data found for key: ${key}`);
        return false;
      }

      const parsedData = JSON.parse(storedData);

      // Validate data structure
      if (!parsedData || typeof parsedData !== 'object') {
        throw new Error('Invalid data format');
      }

      // Extract quiz state (remove metadata)
      const { timestamp, mode: savedMode, version, ...savedState } = parsedData;

      // Update state with loaded data
      onStateUpdate(savedState);
      lastSavedState.current = storedData;

      if (onDataLoaded) {
        onDataLoaded(parsedData);
      }

      console.log(`[QuizDataManager] State loaded for mode: ${mode}`, {
        timestamp,
        savedMode,
        version,
      });

      return true;
    } catch (error) {
      const errorMessage = `Failed to load quiz state: ${error instanceof Error ? error.message : 'Unknown error'}`;
      console.error('[QuizDataManager]', errorMessage);
      
      if (onError) {
        onError(errorMessage);
      }
      
      return false;
    }
  }, [getStorageKey, onStateUpdate, onDataLoaded, onError, mode]);

  // Clear storage
  const clearStorage = useCallback(() => {
    try {
      const key = getStorageKey();
      localStorage.removeItem(key);
      lastSavedState.current = '';
      console.log(`[QuizDataManager] Storage cleared for key: ${key}`);
    } catch (error) {
      console.error('[QuizDataManager] Failed to clear storage:', error);
    }
  }, [getStorageKey]);

  // Auto-save functionality
  useEffect(() => {
    if (!enableAutoSave || mode === 'editor') {
      return;
    }

    // Clear existing timer
    if (autoSaveTimer.current) {
      clearTimeout(autoSaveTimer.current);
    }

    // Set new timer
    autoSaveTimer.current = setTimeout(() => {
      saveToStorage();
    }, autoSaveInterval);

    // Cleanup
    return () => {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current);
      }
    };
  }, [quizState, enableAutoSave, autoSaveInterval, saveToStorage, mode]);

  // Load data on mount
  useEffect(() => {
    if (mode !== 'editor') {
      loadFromStorage();
    }
  }, [loadFromStorage, mode]);

  // Save data when user completes quiz
  useEffect(() => {
    if (quizState.isCompleted && enableAutoSave) {
      saveToStorage();
    }
  }, [quizState.isCompleted, saveToStorage, enableAutoSave]);

  // Save data before page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (enableAutoSave && mode !== 'editor') {
        saveToStorage();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [saveToStorage, enableAutoSave, mode]);

  // Export data management functions
  const dataManager = {
    save: saveToStorage,
    load: loadFromStorage,
    clear: clearStorage,
    export: () => ({
      ...quizState,
      timestamp: new Date().toISOString(),
      mode,
    }),
    import: (data: any) => {
      if (data && typeof data === 'object') {
        const { timestamp, mode: importMode, ...importState } = data;
        onStateUpdate(importState);
      }
    },
  };

  // Attach to window for debugging (editor mode only)
  if (mode === 'editor' && typeof window !== 'undefined') {
    (window as any).quizDataManager = dataManager;
  }

  // This component doesn't render anything visible
  return null;
};

export default QuizDataManager;