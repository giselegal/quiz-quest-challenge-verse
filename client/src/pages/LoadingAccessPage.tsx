
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LoadingAccessPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-8 flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Carregando...</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Preparando seu acesso...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingAccessPage;
