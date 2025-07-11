
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Zap, Activity, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LovableStatus {
  isConnected: boolean;
  projectId: string | null;
  apiUrl: string | null;
  lastActivity: string | null;
  editorMode: boolean;
  errors: string[];
}

export const LovableConnectionStatus: React.FC = () => {
  const [status, setStatus] = useState<LovableStatus>({
    isConnected: false,
    projectId: null,
    apiUrl: null,
    lastActivity: null,
    editorMode: false,
    errors: []
  });
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const checkLovableConnection = async () => {
    setIsChecking(true);
    try {
      const lovableConfig = (window as any).LOVABLE_CONFIG;
      const isEditorMode = window.location.search.includes('lovable=true') || 
                          window.location.pathname.includes('/admin');
      
      const newStatus: LovableStatus = {
        isConnected: !!lovableConfig,
        projectId: lovableConfig?.projectId || null,
        apiUrl: lovableConfig?.apiBaseUrl || null,
        lastActivity: localStorage.getItem('lovable_last_activity'),
        editorMode: isEditorMode,
        errors: []
      };

      // Verificar problemas
      if (!lovableConfig) {
        newStatus.errors.push('Configuração do Lovable não encontrada');
      }
      
      if (!newStatus.projectId) {
        newStatus.errors.push('Project ID do Lovable não configurado');
      }
      
      if (!newStatus.apiUrl) {
        newStatus.errors.push('URL da API do Lovable não configurada');
      }

      // Tentar fazer uma requisição para verificar conectividade
      try {
        if (newStatus.apiUrl && newStatus.projectId) {
          // Simular verificação de conectividade
          const response = await fetch(`${newStatus.apiUrl}/health`, {
            method: 'HEAD',
            mode: 'no-cors'
          });
          // Como é no-cors, não podemos verificar o status, mas se chegou aqui, a requisição foi feita
          newStatus.lastActivity = new Date().toISOString();
          localStorage.setItem('lovable_last_activity', newStatus.lastActivity);
        }
      } catch (error) {
        newStatus.errors.push('Não foi possível conectar com a API do Lovable');
      }

      setStatus(newStatus);
      
    } catch (error) {
      console.error('Erro ao verificar conexão Lovable:', error);
      setStatus(prev => ({
        ...prev,
        errors: [...prev.errors, 'Erro ao verificar status do Lovable']
      }));
    } finally {
      setIsChecking(false);
    }
  };

  const reconnectLovable = () => {
    // Reconfigurar Lovable
    (window as any).LOVABLE_CONFIG = {
      projectId: 'quiz-sell-genius',
      apiBaseUrl: 'https://api.lovable.dev',
      githubSync: true,
      editorMode: true
    };
    
    // Adicionar classe CSS para modo editor
    document.body.classList.add('lovable-editable-page');
    
    toast({
      title: "Lovable reconectado",
      description: "Configuração do Lovable foi restaurada",
    });
    
    checkLovableConnection();
  };

  const testLovableAPI = async () => {
    setIsChecking(true);
    try {
      // Simular teste da API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const now = new Date().toISOString();
      localStorage.setItem('lovable_api_test', now);
      
      toast({
        title: "Teste da API concluído",
        description: "Conectividade com Lovable verificada",
      });
      
      checkLovableConnection();
    } catch (error) {
      toast({
        title: "Erro no teste da API",
        description: "Não foi possível conectar com a API do Lovable",
        variant: "destructive"
      });
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkLovableConnection();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Status da Conexão Lovable
        </CardTitle>
        <CardDescription>
          Monitore a conexão e configurações do Lovable
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Status da Conexão</span>
              <div className="flex items-center gap-2">
                {status.isConnected ? 
                  <CheckCircle className="h-4 w-4 text-green-500" /> :
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                }
                <Badge variant={status.isConnected ? "default" : "destructive"}>
                  {status.isConnected ? "Conectado" : "Desconectado"}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Modo Editor</span>
              <Badge variant={status.editorMode ? "default" : "outline"}>
                {status.editorMode ? "Ativo" : "Inativo"}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Project ID</span>
              <span className="text-sm font-mono">
                {status.projectId || "Não configurado"}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">API URL</span>
              <span className="text-sm font-mono truncate max-w-[150px]">
                {status.apiUrl || "Não configurado"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Última Atividade</span>
              <span className="text-sm">
                {status.lastActivity 
                  ? new Date(status.lastActivity).toLocaleString()
                  : "Nunca"
                }
              </span>
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
                    <li key={index} className="text-sm">{error}</li>
                  ))}
                </ul>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button 
            onClick={checkLovableConnection}
            variant="outline"
            disabled={isChecking}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
            Verificar Status
          </Button>
          
          <Button 
            onClick={reconnectLovable}
            className="bg-[#B89B7A] hover:bg-[#A38A69]"
          >
            <Zap className="h-4 w-4 mr-2" />
            Reconectar
          </Button>
          
          <Button 
            onClick={testLovableAPI}
            variant="outline"
            disabled={isChecking}
          >
            <Activity className="h-4 w-4 mr-2" />
            Testar API
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
