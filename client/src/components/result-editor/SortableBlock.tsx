
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Block, BlockType } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { GripVertical, Edit, Copy, Trash2 } from 'lucide-react';

interface SortableBlockProps {
  block: Block;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  isSelected: boolean;
}

export const SortableBlock: React.FC<SortableBlockProps> = ({
  block,
  onEdit,
  onDuplicate,
  onDelete,
  isSelected
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderBlockContent = () => {
    const blockType = block.type as BlockType; // Fix: Cast to BlockType
    
    switch (blockType) {
      case 'headline':
        return <h2 className="text-xl font-bold">{block.content.title || 'Título'}</h2>;
      case 'text':
        return <p>{block.content.text || 'Texto'}</p>;
      case 'image':
        return <div className="bg-gray-200 h-32 flex items-center justify-center">Imagem</div>;
      case 'button':
        return <Button>{block.content.text || 'Botão'}</Button>;
      default:
        return <div>Bloco {blockType}</div>;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        border rounded-lg p-4 mb-4 bg-white
        ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <div {...attributes} {...listeners} className="cursor-grab">
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={onEdit}>
            <Edit className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="outline" onClick={onDuplicate}>
            <Copy className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="outline" onClick={onDelete}>
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
      
      {renderBlockContent()}
    </div>
  );
};
