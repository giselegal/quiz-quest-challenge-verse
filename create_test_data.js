// Script para criar dados de teste no localStorage
const testData = {
  userName: 'Maria Silva',
  user: {
    userName: 'Maria Silva',
    email: 'maria@example.com'
  },
  quizResult: {
    primaryStyle: {
      category: 'Elegante',
      name: 'Elegante',
      percentage: 85,
      score: 85
    },
    secondaryStyles: [
      { category: 'Moderno', percentage: 20 },
      { category: 'Casual', percentage: 15 },
      { category: 'Romântico', percentage: 10 }
    ]
  }
};

console.log('// Execute this in browser console:');
console.log('localStorage.setItem("userName", "' + testData.userName + '");');
console.log('localStorage.setItem("user", \'' + JSON.stringify(testData.user) + '\');');
console.log('localStorage.setItem("quizResult", \'' + JSON.stringify(testData.quizResult) + '\');');
console.log('\n// Then refresh the editor page');
