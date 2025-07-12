
import { QuizQuestion } from '@/types/quiz';

// Real quiz questions - 10 main questions
export const REAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    order: 1,
    question: 'Qual dessas ocasiões você mais se identifica?',
    type: 'image',
    options: [
      {
        id: 'opt1_1',
        text: 'Evento corporativo elegante',
        style: 'classico',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
        weight: 1
      },
      {
        id: 'opt1_2',
        text: 'Festa casual com amigos',
        style: 'natural',
        imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=200&fit=crop',
        weight: 1
      },
      {
        id: 'opt1_3',
        text: 'Noite romântica especial',
        style: 'romantico',
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=200&fit=crop',
        weight: 1
      }
    ]
  },
  {
    id: 'q2',
    order: 2,
    question: 'Qual cor você escolheria para uma peça statement?',
    type: 'image',
    options: [
      {
        id: 'opt2_1',
        text: 'Preto clássico',
        style: 'classico',
        imageUrl: 'https://images.unsplash.com/photo-1506629905057-eb97e8d6e57d?w=300&h=200&fit=crop',
        weight: 1
      },
      {
        id: 'opt2_2',
        text: 'Vermelho vibrante',
        style: 'dramatico',
        imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=200&fit=crop',
        weight: 1
      },
      {
        id: 'opt2_3',
        text: 'Tons terrosos',
        style: 'natural',
        imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop',
        weight: 1
      }
    ]
  },
  {
    id: 'q3',
    order: 3,
    question: 'Como você prefere seus acessórios?',
    type: 'image',
    options: [
      {
        id: 'opt3_1',
        text: 'Minimalistas e discretos',
        style: 'elegante',
        imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=200&fit=crop',
        weight: 1
      },
      {
        id: 'opt3_2',
        text: 'Grandes e chamativos',
        style: 'dramatico',
        imageUrl: 'https://images.unsplash.com/photo-1573408301760-7715ca37e7db?w=300&h=200&fit=crop',
        weight: 1
      },
      {
        id: 'opt3_3',
        text: 'Únicos e artesanais',
        style: 'criativo',
        imageUrl: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&h=200&fit=crop',
        weight: 1
      }
    ]
  },
  {
    id: 'q4',
    order: 4,
    question: 'Qual estampa mais combina com você?',
    type: 'image',
    options: [
      {
        id: 'opt4_1',
        text: 'Listras clássicas',
        style: 'classico',
        imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=200&fit=crop',
        weight: 1
      },
      {
        id: 'opt4_2',
        text: 'Florais delicados',
        style: 'romantico',
        imageUrl: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=300&h=200&fit=crop',
        weight: 1
      },
      {
        id: 'opt4_3',
        text: 'Geométricas modernas',
        style: 'contemporaneo',
        imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300&h=200&fit=crop',
        weight: 1
      }
    ]
  },
  {
    id: 'q5',
    order: 5,
    question: 'Qual silhueta você prefere?',
    type: 'image',
    options: [
      {
        id: 'opt5_1',
        text: 'Estruturada e marcada',
        style: 'classico',
        imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=200&fit=crop',
        weight: 1
      },
      {
        id: 'opt5_2',
        text: 'Fluida e feminina',
        style: 'romantico',
        imageUrl: 'https://images.unsplash.com/photo-1485968579580-b6d72834b374?w=300&h=200&fit=crop',
        weight: 1
      },
      {
        id: 'opt5_3',
        text: 'Justa e sensual',
        style: 'sensual',
        imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=200&fit=crop',
        weight: 1
      }
    ]
  },
  {
    id: 'q6',
    order: 6,
    question: 'Como você escolhe suas roupas pela manhã?',
    type: 'normal',
    options: [
      {
        id: 'opt6_1',
        text: 'Planejo com antecedência',
        style: 'classico',
        weight: 1
      },
      {
        id: 'opt6_2',
        text: 'Sigo meu humor do dia',
        style: 'criativo',
        weight: 1
      },
      {
        id: 'opt6_3',
        text: 'Escolho o que é confortável',
        style: 'natural',
        weight: 1
      }
    ]
  },
  {
    id: 'q7',
    order: 7,
    question: 'Qual dessas celebridades inspira seu estilo?',
    type: 'image',
    options: [
      {
        id: 'opt7_1',
        text: 'Elegância atemporal',
        style: 'elegante',
        imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=200&fit=crop',
        weight: 1
      },
      {
        id: 'opt7_2',
        text: 'Ousadia e glamour',
        style: 'dramatico',
        imageUrl: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=300&h=200&fit=crop',
        weight: 1
      },
      {
        id: 'opt7_3',
        text: 'Criatividade única',
        style: 'criativo',
        imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=200&fit=crop',
        weight: 1
      }
    ]
  },
  {
    id: 'q8',
    order: 8,
    question: 'Qual tecido você mais aprecia?',
    type: 'normal',
    options: [
      {
        id: 'opt8_1',
        text: 'Algodão natural',
        style: 'natural',
        weight: 1
      },
      {
        id: 'opt8_2',
        text: 'Seda luxuosa',
        style: 'elegante',
        weight: 1
      },
      {
        id: 'opt8_3',
        text: 'Couro autêntico',
        style: 'sensual',
        weight: 1
      }
    ]
  },
  {
    id: 'q9',
    order: 9,
    question: 'Como você se sente mais confiante?',
    type: 'normal',
    options: [
      {
        id: 'opt9_1',
        text: 'Com roupas bem estruturadas',
        style: 'classico',
        weight: 1
      },
      {
        id: 'opt9_2',
        text: 'Com peças que realçam curvas',
        style: 'sensual',
        weight: 1
      },
      {
        id: 'opt9_3',
        text: 'Com looks únicos e autorais',
        style: 'criativo',
        weight: 1
      }
    ]
  },
  {
    id: 'q10',
    order: 10,
    question: 'Qual é sua prioridade ao montar um look?',
    type: 'normal',
    options: [
      {
        id: 'opt10_1',
        text: 'Elegância e sofisticação',
        style: 'elegante',
        weight: 1
      },
      {
        id: 'opt10_2',
        text: 'Conforto e praticidade',
        style: 'natural',
        weight: 1
      },
      {
        id: 'opt10_3',
        text: 'Expressão da personalidade',
        style: 'criativo',
        weight: 1
      }
    ]
  }
];

// Strategic questions for deeper analysis
export const STRATEGIC_QUESTIONS: QuizQuestion[] = [
  {
    id: 'sq1',
    order: 11,
    question: 'Em que situação você se sente mais você mesma?',
    type: 'strategic',
    options: [
      {
        id: 'sq1_1',
        text: 'Em reuniões profissionais importantes',
        style: 'classico',
        weight: 2
      },
      {
        id: 'sq1_2',
        text: 'Em encontros íntimos com pessoas queridas',
        style: 'romantico',
        weight: 2
      },
      {
        id: 'sq1_3',
        text: 'Em eventos artísticos e culturais',
        style: 'criativo',
        weight: 2
      }
    ]
  },
  {
    id: 'sq2',
    order: 12,
    question: 'Como você gostaria de ser lembrada?',
    type: 'strategic',
    options: [
      {
        id: 'sq2_1',
        text: 'Como uma pessoa sofisticada e elegante',
        style: 'elegante',
        weight: 2
      },
      {
        id: 'sq2_2',
        text: 'Como alguém autêntica e natural',
        style: 'natural',
        weight: 2
      },
      {
        id: 'sq2_3',
        text: 'Como uma pessoa marcante e única',
        style: 'dramatico',
        weight: 2
      }
    ]
  }
];

// Transition texts for different moments
export const TRANSITIONS = {
  beforeQuiz: 'Vamos descobrir seu estilo único através de algumas perguntas cuidadosamente selecionadas.',
  afterQuestions: 'Analisando suas respostas para criar seu perfil personalizado...',
  beforeResult: 'Seu resultado está pronto! Prepare-se para descobertas incríveis sobre seu estilo.',
  beforeOffer: 'Com base no seu perfil, temos uma oportunidade especial para você.'
};

// Export default for convenience
export default {
  REAL_QUIZ_QUESTIONS,
  STRATEGIC_QUESTIONS,
  TRANSITIONS
};
