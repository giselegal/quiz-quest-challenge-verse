// =====================================================================
// CLEAN BLOCK DEFINITIONS - ONLY FUNCTIONAL COMPONENTS
// =====================================================================

import type { BlockDefinition } from '@/config/blockDefinitions';

// Interface para PropertySchema
export interface PropertySchema {
  key: string;
  label: string;
  type: 'text-input' | 'textarea' | 'select' | 'number-input' | 'boolean-switch' | 'image-url' | 'video-url' | 'array-editor' | 'text-area';
  placeholder?: string;
  options?: { label: string; value: string }[];
  defaultValue?: any;
  rows?: number;
  min?: number;
  max?: number;
  description?: string;
  nestedPath?: string;
  itemSchema?: PropertySchema[];
}

export const blockDefinitions: BlockDefinition[] = [
  // === COMPONENTES BÁSICOS FUNCIONAIS ===
  {
    type: 'header',
    name: 'Cabeçalho',
    description: 'Título principal da página',
    icon: 'Type',
    category: 'content',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Título Principal'
      },
      {
        key: 'subtitle',
        label: 'Subtítulo',
        type: 'textarea',
        defaultValue: 'Subtítulo opcional'
      }
    ]
  },
  {
    type: 'text',
    name: 'Texto',
    description: 'Bloco de texto editável',
    icon: 'Type',
    category: 'content',
    propertiesSchema: [
      {
        key: 'content',
        label: 'Conteúdo',
        type: 'textarea',
        defaultValue: 'Seu texto aqui...'
      }
    ]
  },
  {
    type: 'image',
    name: 'Imagem',
    description: 'Imagem com configurações',
    icon: 'Image',
    category: 'content',
    propertiesSchema: [
      {
        key: 'imageUrl',
        label: 'URL da Imagem',
        type: 'image-url',
        defaultValue: 'https://via.placeholder.com/400x300'
      },
      {
        key: 'altText',
        label: 'Texto Alternativo',
        type: 'text-input',
        defaultValue: 'Imagem'
      }
    ]
  },
  {
    type: 'button',
    name: 'Botão',
    description: 'Botão de ação',
    icon: 'ArrowRightLeft',
    category: 'content',
    propertiesSchema: [
      {
        key: 'text',
        label: 'Texto do Botão',
        type: 'text-input',
        defaultValue: 'Clique Aqui'
      },
      {
        key: 'href',
        label: 'Link',
        type: 'text-input',
        defaultValue: '#'
      }
    ]
  },
  {
    type: 'spacer',
    name: 'Espaçador',
    description: 'Espaço em branco',
    icon: 'RectangleHorizontal',
    category: 'layout',
    propertiesSchema: [
      {
        key: 'height',
        label: 'Altura',
        type: 'number-input',
        defaultValue: 40
      }
    ]
  },

  // === COMPONENTES INLINE ESPECIALIZADOS PARA QUIZ ===
  {
    type: 'quiz-intro-header',
    name: 'Cabeçalho do Quiz',
    description: 'Header com logo e barra de progresso',
    icon: 'Rows3',
    category: 'quiz',
    propertiesSchema: [
      {
        key: 'logoUrl',
        label: 'URL do Logo',
        type: 'image-url',
        defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp'
      },
      {
        key: 'logoAlt',
        label: 'Texto Alternativo do Logo',
        type: 'text-input',
        defaultValue: 'Logo da Marca'
      },
      {
        key: 'logoWidth',
        label: 'Largura do Logo',
        type: 'number-input',
        defaultValue: 96,
        min: 50,
        max: 200
      },
      {
        key: 'logoHeight',
        label: 'Altura do Logo',
        type: 'number-input',
        defaultValue: 96,
        min: 50,
        max: 200
      },
      {
        key: 'progressValue',
        label: 'Valor do Progresso',
        type: 'number-input',
        defaultValue: 0,
        min: 0,
        max: 100
      },
      {
        key: 'progressMax',
        label: 'Máximo do Progresso',
        type: 'number-input',
        defaultValue: 100,
        min: 100,
        max: 100
      },
      {
        key: 'showBackButton',
        label: 'Mostrar Botão Voltar',
        type: 'boolean-switch',
        defaultValue: true
      }
    ]
  },
  {
    type: 'options-grid',
    name: 'Grid de Opções',
    description: 'Grid responsivo para questões do quiz',
    icon: 'Rows3',
    category: 'quiz',
    propertiesSchema: [
      {
        key: 'options',
        label: 'Opções',
        type: 'array-editor',
        defaultValue: [
          { id: 'opcao1', text: 'Opção 1', value: 'opcao1' },
          { id: 'opcao2', text: 'Opção 2', value: 'opcao2' }
        ]
      },
      {
        key: 'columns',
        label: 'Número de Colunas',
        type: 'number-input',
        defaultValue: 2,
        min: 1,
        max: 3
      },
      {
        key: 'showImages',
        label: 'Mostrar Imagens',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'imageSize',
        label: 'Tamanho da Imagem',
        type: 'select',
        options: [
          { label: 'Pequeno', value: 'small' },
          { label: 'Médio', value: 'medium' },
          { label: 'Grande', value: 'large' }
        ],
        defaultValue: 'medium'
      },
      {
        key: 'multipleSelection',
        label: 'Seleção Múltipla',
        type: 'boolean-switch',
        defaultValue: false
      },
      {
        key: 'maxSelections',
        label: 'Máximo de Seleções',
        type: 'number-input',
        defaultValue: 1,
        min: 1,
        max: 10
      },
      {
        key: 'responsiveColumns',
        label: 'Colunas Responsivas',
        type: 'boolean-switch',
        defaultValue: true
      }
    ]
  },
  {
    type: 'progress-inline',
    name: 'Barra de Progresso',
    description: 'Barra de progresso animada',
    icon: 'TrendingUp',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'progressValue',
        label: 'Valor do Progresso',
        type: 'number-input',
        defaultValue: 50,
        min: 0,
        max: 100
      },
      {
        key: 'progressMax',
        label: 'Valor Máximo',
        type: 'number-input',
        defaultValue: 100,
        min: 100,
        max: 100
      },
      {
        key: 'showPercentage',
        label: 'Mostrar Porcentagem',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'animated',
        label: 'Animado',
        type: 'boolean-switch',
        defaultValue: false
      },
      {
        key: 'color',
        label: 'Cor',
        type: 'text-input',
        defaultValue: '#B89B7A'
      },
      {
        key: 'backgroundColor',
        label: 'Cor de Fundo',
        type: 'text-input',
        defaultValue: '#F5F5F5'
      },
      {
        key: 'height',
        label: 'Altura',
        type: 'number-input',
        defaultValue: 8,
        min: 4,
        max: 20
      }
    ]
  },
  {
    type: 'loading-animation',
    name: 'Animação de Carregamento',
    description: 'Spinner ou loading para transições',
    icon: 'Loader2',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'type',
        label: 'Tipo de Animação',
        type: 'select',
        options: [
          { label: 'Spinner', value: 'spinner' },
          { label: 'Dots', value: 'dots' },
          { label: 'Pulse', value: 'pulse' }
        ],
        defaultValue: 'spinner'
      },
      {
        key: 'size',
        label: 'Tamanho',
        type: 'select',
        options: [
          { label: 'Pequeno', value: 'small' },
          { label: 'Médio', value: 'medium' },
          { label: 'Grande', value: 'large' }
        ],
        defaultValue: 'medium'
      },
      {
        key: 'color',
        label: 'Cor',
        type: 'text-input',
        defaultValue: '#B89B7A'
      },
      {
        key: 'duration',
        label: 'Duração (ms)',
        type: 'number-input',
        defaultValue: 3000,
        min: 1000,
        max: 10000
      }
    ]
  },
  {
    type: 'image-display-inline',
    name: 'Exibição de Imagem',
    description: 'Imagem otimizada e responsiva',
    icon: 'Image',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'src',
        label: 'URL da Imagem',
        type: 'image-url',
        defaultValue: 'https://via.placeholder.com/600x400'
      },
      {
        key: 'alt',
        label: 'Texto Alternativo',
        type: 'text-input',
        defaultValue: 'Imagem'
      },
      {
        key: 'width',
        label: 'Largura',
        type: 'number-input',
        defaultValue: 600,
        min: 100,
        max: 1200
      },
      {
        key: 'height',
        label: 'Altura',
        type: 'number-input',
        defaultValue: 400,
        min: 100,
        max: 800
      },
      {
        key: 'className',
        label: 'Classes CSS',
        type: 'text-input',
        defaultValue: 'object-cover w-full h-auto rounded-lg mx-auto'
      }
    ]
  },
  {
    type: 'quiz-offer-pricing-inline',
    name: 'Preços da Oferta',
    description: 'Bloco de preços para ofertas comerciais',
    icon: 'DollarSign',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'originalPrice',
        label: 'Preço Original',
        type: 'number-input',
        defaultValue: 197,
        min: 1
      },
      {
        key: 'discountedPrice',
        label: 'Preço com Desconto',
        type: 'number-input',
        defaultValue: 97,
        min: 1
      },
      {
        key: 'discountPercentage',
        label: 'Porcentagem de Desconto',
        type: 'number-input',
        defaultValue: 51,
        min: 1,
        max: 99
      },
      {
        key: 'currency',
        label: 'Moeda',
        type: 'select',
        options: [
          { label: 'Real (BRL)', value: 'BRL' },
          { label: 'Dólar (USD)', value: 'USD' },
          { label: 'Euro (EUR)', value: 'EUR' }
        ],
        defaultValue: 'BRL'
      },
      {
        key: 'installments',
        label: 'Parcelamento',
        type: 'text-input',
        defaultValue: '{ "number": 12, "value": 8.83 }'
      },
      {
        key: 'features',
        label: 'Lista de Recursos',
        type: 'array-editor',
        defaultValue: [
          'Guia Completo do Seu Estilo (PDF)',
          'Análise Personalizada Detalhada',
          'Dicas de Combinações',
          'Lista de Compras Estratégicas',
          'Suporte por 30 dias'
        ]
      },
      {
        key: 'highlighted',
        label: 'Destacado',
        type: 'boolean-switch',
        defaultValue: true
      }
    ]
  },
  {
    type: 'style-card-inline',
    name: 'Card de Estilo',
    description: 'Card para estilos secundários',
    icon: 'Palette',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'styleName',
        label: 'Nome do Estilo',
        type: 'text-input',
        defaultValue: 'Moderno'
      },
      {
        key: 'percentage',
        label: 'Porcentagem',
        type: 'number-input',
        defaultValue: 20,
        min: 0,
        max: 100
      },
      {
        key: 'description',
        label: 'Descrição',
        type: 'textarea',
        defaultValue: 'Traços modernos na sua personalidade',
        rows: 2
      },
      {
        key: 'imageUrl',
        label: 'Imagem do Estilo',
        type: 'image-url',
        defaultValue: 'https://via.placeholder.com/200x150'
      },
      {
        key: 'compact',
        label: 'Layout Compacto',
        type: 'boolean-switch',
        defaultValue: true
      }
    ]
  },
  {
    type: 'testimonial-card-inline',
    name: 'Card de Depoimento',
    description: 'Card de depoimento com foto e rating',
    icon: 'MessageSquare',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'name',
        label: 'Nome',
        type: 'text-input',
        defaultValue: 'Ana Carolina'
      },
      {
        key: 'location',
        label: 'Localização',
        type: 'text-input',
        defaultValue: 'São Paulo, SP'
      },
      {
        key: 'text',
        label: 'Texto do Depoimento',
        type: 'textarea',
        defaultValue: 'Depois do quiz descobri que sou do estilo Elegante e o guia me ajudou a reorganizar todo meu guarda-roupa. Agora me visto com muito mais confiança!',
        rows: 3
      },
      {
        key: 'rating',
        label: 'Avaliação (1-5)',
        type: 'number-input',
        defaultValue: 5,
        min: 1,
        max: 5
      },
      {
        key: 'avatar',
        label: 'Foto do Cliente',
        type: 'image-url',
        defaultValue: 'https://via.placeholder.com/80x80'
      },
      {
        key: 'compact',
        label: 'Layout Compacto',
        type: 'boolean-switch',
        defaultValue: false
      }
    ]
  },
  {
    type: 'badge-inline',
    name: 'Badge',
    description: 'Badge de garantia ou destaque',
    icon: 'Award',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'text',
        label: 'Texto Principal',
        type: 'text-input',
        defaultValue: '7 DIAS DE GARANTIA'
      },
      {
        key: 'subtext',
        label: 'Texto Secundário',
        type: 'text-input',
        defaultValue: 'Se não gostar, devolvemos seu dinheiro'
      },
      {
        key: 'icon',
        label: 'Ícone',
        type: 'select',
        options: [
          { label: 'Escudo', value: 'shield' },
          { label: 'Estrela', value: 'star' },
          { label: 'Verificado', value: 'check' },
          { label: 'Prêmio', value: 'award' }
        ],
        defaultValue: 'shield'
      },
      {
        key: 'color',
        label: 'Cor do Badge',
        type: 'select',
        options: [
          { label: 'Verde', value: 'green' },
          { label: 'Azul', value: 'blue' },
          { label: 'Dourado', value: 'gold' },
          { label: 'Vermelho', value: 'red' }
        ],
        defaultValue: 'green'
      },
      {
        key: 'size',
        label: 'Tamanho',
        type: 'select',
        options: [
          { label: 'Pequeno', value: 'small' },
          { label: 'Médio', value: 'medium' },
          { label: 'Grande', value: 'large' }
        ],
        defaultValue: 'medium'
      },
      {
        key: 'centered',
        label: 'Centralizado',
        type: 'boolean-switch',
        defaultValue: true
      }
    ]
  },
  {
    type: 'result-header-inline',
    name: 'Cabeçalho de Resultado',
    description: 'Header personalizado para página de resultado',
    icon: 'Crown',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'logoUrl',
        label: 'URL do Logo',
        type: 'image-url',
        defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp'
      },
      {
        key: 'logoAlt',
        label: 'Texto Alternativo do Logo',
        type: 'text-input',
        defaultValue: 'Logo da Marca'
      },
      {
        key: 'logoWidth',
        label: 'Largura do Logo',
        type: 'number-input',
        defaultValue: 96,
        min: 50,
        max: 200
      },
      {
        key: 'logoHeight',
        label: 'Altura do Logo',
        type: 'number-input',
        defaultValue: 96,
        min: 50,
        max: 200
      },
      {
        key: 'userName',
        label: 'Nome do Usuário',
        type: 'text-input',
        defaultValue: 'dinamicUserName'
      },
      {
        key: 'showProgress',
        label: 'Mostrar Progresso',
        type: 'boolean-switch',
        defaultValue: false
      }
    ]
  },

  // === COMPONENTES ESSENCIAIS DO QUIZ (Header com Logo + Progresso) ===
  {
    type: 'quiz-intro-header',
    name: 'Header do Quiz (Logo + Progresso)',
    description: 'Cabeçalho com logotipo e barra de progresso para todas as etapas',
    icon: 'Crown',
    category: 'Quiz',
    propertiesSchema: [
      {
        key: 'logoUrl',
        label: 'URL do Logo',
        type: 'image-url',
        defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp'
      },
      {
        key: 'logoAlt',
        label: 'Texto Alternativo do Logo',
        type: 'text-input',
        defaultValue: 'Logo da Marca'
      },
      {
        key: 'logoWidth',
        label: 'Largura do Logo (px)',
        type: 'number-input',
        defaultValue: 96,
        min: 50,
        max: 200
      },
      {
        key: 'progressValue',
        label: 'Valor do Progresso (%)',
        type: 'number-input',
        defaultValue: 0,
        min: 0,
        max: 100
      },
      {
        key: 'showBackButton',
        label: 'Mostrar Botão Voltar',
        type: 'boolean-switch',
        defaultValue: false
      }
    ]
  },

  // === COMPONENTES INLINE MODULARES (ES7+) ===
  {
    type: 'text-inline',
    name: 'Texto Inline',
    description: 'Texto modular e responsivo',
    icon: 'Type',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'content',
        label: 'Conteúdo',
        type: 'textarea',
        defaultValue: 'Seu texto aqui...',
        rows: 3
      },
      {
        key: 'fontSize',
        label: 'Tamanho da Fonte',
        type: 'select',
        options: [
          { label: 'Pequeno', value: 'text-sm' },
          { label: 'Normal', value: 'text-base' },
          { label: 'Grande', value: 'text-lg' },
          { label: 'Extra Grande', value: 'text-xl' }
        ],
        defaultValue: 'text-base'
      },
      {
        key: 'textAlign',
        label: 'Alinhamento',
        type: 'select',
        options: [
          { label: 'Esquerda', value: 'text-left' },
          { label: 'Centro', value: 'text-center' },
          { label: 'Direita', value: 'text-right' }
        ],
        defaultValue: 'text-left'
      }
    ]
  },
  {
    type: 'heading-inline',
    name: 'Título Inline',
    description: 'Título modular e configurável',
    icon: 'Type',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'content',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Título Principal'
      },
      {
        key: 'level',
        label: 'Nível do Título',
        type: 'select',
        options: [
          { label: 'H1', value: 'h1' },
          { label: 'H2', value: 'h2' },
          { label: 'H3', value: 'h3' },
          { label: 'H4', value: 'h4' }
        ],
        defaultValue: 'h2'
      },
      {
        key: 'textAlign',
        label: 'Alinhamento',
        type: 'select',
        options: [
          { label: 'Esquerda', value: 'text-left' },
          { label: 'Centro', value: 'text-center' },
          { label: 'Direita', value: 'text-right' }
        ],
        defaultValue: 'text-center'
      }
    ]
  },
  {
    type: 'button-inline',
    name: 'Botão Inline',
    description: 'Botão modular e responsivo',
    icon: 'Play',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'text',
        label: 'Texto do Botão',
        type: 'text-input',
        defaultValue: 'Clique Aqui'
      },
      {
        key: 'href',
        label: 'Link',
        type: 'text-input',
        defaultValue: '#'
      },
      {
        key: 'variant',
        label: 'Estilo',
        type: 'select',
        options: [
          { label: 'Primário', value: 'primary' },
          { label: 'Secundário', value: 'secondary' },
          { label: 'Sucesso', value: 'success' },
          { label: 'Perigo', value: 'danger' }
        ],
        defaultValue: 'primary'
      },
      {
        key: 'size',
        label: 'Tamanho',
        type: 'select',
        options: [
          { label: 'Pequeno', value: 'small' },
          { label: 'Médio', value: 'medium' },
          { label: 'Grande', value: 'large' }
        ],
        defaultValue: 'medium'
      }
    ]
  },

  // === COMPONENTES ESPECÍFICOS DAS ETAPAS 20 E 21 ===
  {
    type: 'options-grid',
    name: 'Grade de Opções',
    description: 'Grid de opções para questões do quiz',
    icon: 'Rows3',
    category: 'Quiz',
    propertiesSchema: [
      {
        key: 'options',
        label: 'Opções',
        type: 'array-editor',
        defaultValue: ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4']
      },
      {
        key: 'columns',
        label: 'Número de Colunas',
        type: 'select',
        options: [
          { label: '1 Coluna', value: '1' },
          { label: '2 Colunas', value: '2' },
          { label: '3 Colunas', value: '3' },
          { label: '4 Colunas', value: '4' }
        ],
        defaultValue: '2'
      },
      {
        key: 'allowMultiple',
        label: 'Permitir Múltipla Seleção',
        type: 'boolean-switch',
        defaultValue: false
      }
    ]
  },
  {
    type: 'progress-inline',
    name: 'Barra de Progresso',
    description: 'Barra de progresso responsiva',
    icon: 'TrendingUp',
    category: 'Quiz',
    propertiesSchema: [
      {
        key: 'value',
        label: 'Valor (%)',
        type: 'number-input',
        defaultValue: 50,
        min: 0,
        max: 100
      },
      {
        key: 'showLabel',
        label: 'Mostrar Rótulo',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'color',
        label: 'Cor',
        type: 'select',
        options: [
          { label: 'Primária', value: 'primary' },
          { label: 'Sucesso', value: 'success' },
          { label: 'Aviso', value: 'warning' },
          { label: 'Perigo', value: 'danger' }
        ],
        defaultValue: 'primary'
      }
    ]
  },
  {
    type: 'loading-animation',
    name: 'Animação de Carregamento',
    description: 'Animação de loading para transições',
    icon: 'Refresh',
    category: 'Quiz',
    propertiesSchema: [
      {
        key: 'type',
        label: 'Tipo de Animação',
        type: 'select',
        options: [
          { label: 'Spinner', value: 'spinner' },
          { label: 'Dots', value: 'dots' },
          { label: 'Pulse', value: 'pulse' },
          { label: 'Bounce', value: 'bounce' }
        ],
        defaultValue: 'spinner'
      },
      {
        key: 'size',
        label: 'Tamanho',
        type: 'select',
        options: [
          { label: 'Pequeno', value: 'small' },
          { label: 'Médio', value: 'medium' },
          { label: 'Grande', value: 'large' }
        ],
        defaultValue: 'medium'
      },
      {
        key: 'message',
        label: 'Mensagem',
        type: 'text-input',
        defaultValue: 'Carregando...'
      }
    ]
  },
  {
    type: 'image-display-inline',
    name: 'Imagem Display Inline',
    description: 'Imagem responsiva com configurações avançadas',
    icon: 'Image',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'src',
        label: 'URL da Imagem',
        type: 'image-url',
        defaultValue: 'https://via.placeholder.com/400x300'
      },
      {
        key: 'alt',
        label: 'Texto Alternativo',
        type: 'text-input',
        defaultValue: 'Imagem'
      },
      {
        key: 'width',
        label: 'Largura',
        type: 'number-input',
        defaultValue: 400,
        min: 100,
        max: 1200
      },
      {
        key: 'height',
        label: 'Altura',
        type: 'number-input',
        defaultValue: 300,
        min: 100,
        max: 800
      },
      {
        key: 'className',
        label: 'Classes CSS',
        type: 'text-input',
        defaultValue: 'object-cover w-full h-auto rounded-lg'
      }
    ]
  },

  // === COMPONENTES DA ETAPA 20 (RESULTADO) ===
  {
    type: 'result-header-inline',
    name: 'Header de Resultado',
    description: 'Cabeçalho personalizado para página de resultado',
    icon: 'Award',
    category: 'Quiz',
    propertiesSchema: [
      {
        key: 'logoUrl',
        label: 'URL do Logo',
        type: 'image-url',
        defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp'
      },
      {
        key: 'userName',
        label: 'Nome do Usuário',
        type: 'text-input',
        defaultValue: 'dinamicUserName'
      },
      {
        key: 'showProgress',
        label: 'Mostrar Progresso',
        type: 'boolean-switch',
        defaultValue: false
      }
    ]
  },
  {
    type: 'style-card-inline',
    name: 'Card de Estilo',
    description: 'Card para exibir estilos secundários',
    icon: 'Crown',
    category: 'Quiz',
    propertiesSchema: [
      {
        key: 'styleName',
        label: 'Nome do Estilo',
        type: 'text-input',
        defaultValue: 'Elegante'
      },
      {
        key: 'percentage',
        label: 'Porcentagem',
        type: 'number-input',
        defaultValue: 85,
        min: 0,
        max: 100
      },
      {
        key: 'description',
        label: 'Descrição',
        type: 'textarea',
        defaultValue: 'Descrição do estilo...'
      },
      {
        key: 'imageUrl',
        label: 'Imagem do Estilo',
        type: 'image-url',
        defaultValue: 'https://via.placeholder.com/300x200'
      },
      {
        key: 'compact',
        label: 'Modo Compacto',
        type: 'boolean-switch',
        defaultValue: false
      }
    ]
  },
  {
    type: 'testimonial-card-inline',
    name: 'Card de Depoimento',
    description: 'Card individual de depoimento',
    icon: 'Quote',
    category: 'Vendas',
    propertiesSchema: [
      {
        key: 'name',
        label: 'Nome',
        type: 'text-input',
        defaultValue: 'Cliente Satisfeito'
      },
      {
        key: 'text',
        label: 'Depoimento',
        type: 'textarea',
        defaultValue: 'Excelente produto! Recomendo.',
        rows: 3
      },
      {
        key: 'rating',
        label: 'Avaliação (1-5)',
        type: 'number-input',
        defaultValue: 5,
        min: 1,
        max: 5
      },
      {
        key: 'avatarUrl',
        label: 'Foto do Cliente',
        type: 'image-url',
        defaultValue: 'https://via.placeholder.com/64x64'
      }
    ]
  },
  {
    type: 'badge-inline',
    name: 'Badge',
    description: 'Etiqueta/selo inline',
    icon: 'Shield',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'text',
        label: 'Texto',
        type: 'text-input',
        defaultValue: 'Novo'
      },
      {
        key: 'variant',
        label: 'Variante',
        type: 'select',
        options: [
          { label: 'Padrão', value: 'default' },
          { label: 'Primário', value: 'primary' },
          { label: 'Sucesso', value: 'success' },
          { label: 'Aviso', value: 'warning' },
          { label: 'Perigo', value: 'danger' }
        ],
        defaultValue: 'default'
      }
    ]
  },

  // === COMPONENTES DA ETAPA 21 (OFERTA) ===
  {
    type: 'quiz-offer-pricing-inline',
    name: 'Preços da Oferta',
    description: 'Bloco de preços otimizado para conversão',
    icon: 'CircleDollarSign',
    category: 'Vendas',
    propertiesSchema: [
      {
        key: 'originalPrice',
        label: 'Preço Original',
        type: 'number-input',
        defaultValue: 197
      },
      {
        key: 'discountedPrice',
        label: 'Preço com Desconto',
        type: 'number-input',
        defaultValue: 97
      },
      {
        key: 'discountPercentage',
        label: 'Porcentagem de Desconto',
        type: 'number-input',
        defaultValue: 51,
        min: 0,
        max: 100
      },
      {
        key: 'currency',
        label: 'Moeda',
        type: 'select',
        options: [
          { label: 'Real (BRL)', value: 'BRL' },
          { label: 'Dólar (USD)', value: 'USD' },
          { label: 'Euro (EUR)', value: 'EUR' }
        ],
        defaultValue: 'BRL'
      },
      {
        key: 'highlighted',
        label: 'Destacado',
        type: 'boolean-switch',
        defaultValue: true
      }
    ]
  },
  {
    type: 'result-card-inline',
    name: 'Card de Resultado',
    description: 'Card de resultado do quiz',
    icon: 'Award',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título do Resultado',
        type: 'text-input',
        defaultValue: 'Seu Estilo Pessoal'
      },
      {
        key: 'description',
        label: 'Descrição',
        type: 'textarea',
        defaultValue: 'Descrição do resultado...',
        rows: 3
      },
      {
        key: 'imageUrl',
        label: 'Imagem do Resultado',
        type: 'image-url',
        defaultValue: 'https://via.placeholder.com/300x200'
      },
      {
        key: 'percentage',
        label: 'Porcentagem de Match',
        type: 'number-input',
        defaultValue: 85,
        min: 0,
        max: 100
      }
    ]
  },
  {
    type: 'countdown-inline',
    name: 'Contador Regressivo',
    description: 'Timer de urgência modular',
    icon: 'Clock',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Oferta por tempo limitado!'
      },
      {
        key: 'targetMinutes',
        label: 'Minutos para expirar',
        type: 'number-input',
        defaultValue: 15,
        min: 1,
        max: 60
      },
      {
        key: 'showLabels',
        label: 'Mostrar Labels',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'urgencyColor',
        label: 'Cor de Urgência',
        type: 'select',
        options: [
          { label: 'Vermelho', value: 'red' },
          { label: 'Laranja', value: 'orange' },
          { label: 'Amarelo', value: 'yellow' }
        ],
        defaultValue: 'red'
      }
    ]
  },

  // === COMPONENTES DE QUIZ FUNCIONAIS ===
  {
    type: 'quiz-start-page',
    name: 'Quiz Início',
    description: 'Página inicial do quiz',
    icon: 'Play',
    category: 'Quiz',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Descubra Seu Estilo'
      },
      {
        key: 'subtitle',
        label: 'Subtítulo',
        type: 'textarea',
        defaultValue: 'Um quiz personalizado para você'
      },
      {
        key: 'buttonText',
        label: 'Texto do Botão',
        type: 'text-input',
        defaultValue: 'Começar Quiz'
      }
    ]
  },
  {
    type: 'question-multiple',
    name: 'Questão Múltipla',
    description: 'Pergunta com múltiplas opções',
    icon: 'HelpCircle',
    category: 'Quiz',
    propertiesSchema: [
      {
        key: 'question',
        label: 'Pergunta',
        type: 'textarea',
        defaultValue: 'Qual é sua preferência?'
      },
      {
        key: 'options',
        label: 'Opções',
        type: 'array-editor',
        defaultValue: ['Opção 1', 'Opção 2', 'Opção 3']
      }
    ]
  },
  {
    type: 'result-page',
    name: 'Página de Resultado',
    description: 'Página com resultado do quiz',
    icon: 'Award',
    category: 'Quiz',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Seu Resultado'
      },
      {
        key: 'description',
        label: 'Descrição',
        type: 'textarea',
        defaultValue: 'Parabéns! Aqui está seu resultado...'
      }
    ]
  },

  // === COMPONENTES DE VENDAS FUNCIONAIS ===
  {
    type: 'testimonials',
    name: 'Depoimentos',
    description: 'Seção de depoimentos',
    icon: 'Quote',
    category: 'Vendas',
    propertiesSchema: [
      {
        key: 'testimonials',
        label: 'Depoimentos',
        type: 'array-editor',
        defaultValue: [
          {
            name: 'Cliente',
            text: 'Excelente produto!',
            rating: 5
          }
        ]
      }
    ]
  },
  {
    type: 'pricing-inline',
    name: 'Preços',
    description: 'Tabela de preços',
    icon: 'CircleDollarSign',
    category: 'Vendas',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Nossos Preços'
      },
      {
        key: 'price',
        label: 'Preço',
        type: 'text-input',
        defaultValue: 'R$ 97,00'
      },
      {
        key: 'originalPrice',
        label: 'Preço Original',
        type: 'text-input',
        defaultValue: 'R$ 197,00'
      }
    ]
  },
  {
    type: 'faq-section',
    name: 'FAQ',
    description: 'Perguntas frequentes',
    icon: 'HelpCircle',
    category: 'Vendas',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Perguntas Frequentes'
      },
      {
        key: 'faqs',
        label: 'Perguntas',
        type: 'array-editor',
        defaultValue: [
          {
            question: 'Como funciona?',
            answer: 'É muito simples...'
          }
        ]
      }
    ]
  },
  {
    type: 'guarantee',
    name: 'Garantia',
    description: 'Seção de garantia',
    icon: 'Shield',
    category: 'Vendas',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Garantia de 30 dias'
      },
      {
        key: 'description',
        label: 'Descrição',
        type: 'textarea',
        defaultValue: 'Garantia incondicional...'
      }
    ]
  },

  // === COMPONENTES MODERNOS FUNCIONAIS ===
  {
    type: 'testimonials-grid',
    name: 'Grid de Depoimentos',
    description: 'Depoimentos em grid',
    icon: 'Users',
    category: 'Avançado',
    propertiesSchema: [
      {
        key: 'testimonials',
        label: 'Depoimentos',
        type: 'array-editor',
        defaultValue: []
      }
    ]
  },
  {
    type: 'social-proof',
    name: 'Prova Social',
    description: 'Indicadores de credibilidade',
    icon: 'CheckCircle',
    category: 'Avançado',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Mais de 10.000 clientes satisfeitos'
      }
    ]
  },
  {
    type: 'value-anchoring',
    name: 'Âncora de Valor',
    description: 'Comparação de valores',
    icon: 'TrendingUp',
    category: 'Avançado',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Compare os Valores'
      }
    ]
  },
  {
    type: 'before-after',
    name: 'Antes e Depois',
    description: 'Comparação antes/depois',
    icon: 'ArrowRightLeft',
    category: 'Avançado',
    propertiesSchema: [
      {
        key: 'beforeTitle',
        label: 'Título Antes',
        type: 'text-input',
        defaultValue: 'Antes'
      },
      {
        key: 'afterTitle',
        label: 'Título Depois',
        type: 'text-input',
        defaultValue: 'Depois'
      }
    ]
  },

  // === COMPONENTES DE MÍDIA FUNCIONAIS ===
  {
    type: 'video-player',
    name: 'Vídeo',
    description: 'Player de vídeo',
    icon: 'Video',
    category: 'Mídia',
    propertiesSchema: [
      {
        key: 'videoUrl',
        label: 'URL do Vídeo',
        type: 'video-url',
        defaultValue: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Vídeo'
      }
    ]
  },

  // === COMPONENTES DE FORMULÁRIO FUNCIONAIS ===
  {
    type: 'form-input',
    name: 'Campo de Entrada',
    description: 'Campo de formulário',
    icon: 'TextCursorInput',
    category: 'Formulário',
    propertiesSchema: [
      {
        key: 'label',
        label: 'Label',
        type: 'text-input',
        defaultValue: 'Nome'
      },
      {
        key: 'placeholder',
        label: 'Placeholder',
        type: 'text-input',
        defaultValue: 'Digite seu nome...'
      },
      {
        key: 'inputType',
        label: 'Tipo',
        type: 'select',
        options: [
          { label: 'Texto', value: 'text' },
          { label: 'Email', value: 'email' },
          { label: 'Número', value: 'number' }
        ],
        defaultValue: 'text'
      }
    ]
  },
  {
    type: 'list',
    name: 'Lista',
    description: 'Lista de itens',
    icon: 'List',
    category: 'Formulário',
    propertiesSchema: [
      {
        key: 'items',
        label: 'Itens',
        type: 'array-editor',
        defaultValue: ['Item 1', 'Item 2', 'Item 3']
      }
    ]
  },

  // === ETAPAS 20 E 21 - COMPONENTES ESPECÍFICOS ===
  {
    type: 'modern-result-page',
    name: 'Página de Resultado Moderna (Etapa 20)',
    description: 'Página de resultado com design moderno e completo',
    icon: 'Award',
    category: 'Quiz',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título Principal',
        type: 'text-input',
        defaultValue: 'Parabéns! Descobrimos seu estilo'
      },
      {
        key: 'subtitle',
        label: 'Subtítulo',
        type: 'text-input',
        defaultValue: 'Aqui está seu resultado personalizado'
      },
      {
        key: 'resultStyle',
        label: 'Estilo do Resultado',
        type: 'text-input',
        defaultValue: 'Elegante'
      },
      {
        key: 'description',
        label: 'Descrição do Resultado',
        type: 'textarea',
        defaultValue: 'Você tem um estilo único que combina elegância com modernidade...'
      },
      {
        key: 'imageUrl',
        label: 'Imagem do Resultado',
        type: 'image-url',
        defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp'
      },
      {
        key: 'guideImageUrl',
        label: 'Imagem do Guia',
        type: 'image-url',
        defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_NATURAL_fzp6fc.webp'
      },
      {
        key: 'percentage',
        label: 'Porcentagem do Resultado',
        type: 'number-input',
        defaultValue: 85,
        min: 0,
        max: 100
      },
      {
        key: 'showSecondaryStyles',
        label: 'Mostrar Estilos Secundários',
        type: 'boolean-switch',
        defaultValue: true
      }
    ]
  },
  {
    type: 'quiz-offer-page',
    name: 'Página de Oferta do Quiz (Etapa 21)',
    description: 'Página de oferta com conversão otimizada',
    icon: 'ShoppingCart',
    category: 'Quiz',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título da Oferta',
        type: 'text-input',
        defaultValue: 'Oferta Especial Para Você'
      },
      {
        key: 'subtitle',
        label: 'Subtítulo da Oferta',
        type: 'text-input',
        defaultValue: 'Baseado no seu resultado personalizado'
      },
      {
        key: 'productTitle',
        label: 'Nome do Produto',
        type: 'text-input',
        defaultValue: 'Consultoria de Estilo Personalizada'
      },
      {
        key: 'originalPrice',
        label: 'Preço Original',
        type: 'text-input',
        defaultValue: 'R$ 497,00'
      },
      {
        key: 'offerPrice',
        label: 'Preço da Oferta',
        type: 'text-input',
        defaultValue: 'R$ 197,00'
      },
      {
        key: 'discount',
        label: 'Desconto',
        type: 'text-input',
        defaultValue: '60% OFF'
      },
      {
        key: 'ctaText',
        label: 'Texto do Botão',
        type: 'text-input',
        defaultValue: 'QUERO MINHA CONSULTORIA'
      },
      {
        key: 'ctaUrl',
        label: 'Link do Botão',
        type: 'text-input',
        defaultValue: 'https://pay.hotmart.com/exemplo'
      },
      {
        key: 'urgencyText',
        label: 'Texto de Urgência',
        type: 'text-input',
        defaultValue: 'Oferta válida por tempo limitado!'
      },
      {
        key: 'showCountdown',
        label: 'Mostrar Timer',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'countdownMinutes',
        label: 'Minutos do Timer',
        type: 'number-input',
        defaultValue: 15,
        min: 1,
        max: 60
      },
      {
        key: 'showTestimonials',
        label: 'Mostrar Depoimentos',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'showGuarantee',
        label: 'Mostrar Garantia',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'showFAQ',
        label: 'Mostrar FAQ',
        type: 'boolean-switch',
        defaultValue: true
      }
    ]
  }
];

// Helper functions
export const getCategories = (): string[] => {
  const categories = Array.from(new Set(blockDefinitions.map(block => block.category)));
  return categories.sort();
};

export const getBlocksByCategory = (category: string) => {
  return blockDefinitions.filter(block => block.category === category);
};

export const getBlockDefinition = (type: string) => {
  return blockDefinitions.find(block => block.type === type);
};

export const getBlockSchema = (type: string) => {
  const definition = getBlockDefinition(type);
  return definition?.propertiesSchema || [];
};