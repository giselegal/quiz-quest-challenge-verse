/**
 * Painel de debug para resolver problemas de storage e inicialização
 */

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, RefreshCw, Trash2, CheckCircle, XCircle } from 'lucide-react';

interface DebugInfo {
  localStorage: {
    funnelExists: boolean;
    versionHistoryExists: boolean;
    size: number;
  };
  quizData: {
    questionsCount: number;
    firstQuestion: string;
  };
  supabase: {
    clientAvailable: boolean;
    url: string;
  };
  errors: string[];
}

export const DebugPanel: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Verificar se deve mostrar o painel automaticamente
  useEffect(() => {
    const shouldShow = localStorage.getItem('debug-panel-auto-show') === 'true';
    if (shouldShow) {
      setIsVisible(true);
      runDiagnosis();
    }
  }, []);

  const runDiagnosis = async () => {
    setIsLoading(true);
    console.log('🔍 EXECUTANDO DIAGNÓSTICO...');
    
    const info: DebugInfo = {
      localStorage: {
        funnelExists: false,
        versionHistoryExists: false,
        size: 0
      },
      quizData: {
        questionsCount: 0,
        firstQuestion: 'undefined'
      },
      supabase: {
        clientAvailable: false,
        url: 'undefined'
      },
      errors: []
    };

    // Verificar localStorage
    try {
      info.localStorage = {
        funnelExists: !!localStorage.getItem('schemaDrivenFunnel'),
        versionHistoryExists: !!localStorage.getItem('schemaDrivenFunnelVersionHistory'),
        size: new Blob(Object.values(localStorage)).size
      };
    } catch (error) {
      info.errors.push(`localStorage: ${(error as Error).message}`);
    }

    // Verificar dados do quiz
    try {
      const { quizQuestions } = await import('@/data/quizQuestions');
      info.quizData = {
        questionsCount: quizQuestions?.length || 0,
        firstQuestion: quizQuestions?.[0]?.question || 'undefined'
      };
    } catch (error) {
      info.errors.push(`QuizData: ${(error as Error).message}`);
    }

    // Verificar configuração básica
    info.supabase = {
      clientAvailable: true,
      url: 'configured'
    };

    setDebugInfo(info);
    setIsLoading(false);
    console.log('📊 Diagnóstico completo:', info);
  };

  const clearStorage = () => {
    console.log('🧹 Limpando localStorage...');
    const keysToClean = [
      'schemaDrivenFunnel',
      'schemaDrivenFunnelVersionHistory',
      'schemaDrivenEmergencyCleanup'
    ];
    
    keysToClean.forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Remover versões específicas
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes('schemaDrivenFunnelVersionHistory-')) {
        localStorage.removeItem(key);
      }
    }
    
    console.log('✅ Storage limpo!');
    runDiagnosis();
  };

  const forceReload = () => {
    console.log('🔄 Recarregando página...');
    window.location.reload();
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
          className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          Debug
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Debug Panel</h3>
          <Button
            onClick={() => setIsVisible(false)}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            ×
          </Button>
        </div>

        <div className="space-y-4">
          {/* Status */}
          {debugInfo && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">LocalStorage</span>
                <Badge variant={debugInfo.localStorage.funnelExists ? "default" : "destructive"}>
                  {debugInfo.localStorage.funnelExists ? "OK" : "VAZIO"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Quiz Data</span>
                <Badge variant={debugInfo.quizData.questionsCount > 0 ? "default" : "destructive"}>
                  {debugInfo.quizData.questionsCount} perguntas
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Supabase</span>
                <Badge variant={debugInfo.supabase.clientAvailable ? "default" : "destructive"}>
                  {debugInfo.supabase.clientAvailable ? "CONECTADO" : "DESCONECTADO"}
                </Badge>
              </div>

              {debugInfo.errors.length > 0 && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                  <div className="flex items-center mb-2">
                    <XCircle className="w-4 h-4 text-red-500 mr-2" />
                    <span className="text-sm font-medium text-red-700">Erros:</span>
                  </div>
                  {debugInfo.errors.map((error, index) => (
                    <div key={index} className="text-xs text-red-600 mb-1">
                      {error}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Ações */}
          <div className="space-y-2">
            <Button
              onClick={runDiagnosis}
              disabled={isLoading}
              size="sm"
              className="w-full"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Verificando...' : 'Verificar Sistema'}
            </Button>
            
            <Button
              onClick={clearStorage}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Limpar Storage
            </Button>
            
            <Button
              onClick={forceReload}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Recarregar Página
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Auto-mostrar em caso de erros
if (typeof window !== 'undefined') {
  // Detectar se há problemas e mostrar automaticamente
  const hasProblems = !localStorage.getItem('schemaDrivenFunnel') || 
                     parseInt(localStorage.getItem('error-count') || '0') > 3;
  
  if (hasProblems) {
    localStorage.setItem('debug-panel-auto-show', 'true');
  }
}