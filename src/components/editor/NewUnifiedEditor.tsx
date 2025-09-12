import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Save, History, BookTemplate, FileDown } from 'lucide-react';
import { CombinedComponentsPanel } from './CombinedComponentsPanel';
import { useEditorHistory, useHistoryShortcuts } from '@/hooks/useEditorHistory';
import { HistoryPanel, HistoryToolbar } from './history/HistoryPanel';
import { createBlockActions, createStepActions, createQuizActions } from '@/utils/editorActions';
import { TemplateGallery, Template } from './TemplateGallery';
import { ExportImportModal } from './ExportImportModal';
import { LoadingButton, InlineLoading } from '@/components/ui/LoadingComponents';
import { useToast } from '@/components/ui/ToastSystem';
import { useCelebrationContext } from '@/components/ui/CelebrationSystem';
import { convertTemplateToFunnel } from '@/utils/templateConverter';

interface UnifiedEditorProps {
    quiz?: any;
    onQuizUpdate?: (quiz: any) => void;
    quickSave?: () => void;
}

export const NewUnifiedEditor: React.FC<UnifiedEditorProps> = ({
    quiz: initialQuiz,
    onQuizUpdate,
    quickSave
}) => {
    const [, setLocation] = useLocation();

    const initialData = initialQuiz || {
        title: 'Novo Quiz',
        stages: [{
            id: 'step-1',
            name: 'Etapa 1',
            blocks: []
        }]
    };

    // Sistema de histórico
    const {
        currentData: quiz,
        setCurrentData: setQuiz,
        addHistoryEntry,
        undo,
        redo,
        goToEntry,
        clearHistory,
        historyEntries,
        currentIndex,
        canUndo,
        canRedo,
        historyStats
    } = useEditorHistory(initialData, {
        maxHistorySize: 50,
        persistToStorage: true,
        storageKey: 'quiz-editor-history',
        onUndo: (entry) => {
            console.log('🔙 Undo:', entry.description);
        },
        onRedo: (entry) => {
            console.log('🔜 Redo:', entry.description);
        }
    });

    // Atalhos de teclado para histórico
    useHistoryShortcuts(undo, redo);

    // Ações do editor com histórico
    const blockActions = createBlockActions(addHistoryEntry);
    const stepActions = createStepActions(addHistoryEntry);
    const quizActions = createQuizActions(addHistoryEntry);

    // Estados locais
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [showHistoryPanel, setShowHistoryPanel] = useState(false);
    const [showTemplateGallery, setShowTemplateGallery] = useState(false);
    const [showExportImportModal, setShowExportImportModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Toast system
    const toast = useToast();
    const { celebrate } = useCelebrationContext();

    // Atualizar quiz quando props mudarem
    useEffect(() => {
        if (initialQuiz && JSON.stringify(initialQuiz) !== JSON.stringify(quiz)) {
            setQuiz(initialQuiz);
        }
    }, [initialQuiz, quiz, setQuiz]);

    // Sincronizar com callback externo
    useEffect(() => {
        onQuizUpdate?.(quiz);
    }, [quiz, onQuizUpdate]);

    // Handle template selection
    const handleTemplateSelect = (template: Template) => {
        try {
            // Show loading toast
            toast.info('Aplicando template...', 'Por favor aguarde');

            let newQuiz;

            // Use conversion for specific templates like quiz21StepsComplete
            if (template.id === 'quiz21StepsComplete' || template.id.includes('quiz21Steps')) {
                console.log('🔄 Usando conversão específica para template:', template.id);
                const convertedFunnel = convertTemplateToFunnel(template.id);

                newQuiz = {
                    id: convertedFunnel.id,
                    title: convertedFunnel.title,
                    description: convertedFunnel.description,
                    stages: convertedFunnel.stages.map(stage => ({
                        id: stage.id,
                        name: stage.name,
                        blocks: stage.blocks
                    })),
                    templateId: template.id,
                    templateName: template.name
                };

                console.log('✅ Template convertido:', {
                    stages: newQuiz.stages.length,
                    totalBlocks: newQuiz.stages.reduce((sum, stage) => sum + stage.blocks.length, 0)
                });
            } else {
                // Fallback for generic templates
                console.log('🔄 Usando conversão genérica para template:', template.id);
                newQuiz = {
                    title: template.name,
                    description: template.description,
                    stages: template.structure.stages.map((stage, index) => ({
                        id: `step-${index + 1}`,
                        name: stage.name,
                        description: stage.description,
                        blocks: stage.blocks.map((block, blockIndex) => ({
                            id: `block-${index}-${blockIndex}`,
                            type: block.type,
                            content: block.content,
                            style: block.style,
                            config: block.config
                        }))
                    })),
                    settings: template.structure.settings,
                    templateId: template.id,
                    templateName: template.name
                };
            }

            // Add to history and update state
            quizActions.importTemplate(template.id, template.name, quiz, newQuiz);
            setQuiz(newQuiz);
            setShowTemplateGallery(false);

            // Success feedback with celebration
            celebrate('template-applied', {
                title: `🎨 ${template.name} Aplicado!`,
                subtitle: 'Seu quiz está ficando incrível!',
                intensity: template.premium ? 'high' : 'medium'
            });

            toast.success(
                'Template aplicado!',
                `"${template.name}" foi aplicado com sucesso`,
                {
                    actions: [
                        {
                            label: 'Desfazer',
                            onClick: () => {
                                undo();
                                toast.info('Template desfeito', 'Voltou ao estado anterior');
                            }
                        }
                    ]
                }
            );

            console.log('✅ Template aplicado:', template.name);
        } catch (error) {
            console.error('❌ Erro ao aplicar template:', error);
            setError(error instanceof Error ? error : new Error('Erro desconhecido'));
            toast.error(
                'Erro ao aplicar template',
                error instanceof Error ? error.message : 'Erro desconhecido'
            );
        }
    };    // Handle import
    const handleQuizImport = (quizData: any) => {
        try {
            toast.info('Importando quiz...', 'Processando dados');

            // Add to history and update state
            quizActions.importTemplate('imported', quizData.title || 'Quiz Importado', quiz, quizData);
            setQuiz(quizData);
            setShowExportImportModal(false);

            // Success feedback with celebration
            const isFirstQuiz = !localStorage.getItem('has_created_quiz');
            if (isFirstQuiz) {
                localStorage.setItem('has_created_quiz', 'true');
                celebrate('first-quiz', {
                    title: '🎉 Primeiro Quiz Importado!',
                    subtitle: 'Bem-vindo à família Quiz Quest!',
                    intensity: 'epic'
                });
            } else {
                celebrate('quiz-completed', {
                    title: '📥 Quiz Importado!',
                    subtitle: `"${quizData.title || 'Quiz'}" está pronto para usar`
                });
            }

            toast.success(
                'Quiz importado!',
                `"${quizData.title || 'Quiz'}" foi importado com sucesso`,
                {
                    actions: [
                        {
                            label: 'Desfazer',
                            onClick: () => {
                                undo();
                                toast.info('Importação desfeita', 'Voltou ao estado anterior');
                            }
                        }
                    ]
                }
            );

            console.log('✅ Quiz importado:', quizData.title || 'Sem título');
        } catch (error) {
            console.error('❌ Erro ao importar quiz:', error);
            setError(error instanceof Error ? error : new Error('Erro desconhecido'));
            toast.error(
                'Erro ao importar quiz',
                error instanceof Error ? error.message : 'Erro desconhecido'
            );
        }
    };

    // Handle save with loading feedback
    const handleSave = async () => {
        setIsSaving(true);

        try {
            toast.info('Salvando...', 'Aguarde um momento');

            // Simulate save operation
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Call external save if available
            if (quickSave) {
                quickSave();
            }

            // Success celebration
            celebrate('quiz-saved', {
                title: '💾 Quiz Salvo!',
                subtitle: 'Todas as alterações foram salvas',
                intensity: 'medium'
            });

            toast.success('Salvo!', 'Quiz salvo com sucesso');
        } catch (error) {
            toast.error('Erro ao salvar', error instanceof Error ? error.message : 'Erro desconhecido');
        } finally {
            setIsSaving(false);
        }
    };

    const handleStepSelect = (stepNumber: number) => {
        if (stepNumber !== currentStep) {
            const previousStep = currentStep;
            setCurrentStep(stepNumber);

            // Adicionar ao histórico se for uma mudança significativa
            if (Math.abs(stepNumber - previousStep) > 1) {
                const newData = { ...quiz, currentStep: stepNumber };
                stepActions.editStep(
                    `step-${stepNumber}`,
                    'navigation',
                    `step-${previousStep}`,
                    `step-${stepNumber}`,
                    newData
                );
            }
        }
    };

    // Exemplo de função para adicionar bloco (demonstração)
    const handleAddBlock = (blockType: string) => {
        const newBlock = {
            id: `block-${Date.now()}`,
            type: blockType,
            content: `Novo ${blockType}`,
            properties: {}
        };

        const stepId = `step-${currentStep}`;
        const updatedQuiz = {
            ...quiz,
            stages: quiz.stages.map((stage: any) =>
                stage.id === stepId
                    ? { ...stage, blocks: [...stage.blocks, newBlock] }
                    : stage
            )
        };

        setQuiz(updatedQuiz);
        blockActions.addBlock(stepId, newBlock, updatedQuiz);
    };

    // Exemplo de função para remover bloco
    const handleRemoveBlock = (blockId: string) => {
        const stepId = `step-${currentStep}`;
        const stage = quiz.stages.find((s: any) => s.id === stepId);
        const block = stage?.blocks.find((b: any) => b.id === blockId);

        if (block) {
            const updatedQuiz = {
                ...quiz,
                stages: quiz.stages.map((stage: any) =>
                    stage.id === stepId
                        ? { ...stage, blocks: stage.blocks.filter((b: any) => b.id !== blockId) }
                        : stage
                )
            };

            setQuiz(updatedQuiz);
            blockActions.removeBlock(stepId, blockId, block.type, updatedQuiz);
        }
    };

    // Componente de navegação por etapas
    const StepsNavigation = () => (
        <div className="flex flex-col h-full">
            <div className="p-3 border-b border-gray-800/50">
                <h3 className="text-sm font-semibold text-white">📝 Etapas</h3>
                <p className="text-xs text-gray-400">21 etapas total</p>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
                {Array.from({ length: 21 }, (_, i) => i + 1).map(stepNumber => (
                    <button
                        key={stepNumber}
                        onClick={() => handleStepSelect(stepNumber)}
                        className={`w-full mb-1 px-2 py-2 rounded text-xs font-medium transition-colors ${currentStep === stepNumber
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                    >
                        {stepNumber}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="h-screen w-full bg-black overflow-hidden">
            {/* Top Bar com controles de histórico */}
            <div className="h-14 bg-gray-900 border-b border-gray-800/50 flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setLocation('/dashboard')}
                        className="flex items-center gap-2 px-3 py-1.5 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">Dashboard</span>
                    </button>

                    {/* Toolbar de histórico */}
                    <div className="flex items-center gap-1 px-2 py-1 bg-gray-800 rounded">
                        <HistoryToolbar
                            canUndo={canUndo}
                            canRedo={canRedo}
                            onUndo={undo}
                            onRedo={redo}
                        />
                    </div>
                </div>

                <h1 className="text-lg font-semibold text-white">Quiz Editor</h1>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowTemplateGallery(true)}
                        className="flex items-center gap-2 px-3 py-1.5 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                        title="Galeria de Templates"
                    >
                        <BookTemplate className="w-4 h-4" />
                        <span className="text-sm">Templates</span>
                    </button>

                    <button
                        onClick={() => setShowExportImportModal(true)}
                        className="flex items-center gap-2 px-3 py-1.5 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                        title="Exportar/Importar Quiz"
                    >
                        <FileDown className="w-4 h-4" />
                        <span className="text-sm">Exportar/Importar</span>
                    </button>

                    <span className="text-xs text-gray-400 mr-2">
                        {historyEntries.length} ações
                    </span>

                    <InlineLoading
                        isLoading={isSaving}
                        message="Salvando..."
                        size="sm"
                        color="blue"
                        className="mr-2"
                    />                    <button
                        onClick={() => setShowHistoryPanel(!showHistoryPanel)}
                        className={`p-1.5 rounded transition-colors ${showHistoryPanel
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                        title="Painel de Histórico"
                    >
                        <History className="w-4 h-4" />
                    </button>

                    {quickSave && (
                        <LoadingButton
                            onClick={handleSave}
                            isLoading={isSaving}
                            loadingText="Salvando..."
                            size="sm"
                            variant="primary"
                            className="flex items-center gap-1"
                        >
                            <Save className="w-3 h-3" />
                            Salvar
                        </LoadingButton>
                    )}
                </div>
            </div>

            {/* Painel de histórico flutuante */}
            {showHistoryPanel && (
                <div className="absolute top-16 right-4 w-80 z-50">
                    <HistoryPanel
                        entries={historyEntries}
                        currentIndex={currentIndex}
                        canUndo={canUndo}
                        canRedo={canRedo}
                        onUndo={undo}
                        onRedo={redo}
                        onGoToEntry={goToEntry}
                        onClearHistory={clearHistory}
                        historyStats={historyStats}
                    />
                </div>
            )}

            {/* Main Layout - 4 colunas */}
            <div className="flex h-[calc(100vh-3.5rem)]">

                {/* 1) Etapas - 10% */}
                <div className="w-[10%] bg-gray-900 border-r border-gray-800/50 overflow-y-auto">
                    <StepsNavigation />
                </div>

                {/* 2) Componentes - 15% */}
                <div className="w-[15%] bg-gray-900 border-r border-gray-800/50 overflow-y-auto">
                    <div className="p-3 border-b border-gray-800/50">
                        <h3 className="text-sm font-semibold text-white">📦 Componentes</h3>
                        <p className="text-xs text-gray-400">Arraste para adicionar</p>
                    </div>
                    <CombinedComponentsPanel />

                    {/* Botões de demonstração de histórico */}
                    <div className="p-3 border-t border-gray-800/50 space-y-2">
                        <button
                            onClick={() => handleAddBlock('text-block')}
                            className="w-full px-2 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded"
                        >
                            + Texto (Demo)
                        </button>
                        <button
                            onClick={() => {
                                const currentStage = quiz.stages.find((s: any) => s.id === `step-${currentStep}`);
                                const lastBlock = currentStage?.blocks?.[currentStage.blocks.length - 1];
                                if (lastBlock) {
                                    handleRemoveBlock(lastBlock.id);
                                }
                            }}
                            className="w-full px-2 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded"
                        >
                            - Remover (Demo)
                        </button>
                    </div>
                </div>

                {/* 3) Canvas - 55% */}
                <div className="w-[55%] flex flex-col bg-black">
                    {/* Header do Canvas */}
                    <div className="bg-gray-900 border-b border-gray-800/50 p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h2 className="text-sm font-bold text-white">
                                📝 Etapa {currentStep}
                            </h2>
                            <span className="text-xs text-gray-400">
                                {(() => {
                                    const currentStage = quiz.stages.find((s: any) => s.id === `step-${currentStep}`);
                                    return currentStage?.blocks?.length || 0;
                                })()} blocos
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">Preview</span>
                        </div>
                    </div>

                    <div className="flex-1 relative overflow-auto">
                        {error && (
                            <div className="absolute inset-0 z-50 bg-red-900/20 backdrop-blur-sm flex items-center justify-center">
                                <div className="bg-red-900 border border-red-700 rounded-lg p-6 max-w-md">
                                    <h3 className="text-white font-semibold mb-2">Editor Error</h3>
                                    <p className="text-red-200 mb-4">{error.message}</p>
                                    <button
                                        onClick={() => setError(null)}
                                        className="px-3 py-1.5 bg-red-800 hover:bg-red-700 text-white rounded text-sm"
                                    >
                                        Dismiss
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="h-full flex items-center justify-center p-8">
                            <div className="max-w-4xl w-full">
                                {/* Canvas com blocos */}
                                <div className="bg-white rounded-lg shadow-lg min-h-96 p-6">
                                    <div className="text-center text-gray-500 mb-4">
                                        <h3 className="text-lg font-semibold mb-2">Canvas do Quiz</h3>
                                        <p className="text-sm">Etapa {currentStep}/21 - Use os botões de demonstração</p>
                                    </div>

                                    {/* Renderizar blocos da etapa atual */}
                                    <div className="space-y-3">
                                        {(() => {
                                            const currentStage = quiz.stages.find((s: any) => s.id === `step-${currentStep}`);
                                            const blocks = currentStage?.blocks || [];

                                            if (blocks.length === 0) {
                                                return (
                                                    <div className="p-4 border-2 border-dashed border-gray-300 rounded text-center">
                                                        <p className="text-xs text-gray-400">
                                                            Nenhum bloco ainda. Use os botões de demonstração!
                                                        </p>
                                                    </div>
                                                );
                                            }

                                            return blocks.map((block: any, index: number) => (
                                                <div key={block.id} className="p-3 bg-gray-50 rounded border">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-700">
                                                                {block.type} #{index + 1}
                                                            </div>
                                                            <div className="text-xs text-gray-500 mt-1">
                                                                {block.content}
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => handleRemoveBlock(block.id)}
                                                            className="text-red-500 hover:text-red-700 text-xs"
                                                        >
                                                            ❌
                                                        </button>
                                                    </div>
                                                </div>
                                            ));
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4) Propriedades - 20% */}
                <div className="w-[20%] bg-gray-900 border-l border-gray-800/50 overflow-y-auto">
                    <div className="p-3 border-b border-gray-800/50">
                        <h3 className="text-sm font-semibold text-white">⚙️ Propriedades</h3>
                        <p className="text-xs text-gray-400">Configure o bloco selecionado</p>
                    </div>
                    <div className="p-4">
                        {selectedBlockId ? (
                            <div className="text-white text-sm">
                                Configurações do bloco: {selectedBlockId}
                            </div>
                        ) : (
                            <div className="text-gray-400 text-xs text-center py-8">
                                Selecione um bloco para<br />configurar suas propriedades
                            </div>
                        )}

                        {/* Informações do histórico */}
                        <div className="mt-6 p-3 bg-gray-800 rounded">
                            <h4 className="text-xs font-semibold text-white mb-2">💾 Histórico</h4>
                            <div className="space-y-1 text-xs text-gray-400">
                                <div>Ações: {historyEntries.length}</div>
                                <div>Posição: {currentIndex + 1}</div>
                                <div className="flex gap-1 mt-2">
                                    <span className={`px-1 py-0.5 rounded ${canUndo ? 'bg-blue-600' : 'bg-gray-700'}`}>
                                        Ctrl+Z
                                    </span>
                                    <span className={`px-1 py-0.5 rounded ${canRedo ? 'bg-green-600' : 'bg-gray-700'}`}>
                                        Ctrl+Y
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Template Gallery */}
            <TemplateGallery
                isVisible={showTemplateGallery}
                onTemplateSelect={handleTemplateSelect}
                onClose={() => setShowTemplateGallery(false)}
            />

            {/* Export/Import Modal */}
            <ExportImportModal
                isVisible={showExportImportModal}
                currentQuiz={quiz}
                onImport={handleQuizImport}
                onClose={() => setShowExportImportModal(false)}
            />
        </div>
    );
};

export default NewUnifiedEditor;