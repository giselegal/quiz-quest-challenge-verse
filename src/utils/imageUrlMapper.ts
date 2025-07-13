/**
 * Maps all Cloudinary URLs to ImageKit paths
 * This provides a centralized mapping for all image replacements
 */

export const imageUrlMappings: Record<string, string> = {
  // Logo
  'LOGO_DA_MARCA_GISELE_r14oz2.webp': '/logo.webp',
  
  // Hero images
  '4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.jpg': '/hero-image.jpg',
  
  // Style images for quiz options
  '11_hqmr8l.webp': '/quiz/option-11.webp',
  '12_edlmwf.webp': '/quiz/option-12.webp',
  '4_snhaym.webp': '/quiz/option-4.webp',
  '14_l2nprc.webp': '/quiz/option-14.webp',
  '15_xezvcy.webp': '/quiz/option-15.webp',
  '16_mpqpew.webp': '/quiz/option-16.webp',
  '17_m5ogub.webp': '/quiz/option-17.webp',
  '18_j8ipfb.webp': '/quiz/option-18.webp',
  
  // More quiz options
  '19_rjqvkm.webp': '/quiz/option-19.webp',
  '20_dklsiu.webp': '/quiz/option-20.webp',
  '21_fjsalk.webp': '/quiz/option-21.webp',
  '22_slkdja.webp': '/quiz/option-22.webp',
  '23_lskjfd.webp': '/quiz/option-23.webp',
  '24_mslkdf.webp': '/quiz/option-24.webp',
  '25_nslkjd.webp': '/quiz/option-25.webp',
  '26_pslkjf.webp': '/quiz/option-26.webp',
  
  // Style result images
  '2_ziffwx.webp': '/style-natural.webp',
  '6_gnoxfg.webp': '/style-romantic.webp',
  '7_ynez1z.webp': '/style-sexy.webp',
  '8_yqu3hw.webp': '/style-dramatic.webp',
  '9_x6so6a.webp': '/style-creative.webp',
  '13_uvbciq.webp': '/style-contemporary.webp',
  
  // Guide images
  'GUIA_NATURAL_fzp6fc.webp': '/guide-natural.webp',
  'GUIA_CLÁSSICO_ux1yhf.webp': '/guide-classic.webp',
  'GUIA_CONTEMPORÂNEO_vcklxe.webp': '/guide-contemporary.webp',
  'GUIA_ELEGANTE_asez1q.webp': '/guide-elegant.webp',
  'GUIA_ROMÂNTICO_ci4hgk.webp': '/guide-romantic.webp',
  'GUIA_SEXY_t5x2ov.webp': '/guide-sexy.webp',
  'GUIA_DRAMÁTICO_mpn60d.webp': '/guide-dramatic.webp',
  'GUIA_CRIATIVO_ntbzph.webp': '/guide-creative.webp',
  
  // Mockup images
  'MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp': '/mockup-tablet-guide.webp',
  'oie_1_gcozz9.webp': '/mockup-quiz-complete.webp',
  'Espanhol_Português_8_cgrhuw.webp': '/mockup-bonus-complete.webp',
  'MOCKUPS_12_w8fwrn.webp': '/mockup-key-pieces.webp',
  'MOCKUPS_10_-_Copia_bvoccn.webp': '/mockup-visagism.webp',
  'MOCKUPS_15_-_Copia_grstwl.webp': '/mockup-transformation.webp',
  
  // Strategic images
  'Passo_5_Peças_chaves_Documento_A4_lxmekf.webp': '/strategic-key-pieces.webp',
  'Captura_de_tela_2025-03-31_034324_pmdn8y.webp': '/strategic-screenshot.webp',
  
  // Problem/solution images
  'Espanhol_Português_9_mgkdnb.webp': '/problem-section.webp',
  'Espanhol_Português_5_cptzyb.webp': '/solution-quiz.webp',
  'Espanhol_Português_6_y4kqao.webp': '/bonus-key-pieces.webp',
  'Espanhol_Português_7_eqgdqz.webp': '/bonus-visagism.webp',
  
  // Guarantee
  'Garantia_7_dias_j8mxth.webp': '/guarantee-7-days.webp',
};

/**
 * Replaces Cloudinary URLs with ImageKit paths
 */
export const replaceImageUrl = (cloudinaryUrl: string): string => {
  // If it's not a Cloudinary URL, return as is
  if (!cloudinaryUrl.includes('cloudinary.com')) {
    return cloudinaryUrl;
  }
  
  // Extract filename from URL
  const match = cloudinaryUrl.match(/\/([^\/]+\.(jpg|jpeg|png|webp))$/i);
  if (!match) {
    console.warn('Could not extract filename from URL:', cloudinaryUrl);
    return '/default-image.jpg';
  }
  
  const filename = match[1];
  const decodedFilename = decodeURIComponent(filename);
  
  // Check mappings
  const mappedPath = imageUrlMappings[filename] || imageUrlMappings[decodedFilename];
  
  if (mappedPath) {
    return mappedPath;
  }
  
  // Default fallback
  console.warn('No mapping found for image:', filename);
  return `/images/${filename}`;
};

/**
 * Batch replace multiple URLs
 */
export const replaceImageUrls = (urls: string[]): string[] => {
  return urls.map(replaceImageUrl);
};