import React, { useState } from 'react';
import {
    Undo2,
    Redo2,
    History,
    Clock,
    Trash2,
    ChevronDown,
    ChevronRight,
    Info
} from 'lucide-react';
import { HistoryEntry } from '@/hooks/useEditorHistory';

interface HistoryPanelProps {
    entries: HistoryEntry[];
    currentIndex: number;
    canUndo: boolean;
    canRedo: boolean;
    onUndo: () => void;
    onRedo: () => void;
    onGoToEntry: (index: number) => void;
    onClearHistory: () => void;
    historyStats: {
        totalEntries: number;
        currentIndex: number;
        canUndo: boolean;
        canRedo: boolean;
        memoryUsage: number;
    };
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
    entries,
    currentIndex,
    canUndo,
    canRedo,
    onUndo,
    onRedo,
    onGoToEntry,
    onClearHistory,
    historyStats
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showStats, setShowStats] = useState(false);

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const formatMemoryUsage = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const getActionIcon = (action: string) => {
        switch (action.toLowerCase()) {
            case 'add':
            case 'adicionar':
                return '➕';
            case 'remove':
            case 'remover':
                return '🗑️';
            case 'edit':
            case 'editar':
                return '✏️';
            case 'move':
            case 'mover':
                return '🔄';
            case 'reorder':
            case 'reordenar':
                return '🔀';
            default:
                return '📝';
        }
    };

    return (
        <div className="bg-gray-900 border border-gray-800/50 rounded-lg">
            {/* Header do Painel */}
            <div className="p-3 border-b border-gray-800/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <History className="w-4 h-4 text-gray-400" />
                        <h3 className="text-sm font-semibold text-white">Histórico</h3>
                        <span className="text-xs text-gray-500">
                            ({entries.length}/{historyStats.totalEntries})
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setShowStats(!showStats)}
                            className="p-1 text-gray-400 hover:text-white rounded"
                            title="Estatísticas do histórico"
                        >
                            <Info className="w-3 h-3" />
                        </button>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-1 text-gray-400 hover:text-white rounded"
                        >
                            {isExpanded ? (
                                <ChevronDown className="w-4 h-4" />
                            ) : (
                                <ChevronRight className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Controles de Undo/Redo */}
                <div className="flex items-center gap-2 mt-2">
                    <button
                        onClick={onUndo}
                        disabled={!canUndo}
                        className={`flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors ${canUndo
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                            }`}
                        title="Desfazer (Ctrl+Z)"
                    >
                        <Undo2 className="w-3 h-3" />
                        Desfazer
                    </button>
                    <button
                        onClick={onRedo}
                        disabled={!canRedo}
                        className={`flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors ${canRedo
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                            }`}
                        title="Refazer (Ctrl+Y)"
                    >
                        <Redo2 className="w-3 h-3" />
                        Refazer
                    </button>
                </div>
            </div>

            {/* Estatísticas (quando expandido) */}
            {showStats && (
                <div className="p-3 border-b border-gray-800/50 bg-gray-800/30">
                    <div className="text-xs text-gray-400 space-y-1">
                        <div>Entradas: {historyStats.totalEntries}</div>
                        <div>Posição: {historyStats.currentIndex + 1}</div>
                        <div>Memória: {formatMemoryUsage(historyStats.memoryUsage)}</div>
                    </div>
                </div>
            )}

            {/* Lista do Histórico */}
            {isExpanded && (
                <div className="max-h-64 overflow-y-auto">
                    {entries.length === 0 ? (
                        <div className="p-4 text-center text-gray-500 text-xs">
                            Nenhuma ação no histórico
                        </div>
                    ) : (
                        <div className="p-2 space-y-1">
                            {entries.map((entry, index) => (
                                <button
                                    key={entry.id}
                                    onClick={() => onGoToEntry(index)}
                                    className={`w-full text-left p-2 rounded text-xs transition-colors ${index === currentIndex
                                            ? 'bg-blue-600/20 border border-blue-600/50 text-white'
                                            : index < currentIndex
                                                ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-800'
                                                : 'bg-gray-800/20 text-gray-500 hover:bg-gray-800/30'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm">
                                                {getActionIcon(entry.action)}
                                            </span>
                                            <span className="font-medium">
                                                {entry.description}
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {formatTime(entry.timestamp)}
                                        </span>
                                    </div>
                                    {entry.metadata && (
                                        <div className="mt-1 text-xs text-gray-500">
                                            {entry.metadata.blockId && (
                                                <span className="mr-2">ID: {entry.metadata.blockId}</span>
                                            )}
                                            <span className="capitalize">{entry.metadata.actionType}</span>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Rodapé com Limpar Histórico */}
            {isExpanded && entries.length > 0 && (
                <div className="p-2 border-t border-gray-800/50">
                    <button
                        onClick={onClearHistory}
                        className="w-full flex items-center justify-center gap-1 px-2 py-1 text-xs text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors"
                        title="Limpar todo o histórico"
                    >
                        <Trash2 className="w-3 h-3" />
                        Limpar Histórico
                    </button>
                </div>
            )}
        </div>
    );
};

// Componente compacto para a toolbar
export const HistoryToolbar: React.FC<{
    canUndo: boolean;
    canRedo: boolean;
    onUndo: () => void;
    onRedo: () => void;
}> = ({ canUndo, canRedo, onUndo, onRedo }) => {
    return (
        <div className="flex items-center gap-1">
            <button
                onClick={onUndo}
                disabled={!canUndo}
                className={`p-1.5 rounded transition-colors ${canUndo
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                        : 'text-gray-600 cursor-not-allowed'
                    }`}
                title="Desfazer (Ctrl+Z)"
            >
                <Undo2 className="w-4 h-4" />
            </button>
            <button
                onClick={onRedo}
                disabled={!canRedo}
                className={`p-1.5 rounded transition-colors ${canRedo
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                        : 'text-gray-600 cursor-not-allowed'
                    }`}
                title="Refazer (Ctrl+Y)"
            >
                <Redo2 className="w-4 h-4" />
            </button>
        </div>
    );
};