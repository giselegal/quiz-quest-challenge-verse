
import { v4 as uuidv4 } from 'uuid';

// Types
export interface BlockData {
  id: string;
  type: string;
  properties: Record<string, any>;
  order?: number;
}

export interface SchemaDrivenPageData {
  id: string;
  name: string;
  type: string;
  blocks: BlockData[];
  settings: Record<string, any>;
  order: number;
}

export interface SchemaDrivenFunnelData {
  id: string;
  name: string;
  pages: SchemaDrivenPageData[];
  config: {
    theme: {
      primaryColor: string;
      secondaryColor: string;
      backgroundColor: string;
      textColor: string;
      fontFamily: string;
    };
    settings: {
      showProgressBar: boolean;
      autoAdvance: boolean;
      enableHistory: boolean;
      analyticsEnabled: boolean;
    };
  };
  version: number;
  isPublished: boolean;
  lastModified: Date;
  createdAt: Date;
}

export interface AutoSaveState {
  enabled: boolean;
  interval: number;
  lastSave: Date | null;
  pendingChanges: boolean;
}

// Service class
class SchemaDrivenFunnelService {
  private autoSaveInterval: NodeJS.Timeout | null = null;
  private autoSaveState: AutoSaveState = {
    enabled: false,
    interval: 30000, // 30 seconds
    lastSave: null,
    pendingChanges: false
  };

  // Create default funnel
  createDefaultFunnel(): SchemaDrivenFunnelData {
    const now = new Date();
    return {
      id: uuidv4(),
      name: 'Novo Funil',
      pages: [
        {
          id: uuidv4(),
          name: 'Página Inicial',
          type: 'intro',
          blocks: [
            {
              id: uuidv4(),
              type: 'heading',
              properties: {
                text: 'Bem-vindo ao seu quiz!',
                level: 1,
                alignment: 'center'
              },
              order: 0
            },
            {
              id: uuidv4(),
              type: 'button',
              properties: {
                text: 'Começar',
                variant: 'primary',
                size: 'large',
                alignment: 'center'
              },
              order: 1
            }
          ],
          settings: {
            backgroundColor: '#ffffff',
            padding: '2rem'
          },
          order: 1
        }
      ],
      config: {
        theme: {
          primaryColor: '#8B5CF6',
          secondaryColor: '#F3E8FF',
          backgroundColor: '#FFFFFF',
          textColor: '#1F2937',
          fontFamily: 'Inter'
        },
        settings: {
          showProgressBar: true,
          autoAdvance: false,
          enableHistory: true,
          analyticsEnabled: true
        }
      },
      version: 1,
      isPublished: false,
      lastModified: now,
      createdAt: now
    };
  }

  // CRUD operations
  async createFunnel(funnelData: SchemaDrivenFunnelData): Promise<SchemaDrivenFunnelData> {
    try {
      const funnel = {
        ...funnelData,
        id: funnelData.id || uuidv4(),
        createdAt: new Date(),
        lastModified: new Date()
      };
      
      this.saveLocalFunnel(funnel);
      return funnel;
    } catch (error) {
      throw new Error(`Failed to create funnel: ${error}`);
    }
  }

  async loadFunnel(funnelId: string): Promise<SchemaDrivenFunnelData | null> {
    try {
      const saved = localStorage.getItem(`schema-funnel-${funnelId}`);
      if (!saved) return null;
      
      const funnel = JSON.parse(saved);
      return {
        ...funnel,
        lastModified: new Date(funnel.lastModified),
        createdAt: new Date(funnel.createdAt)
      };
    } catch (error) {
      console.error('Failed to load funnel:', error);
      return null;
    }
  }

  async saveFunnel(funnelData: SchemaDrivenFunnelData, isAutoSave = false): Promise<SchemaDrivenFunnelData> {
    try {
      const updatedFunnel = {
        ...funnelData,
        lastModified: new Date()
      };
      
      this.saveLocalFunnel(updatedFunnel);
      
      if (!isAutoSave) {
        this.autoSaveState.lastSave = new Date();
        this.autoSaveState.pendingChanges = false;
      }
      
      return updatedFunnel;
    } catch (error) {
      throw new Error(`Failed to save funnel: ${error}`);
    }
  }

  saveLocalFunnel(funnelData: SchemaDrivenFunnelData): void {
    try {
      localStorage.setItem(`schema-funnel-${funnelData.id}`, JSON.stringify(funnelData));
    } catch (error) {
      throw new Error(`Failed to save to localStorage: ${error}`);
    }
  }

  async syncWithBackend(): Promise<{ success: boolean; message: string }> {
    // Placeholder for backend sync
    return {
      success: true,
      message: 'Sync completed successfully'
    };
  }

  // Auto-save functionality
  enableAutoSave(interval: number = 30000): void {
    this.disableAutoSave();
    this.autoSaveState.enabled = true;
    this.autoSaveState.interval = interval;
    
    this.autoSaveInterval = setInterval(() => {
      if (this.autoSaveState.pendingChanges) {
        // Auto-save logic would go here
        console.log('Auto-save triggered');
      }
    }, interval);
  }

  disableAutoSave(): void {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
      this.autoSaveInterval = null;
    }
    this.autoSaveState.enabled = false;
  }

  markPendingChanges(): void {
    this.autoSaveState.pendingChanges = true;
  }

  getAutoSaveState(): AutoSaveState {
    return { ...this.autoSaveState };
  }

  // Versioning
  getVersionHistory(funnelId: string): any[] {
    try {
      const versions = localStorage.getItem(`schema-versions-${funnelId}`);
      return versions ? JSON.parse(versions) : [];
    } catch (error) {
      console.error('Failed to get version history:', error);
      return [];
    }
  }

  restoreVersion(funnelId: string, versionId: string): SchemaDrivenFunnelData | null {
    try {
      const versions = this.getVersionHistory(funnelId);
      const version = versions.find(v => v.id === versionId);
      return version ? version.data : null;
    } catch (error) {
      console.error('Failed to restore version:', error);
      return null;
    }
  }

  // Cleanup
  destroy(): void {
    this.disableAutoSave();
  }
}

// Export singleton instance
export const schemaDrivenFunnelService = new SchemaDrivenFunnelService();

// Default export
export default schemaDrivenFunnelService;

// Default funnel configuration
export const createDefaultFunnel = (): Funnel => {
  const funnelId = uuidv4();
  
  return {
    id: funnelId,
    name: 'Quiz Completo - 21 Etapas',
    pages: createModularPages(),
    config: {
      theme: {
        primaryColor: '#8B5CF6',
        secondaryColor: '#F3E8FF',
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937',
        fontFamily: 'Inter'
      },
      settings: {
        showProgressBar: true,
        autoAdvance: false,
        enableHistory: true,
        analyticsEnabled: true
      }
    },
    version: 1,
    isPublished: false,
    metadata: {
      description: 'Quiz completo com 21 etapas para descoberta de estilo',
      tags: ['quiz', 'estilo', 'personalidade'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  };
};

// Create all 21 pages based on funnel structure
export const createModularPages = (): Page[] => {
  const pages: Page[] = [];

  // Etapa 1: Introdução
  pages.push(createIntroPage());

  // Etapa 2: Coleta de Nome
  pages.push(createNameCollectionPage());

  // Etapa 3: Introdução ao Quiz
  pages.push(createQuizIntroPage());

  // Etapas 4-14: Perguntas principais (11 perguntas)
  if (REAL_QUIZ_QUESTIONS && Array.isArray(REAL_QUIZ_QUESTIONS)) {
    REAL_QUIZ_QUESTIONS.forEach((question, index) => {
      pages.push(createQuestionPage(question, index + 4));
    });
  }

  // Etapa 15: Transição
  pages.push(createTransitionPage(15, 'quiz-transition'));

  // Etapa 16: Processamento
  pages.push(createProcessingPage());

  // Etapa 17: Introdução ao Resultado
  pages.push(createResultIntroPage());

  // Etapa 18: Detalhes do Resultado
  pages.push(createResultDetailsPage());

  // Etapa 19: Guia do Resultado
  pages.push(createResultGuidePage());

  // Etapa 20: Transição para Oferta
  pages.push(createTransitionPage(20, 'offer-transition'));

  // Etapa 21: Página da Oferta
  pages.push(createOfferPage());

  return pages;
};

// Individual page creation functions
const createIntroPage = (): Page => ({
  id: uuidv4(),
  title: 'Etapa 1: Introdução',
  blocks: [
    {
      id: uuidv4(),
      type: 'heading',
      content: {
        title: 'Descubra Seu Estilo Único',
        style: {
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#8B5CF6'
        }
      },
      order: 0
    },
    {
      id: uuidv4(),
      type: 'paragraph',
      content: {
        text: 'Um quiz personalizado para descobrir seu estilo e transformar sua imagem.',
        style: {
          fontSize: '1.25rem',
          textAlign: 'center',
          color: '#6B7280'
        }
      },
      order: 1
    },
    {
      id: uuidv4(),
      type: 'button',
      content: {
        buttonText: 'Começar Quiz',
        buttonUrl: '#',
        style: {
          backgroundColor: '#8B5CF6',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '1.125rem'
        }
      },
      order: 2
    }
  ],
  settings: {
    backgroundColor: '#FFFFFF',
    padding: '2rem',
    maxWidth: '800px'
  }
});

const createNameCollectionPage = (): Page => ({
  id: uuidv4(),
  title: 'Etapa 2: Coleta de Nome',
  blocks: [
    {
      id: uuidv4(),
      type: 'heading',
      content: {
        title: 'Como podemos te chamar?',
        style: {
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
      order: 0
    },
    {
      id: uuidv4(),
      type: 'text',
      content: {
        text: 'Digite seu nome para personalizar sua experiência',
        style: {
          textAlign: 'center',
          color: '#6B7280'
        }
      },
      order: 1
    }
  ]
});

const createQuizIntroPage = (): Page => ({
  id: uuidv4(),
  title: 'Etapa 3: Introdução às Perguntas',
  blocks: [
    {
      id: uuidv4(),
      type: 'heading',
      content: {
        title: 'Vamos começar!',
        style: {
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
      order: 0
    },
    {
      id: uuidv4(),
      type: 'paragraph',
      content: {
        text: 'Responda às próximas perguntas com sinceridade para descobrir seu estilo único.',
        style: {
          textAlign: 'center',
          color: '#6B7280'
        }
      },
      order: 1
    }
  ]
});

const createQuestionPage = (question: any, stepNumber: number): Page => ({
  id: uuidv4(),
  title: `Etapa ${stepNumber}: ${question.question || question.title || 'Pergunta'}`,
  blocks: [
    {
      id: uuidv4(),
      type: 'quiz-question',
      content: {
        question: question.question || question.title,
        options: question.options || [],
        multipleSelection: question.multiSelect || false,
        showImages: true,
        progressPercent: Math.round((stepNumber / 21) * 100)
      },
      order: 0
    }
  ]
});

const createTransitionPage = (stepNumber: number, type: string): Page => ({
  id: uuidv4(),
  title: `Etapa ${stepNumber}: Transição`,
  blocks: [
    {
      id: uuidv4(),
      type: 'heading',
      content: {
        title: type === 'quiz-transition' ? 'Analisando suas respostas...' : 'Preparando sua oferta especial...',
        style: {
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
      order: 0
    }
  ]
});

const createProcessingPage = (): Page => ({
  id: uuidv4(),
  title: 'Etapa 16: Processamento',
  blocks: [
    {
      id: uuidv4(),
      type: 'heading',
      content: {
        title: 'Processando seu resultado...',
        style: {
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
      order: 0
    },
    {
      id: uuidv4(),
      type: 'paragraph',
      content: {
        text: 'Estamos analisando suas respostas para criar seu perfil personalizado.',
        style: {
          textAlign: 'center',
          color: '#6B7280'
        }
      },
      order: 1
    }
  ]
});

const createResultIntroPage = (): Page => ({
  id: uuidv4(),
  title: 'Etapa 17: Introdução ao Resultado',
  blocks: [
    {
      id: uuidv4(),
      type: 'heading',
      content: {
        title: 'Seu resultado está pronto!',
        style: {
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
      order: 0
    }
  ]
});

const createResultDetailsPage = (): Page => ({
  id: uuidv4(),
  title: 'Etapa 18: Detalhes do Resultado',
  blocks: [
    {
      id: uuidv4(),
      type: 'styleResult',
      content: {
        title: 'Seu Estilo Predominante',
        description: 'Baseado nas suas respostas, identificamos seu estilo único.',
        imageUrl: 'https://images.unsplash.com/photo-1506629905057-eb97e8d6e57d?w=400',
        style: {
          textAlign: 'center'
        }
      },
      order: 0
    }
  ]
});

const createResultGuidePage = (): Page => ({
  id: uuidv4(),
  title: 'Etapa 19: Guia Personalizado',
  blocks: [
    {
      id: uuidv4(),
      type: 'heading',
      content: {
        title: 'Seu Guia de Estilo Personalizado',
        style: {
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
      order: 0
    }
  ]
});

const createOfferPage = (): Page => ({
  id: uuidv4(),
  title: 'Etapa 21: Oferta Especial',
  blocks: [
    {
      id: uuidv4(),
      type: 'heading',
      content: {
        title: 'Oferta Especial Para Você!',
        style: {
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
      order: 0
    },
    {
      id: uuidv4(),
      type: 'cta',
      content: {
        title: 'Transforme Seu Estilo Agora',
        description: 'Consultoria personalizada baseada no seu resultado',
        buttonText: 'Quero Transformar Meu Estilo',
        buttonUrl: '#',
        style: {
          backgroundColor: '#8B5CF6',
          color: 'white'
        }
      },
      order: 1
    }
  ]
});

// Service functions for managing funnels
export const saveFunnel = (funnel: Funnel): Promise<boolean> => {
  try {
    localStorage.setItem(`funnel_${funnel.id}`, JSON.stringify(funnel));
    return Promise.resolve(true);
  } catch (error) {
    console.error('Error saving funnel:', error);
    return Promise.resolve(false);
  }
};

export const loadFunnel = (id: string): Promise<Funnel | null> => {
  try {
    const saved = localStorage.getItem(`funnel_${id}`);
    return Promise.resolve(saved ? JSON.parse(saved) : null);
  } catch (error) {
    console.error('Error loading funnel:', error);
    return Promise.resolve(null);
  }
};

export const getAllFunnels = (): Promise<Funnel[]> => {
  try {
    const funnels: Funnel[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('funnel_')) {
        const funnel = JSON.parse(localStorage.getItem(key) || '{}');
        funnels.push(funnel);
      }
    }
    return Promise.resolve(funnels);
  } catch (error) {
    console.error('Error loading funnels:', error);
    return Promise.resolve([]);
  }
};
