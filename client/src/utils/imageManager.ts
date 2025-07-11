
export interface OptimizedImageOptions {
  quality?: number;
  width?: number;
  height?: number;
}

export interface ImageMetadata {
  width?: number;
  height?: number;
  title?: string;
}

export const isImagePreloaded = (url: string): boolean => {
  return false;
};

export const getOptimizedImage = (url: string, options: OptimizedImageOptions = {}): string => {
  return url;
};

export const getImageMetadata = (url: string): ImageMetadata | null => {
  return {
    width: 400,
    height: 300,
    title: 'Image'
  };
};
