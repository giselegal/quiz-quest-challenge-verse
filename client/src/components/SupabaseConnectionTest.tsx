
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SupabaseConnectionTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Teste de Conexão Supabase</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Testando conexão com Supabase...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
