import React, { useState, useCallback } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, DragOverEvent, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { UnifiedBlock, UnifiedStage } from '@/types/master-schema';

interface DragDropEditorProps {
    funnel: any;
    activeStageId: string | null;
    selectedBlockId: string | null;
    onBlockSelect?: (blockId: string) => void;
    onBlockReorder?: (stageId: string, fromIndex: number, toIndex: number) => void;
    onBlockMove?: (blockId: string, fromStageId: string, toStageId: string, toIndex: number) => void;
    className?: string;
}

interface DraggableBlockProps {
    block: UnifiedBlock;
    isSelected: boolean;
    onSelect: (blockId: string) => void;
}

interface DroppableStageProps {
    stage: UnifiedStage;
    isActive: boolean;
    onStageSelect: (stageId: string) => void;
    children: React.ReactNode;
}

// Draggable Block Component
const DraggableBlock: React.FC<DraggableBlockProps> = ({ block, isSelected, onSelect }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: block.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const getBlockIcon = (blockType: string) => {
        switch (blockType) {
            case 'heading': return '📝';
            case 'text': return '📄';
            case 'button': return '🔘';
            case 'quiz-question': return '❓';
            case 'image': return '🖼️';
            case 'lead-form': return '📋';
            case 'divider': return '➖';
            case 'spacer': return '⬜';
            default: return '📦';
        }
    };

    const getBlockPreview = (block: UnifiedBlock) => {
        const props = block.properties || {};

        switch (block.type) {
            case 'heading':
                return (
                    <div className="bg-white rounded-lg p-3 border">
                        <h3 className="font-bold text-sm text-gray-900">{props.content || 'Título'}</h3>
                    </div>
                );
            case 'text':
                return (
                    <div className="bg-white rounded-lg p-3 border">
                        <p className="text-xs text-gray-600 line-clamp-2">{typeof props.content === 'string' ? props.content : typeof props.content === 'object' && props.content && 'content' in props.content ? (props.content as any).content : 'Texto...'}</p>
                    </div>
                );
            case 'button':
                return (
                    <div className="bg-white rounded-lg p-3 border text-center">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs">
                            {typeof props.text === 'string' ? props.text : typeof props.text === 'object' && props.text && 'text' in props.text ? (props.text as any).text : 'Botão'}
                        </button>
                    </div>
                );
            case 'quiz-question':
                return (
                    <div className="bg-white rounded-lg p-3 border">
                        <div className="text-xs font-medium text-gray-900 mb-2">{typeof props.question === 'string' ? props.question : typeof props.question === 'object' && props.question && 'question' in props.question ? (props.question as any).question : 'Pergunta?'}</div>
                        <div className="space-y-1">
                            <div className="bg-gray-100 rounded px-2 py-1 text-xs">Opção A</div>
                            <div className="bg-gray-100 rounded px-2 py-1 text-xs">Opção B</div>
                        </div>
                    </div>
                );
            case 'image':
                return (
                    <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg h-16 flex items-center justify-center text-white text-xs">
                        🖼️ Imagem
                    </div>
                );
            case 'lead-form':
                return (
                    <div className="bg-white rounded-lg p-3 border">
                        <div className="space-y-1">
                            <div className="bg-gray-100 rounded px-2 py-1 text-xs">Nome</div>
                            <div className="bg-gray-100 rounded px-2 py-1 text-xs">Email</div>
                            <div className="bg-green-500 rounded px-2 py-1 text-xs text-white text-center">Enviar</div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="bg-gray-100 rounded-lg p-3 border text-center">
                        <span className="text-xs text-gray-500">{block.type}</span>
                    </div>
                );
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`relative group cursor-grab active:cursor-grabbing ${isSelected ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                }`}
            onClick={() => onSelect(block.id)}
        >
            <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className={`bg-gray-50 rounded-xl p-3 border-2 transition-all duration-200 ${isSelected
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
            >
                {/* Block Header */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">{getBlockIcon(block.type)}</span>
                        <div>
                            <div className="font-medium text-xs text-gray-900 capitalize">
                                {block.type.replace('-', ' ')}
                            </div>
                            <div className="text-xs text-gray-500">ID: {block.id.slice(-8)}</div>
                        </div>
                    </div>

                    {/* Drag Handle */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                        </svg>
                    </div>
                </div>

                {/* Block Preview */}
                <div className="h-20 mb-2">
                    {getBlockPreview(block)}
                </div>

                {/* Block Actions */}
                {isSelected && (
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-2 rounded transition-colors">
                            Editar
                        </button>
                        <button className="bg-gray-500 hover:bg-gray-600 text-white text-xs py-1 px-2 rounded transition-colors">
                            Duplicar
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-2 rounded transition-colors">
                            Excluir
                        </button>
                    </div>
                )}
            </motion.div>

            {/* Drag Indicator */}
            {isDragging && (
                <div className="absolute inset-0 bg-blue-200 border-2 border-blue-400 border-dashed rounded-xl opacity-50" />
            )}
        </div>
    );
};

// Droppable Stage Component
const DroppableStage: React.FC<DroppableStageProps> = ({ stage, isActive, onStageSelect, children }) => {
    const [isOver, setIsOver] = useState(false);

    return (
        <div
            className={`relative transition-all duration-300 ${isActive ? 'ring-2 ring-blue-500 ring-opacity-30' : ''
                }`}
        >
            <motion.div
                whileHover={{ scale: 1.01 }}
                className={`bg-white rounded-2xl shadow-sm border-2 transition-all duration-200 ${isActive
                    ? 'border-blue-400 bg-blue-50/30'
                    : isOver
                        ? 'border-green-400 bg-green-50/30'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                onClick={() => onStageSelect(stage.id)}
            >
                {/* Stage Header */}
                <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-blue-500' : 'bg-gray-400'}`} />
                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    {stage.name || `Etapa ${stage.id}`}
                                </h3>
                                {stage.description && (
                                    <p className="text-sm text-gray-600">{stage.description}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                {stage.blocks?.length || 0} blocos
                            </span>
                            {isActive && (
                                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full font-medium">
                                    Ativo
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stage Content */}
                <div className="p-4">
                    {children}

                    {/* Drop Zone */}
                    {(!stage.blocks || stage.blocks.length === 0) && (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                            <div className="text-gray-400">
                                <svg className="mx-auto h-12 w-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                </svg>
                                <h4 className="font-medium text-gray-900 mb-1">Arraste blocos aqui</h4>
                                <p className="text-sm text-gray-500">Esta etapa ainda não tem blocos</p>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Drop Indicator */}
            {isOver && (
                <div className="absolute inset-0 border-2 border-green-400 bg-green-100/20 rounded-2xl pointer-events-none" />
            )}
        </div>
    );
};

// Main Drag & Drop Editor Component
export const DragDropEditor: React.FC<DragDropEditorProps> = ({
    funnel,
    activeStageId,
    selectedBlockId,
    onBlockSelect,
    onBlockReorder,
    onBlockMove,
    className = ''
}) => {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [draggedBlock, setDraggedBlock] = useState<UnifiedBlock | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const stages = funnel?.stages || [];
    const activeStage = stages.find((stage: UnifiedStage) => stage.id === activeStageId);

    const handleDragStart = useCallback((event: DragStartEvent) => {
        const { active } = event;
        setActiveId(active.id as string);

        // Find the dragged block
        let foundBlock = null;
        for (const stage of stages) {
            const block = stage.blocks?.find((b: UnifiedBlock) => b.id === active.id);
            if (block) {
                foundBlock = block;
                break;
            }
        }
        setDraggedBlock(foundBlock);
    }, [stages]);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || !onBlockReorder) {
            setActiveId(null);
            setDraggedBlock(null);
            return;
        }

        const activeBlockId = active.id as string;
        const overBlockId = over.id as string;

        // Find source stage and block index
        let sourceStageId = '';
        let sourceIndex = -1;

        for (const stage of stages) {
            const blockIndex = stage.blocks?.findIndex((b: UnifiedBlock) => b.id === activeBlockId);
            if (blockIndex !== undefined && blockIndex >= 0) {
                sourceStageId = stage.id;
                sourceIndex = blockIndex;
                break;
            }
        }

        // Find target stage and index
        let targetStageId = '';
        let targetIndex = -1;

        for (const stage of stages) {
            const blockIndex = stage.blocks?.findIndex((b: UnifiedBlock) => b.id === overBlockId);
            if (blockIndex !== undefined && blockIndex >= 0) {
                targetStageId = stage.id;
                targetIndex = blockIndex;
                break;
            }
        }

        if (sourceStageId && sourceIndex >= 0 && targetStageId && targetIndex >= 0) {
            if (sourceStageId === targetStageId) {
                // Reorder within same stage
                onBlockReorder(sourceStageId, sourceIndex, targetIndex);
            } else {
                // Move between stages
                if (onBlockMove) {
                    onBlockMove(activeBlockId, sourceStageId, targetStageId, targetIndex);
                }
            }
        }

        setActiveId(null);
        setDraggedBlock(null);
    }, [stages, onBlockReorder, onBlockMove]);

    const handleBlockSelect = useCallback((blockId: string) => {
        if (onBlockSelect) {
            onBlockSelect(blockId);
        }
    }, [onBlockSelect]);

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className={`flex-1 p-6 bg-gray-50 overflow-y-auto ${className}`}>
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Editor de Funil</h2>
                        <p className="text-gray-600">Arraste e solte blocos entre as etapas</p>
                    </div>

                    {/* Stages */}
                    <div className="space-y-8">
                        {stages.map((stage: UnifiedStage, stageIndex: number) => {
                            const blocks = stage.blocks || [];
                            const isActive = stage.id === activeStageId;

                            return (
                                <DroppableStage
                                    key={stage.id}
                                    stage={stage}
                                    isActive={isActive}
                                    onStageSelect={(stageId) => {
                                        // Handle stage selection if needed
                                        console.log('Stage selected:', stageId);
                                    }}
                                >
                                    {blocks.length > 0 ? (
                                        <SortableContext
                                            items={blocks.map(b => b.id)}
                                            strategy={verticalListSortingStrategy}
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {blocks.map((block: UnifiedBlock) => (
                                                    <DraggableBlock
                                                        key={block.id}
                                                        block={block}
                                                        isSelected={selectedBlockId === block.id}
                                                        onSelect={handleBlockSelect}
                                                    />
                                                ))}
                                            </div>
                                        </SortableContext>
                                    ) : null}
                                </DroppableStage>
                            );
                        })}
                    </div>

                    {/* Empty State */}
                    {stages.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-gray-400">
                                <svg className="mx-auto h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma etapa encontrada</h3>
                                <p className="text-gray-500">Carregue um funil para começar a editar</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Drag Overlay */}
            <DragOverlay>
                {activeId && draggedBlock ? (
                    <div className="bg-white rounded-xl shadow-lg border-2 border-blue-400 p-3 opacity-90">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{draggedBlock.type === 'quiz-question' ? '❓' : '📝'}</span>
                            <span className="font-medium text-sm text-gray-900 capitalize">
                                {draggedBlock.type.replace('-', ' ')}
                            </span>
                        </div>
                        <div className="text-xs text-gray-500">Movendo bloco...</div>
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export default DragDropEditor;