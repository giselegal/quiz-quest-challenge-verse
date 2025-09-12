import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, DevicePhoneMobileIcon, ComputerDesktopIcon, DeviceTabletIcon } from '@heroicons/react/24/outline';
import { UnifiedBlock, UnifiedStage } from '@/types/master-schema';

interface LivePreviewCanvasProps {
    funnel: any;
    activeStageId: string | null;
    selectedBlockId: string | null;
    onBlockSelect?: (blockId: string) => void;
    onBlockUpdate?: (blockId: string, updates: any) => void;
    className?: string;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

const DEVICE_SIZES = {
    desktop: { width: '100%', maxWidth: '1200px' },
    tablet: { width: '768px', maxWidth: '768px' },
    mobile: { width: '375px', maxWidth: '375px' }
};

export const LivePreviewCanvas: React.FC<LivePreviewCanvasProps> = ({
    funnel,
    activeStageId,
    selectedBlockId,
    onBlockSelect,
    onBlockUpdate,
    className = ''
}) => {
    const [device, setDevice] = useState<DeviceType>('desktop');
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [zoom, setZoom] = useState(100);
    const canvasRef = useRef<HTMLDivElement>(null);

    // Get active stage
    const activeStage = useMemo(() => {
        if (!funnel || !activeStageId) return null;
        return funnel.stages?.find((stage: UnifiedStage) => stage.id === activeStageId) || null;
    }, [funnel, activeStageId]);

    // Blocks from active stage
    const blocks = useMemo(() => {
        return activeStage?.blocks || [];
    }, [activeStage]);

    // Real-time block rendering with zero delay
    const renderBlock = useCallback((block: UnifiedBlock, index: number) => {
        const isSelected = selectedBlockId === block.id;
        const blockProps = block.properties || {};

        // Block base styles
        const blockStyle = {
            padding: blockProps.padding || '16px',
            margin: blockProps.margin || '0 0 16px 0',
            backgroundColor: blockProps.backgroundColor || 'transparent',
            borderRadius: blockProps.borderRadius || '8px',
            border: isSelected ? '2px solid #3B82F6' : '1px solid transparent',
            cursor: isPreviewMode ? 'default' : 'pointer',
            transition: 'all 0.1s ease', // Ultra-fast transitions
        };

        const handleBlockClick = () => {
            if (!isPreviewMode && onBlockSelect) {
                onBlockSelect(block.id);
            }
        };

        const handleBlockEdit = (property: string, value: any) => {
            if (onBlockUpdate) {
                onBlockUpdate(block.id, { [property]: value });
            }
        };

        // Render different block types
        const renderBlockContent = () => {
            switch (block.type) {
                case 'heading':
                    return (
                        <div className="heading-block">
                            {isPreviewMode ? (
                                <h2
                                    className="font-bold"
                                    style={{
                                        fontSize: blockProps.fontSize || '24px',
                                        color: blockProps.color || '#1F2937',
                                        textAlign: blockProps.textAlign || 'left'
                                    }}
                                >
                                    {blockProps.content || 'Título Principal'}
                                </h2>
                            ) : (
                                <input
                                    type="text"
                                    value={blockProps.content || 'Título Principal'}
                                    onChange={(e) => handleBlockEdit('content', e.target.value)}
                                    className="w-full bg-transparent border-none outline-none font-bold text-2xl"
                                    style={{
                                        fontSize: blockProps.fontSize || '24px',
                                        color: blockProps.color || '#1F2937',
                                        textAlign: blockProps.textAlign || 'left'
                                    }}
                                    placeholder="Digite o título..."
                                />
                            )}
                        </div>
                    );

                case 'text':
                    return (
                        <div className="text-block">
                            {isPreviewMode ? (
                                <p
                                    style={{
                                        fontSize: blockProps.fontSize || '16px',
                                        color: blockProps.color || '#4B5563',
                                        textAlign: blockProps.textAlign || 'left',
                                        lineHeight: '1.6'
                                    }}
                                >
                                    {blockProps.content || 'Digite seu texto aqui...'}
                                </p>
                            ) : (
                                <textarea
                                    value={blockProps.content || 'Digite seu texto aqui...'}
                                    onChange={(e) => handleBlockEdit('content', e.target.value)}
                                    className="w-full bg-transparent border-none outline-none resize-none"
                                    style={{
                                        fontSize: blockProps.fontSize || '16px',
                                        color: blockProps.color || '#4B5563',
                                        textAlign: blockProps.textAlign || 'left',
                                        lineHeight: '1.6'
                                    }}
                                    rows={3}
                                    placeholder="Digite seu texto..."
                                />
                            )}
                        </div>
                    );

                case 'button':
                    return (
                        <div className="button-block text-center">
                            <button
                                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:transform hover:scale-105"
                                style={{
                                    backgroundColor: blockProps.backgroundColor || '#3B82F6',
                                    color: blockProps.color || '#FFFFFF',
                                    fontSize: blockProps.fontSize || '16px',
                                    borderRadius: blockProps.borderRadius || '8px'
                                }}
                            >
                                {!isPreviewMode ? (
                                    <input
                                        type="text"
                                        value={blockProps.text || 'Clique Aqui'}
                                        onChange={(e) => handleBlockEdit('text', e.target.value)}
                                        className="bg-transparent border-none outline-none text-center min-w-[100px]"
                                        style={{ color: 'inherit' }}
                                        placeholder="Texto do botão"
                                    />
                                ) : (
                                    blockProps.text || 'Clique Aqui'
                                )}
                            </button>
                        </div>
                    );

                case 'quiz-question':
                    return (
                        <div className="quiz-question-block bg-white rounded-xl p-6 shadow-sm border">
                            <div className="mb-4">
                                {isPreviewMode ? (
                                    <h3 className="font-semibold text-lg text-gray-900">
                                        {blockProps.question || 'Qual é sua pergunta?'}
                                    </h3>
                                ) : (
                                    <input
                                        type="text"
                                        value={blockProps.question || 'Qual é sua pergunta?'}
                                        onChange={(e) => handleBlockEdit('question', e.target.value)}
                                        className="w-full bg-transparent border-none outline-none font-semibold text-lg text-gray-900"
                                        placeholder="Digite sua pergunta..."
                                    />
                                )}
                            </div>
                            <div className="space-y-3">
                                {(blockProps.options || ['Opção 1', 'Opção 2', 'Opção 3']).map((option: string, optionIndex: number) => (
                                    <div key={optionIndex} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                                        <div className="w-4 h-4 rounded-full border-2 border-gray-400 mr-3"></div>
                                        {isPreviewMode ? (
                                            <span className="text-gray-700">{option}</span>
                                        ) : (
                                            <input
                                                type="text"
                                                value={option}
                                                onChange={(e) => {
                                                    const newOptions = [...(blockProps.options || ['Opção 1', 'Opção 2', 'Opção 3'])];
                                                    newOptions[optionIndex] = e.target.value;
                                                    handleBlockEdit('options', newOptions);
                                                }}
                                                className="bg-transparent border-none outline-none text-gray-700 flex-1"
                                                placeholder={`Opção ${optionIndex + 1}`}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );

                case 'image':
                    return (
                        <div className="image-block text-center">
                            {blockProps.src ? (
                                <img
                                    src={blockProps.src}
                                    alt={blockProps.alt || 'Imagem'}
                                    className="max-w-full h-auto rounded-lg"
                                    style={{ maxHeight: '300px' }}
                                />
                            ) : (
                                <div
                                    className="flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                    style={{ height: '200px' }}
                                    onClick={() => {
                                        const url = prompt('Cole a URL da imagem:');
                                        if (url) handleBlockEdit('src', url);
                                    }}
                                >
                                    <div className="text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p className="text-sm text-gray-500">Clique para adicionar imagem</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    );

                case 'lead-form':
                    return (
                        <div className="lead-form-block bg-white rounded-xl p-6 shadow-sm border">
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Seu nome completo"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <input
                                    type="email"
                                    placeholder="Seu melhor email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <input
                                    type="tel"
                                    placeholder="Seu WhatsApp"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 hover:transform hover:scale-105">
                                    {blockProps.submitText || 'Quero Receber Meu Resultado! 🚀'}
                                </button>
                            </div>
                        </div>
                    );

                default:
                    return (
                        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <span className="text-gray-500">Bloco: {block.type}</span>
                        </div>
                    );
            }
        };

        return (
            <motion.div
                key={block.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                style={blockStyle}
                onClick={handleBlockClick}
                className={`block-container ${isSelected ? 'ring-2 ring-blue-300 ring-opacity-50' : ''}`}
            >
                {/* Block Controls (Edit Mode Only) */}
                {!isPreviewMode && isSelected && (
                    <div className="absolute -top-2 -right-2 z-10">
                        <div className="flex gap-1">
                            <button className="w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors">
                                ✕
                            </button>
                            <button className="w-6 h-6 bg-blue-500 text-white rounded-full text-xs hover:bg-blue-600 transition-colors">
                                ⚙️
                            </button>
                        </div>
                    </div>
                )}

                {renderBlockContent()}
            </motion.div>
        );
    }, [selectedBlockId, isPreviewMode, onBlockSelect, onBlockUpdate]);

    return (
        <div className={`flex-1 bg-gray-50 flex flex-col ${className}`}>
            {/* Toolbar */}
            <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Device Toggle */}
                    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setDevice('desktop')}
                            className={`p-2 rounded ${device === 'desktop' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <ComputerDesktopIcon className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setDevice('tablet')}
                            className={`p-2 rounded ${device === 'tablet' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <DeviceTabletIcon className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setDevice('mobile')}
                            className={`p-2 rounded ${device === 'mobile' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <DevicePhoneMobileIcon className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Preview Mode Toggle */}
                    <button
                        onClick={() => setIsPreviewMode(!isPreviewMode)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isPreviewMode
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {isPreviewMode ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                        {isPreviewMode ? 'Preview' : 'Editar'}
                    </button>
                </div>

                {/* Stage Info */}
                <div className="text-sm text-gray-600">
                    {activeStage ? (
                        <span>
                            Etapa: <span className="font-medium text-gray-900">{activeStage.name || activeStage.id}</span>
                            {blocks.length > 0 && (
                                <span className="ml-2">({blocks.length} bloco{blocks.length !== 1 ? 's' : ''})</span>
                            )}
                        </span>
                    ) : (
                        <span>Selecione uma etapa</span>
                    )}
                </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        ref={canvasRef}
                        className="bg-white rounded-xl shadow-sm border transition-all duration-200"
                        style={{
                            width: DEVICE_SIZES[device].width,
                            maxWidth: DEVICE_SIZES[device].maxWidth,
                            margin: '0 auto',
                            minHeight: '600px',
                            transform: `scale(${zoom / 100})`
                        }}
                        layout
                    >
                        <div className="p-8">
                            {/* Stage Header */}
                            {activeStage && (
                                <div className="mb-8 text-center">
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                        {activeStage.name || `Etapa ${activeStage.id}`}
                                    </h1>
                                    {activeStage.description && (
                                        <p className="text-gray-600">{activeStage.description}</p>
                                    )}
                                </div>
                            )}

                            {/* Blocks */}
                            <AnimatePresence mode="popLayout">
                                {blocks.length > 0 ? (
                                    blocks.map((block, index) => renderBlock(block, index))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-16"
                                    >
                                        <div className="text-gray-400">
                                            <svg className="mx-auto h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                            </svg>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">Adicione seu primeiro bloco</h3>
                                            <p className="text-gray-500">Arraste um componente da biblioteca para começar</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LivePreviewCanvas;