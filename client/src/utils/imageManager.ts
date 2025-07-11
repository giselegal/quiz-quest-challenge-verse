
export interface ImageMetadata {
  alt?: string;
  width?: number;
  height?: number;
  title?: string;
}

export interface OptimizationOptions {
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'auto';
  width?: number;
  height?: number;
  batchSize?: number;
}

const imageBank: Record<string, ImageMetadata> = {
  'sapatos-1.jpg': { alt: 'Sapatos elegantes', width: 400, height: 400 },
  'sapatos-2.jpg': { alt: 'Sapatos casuais', width: 400, height: 400 },
  // Add more as needed
};

export const getImageMetadata = (url: string): ImageMetadata | undefined => {
  const filename = url.split('/').pop();
  return filename ? imageBank[filename] : undefined;
};

export const getOptimizedImage = (url: string, options: OptimizationOptions = {}): string => {
  if (!url) return '';
  
  const { quality = 80, format, width, height } = options;
  
  // For Cloudinary URLs, add optimization parameters
  if (url.includes('cloudinary.com')) {
    const baseUrl = url.split('/upload/')[0] + '/upload/';
    const imagePath = url.split('/upload/')[1];
    
    let transformations = [];
    
    if (quality !== 80) transformations.push(`q_${quality}`);
    if (format && format !== 'auto') transformations.push(`f_${format}`);
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    
    const transformString = transformations.length > 0 ? transformations.join(',') + '/' : '';
    
    return `${baseUrl}${transformString}${imagePath}`;
  }
  
  return url;
};

export const getOptimizedImageUrl = getOptimizedImage; // Alias for backward compatibility

export const getLowQualityPlaceholder = (url: string): string => {
  return getOptimizedImage(url, { quality: 10, width: 50 });
};

export const isImagePreloaded = (url: string): boolean => {
  // Simple check - in a real app this would check browser cache
  return false;
};

export const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = url;
  });
};

// Add missing preload functions
export const preloadCriticalImages = async (categories: string | string[], options: OptimizationOptions = {}): Promise<void> => {
  // Mock implementation - in real app would preload based on categories
  console.log('Preloading critical images for categories:', categories, 'with options:', options);
  return Promise.resolve();
};

export const preloadImagesByUrls = async (urls: string[], options: OptimizationOptions = {}): Promise<void> => {
  console.log('Preloading images by URLs:', urls, 'with options:', options);
  const promises = urls.map(url => preloadImage(getOptimizedImage(url, options)));
  await Promise.allSettled(promises);
};
