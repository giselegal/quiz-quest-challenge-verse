import React, { createContext, useContext, useMemo } from 'react';
import { 
  DndContext as DndKitContext,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragCancelEvent,
  closestCenter,
  closestCorners,
  rectIntersection,
  CollisionDetection,
  PointerSensor,
  KeyboardSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  Announcements
} from '@dnd-kit/core';
import { 
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSortingStrategy,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable';
import { 
  restrictToVerticalAxis,
  restrictToHorizontalAxis,
  restrictToParentElement,
  restrictToWindowEdges
} from '@dnd-kit/modifiers';

// Configurações padronizadas do DND-Kit
export interface DndKitConfig {
  // Sensores
  activationDistance?: number;
  activationDelay?: number;
  activationTolerance?: number;
  
  // Estratégias
  sortingStrategy?: 'vertical' | 'horizontal' | 'grid';
  collisionDetection?: 'center' | 'corners' | 'intersection';
  
  // Direções
  direction?: 'vertical' | 'horizontal' | 'both';
  
  // Modifiers
  restrictToParent?: boolean;
  restrictToWindow?: boolean;
  
  // Acessibilidade
  announcements?: Partial<Announcements>;
}

// Configurações padrão otimizadas para o projeto
const DEFAULT_CONFIG: Required<Omit<DndKitConfig, 'announcements'>> & { announcements?: Partial<Announcements> } = {
  activationDistance: 8,
  activationDelay: 150,
  activationTolerance: 5,
  sortingStrategy: 'vertical',
  collisionDetection: 'center',
  direction: 'vertical',
  restrictToParent: true,
  restrictToWindow: true,
  announcements: {
    onDragStart({ active }) {
      return `Iniciando movimento do item ${active.id}`;
    },
    onDragOver({ active, over }) {
      return over ? `Item ${active.id} está sobre ${over.id}` : `Item ${active.id} sendo movido`;
    },
    onDragEnd({ active, over }) {
      return over ? `Item ${active.id} foi movido para ${over.id}` : `Item ${active.id} foi solto`;
    },
    onDragCancel({ active }) {
      return `Movimento do item ${active.id} foi cancelado`;
    }
  }
};

// Context para configurações globais
interface DndKitContextValue {
  config: DndKitConfig;
  updateConfig: (newConfig: Partial<DndKitConfig>) => void;
}

const DndKitConfigContext = createContext<DndKitContextValue | null>(null);

// Provider para configurações globais
export const DndKitProvider: React.FC<{
  children: React.ReactNode;
  config?: Partial<DndKitConfig>;
}> = ({ children, config: initialConfig = {} }) => {
  const [config, setConfig] = React.useState<DndKitConfig>({
    ...DEFAULT_CONFIG,
    ...initialConfig
  });

  const updateConfig = React.useCallback((newConfig: Partial<DndKitConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  const value = useMemo(() => ({ config, updateConfig }), [config, updateConfig]);

  return (
    <DndKitConfigContext.Provider value={value}>
      {children}
    </DndKitConfigContext.Provider>
  );
};

// Hook para usar configurações globais
export const useDndKitConfig = () => {
  const context = useContext(DndKitConfigContext);
  if (!context) {
    return { config: DEFAULT_CONFIG, updateConfig: () => {} };
  }
  return context;
};

// Hook para sensores padronizados
export const useStandardSensors = (config?: Partial<DndKitConfig>) => {
  const { config: globalConfig } = useDndKitConfig();
  const mergedConfig = { ...globalConfig, ...config };

  return useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: mergedConfig.activationDistance || 8,
        delay: mergedConfig.activationDelay || 150,
        tolerance: mergedConfig.activationTolerance || 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: (mergedConfig.activationDelay || 150) + 100, // Mais delay para touch
        tolerance: mergedConfig.activationTolerance || 5,
      },
    })
  );
};

// Hook para estratégia de sorting
export const useSortingStrategy = (strategy?: DndKitConfig['sortingStrategy']) => {
  const { config } = useDndKitConfig();
  const activeStrategy = strategy || config.sortingStrategy;

  return useMemo(() => {
    switch (activeStrategy) {
      case 'horizontal':
        return horizontalListSortingStrategy;
      case 'grid':
        return rectSortingStrategy;
      default:
        return verticalListSortingStrategy;
    }
  }, [activeStrategy]);
};

// Hook para collision detection
export const useCollisionDetection = (collision?: DndKitConfig['collisionDetection']) => {
  const { config } = useDndKitConfig();
  const activeCollision = collision || config.collisionDetection;

  return useMemo((): CollisionDetection => {
    switch (activeCollision) {
      case 'corners':
        return closestCorners;
      case 'intersection':
        return rectIntersection;
      default:
        return closestCenter;
    }
  }, [activeCollision]);
};

// Hook para modifiers
export const useModifiers = (
  direction?: DndKitConfig['direction'],
  restrictToParent?: boolean,
  restrictToWindow?: boolean
) => {
  const { config } = useDndKitConfig();
  
  return useMemo(() => {
    const modifiers = [];
    
    // Restrições de janela e pai
    if (restrictToWindow ?? config.restrictToWindow) {
      modifiers.push(restrictToWindowEdges);
    }
    if (restrictToParent ?? config.restrictToParent) {
      modifiers.push(restrictToParentElement);
    }
    
    // Restrições de direção
    const activeDirection = direction || config.direction;
    if (activeDirection === 'vertical') {
      modifiers.unshift(restrictToVerticalAxis);
    } else if (activeDirection === 'horizontal') {
      modifiers.unshift(restrictToHorizontalAxis);
    }
    
    return modifiers;
  }, [direction, restrictToParent, restrictToWindow, config]);
};

// Componente padronizado do DndContext
export interface StandardDndContextProps {
  children: React.ReactNode;
  items: Array<{ id: string; [key: string]: any }>;
  onDragStart?: (event: DragStartEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
  onDragOver?: (event: DragOverEvent) => void;
  onDragCancel?: (event: DragCancelEvent) => void;
  config?: Partial<DndKitConfig>;
  disabled?: boolean;
  renderOverlay?: (activeId: string | null, activeItem: any) => React.ReactNode;
}

export const StandardDndContext: React.FC<StandardDndContextProps> = ({
  children,
  items,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragCancel,
  config: localConfig,
  disabled,
  renderOverlay
}) => {
  const { config: globalConfig } = useDndKitConfig();
  const config = { ...globalConfig, ...localConfig };
  
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const activeItem = items.find(item => item.id === activeId);

  const sensors = useStandardSensors(config);
  const sortingStrategy = useSortingStrategy(config.sortingStrategy);
  const collisionDetection = useCollisionDetection(config.collisionDetection);
  const modifiers = useModifiers(config.direction, config.restrictToParent, config.restrictToWindow);

  const handleDragStart = React.useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    onDragStart?.(event);
  }, [onDragStart]);

  const handleDragEnd = React.useCallback((event: DragEndEvent) => {
    setActiveId(null);
    onDragEnd(event);
  }, [onDragEnd]);

  const handleDragCancel = React.useCallback((event: DragCancelEvent) => {
    setActiveId(null);
    onDragCancel?.(event);
  }, [onDragCancel]);

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <DndKitContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragOver={onDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      modifiers={modifiers}
    >
      <SortableContext
        items={items.map(item => item.id)}
        strategy={sortingStrategy}
      >
        {children}
      </SortableContext>
      
      <DragOverlay adjustScale={false}>
        {renderOverlay ? (
          renderOverlay(activeId, activeItem)
        ) : (
          activeItem && (
            <div className="bg-white shadow-2xl border-2 border-primary/50 rounded-lg p-3 transform rotate-2 scale-105">
              <div className="font-medium text-sm">
                Movendo: {activeItem.type || activeItem.name || activeId}
              </div>
            </div>
          )
        )}
      </DragOverlay>
    </DndKitContext>
  );
};
