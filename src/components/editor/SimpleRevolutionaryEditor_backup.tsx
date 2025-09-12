import React, { useState, useRef, useCallback, useMemo } from 'react';
import { useEditor } from '@/components/editor/EditorProvider';
import { TemplateGallery, Template } from './TemplateGallery';
import { QuickCloneModal } from './QuickCloneModal';
import { AutoSaveManager } from './AutoSaveManager';

// Utility functions for safe data handling
const convertStepBlocksToStages = (stepBlocks: any) => {
    if (!stepBlocks || typeof stepBlocks !== 'object') {
        console.warn('convertStepBlocksToStages: Invalid stepBlocks provided:', stepBlocks);
        return [];
    }

    return Object.entries(stepBlocks).map(([stepKey, blocks]) => {
        const stageBlocks = Array.isArray(blocks) ? blocks : 
                           (blocks && typeof blocks === 'object' && blocks.blocks) ? blocks.blocks : 
                           [];
        
        return {
            id: stepKey,
            name: stepKey.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
            blocks: stageBlocks.map((block: any, index: number) => ({
                id: block?.id || `${stepKey}_block_${index}`,
                type: block?.type || 'text-block',
                content: block?.content || {},
                position: { x: index * 100, y: 0 }
            }))
        };
    });
};

const safeNormalizeStages = (stages: any[]) => {
    if (!Array.isArray(stages)) {
        console.warn('safeNormalizeStages: Invalid stages array provided:', stages);
        return [];
    }

    return stages.map((stage: any) => ({
        ...stage,
        id: stage?.id || `stage_${Math.random().toString(36).substr(2, 9)}`,
        name: stage?.name || 'Unnamed Stage',
        blocks: Array.isArray(stage?.blocks) ? stage.blocks.map((block: any) => ({
            ...block,
            id: block?.id || `block_${Math.random().toString(36).substr(2, 9)}`,
            type: block?.type || 'text-block',
            content: block?.content || {}
        })) : []
    }));
};

export const SimpleRevolutionaryEditor: React.FC = () => {
    const [editorMode, setEditorMode] = useState<'visual' | 'preview'>('visual');
    const [showTemplateGallery, setShowTemplateGallery] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [showCloneModal, setShowCloneModal] = useState(false);
    const [autoSaveEnabled] = useState(true);

    // Sistema de visualização responsivo
    const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const [showPreview, setShowPreview] = useState(true);
    const [showComponentPanel, setShowComponentPanel] = useState(true);
    const [showPropertiesPanel, setShowPropertiesPanel] = useState(true);

    const editorRef = useRef<HTMLDivElement>(null);

    // Use the EditorProvider context
    const editorContext = useEditor();

    // Garantir que temos um contexto válido
    if (!editorContext || !editorContext.state) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-red-600 mb-4">Contexto do Editor Inválido</h2>
                    <p className="text-gray-600 mb-4">O contexto do EditorProvider não está disponível.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Recarregar Página
                    </button>
                </div>
            </div>
        );
    }

    const { state, actions } = editorContext;
    const { stepBlocks, currentStep, selectedBlockId } = state || {};
    const { addBlock, updateBlock, setSelectedBlockId } = actions || {};

    // Convert stepBlocks to stages format for display
    const stages = useMemo(() => {
        if (!stepBlocks || typeof stepBlocks !== 'object') {
            console.warn('SimpleRevolutionaryEditor: No valid stepBlocks found');
            return [];
        }
        
        const converted = convertStepBlocksToStages(stepBlocks);
        return safeNormalizeStages(converted);
    }, [stepBlocks]);

    const activeStageId = currentStep || (stages.length > 0 ? stages[0].id : null);
    const activeStage = stages.find(s => s.id === activeStageId);

    // Auto-save callback
    const handleAutoSave = useCallback(() => {
        if (editorContext?.state?.stepBlocks && autoSaveEnabled) {
            console.log('Auto-saving editor state');
        }
    }, [editorContext?.state?.stepBlocks, autoSaveEnabled]);

    // Handle template selection
    const handleTemplateSelect = (template: Template) => {
        setSelectedTemplate(template);
        setShowTemplateGallery(false);
        setShowCloneModal(true);
    };

    // Handle template cloning
    const handleTemplateClone = async (template: Template, customizations: any) => {
        console.log('Cloning template:', template.name, 'with customizations:', customizations);
        alert(`Template "${template.name}" clonado com sucesso! 🎉`);
        setShowCloneModal(false);
    };

    if (!activeStage) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Nenhum Stage Ativo</h2>
                    <p className="text-gray-600 mb-4">Selecione ou crie um stage para começar a editar.</p>
                    <button
                        onClick={() => setShowTemplateGallery(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Criar Novo Funil
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={editorRef}
            className="flex h-screen bg-gray-100 overflow-hidden"
        >
            {/* Layout de 4 Colunas */}
            
            {/* 1. Painel de Componentes */}
            {showComponentPanel && (
                <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="font-bold text-lg text-gray-900">🎨 Componentes</h2>
                        <p className="text-sm text-gray-600">Arraste para adicionar</p>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-2">
                            {[
                                { type: 'quiz-question', label: '❓ Pergunta Quiz', icon: '❓' },
                                { type: 'text-block', label: '📝 Bloco de Texto', icon: '📝' },
                                { type: 'image-block', label: '🖼️ Imagem', icon: '🖼️' },
                                { type: 'button-block', label: '🔘 Botão', icon: '🔘' },
                                { type: 'form-block', label: '📋 Formulário', icon: '📋' },
                                { type: 'video-block', label: '🎥 Vídeo', icon: '🎥' }
                            ].map((component) => (
                                <button
                                    key={component.type}
                                    onClick={async () => {
                                        if (activeStageId && addBlock) {
                                            const newBlock = {
                                                id: `${component.type}_${Date.now()}`,
                                                type: component.type,
                                                content: {
                                                    text: `Novo ${component.label}`,
                                                    placeholder: true
                                                },
                                                position: { x: 0, y: 0 }
                                            };
                                            
                                            try {
                                                await addBlock(activeStageId, newBlock);
                                                console.log('✅ Bloco adicionado com sucesso:', component.type);
                                            } catch (error) {
                                                console.error('❌ Erro ao adicionar bloco:', error);
                                            }
                                        }
                                    }}
                                    className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-200 group"
                                >
                                    <div className="flex items-center space-x-3">
                                        <span className="text-xl group-hover:scale-110 transition-transform">
                                            {component.icon}
                                        </span>
                                        <div>
                                            <div className="font-medium text-gray-900 text-sm">
                                                {component.label}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Clique para adicionar
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Toolbar adicional */}
                    <div className="p-4 border-t border-gray-200 space-y-2">
                        <button
                            onClick={() => setShowTemplateGallery(true)}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                            📚 Galeria de Templates
                        </button>
                        
                        <AutoSaveManager
                            isEnabled={autoSaveEnabled}
                            onSave={handleAutoSave}
                            interval={5000}
                        />
                    </div>
                </div>
            )}

            {/* 2. Canvas Central de Edição */}
            <div className="flex-1 flex flex-col bg-white">
                {/* Header do Canvas */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-4">
                        <h2 className="font-bold text-lg text-gray-900">
                            📝 {activeStage.name}
                        </h2>
                        <span className="text-sm text-gray-500">
                            {activeStage.blocks.length} blocos
                        </span>
                    </div>

                    <div className="flex items-center space-x-3">
                        {/* Controles de visualização responsiva */}
                        <div className="flex items-center border border-gray-200 rounded-lg">
                            {[
                                { mode: 'desktop', icon: '💻', label: 'Desktop' },
                                { mode: 'tablet', icon: '📱', label: 'Tablet' },
                                { mode: 'mobile', icon: '📱', label: 'Mobile' }
                            ].map((view) => (
                                <button
                                    key={view.mode}
                                    onClick={() => setViewMode(view.mode as any)}
                                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                                        viewMode === view.mode
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                    title={view.label}
                                >
                                    {view.icon}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Área de Canvas */}
                <div className="flex-1 overflow-auto p-8">
                    <div className={`mx-auto transition-all duration-300 ${
                        viewMode === 'desktop' ? 'max-w-full' :
                        viewMode === 'tablet' ? 'max-w-2xl' : 'max-w-sm'
                    }`}>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-96">
                            {activeStage.blocks.length > 0 ? (
                                <div className="p-6 space-y-4">
                                    {activeStage.blocks.map((block, index) => (
                                        <div
                                            key={block.id}
                                            onClick={() => setSelectedBlockId?.(block.id)}
                                            className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                                                selectedBlockId === block.id
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-gray-600">
                                                    {block.type.replace('-', ' ').toUpperCase()}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    #{index + 1}
                                                </span>
                                            </div>
                                            
                                            <div className="text-gray-900">
                                                {typeof block.content === 'object' ? (
                                                    <pre className="text-sm bg-gray-50 p-2 rounded border">
                                                        {JSON.stringify(block.content, null, 2)}
                                                    </pre>
                                                ) : (
                                                    <div className="text-sm">
                                                        {String(block.content || 'Conteúdo vazio')}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center text-gray-500">
                                    <div className="text-4xl mb-4">📝</div>
                                    <h3 className="text-lg font-medium mb-2">Canvas Vazio</h3>
                                    <p className="text-sm">
                                        Adicione componentes da barra lateral para começar
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Painel de Preview em Tempo Real */}
            {showPreview && (
                <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="font-bold text-lg text-gray-900">👁️ Preview</h2>
                        <p className="text-sm text-gray-600">Visualização em tempo real</p>
                    </div>
                    
                    <div className="flex-1 overflow-auto p-4">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-96">
                            <div className="p-4">
                                <h3 className="font-medium text-gray-900 mb-4">
                                    Preview: {activeStage.name}
                                </h3>
                                
                                {activeStage.blocks.length > 0 ? (
                                    <div className="space-y-3">
                                        {activeStage.blocks.map((block, index) => (
                                            <div key={block.id} className="text-sm">
                                                <div className="font-medium text-gray-700 mb-1">
                                                    {block.type.replace('-', ' ')}
                                                </div>
                                                <div className="text-gray-600 bg-gray-50 p-2 rounded text-xs">
                                                    {JSON.stringify(block.content, null, 1).slice(0, 100)}...
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500 py-8">
                                        <div className="text-2xl mb-2">👀</div>
                                        <p className="text-sm">O preview aparecerá aqui</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 4. Painel de Propriedades */}
            {showPropertiesPanel && (
                <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="font-bold text-lg text-gray-900">⚙️ Propriedades</h2>
                        <p className="text-sm text-gray-600">Configurar elemento selecionado</p>
                    </div>
                    
                    <div className="flex-1 overflow-auto p-4">
                        {selectedBlockId ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        ID do Elemento
                                    </label>
                                    <input
                                        type="text"
                                        value={selectedBlockId}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Configurações
                                    </label>
                                    <textarea
                                        value={JSON.stringify({
                                            selectedBlock: selectedBlockId,
                                            editable: true
                                        }, null, 2)}
                                        onChange={() => {}}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono h-40 resize-none"
                                        placeholder="{ }"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 py-12">
                                <div className="text-3xl mb-3">⚙️</div>
                                <h3 className="font-medium mb-2">Nenhum elemento selecionado</h3>
                                <p className="text-sm">
                                    Clique em um elemento no canvas para editar suas propriedades
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Modais e Overlays */}
            <TemplateGallery
                isVisible={showTemplateGallery}
                onTemplateSelect={handleTemplateSelect}
                onClose={() => setShowTemplateGallery(false)}
            />

            <QuickCloneModal
                template={selectedTemplate}
                isVisible={showCloneModal}
                onClose={() => {
                    setShowCloneModal(false);
                    setSelectedTemplate(null);
                }}
                onClone={handleTemplateClone}
            />
        </div>
    );
};

export default SimpleRevolutionaryEditor;