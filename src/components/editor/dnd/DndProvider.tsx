import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import React, { ReactNode, useCallback } from 'react';
import { extractDragData, getDragFeedback, logDragEvent, validateDrop } from '../../../utils/dragDropUtils';
import { createBlockFromComponent } from '../../../utils/editorUtils';
import { useNotification } from '../../ui/Notification';
import { useEditor } from '../EditorProvider';

interface DndProviderProps {
  children: ReactNode;
  className?: string;
}

/**
 * DndProvider - Fornece contexto de drag and drop para o editor
 * 
 * Funcionalidades:
 * - Configuração de sensores otimizada para UX
 * - Collision detection inteligente baseado no tipo de drag
 * - Handlers centralizados para drag events
 * - Integração com EditorProvider para state management
 */
export const DndProvider: React.FC<DndProviderProps> = ({ children, className = '' }) => {
  const { state, actions } = useEditor();
  const notification = useNotification();

  // Current step data para operações de drag
  const safeCurrentStep = state.currentStep || 1;
  const currentStepKey = `step-${safeCurrentStep}`;
  
  // Get blocks for current step - usar mesmo utilitário do EditorPro
  const currentStepData = React.useMemo(() => {
    const { getBlocksForStep } = require('../../../config/quizStepsComplete');
    return getBlocksForStep(safeCurrentStep, state.stepBlocks) || [];
  }, [safeCurrentStep, state.stepBlocks]);

  // Debug helper
  const isDebug = () => {
    try {
      return (
        ((import.meta as any)?.env?.DEV ?? false) ||
        (typeof process !== 'undefined' && (process as any)?.env?.NODE_ENV === 'development') ||
        (typeof window !== 'undefined' && (window as any).__DND_DEBUG === true)
      );
    } catch {
      return false;
    }
  };

  // DnD sensors - configuração balanceada para UX otimizada
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px mínimo para evitar drag acidental
        delay: 100, // 100ms delay para touch devices
        tolerance: 5, // Tolerância para movements
      },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Collision detection strategy com assinatura correta
  const collisionDetectionStrategy = useCallback((args: any) => {
    // Para itens da sidebar, priorize pointerWithin para "enxergar" o canvas e zonas grandes
    try {
      const activeType = extractDragData(args?.active)?.type;
      if (activeType === 'sidebar-component') {
        const pointerCollisions = pointerWithin(args);
        if (pointerCollisions && pointerCollisions.length > 0) return pointerCollisions;
        // fallback seguro
        return closestCenter(args);
      }
    } catch (err) {
      if (isDebug()) {
        console.debug('collisionDetection (sidebar) erro:', err);
      }
    }

    // Para reordenação de blocos do canvas, mantenha estratégia mais precisa
    try {
      const collisions = rectIntersection(args);
      if (collisions && collisions.length > 0) return collisions;
    } catch (err) {
      if (isDebug()) {
        console.debug('rectIntersection erro:', err);
      }
    }

    try {
      const pointerCollisions = pointerWithin(args);
      if (pointerCollisions && pointerCollisions.length > 0) return pointerCollisions;
    } catch (err) {
      if (isDebug()) {
        console.debug('pointerWithin erro:', err);
      }
    }

    return closestCenter(args);
  }, []);

  // Helper centralizado: calcula índice alvo com base no alvo de drop
  const getTargetIndexFromOver = useCallback((
    overIdStrLocal: string | null,
    overDataLocal: any,
    mode: 'add' | 'reorder'
  ): number => {
    // 0) Compatibilidade com OptimizedCanvasDropZone: ids no formato dnd-block-<blockId>
    let cleanedOverId: string | null = overIdStrLocal;
    if (cleanedOverId && cleanedOverId.startsWith('dnd-block-')) {
      cleanedOverId = cleanedOverId.replace(/^dnd-block-/, '');
    }
    // 1) Preferir posição explícita vinda da drop-zone
    const pos = overDataLocal?.position;
    if (typeof pos === 'number' && Number.isFinite(pos)) {
      return Math.max(0, Math.min(pos, currentStepData.length));
    }

    // 2) Pela convenção do ID drop-zone-<n>
    if (overIdStrLocal) {
      const m = overIdStrLocal.match(/^drop-zone-(\d+)$/);
      if (m) return Math.max(0, Math.min(parseInt(m[1], 10), currentStepData.length));
    }

    // 3) Canvas root → final
    if (
      overIdStrLocal === 'canvas-drop-zone' ||
      (overIdStrLocal &&
        (overIdStrLocal.startsWith('canvas-drop-zone') || overIdStrLocal.startsWith('canvas-')))
    ) {
      return currentStepData.length;
    }

    // 4) Alvo é um bloco existente
    if (cleanedOverId) {
      const overIndex = currentStepData.findIndex((b: any) => String(b.id) === cleanedOverId);
      if (overIndex >= 0) return mode === 'add' ? overIndex + 1 : overIndex;
    }

    // 5) Fallback → final
    return currentStepData.length;
  }, [currentStepData]);

  // Drag handlers
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    const dragData = extractDragData(active);

    // ✅ LOG CRÍTICO SEMPRE VISÍVEL
    console.log('🚀🚀🚀 DRAG START FUNCIONANDO! 🚀🚀🚀', {
      activeId: active.id,
      dragData,
      activeDataCurrent: (active as any)?.data?.current,
      timestamp: new Date().toISOString(),
      event: event,
    });

    if (isDebug()) {
      console.log('🎯 DragStart - dados completos:', event);
    }

    logDragEvent('start', active);

    // ✅ Body-flag para desabilitar overlays/portais durante o drag
    try {
      document.body.classList.add('dnd-dragging');
    } catch {}
  }, []);

  const handleDragCancel = useCallback(() => {
    try {
      document.body.classList.remove('dnd-dragging');
    } catch {}
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      const activeIdStr = active?.id != null ? String(active.id) : null;
      const overIdStr = over?.id != null ? String(over.id) : null;
      const activeData = (active as any)?.data?.current;
      const overData = (over as any)?.data?.current;

      if (isDebug()) {
        console.groupCollapsed('🎯 DRAG END DEBUG');
        console.log('active.id:', activeIdStr);
        console.log('active.data.current:', activeData);
        console.log('over.id:', overIdStr);
        console.log('over.data.current:', overData);
      }

      if (!over) {
        // Sem alvo: para drags da sidebar, permitir append ao final; para reorder, cancelar
        const dragData = extractDragData(active);
        if (dragData?.type === 'sidebar-component' && dragData.blockType) {
          const newBlock = createBlockFromComponent(dragData.blockType as any, currentStepData);
          const targetIndex = currentStepData.length;
          actions.addBlockAtIndex(currentStepKey, newBlock, targetIndex);
          actions.setSelectedBlockId(newBlock.id);
          notification?.success?.(`Componente ${dragData.blockType} adicionado ao final!`);
          if (isDebug()) console.groupEnd();
          return;
        }
        if (isDebug()) console.warn('❌ Drop cancelado - sem alvo');
        const feedback = getDragFeedback(dragData, {
          isValid: false,
          message: 'Sem alvo de drop',
        } as any);
        notification?.warning?.(feedback.message);
        if (isDebug()) console.groupEnd();
        return;
      }

      const validation = validateDrop(active, over, currentStepData);
      if (isDebug()) {
        console.log('validateDrop →', validation);
      }
      logDragEvent('end', active, over, validation);

      if (!validation.isValid) {
        // 🔧 Fallback de curto prazo: se veio da sidebar, adiciona ao final para destravar o fluxo
        const dragData = extractDragData(active);
        if (dragData?.type === 'sidebar-component' && dragData.blockType) {
          const newBlock = createBlockFromComponent(dragData.blockType as any, currentStepData);
          const targetIndex = currentStepData.length;
          actions.addBlockAtIndex(currentStepKey, newBlock, targetIndex);
          actions.setSelectedBlockId(newBlock.id);
          notification?.info?.(`(Fallback) Componente ${dragData.blockType} adicionado ao final.`);
          if (isDebug()) console.groupEnd();
          return;
        }
        const feedback = getDragFeedback(extractDragData(active), validation);
        notification?.warning?.(feedback.message);
        if (isDebug()) console.groupEnd();
        return;
      }

      const dragData = extractDragData(active);
      if (!dragData) {
        notification?.error?.('Dados de drag corrompidos');
        if (isDebug()) console.groupEnd();
        return;
      }

      try {
        switch (validation.action) {
          case 'add':
            if (dragData.type === 'sidebar-component' && dragData.blockType) {
              const newBlock = createBlockFromComponent(dragData.blockType as any, currentStepData);
              const targetIndex = getTargetIndexFromOver(overIdStr, overData, 'add');
              actions.addBlockAtIndex(currentStepKey, newBlock, targetIndex);
              actions.setSelectedBlockId(newBlock.id);
              notification?.success?.(
                `Componente ${dragData.blockType} adicionado na posição ${targetIndex}!`
              );
            }
            break;
          case 'reorder':
            if (dragData.type === 'canvas-block' || dragData.type === 'block') {
              // Compat: Optimized usa id 'dnd-block-<blockId>'
              const normalizedActiveId = activeIdStr?.startsWith('dnd-block-')
                ? activeIdStr.replace(/^dnd-block-/, '')
                : activeIdStr;
              const activeIndex = currentStepData.findIndex(
                (block: any) => String(block.id) === normalizedActiveId
              );
              if (activeIndex === -1) break;

              const targetIndex = getTargetIndexFromOver(overIdStr, overData, 'reorder');

              if (activeIndex !== targetIndex) {
                actions.reorderBlocks(currentStepKey, activeIndex, targetIndex);
                notification?.info?.(`Bloco movido para a posição ${targetIndex}`);
              }
            }
            break;
          default:
            if (isDebug()) {
              console.log('Ação de drop não implementada:', validation.action);
            }
        }
      } catch (error) {
        console.error('Erro durante drag & drop:', error);
        notification?.error?.('Erro ao processar drag & drop');
      } finally {
        // ✅ Remover body-flag ao finalizar drag
        try {
          document.body.classList.remove('dnd-dragging');
        } catch {}
        if (isDebug()) console.groupEnd();
      }
    },
    [actions, currentStepData, currentStepKey, notification, getTargetIndexFromOver]
  );

  // ✅ VERIFICAÇÃO CRÍTICA - Debug do DndContext (only in debug mode)
  React.useEffect(() => {
    if (!isDebug()) return;
    
    console.log('🎯 DndProvider sendo montado');

    // Injetar estilos de debug para visualizar droppables/handles
    try {
      const existing = document.getElementById('dnd-debug-styles');
      if (!existing) {
        const style = document.createElement('style');
        style.id = 'dnd-debug-styles';
        style.textContent = `
          /* Highlight droppables e draggables em modo debug */
          .dnd-provider [data-dnd-kit-droppable] { outline: 1px dashed rgba(59,130,246,0.5); outline-offset: -2px; }
          .dnd-provider [data-dnd-dropzone-type] { outline: 1px dashed rgba(16,185,129,0.7); outline-offset: -2px; }
          .dnd-provider [data-dnd-kit-draggable-handle] { box-shadow: 0 0 0 2px rgba(99,102,241,0.5) inset; }
        `;
        document.head.appendChild(style);
      }
    } catch {}

    // Verificar elementos DnD após renderização - otimizado com requestAnimationFrame
    const checkElements = () => {
      const draggables = document.querySelectorAll('[data-dnd-kit-draggable-handle]');
      const droppables = document.querySelectorAll('[data-dnd-kit-droppable]');
      console.log('🔍 CONTAGEM DnD após montagem DndProvider:', {
        draggables: draggables.length,
        droppables: droppables.length,
        draggableIds: Array.from(draggables).map(el => el.id),
        droppableIds: Array.from(droppables).map(el => el.id),
      });
    };
    
    // Use requestAnimationFrame instead of setTimeout for better performance
    requestAnimationFrame(() => {
      requestAnimationFrame(checkElements);
    });
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={event => {
        // ✅ CONFIRMAR que o drag está ativo
        console.log('🎯 DRAG OVER DETECTADO:', {
          overId: event.over?.id,
          activeId: event.active?.id,
          timestamp: new Date().toISOString(),
        });

        if (isDebug()) {
          console.log('🎯 DragOver', event);
        }
      }}
      onDragEnd={handleDragEnd}
    >
      <div className={`dnd-provider ${className}`}>
        {children}
      </div>
    </DndContext>
  );
};

export default DndProvider;