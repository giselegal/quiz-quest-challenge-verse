
import { QuizQuestion } from '../types/quiz';

// Importações organizadas através do índice central
import {
  accessoriesQuestions,
  accessoryStyleQuestions,
  clothingQuestions,
  outerwearQuestions,
  personalityQuestions,
  stylePreferencesQuestions
} from './questions';

/**
 * Quiz Principal - Análise de Estilo Pessoal
 * 
 * Este quiz contém 9 questões principais (falta Q4) que analisam:
 * - Preferências de vestuário e silhueta
 * - Traços de personalidade 
 * - Estilo de acessórios e outerwear
 * - Ocasiões e preferências específicas
 * 
 * @returns {QuizQuestion[]} Array de questões ordenadas numericamente (1-10)
 * 
 * Mapeamento por módulo:
 * - clothingQuestions: Q1 (roupas), Q3 (silhueta)
 * - personalityQuestions: Q2 (personalidade)
 * - stylePreferencesQuestions: Q5 (preferências), Q10 (ocasiões)
 * - outerwearQuestions: Q6 (casacos), Q7 (inverno)
 * - accessoriesQuestions: Q8 (acessórios)
 * - accessoryStyleQuestions: Q9 (estilo de acessórios)
 */
export const quizQuestions: QuizQuestion[] = [
  ...clothingQuestions,         // Q1, Q3
  ...personalityQuestions,      // Q2  
  ...stylePreferencesQuestions, // Q5, Q10
  ...outerwearQuestions,        // Q6, Q7
  ...accessoriesQuestions,      // Q8
  ...accessoryStyleQuestions    // Q9
].sort((a, b) => parseInt(a.id) - parseInt(b.id)); // Garantir ordem numérica 1-10

/**
 * Função utilitária para obter questão por ID
 * @param id - ID da questão (string)
 * @returns QuizQuestion ou undefined se não encontrada
 */
export const getQuestionById = (id: string): QuizQuestion | undefined => {
  return quizQuestions.find(question => question.id === id);
};

/**
 * Função utilitária para obter total de questões
 * @returns Número total de questões disponíveis
 */
export const getTotalQuestions = (): number => {
  return quizQuestions.length;
};

