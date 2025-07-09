import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { SortableBlockItem } from './SortableBlockItem';
import { Plus } from 'lucide-react';
import type { BlockData } from '@/types/blocks';

interface DroppableCanvasProps {
  blocks: BlockData[];
  selectedBlockId?: string;
  onBlockSelect: (blockId: string) => void;
  onBlockDelete: (blockId: string) => void;
  onBlockDuplicate: (blockId: string) => void;
  onBlockToggleVisibility: (blockId: string) => void;
  onSaveInline: (blockId: string, updates: Partial<BlockData>) => void;
  onAddBlock: (blockType: string) => void;
  className?: string;
  disabled?: boolean;
}

export const DroppableCanvas: React.FC<DroppableCanvasProps> = ({
  blocks,
  selectedBlockId,
  onBlockSelect,
  onBlockDelete,
  onBlockDuplicate,
  onBlockToggleVisibility,
  onSaveInline,
  onAddBlock,
  className,
  disabled = false
}) => {
  const {
    setNodeRef,
    isOver,
    active
  } = useDroppable({
    id: 'canvas-drop-zone',
    data: {
      type: 'canvas-drop-zone',
      position: blocks.length
    }
  });

  const isDraggingFromSidebar = active?.data.current?.type === 'sidebar-component';

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'relative min-h-[800px] w-full p-4 transition-all duration-200',
        isOver && isDraggingFromSidebar && 'bg-blue-50 ring-2 ring-blue-300 ring-dashed',
        className
      )}
    >
      {/* Empty State */}
      {blocks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
          <Plus className="w-12 h-12 mb-4" />
          <h3 className="text-lg font-medium mb-2">Canvas Vazio</h3>
          <p className="text-sm text-center max-w-md">
            Arraste componentes da barra lateral para começar a construir sua página.
          </p>
        </div>
      ) : (
        /* LAYOUT HORIZONTAL PURO - 100% LARGURA - SEM AGRUPAMENTO VERTICAL */
        <div className="w-full overflow-x-auto">
          {/* Container Flexbox HORIZONTAL - LARGURA 100% - RESPONSIVO */}
          <div className="flex gap-6 w-full min-w-max items-start h-auto">
            {blocks.map((block, index) => {
              // LARGURA 100% RESPONSIVA - MÁXIMO 2 COLUNAS INTERNAS POR COMPONENTE
              const getResponsiveWidth = () => {
                // Todos os componentes ocupam largura fixa mas responsiva
                // LARGURA UNIFICADA para layout horizontal consistente
                return "w-[350px] min-w-[300px] max-w-[450px] flex-shrink-0";
              };

              return (
                <React.Fragment key={block.id}>
                  {/* Drop Zone Between Blocks */}
                  <DropZoneBetween
                    position={index}
                    isVisible={isDraggingFromSidebar}
                  />
                  
                  {/* Block Item Container - TODOS INLINE AGORA */}
                  <div className={cn(
                    getResponsiveWidth(),
                    "min-h-[120px] transition-all duration-200",
                    "flex-shrink-0" // Evita encolhimento excessivo
                  )}>
                    <SortableBlockItem
                      block={block}
                      isSelected={block.id === selectedBlockId}
                      onSelect={() => onBlockSelect(block.id)}
                      onDelete={() => onBlockDelete(block.id)}
                      onDuplicate={() => onBlockDuplicate(block.id)}
                      onToggleVisibility={() => onBlockToggleVisibility(block.id)}
                      onSaveInline={onSaveInline}
                      disabled={disabled}
                      className={cn(
                        "w-full h-full transition-all duration-200",
                        // Todos os componentes têm identidade visual consistente
                        "border border-gray-200 rounded-lg shadow-sm bg-white",
                        "hover:shadow-md hover:border-blue-300",
                        "min-h-[120px] flex flex-col",
                        // Cores da marca para identidade visual
                        (block.id === selectedBlockId) && "ring-2 ring-blue-500 border-blue-400 bg-blue-50"
                      )}
                    />
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          
          {/* Final Drop Zone */}
          <DropZoneBetween
            position={blocks.length}
            isVisible={isDraggingFromSidebar}
            isLast={true}
          />
        </div>
      )}

      {/* Global Drop Overlay */}
      {isOver && isDraggingFromSidebar && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-5 rounded-lg pointer-events-none">
          <div className="absolute inset-4 border-2 border-blue-400 border-dashed rounded-lg flex items-center justify-center">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium">
              Solte aqui para adicionar {active?.data.current?.title}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface DropZoneBetweenProps {
  position: number;
  isVisible: boolean;
  isLast?: boolean;
}

const DropZoneBetween: React.FC<DropZoneBetweenProps> = ({
  position,
  isVisible,
  isLast = false
}) => {
  const {
    setNodeRef,
    isOver
  } = useDroppable({
    id: `drop-zone-${position}`,
    data: {
      type: 'canvas-drop-zone',
      position
    }
  });

  if (!isVisible) return null;

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'h-2 transition-all duration-200 rounded',
        isOver ? 'bg-blue-500 h-4' : 'bg-blue-200',
        isLast && 'mt-8'
      )}
    />
  );
};