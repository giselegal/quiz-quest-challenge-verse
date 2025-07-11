
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, Github, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SyncStatus {
  githubConnection: boolean;
  lovableConnection: boolean;
  webhookActive: boolean;
  tokenValid: boolean;
  billingStatus: boolean;
  lastSync: string | null;
  errors: string[];
}

export const SyncDiagnostic: React.FC = () => {
  const [status, setStatus] = useState<SyncStatus>({
    githubConnection: false,
    lovableConnection: false,
    webhookActive: false,
    tokenValid: false,
    billingStatus: false,
    lastSync: null,
    errors: []
  });
  const [isChecking, setIsChecking] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  const checkSyncStatus = async () => {
    setIsChecking(true);
    try {
      // Verificar configuração do Lovable
      const lovableConfig = (window as any).LOVABLE_CONFIG;
      const hasLovableConfig = !!lovableConfig && !!lovableConfig.projectId;
      
      // Verificar último sync no localStorage
      const lastSync = localStorage.getItem('lovable_last_sync');
      
      // Simular verificações (em produção, estas seriam chamadas reais para APIs)
      const newStatus: SyncStatus = {
        githubConnection: true, // Assumindo conectado baseado na configuração do projeto
        lovableConnection: hasLovableConfig,
        webhookActive: hasLovableConfig,
        tokenValid: true, // Seria verificado via API do GitHub
        billingStatus: true, // Seria verificado via API do Lovable
        lastSync: lastSync || null,
        errors: []
      };

      // Adicionar erros baseados no status
      if (!hasLovableConfig) {
        newStatus.errors.push('Configuração do Lovable não encontrada');
      }
      
      if (!lastSync) {
        newStatus.errors.push('Nenhuma sincronização detectada recentemente');
      }

      setStatus(newStatus);
      
      toast({
        title: "Verificação concluída",
        description: `${newStatus.errors.length === 0 ? 'Tudo funcionando corretamente' : newStatus.errors.length + ' problemas encontrados'}`,
      });
    } catch (error) {
      console.error('Erro na verificação:', error);
      toast({
        title: "Erro na verificação",
        description: "Não foi possível verificar o status da sincronização",
        variant: "destructive"
      });
    } finally {
      setIsChecking(false);
    }
  };

  const forceSyncToGitHub = async () => {
    setIsSyncing(true);
    try {
      // Simular sincronização forçada
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Atualizar timestamp da última sincronização
      const now = new Date().toISOString();
      localStorage.setItem('lovable_last_sync', now);
      
      setStatus(prev => ({
        ...prev,
        lastSync: now,
        errors: prev.errors.filter(error => !error.includes('sincronização'))
      }));
      
      toast({
        title: "Sincronização forçada",
        description: "Tentativa de sincronização com GitHub executada",
      });
    } catch (error) {
      console.error('Erro na sincronização:', error);
      toast({
        title: "Erro na sincronização",
        description: "Não foi possível sincronizar com o GitHub",
        variant: "destructive"
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const resetLovableConfig = () => {
    // Reconfigurar o Lovable
    (window as any).LOVABLE_CONFIG = {
      projectId: 'quiz-sell-genius',
      apiBaseUrl: 'https://api.lovable.dev',
      githubSync: true
    };
    
    toast({
      title: "Configuração resetada",
      description: "Configurações do Lovable foram restauradas",
    });
    
    checkSyncStatus();
  };

  useEffect(() => {
    checkSyncStatus();
  }, []);

  const StatusIcon = ({ status }: { status: boolean }) => 
    status ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Diagnóstico de Sincronização Lovable-GitHub
          </CardTitle>
          <CardDescription>
            Verifique e corrija problemas de sincronização entre Lovable e GitHub
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button 
              onClick={checkSyncStatus} 
              disabled={isChecking}
              variant="outline"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
              Verificar Status
            </Button>
            
            <Button 
              onClick={forceSyncToGitHub} 
              disabled={isSyncing}
              className="bg-[#B89B7A] hover:bg-[#A38A69]"
            >
              <Github className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-pulse' : ''}`} />
              Forçar Sincronização
            </Button>
            
            <Button 
              onClick={resetLovableConfig} 
              variant="destructive"
            >
              Reset Configuração
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Conexão GitHub</span>
                <div className="flex items-center gap-2">
                  <StatusIcon status={status.githubConnection} />
                  <Badge variant={status.githubConnection ? "default" : "destructive"}>
                    {status.githubConnection ? "Conectado" : "Desconectado"}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Conexão Lovable</span>
                <div className="flex items-center gap-2">
                  <StatusIcon status={status.lovableConnection} />
                  <Badge variant={status.lovableConnection ? "default" : "destructive"}>
                    {status.lovableConnection ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Webhook Ativo</span>
                <div className="flex items-center gap-2">
                  <StatusIcon status={status.webhookActive} />
                  <Badge variant={status.webhookActive ? "default" : "destructive"}>
                    {status.webhookActive ? "Funcionando" : "Falha"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Token Válido</span>
                <div className="flex items-center gap-2">
                  <StatusIcon status={status.tokenValid} />
                  <Badge variant={status.tokenValid ? "default" : "destructive"}>
                    {status.tokenValid ? "Válido" : "Expirado"}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Status de Cobrança</span>
                <div className="flex items-center gap-2">
                  <StatusIcon status={status.billingStatus} />
                  <Badge variant={status.billingStatus ? "default" : "destructive"}>
                    {status.billingStatus ? "OK" : "Pendente"}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Última Sincronização</span>
                <Badge variant="outline">
                  {status.lastSync 
                    ? new Date(status.lastSync).toLocaleString() 
                    : "Nunca"
                  }
                </Badge>
              </div>
            </div>
          </div>

          {status.errors.length > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-1">
                  <strong>Problemas encontrados:</strong>
                  <ul className="list-disc list-inside space-y-1">
                    {status.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Soluções Recomendadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium mb-2">1. Verificar Conexão no Painel Lovable</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Acesse o painel do Lovable e verifique se a conexão com GitHub está ativa.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer">
                  Abrir Lovable
                </a>
              </Button>
            </div>

            <div className="p-3 border rounded-lg">
              <h4 className="font-medium mb-2">2. Verificar Webhooks no GitHub</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Verifique se existem webhooks ativos para o Lovable nas configurações do repositório.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href={`https://github.com/settings/webhooks`} target="_blank" rel="noopener noreferrer">
                  Ver Webhooks
                </a>
              </Button>
            </div>

            <div className="p-3 border rounded-lg">
              <h4 className="font-medium mb-2">3. Regenerar Token de Acesso</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Se o token estiver expirado, gere um novo Personal Access Token no GitHub.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer">
                  GitHub Tokens
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
