import { useState, useEffect, useCallback, useRef } from 'react';
import { QuizQuestion } from '@/types/quiz';
import { useQuizApi, QuizData, SaveQuizRequest } from '@/services/quizApiService';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';

interface UseQuizEditorOptions {
  quizId?: string;
  autoSave?: boolean;
  autoSaveDelay?: number;
  enableOfflineMode?: boolean;
}

interface QuizEditorState {
  questions: QuizQuestion[];
  loading: boolean;
  saving: boolean;
  saved: boolean;
  error: string | null;
  quizData: QuizData | null;
  hasUnsavedChanges: boolean;
  lastSavedAt: Date | null;
  isOnline: boolean;
}

export const useQuizEditor = (options: UseQuizEditorOptions = {}) => {
  const {
    quizId,
    autoSave = true,
    autoSaveDelay = 2000,
    enableOfflineMode = true
  } = options;

  const { user } = useAuth();
  const quizApi = useQuizApi();
  
  // Estado principal
  const [state, setState] = useState<QuizEditorState>({
    questions: [],
    loading: false,
    saving: false,
    saved: true,
    error: null,
    quizData: null,
    hasUnsavedChanges: false,
    lastSavedAt: null,
    isOnline: navigator.onLine
  });

  // Refs para controle de auto-save
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>();
  const previousQuestionsRef = useRef<QuizQuestion[]>([]);

  // Detectar mudanças na conectividade
  useEffect(() => {
    const handleOnline = () => {
      setState(prev => ({ ...prev, isOnline: true }));
      if (enableOfflineMode) {
        // Tentar sincronizar mudanças offline
        syncOfflineChanges();
      }
    };

    const handleOffline = () => {
      setState(prev => ({ ...prev, isOnline: false }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [enableOfflineMode]);

  // Carregar quiz inicial
  useEffect(() => {
    if (quizId) {
      loadQuiz(quizId);
    } else {
      // Tentar carregar do localStorage se não há ID
      loadFromLocalStorage();
    }
  }, [quizId]);

  // Auto-save quando questions mudam
  useEffect(() => {
    if (autoSave && state.questions.length > 0) {
      const questionsChanged = JSON.stringify(previousQuestionsRef.current) !== JSON.stringify(state.questions);
      
      if (questionsChanged && !state.loading) {
        setState(prev => ({ ...prev, hasUnsavedChanges: true, saved: false }));
        
        // Limpar timeout anterior
        if (autoSaveTimeoutRef.current) {
          clearTimeout(autoSaveTimeoutRef.current);
        }

        // Configurar novo auto-save
        autoSaveTimeoutRef.current = setTimeout(() => {
          handleAutoSave();
        }, autoSaveDelay);

        previousQuestionsRef.current = [...state.questions];
      }
    }
  }, [state.questions, autoSave, autoSaveDelay]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, []);

  // Carregar quiz da API
  const loadQuiz = useCallback(async (id: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await quizApi.loadQuiz(id);
      
      if (result.success && result.data) {
        setState(prev => ({
          ...prev,
          questions: result.data!.questions,
          quizData: result.data!,
          loading: false,
          saved: true,
          hasUnsavedChanges: false,
          lastSavedAt: new Date(result.data!.updatedAt)
        }));
        previousQuestionsRef.current = [...result.data.questions];
      } else {
        throw new Error(result.error || 'Erro ao carregar quiz');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: errorMessage 
      }));
      
      toast({
        title: "Erro ao carregar quiz",
        description: errorMessage,
        variant: "destructive"
      });

      // Fallback para localStorage
      if (enableOfflineMode) {
        loadFromLocalStorage();
      }
    }
  }, [quizApi, enableOfflineMode]);

  // Carregar do localStorage
  const loadFromLocalStorage = useCallback(() => {
    try {
      const saved = localStorage.getItem('quiz_editor_questions');
      if (saved) {
        const questions = JSON.parse(saved);
        setState(prev => ({
          ...prev,
          questions,
          loading: false,
          hasUnsavedChanges: true // Marcar como não salvo se veio do localStorage
        }));
        previousQuestionsRef.current = [...questions];
      }
    } catch (error) {
      console.error('Erro ao carregar do localStorage:', error);
    }
  }, []);

  // Salvar quiz
  const saveQuiz = useCallback(async (title?: string, description?: string) => {
    setState(prev => ({ ...prev, saving: true, error: null }));

    try {
      const saveData: SaveQuizRequest = {
        id: state.quizData?.id,
        title: title || state.quizData?.title || 'Quiz sem título',
        description: description || state.quizData?.description,
        questions: state.questions,
        userId: user?.id,
        isPublished: state.quizData?.isPublished || false,
        metadata: {
          ...state.quizData?.metadata,
          tags: state.quizData?.metadata?.tags || []
        }
      };

      let result;
      if (state.isOnline) {
        result = await quizApi.saveWithBackup(saveData);
      } else {
        // Modo offline - salvar apenas localmente
        localStorage.setItem('quiz_editor_questions', JSON.stringify(state.questions));
        const backupKey = `quiz_backup_${saveData.id || 'new'}`;
        localStorage.setItem(backupKey, JSON.stringify({
          ...saveData,
          backupTimestamp: new Date().toISOString()
        }));
        
        setState(prev => ({
          ...prev,
          saving: false,
          saved: true,
          hasUnsavedChanges: false,
          lastSavedAt: new Date()
        }));

        toast({
          title: "Salvo offline",
          description: "Quiz salvo localmente. Será sincronizado quando a conexão for restabelecida.",
        });

        return { success: true };
      }

      if (result.success && result.data) {
        setState(prev => ({
          ...prev,
          saving: false,
          saved: true,
          hasUnsavedChanges: false,
          quizData: result.data!,
          lastSavedAt: new Date()
        }));

        toast({
          title: "Quiz salvo com sucesso",
          description: "Todas as alterações foram salvas.",
        });

        return result;
      } else {
        throw new Error(result.error || 'Erro ao salvar quiz');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setState(prev => ({ 
        ...prev, 
        saving: false, 
        error: errorMessage 
      }));

      toast({
        title: "Erro ao salvar quiz",
        description: errorMessage,
        variant: "destructive"
      });

      return { success: false, error: errorMessage };
    }
  }, [state.questions, state.quizData, state.isOnline, user, quizApi]);

  // Auto-save handler
  const handleAutoSave = useCallback(async () => {
    if (state.questions.length === 0) return;

    try {
      const saveData: SaveQuizRequest = {
        id: state.quizData?.id,
        title: state.quizData?.title || 'Quiz sem título',
        description: state.quizData?.description,
        questions: state.questions,
        userId: user?.id,
        isPublished: false, // Auto-save sempre como rascunho
        metadata: state.quizData?.metadata
      };

      if (state.isOnline) {
        await quizApi.autoSaveQuiz(saveData);
      } else {
        // Salvar offline
        localStorage.setItem('quiz_editor_questions', JSON.stringify(state.questions));
      }

      setState(prev => ({
        ...prev,
        saved: true,
        hasUnsavedChanges: false,
        lastSavedAt: new Date()
      }));
    } catch (error) {
      console.error('Auto-save error:', error);
    }
  }, [state.questions, state.quizData, state.isOnline, user, quizApi]);

  // Sincronizar mudanças offline
  const syncOfflineChanges = useCallback(async () => {
    if (!state.isOnline) return;

    try {
      const result = await quizApi.syncOfflineChanges();
      if (result.success && result.data) {
        toast({
          title: "Sincronização concluída",
          description: `${result.data.synced} item(s) sincronizado(s), ${result.data.failed} falharam.`,
        });
      }
    } catch (error) {
      console.error('Sync error:', error);
    }
  }, [state.isOnline, quizApi]);

  // Atualizar questions
  const updateQuestions = useCallback((newQuestions: QuizQuestion[]) => {
    setState(prev => ({ ...prev, questions: newQuestions }));
  }, []);

  // Atualizar uma questão específica
  const updateQuestion = useCallback((id: string, updates: Partial<QuizQuestion>) => {
    setState(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === id ? { ...q, ...updates } : q
      )
    }));
  }, []);

  return {
    // Estado
    ...state,
    
    // Ações
    loadQuiz,
    saveQuiz,
    updateQuestions,
    updateQuestion,
    syncOfflineChanges,
    
    // Utilitários
    canSave: !state.saving && state.questions.length > 0,
    needsSync: !state.isOnline && state.hasUnsavedChanges,
  };
};
