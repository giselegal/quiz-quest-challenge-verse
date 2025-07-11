import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const SyncDiagnostic: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Diagnóstico de Sincronização</CardTitle>
        <CardDescription>
          Status e diagnóstico dos processos de sincronização
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Diagnósticos de sincronização serão exibidos aqui.
        </p>
      </CardContent>
    </Card>
  );
};