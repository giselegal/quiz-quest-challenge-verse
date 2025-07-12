
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
  },
  {
    id: 'strategic-2',
    question: 'O que você mais gostaria de melhorar no seu guarda-roupa?',
    type: 'single' as const,
    multiSelect: 1,
    options: [
      {
        id: 'str-2-1',
        text: 'Ter mais peças versáteis',
        styleCategory: 'Versatile',
        points: 3
      },
      {
        id: 'str-2-2',
        text: 'Melhorar as combinações',
        styleCategory: 'Combinations',
        points: 2
      },
      {
        id: 'str-2-3',
        text: 'Descobrir meu estilo',
        styleCategory: 'Discovery',
        points: 1
      }
    ]
  }
];
