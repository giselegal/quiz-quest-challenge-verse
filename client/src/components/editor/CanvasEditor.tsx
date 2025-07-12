
import React, { useState } from 'react';
import { Block, BlockType } from '@/types/editor';
import { Button } from '@/components/ui/button';

const CanvasEditor: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      content: {},
      order: blocks.length,
      visible: true,
      properties: {} // Added missing properties
    };
    
    setBlocks([...blocks, newBlock]);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <Button onClick={() => addBlock('header')}>Add Header</Button>
        <Button onClick={() => addBlock('text')} className="ml-2">Add Text</Button>
      </div>
      
      <div className="space-y-2">
        {blocks.map((block) => (
          <div key={block.id} className="p-2 border rounded">
            Block: {block.type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CanvasEditor;
