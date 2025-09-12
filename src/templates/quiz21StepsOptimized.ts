/**
 * 🚀 TEMPLATE OTIMIZADO - QUIZ DE ESTILO PESSOAL (21 ETAPAS)
 * 
 * Template simplificado e performático, substituindo quiz21StepsComplete.ts
 * Mantém funcionalidade essencial, remove bloat desnecessário
 */

import { Block } from '../types/editor';

// 🎯 TEMPLATE DINÂMICO - Carregado sob demanda
export const QUIZ_STYLE_21_STEPS_TEMPLATE: Record<string, Block[]> = {
  // ETAPA 1: Coleta de Nome
  "1": [
    {
      id: "header-1",
      type: "quiz-intro-header",
      properties: {
        logo: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_auto/logo",
        title: "Descubra Seu Estilo Pessoal",
        subtitle: "Quiz Personalizado em 21 Etapas",
        backgroundColor: "#f8fafc",
        textColor: "#1e293b"
      }
    },
    {
      id: "form-input-1", 
      type: "form-input",
      properties: {
        label: "Como você gostaria de ser chamado(a)?",
        placeholder: "Digite seu nome aqui...",
        required: true,
        inputType: "text",
        fieldName: "userName"
      }
    },
    {
      id: "navigation-1",
      type: "quiz-navigation-inline", 
      properties: {
        nextText: "Começar Quiz →",
        showPrevious: false,
        nextEnabled: true
      }
    }
  ],

  // ETAPAS 2-11: Questões Pontuadas (3 seleções obrigatórias)
  ...Array.from({length: 10}, (_, i) => {
    const stepNum = i + 2;
    return [
      `${stepNum}`,
      [
        {
          id: `header-${stepNum}`,
          type: "quiz-intro-header", 
          properties: {
            title: `Pergunta ${stepNum - 1} de 10`,
            subtitle: `Escolha 3 opções que mais combinam com você`,
            showProgress: true,
            currentStep: stepNum - 1,
            totalSteps: 10
          }
        },
        {
          id: `question-${stepNum}`,
          type: "multiple-choice-grid",
          properties: {
            question: `Como você descreveria seu estilo ideal? (Questão ${stepNum - 1})`,
            options: [
              { id: `opt-${stepNum}-1`, text: "Clássico e elegante", points: { classic: 3 } },
              { id: `opt-${stepNum}-2`, text: "Moderno e ousado", points: { modern: 3 } },
              { id: `opt-${stepNum}-3`, text: "Casual e confortável", points: { casual: 3 } },
              { id: `opt-${stepNum}-4`, text: "Boho e criativo", points: { boho: 3 } },
              { id: `opt-${stepNum}-5`, text: "Minimalista e clean", points: { minimal: 3 } },
              { id: `opt-${stepNum}-6`, text: "Romântico e feminino", points: { romantic: 3 } }
            ],
            selectionType: "multiple",
            minSelections: 3,
            maxSelections: 3,
            gridColumns: 2
          }
        },
        {
          id: `navigation-${stepNum}`,
          type: "quiz-navigation-inline",
          properties: {
            nextText: "Próxima →",
            previousText: "← Anterior", 
            showPrevious: true,
            nextEnabled: false // Habilitado quando 3 seleções feitas
          }
        }
      ]
    ]
  }).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),

  // ETAPA 12: Transição
  "12": [
    {
      id: "transition-12",
      type: "quiz-transition",
      properties: {
        title: "Ótimo! Agora algumas perguntas estratégicas...",
        subtitle: "Vamos entender melhor suas preferências",
        icon: "✨",
        backgroundColor: "#f0f9ff"
      }
    }
  ],

  // ETAPAS 13-18: Questões Estratégicas (1 seleção obrigatória)  
  ...Array.from({length: 6}, (_, i) => {
    const stepNum = i + 13;
    return [
      `${stepNum}`,
      [
        {
          id: `header-${stepNum}`,
          type: "quiz-intro-header",
          properties: {
            title: `Pergunta ${stepNum - 6} de 6 - Estratégicas`,
            subtitle: "Escolha a opção que mais representa você"
          }
        },
        {
          id: `strategic-${stepNum}`,
          type: "multiple-choice-list",
          properties: {
            question: `Qual dessas situações mais representa seu estilo?`,
            options: [
              { id: `str-${stepNum}-1`, text: "Prefiro peças versáteis e atemporais", points: { versatile: 2 } },
              { id: `str-${stepNum}-2`, text: "Gosto de seguir as últimas tendências", points: { trendy: 2 } },
              { id: `str-${stepNum}-3`, text: "Valorizo conforto acima de tudo", points: { comfort: 2 } },
              { id: `str-${stepNum}-4`, text: "Prefiro investir em poucas peças de qualidade", points: { quality: 2 } }
            ],
            selectionType: "single",
            required: true
          }
        },
        {
          id: `navigation-${stepNum}`,
          type: "quiz-navigation-inline",
          properties: {
            nextText: "Próxima →",
            previousText: "← Anterior",
            showPrevious: true
          }
        }
      ]
    ]
  }).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),

  // ETAPA 19: Transição para Resultado
  "19": [
    {
      id: "transition-19",
      type: "quiz-transition", 
      properties: {
        title: "Calculando seu perfil de estilo...",
        subtitle: "Estamos criando suas recomendações personalizadas!",
        icon: "🎨",
        showProgress: true,
        backgroundColor: "#fef3c7"
      }
    }
  ],

  // ETAPA 20: Página de Resultado
  "20": [
    {
      id: "result-header-20",
      type: "style-result-card", 
      properties: {
        title: "Seu Estilo Pessoal é: {{calculatedStyle}}",
        subtitle: "Baseado em suas respostas, identificamos seu perfil único",
        showUserName: true,
        backgroundColor: "#f0fdf4"
      }
    },
    {
      id: "result-description-20",
      type: "result-description",
      properties: {
        content: "{{styleDescription}}",
        showPersonalizedTips: true
      }
    },
    {
      id: "navigation-20",
      type: "quiz-navigation-inline",
      properties: {
        nextText: "Ver Recomendações →",
        previousText: "← Refazer Quiz",
        showPrevious: true
      }
    }
  ],

  // ETAPA 21: Página de Oferta/CTA
  "21": [
    {
      id: "offer-header-21",
      type: "result-cta-block",
      properties: {
        title: "Transforme Seu Estilo Hoje!",
        subtitle: "Consultoria personalizada com base no seu perfil",
        highlightText: "OFERTA ESPECIAL",
        price: "R$ 297",
        originalPrice: "R$ 497", 
        discount: "40% OFF",
        ctaText: "QUERO TRANSFORMAR MEU ESTILO",
        ctaUrl: "#checkout",
        urgency: "Apenas 48h com este desconto!",
        benefits: [
          "Análise completa do seu estilo",
          "Guia de compras personalizado", 
          "Combinações para cada ocasião",
          "Suporte por 30 dias"
        ]
      }
    }
  ]
};

// 🎯 QUESTÕES COMPLETAS (para compatibilidade)
export const QUIZ_QUESTIONS_COMPLETE = {
  questions: Array.from({length: 16}, (_, i) => ({
    id: `q${i + 1}`,
    text: `Como você descreveria seu estilo ideal? (Questão ${i + 1})`,
    type: i < 10 ? 'multiple' : 'single',
    options: [
      { id: `${i + 1}-1`, text: "Clássico e elegante", points: { classic: 3 } },
      { id: `${i + 1}-2`, text: "Moderno e ousado", points: { modern: 3 } },
      { id: `${i + 1}-3`, text: "Casual e confortável", points: { casual: 3 } },
      { id: `${i + 1}-4`, text: "Boho e criativo", points: { boho: 3 } }
    ]
  }))
};

// 🎯 SCHEMA DE PERSISTÊNCIA (simplificado)
export const FUNNEL_PERSISTENCE_SCHEMA = {
  id: 'quiz21StepsOptimized',
  name: 'Quiz de Estilo - Otimizado',
  version: '3.0.0',
  category: 'quiz',
  templateType: 'quiz-optimized',
  
  persistence: {
    enabled: true,
    storage: ['localStorage', 'supabase'] as const,
    autoSave: true,
    autoSaveInterval: 30000
  },

  seo: {
    title: 'Descubra Seu Estilo Pessoal | Quiz Gratuito',
    description: 'Descubra seu estilo único em apenas 5 minutos. Quiz personalizado com recomendações exclusivas.',
    keywords: ['estilo pessoal', 'moda', 'consultoria de imagem', 'quiz de estilo'],
    ogImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_auto/quiz-og-image'
  },

  branding: {
    primaryColor: '#3b82f6',
    secondaryColor: '#f59e0b', 
    fontFamily: 'Inter, sans-serif',
    logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_auto/logo'
  }
};

// 🎯 EXPORT DEFAULT (para compatibilidade com imports existentes)
export default {
  QUIZ_STYLE_21_STEPS_TEMPLATE,
  QUIZ_QUESTIONS_COMPLETE,
  FUNNEL_PERSISTENCE_SCHEMA
};