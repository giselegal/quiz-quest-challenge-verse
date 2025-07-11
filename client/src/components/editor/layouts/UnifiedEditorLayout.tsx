
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EditorBlock } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import { PropertiesPanel } from '@/components/editor/properties/PropertiesPanel';

interface UnifiedEditorLayoutProps {
  blocks: EditorBlock[];
  selectedBlockId: string | null;
  onBlockSelect: (blockId: string | null) => void;
  onBlockUpdate: (blockId: string, content: any) => void;
  onBlockDelete: (blockId: string) => void;
}

export const UnifiedEditorLayout: React.FC<UnifiedEditorLayoutProps> = ({
  blocks,
  selectedBlockId,
  onBlockSelect,
  onBlockUpdate,
  onBlockDelete
}) => {
  const selectedBlock = blocks.find(b => b.id === selectedBlockId) || null;
  
  // Mock primary style for demo
  const primaryStyle: StyleResult = {
    style: 'Modern',
    category: 'Contemporary',
    points: 100,
    percentage: 85,
    rank: 1,
    score: 100
  };

  const handleContentUpdate = (content: any) => {
    if (selectedBlockId) {
      onBlockUpdate(selectedBlockId, content);
    }
  };

  const handleDelete = () => {
    if (selectedBlockId) {
      onBlockDelete(selectedBlockId);
      onBlockSelect(null);
    }
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 p-4">
        <Card className="h-full p-4">
          <h2 className="text-xl font-semibold mb-4">Editor Canvas</h2>
          <div className="space-y-4">
            {blocks.map((block) => (
              <div
                key={block.id}
                className={`p-4 border rounded cursor-pointer ${
                  selectedBlockId === block.id ? 'border-primary' : 'border-border'
                }`}
                onClick={() => onBlockSelect(block.id)}
              >
                <div className="font-medium">{block.type}</div>
                <div className="text-sm text-muted-foreground">
                  Click to edit properties
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      <div className="w-80 p-4">
        <PropertiesPanel
          selectedBlock={selectedBlock}
          onClose={() => onBlockSelect(null)}
          onUpdate={handleContentUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default UnifiedEditorLayout;
