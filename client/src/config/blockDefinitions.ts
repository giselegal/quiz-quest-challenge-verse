// Tipos para ícones (sem JSX direto no .ts)
export type IconType = 
  | 'type' 
  | 'image' 
  | 'arrow-right' 
  | 'check-circle' 
  | 'target' 
  | 'play' 
  | 'star';

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
  defaultValue?: any;
  options?: PropertyOption[];
  min?: number;
  max?: number;
  rows?: number;
  description?: string;
  itemSchema?: PropertySchema[];
  nestedPath?: string;
}

export interface BlockDefinition {
  id: string;
  type: string;
  name: string;
  description: string;
  icon: string; // Nome do ícone Lucide como string
  category: string;
  tags?: string[]; // Tags opcionais para melhor organização
  isNew?: boolean;
  propertiesSchema?: PropertySchema[];
}

// FASE 1: Blocos simples primeiro
export const blockDefinitions: BlockDefinition[] = [
  // Categoria: Texto (Simples - Implementar primeiro)
  {
    id: 'header',
    type: 'header',
    name: 'Título',
    description: 'Cabeçalho principal da seção.',
    icon: 'Type',
    category: 'Texto',
    propertiesSchema: [
      { 
        key: 'title', 
        label: 'Texto do Título', 
        type: 'text-input', 
        placeholder: 'Seu Título Aqui',
        defaultValue: 'Título Principal' 
      },
      { 
        key: 'subtitle', 
        label: 'Subtítulo', 
        type: 'textarea', 
        placeholder: 'Subtítulo opcional...',
        rows: 2 
      },
      {
        key: 'titleSize',
        label: 'Tamanho do Título',
        type: 'select',
        options: [
          { label: 'Pequeno', value: 'small' },
          { label: 'Médio', value: 'medium' },
          { label: 'Grande', value: 'large' },
        ],
        defaultValue: 'large',
      },
      {
        key: 'alignment',
        label: 'Alinhamento',
        type: 'select',
        options: [
          { label: 'Esquerda', value: 'left' },
          { label: 'Centro', value: 'center' },
          { label: 'Direita', value: 'right' },
        ],
        defaultValue: 'center',
      },
    ],
  },
  
  {
    id: 'text',
    type: 'text',
    name: 'Parágrafo',
    description: 'Bloco de texto simples.',
    icon: 'Type',
    category: 'Texto',
    propertiesSchema: [
      { 
        key: 'content', 
        label: 'Conteúdo', 
        type: 'textarea', 
        placeholder: 'Digite seu texto aqui...',
        rows: 4,
        defaultValue: 'Conteúdo do texto aqui...' 
      },
      {
        key: 'fontSize',
        label: 'Tamanho da Fonte',
        type: 'select',
        options: [
          { label: 'Pequeno', value: 'small' },
          { label: 'Médio', value: 'medium' },
          { label: 'Grande', value: 'large' },
        ],
        defaultValue: 'medium',
      },
      {
        key: 'alignment',
        label: 'Alinhamento',
        type: 'select',
        options: [
          { label: 'Esquerda', value: 'left' },
          { label: 'Centro', value: 'center' },
          { label: 'Direita', value: 'right' },
        ],
        defaultValue: 'left',
      },
    ],
  },

  {
    id: 'image',
    type: 'image',
    name: 'Imagem',
    description: 'Imagem com configurações de tamanho e alinhamento.',
    icon: 'Image',
    category: 'Mídia',
    propertiesSchema: [
      { 
        key: 'src', 
        label: 'URL da Imagem', 
        type: 'image-url', 
        placeholder: 'https://via.placeholder.com/600x400',
        defaultValue: 'https://via.placeholder.com/600x400?text=Imagem' 
      },
      { 
        key: 'alt', 
        label: 'Texto Alternativo', 
        type: 'text-input', 
        placeholder: 'Descrição da imagem',
        defaultValue: 'Imagem' 
      },
      { 
        key: 'width', 
        label: 'Largura', 
        type: 'text-input', 
        placeholder: 'auto, 100%, 300px...',
        defaultValue: 'auto' 
      },
      {
        key: 'alignment',
        label: 'Alinhamento',
        type: 'select',
        options: [
          { label: 'Esquerda', value: 'left' },
          { label: 'Centro', value: 'center' },
          { label: 'Direita', value: 'right' },
        ],
        defaultValue: 'center',
      },
    ],
  },

  {
    id: 'button',
    type: 'button',
    name: 'Botão',
    description: 'Botão de ação personalizável.',
    icon: 'ArrowRight',
    category: 'Interação',
    propertiesSchema: [
      { 
        key: 'text', 
        label: 'Texto do Botão', 
        type: 'text-input', 
        placeholder: 'Clique aqui',
        defaultValue: 'Texto do Botão' 
      },
      {
        key: 'style',
        label: 'Estilo',
        type: 'select',
        options: [
          { label: 'Primário', value: 'primary' },
          { label: 'Secundário', value: 'secondary' },
          { label: 'Destaque', value: 'accent' },
        ],
        defaultValue: 'primary',
      },
      {
        key: 'size',
        label: 'Tamanho',
        type: 'select',
        options: [
          { label: 'Pequeno', value: 'sm' },
          { label: 'Padrão', value: 'default' },
          { label: 'Grande', value: 'lg' },
        ],
        defaultValue: 'default',
      },
      { 
        key: 'fullWidth', 
        label: 'Largura Total', 
        type: 'boolean-switch', 
        defaultValue: false 
      },
    ],
  },

  // Categoria: UI
  {
    id: 'spacer',
    type: 'spacer',
    name: 'Espaçador',
    description: 'Adiciona espaço em branco entre blocos.',
    icon: 'Target',
    category: 'UI',
    propertiesSchema: [
      { 
        key: 'height', 
        label: 'Altura', 
        type: 'text-input', 
        placeholder: '50px, 2rem, etc.',
        defaultValue: '50px' 
      },
    ],
  },

  // FASE 2: Blocos mais complexos (implementar depois)
  {
    id: 'QuizIntroBlock',
    type: 'QuizIntroBlock',
    name: 'Introdução do Quiz',
    description: 'Bloco de introdução completo com coleta de nome.',
    icon: 'Play',
    category: 'Quiz',
    isNew: true,
    propertiesSchema: [
      { 
        key: 'title', 
        label: 'Título', 
        type: 'textarea', 
        placeholder: 'Título principal...',
        rows: 2,
        description: 'Suporta HTML para destaque de cor.' 
      },
      { 
        key: 'subtitle', 
        label: 'Subtítulo', 
        type: 'textarea', 
        placeholder: 'Subtítulo descritivo...',
        rows: 2 
      },
      { 
        key: 'logoUrl', 
        label: 'URL do Logo', 
        type: 'image-url', 
        placeholder: 'https://exemplo.com/logo.png' 
      },
      { 
        key: 'namePlaceholder', 
        label: 'Placeholder do Nome', 
        type: 'text-input', 
        placeholder: 'Digite seu nome aqui...',
        defaultValue: 'Digite seu nome aqui...' 
      },
      { 
        key: 'buttonTextFilled', 
        label: 'Texto do Botão', 
        type: 'text-input', 
        placeholder: 'Começar Quiz!',
        defaultValue: 'Quero Descobrir meu Estilo Agora!' 
      },
      { 
        key: 'required', 
        label: 'Nome Obrigatório', 
        type: 'boolean-switch', 
        defaultValue: true 
      },
      { 
        key: 'primary', 
        label: 'Cor Primária', 
        type: 'color-picker', 
        nestedPath: 'colors.primary', 
        defaultValue: '#B89B7A' 
      },
      { 
        key: 'secondary', 
        label: 'Cor Secundária', 
        type: 'color-picker', 
        nestedPath: 'colors.secondary', 
        defaultValue: '#432818' 
      },
    ],
  },

  // Placeholder para outros blocos complexos
  {
    id: 'question-multiple',
    type: 'question-multiple',
    name: 'Pergunta Múltipla Escolha',
    description: 'Pergunta do quiz com opções múltiplas.',
    icon: 'CheckCircle',
    category: 'Quiz',
    propertiesSchema: [
      { 
        key: 'question', 
        label: 'Pergunta', 
        type: 'textarea', 
        placeholder: 'Qual é a sua pergunta?',
        rows: 2 
      },
      { 
        key: 'required', 
        label: 'Obrigatório', 
        type: 'boolean-switch', 
        defaultValue: true 
      },
      {
        key: 'options',
        label: 'Opções',
        type: 'array-editor',
        itemSchema: [
          { key: 'text', label: 'Texto da Opção', type: 'text-input', placeholder: 'Opção A' },
          { key: 'value', label: 'Valor', type: 'text-input', placeholder: 'a' },
          { key: 'imageUrl', label: 'URL da Imagem (opcional)', type: 'image-url', placeholder: 'https://...' },
        ],
      },
    ],
  },

  // BLOCOS DE RESULTADO
  {
    id: 'result-header',
    type: 'result-header',
    name: 'Cabeçalho de Resultado',
    description: 'Título e descrição do resultado do quiz.',
    icon: 'Star',
    category: 'Resultados',
    propertiesSchema: [
      { 
        key: 'title', 
        label: 'Título do Resultado', 
        type: 'text-input', 
        placeholder: 'Seu resultado: Estilo Clássico',
        defaultValue: 'Seu Resultado' 
      },
      { 
        key: 'subtitle', 
        label: 'Subtítulo', 
        type: 'textarea', 
        placeholder: 'Descrição do estilo...',
        rows: 3 
      },
      { 
        key: 'badgeText', 
        label: 'Texto do Badge', 
        type: 'text-input', 
        placeholder: 'RESULTADO',
        defaultValue: 'SEU ESTILO' 
      },
    ],
  },

  {
    id: 'result-description',
    type: 'result-description',
    name: 'Descrição do Resultado',
    description: 'Texto detalhado sobre o resultado.',
    icon: 'FileText',
    category: 'Resultados',
    propertiesSchema: [
      { 
        key: 'content', 
        label: 'Descrição', 
        type: 'textarea', 
        placeholder: 'Descrição detalhada do resultado...',
        rows: 6,
        defaultValue: 'Baseado nas suas respostas, identificamos que...' 
      },
      {
        key: 'showIcon',
        label: 'Mostrar Ícone',
        type: 'boolean-switch',
        defaultValue: true
      },
    ],
  },

  // BLOCOS DE OFERTA
  {
    id: 'product-offer',
    type: 'product-offer',
    name: 'Oferta de Produto',
    description: 'Card de produto com preço e botão de compra.',
    icon: 'ShoppingCart',
    category: 'Ofertas',
    propertiesSchema: [
      { 
        key: 'productName', 
        label: 'Nome do Produto', 
        type: 'text-input', 
        placeholder: 'Consultoria de Estilo Personalizada',
        defaultValue: 'Produto Incrível' 
      },
      { 
        key: 'productImage', 
        label: 'Imagem do Produto', 
        type: 'image-url', 
        placeholder: 'https://...' 
      },
      { 
        key: 'originalPrice', 
        label: 'Preço Original', 
        type: 'text-input', 
        placeholder: 'R$ 297,00',
        defaultValue: 'R$ 297,00' 
      },
      { 
        key: 'discountPrice', 
        label: 'Preço com Desconto', 
        type: 'text-input', 
        placeholder: 'R$ 197,00',
        defaultValue: 'R$ 197,00' 
      },
      { 
        key: 'buttonText', 
        label: 'Texto do Botão', 
        type: 'text-input', 
        placeholder: 'QUERO AGORA!',
        defaultValue: 'ADQUIRIR AGORA' 
      },
      { 
        key: 'buttonUrl', 
        label: 'URL do Botão', 
        type: 'text-input', 
        placeholder: 'https://checkout.com/...' 
      },
      { 
        key: 'features', 
        label: 'Benefícios', 
        type: 'array-editor',
        itemSchema: [
          { key: 'text', label: 'Benefício', type: 'text-input', placeholder: 'Análise completa do seu estilo' },
        ],
      },
    ],
  },

  {
    id: 'urgency-timer',
    type: 'urgency-timer',
    name: 'Timer de Urgência',
    description: 'Contador regressivo para criar urgência.',
    icon: 'Clock',
    category: 'Ofertas',
    propertiesSchema: [
      { 
        key: 'title', 
        label: 'Título', 
        type: 'text-input', 
        placeholder: 'Oferta por tempo limitado!',
        defaultValue: 'Oferta Expira em:' 
      },
      { 
        key: 'duration', 
        label: 'Duração (minutos)', 
        type: 'number-input', 
        defaultValue: 15,
        min: 1,
        max: 60 
      },
      {
        key: 'showExpiredMessage',
        label: 'Mostrar Mensagem ao Expirar',
        type: 'boolean-switch',
        defaultValue: true
      },
      { 
        key: 'expiredMessage', 
        label: 'Mensagem de Expiração', 
        type: 'text-input', 
        placeholder: 'Oferta expirada! Entre em contato.',
        defaultValue: 'Essa oferta especial expirou.' 
      },
    ],
  },

  // BLOCOS DE DEPOIMENTOS
  {
    id: 'testimonials',
    type: 'testimonials',
    name: 'Depoimentos',
    description: 'Carousel de depoimentos de clientes.',
    icon: 'MessageSquare',
    category: 'Credibilidade',
    propertiesSchema: [
      { 
        key: 'title', 
        label: 'Título da Seção', 
        type: 'text-input', 
        placeholder: 'O que nossos clientes dizem',
        defaultValue: 'Depoimentos' 
      },
      {
        key: 'testimonials',
        label: 'Depoimentos',
        type: 'array-editor',
        itemSchema: [
          { key: 'name', label: 'Nome', type: 'text-input', placeholder: 'Maria Silva' },
          { key: 'role', label: 'Profissão/Cargo', type: 'text-input', placeholder: 'Empresária' },
          { key: 'avatar', label: 'Foto', type: 'image-url', placeholder: 'https://...' },
          { key: 'text', label: 'Depoimento', type: 'textarea', placeholder: 'Excelente serviço...', rows: 3 },
          { key: 'rating', label: 'Avaliação (1-5)', type: 'number-input', min: 1, max: 5, defaultValue: 5 },
        ],
      },
      {
        key: 'autoplay',
        label: 'Autoplay',
        type: 'boolean-switch',
        defaultValue: true
      },
    ],
  },

  // BLOCOS DE FAQ
  {
    id: 'faq-section',
    type: 'faq-section',
    name: 'Perguntas Frequentes',
    description: 'Seção de FAQ com perguntas e respostas.',
    icon: 'HelpCircle',
    category: 'Credibilidade',
    propertiesSchema: [
      { 
        key: 'title', 
        label: 'Título da Seção', 
        type: 'text-input', 
        placeholder: 'Perguntas Frequentes',
        defaultValue: 'Dúvidas Frequentes' 
      },
      {
        key: 'faqs',
        label: 'Perguntas e Respostas',
        type: 'array-editor',
        itemSchema: [
          { key: 'question', label: 'Pergunta', type: 'text-input', placeholder: 'Como funciona?' },
          { key: 'answer', label: 'Resposta', type: 'textarea', placeholder: 'Resposta detalhada...', rows: 3 },
        ],
      },
      {
        key: 'allowMultiple',
        label: 'Permitir Múltiplas Abertas',
        type: 'boolean-switch',
        defaultValue: false
      },
    ],
  },

  // BLOCOS DE GARANTIA
  {
    id: 'guarantee',
    type: 'guarantee',
    name: 'Garantia',
    description: 'Selo de garantia para transmitir confiança.',
    icon: 'Shield',
    category: 'Credibilidade',
    propertiesSchema: [
      { 
        key: 'title', 
        label: 'Título', 
        type: 'text-input', 
        placeholder: 'Garantia de 30 dias',
        defaultValue: 'Garantia Incondicional' 
      },
      { 
        key: 'description', 
        label: 'Descrição', 
        type: 'textarea', 
        placeholder: 'Se não ficar satisfeito...',
        rows: 3,
        defaultValue: 'Satisfação garantida ou seu dinheiro de volta.' 
      },
      { 
        key: 'badgeImage', 
        label: 'Imagem do Selo', 
        type: 'image-url', 
        placeholder: 'https://...' 
      },
      { 
        key: 'period', 
        label: 'Período (dias)', 
        type: 'number-input', 
        defaultValue: 30,
        min: 1,
        max: 365 
      },
    ],
  },

  // BLOCOS DE VÍDEO
  {
    id: 'video-player',
    type: 'video-player',
    name: 'Player de Vídeo',
    description: 'Incorporação de vídeo YouTube/Vimeo.',
    icon: 'Video',
    category: 'Mídia',
    propertiesSchema: [
      { 
        key: 'videoUrl', 
        label: 'URL do Vídeo', 
        type: 'video-url', 
        placeholder: 'https://youtube.com/watch?v=...' 
      },
      { 
        key: 'poster', 
        label: 'Imagem de Capa', 
        type: 'image-url', 
        placeholder: 'https://...' 
      },
      { 
        key: 'autoplay', 
        label: 'Autoplay', 
        type: 'boolean-switch', 
        defaultValue: false 
      },
      { 
        key: 'controls', 
        label: 'Mostrar Controles', 
        type: 'boolean-switch', 
        defaultValue: true 
      },
    ],
  },

  // CATEGORIA: QUIZ ESPECÍFICO - Schemas dos componentes principais do quiz
  
  // Quiz Intro - Tela inicial do quiz
  {
    id: 'quiz-intro',
    type: 'quiz-intro',
    name: 'Quiz Introdução',
    description: 'Tela inicial do quiz com captura de nome e call-to-action',
    icon: 'target',
    category: 'quiz',
    tags: ['quiz', 'intro', 'landing'],
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título Principal',
        type: 'text-input',
        placeholder: 'Ex: Descubra Seu Estilo Pessoal',
        defaultValue: 'Descubra Seu Estilo Pessoal'
      },
      {
        key: 'subtitle',
        label: 'Subtítulo',
        type: 'textarea',
        placeholder: 'Descrição motivacional do quiz',
        defaultValue: 'Um quiz personalizado para descobrir seu estilo único',
        rows: 3
      },
      {
        key: 'description',
        label: 'Descrição Detalhada',
        type: 'textarea',
        placeholder: 'Texto explicativo adicional',
        defaultValue: 'Responda algumas perguntas e descubra o estilo que combina perfeitamente com você.',
        rows: 4
      },
      {
        key: 'inputPlaceholder',
        label: 'Placeholder do Campo Nome',
        type: 'text-input',
        defaultValue: 'Digite seu primeiro nome'
      },
      {
        key: 'buttonText',
        label: 'Texto do Botão',
        type: 'text-input',
        defaultValue: 'Iniciar Quiz'
      },
      {
        key: 'backgroundColor',
        label: 'Cor de Fundo',
        type: 'color-picker',
        defaultValue: '#fffaf7' // brand-cream
      },
      {
        key: 'textColor',
        label: 'Cor do Texto',
        type: 'color-picker',
        defaultValue: '#432818' // brand-coffee
      },
      {
        key: 'backgroundImage',
        label: 'Imagem de Fundo',
        type: 'image-url',
        description: 'URL da imagem de fundo (opcional)'
      },
      {
        key: 'showBenefits',
        label: 'Mostrar Benefícios',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'benefits',
        label: 'Lista de Benefícios',
        type: 'array-editor',
        defaultValue: [
          'Descubra seu estilo único',
          'Recomendações personalizadas',
          'Resultado instantâneo'
        ],
        itemSchema: [
          { key: 'text', label: 'Benefício', type: 'text-input' }
        ]
      }
    ]
  },

  // Quiz Question - Pergunta do quiz com opções
  {
    id: 'quiz-question',
    type: 'quiz-question',
    name: 'Questão do Quiz',
    description: 'Pergunta com opções de múltipla escolha',
    icon: 'help-circle',
    category: 'quiz',
    tags: ['quiz', 'question', 'multiple-choice'],
    propertiesSchema: [
      {
        key: 'questionId',
        label: 'ID da Questão',
        type: 'text-input',
        description: 'Identificador único da questão',
        defaultValue: 'question-1'
      },
      {
        key: 'title',
        label: 'Pergunta',
        type: 'textarea',
        placeholder: 'Ex: Qual seu estilo preferido?',
        defaultValue: 'Qual dessas opções mais combina com você?',
        rows: 3
      },
      {
        key: 'description',
        label: 'Descrição/Contexto',
        type: 'textarea',
        placeholder: 'Contexto adicional da pergunta (opcional)',
        rows: 2
      },
      {
        key: 'questionType',
        label: 'Tipo de Exibição',
        type: 'select',
        defaultValue: 'both',
        options: [
          { label: 'Texto e Imagem', value: 'both' },
          { label: 'Apenas Texto', value: 'text' },
          { label: 'Apenas Imagem', value: 'image' }
        ]
      },
      {
        key: 'maxSelections',
        label: 'Máximo de Seleções',
        type: 'number-input',
        min: 1,
        max: 8,
        defaultValue: 3,
        description: 'Questões normais: 3 obrigatórias | Estratégicas: 1'
      },
      {
        key: 'isStrategicQuestion',
        label: 'É Questão Estratégica?',
        type: 'boolean-switch',
        defaultValue: false,
        description: 'Estratégicas não pontuam e não têm auto-avanço'
      },
      {
        key: 'autoAdvance',
        label: 'Auto-avanço',
        type: 'boolean-switch',
        defaultValue: true,
        description: 'Para questões normais: avança automaticamente após 3ª seleção'
      },
      {
        key: 'required',
        label: 'Resposta Obrigatória',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'maxSelections',
        label: 'Máximo de Seleções',
        type: 'number-input',
        min: 1,
        max: 8,
        defaultValue: 3,
        description: 'Número máximo de opções que podem ser selecionadas'
      },
      {
        key: 'options',
        label: 'Opções de Resposta',
        type: 'array-editor',
        defaultValue: [
          {
            id: 'natural',
            text: 'Natural',
            imageUrl: '',
            styleCategory: 'natural',
            description: 'Descrição da opção',
            points: 1
          },
          {
            id: 'classico',
            text: 'Clássico', 
            imageUrl: '',
            styleCategory: 'classico',
            description: 'Descrição da opção',
            points: 1
          },
          {
            id: 'contemporaneo',
            text: 'Contemporâneo',
            imageUrl: '',
            styleCategory: 'contemporaneo', 
            description: 'Descrição da opção',
            points: 1
          },
          {
            id: 'elegante',
            text: 'Elegante',
            imageUrl: '',
            styleCategory: 'elegante',
            description: 'Descrição da opção', 
            points: 1
          },
          {
            id: 'romantico',
            text: 'Romântico',
            imageUrl: '',
            styleCategory: 'romantico',
            description: 'Descrição da opção',
            points: 1
          },
          {
            id: 'sexy',
            text: 'Sexy',
            imageUrl: '',
            styleCategory: 'sexy',
            description: 'Descrição da opção',
            points: 1
          },
          {
            id: 'dramatico',
            text: 'Dramático',
            imageUrl: '',
            styleCategory: 'dramatico',
            description: 'Descrição da opção',
            points: 1
          },
          {
            id: 'criativo',
            text: 'Criativo',
            imageUrl: '',
            styleCategory: 'criativo',
            description: 'Descrição da opção',
            points: 1
          }
        ],
        itemSchema: [
          { key: 'id', label: 'ID', type: 'text-input' },
          { key: 'text', label: 'Texto', type: 'text-input' },
          { key: 'description', label: 'Descrição', type: 'textarea' },
          { key: 'imageUrl', label: 'URL da Imagem', type: 'image-url' },
          { key: 'styleCategory', label: 'Categoria de Estilo', type: 'select', options: [
            { label: 'Natural', value: 'natural' },
            { label: 'Clássico', value: 'classico' },
            { label: 'Contemporâneo', value: 'contemporaneo' },
            { label: 'Elegante', value: 'elegante' },
            { label: 'Romântico', value: 'romantico' },
            { label: 'Sexy', value: 'sexy' },
            { label: 'Dramático', value: 'dramatico' },
            { label: 'Criativo', value: 'criativo' }
          ]},
          { key: 'points', label: 'Pontuação', type: 'number-input' }
        ]
      },
      {
        key: 'showProgress',
        label: 'Mostrar Progresso',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'progressPercent',
        label: 'Porcentagem do Progresso',
        type: 'number-input',
        min: 0,
        max: 100,
        defaultValue: 10
      }
    ]
  },

  // Strategic Question - Questão estratégica/demográfica
  {
    id: 'strategic-question',
    type: 'strategic-question',
    name: 'Questão Estratégica',
    description: 'Pergunta para captura de dados demográficos/estratégicos',
    icon: 'brain',
    category: 'quiz',
    tags: ['quiz', 'strategic', 'demographics'],
    propertiesSchema: [
      {
        key: 'questionId',
        label: 'ID da Questão',
        type: 'text-input',
        defaultValue: 'strategic-1'
      },
      {
        key: 'title',
        label: 'Pergunta',
        type: 'textarea',
        placeholder: 'Ex: Qual sua faixa etária?',
        defaultValue: 'Para personalizar ainda mais, qual sua faixa etária?',
        rows: 3
      },
      {
        key: 'purpose',
        label: 'Propósito',
        type: 'select',
        defaultValue: 'demographic',
        options: [
          { label: 'Dados Demográficos', value: 'demographic' },
          { label: 'Preferências', value: 'preference' },
          { label: 'Comportamento', value: 'behavior' },
          { label: 'Segmentação', value: 'segmentation' }
        ]
      },
      {
        key: 'options',
        label: 'Opções de Resposta',
        type: 'array-editor',
        defaultValue: [
          { id: 'option-1', text: '18-25 anos', category: 'young' },
          { id: 'option-2', text: '26-35 anos', category: 'adult' },
          { id: 'option-3', text: '36-45 anos', category: 'mature' },
          { id: 'option-4', text: '46+ anos', category: 'senior' }
        ],
        itemSchema: [
          { key: 'id', label: 'ID', type: 'text-input' },
          { key: 'text', label: 'Texto', type: 'text-input' },
          { key: 'category', label: 'Categoria', type: 'text-input' }
        ]
      },
      {
        key: 'progressPercent',
        label: 'Porcentagem do Progresso',
        type: 'number-input',
        min: 0,
        max: 100,
        defaultValue: 75
      }
    ]
  },

  // Quiz Transition - Página de transição/loading
  {
    id: 'quiz-transition',
    type: 'quiz-transition',
    name: 'Transição do Quiz',
    description: 'Página de loading/transição entre etapas',
    icon: 'loader',
    category: 'quiz',
    tags: ['quiz', 'transition', 'loading'],
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Analisando suas respostas...'
      },
      {
        key: 'subtitle',
        label: 'Subtítulo',
        type: 'text-input',
        defaultValue: 'Aguarde enquanto calculamos seu resultado'
      },
      {
        key: 'loadingTexts',
        label: 'Textos de Loading',
        type: 'array-editor',
        defaultValue: [
          'Analisando suas preferências...',
          'Calculando compatibilidade...',
          'Preparando resultado personalizado...'
        ],
        itemSchema: [
          { key: 'text', label: 'Texto', type: 'text-input' }
        ]
      },
      {
        key: 'duration',
        label: 'Duração (segundos)',
        type: 'number-input',
        min: 2,
        max: 10,
        defaultValue: 5
      },
      {
        key: 'animationType',
        label: 'Tipo de Animação',
        type: 'select',
        defaultValue: 'spinner',
        options: [
          { label: 'Spinner', value: 'spinner' },
          { label: 'Progress Bar', value: 'progress' },
          { label: 'Dots', value: 'dots' },
          { label: 'Fade', value: 'fade' }
        ]
      },
      {
        key: 'backgroundColor',
        label: 'Cor de Fundo',
        type: 'color-picker',
        defaultValue: '#f8f9fa'
      }
    ]
  },

  // Quiz Progress Bar - Barra de progresso
  {
    id: 'quiz-progress',
    type: 'quiz-progress',
    name: 'Barra de Progresso',
    description: 'Indicador visual do progresso do quiz',
    icon: 'progress',
    category: 'quiz',
    tags: ['quiz', 'progress', 'ui'],
    propertiesSchema: [
      {
        key: 'showPercentage',
        label: 'Mostrar Porcentagem',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'showSteps',
        label: 'Mostrar Etapas',
        type: 'boolean-switch',
        defaultValue: false
      },
      {
        key: 'progressColor',
        label: 'Cor do Progresso',
        type: 'color-picker',
        defaultValue: '#10b981'
      },
      {
        key: 'backgroundColor',
        label: 'Cor de Fundo',
        type: 'color-picker',
        defaultValue: '#e5e7eb'
      },
      {
        key: 'height',
        label: 'Altura (px)',
        type: 'number-input',
        min: 2,
        max: 20,
        defaultValue: 6
      },
      {
        key: 'position',
        label: 'Posição',
        type: 'select',
        defaultValue: 'top',
        options: [
          { label: 'Topo', value: 'top' },
          { label: 'Baixo', value: 'bottom' },
          { label: 'Inline', value: 'inline' }
        ]
      }
    ]
  },

  // CATEGORIA: RESULTADO - Schemas para página de resultado personalizada

  // Result Header - Cabeçalho da página de resultado
  {
    id: 'result-header',
    type: 'result-header',
    name: 'Cabeçalho do Resultado',
    description: 'Cabeçalho principal da página de resultado',
    icon: 'crown',
    category: 'result',
    tags: ['result', 'header', 'style'],
    propertiesSchema: [
      {
        key: 'userName',
        label: 'Nome do Usuário',
        type: 'text-input',
        defaultValue: '{{userName}}',
        description: 'Use {{userName}} para substituição dinâmica'
      },
      {
        key: 'styleResult',
        label: 'Resultado do Estilo',
        type: 'text-input',
        defaultValue: '{{calculatedStyle}}',
        description: 'Use {{calculatedStyle}} para resultado dinâmico'
      },
      {
        key: 'title',
        label: 'Título Personalizado',
        type: 'textarea',
        defaultValue: 'Parabéns, {{userName}}! Seu estilo é {{calculatedStyle}}',
        rows: 2
      },
      {
        key: 'subtitle',
        label: 'Subtítulo',
        type: 'textarea',
        defaultValue: 'Baseado nas suas respostas, identificamos o estilo que mais combina com você.',
        rows: 3
      },
      {
        key: 'showStyleImage',
        label: 'Mostrar Imagem do Estilo',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'styleImages',
        label: 'Imagens por Estilo',
        type: 'json-editor',
        defaultValue: {
          'casual': '/images/styles/casual.jpg',
          'elegante': '/images/styles/elegante.jpg',
          'boho': '/images/styles/boho.jpg',
          'moderno': '/images/styles/moderno.jpg'
        }
      },
      {
        key: 'backgroundColor',
        label: 'Cor de Fundo',
        type: 'color-picker',
        defaultValue: '#ffffff'
      }
    ]
  },

  // Result Card - Card com detalhes do resultado
  {
    id: 'result-card',
    type: 'result-card',
    name: 'Card do Resultado',
    description: 'Card detalhado com características do estilo',
    icon: 'card',
    category: 'result',
    tags: ['result', 'card', 'details'],
    propertiesSchema: [
      {
        key: 'showCharacteristics',
        label: 'Mostrar Características',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'characteristics',
        label: 'Características por Estilo',
        type: 'json-editor',
        defaultValue: {
          'casual': ['Confortável', 'Prático', 'Versátil'],
          'elegante': ['Sofisticado', 'Clássico', 'Refinado'],
          'boho': ['Livre', 'Criativo', 'Natural'],
          'moderno': ['Minimalista', 'Clean', 'Contemporâneo']
        }
      },
      {
        key: 'showRecommendations',
        label: 'Mostrar Recomendações',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'recommendations',
        label: 'Recomendações por Estilo',
        type: 'json-editor',
        defaultValue: {
          'casual': ['Jeans confortável', 'Camisetas básicas', 'Tênis'],
          'elegante': ['Blazer estruturado', 'Calças sociais', 'Sapatos de couro'],
          'boho': ['Vestidos fluidos', 'Acessórios naturais', 'Sandálias'],
          'moderno': ['Peças geométricas', 'Cores neutras', 'Linhas clean']
        }
      }
    ]
  },

  // Secondary Styles - Estilos secundários compatíveis
  {
    id: 'secondary-styles',
    type: 'secondary-styles',
    name: 'Estilos Secundários',
    description: 'Outros estilos compatíveis com o usuário',
    icon: 'layers',
    category: 'result',
    tags: ['result', 'secondary', 'compatibility'],
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título da Seção',
        type: 'text-input',
        defaultValue: 'Outros estilos que combinam com você'
      },
      {
        key: 'showCompatibilityScore',
        label: 'Mostrar Score de Compatibilidade',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'maxSecondaryStyles',
        label: 'Máximo de Estilos Secundários',
        type: 'number-input',
        min: 1,
        max: 5,
        defaultValue: 3
      },
      {
        key: 'layoutType',
        label: 'Layout',
        type: 'select',
        defaultValue: 'grid',
        options: [
          { label: 'Grade', value: 'grid' },
          { label: 'Lista', value: 'list' },
          { label: 'Carrossel', value: 'carousel' }
        ]
      }
    ]
  },

  // Before After - Transformação antes/depois
  {
    id: 'before-after',
    type: 'before-after',
    name: 'Antes e Depois',
    description: 'Seção de transformação visual',
    icon: 'refresh',
    category: 'result',
    tags: ['result', 'transformation', 'visual'],
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Veja sua transformação'
      },
      {
        key: 'beforeTitle',
        label: 'Título "Antes"',
        type: 'text-input',
        defaultValue: 'Antes'
      },
      {
        key: 'afterTitle',
        label: 'Título "Depois"',
        type: 'text-input',
        defaultValue: 'Depois'
      },
      {
        key: 'beforeImages',
        label: 'Imagens "Antes"',
        type: 'array-editor',
        defaultValue: ['/images/before/example1.jpg'],
        itemSchema: [
          { key: 'url', label: 'URL da Imagem', type: 'image-url' },
          { key: 'alt', label: 'Texto Alternativo', type: 'text-input' }
        ]
      },
      {
        key: 'afterImages',
        label: 'Imagens "Depois"',
        type: 'array-editor',
        defaultValue: ['/images/after/example1.jpg'],
        itemSchema: [
          { key: 'url', label: 'URL da Imagem', type: 'image-url' },
          { key: 'alt', label: 'Texto Alternativo', type: 'text-input' }
        ]
      },
      {
        key: 'animationType',
        label: 'Tipo de Animação',
        type: 'select',
        defaultValue: 'slide',
        options: [
          { label: 'Deslizar', value: 'slide' },
          { label: 'Fade', value: 'fade' },
          { label: 'Flip', value: 'flip' },
          { label: 'Sem Animação', value: 'none' }
        ]
      }
    ]
  },

  // Motivation Section - Seção motivacional
  {
    id: 'motivation-section',
    type: 'motivation-section',
    name: 'Seção Motivacional',
    description: 'Texto motivacional personalizado baseado no resultado',
    icon: 'heart',
    category: 'result',
    tags: ['result', 'motivation', 'personalized'],
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Sua jornada de transformação começa agora'
      },
      {
        key: 'motivationTexts',
        label: 'Textos Motivacionais por Estilo',
        type: 'json-editor',
        defaultValue: {
          'casual': 'Seu estilo casual reflete sua autenticidade e praticidade. Continue investindo em peças que te fazem sentir confiante!',
          'elegante': 'Sua elegância natural merece ser valorizada. Invista em peças atemporais que realcem sua sofisticação.',
          'boho': 'Sua alma livre e criativa brilha através do seu estilo. Continue explorando sua individualidade!',
          'moderno': 'Seu olhar contemporâneo está sempre um passo à frente. Continue inovando com seu estilo único!'
        }
      },
      {
        key: 'showCallToAction',
        label: 'Mostrar Call-to-Action',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'ctaText',
        label: 'Texto do CTA',
        type: 'text-input',
        defaultValue: 'Descubra como potencializar seu estilo'
      },
      {
        key: 'ctaButtonText',
        label: 'Texto do Botão CTA',
        type: 'text-input',
        defaultValue: 'Ver Recomendações Personalizadas'
      }
    ]
  },

  // CATEGORIA: VENDAS - Schemas para página de vendas e conversão

  // Sales Offer - Oferta principal de vendas
  {
    id: 'sales-offer',
    type: 'sales-offer',
    name: 'Oferta de Vendas',
    description: 'Apresentação da oferta principal com preços',
    icon: 'shopping-cart',
    category: 'sales',
    tags: ['sales', 'offer', 'pricing'],
    propertiesSchema: [
      {
        key: 'productName',
        label: 'Nome do Produto/Serviço',
        type: 'text-input',
        defaultValue: 'Consultoria de Estilo Personalizada'
      },
      {
        key: 'headline',
        label: 'Título Principal',
        type: 'textarea',
        defaultValue: 'Transforme seu guarda-roupa com consultoria personalizada',
        rows: 2
      },
      {
        key: 'description',
        label: 'Descrição da Oferta',
        type: 'textarea',
        defaultValue: 'Receba um plano completo e personalizado para potencializar seu estilo único',
        rows: 4
      },
      {
        key: 'originalPrice',
        label: 'Preço Original',
        type: 'number-input',
        defaultValue: 497
      },
      {
        key: 'currentPrice',
        label: 'Preço Promocional',
        type: 'number-input',
        defaultValue: 197
      },
      {
        key: 'currency',
        label: 'Moeda',
        type: 'text-input',
        defaultValue: 'R$'
      },
      {
        key: 'showDiscount',
        label: 'Mostrar % de Desconto',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'features',
        label: 'Características/Benefícios',
        type: 'array-editor',
        defaultValue: [
          'Análise completa do seu estilo',
          'Cartela de cores personalizada',
          'Guia de compras direcionado',
          'Suporte por 30 dias'
        ],
        itemSchema: [
          { key: 'text', label: 'Benefício', type: 'text-input' },
          { key: 'highlight', label: 'Destacar', type: 'boolean-switch' }
        ]
      },
      {
        key: 'ctaText',
        label: 'Texto do Botão',
        type: 'text-input',
        defaultValue: 'Quero Transformar Meu Estilo Agora'
      },
      {
        key: 'urgencyText',
        label: 'Texto de Urgência',
        type: 'text-input',
        defaultValue: 'Oferta limitada por tempo!'
      }
    ]
  },

  // Value Stack - Pilha de valor
  {
    id: 'value-stack',
    type: 'value-stack',
    name: 'Pilha de Valor',
    description: 'Demonstração do valor total da oferta',
    icon: 'stack',
    category: 'sales',
    tags: ['sales', 'value', 'pricing'],
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título da Seção',
        type: 'text-input',
        defaultValue: 'O que você vai receber:'
      },
      {
        key: 'items',
        label: 'Itens de Valor',
        type: 'array-editor',
        defaultValue: [
          {
            name: 'Consultoria Individual',
            description: 'Sessão personalizada de 2h',
            value: 300,
            isBonus: false
          },
          {
            name: 'Cartela de Cores',
            description: 'Guia exclusivo com suas cores',
            value: 150,
            isBonus: false
          },
          {
            name: 'Guia de Compras',
            description: 'Lista personalizada de itens',
            value: 97,
            isBonus: true
          }
        ],
        itemSchema: [
          { key: 'name', label: 'Nome do Item', type: 'text-input' },
          { key: 'description', label: 'Descrição', type: 'textarea' },
          { key: 'value', label: 'Valor (R$)', type: 'number-input' },
          { key: 'isBonus', label: 'É Bônus?', type: 'boolean-switch' }
        ]
      },
      {
        key: 'totalValue',
        label: 'Valor Total',
        type: 'number-input',
        defaultValue: 547
      },
      {
        key: 'finalPrice',
        label: 'Preço Final',
        type: 'number-input',
        defaultValue: 197
      },
      {
        key: 'showSavings',
        label: 'Mostrar Economia',
        type: 'boolean-switch',
        defaultValue: true
      }
    ]
  },

  // Testimonials Grid - Grade de depoimentos
  {
    id: 'testimonials-grid',
    type: 'testimonials-grid',
    name: 'Grade de Depoimentos',
    description: 'Seção com múltiplos depoimentos de clientes',
    icon: 'users',
    category: 'sales',
    tags: ['sales', 'social-proof', 'testimonials'],
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título da Seção',
        type: 'text-input',
        defaultValue: 'O que nossos clientes dizem'
      },
      {
        key: 'testimonials',
        label: 'Depoimentos',
        type: 'array-editor',
        defaultValue: [
          {
            name: 'Maria Silva',
            text: 'A consultoria mudou completamente minha relação com a moda!',
            rating: 5,
            image: '/images/testimonials/maria.jpg',
            occupation: 'Empresária'
          }
        ],
        itemSchema: [
          { key: 'name', label: 'Nome', type: 'text-input' },
          { key: 'text', label: 'Depoimento', type: 'textarea' },
          { key: 'rating', label: 'Avaliação (1-5)', type: 'number-input', min: 1, max: 5 },
          { key: 'image', label: 'Foto', type: 'image-url' },
          { key: 'occupation', label: 'Profissão', type: 'text-input' }
        ]
      },
      {
        key: 'layout',
        label: 'Layout',
        type: 'select',
        defaultValue: 'grid',
        options: [
          { label: 'Grade 2x2', value: 'grid' },
          { label: 'Carrossel', value: 'carousel' },
          { label: 'Lista Vertical', value: 'list' }
        ]
      },
      {
        key: 'showRating',
        label: 'Mostrar Avaliações',
        type: 'boolean-switch',
        defaultValue: true
      }
    ]
  },

  // Guarantee Section - Seção de garantia
  {
    id: 'guarantee-section',
    type: 'guarantee-section',
    name: 'Seção de Garantia',
    description: 'Garantia para reduzir resistência à compra',
    icon: 'shield',
    category: 'sales',
    tags: ['sales', 'guarantee', 'trust'],
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Garantia de 30 dias'
      },
      {
        key: 'guaranteeText',
        label: 'Texto da Garantia',
        type: 'textarea',
        defaultValue: 'Se você não ficar 100% satisfeita com sua transformação, devolvemos seu dinheiro.',
        rows: 3
      },
      {
        key: 'guaranteePeriod',
        label: 'Período de Garantia',
        type: 'text-input',
        defaultValue: '30 dias'
      },
      {
        key: 'guaranteeIcon',
        label: 'Ícone da Garantia',
        type: 'image-url',
        description: 'URL do ícone/selo de garantia'
      },
      {
        key: 'showMoney backBadge',
        label: 'Mostrar Selo "Dinheiro de Volta"',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'additionalInfo',
        label: 'Informações Adicionais',
        type: 'textarea',
        placeholder: 'Termos e condições adicionais',
        rows: 2
      }
    ]
  },

  // Urgency Timer - Timer de urgência
  {
    id: 'urgency-timer',
    type: 'urgency-timer',
    name: 'Timer de Urgência',
    description: 'Contador regressivo para criar urgência',
    icon: 'clock',
    category: 'sales',
    tags: ['sales', 'urgency', 'conversion'],
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Oferta expira em:'
      },
      {
        key: 'timerType',
        label: 'Tipo de Timer',
        type: 'select',
        defaultValue: 'fixed',
        options: [
          { label: 'Tempo Fixo', value: 'fixed' },
          { label: 'Evergreen (por usuário)', value: 'evergreen' },
          { label: 'Data Específica', value: 'specific' }
        ]
      },
      {
        key: 'duration',
        label: 'Duração (minutos)',
        type: 'number-input',
        defaultValue: 30,
        description: 'Para timer evergreen'
      },
      {
        key: 'endDate',
        label: 'Data de Fim',
        type: 'text-input',
        placeholder: 'YYYY-MM-DD HH:MM',
        description: 'Para timer de data específica'
      },
      {
        key: 'expiredText',
        label: 'Texto Quando Expira',
        type: 'text-input',
        defaultValue: 'Oferta Expirada'
      },
      {
        key: 'showLabels',
        label: 'Mostrar Labels (dias, horas, etc)',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'style',
        label: 'Estilo Visual',
        type: 'select',
        defaultValue: 'digital',
        options: [
          { label: 'Digital', value: 'digital' },
          { label: 'Flip Cards', value: 'flip' },
          { label: 'Circular', value: 'circular' }
        ]
      }
    ]
  },

  // Bonus Section - Seção de bônus
  {
    id: 'bonus-section',
    type: 'bonus-section',
    name: 'Seção de Bônus',
    description: 'Bônus adicionais para aumentar o valor percebido',
    icon: 'gift',
    category: 'sales',
    tags: ['sales', 'bonus', 'value'],
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Bônus Exclusivos'
      },
      {
        key: 'subtitle',
        label: 'Subtítulo',
        type: 'text-input',
        defaultValue: 'Além da consultoria, você também recebe:'
      },
      {
        key: 'bonuses',
        label: 'Lista de Bônus',
        type: 'array-editor',
        defaultValue: [
          {
            name: 'Guia de Maquiagem',
            description: 'Técnicas para valorizar seu estilo',
            value: 97,
            image: '/images/bonus/makeup.jpg'
          }
        ],
        itemSchema: [
          { key: 'name', label: 'Nome do Bônus', type: 'text-input' },
          { key: 'description', label: 'Descrição', type: 'textarea' },
          { key: 'value', label: 'Valor (R$)', type: 'number-input' },
          { key: 'image', label: 'Imagem', type: 'image-url' }
        ]
      },
      {
        key: 'showValues',
        label: 'Mostrar Valores dos Bônus',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'layoutStyle',
        label: 'Estilo do Layout',
        type: 'select',
        defaultValue: 'cards',
        options: [
          { label: 'Cards', value: 'cards' },
          { label: 'Lista', value: 'list' },
          { label: 'Grid', value: 'grid' }
        ]
      }
    ]
  },

  // Novos blocos adicionais
  {
    id: 'alert',
    type: 'alert',
    name: 'Alerta',
    description: 'Caixa de mensagem de alerta com diferentes variantes.',
    icon: 'TriangleAlert',
    category: 'UI',
    propertiesSchema: [
      { key: 'title', label: 'Título do Alerta', type: 'text-input', placeholder: 'Atenção!' },
      { key: 'message', label: 'Mensagem do Alerta', type: 'textarea', placeholder: 'Esta é uma mensagem importante.', rows: 2 },
      {
        key: 'variant',
        label: 'Variante',
        type: 'select',
        options: [
          { label: 'Info (Azul)', value: 'info' },
          { label: 'Sucesso (Verde)', value: 'success' },
          { label: 'Aviso (Amarelo)', value: 'warning' },
          { label: 'Erro (Vermelho)', value: 'error' },
        ],
        defaultValue: 'info',
      },
    ],
  },

  {
    id: 'arguments',
    type: 'arguments',
    name: 'Argumentos',
    description: 'Lista de argumentos ou benefícios com ícones.',
    icon: 'Book',
    category: 'Social',
    propertiesSchema: [
      { key: 'title', label: 'Título', type: 'text-input', placeholder: 'Por que escolher nosso produto?' },
      {
        key: 'items',
        label: 'Lista de Argumentos',
        type: 'array-editor',
        itemSchema: [
          { key: 'text', label: 'Texto do Argumento', type: 'text-input', placeholder: 'Qualidade superior' },
          { key: 'icon', label: 'Ícone (Lucide ou Emoji)', type: 'text-input', placeholder: 'CheckCircle ou ✅' },
        ],
        description: 'Adicione cada argumento com seu texto e um ícone (nome Lucide React ou emoji).'
      },
    ],
  },

  {
    id: 'audio',
    type: 'audio',
    name: 'Áudio',
    description: 'Player de áudio.',
    icon: 'Mic',
    category: 'Mídia',
    propertiesSchema: [
      { key: 'audioUrl', label: 'URL do Áudio', type: 'video-url', placeholder: 'https://example.com/audio.mp3', description: 'Insira a URL direta para o arquivo de áudio (.mp3, .wav, etc.).' },
      { key: 'autoplay', label: 'Autoplay', type: 'boolean-switch', defaultValue: false },
      { key: 'controls', label: 'Mostrar Controles', type: 'boolean-switch', defaultValue: true },
    ],
  },

  {
    id: 'carousel',
    type: 'carousel',
    name: 'Carrossel',
    description: 'Galeria de imagens deslizante.',
    icon: 'GalleryHorizontalEnd',
    category: 'Mídia',
    propertiesSchema: [
      {
        key: 'images',
        label: 'Imagens do Carrossel',
        type: 'array-editor',
        itemSchema: [
          { key: 'src', label: 'URL da Imagem', type: 'image-url', placeholder: 'https://example.com/img1.jpg' },
          { key: 'alt', label: 'Texto Alternativo', type: 'text-input', placeholder: 'Imagem do carrossel' },
        ],
        description: 'Adicione URLs e textos alternativos para as imagens do carrossel.'
      },
      { key: 'autoplay', label: 'Autoplay', type: 'boolean-switch', defaultValue: true },
      { key: 'interval', label: 'Intervalo (ms)', type: 'number-input', min: 1000, defaultValue: 5000, description: 'Tempo entre as transições de imagem.' },
    ],
  },

  {
    id: 'loader',
    type: 'loader',
    name: 'Carregando',
    description: 'Indicador de carregamento animado.',
    icon: 'LoaderCircle',
    category: 'UI',
    propertiesSchema: [
      { key: 'message', label: 'Mensagem', type: 'text-input', placeholder: 'Carregando...' },
      {
        key: 'type',
        label: 'Tipo de Animação',
        type: 'select',
        options: [
          { label: 'Girando', value: 'spinning' },
          { label: 'Pontos', value: 'dots' },
          { label: 'Barras', value: 'bars' },
          { label: 'Elegante', value: 'elegant' },
        ],
        defaultValue: 'spinning',
      },
      { key: 'duration', label: 'Duração (ms)', type: 'number-input', min: 100, defaultValue: 4000, description: 'Duração da animação (se aplicável).' },
    ],
  },

  {
    id: 'chart-compare',
    type: 'chart-compare',
    name: 'Comparação',
    description: 'Gráfico de comparação de dois valores.',
    icon: 'AlignHorizontalDistributeEnd',
    category: 'Gráficos',
    isNew: true,
    propertiesSchema: [
      { key: 'title', label: 'Título da Comparação', type: 'text-input', placeholder: 'Antes vs Depois' },
      { key: 'value1', label: 'Valor 1', type: 'number-input', defaultValue: 30, min: 0, max: 100 },
      { key: 'label1', label: 'Label 1', type: 'text-input', placeholder: 'Antes' },
      { key: 'value2', label: 'Valor 2', type: 'number-input', defaultValue: 70, min: 0, max: 100 },
      { key: 'label2', label: 'Label 2', type: 'text-input', placeholder: 'Depois' },
      { key: 'color1', label: 'Cor 1', type: 'color-picker', defaultValue: '#B89B7A' },
      { key: 'color2', label: 'Cor 2', type: 'color-picker', defaultValue: '#432818' },
    ],
  },

  {
    id: 'confetti',
    type: 'confetti',
    name: 'Confetti',
    description: 'Efeito visual de confete.',
    icon: 'Sparkles',
    category: 'UI',
    isNew: true,
    propertiesSchema: [
      { key: 'duration', label: 'Duração (ms)', type: 'number-input', defaultValue: 3000, min: 500, description: 'Tempo que o confete fica visível.' },
      { key: 'particleCount', label: 'Contagem de Partículas', type: 'number-input', defaultValue: 100, min: 10, max: 500, description: 'Número de partículas de confete.' },
    ],
  },

  {
    id: 'quote',
    type: 'quote',
    name: 'Citação',
    description: 'Um bloco de citação com autor.',
    icon: 'Quote',
    category: 'Texto',
    propertiesSchema: [
      { key: 'text', label: 'Texto da Citação', type: 'textarea', placeholder: 'A vida é o que acontece enquanto você está ocupado fazendo outros planos.', rows: 3 },
      { key: 'author', label: 'Autor', type: 'text-input', placeholder: 'John Lennon' },
    ],
  },

  {
    id: 'form-input',
    type: 'form-input',
    name: 'Campo de Entrada',
    description: 'Input de texto genérico para formulários.',
    icon: 'TextCursorInput',
    category: 'Formulário',
    propertiesSchema: [
      { key: 'label', label: 'Rótulo', type: 'text-input', placeholder: 'Nome Completo' },
      { key: 'placeholder', label: 'Placeholder', type: 'text-input', placeholder: 'Digite seu nome aqui...' },
      {
        key: 'type',
        label: 'Tipo de Input',
        type: 'select',
        options: [
          { label: 'Texto', value: 'text' },
          { label: 'Email', value: 'email' },
          { label: 'Telefone', value: 'tel' },
          { label: 'Número', value: 'number' },
          { label: 'Senha', value: 'password' },
        ],
        defaultValue: 'text',
      },
      { key: 'required', label: 'Obrigatório', type: 'boolean-switch', defaultValue: false },
    ],
  },

  {
    id: 'chart-area',
    type: 'chart-area',
    name: 'Gráfico de Área',
    description: 'Gráfico de área para visualizar dados.',
    icon: 'ChartArea',
    category: 'Gráficos',
    propertiesSchema: [
      { key: 'title', label: 'Título do Gráfico', type: 'text-input', placeholder: 'Gráfico de Área' },
      { key: 'data', label: 'Dados (JSON)', type: 'json-editor', placeholder: '[{"x": 1, "y": 10}, {"x": 2, "y": 20}]', description: 'Array de objetos com dados para o gráfico.' },
      { key: 'xAxisKey', label: 'Chave do Eixo X', type: 'text-input', placeholder: 'x', defaultValue: 'x' },
      { key: 'yAxisKey', label: 'Chave do Eixo Y', type: 'text-input', placeholder: 'y', defaultValue: 'y' },
    ],
  },

  {
    id: 'chart-level',
    type: 'chart-level',
    name: 'Nível',
    description: 'Indicador circular de nível ou progresso.',
    icon: 'SlidersHorizontal',
    category: 'Gráficos',
    propertiesSchema: [
      { key: 'value', label: 'Valor (%)', type: 'number-input', defaultValue: 75, min: 0, max: 100 },
      { key: 'label', label: 'Rótulo', type: 'text-input', placeholder: 'Nível de Progresso' },
      { key: 'color', label: 'Cor Principal', type: 'color-picker', defaultValue: '#3b82f6' },
      { key: 'backgroundColor', label: 'Cor de Fundo', type: 'color-picker', defaultValue: '#e0e7ff' },
    ],
  },

  {
    id: 'list',
    type: 'list',
    name: 'Lista',
    description: 'Lista de itens (ordenada ou não).',
    icon: 'List',
    category: 'Texto',
    isNew: true,
    propertiesSchema: [
      { key: 'listType', label: 'Tipo de Lista', type: 'select', options: [{ label: 'Não Ordenada', value: 'ul' }, { label: 'Ordenada', value: 'ol' }], defaultValue: 'ul' },
      {
        key: 'items',
        label: 'Itens da Lista',
        type: 'array-editor',
        itemSchema: [
          { key: 'text', label: 'Texto do Item', type: 'text-input', placeholder: 'Novo item' },
        ],
      },
    ],
  },

  {
    id: 'marquee',
    type: 'marquee',
    name: 'Marquise',
    description: 'Texto rolando horizontalmente.',
    icon: 'ArrowRightLeft',
    category: 'UI',
    isNew: true,
    propertiesSchema: [
      { key: 'text', label: 'Texto da Marquise', type: 'text-input', placeholder: 'Texto que rola...' },
      { key: 'speed', label: 'Velocidade', type: 'number-input', defaultValue: 50, min: 10, max: 200, description: 'Velocidade de rolagem (menor = mais rápido).' },
      { key: 'direction', label: 'Direção', type: 'select', options: [{ label: 'Esquerda', value: 'left' }, { label: 'Direita', value: 'right' }], defaultValue: 'left' },
      { key: 'textColor', label: 'Cor do Texto', type: 'color-picker', defaultValue: '#000000' },
      { key: 'backgroundColor', label: 'Cor de Fundo', type: 'color-picker', defaultValue: '#f0f0f0' },
    ],
  },

  {
    id: 'options-grid',
    type: 'options-grid',
    name: 'Grid de Opções',
    description: 'Exibe opções em um formato de grade, ideal para seleção visual.',
    icon: 'Rows3',
    category: 'UI',
    propertiesSchema: [
      { key: 'title', label: 'Título da Seção', type: 'text-input', placeholder: 'Escolha sua opção:' },
      {
        key: 'options',
        label: 'Opções',
        type: 'array-editor',
        itemSchema: [
          { key: 'text', label: 'Texto da Opção', type: 'text-input', placeholder: 'Opção 1' },
          { key: 'imageUrl', label: 'URL da Imagem (Opcional)', type: 'image-url', placeholder: 'https://example.com/option1.jpg' },
        ],
      },
      { key: 'columns', label: 'Colunas (Grade)', type: 'number-input', min: 1, max: 4, defaultValue: 2 },
    ],
  },

  {
    id: 'script',
    type: 'script',
    name: 'Script',
    description: 'Insere código JavaScript customizado na página.',
    icon: 'Code',
    category: 'Outros',
    propertiesSchema: [
      { key: 'code', label: 'Código JavaScript', type: 'textarea', rows: 10, placeholder: 'console.log("Olá mundo!");', description: 'Insira o código JS que será injetado na página.' },
      { key: 'placement', label: 'Posicionamento', type: 'select', options: [{ label: 'Head', value: 'head' }, { label: 'Body (Início)', value: 'body-start' }, { label: 'Body (Fim)', value: 'body-end' }], defaultValue: 'body-end' },
    ],
  },

  {
    id: 'terms',
    type: 'terms',
    name: 'Termos',
    description: 'Bloco de termos e condições ou aviso legal.',
    icon: 'Scale',
    category: 'Vendas',
    propertiesSchema: [
      { key: 'title', label: 'Título', type: 'text-input', placeholder: 'Termos e Condições' },
      { key: 'content', label: 'Conteúdo', type: 'textarea', placeholder: 'Leia nossos termos de uso...', rows: 5 },
    ],
  },

  // ETAPA 20: Página de Resultado Completa
  {
    id: 'result-page',
    type: 'result-page',
    name: 'Página de Resultado (Etapa 20)',
    description: 'Página completa de resultado do quiz com edição inline.',
    icon: 'Crown',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { key: 'userName', label: 'Nome do Usuário', type: 'text-input', placeholder: 'Usuário', defaultValue: 'Usuário' },
      { key: 'primaryStyle', label: 'Estilo Predominante', type: 'text-input', placeholder: 'Elegante Clássica', defaultValue: 'Elegante Clássica' },
      { key: 'percentage', label: 'Porcentagem (%)', type: 'number-input', defaultValue: 92, min: 0, max: 100 },
      { key: 'styleDescription', label: 'Descrição do Estilo', type: 'textarea', placeholder: 'Sua personalidade refletida...', rows: 3 },
      { key: 'styleImage', label: 'Imagem do Estilo', type: 'image-url', placeholder: 'https://...' },
      { key: 'guideImage', label: 'Imagem do Guia', type: 'image-url', placeholder: 'https://...' },
      { key: 'logo', label: 'Logo', type: 'image-url', placeholder: 'https://...' },
      { key: 'logoAlt', label: 'Alt da Logo', type: 'text-input', placeholder: 'Logo da marca' },
      { key: 'valueStackTitle', label: 'Título da Oferta', type: 'text-input', placeholder: 'O Que Você Recebe Hoje' },
      {
        key: 'valueItems',
        label: 'Itens da Oferta',
        type: 'array-editor',
        itemSchema: [
          { key: 'name', label: 'Nome do Item', type: 'text-input', placeholder: 'Guia Principal' },
          { key: 'price', label: 'Preço', type: 'text-input', placeholder: 'R$ 67,00' },
        ],
      },
      { key: 'totalValue', label: 'Valor Total', type: 'text-input', placeholder: 'R$ 175,00' },
      { key: 'finalPrice', label: 'Preço Final', type: 'text-input', placeholder: 'R$ 39,00' },
      { key: 'ctaText', label: 'Texto do CTA', type: 'text-input', placeholder: 'Garantir Meu Guia...' },
      { key: 'ctaSubtitle', label: 'Subtítulo do CTA', type: 'text-input', placeholder: 'Quero meu Guia...' },
      { key: 'securityText', label: 'Texto de Segurança', type: 'textarea', placeholder: '🔒 Pagamento 100% Seguro...', rows: 3 },
      { key: 'backgroundColor', label: 'Cor de Fundo', type: 'color-picker', defaultValue: '#fffaf7' },
    ],
  },

  // ETAPA 21: Página de Oferta B
  {
    id: 'quiz-offer-page',
    type: 'quiz-offer-page',
    name: 'Quiz Oferta (Etapa 21)',
    description: 'Página completa de oferta do quiz com edição inline.',
    icon: 'Sparkles',
    category: 'Oferta',
    isNew: true,
    propertiesSchema: [
      { key: 'urgencyText', label: 'Texto de Urgência', type: 'text-input', placeholder: '🔥 ÚLTIMAS HORAS...' },
      { key: 'logo', label: 'Logo', type: 'image-url', placeholder: 'https://...' },
      { key: 'logoAlt', label: 'Alt da Logo', type: 'text-input', placeholder: 'Logo da marca' },
      { key: 'mainTitle', label: 'Título Principal', type: 'text-input', placeholder: 'Descubra Seu Estilo...' },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea', placeholder: 'Tenha finalmente um guarda-roupa...', rows: 2 },
      { key: 'heroImage', label: 'Imagem Hero', type: 'image-url', placeholder: 'https://...' },
      { key: 'problemsTitle', label: 'Título dos Problemas', type: 'text-input', placeholder: 'Você se identifica...' },
      {
        key: 'problems',
        label: 'Lista de Problemas',
        type: 'array-editor',
        itemSchema: [
          { key: 'text', label: 'Problema', type: 'text-input', placeholder: 'Guarda-roupa cheio mas...' },
        ],
      },
      { key: 'problemInsight', label: 'Insight dos Problemas', type: 'text-input', placeholder: 'Isso acontece porque...' },
      { key: 'solutionTitle', label: 'Título da Solução', type: 'text-input', placeholder: 'A Solução: Quiz...' },
      { key: 'solutionDescription', label: 'Descrição da Solução', type: 'textarea', placeholder: 'Nosso quiz científico...', rows: 2 },
      { key: 'benefitsTitle', label: 'Título dos Benefícios', type: 'text-input', placeholder: 'Com o seu Guia...' },
      {
        key: 'benefits',
        label: 'Lista de Benefícios',
        type: 'array-editor',
        itemSchema: [
          { key: 'text', label: 'Benefício', type: 'text-input', placeholder: 'Descobrir exatamente...' },
        ],
      },
      { key: 'socialProofTitle', label: 'Título da Prova Social', type: 'text-input', placeholder: 'Mais de 15.000...' },
      { key: 'guaranteeTitle', label: 'Título da Garantia', type: 'text-input', placeholder: 'Garantia Total...' },
      { key: 'guaranteeText', label: 'Texto da Garantia', type: 'text-input', placeholder: 'Se não ficar satisfeita...' },
      { key: 'ctaText', label: 'Texto do CTA', type: 'text-input', placeholder: 'Descobrir Meu Estilo...' },
      { key: 'ctaSubtext', label: 'Subtexto do CTA', type: 'text-input', placeholder: 'Quiz + Guia...' },
      { key: 'urgencyNote', label: 'Nota de Urgência', type: 'text-input', placeholder: 'Oferta válida apenas hoje!' },
      { key: 'backgroundColor', label: 'Cor de Fundo', type: 'color-picker', defaultValue: '#FFFBF7' },
    ],
  },

  // ETAPA 1 DO FUNIL - Página inicial do quiz real
  {
    id: 'quiz-start-page',
    type: 'quiz-start-page',
    name: 'Quiz Início (Etapa 1)',
    description: 'Página inicial real do funil de quiz com todos os elementos visuais',
    icon: 'Play',
    category: 'Quiz',
    isNew: true,
    propertiesSchema: [
      // Logo e branding
      { key: 'logoUrl', label: 'URL da Logo', type: 'image-url', placeholder: 'https://...', defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp' },
      { key: 'logoAlt', label: 'Alt da Logo', type: 'text-input', placeholder: 'Descrição da logo', defaultValue: 'Gisele Galvão - Logo da Marca' },
      
      // Conteúdo principal
      { key: 'mainTitle', label: 'Título Principal', type: 'textarea', placeholder: 'Título impactante...', rows: 3, defaultValue: 'Chega de um guarda-roupa lotado e da sensação de que nada combina com você.' },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea', placeholder: 'Subtítulo explicativo...', rows: 2, defaultValue: 'Descubra seu Estilo e aprenda a montar looks que realmente refletem sua essência, com praticidade e confiança.' },
      
      // CTA
      { key: 'ctaText', label: 'Texto do CTA', type: 'text-input', placeholder: 'Descobrir Meu Estilo', defaultValue: 'Descobrir Meu Estilo' },
      { key: 'ctaSubtext', label: 'Subtexto do CTA', type: 'text-input', placeholder: '5x R$ 8,83', defaultValue: '5x R$ 8,83' },
      
      // Imagem hero
      { key: 'heroImage', label: 'Imagem Hero', type: 'image-url', placeholder: 'https://...', defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.jpg' },
      { key: 'heroImageAlt', label: 'Alt da Imagem Hero', type: 'text-input', placeholder: 'Descrição da imagem', defaultValue: 'Mulher descobrindo seu estilo autêntico' },
      
      // Cores e styling
      { key: 'backgroundColor', label: 'Cor de Fundo', type: 'color-picker', defaultValue: '#FAF9F7' },
      { key: 'primaryColor', label: 'Cor Primária', type: 'color-picker', defaultValue: '#B89B7A' },
      { key: 'hoverColor', label: 'Cor de Hover', type: 'color-picker', defaultValue: '#A68A6A' },
      { key: 'textDark', label: 'Texto Escuro', type: 'color-picker', defaultValue: '#432818' },
      { key: 'textMedium', label: 'Texto Médio', type: 'color-picker', defaultValue: '#8F7A6A' },
    ],
  },

  // ...existing code...
];

// Helper para encontrar definição de bloco
export const findBlockDefinition = (type: string): BlockDefinition | undefined => {
  return blockDefinitions.find(def => def.type === type);
};

// Helper para obter categorias únicas
export const getCategories = (): string[] => {
  const categoriesSet = new Set(blockDefinitions.map(def => def.category));
  return Array.from(categoriesSet);
};

// Helper para obter blocos por categoria
export const getBlocksByCategory = (category: string): BlockDefinition[] => {
  return blockDefinitions.filter(def => def.category === category);
};
