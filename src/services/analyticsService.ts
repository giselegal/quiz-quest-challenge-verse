import { supabase } from '@/integrations/supabase/client';

/**
 * Basic Analytics Service for Quiz Editor
 * Tracks user interactions, performance metrics, and quiz completion data
 */

interface AnalyticsEvent {
  event_name: string;
  user_id?: string;
  session_id: string;
  timestamp: Date;
  properties: Record<string, any>;
}

interface QuizAnalytics {
  quiz_id: string;
  user_id?: string;
  session_id: string;
  started_at: Date;
  completed_at?: Date;
  total_questions: number;
  answered_questions: number;
  question_types_used: string[];
  time_spent_seconds: number;
  device_type: 'mobile' | 'tablet' | 'desktop';
  user_agent: string;
}

interface EditorAnalytics {
  session_id: string;
  user_id?: string;
  action: 'create' | 'edit' | 'save' | 'preview' | 'publish' | 'delete';
  entity_type: 'funnel' | 'quiz' | 'block';
  entity_id: string;
  timestamp: Date;
  properties: Record<string, any>;
}

class AnalyticsService {
  private sessionId: string;
  private isEnabled: boolean;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.isEnabled = true; // Can be configured based on environment
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  private getCurrentUser(): string | null {
    // Try to get user from localStorage or auth context
    try {
      const userName = localStorage.getItem('userName');
      const userEmail = localStorage.getItem('userEmail');
      return userName || userEmail || null;
    } catch {
      return null;
    }
  }

  private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  /**
   * Track general analytics events
   */
  async trackEvent(eventName: string, properties: Record<string, any> = {}): Promise<void> {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      event_name: eventName,
      user_id: this.getCurrentUser() || undefined,
      session_id: this.sessionId,
      timestamp: new Date(),
      properties: {
        ...properties,
        device_type: this.getDeviceType(),
        user_agent: navigator.userAgent,
        url: window.location.href,
        referrer: document.referrer
      }
    };

    try {
      // Try to save to Supabase first
      console.log('📊 [Analytics] Tracking event:', eventName, properties);
      
      // Note: This would need a proper analytics table in Supabase
      // For now, we'll store in localStorage as fallback
      this.saveEventLocally(event);
      
    } catch (error) {
      console.warn('📊 [Analytics] Failed to track event, saving locally:', error);
      this.saveEventLocally(event);
    }
  }

  /**
   * Track quiz-specific analytics
   */
  async trackQuizSession(data: Partial<QuizAnalytics>): Promise<void> {
    if (!this.isEnabled) return;

    const quizData: QuizAnalytics = {
      quiz_id: data.quiz_id || 'unknown',
      user_id: this.getCurrentUser() || undefined,
      session_id: this.sessionId,
      started_at: data.started_at || new Date(),
      completed_at: data.completed_at,
      total_questions: data.total_questions || 0,
      answered_questions: data.answered_questions || 0,
      question_types_used: data.question_types_used || [],
      time_spent_seconds: data.time_spent_seconds || 0,
      device_type: this.getDeviceType(),
      user_agent: navigator.userAgent
    };

    try {
      console.log('📊 [Analytics] Tracking quiz session:', quizData);
      this.saveQuizAnalyticsLocally(quizData);
    } catch (error) {
      console.warn('📊 [Analytics] Failed to track quiz session:', error);
    }
  }

  /**
   * Track editor usage analytics
   */
  async trackEditorAction(action: EditorAnalytics['action'], entityType: EditorAnalytics['entity_type'], entityId: string, properties: Record<string, any> = {}): Promise<void> {
    if (!this.isEnabled) return;

    const editorData: EditorAnalytics = {
      session_id: this.sessionId,
      user_id: this.getCurrentUser() || undefined,
      action,
      entity_type: entityType,
      entity_id: entityId,
      timestamp: new Date(),
      properties: {
        ...properties,
        device_type: this.getDeviceType()
      }
    };

    try {
      console.log('📊 [Analytics] Tracking editor action:', action, entityType, entityId);
      this.saveEditorAnalyticsLocally(editorData);
    } catch (error) {
      console.warn('📊 [Analytics] Failed to track editor action:', error);
    }
  }

  /**
   * Get analytics summary for dashboard
   */
  getAnalyticsSummary(): {
    totalEvents: number;
    totalQuizSessions: number;
    totalEditorActions: number;
    topEvents: Array<{ event: string; count: number }>;
    deviceBreakdown: Record<string, number>;
  } {
    try {
      const events = this.getLocalEvents();
      const quizSessions = this.getLocalQuizAnalytics();
      const editorActions = this.getLocalEditorAnalytics();

      // Count events by type
      const eventCounts: Record<string, number> = {};
      events.forEach(event => {
        eventCounts[event.event_name] = (eventCounts[event.event_name] || 0) + 1;
      });

      // Count devices
      const deviceCounts: Record<string, number> = {};
      [...events, ...quizSessions, ...editorActions].forEach(item => {
        const device = 'device_type' in item ? item.device_type : 'unknown';
        deviceCounts[device] = (deviceCounts[device] || 0) + 1;
      });

      // Top events
      const topEvents = Object.entries(eventCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([event, count]) => ({ event, count }));

      return {
        totalEvents: events.length,
        totalQuizSessions: quizSessions.length,
        totalEditorActions: editorActions.length,
        topEvents,
        deviceBreakdown: deviceCounts
      };
    } catch (error) {
      console.warn('📊 [Analytics] Failed to get summary:', error);
      return {
        totalEvents: 0,
        totalQuizSessions: 0,
        totalEditorActions: 0,
        topEvents: [],
        deviceBreakdown: {}
      };
    }
  }

  // Private methods for localStorage fallback
  private saveEventLocally(event: AnalyticsEvent): void {
    try {
      const events = this.getLocalEvents();
      events.push(event);
      localStorage.setItem('analytics_events', JSON.stringify(events.slice(-1000))); // Keep last 1000 events
    } catch (error) {
      console.warn('📊 [Analytics] Failed to save event locally:', error);
    }
  }

  private saveQuizAnalyticsLocally(data: QuizAnalytics): void {
    try {
      const analytics = this.getLocalQuizAnalytics();
      analytics.push(data);
      localStorage.setItem('analytics_quiz', JSON.stringify(analytics.slice(-500))); // Keep last 500 sessions
    } catch (error) {
      console.warn('📊 [Analytics] Failed to save quiz analytics locally:', error);
    }
  }

  private saveEditorAnalyticsLocally(data: EditorAnalytics): void {
    try {
      const analytics = this.getLocalEditorAnalytics();
      analytics.push(data);
      localStorage.setItem('analytics_editor', JSON.stringify(analytics.slice(-1000))); // Keep last 1000 actions
    } catch (error) {
      console.warn('📊 [Analytics] Failed to save editor analytics locally:', error);
    }
  }

  private getLocalEvents(): AnalyticsEvent[] {
    try {
      const stored = localStorage.getItem('analytics_events');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private getLocalQuizAnalytics(): QuizAnalytics[] {
    try {
      const stored = localStorage.getItem('analytics_quiz');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private getLocalEditorAnalytics(): EditorAnalytics[] {
    try {
      const stored = localStorage.getItem('analytics_editor');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  /**
   * Clear all analytics data (for privacy compliance)
   */
  clearAnalytics(): void {
    try {
      localStorage.removeItem('analytics_events');
      localStorage.removeItem('analytics_quiz');
      localStorage.removeItem('analytics_editor');
      console.log('📊 [Analytics] All analytics data cleared');
    } catch (error) {
      console.warn('📊 [Analytics] Failed to clear analytics:', error);
    }
  }

  /**
   * Enable/disable analytics tracking
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    console.log(`📊 [Analytics] Tracking ${enabled ? 'enabled' : 'disabled'}`);
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();

// Export types for use in other components
export type { AnalyticsEvent, QuizAnalytics, EditorAnalytics };