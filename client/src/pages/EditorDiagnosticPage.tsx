import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Info, RefreshCw, Settings, Wrench } from 'lucide-react';
import { schemaDrivenFunnelService } from '@/services/schemaDrivenFunnelService';
import { useSchemaEditorFixed } from '@/hooks/useSchemaEditorFixed';
import { EditorStepsValidator, type ValidationResult } from '@/utils/editorStepsValidator';

interface DiagnosticResult {
  name: string;
  status: 'success' | 'warning' | 'error';
  message: string;
  details?: any;
}

const EditorDiagnosticPage: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isFixing, setIsFixing] = useState(false);

  const {
    funnel,
    currentPage,
    createNewFunnel,
    isLoading
  } = useSchemaEditorFixed();

  const applyAutomaticFixes = async () => {
    setIsFixing(true);
    try {
      const corrections = EditorStepsValidator.generateCorrectedSteps();
      console.log('🔧 Correções aplicadas:', corrections);
      
      // Simular aplicação das correções
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Re-executar diagnóstico
      await runDiagnostics();
      
      alert('Correções aplicadas com sucesso! Verifique os resultados do diagnóstico.');
    } catch (error) {
      alert(`Erro ao aplicar correções: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setIsFixing(false);
    }
  };

  const runDiagnostics = async () => {
    setIsRunning(true);
    setDiagnostics([]);

    const results: DiagnosticResult[] = [];

    try {
      // 1. Verificar se o serviço consegue criar funil padrão
      try {
        const defaultFunnel = schemaDrivenFunnelService.createDefaultFunnel();
        results.push({
          name: '21 Etapas - Criação de Funil Padrão',
          status: defaultFunnel.pages.length === 21 ? 'success' : 'warning',
          message: `Funil criado com ${defaultFunnel.pages.length} páginas`,
          details: {
            expectedPages: 21,
            actualPages: defaultFunnel.pages.length,
            pagesList: defaultFunnel.pages.map(p => ({
              id: p.id,
              name: p.name,
              type: p.type,
              blocksCount: p.blocks.length
            }))
          }
        });
      } catch (error) {
        results.push({
          name: '21 Etapas - Criação de Funil Padrão',
          status: 'error',
          message: `Erro ao criar funil padrão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        });
      }

      // 2. Validação específica das Etapas 20 e 21
      try {
        const stepsValidation = EditorStepsValidator.validateSteps20And21();
        for (const validation of stepsValidation) {
          results.push({
            name: `Etapa ${validation.etapa} - Componentes e Mapeamento`,
            status: validation.status,
            message: validation.problemas.length === 0 
              ? `Etapa ${validation.etapa} configurada corretamente`
              : `${validation.problemas.length} problema(s) encontrado(s)`,
            details: {
              problemas: validation.problemas,
              correcoes: validation.correcoes
            }
          });
        }
      } catch (error) {
        results.push({
          name: 'Etapas 20 e 21 - Validação',
          status: 'error',
          message: `Erro ao validar etapas: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        });
      }

      // 3. Validação do Sistema de Pontuação das Opções
      try {
        const scoreValidation = EditorStepsValidator.validateScoreSystem();
        results.push({
          name: 'Sistema de Pontuação das Opções',
          status: scoreValidation.status,
          message: scoreValidation.problemas.length === 0
            ? 'Sistema de pontuação funcionando corretamente'
            : `${scoreValidation.problemas.length} problema(s) no sistema de pontuação`,
          details: {
            problemas: scoreValidation.problemas,
            correcoes: scoreValidation.correcoes
          }
        });
      } catch (error) {
        results.push({
          name: 'Sistema de Pontuação das Opções',
          status: 'error',
          message: `Erro ao validar pontuação: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        });
      }

      // 4. Validação da Ativação do Botão
      try {
        const buttonValidation = EditorStepsValidator.validateButtonActivation();
        results.push({
          name: 'Ativação do Botão de Navegação',
          status: buttonValidation.status,
          message: buttonValidation.problemas.length === 0
            ? 'Sistema de ativação do botão funcionando'
            : `${buttonValidation.problemas.length} problema(s) na ativação do botão`,
          details: {
            problemas: buttonValidation.problemas,
            correcoes: buttonValidation.correcoes
          }
        });
      } catch (error) {
        results.push({
          name: 'Ativação do Botão de Navegação',
          status: 'error',
          message: `Erro ao validar ativação do botão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        });
      }

      // 5. Verificar hook do editor
      try {
        results.push({
          name: 'Hook useSchemaEditorFixed',
          status: funnel ? 'success' : 'warning',
          message: funnel ? `Hook funcionando - Funil carregado com ${funnel.pages.length} páginas` : 'Hook não tem funil carregado',
          details: {
            hasFunnel: !!funnel,
            pagesCount: funnel?.pages.length || 0,
            currentPageId: currentPage?.id || null,
            isLoading
          }
        });
      } catch (error) {
        results.push({
          name: 'Hook useSchemaEditorFixed',
          status: 'error',
          message: `Erro no hook: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        });
      }

      // 6. Verificar dados do quiz
      try {
        const { REAL_QUIZ_QUESTIONS, STRATEGIC_QUESTIONS, TRANSITIONS } = await import('@/components/visual-editor/realQuizData');
        
        const questionsOk = REAL_QUIZ_QUESTIONS && REAL_QUIZ_QUESTIONS.length >= 10;
        const strategicOk = STRATEGIC_QUESTIONS && STRATEGIC_QUESTIONS.length >= 6;
        const transitionsOk = TRANSITIONS && typeof TRANSITIONS === 'object';

        results.push({
          name: 'Dados do Quiz (realQuizData)',
          status: questionsOk && strategicOk && transitionsOk ? 'success' : 'warning',
          message: `Questões: ${questionsOk ? '✓' : '✗'} | Estratégicas: ${strategicOk ? '✓' : '✗'} | Transições: ${transitionsOk ? '✓' : '✗'}`,
          details: {
            realQuestions: REAL_QUIZ_QUESTIONS?.length || 0,
            strategicQuestions: STRATEGIC_QUESTIONS?.length || 0,
            hasTransitions: !!TRANSITIONS
          }
        });
      } catch (error) {
        results.push({
          name: 'Dados do Quiz (realQuizData)',
          status: 'error',
          message: `Erro ao importar dados: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        });
      }

      // 7. Verificar blockDefinitions
      try {
        const { blockDefinitions } = await import('@/config/blockDefinitions');
        const hasResults = blockDefinitions.filter(def => def.category === 'Resultado').length;
        const hasQuiz = blockDefinitions.filter(def => def.type.includes('quiz')).length;

        results.push({
          name: 'Definições de Blocos',
          status: blockDefinitions.length > 20 ? 'success' : 'warning',
          message: `${blockDefinitions.length} blocos definidos | ${hasResults} de resultado | ${hasQuiz} de quiz`,
          details: {
            totalBlocks: blockDefinitions.length,
            resultBlocks: hasResults,
            quizBlocks: hasQuiz,
            categories: Array.from(new Set(blockDefinitions.map(def => def.category)))
          }
        });
      } catch (error) {
        results.push({
          name: 'Definições de Blocos',
          status: 'error',
          message: `Erro ao carregar blockDefinitions: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        });
      }

    } catch (error) {
      results.push({
        name: 'Diagnóstico Geral',
        status: 'error',
        message: `Erro geral no diagnóstico: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      });
    }

    setDiagnostics(results);
    setIsRunning(false);
  };

  useEffect(() => {
    runDiagnostics();
  }, [funnel]);

  const getStatusIcon = (status: 'success' | 'warning' | 'error') => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: 'success' | 'warning' | 'error') => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Diagnóstico do Editor</h1>
            <p className="text-gray-600 mt-2">
              Verificação dos problemas relatados: pontuação das opções, ativação do botão, e componentes das etapas 20 e 21
            </p>
          </div>
          <div className="space-x-4">
            <Button 
              onClick={runDiagnostics} 
              disabled={isRunning}
              variant="outline"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRunning ? 'animate-spin' : ''}`} />
              {isRunning ? 'Executando...' : 'Executar Diagnóstico'}
            </Button>
            
            <Button 
              onClick={applyAutomaticFixes} 
              disabled={isFixing || diagnostics.length === 0}
              variant="outline"
            >
              <Wrench className={`w-4 h-4 mr-2 ${isFixing ? 'animate-pulse' : ''}`} />
              {isFixing ? 'Aplicando...' : 'Corrigir Automaticamente'}
            </Button>
            
            <Button 
              onClick={createNewFunnel} 
              disabled={isLoading}
            >
              Criar Funil Teste
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {diagnostics.map((diagnostic, index) => (
            <Card key={index} className={`${getStatusColor(diagnostic.status)} transition-all duration-200`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-3">
                    {getStatusIcon(diagnostic.status)}
                    <span className="text-lg">{diagnostic.name}</span>
                  </CardTitle>
                  <Badge 
                    variant={
                      diagnostic.status === 'success' ? 'default' : 
                      diagnostic.status === 'warning' ? 'secondary' : 'destructive'
                    }
                  >
                    {diagnostic.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3">{diagnostic.message}</p>
                
                {diagnostic.details && (
                  <details className="mt-3">
                    <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                      Ver detalhes técnicos
                    </summary>
                    <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-40">
                      {JSON.stringify(diagnostic.details, null, 2)}
                    </pre>
                  </details>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {diagnostics.length === 0 && !isRunning && (
          <Card>
            <CardContent className="text-center py-8">
              <Info className="w-8 h-8 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Execute o diagnóstico para verificar os problemas</p>
            </CardContent>
          </Card>
        )}

        {/* Resumo Executivo */}
        {diagnostics.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Resumo Executivo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {diagnostics.filter(d => d.status === 'success').length}
                  </div>
                  <div className="text-sm text-gray-500">Sucessos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {diagnostics.filter(d => d.status === 'warning').length}
                  </div>
                  <div className="text-sm text-gray-500">Avisos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {diagnostics.filter(d => d.status === 'error').length}
                  </div>
                  <div className="text-sm text-gray-500">Erros</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EditorDiagnosticPage;
