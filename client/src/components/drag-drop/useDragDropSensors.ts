import { 
  PointerSensor, 
  KeyboardSensor, 
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

export interface DragDropConfig {
  // Sensores
  enablePointer?: boolean;
  enableKeyboard?: boolean;
  enableTouch?: boolean;
  enableMouse?: boolean;
  
  // Configurações de ativação
  activationDistance?: number;
  activationDelay?: number;
  activationTolerance?: number;
  
  // Configurações de performance
  autoScrollEnabled?: boolean;
  autoScrollSpeed?: number;
  
  // Configurações de acessibilidade
  keyboardCoordinateGetter?: typeof sortableKeyboardCoordinates;
  announcements?: {
    onDragStart?: (id: string) => string;
    onDragOver?: (id: string, overId: string) => string;
    onDragEnd?: (id: string, overId: string) => string;
    onDragCancel?: (id: string) => string;
  };
}

const defaultConfig: Required<DragDropConfig> = {
  enablePointer: true,
  enableKeyboard: true,
  enableTouch: true,
  enableMouse: false,
  activationDistance: 8,
  activationDelay: 250,
  activationTolerance: 5,
  autoScrollEnabled: true,
  autoScrollSpeed: 25,
  keyboardCoordinateGetter: sortableKeyboardCoordinates,
  announcements: {
    onDragStart: (id) => `Iniciando arraste do item ${id}`,
    onDragOver: (id, overId) => `Item ${id} está sobre ${overId}`,
    onDragEnd: (id, overId) => `Item ${id} foi movido para ${overId}`,
    onDragCancel: (id) => `Arraste do item ${id} foi cancelado`
  }
};

export const useOptimizedDragDropSensors = (config: DragDropConfig = {}) => {
  const mergedConfig = { ...defaultConfig, ...config };
  
  const sensors = [];
  
  // Pointer Sensor para desktop
  if (mergedConfig.enablePointer) {
    sensors.push(
      useSensor(PointerSensor, {
        activationConstraint: {
          distance: mergedConfig.activationDistance,
          delay: mergedConfig.activationDelay,
          tolerance: mergedConfig.activationTolerance,
        },
      })
    );
  }
  
  // Mouse Sensor como fallback
  if (mergedConfig.enableMouse) {
    sensors.push(
      useSensor(MouseSensor, {
        activationConstraint: {
          distance: mergedConfig.activationDistance,
        },
      })
    );
  }
  
  // Touch Sensor para mobile
  if (mergedConfig.enableTouch) {
    sensors.push(
      useSensor(TouchSensor, {
        activationConstraint: {
          delay: mergedConfig.activationDelay,
          tolerance: mergedConfig.activationTolerance,
        },
      })
    );
  }
  
  // Keyboard Sensor para acessibilidade
  if (mergedConfig.enableKeyboard) {
    sensors.push(
      useSensor(KeyboardSensor, {
        coordinateGetter: mergedConfig.keyboardCoordinateGetter,
      })
    );
  }
  
  return useSensors(...sensors);
};

// Hook para configurações específicas por contexto
export const useDragDropPresets = () => {
  // Preset para mobile
  const mobileConfig: DragDropConfig = {
    enablePointer: true,
    enableTouch: true,
    enableKeyboard: false,
    enableMouse: false,
    activationDistance: 10,
    activationDelay: 300,
    activationTolerance: 8
  };
  
  // Preset para desktop
  const desktopConfig: DragDropConfig = {
    enablePointer: true,
    enableKeyboard: true,
    enableTouch: false,
    enableMouse: true,
    activationDistance: 5,
    activationDelay: 150,
    activationTolerance: 3
  };
  
  // Preset para acessibilidade
  const accessibilityConfig: DragDropConfig = {
    enablePointer: true,
    enableKeyboard: true,
    enableTouch: true,
    enableMouse: true,
    activationDistance: 3,
    activationDelay: 100,
    activationTolerance: 2,
    announcements: {
      onDragStart: (id) => `Começando a mover o item ${id}. Use as setas para posicionar e Enter para soltar.`,
      onDragOver: (id, overId) => `Item ${id} está posicionado sobre ${overId}`,
      onDragEnd: (id, overId) => `Item ${id} foi movido com sucesso para a posição de ${overId}`,
      onDragCancel: (id) => `Movimento do item ${id} foi cancelado. Pressione Escape novamente para sair do modo de arraste.`
    }
  };
  
  return {
    mobileConfig,
    desktopConfig,
    accessibilityConfig
  };
};
