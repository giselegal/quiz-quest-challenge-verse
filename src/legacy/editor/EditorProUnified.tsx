/**
 * 🎯 EDITOR PRO SIMPLIFIED - Versão Unificada
 * 
 * Versão do EditorPro que usa exclusivamente o EditorUnifiedProvider,
 * eliminando toda a complexidade de providers aninhados e conflitos de estado.
 * 
 * MUDANÇAS PRINCIPAIS:
 * ❌ Removido: Dependência de 7 providers diferentes
 * ❌ Removido: Event listeners duplicados  
 * ❌ Removido: Estados conflitantes para currentStep
 * ❌ Removido: Lógica de adaptação entre providers
 * ✅ Adicionado: Uso direto do EditorUnifiedProvider
 * ✅ Adicionado: Single source of truth para todos os dados
 * ✅ Adicionado: Performance otimizada
 */

import React, { useCallback, useMemo } from 'react';
import { useEditorUnified } from '@/context/EditorUnifiedProvider';
import { StepDndProvider } from '@/components/editor/dnd/StepDndProvider';
import CanvasAreaLayout from '@/components/editor/layouts/CanvasArea';
import { FunnelHeader } from '@/components/editor/FunnelHeader';
import { useRenderCount } from '@/hooks/useRenderCount';
import { mark } from '@/utils/perf';
import { logger } from '@/utils/debugLogger';
import { createBlockFromComponent } from '@/utils/editorUtils';
import { useEditorDragAndDrop } from '@/hooks/editor/useEditorDragAndDrop';
import { availableComponents as AVAILABLE_COMPONENTS_CONFIG, type ComponentDef } from '@/components/editor/config/availableComponents';

const StepSidebar = React.lazy(() => import('@/components/editor/sidebars/StepSidebar'));
const ComponentsSidebar = React.lazy(() => import('@/components/editor/sidebars/ComponentsSidebar'));
const PropertiesColumn = React.lazy(() => import('@/components/editor/properties/PropertiesColumn'));

// ============================================================================
// INTERFACES
// ============================================================================

interface EditorProUnifiedProps {
    className?: string;
}

interface StepAnalysis {
    icon: string;
    label: string;
    desc: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// Helper para análise das etapas (copiado da versão original)
const getStepAnalysis = (step: number): StepAnalysis => {
    if (step === 1) return { icon: 'note', label: 'Captura', desc: 'Nome do usuário' };
    if (step >= 2 && step <= 11) return { icon: 'target', label: 'Questão', desc: 'Pontuação de estilo' };
    if (step === 12) return { icon: 'refresh', label: 'Transição', desc: 'Para estratégicas' };
    if (step >= 13 && step <= 18) return { icon: 'chart', label: 'Estratégica', desc: 'Tracking sem pontuação' };
    if (step === 19) return { icon: 'hourglass', label: 'Calculando', desc: 'Processamento' };
    if (step === 20) return { icon: 'confetti', label: 'Resultado', desc: 'Estilo personalizado' };
    if (step === 21) return { icon: 'money', label: 'Oferta', desc: 'CTA de conversão' };
    return { icon: 'question', label: 'Indefinida', desc: 'Não mapeada' };
};

// Helper simplificado para renderizar ícones
const renderIcon = (name: string, className = 'w-4 h-4') => {
    const common = { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' };

    // Ícones mais comuns (versão simplificada)
    switch (name) {
        case 'note':
            return <svg {...common}><path strokeWidth={2} d="M4 6h9l5 5v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" /></svg>;
        case 'target':
            return <svg {...common}><circle cx="12" cy="12" r="9" strokeWidth={2} /><circle cx="12" cy="12" r="3" strokeWidth={2} /></svg>;
        case 'refresh':
            return <svg {...common}><path strokeWidth={2} d="M4 4v6h6M20 20v-6h-6M5 19A9 9 0 1019 5" /></svg>;
        case 'chart':
            return <svg {...common}><path strokeWidth={2} d="M4 19h16M7 17V9M12 17V5M17 17v-7" /></svg>;
        case 'hourglass':
            return <svg {...common}><path strokeWidth={2} d="M6 4h12M6 20h12M8 6h8l-3 4 3 4H8l3-4-3-4z" /></svg>;
        case 'confetti':
            return <svg {...common}><path strokeWidth={2} d="M3 20l5-14 6 6-14 8z" /></svg>;
        case 'money':
            return <svg {...common}><rect x="4" y="7" width="16" height="10" rx="2" strokeWidth={2} /><circle cx="12" cy="12" r="2.5" strokeWidth={2} /></svg>;
        default:
            return <svg {...common}><circle cx="12" cy="12" r="9" strokeWidth={2} /></svg>;
    }
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const EditorProUnified: React.FC<EditorProUnifiedProps> = ({
    className = ''
}) => {
    useRenderCount('EditorProUnified');
    mark('EditorProUnified:render:start');

    // ========================================================================
    // UNIFIED STATE & ACTIONS
    // ========================================================================

    const { state, actions } = useEditorUnified();
    const [previewDevice, setPreviewDevice] = React.useState<'desktop' | 'tablet' | 'mobile' | 'xl'>('desktop');

    // ========================================================================
    // COMPUTED VALUES
    // ========================================================================

    const currentStepKey = useMemo(
        () => `step-${state.currentStep}`,
        [state.currentStep]
    );

    const currentStepData = useMemo(() => {
        const blocks = state.stepBlocks[currentStepKey] || [];
        logger.debug('🔍 EditorProUnified currentStepData:', {
            step: state.currentStep,
            stepKey: currentStepKey,
            blocksFound: blocks.length,
            blockTypes: blocks.map(b => b.type)
        });
        return blocks;
    }, [state.stepBlocks, currentStepKey, state.currentStep]);

    const stepHasBlocks = useMemo(() => {
        const map: Record<number, boolean> = {};
        for (let i = 1; i <= 21; i++) {
            const stepKey = `step-${i}`;
            const blocks = state.stepBlocks[stepKey] || [];
            map[i] = blocks.length > 0;
        }
        return map;
    }, [state.stepBlocks]);

    const availableComponents = useMemo<ComponentDef[]>(
        () => AVAILABLE_COMPONENTS_CONFIG,
        []
    );

    const groupedComponents = useMemo(
        () => availableComponents.reduce<Record<string, ComponentDef[]>>((acc, c) => {
            const cat = c.category;
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(c);
            return acc;
        }, {}),
        [availableComponents]
    );

    // ========================================================================
    // DRAG & DROP
    // ========================================================================

    const { isDragging, handleDragStart, handleDragEnd } = useEditorDragAndDrop({
        currentStepData: currentStepData as any,
        currentStepKey: currentStepKey,
        actions: {
            addBlockAtIndex: (stepKey: string, block: any, index: number) => {
                actions.addBlock(stepKey, block, index);
            }
        } as any,
        notification: {
            success: (msg: string) => logger.info(msg),
            error: (msg: string) => logger.error(msg)
        } as any,
    });

    // ========================================================================
    // EVENT HANDLERS
    // ========================================================================

    const handleStepSelect = useCallback((step: number) => {
        actions.goToStep(step);
    }, [actions]);

    const handleDuplicateSelected = useCallback(() => {
        const selectedBlock = currentStepData.find(block => block.id === state.selectedBlockId);
        if (!selectedBlock) return;

        const clone = {
            ...selectedBlock,
            id: `${selectedBlock.id}-copy-${Math.random().toString(36).slice(2, 7)}`,
        };

        const idx = currentStepData.findIndex(b => b.id === selectedBlock.id);
        actions.addBlock(currentStepKey, clone, idx + 1);
        actions.setSelectedBlockId(clone.id);
    }, [currentStepData, state.selectedBlockId, currentStepKey, actions]);

    const handleResetSelected = useCallback(() => {
        const selectedBlock = currentStepData.find(block => block.id === state.selectedBlockId);
        if (!selectedBlock) return;

        actions.updateBlock(currentStepKey, selectedBlock.id, { properties: {} });
    }, [currentStepData, state.selectedBlockId, currentStepKey, actions]);

    // ========================================================================
    // MEMOIZED COMPONENTS
    // ========================================================================

    const MemoPropertiesColumn = React.memo(() => {
        const selectedBlock = currentStepData.find(block => block.id === state.selectedBlockId);
        return (
            <PropertiesColumn
                selectedBlock={selectedBlock as any}
                onUpdate={(updates: Record<string, any>) =>
                    selectedBlock ? actions.updateBlock(currentStepKey, selectedBlock.id, updates) : undefined
                }
                onClose={() => actions.setSelectedBlockId(null)}
                onDelete={() => selectedBlock ? actions.removeBlock(currentStepKey, selectedBlock.id) : undefined}
                onDuplicate={handleDuplicateSelected}
                onReset={handleResetSelected}
                previewMode={previewDevice as 'desktop' | 'tablet' | 'mobile'}
                onPreviewModeChange={setPreviewDevice}
                className="!w-full !h-full bg-gray-900"
            />
        );
    });

    // ========================================================================
    // LOADING STATE
    // ========================================================================

    if (state.isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando editor...</p>
                </div>
            </div>
        );
    }

    // ========================================================================
    // ERROR STATE
    // ========================================================================

    if (state.error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md mx-auto text-center p-6 bg-white rounded-lg shadow-lg border border-red-200">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Erro no Editor</h2>
                    <p className="text-gray-600 mb-4">{state.error}</p>
                    <button
                        onClick={actions.retry}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    // ========================================================================
    // MAIN RENDER
    // ========================================================================

    return (
        <>
            {/* Header do Funil */}
            <FunnelHeader
                viewportMode={previewDevice}
                onViewportModeChange={setPreviewDevice}
            />

            <StepDndProvider
                stepNumber={state.currentStep}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className={`editor-pro-unified h-[calc(100vh-80px)] bg-gray-100 flex overflow-hidden max-w-screen ${className} relative`}>

                    {/* 📱 MOBILE OVERLAYS */}
                    <div className="lg:hidden">
                        {/* Mobile Navigation Overlay */}
                        <div id="mobile-nav-overlay" className="mobile-overlay mobile-nav-overlay">
                            <div className="mobile-overlay-header">
                                <h3>Navegação</h3>
                                <button
                                    onClick={() => {
                                        const overlay = document.getElementById('mobile-nav-overlay');
                                        if (overlay) overlay.classList.remove('show');
                                    }}
                                    className="mobile-overlay-close"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="mobile-overlay-content">
                                <React.Suspense fallback={<div className="p-4">Loading steps…</div>}>
                                    <StepSidebar
                                        currentStep={state.currentStep}
                                        totalSteps={21}
                                        stepHasBlocks={stepHasBlocks}
                                        stepValidation={state.stepValidation}
                                        onSelectStep={(step) => {
                                            handleStepSelect(step);
                                            const overlay = document.getElementById('mobile-nav-overlay');
                                            if (overlay) overlay.classList.remove('show');
                                        }}
                                        getStepAnalysis={getStepAnalysis as any}
                                        renderIcon={renderIcon as any}
                                        className="bg-gray-900"
                                    />
                                </React.Suspense>
                                <React.Suspense fallback={<div className="p-4">Loading library…</div>}>
                                    <ComponentsSidebar
                                        groupedComponents={groupedComponents as any}
                                        renderIcon={renderIcon as any}
                                        className="bg-gray-900 mt-4"
                                    />
                                </React.Suspense>
                            </div>
                        </div>

                        {/* Mobile Properties Overlay */}
                        <div id="mobile-props-overlay" className="mobile-overlay mobile-props-overlay">
                            <div className="mobile-overlay-header">
                                <h3>Propriedades</h3>
                                <button
                                    onClick={() => {
                                        const overlay = document.getElementById('mobile-props-overlay');
                                        if (overlay) overlay.classList.remove('show');
                                    }}
                                    className="mobile-overlay-close"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="mobile-overlay-content">
                                <React.Suspense fallback={<div className="p-4">Properties…</div>}>
                                    <MemoPropertiesColumn />
                                </React.Suspense>
                            </div>
                        </div>
                    </div>

                    {/* 📱 MOBILE ACTION BUTTONS */}
                    <div className="lg:hidden fixed bottom-4 left-4 right-4 flex justify-between z-40">
                        <button
                            onClick={() => {
                                const overlay = document.getElementById('mobile-nav-overlay');
                                if (overlay) overlay.classList.add('show');
                            }}
                            className="mobile-action-btn bg-blue-600"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <span className="text-xs">Menu</span>
                        </button>

                        <button
                            onClick={() => {
                                const overlay = document.getElementById('mobile-props-overlay');
                                if (overlay) overlay.classList.add('show');
                            }}
                            className="mobile-action-btn bg-green-600"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                            </svg>
                            <span className="text-xs">Props</span>
                        </button>
                    </div>

                    {/* DESKTOP LAYOUT - 3 colunas otimizadas */}
                    {/* 1) Sidebar Navegação Compacta - 280px fixo */}
                    <div className="hidden lg:block w-[280px] min-w-[280px] max-w-[280px] bg-gray-900 border-r border-gray-800/50 flex flex-col">
                        {/* Painel de Etapas */}
                        <div className="flex-shrink-0 h-[300px] border-b border-gray-800/50">
                            <React.Suspense fallback={<div className="p-4">Loading steps…</div>}>
                                <StepSidebar
                                    currentStep={state.currentStep}
                                    totalSteps={21}
                                    stepHasBlocks={stepHasBlocks}
                                    stepValidation={state.stepValidation}
                                    onSelectStep={handleStepSelect}
                                    getStepAnalysis={getStepAnalysis as any}
                                    renderIcon={renderIcon as any}
                                    className="!w-full bg-transparent h-full"
                                />
                            </React.Suspense>
                        </div>

                        {/* Painel de Componentes */}
                        <div className="flex-1 overflow-y-auto">
                            <React.Suspense fallback={<div className="p-4">Loading library…</div>}>
                                <ComponentsSidebar
                                    groupedComponents={groupedComponents as any}
                                    renderIcon={renderIcon as any}
                                    className="!w-full bg-transparent"
                                />
                            </React.Suspense>
                        </div>
                    </div>

                    {/* 2) Canvas Principal - Área flexível */}
                    <div className="w-full lg:flex-1 min-w-0 bg-gray-50">
                        <CanvasAreaLayout
                            className="h-full"
                            containerRef={React.createRef()}
                            mode="edit"
                            setMode={() => { }}
                            previewDevice={previewDevice}
                            setPreviewDevice={setPreviewDevice}
                            safeCurrentStep={state.currentStep}
                            currentStepKey={currentStepKey}
                            currentStepData={currentStepData as any}
                            selectedBlockId={state.selectedBlockId}
                            actions={actions as any}
                            state={state as any}
                            notification={{
                                success: (msg: string) => logger.info(msg),
                                error: (msg: string) => logger.error(msg)
                            } as any}
                            renderIcon={renderIcon as any}
                            getStepAnalysis={getStepAnalysis as any}
                            isDragging={isDragging}
                        />
                    </div>

                    {/* 3) Painel de Propriedades - 320px fixo */}
                    <div className="hidden lg:block w-[320px] min-w-[320px] max-w-[320px] bg-gray-900 border-l border-gray-800/50">
                        <React.Suspense fallback={<div className="p-4">Properties…</div>}>
                            <MemoPropertiesColumn />
                        </React.Suspense>
                    </div>
                </div>
            </StepDndProvider>

            {mark('EditorProUnified:render:end')}
        </>
    );
};

export default EditorProUnified;