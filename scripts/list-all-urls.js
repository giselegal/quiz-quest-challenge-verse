import fs from 'fs';

// Ler o arquivo JSON completo
const data = JSON.parse(fs.readFileSync('all-cloudinary-urls.json', 'utf8'));

console.log('🎯 TODAS AS 154 URLs DA API CLOUDINARY\n');
console.log('📊 Total de imagens:', data.totalImages);
console.log('📅 Gerado em:', data.generatedAt);
console.log('\n' + '='.repeat(80) + '\n');

// Mostrar todas as URLs numeradas
console.log('📋 LISTA COMPLETA DE URLS:\n');

data.allUrls.forEach((item, index) => {
  console.log(`${index + 1}. ${item.url}`);
});

console.log('\n' + '='.repeat(80) + '\n');

// Mostrar resumo por categorias
console.log('📊 RESUMO POR CATEGORIAS:\n');

console.log(`🔸 IMAGENS PRINCIPAIS (${data.categories.main.length}):`);
data.categories.main.forEach((item, index) => {
  console.log(`   ${index + 1}. ${item.url}`);
});

console.log(`\n🔸 GUIAS DE ESTILO (${data.categories.styleGuides.length}):`);
data.categories.styleGuides.forEach((item, index) => {
  console.log(`   ${index + 1}. ${item.url}`);
});

console.log(`\n🔸 QUIZ Q1 (${data.categories.quizQ1.length}):`);
data.categories.quizQ1.forEach((item, index) => {
  console.log(`   ${index + 1}. ${item.url}`);
});

console.log(`\n🔸 QUIZ Q3 (${data.categories.quizQ3.length}):`);
data.categories.quizQ3.forEach((item, index) => {
  console.log(`   ${index + 1}. ${item.url}`);
});

console.log(`\n🔸 QUIZ Q5 (${data.categories.quizQ5.length}):`);
data.categories.quizQ5.forEach((item, index) => {
  console.log(`   ${index + 1}. ${item.url}`);
});

console.log(`\n🔸 QUIZ Q6 (${data.categories.quizQ6.length}):`);
data.categories.quizQ6.forEach((item, index) => {
  console.log(`   ${index + 1}. ${item.url}`);
});

console.log(`\n🔸 QUIZ Q7 (${data.categories.quizQ7.length}):`);
data.categories.quizQ7.forEach((item, index) => {
  console.log(`   ${index + 1}. ${item.url}`);
});

console.log(`\n🔸 QUIZ Q8 (${data.categories.quizQ8.length}):`);
data.categories.quizQ8.forEach((item, index) => {
  console.log(`   ${index + 1}. ${item.url}`);
});

console.log(`\n🔸 QUIZ Q9 (${data.categories.quizQ9.length}):`);
data.categories.quizQ9.forEach((item, index) => {
  console.log(`   ${index + 1}. ${item.url}`);
});

console.log(`\n🔸 BÔNUS/REVISTA (${data.categories.bonus.length}):`);
data.categories.bonus.forEach((item, index) => {
  console.log(`   ${index + 1}. ${item.url}`);
});

console.log(`\n🔸 OUTROS (${data.categories.others.length}):`);
console.log('   (Inclui amostras do Cloudinary e outras imagens)');

console.log('\n' + '='.repeat(80));
console.log(`✅ TOTAL: ${data.totalImages} URLs DISPONÍVEIS NA SUA API`);
console.log('='.repeat(80));
