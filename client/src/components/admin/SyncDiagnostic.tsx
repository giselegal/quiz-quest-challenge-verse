
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface DiagnosticResult {
  name: string;
  status: 'success' | 'error' | 'warning';
  message: string;
}

export const SyncDiagnostic: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<DiagnosticResult[]>([]);

  const runDiagnostic = async () => {
    setIsRunning(true);
    
    // Simulate diagnostic checks
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResults: DiagnosticResult[] = [
      {
        name: 'Conexão com Lovable',
        status: 'success',
        message: 'Conectado com sucesso'
      },
      {
        name: 'Sincronização GitHub',
        status: 'success',
        message: 'Repositório sincronizado'
      },
      {
        name: 'Configuração de Deploy',
        status: 'warning',
        message: 'Algumas configurações podem ser otimizadas'
      }
    ];
    
    setResults(mockResults);
    setIsRunning(false);
  };

  const getStatusIcon = (status: DiagnosticResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          Diagnóstico de Sincronização
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={runDiagnostic}
          disabled={isRunning}
          className="w-full"
        >
          {isRunning ? 'Executando...' : 'Executar Diagnóstico'}
        </Button>

        {results.length > 0 && (
          <div className="space-y-3">
            {results.map((result, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                {getStatusIcon(result.status)}
                <div className="flex-1">
                  <div className="font-medium">{result.name}</div>
                  <div className="text-sm text-muted-foreground">{result.message}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
