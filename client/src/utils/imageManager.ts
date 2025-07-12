
import { BankImage } from '@/data/imageBank';
import { getOptimizedImage as getOptimizedImageEnhanced } from './images/optimization-enhanced';
import { ImageOptimizationOptions } from './images/types';

// Define a type for the image cache
interface ImageCache {
  [url: string]: boolean;
}

// Initialize the image cache
const imageCache: ImageCache = {};

// Define a function to check if an image is preloaded
export const isImagePreloaded = (url: string): boolean => {
  return !!imageCache[url];
};

// Define a function to set an image as preloaded
export const setImagePreloaded = (url: string): void => {
  imageCache[url] = true;
};

interface OptimizationOptions {
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png' | 'auto';
  width?: number;
  height?: number;
}

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

/**
 * Preloads a single image and resolves when it's loaded
 */
export const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!url) {
      console.warn('[ImageManager] Attempted to preload null URL');
      resolve();
      return;
    }

    if (isImagePreloaded(url)) {
      resolve();
      return;
    }

    const img = new Image();
    img.src = url;

    img.onload = () => {
      setImagePreloaded(url);
      resolve();
    };

    img.onerror = (error) => {
      console.error(`[ImageManager] Failed to preload image: ${url}`, error);
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
 * Preloads multiple images sequentially
 */
export const preloadImagesByUrls = async (
  urls: string[],
  options: {
    quality?: number;
    batchSize?: number;
    format?: 'webp' | 'avif' | 'jpeg' | 'png' | 'auto';
  } = {}
): Promise<void> => {
  const { batchSize = 5 } = options;
  
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    await Promise.all(batch.map(url => preloadImage(url)));
    console.log(`[ImageManager] Preloaded batch of images: ${i + batchSize}/${urls.length}`);
  }
  
  console.log(`[ImageManager] All images preloaded successfully`);
};

/**
 * Preloads images by category from the image bank
 */
export const preloadCriticalImages = async (
  category: string | string[],
  options: {
    quality?: number;
    batchSize?: number;
    format?: 'webp' | 'avif' | 'jpeg' | 'png' | 'auto';
  } = {}
): Promise<void> => {
  const imageUrls: string[] = [];
  
  if (typeof category === 'string') {
    // Load images for a single category
    // const images = imageBank.getImagesByCategory(category);
    // imageUrls.push(...images.map(img => img.url));
  } else if (Array.isArray(category)) {
    // Load images for multiple categories
    // category.forEach(cat => {
    //   const images = imageBank.getImagesByCategory(cat);
    //   imageUrls.push(...images.map(img => img.url));
    // });
  }
  
  // Remove duplicate URLs using Array.from instead of spread operator on Set
  const uniqueImageUrls = Array.from(new Set(imageUrls));
  
  // Preload the unique image URLs
  await preloadImagesByUrls(uniqueImageUrls, options);
};

/**
 * Gets image metadata from the image bank
 */
export const getImageMetadata = (imageUrl: string): BankImage | undefined => {
  // if (!imageUrl) return undefined;

  // // Extract the image ID from the URL
  // const imageId = extractImageIdFromUrl(imageUrl);
  
  // if (imageId) {
  //   // Try to find the image in the image bank by ID
  //   const image = imageBank.getImageById(imageId);
  //   if (image) {
  //     return image;
  //   } else {
  //     console.warn(`[ImageManager] Image metadata not found for ID: ${imageId}`);
  //   }
  // } else {
  //   console.warn(`[ImageManager] Could not extract image ID from URL: ${imageUrl}`);
  // }

  return undefined;
};

/**
 * Extracts the image ID from the URL
 */
const extractImageIdFromUrl = (imageUrl: string): string | undefined => {
  // Define a regular expression to match the image ID in the URL
  const regex = /\/images\/([a-zA-Z0-9-]+)\.(jpg|jpeg|png|webp)$/;
  
  // Execute the regular expression on the URL
  const match = imageUrl.match(regex);
  
  // If a match is found, return the image ID
  if (match && match[1]) {
    return match[1];
  }
  
  // If no match is found, return undefined
  return undefined;
};
