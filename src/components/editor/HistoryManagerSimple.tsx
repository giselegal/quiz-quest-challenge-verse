// Temporary simplified history manager exports
export const useHistory = (initialData: any, config = {}) => {
    return {
        canUndo: false,
        canRedo: false,
        undo: () => null,
        redo: () => null,
        addEntry: (data: any, action: string, description?: string) => { },
        clearHistory: () => { },
        getHistory: () => [],
        getCurrentEntry: () => null,
        jumpToEntry: () => null,
        historyState: { entries: [], currentIndex: 0, maxEntries: 50 }
    };
};

export const HistoryPanel = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
    if (!isVisible) return null;
    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">📜 Histórico</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <p className="text-sm text-gray-600">Funcionalidade será implementada em breve</p>
        </div>
    );
};

export const useHistoryShortcuts = (history: any, onRestore: (data: any) => void) => {
    // Empty implementation for now
};