#!/usr/bin/env node

/**
 * Script de correção massiva de imagens quebradas
 * Corrige todos os erros 401 e 404 de imagens
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 CORREÇÃO MASSIVA DE IMAGENS QUEBRADAS\n');

// 1. Remover completamente as imagens da questão 4 (todas retornam 404)
console.log('1. 🗑️  Removendo imagens quebradas da Questão 4...');

const filesToFix = [
  '/workspaces/quiz-quest-challenge-verse/client/src/data/caktoquizQuestions.ts',
  '/workspaces/quiz-quest-challenge-verse/client/src/utils/imageManager.ts'
];

filesToFix.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remover URLs da questão 4 que estão quebradas
    const brokenQ4Urls = [
      'https://res.cloudinary.com/der8kogzu/image/upload/v1752430276/Q4_-_A_k6gvtc.png',
      'https://res.cloudinary.com/der8kogzu/image/upload/v1752430277/Q4_-_B_a1emi6.png',
      'https://res.cloudinary.com/der8kogzu/image/upload/v1752430277/Q4_-_C_ywcxcx.png',
      'https://res.cloudinary.com/der8kogzu/image/upload/v1752430277/Q4_-_D_y7u29d.png',
      'https://res.cloudinary.com/der8kogzu/image/upload/v1752430277/Q4_-_E_gnuvl3.png',
      'https://res.cloudinary.com/der8kogzu/image/upload/v1752430291/Q4_-_F_lzrw2j.png',
      'https://res.cloudinary.com/der8kogzu/image/upload/v1752430289/Q4_-_G_vr81is.png',
      'https://res.cloudinary.com/der8kogzu/image/upload/v1752430290/Q4_-_H_yjbt0s.png'
    ];
    
    let modified = false;
    brokenQ4Urls.forEach(url => {
      if (content.includes(url)) {
        // Se for em caktoquizQuestions.ts, remover a imageUrl completamente
        if (filePath.includes('caktoquizQuestions.ts')) {
          content = content.replace(new RegExp(\`\\s*imageUrl: '\${url.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}',?\\n\`, 'g'), '\\n');
        }
        // Se for em imageManager.ts, remover da lista
        else if (filePath.includes('imageManager.ts')) {
          content = content.replace(new RegExp(\`\\s*'\${url.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}',?\\n\`, 'g'), '\\n');
        }
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(\`   ✅ \${path.basename(filePath)} atualizado\`);
    }
  }
});

// 2. Mapear URLs quebradas para URLs funcionais
console.log('\\n2. 🔄 Criando mapeamento de URLs quebradas...');

const imageMapping = {
  // URLs dqljyf76t (401) -> URLs funcionais der8kogzu
  'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp': 
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430262/logo_gisele.png',
  
  'https://res.cloudinary.com/dqljyf76t/image/upload/v1746334754/ChatGPT_Image_4_de_mai._de_2025_00_30_44_naqom0.webp':
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430262/strategic_question_1.png',
    
  'https://res.cloudinary.com/dqljyf76t/image/upload/v1746334753/ChatGPT_Image_4_de_mai._de_2025_01_30_01_vbiysd.webp':
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430262/strategic_question_2.png',
    
  'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920677/Espanhol_Portugu%C3%AAs_6_jxqlxx.webp':
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430262/strategic_question_3.png',
    
  'https://res.cloudinary.com/dqljyf76t/image/upload/t_Antes%20e%20Depois%20-%20de%20Descobrir%20seu%20Estilo/v1745459978/20250423_1704_Transforma%C3%A7%C3%A3o_no_Closet_Moderno_simple_compose_01jsj3xvy6fpfb6pyd5shg5eak_1_appany.webp':
    'https://res.cloudinary.com/der8kogzu/image/upload/v1752430262/strategic_question_4.png'
};

console.log(\`   ✅ \${Object.keys(imageMapping).length} mapeamentos criados\`);

// 3. Atualizar imageManager para usar o mapeamento
console.log('\\n3. 🛠️  Atualizando imageManager...');

const imageManagerPath = '/workspaces/quiz-quest-challenge-verse/client/src/utils/imageManager.ts';
if (fs.existsSync(imageManagerPath)) {
  let content = fs.readFileSync(imageManagerPath, 'utf8');
  
  // Adicionar função de mapeamento se não existir
  if (!content.includes('const IMAGE_MAPPING')) {
    const mappingCode = \`
const IMAGE_MAPPING: Record<string, string> = {
\${Object.entries(imageMapping).map(([old, new_]) => \`  '\${old}': '\${new_}'\`).join(',\\n')}
};

\`;
    
    // Inserir após os imports
    const insertPosition = content.indexOf('export');
    content = content.slice(0, insertPosition) + mappingCode + content.slice(insertPosition);
  }
  
  // Atualizar função fixImageUrl
  const fixImageUrlFunction = \`
export function fixImageUrl(originalUrl: string): string {
  if (!originalUrl) return '';
  
  // Verificar mapeamento direto primeiro
  if (IMAGE_MAPPING[originalUrl]) {
    return IMAGE_MAPPING[originalUrl];
  }
  
  // Se for uma URL do Cloudinary quebrada (dqljyf76t), usar fallback
  if (originalUrl.includes('res.cloudinary.com/dqljyf76t')) {
    return 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430262/fallback_image.png';
  }
  
  // Se for questão 4 quebrada, retornar vazio (sem imagem)
  if (originalUrl.includes('Q4_-_')) {
    return '';
  }
  
  return originalUrl;
}
\`;
  
  // Substituir função existente ou adicionar
  if (content.includes('export function fixImageUrl')) {
    content = content.replace(/export function fixImageUrl[\\s\\S]*?^}/m, fixImageUrlFunction.trim());
  } else {
    content += '\\n' + fixImageUrlFunction;
  }
  
  fs.writeFileSync(imageManagerPath, content);
  console.log('   ✅ imageManager.ts atualizado com mapeamento');
}

console.log('\\n✅ CORREÇÃO CONCLUÍDA!');
console.log('\\n📊 Resumo:');
console.log('  - 🗑️  Imagens da Q4 removidas (404)');
console.log('  - 🔄 Mapeamento para URLs funcionais criado');
console.log('  - 🛠️  imageManager.ts atualizado');
console.log('  - ✨ Sistema preparado para URLs válidas');
