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
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Falha ao carregar a imagem em ${url}`));
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
