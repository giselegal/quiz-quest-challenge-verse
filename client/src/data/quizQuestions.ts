
import { QuizQuestion } from '@/types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    text: 'Como você prefere se vestir no dia a dia?',
    title: 'Estilo Pessoal',
    type: 'single',
    options: [
      {
        id: 'opt1',
        text: 'Roupas clássicas e elegantes',
        points: { elegante: 3, classico: 2 }
      },
      {
        id: 'opt2',
        text: 'Looks modernos e ousados',
        points: { moderno: 3, criativo: 2 }
      },
      {
        id: 'opt3',
        text: 'Confortável e casual',
        points: { natural: 3, casual: 2 }
      },
      {
        id: 'opt4',
        text: 'Romântico e feminino',
        points: { romantico: 3, feminino: 2 }
      }
    ]
  },
  {
    id: 'q2',
    text: 'Qual cor você mais se identifica?',
    title: 'Cores Preferidas',
    type: 'single',
    options: [
      {
        id: 'opt5',
        text: 'Preto, branco e cinza',
        points: { elegante: 3, classico: 2 }
      },
      {
        id: 'opt6',
        text: 'Cores vibrantes e chamativas',
        points: { moderno: 3, criativo: 2 }
      },
      {
        id: 'opt7',
        text: 'Tons terrosos e naturais',
        points: { natural: 3, casual: 2 }
      },
      {
        id: 'opt8',
        text: 'Rosa, lavanda e tons pastéis',
        points: { romantico: 3, feminino: 2 }
      }
    ]
  }
];
