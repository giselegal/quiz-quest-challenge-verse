
import { useState, useCallback } from 'react';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

interface ToastState {
  toasts: Toast[];
}

const initialState: ToastState = {
  toasts: []
};

export const useToast = () => {
  const [state, setState] = useState<ToastState>(initialState);

  const toast = useCallback(({ title, description, variant = 'default' }: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, title, description, variant };
    
    setState(prev => ({
      toasts: [...prev.toasts, newToast]
    }));

    // Auto remove toast after 5 seconds
    setTimeout(() => {
      setState(prev => ({
        toasts: prev.toasts.filter(t => t.id !== id)
      }));
    }, 5000);
  }, []);

  const dismiss = useCallback((toastId: string) => {
    setState(prev => ({
      toasts: prev.toasts.filter(t => t.id !== toastId)
    }));
  }, []);

  return {
    toast,
    dismiss,
    toasts: state.toasts
  };
};
