
import { useState, useCallback } from 'react';
import { Block, BlockType, EditableContent } from '@/types/editor';
import { useEditorBlocks } from './editor/useEditorBlocks';
import { StyleResult } from '@/types/quiz';

export interface UnifiedEditorActions {
  blocks: Block[];
  selectedBlockId: string | null;
  setSelectedBlockId: (id: string | null) => void;
  handleSave: () => Promise<boolean>;
  loadTemplate: (templateId: string) => Promise<void>;
  addBlock: (type: BlockType) => string;
  updateBlock: (id: string, content: EditableContent) => void;
  deleteBlock: (id: string) => void;
  isPreviewing: boolean;
  togglePreview: () => void;
  saveAll: () => Promise<boolean>;
  openTemplateModal: () => void;
  isTemplateModalOpen: boolean;
  closeTemplateModal: () => void;
  loadTemplateForCurrentEditor: (templateData: any) => boolean;
  setActiveMode: (mode: string) => void;
}

export const useUnifiedEditor = (primaryStyle?: StyleResult): UnifiedEditorActions => {
  const { blocks, selectedBlockId, setSelectedBlockId, addBlock, updateBlock: updateBlockBase, deleteBlock } = useEditorBlocks();
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  const updateBlock = useCallback((id: string, content: EditableContent) => {
    updateBlockBase(id, { content });
  }, [updateBlockBase]);

  const handleSave = useCallback(async (): Promise<boolean> => {
    try {
      console.log('Saving editor state...', blocks);
      return true;
    } catch (error) {
      console.error('Error saving:', error);
      return false;
    }
  }, [blocks]);

  const loadTemplate = useCallback(async (templateId: string) => {
    try {
      console.log('Loading template:', templateId);
    } catch (error) {
      console.error('Error loading template:', error);
    }
  }, []);

  const togglePreview = useCallback(() => {
    setIsPreviewing(prev => !prev);
  }, []);

  const saveAll = useCallback(async (): Promise<boolean> => {
    return await handleSave();
  }, [handleSave]);

  const openTemplateModal = useCallback(() => {
    setIsTemplateModalOpen(true);
  }, []);

  const closeTemplateModal = useCallback(() => {
    setIsTemplateModalOpen(false);
  }, []);

  const loadTemplateForCurrentEditor = useCallback((templateData: any): boolean => {
    try {
      console.log('Loading template for current editor:', templateData);
      closeTemplateModal();
      return true;
    } catch (error) {
      console.error('Error loading template:', error);
      return false;
    }
  }, [closeTemplateModal]);

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
