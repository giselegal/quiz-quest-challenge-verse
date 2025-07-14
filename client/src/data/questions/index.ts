// Índice central de todas as questões disponíveis
import { QuizQuestion } from '../../types/quiz';

// Questões principais do quiz de estilo (ID numérico 1-10)
export { accessoriesQuestions } from './accessoriesQuestions';
export { accessoryStyleQuestions } from './accessoryStyleQuestions';
export { clothingQuestions } from './clothingQuestions';
export { outerwearQuestions } from './outerwearQuestions';
export { personalityQuestions } from './personalityQuestions';
export { stylePreferencesQuestions } from './stylePreferencesQuestions';

// Questões estratégicas/complementares (ID tipo 'strategic-X')
export { desiredOutcomesQuestions } from './desiredOutcomesQuestions';
export { purchaseIntentQuestions } from './purchaseIntentQuestions';
export { selfPerceptionQuestions } from './selfPerceptionQuestions';
export { styleExperienceQuestions } from './styleExperienceQuestions';

/**
 * Mapeamento de questões por categoria
 */
export const questionCategories = {
  // Quiz principal de análise de estilo (1-10)
  main: [
    'clothingQuestions',        // Q1, Q3
    'personalityQuestions',     // Q2
    'stylePreferencesQuestions', // Q5, Q10
    'outerwearQuestions',       // Q6, Q7
    'accessoriesQuestions',     // Q8
    'accessoryStyleQuestions'   // Q9
  ],
  
  // Questões estratégicas/lead magnet
  strategic: [
    'selfPerceptionQuestions',    // strategic-1
    'styleExperienceQuestions',   // strategic-3
    'purchaseIntentQuestions',    // strategic-5
    'desiredOutcomesQuestions'    // strategic-7
  ]
} as const;

/**
 * Função utilitária para obter todas as questões principais ordenadas
 */
export function getMainQuizQuestions(): QuizQuestion[] {
  // Importar dinamicamente para evitar dependências circulares
  const { quizQuestions } = require('../quizQuestions');
  return quizQuestions;
}

/**
 * Função utilitária para obter questões estratégicas
 */
export function getStrategicQuestions(): QuizQuestion[] {
  const { desiredOutcomesQuestions } = require('./desiredOutcomesQuestions');
  const { purchaseIntentQuestions } = require('./purchaseIntentQuestions');
  const { selfPerceptionQuestions } = require('./selfPerceptionQuestions');
  const { styleExperienceQuestions } = require('./styleExperienceQuestions');
  
  return [
    ...selfPerceptionQuestions,
    ...styleExperienceQuestions,
    ...purchaseIntentQuestions,
    ...desiredOutcomesQuestions
  ].sort((a, b) => a.id.localeCompare(b.id));
}
