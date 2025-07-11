import React from 'react';
import { EditorBlock } from '@/types/editor';

interface EditorContentProps {
  blocks: EditorBlock[];
  onDragEnd: (event: any) => void;
  onAddBlock: (type: string) => void;
  onUpdateBlock: (id: string, content: any) => void;
  onDeleteBlock: (id: string) => void;
  isPreviewing: boolean;
}

export const EditorContent: React.FC<EditorContentProps> = ({
  blocks,
  onDragEnd,
  onAddBlock,
  onUpdateBlock,
  onDeleteBlock,
  isPreviewing
}) => {
  return (
    <div className="editor-content">
      {blocks.map((item: EditorBlock, index: number) => (
        <div key={item.id} className="editor-block">
          {/* Block content */}
        </div>
      ))}
    </div>
  );
};
