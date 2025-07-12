
import { BankImage } from '@/data/imageBank';
import { getOptimizedImage as getOptimizedImageEnhanced } from './images/optimization-enhanced';
import { ImageOptimizationOptions } from './images/types';

interface ImageMetadata {
  id: string;
  alt: string;
  width?: number;
  height?: number;
  category?: string;
  tags?: string[];
}

interface PreloadOptions {
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'png' | 'auto';
  batchSize?: number;
  onComplete?: () => void;
  onError?: (error: any) => void;
}

interface OptimizationOptions {
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'png' | 'auto';
  width?: number;
  height?: number;
}

const imageCache = new Map<string, boolean>();

/**
 * Preloads a single image and resolves when it's loaded or rejects on error.
 */
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (imageCache.has(src)) {
      console.log(`[ImageManager] Image already in cache: ${src}`);
      return resolve();
    }

    const img = new Image();
    img.src = src;

    img.onload = () => {
      imageCache.set(src, true);
      console.log(`[ImageManager] Preloaded image: ${src}`);
      resolve();
    };

    img.onerror = (error) => {
      console.error(`[ImageManager] Failed to preload image: ${src}`, error);
      reject(error);
    };
  });
};

/**
 * Preloads multiple images - alias for compatibility
 */
export const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(urls.map(url => preloadImage(url)));
};

/**
 * Preloads multiple images in batches with a specified batch size and options.
 */
export const preloadImagesByUrls = async (
  imageUrls: string[],
  options: PreloadOptions = {}
): Promise<void> => {
  const { batchSize = 5, quality, format, onComplete, onError } = options;
  const totalImages = imageUrls.length;
  let loadedCount = 0;

  const preloadBatch = async (start: number, end: number) => {
    const batch = imageUrls.slice(start, end);
    const preloadPromises = batch.map(url => {
      // Use getOptimizedImage to ensure the URL is correctly optimized
      const optimizedUrl = getOptimizedImage(url, { quality, format });
      return preloadImage(optimizedUrl);
    });

    try {
      await Promise.all(preloadPromises);
      loadedCount += batch.length;
      console.log(`[ImageManager] Preloaded batch of images: ${start + 1} - ${end} of ${totalImages}`);

      if (loadedCount < totalImages) {
        // Schedule the next batch with a slight delay
        setTimeout(() => {
          preloadBatch(end, Math.min(end + batchSize, totalImages));
        }, 50); // Small delay to prevent blocking the main thread
      } else {
        console.log(`[ImageManager] All critical images preloaded.`);
        onComplete?.();
      }
    } catch (error) {
      console.error(`[ImageManager] Error preloading image batch:`, error);
      onError?.(error);
    }
  };

  console.log(`[ImageManager] Starting preload of ${totalImages} images in batches of ${batchSize}.`);
  preloadBatch(0, Math.min(batchSize, totalImages));
};

/**
 * Preloads critical images based on a category using data from the image bank.
 */
export const preloadCriticalImages = async (
  category: string | string[],
  options: PreloadOptions = {}
): Promise<void> => {
  const { batchSize = 5, quality, format, onComplete, onError } = options;
  let categories = Array.isArray(category) ? category : [category];

  // Dynamically import getImagesByCategory to avoid circular dependency
  const { getImagesByCategory } = await import('@/data/imageBank');

  // Collect all images from specified categories
  let imagesToPreload: BankImage[] = [];
  categories.forEach(cat => {
    imagesToPreload = [...imagesToPreload, ...getImagesByCategory(cat)];
  });

  const totalImages = imagesToPreload.length;
  let loadedCount = 0;

  const preloadBatch = async (start: number, end: number) => {
    const batch = imagesToPreload.slice(start, end);
    const preloadPromises = batch.map(image => {
      // Use getOptimizedImage to ensure the URL is correctly optimized
      const optimizedUrl = getOptimizedImage(image.url, { quality, format });
      return preloadImage(optimizedUrl);
    });

    try {
      await Promise.all(preloadPromises);
      loadedCount += batch.length;
      console.log(`[ImageManager] Preloaded batch of ${category} images: ${start + 1} - ${end} of ${totalImages}`);

      if (loadedCount < totalImages) {
        // Schedule the next batch with a slight delay
        setTimeout(() => {
          preloadBatch(end, Math.min(end + batchSize, totalImages));
        }, 50); // Small delay to prevent blocking the main thread
      } else {
        console.log(`[ImageManager] All critical ${category} images preloaded.`);
        onComplete?.();
      }
    } catch (error) {
      console.error(`[ImageManager] Error preloading ${category} image batch:`, error);
      onError?.(error);
    }
  };

  console.log(`[ImageManager] Starting preload of ${totalImages} ${category} images in batches of ${batchSize}.`);
  preloadBatch(0, Math.min(batchSize, totalImages));
};

/**
 * Checks if an image is already preloaded by checking the imageCache.
 */
export const isImagePreloaded = (src: string): boolean => {
  return imageCache.has(src);
};

/**
 * Gets an image's metadata from the image bank.
 */
export const getImageMetadata = (src: string): ImageMetadata | undefined => {
  try {
    // Dynamically import getImageById to avoid circular dependency
    const { getAllImages } = await import('@/data/imageBank');
    const images = getAllImages();

    const image = images.find(img => img.url === src);
    if (image) {
      return {
        id: image.id,
        alt: image.alt,
        width: image.width,
        height: image.height,
        category: image.category,
        tags: image.tags,
      };
    }
  } catch (error) {
    console.error("Error fetching image metadata:", error);
    return undefined;
  }
};

/**
 * Gets an optimized image URL - simplified to return original URLs
 */
export const getOptimizedImage = (
  url: string,
  options: OptimizationOptions = {}
): string => {
  if (!url) return '';
  
  console.log(`[ImageManager] Processing image URL: ${url}`);
  
  // Return the original URL directly to ensure images load
  return url;
};

/**
 * Alias for getOptimizedImage to maintain compatibility
 */
export const getOptimizedImageUrl = getOptimizedImage;

/**
 * Gets a low quality placeholder URL - simplified to return original URL
 */
export const getLowQualityPlaceholder = (url: string): string => {
  if (!url) return '';
  
  // For now, return the original URL to ensure images load
  return url;
};

export type { ImageMetadata, PreloadOptions, OptimizationOptions };
