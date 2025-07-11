
export interface OptimizedImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

export interface ImageMetadata {
  width: number;
  height: number;
  format: string;
  size: number;
  alt?: string;
}

// Cache for preloaded images
const preloadedImages = new Set<string>();
const imageMetadataCache = new Map<string, ImageMetadata>();

export const preloadCriticalImages = (urls: string[]): Promise<void[]> => {
  return Promise.all(urls.map(url => preloadImage(url)));
};

export const preloadImagesByUrls = (urls: string[]): Promise<void[]> => {
  return preloadCriticalImages(urls);
};

export const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (preloadedImages.has(url)) {
      resolve();
      return;
    }

    const img = new Image();
    img.onload = () => {
      preloadedImages.add(url);
      resolve();
    };
    img.onerror = () => {
      reject(new Error(`Failed to preload image: ${url}`));
    };
    img.src = url;
  });
};

export const isImagePreloaded = (url: string): boolean => {
  return preloadedImages.has(url);
};

export const optimizeImage = (url: string, options: OptimizedImageOptions = {}): string => {
  // For now, return the original URL
  // In a real implementation, this would apply optimizations
  return url;
};

export const getOptimizedImage = optimizeImage;

export const getImageMetadata = (url: string): ImageMetadata | null => {
  return imageMetadataCache.get(url) || null;
};

export const setImageMetadata = (url: string, metadata: ImageMetadata): void => {
  imageMetadataCache.set(url, metadata);
};
