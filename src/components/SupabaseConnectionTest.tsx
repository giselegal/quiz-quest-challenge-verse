import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SupabaseConnectionTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'error'>('testing');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const testConnection = async () => {
    setConnectionStatus('testing');
    setErrorMessage('');

    try {
      const { data, error } = await supabase.from('quizzes').select('id').limit(1);
      
      if (error) {
        setConnectionStatus('error');
        setErrorMessage(error.message);
      } else {
        setConnectionStatus('connected');
      }
    } catch (err) {
      setConnectionStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Teste de Conexão Supabase</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <strong>Status:</strong>{' '}
              <span className={
                connectionStatus === 'connected' ? 'text-green-600' :
                connectionStatus === 'error' ? 'text-red-600' :
                'text-yellow-600'
              }>
                {connectionStatus === 'testing' && 'Testando...'}
                {connectionStatus === 'connected' && 'Conectado ✓'}
                {connectionStatus === 'error' && 'Erro ✗'}
              </span>
            </div>

            {errorMessage && (
              <div className="text-red-600">
                <strong>Erro:</strong> {errorMessage}
              </div>
            )}

            <Button onClick={testConnection} disabled={connectionStatus === 'testing'}>
              Testar Novamente
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupabaseConnectionTest;