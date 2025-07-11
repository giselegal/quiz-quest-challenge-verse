import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const GitHubSyncStatus: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status GitHub Sync</CardTitle>
        <CardDescription>
          Status da sincronização com GitHub
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Status da sincronização GitHub será exibido aqui.
        </p>
      </CardContent>
    </Card>
  );
};