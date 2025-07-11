import React from 'react';
import { Toast, ToastProvider, ToastViewport } from './toast';

// Simple hook for now - can be expanded later
const useToast = () => {
  const [toasts, setToasts] = React.useState<any[]>([]);
  return { toasts };
};

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <div className="text-sm font-semibold">{title}</div>}
              {description && (
                <div className="text-sm opacity-90">{description}</div>
              )}
            </div>
            {action}
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}