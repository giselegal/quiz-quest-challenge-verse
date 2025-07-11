import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { SyncDiagnostic } from '@/components/admin/SyncDiagnostic';
import { GitHubSyncStatus } from '@/components/admin/GitHubSyncStatus';

const SyncManagementPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gerenciamento de Sincronização</h1>
          <p className="text-gray-600">Monitore e gerencie sincronização de dados</p>
        </div>

        <div className="grid gap-6">
          <GitHubSyncStatus />
          <SyncDiagnostic />
        </div>
      </div>
    </AdminLayout>
  );
};

export default SyncManagementPage;