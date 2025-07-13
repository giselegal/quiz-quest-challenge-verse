import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: 'der8kogzu',
  api_key: '953555263246778',
  api_secret: 'j7J1KJ5YDXn0m52pD-sAPcD6q6w'
});

async function listCloudinaryImages() {
  try {
    console.log('🔍 Listando imagens do Cloudinary...');
    
    // Lista todas as imagens usando a API simples primeiro
    const result = await cloudinary.api.resources({
      resource_type: 'image',
      max_results: 500,
      type: 'upload'
    });

    console.log(`📸 Total de imagens encontradas: ${result.resources.length}`);
    
    // Organiza as imagens por nome
    const imageMap = {};
    
    result.resources.forEach((resource, index) => {
      const { public_id, secure_url, width, height, format, bytes } = resource;
      
      // Remove extensões do public_id para comparação
      const cleanName = public_id.toLowerCase()
        .replace(/\.(jpg|jpeg|png|webp|gif)$/i, '')
        .replace(/[^a-z0-9]/gi, '');
      
      imageMap[cleanName] = {
        originalName: public_id,
        url: secure_url,
        width,
        height,
        format,
        size: bytes,
        cleanName
      };
      
      if (index < 10) {
        console.log(`${index + 1}. ${public_id} -> ${secure_url}`);
      }
    });
    
    // Salva o mapeamento em um arquivo
    const mappingData = {
      totalImages: result.resources.length,
      images: imageMap,
      generatedAt: new Date().toISOString()
    };
    
    fs.writeFileSync(
      path.join(__dirname, 'cloudinary-images.json'), 
      JSON.stringify(mappingData, null, 2)
    );
    
    console.log('✅ Mapeamento salvo em cloudinary-images.json');
    
    return imageMap;
    
  } catch (error) {
    console.error('❌ Erro ao acessar Cloudinary:', error);
    return null;
  }
}

// Função para encontrar correspondências
function findImageMatch(imagekitName, cloudinaryImages) {
  const cleanImagekitName = imagekitName.toLowerCase()
    .replace(/\.(jpg|jpeg|png|webp|gif)$/i, '')
    .replace(/[^a-z0-9]/gi, '');
  
  // Busca exata
  if (cloudinaryImages[cleanImagekitName]) {
    return cloudinaryImages[cleanImagekitName];
  }
  
  // Busca parcial
  for (const [key, image] of Object.entries(cloudinaryImages)) {
    if (key.includes(cleanImagekitName) || cleanImagekitName.includes(key)) {
      return image;
    }
  }
  
  // Busca por palavras-chave
  const keywords = cleanImagekitName.split(/[^a-z0-9]/);
  for (const [key, image] of Object.entries(cloudinaryImages)) {
    const matches = keywords.filter(keyword => 
      keyword.length > 2 && key.includes(keyword)
    );
    if (matches.length >= 2) {
      return image;
    }
  }
  
  return null;
}

async function generateMigrationMapping() {
  console.log('🚀 Iniciando migração do ImageKit para Cloudinary...\n');
  
  const cloudinaryImages = await listCloudinaryImages();
  
  if (!cloudinaryImages) {
    console.error('❌ Falha ao carregar imagens do Cloudinary');
    return;
  }
  
  // Lista de imagens do ImageKit que precisam ser migradas
  const imagekitImages = [
    'LOGO DA MARCA GISELE.png',
    'GISELE-GALVÃO-POSE-ACESSIBILIDADE.jpg',
    'MULHER SEM ESTILO E PERDIDA',
    '8 ESTILOS UNIVERSAIS',
    'MOCKUPS IMAGENS DO GUIA DE ESILOS',
    'GUIA NATURAL.png',
    'GUIA CLÁSSICO.png',
    'GUIA CONTEMPORÂNEO.png',
    'GUIA ELEGANTE.png',
    'GUIA ROMÂNTICO.png',
    'GUIA SEXY.png',
    'GUIA DRAMÁTICO.png',
    'GUIA CRIATIVO.png'
  ];
  
  // Adiciona imagens do quiz (Q1-A até Q8-H)
  for (let q = 1; q <= 8; q++) {
    for (let o = 0; o < 8; o++) {
      const letter = String.fromCharCode(65 + o); // A, B, C, D, E, F, G, H
      imagekitImages.push(`Q${q} - ${letter}).png`);
    }
  }
  
  console.log('\n🔍 Buscando correspondências...\n');
  
  const migrationMap = {};
  const notFound = [];
  
  imagekitImages.forEach((imagekitName, index) => {
    const match = findImageMatch(imagekitName, cloudinaryImages);
    
    if (match) {
      migrationMap[imagekitName] = {
        cloudinaryUrl: match.url,
        originalName: match.originalName,
        width: match.width,
        height: match.height
      };
      console.log(`✅ ${index + 1}. ${imagekitName} -> ${match.originalName}`);
    } else {
      notFound.push(imagekitName);
      console.log(`❌ ${index + 1}. ${imagekitName} -> NÃO ENCONTRADA`);
    }
  });
  
  // Salva o mapeamento de migração
  const migrationData = {
    totalMapped: Object.keys(migrationMap).length,
    totalNotFound: notFound.length,
    mappings: migrationMap,
    notFound: notFound,
    generatedAt: new Date().toISOString()
  };
  
  fs.writeFileSync(
    path.join(__dirname, 'migration-mapping.json'), 
    JSON.stringify(migrationData, null, 2)
  );
  
  console.log(`\n📊 Resultado da migração:`);
  console.log(`✅ Imagens mapeadas: ${Object.keys(migrationMap).length}`);
  console.log(`❌ Imagens não encontradas: ${notFound.length}`);
  console.log(`📁 Mapeamento salvo em migration-mapping.json\n`);
  
  if (notFound.length > 0) {
    console.log('❌ Imagens não encontradas:');
    notFound.forEach((name, index) => {
      console.log(`${index + 1}. ${name}`);
    });
  }
  
  return migrationData;
}

// Executa o script
if (import.meta.url === `file://${process.argv[1]}`) {
  generateMigrationMapping().catch(console.error);
}

export {
  listCloudinaryImages,
  findImageMatch,
  generateMigrationMapping
};
