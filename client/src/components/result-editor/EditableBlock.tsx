
import React from 'react';
import { EditorBlock } from '@/types/editor';

export interface EditableBlockProps {
  block: EditorBlock;
  isSelected: boolean;
  onClick: () => void;
  isPreviewMode: boolean;
  onReorderBlocks: (sourceIndex: number, destinationIndex: number) => void;
  primaryStyle: any;
}

export const EditableBlock: React.FC<EditableBlockProps> = ({
  block,
  isSelected,
  onClick,
  isPreviewMode,
  primaryStyle
}) => {
  return (
    <div
      className={`p-4 border rounded cursor-pointer transition-colors ${
        isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
      }`}
      onClick={onClick}
    >
      <div className="font-medium capitalize">{block.type}</div>
      <div className="text-sm text-muted-foreground">
        {block.content.text || 'Empty block'}
      </div>
    </div>
  );
};

export default EditableBlock;
