import { QuizResult, StyleType, StyleScore } from '@/types/quiz';

export interface QuizSession {
  sessionId: string;
  userId?: string;
  userName?: string;
  userEmail?: string;
  startTime: Date;
  endTime?: Date;
  answers: QuizAnswer[];
  clickEvents: ClickEvent[];
  result?: QuizResult;
  abTestVariant?: string;
  userAgent?: string;
  referrer?: string;
  device?: DeviceInfo;
}

export interface QuizAnswer {
  questionId: string;
  questionText: string;
  selectedOptions: string[];
  optionTexts: string[];
  timestamp: Date;
  responseTime: number; // em milliseconds
  stylePoints: Record<string, number>;
}

export interface ClickEvent {
  eventId: string;
  timestamp: Date;
  elementType: string;
  elementId?: string;
  elementText?: string;
  position: { x: number; y: number };
  pageUrl: string;
  questionIndex?: number;
  actionType: 'click' | 'hover' | 'focus' | 'submit';
  metadata?: Record<string, any>;
}

export interface DeviceInfo {
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  platform: string;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

class QuizDataService {
  private currentSession: QuizSession | null = null;
  private clickEventBuffer: ClickEvent[] = [];
  private isTrackingEnabled = true;

  // Inicializar nova sessão de quiz
  startSession(userName?: string, userEmail?: string): string {
    const sessionId = this.generateSessionId();
    
    this.currentSession = {
      sessionId,
      userName,
      userEmail,
      startTime: new Date(),
      answers: [],
      clickEvents: [],
      device: this.getDeviceInfo(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
    };

    // Salvar no localStorage
    this.saveSessionToStorage();
    
    // Track início da sessão
    this.trackEvent('session_start', {
      sessionId,
      userName,
      userEmail,
      timestamp: new Date().toISOString()
    });

    console.log('Quiz session started:', sessionId);
    return sessionId;
  }

  // Adicionar resposta de pergunta
  addAnswer(
    questionId: string,
    questionText: string,
    selectedOptions: string[],
    optionTexts: string[],
    stylePoints: Record<string, number>,
    responseTime: number
  ): void {
    if (!this.currentSession) {
      console.warn('No active session to add answer');
      return;
    }

    const answer: QuizAnswer = {
      questionId,
      questionText,
      selectedOptions,
      optionTexts,
      timestamp: new Date(),
      responseTime,
      stylePoints
    };

    this.currentSession.answers.push(answer);
    this.saveSessionToStorage();

    // Track resposta
    this.trackEvent('question_answered', {
      questionId,
      selectedOptions,
      responseTime,
      timestamp: new Date().toISOString()
    });

    console.log(`Answer added for question ${questionId}:`, selectedOptions);
  }

  // Rastrear evento de clique
  trackClick(
    elementType: string,
    elementId?: string,
    elementText?: string,
    position?: { x: number; y: number },
    questionIndex?: number,
    metadata?: Record<string, any>
  ): void {
    if (!this.isTrackingEnabled || !this.currentSession) return;

    const clickEvent: ClickEvent = {
      eventId: this.generateEventId(),
      timestamp: new Date(),
      elementType,
      elementId,
      elementText,
      position: position || { x: 0, y: 0 },
      pageUrl: window.location.href,
      questionIndex,
      actionType: 'click',
      metadata
    };

    this.currentSession.clickEvents.push(clickEvent);
    this.clickEventBuffer.push(clickEvent);
    
    // Salvar no localStorage a cada 5 cliques ou imediatamente se for importante
    if (this.clickEventBuffer.length >= 5 || this.isImportantClick(elementType)) {
      this.saveSessionToStorage();
      this.clickEventBuffer = [];
    }

    // Track evento
    this.trackEvent('click_event', {
      elementType,
      elementId,
      elementText,
      questionIndex,
      timestamp: new Date().toISOString()
    });
  }

  // Finalizar sessão com resultado
  finishSession(result: QuizResult): void {
    if (!this.currentSession) {
      console.warn('No active session to finish');
      return;
    }

    this.currentSession.endTime = new Date();
    this.currentSession.result = result;
    
    // Salvar sessão completa
    this.saveSessionToStorage();
    this.saveCompletedSession();

    // Track finalização
    this.trackEvent('session_completed', {
      sessionId: this.currentSession.sessionId,
      result: result.predominantStyle,
      totalQuestions: this.currentSession.answers.length,
      totalClicks: this.currentSession.clickEvents.length,
      duration: this.getSessionDuration(),
      timestamp: new Date().toISOString()
    });

    console.log('Quiz session completed:', this.currentSession.sessionId);
  }

  // Obter sessão atual
  getCurrentSession(): QuizSession | null {
    return this.currentSession;
  }

  // Carregar sessão do localStorage
  loadSession(): QuizSession | null {
    try {
      const savedSession = localStorage.getItem('current_quiz_session');
      if (savedSession) {
        this.currentSession = JSON.parse(savedSession);
        return this.currentSession;
      }
    } catch (error) {
      console.error('Error loading session:', error);
    }
    return null;
  }

  // Obter todas as sessões completas
  getAllCompletedSessions(): QuizSession[] {
    try {
      const sessions = localStorage.getItem('completed_quiz_sessions');
      return sessions ? JSON.parse(sessions) : [];
    } catch (error) {
      console.error('Error loading completed sessions:', error);
      return [];
    }
  }

  // Obter estatísticas da sessão atual
  getSessionStats(): any {
    if (!this.currentSession) return null;

    return {
      sessionId: this.currentSession.sessionId,
      duration: this.getSessionDuration(),
      totalQuestions: this.currentSession.answers.length,
      totalClicks: this.currentSession.clickEvents.length,
      averageResponseTime: this.getAverageResponseTime(),
      clicksByType: this.getClicksByType(),
      answersBreakdown: this.getAnswersBreakdown()
    };
  }

  // Exportar dados para análise
  exportSessionData(sessionId?: string): string {
    const session = sessionId ? 
      this.getAllCompletedSessions().find(s => s.sessionId === sessionId) :
      this.currentSession;

    if (!session) return '';

    return JSON.stringify(session, null, 2);
  }

  // Reset completo de dados
  clearAllData(): void {
    this.currentSession = null;
    this.clickEventBuffer = [];
    localStorage.removeItem('current_quiz_session');
    localStorage.removeItem('completed_quiz_sessions');
    localStorage.removeItem('quiz_analytics_events');
    console.log('All quiz data cleared');
  }

  // Métodos privados
  private generateSessionId(): string {
    return `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateEventId(): string {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  }

  private getDeviceInfo(): DeviceInfo {
    const userAgent = navigator.userAgent;
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    return {
      userAgent,
      screenWidth,
      screenHeight,
      viewportWidth,
      viewportHeight,
      platform: navigator.platform,
      isMobile: /Mobi|Android/i.test(userAgent),
      isTablet: /Tablet|iPad/i.test(userAgent),
      isDesktop: !/Mobi|Tablet|iPad|Android/i.test(userAgent)
    };
  }

  private saveSessionToStorage(): void {
    if (this.currentSession) {
      localStorage.setItem('current_quiz_session', JSON.stringify(this.currentSession));
    }
  }

  private saveCompletedSession(): void {
    if (!this.currentSession) return;

    const completedSessions = this.getAllCompletedSessions();
    completedSessions.push(this.currentSession);
    
    // Manter apenas últimas 10 sessões
    const recentSessions = completedSessions.slice(-10);
    localStorage.setItem('completed_quiz_sessions', JSON.stringify(recentSessions));
  }

  private isImportantClick(elementType: string): boolean {
    const importantTypes = ['cta_button', 'submit_button', 'quiz_option', 'navigation_button'];
    return importantTypes.includes(elementType);
  }

  private getSessionDuration(): number {
    if (!this.currentSession) return 0;
    const endTime = this.currentSession.endTime || new Date();
    return endTime.getTime() - this.currentSession.startTime.getTime();
  }

  private getAverageResponseTime(): number {
    if (!this.currentSession || this.currentSession.answers.length === 0) return 0;
    
    const totalTime = this.currentSession.answers.reduce((sum, answer) => sum + answer.responseTime, 0);
    return totalTime / this.currentSession.answers.length;
  }

  private getClicksByType(): Record<string, number> {
    if (!this.currentSession) return {};
    
    const clicksByType: Record<string, number> = {};
    this.currentSession.clickEvents.forEach(event => {
      clicksByType[event.elementType] = (clicksByType[event.elementType] || 0) + 1;
    });
    
    return clicksByType;
  }

  private getAnswersBreakdown(): Record<string, number> {
    if (!this.currentSession) return {};
    
    const stylePoints: Record<string, number> = {};
    this.currentSession.answers.forEach(answer => {
      Object.entries(answer.stylePoints).forEach(([style, points]) => {
        stylePoints[style] = (stylePoints[style] || 0) + points;
      });
    });
    
    return stylePoints;
  }

  private trackEvent(eventName: string, data: any): void {
    try {
      // Salvar em localStorage para analytics
      const events = JSON.parse(localStorage.getItem('quiz_analytics_events') || '[]');
      events.push({
        event: eventName,
        data,
        timestamp: new Date().toISOString(),
        sessionId: this.currentSession?.sessionId
      });
      
      // Manter apenas últimos 1000 eventos
      const recentEvents = events.slice(-1000);
      localStorage.setItem('quiz_analytics_events', JSON.stringify(recentEvents));
      
      // Aqui poderia enviar para serviço de analytics externo
      // analytics.track(eventName, data);
      
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }
}

// Instância singleton
export const quizDataService = new QuizDataService();

// Hook para usar o serviço nos componentes React
export const useQuizData = () => {
  return {
    startSession: quizDataService.startSession.bind(quizDataService),
    addAnswer: quizDataService.addAnswer.bind(quizDataService),
    trackClick: quizDataService.trackClick.bind(quizDataService),
    finishSession: quizDataService.finishSession.bind(quizDataService),
    getCurrentSession: quizDataService.getCurrentSession.bind(quizDataService),
    getSessionStats: quizDataService.getSessionStats.bind(quizDataService),
    exportSessionData: quizDataService.exportSessionData.bind(quizDataService),
    clearAllData: quizDataService.clearAllData.bind(quizDataService)
  };
};
