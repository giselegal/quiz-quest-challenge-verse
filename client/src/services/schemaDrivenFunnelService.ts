import type { BlockData } from '@/components/editor/blocks';
import { REAL_QUIZ_QUESTIONS, STRATEGIC_QUESTIONS, TRANSITIONS } from '@/components/visual-editor/realQuizData';

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

  // Auto-save management
  enableAutoSave(interval: number = 10) {
    this.autoSaveState.isEnabled = true;
    this.autoSaveState.interval = interval;
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
      console.log('💾 Funnel saved locally');
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
      const versions = this.getVersionHistory(funnel.id);
      versions.push(version);
      
      // Manter apenas as últimas 50 versões
      const limitedVersions = versions.slice(-50);
      localStorage.setItem(`${this.versionStorageKey}-${funnel.id}`, JSON.stringify(limitedVersions));
      
      console.log(`📋 Version ${version.version} saved`);
      return version;
    } catch (error) {
      console.error('❌ Failed to save version:', error);
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
        this.saveLocalFunnel(funnel);
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
    const now = new Date();
    const funnel: SchemaDrivenFunnelData = {
      ...data,
      id: `funnel-${Date.now()}`,
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
      id: `funnel-${Date.now()}`,
      name: 'Quiz CaktoQuiz - Descubra Seu Estilo',
      description: 'Funil completo para descoberta do estilo pessoal - 21 etapas',
      theme: 'caktoquiz',
      isPublished: false,
      pages: [
        // ETAPA 1: Introdução com coleta de nome
        {
          id: 'etapa-1-intro',
          name: 'Introdução',
          title: 'Etapa 1: Introdução (Coleta do Nome)',
          type: 'intro',
          order: 1,
          blocks: [
            {
              id: 'quiz-intro-header',
              type: 'HeaderBlock',
              properties: {
                title: '<span style="color: #B89B7A">Chega</span> de um guarda-roupa lotado e da sensação de que nada combina com você.',
                subtitle: 'Em poucos minutos, descubra seu Estilo Predominante — e aprenda a montar looks que realmente refletem sua essência, com praticidade e confiança.',
                alignment: 'center',
                titleSize: 'large'
              }
            },
            {
              id: 'quiz-intro-logo',
              type: 'ImageBlock',
              properties: {
                src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
                alt: 'Logo Gisele Galvão',
                width: '200px',
                alignment: 'center'
              }
            },
            {
              id: 'quiz-intro-image',
              type: 'ImageBlock',
              properties: {
                src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.webp',
                alt: 'Descubra seu estilo predominante e transforme seu guarda-roupa',
                width: '100%',
                alignment: 'center'
              }
            },
            {
              id: 'quiz-intro-input',
              type: 'TextBlock',
              properties: {
                content: 'Digite seu nome para começar:',
                alignment: 'center',
                fontSize: 'large'
              }
            },
            {
              id: 'quiz-intro-button',
              type: 'ButtonBlock',
              properties: {
                text: 'Quero Descobrir meu Estilo Agora!',
                size: 'lg',
                fullWidth: true,
                style: 'primary'
              }
            }
          ],
          settings: {
            showProgress: false,
            progressValue: 0,
            backgroundColor: '#ffffff',
            textColor: '#432818',
            maxWidth: 'max-w-4xl'
          }
        },

        // ETAPAS 2-11: 10 questões principais com dados reais
        ...REAL_QUIZ_QUESTIONS.map((questionData, i) => ({
          id: `etapa-${i + 2}-questao-${i + 1}`,
          name: `Questão ${i + 1}`,
          title: `Etapa ${i + 2}: ${questionData.question}`,
          type: 'question' as const,
          order: i + 2,
          blocks: [
            {
              id: `progress-q${i + 1}`,
              type: 'ProgressBlock',
              properties: {
                value: 5 + (i + 1) * 5,
                label: `Questão ${i + 1} de 10`,
                showPercentage: true
              }
            },
            {
              id: `question-${i + 1}`,
              type: 'QuestionBlock',
              properties: {
                question: questionData.question,
                options: questionData.options.map(opt => ({
                  id: opt.id,
                  text: opt.text,
                  value: opt.value,
                  imageUrl: (opt as any).imageUrl || undefined
                })),
                required: true,
                multipleSelection: questionData.multipleSelection || false,
                maxSelections: questionData.maxSelections || 1
              }
            }
          ],
          settings: {
            showProgress: true,
            progressValue: 5 + (i + 1) * 5,
            backgroundColor: '#ffffff',
            textColor: '#432818',
            maxWidth: 'max-w-4xl'
          }
        })),

        // ETAPA 12: Transição principal
        {
          id: 'etapa-12-transicao-1',
          name: 'Transição Principal',
          title: 'Etapa 12: Transição - Agora vamos conhecer você melhor',
          type: 'custom',
          order: 12,
          blocks: [
            {
              id: 'main-transition-header',
              type: 'HeaderBlock',
              properties: {
                title: TRANSITIONS.mainTransition.title,
                subtitle: TRANSITIONS.mainTransition.message,
                alignment: 'center',
                titleSize: 'large'
              }
            },
            {
              id: 'main-transition-description',
              type: 'TextBlock',
              properties: {
                content: TRANSITIONS.mainTransition.submessage,
                fontSize: 'medium',
                alignment: 'center'
              }
            }
          ],
          settings: {
            showProgress: true,
            progressValue: 60,
            backgroundColor: '#f9f4ef',
            textColor: '#432818',
            maxWidth: 'max-w-4xl'
          }
        },

        // ETAPAS 13-18: 6 questões estratégicas
        ...STRATEGIC_QUESTIONS.map((questionData, i) => ({
          id: `etapa-${i + 13}-estrategica-${i + 1}`,
          name: `Questão Estratégica ${i + 1}`,
          title: `Etapa ${i + 13}: ${questionData.question}`,
          type: 'question' as const,
          order: i + 13,
          blocks: [
            {
              id: `progress-strategic-${i + 1}`,
              type: 'ProgressBlock',
              properties: {
                value: 65 + (i + 1) * 5,
                label: `Questão estratégica ${i + 1} de 6`,
                showPercentage: true
              }
            },
            {
              id: `strategic-question-${i + 1}`,
              type: 'QuestionBlock',
              properties: {
                question: questionData.question,
                options: questionData.options.map(opt => ({
                  id: opt.id,
                  text: opt.text,
                  value: opt.value
                })),
                required: true,
                multipleSelection: false,
                maxSelections: 1
              }
            }
          ],
          settings: {
            showProgress: true,
            progressValue: 65 + (i + 1) * 5,
            backgroundColor: '#ffffff',
            textColor: '#432818',
            maxWidth: 'max-w-4xl'
          }
        })),

        // ETAPA 19: Transição final
        {
          id: 'etapa-19-transicao-final',
          name: 'Transição Final',
          title: 'Etapa 19: Preparando seu resultado',
          type: 'custom',
          order: 19,
          blocks: [
            {
              id: 'final-transition-header',
              type: 'HeaderBlock',
              properties: {
                title: TRANSITIONS.finalTransition.title,
                subtitle: TRANSITIONS.finalTransition.message,
                alignment: 'center',
                titleSize: 'large'
              }
            },
            {
              id: 'final-transition-loading',
              type: 'TextBlock',
              properties: {
                content: '⏳ Analisando suas respostas...',
                fontSize: 'medium',
                alignment: 'center'
              }
            }
          ],
          settings: {
            showProgress: true,
            progressValue: 95,
            backgroundColor: '#f9f4ef',
            textColor: '#432818',
            maxWidth: 'max-w-4xl'
          }
        },

        // ETAPA 20: Resultado (/resultado)
        {
          id: 'etapa-20-resultado',
          name: 'Resultado',
          title: 'Etapa 20: Seu Estilo Predominante',
          type: 'result',
          order: 20,
          blocks: [
            {
              id: 'result-header',
              type: 'header-component-real',
              properties: {
                primaryStyle: 'elegante',
                logoHeight: '60px',
                logo: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
                logoAlt: 'Logo Gisele Galvão',
                userName: 'Seu Nome'
              }
            },
            {
              id: 'result-card',
              type: 'card-component-real',
              properties: {
                className: 'result-card-main'
              }
            },
            {
              id: 'secondary-styles',
              type: 'secondary-styles-component-real',
              properties: {
                secondaryStyles: []
              }
            },
            {
              id: 'before-after',
              type: 'before-after-component-real',
              properties: {}
            },
            {
              id: 'motivation',
              type: 'motivation-component-real',
              properties: {}
            },
            {
              id: 'bonus',
              type: 'bonus-component-real',
              properties: {}
            },
            {
              id: 'testimonials',
              type: 'testimonials-component-real',
              properties: {}
            },
            {
              id: 'guarantee',
              type: 'guarantee-component-real',
              properties: {}
            },
            {
              id: 'mentor',
              type: 'mentor-component-real',
              properties: {}
            },
            {
              id: 'secure-purchase',
              type: 'secure-purchase-component-real',
              properties: {}
            }
          ],
          settings: {
            showProgress: true,
            progressValue: 100,
            backgroundColor: '#ffffff',
            textColor: '#432818',
            maxWidth: 'max-w-6xl'
          }
        },

        // ETAPA 21: Oferta (/quiz-descubra-seu-estilo)
        {
          id: 'etapa-21-oferta',
          name: 'Oferta Especial',
          title: 'Etapa 21: Oferta Exclusiva',
          type: 'offer',
          order: 21,
          blocks: [
            {
              id: 'offer-header',
              type: 'section-title-component-real',
              properties: {
                title: 'Descubra Seu Estilo Predominante',
                subtitle: 'Tenha finalmente um guarda-roupa que funciona 100%'
              }
            },
            {
              id: 'offer-intro-image',
              type: 'fixed-intro-image-component-real',
              properties: {
                src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.webp',
                alt: 'Transforme seu guarda-roupa',
                width: '100%',
                height: 'auto',
                className: 'offer-intro-image'
              }
            },
            {
              id: 'offer-countdown',
              type: 'countdown-timer-component-real',
              properties: {}
            },
            {
              id: 'offer-pricing',
              type: 'pricing-section-component-real',
              properties: {
                title: 'Oferta por tempo limitado',
                installments: 'R$ 8,83',
                fullPrice: 'R$ 39,90',
                savings: '77% OFF - Economia de R$ 135,10'
              }
            },
            {
              id: 'offer-faq',
              type: 'faq-section-component-real',
              properties: {}
            },
            {
              id: 'offer-cta',
              type: 'button-component-real',
              properties: {
                children: 'QUERO DESCOBRIR MEU ESTILO AGORA',
                className: 'btn-cta-offer',
                style: { backgroundColor: '#4CAF50', color: 'white' },
                onClick: null
              }
            }
          ],
          settings: {
            showProgress: false,
            progressValue: 100,
            backgroundColor: '#ffffff',
            textColor: '#432818',
            maxWidth: 'max-w-4xl'
          }
        }
      ],
      config: {
        name: 'Quiz CaktoQuiz - Descubra Seu Estilo',
        description: 'Funil completo para descoberta do estilo pessoal - 21 etapas',
        isPublished: false,
        theme: 'caktoquiz',
        primaryColor: '#B89B7A',
        secondaryColor: '#432818',
        fontFamily: 'Playfair Display',
        analytics: {
          events: [],
          conversionGoals: []
        }
      },
      version: 1,
      lastModified: now,
      createdAt: now
    };
  }

  // Cleanup
  destroy() {
    this.disableAutoSave();
  }
}

export const schemaDrivenFunnelService = new SchemaDrivenFunnelService();
