// Templates para o quiz de estilo pessoal
export const QUIZ_TEMPLATES = {
  basicQuiz: {
    id: "basic-quiz",
    name: "Quiz Básico de Estilo",
    description: "Template básico para quiz de descoberta de estilo pessoal",
  },
  styleQuiz: {
    id: "style-quiz",
    name: "Quiz de Estilo Pessoal",
    description: "Quiz completo para descobrir estilo pessoal",
  },
};

export const generateRealQuestionTemplates = () => {
  return [
    {
      id: "q1",
      text: "Qual dessas peças você mais usaria no dia a dia?",
      options: [
        { text: "Jeans e t-shirt básica", points: { casual: 3, comfy: 2 } },
        { text: "Vestido midi elegante", points: { elegant: 3, classic: 2 } },
        { text: "Blazer estruturado", points: { professional: 3, modern: 2 } },
      ],
    },
    // Adicione mais questões conforme necessário
  ];
};

export const generateStrategicQuestionTemplates = () => {
  return [
    {
      id: "s1",
      text: "Qual é o seu principal objetivo com um guarda-roupa ideal?",
      options: [
        { text: "Sentir-me confiante e profissional" },
        { text: "Expressar minha personalidade" },
        { text: "Ter praticidade no dia a dia" },
      ],
      isStrategic: true,
    },
    // Adicione mais questões estratégicas conforme necessário
  ];
};
