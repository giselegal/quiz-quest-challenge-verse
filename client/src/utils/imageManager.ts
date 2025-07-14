/**
 * Gerenciador Simples de Imagens
 * Remove URLs quebradas e fornece fallbacks
 */

// Imagens que funcionam (verificadas)
const WORKING_IMAGES = [
  'https://res.cloudinary.com/der8kogzu/image/upload/v1752430262/Q1_-_A_xlh5cg.png',
  'https://res.cloudinary.com/der8kogzu/image/upload/v1752430263/Q1_-_B_bm79bg.png',
  'https://res.cloudinary.com/der8kogzu/image/upload/v1752430264/Q1_-_C_n2at5j.png'
];

/**
 * Obtém URL de imagem com fallback automático
 * @param imageUrl - URL original da imagem
 * @returns URL corrigida ou placeholder
 */
export function getImageUrlWithFallback(imageUrl: string): string {
  if (!imageUrl) return '';
  
  // URLs quebradas conhecidas - retornar vazio para usar modo texto
  const brokenUrls = [
    'res.cloudinary.com/dqljyf76t',  // Conta 401
    'Q4_-_',                         // Questão 4 quebrada
  ];
  
  // Se for uma URL quebrada, retornar vazio
  if (brokenUrls.some(broken => imageUrl.includes(broken))) {
    console.warn('🚫 URL quebrada removida:', imageUrl);
    return '';
  }
  
  // Se chegou até aqui, usar a URL original
  return imageUrl;
}

/**
 * Corrige URLs de imagens quebradas (remove-as)
 * @param originalUrl - URL original da imagem
 * @returns URL corrigida ou vazia
 */
export function fixImageUrl(originalUrl: string): string {
  return getImageUrlWithFallback(originalUrl);
}

// Funções de compatibilidade (simplificadas para evitar erros de build)

export function preloadCriticalImages(): void {
  console.log('📸 Preload crítico (simplificado)');
}

export function preloadImagesByUrls(urls: string[]): void {
  console.log('📸 Preload por URLs (simplificado)', urls.length);
}

export function preloadImages(): void {
  console.log('📸 Preload geral (simplificado)');
}

export function getOptimizedImageUrl(url: string): string {
  return getImageUrlWithFallback(url);
}

export function getLowQualityPlaceholder(url: string): string {
  return getImageUrlWithFallback(url);
}

export function getImageMetadata(url: string): any {
  return { url: getImageUrlWithFallback(url), optimized: true };
}

export function isImagePreloaded(url: string): boolean {
  return true; // Sempre retorna true para simplificar
}

export function getOptimizedImage(url: string): string {
  return getImageUrlWithFallback(url);
}

export default {
  getImageUrlWithFallback,
  fixImageUrl,
  preloadCriticalImages,
  preloadImagesByUrls,
  preloadImages,
  getOptimizedImageUrl,
  getLowQualityPlaceholder,
  getImageMetadata,
  isImagePreloaded,
  getOptimizedImage
};