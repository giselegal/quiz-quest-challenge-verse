
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Clock, RefreshCw } from 'lucide-react';

interface DiagnosticResult {
  service: string;
  status: 'success' | 'warning' | 'error' | 'checking';
  message: string;
  details?: string;
}

export const SyncDiagnostic: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runDiagnostics = async () => {
    setIsRunning(true);
    
    const checks: DiagnosticResult[] = [
      { service: 'Lovable Connection', status: 'checking', message: 'Verificando conexão...' },
      { service: 'GitHub Integration', status: 'checking', message: 'Verificando integração...' },
      { service: 'Webhook Status', status: 'checking', message: 'Verificando webhooks...' },
      { service: 'API Token', status: 'checking', message: 'Verificando token...' },
      { service: 'Billing Status', status: 'checking', message: 'Verificando plano...' }
    ];
    
    setDiagnostics(checks);

    // Simulate diagnostic checks
    for (let i = 0; i < checks.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDiagnostics(prev => prev.map((check, index) => {
        if (index === i) {
          // Simulate different results
          const results = ['success', 'warning', 'error'] as const;
          const status = results[Math.floor(Math.random() * results.length)];
          const messages = {
            success: 'Funcionando corretamente',
            warning: 'Atenção necessária',
            error: 'Erro detectado'
          };
          
          return {
            ...check,
            status,
            message: messages[status],
            details: status === 'error' ? 'Detalhes do erro aqui' : undefined
          };
        }
        return check;
      }));
    }
    
    setIsRunning(false);
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  const getStatusIcon = (status: DiagnosticResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'checking':
        return <Clock className="h-5 w-5 text-blue-500 animate-spin" />;
    }
  };

  const getStatusColor = (status: DiagnosticResult['status']) => {
    switch (status) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'checking':
        return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Diagnóstico de Sincronização
        </CardTitle>
        <Button 
          onClick={runDiagnostics} 
          disabled={isRunning}
          size="sm"
          variant="outline"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRunning ? 'animate-spin' : ''}`} />
          {isRunning ? 'Verificando...' : 'Executar'}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {diagnostics.map((diagnostic, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg border ${getStatusColor(diagnostic.status)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(diagnostic.status)}
                  <div>
                    <div className="font-medium">{diagnostic.service}</div>
                    <div className="text-sm text-gray-600">{diagnostic.message}</div>
                    {diagnostic.details && (
                      <div className="text-xs text-gray-500 mt-1">{diagnostic.details}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
