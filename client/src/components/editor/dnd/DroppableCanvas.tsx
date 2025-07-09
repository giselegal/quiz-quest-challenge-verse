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
        /* Canvas com Layout Flexbox Responsivo - Mobile-First, máximo 2 colunas */
        <div className="w-full mx-auto">
          {/* Container Flexbox Responsivo para todos os blocos */}
          <div className="flex flex-wrap gap-3 md:gap-4 w-full">
            {blocks.map((block, index) => {
              // Definir se é um componente inline baseado no tipo
              const isInlineComponent = block.type?.includes('-inline') || 
                ['header', 'text', 'image', 'button', 'style-card', 'before-after', 
                 'bonus-section', 'testimonials-real', 'guarantee-section', 'mentor-section'].includes(block.type);
              
              // Definir larguras responsivas baseadas no tipo de componente
              const getResponsiveWidth = () => {
                if (!isInlineComponent) {
                  // Componentes não-inline ocupam largura total
                  return "w-full";
                }
                
                // Componentes inline: mobile 100%, tablet+ até 2 colunas
                switch (block.type) {
                  case 'style-card':
                  case 'before-after':
                  case 'bonus-section':
                    return "w-full sm:w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.5rem)]";
                  case 'testimonials-real':
                  case 'guarantee-section':
                  case 'mentor-section':
                    return "w-full sm:w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.5rem)]";
                  case 'header':
                  case 'text':
                    return "w-full sm:w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.5rem)]";
                  case 'image':
                  case 'button':
                    return "w-full sm:w-[calc(50%-0.375rem)] md:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.5rem)]";
                  default:
                    return "w-full sm:w-[calc(50%-0.375rem)] md:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.5rem)]";
                }
              };

              return (
                <React.Fragment key={block.id}>
                  {/* Drop Zone Between Blocks */}
                  <DropZoneBetween
                    position={index}
                    isVisible={isDraggingFromSidebar}
                  />
                  
                  {/* Block Item Container Responsivo */}
                  <div className={cn(
                    getResponsiveWidth(),
                    "min-h-[120px] transition-all duration-200",
                    // Para componentes não-inline, quebra a linha
                    !isInlineComponent && "basis-full"
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
                        isInlineComponent && "border border-gray-200 rounded-md shadow-sm bg-white min-h-[120px]",
                        !isInlineComponent && "border border-gray-300 rounded-lg shadow-md bg-white min-h-[200px]"
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