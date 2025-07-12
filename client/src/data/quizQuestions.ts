
import { QuizQuestion } from '@/types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    title: 'Qual é o seu estilo preferido?',
    text: 'Escolha até 3 opções que mais combinam com você:',
    type: 'multiple',
    multiSelect: 3,
    options: [
      {
        id: '1a',
        text: 'Casual e confortável',
        styleCategory: 'Natural',
        points: { natural: 3 }
      },
      {
        id: '1b',
        text: 'Elegante e sofisticado',
        styleCategory: 'Elegante',
        points: { elegante: 3 }
      },
      {
        id: '1c',
        text: 'Moderno e urbano',
        styleCategory: 'Contemporâneo',
        points: { contemporaneo: 3 }
      },
      {
        id: '1d',
        text: 'Clássico e atemporal',
        styleCategory: 'Clássico',
        points: { classico: 3 }
      },
      {
        id: '1e',
        text: 'Romântico e delicado',
        styleCategory: 'Romântico',
        points: { romantico: 3 }
      },
      {
        id: '1f',
        text: 'Ousado e sensual',
        styleCategory: 'Sensual',
        points: { sensual: 3 }
      }
    ]
  },
  {
    id: '2',
    title: 'Como você se veste para o trabalho?',
    text: 'Escolha até 3 opções:',
    type: 'multiple',
    multiSelect: 3,
    options: [
      {
        id: '2a',
        text: 'Roupas práticas e confortáveis',
        styleCategory: 'Natural',
        points: { natural: 2 }
      },
      {
        id: '2b',
        text: 'Blazer e peças estruturadas',
        styleCategory: 'Elegante',
        points: { elegante: 2 }
      },
      {
        id: '2c',
        text: 'Looks modernos e atuais',
        styleCategory: 'Contemporâneo',
        points: { contemporaneo: 2 }
      },
      {
        id: '2d',
        text: 'Peças clássicas bem cortadas',
        styleCategory: 'Clássico',
        points: { classico: 2 }
      }
    ]
  }
];
