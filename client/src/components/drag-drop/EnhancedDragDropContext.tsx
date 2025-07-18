import React, { useState, useCallback, useMemo } from 'react';
import { 
  DndContext, 
  DragEndEvent, 
  DragStartEvent,
  DragOverEvent,
  DragCancelEvent,
  closestCenter,
  closestCorners,
  rectIntersection,
  CollisionDetection
} from '@dnd-kit/core';
import { 
  SortableContext, 
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSortingStrategy
} from '@dnd-kit/sortable';
import { 
  restrictToVerticalAxis, 
  restrictToHorizontalAxis,
  restrictToParentElement,
  restrictToWindowEdges
} from '@dnd-kit/modifiers';
import { useOptimizedDragDropSensors, DragDropConfig } from './useDragDropSensors';
import { CustomDragOverlay } from './CustomDragOverlay';
import { Block } from '@/types/editor';

export type SortingStrategy = 'vertical' | 'horizontal' | 'grid';
export type CollisionStrategy = 'center' | 'corners' | 'intersection';
export type DragDirection = 'vertical' | 'horizontal' | 'both';

interface EnhancedDragDropContextProps {
  children: React.ReactNode;
  items: Block[];
  onDragStart?: (event: DragStartEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
  onDragOver?: (event: DragOverEvent) => void;
  onDragCancel?: (event: DragCancelEvent) => void;
  
  // Configurações
  strategy?: SortingStrategy;
  collision?: CollisionStrategy;
  direction?: DragDirection;
  config?: DragDropConfig;
  
  // Acessibilidade
  announcements?: {
    onDragStart?: (id: string) => string;
    onDragOver?: (id: string, overId: string) => string;
    onDragEnd?: (id: string, overId: string) => string;
    onDragCancel?: (id: string) => string;
  };
  
  // UI
  showCustomOverlay?: boolean;
  disabled?: boolean;
  className?: string;
}

export const EnhancedDragDropContext: React.FC<EnhancedDragDropContextProps> = ({
  children,
  items,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragCancel,
  strategy = 'vertical',
  collision = 'center',
  direction = 'vertical',
  config,
  announcements,
  showCustomOverlay = true,
  disabled = false,
  className
}) => {
  const [activeItem, setActiveItem] = useState<Block | null>(null);
  
  // Configurar sensores otimizados
  const sensors = useOptimizedDragDropSensors(config);
  
  // Estratégia de sorting
  const sortingStrategy = useMemo(() => {
    switch (strategy) {
      case 'horizontal':
        return horizontalListSortingStrategy;
      case 'grid':
        return rectSortingStrategy;
      default:
        return verticalListSortingStrategy;
    }
  }, [strategy]);
  
  // Detecção de colisão
  const collisionDetection: CollisionDetection = useMemo(() => {
    switch (collision) {
      case 'corners':
        return closestCorners;
      case 'intersection':
        return rectIntersection;
      default:
        return closestCenter;
    }
  }, [collision]);
  
  // Modificadores baseados na direção
  const modifiers = useMemo(() => {
    const mods = [restrictToParentElement, restrictToWindowEdges];
    
    switch (direction) {
      case 'vertical':
        mods.unshift(restrictToVerticalAxis);
        break;
      case 'horizontal':
        mods.unshift(restrictToHorizontalAxis);
        break;
      default:
        // 'both' - sem restrições de eixo
        break;
    }
    
    return mods;
  }, [direction]);
  
  // Handlers com otimizações
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const activeItem = items.find(item => item.id === event.active.id);
    setActiveItem(activeItem || null);
    
    if (announcements?.onDragStart && activeItem) {
      const message = announcements.onDragStart(activeItem.id);
      // Announce para screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'assertive');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;
      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
    }
    
    onDragStart?.(event);
  }, [items, announcements, onDragStart]);
  
  const handleDragOver = useCallback((event: DragOverEvent) => {
    if (announcements?.onDragOver && event.over) {
      const message = announcements.onDragOver(
        event.active.id.toString(), 
        event.over.id.toString()
      );
      console.log(message); // Para debug, pode ser removido
    }
    
    onDragOver?.(event);
  }, [announcements, onDragOver]);
  
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActiveItem(null);
    
    if (announcements?.onDragEnd && event.over) {
      const message = announcements.onDragEnd(
        event.active.id.toString(), 
        event.over.id.toString()
      );
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'assertive');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;
      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
    }
    
    onDragEnd(event);
  }, [announcements, onDragEnd]);
  
  const handleDragCancel = useCallback((event: DragCancelEvent) => {
    setActiveItem(null);
    
    if (announcements?.onDragCancel) {
      const message = announcements.onDragCancel(event.active.id.toString());
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'assertive');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;
      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
    }
    
    onDragCancel?.(event);
  }, [announcements, onDragCancel]);
  
  if (disabled) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      modifiers={modifiers}
    >
      <SortableContext
        items={items.map(item => item.id)}
        strategy={sortingStrategy}
      >
        <div className={className}>
          {children}
        </div>
      </SortableContext>
      
      {showCustomOverlay && (
        <CustomDragOverlay activeBlock={activeItem} />
      )}
    </DndContext>
  );
};
