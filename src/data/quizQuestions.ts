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
  },
  {
    id: 'q3',
    text: 'Qual é seu ambiente favorito?',
    title: 'Ambiente',
    type: 'single',
    options: [
      {
        id: 'opt9',
        text: 'Espaços sofisticados e bem decorados',
        points: { elegante: 3, classico: 2 }
      },
      {
        id: 'opt10',
        text: 'Lugares modernos e inovadores',
        points: { moderno: 3, criativo: 2 }
      },
      {
        id: 'opt11',
        text: 'Ambientes naturais e relaxantes',
        points: { natural: 3, casual: 2 }
      },
      {
        id: 'opt12',
        text: 'Lugares aconchegantes e íntimos',
        points: { romantico: 3, feminino: 2 }
      }
    ]
  },
  {
    id: 'q4',
    text: 'Como você gosta de se expressar?',
    title: 'Expressão Pessoal',
    type: 'single',
    options: [
      {
        id: 'opt13',
        text: 'De forma equilibrada e harmoniosa',
        points: { elegante: 3, classico: 2 }
      },
      {
        id: 'opt14',
        text: 'De forma única e criativa',
        points: { moderno: 3, criativo: 2 }
      },
      {
        id: 'opt15',
        text: 'De forma autêntica e simples',
        points: { natural: 3, casual: 2 }
      },
      {
        id: 'opt16',
        text: 'De forma delicada e feminina',
        points: { romantico: 3, feminino: 2 }
      }
    ]
  }
];