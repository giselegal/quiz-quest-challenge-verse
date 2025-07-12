
import { useCallback, useState } from 'react';
import { Block, BlockType, EditableContent } from '@/types/editor';

export const useBlockOperations = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const updateBlocks = useCallback((newBlocks: Block[]) => {
    setBlocks(newBlocks);
  }, []);

  const addBlock = useCallback((type: BlockType) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      order: blocks.length,
      visible: true,
      content: {} as EditableContent,
      properties: {}
    };
    
    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);
    setSelectedBlockId(newBlock.id);
    return newBlock.id;
  }, [blocks]);

  const updateBlock = useCallback((id: string, content: EditableContent) => {
    setBlocks(blocks.map(block =>
      block.id === id ? { ...block, content: { ...block.content, ...content } } : block
    ));
  }, [blocks]);

  const deleteBlock = useCallback((id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
    if (selectedBlockId === id) {
      setSelectedBlockId(null);
    }
  }, [blocks, selectedBlockId]);

  const handleReorderBlocks = useCallback((sourceIndex: number, destinationIndex: number) => {
    const result = Array.from(blocks);
    const [removed] = result.splice(sourceIndex, 1);
    result.splice(destinationIndex, 0, removed);
    
    const reorderedBlocks = result.map((block, index) => ({
      ...block,
      order: index
    }));
    
    setBlocks(reorderedBlocks);
  }, [blocks]);

  return {
    blocks,
    selectedBlockId,
    setSelectedBlockId,
    updateBlocks,
    actions: {
      handleAddBlock: addBlock,
      handleUpdateBlock: updateBlock,
      handleDeleteBlock: deleteBlock,
      handleReorderBlocks
    }
  };
};
