import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega o mapeamento das imagens do Cloudinary
function loadCloudinaryMapping() {
  const mappingPath = path.join(__dirname, 'migration-mapping.json');
  const data = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
  return data.mappings;
}

// Mapeamento das imagens disponíveis para cada questão
const questionImageMapping = {
  // Q1 - Todas disponíveis
  'Q1': {
    'A': 'Q1_-_A_xlh5cg.png',
    'B': 'Q1_-_B_bm79bg.png', 
    'C': 'Q1_-_C_n2at5j.png',
    'D': 'Q1_-_D_psbhs9.png',
    'E': 'Q1_-_E_pwhukq.png',
    'F': 'Q1_-_F_z1nyug.png',
    'G': 'Q1_-_G_zgy8mq.png',
    'H': 'Q1_-_H_dqhkzv.png'
  },
  // Q3 - Todas disponíveis  
  'Q3': {
    'A': 'Q3_-_A_plsfwp.png',
    'B': 'Q3_-_B_w75tyg.png',
    'C': 'Q3_-_C_ep9x9h.png', 
    'D': 'Q3_-_D_xxra9m.png',
    'E': 'Q3_-_E_lr9p2d.png',
    'F': 'Q3_-_F_amdr7l.png',
    'G': 'Q3_-_G_zod0w5.png',
    'H': 'Q3_-_H_aghfg8.png'
  },
  // Q5 - Todas disponíveis
  'Q5': {
    'A': 'Q5_-_A_k6gvtc.png',
    'B': 'Q5_-_B_a1emi6.png',
    'C': 'Q5_-_C_ywcxcx.png',
    'D': 'Q5_-_D_y7u29d.png', 
    'E': 'Q5_-_E_gnuvl3.png',
    'F': 'Q5_-_F_lzrw2j.png',
    'G': 'Q5_-_G_vr81is.png',
    'H': 'Q5_-_H_yjbt0s.png'
  },
  // Q6 - Todas disponíveis
  'Q6': {
    'A': 'Q6_-_A_ydwyde.png',
    'B': 'Q6_-_B_xz6flj.png',
    'C': 'Q6_-_C_zk2ab3.png',
    'D': 'Q6_-_D_hh759o.png',
    'E': 'Q6_-_E_opj922.png', 
    'F': 'Q6_-_F_n4mgoz.png',
    'G': 'Q6_-_G_ue5itf.png',
    'H': 'Q6_-_H_t6xmoz.png'
  },
  // Q7 - Todas disponíveis
  'Q7': {
    'A': 'Q7_-_A_txdfij.png',
    'B': 'Q7_-_B_xp3bqm.png',
    'C': 'Q7_-_C_vzwcvi.png',
    'D': 'Q7_-_D_vzgr64.png',
    'E': 'Q7_-_E_akiks2.png',
    'F': 'Q7_-_F_u8oswz.png',
    'G': 'Q7_-_G_bnnneg.png',
    'H': 'Q7_-_H_votjzt.png'
  },
  // Q8 - Todas disponíveis
  'Q8': {
    'A': 'Q8_-_A_zk7yf0.png',
    'B': 'Q8_-_B_azy3ox.png',
    'C': 'Q8_-_C_theeds.png',
    'D': 'Q8_-_D_ocqyca.png',
    'E': 'Q8_-_E_i7b4hk.png',
    'F': 'Q8_-_F_wa1spu.png',
    'G': 'Q8_-_G_fo3y4o.png',
    'H': 'Q8_-_H_qe9iqk.png'
  }
};

function migrateRealQuizTemplates() {
  const filePath = '/workspaces/quiz-quest-challenge-verse/client/src/data/realQuizTemplates.ts';
  
  console.log('🚀 Migrando realQuizTemplates.ts...');
  
  let content = fs.readFileSync(filePath, 'utf8');
  let replacements = 0;
  
  // Substitui URLs antigas pelo novo Cloudinary
  const oldCloudinaryUrl = 'https://res.cloudinary.com/dqljyf76t/image/upload/';
  const newCloudinaryUrl = 'https://res.cloudinary.com/der8kogzu/image/upload/';
  
  // Para questões que sabemos que temos no nosso Cloudinary, substitui pelas corretas
  Object.entries(questionImageMapping).forEach(([questionNum, options]) => {
    Object.entries(options).forEach(([letter, imageName]) => {
      // Padrão para encontrar imagens do tipo "v1744735329/11_hqmr8l.webp"
      const oldPattern = new RegExp(`${oldCloudinaryUrl}v\\d+/\\d+_\\w+\\.webp`, 'g');
      
      // Para Q1, mapeia por posição (A=1a, B=1b, etc.)
      if (questionNum === 'Q1') {
        const optionId = `1${letter.toLowerCase()}`;
        const regex = new RegExp(`(id: "${optionId}"[\\s\\S]*?imageUrl: ")${oldCloudinaryUrl}v\\d+/\\d+_\\w+\\.webp(")`);
        
        if (regex.test(content)) {
          content = content.replace(regex, `$1${newCloudinaryUrl}${imageName}$2`);
          replacements++;
          console.log(`✅ Q1-${letter}: ${imageName}`);
        }
      }
    });
  });
  
  // Para questões que não temos (Q2, Q4), usa imagens de fallback do Q1
  const fallbackImages = questionImageMapping['Q1'];
  
  // Q2 - usa imagens do Q1 como fallback
  Object.entries(fallbackImages).forEach(([letter, imageName]) => {
    const optionId = `2${letter.toLowerCase()}`;
    const regex = new RegExp(`(id: "${optionId}"[\\s\\S]*?imageUrl: ")${oldCloudinaryUrl}v\\d+/\\d+_\\w+\\.webp(")`);
    
    if (regex.test(content)) {
      content = content.replace(regex, `$1${newCloudinaryUrl}${imageName}$2`);
      replacements++;
      console.log(`✅ Q2-${letter}: ${imageName} (fallback do Q1)`);
    }
  });
  
  // Substitui todas as outras URLs restantes pelo novo Cloudinary
  content = content.replace(new RegExp(oldCloudinaryUrl, 'g'), newCloudinaryUrl);
  
  fs.writeFileSync(filePath, content);
  
  console.log(`\n📊 Substituições realizadas: ${replacements}`);
  console.log('✅ Migração do realQuizTemplates.ts concluída!');
  
  return replacements;
}

// Executa o script
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateRealQuizTemplates();
}

export { migrateRealQuizTemplates };
