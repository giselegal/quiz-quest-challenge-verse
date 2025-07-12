
import { useState, useEffect, useCallback } from 'react';
import { safeLocalStorage } from '@/utils/safeLocalStorage';
import { toast } from '@/components/ui/use-toast';

export interface EditorData {
  quiz?: any;
  result?: any;
  sales?: any;
  lastModified?: number;
}

const STORAGE_KEY = 'editor_data';
const VERSION_KEY = 'editor_version';
const CURRENT_VERSION = '1.0';

export const useEditorPersistence = () => {
  const [data, setData] = useState<EditorData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Função para limpar dados corrompidos
  const clearCorruptedData = useCallback(() => {
    console.warn('🧹 Limpando dados corrompidos do localStorage');
    safeLocalStorage.removeItem(STORAGE_KEY);
    safeLocalStorage.removeItem(VERSION_KEY);
    safeLocalStorage.removeItem('quiz_result');
    safeLocalStorage.removeItem('quizResult');
    toast({
      title: "Dados limpos",
      description: "Dados corrompidos foram removidos. Reiniciando...",
    });
  }, []);

  // Validar dados do localStorage
  const validateEditorData = useCallback((data: any): boolean => {
    if (!data || typeof data !== 'object') return false;
    
    // Verificar se tem estrutura básica válida
    const hasValidStructure = data.hasOwnProperty('quiz') || 
                             data.hasOwnProperty('result') || 
                             data.hasOwnProperty('sales');
    
    return hasValidStructure;
  }, []);

  // Carregar dados do localStorage
  const loadData = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    
    try {
      const version = safeLocalStorage.getItem(VERSION_KEY);
      const storedData = safeLocalStorage.getItem(STORAGE_KEY);
      
      // Verificar versão
      if (version && version !== CURRENT_VERSION) {
        console.log('🔄 Versão do editor desatualizada, limpando dados');
        clearCorruptedData();
        setData({});
        return;
      }
      
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        
        if (validateEditorData(parsedData)) {
          console.log('✅ Dados do editor carregados com sucesso');
          setData(parsedData);
        } else {
          console.warn('⚠️ Dados do editor inválidos, usando padrão');
          clearCorruptedData();
          setData({});
        }
      } else {
        console.log('📝 Nenhum dado do editor encontrado, iniciando vazio');
        setData({});
      }
      
    } catch (error) {
      console.error('❌ Erro ao carregar dados do editor:', error);
      setHasError(true);
      clearCorruptedData();
      setData({});
    } finally {
      setIsLoading(false);
    }
  }, [validateEditorData, clearCorruptedData]);

  // Salvar dados no localStorage
  const saveData = useCallback((newData: EditorData) => {
    try {
      const dataToSave = {
        ...newData,
        lastModified: Date.now()
      };
      
      safeLocalStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      safeLocalStorage.setItem(VERSION_KEY, CURRENT_VERSION);
      setData(dataToSave);
      
      console.log('💾 Dados do editor salvos com sucesso');
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar dados do editor:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar os dados. Tente novamente.",
        variant: "destructive"
      });
      return false;
    }
  }, []);

  // Limpar todos os dados
  const clearAllData = useCallback(() => {
    try {
      safeLocalStorage.clear();
      setData({});
      setHasError(false);
      console.log('🗑️ Todos os dados locais foram limpos');
      toast({
        title: "Dados limpos",
        description: "Todos os dados locais foram removidos com sucesso.",
      });
      return true;
    } catch (error) {
      console.error('❌ Erro ao limpar dados:', error);
      return false;
    }
  }, []);

  // Carregar dados na inicialização
  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    data,
    isLoading,
    hasError,
    saveData,
    loadData,
    clearAllData,
    clearCorruptedData
  };
};
