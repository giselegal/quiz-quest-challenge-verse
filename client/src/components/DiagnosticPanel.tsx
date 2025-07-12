
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, XCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { diagnostics } from '@/utils/diagnostics';
import { useFallback } from './FallbackProvider';

interface DiagnosticResult {
  service: string;
  status: 'healthy' | 'degraded' | 'down';
  responseTime?: number;
  error?: string;
  timestamp: number;
}

export const DiagnosticPanel: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  
  const { isOfflineMode, forceOfflineMode, forceOnlineMode } = useFallback();

  useEffect(() => {
    // Mostrar painel apenas em desenvolvimento ou quando há problemas
    const showPanel = process.env.NODE_ENV === 'development' || 
                     window.location.search.includes('debug=true') ||
                     isOfflineMode;
    setIsVisible(showPanel);
  }, [isOfflineMode]);

  const runDiagnostic = async () => {
    setIsRunning(true);
    try {
      const report = await diagnostics.runFullDiagnostic();
      setResults(report.services);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Diagnostic failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'degraded': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'down': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      healthy: 'default',
      degraded: 'secondary',
      down: 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  if (!isVisible) return null;

  return (
    <Card className="fixed bottom-4 right-4 w-96 z-50 bg-background/95 backdrop-blur-sm border-2 border-orange-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center justify-between">
          <span className="flex items-center gap-2">
            {isOfflineMode ? (
              <WifiOff className="h-4 w-4 text-red-500" />
            ) : (
              <Wifi className="h-4 w-4 text-green-500" />
            )}
            Diagnóstico do Sistema
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={runDiagnostic}
            disabled={isRunning}
          >
            <RefreshCw className={`h-3 w-3 ${isRunning ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Status geral */}
        <div className="flex items-center justify-between p-2 bg-muted rounded">
          <span className="text-sm font-medium">
            Modo: {isOfflineMode ? 'Offline' : 'Online'}
          </span>
          <div className="flex gap-2">
            <Button
              variant={isOfflineMode ? 'default' : 'outline'}
              size="sm"
              onClick={forceOfflineMode}
            >
              Offline
            </Button>
            <Button
              variant={!isOfflineMode ? 'default' : 'outline'}
              size="sm"
              onClick={forceOnlineMode}
            >
              Online
            </Button>
          </div>
        </div>

        {/* Resultados dos serviços */}
        <div className="space-y-2">
          {results.map((result, index) => (
            <div key={index} className="flex items-center justify-between text-xs p-2 border rounded">
              <div className="flex items-center gap-2">
                {getStatusIcon(result.status)}
                <span className="font-mono">{result.service}</span>
                {result.responseTime && (
                  <span className="text-muted-foreground">
                    ({result.responseTime}ms)
                  </span>
                )}
              </div>
              {getStatusBadge(result.status)}
            </div>
          ))}
        </div>

        {/* Informações adicionais */}
        <div className="text-xs text-muted-foreground space-y-1">
          {lastUpdate && (
            <div>Última verificação: {lastUpdate.toLocaleTimeString()}</div>
          )}
          <div className="flex justify-between">
            <span>Navigator Online: {navigator.onLine ? 'Sim' : 'Não'}</span>
            <span>Fallback: {diagnostics.isFallbackMode() ? 'Ativo' : 'Inativo'}</span>
          </div>
        </div>

        {/* Ações rápidas */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => window.location.reload()}
          >
            Recarregar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => setIsVisible(false)}
          >
            Ocultar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
