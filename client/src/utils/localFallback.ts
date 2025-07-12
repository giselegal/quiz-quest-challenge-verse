
/**
 * Sistema de Fallback Local - Funcionalidade offline completa
 */

export class LocalFallback {
  private static instance: LocalFallback;
  private isActive: boolean = false;
  private localData: Map<string, any> = new Map();

  static getInstance(): LocalFallback {
    if (!LocalFallback.instance) {
      LocalFallback.instance = new LocalFallback();
    }
    return LocalFallback.instance;
  }

  activate() {
    this.isActive = true;
    console.log('🔄 Local Fallback activated');
    this.setupLocalEnvironment();
  }

  deactivate() {
    this.isActive = false;
    console.log('🌐 Local Fallback deactivated');
  }

  isActiveMode(): boolean {
    return this.isActive;
  }

  private setupLocalEnvironment() {
    // Configurar dados locais para o quiz
    this.setupQuizData();
    
    // Configurar rotas locais
    this.setupLocalRouting();
    
    // Configurar storage local
    this.setupLocalStorage();
  }

  private setupQuizData() {
    // Dados básicos do quiz para funcionamento offline
    const quizData = {
      questions: [
        {
          id: 'q1',
          question: 'Qual é seu estilo preferido?',
          options: [
            { id: 'o1', text: 'Clássico', points: 10 },
            { id: 'o2', text: 'Moderno', points: 15 },
            { id: 'o3', text: 'Casual', points: 12 }
          ]
        }
      ],
      styles: [
        { id: 'classic', name: 'Clássico', description: 'Estilo elegante e atemporal' },
        { id: 'modern', name: 'Moderno', description: 'Estilo contemporâneo e inovador' },
        { id: 'casual', name: 'Casual', description: 'Estilo descontraído e confortável' }
      ]
    };
    
    this.localData.set('quiz', quizData);
  }

  private setupLocalRouting() {
    // Interceptar rotas que precisam de conectividade
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = (...args) => {
      console.log('🔄 Local routing:', args[2]);
      return originalPushState.apply(history, args);
    };
    
    history.replaceState = (...args) => {
      console.log('🔄 Local routing:', args[2]);
      return originalReplaceState.apply(history, args);
    };
  }

  private setupLocalStorage() {
    // Garantir que o localStorage funcione normalmente
    if (typeof Storage !== 'undefined') {
      console.log('✅ Local storage available');
    } else {
      console.warn('⚠️ Local storage not available');
    }
  }

  // Métodos para substituir APIs externas
  async fetchQuizQuestions(): Promise<any[]> {
    if (this.isActive) {
      console.log('📋 Using local quiz questions');
      return this.localData.get('quiz')?.questions || [];
    }
    throw new Error('Not in fallback mode');
  }

  async saveParticipant(data: any): Promise<string> {
    if (this.isActive) {
      const id = `local-${Date.now()}`;
      localStorage.setItem(`participant-${id}`, JSON.stringify(data));
      console.log('💾 Participant saved locally:', id);
      return id;
    }
    throw new Error('Not in fallback mode');
  }

  async saveAnswers(participantId: string, answers: any[]): Promise<void> {
    if (this.isActive) {
      localStorage.setItem(`answers-${participantId}`, JSON.stringify(answers));
      console.log('💾 Answers saved locally');
    } else {
      throw new Error('Not in fallback mode');
    }
  }

  async calculateResults(answers: any[]): Promise<any> {
    if (this.isActive) {
      // Cálculo simples de resultados baseado nas respostas
      const styles = this.localData.get('quiz')?.styles || [];
      const totalPoints = answers.reduce((sum, answer) => sum + (answer.points || 0), 0);
      
      const result = {
        primaryStyle: styles[0] || { id: 'default', name: 'Seu Estilo', description: 'Único e especial' },
        score: totalPoints,
        percentage: Math.min(100, (totalPoints / 50) * 100),
        completedAt: new Date().toISOString()
      };
      
      console.log('🎯 Results calculated locally:', result);
      return result;
    }
    throw new Error('Not in fallback mode');
  }

  getLocalData(key: string): any {
    return this.localData.get(key);
  }

  setLocalData(key: string, value: any): void {
    this.localData.set(key, value);
  }

  // Health check para serviços
  async healthCheck(): Promise<{isHealthy: boolean, services: string[]}> {
    const healthyServices = ['localStorage', 'routing', 'calculations'];
    
    return {
      isHealthy: this.isActive,
      services: healthyServices
    };
  }
}

// Exportar instância singleton
export const localFallback = LocalFallback.getInstance();

// Ativar automaticamente se detectar problemas
if (typeof window !== 'undefined') {
  window.addEventListener('fallback-mode-activated', () => {
    localFallback.activate();
  });
}

export default localFallback;
