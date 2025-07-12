import { Block } from '@/types/editor';

interface Funnel {
  id: string;
  name: string;
  pages: Array<{
    id: string;
    name: string;
    blocks: Block[];
  }>;
}

const STORAGE_KEY = 'schemaDrivenFunnel';
const VERSION_KEY = 'schemaDrivenFunnelVersion';

class SchemaDrivenFunnelService {
  async getFunnel(funnelId: string): Promise<Funnel> {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}-${funnelId}`);
      if (stored) {
        return JSON.parse(stored);
      }
      
      // Return default if not found
      return this.createDefaultFunnel();
    } catch (error) {
      console.error('Error loading funnel:', error);
      return this.createDefaultFunnel();
    }
  }

  async createDefaultFunnel(): Promise<Funnel> {
    const defaultFunnel: Funnel = {
      id: `funnel-${Date.now()}`,
      name: 'Novo Funil',
      pages: [
        {
          id: 'page-1',
          name: 'Página Inicial',
          blocks: []
        }
      ]
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultFunnel));
    } catch (error) {
      console.warn('Could not save to localStorage:', error);
    }

    return defaultFunnel;
  }

  async saveFunnel(funnel: Funnel): Promise<void> {
    try {
      localStorage.setItem(`${STORAGE_KEY}-${funnel.id}`, JSON.stringify(funnel));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(funnel));
      
      // Save version history (keep last 5 versions)
      const versionHistory = this.getVersionHistory(funnel.id);
      versionHistory.unshift({
        timestamp: Date.now(),
        data: funnel
      });
      
      // Keep only last 5 versions
      const trimmedHistory = versionHistory.slice(0, 5);
      localStorage.setItem(`${VERSION_KEY}-${funnel.id}`, JSON.stringify(trimmedHistory));
      
    } catch (error) {
      console.error('Error saving funnel:', error);
      throw new Error('Não foi possível salvar o funil');
    }
  }

  private getVersionHistory(funnelId: string): Array<{ timestamp: number; data: Funnel }> {
    try {
      const stored = localStorage.getItem(`${VERSION_KEY}-${funnelId}`);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn('Error loading version history:', error);
      return [];
    }
  }

  async listFunnels(): Promise<Funnel[]> {
    const funnels: Funnel[] = [];
    
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(STORAGE_KEY + '-')) {
          const stored = localStorage.getItem(key);
          if (stored) {
            funnels.push(JSON.parse(stored));
          }
        }
      }
    } catch (error) {
      console.error('Error listing funnels:', error);
    }
    
    return funnels;
  }

  async deleteFunnel(funnelId: string): Promise<void> {
    try {
      localStorage.removeItem(`${STORAGE_KEY}-${funnelId}`);
      localStorage.removeItem(`${VERSION_KEY}-${funnelId}`);
    } catch (error) {
      console.error('Error deleting funnel:', error);
      throw new Error('Não foi possível deletar o funil');
    }
  }

  clearLocalStorage(): void {
    try {
      // Remove all schema-driven data
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes('schemaDriven') || key.includes('funnel'))) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
}

export const schemaDrivenFunnelService = new SchemaDrivenFunnelService();
