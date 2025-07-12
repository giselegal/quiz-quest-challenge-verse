
/**
 * imageManager.ts
 * Utilitários para gerenciamento e otimização de imagens
 */

/**
 * Preload de uma única imagem
 */
export const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      console.log(`Image preloaded: ${url}`);
      resolve();
    };
    img.onerror = (error) => {
      console.error(`Failed to preload image: ${url}`, error);
      reject(error);
    };
  });
};

/**
 * Preload multiple images for better user experience
 */
export const preloadImages = (urls: string[]): Promise<void[]> => {
  return Promise.all(
    urls.map(url => preloadImage(url))
  );
};

/**
 * Get optimized image URL - simplified version
 */
export const getOptimizedImageUrl = (originalUrl: string, options?: { width?: number; height?: number; quality?: number }): string => {
  // Return original URL for now to ensure images load
  return originalUrl;
};

/**
 * Get low quality placeholder - simplified version
 */
export const getLowQualityPlaceholder = (originalUrl: string): string => {
  // Return original URL for now to ensure images load
  return originalUrl;
};

/**
 * Preload critical images by category - simplified version
 */
export const preloadCriticalImages = async (category: string | string[], options?: { quality?: number; batchSize?: number; format?: string }): Promise<void[]> => {
  console.log(`Preloading critical images for category: ${category}`);
  // Return empty promise for now
  return Promise.resolve([]);
};

/**
 * Preload images by URLs - alias for preloadImages
 */
export const preloadImagesByUrls = (urls: string[], options?: { quality?: number; batchSize?: number }): Promise<void[]> => {
  return preloadImages(urls);
};

/**
 * Get image metadata - placeholder function
 */
export const getImageMetadata = (url: string) => {
  return { width: 0, height: 0, loaded: false };
};

/**
 * Check if image is preloaded - placeholder function
 */
export const isImagePreloaded = (url: string): boolean => {
  return false;
};

/**
 * Get optimized image - alias for getOptimizedImageUrl
 */
export const getOptimizedImage = (url: string, options?: any): string => {
  return getOptimizedImageUrl(url, options);
};

export default {
  preloadImage,
  preloadImages,
  getOptimizedImageUrl,
  getLowQualityPlaceholder,
  preloadCriticalImages,
  preloadImagesByUrls,
  getImageMetadata,
  isImagePreloaded,
  getOptimizedImage
};
