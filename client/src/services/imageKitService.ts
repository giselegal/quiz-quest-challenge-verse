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
  
  // Map specific known files - Usando paths diretos do ImageKit
  const mappings: Record<string, string> = {
    // Imagens principais - compatibilidade
    'LOGO_DA_MARCA_GISELE_r14oz2.webp': '/Estilos%20Universais%20Quiz/LOGO%20DA%20MARCA%20GISELE.png',
    '4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.jpg': '/Estilos%20Universais%20Quiz/GISELE-GALV%C3%83O-POSE-ACESSIBILIDADE.jpg',
    '20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.jpg': '/Estilos%20Universais%20Quiz/GISELE-GALV%C3%83O-POSE-ACESSIBILIDADE.jpg',
    
    // Guias de Estilo
    'GUIA_NATURAL_fzp6fc.webp': '/Estilos%20Universais%20Quiz/GUIA%20NATURAL.png',
    'GUIA_CLÁSSICO_ux1yhf.webp': '/Estilos%20Universais%20Quiz/GUIA%20CL%C3%81SSICO.png',
    'GUIA_CONTEMPORÂNEO_vcklxe.webp': '/Estilos%20Universais%20Quiz/GUIA%20CONTEMPOR%C3%82NEO.png',
    'GUIA_ELEGANTE_asez1q.webp': '/Estilos%20Universais%20Quiz/GUIA%20ELEGANTE.png',
    'GUIA_ROMÂNTICO_ci4hgk.webp': '/Estilos%20Universais%20Quiz/GUIA%20ROM%C3%82NTICO.png',
    'GUIA_SEXY_t5x2ov.webp': '/Estilos%20Universais%20Quiz/GUIA%20SEXY.png',
    'GUIA_DRAMÁTICO_mpn60d.webp': '/Estilos%20Universais%20Quiz/GUIA%20DRAM%C3%81TICO.png',
    'GUIA_CRIATIVO_ntbzph.webp': '/Estilos%20Universais%20Quiz/GUIA%20CRIATIVO.png',
    
    // Imagens antigas da página de vendas - mapeamento para novas imagens
    'Espanhol_Portugu%C3%AAs_9_mgkdnb.webp': '/Estilos%20Universais%20Quiz/MULHER%20SEM%20ESTILO%20E%20PERDIDA_HH_0TRK1A',
    'Espanhol_Portugu%C3%AAs_5_cptzyb.webp': '/Estilos%20Universais%20Quiz/IMAGEM%208%20ESTILOS%20UNIVERSAIS_Sd9XfgcdH',
    'Espanhol_Portugu%C3%AAs_8_cgrhuw.webp': '/Estilos%20Universais%20Quiz/MOCKUPS%20IMAGENS%20DO%20GUIA%20DE%20ESILOS',
    'Espanhol_Portugu%C3%AAs_6_y4kqao.webp': '/Estilos%20Universais%20Quiz/PE%C3%87AS%20-%20CHAVE%20DO%20GUARDA-ROUPA%20DE%20SUCESSO%20-%20REVISTA%20-%20%20B%C3%94NUS%201',
    'Espanhol_Portugu%C3%AAs_7_eqgdqz.webp': '/Estilos%20Universais%20Quiz/PE%C3%87AS%20-%20CHAVE%20DO%20GUARDA-ROUPA%20DE%20SUCESSO%20-%20IMAGENS%20CELULAR%20-%20GUIA%20VISAGISMO%20-%20B%C3%94NUS%201',
    'Garantia_7_dias_j8mxth.webp': '/Estilos%20Universais%20Quiz/C%C3%B3pia%20de%2001.%20_P%C3%A1gina$$_%20-%20Produto%20de%20Entrada%20%20(1080%20x%201000%20px)%20(1).png',
    
    // Estilos - usando as imagens do quiz
    '2_ziffwx.webp': '/Estilos%20Universais%20Quiz/Q1%20-%20A).png',
    '12_edlmwf.webp': '/Estilos%20Universais%20Quiz/Q1%20-%20B).png',
    '13_uvbciq.webp': '/Estilos%20Universais%20Quiz/Q1%20-%20C).png',
    '14_l2nprc.webp': '/Estilos%20Universais%20Quiz/Q1%20-%20D).png',
    '6_gnoxfg.webp': '/Estilos%20Universais%20Quiz/Q1%20-%20E).png',
    '7_ynez1z.webp': '/Estilos%20Universais%20Quiz/Q1%20-%20F).png',
    '8_yqu3hw.webp': '/Estilos%20Universais%20Quiz/Q1%20-%20G).png',
    '9_x6so6a.webp': '/Estilos%20Universais%20Quiz/Q1%20-%20H).png',
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
