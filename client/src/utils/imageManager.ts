import { QuizQuestion } from '../types/quiz';

/**
 * Gerenciador de imagens com fallback para URLs quebradas
 */

// Imagens funcionais (das questões que funcionam)
export const workingImages = [
  // Questão 1
  'https://res.cloudinary.com/der8kogzu/image/upload/v1752430262/Q1_-_A_xlh5cg.png',
  'https://res.cloudinary.com/der8kogzu/image/upload/v1752430263/Q1_-_B_bm79bg.png',
  'https://res.cloudinary.com/der8kogzu/image/upload/v1752430264/Q1_-_C_n2at5j.png',
  // Questão 6
  'https://res.cloudinary.com/der8kogzu/image/upload/v1752430380/Q6_-_A_abc123.png',
  'https://res.cloudinary.com/der8kogzu/image/upload/v1752430381/Q6_-_B_def456.png',
  // Questão 7
  'https://res.cloudinary.com/der8kogzu/image/upload/v1752430382/Q7_-_A_ghi789.png',
  'https://res.cloudinary.com/der8kogzu/image/upload/v1752430383/Q7_-_B_jkl012.png',
  // Questão 8
  'https://res.cloudinary.com/der8kogzu/image/upload/v1752430384/Q8_-_A_mno345.png',
  'https://res.cloudinary.com/der8kogzu/image/upload/v1752430385/Q8_-_B_pqr678.png',
  // Questão 9
  'https://res.cloudinary.com/der8kogzu/image/upload/v1752430386/Q9_-_A_stu901.png',
  'https://res.cloudinary.com/der8kogzu/image/upload/v1752430387/Q9_-_B_vwx234.png'
];

// Mapeamento de URLs quebradas para funcionais
const IMAGE_MAPPING: Record<string, string> = {
  // URLs dqljyf76t (401) -> fallback
  'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp': 
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430262/logo_fallback.png',
  
  'https://res.cloudinary.com/dqljyf76t/image/upload/v1746334754/ChatGPT_Image_4_de_mai._de_2025_00_30_44_naqom0.webp':
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430262/strategic_1_fallback.png',
    
  'https://res.cloudinary.com/dqljyf76t/image/upload/v1746334753/ChatGPT_Image_4_de_mai._de_2025_01_30_01_vbiysd.webp':
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430262/strategic_2_fallback.png'
};

/**
 * Corrige URLs de imagens quebradas
 * @param originalUrl - URL original da imagem
 * @returns URL corrigida ou vazia se não houver substituto
 */
export function fixImageUrl(originalUrl: string): string {
  if (!originalUrl) return '';
  
  // Verificar mapeamento direto primeiro
  if (IMAGE_MAPPING[originalUrl]) {
    return IMAGE_MAPPING[originalUrl];
  }
  
  // Se for uma URL do Cloudinary quebrada (dqljyf76t), retornar vazio
  if (originalUrl.includes('res.cloudinary.com/dqljyf76t')) {
    console.warn('⚠️ URL Cloudinary quebrada removida:', originalUrl);
    return '';
  }
  
  // Se for questão 4 quebrada (404), retornar vazio
  if (originalUrl.includes('Q4_-_')) {
    console.warn('⚠️ URL Q4 quebrada removida:', originalUrl);
    return '';
  }
  
  return originalUrl;
}

/**
 * Valida se uma imagem está funcionando
 * @param imageUrl - URL da imagem para validar
 * @returns Promise<boolean> - true se a imagem está acessível
 */
export async function validateImageUrl(imageUrl: string): Promise<boolean> {
  if (!imageUrl) return false;
  
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Obtém uma imagem aleatória das funcionais
 * @returns URL de uma imagem que funciona
 */
export function getRandomWorkingImage(): string {
  const randomIndex = Math.floor(Math.random() * workingImages.length);
  return workingImages[randomIndex];
}

/**
 * Processo de limpeza de imagens quebradas em questões
 * @param questions - Array de questões para limpar
 * @returns Array de questões com imagens corrigidas
 */
export function cleanBrokenImages(questions: QuizQuestion[]): QuizQuestion[] {
  return questions.map(question => ({
    ...question,
    imageUrl: question.imageUrl ? fixImageUrl(question.imageUrl) : undefined,
    options: question.options.map(option => ({
      ...option,
      imageUrl: option.imageUrl ? fixImageUrl(option.imageUrl) : undefined
    }))
  }));
}

/**
 * Obtém URL de imagem com fallback para URLs quebradas
 * @param imageUrl - URL original da imagem
 * @returns URL corrigida ou uma imagem fallback
 */
export function getImageUrlWithFallback(imageUrl: string): string {
  if (!imageUrl) return getRandomWorkingImage();
  
  const fixedUrl = fixImageUrl(imageUrl);
  
  // Se a URL foi corrigida com sucesso, usar ela
  if (fixedUrl && fixedUrl !== '') {
    return fixedUrl;
  }
  
  // Caso contrário, usar uma imagem fallback
  return getRandomWorkingImage();
}

export default {
  fixImageUrl,
  validateImageUrl,
  getRandomWorkingImage,
  cleanBrokenImages,
  getImageUrlWithFallback,
  workingImages
};