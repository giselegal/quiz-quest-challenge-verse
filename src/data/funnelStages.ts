import { EditorStage, EditorComponent } from '@/components/live-editor/LiveQuizEditor';

// Configuração das 21 etapas do funil baseada na documentação
export const createDefaultFunnelStages = (): EditorStage[] => {
  return [
    // ETAPA 1: INTRODUÇÃO (COLETA DO NOME)
    {
      id: 'stage-1',
      name: 'Introdução - Coleta do Nome',
      type: 'intro',
      order: 0,
      components: [
        {
          id: 'comp-1-1',
          type: 'quiz-intro-header',
          content: {
            logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
            showProgress: false,
            progressPercent: 0
          },
          style: {},
          position: { x: 0, y: 0 },
          size: { width: 100, height: 80 }
        },
        {
          id: 'comp-1-2',
          type: 'spacer',
          content: {
            height: 20,
            backgroundColor: '#B89B7A'
          },
          style: {},
          position: { x: 0, y: 80 },
          size: { width: 100, height: 20 }
        },
        {
          id: 'comp-1-3',
          type: 'text-inline',
          content: {
            text: 'Descubra Seu Estilo Pessoal em 2 Minutos',
            alignment: 'center',
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#432818'
          },
          style: {},
          position: { x: 0, y: 100 },
          size: { width: 100, height: 60 }
        },
        {
          id: 'comp-1-4',
          type: 'image-display-inline',
          content: {
            imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1737998767/guarda-roupa-intro_xdhe2u.jpg',
            imageAlt: 'Guarda-roupa elegante',
            alignment: 'center'
          },
          style: {},
          position: { x: 0, y: 160 },
          size: { width: 100, height: 200 }
        },
        {
          id: 'comp-1-5',
          type: 'text-inline',
          content: {
            text: 'Responda algumas perguntas rápidas e descubra qual estilo combina mais com você',
            alignment: 'center',
            fontSize: '18px',
            color: '#432818'
          },
          style: {},
          position: { x: 0, y: 360 },
          size: { width: 100, height: 40 }
        },
        {
          id: 'comp-1-6',
          type: 'form-input',
          content: {
            placeholder: 'Digite seu primeiro nome',
            label: 'Qual é o seu nome?',
            required: true,
            fieldType: 'text'
          },
          style: {},
          position: { x: 0, y: 400 },
          size: { width: 100, height: 60 }
        },
        {
          id: 'comp-1-7',
          type: 'button-inline',
          content: {
            text: 'Quero Descobrir meu Estilo Agora!',
            backgroundColor: '#B89B7A',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold'
          },
          style: {},
          position: { x: 0, y: 460 },
          size: { width: 100, height: 50 }
        }
      ],
      settings: {
        backgroundColor: '#FFFFFF',
        progressPercent: 0
      }
    },

    // ETAPAS 2-11: QUESTÕES PRINCIPAIS (10 QUESTÕES)
    ...Array.from({ length: 10 }, (_, i) => {
      const questionNumber = i + 1;
      const stageNumber = i + 2;
      const progressPercent = stageNumber * 5;
      
      const questions = [
        'Qual dessas situações mais te representa?',
        'Em qual ambiente você se sente mais à vontade?',
        'Qual é o seu relacionamento com a moda?',
        'Como você gosta de se sentir nas suas roupas?',
        'Qual dessas peças você compraria primeiro?',
        'O que mais te atrai em um look?',
        'Qual é a sua abordagem para compras?',
        'Como você lida com as tendências?',
        'Qual o seu maior desafio com roupas?',
        'O que você mais valoriza no seu estilo?'
      ];

      return {
        id: `stage-${stageNumber}`,
        name: `Questão ${questionNumber}`,
        type: 'question' as const,
        order: stageNumber - 1,
        components: [
          {
            id: `comp-${stageNumber}-1`,
            type: 'quiz-intro-header',
            content: {
              logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
              showProgress: true,
              progressPercent,
              showBackButton: true
            },
            style: {},
            position: { x: 0, y: 0 },
            size: { width: 100, height: 80 }
          },
          {
            id: `comp-${stageNumber}-2`,
            type: 'heading-inline',
            content: {
              text: questions[i],
              level: 2,
              alignment: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#432818'
            },
            style: {},
            position: { x: 0, y: 80 },
            size: { width: 100, height: 60 }
          },
          {
            id: `comp-${stageNumber}-3`,
            type: 'text-inline',
            content: {
              text: `Questão ${questionNumber} de 10`,
              alignment: 'center',
              fontSize: '14px',
              color: '#8F7A6A'
            },
            style: {},
            position: { x: 0, y: 140 },
            size: { width: 100, height: 30 }
          },
          {
            id: `comp-${stageNumber}-4`,
            type: 'options-grid',
            content: {
              options: [
                { id: '1', text: 'Opção 1', imageUrl: 'https://via.placeholder.com/200x150' },
                { id: '2', text: 'Opção 2', imageUrl: 'https://via.placeholder.com/200x150' },
                { id: '3', text: 'Opção 3', imageUrl: 'https://via.placeholder.com/200x150' },
                { id: '4', text: 'Opção 4', imageUrl: 'https://via.placeholder.com/200x150' }
              ],
              columns: 2,
              multipleSelection: false,
              showImages: true
            },
            style: {},
            position: { x: 0, y: 170 },
            size: { width: 100, height: 200 }
          },
          {
            id: `comp-${stageNumber}-5`,
            type: 'button-inline',
            content: {
              text: 'Continuar',
              backgroundColor: '#B89B7A',
              color: 'white',
              fontSize: '16px',
              disabled: true,
              validation: 'required-selection'
            },
            style: {},
            position: { x: 0, y: 370 },
            size: { width: 100, height: 50 }
          }
        ],
        settings: {
          backgroundColor: '#FFFFFF',
          progressPercent
        }
      } as EditorStage;
    }),

    // ETAPA 12: TRANSIÇÃO PRINCIPAL
    {
      id: 'stage-12',
      name: 'Transição Principal',
      type: 'intro',
      order: 11,
      components: [
        {
          id: 'comp-12-1',
          type: 'quiz-intro-header',
          content: {
            logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
            showProgress: true,
            progressPercent: 60,
            showBackButton: true
          },
          style: {},
          position: { x: 0, y: 0 },
          size: { width: 100, height: 80 }
        },
        {
          id: 'comp-12-2',
          type: 'heading-inline',
          content: {
            text: 'Agora vamos conhecer você melhor',
            level: 2,
            alignment: 'center',
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#432818'
          },
          style: {},
          position: { x: 0, y: 80 },
          size: { width: 100, height: 60 }
        },
        {
          id: 'comp-12-3',
          type: 'text-inline',
          content: {
            text: 'Suas primeiras respostas nos deram ótimas pistas sobre seu estilo. Agora vamos aprofundar nossa análise para criar o resultado perfeito para você.',
            alignment: 'center',
            fontSize: '16px',
            color: '#432818'
          },
          style: {},
          position: { x: 0, y: 140 },
          size: { width: 100, height: 80 }
        },
        {
          id: 'comp-12-4',
          type: 'progress-inline',
          content: {
            percent: 60,
            showLabel: true,
            label: '60% Concluído',
            backgroundColor: '#F5F5F5',
            fillColor: '#B89B7A'
          },
          style: {},
          position: { x: 0, y: 220 },
          size: { width: 100, height: 40 }
        },
        {
          id: 'comp-12-5',
          type: 'button-inline',
          content: {
            text: 'Continuar Análise',
            backgroundColor: '#B89B7A',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold'
          },
          style: {},
          position: { x: 0, y: 260 },
          size: { width: 100, height: 50 }
        }
      ],
      settings: {
        backgroundColor: '#FFFFFF',
        progressPercent: 60
      }
    },

    // ETAPAS 13-18: QUESTÕES ESTRATÉGICAS (6 QUESTÕES)
    ...Array.from({ length: 6 }, (_, i) => {
      const questionNumber = i + 11;
      const stageNumber = i + 13;
      const progressPercent = 65 + (i * 5);
      
      const strategicQuestions = [
        'Qual é o seu estilo de vida?',
        'Como você se vê daqui a 5 anos?',
        'Qual é o seu orçamento mensal para roupas?',
        'Qual é a sua maior inspiração de estilo?',
        'Como você prefere fazer compras?',
        'Qual é o seu objetivo principal com o estilo?'
      ];

      return {
        id: `stage-${stageNumber}`,
        name: `Questão Estratégica ${i + 1}`,
        type: 'question' as const,
        order: stageNumber - 1,
        components: [
          {
            id: `comp-${stageNumber}-1`,
            type: 'quiz-intro-header',
            content: {
              logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
              showProgress: true,
              progressPercent,
              showBackButton: true
            },
            style: {},
            position: { x: 0, y: 0 },
            size: { width: 100, height: 80 }
          },
          {
            id: `comp-${stageNumber}-2`,
            type: 'heading-inline',
            content: {
              text: strategicQuestions[i],
              level: 2,
              alignment: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#432818'
            },
            style: {},
            position: { x: 0, y: 80 },
            size: { width: 100, height: 60 }
          },
          {
            id: `comp-${stageNumber}-3`,
            type: 'text-inline',
            content: {
              text: `${progressPercent}% concluído`,
              alignment: 'center',
              fontSize: '14px',
              color: '#8F7A6A'
            },
            style: {},
            position: { x: 0, y: 140 },
            size: { width: 100, height: 30 }
          },
          {
            id: `comp-${stageNumber}-4`,
            type: 'options-grid',
            content: {
              options: [
                { id: '1', text: 'Opção 1' },
                { id: '2', text: 'Opção 2' },
                { id: '3', text: 'Opção 3' },
                { id: '4', text: 'Opção 4' }
              ],
              columns: 1,
              multipleSelection: false,
              showImages: false
            },
            style: {},
            position: { x: 0, y: 170 },
            size: { width: 100, height: 160 }
          },
          {
            id: `comp-${stageNumber}-5`,
            type: 'button-inline',
            content: {
              text: 'Continuar',
              backgroundColor: '#B89B7A',
              color: 'white',
              fontSize: '16px',
              disabled: true,
              validation: 'required-selection'
            },
            style: {},
            position: { x: 0, y: 330 },
            size: { width: 100, height: 50 }
          }
        ],
        settings: {
          backgroundColor: '#FFFFFF',
          progressPercent
        }
      } as EditorStage;
    }),

    // ETAPA 19: TRANSIÇÃO FINAL
    {
      id: 'stage-19',
      name: 'Transição Final - Análise',
      type: 'intro',
      order: 18,
      components: [
        {
          id: 'comp-19-1',
          type: 'quiz-intro-header',
          content: {
            logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
            showProgress: true,
            progressPercent: 95,
            showBackButton: false
          },
          style: {},
          position: { x: 0, y: 0 },
          size: { width: 100, height: 80 }
        },
        {
          id: 'comp-19-2',
          type: 'heading-inline',
          content: {
            text: 'Analisando suas respostas...',
            level: 2,
            alignment: 'center',
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#432818'
          },
          style: {},
          position: { x: 0, y: 80 },
          size: { width: 100, height: 60 }
        },
        {
          id: 'comp-19-3',
          type: 'progress-inline',
          content: {
            percent: 95,
            showLabel: true,
            label: 'Finalizando análise...',
            backgroundColor: '#F5F5F5',
            fillColor: '#B89B7A',
            animated: true
          },
          style: {},
          position: { x: 0, y: 140 },
          size: { width: 100, height: 40 }
        },
        {
          id: 'comp-19-4',
          type: 'text-inline',
          content: {
            text: 'Estamos processando suas respostas e criando um perfil de estilo personalizado para você.',
            alignment: 'center',
            fontSize: '16px',
            color: '#432818'
          },
          style: {},
          position: { x: 0, y: 180 },
          size: { width: 100, height: 60 }
        },
        {
          id: 'comp-19-5',
          type: 'loading-animation',
          content: {
            type: 'spinner',
            color: '#B89B7A',
            size: 'large'
          },
          style: {},
          position: { x: 0, y: 240 },
          size: { width: 100, height: 60 }
        },
        {
          id: 'comp-19-6',
          type: 'button-inline',
          content: {
            text: 'Ver Meu Resultado',
            backgroundColor: '#B89B7A',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            delayAppear: 3000
          },
          style: {},
          position: { x: 0, y: 300 },
          size: { width: 100, height: 50 }
        }
      ],
      settings: {
        backgroundColor: '#FFFFFF',
        progressPercent: 95
      }
    },

    // ETAPA 20: PÁGINA DE RESULTADO PERSONALIZADO
    {
      id: 'stage-20',
      name: 'Resultado Personalizado',
      type: 'result',
      order: 19,
      components: [
        {
          id: 'comp-20-1',
          type: 'result-header-inline',
          content: {
            logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
            userName: '{{userName}}',
            title: 'Seu Estilo Foi Descoberto!'
          },
          style: {},
          position: { x: 0, y: 0 },
          size: { width: 100, height: 100 }
        },
        {
          id: 'comp-20-2',
          type: 'result-card-inline',
          content: {
            styleTitle: '{{primaryStyle}}',
            matchPercentage: 85,
            styleDescription: 'Seu estilo reflete {{styleCharacteristics}}',
            backgroundImage: '{{styleImage}}'
          },
          style: {},
          position: { x: 0, y: 100 },
          size: { width: 100, height: 200 }
        },
        {
          id: 'comp-20-3',
          type: 'text-inline',
          content: {
            text: 'Características do seu estilo:',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#432818',
            alignment: 'center'
          },
          style: {},
          position: { x: 0, y: 300 },
          size: { width: 100, height: 40 }
        },
        {
          id: 'comp-20-4',
          type: 'image-display-inline',
          content: {
            imageUrl: '{{transformationImage}}',
            imageAlt: 'Guia de transformação',
            alignment: 'center'
          },
          style: {},
          position: { x: 0, y: 340 },
          size: { width: 100, height: 150 }
        },
        {
          id: 'comp-20-5',
          type: 'heading-inline',
          content: {
            text: 'Seus Estilos Secundários',
            level: 3,
            alignment: 'center',
            fontSize: '22px',
            fontWeight: 'bold',
            color: '#432818'
          },
          style: {},
          position: { x: 0, y: 490 },
          size: { width: 100, height: 50 }
        },
        {
          id: 'comp-20-6',
          type: 'style-card-inline',
          content: {
            styles: [
              { name: '{{secondaryStyle1}}', percentage: 65 },
              { name: '{{secondaryStyle2}}', percentage: 45 },
              { name: '{{secondaryStyle3}}', percentage: 30 }
            ],
            layout: 'horizontal'
          },
          style: {},
          position: { x: 0, y: 540 },
          size: { width: 100, height: 120 }
        },
        {
          id: 'comp-20-7',
          type: 'text-inline',
          content: {
            text: 'Agora que você conhece seu estilo, que tal descobrir como aplicá-lo no seu dia a dia?',
            alignment: 'center',
            fontSize: '16px',
            color: '#432818'
          },
          style: {},
          position: { x: 0, y: 660 },
          size: { width: 100, height: 60 }
        },
        {
          id: 'comp-20-8',
          type: 'button-inline',
          content: {
            text: 'QUERO TRANSFORMAR MEU GUARDA-ROUPA',
            backgroundColor: '#B89B7A',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold'
          },
          style: {},
          position: { x: 0, y: 720 },
          size: { width: 100, height: 60 }
        }
      ],
      settings: {
        backgroundColor: '#FFFFFF',
        progressPercent: 100
      }
    },

    // ETAPA 21: PÁGINA DE OFERTA COMERCIAL
    {
      id: 'stage-21',
      name: 'Oferta Comercial',
      type: 'offer',
      order: 20,
      components: [
        {
          id: 'comp-21-1',
          type: 'heading-inline',
          content: {
            text: 'Oferta Especial Para Você!',
            level: 1,
            alignment: 'center',
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#432818'
          },
          style: {},
          position: { x: 0, y: 0 },
          size: { width: 100, height: 60 }
        },
        {
          id: 'comp-21-2',
          type: 'text-inline',
          content: {
            text: 'Guia Personalizado de Estilo {{primaryStyle}}',
            alignment: 'center',
            fontSize: '20px',
            color: '#B89B7A',
            fontWeight: 'bold'
          },
          style: {},
          position: { x: 0, y: 60 },
          size: { width: 100, height: 40 }
        },
        {
          id: 'comp-21-3',
          type: 'image-display-inline',
          content: {
            imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1737998767/guia-produto_xdhe2u.jpg',
            imageAlt: 'Guia de Estilo Personalizado',
            alignment: 'center'
          },
          style: {},
          position: { x: 0, y: 100 },
          size: { width: 100, height: 200 }
        },
        {
          id: 'comp-21-4',
          type: 'countdown-inline',
          content: {
            duration: 900, // 15 minutos
            title: 'Oferta expira em:',
            textColor: '#432818',
            highlightColor: '#B89B7A'
          },
          style: {},
          position: { x: 0, y: 300 },
          size: { width: 100, height: 80 }
        },
        {
          id: 'comp-21-5',
          type: 'quiz-offer-pricing-inline',
          content: {
            originalPrice: 'R$ 297',
            discountPrice: 'R$ 97',
            discount: '67%',
            paymentOptions: ['À vista', '3x de R$ 32,33'],
            highlight: true
          },
          style: {},
          position: { x: 0, y: 380 },
          size: { width: 100, height: 120 }
        },
        {
          id: 'comp-21-6',
          type: 'heading-inline',
          content: {
            text: 'O que você vai receber:',
            level: 3,
            alignment: 'center',
            fontSize: '22px',
            fontWeight: 'bold',
            color: '#432818'
          },
          style: {},
          position: { x: 0, y: 500 },
          size: { width: 100, height: 50 }
        },
        {
          id: 'comp-21-7',
          type: 'text-inline',
          content: {
            text: '✅ Guia personalizado com seu estilo dominante\n✅ Paleta de cores ideal para você\n✅ Peças-chave para seu guarda-roupa\n✅ Dicas de combinações exclusivas\n✅ Guia de compras inteligentes',
            alignment: 'left',
            fontSize: '16px',
            color: '#432818',
            lineHeight: '1.6'
          },
          style: {},
          position: { x: 0, y: 550 },
          size: { width: 100, height: 120 }
        },
        {
          id: 'comp-21-8',
          type: 'testimonial-card-inline',
          content: {
            name: 'Maria Silva',
            text: 'O guia transformou completamente meu guarda-roupa! Agora sei exatamente o que comprar e como combinar.',
            rating: 5,
            image: 'https://via.placeholder.com/80x80'
          },
          style: {},
          position: { x: 0, y: 670 },
          size: { width: 100, height: 100 }
        },
        {
          id: 'comp-21-9',
          type: 'badge-inline',
          content: {
            text: 'Garantia de 7 dias',
            icon: 'shield',
            backgroundColor: '#B89B7A',
            color: 'white'
          },
          style: {},
          position: { x: 0, y: 770 },
          size: { width: 100, height: 50 }
        },
        {
          id: 'comp-21-10',
          type: 'button-inline',
          content: {
            text: 'QUERO MEU GUIA PERSONALIZADO',
            backgroundColor: '#B89B7A',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            pulse: true
          },
          style: {},
          position: { x: 0, y: 820 },
          size: { width: 100, height: 60 }
        },
        {
          id: 'comp-21-11',
          type: 'text-inline',
          content: {
            text: '🔒 Compra 100% segura | Dados protegidos',
            alignment: 'center',
            fontSize: '14px',
            color: '#8F7A6A'
          },
          style: {},
          position: { x: 0, y: 880 },
          size: { width: 100, height: 30 }
        }
      ],
      settings: {
        backgroundColor: '#FFFFFF',
        progressPercent: 100
      }
    }
  ];
};

// Função para obter uma etapa específica
export const getStageById = (id: string): EditorStage | undefined => {
  const stages = createDefaultFunnelStages();
  return stages.find(stage => stage.id === id);
};

// Função para obter etapas por tipo
export const getStagesByType = (type: EditorStage['type']): EditorStage[] => {
  const stages = createDefaultFunnelStages();
  return stages.filter(stage => stage.type === type);
};

// Configurações globais do funil
export const funnelConfig = {
  theme: 'caktoquiz',
  colors: {
    primary: '#B89B7A',
    secondary: '#432818',
    background: '#FFFFFF',
    text: '#432818',
    accent: '#F5F5F5'
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif'
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px'
  },
  borderRadius: '8px'
};
