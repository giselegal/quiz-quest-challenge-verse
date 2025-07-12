
import { safeLocalStorage } from './safeLocalStorage';

/**
 * Função para corrigir problemas conhecidos do localStorage
 */
export const fixLocalStorageIssues = () => {
  console.log('🔧 Verificando e corrigindo problemas do localStorage...');
  
  try {
    // Lista de chaves que podem estar corrompidas
    const problematicKeys = [
      'quiz_result',
      'quizResult', 
      'quiz_builder_data',
      'editor_config',
      'result_page_config_',
      'userName',
      'userEmail',
      'userRole'
    ];
    
    let foundIssues = false;
    
    // Verificar cada chave problemática
    problematicKeys.forEach(key => {
      try {
        if (key.endsWith('_')) {
          // Para chaves com prefixo, verificar múltiplas variações
          for (let i = 0; i < localStorage.length; i++) {
            const storageKey = localStorage.key(i);
            if (storageKey && storageKey.startsWith(key)) {
              const value = safeLocalStorage.getItem(storageKey);
              if (value) {
                try {
                  JSON.parse(value);
                } catch (parseError) {
                  console.warn(`🗑️ Removendo chave corrompida: ${storageKey}`);
                  safeLocalStorage.removeItem(storageKey);
                  foundIssues = true;
                }
              }
            }
          }
        } else {
          const value = safeLocalStorage.getItem(key);
          if (value) {
            try {
              // Tentar fazer parse apenas se parecer ser JSON
              if (value.startsWith('{') || value.startsWith('[')) {
                JSON.parse(value);
              }
            } catch (parseError) {
              console.warn(`🗑️ Removendo chave corrompida: ${key}`);
              safeLocalStorage.removeItem(key);
              foundIssues = true;
            }
          }
        }
      } catch (error) {
        console.warn(`⚠️ Erro ao verificar chave ${key}:`, error);
        safeLocalStorage.removeItem(key);
        foundIssues = true;
      }
    });
    
    if (foundIssues) {
      console.log('✅ Problemas do localStorage corrigidos');
      return true;
    } else {
      console.log('✅ Nenhum problema encontrado no localStorage');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Erro ao corrigir problemas do localStorage:', error);
    return false;
  }
};

/**
 * Função para limpar completamente o localStorage em caso de emergência
 */
export const emergencyLocalStorageClear = () => {
  try {
    console.log('🚨 Executando limpeza de emergência do localStorage...');
    safeLocalStorage.clear();
    console.log('✅ localStorage limpo com sucesso');
    
    // Recarregar a página após limpeza
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
    
    return true;
  } catch (error) {
    console.error('❌ Erro na limpeza de emergência:', error);
    return false;
  }
};

/**
 * Verificação de integridade do localStorage
 */
export const checkLocalStorageIntegrity = () => {
  try {
    // Teste básico de escrita/leitura
    const testKey = '__storage_test__';
    const testValue = JSON.stringify({ test: true, timestamp: Date.now() });
    
    safeLocalStorage.setItem(testKey, testValue);
    const retrieved = safeLocalStorage.getItem(testKey);
    safeLocalStorage.removeItem(testKey);
    
    if (retrieved !== testValue) {
      console.error('❌ localStorage não está funcionando corretamente');
      return false;
    }
    
    console.log('✅ localStorage está funcionando normalmente');
    return true;
  } catch (error) {
    console.error('❌ Erro na verificação de integridade do localStorage:', error);
    return false;
  }
};
