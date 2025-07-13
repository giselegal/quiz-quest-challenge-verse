// EXEMPLO DE USO - MAPEAMENTO RESULTADO POR ESTILO
// Como usar o mapeamento Q1 + Guia para a página de resultado

import { QUIZ_IMAGES } from './quiz-images-organized.js';

// ===============================
// EXEMPLO DE FUNÇÃO PARA RESULTADO
// ===============================
export function getResultadoEstilo(respostaQ1) {
  // respostaQ1 pode ser 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'
  
  const estilo = QUIZ_IMAGES.resultadoEstilos[respostaQ1];
  
  if (!estilo) {
    throw new Error(`Estilo não encontrado para resposta: ${respostaQ1}`);
  }
  
  return {
    imagemEstilo: estilo.imagem,      // Imagem Q1 correspondente
    guiaEstilo: estilo.guia,          // Guia do estilo
    nomeEstilo: estilo.estilo,        // Nome do estilo
    urlImagemQ1: estilo.imagem,       // URL da imagem Q1
    urlGuia: estilo.guia              // URL do guia
  };
}

// ===============================
// EXEMPLO DE USO PRÁTICO
// ===============================

// Se usuário escolheu opção 'A' na questão 1:
const resultadoA = getResultadoEstilo('A');
console.log('Resultado para A (Natural):', resultadoA);
// Output:
// {
//   imagemEstilo: "https://res.cloudinary.com/der8kogzu/image/upload/v1752430262/Q1_-_A_xlh5cg.png",
//   guiaEstilo: "https://res.cloudinary.com/der8kogzu/image/upload/v1752430313/GUIA_NATURAL_dlhcwm.png",
//   nomeEstilo: "Natural",
//   urlImagemQ1: "https://res.cloudinary.com/der8kogzu/image/upload/v1752430262/Q1_-_A_xlh5cg.png",
//   urlGuia: "https://res.cloudinary.com/der8kogzu/image/upload/v1752430313/GUIA_NATURAL_dlhcwm.png"
// }

// Se usuário escolheu opção 'F' na questão 1:
const resultadoF = getResultadoEstilo('F');
console.log('Resultado para F (Sexy):', resultadoF);
// Output:
// {
//   imagemEstilo: "https://res.cloudinary.com/der8kogzu/image/upload/v1752430272/Q1_-_F_z1nyug.png",
//   guiaEstilo: "https://res.cloudinary.com/der8kogzu/image/upload/v1752430314/GUIA_SEXY_i0z60a.png",
//   nomeEstilo: "Sexy",
//   urlImagemQ1: "https://res.cloudinary.com/der8kogzu/image/upload/v1752430272/Q1_-_F_z1nyug.png",
//   urlGuia: "https://res.cloudinary.com/der8kogzu/image/upload/v1752430314/GUIA_SEXY_i0z60a.png"
// }

// ===============================
// MAPEAMENTO COMPLETO
// ===============================
console.log('\n=== MAPEAMENTO COMPLETO ===');
const todasOpcoes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

todasOpcoes.forEach(opcao => {
  const resultado = getResultadoEstilo(opcao);
  console.log(`${opcao} = ${resultado.nomeEstilo}`);
});

// Output:
// A = Natural
// B = Clássico  
// C = Contemporâneo
// D = Elegante
// E = Romântico
// F = Sexy
// G = Dramático
// H = Criativo
