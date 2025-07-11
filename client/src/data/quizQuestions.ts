
import { QuizQuestion } from '@/types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    text: 'Qual dessas peças você mais usaria no dia a dia?',
    type: 'single',
    options: [
      {
        id: '1a',
        text: 'Blazer estruturado',
        points: { classico: 3, elegante: 2, moderno: 1 }
      },
      {
        id: '1b',
        text: 'Camiseta oversized',
        points: { moderno: 3, casual: 2, classico: 1 }
      },
      {
        id: '1c',
        text: 'Blusa de seda',
        points: { elegante: 3, classico: 2, moderno: 1 }
      }
    ]
  },
  {
    id: '2',
    text: 'Suas cores favoritas são:',
    type: 'multiple',
    maxSelections: 2,
    options: [
      {
        id: '2a',
        text: 'Preto e branco',
        points: { classico: 3, elegante: 2 }
      },
      {
        id: '2b',
        text: 'Tons pastéis',
        points: { romantico: 3, delicado: 2 }
      },
      {
        id: '2c',
        text: 'Cores vibrantes',
        points: { moderno: 3, criativo: 2 }
      }
    ]
  }
];
