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
  intro: {
    id: "intro",
    title: "Descubra Seu Estilo Pessoal",
    type: "intro" as const,
    progress: 0,
    showHeader: true,
    showProgress: false,
    components: [
      {
        id: "intro-title",
        type: "heading",
        content: {
          text: "Descubra Seu Estilo Pessoal",
          level: 1,
          color: "#432818"
        }
      },
      {
        id: "intro-subtitle", 
        type: "paragraph",
        content: {
          text: "Responda algumas perguntas rápidas e descubra qual estilo combina mais com você",
          color: "#8F7A6A"
        }
      }
    ]
  },
  transition: {
    id: "transition",
    title: "Quase lá!",
    type: "transition" as const,
    progress: 75,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "transition-title",
        type: "heading",
        content: {
          text: "Quase terminando!",
          level: 2,
          color: "#432818"
        }
      }
    ]
  },
  loading: {
    id: "loading",
    title: "Calculando resultado...",
    type: "loading" as const,
    progress: 90,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "loading-spinner",
        type: "loading",
        content: {
          text: "Analisando suas respostas..."
        }
      }
    ]
  },
  result: {
    id: "result",
    title: "Seu Resultado",
    type: "result" as const,
    progress: 100,
    showHeader: true,
    showProgress: false,
    components: [
      {
        id: "result-title",
        type: "heading",
        content: {
          text: "Seu Estilo é...",
          level: 1,
          color: "#432818"
        }
      }
    ]
  },
  offer: {
    id: "offer",
    title: "Oferta Especial",
    type: "offer" as const,
    progress: 100,
    showHeader: true,
    showProgress: false,
    components: [
      {
        id: "offer-title",
        type: "heading",
        content: {
          text: "Oferta Especial Para Você",
          level: 1,
          color: "#432818"
        }
      }
    ]
  }
};

export const generateRealQuestionTemplates = () => {
  return [
    {
      id: "q1",
      title: "Qual dessas peças você mais usaria no dia a dia?",
      type: "question" as const,
      progress: 10,
      showHeader: true,
      showProgress: true,
      components: [
        {
          id: "q1-question",
          type: "question",
          content: {
            text: "Qual dessas peças você mais usaria no dia a dia?",
            options: [
              { id: "q1a", text: "Jeans e t-shirt básica", points: { casual: 3, comfy: 2 } },
              { id: "q1b", text: "Vestido midi elegante", points: { elegant: 3, classic: 2 } },
              { id: "q1c", text: "Blazer estruturado", points: { professional: 3, modern: 2 } },
            ]
          }
        }
      ]
    },
    {
      id: "q2", 
      title: "Como você gosta de se vestir para trabalhar?",
      type: "question" as const,
      progress: 20,
      showHeader: true,
      showProgress: true,
      components: [
        {
          id: "q2-question",
          type: "question", 
          content: {
            text: "Como você gosta de se vestir para trabalhar?",
            options: [
              { id: "q2a", text: "Roupa confortável e prática", points: { casual: 2, comfy: 3 } },
              { id: "q2b", text: "Look profissional clássico", points: { professional: 3, classic: 2 } },
              { id: "q2c", text: "Estilo moderno e elegante", points: { modern: 3, elegant: 2 } },
            ]
          }
        }
      ]
    }
  ];
};

export const generateStrategicQuestionTemplates = () => {
  return [
    {
      id: "s1",
      title: "Qual é o seu principal objetivo com um guarda-roupa ideal?",
      type: "question" as const,
      progress: 85,
      showHeader: true,
      showProgress: true,
      components: [
        {
          id: "s1-question",
          type: "question",
          content: {
            text: "Qual é o seu principal objetivo com um guarda-roupa ideal?",
            options: [
              { id: "s1a", text: "Sentir-me confiante e profissional" },
              { id: "s1b", text: "Expressar minha personalidade" },
              { id: "s1c", text: "Ter praticidade no dia a dia" },
            ],
            isStrategic: true
          }
        }
      ]
    }
  ];
};
