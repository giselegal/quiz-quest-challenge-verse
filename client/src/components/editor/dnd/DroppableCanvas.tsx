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
        /* Blocks List - LAYOUT HORIZONTAL FLEXBOX para componentes inline */
        <div className="w-full mx-auto">
          {blocks.map((block, index) => {
            // Verificar se é um componente inline para agrupar horizontalmente
            const isInlineComponent = block.type?.includes('-inline') || 
              ['header', 'text', 'image', 'button', 'style-card', 'before-after', 
               'bonus-section', 'testimonials-real', 'guarantee-section', 'mentor-section'].includes(block.type);
            
            // Verificar se o próximo bloco também é inline para agrupar
            const nextBlock = blocks[index + 1];
            const nextIsInline = nextBlock && (nextBlock.type?.includes('-inline') || 
              ['header', 'text', 'image', 'button', 'style-card', 'before-after', 
               'bonus-section', 'testimonials-real', 'guarantee-section', 'mentor-section'].includes(nextBlock.type));
            
            // Verificar se o bloco anterior também é inline para continuar agrupamento
            const prevBlock = blocks[index - 1];
            const prevIsInline = prevBlock && (prevBlock.type?.includes('-inline') || 
              ['header', 'text', 'image', 'button', 'style-card', 'before-after', 
               'bonus-section', 'testimonials-real', 'guarantee-section', 'mentor-section'].includes(prevBlock.type));
            
            const shouldStartGroup = isInlineComponent && !prevIsInline;
            const shouldEndGroup = isInlineComponent && !nextIsInline;
            const isInGroup = isInlineComponent && (prevIsInline || nextIsInline);
            
            return (
              <React.Fragment key={block.id}>
                {/* Drop Zone Between Blocks */}
                <DropZoneBetween
                  position={index}
                  isVisible={isDraggingFromSidebar}
                />
                
                {/* Início do grupo horizontal */}
                {shouldStartGroup && (
                  <div className="flex flex-wrap gap-4 w-full mb-4 p-2 border border-dashed border-blue-200 rounded-lg bg-blue-50/30">
                )}
                
                {/* Block Item - Layout flexível */}
                <div className={cn(
                  isInlineComponent ? "flex-1 min-w-0 max-w-none" : "w-full mb-4",
                  isInGroup && "flex-1 min-w-[200px] max-w-[400px]" // Limitar largura em grupos
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
                      "w-full transition-all duration-200",
                      isInlineComponent && "h-auto min-h-[120px]",
                      isInGroup && "border border-gray-200 rounded-md shadow-sm bg-white"
                    )}
                  />
                </div>
                
                {/* Fim do grupo horizontal */}
                {shouldEndGroup && (
                  </div>
                )}
                
                {/* Componentes não-inline mantêm layout vertical */}
                {!isInlineComponent && !isInGroup && (
                  <div className="mb-4" />
                )}
              </React.Fragment>
            );
          })}
          
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