/**
 * ImageKit service for optimized image delivery
 */

export const imageKitConfig = {
  publicKey: "public_aefgGxZYG6EbJCM3mnwW7cw/r0g=",
  urlEndpoint: "https://ik.imagekit.io/1wxfl3468",
  transformationPosition: "path" as const,
  authenticationEndpoint: "http://www.yourserver.com/auth",
};

/**
 * Maps Cloudinary URLs to ImageKit paths
 */
export const mapCloudinaryToImageKit = (cloudinaryUrl: string): string => {
  // Extract filename from Cloudinary URL
  const match = cloudinaryUrl.match(/\/([^\/]+\.(jpg|jpeg|png|webp))$/i);
  if (!match) {
    console.warn('Could not extract filename from URL:', cloudinaryUrl);
    return '/default-image.jpg';
  }
  
  const filename = match[1];
  
  // Map specific known files
  const mappings: Record<string, string> = {
    'LOGO_DA_MARCA_GISELE_r14oz2.webp': '/logo.webp',
    '4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.jpg': '/hero-image.jpg',
    '20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.jpg': '/hero-image.jpg',
    '2_ziffwx.webp': '/style-natural.webp',
    '12_edlmwf.webp': '/style-classic.webp',
    '13_uvbciq.webp': '/style-contemporary.webp',
    '14_l2nprc.webp': '/style-elegant.webp',
    '6_gnoxfg.webp': '/style-romantic.webp',
    '7_ynez1z.webp': '/style-sexy.webp',
    '8_yqu3hw.webp': '/style-dramatic.webp',
    '9_x6so6a.webp': '/style-creative.webp',
    'GUIA_NATURAL_fzp6fc.webp': '/guide-natural.webp',
    'GUIA_CLÁSSICO_ux1yhf.webp': '/guide-classic.webp',
    'GUIA_CONTEMPORÂNEO_vcklxe.webp': '/guide-contemporary.webp',
    'GUIA_ELEGANTE_asez1q.webp': '/guide-elegant.webp',
    'GUIA_ROMÂNTICO_ci4hgk.webp': '/guide-romantic.webp',
    'GUIA_SEXY_t5x2ov.webp': '/guide-sexy.webp',
    'GUIA_DRAMÁTICO_mpn60d.webp': '/guide-dramatic.webp',
    'GUIA_CRIATIVO_ntbzph.webp': '/guide-creative.webp',
    'Espanhol_Portugu%C3%AAs_9_mgkdnb.webp': '/problem-image.webp',
    'Espanhol_Portugu%C3%AAs_5_cptzyb.webp': '/solution-quiz-image.webp',
    'Espanhol_Portugu%C3%AAs_8_cgrhuw.webp': '/guides-benefits-image.webp',
    'Espanhol_Portugu%C3%AAs_6_y4kqao.webp': '/bonus-key-pieces.webp',
    'Espanhol_Portugu%C3%AAs_7_eqgdqz.webp': '/bonus-visagism.webp',
    'Garantia_7_dias_j8mxth.webp': '/guarantee-7-days.webp',
  };
  
  return mappings[filename] || `/images/${filename}`;
};

/**
 * Gets optimized ImageKit URL with transformations
 */
export const getOptimizedImageKitUrl = (
  path: string,
  transformations?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
  }
): string => {
  const { urlEndpoint } = imageKitConfig;
  
  if (!transformations) {
    return `${urlEndpoint}${path}`;
  }
  
  const { width, height, quality = 80, format = 'auto' } = transformations;
  
  let transformationString = '';
  const params: string[] = [];
  
  if (width) params.push(`w-${width}`);
  if (height) params.push(`h-${height}`);
  if (quality) params.push(`q-${quality}`);
  if (format) params.push(`f-${format}`);
  
  if (params.length > 0) {
    transformationString = `/tr:${params.join(',')}`;
  }
  
  return `${urlEndpoint}${transformationString}${path}`;
};

/**
 * Converts Cloudinary URL to optimized ImageKit URL
 */
export const convertToImageKit = (
  cloudinaryUrl: string,
  transformations?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
  }
): string => {
  const path = mapCloudinaryToImageKit(cloudinaryUrl);
  return getOptimizedImageKitUrl(path, transformations);
};