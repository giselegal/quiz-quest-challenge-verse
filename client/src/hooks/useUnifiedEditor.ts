
import { useState, useCallback } from 'react';
import { Block, BlockType, EditableContent } from '@/types/editor';
import { useEditorBlocks } from './editor/useEditorBlocks';

export interface UnifiedEditorActions {
  blocks: Block[];
  selectedBlockId: string | null;
  setSelectedBlockId: (id: string | null) => void;
  handleSave: () => Promise<void>;
  loadTemplate: (templateId: string) => Promise<void>;
  addBlock: (type: BlockType) => string;
  updateBlock: (id: string, content: EditableContent) => void;
  deleteBlock: (id: string) => void;
  isPreviewing: boolean;
  togglePreview: () => void;
  saveAll: () => Promise<void>;
  openTemplateModal: () => void;
  isTemplateModalOpen: boolean;
  closeTemplateModal: () => void;
  loadTemplateForCurrentEditor: (templateId: string) => Promise<void>;
  setActiveMode: (mode: string) => void;
}

export const useUnifiedEditor = (): UnifiedEditorActions => {
  const { blocks, selectedBlockId, setSelectedBlockId, addBlock, updateBlock, deleteBlock } = useEditorBlocks();
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  const handleSave = useCallback(async () => {
    try {
      // Save logic here
      console.log('Saving editor state...', blocks);
    } catch (error) {
      console.error('Error saving:', error);
    }
  }, [blocks]);

  const loadTemplate = useCallback(async (templateId: string) => {
    try {
      // Load template logic here
      console.log('Loading template:', templateId);
    } catch (error) {
      console.error('Error loading template:', error);
    }
  }, []);

  const togglePreview = useCallback(() => {
    setIsPreviewing(prev => !prev);
  }, []);

  const saveAll = useCallback(async () => {
    await handleSave();
  }, [handleSave]);

  const openTemplateModal = useCallback(() => {
    setIsTemplateModalOpen(true);
  }, []);

  const closeTemplateModal = useCallback(() => {
    setIsTemplateModalOpen(false);
  }, []);

  const loadTemplateForCurrentEditor = useCallback(async (templateId: string) => {
    await loadTemplate(templateId);
    closeTemplateModal();
  }, [loadTemplate, closeTemplateModal]);

  const setActiveMode = useCallback((mode: string) => {
    console.log('Setting active mode:', mode);
  }, []);

  return {
    blocks,
    selectedBlockId,
    setSelectedBlockId,
    handleSave,
    loadTemplate,
    addBlock,
    updateBlock,
    deleteBlock,
    isPreviewing,
    togglePreview,
    saveAll,
    openTemplateModal,
    isTemplateModalOpen,
    closeTemplateModal,
    loadTemplateForCurrentEditor,
    setActiveMode
  };
};
