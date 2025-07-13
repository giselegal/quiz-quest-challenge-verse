import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega o mapeamento de migração
function loadMigrationMapping() {
  const mappingPath = path.join(__dirname, 'migration-mapping.json');
  
  if (!fs.existsSync(mappingPath)) {
    console.error('❌ Arquivo migration-mapping.json não encontrado!');
    console.log('Execute primeiro: node scripts/cloudinary-migration.js');
    return null;
  }
  
  const data = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
  return data.mappings;
}

// Substitui URLs do ImageKit por URLs do Cloudinary em um arquivo
function replaceImageKitUrls(filePath, mappings) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ Arquivo não encontrado: ${filePath}`);
    return false;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let replacements = 0;
  
  // Padrões para encontrar URLs do ImageKit
  const imagekitPatterns = [
    // URLs completas do ImageKit
    /https:\/\/ik\.imagekit\.io\/1wxfl3468\/[^'"`\s)]+/g,
    // Base URLs do ImageKit
    /'https:\/\/ik\.imagekit\.io\/1wxfl3468'/g,
    /\"https:\/\/ik\.imagekit\.io\/1wxfl3468\"/g,
    // URLs com transformações
    /tr:w-\d+,h-\d+,q-\d+,f-webp/g
  ];
  
  // Substitui base URLs
  const oldBaseUrl = 'https://ik.imagekit.io/1wxfl3468';
  const newBaseUrl = 'https://res.cloudinary.com/der8kogzu/image/upload';
  
  content = content.replace(new RegExp(oldBaseUrl, 'g'), newBaseUrl);
  
  // Substitui URLs específicas baseadas no mapeamento
  Object.entries(mappings).forEach(([imagekitName, cloudinaryData]) => {
    const { cloudinaryUrl, originalName } = cloudinaryData;
    
    // Remove extensões para busca mais flexível
    const baseName = imagekitName.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '');
    const encodedName = encodeURIComponent(baseName);
    
    // Escape caracteres especiais para regex
    const escapedBaseName = baseName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedOriginalName = originalName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Padrões para encontrar referências a esta imagem
    const patterns = [
      new RegExp(`${escapedBaseName}\\.(jpg|jpeg|png|webp|gif)`, 'gi'),
      new RegExp(escapedOriginalName, 'gi')
    ];
    
    patterns.forEach(pattern => {
      if (pattern.test(content)) {
        content = content.replace(pattern, originalName);
        replacements++;
      }
    });
  });
  
  // Remove transformações do ImageKit já que estamos usando URLs diretas do Cloudinary
  content = content.replace(/\/tr:[^\/]+\//g, '/');
  
  if (replacements > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ ${path.basename(filePath)}: ${replacements} substituições`);
    return true;
  } else {
    console.log(`ℹ️ ${path.basename(filePath)}: Nenhuma URL do ImageKit encontrada`);
    return false;
  }
}

// Lista de arquivos para migrar
const filesToMigrate = [
  // Componentes principais
  '/workspaces/quiz-quest-challenge-verse/client/src/components/QuizIntro.tsx',
  '/workspaces/quiz-quest-challenge-verse/client/src/components/Quiz.tsx',
  '/workspaces/quiz-quest-challenge-verse/client/src/components/QuizResult.tsx',
  '/workspaces/quiz-quest-challenge-verse/client/src/components/QuizDescubraSeuEstilo.tsx',
  
  // Serviços
  '/workspaces/quiz-quest-challenge-verse/client/src/services/imageKitService.ts',
  
  // Componentes de teste
  '/workspaces/quiz-quest-challenge-verse/client/src/components/ImageKitTest.tsx',
  
  // Outros componentes que podem usar imagens
  '/workspaces/quiz-quest-challenge-verse/client/src/App.tsx'
];

async function migrateToCloudinary() {
  console.log('🚀 Iniciando migração das URLs para Cloudinary...\n');
  
  const mappings = loadMigrationMapping();
  if (!mappings) {
    return;
  }
  
  console.log(`📊 Mapeamentos carregados: ${Object.keys(mappings).length}\n`);
  
  let totalFiles = 0;
  let migratedFiles = 0;
  
  for (const filePath of filesToMigrate) {
    totalFiles++;
    
    if (replaceImageKitUrls(filePath, mappings)) {
      migratedFiles++;
    }
  }
  
  console.log(`\n📈 Resumo da migração:`);
  console.log(`📁 Arquivos processados: ${totalFiles}`);
  console.log(`✅ Arquivos migrados: ${migratedFiles}`);
  console.log(`📸 Imagens mapeadas: ${Object.keys(mappings).length}`);
  
  if (migratedFiles > 0) {
    console.log('\n🎉 Migração concluída com sucesso!');
    console.log('💡 Próximos passos:');
    console.log('1. Teste as páginas no navegador');
    console.log('2. Verifique se as imagens carregam corretamente');
    console.log('3. Remova referências ao ImageKit se não precisar mais');
  } else {
    console.log('\n⚠️ Nenhum arquivo foi migrado');
    console.log('Verifique se os caminhos dos arquivos estão corretos');
  }
}

// Função para criar um serviço Cloudinary
function createCloudinaryService() {
  const servicePath = '/workspaces/quiz-quest-challenge-verse/client/src/services/cloudinaryService.ts';
  
  const serviceContent = `// Serviço para gerar URLs do Cloudinary
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
  let url = \`\${cloudinaryConfig.baseUrl}\`;
  
  if (transformations) {
    const params = [];
    
    if (transformations.width) params.push(\`w_\${transformations.width}\`);
    if (transformations.height) params.push(\`h_\${transformations.height}\`);
    if (transformations.quality) params.push(\`q_\${transformations.quality}\`);
    if (transformations.format) params.push(\`f_\${transformations.format}\`);
    if (transformations.crop) params.push(\`c_\${transformations.crop}\`);
    
    if (params.length > 0) {
      url += \`/\${params.join(',')}\`;
    }
  }
  
  return \`\${url}/\${publicId}\`;
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
`;

  fs.writeFileSync(servicePath, serviceContent);
  console.log('✅ Serviço Cloudinary criado em client/src/services/cloudinaryService.ts');
}

// Executa o script
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateToCloudinary()
    .then(() => {
      console.log('\\n🔧 Criando serviço Cloudinary...');
      createCloudinaryService();
    })
    .catch(console.error);
}

export {
  migrateToCloudinary,
  createCloudinaryService,
  replaceImageKitUrls
};
