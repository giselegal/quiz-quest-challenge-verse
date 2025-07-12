
export const strategicQuestions = [
  {
    id: 'strategic-1',
    title: 'Como você se sente em relação ao seu estilo atual?',
    text: 'Como você se sente em relação ao seu estilo atual?',
    question: 'Como você se sente em relação ao seu estilo atual?',
    type: 'single' as const,
    multiSelect: 1,
    options: [
      {
        id: 'str-1-1',
        text: 'Muito satisfeita',
        styleCategory: 'Satisfied',
        points: { strategic: 3 }
      },
      {
        id: 'str-1-2', 
        text: 'Parcialmente satisfeita',
        styleCategory: 'Partial',
        points: { strategic: 2 }
      },
      {
        id: 'str-1-3',
        text: 'Insatisfeita',
        styleCategory: 'Unsatisfied', 
        points: { strategic: 1 }
      }
    ]
  },
  {
    id: 'strategic-2',
    title: 'O que você mais gostaria de melhorar no seu guarda-roupa?',
    text: 'O que você mais gostaria de melhorar no seu guarda-roupa?',
    question: 'O que você mais gostaria de melhorar no seu guarda-roupa?',
    type: 'single' as const,
    multiSelect: 1,
    options: [
      {
        id: 'str-2-1',
        text: 'Ter mais peças versáteis',
        styleCategory: 'Versatile',
        points: { strategic: 3 }
      },
      {
        id: 'str-2-2',
        text: 'Melhorar as combinações',
        styleCategory: 'Combinations',
        points: { strategic: 2 }
      },
      {
        id: 'str-2-3',
        text: 'Descobrir meu estilo',
        styleCategory: 'Discovery',
        points: { strategic: 1 }
      }
    ]
  }
];
