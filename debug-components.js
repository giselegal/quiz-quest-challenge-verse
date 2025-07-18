// Script temporário para debugar componentes
import fs from 'fs';

// Simular as importações que estão sendo usadas
try {
  const blockDefsContent = fs.readFileSync('./client/src/config/blockDefinitions.ts', 'utf8');
  
  // Contar definições por categoria
  const categories = {
    'Resultado': 0,
    'Ofertas': 0,
    'Inline': 0,
    'Interação': 0,
    'Mídia': 0,
    'UI': 0,
    'Vendas': 0,
    'Credibilidade': 0,
    'Formulário': 0,
    'Outros': 0
  };
  
  const typeMatches = blockDefsContent.match(/type: '[^']+'/g) || [];
  const categoryMatches = blockDefsContent.match(/category: '[^']+'/g) || [];
  
  console.log('=== ANÁLISE DOS COMPONENTES ===');
  console.log('Total de definições type:', typeMatches.length);
  console.log('Total de definições category:', categoryMatches.length);
  
  // Contar por categoria
  categoryMatches.forEach(match => {
    const category = match.replace("category: '", '').replace("'", '');
    if (categories[category] !== undefined) {
      categories[category]++;
    } else {
      console.log('Categoria não reconhecida:', category);
    }
  });
  
  console.log('\n=== COMPONENTES POR CATEGORIA ===');
  Object.entries(categories).forEach(([cat, count]) => {
    console.log(`${cat}: ${count} componentes`);
  });
  
  // Buscar definições de blocos específicas
  const blockDefinitionStart = blockDefsContent.indexOf('export const blockDefinitions');
  if (blockDefinitionStart > -1) {
    const blockDefsSection = blockDefsContent.substring(blockDefinitionStart);
    const blockCount = (blockDefsSection.match(/{\s*type:/g) || []).length;
    console.log('\nTotal de definições de blocos encontradas:', blockCount);
  }
  
} catch (error) {
  console.error('Erro ao analisar arquivos:', error.message);
}
