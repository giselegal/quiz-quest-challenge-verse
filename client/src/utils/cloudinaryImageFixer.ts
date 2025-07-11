/**
 * Sistema de fallback para imagens do Cloudinary que falham com 401
 */

export interface ImageFallbackConfig {
  cloudinaryUrl: string;
  fallbackUrl?: string;
  alt: string;
  onError?: () => void;
}

export class CloudinaryImageFixer {
  private static FALLBACK_IMAGES = {
    logo: '/images/logo-placeholder.png',
    avatar: 'https://via.placeholder.com/96x96/B89B7A/ffffff?text=Avatar',
    product: 'https://via.placeholder.com/600x400/B89B7A/ffffff?text=Produto',
    style: 'https://via.placeholder.com/300x200/B89B7A/ffffff?text=Estilo',
    guide: 'https://via.placeholder.com/500x400/B89B7A/ffffff?text=Guia',
    hero: 'https://via.placeholder.com/600x400/B89B7A/ffffff?text=Imagem',
    default: 'https://via.placeholder.com/400x300/B89B7A/ffffff?text=Imagem'
  };

  /**
   * Retorna uma URL de imagem com fallback automático
   */
  static getImageWithFallback(cloudinaryUrl: string, type: keyof typeof CloudinaryImageFixer.FALLBACK_IMAGES = 'default'): string {
    // Se a URL do Cloudinary estiver vazia ou for inválida, usar fallback imediatamente
    if (!cloudinaryUrl || cloudinaryUrl.includes('undefined') || cloudinaryUrl.includes('null')) {
      return this.FALLBACK_IMAGES[type];
    }
    
    // Retornar URL original (fallback será aplicado via onError no componente)
    return cloudinaryUrl;
  }

  /**
   * Cria um objeto de configuração para imagem com fallback
   */
  static createImageConfig(config: ImageFallbackConfig): ImageFallbackConfig {
    return {
      ...config,
      fallbackUrl: config.fallbackUrl || this.FALLBACK_IMAGES.default,
      onError: config.onError || (() => {
        console.warn(`⚠️ Imagem falhou, usando fallback para: ${config.cloudinaryUrl}`);
      })
    };
  }

  /**
   * Lista de URLs problemáticas conhecidas para substituição
   */
  static fixKnownProblematicUrls(url: string): string {
    // URLs específicas que sabemos que estão dando 401
    const PROBLEMATIC_URLS: Record<string, string> = {
      'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp': 
        'https://via.placeholder.com/96x96/B89B7A/ffffff?text=LOGO',
      
      'https://res.cloudinary.com/dqljyf76t/image/upload/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.webp':
        'https://via.placeholder.com/600x400/B89B7A/ffffff?text=Hero+Image',
      
      'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_NATURAL_fzp6fc.webp':
        'https://via.placeholder.com/500x400/B89B7A/ffffff?text=Guia+Natural',
      
      'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_COMPLETO_PRODUTO.webp':
        'https://via.placeholder.com/500x400/B89B7A/ffffff?text=Guia+Completo',
      
      'avatar-ana.webp': 
        'https://via.placeholder.com/96x96/B89B7A/ffffff?text=Ana'
    };

    return PROBLEMATIC_URLS[url] || url;
  }

  /**
   * Gera placeholders dinâmicos baseados no conteúdo
   */
  static generatePlaceholder(width: number = 400, height: number = 300, text: string = 'Imagem'): string {
    const encodedText = encodeURIComponent(text);
    return `https://via.placeholder.com/${width}x${height}/B89B7A/ffffff?text=${encodedText}`;
  }
}

/**
 * Hook personalizado para imagens com fallback (para uso em componentes React)
 */
export function useImageWithFallback(cloudinaryUrl: string, fallbackType: keyof typeof CloudinaryImageFixer['FALLBACK_IMAGES'] = 'default') {
  const fixedUrl = CloudinaryImageFixer.fixKnownProblematicUrls(cloudinaryUrl);
  const fallbackUrl = CloudinaryImageFixer.FALLBACK_IMAGES[fallbackType];
  
  return {
    src: fixedUrl,
    fallback: fallbackUrl,
    onError: (e: Event) => {
      const img = e.target as HTMLImageElement;
      if (img && img.src !== fallbackUrl) {
        console.warn(`⚠️ Cloudinary image failed, switching to fallback: ${cloudinaryUrl}`);
        img.src = fallbackUrl;
      }
    }
  };
}
