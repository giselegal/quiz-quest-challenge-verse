import { useState, useEffect, useCallback } from 'react';
import { pageConfigService, type PageConfig, type ConfigBlock } from '../services/pageConfigService';

interface UsePageConfigReturn {
  config: PageConfig | null;
  isLoading: boolean;
  error: string | null;
  updateConfig: (updates: Partial<PageConfig>) => Promise<boolean>;
  refreshConfig: () => Promise<void>;
  applyStyles: () => void;
  getBlockProps: (blockId: string) => Record<string, any>;
}

export const usePageConfig = (pageId: string): UsePageConfigReturn => {
  const [config, setConfig] = useState<PageConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carregar configuração da página
   */
  const loadConfig = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const pageConfig = await pageConfigService.getPageConfig(pageId);
      setConfig(pageConfig);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar configuração');
      console.error('Error loading page config:', err);
    } finally {
      setIsLoading(false);
    }
  }, [pageId]);

  /**
   * Atualizar configuração
   */
  const updateConfig = useCallback(async (updates: Partial<PageConfig>): Promise<boolean> => {
    if (!config) return false;

    try {
      const updatedConfig = { ...config, ...updates };
      const success = await pageConfigService.savePageConfig(updatedConfig);
      
      if (success) {
        setConfig(updatedConfig);
      }
      
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar configuração');
      return false;
    }
  }, [config]);

  /**
   * Recarregar configuração
   */
  const refreshConfig = useCallback(async () => {
    await loadConfig();
  }, [loadConfig]);

  /**
   * Aplicar estilos da página ao DOM
   */
  const applyStyles = useCallback(() => {
    if (!config?.styles) return;

    const styles = config.styles;
    
    // Aplicar estilos ao body
    if (styles.backgroundColor) {
      document.body.style.backgroundColor = styles.backgroundColor;
    }
    
    if (styles.textColor) {
      document.body.style.color = styles.textColor;
    }
    
    if (styles.fontFamily) {
      document.body.style.fontFamily = styles.fontFamily;
    }

    // Aplicar CSS customizado
    if (styles.customCSS) {
      let styleElement = document.getElementById(`page-styles-${pageId}`);
      
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = `page-styles-${pageId}`;
        document.head.appendChild(styleElement);
      }
      
      styleElement.textContent = styles.customCSS;
    }

    // Aplicar meta tags
    if (config.metadata) {
      const meta = config.metadata;
      
      if (meta.title) {
        document.title = meta.title;
      }
      
      if (meta.description) {
        updateMetaTag('description', meta.description);
      }
      
      if (meta.ogImage) {
        updateMetaTag('og:image', meta.ogImage);
      }
      
      if (meta.keywords && meta.keywords.length > 0) {
        updateMetaTag('keywords', meta.keywords.join(', '));
      }
    }
  }, [config, pageId]);

  /**
   * Obter props para um bloco específico
   */
  const getBlockProps = useCallback((blockId: string): Record<string, any> => {
    if (!config?.blocks) return {};

    const block = config.blocks.find(b => b.id === blockId);
    if (!block) return {};

    return {
      ...block.props,
      style: block.styles,
      className: block.settings?.className || '',
      'data-block-id': blockId,
      'data-block-type': block.type
    };
  }, [config]);

  /**
   * Atualizar meta tag
   */
  const updateMetaTag = (name: string, content: string) => {
    let metaElement = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
    
    if (!metaElement) {
      metaElement = document.createElement('meta');
      metaElement.setAttribute(name.startsWith('og:') ? 'property' : 'name', name);
      document.head.appendChild(metaElement);
    }
    
    metaElement.setAttribute('content', content);
  };

  // Carregar configuração ao montar
  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  // Aplicar estilos quando a configuração mudar
  useEffect(() => {
    if (config && !isLoading) {
      applyStyles();
    }
  }, [config, isLoading, applyStyles]);

  return {
    config,
    isLoading,
    error,
    updateConfig,
    refreshConfig,
    applyStyles,
    getBlockProps
  };
};

/**
 * Hook para buscar configurações de bloco específico
 */
export const useBlockConfig = (pageId: string, blockId: string) => {
  const { config, getBlockProps } = usePageConfig(pageId);
  
  const blockConfig = config?.blocks.find(b => b.id === blockId);
  const blockProps = getBlockProps(blockId);
  
  return {
    block: blockConfig,
    props: blockProps,
    isConfigured: !!blockConfig
  };
};

/**
 * Hook para componentes dinâmicos
 */
export const useDynamicComponent = (pageId: string, blockId: string) => {
  const { block, props, isConfigured } = useBlockConfig(pageId, blockId);
  
  return {
    componentType: block?.type || 'div',
    props: {
      ...props,
      // Props adicionais baseadas no tipo
      ...(block?.type === 'header-component-real' && {
        primaryStyle: props.primaryStyle || 'dynamic',
        logo: props.logo || '/default-logo.png',
        userName: props.userName || 'Usuário'
      }),
      ...(block?.type === 'button-component-real' && {
        onClick: () => eval(props.onClick || 'console.log("Button clicked")'),
        children: props.children || 'Clique aqui'
      })
    },
    isConfigured,
    rawBlock: block
  };
};

export default usePageConfig;
