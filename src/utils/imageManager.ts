
/**
 * imageManager.ts
 * Utilitários para gerenciamento e otimização de imagens
 */

// URLs das novas imagens funcionais do Cloudinary (der8kogzu)
export const workingImages = {
  // Logo e introdução
  logo: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430327/LOGO_DA_MARCA_GISELE_l78gin.png',
  introBg: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752443943/Gemini_Generated_Image_i5cst6i5cst6i5cs_fpoukb.png',
  
  // Antes e depois
  beforeAfter1: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430348/MARIANGELA_-_ANTES_E_DEPOIS_ipuoap.png',
  beforeAfter2: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430335/ADRIANA-_ANTES_E_DEPOIS_ttgifc.png',
  
  // Depoimentos
  testimonial1: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430304/DEPOIMENTO_COM_IMAGEM_-_S?NIA_q0g9cq.png',
  testimonial2: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430304/DEPOIMENTO_COM_IMAGEM_-_PATR?CIA_x0mhud.png',
  testimonial3: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430304/DEPOIMENTO_COM_IMAGEM_-_MARIANGELA_sj7lki.png',
  
  // Questão 1
  q1: [
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430262/Q1_-_A_xlh5cg.png',
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430263/Q1_-_B_bm79bg.png',
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430262/Q1_-_C_n2at5j.png',
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430264/Q1_-_D_psbhs9.png',
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430272/Q1_-_E_pwhukq.png',
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430272/Q1_-_F_z1nyug.png',
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430268/Q1_-_G_zgy8mq.png',
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430269/Q1_-_H_dqhkzv.png'
  ],
  
  // Questão 2
  q2: [
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430272/Q3_-_A_plsfwp.png',
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430270/Q3_-_B_w75tyg.png',
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430270/Q3_-_C_ep9x9h.png',
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430271/Q3_-_D_xxra9m.png',
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430278/Q3_-_E_lr9p2d.png',
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430280/Q3_-_F_amdr7l.png',
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430279/Q3_-_G_zod0w5.png',
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430276/Q3_-_H_aghfg8.png'
  ],
  
  // Questão 4
  q4: [
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430276/Q4_-_A_k6gvtc.png',
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430277/Q4_-_B_a1emi6.png',
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430277/Q4_-_C_ywcxcx.png',
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430277/Q4_-_D_y7u29d.png',
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430277/Q4_-_E_gnuvl3.png',
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430291/Q4_-_F_lzrw2j.png',
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430289/Q4_-_G_vr81is.png',
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430290/Q4_-_H_yjbt0s.png'
  ]
};

// Imagens de fallback para cada tipo de etapa
export const fallbackImages = {
  default: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI0Y3RjJFOSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNCODlCN0EiPkltYWdlbSBOw6NvIERpc3BvbsOtdmVsPC90ZXh0Pjwvc3ZnPg==',
  logo: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430327/LOGO_DA_MARCA_GISELE_l78gin.png',
  quiz_intro: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752443943/Gemini_Generated_Image_i5cst6i5cst6i5cs_fpoukb.png'
};

// Mapeamento de URLs quebradas para URLs funcionais
export const brokenToWorkingImageMap: Record<string, string> = {
  // Questão 1 - mapear imagens numeradas antigas para novas
  '14_l2nprc.webp': workingImages.q1[0],
  '4_snhaym.webp': workingImages.q1[1], 
  '15_xezvcy.webp': workingImages.q1[2],
  '16_mpqpew.webp': workingImages.q1[3],
  '11_hqmr8l.webp': workingImages.q1[4],
  '12_edlmwf.webp': workingImages.q1[5],
  '18_j8ipfb.webp': workingImages.q1[6],
  '17_m5ogub.webp': workingImages.q1[7],
  
  // Questão 2
  '2_ziffwx.webp': workingImages.q2[0],
  '5_dhrgpf.webp': workingImages.q2[1],
  '9_x6so6a.webp': workingImages.q2[2],
  '7_ynez1z.webp': workingImages.q2[3],
  '13_uvbciq.webp': workingImages.q2[4],
  '3_asaunw.webp': workingImages.q2[5],
  '6_gnoxfg.webp': workingImages.q2[6],
  '8_yqu3hw.webp': workingImages.q2[7],
  
  // Questões mais avançadas
  '20_oh44vh.webp': workingImages.q4[0],
  '21_o7wkte.webp': workingImages.q4[1],
  '26_dptanw.webp': workingImages.q4[2],
  '23_bdfxrh.webp': workingImages.q4[3],
  '22_siebw2.webp': workingImages.q4[4],
  '24_nptszu.webp': workingImages.q4[5],
  '25_motk6b.webp': workingImages.q4[6],
  '27_wxmklx.webp': workingImages.q4[7],
  
  // Logo
  'logo.webp': workingImages.logo,
  'LOGO_DA_MARCA_GISELE': workingImages.logo
};

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
 * Preload de uma única imagem com fallback automático
 */
export const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = getImageUrlWithFallback(url);
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
 * Preload multiple images by URLs with options - added to match client version
 */
export const preloadImagesByUrls = (urls: string[], options?: { quality?: number; batchSize?: number }): Promise<void[]> => {
  return preloadImages(urls);
};

/**
 * Função inteligente para obter URL de imagem com fallback automático
 */
export const getImageUrlWithFallback = (originalUrl: string, fallbackType?: keyof typeof fallbackImages): string => {
  // Se a URL original estiver vazia, usar fallback
  if (!originalUrl) {
    return fallbackType ? fallbackImages[fallbackType] : fallbackImages.quiz_intro;
  }

  // Se a URL contém o domínio antigo problemático (dqljyf76t), tentar mapear para nova URL
  if (originalUrl.includes('dqljyf76t')) {
    // Extrair o nome do arquivo da URL antiga
    const filename = originalUrl.split('/').pop()?.split('_')[0];
    if (filename && brokenToWorkingImageMap[filename]) {
      return brokenToWorkingImageMap[filename];
    }
    
    // Tentar mapear por padrão de nome
    for (const [key, value] of Object.entries(brokenToWorkingImageMap)) {
      if (originalUrl.includes(key)) {
        return value;
      }
    }
    
    // Se não conseguir mapear, usar fallback baseado no tipo ou padrão
    return fallbackType ? fallbackImages[fallbackType] : fallbackImages.quiz_intro;
  }

  // Se a URL já é do novo domínio (der8kogzu), mantê-la
  if (originalUrl.includes('der8kogzu')) {
    return originalUrl;
  }

  // Para qualquer outra URL, tentar usar como está ou fallback
  return originalUrl || (fallbackType ? fallbackImages[fallbackType] : fallbackImages.quiz_intro);
};

/**
 * Otimiza a qualidade da imagem usando o Cloudinary
 */
export const optimizeImageQuality = (
  imageUrl: string,
  quality: number = 70
): string => {
  // If it's a relative path or ImageKit URL, return as is
  if (!imageUrl.includes('cloudinary.com') || imageUrl.startsWith('/')) {
    return imageUrl;
  }
  
  try {
    const url = new URL(imageUrl);
    const baseUrl = `https://res.cloudinary.com/${url.hostname}/image/upload/q_${quality},f_auto`;
    const imagePath = url.pathname;
    return `${baseUrl}${imagePath}`;
  } catch (error) {
    console.warn('Failed to optimize image URL:', imageUrl, error);
    return imageUrl;
  }
};

/**
 * Converte a imagem para um formato específico usando o Cloudinary
 */
export const convertImageFormat = (
  imageUrl: string,
  format: 'webp' | 'avif' = 'webp'
): string => {
  // If it's a relative path or ImageKit URL, return as is
  if (!imageUrl.includes('cloudinary.com') || imageUrl.startsWith('/')) {
    return imageUrl;
  }
  
  try {
    const url = new URL(imageUrl);
    const baseUrl = `https://res.cloudinary.com/${url.hostname}/image/upload/f_${format},q_auto`;
    const imagePath = url.pathname;
    return `${baseUrl}${imagePath}`;
  } catch (error) {
    console.warn('Failed to convert image format:', imageUrl, error);
    return imageUrl;
  }
};

/**
 * Redimensiona a imagem para uma largura específica usando o Cloudinary
 */
export const resizeImage = (
  imageUrl: string,
  width: number
): string => {
  // If it's a relative path or ImageKit URL, return as is
  if (!imageUrl.includes('cloudinary.com') || imageUrl.startsWith('/')) {
    return imageUrl;
  }
  
  try {
    const url = new URL(imageUrl);
    const baseUrl = `https://res.cloudinary.com/${url.hostname}/image/upload/w_${width},c_scale`;
    const imagePath = url.pathname;
    return `${baseUrl}${imagePath}`;
  } catch (error) {
    console.warn('Failed to resize image:', imageUrl, error);
    return imageUrl;
  }
};

/**
 * Aplica múltiplas transformações do Cloudinary em uma imagem
 */
export const applyCloudinaryTransformations = (
  imageUrl: string,
  transformations: string
): string => {
  // If it's a relative path or ImageKit URL, return as is
  if (!imageUrl.includes('cloudinary.com') || imageUrl.startsWith('/')) {
    return imageUrl;
  }
  
  try {
    const url = new URL(imageUrl);
    const baseUrl = `https://res.cloudinary.com/${url.hostname}/image/upload/${transformations}`;
    const imagePath = url.pathname;
    return `${baseUrl}${imagePath}`;
  } catch (error) {
    console.warn('Failed to apply transformations:', imageUrl, error);
    return imageUrl;
  }
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
  category: 'home' | 'quiz' | 'result' | 'strategic' | string[],
  options: { quality?: number; format?: 'webp' | 'avif'; batchSize?: number } = {}
): Promise<void[]> => {
  const { quality = 70, format = 'webp', batchSize = 5 } = options;
  let imageUrls: string[] = [];

  if (Array.isArray(category)) {
    // If category is an array, treat it as URLs
    imageUrls = category;
  } else {
    switch (category) {
      case 'home':
        imageUrls = [workingImages.logo, workingImages.introBg];
        break;
      case 'quiz':
        imageUrls = [...workingImages.q1, ...workingImages.q2];
        break;
      case 'result':
        imageUrls = [...workingImages.q2, ...workingImages.q4];
        break;
      case 'strategic':
        imageUrls = getRandomStrategicImages(4);
        break;
      default:
        console.warn(`Categoria de imagem desconhecida: ${category}`);
        return [];
    }
  }

  // Aplicar fallback a URLs que possam estar quebradas
  const validImageUrls = imageUrls.map(url => getImageUrlWithFallback(url));

  return preloadImagesInBatch(validImageUrls, batchSize);
};

// Função auxiliar para obter imagens estratégicas aleatórias
function getRandomStrategicImages(count: number): string[] {
  const allStrategicImages = [
    ...workingImages.q1,
    ...workingImages.q2,
    ...workingImages.q4
  ];
  
  const shuffled = [...allStrategicImages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Função para obter imagens de uma questão específica
export function getQuestionImages(questionNumber: number): string[] {
  const images = workingImages[`q${questionNumber}` as keyof typeof workingImages];
  if (Array.isArray(images)) {
    return images;
  }
  return [];
}

// Função para obter uma imagem aleatória estratégica
export function getRandomStrategicImage(): string {
  const randomImages = getRandomStrategicImages(1);
  return randomImages[0] || fallbackImages.default;
}

export default {
  loadImage,
  preloadImage,
  preloadImages,
  preloadImagesByUrls,
  optimizeImageQuality,
  convertImageFormat,
  resizeImage,
  applyCloudinaryTransformations,
  preloadImagesInBatch,
  preloadCriticalImages,
  getImageUrlWithFallback,
  getQuestionImages,
  getRandomStrategicImage
};
