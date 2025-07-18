import React, { useCallback } from 'react';
import { Block } from '@/types/editor';
import { SortableBlock } from './SortableBlock';
import { DragEndEvent } from '@dnd-kit/core';
import { StandardDndContext } from '../drag-drop/StandardDndKit';

interface DraggableBlockListProps {
  blocks: Block[];
  selectedBlockId: string | null;
  isPreviewing: boolean;
  onSelectBlock: (id: string) => void;
  onReorderBlocks: (sourceIndex: number, destinationIndex: number) => void;
  onDuplicateBlock?: (id: string) => void;
  onDeleteBlock?: (id: string) => void;
}

export const DraggableBlockList: React.FC<DraggableBlockListProps> = ({
  blocks,
  selectedBlockId,
  isPreviewing,
  onSelectBlock,
  onReorderBlocks,
  onDuplicateBlock,
  onDeleteBlock
}) => {
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((block) => block.id === active.id);
      const newIndex = blocks.findIndex((block) => block.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        onReorderBlocks(oldIndex, newIndex);
      }
    }
  }, [blocks, onReorderBlocks]);

  const renderOverlay = useCallback((activeId: string | null, activeItem: Block | null) => {
    if (!activeItem) return null;

    return (
      <div className="bg-white shadow-2xl border-2 border-primary/50 rounded-lg p-3 transform rotate-2 scale-105 max-w-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0" />
          <span className="font-medium text-sm truncate">
            {activeItem.type} - {activeItem.content?.text || activeItem.id}
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-1">Movendo bloco...</div>
      </div>
    );
  }, []);

  return (
    <StandardDndContext
      items={blocks}
      onDragEnd={handleDragEnd}
      config={{
        sortingStrategy: 'vertical',
        direction: 'vertical',
        activationDistance: 8,
        restrictToParent: true
      }}
      disabled={isPreviewing}
      renderOverlay={renderOverlay}
    >
      <div className="space-y-4 p-4">
        {blocks.map((block) => (
          <SortableBlock
            key={block.id}
            block={block}
            isSelected={selectedBlockId === block.id}
            isPreviewing={isPreviewing}
            onSelect={() => onSelectBlock(block.id)}
            onDuplicate={onDuplicateBlock ? () => onDuplicateBlock(block.id) : undefined}
            onDelete={onDeleteBlock ? () => onDeleteBlock(block.id) : undefined}
          />
        ))}
      </div>
    </StandardDndContext>
  );
};