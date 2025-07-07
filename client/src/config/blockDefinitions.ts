/**
 * Definições de blocos para o editor visual
 * 
 * Este arquivo define os tipos de blocos disponíveis no editor, 
 * suas propriedades, categorias e configurações visuais.
 * Atualizado para incluir os novos componentes de funil reutilizáveis.
 */

export type PropertyType = 
  | 'text-input' 
  | 'text-area' 
  | 'rich-text'
  | 'color-picker' 
  | 'select' 
  | 'image-upload' 
  | 'boolean-switch'
  | 'number-input'
  | 'array-editor'
  | 'options-editor'
  | 'tabs-editor';

export interface PropertySchema {
  key: string;
  label: string;
  type: PropertyType;
  placeholder?: string;
  defaultValue?: any;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
  itemSchema?: PropertySchema[];
  nestedPath?: string; // Para propriedades aninhadas como 'colors.primary'
}

export interface BlockDefinition {
  type: string;
  name: string;
  description: string;
  icon?: string;
  category: 'basic' | 'layout' | 'quiz' | 'funnel' | 'media' | 'advanced';
  isNew?: boolean;
  defaultProperties?: Record<string, any>;
  propertiesSchema?: PropertySchema[];
}

// Definições de blocos básicos
const basicBlocks: BlockDefinition[] = [
  {
    type: 'header',
    name: 'Cabeçalho',
    description: 'Título ou cabeçalho de seção',
    icon: 'Heading',
    category: 'basic',
    defaultProperties: {
      text: 'Título do Cabeçalho',
      level: 'h2',
      alignment: 'left',
      color: '#1f2937'
    },
    propertiesSchema: [
      {
        key: 'text',
        label: 'Texto',
        type: 'text-input',
        placeholder: 'Digite o texto do cabeçalho'
      },
      {
        key: 'level',
        label: 'Nível',
        type: 'select',
        options: [
          { value: 'h1', label: 'H1 - Título Principal' },
          { value: 'h2', label: 'H2 - Subtítulo' },
          { value: 'h3', label: 'H3 - Título de Seção' },
          { value: 'h4', label: 'H4 - Subtítulo de Seção' }
        ]
      },
      {
        key: 'alignment',
        label: 'Alinhamento',
        type: 'select',
        options: [
          { value: 'left', label: 'Esquerda' },
          { value: 'center', label: 'Centro' },
          { value: 'right', label: 'Direita' }
        ]
      },
      {
        key: 'color',
        label: 'Cor',
        type: 'color-picker'
      }
    ]
  },
  {
    type: 'text',
    name: 'Texto',
    description: 'Bloco de texto simples',
    icon: 'Text',
    category: 'basic',
    defaultProperties: {
      text: 'Digite seu texto aqui',
      size: 'normal',
      alignment: 'left',
      color: '#374151'
    },
    propertiesSchema: [
      {
        key: 'text',
        label: 'Texto',
        type: 'text-area',
        placeholder: 'Digite seu texto',
        rows: 4
      },
      {
        key: 'size',
        label: 'Tamanho',
        type: 'select',
        options: [
          { value: 'small', label: 'Pequeno' },
          { value: 'normal', label: 'Normal' },
          { value: 'large', label: 'Grande' }
        ]
      },
      {
        key: 'alignment',
        label: 'Alinhamento',
        type: 'select',
        options: [
          { value: 'left', label: 'Esquerda' },
          { value: 'center', label: 'Centro' },
          { value: 'right', label: 'Direita' }
        ]
      },
      {
        key: 'color',
        label: 'Cor',
        type: 'color-picker'
      }
    ]
  },
  {
    type: 'rich-text',
    name: 'Editor Rico',
    description: 'Texto com formatação avançada',
    icon: 'FileText',
    category: 'basic',
    isNew: true,
    defaultProperties: {
      content: '<p>Conteúdo com formatação <strong>rica</strong></p>',
      alignment: 'left'
    },
    propertiesSchema: [
      {
        key: 'content',
        label: 'Conteúdo',
        type: 'rich-text'
      },
      {
        key: 'alignment',
        label: 'Alinhamento',
        type: 'select',
        options: [
          { value: 'left', label: 'Esquerda' },
          { value: 'center', label: 'Centro' },
          { value: 'right', label: 'Direita' }
        ]
      }
    ]
  },
  {
    type: 'image',
    name: 'Imagem',
    description: 'Imagem ou ilustração',
    icon: 'Image',
    category: 'basic',
    defaultProperties: {
      url: 'https://via.placeholder.com/800x400',
      alt: 'Descrição da imagem',
      rounded: false,
      shadow: false
    },
    propertiesSchema: [
      {
        key: 'url',
        label: 'URL da Imagem',
        type: 'image-upload',
        placeholder: 'https://...'
      },
      {
        key: 'alt',
        label: 'Texto Alternativo',
        type: 'text-input',
        placeholder: 'Descrição da imagem'
      },
      {
        key: 'rounded',
        label: 'Cantos Arredondados',
        type: 'boolean-switch'
      },
      {
        key: 'shadow',
        label: 'Sombra',
        type: 'boolean-switch'
      }
    ]
  },
  {
    type: 'button',
    name: 'Botão',
    description: 'Botão de ação ou link',
    icon: 'Square',
    category: 'basic',
    defaultProperties: {
      text: 'Clique aqui',
      url: '#',
      variant: 'primary',
      size: 'default',
      fullWidth: false
    },
    propertiesSchema: [
      {
        key: 'text',
        label: 'Texto do Botão',
        type: 'text-input',
        placeholder: 'Texto do botão'
      },
      {
        key: 'url',
        label: 'URL de Destino',
        type: 'text-input',
        placeholder: 'https://...'
      },
      {
        key: 'variant',
        label: 'Estilo',
        type: 'select',
        options: [
          { value: 'primary', label: 'Primário' },
          { value: 'secondary', label: 'Secundário' },
          { value: 'outline', label: 'Contorno' },
          { value: 'ghost', label: 'Fantasma' }
        ]
      },
      {
        key: 'size',
        label: 'Tamanho',
        type: 'select',
        options: [
          { value: 'sm', label: 'Pequeno' },
          { value: 'default', label: 'Médio' },
          { value: 'lg', label: 'Grande' }
        ]
      },
      {
        key: 'fullWidth',
        label: 'Largura Total',
        type: 'boolean-switch'
      }
    ]
  },
  {
    type: 'spacer',
    name: 'Espaçador',
    description: 'Espaço vertical entre elementos',
    icon: 'ArrowUpDown',
    category: 'basic',
    defaultProperties: {
      height: 40
    },
    propertiesSchema: [
      {
        key: 'height',
        label: 'Altura (px)',
        type: 'number-input',
        min: 8,
        max: 200,
        step: 4
      }
    ]
  }
];

// Definições de blocos avançados
const advancedBlocks: BlockDefinition[] = [
  {
    type: 'faq-section',
    name: 'Seção FAQ',
    description: 'Perguntas e respostas frequentes',
    icon: 'HelpCircle',
    category: 'advanced',
    defaultProperties: {
      title: 'Perguntas Frequentes',
      items: [
        { question: 'O que é esse produto?', answer: 'Este produto é uma solução completa para...' },
        { question: 'Como funciona?', answer: 'O funcionamento é simples, basta seguir os passos...' }
      ]
    },
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título da Seção',
        type: 'text-input'
      },
      {
        key: 'items',
        label: 'Itens',
        type: 'array-editor',
        itemSchema: [
          {
            key: 'question',
            label: 'Pergunta',
            type: 'text-input'
          },
          {
            key: 'answer',
            label: 'Resposta',
            type: 'text-area',
            rows: 3
          }
        ]
      }
    ]
  },
  {
    type: 'testimonials',
    name: 'Depoimentos',
    description: 'Seção de depoimentos de clientes',
    icon: 'MessageSquare',
    category: 'advanced',
    defaultProperties: {
      title: 'O que dizem nossos clientes',
      testimonials: [
        { 
          name: 'João Silva', 
          text: 'Produto excelente, superou minhas expectativas!',
          rating: 5,
          imageUrl: 'https://via.placeholder.com/100'
        },
        { 
          name: 'Maria Santos', 
          text: 'Recomendo para todos que buscam resultados.',
          rating: 5,
          imageUrl: 'https://via.placeholder.com/100'
        }
      ]
    },
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título da Seção',
        type: 'text-input'
      },
      {
        key: 'testimonials',
        label: 'Depoimentos',
        type: 'array-editor',
        itemSchema: [
          {
            key: 'name',
            label: 'Nome',
            type: 'text-input'
          },
          {
            key: 'text',
            label: 'Depoimento',
            type: 'text-area',
            rows: 2
          },
          {
            key: 'rating',
            label: 'Avaliação (1-5)',
            type: 'number-input',
            min: 1,
            max: 5
          },
          {
            key: 'imageUrl',
            label: 'Foto',
            type: 'image-upload'
          }
        ]
      }
    ]
  },
  {
    type: 'video-player',
    name: 'Player de Vídeo',
    description: 'Incorpora um vídeo do YouTube ou Vimeo',
    icon: 'Video',
    category: 'media',
    defaultProperties: {
      title: 'Vídeo Demonstrativo',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      autoPlay: false,
      showControls: true
    },
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título do Vídeo',
        type: 'text-input'
      },
      {
        key: 'videoUrl',
        label: 'URL do Vídeo',
        type: 'text-input',
        placeholder: 'https://www.youtube.com/watch?v=...'
      },
      {
        key: 'autoPlay',
        label: 'Reprodução Automática',
        type: 'boolean-switch'
      },
      {
        key: 'showControls',
        label: 'Mostrar Controles',
        type: 'boolean-switch'
      }
    ]
  }
];

// Definições de blocos de quiz
const quizBlocks: BlockDefinition[] = [
  {
    type: 'quiz-step',
    name: 'Etapa de Quiz',
    description: 'Container para etapas do quiz',
    icon: 'ListOrdered',
    category: 'quiz',
    defaultProperties: {
      title: 'Etapa do Quiz',
      stepNumber: 1,
      showProgress: true
    },
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título da Etapa',
        type: 'text-input'
      },
      {
        key: 'stepNumber',
        label: 'Número da Etapa',
        type: 'number-input',
        min: 1
      },
      {
        key: 'showProgress',
        label: 'Mostrar Progresso',
        type: 'boolean-switch'
      }
    ]
  },
  {
    type: 'quiz-start-page',
    name: 'Início do Quiz',
    description: 'Página inicial do quiz com introdução',
    icon: 'Play',
    category: 'quiz',
    defaultProperties: {
      title: 'Descubra seu Resultado',
      subtitle: 'Responda algumas perguntas simples',
      buttonText: 'Começar Quiz'
    },
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título Principal',
        type: 'text-input'
      },
      {
        key: 'subtitle',
        label: 'Subtítulo',
        type: 'text-area',
        rows: 2
      },
      {
        key: 'imageUrl',
        label: 'Imagem',
        type: 'image-upload'
      },
      {
        key: 'buttonText',
        label: 'Texto do Botão',
        type: 'text-input'
      }
    ]
  },
  {
    type: 'question-multiple',
    name: 'Pergunta Múltipla Escolha',
    description: 'Pergunta com opções de múltipla escolha',
    icon: 'CheckSquare',
    category: 'quiz',
    defaultProperties: {
      question: 'Qual opção descreve melhor você?',
      options: [
        { id: '1', text: 'Opção 1', value: 'op1' },
        { id: '2', text: 'Opção 2', value: 'op2' },
        { id: '3', text: 'Opção 3', value: 'op3' }
      ],
      multiSelect: false,
      maxSelections: 1,
      showImages: false
    },
    propertiesSchema: [
      {
        key: 'question',
        label: 'Pergunta',
        type: 'text-input'
      },
      {
        key: 'options',
        label: 'Opções',
        type: 'options-editor',
        itemSchema: [
          {
            key: 'text',
            label: 'Texto',
            type: 'text-input'
          },
          {
            key: 'value',
            label: 'Valor',
            type: 'text-input'
          },
          {
            key: 'imageUrl',
            label: 'Imagem',
            type: 'image-upload'
          }
        ]
      },
      {
        key: 'multiSelect',
        label: 'Permitir Múltipla Seleção',
        type: 'boolean-switch'
      },
      {
        key: 'maxSelections',
        label: 'Máximo de Seleções',
        type: 'number-input',
        min: 1,
        max: 10
      },
      {
        key: 'showImages',
        label: 'Mostrar Imagens',
        type: 'boolean-switch'
      }
    ]
  },
  {
    type: 'strategic-question',
    name: 'Pergunta Estratégica',
    description: 'Pergunta para qualificação do lead',
    icon: 'Target',
    category: 'quiz',
    isNew: true,
    defaultProperties: {
      question: 'O que mais te desafia atualmente?',
      description: 'Escolha a opção que melhor descreve sua situação atual',
      options: [
        { id: '1', text: 'Opção 1', value: 'challenge1', score: 5 },
        { id: '2', text: 'Opção 2', value: 'challenge2', score: 10 }
      ]
    },
    propertiesSchema: [
      {
        key: 'question',
        label: 'Pergunta',
        type: 'text-input'
      },
      {
        key: 'description',
        label: 'Descrição',
        type: 'text-area',
        rows: 2
      },
      {
        key: 'options',
        label: 'Opções',
        type: 'options-editor',
        itemSchema: [
          {
            key: 'text',
            label: 'Texto',
            type: 'text-input'
          },
          {
            key: 'value',
            label: 'Valor',
            type: 'text-input'
          },
          {
            key: 'score',
            label: 'Pontuação',
            type: 'number-input'
          }
        ]
      }
    ]
  },
  {
    type: 'quiz-transition',
    name: 'Transição de Quiz',
    description: 'Tela de transição entre perguntas e resultado',
    icon: 'Loader',
    category: 'quiz',
    defaultProperties: {
      title: 'Analisando suas respostas...',
      messages: [
        'Processando suas escolhas...',
        'Identificando padrões...',
        'Gerando seu resultado personalizado...'
      ],
      autoAdvanceDelay: 5
    },
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input'
      },
      {
        key: 'messages',
        label: 'Mensagens',
        type: 'array-editor',
        itemSchema: [
          {
            key: '',
            label: 'Mensagem',
            type: 'text-input'
          }
        ]
      },
      {
        key: 'autoAdvanceDelay',
        label: 'Tempo de Avanço (segundos)',
        type: 'number-input',
        min: 1,
        max: 15
      }
    ]
  },
  {
    type: 'result-page',
    name: 'Página de Resultado',
    description: 'Exibe o resultado do quiz',
    icon: 'Award',
    category: 'quiz',
    defaultProperties: {
      title: 'Seu Resultado',
      showShareButtons: true,
      showCta: true,
      ctaButtonText: 'Próximo Passo'
    },
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input'
      },
      {
        key: 'showShareButtons',
        label: 'Mostrar Botões de Compartilhamento',
        type: 'boolean-switch'
      },
      {
        key: 'showCta',
        label: 'Mostrar Chamada para Ação',
        type: 'boolean-switch'
      },
      {
        key: 'ctaButtonText',
        label: 'Texto do Botão CTA',
        type: 'text-input'
      }
    ]
  },
  {
    type: 'quiz-offer-page',
    name: 'Página de Oferta',
    description: 'Página de oferta pós-quiz',
    icon: 'Tag',
    category: 'quiz',
    isNew: true,
    defaultProperties: {
      title: 'Oferta Especial',
      subtitle: 'Baseada no seu resultado',
      productName: 'Produto Premium',
      originalPrice: '497',
      price: '197',
      buttonText: 'Quero Garantir Agora',
      showCountdown: true,
      countdownHours: 24
    },
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input'
      },
      {
        key: 'subtitle',
        label: 'Subtítulo',
        type: 'text-input'
      },
      {
        key: 'productName',
        label: 'Nome do Produto',
        type: 'text-input'
      },
      {
        key: 'productDescription',
        label: 'Descrição do Produto',
        type: 'text-area',
        rows: 3
      },
      {
        key: 'imageUrl',
        label: 'Imagem do Produto',
        type: 'image-upload'
      },
      {
        key: 'originalPrice',
        label: 'Preço Original',
        type: 'text-input'
      },
      {
        key: 'price',
        label: 'Preço com Desconto',
        type: 'text-input'
      },
      {
        key: 'buttonText',
        label: 'Texto do Botão',
        type: 'text-input'
      },
      {
        key: 'showCountdown',
        label: 'Mostrar Contagem Regressiva',
        type: 'boolean-switch'
      },
      {
        key: 'countdownHours',
        label: 'Horas na Contagem',
        type: 'number-input',
        min: 1,
        max: 72
      }
    ]
  }
];

// Definições dos novos blocos de funil
const funnelBlocks: BlockDefinition[] = [
  {
    type: 'funnel-step',
    name: 'Etapa do Funil',
    description: 'Container genérico para etapas do funil',
    icon: 'LayoutGrid',
    category: 'funnel',
    isNew: true,
    defaultProperties: {
      stepType: 'intro',
      stepNumber: 1,
      totalSteps: 21,
      title: 'Etapa do Funil'
    },
    propertiesSchema: [
      {
        key: 'stepType',
        label: 'Tipo de Etapa',
        type: 'select',
        options: [
          { value: 'intro', label: 'Introdução' },
          { value: 'name-collect', label: 'Coleta de Nome' },
          { value: 'quiz-intro', label: 'Introdução ao Quiz' },
          { value: 'question-multiple', label: 'Pergunta de Múltipla Escolha' },
          { value: 'quiz-transition', label: 'Transição' },
          { value: 'processing', label: 'Processamento' },
          { value: 'result-intro', label: 'Introdução ao Resultado' },
          { value: 'result-details', label: 'Detalhes do Resultado' },
          { value: 'result-guide', label: 'Guia de Resultado' },
          { value: 'offer-transition', label: 'Transição para Oferta' },
          { value: 'offer-page', label: 'Página de Oferta' }
        ]
      },
      {
        key: 'stepNumber',
        label: 'Número da Etapa',
        type: 'number-input',
        min: 1,
        max: 21
      },
      {
        key: 'totalSteps',
        label: 'Total de Etapas',
        type: 'number-input',
        min: 1,
        max: 21
      },
      {
        key: 'title',
        label: 'Título',
        type: 'text-input'
      }
    ]
  },
  {
    type: 'funnel-intro',
    name: 'Introdução do Funil',
    description: 'Página de introdução ao funil',
    icon: 'Home',
    category: 'funnel',
    isNew: true,
    defaultProperties: {
      title: 'Descubra seu estilo ideal',
      subtitle: 'Responda nosso quiz e receba um guia personalizado',
      buttonText: 'Começar agora',
      backgroundImage: ''
    },
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input'
      },
      {
        key: 'subtitle',
        label: 'Subtítulo',
        type: 'text-area',
        rows: 2
      },
      {
        key: 'buttonText',
        label: 'Texto do Botão',
        type: 'text-input'
      },
      {
        key: 'backgroundImage',
        label: 'Imagem de Fundo',
        type: 'image-upload'
      },
      {
        key: 'logoUrl',
        label: 'Logo',
        type: 'image-upload'
      }
    ]
  },
  {
    type: 'funnel-name-collect',
    name: 'Coleta de Nome',
    description: 'Etapa para coletar o nome do usuário',
    icon: 'User',
    category: 'funnel',
    isNew: true,
    defaultProperties: {
      title: 'Como podemos te chamar?',
      description: 'Para personalizar sua experiência, gostaríamos de saber seu nome:',
      buttonText: 'Continuar',
      placeholder: 'Digite seu nome aqui'
    },
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input'
      },
      {
        key: 'description',
        label: 'Descrição',
        type: 'text-area',
        rows: 2
      },
      {
        key: 'buttonText',
        label: 'Texto do Botão',
        type: 'text-input'
      },
      {
        key: 'placeholder',
        label: 'Placeholder',
        type: 'text-input'
      },
      {
        key: 'imageUrl',
        label: 'Imagem',
        type: 'image-upload'
      }
    ]
  },
  {
    type: 'funnel-quiz-intro',
    name: 'Introdução ao Quiz',
    description: 'Introdução às perguntas do quiz',
    icon: 'Info',
    category: 'funnel',
    isNew: true,
    defaultProperties: {
      title: 'Descubra seu estilo ideal',
      description: 'Responda as próximas perguntas com sinceridade para obtermos um resultado preciso e personalizado para você.',
      buttonText: 'Iniciar questionário',
      bullets: [
        'São apenas 10 perguntas rápidas',
        'Leva menos de 3 minutos',
        'Resultado personalizado imediato'
      ]
    },
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input'
      },
      {
        key: 'description',
        label: 'Descrição',
        type: 'text-area',
        rows: 2
      },
      {
        key: 'buttonText',
        label: 'Texto do Botão',
        type: 'text-input'
      },
      {
        key: 'imageUrl',
        label: 'Imagem',
        type: 'image-upload'
      },
      {
        key: 'bullets',
        label: 'Pontos-chave',
        type: 'array-editor',
        itemSchema: [
          {
            key: '',
            label: 'Item',
            type: 'text-input'
          }
        ]
      }
    ]
  },
  {
    type: 'funnel-question',
    name: 'Pergunta do Funil',
    description: 'Pergunta de múltipla escolha para o funil',
    icon: 'HelpCircle',
    category: 'funnel',
    isNew: true,
    defaultProperties: {
      question: 'Qual opção mais combina com você?',
      options: [
        { id: '1', text: 'Opção 1', value: 'op1' },
        { id: '2', text: 'Opção 2', value: 'op2' },
        { id: '3', text: 'Opção 3', value: 'op3' },
      ],
      multiSelect: false,
      maxSelections: 1,
      buttonText: 'Próxima pergunta',
      prevButtonText: 'Voltar',
      showProgress: true
    },
    propertiesSchema: [
      {
        key: 'question',
        label: 'Pergunta',
        type: 'text-input'
      },
      {
        key: 'imageUrl',
        label: 'Imagem da Pergunta',
        type: 'image-upload'
      },
      {
        key: 'options',
        label: 'Opções',
        type: 'options-editor',
        itemSchema: [
          {
            key: 'text',
            label: 'Texto',
            type: 'text-input'
          },
          {
            key: 'value',
            label: 'Valor',
            type: 'text-input'
          },
          {
            key: 'imageUrl',
            label: 'Imagem',
            type: 'image-upload'
          }
        ]
      },
      {
        key: 'multiSelect',
        label: 'Múltipla Seleção',
        type: 'boolean-switch'
      },
      {
        key: 'maxSelections',
        label: 'Máximo de Seleções',
        type: 'number-input',
        min: 1,
        max: 8
      },
      {
        key: 'buttonText',
        label: 'Texto do Botão Avançar',
        type: 'text-input'
      },
      {
        key: 'prevButtonText',
        label: 'Texto do Botão Voltar',
        type: 'text-input'
      },
      {
        key: 'showProgress',
        label: 'Mostrar Barra de Progresso',
        type: 'boolean-switch'
      }
    ]
  },
  {
    type: 'funnel-transition',
    name: 'Transição do Funil',
    description: 'Etapa de transição entre quiz e resultado',
    icon: 'Loader',
    category: 'funnel',
    isNew: true,
    defaultProperties: {
      title: 'Analisando suas respostas...',
      messages: [
        'Processando suas escolhas...',
        'Identificando padrões...',
        'Gerando seu resultado personalizado...',
        'Quase pronto...'
      ],
      autoAdvanceDelay: 5
    },
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input'
      },
      {
        key: 'messages',
        label: 'Mensagens',
        type: 'array-editor',
        itemSchema: [
          {
            key: '',
            label: 'Mensagem',
            type: 'text-input'
          }
        ]
      },
      {
        key: 'autoAdvanceDelay',
        label: 'Tempo de Avanço (segundos)',
        type: 'number-input',
        min: 1,
        max: 15
      },
      {
        key: 'backgroundColor',
        label: 'Cor de Fundo',
        type: 'color-picker'
      }
    ]
  },
  {
    type: 'funnel-result-intro',
    name: 'Introdução ao Resultado',
    description: 'Introdução ao resultado do quiz',
    icon: 'CheckCircle',
    category: 'funnel',
    isNew: true,
    defaultProperties: {
      title: 'Seu resultado está pronto!',
      subtitle: 'Analisamos suas respostas e temos um resultado personalizado para você.',
      buttonText: 'Ver meu resultado',
      result: {
        category: 'Estilo Moderno',
        imageUrl: '/placeholder-result.jpg'
      },
      showConfetti: true
    },
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input'
      },
      {
        key: 'subtitle',
        label: 'Subtítulo',
        type: 'text-area',
        rows: 2
      },
      {
        key: 'buttonText',
        label: 'Texto do Botão',
        type: 'text-input'
      },
      {
        key: 'result.category',
        label: 'Categoria do Resultado',
        type: 'text-input',
        nestedPath: 'result.category'
      },
      {
        key: 'result.imageUrl',
        label: 'Imagem do Resultado',
        type: 'image-upload',
        nestedPath: 'result.imageUrl'
      },
      {
        key: 'showConfetti',
        label: 'Mostrar Confetti',
        type: 'boolean-switch'
      }
    ]
  },
  {
    type: 'funnel-result-details',
    name: 'Detalhes do Resultado',
    description: 'Exibe os detalhes completos do resultado',
    icon: 'FileText',
    category: 'funnel',
    isNew: true,
    defaultProperties: {
      title: 'Seu Estilo Personalizado',
      result: {
        category: 'Estilo Moderno',
        title: 'Você é uma pessoa de estilo Moderno',
        description: 'Pessoas com estilo moderno valorizam ambientes limpos, funcionais e com linhas claras. Você tem preferência por tecnologia, inovação e uma abordagem minimalista.',
        imageUrl: '/placeholder-result.jpg',
        characteristics: [
          'Preferência por designs simples e funcionais',
          'Apreciação por tecnologia e inovação',
          'Valorização de espaços organizados',
          'Tendência a escolher qualidade sobre quantidade'
        ],
        recommendations: [
          'Invista em peças de design inteligente',
          'Mantenha cores neutras como base',
          'Adicione elementos tecnológicos ao seu ambiente',
          'Busque soluções minimalistas para organização'
        ]
      },
      nextButtonText: 'Ver meu guia personalizado'
    },
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input'
      },
      {
        key: 'result.category',
        label: 'Categoria',
        type: 'text-input',
        nestedPath: 'result.category'
      },
      {
        key: 'result.title',
        label: 'Título do Resultado',
        type: 'text-input',
        nestedPath: 'result.title'
      },
      {
        key: 'result.description',
        label: 'Descrição',
        type: 'text-area',
        rows: 3,
        nestedPath: 'result.description'
      },
      {
        key: 'result.imageUrl',
        label: 'Imagem',
        type: 'image-upload',
        nestedPath: 'result.imageUrl'
      },
      {
        key: 'result.characteristics',
        label: 'Características',
        type: 'array-editor',
        nestedPath: 'result.characteristics',
        itemSchema: [
          {
            key: '',
            label: 'Característica',
            type: 'text-input'
          }
        ]
      },
      {
        key: 'result.recommendations',
        label: 'Recomendações',
        type: 'array-editor',
        nestedPath: 'result.recommendations',
        itemSchema: [
          {
            key: '',
            label: 'Recomendação',
            type: 'text-input'
          }
        ]
      },
      {
        key: 'nextButtonText',
        label: 'Texto do Botão Avançar',
        type: 'text-input'
      },
      {
        key: 'prevButtonText',
        label: 'Texto do Botão Voltar',
        type: 'text-input'
      }
    ]
  },
  {
    type: 'funnel-offer-transition',
    name: 'Transição para Oferta',
    description: 'Transição entre resultado e oferta final',
    icon: 'ArrowRight',
    category: 'funnel',
    isNew: true,
    defaultProperties: {
      title: 'Leve sua experiência para o próximo nível',
      subtitle: 'Descubra como potencializar seus resultados com nossa solução completa',
      benefits: [
        'Acesso a conteúdo exclusivo e aprofundado',
        'Suporte personalizado para suas necessidades específicas',
        'Ferramentas profissionais para implementação prática',
        'Comunidade de pessoas com perfil similar ao seu'
      ],
      buttonText: 'Quero conhecer a oferta',
      prevButtonText: 'Voltar ao meu resultado'
    },
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input'
      },
      {
        key: 'subtitle',
        label: 'Subtítulo',
        type: 'text-area',
        rows: 2
      },
      {
        key: 'benefits',
        label: 'Benefícios',
        type: 'array-editor',
        itemSchema: [
          {
            key: '',
            label: 'Benefício',
            type: 'text-input'
          }
        ]
      },
      {
        key: 'imageUrl',
        label: 'Imagem',
        type: 'image-upload'
      },
      {
        key: 'buttonText',
        label: 'Texto do Botão',
        type: 'text-input'
      },
      {
        key: 'prevButtonText',
        label: 'Texto do Botão Voltar',
        type: 'text-input'
      }
    ]
  },
  {
    type: 'funnel-offer-page',
    name: 'Página de Oferta',
    description: 'Página final de oferta do funil',
    icon: 'ShoppingCart',
    category: 'funnel',
    isNew: true,
    defaultProperties: {
      title: 'Oferta Exclusiva para Você',
      subtitle: 'Baseada no seu resultado personalizado',
      offer: {
        name: 'Programa Completo',
        description: 'Transforme seu estilo com nosso programa passo a passo',
        features: [
          'Acesso a todos os módulos e materiais',
          'Suporte personalizado por 30 dias',
          'Acesso vitalício a atualizações',
          'Comunidade exclusiva de alunos',
          'Bônus especiais para ação imediata'
        ],
        price: '197',
        originalPrice: '497'
      },
      buttonText: 'Sim! Quero Garantir Meu Acesso',
      showCountdown: true,
      countdownHours: 24
    },
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input'
      },
      {
        key: 'subtitle',
        label: 'Subtítulo',
        type: 'text-input'
      },
      {
        key: 'offer.name',
        label: 'Nome da Oferta',
        type: 'text-input',
        nestedPath: 'offer.name'
      },
      {
        key: 'offer.description',
        label: 'Descrição da Oferta',
        type: 'text-area',
        rows: 2,
        nestedPath: 'offer.description'
      },
      {
        key: 'offer.features',
        label: 'Recursos Incluídos',
        type: 'array-editor',
        nestedPath: 'offer.features',
        itemSchema: [
          {
            key: '',
            label: 'Recurso',
            type: 'text-input'
          }
        ]
      },
      {
        key: 'offer.price',
        label: 'Preço',
        type: 'text-input',
        nestedPath: 'offer.price'
      },
      {
        key: 'offer.originalPrice',
        label: 'Preço Original',
        type: 'text-input',
        nestedPath: 'offer.originalPrice'
      },
      {
        key: 'buttonText',
        label: 'Texto do Botão CTA',
        type: 'text-input'
      },
      {
        key: 'secondaryButtonText',
        label: 'Texto do Botão Secundário',
        type: 'text-input'
      },
      {
        key: 'showCountdown',
        label: 'Mostrar Contador Regressivo',
        type: 'boolean-switch'
      },
      {
        key: 'countdownHours',
        label: 'Horas no Contador',
        type: 'number-input',
        min: 1,
        max: 72
      }
    ]
  }
];

// Combinar todas as definições de blocos
export const blockDefinitions: BlockDefinition[] = [
  ...basicBlocks,
  ...advancedBlocks,
  ...quizBlocks,
  ...funnelBlocks
];

// Helper para encontrar uma definição de bloco pelo tipo
export const findBlockDefinition = (type: string): BlockDefinition | undefined => {
  return blockDefinitions.find(block => block.type === type);
};
