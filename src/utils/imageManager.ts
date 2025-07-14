
/**
 * imageManager.ts
 * Utilitários para gerenciamento e otimização de imagens
 */

// URLs das novas imagens funcionais do Cloudinary (der8kogzu)
export const workingImages = {
  // Etapa 1 - Quiz Introduction
  etapa1_quiz_introduction: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa1_quiz_introduction_kgmspp",
  
  // Etapa 2 - Personal Information
  etapa2_personal_information: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa2_personal_information_mgrxl4",
  
  // Etapa 3 - Learning Style
  etapa3_learning_style: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa3_learning_style_dgz2ai",
  
  // Etapa 4 - Experience Level
  etapa4_experience_level: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa4_experience_level_bpmmbw",
  
  // Etapa 5 - Course Preferences
  etapa5_course_preferences: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa5_course_preferences_hjt8cu",
  
  // Etapa 6 - Study Goals
  etapa6_study_goals: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa6_study_goals_sqxbgi",
  
  // Etapa 7 - Time Availability
  etapa7_time_availability: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa7_time_availability_azjrte",
  
  // Etapa 8 - Budget Range
  etapa8_budget_range: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa8_budget_range_enwdmk",
  
  // Etapa 9 - Motivations
  etapa9_motivations: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa9_motivations_cjgvdx",
  
  // Etapa 10 - Challenge Areas
  etapa10_challenge_areas: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa10_challenge_areas_mgcazq",
  
  // Etapa 11 - Learning Environment
  etapa11_learning_environment: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa11_learning_environment_s8ql8w",
  
  // Etapa 12 - Success Metrics
  etapa12_success_metrics: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa12_success_metrics_phafdr",
  
  // Etapa 13 - Progress Tracking
  etapa13_progress_tracking: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa13_progress_tracking_b0mbuu",
  
  // Etapa 14 - Support Preferences
  etapa14_support_preferences: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa14_support_preferences_thozfn",
  
  // Etapa 15 - Technology Comfort
  etapa15_technology_comfort: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa15_technology_comfort_uvkvwx",
  
  // Etapa 16 - Career Goals
  etapa16_career_goals: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa16_career_goals_cyjk1t",
  
  // Etapa 17 - Previous Education
  etapa17_previous_education: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa17_previous_education_pxltbx",
  
  // Etapa 18 - Feedback Style
  etapa18_feedback_style: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa18_feedback_style_e2nkmj",
  
  // Etapa 19 - Final Preferences
  etapa19_final_preferences: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa19_final_preferences_pbmgqn",
  
  // Etapa 20 - Results
  etapa20_results: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa20_results_hmhfpl"
};

// Imagens de fallback para cada tipo de etapa
export const fallbackImages = {
  quiz_intro: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa1_quiz_introduction_kgmspp",
  personal_info: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa2_personal_information_mgrxl4",
  learning_style: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa3_learning_style_dgz2ai",
  experience: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa4_experience_level_bpmmbw",
  preferences: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa5_course_preferences_hjt8cu",
  goals: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa6_study_goals_sqxbgi",
  time: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa7_time_availability_azjrte",
  budget: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa8_budget_range_enwdmk",
  motivations: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa9_motivations_cjgvdx",
  challenges: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa10_challenge_areas_mgcazq",
  environment: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa11_learning_environment_s8ql8w",
  metrics: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa12_success_metrics_phafdr",
  tracking: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa13_progress_tracking_b0mbuu",
  support: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa14_support_preferences_thozfn",
  technology: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa15_technology_comfort_uvkvwx",
  career: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa16_career_goals_cyjk1t",
  education: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa17_previous_education_pxltbx",
  feedback: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa18_feedback_style_e2nkmj",
  final: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa19_final_preferences_pbmgqn",
  results: "https://res.cloudinary.com/der8kogzu/image/upload/v1/quiz-quest/etapa20_results_hmhfpl"
};

// Mapeamento de URLs quebradas para URLs funcionais
export const brokenToWorkingImageMap: Record<string, string> = {
  // Mapear URLs antigas quebradas para novas funcionais por nome do arquivo
  'etapa1_quiz_introduction': workingImages.etapa1_quiz_introduction,
  'etapa2_personal_information': workingImages.etapa2_personal_information,
  'etapa3_learning_style': workingImages.etapa3_learning_style,
  'etapa4_experience_level': workingImages.etapa4_experience_level,
  'etapa5_course_preferences': workingImages.etapa5_course_preferences,
  'etapa6_study_goals': workingImages.etapa6_study_goals,
  'etapa7_time_availability': workingImages.etapa7_time_availability,
  'etapa8_budget_range': workingImages.etapa8_budget_range,
  'etapa9_motivations': workingImages.etapa9_motivations,
  'etapa10_challenge_areas': workingImages.etapa10_challenge_areas,
  'etapa11_learning_environment': workingImages.etapa11_learning_environment,
  'etapa12_success_metrics': workingImages.etapa12_success_metrics,
  'etapa13_progress_tracking': workingImages.etapa13_progress_tracking,
  'etapa14_support_preferences': workingImages.etapa14_support_preferences,
  'etapa15_technology_comfort': workingImages.etapa15_technology_comfort,
  'etapa16_career_goals': workingImages.etapa16_career_goals,
  'etapa17_previous_education': workingImages.etapa17_previous_education,
  'etapa18_feedback_style': workingImages.etapa18_feedback_style,
  'etapa19_final_preferences': workingImages.etapa19_final_preferences,
  'etapa20_results': workingImages.etapa20_results
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
  }

  // Otimizar URLs das imagens
  const optimizedImageUrls = imageUrls.map(url => {
    let optimizedUrl = optimizeImageQuality(url, quality);
    optimizedUrl = convertImageFormat(optimizedUrl, format);
    return optimizedUrl;
  });

  return preloadImagesInBatch(optimizedImageUrls, batchSize);
};

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
  preloadCriticalImages
};
