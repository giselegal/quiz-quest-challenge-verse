
import React from 'react';
import { Card } from '@/components/ui/card';
import { EditorBlock, EditableContent } from '@/types/editor';
import { PropertiesPanel } from '@/components/editor/properties/PropertiesPanel';

interface EditorWorkspaceProps {
  blocks: EditorBlock[];
  selectedBlockId: string | null;
  onBlockSelect: (blockId: string | null) => void;
  onBlockUpdate: (blockId: string, content: EditableContent) => void;
  onBlockDelete: (blockId: string) => void;
}

export const EditorWorkspace: React.FC<EditorWorkspaceProps> = ({
  blocks,
  selectedBlockId,
  onBlockSelect,
  onBlockUpdate,
  onBlockDelete
}) => {
  const selectedBlock = blocks.find(b => b.id === selectedBlockId) || null;

  const handleContentUpdate = (content: EditableContent) => {
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
    <div className="flex h-full gap-4">
      <div className="flex-1">
        <Card className="h-full p-4">
          <h2 className="text-xl font-semibold mb-4">Canvas</h2>
          <div className="space-y-2">
            {blocks.map((block) => (
              <div
                key={block.id}
                className={`p-3 border rounded cursor-pointer transition-colors ${
                  selectedBlockId === block.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => onBlockSelect(block.id)}
              >
                <div className="font-medium capitalize">{block.type}</div>
                <div className="text-sm text-muted-foreground">
                  {block.content.text || 'Click to edit'}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      <div className="w-80">
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

export default EditorWorkspace;
