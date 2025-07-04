import type { 
  Funnel, 
  InsertFunnel, 
  FunnelPage, 
  InsertFunnelPage, 
  FunnelVersion, 
  InsertFunnelVersion 
} from "@shared/schema";

export interface FunnelData {
  id: string;
  name: string;
  description?: string;
  pages: PageData[];
  settings?: {
    theme?: string;
    primaryColor?: string;
    abTesting?: {
      enabled: boolean;
      variants: string[];
    };
    analytics?: {
      trackingId?: string;
      events?: string[];
    };
  };
}

export interface PageData {
  id: string;
  type: string;
  name?: string; // Adicionando propriedade name
  title?: string;
  order?: number; // Tornando opcional para compatibilidade
  blocks: BlockData[];
  metadata?: any;
  settings?: any; // Adicionando para compatibilidade
}

export interface BlockData {
  id: string;
  type: string;
  content?: any; // Tornando opcional para compatibilidade
  styles?: any;
  position?: {
    x: number;
    y: number;
  };
  // Compatibilidade com editor atual
  order?: number;
  settings?: any;
  style?: any;
}

class FunnelService {
  private baseUrl = '/api';

  // Funnel operations
  async createFunnel(data: Omit<InsertFunnel, 'userId'> & { userId?: number }): Promise<Funnel> {
    const response = await fetch(`${this.baseUrl}/funnels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create funnel');
    }

    const result = await response.json();
    return result.data;
  }

  async getFunnelsByUserId(userId: number): Promise<Funnel[]> {
    const response = await fetch(`${this.baseUrl}/funnels/user/${userId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch funnels');
    }

    const result = await response.json();
    return result.data;
  }

  async getFunnelById(id: string): Promise<Funnel | null> {
    const response = await fetch(`${this.baseUrl}/funnels/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch funnel');
    }

    const result = await response.json();
    return result.data;
  }

  async updateFunnel(id: string, updates: Partial<InsertFunnel>): Promise<Funnel> {
    const response = await fetch(`${this.baseUrl}/funnels/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('Failed to update funnel');
    }

    const result = await response.json();
    return result.data;
  }

  async deleteFunnel(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/funnels/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete funnel');
    }
  }

  // Funnel pages operations
  async createFunnelPage(data: InsertFunnelPage): Promise<FunnelPage> {
    const response = await fetch(`${this.baseUrl}/funnel-pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create funnel page');
    }

    const result = await response.json();
    return result.data;
  }

  async getFunnelPages(funnelId: string): Promise<FunnelPage[]> {
    const response = await fetch(`${this.baseUrl}/funnel-pages/funnel/${funnelId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch funnel pages');
    }

    const result = await response.json();
    return result.data;
  }

  async updateFunnelPage(id: string, updates: Partial<InsertFunnelPage>): Promise<FunnelPage> {
    const response = await fetch(`${this.baseUrl}/funnel-pages/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('Failed to update funnel page');
    }

    const result = await response.json();
    return result.data;
  }

  async deleteFunnelPage(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/funnel-pages/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete funnel page');
    }
  }

  // Funnel versions operations
  async createFunnelVersion(data: InsertFunnelVersion): Promise<FunnelVersion> {
    const response = await fetch(`${this.baseUrl}/funnel-versions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create funnel version');
    }

    const result = await response.json();
    return result.data;
  }

  async getFunnelVersions(funnelId: string): Promise<FunnelVersion[]> {
    const response = await fetch(`${this.baseUrl}/funnel-versions/funnel/${funnelId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch funnel versions');
    }

    const result = await response.json();
    return result.data;
  }

  // High-level operations
  async saveFunnelData(funnelData: FunnelData, userId?: number): Promise<Funnel> {
    // Check if funnel exists
    let funnel = await this.getFunnelById(funnelData.id);

    if (!funnel) {
      // Create new funnel
      funnel = await this.createFunnel({
        name: funnelData.name,
        description: funnelData.description,
        userId: userId || undefined,
        settings: funnelData.settings || null,
      });
    } else {
      // Update existing funnel
      funnel = await this.updateFunnel(funnel.id, {
        name: funnelData.name,
        description: funnelData.description,
        settings: funnelData.settings || null,
      });
    }

    // Save pages
    const existingPages = await this.getFunnelPages(funnel.id);
    
    // Delete pages that no longer exist
    for (const existingPage of existingPages) {
      if (!funnelData.pages.find(p => p.id === existingPage.id)) {
        await this.deleteFunnelPage(existingPage.id);
      }
    }

    // Create or update pages
    for (const pageData of funnelData.pages) {
      const existingPage = existingPages.find(p => p.id === pageData.id);
      
      if (existingPage) {
        await this.updateFunnelPage(existingPage.id, {
          pageType: pageData.type,
          pageOrder: pageData.order,
          title: pageData.title || null,
          blocks: pageData.blocks,
          metadata: pageData.metadata || null,
        });
      } else {
        await this.createFunnelPage({
          funnelId: funnel.id,
          pageType: pageData.type,
          pageOrder: pageData.order || 0,
          title: pageData.title || null,
          blocks: pageData.blocks,
          metadata: pageData.metadata || null,
        });
      }
    }

    // Create version snapshot
    await this.createFunnelVersion({
      funnelId: funnel.id,
      version: (funnel.version || 0) + 1,
      funnelData: funnelData,
      createdBy: userId || null,
    });

    return funnel;
  }

  async loadFunnelData(funnelId: string): Promise<FunnelData | null> {
    const funnel = await this.getFunnelById(funnelId);
    if (!funnel) return null;

    const pages = await this.getFunnelPages(funnelId);

    return {
      id: funnel.id,
      name: funnel.name,
      description: funnel.description || undefined,
      pages: pages.map(page => ({
        id: page.id,
        type: page.pageType,
        title: page.title || undefined,
        order: page.pageOrder,
        blocks: page.blocks as BlockData[],
        metadata: page.metadata || undefined,
      })),
      settings: funnel.settings as any || undefined,
    };
  }
}

export const funnelService = new FunnelService();
