
import { useState, useCallback } from 'react';
import { Block, BlockType, EditableContent } from '@/types/editor';

export const useEditorBlocks = (initialBlocks: Block[] = []) => {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);

  const addBlock = useCallback((type: BlockType): string => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      content: {} as EditableContent,
      order: blocks.length,
      visible: true,
      properties: {} // Added missing properties
    };
    
    setBlocks(prev => [...prev, newBlock]);
    return newBlock.id;
  }, [blocks.length]);

  const updateBlock = useCallback((id: string, updates: Partial<Block>) => {
    setBlocks(prev => prev.map(block =>
      block.id === id ? { ...block, ...updates } : block
    ));
  }, []);

  const deleteBlock = useCallback((id: string) => {
    setBlocks(prev => prev.filter(block => block.id !== id));
  }, []);

  const reorderBlocks = useCallback((startIndex: number, endIndex: number) => {
    setBlocks(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result.map((block, index) => ({ ...block, order: index }));
    });
  }, []);

  return {
    blocks,
    setBlocks,
    addBlock,
    updateBlock,
    deleteBlock,
    reorderBlocks
  };
};
