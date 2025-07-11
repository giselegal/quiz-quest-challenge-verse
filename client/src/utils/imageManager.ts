
// Image management utilities
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadCriticalImages = async (urls: string[]): Promise<void> => {
  try {
    await Promise.all(urls.map(preloadImage));
  } catch (error) {
    console.warn('Failed to preload some images:', error);
  }
};

export const preloadImagesByUrls = async (urls: string[]): Promise<void> => {
  return preloadCriticalImages(urls);
};

export const optimizeImage = async (
  src: string,
  options: { width?: number; height?: number; alt?: string } = {}
): Promise<{ src: string; width?: number; height?: number; alt?: string }> => {
  // Simple optimization - in a real app, this would use a service like Cloudinary
  return {
    src,
    width: options.width,
    height: options.height,
    alt: options.alt
  };
};
