
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Github, Clock, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GitHubSyncData {
  lastCommit: string | null;
  lastPush: string | null;
  syncStatus: 'synced' | 'pending' | 'error';
  branchName: string;
  commitMessage: string;
  errors: string[];
}

export const GitHubSyncStatus: React.FC = () => {
  const [syncData, setSyncData] = useState<GitHubSyncData>({
    lastCommit: null,
    lastPush: null,
    syncStatus: 'pending',
    branchName: 'main',
    commitMessage: '',
    errors: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const checkGitHubSync = async () => {
    setIsLoading(true);
    try {
      // Simular verificação do GitHub (em produção seria uma chamada real)
      const lastCommit = localStorage.getItem('github_last_commit') || null;
      const lastPush = localStorage.getItem('github_last_push') || null;
      
      // Verificar se há diferenças entre Lovable e GitHub
      const lovableLastUpdate = localStorage.getItem('lovable_last_update') || null;
      
      let status: 'synced' | 'pending' | 'error' = 'synced';
      const errors: string[] = [];
      
      if (!lastCommit) {
        status = 'error';
        errors.push('Nenhum commit encontrado no GitHub');
      }
      
      if (lastPush && lovableLastUpdate) {
        const pushTime = new Date(lastPush).getTime();
        const updateTime = new Date(lovableLastUpdate).getTime();
        
        if (updateTime > pushTime + 300000) { // 5 minutos de diferença
          status = 'pending';
          errors.push('Mudanças no Lovable não sincronizadas com GitHub');
        }
      }

      setSyncData({
        lastCommit: lastCommit,
        lastPush: lastPush,
        syncStatus: status,
        branchName: 'main',
        commitMessage: 'Latest updates from Lovable',
        errors: errors
      });

    } catch (error) {
      console.error('Erro ao verificar sync:', error);
      setSyncData(prev => ({
        ...prev,
        syncStatus: 'error',
        errors: ['Erro ao verificar sincronização com GitHub']
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const forcePushToGitHub = async () => {
    setIsLoading(true);
    try {
      // Simular push para GitHub
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const now = new Date().toISOString();
      localStorage.setItem('github_last_push', now);
      localStorage.setItem('github_last_commit', now);
      
      setSyncData(prev => ({
        ...prev,
        lastPush: now,
        lastCommit: now,
        syncStatus: 'synced',
        errors: []
      }));
      
      toast({
        title: "Sincronização concluída",
        description: "Mudanças enviadas para o GitHub com sucesso",
      });
      
    } catch (error) {
      console.error('Erro no push:', error);
      toast({
        title: "Erro na sincronização",
        description: "Não foi possível enviar as mudanças para o GitHub",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkGitHubSync();
    
    // Verificar sincronização a cada 5 minutos
    const interval = setInterval(checkGitHubSync, 300000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'synced': return 'text-green-500';
      case 'pending': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'synced': return <CheckCircle2 className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'error': return <AlertCircle className="h-4 w-4" />;
      default: return <RefreshCw className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github className="h-5 w-5" />
          Status de Sincronização GitHub
        </CardTitle>
        <CardDescription>
          Monitore e controle a sincronização entre Lovable e GitHub
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={getStatusColor(syncData.syncStatus)}>
              {getStatusIcon(syncData.syncStatus)}
            </div>
            <span className="font-medium">Status de Sincronização</span>
          </div>
          <Badge 
            variant={syncData.syncStatus === 'synced' ? 'default' : 
                    syncData.syncStatus === 'pending' ? 'secondary' : 'destructive'}
          >
            {syncData.syncStatus === 'synced' ? 'Sincronizado' :
             syncData.syncStatus === 'pending' ? 'Pendente' : 'Erro'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Branch Ativa:</span>
              <span className="text-sm font-mono">{syncData.branchName}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Último Commit:</span>
              <span className="text-sm">
                {syncData.lastCommit 
                  ? new Date(syncData.lastCommit).toLocaleString()
                  : 'Nunca'
                }
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Último Push:</span>
              <span className="text-sm">
                {syncData.lastPush 
                  ? new Date(syncData.lastPush).toLocaleString()
                  : 'Nunca'
                }
              </span>
            </div>
          </div>
        </div>

        {syncData.errors.length > 0 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-1">
                <strong>Problemas de sincronização:</strong>
                <ul className="list-disc list-inside space-y-1">
                  {syncData.errors.map((error, index) => (
                    <li key={index} className="text-sm">{error}</li>
                  ))}
                </ul>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button 
            onClick={checkGitHubSync}
            variant="outline"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Verificar Status
          </Button>
          
          <Button 
            onClick={forcePushToGitHub}
            disabled={isLoading || syncData.syncStatus === 'synced'}
            className="bg-[#B89B7A] hover:bg-[#A38A69]"
          >
            <Github className="h-4 w-4 mr-2" />
            {isLoading ? 'Sincronizando...' : 'Forçar Push'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
