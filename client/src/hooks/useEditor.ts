
import { useState } from 'react';

export interface EditorConfig {
  blocks: any[];
}

export const useEditor = () => {
  const [config, setConfig] = useState<EditorConfig>({ blocks: [] });

  const addBlock = (type: string) => {
    const newBlock = {
      id: `block-${Date.now()}`,
      type,
      content: {}
    };
    setConfig(prev => ({
      ...prev,
      blocks: [...prev.blocks, newBlock]
    }));
    return newBlock.id;
  };

  const updateBlock = (id: string, content: any) => {
    setConfig(prev => ({
      ...prev,
      blocks: prev.blocks.map(block => 
        block.id === id ? { ...block, content } : block
      )
    }));
  };

  const deleteBlock = (id: string) => {
    setConfig(prev => ({
      ...prev,
      blocks: prev.blocks.filter(block => block.id !== id)
    }));
  };

  const reorderBlocks = () => {};

  return {
    config,
    addBlock,
    updateBlock,
    deleteBlock,
    reorderBlocks
  };
};
