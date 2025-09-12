import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Info, XCircle, Sparkles } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'celebration';

export interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
    persistent?: boolean;
    actions?: ToastAction[];
}

export interface ToastAction {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
}

interface ToastContextValue {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id'>) => string;
    removeToast: (id: string) => void;
    clearAllToasts: () => void;
    // Convenience methods
    success: (title: string, message?: string, options?: Partial<Toast>) => string;
    error: (title: string, message?: string, options?: Partial<Toast>) => string;
    warning: (title: string, message?: string, options?: Partial<Toast>) => string;
    info: (title: string, message?: string, options?: Partial<Toast>) => string;
    celebration: (title: string, message?: string, options?: Partial<Toast>) => string;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

// Toast Component
const ToastComponent: React.FC<{ toast: Toast; onRemove: (id: string) => void }> = ({ 
    toast, 
    onRemove 
}) => {
    const { id, type, title, message, actions } = toast;

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-400" />,
        error: <XCircle className="w-5 h-5 text-red-400" />,
        warning: <AlertTriangle className="w-5 h-5 text-orange-400" />,
        info: <Info className="w-5 h-5 text-blue-400" />,
        celebration: (
            <motion.div
                animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ 
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: 2
                }}
            >
                <Sparkles className="w-5 h-5 text-yellow-400" />
            </motion.div>
        )
    };

    const colorClasses = {
        success: 'bg-green-900/90 border-green-700 text-green-100',
        error: 'bg-red-900/90 border-red-700 text-red-100',
        warning: 'bg-orange-900/90 border-orange-700 text-orange-100',
        info: 'bg-blue-900/90 border-blue-700 text-blue-100',
        celebration: 'bg-gradient-to-r from-purple-900/90 to-pink-900/90 border-purple-500 text-purple-100'
    };

    return (
        <motion.div
            initial={{ 
                opacity: 0, 
                y: -50, 
                scale: 0.9 
            }}
            animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1 
            }}
            exit={{ 
                opacity: 0, 
                x: 300, 
                scale: 0.8 
            }}
            transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300 
            }}
            className={`
                relative max-w-md w-full p-4 rounded-lg border shadow-lg backdrop-blur-sm
                ${colorClasses[type]}
            `}
        >
            {/* Close button */}
            <button
                onClick={() => onRemove(id)}
                className="absolute top-2 right-2 p-1 rounded-full opacity-70 hover:opacity-100 hover:bg-white/10 transition-all"
            >
                <X className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="flex gap-3 pr-6">
                <div className="flex-shrink-0 mt-0.5">
                    {icons[type]}
                </div>
                
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold mb-1">
                        {title}
                    </h4>
                    
                    {message && (
                        <p className="text-xs opacity-90 mb-3">
                            {message}
                        </p>
                    )}

                    {/* Actions */}
                    {actions && actions.length > 0 && (
                        <div className="flex gap-2 mt-3">
                            {actions.map((action, index) => (
                                <button
                                    key={index}
                                    onClick={action.onClick}
                                    className={`
                                        px-3 py-1 text-xs rounded-md font-medium transition-colors
                                        ${action.variant === 'primary' 
                                            ? 'bg-white/20 hover:bg-white/30 text-white' 
                                            : 'bg-white/10 hover:bg-white/20 text-white/80'
                                        }
                                    `}
                                >
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Progress bar for non-persistent toasts */}
            {!toast.persistent && toast.duration && (
                <motion.div
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: 0 }}
                    transition={{ 
                        duration: toast.duration / 1000,
                        ease: "linear"
                    }}
                    className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-bl-lg origin-left"
                />
            )}

            {/* Celebration particles */}
            {type === 'celebration' && (
                <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ 
                                opacity: 1,
                                scale: 0,
                                x: "50%", 
                                y: "50%" 
                            }}
                            animate={{
                                opacity: [1, 1, 0],
                                scale: [0, 1, 1.2],
                                x: [
                                    "50%", 
                                    `${50 + (Math.random() - 0.5) * 200}%`
                                ],
                                y: [
                                    "50%", 
                                    `${50 + (Math.random() - 0.5) * 200}%`
                                ]
                            }}
                            transition={{
                                duration: 1.5,
                                delay: i * 0.1
                            }}
                            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                        />
                    ))}
                </div>
            )}
        </motion.div>
    );
};

// Toast Container
const ToastContainer: React.FC<{ toasts: Toast[]; onRemove: (id: string) => void }> = ({ 
    toasts, 
    onRemove 
}) => {
    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <ToastComponent
                        key={toast.id}
                        toast={toast}
                        onRemove={onRemove}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

// Toast Provider
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
        const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        const newToast: Toast = {
            ...toast,
            id,
            duration: toast.duration ?? 5000
        };

        setToasts(prev => [...prev, newToast]);

        // Auto remove non-persistent toasts
        if (!newToast.persistent && newToast.duration) {
            setTimeout(() => {
                removeToast(id);
            }, newToast.duration);
        }

        return id;
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const clearAllToasts = useCallback(() => {
        setToasts([]);
    }, []);

    // Convenience methods
    const success = useCallback((title: string, message?: string, options?: Partial<Toast>) => {
        return addToast({
            type: 'success',
            title,
            message,
            ...options
        });
    }, [addToast]);

    const error = useCallback((title: string, message?: string, options?: Partial<Toast>) => {
        return addToast({
            type: 'error',
            title,
            message,
            duration: 8000, // Errors stay longer
            ...options
        });
    }, [addToast]);

    const warning = useCallback((title: string, message?: string, options?: Partial<Toast>) => {
        return addToast({
            type: 'warning',
            title,
            message,
            duration: 6000,
            ...options
        });
    }, [addToast]);

    const info = useCallback((title: string, message?: string, options?: Partial<Toast>) => {
        return addToast({
            type: 'info',
            title,
            message,
            ...options
        });
    }, [addToast]);

    const celebration = useCallback((title: string, message?: string, options?: Partial<Toast>) => {
        return addToast({
            type: 'celebration',
            title,
            message,
            duration: 4000,
            ...options
        });
    }, [addToast]);

    const contextValue: ToastContextValue = {
        toasts,
        addToast,
        removeToast,
        clearAllToasts,
        success,
        error,
        warning,
        info,
        celebration
    };

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
};