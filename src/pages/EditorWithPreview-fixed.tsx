import React, { useState } from 'react';

// Editor Components
import { CanvasDropZone } from '@/components/editor/canvas/CanvasDropZone';
import CombinedComponentsPanel from '@/components/editor/CombinedComponentsPanel';
import { FunnelSettingsPanel } from '@/components/editor/funnel-settings/FunnelSettingsPanel';
import { FunnelStagesPanel } from '@/components/editor/funnel/FunnelStagesPanel';
import { FourColumnLayout } from '@/components/editor/layout/FourColumnLayout';
import { SaveTemplateModal } from '@/components/editor/SaveTemplateModal';
import { EditorToolbar } from '@/components/editor/toolbar/EditorToolbar';
// 🚀 PREVIEW SYSTEM
import { PreviewNavigation } from '@/components/preview/PreviewNavigation';
import { PreviewToggleButton } from '@/components/preview/PreviewToggleButton';
import { PreviewProvider } from '@/contexts/PreviewContext';
// 🎯 QUIZ 21 STEPS SYSTEM
import { Quiz21StepsNavigation } from '@/components/quiz/Quiz21StepsNavigation';
import { Quiz21StepsProvider } from '@/components/quiz/Quiz21StepsProvider';
// 🆕 NOVO PAINEL DE PROPRIEDADES (AGORA PADRÃO)
import { PropertiesPanel } from '@/components/editor/properties/PropertiesPanel';

// Context & Hooks
import { EditorProvider, useEditor } from '@/context/EditorContext';
import { EditorQuizProvider } from '@/context/EditorQuizContext';
import { FunnelsProvider } from '@/context/FunnelsContext';
import { useAutoSaveWithDebounce } from '@/hooks/editor/useAutoSaveWithDebounce';
import { toast } from '@/hooks/use-toast';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useSyncedScroll } from '@/hooks/useSyncedScroll';
import { saveEditor } from '@/services/editorService';
import { useLocation } from 'wouter';
import { cn } from '@/lib/utils';

/**
 * Editor Fixed - Versão Corrigida do Editor Principal
 *
 * Editor de funil com drag & drop completo, incluindo:
 * - Layout de 4 colunas responsivo
 * - Sistema avançado de drag & drop
 * - Painel universal de propriedades
 * - Atalhos de teclado e histórico de mudanças
 * - Preview mode e viewport responsivo
 * - Sistema de ativação automática de 21 etapas
 * - 🆕 AUTO-SAVE IMPLEMENTADO COM FEEDBACK
 * 🚀 SISTEMA DE PREVIEW INTEGRADO
 */
const EditorFixedPageWithDragDrop: React.FC = () => {
  // Navigation hook
  const [, setLocation] = useLocation();

  // Hooks para funcionalidades avançadas
  const { scrollRef } = useSyncedScroll({ source: 'canvas' });

  // Estado local
  const [showFunnelSettings, setShowFunnelSettings] = useState(false);
  const [showSaveTemplateModal, setShowSaveTemplateModal] = useState(false);

  // Editor Context - Estado centralizado do editor
  const {
    activeStageId,
    selectedBlockId,
    blockActions: { setSelectedBlockId, deleteBlock, updateBlock },
    uiState: { isPreviewing, setIsPreviewing, viewportSize },
    computed: { currentBlocks, selectedBlock },
  } = useEditor();

  // 🆕 AUTO-SAVE COM DEBOUNCE - Implementação do salvamento automático
  useAutoSaveWithDebounce({
    data: {
      blocks: currentBlocks,
      activeStageId,
      funnelId: `editor-${Date.now()}`,
      timestamp: Date.now(),
    },
    onSave: async data => {
      try {
        console.log('🔄 Auto-save ativado:', data);
        await saveEditor(data, false); // false = não mostrar toast para auto-save
        console.log('✅ Auto-save realizado com sucesso');
      } catch (error) {
        console.warn('⚠️ Auto-save: Erro:', error);
      }
    },
    delay: 3000, // 3 segundos após última alteração
    enabled: true, // Sempre ativo
    showToasts: false, // Não mostrar toast para auto-save (só para manual)
  });

  // Configuração de viewport responsivo
  const getCanvasClassName = () => {
    const baseClasses =
      'transition-all duration-500 ease-out mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl shadow-stone-200/40 border border-stone-200/30 ring-1 ring-stone-100/20';

    switch (viewportSize) {
      case 'sm':
        return `${baseClasses} w-[375px] min-h-[600px]`;
      case 'md':
        return `${baseClasses} w-[768px] min-h-[1024px]`;
      case 'lg':
        return `${baseClasses} w-[1200px] min-h-[1024px]`;
      case 'full':
      default:
        return `${baseClasses} w-full min-h-full`;
    }
  };

  const handleDeleteBlock = (blockId: string) => {
    if (window.confirm('Tem certeza que deseja deletar este bloco?')) {
      deleteBlock(blockId);
      setSelectedBlockId(null);
    }
  };

  const handleStageSelect = (_stageId: string) => {
    // O EditorContext já gerencia internamente
  };

  // Configurar atalhos de teclado
  useKeyboardShortcuts({
    onDelete: () => {
      if (selectedBlockId) {
        handleDeleteBlock(selectedBlockId);
      }
    },
    hasSelectedBlock: !!selectedBlockId,
  });

  return (
    <PreviewProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#FAF9F7] via-[#F5F2E9] to-[#EEEBE1]">
        {/* 🚀 TOOLBAR PRINCIPAL - Versão simplificada integrada */}
        <EditorToolbar />

        {/* 🎯 LAYOUT PRINCIPAL */}
        <FourColumnLayout
          stagesPanel={
            <div className="flex flex-col h-full gap-4">
              {/* Estágios do funil */}
              <FunnelStagesPanel onStageSelect={handleStageSelect} />
            </div>
          }
          componentsPanel={<CombinedComponentsPanel />}
          canvas={
            <>
              {/* 📱 PREVIEW NAVIGATION - Sistema de Navegação do Preview */}
              {isPreviewing && <PreviewNavigation />}

              {/* 🎯 QUIZ 21 STEPS NAVIGATION - Navegação das 21 Etapas (quando não estiver em preview) */}
              {!isPreviewing && (
                <Quiz21StepsNavigation
                  position="sticky"
                  variant="full"
                  showProgress={true}
                  showControls={true}
                />
              )}

              {/* 🎨 CANVAS PRINCIPAL - Sistema de Drop Zone */}
              <div className="flex-1 overflow-auto">
                <div
                  ref={scrollRef}
                  className="min-h-full p-8 relative"
                  style={{ backgroundColor: 'transparent' }}
                >
                  <div className={getCanvasClassName()}>
                    <CanvasDropZone
                      blocks={currentBlocks}
                      selectedBlockId={selectedBlockId}
                      onSelectBlock={setSelectedBlockId}
                      onUpdateBlock={updateBlock}
                      onDeleteBlock={handleDeleteBlock}
                    />
                  </div>

                  {/* 🎮 PREVIEW TOGGLE - Botão flutuante para alternar preview */}
                  <PreviewToggleButton />
                </div>
              </div>
            </>
          }
          propertiesPanel={
            <PropertiesPanel
              selectedBlock={selectedBlock}
              onUpdate={updateBlock}
              onClose={() => setSelectedBlockId(null)}
              onDelete={handleDeleteBlock}
              isPreviewMode={isPreviewing}
              onTogglePreview={() => setIsPreviewing(!isPreviewing)}
            />
          }
        />

        {/* MODAIS */}
        {showFunnelSettings && (
          <FunnelSettingsPanel
            funnelId="quiz-estilo-completo"
            isOpen={showFunnelSettings}
            onClose={() => setShowFunnelSettings(false)}
          />
        )}

        {showSaveTemplateModal && (
          <SaveTemplateModal
            isOpen={showSaveTemplateModal}
            onClose={() => setShowSaveTemplateModal(false)}
            currentBlocks={currentBlocks}
            currentFunnelId="quiz-estilo-completo"
          />
        )}
      </div>
    </PreviewProvider>
  );
};

//   EXPORT WRAPPER - Component com Preview System, FunnelsProvider e Quiz21StepsProvider
export const EditorWithPreview: React.FC = () => {
  return (
    <FunnelsProvider debug={true}>
      <EditorProvider>
        <EditorQuizProvider>
          <PreviewProvider>
            <Quiz21StepsProvider debug={true}>
              <EditorFixedPageWithDragDrop />
            </Quiz21StepsProvider>
          </PreviewProvider>
        </EditorQuizProvider>
      </EditorProvider>
    </FunnelsProvider>
  );
};

// ✅ EXPORT DEFAULT
export default EditorWithPreview;
