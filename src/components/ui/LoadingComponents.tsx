import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, RefreshCw } from 'lucide-react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'dots' | 'pulse' | 'bars';
    className?: string;
    color?: 'blue' | 'green' | 'orange' | 'white' | 'gray';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    variant = 'default',
    className = '',
    color = 'blue'
}) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    };

    const colorClasses = {
        blue: 'text-blue-500',
        green: 'text-green-500',
        orange: 'text-orange-500',
        white: 'text-white',
        gray: 'text-gray-400'
    };

    if (variant === 'default') {
        return (
            <Loader2
                className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
            />
        );
    }

    if (variant === 'dots') {
        return (
            <div className={`flex space-x-1 ${className}`}>
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className={`rounded-full bg-current ${size === 'sm' ? 'w-1 h-1' :
                                size === 'md' ? 'w-2 h-2' :
                                    'w-3 h-3'
                            } ${colorClasses[color]}`}
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2
                        }}
                    />
                ))}
            </div>
        );
    }

    if (variant === 'pulse') {
        return (
            <motion.div
                className={`rounded-full bg-current ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        );
    }

    if (variant === 'bars') {
        return (
            <div className={`flex space-x-1 ${className}`}>
                {[0, 1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        className={`bg-current ${size === 'sm' ? 'w-0.5 h-3' :
                                size === 'md' ? 'w-1 h-4' :
                                    'w-1.5 h-6'
                            } ${colorClasses[color]}`}
                        animate={{
                            scaleY: [1, 2, 1]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.15
                        }}
                    />
                ))}
            </div>
        );
    }

    return null;
};

interface LoadingOverlayProps {
    isVisible: boolean;
    message?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'dots' | 'pulse' | 'bars';
    className?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
    isVisible,
    message = 'Carregando...',
    size = 'md',
    variant = 'default',
    className = ''
}) => {
    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 ${className}`}
        >
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 flex flex-col items-center gap-4">
                <LoadingSpinner size={size} variant={variant} color="blue" />
                <p className="text-white text-sm">{message}</p>
            </div>
        </motion.div>
    );
};

interface InlineLoadingProps {
    isLoading: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'dots' | 'pulse' | 'bars';
    message?: string;
    color?: 'blue' | 'green' | 'orange' | 'white' | 'gray';
    className?: string;
}

export const InlineLoading: React.FC<InlineLoadingProps> = ({
    isLoading,
    size = 'sm',
    variant = 'default',
    message,
    color = 'blue',
    className = ''
}) => {
    if (!isLoading) return null;

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <LoadingSpinner size={size} variant={variant} color={color} />
            {message && (
                <span className={`text-sm ${color === 'white' ? 'text-white' :
                        color === 'gray' ? 'text-gray-400' :
                            color === 'green' ? 'text-green-500' :
                                color === 'orange' ? 'text-orange-500' :
                                    'text-blue-500'
                    }`}>
                    {message}
                </span>
            )}
        </div>
    );
};

// Button with integrated loading state
interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    loadingText?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'secondary' | 'danger';
    children: React.ReactNode;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
    isLoading = false,
    loadingText,
    size = 'md',
    variant = 'primary',
    children,
    className = '',
    disabled,
    ...props
}) => {
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
    };

    const variantClasses = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
        danger: 'bg-red-600 hover:bg-red-700 text-white'
    };

    const spinnerSize = size === 'sm' ? 'sm' : size === 'lg' ? 'md' : 'sm';

    return (
        <button
            {...props}
            disabled={disabled || isLoading}
            className={`
                relative flex items-center justify-center gap-2 
                rounded-lg font-medium transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
                ${sizeClasses[size]}
                ${isLoading ? 'cursor-wait' : variantClasses[variant]}
                ${className}
            `}
        >
            {isLoading && (
                <LoadingSpinner size={spinnerSize} color="white" />
            )}
            <span className={isLoading ? 'opacity-75' : ''}>
                {isLoading && loadingText ? loadingText : children}
            </span>
        </button>
    );
};