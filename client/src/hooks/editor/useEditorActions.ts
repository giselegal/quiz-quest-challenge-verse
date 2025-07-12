
import { useCallback } from 'react';
import { Block, EditableContent } from '@/types/editor';
import { useToast } from '@/hooks/use-toast';
import { getDefaultContentForType } from '@/utils/editorDefaults';

export const useEditorActions = (
  blocks: Block[],
  onBlocksChange: (blocks: Block[]) => void,
  addToHistory: (blocks: Block[]) => void
) => {
  const { toast } = useToast();

  const handleAddBlock = useCallback((type: Block['type']) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      content: getDefaultContentForType(type),
      order: blocks.length,
      visible: true,
      properties: {} // Added missing properties
    };
    
    const newBlocks = [...blocks, newBlock];
    onBlocksChange(newBlocks);
    addToHistory(newBlocks);
  }, [blocks, onBlocksChange, addToHistory]);

  const handleUpdateBlock = useCallback((id: string, content: Partial<EditableContent>) => {
    const newBlocks = blocks.map(block => 
      block.id === id ? { ...block, content: { ...block.content, ...content } } : block
    );
    
    onBlocksChange(newBlocks);
    addToHistory(newBlocks);
  }, [blocks, onBlocksChange, addToHistory]);

  const handleDeleteBlock = useCallback((id: string) => {
    const newBlocks = blocks.filter(block => block.id !== id)
      .map((block, index) => ({ ...block, order: index }));
    
    onBlocksChange(newBlocks);
    addToHistory(newBlocks);
  }, [blocks, onBlocksChange, addToHistory]);

  const handleSave = useCallback(() => {
    toast({
      title: "Alterações salvas",
      description: "Suas alterações foram salvas com sucesso."
    });
  }, [toast]);

  return {
    handleAddBlock,
    handleUpdateBlock,
    handleDeleteBlock,
    handleSave
  };
};
