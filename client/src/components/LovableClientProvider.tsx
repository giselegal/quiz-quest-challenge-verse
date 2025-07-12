
import React, { ReactNode, useEffect } from 'react';

interface LovableClientProviderProps {
  children: ReactNode;
}

const LovableClientProvider: React.FC<LovableClientProviderProps> = ({ children }) => {
  useEffect(() => {
    // Configuração básica para filtrar apenas telemetria específica
    if (process.env.NODE_ENV === 'development') {
      console.log('🧹 LovableClientProvider: Filtro básico ativado');
      
      // Interceptar apenas erros de telemetria específicos
      const originalConsoleError = console.error;
      
      const blockedTerms = [
        'pushLogsToGrafana',
        'gpt-engineer-390607',
        'rum_collection',
        'grafana'
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
      
      console.log('✅ Filtro básico configurado');
    }
  }, []);

  return <>{children}</>;
};

export default LovableClientProvider;
