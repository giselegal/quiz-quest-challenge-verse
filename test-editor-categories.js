// Testar especificamente as categorias do editor
import fs from 'fs';

// Simular a função getBlocksByCategory
function getBlocksByCategory(category, blockDefinitions) {
  return blockDefinitions.filter(def => def.category === category);
}

try {
  const blockDefsContent = fs.readFileSync('./client/src/config/blockDefinitions.ts', 'utf8');
  
  // Extrair definições de blocos
  const blockDefinitionStart = blockDefsContent.indexOf('export const blockDefinitions');
  const blockDefsSection = blockDefsContent.substring(blockDefinitionStart);
  
  // Simular as definições (contagem simples)
  const resultMatches = (blockDefsContent.match(/category: 'Resultado'/g) || []).length;
  const offerMatches = (blockDefsContent.match(/category: 'Ofertas'/g) || []).length;
  const inlineMatches = (blockDefsContent.match(/category: 'Inline'/g) || []).length;
  const interactionMatches = (blockDefsContent.match(/category: 'Interação'/g) || []).length;
  
  console.log('=== CATEGORIAS QUE O EDITOR BUSCA ===');
  console.log('📊 Resultado:', resultMatches, 'componentes');
  console.log('💰 Ofertas:', offerMatches, 'componentes');
  console.log('⚡ Inline:', inlineMatches, 'componentes');
  console.log('🔘 Interação:', interactionMatches, 'componentes');
  
  const total = resultMatches + offerMatches + inlineMatches + interactionMatches;
  console.log('\n🎯 TOTAL ESPERADO NO EDITOR:', total, 'componentes');
  
  if (total > 26) {
    console.log('✅ SUCESSO! O editor deve mostrar mais de 26 componentes agora');
  } else {
    console.log('❌ PROBLEMA: Ainda mostrando poucos componentes');
  }
  
} catch (error) {
  console.error('Erro:', error.message);
}
