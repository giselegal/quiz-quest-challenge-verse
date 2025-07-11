import { useState } from 'react';
import { Block } from '@/types/editor';

export const useBlockOperations = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  const updateBlocks = (newBlocks: Block[]) => {
    setBlocks(newBlocks);
  };

  const actions = {
    reorderBlocks: (startIndex: number, endIndex: number) => {
      const result = Array.from(blocks);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      setBlocks(result);
    }
  };

  return {
    blocks,
    updateBlocks,
    actions
  };
};