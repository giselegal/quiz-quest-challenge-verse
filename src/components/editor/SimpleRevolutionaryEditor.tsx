import React, { useState, useRef, useCallback, useMemo } from 'react';
import { useEditor } from '@/components/editor/EditorProvider';
import { PerformanceMonitor } from './PerformanceMonitor';
import { UsabilityTester } from './UsabilityTester';
import { AutoOptimizer } from './AutoOptimizer';
import { TemplateGallery, Template } from './TemplateGallery';
import { QuickCloneModal } from './QuickCloneModal';
import { AutoSaveManager } from './AutoSaveManager';
import { useHistory, HistoryPanel, useHistoryShortcuts } from './HistoryManagerSimple';
import { useCollaboration, CollaborationPanel, CursorOverlay, useMouseTracking } from './CollaborationManager';

// Adaptador para converter stepBlocks em format de stages
const convertStepBlocksToStages = (stepBlocks: Record<string, any[]>) => {
    return Object.entries(stepBlocks).map(([stepKey, blocks]) => {
        const stepNumber = parseInt(stepKey.replace('step-', ''));
        return {
            id: stepKey,
            name: `Etapa ${stepNumber}`,
            blocks: blocks || []
        };
    });
};

export const SimpleRevolutionaryEditor: React.FC = () => {
    const [editorMode, setEditorMode] = useState<'visual' | 'preview'>('visual');
    const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);
    const [showUsabilityTester, setShowUsabilityTester] = useState(false);
    const [showAutoOptimizer, setShowAutoOptimizer] = useState(false);
    const [showTemplateGallery, setShowTemplateGallery] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [showCloneModal, setShowCloneModal] = useState(false);

    // 🚨 TESTE HOT RELOAD - FUNCIONA! Editor carregado em: ${new Date().toLocaleTimeString()}
    console.log('🔥 HOT RELOAD FUNCIONANDO PERFEITAMENTE! - Editor carregado em:', new Date().toLocaleTimeString());

    // Productivity features states
    const [showHistoryPanel, setShowHistoryPanel] = useState(false);
    const [showCollaborationPanel, setShowCollaborationPanel] = useState(false);
    const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

    const editorRef = useRef<HTMLDivElement>(null);

    // Use the EditorProvider context instead of useUnifiedEditor
    const { state, actions } = useEditor();
    const { stepBlocks, currentStep, selectedBlockId } = state;
    const { addBlock, updateBlock, setCurrentStep, setSelectedBlockId } = actions;

    // Convert stepBlocks to stages format for display
    const stages = useMemo(() => convertStepBlocksToStages(stepBlocks || {}), [stepBlocks]);
    
    // Mock data for compatibility with existing UI
    const funnel = useMemo(() => ({
        id: 'quiz21-steps-complete',
        name: 'Quiz 21 Etapas',
        stages: stages
    }), [stages]);

    const isLoading = false;
    const activeStageId = `step-${currentStep}`;
    const selectedBlock = selectedBlockId ? stages.flatMap(s => s.blocks).find(b => b.id === selectedBlockId) : null;

    const setSelectedBlock = useCallback((blockId: string) => {
        setSelectedBlockId(blockId);
    }, [setSelectedBlockId]);

    // Auto-save hook
    const autoSave = useCallback(async () => {
        if (funnel && autoSaveEnabled) {
            console.log('Auto-saving funnel:', funnel.id);
            // Here you would call your save API
            // Return void as expected by AutoSaveManager
        }
    }, [funnel, autoSaveEnabled]);

    // History management
    const history = useHistory(funnel || {}, { enabled: true, maxEntries: 50 });

    // Collaboration
    const collaboration = useCollaboration({
        enabled: true,
        showCursors: true,
        mockMode: true
    });

    // Handle funnel state restoration from history
    const handleRestoreState = useCallback((restoredFunnel: any) => {
        console.log('Restoring funnel state:', restoredFunnel);
        // Here you would update the funnel state with the restored version
        // For now, just log it
    }, []);

    // History keyboard shortcuts
    useHistoryShortcuts(history, handleRestoreState);

    // Mouse tracking for collaboration
    useMouseTracking(collaboration, editorRef);

    // Update history when funnel changes
    React.useEffect(() => {
        if (funnel && history) {
            history.addEntry(funnel, 'edit', 'Funil atualizado');
        }
    }, [funnel, history]);

    // Handle template selection
    const handleTemplateSelect = (template: Template) => {
        setSelectedTemplate(template);
        setShowTemplateGallery(false);
        setShowCloneModal(true);
    };

    // Handle template cloning
    const handleTemplateClone = async (template: Template, customizations: any) => {
        console.log('Cloning template:', template.name, 'with customizations:', customizations);
        // Here you would integrate with your funnel creation logic
        // For now, just show success
        alert(`Template "${template.name}" clonado com sucesso! 🎉`);

        // Add to history
        if (history) {
            history.addEntry(funnel, 'import', `Template ${template.name} aplicado`);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando editor revolucionário...</p>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={editorRef}
            className="flex h-screen bg-gray-100 overflow-hidden"
        >
            {/* Sidebar Simplificada */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="font-bold text-lg text-gray-900">🎨 Componentes</h2>
                    <p className="text-sm text-gray-600">Arraste para adicionar</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { type: 'quiz-question', label: '❓ Pergunta', color: 'bg-blue-50' },
                            { type: 'text-block', label: '📝 Texto', color: 'bg-green-50' },
                            { type: 'image-block', label: '🖼️ Imagem', color: 'bg-purple-50' },
                            { type: 'button-block', label: '🔘 Botão', color: 'bg-orange-50' },
                            { type: 'form-block', label: '📋 Formulário', color: 'bg-yellow-50' },
                            { type: 'video-block', label: '🎥 Vídeo', color: 'bg-red-50' }
                        ].map((component) => (
                            <button
                                key={component.type}
                                onClick={async () => {
                                    if (activeStageId) {
                                        try {
                                            const newBlock = {
                                                id: `block-${Date.now()}`,
                                                type: component.type as any, // Type assertion for now
                                                order: 0,
                                                content: {},
                                                properties: {}
                                            };
                                            await addBlock(activeStageId, newBlock);
                                            setSelectedBlock(newBlock.id);
                                        } catch (error) {
                                            console.error('Erro ao adicionar componente:', error);
                                        }
                                    }
                                }}
                                className={`${component.color} p-3 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all text-sm font-medium text-gray-700 hover:text-blue-700`}
                            >
                                {component.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Área Principal */}
            <div className="flex-1 flex flex-col">
                {/* Toolbar */}
                <div className="bg-white border-b border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h1 className="font-bold text-xl text-gray-900">✨ Editor Revolucionário</h1>

                            {/* Mode Switcher */}
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setEditorMode('visual')}
                                    className={`px-4 py-2 rounded text-sm font-medium transition ${editorMode === 'visual'
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    ✏️ Visual
                                </button>
                                <button
                                    onClick={() => setEditorMode('preview')}
                                    className={`px-4 py-2 rounded text-sm font-medium transition ${editorMode === 'preview'
                                        ? 'bg-white text-green-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    👁️ Preview
                                </button>
                            </div>

                            {/* Template Gallery Button */}
                            <button
                                onClick={() => setShowTemplateGallery(true)}
                                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg text-sm font-medium transition shadow-sm"
                            >
                                🎨 Templates
                            </button>

                            {/* Productivity Features */}
                            <button
                                onClick={() => setShowHistoryPanel(!showHistoryPanel)}
                                className="px-3 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg text-sm font-medium transition"
                                title="Histórico (Ctrl+Z/Y)"
                            >
                                📜 Histórico
                            </button>

                            <button
                                onClick={() => setShowCollaborationPanel(!showCollaborationPanel)}
                                className="px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-sm font-medium transition"
                            >
                                👥 Colaboração
                            </button>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-3">
                            {/* Auto-save Status */}
                            <AutoSaveManager
                                data={funnel}
                                onSave={autoSave}
                                config={{ enabled: autoSaveEnabled }}
                            />

                            {/* Debug Controls */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowAutoOptimizer(!showAutoOptimizer)}
                                    className={`px-3 py-1 rounded text-xs font-medium transition ${showAutoOptimizer
                                        ? 'bg-purple-100 text-purple-700'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    title="Auto Otimizador"
                                >
                                    🔧
                                </button>
                                <button
                                    onClick={() => setShowPerformanceMonitor(!showPerformanceMonitor)}
                                    className={`px-3 py-1 rounded text-xs font-medium transition ${showPerformanceMonitor
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    title="Monitor de Performance"
                                >
                                    📊
                                </button>
                                <button
                                    onClick={() => setShowUsabilityTester(!showUsabilityTester)}
                                    className={`px-3 py-1 rounded text-xs font-medium transition ${showUsabilityTester
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    title="Teste de Usabilidade"
                                >
                                    🧪
                                </button>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span>Online</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    {funnel && (
                        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                            <span className="text-sm text-gray-600">
                                🎯 {funnel.stages?.length || 0} etapas
                            </span>
                            <span className="text-sm text-gray-600">
                                🧩 {funnel.stages?.reduce((total: number, stage: any) => total + (stage.blocks?.length || 0), 0) || 0} blocos
                            </span>
                            {selectedBlock && (
                                <span className="text-sm text-blue-600 font-medium">
                                    🔧 Editando: {selectedBlock.type.replace('-', ' ')}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Canvas */}
                <div className="flex-1 bg-gray-50 p-8">
                    <div className="max-w-4xl mx-auto">
                        {editorMode === 'visual' && (
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    📋 Canvas de Edição
                                </h3>

                                {funnel?.stages?.map((stage: any, index: number) => (
                                    <div
                                        key={stage.id}
                                        className={`border-2 rounded-lg p-4 mb-4 transition-all ${stage.id === activeStageId
                                            ? 'border-blue-400 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <h4 className="font-medium text-gray-900 mb-3">
                                            {index + 1}. {stage.name || `Etapa ${index + 1}`}
                                        </h4>

                                        <div className="space-y-2">
                                            {stage.blocks?.map((block: any, blockIndex: number) => (
                                                <div
                                                    key={block.id}
                                                    onClick={() => setSelectedBlock(block.id)}
                                                    className={`p-3 border rounded-lg cursor-pointer transition-all ${block.id === selectedBlockId
                                                        ? 'border-blue-400 bg-blue-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {blockIndex + 1}. {block.type.replace('-', ' ')}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {block.id.slice(0, 8)}...
                                                        </span>
                                                    </div>

                                                    {(selectedBlock as any).content && (
                                                        <p className="text-xs text-gray-600 mt-1 truncate">
                                                            {JSON.stringify((selectedBlock as any).content).slice(0, 100)}...
                                                        </p>
                                                    )}
                                                </div>
                                            )) || (
                                                    <p className="text-gray-500 text-sm italic">
                                                        Nenhum bloco nesta etapa. Adicione componentes da sidebar.
                                                    </p>
                                                )}
                                        </div>
                                    </div>
                                )) || (
                                        <div className="text-center py-12">
                                            <p className="text-gray-500">Carregando funil...</p>
                                        </div>
                                    )}
                            </div>
                        )}

                        {editorMode === 'preview' && (
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    👁️ Visualização
                                </h3>
                                <div className="bg-gray-50 rounded-lg p-8 text-center">
                                    <p className="text-gray-600">
                                        Preview será implementado com renderização real dos componentes
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Properties Panel */}
            {selectedBlock && (
                <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">🔧 Propriedades</h3>
                        <p className="text-sm text-gray-600">{selectedBlock.type.replace('-', ' ')}</p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    ID do Bloco
                                </label>
                                <input
                                    type="text"
                                    value={selectedBlock.id}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tipo
                                </label>
                                <input
                                    type="text"
                                    value={selectedBlock.type}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Conteúdo (JSON)
                                </label>
                                <textarea
                                    value={JSON.stringify((selectedBlock as any).content || {}, null, 2)}
                                    onChange={async (e) => {
                                        try {
                                            const newContent = JSON.parse(e.target.value);
                                            await updateBlock(activeStageId, selectedBlock.id, { content: newContent });
                                        } catch (error) {
                                            console.error('JSON inválido:', error);
                                        }
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono h-40 resize-none"
                                    placeholder="{ }"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Auto Optimizer */}
            <AutoOptimizer
                isVisible={showAutoOptimizer}
                onOptimizationComplete={(results) => {
                    console.log('Optimization results:', results);
                }}
            />

            {/* Performance Monitor */}
            <PerformanceMonitor
                isVisible={showPerformanceMonitor}
                onMetricsUpdate={(metrics) => {
                    console.log('Performance metrics:', metrics);
                }}
            />

            {/* Usability Tester */}
            <UsabilityTester
                isVisible={showUsabilityTester}
                onTestComplete={(result) => {
                    console.log('Usability test result:', result);
                }}
            />

            {/* Template Gallery */}
            <TemplateGallery
                isVisible={showTemplateGallery}
                onTemplateSelect={handleTemplateSelect}
                onClose={() => setShowTemplateGallery(false)}
            />

            {/* Quick Clone Modal */}
            <QuickCloneModal
                template={selectedTemplate}
                isVisible={showCloneModal}
                onClose={() => {
                    setShowCloneModal(false);
                    setSelectedTemplate(null);
                }}
                onClone={handleTemplateClone}
            />

            {/* History Panel */}
            <HistoryPanel
                isVisible={showHistoryPanel}
                onClose={() => setShowHistoryPanel(false)}
            />

            {/* Collaboration Panel */}
            <CollaborationPanel
                collaboration={collaboration}
                isVisible={showCollaborationPanel}
                onClose={() => setShowCollaborationPanel(false)}
            />

            {/* Cursor Overlay for Collaboration */}
            <CursorOverlay
                collaboration={collaboration}
                containerRef={editorRef}
            />
        </div>
    );
};

export default SimpleRevolutionaryEditor;