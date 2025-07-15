import React, { useEffect } from 'react';
import VisualEditorLayout from '@/components/visual-editor/VisualEditorLayout';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Cloud, CloudOff, Wifi, WifiOff, AlertCircle } from 'lucide-react';
import { useQuizEditor } from '@/hooks/useQuizEditor';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const VisualEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { quizId } = useParams<{ quizId?: string }>();
  
  // Usar o novo hook que gerencia API e offline
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
    saveQuiz,
    updateQuestions,
    syncOfflineChanges,
    canSave
  } = useQuizEditor({
    quizId,
    autoSave: true,
    autoSaveDelay: 3000,
    enableOfflineMode: true
  });

  // Handler para salvamento manual
  const handleManualSave = async () => {
    const result = await saveQuiz();
    if (result.success) {
      toast({
        title: "Quiz salvo com sucesso",
        description: "Todas as alterações foram salvas na nuvem.",
      });
    }
  };

  // Handler para sincronização offline
  const handleSync = async () => {
    await syncOfflineChanges();
  };

  // Componente de status de conectividade
  const ConnectionStatus = () => (
    <div className="flex items-center gap-2">
      {isOnline ? (
        <div className="flex items-center gap-1 text-green-600">
          <Wifi className="h-4 w-4" />
          <span className="text-xs">Online</span>
        </div>
      ) : (
        <div className="flex items-center gap-1 text-orange-600">
          <WifiOff className="h-4 w-4" />
          <span className="text-xs">Offline</span>
        </div>
      )}
    </div>
  );

  // Componente de status de salvamento
  const SaveStatus = () => (
    <div className="flex items-center gap-2">
      {saving ? (
        <div className="flex items-center gap-1 text-blue-600">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Cloud className="h-4 w-4" />
          </motion.div>
          <span className="text-xs">Salvando...</span>
        </div>
      ) : saved ? (
        <div className="flex items-center gap-1 text-green-600">
          <Cloud className="h-4 w-4" />
          <span className="text-xs">
            Salvo {lastSavedAt && new Date(lastSavedAt).toLocaleTimeString()}
          </span>
        </div>
      ) : hasUnsavedChanges ? (
        <div className="flex items-center gap-1 text-orange-600">
          <CloudOff className="h-4 w-4" />
          <span className="text-xs">Não salvo</span>
        </div>
      ) : null}
    </div>
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FAF9F7]">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-[#B89B7A] border-t-transparent rounded-full mx-auto mb-4"
          />
          <div className="text-[#B89B7A]">Carregando editor...</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Barra superior com status */}
      <div className="bg-white border-b border-[#B89B7A]/20 p-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar
          </Button>
          
          {/* Status indicators */}
          <ConnectionStatus />
          <SaveStatus />
          
          {/* Alert para mudanças não sincronizadas */}
          {needsSync && (
            <Badge variant="outline" className="border-orange-500 text-orange-700">
              <AlertCircle className="h-3 w-3 mr-1" />
              Precisa sincronizar
            </Badge>
          )}
          
          {/* Error indicator */}
          {error && (
            <Badge variant="destructive">
              <AlertCircle className="h-3 w-3 mr-1" />
              Erro: {error}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Sync button para mudanças offline */}
          {needsSync && (
            <Button 
              variant="outline"
              size="sm"
              onClick={handleSync}
              disabled={!isOnline}
            >
              <Cloud className="h-4 w-4 mr-1" />
              Sincronizar
            </Button>
          )}
          
          {/* Manual save button */}
          <Button 
            className={`text-white ${
              hasUnsavedChanges 
                ? 'bg-orange-500 hover:bg-orange-600' 
                : 'bg-[#B89B7A] hover:bg-[#A38A69]'
            }`}
            size="sm"
            onClick={handleManualSave}
            disabled={!canSave}
          >
            <Save className="h-4 w-4 mr-1" />
            {hasUnsavedChanges ? 'Salvar Agora' : 'Salvar Quiz'}
          </Button>
        </div>
      </div>
      
      {/* Editor principal */}
      <div className="flex-1">
        <VisualEditorLayout 
          initialQuestions={questions} 
          onSave={updateQuestions}
          onQuestionsChange={updateQuestions}
        />
      </div>
    </div>
  );
};

export default VisualEditorPage;
