import { QuizQuestion } from '@/types/quiz';

export const caktoQuizQuestions: QuizQuestion[] = [
  {
    id: 'cakto-q1',
    title: 'Como você se veste no trabalho?',
    text: 'Como você se veste no trabalho?',
    type: 'single',
    options: [
      {
        id: 'cakto-opt1',
        text: 'Roupas formais e estruturadas',
        points: { elegante: 3, classico: 2 },
        weight: 1
      },
      {
        id: 'cakto-opt2',
        text: 'Casual chic e confortável',
        points: { natural: 3, casual: 2 },
        weight: 1
      },
      {
        id: 'cakto-opt3',
        text: 'Moderno e diferenciado',
        points: { moderno: 3, criativo: 2 },
        weight: 1
      },
      {
        id: 'cakto-opt4',
        text: 'Feminino e delicado',
        points: { romantico: 3, feminino: 2 },
        weight: 1
      }
    ]
  },
  {
    id: 'cakto-q2',
    title: 'Qual é o seu acessório favorito?',
    text: 'Qual é o seu acessório favorito?',
    type: 'single',
    options: [
      {
        id: 'cakto-opt5',
        text: 'Relógio clássico',
        points: { elegante: 3, classico: 2 },
        weight: 1
      },
      {
        id: 'cakto-opt6',
        text: 'Brincos grandes e chamativos',
        points: { moderno: 3, criativo: 2 },
        weight: 1
      },
      {
        id: 'cakto-opt7',
        text: 'Bolsa prática',
        points: { natural: 3, casual: 2 },
        weight: 1
      },
      {
        id: 'cakto-opt8',
        text: 'Colar delicado',
        points: { romantico: 3, feminino: 2 },
        weight: 1
      }
    ]
  }
];

// Export alias for backward compatibility
export const caktoquizQuestions = caktoQuizQuestions;

// Strategic questions (placeholder)
export const strategicQuestions = [
  {
    id: 'strategic-1',
    question: 'Como você se sente em relação ao seu estilo atual?',
    type: 'single' as const,
    multiSelect: 1,
    options: [
      {
        id: 'str-1-1',
        text: 'Muito satisfeita',
        styleCategory: 'Satisfied',
        points: 3
      },
      {
        id: 'str-1-2', 
        text: 'Parcialmente satisfeita',
        styleCategory: 'Partial',
        points: 2
      },
      {
        id: 'str-1-3',
        text: 'Insatisfeita',
        styleCategory: 'Unsatisfied', 
        points: 1
      }
    ]
  }
];

// Get all questions function
export const getAllQuestions = () => {
  return [...caktoQuizQuestions, ...strategicQuestions];
};
