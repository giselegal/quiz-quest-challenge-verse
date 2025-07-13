import { imageKitConfig } from '@/services/imageKitService';

/**
 * Hook para facilitar o uso do ImageKit
 */
export const useImageKit = () => {
  /**
   * Gera URL otimizada do ImageKit
   */
  const getImageUrl = (
    path: string, 
    options: {
      width?: number;
      height?: number;
      quality?: number;
      format?: 'auto' | 'webp' | 'jpg' | 'png';
    } = {}
  ) => {
    const { width, height, quality = 80, format = 'auto' } = options;
    
    let transformationString = '';
    const params: string[] = [];
    
    if (width) params.push(`w-${width}`);
    if (height) params.push(`h-${height}`);
    if (quality) params.push(`q-${quality}`);
    if (format) params.push(`f-${format}`);
    
    if (params.length > 0) {
      transformationString = `/tr:${params.join(',')}`;
    }
    
    return `${imageKitConfig.urlEndpoint}${transformationString}${path}`;
  };

  /**
   * URLs das imagens principais do projeto
   */
  const images = {
    logo: getImageUrl('/logo.webp', { width: 120, height: 50, format: 'webp' }),
    heroImage: getImageUrl('/hero-image.jpg', { width: 600, height: 400, format: 'webp' }),
    
    // Imagens dos estilos
    styles: {
      natural: getImageUrl('/style-natural.webp', { width: 400, height: 300, format: 'webp' }),
      classic: getImageUrl('/style-classic.webp', { width: 400, height: 300, format: 'webp' }),
      contemporary: getImageUrl('/style-contemporary.webp', { width: 400, height: 300, format: 'webp' }),
      elegant: getImageUrl('/style-elegant.webp', { width: 400, height: 300, format: 'webp' }),
      romantic: getImageUrl('/style-romantic.webp', { width: 400, height: 300, format: 'webp' }),
      sexy: getImageUrl('/style-sexy.webp', { width: 400, height: 300, format: 'webp' }),
      dramatic: getImageUrl('/style-dramatic.webp', { width: 400, height: 300, format: 'webp' }),
      creative: getImageUrl('/style-creative.webp', { width: 400, height: 300, format: 'webp' }),
    },
    
    // Guias dos estilos
    guides: {
      natural: getImageUrl('/guide-natural.webp', { width: 600, height: 800, format: 'webp' }),
      classic: getImageUrl('/guide-classic.webp', { width: 600, height: 800, format: 'webp' }),
      contemporary: getImageUrl('/guide-contemporary.webp', { width: 600, height: 800, format: 'webp' }),
      elegant: getImageUrl('/guide-elegant.webp', { width: 600, height: 800, format: 'webp' }),
      romantic: getImageUrl('/guide-romantic.webp', { width: 600, height: 800, format: 'webp' }),
      sexy: getImageUrl('/guide-sexy.webp', { width: 600, height: 800, format: 'webp' }),
      dramatic: getImageUrl('/guide-dramatic.webp', { width: 600, height: 800, format: 'webp' }),
      creative: getImageUrl('/guide-creative.webp', { width: 600, height: 800, format: 'webp' }),
    },
    
    // Imagens das páginas de vendas
    pages: {
      problemImage: getImageUrl('/problem-image.webp', { width: 500, height: 350, format: 'webp' }),
      solutionQuizImage: getImageUrl('/solution-quiz-image.webp', { width: 500, height: 350, format: 'webp' }),
      guidesBenefitsImage: getImageUrl('/guides-benefits-image.webp', { width: 500, height: 350, format: 'webp' }),
      bonusKeyPieces: getImageUrl('/bonus-key-pieces.webp', { width: 400, height: 300, format: 'webp' }),
      bonusVisagism: getImageUrl('/bonus-visagism.webp', { width: 400, height: 300, format: 'webp' }),
      guarantee: getImageUrl('/guarantee-7-days.webp', { width: 300, height: 200, format: 'webp' }),
    }
  };

  return {
    getImageUrl,
    images,
    config: imageKitConfig,
  };
};

export default useImageKit;
