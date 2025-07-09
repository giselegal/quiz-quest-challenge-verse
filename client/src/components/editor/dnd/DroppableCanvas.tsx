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
        /* Canvas com Layout Flexbox Inline - Todos os componentes em linha */
        <div className="w-full mx-auto max-w-7xl">
          {/* Container Flexbox - TODOS OS COMPONENTES INLINE HORIZONTALMENTE */}
          <div className="flex flex-wrap gap-3 md:gap-4 w-full justify-start items-stretch">
            {blocks.map((block, index) => {
              // TODOS os componentes são tratados como inline agora
              const isInlineComponent = true;
              
              // Larguras padrão responsivas - mobile-first, máximo 2 colunas
              const getResponsiveWidth = () => {
                // Componentes grandes que precisam de mais espaço
                if (['faq-section', 'video-player', 'quiz-question', 'quiz-start-page', 
                     'result-page', 'quiz-offer-page', 'testimonials-grid', 'value-stack'].includes(block.type)) {
                  return "w-full min-w-0 flex-[1_1_100%]"; // Largura total
                }
                
                // Componentes pequenos (botões, badges, stats)
                if (['button', 'badge', 'stat', 'loader', 'notification'].includes(block.type) || 
                    block.type?.includes('button') || block.type?.includes('badge')) {
                  return "w-full sm:w-auto md:w-auto lg:w-auto flex-[0_1_auto] min-w-[200px]";
                }
                
                // Componentes padrão - 50% em desktop, 100% em mobile
                return "w-full sm:w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.5rem)] flex-[1_1_calc(50%-0.5rem)] min-w-[300px]";
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
                        isSelected && "ring-2 ring-blue-500 border-blue-400 bg-blue-50"
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