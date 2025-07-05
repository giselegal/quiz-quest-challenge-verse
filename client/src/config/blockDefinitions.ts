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
