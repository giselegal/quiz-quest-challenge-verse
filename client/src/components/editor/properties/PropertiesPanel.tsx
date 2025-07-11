
import React from 'react';
import { EditorBlock } from '@/types/editor';
import { Card } from '@/components/ui/card';

export interface PropertiesPanelProps {
  selectedBlock: EditorBlock | null;
  onClose: () => void;
  onUpdate: (content: any) => void;
  onDelete: () => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedBlock,
  onClose,
  onUpdate,
  onDelete
}) => {
  if (!selectedBlock) {
    return (
      <Card className="p-4">
        <p className="text-muted-foreground">Select a block to edit its properties</p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Block Properties</h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          ×
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Block Type</label>
          <p className="text-sm text-muted-foreground">{selectedBlock.type}</p>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={onDelete}
            className="px-3 py-1 text-sm bg-destructive text-destructive-foreground rounded"
          >
            Delete Block
          </button>
        </div>
      </div>
    </Card>
  );
};

export default PropertiesPanel;
