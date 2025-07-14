import { caktoquizQuestions } from '../data/caktoquizQuestions';

console.log('🔍 ANÁLISE DA ORDEM DAS QUESTÕES:');
console.log('=====================================');

caktoquizQuestions.forEach((q, index) => {
  console.log(`Posição ${index + 1}: ID=${q.id}, Order=${q.order}, Pergunta="${q.question?.substring(0, 50) || 'N/A'}..."`);
});

console.log('\n📊 QUESTÕES ORDENADAS POR ORDER:');
console.log('=====================================');

const sortedQuestions = [...caktoquizQuestions].sort((a, b) => (a.order || 0) - (b.order || 0));

sortedQuestions.forEach((q, index) => {
  console.log(`Posição ${index + 1}: ID=${q.id}, Order=${q.order}, Pergunta="${q.question?.substring(0, 50) || 'N/A'}..."`);
});
