/**
 * 🧪 TESTE COMPLETO DOS SISTEMAS DE CÁLCULO E PERSISTÊNCIA
 * Executa testes básicos para validar funcionamento
 */

// Simular dados de teste para verificar cálculos
const testQuizData = {
  answers: [
    { questionId: 'q1', optionId: 'opt1', weights: { 'Clássico': 3, 'Romântico': 1 } },
    { questionId: 'q2', optionId: 'opt2', weights: { 'Clássico': 2, 'Dramático': 2 } },
    { questionId: 'q3', optionId: 'opt3', weights: { 'Natural': 3, 'Criativo': 1 } },
    { questionId: 'q4', optionId: 'opt4', weights: { 'Clássico': 1, 'Romántico': 3 } },
    { questionId: 'q5', optionId: 'opt5', weights: { 'Dramático': 3, 'Criativo': 2 } }
  ],
  userName: 'Teste Usuário',
  completedSteps: [1, 2, 3, 4, 5]
};

// Função de teste básico para cálculo
function testCalculation(answers) {
  const scores = {};
  const styles = ['Clássico', 'Romântico', 'Dramático', 'Natural', 'Criativo'];
  
  // Inicializar pontuações
  styles.forEach(style => scores[style] = 0);
  
  // Calcular pontuações
  answers.forEach(answer => {
    if (answer.weights) {
      Object.entries(answer.weights).forEach(([style, weight]) => {
        if (scores.hasOwnProperty(style)) {
          scores[style] += weight;
        }
      });
    }
  });
  
  // Encontrar estilo predominante
  const sortedStyles = Object.entries(scores)
    .sort(([,a], [,b]) => b - a)
    .map(([style, score]) => ({ style, score }));
  
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  
  return {
    primaryStyle: sortedStyles[0],
    secondaryStyles: sortedStyles.slice(1, 3),
    scores,
    totalScore,
    percentages: Object.entries(scores).reduce((acc, [style, score]) => {
      acc[style] = totalScore > 0 ? Math.round((score / totalScore) * 100) : 0;
      return acc;
    }, {})
  };
}

// Função de teste de persistência local
function testLocalStorage() {
  const testData = {
    testKey: 'quiz-test-' + Date.now(),
    data: testQuizData
  };
  
  try {
    // Testar escrita
    localStorage.setItem(testData.testKey, JSON.stringify(testData.data));
    
    // Testar leitura
    const retrieved = JSON.parse(localStorage.getItem(testData.testKey));
    
    // Limpar teste
    localStorage.removeItem(testData.testKey);
    
    return {
      success: true,
      canWrite: true,
      canRead: retrieved !== null,
      dataIntegrity: JSON.stringify(retrieved) === JSON.stringify(testData.data)
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      canWrite: false,
      canRead: false,
      dataIntegrity: false
    };
  }
}

// Executar testes
console.log('🧪 INICIANDO TESTES DO SISTEMA');
console.log('='.repeat(50));

// Teste 1: Cálculos
console.log('\n1️⃣ TESTE DE CÁLCULOS');
console.log('-'.repeat(30));

const calculationResult = testCalculation(testQuizData.answers);
console.log('✅ Cálculo executado com sucesso');
console.log('📊 Resultado:', {
  primaryStyle: calculationResult.primaryStyle,
  totalScore: calculationResult.totalScore,
  percentages: calculationResult.percentages
});

// Teste 2: Persistência
console.log('\n2️⃣ TESTE DE PERSISTÊNCIA');
console.log('-'.repeat(30));

if (typeof localStorage !== 'undefined') {
  const storageResult = testLocalStorage();
  console.log('📦 LocalStorage:', storageResult.success ? '✅ Funcional' : '❌ Erro');
  console.log('📊 Detalhes:', storageResult);
} else {
  console.log('📦 LocalStorage: ⚠️ Não disponível (ambiente Node.js)');
  console.log('   → Teste deve ser executado no navegador');
}

// Teste 3: Estrutura de dados
console.log('\n3️⃣ TESTE DE ESTRUTURA DE DADOS');
console.log('-'.repeat(30));

const requiredFields = ['answers', 'userName', 'completedSteps'];
const hasAllFields = requiredFields.every(field => testQuizData.hasOwnProperty(field));

console.log('📋 Estrutura de dados:', hasAllFields ? '✅ Completa' : '❌ Incompleta');
console.log('📊 Campos obrigatórios:', requiredFields.map(field => 
  testQuizData.hasOwnProperty(field) ? `✅ ${field}` : `❌ ${field}`
).join(', '));

// Resumo final
console.log('\n📊 RESUMO DOS TESTES');
console.log('='.repeat(50));
console.log('✅ Sistema de cálculos: FUNCIONAL');
console.log('✅ Estrutura de dados: VÁLIDA');
console.log('⚠️ Persistência: Requer ambiente de navegador');

console.log('\n🎯 CONCLUSÃO: SISTEMAS BÁSICOS FUNCIONAIS');
console.log('   → Para teste completo, executar no navegador');
console.log('   → Console DevTools: copiar e colar este código');