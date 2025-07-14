
interface ImageMetadata {
  width?: number;
  height?: number;
  alt?: string;
  loaded?: boolean;
}

const imageCache = new Map<string, ImageMetadata>();

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      imageCache.set(src, {
        width: img.naturalWidth,
        height: img.naturalHeight,
        loaded: true,
        alt: `Image ${src}`
      });
      resolve();
    };
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = (urls: string[]): Promise<void[]> => {
  return Promise.all(urls.map(preloadImage));
};

export const getOptimizedImageUrl = (src: string, options?: { width?: number; height?: number; quality?: number; format?: string }): string => {
  // Simple implementation - in a real app, this would handle Cloudinary transformations
  return src;
};

export const getLowQualityPlaceholder = (src: string): string => {
  // Simple implementation - in a real app, this would generate a low-quality placeholder
  return src;
};

export const preloadCriticalImages = (urls: string[]): Promise<void[]> => {
  return preloadImages(urls);
};

export const preloadImagesByUrls = (urls: string[]): Promise<void[]> => {
  return preloadImages(urls);
};

export const getImageMetadata = (src: string): ImageMetadata => {
  return imageCache.get(src) || { width: undefined, height: undefined, alt: undefined, loaded: false };
};

export const isImagePreloaded = (src: string): boolean => {
  const metadata = imageCache.get(src);
  return metadata?.loaded || false;
};

export const getOptimizedImage = (src: string, options?: { width?: number; height?: number; quality?: number; format?: string }): string => {
  return getOptimizedImageUrl(src, options);
};
