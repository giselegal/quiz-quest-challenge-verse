// =====================================================================
// BLOCOS OTIMIZADOS E BEM ESTRUTURADOS
// Configuração das 21 etapas do funil com componentes mais organizados
// =====================================================================

// Tipos base para o schema de propriedades
export type PropertyInputType =
  | 'text-input'
  | 'textarea'
  | 'number-input'
  | 'boolean-switch'
  | 'color-picker'
  | 'select'
  | 'image-url'
  | 'video-url'
  | 'array-editor'
  | 'json-editor';

export interface PropertyOption {
  label: string;
  value: string;
}

export interface PropertySchema {
  key: string;
  label: string;
  type: PropertyInputType;
  placeholder?: string;
  options?: PropertyOption[];
  defaultValue?: any;
  rows?: number;
  min?: number;
  max?: number;
  description?: string;
  nestedPath?: string;
  itemSchema?: PropertySchema[];
}

export interface BlockDefinition {
  type: string;
  name: string;
  description?: string;
  icon?: string;
  category?: string;
  isNew?: boolean;
  propertiesSchema?: PropertySchema[];
}

export const blockDefinitions: BlockDefinition[] = [
  // =====================================================================
  // SEÇÃO: COMPONENTES QUIZ ESSENCIAIS (Categoria: Quiz)
  // =====================================================================
  {
    type: 'quiz-intro-header',
    name: 'Header Quiz Profissional',
    description: 'Cabeçalho com logotipo, progresso e navegação otimizada',
    icon: 'Crown',
    category: 'Quiz',
    isNew: true,
    propertiesSchema: [
      {
        key: 'logoUrl',
        label: 'URL do Logo',
        type: 'image-url',
        defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp'
      },
      {
        key: 'progressValue',
        label: 'Progresso (%)',
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
  
  {
    type: 'quiz-question-title',
    name: 'Título de Questão',
    description: 'Título elegante para perguntas do quiz com numeração',
    icon: 'HelpCircle',
    category: 'Quiz',
    isNew: true,
    propertiesSchema: [
      {
        key: 'questionNumber',
        label: 'Número da Questão',
        type: 'number-input',
        defaultValue: 1,
        min: 1,
        max: 21
      },
      {
        key: 'title',
        label: 'Título da Questão',
        type: 'text-input',
        defaultValue: 'Qual é a sua preferência?'
      },
      {
        key: 'subtitle',
        label: 'Subtítulo (opcional)',
        type: 'text-input',
        defaultValue: ''
      }
    ]
  },

  {
    type: 'options-grid',
    name: 'Grid de Opções Visuais',
    description: 'Grid responsivo com imagens e textos para seleção múltipla',
    icon: 'Grid',
    category: 'Quiz',
    isNew: true,
    propertiesSchema: [
      {
        key: 'options',
        label: 'Opções',
        type: 'array-editor',
        defaultValue: [],
        itemSchema: [
          {
            key: 'id',
            label: 'ID',
            type: 'text-input',
            defaultValue: 'option-1'
          },
          {
            key: 'text',
            label: 'Texto',
            type: 'text-input',
            defaultValue: 'Opção'
          },
          {
            key: 'imageUrl',
            label: 'URL da Imagem',
            type: 'image-url',
            defaultValue: ''
          }
        ]
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
        key: 'columns',
        label: 'Colunas (Desktop)',
        type: 'select',
        options: [
          { label: '2 Colunas', value: '2' },
          { label: '3 Colunas', value: '3' },
          { label: '4 Colunas', value: '4' }
        ],
        defaultValue: '3'
      }
    ]
  },

  // =====================================================================
  // SEÇÃO: COMPONENTES RESULTADO (Categoria: Resultado)
  // =====================================================================
  {
    type: 'result-header-inline',
    name: 'Header de Resultado',
    description: 'Cabeçalho personalizado para página de resultados',
    icon: 'Award',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título Principal',
        type: 'text-input',
        defaultValue: 'Seu Resultado Personalizado'
      },
      {
        key: 'subtitle',
        label: 'Subtítulo',
        type: 'text-input',
        defaultValue: 'Descubra seu estilo único'
      },
      {
        key: 'backgroundColor',
        label: 'Cor de Fundo',
        type: 'color-picker',
        defaultValue: '#B89B7A'
      }
    ]
  },

  {
    type: 'style-card-inline',
    name: 'Card de Estilo',
    description: 'Card elegante mostrando o estilo predominante',
    icon: 'Star',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      {
        key: 'styleName',
        label: 'Nome do Estilo',
        type: 'text-input',
        defaultValue: 'Seu Estilo'
      },
      {
        key: 'styleDescription',
        label: 'Descrição',
        type: 'textarea',
        defaultValue: 'Descrição do estilo personalizado...',
        rows: 3
      },
      {
        key: 'styleImage',
        label: 'Imagem do Estilo',
        type: 'image-url',
        defaultValue: ''
      }
    ]
  },

  {
    type: 'result-card-inline',
    name: 'Card de Resultado',
    description: 'Card com informações detalhadas do resultado',
    icon: 'FileText',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Seu Resultado'
      },
      {
        key: 'content',
        label: 'Conteúdo',
        type: 'textarea',
        defaultValue: 'Conteúdo personalizado...',
        rows: 4
      },
      {
        key: 'showButton',
        label: 'Mostrar Botão',
        type: 'boolean-switch',
        defaultValue: true
      }
    ]
  },

  // =====================================================================
  // SEÇÃO: COMPONENTES OFERTA (Categoria: Vendas)
  // =====================================================================
  {
    type: 'price-highlight-inline',
    name: 'Destaque de Preço',
    description: 'Componente otimizado para exibir preços com urgência',
    icon: 'CircleDollarSign',
    category: 'Vendas',
    isNew: true,
    propertiesSchema: [
      {
        key: 'originalPrice',
        label: 'Preço Original',
        type: 'text-input',
        defaultValue: 'R$ 197,00'
      },
      {
        key: 'currentPrice',
        label: 'Preço Atual',
        type: 'text-input',
        defaultValue: 'R$ 97,00'
      },
      {
        key: 'discount',
        label: 'Desconto',
        type: 'text-input',
        defaultValue: '50% OFF'
      },
      {
        key: 'urgencyText',
        label: 'Texto de Urgência',
        type: 'text-input',
        defaultValue: 'Oferta por tempo limitado!'
      }
    ]
  },

  {
    type: 'quiz-offer-pricing-inline',
    name: 'Oferta de Quiz',
    description: 'Componente de oferta integrado ao resultado do quiz',
    icon: 'Gift',
    category: 'Vendas',
    isNew: true,
    propertiesSchema: [
      {
        key: 'productTitle',
        label: 'Título do Produto',
        type: 'text-input',
        defaultValue: 'Guia de Estilo Personalizado'
      },
      {
        key: 'productDescription',
        label: 'Descrição',
        type: 'textarea',
        defaultValue: 'Transforme seu guarda-roupa com seu guia personalizado...',
        rows: 3
      },
      {
        key: 'price',
        label: 'Preço',
        type: 'text-input',
        defaultValue: 'R$ 97,00'
      },
      {
        key: 'ctaText',
        label: 'Texto do CTA',
        type: 'text-input',
        defaultValue: 'Quero Meu Guia Agora!'
      }
    ]
  },

  // =====================================================================
  // SEÇÃO: COMPONENTES BÁSICOS OTIMIZADOS (Categoria: Básicos)
  // =====================================================================
  {
    type: 'text-inline',
    name: 'Texto Responsivo',
    description: 'Texto moderno com tipografia otimizada',
    icon: 'Type',
    category: 'Básicos',
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
        label: 'Tamanho',
        type: 'select',
        options: [
          { label: 'Pequeno', value: 'text-sm' },
          { label: 'Normal', value: 'text-base' },
          { label: 'Grande', value: 'text-lg' },
          { label: 'Título', value: 'text-2xl' }
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
      },
      {
        key: 'color',
        label: 'Cor',
        type: 'color-picker',
        defaultValue: '#432818'
      }
    ]
  },

  {
    type: 'heading-inline',
    name: 'Título Elegante',
    description: 'Títulos com tipografia premium',
    icon: 'Type',
    category: 'Básicos',
    propertiesSchema: [
      {
        key: 'content',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Título Principal'
      },
      {
        key: 'level',
        label: 'Nível',
        type: 'select',
        options: [
          { label: 'H1 (Hero)', value: 'h1' },
          { label: 'H2 (Seção)', value: 'h2' },
          { label: 'H3 (Subseção)', value: 'h3' }
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
    type: 'image-display-inline',
    name: 'Imagem Responsiva',
    description: 'Imagens otimizadas com lazy loading',
    icon: 'Image',
    category: 'Básicos',
    propertiesSchema: [
      {
        key: 'src',
        label: 'URL da Imagem',
        type: 'image-url',
        defaultValue: ''
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
        defaultValue: 600
      },
      {
        key: 'height',
        label: 'Altura',
        type: 'number-input',
        defaultValue: 400
      }
    ]
  },

  {
    type: 'button-inline',
    name: 'Botão Profissional',
    description: 'Botões otimizados para conversão',
    icon: 'Target',
    category: 'Básicos',
    propertiesSchema: [
      {
        key: 'text',
        label: 'Texto',
        type: 'text-input',
        defaultValue: 'Clique Aqui'
      },
      {
        key: 'variant',
        label: 'Variante',
        type: 'select',
        options: [
          { label: 'Primário', value: 'primary' },
          { label: 'Secundário', value: 'secondary' },
          { label: 'Outline', value: 'outline' }
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
      },
      {
        key: 'fullWidth',
        label: 'Largura Total',
        type: 'boolean-switch',
        defaultValue: false
      }
    ]
  },

  // =====================================================================
  // SEÇÃO: COMPONENTES LAYOUT (Categoria: Layout)
  // =====================================================================
  {
    type: 'spacer',
    name: 'Espaçador',
    description: 'Espaço vertical customizável',
    icon: 'ArrowRightLeft',
    category: 'Layout',
    propertiesSchema: [
      {
        key: 'height',
        label: 'Altura (px)',
        type: 'number-input',
        defaultValue: 24,
        min: 1,
        max: 200
      },
      {
        key: 'backgroundColor',
        label: 'Cor de Fundo',
        type: 'color-picker',
        defaultValue: 'transparent'
      }
    ]
  },

  {
    type: 'divider',
    name: 'Divisor',
    description: 'Linha divisória elegante',
    icon: 'Rows3',
    category: 'Layout',
    propertiesSchema: [
      {
        key: 'color',
        label: 'Cor',
        type: 'color-picker',
        defaultValue: '#e5e5e5'
      },
      {
        key: 'thickness',
        label: 'Espessura',
        type: 'number-input',
        defaultValue: 1,
        min: 1,
        max: 10
      },
      {
        key: 'margin',
        label: 'Margem',
        type: 'number-input',
        defaultValue: 16,
        min: 0,
        max: 100
      }
    ]
  },

  // =====================================================================
  // SEÇÃO: COMPONENTES ETAPA 20 - BOXFLEX MODULARES (Categoria: Resultado)
  // =====================================================================
  
  {
    type: 'header-boxflex-inline',
    name: '1. Header BoxFlex',
    description: 'Cabeçalho com logo, nome do funil e status de publicação',
    icon: 'Award',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { key: 'logo', label: 'URL do Logo', type: 'image-url', defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp' },
      { key: 'funnelName', label: 'Nome do Funil', type: 'text-input', defaultValue: 'Quiz Gisele' },
      { key: 'isPublished', label: 'Publicado', type: 'boolean-switch', defaultValue: false }
    ],
  },

  {
    type: 'result-main-boxflex-inline',
    name: '2. Resultado Principal',
    description: 'Card principal com estilo, porcentagem e descrição editáveis',
    icon: 'Target',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { key: 'styleName', label: 'Nome do Estilo', type: 'text-input', defaultValue: 'Natural' },
      { key: 'stylePercentage', label: 'Porcentagem', type: 'text-input', defaultValue: '85' },
      { key: 'description', label: 'Descrição', type: 'textarea', defaultValue: 'Você é autêntica e natural' },
      { key: 'image', label: 'URL da Imagem', type: 'image-url', defaultValue: 'https://dummyimage.com/120x120/aaa/fff.png&text=Estilo' }
    ],
  },

  {
    type: 'secondary-styles-boxflex-inline',
    name: '3. Estilos Secundários',
    description: 'Lista horizontal editável dos estilos secundários',
    icon: 'Layers',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { 
        key: 'secondaryStyles', 
        label: 'Estilos Secundários', 
        type: 'json-editor', 
        defaultValue: [
          { category: 'Moderno', percentage: 10 },
          { category: 'Romântico', percentage: 5 }
        ]
      }
    ],
  },

  {
    type: 'before-after-boxflex-inline',
    name: '4. Antes e Depois',
    description: 'Seção de transformação antes/depois com imagens',
    icon: 'ArrowRightLeft',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { key: 'before', label: 'Texto Antes', type: 'text-input', defaultValue: 'Antes: insegurança' },
      { key: 'after', label: 'Texto Depois', type: 'text-input', defaultValue: 'Depois: confiança' },
      { key: 'beforeImg', label: 'Imagem Antes', type: 'image-url', defaultValue: 'https://dummyimage.com/80x80/eee/333.png&text=Antes' },
      { key: 'afterImg', label: 'Imagem Depois', type: 'image-url', defaultValue: 'https://dummyimage.com/80x80/eee/333.png&text=Depois' }
    ],
  },

  {
    type: 'motivation-boxflex-inline',
    name: '5. Motivação',
    description: 'Seção motivacional editável inline',
    icon: 'Sparkles',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { key: 'motivationText', label: 'Texto Motivacional', type: 'text-input', defaultValue: 'Vista-se de você — na prática' }
    ],
  },

  {
    type: 'bonus-boxflex-inline',
    name: '6. Lista de Bônus',
    description: 'Lista horizontal editável de bônus inclusos',
    icon: 'Gift',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { 
        key: 'bonusList', 
        label: 'Lista de Bônus', 
        type: 'json-editor', 
        defaultValue: [
          'Peças-chave do guarda-roupa',
          'Visagismo facial personalizado'
        ]
      }
    ],
  },

  {
    type: 'testimonials-boxflex-inline',
    name: '7. Depoimentos',
    description: 'Lista horizontal de depoimentos editáveis',
    icon: 'Quote',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { 
        key: 'testimonials', 
        label: 'Lista de Depoimentos', 
        type: 'json-editor', 
        defaultValue: [
          'Adorei! Mudou completamente minha forma de me vestir',
          'Finalmente entendi meu estilo. Recomendo para todas!'
        ]
      }
    ],
  },

  {
    type: 'cta-green-boxflex-inline',
    name: '8. CTA Verde',
    description: 'Call-to-action verde com botão de compra destacado',
    icon: 'ShoppingCart',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { key: 'ctaText', label: 'Texto do CTA', type: 'text-input', defaultValue: 'Quero meu guia agora!' }
    ],
  },

  {
    type: 'guarantee-boxflex-inline',
    name: '9. Garantia',
    description: 'Seção de garantia com ícone e texto editável',
    icon: 'Shield',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { key: 'guaranteeText', label: 'Texto da Garantia', type: 'text-input', defaultValue: '7 dias de garantia incondicional' }
    ],
  },

  {
    type: 'mentor-boxflex-inline',
    name: '10. Mentora',
    description: 'Informações da mentora/especialista',
    icon: 'Users',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { key: 'mentorText', label: 'Texto da Mentora', type: 'text-input', defaultValue: 'Gisele Galvão - Especialista em Imagem' }
    ],
  },

  {
    type: 'value-stack-boxflex-inline',
    name: '11. Value Stack',
    description: 'Pilha de valor com itens, total e oferta especial',
    icon: 'TrendingUp',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { 
        key: 'stackList', 
        label: 'Lista de Itens', 
        type: 'json-editor', 
        defaultValue: [
          'Guia principal - R$67',
          'Peças-chave - R$79', 
          'Visagismo facial - R$29'
        ]
      },
      { key: 'totalValue', label: 'Valor Total', type: 'text-input', defaultValue: 'R$175,00' },
      { key: 'offerValue', label: 'Valor da Oferta', type: 'text-input', defaultValue: 'R$39,00' }
    ],
  },

  {
    type: 'build-info-boxflex-inline',
    name: '12. Build Info',
    description: 'Informações da versão e build do sistema',
    icon: 'Code',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { key: 'buildInfo', label: 'Informações do Build', type: 'text-input', defaultValue: 'v1.0.0 - 2025-01-15' }
    ],
  }
];

export default blockDefinitions;