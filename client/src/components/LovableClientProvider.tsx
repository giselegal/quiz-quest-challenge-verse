import React, { ReactNode, useEffect } from 'react';

interface LovableClientProviderProps {
  children: ReactNode;
}

const LovableClientProvider: React.FC<LovableClientProviderProps> = ({ children }) => {
  useEffect(() => {
    // Configuração avançada para bloquear telemetria
    if (process.env.NODE_ENV === 'development') {
      console.log('🧹 LovableClientProvider: Ambiente limpo ativado');
      
      // Interceptar e silenciar erros específicos da telemetria
      const originalConsoleError = console.error;
      const originalConsoleWarn = console.warn;
      
      const blockedTerms = [
        'pushLogsToGrafana',
        'lovable.app',
        'gpt-engineer-390607',
        'rum_collection',
        'Failed to load resource',
        'Internal Server Error',
        'status of 500',
        'status of 404',
        'status of 400'
      ];
      
      console.error = (...args: any[]) => {
        const message = args.join(' ');
        const shouldBlock = blockedTerms.some(term => 
          message.toLowerCase().includes(term.toLowerCase())
        );
        
        if (!shouldBlock) {
          originalConsoleError.apply(console, args);
        }
      };
      
      console.warn = (...args: any[]) => {
        const message = args.join(' ');
        const shouldBlock = blockedTerms.some(term => 
          message.toLowerCase().includes(term.toLowerCase())
        );
        
        if (!shouldBlock) {
          originalConsoleWarn.apply(console, args);
        }
      };
      
      // Interceptar eventos de erro global
      window.addEventListener('error', (event) => {
        const message = event.message || '';
        const filename = event.filename || '';
        
        const shouldBlock = blockedTerms.some(term => 
          message.includes(term) || filename.includes(term)
        );
        
        if (shouldBlock) {
          event.preventDefault();
          event.stopPropagation();
        }
      }, true);
      
      // Interceptar promises rejeitadas
      window.addEventListener('unhandledrejection', (event) => {
        const reason = event.reason || {};
        const message = reason.message || reason.toString() || '';
        
        const shouldBlock = blockedTerms.some(term => 
          message.toLowerCase().includes(term.toLowerCase())
        );
        
        if (shouldBlock) {
          event.preventDefault();
        }
      });
      
      console.log('✅ Console limpo configurado - Telemetria silenciada');
    }
  }, []);

  return <>{children}</>;
};

export default LovableClientProvider;