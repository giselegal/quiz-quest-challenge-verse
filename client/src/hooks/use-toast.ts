
import { useState, useCallback } from 'react';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  action?: React.ReactNode;
}

interface ToastState {
  toasts: Toast[];
}

const initialState: ToastState = {
  toasts: []
};

let toastState = initialState;
let listeners: (() => void)[] = [];

export const useToast = () => {
  const [state, setState] = useState<ToastState>(toastState);

  useState(() => {
    listeners.push(() => setState(toastState));
    return () => {
      listeners = listeners.filter(l => l !== (() => setState(toastState)));
    };
  });

  const toast = useCallback(({ title, description, variant = 'default', action }: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, title, description, variant, action };
    
    toastState = {
      toasts: [...toastState.toasts, newToast]
    };
    
    listeners.forEach(listener => listener());

    // Auto remove toast after 5 seconds
    setTimeout(() => {
      toastState = {
        toasts: toastState.toasts.filter(t => t.id !== id)
      };
      listeners.forEach(listener => listener());
    }, 5000);

    return {
      id,
      dismiss: () => dismiss(id),
      update: (props: Partial<Toast>) => {
        toastState = {
          toasts: toastState.toasts.map(t => t.id === id ? { ...t, ...props } : t)
        };
        listeners.forEach(listener => listener());
      }
    };
  }, []);

  const dismiss = useCallback((toastId: string) => {
    toastState = {
      toasts: toastState.toasts.filter(t => t.id !== toastId)
    };
    listeners.forEach(listener => listener());
  }, []);

  return {
    toast,
    dismiss,
    toasts: state.toasts
  };
};

// Export individual toast function for convenience
export const toast = ({ title, description, variant = 'default', action }: Omit<Toast, 'id'>) => {
  const id = Math.random().toString(36).substr(2, 9);
  const newToast: Toast = { id, title, description, variant, action };
  
  toastState = {
    toasts: [...toastState.toasts, newToast]
  };
  
  listeners.forEach(listener => listener());

  // Auto remove toast after 5 seconds
  setTimeout(() => {
    toastState = {
      toasts: toastState.toasts.filter(t => t.id !== id)
    };
    listeners.forEach(listener => listener());
  }, 5000);

  return {
    id,
    dismiss: () => {
      toastState = {
        toasts: toastState.toasts.filter(t => t.id !== id)
      };
      listeners.forEach(listener => listener());
    }
  };
};
