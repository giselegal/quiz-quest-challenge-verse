import type { BlockData } from '@/components/editor/blocks';

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
      name: 'Novo Funil',
      description: 'Descrição do funil',
      theme: 'caktoquiz',
      isPublished: false,
      pages: [
        {
          id: 'page-intro',
          name: 'Introdução',
          title: 'Página de Introdução',
          type: 'intro',
          order: 1,
          blocks: [],
          settings: {
            showProgress: true,
            progressValue: 0,
            backgroundColor: '#ffffff',
            textColor: '#432818',
            maxWidth: 'max-w-4xl'
          }
        }
      ],
      config: {
        name: 'Novo Funil',
        description: 'Descrição do funil',
        isPublished: false,
        theme: 'caktoquiz',
        primaryColor: '#B89B7A',
        secondaryColor: '#432818',
        fontFamily: 'Inter',
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
