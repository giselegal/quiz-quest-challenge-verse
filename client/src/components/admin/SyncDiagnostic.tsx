import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SyncDiagnostic: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sync Diagnostic</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Sync diagnostic component for monitoring system synchronization status.
        </p>
      </CardContent>
    </Card>
  );
};

export default SyncDiagnostic;