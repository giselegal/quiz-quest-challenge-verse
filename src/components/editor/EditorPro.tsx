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
import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getBlocksForStep } from '../../config/quizStepsComplete';
import { cn } from '../../lib/utils';
import '../../styles/dnd-fixes.css'; // ✅ CSS de força bruta para DnD
import { Block } from '../../types/editor';
import {
  extractDragData,
  getDragFeedback,
  logDragEvent,
  validateDrop,
} from '../../utils/dragDropUtils';
import {
  copyToClipboard,
  createBlockFromComponent,
  devLog,
  validateEditorJSON,
} from '../../utils/editorUtils';
import { useNotification } from '../ui/Notification';
import { CanvasDropZone } from './canvas/CanvasDropZone.simple';
import { DnDMonitor } from './debug/DnDMonitor';
import { DraggableComponentItem } from './dnd/DraggableComponentItem';
import { DraggableComponentItemForce } from './dnd/DraggableComponentItemForce';
import { useEditor } from './EditorProvider';
// import { SortableBlock } from './SortableBlock';

/**
 * EditorPro - versão modularizada / otimizada do QuizEditorPro
 *
 * Principais mudanças:
 * - Modularização das colunas (facilita testes e lazy-loading)
 * - Lazy-load do painel de propriedades (reduz TTI/hidratação)
 * - Preserva DnD e lógica existente (reaproveite handlers)
 *
 * Observações de otimização sugeridas:
 * - Virtualizar a lista de etapas se houver muitas etapas
 * - Adiar carregamento de scripts externos (analytics/chat) se possível
 * - Extrair availableComponents para um arquivo de config
 */

// lazy-load do painel de propriedades (reduz custo de bundle inicial)
const EnhancedUniversalPropertiesPanelFixed = React.lazy(
  () => import('@/components/universal/EnhancedUniversalPropertiesPanelFixed')
);

interface EditorProProps {
  className?: string;
}

export const EditorPro: React.FC<EditorProProps> = ({ className = '' }) => {
  // Segurança: useEditor pode lançar se não houver contexto — capturamos para renderizar fallback
  let editorContext;
  try {
    editorContext = useEditor();
  } catch (e) {
    editorContext = undefined;
  }

  if (!editorContext) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Erro de Contexto do Editor</h2>
          <p className="text-gray-600 mb-4">
            O EditorPro deve ser usado dentro de um EditorProvider.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            🔄 Recarregar
          </button>
        </div>
      </div>
    );
  }

  const { state, actions } = editorContext;
  const [viewport, setViewport] = useState<'full' | 'sm' | 'md' | 'lg'>('full');
  // viewportWidth não está sendo usado diretamente; manter lógica simples só com state 'viewport'
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [customTitle, setCustomTitle] = useState('Quiz Quest - Editor Principal');
  const notification = useNotification();
  const NotificationContainer = (notification as any)?.NotificationContainer ?? null;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const safeCurrentStep = state.currentStep || 1;
  const currentStepKey = `step-${safeCurrentStep}`;

  const currentStepData = useMemo(
    () => getBlocksForStep(safeCurrentStep, state.stepBlocks) || [],
    [safeCurrentStep, state.stepBlocks]
  );

  const stepHasBlocks = useMemo(() => {
    const map: Record<number, boolean> = {};
    for (let i = 1; i <= 21; i++) {
      map[i] = (getBlocksForStep(i, state.stepBlocks) || []).length > 0;
    }
    return map;
  }, [state.stepBlocks]);

  const selectedBlock = currentStepData.find((block: Block) => block.id === state.selectedBlockId);

  if (process.env.NODE_ENV === 'development') {
    devLog('EditorPro render:', {
      currentStep: state.currentStep,
      safeCurrentStep,
      currentStepKey,
      totalBlocks: currentStepData.length,
    });
  }

  // DnD sensors - configuração ULTRA sensível para garantir funcionamento (alinhado ao commit bom)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0, // imediato
        delay: 0,
        tolerance: 0,
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
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.debug('collisionDetection (sidebar) erro:', err);
      }
    }

    // Para reordenação de blocos do canvas, mantenha estratégia mais precisa
    try {
      const collisions = rectIntersection(args);
      if (collisions && collisions.length > 0) return collisions;
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.debug('rectIntersection erro:', err);
      }
    }

    try {
      const pointerCollisions = pointerWithin(args);
      if (pointerCollisions && pointerCollisions.length > 0) return pointerCollisions;
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.debug('pointerWithin erro:', err);
      }
    }

    return closestCenter(args);
  }, []);

  // Helper centralizado: calcula índice alvo com base no alvo de drop
  function getTargetIndexFromOver(
    overIdStrLocal: string | null,
    overDataLocal: any,
    mode: 'add' | 'reorder'
  ): number {
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
      const overIndex = currentStepData.findIndex(b => String(b.id) === cleanedOverId);
      if (overIndex >= 0) return mode === 'add' ? overIndex + 1 : overIndex;
    }

    // 5) Fallback → final
    return currentStepData.length;
  }

  // 🔗 Escutar eventos de navegação disparados pelos blocos (ex.: botão da etapa 1)
  useEffect(() => {
    const parseStepNumber = (stepId: unknown): number | null => {
      if (typeof stepId === 'number') return stepId;
      if (typeof stepId !== 'string') return null;
      const digits = stepId.replace(/[^0-9]/g, '');
      const num = parseInt(digits || stepId, 10);
      return Number.isFinite(num) ? num : null;
    };

    const handleNavigate = (ev: Event) => {
      const e = ev as CustomEvent<{ stepId?: string | number; source?: string }>;
      const target = parseStepNumber(e.detail?.stepId);
      if (!target || target < 1 || target > 21) return;
      actions.setCurrentStep(target);
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(
          '➡️ EditorPro: navegação por evento',
          e.detail?.stepId,
          '→',
          target,
          'origem:',
          e.detail?.source
        );
      }
    };

    window.addEventListener('navigate-to-step', handleNavigate as EventListener);
    window.addEventListener('quiz-navigate-to-step', handleNavigate as EventListener);
    return () => {
      window.removeEventListener('navigate-to-step', handleNavigate as EventListener);
      window.removeEventListener('quiz-navigate-to-step', handleNavigate as EventListener);
    };
  }, [actions]);

  // Expor etapa atual globalmente para unificar comportamento de blocos (produção/edição)
  useEffect(() => {
    try {
      (window as any).__quizCurrentStep = safeCurrentStep;
    } catch {}
  }, [safeCurrentStep]);

  // Desabilitar auto-scroll e sincronização de scroll enquanto o editor estiver montado
  useEffect(() => {
    try {
      (window as any).__DISABLE_AUTO_SCROLL = true;
      (window as any).__DISABLE_SCROLL_SYNC = true;
    } catch {}

    return () => {
      try {
        (window as any).__DISABLE_AUTO_SCROLL = false;
        (window as any).__DISABLE_SCROLL_SYNC = false;
      } catch {}
    };
  }, []);

  // componentes disponíveis - ideal extrair para config
  const availableComponentsRaw = useMemo(
    () => [
      {
        type: 'quiz-intro-header',
        name: 'Header Quiz',
        icon: '📝',
        category: 'Estrutura',
        description: 'Cabeçalho com título e descrição',
      },
      {
        type: 'options-grid',
        name: 'Grade Opções',
        icon: '⚡',
        category: 'Interação',
        description: 'Grid de opções para questões',
      },
      {
        type: 'form-container',
        name: 'Formulário',
        icon: '📝',
        category: 'Captura',
        description: 'Campo de entrada de dados',
      },
      {
        type: 'text',
        name: 'Texto',
        icon: '📄',
        category: 'Conteúdo',
        description: 'Bloco de texto simples',
      },
      {
        type: 'button',
        name: 'Botão',
        icon: '🔘',
        category: 'Interação',
        description: 'Botão de ação',
      },
      {
        type: 'result-header-inline',
        name: 'Header Resultado',
        icon: '🎯',
        category: 'Resultado',
        description: 'Cabeçalho personalizado de resultado',
      },
      {
        type: 'style-card-inline',
        name: 'Card Estilo',
        icon: '🎨',
        category: 'Resultado',
        description: 'Card com características do estilo',
      },
      {
        type: 'secondary-styles',
        name: 'Estilos Secundários',
        icon: '📊',
        category: 'Resultado',
        description: 'Lista de estilos complementares',
      },
      {
        type: 'testimonials',
        name: 'Depoimentos',
        icon: '💬',
        category: 'Social Proof',
        description: 'Lista de depoimentos',
      },
      {
        type: 'guarantee',
        name: 'Garantia',
        icon: '🛡️',
        category: 'Confiança',
        description: 'Selo de garantia',
      },
      {
        type: 'hero',
        name: 'Hero Section',
        icon: '🚀',
        category: 'Layout',
        description: 'Seção hero para transições e ofertas',
      },
      {
        type: 'benefits',
        name: 'Benefícios',
        icon: '✨',
        category: 'Vendas',
        description: 'Lista de benefícios do produto',
      },
      {
        type: 'quiz-offer-cta-inline',
        name: 'CTA Oferta',
        icon: '💰',
        category: 'Conversão',
        description: 'Call-to-action para ofertas especiais',
      },
      // Extras de teste (catálogo ampliado)
      {
        type: 'headline',
        name: 'Headline',
        icon: '📰',
        category: 'Extras',
        description: 'Título destacado',
      },
      {
        type: 'image',
        name: 'Imagem',
        icon: '🖼️',
        category: 'Extras',
        description: 'Imagem simples',
      },
      {
        type: 'video',
        name: 'Vídeo',
        icon: '🎬',
        category: 'Extras',
        description: 'Vídeo incorporado',
      },
      {
        type: 'spacer',
        name: 'Espaçador',
        icon: '↕️',
        category: 'Extras',
        description: 'Espaço vertical',
      },
      {
        type: 'divider',
        name: 'Divisor',
        icon: '➖',
        category: 'Extras',
        description: 'Linha divisória',
      },
      {
        type: 'container',
        name: 'Container',
        icon: '📦',
        category: 'Extras',
        description: 'Container de layout',
      },
      { type: 'grid', name: 'Grid', icon: '🔲', category: 'Extras', description: 'Layout em grid' },
      {
        type: 'two-column',
        name: 'Duas Colunas',
        icon: '🧱',
        category: 'Extras',
        description: 'Layout 2 colunas',
      },
      {
        type: 'lead-form',
        name: 'Form Lead',
        icon: '✍️',
        category: 'Extras',
        description: 'Formulário de lead',
      },
      {
        type: 'quiz-header',
        name: 'Quiz Header',
        icon: '🏁',
        category: 'Extras',
        description: 'Cabeçalho do quiz',
      },
      {
        type: 'quiz-navigation',
        name: 'Quiz Navegação',
        icon: '🧭',
        category: 'Extras',
        description: 'Barra de navegação',
      },
      {
        type: 'quiz-result-inline',
        name: 'Resultado Inline',
        icon: '📈',
        category: 'Extras',
        description: 'Resultado do quiz',
      },
      {
        type: 'step-header-inline',
        name: 'Header Etapa',
        icon: '🔖',
        category: 'Extras',
        description: 'Cabeçalho de etapa',
      },
      {
        type: 'style-result',
        name: 'Resultado Estilo',
        icon: '🎨',
        category: 'Extras',
        description: 'Resumo do estilo',
      },
      {
        type: 'result-display',
        name: 'Exibir Resultado',
        icon: '🏆',
        category: 'Extras',
        description: 'Bloco de resultado',
      },
      {
        type: 'faq',
        name: 'FAQ',
        icon: '❓',
        category: 'Extras',
        description: 'Perguntas frequentes',
      },
      {
        type: 'pricing',
        name: 'Pricing',
        icon: '💵',
        category: 'Extras',
        description: 'Tabela de preços',
      },
      {
        type: 'cta',
        name: 'CTA',
        icon: '📣',
        category: 'Extras',
        description: 'Chamada para ação',
      },
      {
        type: 'offer-cta',
        name: 'Oferta CTA',
        icon: '🏷️',
        category: 'Extras',
        description: 'Oferta com CTA',
      },
      {
        type: 'benefits',
        name: 'Benefícios',
        icon: '✅',
        category: 'Extras',
        description: 'Lista de benefícios',
      },
      {
        type: 'testimonials',
        name: 'Depoimentos',
        icon: '🗣️',
        category: 'Extras',
        description: 'Seção de depoimentos',
      },
      {
        type: 'testimonial',
        name: 'Depoimento',
        icon: '💬',
        category: 'Extras',
        description: 'Depoimento individual',
      },
      {
        type: 'pricing-card-inline',
        name: 'Card Pricing',
        icon: '💳',
        category: 'Extras',
        description: 'Card de preço',
      },
      {
        type: 'testimonial-card-inline',
        name: 'Card Depoimento',
        icon: '📝',
        category: 'Extras',
        description: 'Card de depoimento',
      },
    ],
    []
  );

  // Deduplicar por `type` para evitar draggables duplicados na sidebar
  const availableComponents = useMemo(() => {
    const seen = new Set<string>();
    return availableComponentsRaw.filter(c => {
      if (seen.has(c.type)) return false;
      seen.add(c.type);
      return true;
    });
  }, [availableComponentsRaw]);
  const groupedComponents = useMemo(
    () =>
      availableComponents.reduce(
        (acc, c) => {
          if (!acc[c.category]) acc[c.category] = [];
          acc[c.category].push(c);
          return acc;
        },
        {} as Record<string, typeof availableComponents>
      ),
    [availableComponents]
  );

  const getStepAnalysis = (step: number) => {
    if (step === 1) return { type: '📝', label: 'Captura', desc: 'Nome do usuário' };
    if (step >= 2 && step <= 11)
      return { type: '🎯', label: 'Questão', desc: 'Pontuação de estilo' };
    if (step === 12) return { type: '🔄', label: 'Transição', desc: 'Para estratégicas' };
    if (step >= 13 && step <= 18)
      return { type: '📊', label: 'Estratégica', desc: 'Tracking sem pontuação' };
    if (step === 19) return { type: '⏳', label: 'Calculando', desc: 'Processamento' };
    if (step === 20) return { type: '🎉', label: 'Resultado', desc: 'Estilo personalizado' };
    if (step === 21) return { type: '💰', label: 'Oferta', desc: 'CTA de conversão' };
    return { type: '❓', label: 'Indefinida', desc: 'Não mapeada' };
  };

  // Handlers básicos
  const handleStepSelect = useCallback((step: number) => actions.setCurrentStep(step), [actions]);

  // Handler seguro para adicionar nova etapa, com fallback caso actions.addStep não esteja tipado
  const handleAddStep = useCallback(() => {
    const maybeAddStep = (actions as any)?.addStep;
    if (typeof maybeAddStep === 'function') {
      maybeAddStep();
      return;
    }
    // Fallback: calcula próximo índice e garante carregamento
    const keys = Object.keys(state.stepBlocks || {});
    const nums = keys
      .map(k => {
        const m = k.match(/(\d+)/);
        return m ? parseInt(m[1], 10) : 0;
      })
      .filter(n => Number.isFinite(n) && n > 0);
    const next = (nums.length > 0 ? Math.max(...nums) : 0) + 1;
    actions.setCurrentStep(next);
    actions.ensureStepLoaded(next);
  }, [actions, state.stepBlocks]);

  // Duplicação inline é gerenciada no wrapper simples quando necessário

  // Drag handlers (reutilizam utilitários)
  const isDebug = () => {
    try {
      // Vite: import.meta.env.DEV; fallback: NODE_ENV; override: window.__DND_DEBUG
      return (
        ((import.meta as any)?.env?.DEV ?? false) ||
        (typeof process !== 'undefined' && (process as any)?.env?.NODE_ENV === 'development') ||
        (typeof window !== 'undefined' && (window as any).__DND_DEBUG === true)
      );
    } catch {
      return false;
    }
  };

  // Throttle para logs de onDragOver em modo debug
  const dragOverLogRef = React.useRef(0);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    const dragData = extractDragData(active);

    // Log crítico sempre visível para diagnosticar início do drag
    // eslint-disable-next-line no-console
    console.log('🚀 DRAG START', {
      activeId: active.id,
      dragData,
      activeDataCurrent: (active as any)?.data?.current,
      timestamp: new Date().toISOString(),
    });

    // Removido alert intrusivo durante drag start

    if (isDebug()) {
      // eslint-disable-next-line no-console
      console.log('🎯 DragStart - dados completos:', event);
    }

    logDragEvent('start', active);
    if (process.env.NODE_ENV === 'development') devLog('Drag start', dragData);

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
      // Log sempre visível de fim de drag
      // eslint-disable-next-line no-console
      console.groupCollapsed('🎯 DRAG END');
      // eslint-disable-next-line no-console
      console.log('active.id:', activeIdStr);
      // eslint-disable-next-line no-console
      console.log('active.data.current:', activeData);
      // eslint-disable-next-line no-console
      console.log('over.id:', overIdStr);
      // eslint-disable-next-line no-console
      console.log('over.data.current:', overData);

      let handled = false;

      if (!over) {
        // Sem alvo: para drags da sidebar, permitir append ao final; para reorder, cancelar
        const dragData = extractDragData(active);
        if (dragData?.type === 'sidebar-component' && dragData.blockType) {
          const newBlock = createBlockFromComponent(dragData.blockType as any, currentStepData);
          const targetIndex = currentStepData.length;
          actions.addBlockAtIndex(currentStepKey, newBlock, targetIndex);
          actions.setSelectedBlockId(newBlock.id);
          notification?.success?.(`Componente ${dragData.blockType} adicionado ao final!`);
          handled = true;
          console.groupEnd();
          return;
        }
        console.warn('❌ Drop cancelado - sem alvo');
        const feedback = getDragFeedback(dragData, {
          isValid: false,
          message: 'Sem alvo de drop',
        } as any);
        notification?.warning?.(feedback.message);
        console.groupEnd();
        return;
      }

      const validation = validateDrop(active, over, currentStepData);
      // eslint-disable-next-line no-console
      console.log('validateDrop →', validation);
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
          handled = true;
          console.groupEnd();
          return;
        }
        const feedback = getDragFeedback(extractDragData(active), validation);
        notification?.warning?.(feedback.message);
        console.groupEnd();
        return;
      }

      const dragData = extractDragData(active);
      if (!dragData) {
        notification?.error?.('Dados de drag corrompidos');
        console.groupEnd();
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
              handled = true;
            }
            break;
          case 'reorder':
            if (dragData.type === 'canvas-block' || dragData.type === 'block') {
              // Compat: Optimized usa id 'dnd-block-<blockId>'
              const normalizedActiveId = activeIdStr?.startsWith('dnd-block-')
                ? activeIdStr.replace(/^dnd-block-/, '')
                : activeIdStr;
              const activeIndex = currentStepData.findIndex(
                block => String(block.id) === normalizedActiveId
              );
              if (activeIndex === -1) break;

              const targetIndex = getTargetIndexFromOver(overIdStr, overData, 'reorder');

              if (activeIndex !== targetIndex) {
                actions.reorderBlocks(currentStepKey, activeIndex, targetIndex);
                notification?.info?.(`Bloco movido para a posição ${targetIndex}`);
              }
              handled = true;
            }
            break;
          default:
            if (process.env.NODE_ENV === 'development')
              devLog('Ação de drop não implementada:', validation.action);
        }
      } catch (error) {
        console.error('Erro durante drag & drop:', error);
        notification?.error?.('Erro ao processar drag & drop');
      } finally {
        // ✅ Remover body-flag ao finalizar drag
        try {
          document.body.classList.remove('dnd-dragging');
        } catch {}
        // Fallback final garantido: se veio da sidebar e nada foi feito, adiciona ao final
        if (!handled) {
          const data = extractDragData(active);
          if (data?.type === 'sidebar-component' && data.blockType) {
            const nb = createBlockFromComponent(data.blockType as any, currentStepData);
            actions.addBlockAtIndex(currentStepKey, nb, currentStepData.length);
            actions.setSelectedBlockId(nb.id);
            console.warn('[DnD] Fallback final aplicado: componente adicionado ao final.');
          }
        }
        console.groupEnd();
      }
    },
    [actions, currentStepData, currentStepKey, notification]
  );

  /* -------------------------
     Sub-componentes locais
     ------------------------- */

  const StepSidebar: React.FC = () => (
    <div className="w-[220px] bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-sm text-gray-900">Etapas do Quiz</h3>
        <p className="text-xs text-gray-500 mt-1">Gerencie suas etapas</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {Array.from({ length: Math.max(21, safeCurrentStep, 1) }, (_, i) => i + 1).map(step => {
            const analysis = getStepAnalysis(step);
            const isActive = step === safeCurrentStep;
            const hasBlocks = stepHasBlocks[step];

            return (
              <button
                key={step}
                type="button"
                onClick={() => handleStepSelect(step)}
                className={cn(
                  'w-full text-left p-2 rounded-md text-xs transition-colors',
                  isActive
                    ? 'bg-blue-100 border-blue-300 text-blue-900'
                    : 'hover:bg-gray-50 text-gray-700'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{analysis.type}</span>
                    <span className="font-medium">Etapa {step}</span>
                  </div>
                  {hasBlocks && <span className="w-2 h-2 bg-green-500 rounded-full" />}
                </div>
                <div className="text-gray-600 mt-1">
                  <div className="font-medium">{analysis.label}</div>
                  <div className="text-xs">{analysis.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-3 border-t border-gray-200 text-xs text-gray-700 space-y-2">
        <div className="flex items-center justify-between">
          <span>Etapa atual:</span>
          <span className="font-medium">{safeCurrentStep}</span>
        </div>
        <button
          type="button"
          onClick={handleAddStep}
          className="w-full text-center py-2 px-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-xs font-medium"
          title="Adicionar nova etapa"
        >
          + Nova etapa
        </button>
      </div>
    </div>
  );

  const ComponentsSidebar: React.FC = () => (
    <div className="w-[280px] bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-sm text-gray-900">Biblioteca de Componentes</h3>
        <p className="text-xs text-gray-500 mt-1">
          {availableComponents.length} componentes disponíveis
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          {/* ✅ SEÇÃO DE TESTE - Versão Force vs Normal */}
          <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="text-xs font-semibold text-yellow-800 mb-2 uppercase tracking-wide">
              🧪 TESTE DnD - Force vs Normal
            </h4>
            <div className="space-y-2">
              <DraggableComponentItemForce
                blockType="test-force"
                title="TESTE Force Wrapper"
                description="Usa ForceDraggableWrapper"
                icon={<span className="text-lg">🧪</span>}
                category="Teste"
                className="bg-yellow-100 border-yellow-300"
                idSuffix={String(safeCurrentStep)}
              />
              <DraggableComponentItem
                blockType="test-normal"
                title="TESTE Normal"
                description="Usa implementação normal"
                icon={<span className="text-lg">🔧</span>}
                category="Teste"
                className="bg-blue-100 border-blue-300"
                idSuffix={String(safeCurrentStep)}
              />
            </div>
          </div>

          {Object.entries(groupedComponents).map(([category, components]) => (
            <div key={category} className="mb-4">
              <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                {category}
              </h4>
              <div className="space-y-2">
                {components.map(component => (
                  <DraggableComponentItem
                    key={component.type}
                    blockType={component.type}
                    title={component.name}
                    description={component.description}
                    icon={<span className="text-lg">{component.icon}</span>}
                    category={component.category}
                    className="bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-blue-300"
                    idSuffix={String(safeCurrentStep)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CanvasArea: React.FC = () => (
    <div className="flex-1 flex flex-col bg-gray-100 min-h-0">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            {isEditingTitle ? (
              <input
                type="text"
                value={customTitle}
                onChange={e => setCustomTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={e => {
                  if (e.key === 'Enter') setIsEditingTitle(false);
                }}
                className="font-semibold text-gray-900 bg-transparent border-b-2 border-blue-500 outline-none text-lg"
                autoFocus
              />
            ) : (
              <h3
                className="font-semibold text-gray-900 flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => setIsEditingTitle(true)}
                title="Clique para editar o título"
              >
                🎯 {customTitle} - Etapa {safeCurrentStep}
              </h3>
            )}
            <p className="text-sm text-gray-600">
              {getStepAnalysis(safeCurrentStep).label}: {getStepAnalysis(safeCurrentStep).desc}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={actions.undo}
                disabled={!actions.canUndo}
                className={cn(
                  'px-3 py-2 text-sm rounded-md transition-all duration-200',
                  actions.canUndo
                    ? 'text-gray-700 hover:bg-white hover:shadow-sm'
                    : 'text-gray-400 cursor-not-allowed'
                )}
                title="Desfazer (Ctrl+Z)"
              >
                ↶ Undo
              </button>
              <button
                type="button"
                onClick={actions.redo}
                disabled={!actions.canRedo}
                className={cn(
                  'px-3 py-2 text-sm rounded-md transition-all duration-200',
                  actions.canRedo
                    ? 'text-gray-700 hover:bg-white hover:shadow-sm'
                    : 'text-gray-400 cursor-not-allowed'
                )}
                title="Refazer (Ctrl+Y)"
              >
                ↷ Redo
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={async () => {
                  try {
                    const json = actions.exportJSON();
                    const success = await copyToClipboard(json);
                    if (success)
                      notification?.success?.('JSON exportado para a área de transferência!');
                    else notification?.error?.('Erro ao copiar para área de transferência');
                  } catch {
                    notification?.error?.('Erro ao exportar JSON');
                  }
                }}
                className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                title="Exportar como JSON"
                aria-label="Exportar estado atual como JSON"
              >
                📤 Export
              </button>

              <input
                type="file"
                accept=".json"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = event => {
                      try {
                        const json = event.target?.result as string;
                        const validation = validateEditorJSON(json);
                        if (!validation.valid) {
                          notification?.error?.(`Erro de validação: ${validation.error}`);
                          return;
                        }
                        actions.importJSON(json);
                        notification?.success?.('JSON importado com sucesso!');
                      } catch (error) {
                        notification?.error?.('Erro ao importar JSON: ' + (error as Error).message);
                      }
                    };
                    reader.readAsText(file);
                  }
                  e.currentTarget.value = '';
                }}
                style={{ display: 'none' }}
                ref={fileInputRef}
                id="import-json"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                title="Importar JSON"
                aria-label="Importar estado do editor via JSON"
              >
                📥 Import
              </button>
            </div>

            {/* Alternância de modo removida: somente preview */}

            {/* Seletor de viewport responsivo */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setViewport('sm')}
                className={cn(
                  'px-3 py-2 text-sm rounded-md transition-all duration-200 font-medium',
                  viewport === 'sm'
                    ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
                title="Mobile (375px)"
              >
                📱 375
              </button>
              <button
                type="button"
                onClick={() => setViewport('md')}
                className={cn(
                  'px-3 py-2 text-sm rounded-md transition-all duration-200 font-medium',
                  viewport === 'md'
                    ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
                title="Tablet (768px)"
              >
                📟 768
              </button>
              <button
                type="button"
                onClick={() => setViewport('lg')}
                className={cn(
                  'px-3 py-2 text-sm rounded-md transition-all duration-200 font-medium',
                  viewport === 'lg'
                    ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
                title="Desktop (1024px)"
              >
                🖥️ 1024
              </button>
              <button
                type="button"
                onClick={() => setViewport('full')}
                className={cn(
                  'px-3 py-2 text-sm rounded-md transition-all duration-200 font-medium',
                  viewport === 'full'
                    ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
                title="Largura total"
              >
                🧭 Full
              </button>
            </div>

            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
              💾 Salvar
            </button>
          </div>
        </div>

        {/* Banner de modo removido */}
      </div>

      {/* Canvas principal com drag & drop - sistema unificado simples */}
      <div className="flex-1 p-4" data-canvas-container>
        <CanvasDropZone
          blocks={currentStepData}
          selectedBlockId={state.selectedBlockId}
          onSelectBlock={actions.setSelectedBlockId}
          onUpdateBlock={(id: string, updates: any) =>
            actions.updateBlock(currentStepKey, id, updates)
          }
          onDeleteBlock={(id: string) => actions.removeBlock(currentStepKey, id)}
          className="max-w-4xl mx-auto"
        />
      </div>
    </div>
  );

  // Coluna de propriedades (direita)
  const PropertiesColumn: React.FC = () => (
    <div className="w-[360px] min-w-[300px] bg-white border-l border-gray-200 flex flex-col">
      {selectedBlock ? (
        <Suspense
          fallback={<div className="p-4 text-sm text-gray-600">Carregando propriedades…</div>}
        >
          <EnhancedUniversalPropertiesPanelFixed
            selectedBlock={selectedBlock as any}
            onUpdate={(blockId: string, updates: Record<string, any>) =>
              actions.updateBlock(currentStepKey, blockId, updates)
            }
            onClose={() => actions.setSelectedBlockId(null)}
            onDelete={(blockId: string) => actions.removeBlock(currentStepKey, blockId)}
          />
        </Suspense>
      ) : (
        <div className="h-full p-6 text-sm text-gray-600">
          Selecione um bloco no canvas para editar suas propriedades.
        </div>
      )}
    </div>
  );

  // ✅ VERIFICAÇÃO CRÍTICA - Debug do DndContext
  React.useEffect(() => {
    if (isDebug()) {
      // eslint-disable-next-line no-console
      console.log('🎯 DndContext sendo montado no EditorPro');

      // Injetar estilos de debug para visualizar droppables/handles
      try {
        const existing = document.getElementById('dnd-debug-styles');
        if (!existing) {
          const style = document.createElement('style');
          style.id = 'dnd-debug-styles';
          style.textContent = `
            /* Highlight droppables e draggables em modo debug */
            .editor-pro [data-dnd-kit-droppable] { outline: 1px dashed rgba(59,130,246,0.5); outline-offset: -2px; }
            .editor-pro [data-dnd-dropzone-type] { outline: 1px dashed rgba(16,185,129,0.7); outline-offset: -2px; }
            .editor-pro [data-dnd-kit-draggable-handle] { box-shadow: 0 0 0 2px rgba(99,102,241,0.5) inset; }
          `;
          document.head.appendChild(style);
        }
      } catch {}

      // Verificar elementos DnD após renderização
      setTimeout(() => {
        const draggables = document.querySelectorAll('[data-dnd-kit-draggable-handle]');
        const droppables = document.querySelectorAll('[data-dnd-kit-droppable]');
        // eslint-disable-next-line no-console
        console.log('🔍 CONTAGEM DnD após montagem:', {
          draggables: draggables.length,
          droppables: droppables.length,
          draggableIds: Array.from(draggables).map(el => el.id),
          droppableIds: Array.from(droppables).map(el => el.id),
        });

        // Logs de camadas/estilos do canvas e dropzones
        const canvasRoots = document.querySelectorAll('[data-id="canvas-drop-zone"]');
        if (canvasRoots.length > 1) {
          console.warn(
            `⚠️ Há ${canvasRoots.length} canvas roots com data-id="canvas-drop-zone". Mantenha apenas um por tela.`
          );
        }
        const canvasRoot = (canvasRoots[0] as HTMLElement) || null;
        if (canvasRoot) {
          const cs = window.getComputedStyle(canvasRoot);
          console.log('🎨 Canvas styles:', {
            pointerEvents: cs.pointerEvents,
            overflow: cs.overflow,
            overflowY: cs.overflowY,
            position: cs.position,
            zIndex: cs.zIndex,
            rect: canvasRoot.getBoundingClientRect(),
          });
        } else {
          console.warn('⚠️ Canvas root não encontrado (data-id=canvas-drop-zone)');
        }

        const zones = document.querySelectorAll('[data-dnd-dropzone-type]');
        zones.forEach((z: Element) => {
          const el = z as HTMLElement;
          const cs = window.getComputedStyle(el);
          console.log(
            '🧩 DropZone:',
            el.getAttribute('data-dnd-dropzone-type'),
            el.getAttribute('data-position'),
            {
              rect: el.getBoundingClientRect(),
              pointerEvents: cs.pointerEvents,
              zIndex: cs.zIndex,
              visibility: cs.visibility,
            }
          );
        });

        if (draggables.length === 0) {
          // eslint-disable-next-line no-console
          console.error('❌ NENHUM ELEMENTO DRAGGABLE ENCONTRADO! Problema na renderização.');
        } else {
          // eslint-disable-next-line no-console
          console.log('✅ Elementos draggable encontrados, testando eventos...');

          // Testar eventos no primeiro draggable
          const firstDraggable = draggables[0];
          if (firstDraggable) {
            firstDraggable.addEventListener(
              'mousedown',
              () => {
                // eslint-disable-next-line no-console
                console.log('🖱️ MouseDown funcionando no primeiro draggable!');
              },
              { once: true }
            );
          }
        }
      }, 1000);
    }
  }, []);

  /* -------------------------
     Render principal
     ------------------------- */
  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetectionStrategy}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={event => {
          if (isDebug()) {
            // Throttle leve: logar no máximo a cada ~200ms
            const now = Date.now();
            const last = dragOverLogRef.current || 0;
            if (now - last > 200) {
              // eslint-disable-next-line no-console
              console.log('🎯 DragOver', {
                overId: event.over?.id,
                activeId: event.active?.id,
                ts: new Date().toISOString(),
              });
              dragOverLogRef.current = now;
            }
          }
          // Sem logDragEvent para over pois não existe esse tipo
        }}
        onDragEnd={handleDragEnd}
      >
        <div className={`editor-pro h-screen bg-gray-50 flex ${className}`}>
          <StepSidebar />
          <ComponentsSidebar />
          <CanvasArea />
          <PropertiesColumn />
        </div>

        {/* Monitor de debug em tempo real (apenas debug) */}
        {isDebug() ? <DnDMonitor /> : null}
      </DndContext>

      {NotificationContainer ? <NotificationContainer /> : null}
    </>
  );
};

export default EditorPro;
