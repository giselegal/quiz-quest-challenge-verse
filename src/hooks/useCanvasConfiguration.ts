/**
 * HOOK: useCanvasConfiguration
 * 
 * Hook personalizado para gerenciar a configuração do canvas das etapas 20 e 21,
 * garantindo que os componentes corretos sejam carregados na ordem adequada.
 */

import { useState, useEffect, useCallback } from 'react';
import { 
  getCanvasConfiguration, 
  applyCanvasConfiguration,
  validateSteps1to19,
  type CanvasStepConfiguration 
} from '@/services/canvasConfigurationService';
import type { BlockData } from '@/types/blocks';

interface UseCanvasConfigurationReturn {
  // Estado da configuração
  currentConfig: CanvasStepConfiguration | null;
  isLoading: boolean;
  error: string | null;
  
  // Ações
  loadStepConfiguration: (stepNumber: number) => Promise<boolean>;
  applyConfiguration: (editorInstance: any) => Promise<boolean>;
  resetCanvas: () => void;
  
  // Validação
  validateAllSteps: () => any;
  
  // Configurações específicas
  getStep20Config: () => CanvasStepConfiguration;
  getStep21Config: () => CanvasStepConfiguration;
  
  // Helpers
  getCurrentComponents: () => BlockData[];
  getStepTitle: () => string;
  getStepType: () => string;
}

export const useCanvasConfiguration = (): UseCanvasConfigurationReturn => {
  const [currentConfig, setCurrentConfig] = useState<CanvasStepConfiguration | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carrega a configuração para uma etapa específica
   */
  const loadStepConfiguration = useCallback(async (stepNumber: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log(`🔄 Carregando configuração da etapa ${stepNumber}...`);
      
      const config = getCanvasConfiguration(stepNumber);
      
      if (!config) {
        setError(`Configuração não encontrada para etapa ${stepNumber}`);
        setCurrentConfig(null);
        return false;
      }

      setCurrentConfig(config);
      console.log(`✅ Configuração da etapa ${stepNumber} carregada:`, config);
      return true;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro ao carregar etapa ${stepNumber}: ${errorMessage}`);
      console.error(`❌ Erro ao carregar etapa ${stepNumber}:`, err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Aplica a configuração atual ao editor
   */
  const applyConfiguration = useCallback(async (editorInstance: any): Promise<boolean> => {
    if (!currentConfig) {
      setError('Nenhuma configuração carregada para aplicar');
      return false;
    }

    setIsLoading(true);
    
    try {
      console.log(`🎨 Aplicando configuração da etapa ${currentConfig.order}...`);
      
      const success = applyCanvasConfiguration(currentConfig.order, editorInstance);
      
      if (success) {
        console.log(`✅ Configuração aplicada com sucesso ao editor`);
      } else {
        setError('Falha ao aplicar configuração ao editor');
      }
      
      return success;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro ao aplicar configuração: ${errorMessage}`);
      console.error('❌ Erro ao aplicar configuração:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [currentConfig]);

  /**
   * Reseta o canvas atual
   */
  const resetCanvas = useCallback(() => {
    setCurrentConfig(null);
    setError(null);
    console.log('🔄 Canvas resetado');
  }, []);

  /**
   * Valida todas as etapas 1-19
   */
  const validateAllSteps = useCallback(() => {
    console.log('🔍 Iniciando validação das etapas 1-19...');
    return validateSteps1to19();
  }, []);

  /**
   * Obtém configuração específica da etapa 20
   */
  const getStep20Config = useCallback((): CanvasStepConfiguration => {
    const config = getCanvasConfiguration(20);
    if (!config) {
      throw new Error('Configuração da etapa 20 não encontrada');
    }
    return config;
  }, []);

  /**
   * Obtém configuração específica da etapa 21  
   */
  const getStep21Config = useCallback((): CanvasStepConfiguration => {
    const config = getCanvasConfiguration(21);
    if (!config) {
      throw new Error('Configuração da etapa 21 não encontrada');
    }
    return config;
  }, []);

  /**
   * Obtém componentes da configuração atual
   */
  const getCurrentComponents = useCallback((): BlockData[] => {
    return currentConfig?.components || [];
  }, [currentConfig]);

  /**
   * Obtém título da etapa atual
   */
  const getStepTitle = useCallback((): string => {
    return currentConfig?.title || '';
  }, [currentConfig]);

  /**
   * Obtém tipo da etapa atual
   */
  const getStepType = useCallback((): string => {
    return currentConfig?.type || '';
  }, [currentConfig]);

  // Efeito para log de mudanças de configuração
  useEffect(() => {
    if (currentConfig) {
      console.log(`📋 Configuração ativa: ${currentConfig.title} (${currentConfig.components.length} componentes)`);
    }
  }, [currentConfig]);

  return {
    // Estado
    currentConfig,
    isLoading,
    error,
    
    // Ações
    loadStepConfiguration,
    applyConfiguration,
    resetCanvas,
    
    // Validação
    validateAllSteps,
    
    // Configurações específicas
    getStep20Config,
    getStep21Config,
    
    // Helpers
    getCurrentComponents,
    getStepTitle,
    getStepType
  };
};

/**
 * HOOK ESPECIALIZADO: useStep20Canvas
 * Hook específico para configuração da etapa 20 (Resultado)
 */
export const useStep20Canvas = () => {
  const {
    loadStepConfiguration,
    applyConfiguration,
    currentConfig,
    isLoading,
    error,
    getStep20Config
  } = useCanvasConfiguration();

  const [isStep20Loaded, setIsStep20Loaded] = useState(false);

  /**
   * Carrega e aplica configuração da etapa 20
   */
  const loadAndApplyStep20 = useCallback(async (editorInstance?: any) => {
    const loaded = await loadStepConfiguration(20);
    setIsStep20Loaded(loaded);
    
    if (loaded && editorInstance) {
      return await applyConfiguration(editorInstance);
    }
    
    return loaded;
  }, [loadStepConfiguration, applyConfiguration]);

  /**
   * Obtém componentes específicos da etapa 20
   */
  const getResultComponents = useCallback(() => {
    const config = getStep20Config();
    return {
      header: config.components.find(c => c.type === 'result-header-inline'),
      mainCard: config.components.find(c => c.type === 'result-card-inline'),
      characteristics: config.components.find(c => c.id === 'style-characteristics'),
      secondaryStyles: config.components.filter(c => c.type === 'style-card-inline'),
      ctaButton: config.components.find(c => c.id === 'main-cta-button')
    };
  }, [getStep20Config]);

  return {
    isStep20Loaded,
    loadAndApplyStep20,
    getResultComponents,
    config: currentConfig,
    isLoading,
    error
  };
};

/**
 * HOOK ESPECIALIZADO: useStep21Canvas  
 * Hook específico para configuração da etapa 21 (Oferta)
 */
export const useStep21Canvas = () => {
  const {
    loadStepConfiguration,
    applyConfiguration,
    currentConfig,
    isLoading,
    error,
    getStep21Config
  } = useCanvasConfiguration();

  const [isStep21Loaded, setIsStep21Loaded] = useState(false);

  /**
   * Carrega e aplica configuração da etapa 21
   */
  const loadAndApplyStep21 = useCallback(async (editorInstance?: any) => {
    const loaded = await loadStepConfiguration(21);
    setIsStep21Loaded(loaded);
    
    if (loaded && editorInstance) {
      return await applyConfiguration(editorInstance);
    }
    
    return loaded;
  }, [loadStepConfiguration, applyConfiguration]);

  /**
   * Obtém componentes específicos da etapa 21
   */
  const getOfferComponents = useCallback(() => {
    const config = getStep21Config();
    return {
      title: config.components.find(c => c.id === 'offer-main-title'),
      subtitle: config.components.find(c => c.id === 'offer-subtitle'),
      countdown: config.components.find(c => c.type === 'countdown-inline'),
      pricing: config.components.find(c => c.type === 'quiz-offer-pricing-inline'),
      benefits: config.components.find(c => c.id === 'offer-benefits-list'),
      testimonial: config.components.find(c => c.type === 'testimonial-card-inline'),
      guarantee: config.components.find(c => c.type === 'badge-inline'),
      ctaButton: config.components.find(c => c.id === 'final-cta-button')
    };
  }, [getStep21Config]);

  return {
    isStep21Loaded,
    loadAndApplyStep21,
    getOfferComponents,
    config: currentConfig,
    isLoading,
    error
  };
};

export default useCanvasConfiguration;
