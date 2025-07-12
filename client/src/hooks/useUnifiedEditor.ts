
import { useState, useCallback } from 'react';
import { Block, BlockType } from '@/types/editor';
import { useBlockOperations } from './editor/useBlockOperations';

export interface UnifiedEditorActions {
  blocks: Block[];
  selectedBlockId: string | null;
  setSelectedBlockId: React.Dispatch<React.SetStateAction<string | null>>;
  addBlock: (type: BlockType) => string;
  updateBlock: (id: string, updates: Partial<Block>) => void;
  deleteBlock: (id: string) => void;
  handleSave: () => Promise<void>;
  loadTemplate: (templateId: string) => Promise<void>;
}

export const useUnifiedEditor = (): UnifiedEditorActions => {
  const blockOperations = useBlockOperations();
  
  const handleSave = useCallback(async () => {
    try {
      // Save logic would go here
      console.log('Saving editor state...');
    } catch (error) {
      console.error('Error saving:', error);
    }
  }, []);

  const loadTemplate = useCallback(async (templateId: string) => {
    try {
      // Template loading logic would go here
      console.log('Loading template:', templateId);
    } catch (error) {
      console.error('Error loading template:', error);
    }
  }, []);

  return {
    ...blockOperations,
    handleSave,
    loadTemplate
  };
};
