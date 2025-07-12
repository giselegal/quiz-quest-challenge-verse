
import { ResultPageConfig } from '@/types/resultPageConfig';
import { safeLocalStorage } from '@/utils/safeLocalStorage';

const STORAGE_KEY_PREFIX = 'result_page_config_';

export const resultPageStorage = {
  save: (config: ResultPageConfig): boolean => {
    try {
      if (!config || !config.styleType) {
        console.error('Configuração inválida ou styleType não definido');
        return false;
      }
      
      const key = `${STORAGE_KEY_PREFIX}${config.styleType}`;
      safeLocalStorage.setItem(key, JSON.stringify(config));
      console.log(`Configuração salva para ${config.styleType}`);
      return true;
    } catch (error) {
      console.error('Erro ao salvar configuração:', error);
      return false;
    }
  },
  
  load: (styleType: string): ResultPageConfig | null => {
    try {
      if (!styleType) {
        console.error('styleType não definido');
        return null;
      }
      
      const key = `${STORAGE_KEY_PREFIX}${styleType}`;
      const storedConfig = safeLocalStorage.getItem(key);
      
      if (storedConfig) {
        const parsedConfig = JSON.parse(storedConfig);
        console.log(`Configuração carregada para ${styleType}`);
        return parsedConfig;
      } else {
        console.log(`Nenhuma configuração encontrada para ${styleType}`);
        return null;
      }
    } catch (error) {
      console.error('Erro ao carregar configuração:', error);
      // Limpar dados corrompidos
      const key = `${STORAGE_KEY_PREFIX}${styleType}`;
      safeLocalStorage.removeItem(key);
      return null;
    }
  },
  
  delete: (styleType: string): boolean => {
    try {
      if (!styleType) {
        console.error('styleType não definido');
        return false;
      }
      
      const key = `${STORAGE_KEY_PREFIX}${styleType}`;
      safeLocalStorage.removeItem(key);
      console.log(`Configuração excluída para ${styleType}`);
      return true;
    } catch (error) {
      console.error('Erro ao excluir configuração:', error);
      return false;
    }
  },
  
  getAllStyles: (): string[] => {
    try {
      const styles: string[] = [];
      
      // Usar safeLocalStorage para iterar
      for (let i = 0; i < (localStorage?.length || 0); i++) {
        const key = localStorage?.key?.(i);
        if (key && key.startsWith(STORAGE_KEY_PREFIX)) {
          styles.push(key.replace(STORAGE_KEY_PREFIX, ''));
        }
      }
      
      return styles;
    } catch (error) {
      console.error('Erro ao obter estilos:', error);
      return [];
    }
  }
};
