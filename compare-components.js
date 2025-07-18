// Comparar componentes do ComponentsSidebar vs blockDefinitions
import fs from 'fs';

try {
  // Ler ComponentsSidebar
  const sidebarContent = fs.readFileSync('./client/src/components/editor/sidebar/ComponentsSidebar.tsx', 'utf8');
  
  // Extrair tipos do ComponentsSidebar
  const sidebarTypes = [];
  const sidebarMatches = sidebarContent.match(/type: '[^']+'/g) || [];
  sidebarMatches.forEach(match => {
    const type = match.replace("type: '", '').replace("'", '');
    sidebarTypes.push(type);
  });
  
  // Ler blockDefinitions
  const blockDefsContent = fs.readFileSync('./client/src/config/blockDefinitions.ts', 'utf8');
  
  // Extrair tipos do blockDefinitions
  const blockDefTypes = [];
  const blockDefMatches = blockDefsContent.match(/type: '[^']+'/g) || [];
  blockDefMatches.forEach(match => {
    const type = match.replace("type: '", '').replace("'", '');
    // Filtrar apenas tipos de blocos (não tipos de propriedades)
    if (!['text-input', 'textarea', 'image-url', 'video-url', 'number-input', 'boolean-switch', 'select', 'color-picker'].includes(type)) {
      blockDefTypes.push(type);
    }
  });
  
  console.log('=== COMPARAÇÃO DE COMPONENTES ===');
  console.log('ComponentsSidebar tem:', sidebarTypes.length, 'tipos');
  console.log('blockDefinitions tem:', blockDefTypes.length, 'tipos');
  
  // Encontrar componentes que estão no sidebar mas não no blockDefinitions
  const missing = sidebarTypes.filter(type => !blockDefTypes.includes(type));
  console.log('\n=== COMPONENTES FALTANDO NO blockDefinitions ===');
  console.log('Total faltando:', missing.length);
  missing.forEach(type => console.log('- ' + type));
  
  // Encontrar componentes que estão no blockDefinitions mas não no sidebar
  const extra = blockDefTypes.filter(type => !sidebarTypes.includes(type));
  console.log('\n=== COMPONENTES EXTRAS NO blockDefinitions ===');
  console.log('Total extras:', extra.length);
  extra.forEach(type => console.log('- ' + type));
  
} catch (error) {
  console.error('Erro:', error.message);
}
