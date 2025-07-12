/**
 * imageManager.ts
 * Utilitários para gerenciamento e otimização de imagens
 */

/**
 * Carrega uma imagem de forma assíncrona e retorna uma Promise
 */
export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

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
 * Otimiza a qualidade da imagem usando o Cloudinary
 */
export const optimizeImageQuality = (
  imageUrl: string,
  quality: number = 70
): string => {
  const url = new URL(imageUrl);
  const baseUrl = `https://res.cloudinary.com/${url.hostname}/image/upload/q_${quality},f_auto`;
  const imagePath = url.pathname;
  return `${baseUrl}${imagePath}`;
};

/**
 * Converte a imagem para um formato específico usando o Cloudinary
 */
export const convertImageFormat = (
  imageUrl: string,
  format: 'webp' | 'avif' = 'webp'
): string => {
  const url = new URL(imageUrl);
  const baseUrl = `https://res.cloudinary.com/${url.hostname}/image/upload/f_${format},q_auto`;
  const imagePath = url.pathname;
  return `${baseUrl}${imagePath}`;
};

/**
 * Redimensiona a imagem para uma largura específica usando o Cloudinary
 */
export const resizeImage = (
  imageUrl: string,
  width: number
): string => {
  const url = new URL(imageUrl);
  const baseUrl = `https://res.cloudinary.com/${url.hostname}/image/upload/w_${width},c_scale`;
  const imagePath = url.pathname;
  return `${baseUrl}${imagePath}`;
};

/**
 * Aplica múltiplas transformações do Cloudinary em uma imagem
 */
export const applyCloudinaryTransformations = (
  imageUrl: string,
  transformations: string
): string => {
  const url = new URL(imageUrl);
  const baseUrl = `https://res.cloudinary.com/${url.hostname}/image/upload/${transformations}`;
  const imagePath = url.pathname;
  return `${baseUrl}${imagePath}`;
};

/**
 * Carrega várias imagens em lote para melhor performance
 */
export const preloadImagesInBatch = async (
  imageUrls: string[],
  batchSize: number = 5
): Promise<void[]> => {
  const results: Promise<void>[] = [];
  for (let i = 0; i < imageUrls.length; i += batchSize) {
    const batch = imageUrls.slice(i, i + batchSize);
    const batchPromises = batch.map(url => preloadImage(url));
    results.push(...batchPromises);
    await Promise.all(batchPromises); // Carrega o lote em paralelo
  }
  return Promise.all(results);
};

/**
 * Otimiza e pré-carrega imagens de forma estratégica
 */
export const preloadCriticalImages = async (
  category: 'home' | 'quiz' | 'result' | 'strategic',
  options: { quality?: number; format?: 'webp' | 'avif'; batchSize?: number } = {}
): Promise<void[]> => {
  const { quality = 70, format = 'webp', batchSize = 5 } = options;
  let imageUrls: string[] = [];

  switch (category) {
    case 'home':
      imageUrls = [
        'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_800/v1699010272/quiz-intro-background.jpg',
        'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_800/v1699010272/home-image-2.jpg',
      ];
      break;
    case 'quiz':
      imageUrls = [
        'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_800/v1699010272/question-1-option-1.jpg',
        'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_800/v1699010272/question-1-option-2.jpg',
      ];
      break;
    case 'result':
      imageUrls = [
        'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_800/v1699010272/transformation-before.jpg',
        'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_800/v1699010272/transformation-after.jpg',
      ];
      break;
    case 'strategic':
      imageUrls = [
        'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_800/v1699010272/strategic-image-1.jpg',
        'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_800/v1699010272/strategic-image-2.jpg',
      ];
      break;
    default:
      console.warn(`Categoria de imagem desconhecida: ${category}`);
      return [];
  }

  // Otimizar URLs das imagens
  const optimizedImageUrls = imageUrls.map(url => {
    let optimizedUrl = optimizeImageQuality(url, quality);
    optimizedUrl = convertImageFormat(optimizedUrl, format);
    return optimizedUrl;
  });

  return preloadImagesInBatch(optimizedImageUrls, batchSize);
};

/**
 * Preload multiple images for better user experience
 */
export const preloadImages = (urls: string[]): Promise<void[]> => {
  return Promise.all(
    urls.map(url => preloadImage(url))
  );
};

export default {
  loadImage,
  preloadImage,
  optimizeImageQuality,
  convertImageFormat,
  resizeImage,
  applyCloudinaryTransformations,
  preloadImagesInBatch,
  preloadCriticalImages,
  preloadImages
};
