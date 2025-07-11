/**
 * Utilitário para corrigir problemas de localStorage com funnels órfãos
 */

export class LocalStorageFixer {
  private static STORAGE_KEYS = {
    FUNNEL: 'schemaDrivenFunnel',
    VERSION: 'schemaDrivenFunnelVersionHistory',
    EMERGENCY: 'schemaDrivenEmergencyCleanup'
  };

  /**
   * Remove todos os dados de localStorage relacionados ao schema-driven
   */
  static clearAllSchemaDrivenData(): void {
    console.log('🧹 Iniciando limpeza completa do localStorage...');
    
    // Remover dados principais
    Object.values(this.STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
      console.log(`✅ Removido: ${key}`);
    });

    // Remover versões de funnels específicos
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes('schemaDrivenFunnelVersionHistory-')) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      console.log(`✅ Removido: ${key}`);
    });

    console.log('✨ Limpeza completa finalizada!');
  }

  /**
   * Lista todos os dados de localStorage relacionados ao schema-driven
   */
  static listSchemaDrivenData(): void {
    console.log('📋 Dados de localStorage encontrados:');
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes('schemaDriven')) {
        const value = localStorage.getItem(key);
        console.log(`🔍 ${key}:`, value ? JSON.parse(value) : 'null');
      }
    }
  }

  /**
   * Verifica se há funnels órfãos (criados localmente mas não no backend)
   */
  static async checkOrphanFunnels(): Promise<string[]> {
    const orphanIds: string[] = [];
    
    try {
      // Buscar funnels no backend
      const response = await fetch('/api/schema-driven/funnels');
      if (!response.ok) throw new Error('Backend não disponível');
      
      const result = await response.json();
      const backendFunnelIds = result.data.map((f: any) => f.id);
      
      // Verificar localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.includes('schemaDrivenFunnelVersionHistory-')) {
          const funnelId = key.replace('schemaDrivenFunnelVersionHistory-', '');
          if (!backendFunnelIds.includes(funnelId)) {
            orphanIds.push(funnelId);
          }
        }
      }
      
      console.log('🔍 Funnels órfãos encontrados:', orphanIds);
      return orphanIds;
      
    } catch (error) {
      console.error('❌ Erro ao verificar funnels órfãos:', error);
      return [];
    }
  }

  /**
   * Remove funnels órfãos do localStorage
   */
  static async cleanOrphanFunnels(): Promise<void> {
    const orphanIds = await this.checkOrphanFunnels();
    
    orphanIds.forEach(id => {
      const versionKey = `schemaDrivenFunnelVersionHistory-${id}`;
      localStorage.removeItem(versionKey);
      console.log(`✅ Removido funnel órfão: ${id}`);
    });
    
    // Verificar se o funnel atual é órfão
    const currentFunnel = localStorage.getItem(this.STORAGE_KEYS.FUNNEL);
    if (currentFunnel) {
      try {
        const funnelData = JSON.parse(currentFunnel);
        if (orphanIds.includes(funnelData.id)) {
          localStorage.removeItem(this.STORAGE_KEYS.FUNNEL);
          console.log(`✅ Removido funnel atual órfão: ${funnelData.id}`);
        }
      } catch (error) {
        console.error('❌ Erro ao verificar funnel atual:', error);
      }
    }
  }
}

// Adicionar ao window para uso no console do navegador
declare global {
  interface Window {
    LocalStorageFixer: typeof LocalStorageFixer;
  }
}

if (typeof window !== 'undefined') {
  window.LocalStorageFixer = LocalStorageFixer;
}
