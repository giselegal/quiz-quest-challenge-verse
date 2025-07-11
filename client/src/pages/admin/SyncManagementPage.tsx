
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { SyncDiagnostic } from '@/components/admin/SyncDiagnostic';
import { GitHubSyncStatus } from '@/components/admin/GitHubSyncStatus';

const SyncManagementPage = () => {
  return (
    <AdminLayout>
      <div className="container p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Gerenciamento de Sincronização</h1>
          <p className="text-muted-foreground">
            Monitore e gerencie a sincronização entre Lovable e GitHub
          </p>
        </div>
        
        <SyncDiagnostic />
        <GitHubSyncStatus />
      </div>
    </AdminLayout>
  );
};

export default SyncManagementPage;
