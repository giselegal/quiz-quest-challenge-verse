
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { diagnostics } from '@/utils/diagnostics';

interface FallbackContextType {
  isOfflineMode: boolean;
  isLovableAvailable: boolean;
  lastDiagnostic: Date | null;
  forceOfflineMode: () => void;
  forceOnlineMode: () => void;
}

const FallbackContext = createContext<FallbackContextType>({
  isOfflineMode: false,
  isLovableAvailable: true,
  lastDiagnostic: null,
  forceOfflineMode: () => {},
  forceOnlineMode: () => {}
});

interface FallbackProviderProps {
  children: ReactNode;
}

export const FallbackProvider: React.FC<FallbackProviderProps> = ({ children }) => {
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [isLovableAvailable, setIsLovableAvailable] = useState(true);
  const [lastDiagnostic, setLastDiagnostic] = useState<Date | null>(null);

  useEffect(() => {
    // Listener para eventos de fallback
    const handleFallbackActivation = () => {
      console.log('🔄 Fallback mode activated via event');
      setIsOfflineMode(true);
      setIsLovableAvailable(false);
    };

    // Listener para mudanças de conectividade
    const handleOnlineStatus = () => {
      if (navigator.onLine) {
        console.log('🌐 Internet connection restored');
        // Executar diagnóstico quando voltar online
        diagnostics.runFullDiagnostic().then(report => {
          setLastDiagnostic(new Date());
          if (report.overall !== 'down') {
            setIsOfflineMode(false);
            setIsLovableAvailable(true);
          }
        });
      } else {
        console.log('📡 Internet connection lost');
        setIsOfflineMode(true);
      }
    };

    window.addEventListener('fallback-mode-activated', handleFallbackActivation);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('fallback-mode-activated', handleFallbackActivation);
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const forceOfflineMode = () => {
    console.log('🔧 Forcing offline mode');
    setIsOfflineMode(true);
    setIsLovableAvailable(false);
  };

  const forceOnlineMode = () => {
    console.log('🔧 Forcing online mode');
    setIsOfflineMode(false);
    setIsLovableAvailable(true);
  };

  return (
    <FallbackContext.Provider value={{
      isOfflineMode,
      isLovableAvailable,
      lastDiagnostic,
      forceOfflineMode,
      forceOnlineMode
    }}>
      {children}
    </FallbackContext.Provider>
  );
};

export const useFallback = () => {
  const context = useContext(FallbackContext);
  if (!context) {
    throw new Error('useFallback must be used within a FallbackProvider');
  }
  return context;
};
