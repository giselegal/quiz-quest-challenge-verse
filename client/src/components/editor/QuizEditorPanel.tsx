import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResultsLibrary from './ResultsLibrary';
import { useQuizConfig } from '@/hooks/useQuizConfig';
import { 
  Save, TestTube, BarChart3, ExternalLink,
  Plus, Trash2, Settings, Zap 
} from 'lucide-react';

interface QuizOption {
  id: string;
  text: string;
  points: Record<string, number>;
}

interface QuizQuestion {
  id: string;
  text: string;
  type: 'single' | 'multiple';
  options: QuizOption[];
}

interface QuizResult {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

interface QuizConfig {
  intro: {
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
  };
  questions: QuizQuestion[];
  results: QuizResult[];
}

interface QuizEditorPanelProps {
  className?: string;
  blocks?: any[];
  onBlocksChange?: (blocks: any[]) => void;
  testMode?: string;
}

export const QuizEditorPanel: React.FC<QuizEditorPanelProps> = ({ 
  className,
  blocks = [],
  onBlocksChange,
  testMode 
}) => {
  const { toast } = useToast();
  const { quizConfig: editorQuizConfig, quizQuestions, reloadConfig } = useQuizConfig();
  
  const [quizConfig, setQuizConfig] = useState<QuizConfig>({
    intro: {
      title: 'Descubra Seu Estilo Único',
      subtitle: 'Quiz Personalizado',
      description: 'Descubra qual estilo combina mais com você através deste quiz personalizado',
      buttonText: 'Começar Quiz'
    },
    questions: [
      {
        id: 'q1',
        text: 'Qual cor você mais gosta?',
        type: 'single',
        options: [
          { id: 'o1', text: 'Azul', points: { elegante: 2, casual: 1 } },
          { id: 'o2', text: 'Vermelho', points: { elegante: 1, casual: 2 } },
          { id: 'o3', text: 'Verde', points: { elegante: 1, casual: 2 } }
        ]
      }
    ],
    results: [
      {
        id: 'elegante',
        title: 'Estilo Elegante',
        description: 'Você tem um estilo refinado e sofisticado.',
        imageUrl: 'https://via.placeholder.com/300x200/b89b7a/ffffff?text=Elegante'
      },
      {
        id: 'casual',
        title: 'Estilo Casual',
        description: 'Você prefere conforto e praticidade.',
        imageUrl: 'https://via.placeholder.com/300x200/432818/ffffff?text=Casual'
      }
    ]
  });

  const [currentFunnelId, setCurrentFunnelId] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(false);

  // Sincronizar com dados do editor quando carregados
  useEffect(() => {
    if (testMode) {
      console.log(`🧪 QuizEditorPanel inicializado em modo: ${testMode}`);
      console.log(`📊 Blocos recebidos: ${blocks.length}`);
    }
    
    if (editorQuizConfig) {
      console.log('🔄 Sincronizando configurações do editor:', editorQuizConfig);
      // Carregar dados do editor se disponíveis
    }
  }, [editorQuizConfig, testMode, blocks.length]);

  // Validar regras de pontuação
  const validateScoringRules = async () => {
    try {
      // Simular validação
      const issues: string[] = [];
      
      // Verificar se todas as opções têm pontuação
      quizConfig.questions.forEach((question, qIndex) => {
        question.options.forEach((option, oIndex) => {
          const hasPoints = Object.keys(option.points).length > 0;
          if (!hasPoints) {
            issues.push(`Questão ${qIndex + 1}, Opção ${oIndex + 1}: Sem pontuação definida`);
          }
        });
      });

      // Verificar se há pelo menos 2 resultados
      if (quizConfig.results.length < 2) {
        issues.push('Quiz deve ter pelo menos 2 resultados possíveis');
      }

      if (issues.length === 0) {
        toast({
          title: 'Validação OK! ✅',
          description: `${quizConfig.questions.length} questões, ${quizConfig.results.length} resultados validados`,
        });
      } else {
        toast({
          title: 'Problemas Encontrados ⚠️',
          description: `${issues.length} problemas encontrados`,
          variant: 'destructive',
        });
        console.log('Problemas detalhados:', issues);
      }
    } catch (error) {
      toast({
        title: 'Erro na Validação',
        description: 'Não foi possível validar as regras de pontuação.',
        variant: 'destructive',
      });
    }
  };

  // Simular resultado do quiz
  const simulateQuizResult = async () => {
    try {
      // Simular respostas (primeira opção de cada questão)
      const scores: Record<string, number> = {};
      
      quizConfig.questions.forEach(question => {
        if (question.options.length > 0) {
          const firstOption = question.options[0];
          Object.entries(firstOption.points).forEach(([resultId, points]) => {
            scores[resultId] = (scores[resultId] || 0) + points;
          });
        }
      });

      // Encontrar resultado vencedor
      const winner = Object.entries(scores).reduce((a, b) => 
        scores[a[0]] > scores[b[0]] ? a : b
      );

      const winnerResult = quizConfig.results.find(r => r.id === winner[0]);

      toast({
        title: 'Simulação Concluída! 🎯',
        description: `Resultado: ${winnerResult?.title} (${winner[1]} pontos)`,
      });

      console.log('📊 Simulação completa:', { scores, winner: winnerResult });
    } catch (error) {
      toast({
        title: 'Erro na Simulação',
        description: 'Não foi possível simular o resultado.',
        variant: 'destructive',
      });
    }
  };

  // Salvar configurações
  const handleSave = async () => {
    try {
      // Salvar configurações do quiz no localStorage
      localStorage.setItem('quiz-editor-config', JSON.stringify(quizConfig));
      
      // Também salvar no formato do editor visual
      const editorConfig = {
        id: 'quiz-funnel',
        name: quizConfig.intro.title,
        pages: [
          {
            id: 'intro',
            title: 'Página Inicial',
            type: 'intro',
            progress: 0,
            showHeader: true,
            showProgress: false,
            components: [
              {
                id: 'intro-title',
                type: 'heading',
                data: { text: quizConfig.intro.title }
              },
              {
                id: 'intro-subtitle', 
                type: 'paragraph',
                data: { text: quizConfig.intro.description }
              }
            ]
          },
          ...quizConfig.questions.map((question, index) => ({
            id: question.id,
            title: `Questão ${index + 1}`,
            type: 'question',
            progress: ((index + 1) / quizConfig.questions.length) * 100,
            showHeader: true,
            showProgress: true,
            components: [
              {
                id: `question-${question.id}`,
                type: 'options-grid',
                data: { 
                  title: question.text,
                  options: question.options,
                  validationRules: question.options.map(opt => ({
                    optionId: opt.id,
                    points: opt.points
                  }))
                }
              }
            ]
          }))
        ]
      };
      
      localStorage.setItem('quiz_funnel_config', JSON.stringify(editorConfig));
      
      // Simular ID do funil
      const funnelId = Date.now().toString();
      setCurrentFunnelId(funnelId);
      
      // Recarregar configurações
      reloadConfig();

      toast({
        title: 'Quiz Salvo! 💾',
        description: 'Configurações integradas com o editor visual.',
      });
    } catch (error) {
      toast({
        title: 'Erro ao Salvar',
        description: 'Não foi possível salvar as configurações.',
        variant: 'destructive',
      });
    }
  };

  // Publicar quiz
  const handlePublish = async () => {
    try {
      if (!currentFunnelId) {
        toast({
          title: 'Erro',
          description: 'Salve o quiz antes de publicar.',
          variant: 'destructive',
        });
        return;
      }

      setIsPublished(true);
      
      toast({
        title: 'Quiz Publicado! 🚀',
        description: 'Quiz está disponível para teste.',
      });
    } catch (error) {
      toast({
        title: 'Erro ao Publicar',
        description: 'Não foi possível publicar o quiz.',
        variant: 'destructive',
      });
    }
  };

  // Testar quiz
  const handleTest = () => {
    if (!currentFunnelId || !isPublished) {
      toast({
        title: 'Erro',
        description: 'Salve e publique o quiz antes de testar.',
        variant: 'destructive',
      });
      return;
    }

    // Simular abertura do quiz
    const testUrl = `/quiz?test=true&id=${currentFunnelId}`;
    window.open(testUrl, '_blank');
  };

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: `q${Date.now()}`,
      text: 'Nova pergunta',
      type: 'single',
      options: [
        { id: `o${Date.now()}`, text: 'Opção 1', points: {} }
      ]
    };

    setQuizConfig(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const addResult = () => {
    const newResult: QuizResult = {
      id: `result${Date.now()}`,
      title: 'Novo Resultado',
      description: 'Descrição do resultado',
    };

    setQuizConfig(prev => ({
      ...prev,
      results: [...prev.results, newResult]
    }));
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header de Ações */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Editor de Quiz</h2>
          <p className="text-sm text-gray-600">
            Configure validação e pontuação do quiz
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={validateScoringRules}
            variant="outline"
            size="sm"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Validar
          </Button>
          
          <Button 
            onClick={simulateQuizResult}
            variant="outline"
            size="sm"
          >
            <TestTube className="w-4 h-4 mr-2" />
            Simular
          </Button>
          
          <Button 
            onClick={handleSave}
            size="sm"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      {/* Status */}
      <div className="flex gap-2 flex-wrap">
        <span className={`px-2 py-1 rounded text-xs ${currentFunnelId ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
          {currentFunnelId ? `ID: ${currentFunnelId}` : 'Não salvo'}
        </span>
        <span className={`px-2 py-1 rounded text-xs ${isPublished ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
          {isPublished ? 'Publicado' : 'Rascunho'}
        </span>
        <span className={`px-2 py-1 rounded text-xs ${editorQuizConfig ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'}`}>
          <Zap className="w-3 h-3 inline mr-1" />
          {editorQuizConfig ? 'Conectado ao Editor' : 'Desconectado'}
        </span>
      </div>

      {/* Informações de Integração */}
      {editorQuizConfig && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-green-600" />
              <span className="font-medium text-green-800">Integração Ativa</span>
            </div>
            <div className="text-sm text-green-700">
              <p>✅ Editor visual conectado: <strong>{editorQuizConfig.name}</strong></p>
              <p>✅ Páginas disponíveis: <strong>{editorQuizConfig.pages?.length || 0}</strong></p>
              <p>✅ Questões detectadas: <strong>{quizQuestions.length}</strong></p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Abas principais */}
      <Tabs defaultValue="config" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="config">⚙️ Configuração</TabsTrigger>
          <TabsTrigger value="questions">❓ Questões</TabsTrigger>
          <TabsTrigger value="results">🏆 Resultados</TabsTrigger>
        </TabsList>

        {/* Aba de Configuração */}
        <TabsContent value="config" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configuração Geral
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="intro-title">Título</Label>
                <Input
                  id="intro-title"
                  value={quizConfig.intro.title}
                  onChange={(e) => setQuizConfig(prev => ({
                    ...prev,
                    intro: { ...prev.intro, title: e.target.value }
                  }))}
                />
              </div>
              
              <div>
                <Label htmlFor="intro-subtitle">Subtítulo</Label>
                <Input
                  id="intro-subtitle"
                  value={quizConfig.intro.subtitle}
                  onChange={(e) => setQuizConfig(prev => ({
                    ...prev,
                    intro: { ...prev.intro, subtitle: e.target.value }
                  }))}
                />
              </div>

              <div>
                <Label htmlFor="intro-description">Descrição</Label>
                <Textarea
                  id="intro-description"
                  value={quizConfig.intro.description}
                  onChange={(e) => setQuizConfig(prev => ({
                    ...prev,
                    intro: { ...prev.intro, description: e.target.value }
                  }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Teste */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="w-5 h-5" />
                Teste do Quiz
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-lg">
                <div className="text-sm text-gray-600 mb-4">
                  {currentFunnelId && isPublished 
                    ? 'Quiz publicado e pronto para teste'
                    : 'Salve e publique para testar'
                  }
                </div>
                
                <div className="flex gap-2 justify-center">
                  <Button 
                    onClick={handlePublish}
                    disabled={!currentFunnelId}
                    variant="outline"
                  >
                    🚀 Publicar
                  </Button>
                  
                  <Button 
                    onClick={handleTest}
                    disabled={!currentFunnelId || !isPublished}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Testar Quiz
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba de Questões */}
        <TabsContent value="questions" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Questões ({quizConfig.questions.length})</CardTitle>
                <Button onClick={addQuestion} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quizConfig.questions.map((question, qIndex) => (
                  <div key={question.id} className="border p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Questão {qIndex + 1}</h4>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => {
                          setQuizConfig(prev => ({
                            ...prev,
                            questions: prev.questions.filter(q => q.id !== question.id)
                          }));
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <Input
                      value={question.text}
                      onChange={(e) => {
                        const newQuestions = [...quizConfig.questions];
                        newQuestions[qIndex].text = e.target.value;
                        setQuizConfig(prev => ({ ...prev, questions: newQuestions }));
                      }}
                      placeholder="Texto da questão"
                      className="mb-2"
                    />

                    <div className="text-sm text-gray-600">
                      {question.options.length} opções configuradas
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba de Resultados */}
        <TabsContent value="results" className="space-y-6">
          {/* Biblioteca de Resultados */}
          <ResultsLibrary 
            onResultSelect={(result) => {
              // Adicionar resultado selecionado à configuração
              const newResult = {
                id: result.id,
                title: result.title,
                description: result.description,
              };
              
              setQuizConfig(prev => ({
                ...prev,
                results: [...prev.results, newResult]
              }));

              toast({
                title: 'Resultado Adicionado',
                description: `${result.title} foi adicionado ao quiz.`,
              });
            }}
          />

          {/* Resultados Atuais do Quiz */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Resultados no Quiz ({quizConfig.results.length})</CardTitle>
                <Button onClick={addResult} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Novo
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quizConfig.results.map((result, rIndex) => (
                  <div key={result.id} className="border p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{result.title}</h4>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => {
                          setQuizConfig(prev => ({
                            ...prev,
                            results: prev.results.filter(r => r.id !== result.id)
                          }));
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <Input
                      value={result.title}
                      onChange={(e) => {
                        const newResults = [...quizConfig.results];
                        newResults[rIndex].title = e.target.value;
                        setQuizConfig(prev => ({ ...prev, results: newResults }));
                      }}
                      placeholder="Título do resultado"
                      className="mb-2"
                    />
                    
                    <Textarea
                      value={result.description}
                      onChange={(e) => {
                        const newResults = [...quizConfig.results];
                        newResults[rIndex].description = e.target.value;
                        setQuizConfig(prev => ({ ...prev, results: newResults }));
                      }}
                      placeholder="Descrição do resultado"
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
