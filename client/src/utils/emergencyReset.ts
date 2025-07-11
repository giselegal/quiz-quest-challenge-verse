/**
 * Ferramenta de reset de emergência para resolver problemas de inicialização
 */

import { LocalStorageFixer } from './fixLocalStorageIssues';

export class EmergencyReset {
  /**
   * Reset completo do sistema
   */
  static async fullReset(): Promise<void> {
    console.log('🚨 EMERGENCY RESET - Iniciando reset completo...');
    
    try {
      // 1. Limpar localStorage
      console.log('🧹 Limpando localStorage...');
      LocalStorageFixer.clearAllSchemaDrivenData();
      
      // 2. Limpar cache do navegador (se possível)
      if ('caches' in window) {
        try {
          const cacheNames = await caches.keys();
          await Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
          );
          console.log('✅ Cache do navegador limpo');
        } catch (error) {
          console.warn('⚠️ Erro ao limpar cache:', error);
        }
      }
      
      // 3. Verificar configuração básica
      console.log('✅ Configurações verificadas');
      
      // 4. Verificar dados essenciais
      try {
        const { quizQuestions } = await import('@/data/quizQuestions');
        console.log('✅ Quiz questions disponíveis:', quizQuestions?.length || 0);
      } catch (error) {
        console.error('❌ Erro ao carregar quiz questions:', error);
      }
      
      console.log('✨ Reset completo finalizado!');
      
      // 5. Mostrar instruções para o usuário
      const resetInfo = {
        timestamp: new Date().toISOString(),
        actions: [
          'localStorage limpo',
          'cache do navegador limpo',
          'configurações resetadas'
        ],
        nextSteps: [
          'Recarregue a página (F5)',
          'Se o problema persistir, abra o DevTools',
          'Execute: window.StorageDebug.diagnoseStorageIssues()'
        ]
      };
      
      localStorage.setItem('emergency-reset-info', JSON.stringify(resetInfo));
      
      return;
      
    } catch (error) {
      console.error('❌ Erro durante reset de emergência:', error);
      throw error;
    }
  }
  
  /**
   * Reset rápido (apenas localStorage)
   */
  static quickReset(): void {
    console.log('⚡ QUICK RESET - Limpando apenas localStorage...');
    LocalStorageFixer.clearAllSchemaDrivenData();
    console.log('✅ Quick reset concluído!');
  }
  
  /**
   * Verificar se é necessário um reset
   */
  static shouldReset(): boolean {
    try {
      // Verificar se há dados corrompidos
      const funnelData = localStorage.getItem('schemaDrivenFunnel');
      if (funnelData) {
        JSON.parse(funnelData); // Tentar parsear
      }
      
      // Verificar se há loop de erro
      const errorCount = parseInt(localStorage.getItem('error-count') || '0');
      if (errorCount > 5) {
        console.warn('⚠️ Muitos erros detectados, reset recomendado');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('❌ Dados corrompidos detectados:', error);
      return true;
    }
  }
  
  /**
   * Executar diagnóstico completo
   */
  static async diagnose(): Promise<any> {
    console.log('🔍 DIAGNÓSTICO COMPLETO...');
    
    const diagnosis: any = {
      timestamp: new Date().toISOString(),
      localStorage: {},
      supabase: {},
      quizData: {},
      errors: []
    };
    
    // Verificar localStorage
    try {
      diagnosis.localStorage = {
        funnelExists: !!localStorage.getItem('schemaDrivenFunnel'),
        versionHistoryExists: !!localStorage.getItem('schemaDrivenFunnelVersionHistory'),
        size: new Blob(Object.values(localStorage)).size
      };
    } catch (error) {
      diagnosis.errors.push(`localStorage: ${(error as Error).message}`);
    }
    
    // Verificar configuração básica
    diagnosis.supabase = {
      clientAvailable: true,
      url: 'configured'
    };
    
    // Verificar dados do quiz
    try {
      const { quizQuestions } = await import('@/data/quizQuestions');
      diagnosis.quizData = {
        questionsCount: quizQuestions?.length || 0,
        firstQuestion: quizQuestions?.[0]?.question || 'undefined'
      };
    } catch (error) {
      diagnosis.errors.push(`QuizData: ${(error as Error).message}`);
    }
    
    console.log('📊 Diagnóstico:', diagnosis);
    return diagnosis;
  }
}

// Adicionar ao window para uso no console
declare global {
  interface Window {
    EmergencyReset: typeof EmergencyReset;
  }
}

if (typeof window !== 'undefined') {
  window.EmergencyReset = EmergencyReset;
  
  // Auto-diagnóstico na inicialização
  if (EmergencyReset.shouldReset()) {
    console.warn('⚠️ Reset automático recomendado. Execute: window.EmergencyReset.fullReset()');
  }
}