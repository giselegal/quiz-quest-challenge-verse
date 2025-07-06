import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import { UniversalBlockRenderer } from '../blocks/UniversalBlockRenderer';
import { GripVertical, Trash2, Copy, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { BlockData } from '@/types/blocks';

interface SortableBlockItemProps {
  block: BlockData;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onToggleVisibility: () => void;
  onSaveInline: (blockId: string, updates: Partial<BlockData>) => void;
  disabled?: boolean;
}

export const SortableBlockItem: React.FC<SortableBlockItemProps> = ({
  block,
  isSelected,
  onSelect,
  onDelete,
  onDuplicate,
  onToggleVisibility,
  onSaveInline,
  disabled = false
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver
  } = useSortable({
    id: block.id,
    data: {
      type: 'canvas-block',
      block
    },
    disabled
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isHidden = block.properties?.hidden || false;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group relative rounded-lg transition-all duration-200',
        isDragging && 'opacity-50 scale-105 z-50',
        isOver && 'ring-2 ring-blue-400',
        isSelected && 'ring-2 ring-blue-500',
        isHidden && 'opacity-60'
      )}
      onClick={onSelect}
    >
      {/* Drag Handle e Controls */}
      <div className={cn(
        'absolute -left-16 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10',
        isSelected && 'opacity-100'
      )}>
        {/* Drag Handle */}
        <Button
          variant="ghost"
          size="sm"
          className="w-8 h-8 p-0 cursor-grab active:cursor-grabbing hover:bg-gray-100"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
        </Button>

        {/* Toggle Visibility */}
        <Button
          variant="ghost"
          size="sm"
          className="w-8 h-8 p-0 hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility();
          }}
        >
          {isHidden ? (
            <EyeOff className="w-4 h-4 text-gray-400" />
          ) : (
            <Eye className="w-4 h-4 text-gray-400" />
          )}
        </Button>

        {/* Duplicate */}
        <Button
          variant="ghost"
          size="sm"
          className="w-8 h-8 p-0 hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate();
          }}
        >
          <Copy className="w-4 h-4 text-gray-400" />
        </Button>

        {/* Delete */}
        <Button
          variant="ghost"
          size="sm"
          className="w-8 h-8 p-0 hover:bg-red-100 hover:text-red-600"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="w-4 h-4 text-gray-400" />
        </Button>
      </div>

      {/* Block Content */}
      <div className={cn(
        'relative',
        isHidden && 'pointer-events-none'
      )}>
        <UniversalBlockRenderer
          block={block}
          isSelected={isSelected}
          onClick={onSelect}
          onSaveInline={onSaveInline}
          disabled={disabled}
          className={cn(
            'transition-all duration-200',
            isDragging && 'pointer-events-none'
          )}
        />

        {/* Block Type Label */}
        {isSelected && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded shadow-lg">
            {block.type}
          </div>
        )}

        {/* Hidden Overlay */}
        {isHidden && (
          <div className="absolute inset-0 bg-gray-500 bg-opacity-20 rounded-lg flex items-center justify-center">
            <div className="bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
              <EyeOff className="w-4 h-4" />
              Oculto
            </div>
          </div>
        )}
      </div>

      {/* Drop Zone Indicators */}
      <div
        className="absolute -top-2 left-0 right-0 h-1 bg-blue-500 opacity-0 transition-opacity"
        data-drop-zone="before"
      />
      <div
        className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-500 opacity-0 transition-opacity"
        data-drop-zone="after"
      />
    </div>
  );
};