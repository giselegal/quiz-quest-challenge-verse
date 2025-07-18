import { useCallback, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDndKitConfig } from './StandardDndKit';

// Hook padronizado para componentes sortable
export const useStandardSortable = (id: string, disabled = false) => {
  const { config } = useDndKitConfig();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isSorting,
    over,
    active
  } = useSortable({
    id,
    disabled
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Estado derivado útil
  const isOver = over?.id === id;
  const isActive = active?.id === id;
  const canDrop = over && active && over.id !== active.id;

  return {
    // Props básicas do dnd-kit
    attributes,
    listeners,
    setNodeRef,
    style,
    
    // Estados úteis
    isDragging,
    isSorting,
    isOver,
    isActive,
    canDrop,
    
    // Dados adicionais
    over,
    active,
    
    // Configuração
    config
  };
};

// Hook para gerenciar arrays de items com drag & drop
export const useSortableArray = <T extends { id: string }>(
  initialItems: T[]
) => {
  const [items, setItems] = useState<T[]>(initialItems);

  const moveItem = useCallback((activeId: string, overId: string) => {
    setItems(items => {
      const oldIndex = items.findIndex(item => item.id === activeId);
      const newIndex = items.findIndex(item => item.id === overId);
      
      if (oldIndex === -1 || newIndex === -1) return items;
      
      const newItems = [...items];
      const [movedItem] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, movedItem);
      
      return newItems;
    });
  }, []);

  const addItem = useCallback((item: T, index?: number) => {
    setItems(items => {
      if (index !== undefined) {
        const newItems = [...items];
        newItems.splice(index, 0, item);
        return newItems;
      }
      return [...items, item];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(items => items.filter(item => item.id !== id));
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<T>) => {
    setItems(items => 
      items.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  }, []);

  const reorderItems = useCallback((newItems: T[]) => {
    setItems(newItems);
  }, []);

  return {
    items,
    moveItem,
    addItem,
    removeItem,
    updateItem,
    reorderItems,
    setItems
  };
};

// Hook para transformações de drag com animações suaves
export const useDragTransforms = () => {
  const getDragStyle = useCallback((transform: any, transition: string, isDragging: boolean) => {
    const baseStyle = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    if (isDragging) {
      return {
        ...baseStyle,
        zIndex: 50,
        opacity: 0.8,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        transform: `${CSS.Transform.toString(transform)} rotate(3deg) scale(1.02)`,
      };
    }

    return baseStyle;
  }, []);

  const getDropIndicatorStyle = useCallback((isOver: boolean, canDrop: boolean) => {
    if (!isOver && !canDrop) return {};

    return {
      border: '2px dashed',
      borderColor: isOver && canDrop ? '#3b82f6' : '#6b7280',
      backgroundColor: isOver && canDrop ? '#eff6ff' : '#f9fafb',
      borderRadius: '8px',
      transition: 'all 0.2s ease-in-out',
    };
  }, []);

  return {
    getDragStyle,
    getDropIndicatorStyle
  };
};

// Hook para acessibilidade em drag & drop
export const useDragAccessibility = () => {
  const announceToScreenReader = useCallback((message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }, []);

  const getDragAttributes = useCallback((isDragging: boolean, itemType: string) => {
    return {
      role: 'button',
      tabIndex: 0,
      'aria-pressed': isDragging,
      'aria-label': `${itemType}${isDragging ? ' (sendo movido)' : ''}`,
      'aria-describedby': 'drag-instructions',
    };
  }, []);

  const getKeyboardInstructions = useCallback(() => {
    return 'Use as setas para navegar, Enter para selecionar e mover, Escape para cancelar.';
  }, []);

  return {
    announceToScreenReader,
    getDragAttributes,
    getKeyboardInstructions
  };
};
