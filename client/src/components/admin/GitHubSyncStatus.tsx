
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const GitHubSyncStatus: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>GitHub Sync Status</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">GitHub sync status component</p>
      </CardContent>
    </Card>
  );
};

export default GitHubSyncStatus;
