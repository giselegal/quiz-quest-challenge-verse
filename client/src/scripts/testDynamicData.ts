// Script de teste para dados dinâmicos da etapa 20
import { schemaDrivenFunnelService } from '../services/schemaDrivenFunnelService';

// Simular dados do quiz no localStorage
const mockQuizResult = {
  primaryStyle: {
    category: 'Elegante',
    percentage: 92,
    score: 45
  },
  secondaryStyles: [
    { category: 'Natural', percentage: 25, score: 12 },
    { category: 'Moderno', percentage: 18, score: 9 }
  ]
};

const mockUserData = {
  userName: 'Maria Silva',
  email: 'maria@exemplo.com'
};

// Configurar dados no localStorage
localStorage.setItem('userName', mockUserData.userName);
localStorage.setItem('user', JSON.stringify(mockUserData));
localStorage.setItem('quizResult', JSON.stringify(mockQuizResult));

// Testar a função de dados dinâmicos
console.log('🧪 TESTE: Dados Dinâmicos da Etapa 20');
console.log('=====================================');

// Obter página com dados dinâmicos
const pageWithDynamicData = schemaDrivenFunnelService.getPageWithDynamicData('etapa-20-resultado');

if (pageWithDynamicData) {
  console.log('✅ Página encontrada:', pageWithDynamicData.title);
  
  // Verificar blocos com dados dinâmicos
  pageWithDynamicData.blocks.forEach((block, index) => {
    console.log(`\n🧩 Bloco ${index + 1}: ${block.id}`);
    console.log('Tipo:', block.type);
    console.log('Propriedades:', JSON.stringify(block.properties, null, 2));
    
    // Verificar se dados dinâmicos foram aplicados
    const properties = block.properties;
    if (properties) {
      if (properties.userName && properties.userName !== 'dinamicUserName') {
        console.log('✅ Nome do usuário aplicado:', properties.userName);
      }
      if (properties.styleName && properties.styleName !== 'dinamicStyleName') {
        console.log('✅ Nome do estilo aplicado:', properties.styleName);
      }
      if (properties.percentage && typeof properties.percentage === 'number') {
        console.log('✅ Percentual aplicado:', properties.percentage);
      }
      if (properties.description && !properties.description.includes('dinamic')) {
        console.log('✅ Descrição dinâmica aplicada');
      }
      if (properties.src && !properties.src.includes('dinamic')) {
        console.log('✅ Imagem dinâmica aplicada:', properties.src);
      }
    }
  });
} else {
  console.log('❌ Página etapa-20-resultado não encontrada');
}

// Testar todas as páginas
console.log('\n🔍 TESTE: Todas as Páginas com Dados Dinâmicos');
console.log('===============================================');

const allPages = schemaDrivenFunnelService.getAllPagesWithDynamicData();
console.log(`📄 Total de páginas: ${allPages.length}`);

const step20 = allPages.find(p => p.id === 'etapa-20-resultado');
if (step20) {
  console.log('✅ Etapa 20 encontrada na lista completa');
  
  // Verificar o bloco principal de resultado
  const mainCard = step20.blocks.find(b => b.id === 'result-main-card');
  if (mainCard) {
    console.log('🎯 Bloco principal de resultado:');
    console.log('- Nome do estilo:', mainCard.properties?.styleName);
    console.log('- Percentual:', mainCard.properties?.percentage);
    console.log('- Descrição:', mainCard.properties?.description?.substring(0, 100) + '...');
    console.log('- URL da imagem:', mainCard.properties?.imageUrl);
  }
  
  // Verificar o header
  const header = step20.blocks.find(b => b.id === 'result-header-inline');
  if (header) {
    console.log('🏷️ Header do resultado:');
    console.log('- Nome do usuário:', header.properties?.userName);
  }
} else {
  console.log('❌ Etapa 20 não encontrada na lista completa');
}

export default null; // Para TypeScript
