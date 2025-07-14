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
