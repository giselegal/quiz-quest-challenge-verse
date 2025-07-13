// Serviço para gerar URLs do Cloudinary
export const cloudinaryConfig = {
  cloudName: 'der8kogzu',
  baseUrl: 'https://res.cloudinary.com/der8kogzu/image/upload'
};

// Gera URL do Cloudinary com transformações opcionais
export function getCloudinaryUrl(
  publicId: string, 
  transformations?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: string;
    crop?: string;
  }
): string {
  let url = `${cloudinaryConfig.baseUrl}`;
  
  if (transformations) {
    const params = [];
    
    if (transformations.width) params.push(`w_${transformations.width}`);
    if (transformations.height) params.push(`h_${transformations.height}`);
    if (transformations.quality) params.push(`q_${transformations.quality}`);
    if (transformations.format) params.push(`f_${transformations.format}`);
    if (transformations.crop) params.push(`c_${transformations.crop}`);
    
    if (params.length > 0) {
      url += `/${params.join(',')}`;
    }
  }
  
  return `${url}/${publicId}`;
}

// URLs das imagens principais
export const imageUrls = {
  logo: 'LOGO_DA_MARCA_GISELE_l78gin.png',
  heroImage: 'GISELE-GALVÃO-POSE-ACESSIBILIDADE_iyt9rg.jpg',
  problemImage: 'MULHER_SEM_ESTILO_E_PERDIDA_HH_0TRK1A_hse63r.png',
  solutionImage: 'IMAGEM_8_ESTILOS_UNIVERSAIS_Sd9XfgcdH_ievpxw.png',
  mockupsImage: 'MOCKUPS_IMAGENS_DO_GUIA_DE_ESILOS_xdkpdn.png',
  
  // Guias de estilo
  guias: {
    natural: 'GUIA_NATURAL_dlhcwm.png',
    classico: 'GUIA_CLÁSSICO_rfpptj.png',
    contemporaneo: 'GUIA_CONTEMPORÂNEO_hqqqzp.png',
    elegante: 'GUIA_ELEGANTE_mdozq9.png',
    romantico: 'GUIA_ROMÂNTICO_e96ecf.png',
    sexy: 'GUIA_SEXY_i0z60a.png',
    dramatico: 'GUIA_DRAMÁTICO_sitfk0.png',
    criativo: 'GUIA_CRIATIVO_sqjlwg.png'
  }
};

export default {
  getCloudinaryUrl,
  imageUrls,
  cloudinaryConfig
};
