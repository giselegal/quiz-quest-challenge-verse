
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useFallback } from './FallbackProvider';
import { diagnostics } from '@/utils/diagnostics';

export const OfflineNotification: React.FC = () => {
  const { isOfflineMode, isLovableAvailable } = useFallback();
  const [isVisible, setIsVisible] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    // Mostrar notificação quando offline ou Lovable indisponível
    setIsVisible(isOfflineMode || !isLovableAvailable);
  }, [isOfflineMode, isLovableAvailable]);

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await diagnostics.runFullDiagnostic();
      // Se ainda estiver com problemas, a notificação permanece
    } catch (error) {
      console.error('Retry failed:', error);
    } finally {
      setIsRetrying(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <Alert className="fixed top-4 left-1/2 transform -translate-x-1/2 w-96 z-50 bg-orange-50 border-orange-200">
      <div className="flex items-center gap-2">
        {isOfflineMode ? (
          <WifiOff className="h-4 w-4 text-orange-600" />
        ) : (
          <Wifi className="h-4 w-4 text-yellow-600" />
        )}
        <AlertDescription className="flex-1">
          {isOfflineMode ? (
            <div>
              <strong>Modo Offline Ativo</strong>
              <br />
              Funcionalidades limitadas. O quiz continua funcionando normalmente.
            </div>
          ) : (
            <div>
              <strong>Serviços Lovable Indisponíveis</strong>
              <br />
              Editor pode estar limitado. Quiz funciona normalmente.
            </div>
          )}
        </AlertDescription>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetry}
            disabled={isRetrying}
          >
            <RefreshCw className={`h-3 w-3 ${isRetrying ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
          >
            ✕
          </Button>
        </div>
      </div>
    </Alert>
  );
};
