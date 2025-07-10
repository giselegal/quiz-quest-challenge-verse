// 🔍 Debug Script ES7+ - Análise dos ComponentDefinitions
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ES7+ Module Path Resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 🎯 Configuration Object
const config = Object.freeze({
  filePath: join(__dirname, 'client/src/data/componentDefinitions.ts'),
  patterns: {
    titles: /title:\s*"([^"]+)"/g,
    inlineTypes: /type:\s*"[^"]*inline[^"]*"/g,
    allTypes: /type:\s*"([^"]+)"/g,
    categories: /(\w+):\s*{[^}]*title:/g
  }
});

// 🔧 ES7+ Utility Functions
const extractMatches = (content, pattern) => 
  [...content.matchAll(pattern)].map(match => match[1] || match[0]);

const cleanTypeString = (typeStr) => 
  typeStr.replace(/type:\s*"/, '').replace(/".*$/, '');

const analyzeCategories = (content) => {
  const categoryMatches = extractMatches(content, config.patterns.categories);
  const titleMatches = extractMatches(content, config.patterns.titles);
  
  return titleMatches.map((title, index) => ({
    id: index + 1,
    title: title.replace(/"/g, ''),
    categoryKey: categoryMatches[index]?.replace(/:\s*{.*/, '') || 'unknown'
  }));
};

const analyzeTypes = (content) => {
  const allTypes = extractMatches(content, config.patterns.allTypes);
  const inlineTypes = extractMatches(content, config.patterns.inlineTypes)
    .map(cleanTypeString);
  
  return {
    total: allTypes.length,
    inline: inlineTypes,
    regular: allTypes.filter(type => !type.includes('inline'))
  };
};

// 🚀 Main Analysis Function
const analyzeComponentDefinitions = async () => {
  console.log('\n🔍 === ANÁLISE ES7+ DOS COMPONENT DEFINITIONS ===\n');
  
  try {
    if (!existsSync(config.filePath)) {
      throw new Error('Arquivo componentDefinitions.ts não encontrado!');
    }
    
    console.log('✅ Arquivo encontrado:', config.filePath);
    
    const content = readFileSync(config.filePath, 'utf8');
    const categories = analyzeCategories(content);
    const types = analyzeTypes(content);
    
    // 📊 Results Display
    console.log('\n📂 CATEGORIAS DETECTADAS:');
    categories.forEach(({ id, title, categoryKey }) => 
      console.log(`  ${id}. ${title} (${categoryKey})`)
    );
    
    console.log(`\n⚡ COMPONENTES INLINE (${types.inline.length} encontrados):`);
    types.inline.length > 0 
      ? types.inline.forEach((type, i) => console.log(`  ${i + 1}. ${type}`))
      : console.log('  ❌ Nenhum componente inline encontrado!');
    
    console.log(`\n📈 ESTATÍSTICAS:`);
    console.log(`  • Total de tipos: ${types.total}`);
    console.log(`  • Tipos inline: ${types.inline.length}`);
    console.log(`  • Tipos regulares: ${types.regular.length}`);
    
    // 🔎 Specific Search for pricing-inline
    const hasPricingInline = content.includes('"pricing-inline"');
    console.log(`\n💰 PRICING-INLINE: ${hasPricingInline ? '✅ Encontrado' : '❌ Não encontrado'}`);
    
    // 🌟 Success Summary
    console.log('\n🎉 ANÁLISE CONCLUÍDA COM SUCESSO!');
    
  } catch (error) {
    console.error('\n❌ ERRO NA ANÁLISE:', error.message);
    process.exit(1);
  }
};

// 🏃‍♂️ Execute Analysis
analyzeComponentDefinitions();
