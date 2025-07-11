
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, GitBranch, Clock, AlertCircle } from 'lucide-react';

interface SyncStatus {
  lastSync: string;
  status: 'synced' | 'pending' | 'error';
  branch: string;
  commits: number;
  repository: string;
}

export const GitHubSyncStatus: React.FC = () => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    lastSync: '2024-01-11 21:45:00',
    status: 'synced',
    branch: 'main',
    commits: 12,
    repository: 'meu-projeto-quiz'
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleManualSync = async () => {
    setIsLoading(true);
    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSyncStatus(prev => ({
      ...prev,
      lastSync: new Date().toLocaleString('pt-BR'),
      status: 'synced'
    }));
    
    setIsLoading(false);
  };

  const getStatusColor = () => {
    switch (syncStatus.status) {
      case 'synced':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getStatusText = () => {
    switch (syncStatus.status) {
      case 'synced':
        return 'Sincronizado';
      case 'pending':
        return 'Pendente';
      case 'error':
        return 'Erro';
    }
  };

  const getStatusIcon = () => {
    switch (syncStatus.status) {
      case 'synced':
        return <Github className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'error':
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github className="h-5 w-5" />
          Status GitHub
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Repositório</label>
            <div className="font-mono text-sm">{syncStatus.repository}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Branch</label>
            <div className="flex items-center gap-2">
              <GitBranch className="h-4 w-4" />
              <span className="font-mono text-sm">{syncStatus.branch}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Último Sync</label>
            <div className="text-sm">{syncStatus.lastSync}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Status</label>
            <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs border ${getStatusColor()}`}>
              {getStatusIcon()}
              {getStatusText()}
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Commits pendentes</div>
              <div className="text-xs text-gray-500">{syncStatus.commits} alterações para sincronizar</div>
            </div>
            <Button 
              onClick={handleManualSync}
              disabled={isLoading}
              size="sm"
            >
              {isLoading ? 'Sincronizando...' : 'Sincronizar Agora'}
            </Button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="text-sm">
            <div className="font-medium text-blue-800">Sincronização Automática</div>
            <div className="text-blue-600 text-xs mt-1">
              Alterações são automaticamente sincronizadas com o GitHub a cada 5 minutos.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
