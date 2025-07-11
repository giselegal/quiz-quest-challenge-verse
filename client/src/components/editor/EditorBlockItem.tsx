
import React from 'react';
import { EditorBlock } from '@/types/editor';

interface EditorBlockItemProps {
  block: EditorBlock;
  onUpdate: (content: any) => void;
  onDelete: () => void;
}

export const EditorBlockItem: React.FC<EditorBlockItemProps> = ({
  block,
  onUpdate,
  onDelete
}) => {
  return (
    <div className="p-4 border rounded">
      <p>Block: {block.type}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};
