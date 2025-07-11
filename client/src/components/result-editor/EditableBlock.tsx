
import React from 'react';
import { Block } from '@/types/editor';

interface EditableBlockProps {
  block: Block;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
}

export const EditableBlock: React.FC<EditableBlockProps> = ({
  block,
  isSelected,
  onSelect,
  onEdit
}) => {
  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
      onClick={onSelect}
      onDoubleClick={onEdit}
    >
      <div className="text-sm text-gray-500 mb-2">{block.type}</div>
      <div className="text-base">
        {block.content.title || block.content.text || 'Empty block'}
      </div>
    </div>
  );
};

export default EditableBlock;
