/**
 * Utilitário para debug e limpeza de problemas de storage
 */

export class StorageDebug {
  /**
   * Diagnosticar problemas de storage
   */
  static diagnoseStorageIssues(): void {
    console.log('🔍 === DIAGNÓSTICO DE STORAGE ===');
    
    // 1. Verificar localStorage
    console.log('📦 LocalStorage:');
    try {
      const funnelData = localStorage.getItem('schemaDrivenFunnel');
      const versionHistory = localStorage.getItem('schemaDrivenFunnelVersionHistory');
      
      console.log('  - schemaDrivenFunnel:', funnelData ? 'EXISTS' : 'MISSING');
      console.log('  - versionHistory:', versionHistory ? 'EXISTS' : 'MISSING');
      
      if (funnelData) {
        try {
          const parsed = JSON.parse(funnelData);
          console.log('  - funnel.pages.length:', parsed?.pages?.length || 'UNDEFINED');
          console.log('  - funnel.id:', parsed?.id || 'UNDEFINED');
        } catch (error) {
          console.error('  - ❌ Erro ao parsear funnel:', error);
        }
      }
    } catch (error) {
      console.error('❌ Erro ao acessar localStorage:', error);
    }
    
    // 2. Verificar Supabase
    console.log('🌐 Supabase:');
    try {
      // @ts-ignore
      const supabase = window?.supabase;
      console.log('  - Client disponível:', !!supabase);
      
      if (supabase) {
        console.log('  - URL:', supabase.supabaseUrl || 'UNDEFINED');
        console.log('  - Key:', supabase.supabaseKey ? 'EXISTS' : 'MISSING');
      }
    } catch (error) {
      console.error('❌ Erro ao verificar Supabase:', error);
    }
    
    // 3. Verificar dados de quiz
    console.log('📋 Quiz Data:');
    try {
      // @ts-ignore
      const { quizQuestions } = await import('@/data/quizQuestions');
      console.log('  - quizQuestions.length:', quizQuestions?.length || 'UNDEFINED');
    } catch (error) {
      console.error('❌ Erro ao importar quizQuestions:', error);
    }
    
    console.log('=== FIM DIAGNÓSTICO ===');
  }
  
  /**
   * Limpar storage corrompido
   */
  static cleanCorruptedStorage(): void {
    console.log('🧹 Limpando storage corrompido...');
    
    const keysToClean = [
      'schemaDrivenFunnel',
      'schemaDrivenFunnelVersionHistory',
      'schemaDrivenEmergencyCleanup'
    ];
    
    keysToClean.forEach(key => {
      try {
        localStorage.removeItem(key);
        console.log(`✅ Removido: ${key}`);
      } catch (error) {
        console.error(`❌ Erro ao remover ${key}:`, error);
      }
    });
    
    // Remover versões específicas de funnels
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes('schemaDrivenFunnelVersionHistory-')) {
        localStorage.removeItem(key);
        console.log(`✅ Removido: ${key}`);
      }
    }
    
    console.log('✨ Limpeza concluída!');
  }
  
  /**
   * Resetar para configuração padrão
   */
  static resetToDefault(): void {
    console.log('🔄 Resetando para configuração padrão...');
    
    this.cleanCorruptedStorage();
    
    // Recarregar página para reinicializar
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  
  /**
   * Verificar consistência entre client/server
   */
  static async checkClientServerConsistency(): Promise<void> {
    console.log('🔍 Verificando consistência client/server...');
    
    try {
      // Verificar se APIs estão respondendo
      const response = await fetch('/api/health');
      if (response.ok) {
        console.log('✅ Server API está funcionando');
        
        // Verificar schema-driven endpoints
        try {
          const funnelsResponse = await fetch('/api/schema-driven/funnels');
          if (funnelsResponse.ok) {
            console.log('✅ Schema-driven API está funcionando');
          } else {
            console.warn('⚠️ Schema-driven API não está respondendo');
          }
        } catch (error) {
          console.warn('⚠️ Erro ao verificar schema-driven API:', error);
        }
      } else {
        console.warn('⚠️ Server API não está respondendo');
      }
    } catch (error) {
      console.error('❌ Erro ao verificar APIs:', error);
    }
  }
}

// Adicionar ao window para uso no console
declare global {
  interface Window {
    StorageDebug: typeof StorageDebug;
  }
}

if (typeof window !== 'undefined') {
  window.StorageDebug = StorageDebug;
}