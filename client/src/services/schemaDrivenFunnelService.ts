import type { BlockData } from '@/components/editor/blocks';
import { REAL_QUIZ_QUESTIONS, STRATEGIC_QUESTIONS, TRANSITIONS } from '@/components/visual-editor/realQuizData';
import { QuizDataAdapter } from './quizDataAdapter';
import { generateTimestampId } from '../utils/idGenerator';
import { createCorrectedStepConfiguration } from './stepMappingService';

// DEBUG: Verificar se os dados estão sendo importados corretamente
console.log('🔍 DEBUG - Dados importados:');
console.log('  REAL_QUIZ_QUESTIONS:', REAL_QUIZ_QUESTIONS?.length || 'UNDEFINED');
console.log('  STRATEGIC_QUESTIONS:', STRATEGIC_QUESTIONS?.length || 'UNDEFINED');
console.log('  TRANSITIONS:', TRANSITIONS ? 'OK' : 'UNDEFINED');

// Tipos para o sistema schema-driven
export interface SchemaDrivenFunnelData {
  id: string;
  name: string;
  description?: string;
  theme: string;
  isPublished: boolean;
  pages: SchemaDrivenPageData[];
  config: FunnelConfig;
  version: number;
  lastModified: Date;
  createdAt: Date;
  userId?: number;
}

export interface SchemaDrivenPageData {
  id: string;
  name: string;
  title: string;
  type: 'intro' | 'question' | 'result' | 'offer' | 'thank-you' | 'custom';
  order: number;
  blocks: BlockData[];
  settings: PageSettings;
  metadata?: Record<string, any>;
}

export interface PageSettings {
  showProgress: boolean;
  progressValue: number;
  backgroundColor: string;
  textColor: string;
  maxWidth: string;
  padding?: string;
  customCSS?: string;
}

export interface FunnelConfig {
  name: string;
  description?: string;
  isPublished: boolean;
  theme: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  abTesting?: {
    enabled: boolean;
    variants: string[];
    currentVariant: string;
  };
  analytics?: {
    trackingId?: string;
    events: string[];
    conversionGoals: string[];
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };
}

export interface FunnelVersion {
  id: string;
  funnelId: string;
  version: number;
  data: SchemaDrivenFunnelData;
  createdAt: Date;
  description?: string;
  isAutoSave: boolean;
}

export interface AutoSaveState {
  isEnabled: boolean;
  interval: number; // em segundos
  lastSave: Date | null;
  pendingChanges: boolean;
  errorCount: number;
}

class SchemaDrivenFunnelService {
  private baseUrl = '/api/schema-driven';
  private localStorageKey = 'schema-driven-funnel';
  private versionStorageKey = 'schema-driven-versions';
  private autoSaveInterval: NodeJS.Timeout | null = null;
  private autoSaveState: AutoSaveState = {
    isEnabled: true,
    interval: 10, // 10 segundos
    lastSave: null,
    pendingChanges: false,
    errorCount: 0
  };

  constructor() {
    // Limpeza imediata na inicialização
    this.performEmergencyCleanup();
  }

  // Auto-save management
  enableAutoSave(interval: number = 10) {
    this.autoSaveState.isEnabled = true;
    this.autoSaveState.interval = interval;
    // Limpeza inicial ao habilitar auto-save
    this.cleanupLocalStorage();
    this.startAutoSaveInterval();
  }

  disableAutoSave() {
    this.autoSaveState.isEnabled = false;
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
      this.autoSaveInterval = null;
    }
  }

  private startAutoSaveInterval() {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
    }

    this.autoSaveInterval = setInterval(() => {
      if (this.autoSaveState.pendingChanges && this.autoSaveState.isEnabled) {
        this.performAutoSave();
      }
    }, this.autoSaveState.interval * 1000);
  }

  private async performAutoSave() {
    try {
      const localData = this.getLocalFunnel();
      if (localData) {
        await this.saveFunnel(localData, true);
        this.autoSaveState.pendingChanges = false;
        this.autoSaveState.lastSave = new Date();
        this.autoSaveState.errorCount = 0;
        console.log('🔄 Auto-save successful:', new Date().toLocaleTimeString());
      }
    } catch (error) {
      this.autoSaveState.errorCount++;
      console.error('❌ Auto-save failed:', error);
      
      // Se muitos erros, aumentar intervalo
      if (this.autoSaveState.errorCount > 3) {
        this.autoSaveState.interval = Math.min(this.autoSaveState.interval * 2, 60);
        this.startAutoSaveInterval();
      }
    }
  }

  markPendingChanges() {
    this.autoSaveState.pendingChanges = true;
  }

  getAutoSaveState(): AutoSaveState {
    return { ...this.autoSaveState };
  }

  // Local storage operations
  saveLocalFunnel(funnel: SchemaDrivenFunnelData): void {
    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify({
        ...funnel,
        lastModified: new Date().toISOString()
      }));
      this.markPendingChanges();
      // console.log('💾 Funnel saved locally');
    } catch (error) {
      console.error('❌ Failed to save funnel locally:', error);
    }
  }

  getLocalFunnel(): SchemaDrivenFunnelData | null {
    try {
      const stored = localStorage.getItem(this.localStorageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...parsed,
          lastModified: new Date(parsed.lastModified),
          createdAt: new Date(parsed.createdAt)
        };
      }
      return null;
    } catch (error) {
      console.error('❌ Failed to load funnel from local storage:', error);
      return null;
    }
  }

  clearLocalFunnel(): void {
    localStorage.removeItem(this.localStorageKey);
    this.autoSaveState.pendingChanges = false;
  }

  // Limpeza preventiva do localStorage
  private cleanupLocalStorage(): void {
    try {
      // Remover versões antigas (mais de 7 dias)
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 7);
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(this.versionStorageKey)) {
          try {
            const versions = JSON.parse(localStorage.getItem(key) || '[]');
            const recentVersions = versions.filter((v: any) => 
              new Date(v.createdAt) > cutoffDate
            ).slice(-5); // Manter apenas 5 versões recentes
            
            if (recentVersions.length === 0) {
              localStorage.removeItem(key);
            } else if (recentVersions.length !== versions.length) {
              localStorage.setItem(key, JSON.stringify(recentVersions));
            }
          } catch {
            localStorage.removeItem(key);
          }
        }
      }
    } catch (error) {
      console.warn('⚠️ Error during localStorage cleanup:', error);
    }
  }

  // Limpeza de emergência em caso de quota exceeded
  private emergencyCleanup(): void {
    try {
      console.log('🚨 Emergency cleanup initiated');
      
      // Remover todas as versões antigas
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(this.versionStorageKey)) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => {
        try {
          localStorage.removeItem(key);
        } catch {
          // Ignorar erros individuais
        }
      });
      
      console.log(`🧹 Removed ${keysToRemove.length} version history entries`);
    } catch (error) {
      console.error('❌ Emergency cleanup failed:', error);
    }
  }

  // Limpeza mais agressiva na inicialização
  private performEmergencyCleanup(): void {
    try {
      console.log('🧹 Performing initial localStorage cleanup...');
      let removed = 0;
      
      // Obter todas as chaves de uma vez para evitar problemas de índice
      const allKeys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) allKeys.push(key);
      }
      
      // Remover todas as versões antigas
      allKeys.forEach(key => {
        if (key.startsWith(this.versionStorageKey)) {
          try {
            localStorage.removeItem(key);
            removed++;
          } catch {
            // Ignorar erros
          }
        }
      });
      
      if (removed > 0) {
        console.log(`🧹 Cleared ${removed} version entries from localStorage`);
      }
    } catch (error) {
      console.error('❌ Initial cleanup failed:', error);
    }
  }

  // Version management
  saveVersion(funnel: SchemaDrivenFunnelData, description?: string, isAutoSave: boolean = false): FunnelVersion {
    const version: FunnelVersion = {
      id: `version-${Date.now()}`,
      funnelId: funnel.id,
      version: funnel.version + 1,
      data: { ...funnel, version: funnel.version + 1 },
      createdAt: new Date(),
      description: description || (isAutoSave ? 'Auto-save' : 'Manual save'),
      isAutoSave
    };

    try {
      // Limpeza proativa do localStorage antes de salvar
      this.cleanupLocalStorage();
      
      const versions = this.getVersionHistory(funnel.id);
      versions.push(version);
      
      // Manter apenas as últimas 10 versões para economizar espaço
      const limitedVersions = versions.slice(-10);
      localStorage.setItem(`${this.versionStorageKey}-${funnel.id}`, JSON.stringify(limitedVersions));
      
      // console.log(`📋 Version ${version.version} saved`);
      return version;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.warn('⚠️ LocalStorage quota exceeded, performing emergency cleanup');
        this.emergencyCleanup();
        // Tentar salvar novamente apenas a versão atual sem histórico
        try {
          localStorage.setItem(`${this.versionStorageKey}-${funnel.id}`, JSON.stringify([version]));
          console.log(`📋 Version ${version.version} saved after cleanup`);
        } catch (secondError) {
          console.error('❌ Failed to save even after cleanup:', secondError);
        }
      } else {
        console.error('❌ Failed to save version:', error);
      }
      return version;
    }
  }

  getVersionHistory(funnelId: string): FunnelVersion[] {
    try {
      const stored = localStorage.getItem(`${this.versionStorageKey}-${funnelId}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.map((v: any) => ({
          ...v,
          createdAt: new Date(v.createdAt),
          data: {
            ...v.data,
            lastModified: new Date(v.data.lastModified),
            createdAt: new Date(v.data.createdAt)
          }
        }));
      }
      return [];
    } catch (error) {
      console.error('❌ Failed to load version history:', error);
      return [];
    }
  }

  restoreVersion(funnelId: string, versionId: string): SchemaDrivenFunnelData | null {
    const versions = this.getVersionHistory(funnelId);
    const version = versions.find(v => v.id === versionId);
    
    if (version) {
      this.saveLocalFunnel(version.data);
      console.log(`🔄 Restored to version ${version.version}`);
      return version.data;
    }
    
    return null;
  }

  // Backend operations
  async saveFunnel(funnel: SchemaDrivenFunnelData, isAutoSave: boolean = false): Promise<SchemaDrivenFunnelData> {
    try {
      // Tentar salvar no backend primeiro
      const response = await fetch(`${this.baseUrl}/funnels/${funnel.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...funnel,
          lastModified: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      const savedFunnel = {
        ...result.data,
        lastModified: new Date(result.data.lastModified),
        createdAt: new Date(result.data.createdAt)
      };

      // Salvar versão se sucesso no backend
      if (!isAutoSave) {
        this.saveVersion(savedFunnel, 'Manual save from backend');
      }

      // Atualizar localStorage com dados do backend
      this.saveLocalFunnel(savedFunnel);
      
      console.log('☁️ Funnel saved to backend successfully');
      return savedFunnel;

    } catch (error) {
      console.warn('⚠️ Backend unavailable, saving locally only:', error);
      
      // Fallback para localStorage
      const updatedFunnel = {
        ...funnel,
        lastModified: new Date(),
        version: funnel.version + (isAutoSave ? 0 : 1)
      };
      
      this.saveLocalFunnel(updatedFunnel);
      
      if (!isAutoSave) {
        this.saveVersion(updatedFunnel, 'Manual save (offline)');
      }
      
      return updatedFunnel;
    }
  }

  async loadFunnel(funnelId: string): Promise<SchemaDrivenFunnelData | null> {
    // Validar funnelId para evitar requisições inválidas
    if (!funnelId || typeof funnelId !== 'string' || funnelId === '[object Object]') {
      console.error('❌ Invalid funnelId provided to loadFunnel:', funnelId);
      return null;
    }

    try {
      // Tentar carregar do backend primeiro
      const response = await fetch(`${this.baseUrl}/funnels/${funnelId}`);
      
      if (response.ok) {
        const result = await response.json();
        const funnel = {
          ...result.data,
          lastModified: new Date(result.data.lastModified),
          createdAt: new Date(result.data.createdAt)
        };
        
        // Atualizar localStorage com dados mais recentes
        try {
          this.saveLocalFunnel(funnel);
        } catch (saveError) {
          console.warn('⚠️ Failed to save to localStorage, continuing without cache:', saveError);
        }
        console.log('☁️ Funnel loaded from backend');
        return funnel;
      }
    } catch (error) {
      console.warn('⚠️ Backend unavailable, trying local storage:', error);
    }

    // Fallback para localStorage
    const localFunnel = this.getLocalFunnel();
    if (localFunnel && localFunnel.id === funnelId) {
      console.log('💾 Funnel loaded from local storage');
      return localFunnel;
    }

    return null;
  }

  async createFunnel(data: Omit<SchemaDrivenFunnelData, 'id' | 'version' | 'lastModified' | 'createdAt'>): Promise<SchemaDrivenFunnelData> {
    const { generateUUID } = await import('../utils/idGenerator');
    const now = new Date();
    const funnel: SchemaDrivenFunnelData = {
      ...data,
      id: generateUUID(),
      version: 1,
      lastModified: now,
      createdAt: now
    };

    try {
      // Tentar criar no backend
      const response = await fetch(`${this.baseUrl}/funnels`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(funnel),
      });

      if (response.ok) {
        const result = await response.json();
        const createdFunnel = {
          ...result.data,
          lastModified: new Date(result.data.lastModified),
          createdAt: new Date(result.data.createdAt)
        };
        
        this.saveLocalFunnel(createdFunnel);
        this.saveVersion(createdFunnel, 'Initial creation');
        console.log('☁️ Funnel created in backend');
        return createdFunnel;
      }
    } catch (error) {
      console.warn('⚠️ Backend unavailable, creating locally:', error);
    }

    // Fallback para criação local
    this.saveLocalFunnel(funnel);
    this.saveVersion(funnel, 'Initial creation (offline)');
    console.log('💾 Funnel created locally');
    return funnel;
  }

  async syncWithBackend(): Promise<{ success: boolean; message: string }> {
    try {
      const localFunnel = this.getLocalFunnel();
      if (!localFunnel) {
        return { success: false, message: 'No local funnel to sync' };
      }

      const savedFunnel = await this.saveFunnel(localFunnel);
      return { 
        success: true, 
        message: `Synced successfully. Backend version: ${savedFunnel.version}` 
      };
    } catch (error) {
      return { 
        success: false, 
        message: `Sync failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }
  }

  // Utility methods
  createDefaultFunnel(): SchemaDrivenFunnelData {
    const now = new Date();
    
    return {
      id: generateTimestampId('funnel'),
      name: 'Quiz CaktoQuiz - Descubra Seu Estilo',
      description: 'Funil completo para descoberta do estilo pessoal - 21 etapas modulares',
      theme: 'caktoquiz',
      isPublished: false,
      pages: this.createModularPages(),
      config: {
        name: 'Quiz CaktoQuiz - Descubra Seu Estilo',
        description: 'Funil completo para descoberta do estilo pessoal - 21 etapas modulares',
        isPublished: false,
        theme: 'caktoquiz',
        primaryColor: '#B89B7A',
        secondaryColor: '#432818',
        fontFamily: 'Inter, sans-serif',
        analytics: {
          trackingId: 'FB_PIXEL_ID',
          events: ['page_view', 'quiz_start', 'quiz_complete', 'conversion'],
          conversionGoals: ['quiz_completion', 'purchase']
        },
        seo: {
          title: 'Descubra Seu Estilo Pessoal - Quiz CaktoQuiz',
          description: 'Descubra seu estilo pessoal em poucos minutos com nosso quiz especializado.',
          keywords: ['estilo pessoal', 'moda', 'quiz', 'consultoria']
        }
      },
      version: 1,
      lastModified: now,
      createdAt: now
    };
  }

  /**
   * Cria todas as 21 páginas usando APENAS componentes inline modulares ES7+
   * Arquitetura 100% modular com componentes independentes e responsivos
   * FIXED: Steps 20 & 21 now correctly map to production pages
   */
  private createModularPages(): SchemaDrivenPageData[] {
    console.log('🏗️ [ES7+] Iniciando criação das 21 etapas modulares...');
    console.log('🔍 DEBUG: REAL_QUIZ_QUESTIONS length:', REAL_QUIZ_QUESTIONS?.length);
    console.log('🔍 DEBUG: STRATEGIC_QUESTIONS length:', STRATEGIC_QUESTIONS?.length);
    
    const pages: SchemaDrivenPageData[] = [];

    // ==========================================
    // ETAPA 1: INTRODUÇÃO (COLETA DO NOME) - ROTA: /quiz
    // ==========================================
    pages.push({
      id: 'etapa-1-intro',
      name: 'Introdução (/quiz)',
      title: 'Etapa 1: Introdução - Coleta do Nome',
      type: 'intro',
      order: 1,
      blocks: [
        {
          id: 'intro-header',
          type: 'quiz-intro-header',
          properties: {
            logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
            logoAlt: 'Logo Gisele Galvão',
            logoWidth: 96,
            logoHeight: 96,
            progressValue: 0,
            progressMax: 100,
            showBackButton: false
          }
        },
        {
          id: 'intro-decorative-spacer',
          type: 'spacer',
          properties: {
            height: 4,
            backgroundColor: '#B89B7A',
            marginTop: 0,
            marginBottom: 24
          }
        },
        {
          id: 'intro-main-heading',
          type: 'text-inline',
          properties: {
            content: '<span style="color: #B89B7A; font-weight: 700;">Chega</span> de um guarda-roupa lotado e da sensação de que nada combina com você.',
            fontSize: 'text-3xl',
            fontWeight: 'font-bold',
            textAlign: 'text-center',
            color: '#432818',
            marginBottom: 24
          }
        },
        {
          id: 'intro-hero-image',
          type: 'image-display-inline',
          properties: {
            src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.webp',
            alt: 'Transforme seu guarda-roupa',
            width: 600,
            height: 400,
            className: 'object-cover w-full h-auto rounded-lg mx-auto'
          }
        },
        {
          id: 'intro-subtitle',
          type: 'text-inline',
          properties: {
            content: 'Em poucos minutos, descubra seu Estilo Predominante — e aprenda a montar looks que realmente refletem sua essência, com praticidade e confiança.',
            fontSize: 'text-lg',
            textAlign: 'text-center',
            color: '#432818',
            marginTop: 16,
            marginBottom: 32
          }
        },
        {
          id: 'intro-name-input',
          type: 'form-input',
          properties: {
            label: 'NOME',
            placeholder: 'Digite seu nome aqui...',
            required: true,
            inputType: 'text',
            helperText: '',
            name: 'userName'
          }
        },
        {
          id: 'intro-cta-button',
          type: 'button-inline',
          properties: {
            text: 'Quero Descobrir meu Estilo Agora!',
            variant: 'primary',
            size: 'large',
            fullWidth: true,
            backgroundColor: '#B89B7A',
            textColor: '#ffffff',
            requiresValidInput: true
          }
        }
      ],
      settings: {
        showProgress: false,
        progressValue: 0,
        backgroundColor: '#ffffff',
        textColor: '#432818',
        maxWidth: 'max-w-4xl',
        padding: 'p-6'
      }
    });

    // ==========================================
    // ETAPAS 2-11: QUESTÕES PRINCIPAIS (10 QUESTÕES)
    // Componentes: quiz-intro-header + heading-inline + text-inline + options-grid + button-inline
    // ==========================================
    REAL_QUIZ_QUESTIONS.forEach((questionData, index) => {
      console.log(`🎯 [ES7+] Criando questão ${index + 1}:`, questionData.question);
      const currentProgress = 5 + (index + 1) * 5; // 5%, 10%, 15%... até 55%
      
      pages.push({
        id: `etapa-${index + 2}-questao-${index + 1}`,
        name: `Questão ${index + 1}`,
        title: `Etapa ${index + 2}: ${questionData.question}`,
        type: 'question',
        order: index + 2,
        blocks: [
          // 1. Cabeçalho modular com logo e progresso
          {
            id: `question-${index + 1}-header`,
            type: 'quiz-intro-header',
            properties: {
              logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
              logoAlt: 'Logo Gisele Galvão',
              logoWidth: 96,
              logoHeight: 96,
              progressValue: currentProgress,
              progressMax: 100,
              showBackButton: true
            }
          },
          // 2. Título da questão (componente inline)
          {
            id: `question-${index + 1}-title`,
            type: 'heading-inline',
            properties: {
              content: questionData.question,
              level: 'h2',
              fontSize: 'text-2xl',
              fontWeight: 'font-bold',
              textAlign: 'text-center',
              color: '#432818',
              marginBottom: 8
            }
          },
          // 3. Indicador de progresso textual (componente inline)
          {
            id: `question-${index + 1}-progress-label`,
            type: 'text-inline',
            properties: {
              content: `Questão ${index + 1} de 10`,
              fontSize: 'text-sm',
              textAlign: 'text-center',
              color: '#6B7280',
              marginBottom: 24
            }
          },
          // 4. Grid de opções responsivo (máx 3 colunas)
          {
            id: `question-${index + 1}-options`,
            type: 'options-grid',
            properties: {
              options: questionData.options.map(opt => ({
                id: opt.id,
                text: opt.text,
                value: opt.value || opt.id,
                imageUrl: (opt as any).imageUrl || undefined,
                category: (opt as any).category || opt.value || opt.id
              })),
              columns: '3',
              showImages: true,
              imageSize: 'large',
              multipleSelection: questionData.multipleSelection || false,
              maxSelections: questionData.maxSelections || 1,
              minSelections: 1,
              validationMessage: `Selecione ${questionData.maxSelections || 1} opç${(questionData.maxSelections || 1) > 1 ? 'ões' : 'ão'}`,
              gridGap: 16
            }
          },
          // 5. Espaçador
          {
            id: `question-${index + 1}-spacer`,
            type: 'spacer',
            properties: {
              height: 24,
              backgroundColor: 'transparent'
            }
          },
          // 6. Botão continuar modular (componente inline)
          {
            id: `question-${index + 1}-continue`,
            type: 'button-inline',
            properties: {
              text: 'Continuar',
              variant: 'primary',
              size: 'large',
              fullWidth: true,
              backgroundColor: '#B89B7A',
              textColor: '#ffffff',
              disabled: true,
              requiresValidSelection: true
            }
          }
        ],
        settings: {
          showProgress: true,
          progressValue: currentProgress,
          backgroundColor: '#ffffff',
          textColor: '#432818',
          maxWidth: 'max-w-4xl',
          padding: 'p-6'
        }
      });
    });

    // ==========================================
    // ETAPA 12: TRANSIÇÃO PRINCIPAL
    // Componentes: quiz-intro-header + heading-inline + text-inline + progress-inline + button-inline
    // ==========================================
    pages.push({
      id: 'etapa-12-transicao-principal',
      name: 'Transição Principal',
      title: 'Etapa 12: Transição - Agora vamos conhecer você melhor',
      type: 'custom',
      order: 12,
      blocks: [
        // 1. Cabeçalho modular com logo e progresso
        {
          id: 'transition-main-header',
          type: 'quiz-intro-header',
          properties: {
            logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
            logoAlt: 'Logo Gisele Galvão',
            logoWidth: 96,
            logoHeight: 96,
            progressValue: 60,
            progressMax: 100,
            showBackButton: true
          }
        },
        // 2. Título da transição (componente inline)
        {
          id: 'transition-main-title',
          type: 'heading-inline',
          properties: {
            content: 'Agora vamos conhecer você melhor',
            level: 'h2',
            fontSize: 'text-2xl',
            fontWeight: 'font-bold',
            textAlign: 'text-center',
            color: '#432818',
            marginBottom: 16
          }
        },
        // 3. Texto motivacional (componente inline)
        {
          id: 'transition-motivation',
          type: 'text-inline',
          properties: {
            content: 'Suas escolhas até agora já revelam muito sobre seu estilo. Agora vamos aprofundar para criar um perfil ainda mais preciso.',
            fontSize: 'text-lg',
            textAlign: 'text-center',
            color: '#6B7280',
            marginBottom: 32
          }
        },
        // 4. Barra de progresso visual (componente inline)
        {
          id: 'transition-progress-bar',
          type: 'progress-inline',
          properties: {
            progressValue: 60,
            progressMax: 100,
            showPercentage: true,
            color: '#B89B7A',
            backgroundColor: '#F5F5F5',
            height: 8,
            marginBottom: 32
          }
        },
        // 5. Botão continuar (componente inline)
        {
          id: 'transition-continue',
          type: 'button-inline',
          properties: {
            text: 'Continuar Análise',
            variant: 'primary',
            size: 'large',
            fullWidth: true,
            backgroundColor: '#B89B7A',
            textColor: '#ffffff'
          }
        }
      ],
      settings: {
        showProgress: true,
        progressValue: 60,
        backgroundColor: '#ffffff',
        textColor: '#432818',
        maxWidth: 'max-w-4xl',
        padding: 'p-6'
      }
    });

    // ==========================================
    // ETAPAS 13-18: QUESTÕES ESTRATÉGICAS (6 QUESTÕES)
    // Componentes: quiz-intro-header + heading-inline + text-inline + options-grid + button-inline
    // ==========================================
    STRATEGIC_QUESTIONS.forEach((questionData, index) => {
      console.log(`🎯 [ES7+] Criando questão estratégica ${index + 1}:`, questionData.question);
      const currentProgress = 65 + (index * 5); // 65%, 70%, 75%... até 90%
      
      pages.push({
        id: `etapa-${index + 13}-estrategica-${index + 1}`,
        name: `Questão Estratégica ${index + 1}`,
        title: `Etapa ${index + 13}: ${questionData.question}`,
        type: 'question',
        order: index + 13,
        blocks: [
          // 1. Cabeçalho modular com logo e progresso
          {
            id: `strategic-${index + 1}-header`,
            type: 'quiz-intro-header',
            properties: {
              logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
              logoAlt: 'Logo Gisele Galvão',
              logoWidth: 96,
              logoHeight: 96,
              progressValue: currentProgress,
              progressMax: 100,
              showBackButton: true
            }
          },
          // 2. Título da questão estratégica (componente inline)
          {
            id: `strategic-${index + 1}-title`,
            type: 'heading-inline',
            properties: {
              content: questionData.question,
              level: 'h2',
              fontSize: 'text-2xl',
              fontWeight: 'font-bold',
              textAlign: 'text-center',
              color: '#432818',
              marginBottom: 8
            }
          },
          // 3. Indicador de progresso (componente inline)
          {
            id: `strategic-${index + 1}-progress-label`,
            type: 'text-inline',
            properties: {
              content: `Questão estratégica ${index + 1} de 6`,
              fontSize: 'text-sm',
              textAlign: 'text-center',
              color: '#6B7280',
              marginBottom: 24
            }
          },
          // 4. Imagem estratégica (quando aplicável)
          {
            id: `strategic-${index + 1}-image`,
            type: 'image-display-inline',
            properties: {
              src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.webp',
              alt: 'Questão estratégica',
              width: 400,
              height: 250,
              className: 'object-cover w-full h-auto rounded-lg mx-auto mb-6'
            }
          },
          // 5. Grid de opções (estilo simplificado)
          {
            id: `strategic-${index + 1}-options`,
            type: 'options-grid',
            properties: {
              options: questionData.options.map(opt => ({
                id: opt.id,
                text: opt.text,
                value: opt.value || opt.id,
                category: (opt as any).category || opt.value || opt.id
              })),
              columns: '2',
              showImages: false,
              multipleSelection: false,
              maxSelections: 1,
              minSelections: 1,
              validationMessage: 'Selecione uma opção',
              gridGap: 12
            }
          },
          // 6. Espaçador
          {
            id: `strategic-${index + 1}-spacer`,
            type: 'spacer',
            properties: {
              height: 24,
              backgroundColor: 'transparent'
            }
          },
          // 7. Botão continuar (componente inline)
          {
            id: `strategic-${index + 1}-continue`,
            type: 'button-inline',
            properties: {
              text: 'Continuar',
              variant: 'primary',
              size: 'large',
              fullWidth: true,
              backgroundColor: '#B89B7A',
              textColor: '#ffffff',
              disabled: true,
              requiresValidSelection: true
            }
          }
        ],
        settings: {
          showProgress: true,
          progressValue: currentProgress,
          backgroundColor: '#ffffff',
          textColor: '#432818',
          maxWidth: 'max-w-4xl',
          padding: 'p-6'
        }
      });
    });

    // ==========================================
    // ETAPA 19: TRANSIÇÃO FINAL 
    // Componentes: quiz-intro-header + heading-inline + progress-inline + text-inline + loading-animation + button-inline
    // ==========================================
    // ==========================================
    // ETAPA 19: TRANSIÇÃO FINAL 
    // Componentes: quiz-intro-header + heading-inline + progress-inline + text-inline + loading-animation + button-inline
    // ==========================================
    pages.push({
      id: 'etapa-19-transicao-final',
      name: 'Transição Final',
      title: 'Etapa 19: Preparando seu resultado personalizado',
      type: 'custom',
      order: 19,
      blocks: [
        // 1. Cabeçalho com progresso completo
        {
          id: 'final-transition-header',
          type: 'quiz-intro-header',
          properties: {
            logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
            logoAlt: 'Logo Gisele Galvão',
            logoWidth: 96,
            logoHeight: 96,
            progressValue: 95,
            progressMax: 100,
            showBackButton: false
          }
        },
        // 2. Título da transição final
        {
          id: 'final-transition-title',
          type: 'heading-inline',
          properties: {
            content: 'Analisando suas respostas...',
            level: 'h2',
            fontSize: 'text-2xl',
            fontWeight: 'font-bold',
            textAlign: 'text-center',
            color: '#432818',
            marginBottom: 16
          }
        },
        // 3. Barra de carregamento animada
        {
          id: 'final-transition-progress',
          type: 'progress-inline',
          properties: {
            progressValue: 95,
            progressMax: 100,
            showPercentage: true,
            animated: true,
            color: '#B89B7A',
            backgroundColor: '#F5F5F5',
            height: 12,
            marginBottom: 24
          }
        },
        // 4. Texto de aguardo
        {
          id: 'final-transition-message',
          type: 'text-inline',
          properties: {
            content: 'Estamos criando seu perfil personalizado baseado nas suas 18 respostas...',
            fontSize: 'text-lg',
            textAlign: 'text-center',
            color: '#6B7280',
            marginBottom: 32
          }
        },
        // 5. Loading animation placeholder
        {
          id: 'final-transition-loading',
          type: 'loading-animation',
          properties: {
            type: 'spinner',
            size: 'large',
            color: '#B89B7A',
            duration: 3000
          }
        },
        // 6. Botão que aparece após 3 segundos
        {
          id: 'final-transition-reveal',
          type: 'button-inline',
          properties: {
            text: 'Ver Meu Resultado Personalizado',
            variant: 'primary',
            size: 'large',
            fullWidth: true,
            backgroundColor: '#B89B7A',
            textColor: '#ffffff',
            delayShow: 3000 // Aparece após 3 segundos
          }
        }
      ],
      settings: {
        showProgress: true,
        progressValue: 95,
        backgroundColor: '#ffffff',
        textColor: '#432818',
        maxWidth: 'max-w-4xl',
        padding: 'p-6'
      }
    });

    // ==========================================
    // ETAPA 20: RESULTADO PERSONALIZADO - MAPS TO /resultado (ResultPage.tsx)
    // BASEADA NOS COMPONENTES REAIS DA RESULTPAGE
    // ==========================================
    console.log('🎯 [FIXED] Creating Step 20: Result Page → /resultado (ResultPage.tsx)');
    pages.push({
      id: 'etapa-20-resultado',
      name: 'Resultado (/resultado)',
      title: 'Etapa 20: Resultado Personalizado - ResultPage.tsx',
      type: 'result',
      order: 20,
      blocks: [
        // 1. Header do resultado (Header component)
        {
          id: 'result-header',
          type: 'result-header',
          properties: {
            logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
            showProgress: false,
            progressValue: 100
          }
        },
        // 2. Título principal de congratulações
        {
          id: 'result-congratulations-title',
          type: 'heading-inline',
          properties: {
            content: 'Parabéns! Seu estilo predominante foi identificado.',
            level: 'h1',
            textAlign: 'text-center',
            color: '#432818',
            marginBottom: 32
          }
        },
        // 3. Card de estilo com progresso (styleConfig based)
        {
          id: 'result-style-card',
          type: 'style-result-card',
          properties: {
            category: 'Natural',
            percentage: 85,
            showSecondaryStyles: true,
            secondaryStyles: [
              { name: 'Clássico', percentage: 15 },
              { name: 'Contemporâneo', percentage: 10 },
              { name: 'Elegante', percentage: 8 }
            ]
          }
        },
        // 4. Seção de motivação (MotivationSection)
        {
          id: 'result-motivation-section',
          type: 'motivation-section',
          properties: {
            title: 'Transforme sua imagem e autoestima',
            content: 'Descubra como se vestir com confiança e destacar sua personalidade única.',
            showAnimation: true
          }
        },
        // 5. Seção de estilos secundários (SecondaryStylesSection)
        {
          id: 'result-secondary-styles-section',
          type: 'secondary-styles-section',
          properties: {
            secondaryStyles: [
              { name: 'Clássico', percentage: 15 },
              { name: 'Contemporâneo', percentage: 10 },
              { name: 'Elegante', percentage: 8 }
            ]
          }
        },
        // 6. Depoimentos (Testimonials)
        {
          id: 'result-testimonials',
          type: 'testimonials',
          properties: {
            testimonials: [
              {
                name: 'Ana Silva',
                text: 'Transformei completamente meu guarda-roupa! Agora me sinto muito mais confiante.',
                rating: 5,
                image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744916217/Mockups_p%C3%A1gina_de_venda_Guia_de_Estilo_1_vostj4.webp'
              },
              {
                name: 'Maria Costa',
                text: 'O guia é incrível! Aprendi a combinar peças que já tinha em casa.',
                rating: 5,
                image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744916217/Mockups_p%C3%A1gina_de_venda_Guia_de_Estilo_1_vostj4.webp'
              }
            ]
          }
        },
        // 7. Seção de mentor (MentorSection)
        {
          id: 'result-mentor-section',
          type: 'mentor-section',
          properties: {
            mentorName: 'Gisele Galvão',
            mentorImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.webp',
            credentials: 'Consultora de Estilo e Imagem',
            description: 'Especialista em transformação pessoal através do estilo.'
          }
        },
        // 8. Seção de transformação (BeforeAfterTransformation)
        {
          id: 'result-transformation-section',
          type: 'before-after-transformation',
          properties: {
            title: 'Veja algumas transformações incríveis:',
            transformations: [
              {
                beforeImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746334756/ChatGPT_Image_4_de_mai._de_2025_01_42_42_jlugsc.webp',
                afterImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746334754/ChatGPT_Image_4_de_mai._de_2025_00_30_44_naqom0.webp',
                description: 'Transformação completa de visual'
              }
            ]
          }
        },
        // 9. Seção de garantia (GuaranteeSection)
        {
          id: 'result-guarantee-section',
          type: 'guarantee-section',
          properties: {
            guaranteeText: 'Garantia de 7 dias ou seu dinheiro de volta',
            guaranteeImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp'
          }
        },
        // 10. Seção de bônus (BonusSection)
        {
          id: 'result-bonus-section',
          type: 'bonus-section',
          properties: {
            bonuses: [
              {
                title: 'Bônus 1: Guia de Peças-Chave',
                description: 'Descubra as peças essenciais para o seu estilo',
                image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp'
              },
              {
                title: 'Bônus 2: Visagismo Personalizado',
                description: 'Aprenda a harmonizar seu visual com seu rosto',
                image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp'
              }
            ]
          }
        },
        // 11. CTA principal com compra segura
        {
          id: 'result-main-cta',
          type: 'secure-purchase-cta',
          properties: {
            text: 'QUERO MEU GUIA COMPLETO AGORA!',
            price: 'R$ 97,00',
            originalPrice: 'R$ 197,00',
            discount: '50% OFF',
            securityText: 'Compra 100% segura'
          }
        }
      ],
      settings: {
        showProgress: false,
        backgroundColor: '#fffaf7',
        textColor: '#432818',
        maxWidth: 'max-w-4xl',
        padding: 'p-6',
        usePageConfig: true,
        pageConfigId: 'result-page'
      }
    });

    // ==========================================
    // ETAPA 21: OFERTA COMERCIAL - MAPS TO /quiz-descubra-seu-estilo (QuizOfferPage.tsx)
    // CONFIGURAÇÃO COMPLETA COM COMPONENTES REAIS DA PÁGINA DE OFERTA
    // ==========================================
    console.log('🎯 [FIXED] Creating Step 21: Offer Page → /quiz-descubra-seu-estilo (QuizOfferPage.tsx)');
    pages.push({
      id: 'etapa-21-oferta',
      name: 'Oferta (/quiz-descubra-seu-estilo)',
      title: 'Etapa 21: Oferta Comercial - QuizOfferPage.tsx',
      type: 'offer',
      order: 21,
      blocks: [
        // 1. Header com logo (como em QuizOfferPage.tsx)
        {
          id: 'offer-header-logo',
          type: 'image-display-inline',
          properties: {
            src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
            alt: 'Logo Gisele Galvão',
            width: 180,
            height: 80,
            className: 'h-auto object-contain mx-auto'
          }
        },
        // 2. Badge de credibilidade
        {
          id: 'offer-credibility-badge',
          type: 'badge-inline',
          properties: {
            icon: 'Award',
            text: 'Consultora Especialista em Estilo',
            backgroundColor: '#10b981',
            textColor: '#ffffff',
            borderColor: '#10b981'
          }
        },
        // 3. Título principal da oferta
        {
          id: 'offer-main-title',
          type: 'text-inline',
          properties: {
            content: '<span style="color: #B89B7A; font-weight: 700;">Transforme</span> Seu Guarda-Roupa e Sua Confiança',
            fontSize: 'text-3xl',
            fontWeight: 'font-bold',
            textAlign: 'text-center',
            color: '#432818',
            marginBottom: 16
          }
        },
        // 4. Subtítulo de urgência
        {
          id: 'offer-urgency-subtitle',
          type: 'text-inline',
          properties: {
            content: 'Oferta exclusiva para quem completou o quiz - válida apenas hoje!',
            fontSize: 'text-lg',
            textAlign: 'text-center',
            color: '#B89B7A',
            marginBottom: 32
          }
        },
        // 5. Countdown timer (como em QuizOfferPage.tsx)
        {
          id: 'offer-countdown-timer',
          type: 'countdown-timer-inline',
          properties: {
            title: 'Oferta expira em:',
            minutes: 15,
            backgroundColor: '#fee2e2',
            textColor: '#dc2626',
            borderColor: '#fca5a5'
          }
        },
        // 6. Destaque de preço principal
        {
          id: 'offer-price-main',
          type: 'price-highlight-inline',
          properties: {
            originalPrice: 'R$ 197,00',
            currentPrice: 'R$ 97,00',
            discount: '50% OFF',
            urgencyText: 'Apenas hoje!',
            installments: '12x R$ 9,70',
            backgroundColor: '#f8fafc',
            borderColor: '#B89B7A'
          }
        },
        // 7. Benefícios em grid
        {
          id: 'offer-benefits-grid',
          type: 'benefits-grid-inline',
          properties: {
            title: 'O que você vai receber:',
            benefits: [
              '✓ Guia personalizado baseado no seu perfil',
              '✓ 50+ looks para o seu estilo',
              '✓ Dicas de combinações práticas',
              '✓ Acesso vitalício ao conteúdo',
              '✓ Suporte por WhatsApp',
              '✓ Garantia de 7 dias'
            ],
            columns: 2,
            backgroundColor: '#ffffff',
            borderColor: '#e5e7eb'
          }
        },
        // 8. CTA principal
        {
          id: 'offer-main-cta',
          type: 'button-inline',
          properties: {
            text: 'QUERO TRANSFORMAR MEU ESTILO AGORA!',
            variant: 'primary',
            size: 'large',
            fullWidth: true,
            backgroundColor: '#B89B7A',
            textColor: '#ffffff',
            marginTop: 32,
            marginBottom: 16,
            onClick: 'handleCtaClick'
          }
        },
        // 9. Garantia e segurança
        {
          id: 'offer-guarantee-security',
          type: 'text-inline',
          properties: {
            content: '🔒 Compra 100% segura • Garantia de 7 dias • Suporte 24/7',
            fontSize: 'text-sm',
            textAlign: 'text-center',
            color: '#666666',
            marginTop: 16,
            marginBottom: 32
          }
        },
        // 10. Depoimentos (como em QuizOfferPage.tsx)
        {
          id: 'offer-testimonials',
          type: 'testimonials-inline',
          properties: {
            title: 'O que dizem nossas clientes:',
            testimonials: [
              {
                name: 'Maria Silva',
                text: 'Transformei completamente meu guarda-roupa! Agora me sinto muito mais confiante.',
                rating: 5
              },
              {
                name: 'Ana Costa',
                text: 'O guia é incrível! Aprendi a combinar peças que já tinha em casa.',
                rating: 5
              }
            ],
            backgroundColor: '#f8fafc'
          }
        },
        // 11. FAQ seção
        {
          id: 'offer-faq',
          type: 'faq-inline',
          properties: {
            title: 'Perguntas Frequentes:',
            faqs: [
              {
                question: 'Como funciona o guia personalizado?',
                answer: 'Baseado no seu resultado do quiz, criamos um guia específico para seu perfil de estilo.'
              },
              {
                question: 'Posso pagar parcelado?',
                answer: 'Sim! Você pode parcelar em até 12x no cartão de crédito.'
              },
              {
                question: 'Há garantia?',
                answer: 'Sim! Oferecemos garantia de 7 dias. Se não gostar, devolvemos 100% do valor.'
              }
            ]
          }
        },
        // 12. CTA final de fechamento
        {
          id: 'offer-final-cta',
          type: 'button-inline',
          properties: {
            text: 'GARANTIR MINHA TRANSFORMAÇÃO AGORA!',
            variant: 'primary',
            size: 'large',
            fullWidth: true,
            backgroundColor: '#B89B7A',
            textColor: '#ffffff',
            marginTop: 40,
            onClick: 'handleCtaClick'
          }
        }
      ],
      settings: {
        showProgress: false,
        backgroundColor: '#ffffff',
        textColor: '#432818',
        maxWidth: 'max-w-6xl',
        padding: 'p-6',
        usePageConfig: true,
        pageConfigId: 'quiz-offer-page'
      }
    });

    console.log(`✅ [ES7+] Criadas ${pages.length} etapas modulares (1-21)`);
    return pages;
  }

  /**
   * Método legado mantido para compatibilidade
   * Usa a mesma lógica modular do createModularPages()
   */
  createLegacyDefaultFunnel(): SchemaDrivenFunnelData {
    console.log('🔄 Creating legacy funnel using modular architecture...');
    return this.createDefaultFunnel();
  }

  // Cleanup
  destroy() {
    this.disableAutoSave();
  }
}

export const schemaDrivenFunnelService = new SchemaDrivenFunnelService();
