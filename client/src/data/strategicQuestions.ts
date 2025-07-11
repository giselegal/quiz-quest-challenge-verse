
import { QuizQuestion } from '@/types/quiz';

export const strategicQuestions: QuizQuestion[] = [
  {
    id: 'strategic-1',
    title: 'Qual dessas situações mais combina com você?',
    type: 'strategic',
    options: [
      {
        id: 'strategic-1a',
        text: 'Prefiro ocasiões formais e elegantes',
        points: { elegante: 5, classico: 3 }
      },
      {
        id: 'strategic-1b',
        text: 'Gosto de eventos casuais e descontraídos',
        points: { casual: 5, moderno: 3 }
      },
      {
        id: 'strategic-1c',
        text: 'Adoro festas e ocasiões especiais',
        points: { dramatico: 5, sexy: 3 }
      }
    ]
  }
];
