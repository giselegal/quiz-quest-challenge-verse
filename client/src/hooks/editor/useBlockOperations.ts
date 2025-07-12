
import { useCallback } from 'react';
import { Block, BlockType, EditableContent } from '@/types/editor';

export const useBlockOperations = (
  blocks: Block[],
  setBlocks: (blocks: Block[]) => void
) => {
  const addBlock = useCallback((type: BlockType) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      order: blocks.length,
      visible: true,
      content: {} as EditableContent,
      properties: {} // Added missing properties
    };
    
    setBlocks([...blocks, newBlock]);
    return newBlock.id;
  }, [blocks, setBlocks]);

  const updateBlock = useCallback((id: string, content: EditableContent) => {
    setBlocks(blocks.map(block =>
      block.id === id ? { ...block, content: { ...block.content, ...content } } : block
    ));
  }, [blocks, setBlocks]);

  const deleteBlock = useCallback((id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
  }, [blocks, setBlocks]);

  return {
    addBlock,
    updateBlock,
    deleteBlock
  };
};
