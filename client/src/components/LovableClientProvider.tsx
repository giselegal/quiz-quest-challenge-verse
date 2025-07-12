import React, { ReactNode, useEffect } from 'react';

interface LovableClientProviderProps {
  children: ReactNode;
}

const LovableClientProvider: React.FC<LovableClientProviderProps> = ({ children }) => {
  useEffect(() => {
    // Desabilitar telemetria em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.log('🧹 Ambiente de desenvolvimento limpo - Telemetria desabilitada');
      
      // Interceptar console.error para filtrar erros de telemetria
      const originalConsoleError = console.error;
      console.error = (...args: any[]) => {
        const message = args.join(' ');
        const blockedTerms = [
          'pushLogsToGrafana',
          'lovable.app',
          'gpt-engineer-390607',
          'rum_collection'
        ];
        
        const shouldBlock = blockedTerms.some(term => message.includes(term));
        if (!shouldBlock) {
          originalConsoleError.apply(console, args);
        }
      };
    }
  }, []);

  return <>{children}</>;
};

export default LovableClientProvider;