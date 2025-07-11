
import { useState, useCallback } from 'react';
import { Block, BlockType } from '@/types/editor';

export const useSalesPageEditor = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const addBlock = useCallback((type: BlockType) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      content: {},
      order: blocks.length,
      visible: true // Added missing visible property
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
    if (selectedBlockId === id) {
      setSelectedBlockId(null);
    }
  }, [selectedBlockId]);

  const selectedBlock = blocks.find(block => block.id === selectedBlockId) || null;

  const handleSave = async () => {
    // Mock save functionality
    console.log('Saving sales page...');
    return true;
  };

  const loadTemplate = (templateBlocks: any[]) => {
    // Mock template loading
    console.log('Loading template:', templateBlocks);
    return true;
  };

  return {
    blocks,
    selectedBlock,
    selectedBlockId,
    setSelectedBlockId,
    addBlock,
    updateBlock,
    deleteBlock,
    handleSave,
    loadTemplate
  };
};
