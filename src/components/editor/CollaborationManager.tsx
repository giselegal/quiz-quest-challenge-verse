import React, { useState, useEffect, useCallback, useRef } from 'react';

interface User {
    id: string;
    name: string;
    avatar?: string;
    color: string;
    cursor?: {
        x: number;
        y: number;
        element?: string;
    };
    selection?: {
        type: 'element' | 'text';
        elementId?: string;
        startOffset?: number;
        endOffset?: number;
    };
    lastSeen: Date;
    isTyping?: boolean;
}

interface CollaborationEvent {
    id: string;
    type: 'cursor' | 'selection' | 'typing' | 'edit' | 'presence';
    userId: string;
    data: any;
    timestamp: Date;
}

interface CollaborationState {
    users: Map<string, User>;
    events: CollaborationEvent[];
    isConnected: boolean;
    currentUserId: string;
}

interface CollaborationConfig {
    enabled: boolean;
    showCursors: boolean;
    showTypingIndicators: boolean;
    maxUsers: number;
    debounceMs: number;
    mockMode: boolean; // For demo purposes
}

const MOCK_USERS: User[] = [
    { id: 'user1', name: 'Ana Silva', color: '#3B82F6', lastSeen: new Date() },
    { id: 'user2', name: 'Carlos Santos', color: '#EF4444', lastSeen: new Date() },
    { id: 'user3', name: 'Maria Costa', color: '#10B981', lastSeen: new Date() }
];

export const useCollaboration = (
    config: Partial<CollaborationConfig> = {}
) => {
    const defaultConfig: CollaborationConfig = {
        enabled: true,
        showCursors: true,
        showTypingIndicators: true,
        maxUsers: 10,
        debounceMs: 100,
        mockMode: true,
        ...config
    };

    const [state, setState] = useState<CollaborationState>({
        users: new Map(),
        events: [],
        isConnected: false,
        currentUserId: 'current-user'
    });

    const wsRef = useRef<WebSocket | null>(null);
    const eventQueueRef = useRef<CollaborationEvent[]>([]);
    const debounceTimeoutRef = useRef<NodeJS.Timeout>();

    // Initialize collaboration
    useEffect(() => {
        if (!defaultConfig.enabled) return;

        if (defaultConfig.mockMode) {
            // Mock collaboration for demo
            setState(prev => ({
                ...prev,
                isConnected: true,
                users: new Map(MOCK_USERS.map(user => [user.id, user]))
            }));

            // Simulate user activity
            const interval = setInterval(() => {
                const randomUser = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
                const mockEvent: CollaborationEvent = {
                    id: `mock-${Date.now()}`,
                    type: Math.random() > 0.7 ? 'typing' : 'cursor',
                    userId: randomUser.id,
                    data: {
                        x: Math.random() * 800,
                        y: Math.random() * 600,
                        isTyping: Math.random() > 0.5
                    },
                    timestamp: new Date()
                };

                setState(prev => ({
                    ...prev,
                    events: [...prev.events.slice(-20), mockEvent] // Keep last 20 events
                }));
            }, 3000);

            return () => clearInterval(interval);
        }

        // Real WebSocket connection (commented for now)
        /*
        const ws = new WebSocket('ws://localhost:8080/collaboration');
        wsRef.current = ws;
    
        ws.onopen = () => {
          setState(prev => ({ ...prev, isConnected: true }));
        };
    
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          handleRemoteEvent(data);
        };
    
        ws.onclose = () => {
          setState(prev => ({ ...prev, isConnected: false }));
        };
    
        return () => {
          ws.close();
        };
        */
    }, [defaultConfig.enabled, defaultConfig.mockMode]);

    const sendEvent = useCallback((event: Omit<CollaborationEvent, 'id' | 'timestamp'>) => {
        if (!defaultConfig.enabled || !state.isConnected) return;

        const fullEvent: CollaborationEvent = {
            ...event,
            id: `${Date.now()}-${Math.random()}`,
            timestamp: new Date()
        };

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            if (defaultConfig.mockMode) {
                // Just add to local state for demo
                setState(prev => ({
                    ...prev,
                    events: [...prev.events, fullEvent]
                }));
            } else if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.send(JSON.stringify(fullEvent));
            }
        }, defaultConfig.debounceMs);
    }, [defaultConfig.enabled, defaultConfig.debounceMs, defaultConfig.mockMode, state.isConnected]);

    const updateCursor = useCallback((x: number, y: number, element?: string) => {
        sendEvent({
            type: 'cursor',
            userId: state.currentUserId,
            data: { x, y, element }
        });
    }, [sendEvent, state.currentUserId]);

    const updateSelection = useCallback((selection: User['selection']) => {
        sendEvent({
            type: 'selection',
            userId: state.currentUserId,
            data: selection
        });
    }, [sendEvent, state.currentUserId]);

    const setTyping = useCallback((isTyping: boolean, elementId?: string) => {
        sendEvent({
            type: 'typing',
            userId: state.currentUserId,
            data: { isTyping, elementId }
        });
    }, [sendEvent, state.currentUserId]);

    const broadcastEdit = useCallback((editData: any) => {
        sendEvent({
            type: 'edit',
            userId: state.currentUserId,
            data: editData
        });
    }, [sendEvent, state.currentUserId]);

    return {
        ...state,
        config: defaultConfig,
        updateCursor,
        updateSelection,
        setTyping,
        broadcastEdit
    };
};

// Collaboration panel component
interface CollaborationPanelProps {
    collaboration: ReturnType<typeof useCollaboration>;
    isVisible: boolean;
    onClose: () => void;
}

export const CollaborationPanel: React.FC<CollaborationPanelProps> = ({
    collaboration,
    isVisible,
    onClose
}) => {
    if (!isVisible || !collaboration.config.enabled) return null;

    const users = Array.from(collaboration.users.values());
    const recentEvents = collaboration.events.slice(-10);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const getEventIcon = (type: string) => {
        switch (type) {
            case 'cursor': return '👆';
            case 'selection': return '🎯';
            case 'typing': return '⌨️';
            case 'edit': return '✏️';
            default: return '📝';
        }
    };

    const getEventDescription = (event: CollaborationEvent) => {
        const user = collaboration.users.get(event.userId);
        const userName = user?.name || 'Usuário';

        switch (event.type) {
            case 'cursor':
                return `${userName} moveu o cursor`;
            case 'selection':
                return `${userName} selecionou um elemento`;
            case 'typing':
                return `${userName} ${event.data.isTyping ? 'está digitando' : 'parou de digitar'}`;
            case 'edit':
                return `${userName} fez uma edição`;
            default:
                return `${userName} fez uma ação`;
        }
    };

    return (
        <div className="fixed top-4 right-4 bg-white border border-gray-200 rounded-xl shadow-lg w-80 max-h-[60vh] z-50 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">👥</span>
                        <h3 className="font-semibold">Colaboração</h3>
                        <div className={`w-2 h-2 rounded-full ${collaboration.isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
                    </div>
                    <button
                        onClick={onClose}
                        className="w-6 h-6 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition"
                    >
                        ✕
                    </button>
                </div>
                <p className="text-purple-100 text-sm mt-1">
                    {users.length} usuários online
                </p>
            </div>

            {/* Users List */}
            <div className="p-4 border-b bg-gray-50">
                <h4 className="font-medium text-gray-900 mb-3 text-sm">👤 Usuários Online</h4>
                <div className="space-y-2">
                    {users.map(user => (
                        <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg bg-white border">
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm"
                                style={{ backgroundColor: user.color }}
                            >
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 text-sm truncate">
                                    {user.name}
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500">
                                        {user.id === collaboration.currentUserId ? 'Você' : 'Colaborador'}
                                    </span>
                                    {user.isTyping && (
                                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                                            ⌨️ Digitando...
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="p-4">
                <h4 className="font-medium text-gray-900 mb-3 text-sm">📊 Atividade Recente</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                    {recentEvents.length === 0 ? (
                        <p className="text-gray-500 text-sm text-center py-4">
                            Nenhuma atividade recente
                        </p>
                    ) : (
                        recentEvents.reverse().map(event => (
                            <div key={event.id} className="flex items-start gap-2 p-2 rounded bg-gray-50">
                                <span className="text-sm">{getEventIcon(event.type)}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-900">
                                        {getEventDescription(event)}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {formatTime(event.timestamp)}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Connection Status */}
            <div className="p-3 bg-gray-50 border-t">
                <div className="flex items-center justify-between">
                    <span className={`text-sm ${collaboration.isConnected ? 'text-green-600' : 'text-red-600'}`}>
                        {collaboration.isConnected ? '🟢 Conectado' : '🔴 Desconectado'}
                    </span>
                    {collaboration.config.mockMode && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            Modo Demo
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

// Cursor overlay component
interface CursorOverlayProps {
    collaboration: ReturnType<typeof useCollaboration>;
    containerRef: React.RefObject<HTMLElement>;
}

export const CursorOverlay: React.FC<CursorOverlayProps> = ({
    collaboration,
    containerRef
}) => {
    if (!collaboration.config.showCursors || !collaboration.isConnected) return null;

    const users = Array.from(collaboration.users.values())
        .filter(user => user.id !== collaboration.currentUserId && user.cursor);

    return (
        <div className="fixed inset-0 pointer-events-none z-40">
            {users.map(user =>
                user.cursor && (
                    <div
                        key={user.id}
                        className="absolute transition-all duration-100"
                        style={{
                            left: user.cursor.x,
                            top: user.cursor.y,
                            transform: 'translate(-2px, -2px)'
                        }}
                    >
                        <div
                            className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
                            style={{ backgroundColor: user.color }}
                        />
                        <div
                            className="mt-1 px-2 py-1 rounded text-white text-xs font-medium shadow-lg whitespace-nowrap"
                            style={{ backgroundColor: user.color }}
                        >
                            {user.name}
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

// Mouse tracking hook
export const useMouseTracking = (
    collaboration: ReturnType<typeof useCollaboration>,
    containerRef: React.RefObject<HTMLElement>
) => {
    useEffect(() => {
        if (!collaboration.config.enabled || !collaboration.config.showCursors) return;

        const handleMouseMove = (event: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                collaboration.updateCursor(x, y);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            return () => container.removeEventListener('mousemove', handleMouseMove);
        }
    }, [collaboration, containerRef]);
};

export default useCollaboration;