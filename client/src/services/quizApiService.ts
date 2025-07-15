import { QuizQuestion } from '@/types/quiz';

// Configuração da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface SaveQuizRequest {
  id?: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  userId?: string;
  isPublished?: boolean;
  metadata?: {
    createdAt?: string;
    updatedAt?: string;
    version?: number;
    tags?: string[];
  };
}

interface QuizData extends SaveQuizRequest {
  id: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

class QuizApiService {
  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      // Adicionar headers padrão
      const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      // Adicionar token de autenticação se disponível
      const token = localStorage.getItem('auth_token');
      if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  // Salvar quiz (criar ou atualizar)
  async saveQuiz(quizData: SaveQuizRequest): Promise<ApiResponse<QuizData>> {
    const endpoint = quizData.id ? `/quizzes/${quizData.id}` : '/quizzes';
    const method = quizData.id ? 'PUT' : 'POST';

    const payload = {
      ...quizData,
      metadata: {
        ...quizData.metadata,
        updatedAt: new Date().toISOString(),
        version: (quizData.metadata?.version || 0) + 1,
      }
    };

    return this.makeRequest<QuizData>(endpoint, {
      method,
      body: JSON.stringify(payload),
    });
  }

  // Carregar quiz por ID
  async loadQuiz(quizId: string): Promise<ApiResponse<QuizData>> {
    return this.makeRequest<QuizData>(`/quizzes/${quizId}`);
  }

  // Listar quizzes do usuário
  async listQuizzes(userId?: string): Promise<ApiResponse<QuizData[]>> {
    const endpoint = userId ? `/quizzes?userId=${userId}` : '/quizzes';
    return this.makeRequest<QuizData[]>(endpoint);
  }

  // Deletar quiz
  async deleteQuiz(quizId: string): Promise<ApiResponse<void>> {
    return this.makeRequest<void>(`/quizzes/${quizId}`, {
      method: 'DELETE',
    });
  }

  // Auto-save (salvamento automático com debounce)
  private autoSaveTimeouts: Map<string, NodeJS.Timeout> = new Map();

  async autoSaveQuiz(
    quizData: SaveQuizRequest, 
    debounceMs: number = 2000
  ): Promise<void> {
    const key = quizData.id || 'new-quiz';
    
    // Limpar timeout anterior se existir
    const existingTimeout = this.autoSaveTimeouts.get(key);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    // Criar novo timeout
    const timeout = setTimeout(async () => {
      try {
        const result = await this.saveQuiz(quizData);
        if (result.success) {
          console.log('Quiz auto-salvo com sucesso:', result.data?.id);
          // Disparar evento customizado para notificar componentes
          window.dispatchEvent(new CustomEvent('quiz-auto-saved', {
            detail: { quizId: result.data?.id, success: true }
          }));
        } else {
          console.error('Erro no auto-save:', result.error);
          window.dispatchEvent(new CustomEvent('quiz-auto-saved', {
            detail: { success: false, error: result.error }
          }));
        }
      } catch (error) {
        console.error('Erro no auto-save:', error);
      } finally {
        this.autoSaveTimeouts.delete(key);
      }
    }, debounceMs);

    this.autoSaveTimeouts.set(key, timeout);
  }

  // Backup local antes de salvar na API
  async saveWithBackup(quizData: SaveQuizRequest): Promise<ApiResponse<QuizData>> {
    try {
      // Fazer backup local primeiro
      const backupKey = `quiz_backup_${quizData.id || 'new'}`;
      localStorage.setItem(backupKey, JSON.stringify({
        ...quizData,
        backupTimestamp: new Date().toISOString()
      }));

      // Tentar salvar na API
      const result = await this.saveQuiz(quizData);
      
      if (result.success) {
        // Se salvou na API, remover backup local
        localStorage.removeItem(backupKey);
      }

      return result;
    } catch (error) {
      console.error('Erro no saveWithBackup:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro no backup e salvamento'
      };
    }
  }

  // Recuperar backups locais
  getLocalBackups(): Array<{ key: string; data: SaveQuizRequest & { backupTimestamp: string } }> {
    const backups: Array<{ key: string; data: SaveQuizRequest & { backupTimestamp: string } }> = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('quiz_backup_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          backups.push({ key, data });
        } catch (error) {
          console.error('Erro ao recuperar backup:', key, error);
        }
      }
    }

    return backups.sort((a, b) => 
      new Date(b.data.backupTimestamp).getTime() - new Date(a.data.backupTimestamp).getTime()
    );
  }

  // Sincronizar mudanças offline
  async syncOfflineChanges(): Promise<ApiResponse<{ synced: number; failed: number }>> {
    const backups = this.getLocalBackups();
    let synced = 0;
    let failed = 0;

    for (const backup of backups) {
      try {
        const result = await this.saveQuiz(backup.data);
        if (result.success) {
          localStorage.removeItem(backup.key);
          synced++;
        } else {
          failed++;
        }
      } catch (error) {
        failed++;
        console.error('Erro ao sincronizar backup:', backup.key, error);
      }
    }

    return {
      success: true,
      data: { synced, failed }
    };
  }
}

// Singleton instance
export const quizApiService = new QuizApiService();

// Hook para usar o serviço de API
export const useQuizApi = () => {
  return {
    saveQuiz: quizApiService.saveQuiz.bind(quizApiService),
    loadQuiz: quizApiService.loadQuiz.bind(quizApiService),
    listQuizzes: quizApiService.listQuizzes.bind(quizApiService),
    deleteQuiz: quizApiService.deleteQuiz.bind(quizApiService),
    autoSaveQuiz: quizApiService.autoSaveQuiz.bind(quizApiService),
    saveWithBackup: quizApiService.saveWithBackup.bind(quizApiService),
    getLocalBackups: quizApiService.getLocalBackups.bind(quizApiService),
    syncOfflineChanges: quizApiService.syncOfflineChanges.bind(quizApiService),
  };
};

export type { QuizData, SaveQuizRequest, ApiResponse };
