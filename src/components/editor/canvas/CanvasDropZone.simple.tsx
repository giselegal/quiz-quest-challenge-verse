import { cn } from '@/lib/utils';
import { Block } from '@/types/editor';
<<<<<<< HEAD
import { useDraggable, useDroppable } from '@dnd-kit/core';
import React from 'react';
=======
import { useDroppable, useDndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import React from 'react';
import { SortableBlockWrapper } from './SortableBlockWrapper.simple';
>>>>>>> c8c6b53419af1a60212ddbd0423ea8dc9d53c662

// Componente para drop zone entre blocos
const InterBlockDropZone: React.FC<{
  position: number;
  isActive: boolean;
}> = ({ position, isActive }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `drop-zone-${position}`,
    data: {
      type: 'canvas-drop-zone',
      accepts: ['sidebar-component', 'canvas-block'], // Aceita tanto componentes da sidebar quanto blocos do canvas
      position: position,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'transition-all duration-200 relative pointer-events-auto flex items-center justify-center',
        'h-6 min-h-[24px]', // Altura mínima mais generosa para facilitar drop
        isOver && 'h-16 bg-brand/10 border-2 border-dashed border-brand/40 rounded-lg',
        isActive && !isOver && 'h-3 bg-brand/20 rounded-full opacity-50'
      )}
    >
      {isOver && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-brand font-medium text-sm bg-white/80 px-2 py-1 rounded">
            Inserir aqui (posição {position})
          </p>
        </div>
      )}
      {/* Área invisível para melhor hit detection */}
      <div className="absolute inset-x-0 -inset-y-2 pointer-events-none" />
    </div>
  );
};

interface CanvasDropZoneProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string) => void;
  onUpdateBlock: (id: string, updates: any) => void;
  onDeleteBlock: (id: string) => void;
  className?: string;
}

export const CanvasDropZone: React.FC<CanvasDropZoneProps> = ({
  blocks,
  selectedBlockId,
  onSelectBlock,
  onUpdateBlock,
  onDeleteBlock,
  className,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-drop-zone',
    data: {
      type: 'canvas-drop-zone',
      accepts: ['sidebar-component', 'canvas-block'],
      position: blocks.length, // Posição no final
    },
  });

  // Usa useDndContext para obter active do contexto DnD
  const { active } = useDndContext();

  // Verifica se qualquer item arrastável válido está ativo
  const isDraggingAnyValidComponent = React.useMemo(() => {
    if (!active) return false;
    const t = active?.data.current?.type;
    const overId = active?.id ? String(active?.id) : '';
    return t === 'sidebar-component' || t === 'canvas-block' || overId.startsWith('sidebar-item-');
  }, [active]);

<<<<<<< HEAD
    const style: React.CSSProperties = drag.transform
      ? {
          transform: `translate3d(${drag.transform.x}px, ${drag.transform.y}px, 0)`,
          zIndex: drag.isDragging ? 1000 : 'auto',
        }
      : {};
=======
  // Debug do drop zone
  React.useEffect(() => {
    const debug =
      ((import.meta as any)?.env?.DEV ?? false) ||
      (typeof process !== 'undefined' && (process as any)?.env?.NODE_ENV === 'development') ||
      (typeof window !== 'undefined' && (window as any).__DND_DEBUG === true);
    if (!debug) return;
    // eslint-disable-next-line no-console
    console.log('🎯 CanvasDropZone: isOver =', isOver, 'active =', active?.id);
    if (active?.data.current?.type === 'sidebar-component') {
      // eslint-disable-next-line no-console
      console.log('📦 Arrastando componente da sidebar:', active?.data.current?.blockType);
    } else if (active?.data.current?.type === 'canvas-block') {
      // eslint-disable-next-line no-console
      console.log('🔄 Reordenando bloco do canvas:', active?.id);
    }
  }, [isOver, active]);
>>>>>>> c8c6b53419af1a60212ddbd0423ea8dc9d53c662

  // Usando isPreviewing como false por padrão (modo de edição)
  const isPreviewing = false;

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'min-h-[240px] transition-all duration-200 pointer-events-auto',
        isOver && !isPreviewing && 'bg-brand/5 ring-2 ring-brand/20 ring-dashed',
        className
      )}
    >
      {blocks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-stone-500 text-lg mb-2">
            {isPreviewing
              ? 'Modo Preview - Nenhum componente nesta etapa'
              : 'Canvas vazio - Arraste componentes da sidebar para começar'}
          </p>
          {(isOver || isDraggingAnyValidComponent) && !isPreviewing && (
            <div className="mt-4 p-4 border-2 border-dashed border-brand/30 rounded-lg bg-brand/5">
              <p className="text-brand font-medium">Solte o componente aqui</p>
            </div>
          )}
        </div>
      ) : (
        <SortableContext
          items={blocks.map(block => String(block.id))}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-6">
            {/* Drop zone no início - agora aparece para QUALQUER item válido */}
            {isDraggingAnyValidComponent && <InterBlockDropZone position={0} isActive={true} />}

            {blocks.map((block, index) => (
              <React.Fragment key={String(block.id)}>
                <SortableBlockWrapper
                  block={block}
                  isSelected={!isPreviewing && selectedBlockId === block.id}
                  onSelect={() => !isPreviewing && onSelectBlock(block.id)}
                  onUpdate={updates => {
                    if (!isPreviewing) {
                      onUpdateBlock(block.id, updates);
                    }
                  }}
                  onDelete={() => {
                    if (!isPreviewing) {
                      onDeleteBlock(block.id);
                    }
                  }}
                />

                {/* Drop zone entre blocos - agora aparece para QUALQUER item válido */}
                {isDraggingAnyValidComponent && (
                  <InterBlockDropZone position={index + 1} isActive={true} />
                )}
              </React.Fragment>
            ))}
          </div>
        </SortableContext>
      )}
    </div>
  );
};

export default CanvasDropZone;
