import React, { useState, useEffect, useCallback, useRef } from 'react';

interface AutoSaveState {
    status: 'idle' | 'saving' | 'saved' | 'error';
    lastSaved: Date | null;
    saveCount: number;
    pendingChanges: boolean;
}

interface AutoSaveConfig {
    interval: number; // milliseconds
    maxRetries: number;
    debounceDelay: number;
    enabled: boolean;
}

interface AutoSaveManagerProps {
    data: any;
    onSave: (data: any) => Promise<void>;
    config?: Partial<AutoSaveConfig>;
    onStatusChange?: (status: AutoSaveState) => void;
}

export const AutoSaveManager: React.FC<AutoSaveManagerProps> = ({
    data,
    onSave,
    config = {},
    onStatusChange
}) => {
    const defaultConfig: AutoSaveConfig = {
        interval: 5000, // 5 segundos
        maxRetries: 3,
        debounceDelay: 1000, // 1 segundo
        enabled: true,
        ...config
    };

    const [state, setState] = useState<AutoSaveState>({
        status: 'idle',
        lastSaved: null,
        saveCount: 0,
        pendingChanges: false
    });

    const saveTimeoutRef = useRef<NodeJS.Timeout>();
    const intervalRef = useRef<NodeJS.Timeout>();
    const lastDataRef = useRef<any>(null);
    const retryCountRef = useRef<number>(0);

    // Debounced save function
    const debouncedSave = useCallback(async () => {
        if (!defaultConfig.enabled || state.status === 'saving') return;

        try {
            setState(prev => ({ ...prev, status: 'saving' }));

            await onSave(data);

            const newState: AutoSaveState = {
                status: 'saved',
                lastSaved: new Date(),
                saveCount: state.saveCount + 1,
                pendingChanges: false
            };

            setState(newState);
            retryCountRef.current = 0;

            if (onStatusChange) {
                onStatusChange(newState);
            }

            // Reset to idle after 2 seconds
            setTimeout(() => {
                setState(prev => ({ ...prev, status: 'idle' }));
            }, 2000);

        } catch (error) {
            console.error('Auto-save error:', error);

            retryCountRef.current++;

            if (retryCountRef.current < defaultConfig.maxRetries) {
                // Retry with exponential backoff
                const retryDelay = Math.pow(2, retryCountRef.current) * 1000;
                setTimeout(debouncedSave, retryDelay);
            } else {
                setState(prev => ({ ...prev, status: 'error' }));
            }
        }
    }, [data, onSave, defaultConfig.enabled, defaultConfig.maxRetries, state.saveCount, onStatusChange]);

    // Detect data changes
    useEffect(() => {
        if (!defaultConfig.enabled) return;

        const dataString = JSON.stringify(data);
        const lastDataString = JSON.stringify(lastDataRef.current);

        if (lastDataRef.current !== null && dataString !== lastDataString) {
            setState(prev => ({ ...prev, pendingChanges: true }));

            // Clear existing timeout
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }

            // Schedule save with debounce
            saveTimeoutRef.current = setTimeout(() => {
                debouncedSave();
            }, defaultConfig.debounceDelay);
        }

        lastDataRef.current = data;
    }, [data, debouncedSave, defaultConfig.enabled, defaultConfig.debounceDelay]);

    // Periodic save (backup)
    useEffect(() => {
        if (!defaultConfig.enabled) return;

        intervalRef.current = setInterval(() => {
            if (state.pendingChanges && state.status !== 'saving') {
                debouncedSave();
            }
        }, defaultConfig.interval);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [defaultConfig.enabled, defaultConfig.interval, state.pendingChanges, state.status, debouncedSave]);

    // Cleanup
    useEffect(() => {
        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return null; // This is a logic component, no UI
};

// Auto-save status indicator component
interface AutoSaveIndicatorProps {
    status: AutoSaveState;
    onToggle?: () => void;
}

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
    status,
    onToggle
}) => {
    const getStatusConfig = () => {
        switch (status.status) {
            case 'saving':
                return {
                    icon: '💾',
                    text: 'Salvando...',
                    color: 'text-blue-600 bg-blue-50 border-blue-200',
                    animation: 'animate-pulse'
                };
            case 'saved':
                return {
                    icon: '✅',
                    text: 'Salvo',
                    color: 'text-green-600 bg-green-50 border-green-200',
                    animation: ''
                };
            case 'error':
                return {
                    icon: '❌',
                    text: 'Erro ao salvar',
                    color: 'text-red-600 bg-red-50 border-red-200',
                    animation: ''
                };
            default:
                return {
                    icon: status.pendingChanges ? '📝' : '💤',
                    text: status.pendingChanges ? 'Alterações pendentes' : 'Tudo salvo',
                    color: status.pendingChanges ? 'text-yellow-600 bg-yellow-50 border-yellow-200' : 'text-gray-600 bg-gray-50 border-gray-200',
                    animation: status.pendingChanges ? 'animate-pulse' : ''
                };
        }
    };

    const config = getStatusConfig();

    return (
        <div
            className={`flex items-center gap-2 px-3 py-1 border rounded-lg text-sm font-medium transition-all cursor-pointer ${config.color} ${config.animation}`}
            onClick={onToggle}
            title={`${status.saveCount} salvamentos realizados${status.lastSaved ? ` - Último: ${status.lastSaved.toLocaleTimeString()}` : ''}`}
        >
            <span>{config.icon}</span>
            <span>{config.text}</span>
            {status.saveCount > 0 && (
                <span className="text-xs opacity-70">({status.saveCount})</span>
            )}
        </div>
    );
};

// Hook for using auto-save
export const useAutoSave = (
    data: any,
    saveFunction: (data: any) => Promise<void>,
    config?: Partial<AutoSaveConfig>
) => {
    const [autoSaveState, setAutoSaveState] = useState<AutoSaveState>({
        status: 'idle',
        lastSaved: null,
        saveCount: 0,
        pendingChanges: false
    });

    const [isEnabled, setIsEnabled] = useState(true);

    const toggleAutoSave = useCallback(() => {
        setIsEnabled(prev => !prev);
    }, []);

    const manualSave = useCallback(async () => {
        try {
            setAutoSaveState(prev => ({ ...prev, status: 'saving' }));
            await saveFunction(data);
            setAutoSaveState(prev => ({
                ...prev,
                status: 'saved',
                lastSaved: new Date(),
                saveCount: prev.saveCount + 1,
                pendingChanges: false
            }));
        } catch (error) {
            setAutoSaveState(prev => ({ ...prev, status: 'error' }));
        }
    }, [data, saveFunction]);

    return {
        autoSaveState,
        isEnabled,
        toggleAutoSave,
        manualSave,
        AutoSaveManagerComponent: () => (
            <AutoSaveManager
                data={data}
                onSave={saveFunction}
                config={{ ...config, enabled: isEnabled }}
                onStatusChange={setAutoSaveState}
            />
        ),
        AutoSaveIndicatorComponent: () => (
            <AutoSaveIndicator
                status={autoSaveState}
                onToggle={toggleAutoSave}
            />
        )
    };
};

export default AutoSaveManager;