
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Block, BlockType } from '@/types/editor';
import ModernPropertyPanel from './ModernPropertyPanel';
import { AddBlockButton } from './AddBlockButton';

const CanvasEditor: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

  const handleAddBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      content: {},
      order: blocks.length,
      visible: true // Add missing visible property
    };
    
    setBlocks(prev => [...prev, newBlock]);
    setSelectedBlock(newBlock);
  };

  const handleUpdateBlock = (updates: Partial<Block>) => {
    if (!selectedBlock) return;
    
    const updatedBlock = { ...selectedBlock, ...updates };
    setBlocks(prev => prev.map(block => 
      block.id === selectedBlock.id ? updatedBlock : block
    ));
    setSelectedBlock(updatedBlock);
  };

  const handleDeleteBlock = (blockId: string) => {
    setBlocks(prev => prev.filter(block => block.id !== blockId));
    if (selectedBlock?.id === blockId) {
      setSelectedBlock(null);
    }
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 p-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Canvas Editor
              <AddBlockButton onAddBlock={handleAddBlock} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {blocks.map((block) => (
                <div
                  key={block.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedBlock?.id === block.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedBlock(block)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{block.type}</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBlock(block.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                  {block.content.title && (
                    <p className="text-sm text-gray-600 mt-2">{block.content.title}</p>
                  )}
                </div>
              ))}
              
              {blocks.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p>No blocks added yet. Click "Add Block" to get started.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="w-80 border-l">
        <ModernPropertyPanel 
          block={selectedBlock} 
          onUpdate={handleUpdateBlock} 
        />
      </div>
    </div>
  );
};

export default CanvasEditor;
