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
        'relative min-h-[800px] w-full transition-all duration-200 editor-canvas',
        isOver && isDraggingFromSidebar && 'bg-blue-50 ring-2 ring-blue-300 ring-dashed',
        className
      )}
      style={{
        padding: 'var(--global-gap)',
        maxWidth: 'var(--global-width)',
        margin: '0 auto',
        borderRadius: 'var(--global-radius)'
      }}
    >
      {/* Empty State */}
      {blocks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg bg-white">
          {/* Logo placeholder */}
          <div className="canvas-logo bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          
          {/* Progress bar placeholder */}
          <div className="canvas-progress-bar bg-gray-200 rounded-full mb-6 max-w-md w-full">
            <div className="h-full bg-blue-300 rounded-full" style={{ width: '0%' }}></div>
          </div>
          
          {/* Main title */}
          <h3 className="canvas-main-title text-gray-700 mb-2 text-center">
            Teste de Estilo Pessoal
          </h3>
          
          {/* Main image placeholder */}
          <div className="canvas-main-image bg-gray-100 rounded-lg flex items-center justify-center mb-6" style={{ height: '200px' }}>
            <span className="text-gray-400 text-sm">Imagem Principal</span>
          </div>
          
          {/* Input field placeholder */}
          <div className="w-full max-w-md mb-4">
            <label className="canvas-input-label text-gray-600 block">NOME</label>
            <input 
              type="text" 
              className="canvas-input-field border border-gray-300 bg-gray-50" 
              placeholder="Digite seu nome aqui..."
              disabled
            />
          </div>
          
          {/* Continue button */}
          <button className="canvas-continue-button max-w-md opacity-75 cursor-not-allowed">
            Continuar
          </button>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-2">
              Arraste componentes da barra lateral para começar a construir sua página.
            </p>
          </div>
        </div>
      ) : (
        /* LAYOUT HORIZONTAL RESPONSIVO - CORRIGIDO PARA ETAPA 20/21 */
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Container Flexbox HORIZONTAL - WRAP RESPONSIVO */}
          <div className="flex flex-wrap items-start gap-4 w-full">
            {blocks.map((block, index) => {
              // LARGURAS RESPONSIVAS BASEADAS NO TIPO DE COMPONENTE
              const getResponsiveWidth = () => {
                // Componentes que devem ocupar largura total
                const fullWidthComponents = [
                  'quiz-intro-header', 'result-header-inline', 'sticky-header-inline',
                  'section-header-inline', 'divider-inline'
                ];
                
                // Componentes pequenos (badges, buttons)
                const smallComponents = [
                  'badge-inline', 'hero-badge-inline', 'button-inline', 'cta-button-inline'
                ];
                
                // Componentes médios (cards, imagens)
                const mediumComponents = [
                  'style-card-inline', 'product-card-inline', 'testimonial-card-inline',
                  'image-display-inline', 'pricing-card-inline'
                ];
                
                if (fullWidthComponents.includes(block.type)) {
                  return "w-full basis-full";
                } else if (smallComponents.includes(block.type)) {
                  return "w-full sm:w-auto sm:flex-1 sm:min-w-[200px] sm:max-w-sm";
                } else if (mediumComponents.includes(block.type)) {
                  return "w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)] min-w-[280px]";
                }
                
                // Padrão: componentes adaptativos
                return "w-full sm:w-[calc(50%-0.5rem)] min-w-[250px]";
              };

              return (
                <React.Fragment key={block.id}>
                  {/* Drop Zone Between Blocks */}
                  <DropZoneBetween
                    position={index}
                    isVisible={isDraggingFromSidebar}
                  />
                  
                  {/* Block Item Container - TODOS CENTRALIZADOS E FULL WIDTH */}
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