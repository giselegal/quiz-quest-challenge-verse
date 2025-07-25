// MCP Service Examples
// This file demonstrates how to use the MCP Protocol in services

import { MCPAdapter, MCPResponse, MCPQuery } from '../lib/mcp-adapter';

// Funnel Types
export interface Funnel {
  id: string;
  name: string;
  description?: string;
  user_id: string;
  is_published: boolean;
  version: number;
  status: 'draft' | 'published' | 'archived';
  settings: FunnelSettings;
  pages: FunnelPage[];
  created_at: string;
  updated_at: string;
}

export interface FunnelSettings {
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
  };
  showProgressBar: boolean;
  allowBackNavigation: boolean;
  autoSave: boolean;
}

export interface FunnelPage {
  id: string;
  funnel_id: string;
  page_type: string;
  page_order: number;
  title?: string;
  blocks: any[];
  metadata?: any;
}

export interface CreateFunnelData {
  name: string;
  description?: string;
  user_id: string;
  settings?: Partial<FunnelSettings>;
}

export interface UpdateFunnelData {
  name?: string;
  description?: string;
  settings?: Partial<FunnelSettings>;
  pages?: FunnelPage[];
}

// Quiz Types
export interface Quiz {
  id: string;
  title: string;
  description?: string;
  config: QuizConfig;
  questions: QuizQuestion[];
  created_at: string;
  updated_at: string;
}

export interface QuizConfig {
  timeLimit?: number;
  showProgressBar: boolean;
  allowRetake: boolean;
  shuffleQuestions: boolean;
  shuffleAnswers: boolean;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  order: number;
  question: string;
  type: 'multiple_choice' | 'single_choice' | 'text' | 'rating';
  options: QuizOption[];
  required: boolean;
}

export interface QuizOption {
  id: string;
  text: string;
  value?: string;
  imageUrl?: string;
  points?: number;
}

// MCP Funnel Service
export class MCPFunnelService {
  constructor(private adapter: MCPAdapter) {}

  async createFunnel(data: CreateFunnelData): Promise<MCPResponse<Funnel>> {
    const funnelData: Partial<Funnel> = {
      id: this.generateUUID(),
      ...data,
      is_published: false,
      version: 1,
      status: 'draft',
      settings: {
        theme: {
          primaryColor: '#3B82F6',
          secondaryColor: '#10B981',
          backgroundColor: '#FFFFFF',
          textColor: '#1F2937',
          fontFamily: 'Inter, sans-serif'
        },
        showProgressBar: true,
        allowBackNavigation: true,
        autoSave: true,
        ...data.settings
      },
      pages: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return this.adapter.create('funnels', funnelData as Funnel);
  }

  async getFunnel(id: string): Promise<MCPResponse<Funnel[]>> {
    const query: MCPQuery = {
      where: [{ field: 'id', operator: 'eq', value: id }]
    };

    return this.adapter.read<Funnel>('funnels', query);
  }

  async getFunnelsByUser(userId: string, options?: {
    limit?: number;
    offset?: number;
    status?: string;
  }): Promise<MCPResponse<Funnel[]>> {
    const query: MCPQuery = {
      where: [{ field: 'user_id', operator: 'eq', value: userId }],
      orderBy: [{ field: 'updated_at', direction: 'desc' }],
      limit: options?.limit || 20,
      offset: options?.offset || 0
    };

    // Add status filter if provided
    if (options?.status) {
      query.where?.push({ field: 'status', operator: 'eq', value: options.status });
    }

    return this.adapter.read<Funnel>('funnels', query);
  }

  async updateFunnel(id: string, data: UpdateFunnelData): Promise<MCPResponse<Funnel>> {
    const updateData = {
      ...data,
      updated_at: new Date().toISOString(),
      version: this.incrementVersion() // This would need to be handled properly
    };

    return this.adapter.update('funnels', id, updateData);
  }

  async publishFunnel(id: string): Promise<MCPResponse<Funnel>> {
    const updateData = {
      is_published: true,
      status: 'published' as const,
      updated_at: new Date().toISOString()
    };

    return this.adapter.update('funnels', id, updateData);
  }

  async archiveFunnel(id: string): Promise<MCPResponse<Funnel>> {
    const updateData = {
      status: 'archived' as const,
      is_published: false,
      updated_at: new Date().toISOString()
    };

    return this.adapter.update('funnels', id, updateData);
  }

  async deleteFunnel(id: string): Promise<MCPResponse<boolean>> {
    return this.adapter.delete('funnels', id);
  }

  async duplicateFunnel(id: string, newName?: string): Promise<MCPResponse<Funnel>> {
    // First get the original funnel
    const originalResponse = await this.getFunnel(id);
    
    if (!originalResponse.success || !originalResponse.data?.[0]) {
      return {
        success: false,
        error: {
          code: 'FUNNEL_NOT_FOUND',
          message: `Funnel with id ${id} not found`
        },
        metadata: originalResponse.metadata
      };
    }

    const original = originalResponse.data[0];
    
    // Create duplicate
    const duplicateData: CreateFunnelData = {
      name: newName || `${original.name} (Copy)`,
      description: original.description,
      user_id: original.user_id,
      settings: original.settings
    };

    const duplicateResponse = await this.createFunnel(duplicateData);

    // If successful and original had pages, duplicate them too
    if (duplicateResponse.success && original.pages.length > 0) {
      const newFunnelId = duplicateResponse.data!.id;
      
      for (const page of original.pages) {
        await this.addPageToFunnel(newFunnelId, {
          page_type: page.page_type,
          page_order: page.page_order,
          title: page.title,
          blocks: JSON.parse(JSON.stringify(page.blocks)), // Deep clone
          metadata: page.metadata
        });
      }
    }

    return duplicateResponse;
  }

  async addPageToFunnel(funnelId: string, pageData: Omit<FunnelPage, 'id' | 'funnel_id'>): Promise<MCPResponse<FunnelPage>> {
    const page: FunnelPage = {
      id: this.generateUUID(),
      funnel_id: funnelId,
      ...pageData
    };

    return this.adapter.create('funnel_pages', page);
  }

  async getFunnelPages(funnelId: string): Promise<MCPResponse<FunnelPage[]>> {
    const query: MCPQuery = {
      where: [{ field: 'funnel_id', operator: 'eq', value: funnelId }],
      orderBy: [{ field: 'page_order', direction: 'asc' }]
    };

    return this.adapter.read<FunnelPage>('funnel_pages', query);
  }

  async updateFunnelPage(pageId: string, data: Partial<FunnelPage>): Promise<MCPResponse<FunnelPage>> {
    return this.adapter.update('funnel_pages', pageId, data);
  }

  async deleteFunnelPage(pageId: string): Promise<MCPResponse<boolean>> {
    return this.adapter.delete('funnel_pages', pageId);
  }

  // Analytics and Statistics
  async getFunnelStats(funnelId: string): Promise<MCPResponse<FunnelStats>> {
    try {
      // This would typically involve multiple queries or a complex analytics query
      const [pagesResponse, analyticsResponse] = await Promise.all([
        this.getFunnelPages(funnelId),
        this.adapter.read('funnel_analytics', { 
          where: [{ field: 'funnel_id', operator: 'eq', value: funnelId }] 
        })
      ]);

      const stats: FunnelStats = {
        total_pages: pagesResponse.data?.length || 0,
        total_views: 0,
        total_completions: 0,
        conversion_rate: 0,
        average_time: 0,
        last_activity: null
      };

      // Calculate stats from analytics data
      if (analyticsResponse.success && analyticsResponse.data) {
        stats.total_views = analyticsResponse.data.length;
        // Add more calculations here...
      }

      return {
        success: true,
        data: stats,
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'calculated',
          execution_time: 0,
          query_count: 2
        }
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'STATS_CALCULATION_ERROR',
          message: error.message
        },
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'calculated',
          execution_time: 0,
          query_count: 0
        }
      };
    }
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private incrementVersion(): any {
    // This would be a special marker for the adapter to handle
    return { _mcp_increment: 'version' };
  }
}

export interface FunnelStats {
  total_pages: number;
  total_views: number;
  total_completions: number;
  conversion_rate: number;
  average_time: number;
  last_activity: string | null;
}

// MCP Quiz Service
export class MCPQuizService {
  constructor(private adapter: MCPAdapter) {}

  async createQuiz(data: {
    title: string;
    description?: string;
    config?: Partial<QuizConfig>;
    questions?: Omit<QuizQuestion, 'id' | 'quiz_id'>[];
  }): Promise<MCPResponse<Quiz>> {
    const quizData: Partial<Quiz> = {
      id: this.generateUUID(),
      title: data.title,
      description: data.description,
      config: {
        showProgressBar: true,
        allowRetake: false,
        shuffleQuestions: false,
        shuffleAnswers: false,
        ...data.config
      },
      questions: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const quizResponse = await this.adapter.create('quizzes', quizData as Quiz);

    // Add questions if provided
    if (quizResponse.success && data.questions?.length) {
      const quizId = quizResponse.data!.id;
      
      for (let i = 0; i < data.questions.length; i++) {
        const questionData = {
          ...data.questions[i],
          id: this.generateUUID(),
          quiz_id: quizId,
          order: i + 1
        };
        
        await this.adapter.create('quiz_questions', questionData);
      }
    }

    return quizResponse;
  }

  async getQuiz(id: string): Promise<MCPResponse<Quiz[]>> {
    return this.adapter.read<Quiz>('quizzes', {
      where: [{ field: 'id', operator: 'eq', value: id }]
    });
  }

  async getQuizWithQuestions(id: string): Promise<MCPResponse<Quiz & { questions: QuizQuestion[] }>> {
    const [quizResponse, questionsResponse] = await Promise.all([
      this.getQuiz(id),
      this.adapter.read<QuizQuestion>('quiz_questions', {
        where: [{ field: 'quiz_id', operator: 'eq', value: id }],
        orderBy: [{ field: 'order', direction: 'asc' }]
      })
    ]);

    if (!quizResponse.success) {
      return quizResponse as any;
    }

    if (!quizResponse.data?.[0]) {
      return {
        success: false,
        error: {
          code: 'QUIZ_NOT_FOUND',
          message: `Quiz with id ${id} not found`
        },
        metadata: quizResponse.metadata
      };
    }

    const quiz = quizResponse.data[0];
    const questions = questionsResponse.success ? questionsResponse.data || [] : [];

    return {
      success: true,
      data: {
        ...quiz,
        questions
      },
      metadata: quizResponse.metadata
    };
  }

  async updateQuiz(id: string, data: Partial<Quiz>): Promise<MCPResponse<Quiz>> {
    const updateData = {
      ...data,
      updated_at: new Date().toISOString()
    };

    return this.adapter.update('quizzes', id, updateData);
  }

  async deleteQuiz(id: string): Promise<MCPResponse<boolean>> {
    // Delete related questions first
    const questionsResponse = await this.adapter.read<QuizQuestion>('quiz_questions', {
      where: [{ field: 'quiz_id', operator: 'eq', value: id }]
    });

    if (questionsResponse.success && questionsResponse.data) {
      for (const question of questionsResponse.data) {
        await this.adapter.delete('quiz_questions', question.id);
      }
    }

    // Delete the quiz
    return this.adapter.delete('quizzes', id);
  }

  async addQuestionToQuiz(quizId: string, questionData: Omit<QuizQuestion, 'id' | 'quiz_id' | 'order'>): Promise<MCPResponse<QuizQuestion>> {
    // Get current question count to determine order
    const countResponse = await this.adapter.read<QuizQuestion>('quiz_questions', {
      where: [{ field: 'quiz_id', operator: 'eq', value: quizId }]
    });

    const order = countResponse.success ? (countResponse.data?.length || 0) + 1 : 1;

    const question: QuizQuestion = {
      id: this.generateUUID(),
      quiz_id: quizId,
      order,
      ...questionData
    };

    return this.adapter.create('quiz_questions', question);
  }

  async updateQuestion(questionId: string, data: Partial<QuizQuestion>): Promise<MCPResponse<QuizQuestion>> {
    return this.adapter.update('quiz_questions', questionId, data);
  }

  async deleteQuestion(questionId: string): Promise<MCPResponse<boolean>> {
    return this.adapter.delete('quiz_questions', questionId);
  }

  async reorderQuestions(quizId: string, questionIds: string[]): Promise<MCPResponse<boolean>> {
    try {
      for (let i = 0; i < questionIds.length; i++) {
        await this.adapter.update('quiz_questions', questionIds[i], {
          order: i + 1
        });
      }

      return {
        success: true,
        data: true,
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'calculated',
          execution_time: 0,
          query_count: questionIds.length
        }
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'REORDER_ERROR',
          message: error.message
        },
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'calculated',
          execution_time: 0,
          query_count: 0
        }
      };
    }
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

// MCP Analytics Service
export class MCPAnalyticsService {
  constructor(private adapter: MCPAdapter) {}

  async trackEvent(event: {
    event_type: string;
    user_id?: string;
    session_id: string;
    properties: Record<string, any>;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
  }): Promise<MCPResponse<any>> {
    const eventData = {
      id: this.generateUUID(),
      ...event,
      timestamp: new Date().toISOString()
    };

    return this.adapter.create('analytics_events', eventData);
  }

  async getEventsByUser(userId: string, options?: {
    event_type?: string;
    limit?: number;
    offset?: number;
    since?: string;
  }): Promise<MCPResponse<any[]>> {
    const query: MCPQuery = {
      where: [{ field: 'user_id', operator: 'eq', value: userId }],
      orderBy: [{ field: 'timestamp', direction: 'desc' }],
      limit: options?.limit || 100,
      offset: options?.offset || 0
    };

    if (options?.event_type) {
      query.where?.push({ field: 'event_type', operator: 'eq', value: options.event_type });
    }

    if (options?.since) {
      query.where?.push({ field: 'timestamp', operator: 'gte', value: options.since });
    }

    return this.adapter.read('analytics_events', query);
  }

  async getFunnelAnalytics(funnelId: string, dateRange?: {
    start: string;
    end: string;
  }): Promise<MCPResponse<any>> {
    // This would be a complex analytics query
    // For now, return a placeholder structure
    const analytics = {
      funnel_id: funnelId,
      total_views: 0,
      unique_visitors: 0,
      completion_rate: 0,
      drop_off_points: [],
      conversion_data: {},
      time_analytics: {},
      utm_analytics: {}
    };

    return {
      success: true,
      data: analytics,
      metadata: {
        timestamp: new Date().toISOString(),
        provider: 'calculated',
        execution_time: 0,
        query_count: 1
      }
    };
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

// Export service factory
export class MCPServiceFactory {
  constructor(private adapter: MCPAdapter) {}

  createFunnelService(): MCPFunnelService {
    return new MCPFunnelService(this.adapter);
  }

  createQuizService(): MCPQuizService {
    return new MCPQuizService(this.adapter);
  }

  createAnalyticsService(): MCPAnalyticsService {
    return new MCPAnalyticsService(this.adapter);
  }

  async initialize(): Promise<void> {
    await this.adapter.initialize();
  }

  async healthCheck(): Promise<boolean> {
    return this.adapter.healthCheck();
  }
}

export default MCPServiceFactory;