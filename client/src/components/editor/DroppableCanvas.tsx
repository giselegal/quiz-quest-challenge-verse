
import React from 'react';
import { Block } from '@/types/editor';

interface DroppableCanvasProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onBlockSelect: (blockId: string | null) => void;
  onBlockDelete: (blockId: string) => void;
  onBlockDuplicate: (blockId: string) => void;
  onBlockToggleVisibility: (blockId: string) => void;
  onSaveInline: () => void;
  onAddBlock: (type: Block['type']) => void;
  renderBlock: (block: Block) => React.ReactNode;
}

export const DroppableCanvas: React.FC<DroppableCanvasProps> = ({
  blocks,
  selectedBlockId,
  onBlockSelect,
  renderBlock
}) => {
  if (blocks.length === 0) {
    return (
      <div className="min-h-[600px] flex items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-lg m-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Canvas Vazio
          </h3>
          <p className="text-gray-500">
            Adicione blocos para começar a construir sua página
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {blocks
        .filter(block => block.visible !== false)
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map((block) => (
          <div
            key={block.id}
            className={`
              relative group cursor-pointer transition-all
              ${selectedBlockId === block.id 
                ? 'ring-2 ring-blue-500 ring-offset-2' 
                : 'hover:ring-1 hover:ring-gray-300'
              }
            `}
            onClick={() => onBlockSelect(block.id)}
          >
            {renderBlock(block)}
          </div>
        ))}
    </div>
  );
};
