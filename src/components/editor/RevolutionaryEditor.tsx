import React, { useState, useCallback } from 'react';
import { VisualComponentsLibrary } from './VisualComponentsLibrary';
import { LivePreviewCanvas } from './LivePreviewCanvas';
import { DragDropEditor } from './DragDropEditor';
import { SmartPropertiesPanel } from './SmartPropertiesPanel';
import { useUnifiedEditor } from '@/hooks/core/useUnifiedEditor';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PencilIcon,
    EyeIcon,
    Squares2X2Icon,
    AdjustmentsHorizontalIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

type EditorMode = 'visual' | 'preview' | 'dragdrop';

export const RevolutionaryEditor: React.FC = () => {
    const [editorMode, setEditorMode] = useState<EditorMode>('visual');
    const [showPropertiesPanel, setShowPropertiesPanel] = useState(true);

    const {
        funnel,
        activeStageId,
        selectedBlockId,
        selectedBlock,
        isLoading,
        addBlock,
        updateBlock,
        deleteBlock,
        duplicateBlock,
        reorderBlocks,
        setSelectedBlock,
        setActiveStage,
        updateBlockProperty,
        updateBlockProperties
    } = useUnifiedEditor();

    // Handle adding component from library
    const handleAddComponent = useCallback(async (componentType: string) => {
        if (!activeStageId) {
            console.warn('No active stage selected');
            return;
        }

        try {
            const newBlockId = await addBlock(activeStageId, componentType);
            setSelectedBlock(newBlockId);
        } catch (error) {
            console.error('Error adding component:', error);
        }
    }, [activeStageId, addBlock, setSelectedBlock]);

    // Handle block selection
    const handleBlockSelect = useCallback((blockId: string) => {
        setSelectedBlock(blockId);
    }, [setSelectedBlock]);

    // Handle block updates from preview
    const handleBlockUpdate = useCallback(async (blockId: string, updates: any) => {
        try {
            await updateBlock(blockId, updates);
        } catch (error) {
            console.error('Error updating block:', error);
        }
    }, [updateBlock]);

    // Handle block reordering
    const handleBlockReorder = useCallback(async (stageId: string, fromIndex: number, toIndex: number) => {
        try {
            await reorderBlocks(stageId, fromIndex, toIndex);
        } catch (error) {
            console.error('Error reordering blocks:', error);
        }
    }, [reorderBlocks]);

    // Get editor mode config
    const getModeConfig = () => {
        switch (editorMode) {
            case 'visual':
                return {
                    title: 'Editor Visual',
                    description: 'Edição em tempo real no canvas',
                    icon: <PencilIcon className="w-4 h-4" />,
                    color: 'blue'
                };
            case 'preview':
                return {
                    title: 'Preview',
                    description: 'Visualização como usuário final',
                    icon: <EyeIcon className="w-4 h-4" />,
                    color: 'green'
                };
            case 'dragdrop':
                return {
                    title: 'Organizar',
                    description: 'Arrastar e soltar entre etapas',
                    icon: <Squares2X2Icon className="w-4 h-4" />,
                    color: 'purple'
                };
            default:
                return {
                    title: 'Editor',
                    description: 'Modo de edição',
                    icon: <PencilIcon className="w-4 h-4" />,
                    color: 'blue'
                };
        }
    };

    const modeConfig = getModeConfig();

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
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            {/* Components Library Sidebar */}
            <VisualComponentsLibrary
                onAddComponent={handleAddComponent}
                className="border-r-2 border-gray-200"
            />

            {/* Main Editor Area */}
            <div className="flex-1 flex flex-col">
                {/* Top Toolbar */}
                <div className="bg-white border-b border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        {/* Mode Switcher */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl bg-${modeConfig.color}-500 flex items-center justify-center text-white`}>
                                    {modeConfig.icon}
                                </div>
                                <div>
                                    <h2 className="font-semibold text-gray-900">{modeConfig.title}</h2>
                                    <p className="text-sm text-gray-600">{modeConfig.description}</p>
                                </div>
                            </div>

                            {/* Mode Buttons */}
                            <div className="flex bg-gray-100 rounded-xl p-1">
                                <button
                                    onClick={() => setEditorMode('visual')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${editorMode === 'visual'
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    <PencilIcon className="w-4 h-4 inline mr-2" />
                                    Visual
                                </button>
                                <button
                                    onClick={() => setEditorMode('preview')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${editorMode === 'preview'
                                        ? 'bg-white text-green-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    <EyeIcon className="w-4 h-4 inline mr-2" />
                                    Preview
                                </button>
                                <button
                                    onClick={() => setEditorMode('dragdrop')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${editorMode === 'dragdrop'
                                        ? 'bg-white text-purple-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    <Squares2X2Icon className="w-4 h-4 inline mr-2" />
                                    Organizar
                                </button>
                            </div>
                        </div>

                        {/* Right Controls */}
                        <div className="flex items-center gap-3">
                            {/* Properties Panel Toggle */}
                            <button
                                onClick={() => setShowPropertiesPanel(!showPropertiesPanel)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${showPropertiesPanel
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <AdjustmentsHorizontalIcon className="w-4 h-4 inline mr-2" />
                                Propriedades
                            </button>

                            {/* Save Status */}
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span>Auto-salvando...</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    {funnel && (
                        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <SparklesIcon className="w-4 h-4" />
                                <span>{funnel.stages?.length || 0} etapas</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Squares2X2Icon className="w-4 h-4" />
                                <span>{funnel.stages?.reduce((total: number, stage: any) => total + (stage.blocks?.length || 0), 0) || 0} blocos</span>
                            </div>
                            {selectedBlock && (
                                <div className="flex items-center gap-2 text-sm text-blue-600">
                                    <AdjustmentsHorizontalIcon className="w-4 h-4" />
                                    <span>Editando: {selectedBlock.type.replace('-', ' ')}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Editor Content */}
                <div className="flex-1 flex overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={editorMode}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="flex-1 flex"
                        >
                            {/* Main Canvas Area */}
                            {editorMode === 'visual' && (
                                <LivePreviewCanvas
                                    funnel={funnel}
                                    activeStageId={activeStageId}
                                    selectedBlockId={selectedBlockId}
                                    onBlockSelect={handleBlockSelect}
                                    onBlockUpdate={handleBlockUpdate}
                                />
                            )}

                            {editorMode === 'preview' && (
                                <LivePreviewCanvas
                                    funnel={funnel}
                                    activeStageId={activeStageId}
                                    selectedBlockId={selectedBlockId}
                                    onBlockSelect={handleBlockSelect}
                                    onBlockUpdate={handleBlockUpdate}
                                />
                            )}

                            {editorMode === 'dragdrop' && (
                                <DragDropEditor
                                    funnel={funnel}
                                    activeStageId={activeStageId}
                                    selectedBlockId={selectedBlockId}
                                    onBlockSelect={handleBlockSelect}
                                    onBlockReorder={handleBlockReorder}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Properties Panel */}
                    <AnimatePresence>
                        {showPropertiesPanel && (
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 320, opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <SmartPropertiesPanel
                                    selectedBlock={selectedBlock}
                                    onBlockUpdate={handleBlockUpdate}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default RevolutionaryEditor;