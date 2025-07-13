import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuração da API Cloudinary
cloudinary.config({
  cloud_name: 'der8kogzu',
  api_key: '435656686972178',
  api_secret: 'RiBa7oq2L9IMiJgJqbtM8p4rNuc'
});

async function getAllCloudinaryImages() {
  try {
    console.log('🔍 Obtendo TODAS as imagens da API Cloudinary...\n');
    
    let allImages = [];
    let nextCursor = null;
    
    do {
      const result = await cloudinary.api.resources({
        type: 'upload',
        max_results: 500,
        next_cursor: nextCursor
      });
      
      allImages = allImages.concat(result.resources);
      nextCursor = result.next_cursor;
      
      console.log(`📸 Carregadas: ${allImages.length} imagens...`);
    } while (nextCursor);
    
    console.log(`\n✅ Total de imagens encontradas: ${allImages.length}\n`);
    
    // Organizar por categorias
    const categories = {
      main: [],
      styleGuides: [],
      quizQ1: [],
      quizQ2: [],
      quizQ3: [],
      quizQ4: [],
      quizQ5: [],
      quizQ6: [],
      quizQ7: [],
      quizQ8: [],
      quizQ9: [],
      bonus: [],
      others: []
    };
    
    // Organizar URLs completas
    const allUrls = allImages.map((image, index) => {
      const url = `https://res.cloudinary.com/der8kogzu/image/upload/v${image.version}/${image.public_id}.${image.format}`;
      
      // Categorizar
      const name = image.public_id.toLowerCase();
      if (name.includes('logo') || name.includes('gisele') || name.includes('mulher') || name.includes('estilos_universais') || name.includes('mockups_imagens')) {
        categories.main.push({ name: image.public_id, url });
      } else if (name.includes('guia_')) {
        categories.styleGuides.push({ name: image.public_id, url });
      } else if (name.includes('q1_')) {
        categories.quizQ1.push({ name: image.public_id, url });
      } else if (name.includes('q2_')) {
        categories.quizQ2.push({ name: image.public_id, url });
      } else if (name.includes('q3_')) {
        categories.quizQ3.push({ name: image.public_id, url });
      } else if (name.includes('q4_')) {
        categories.quizQ4.push({ name: image.public_id, url });
      } else if (name.includes('q5_')) {
        categories.quizQ5.push({ name: image.public_id, url });
      } else if (name.includes('q6_')) {
        categories.quizQ6.push({ name: image.public_id, url });
      } else if (name.includes('q7_')) {
        categories.quizQ7.push({ name: image.public_id, url });
      } else if (name.includes('q8_')) {
        categories.quizQ8.push({ name: image.public_id, url });
      } else if (name.includes('q9_')) {
        categories.quizQ9.push({ name: image.public_id, url });
      } else if (name.includes('bonus') || name.includes('revista') || name.includes('peças') || name.includes('mockup')) {
        categories.bonus.push({ name: image.public_id, url });
      } else {
        categories.others.push({ name: image.public_id, url });
      }
      
      return {
        index: index + 1,
        publicId: image.public_id,
        url: url,
        width: image.width,
        height: image.height,
        format: image.format,
        bytes: image.bytes,
        created: image.created_at
      };
    });
    
    // Salvar arquivo completo
    const completeData = {
      totalImages: allImages.length,
      generatedAt: new Date().toISOString(),
      categories: categories,
      allUrls: allUrls
    };
    
    fs.writeFileSync('all-cloudinary-urls.json', JSON.stringify(completeData, null, 2));
    
    // Mostrar resumo por categoria
    console.log('📊 RESUMO POR CATEGORIA:');
    console.log(`🔸 Imagens principais: ${categories.main.length}`);
    console.log(`🔸 Guias de estilo: ${categories.styleGuides.length}`);
    console.log(`🔸 Quiz Q1: ${categories.quizQ1.length}`);
    console.log(`🔸 Quiz Q2: ${categories.quizQ2.length}`);
    console.log(`🔸 Quiz Q3: ${categories.quizQ3.length}`);
    console.log(`🔸 Quiz Q4: ${categories.quizQ4.length}`);
    console.log(`🔸 Quiz Q5: ${categories.quizQ5.length}`);
    console.log(`🔸 Quiz Q6: ${categories.quizQ6.length}`);
    console.log(`🔸 Quiz Q7: ${categories.quizQ7.length}`);
    console.log(`🔸 Quiz Q8: ${categories.quizQ8.length}`);
    console.log(`🔸 Quiz Q9: ${categories.quizQ9.length}`);
    console.log(`🔸 Bônus/Revista: ${categories.bonus.length}`);
    console.log(`🔸 Outros: ${categories.others.length}`);
    
    console.log('\n📋 TODAS AS URLs:');
    allUrls.forEach((item) => {
      console.log(`${item.index}. ${item.url}`);
    });
    
    console.log(`\n✅ Arquivo salvo: all-cloudinary-urls.json`);
    console.log(`📊 Total: ${allImages.length} URLs`);
    
  } catch (error) {
    console.error('❌ Erro ao acessar Cloudinary:', error);
  }
}

getAllCloudinaryImages();
