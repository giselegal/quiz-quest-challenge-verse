import React from 'react';
import { useQuizEditor } from '@/hooks/useQuizEditor';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, CloudOff, Wifi, WifiOff, Save, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Exemplo prático de como usar o sistema de salvamento por API
 * Este componente demonstra todas as funcionalidades implementadas
 */
const ExemploEditorComAPI: React.FC = () => {
  // Hook principal que gerencia tudo
  const {
    questions,
    loading,
    saving,
    saved,
    error,
    hasUnsavedChanges,
    lastSavedAt,
    isOnline,
    needsSync,
    quizData,
    saveQuiz,
    updateQuestions,
    syncOfflineChanges,
    canSave
  } = useQuizEditor({
    quizId: 'exemplo-123', // ID opcional do quiz
    autoSave: true,        // Auto-save habilitado
    autoSaveDelay: 3000,   // 3 segundos de delay
    enableOfflineMode: true // Modo offline habilitado
  });

  // Handler para adicionar nova questão
  const handleAddQuestion = () => {
    const newQuestion = {
      id: `question-${Date.now()}`,
      title: 'Nova pergunta',
      type: 'text' as const,
      multiSelect: 1,
      options: [
        {
          id: `option-${Date.now()}-1`,
          text: 'Opção 1',
          styleCategory: 'Natural',
          points: 1,
        },
        {
          id: `option-${Date.now()}-2`,
          text: 'Opção 2',
          styleCategory: 'Clássico',
          points: 1,
        }
      ]
    };

    updateQuestions([...questions, newQuestion]);
  };

  // Handler para salvamento manual
  const handleManualSave = async () => {
    const result = await saveQuiz('Meu Quiz Exemplo', 'Descrição do quiz');
    if (result.success) {
      console.log('Quiz salvo com sucesso!');
    }
  };

  // Componente de status de conectividade
  const StatusIndicator = () => (
    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
      {/* Status de conexão */}
      <div className="flex items-center gap-2">
        {isOnline ? (
          <>
            <Wifi className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-600">Online</span>
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4 text-orange-600" />
            <span className="text-sm text-orange-600">Offline</span>
          </>
        )}
      </div>

      {/* Status de salvamento */}
      <div className="flex items-center gap-2">
        {saving ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Cloud className="h-4 w-4 text-blue-600" />
            </motion.div>
            <span className="text-sm text-blue-600">Salvando...</span>
          </>
        ) : saved ? (
          <>
            <Cloud className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-600">
              Salvo {lastSavedAt && new Date(lastSavedAt).toLocaleTimeString()}
            </span>
          </>
        ) : hasUnsavedChanges ? (
          <>
            <CloudOff className="h-4 w-4 text-orange-600" />
            <span className="text-sm text-orange-600">Mudanças não salvas</span>
          </>
        ) : null}
      </div>

      {/* Badges de alerta */}
      {needsSync && (
        <Badge variant="outline" className="border-orange-500 text-orange-700">
          <AlertCircle className="h-3 w-3 mr-1" />
          Precisa sincronizar
        </Badge>
      )}

      {error && (
        <Badge variant="destructive">
          <AlertCircle className="h-3 w-3 mr-1" />
          {error}
        </Badge>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
        />
        <span className="ml-2">Carregando quiz...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Editor com API - Exemplo</h1>
        
        {/* Botões de ação */}
        <div className="flex items-center gap-2">
          {needsSync && (
            <Button 
              variant="outline"
              onClick={syncOfflineChanges}
              disabled={!isOnline}
            >
              <Cloud className="h-4 w-4 mr-1" />
              Sincronizar
            </Button>
          )}
          
          <Button 
            onClick={handleManualSave}
            disabled={!canSave}
            className={hasUnsavedChanges ? 'bg-orange-500 hover:bg-orange-600' : ''}
          >
            <Save className="h-4 w-4 mr-1" />
            {hasUnsavedChanges ? 'Salvar Agora' : 'Salvar'}
          </Button>
        </div>
      </div>

      {/* Indicadores de status */}
      <StatusIndicator />

      {/* Informações do quiz */}
      {quizData && (
        <Card>
          <CardHeader>
            <CardTitle>Informações do Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>ID:</strong> {quizData.id}
              </div>
              <div>
                <strong>Título:</strong> {quizData.title}
              </div>
              <div>
                <strong>Criado:</strong> {new Date(quizData.createdAt).toLocaleString()}
              </div>
              <div>
                <strong>Atualizado:</strong> {new Date(quizData.updatedAt).toLocaleString()}
              </div>
              <div>
                <strong>Versão:</strong> {quizData.version}
              </div>
              <div>
                <strong>Publicado:</strong> {quizData.isPublished ? 'Sim' : 'Não'}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de questões */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Questões ({questions.length})</CardTitle>
            <Button onClick={handleAddQuestion} variant="outline">
              Adicionar Questão
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {questions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Nenhuma questão adicionada ainda.
            </p>
          ) : (
            <div className="space-y-4">
              {questions.map((question, index) => (
                <Card key={question.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">
                      {index + 1}. {question.title}
                    </h4>
                    <Badge variant="secondary">
                      {question.options.length} opções
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Tipo: {question.type} | Seleção: {question.multiSelect === 1 ? 'Única' : `Até ${question.multiSelect}`}
                  </p>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Logs e debug */}
      <Card>
        <CardHeader>
          <CardTitle>Debug Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs font-mono bg-gray-100 p-3 rounded">
            <div>Online: {isOnline.toString()}</div>
            <div>Saving: {saving.toString()}</div>
            <div>Saved: {saved.toString()}</div>
            <div>Has Changes: {hasUnsavedChanges.toString()}</div>
            <div>Can Save: {canSave.toString()}</div>
            <div>Needs Sync: {needsSync.toString()}</div>
            <div>Questions Count: {questions.length}</div>
            <div>Last Saved: {lastSavedAt?.toISOString() || 'Never'}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExemploEditorComAPI;
