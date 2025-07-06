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
  | 'json-editor'
  | 'font-size-slider'
  | 'font-weight-buttons'
  | 'text-style-buttons'
  | 'text-align-buttons'
  | 'content-type-buttons'
  | 'color-palette';

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

  // Pergunta Múltipla Escolha - Versão Completa com Layout, Validações e Estilização
  {
    id: 'question-multiple',
    type: 'question-multiple',
    name: 'Pergunta Múltipla Escolha',
    description: 'Pergunta com múltiplas opções de resposta, com ou sem imagens, e validações avançadas.',
    icon: 'CheckCircle',
    category: 'Quiz',
    propertiesSchema: [
      { 
        key: 'question', 
        label: 'Pergunta', 
        type: 'textarea', 
        placeholder: 'Qual é a sua pergunta?', 
        rows: 3,
        defaultValue: 'Qual é a sua pergunta?'
      },
      {
        key: 'options',
        label: 'Opções de Resposta',
        type: 'array-editor',
        itemSchema: [
          { key: 'text', label: 'Texto da Opção', type: 'textarea', placeholder: 'Texto da opção', rows: 1 },
          { key: 'value', label: 'Valor da Opção', type: 'text-input', placeholder: 'Valor interno' },
          { key: 'imageUrl', label: 'URL da Imagem (Opcional)', type: 'image-url', placeholder: 'URL da imagem da opção' },
        ],
        description: 'Configure as opções de resposta, incluindo texto e imagem.'
      },
      
      // --- Seção Layout ---
      {
        key: 'columns',
        label: 'Colunas',
        type: 'select',
        options: [
          { label: '1 Coluna', value: '1' },
          { label: '2 Colunas', value: '2' },
          { label: '3 Colunas', value: '3' },
          { label: '4 Colunas', value: '4' },
        ],
        defaultValue: '2',
        description: 'Número de colunas para exibir as opções em layout de grade.'
      },
      {
        key: 'direction',
        label: 'Direção',
        type: 'select',
        options: [
          { label: 'Vertical', value: 'vertical' },
          { label: 'Horizontal', value: 'horizontal' },
        ],
        defaultValue: 'vertical',
        description: 'Orientação do layout das opções.'
      },
      {
        key: 'contentLayout',
        label: 'Disposição do Conteúdo',
        type: 'select',
        options: [
          { label: 'Texto + Imagem', value: 'text-image' },
          { label: 'Somente Texto', value: 'text-only' },
          { label: 'Somente Imagem', value: 'image-only' },
        ],
        defaultValue: 'text-image',
        description: 'Como o texto e a imagem são dispostos em cada opção.'
      },
      
      // --- Seção Validações ---
      { 
        key: 'multipleSelection', 
        label: 'Múltipla Escolha', 
        type: 'boolean-switch', 
        defaultValue: false, 
        description: 'Permite que o usuário selecione múltiplas opções.' 
      },
      { 
        key: 'required', 
        label: 'Obrigatório', 
        type: 'boolean-switch', 
        defaultValue: true, 
        description: 'O usuário é obrigado a selecionar alguma opção para avançar.' 
      },
      { 
        key: 'autoProceed', 
        label: 'Auto-avançar', 
        type: 'boolean-switch', 
        defaultValue: false, 
        description: 'O funil avançará para a próxima etapa automaticamente.' 
      },
      
      // --- Seção Estilização ---
      {
        key: 'borderStyle',
        label: 'Bordas',
        type: 'select',
        options: [
          { label: 'Nenhuma', value: 'none' },
          { label: 'Pequena', value: 'sm' },
          { label: 'Média', value: 'md' },
          { label: 'Grande', value: 'lg' },
        ],
        defaultValue: 'sm',
      },
      {
        key: 'shadowStyle',
        label: 'Sombras',
        type: 'select',
        options: [
          { label: 'Sem Sombras', value: 'none' },
          { label: 'Pequena', value: 'sm' },
          { label: 'Média', value: 'md' },
          { label: 'Grande', value: 'lg' },
        ],
        defaultValue: 'none',
      },
      {
        key: 'spacing',
        label: 'Espaçamento',
        type: 'select',
        options: [
          { label: 'Pequeno', value: 'sm' },
          { label: 'Médio', value: 'md' },
          { label: 'Grande', value: 'lg' },
        ],
        defaultValue: 'md',
      },
      {
        key: 'detailStyle',
        label: 'Detalhe Visual',
        type: 'select',
        options: [
          { label: 'Nenhum', value: 'none' },
          { label: 'Simples', value: 'simple' },
          { label: 'Completo', value: 'full' },
        ],
        defaultValue: 'none',
      },
      {
        key: 'optionVisualStyle',
        label: 'Estilo da Opção',
        type: 'select',
        options: [
          { label: 'Simples', value: 'simple' },
          { label: 'Card', value: 'card' },
        ],
        defaultValue: 'simple',
      },
      
      // --- Seção Personalização (Cores) ---
      { key: 'primaryColor', label: 'Cor Principal', type: 'color-picker', defaultValue: '#B89B7A' },
      { key: 'textColor', label: 'Cor do Texto', type: 'color-picker', defaultValue: '#432818' },
      { key: 'borderColor', label: 'Cor da Borda', type: 'color-picker', defaultValue: '#B89B7A' },
      
      // --- Seção Avançado ---
      { key: 'componentId', label: 'ID do Componente', type: 'text-input', placeholder: 'ID único para referência' },
      
      // --- Seção Geral ---
      { key: 'maxWidth', label: 'Tamanho Máximo (%)', type: 'number-input', min: 10, max: 100, defaultValue: 100, description: 'Largura máxima do componente em porcentagem.' },
      { key: 'alignment', label: 'Alinhamento', type: 'select', options: [{ label: 'Esquerda', value: 'left' }, { label: 'Centro', value: 'center' }, { label: 'Direita', value: 'right' }], defaultValue: 'center' },
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

  // BLOCOS ESPECÍFICOS DO QUIZ - DADOS REAIS
  {
    id: 'quiz-start-page',
    type: 'QuizStartPageBlock',
    name: 'Página Inicial do Quiz',
    description: 'Etapa 1 - Introdução e coleta do nome (dados reais)',
    icon: 'Play',
    category: 'Quiz Real',
    propertiesSchema: [
      { 
        key: 'title', 
        label: 'Título Principal', 
        type: 'text-input', 
        defaultValue: 'Chega de um guarda-roupa lotado e da sensação de que nada combina com você.' 
      },
      { 
        key: 'subtitle', 
        label: 'Subtítulo', 
        type: 'textarea', 
        rows: 3,
        defaultValue: 'Em poucos minutos, descubra seu Estilo Predominante — e aprenda a montar looks que realmente refletem sua essência, com praticidade e confiança.' 
      },
      { 
        key: 'logoUrl', 
        label: 'URL do Logo', 
        type: 'image-url', 
        defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp' 
      },
      { 
        key: 'imageUrl', 
        label: 'Imagem Principal', 
        type: 'image-url', 
        defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.webp' 
      },
      { 
        key: 'inputPlaceholder', 
        label: 'Placeholder do Input', 
        type: 'text-input', 
        defaultValue: 'Digite seu nome aqui...' 
      },
      { 
        key: 'buttonText', 
        label: 'Texto do Botão', 
        type: 'text-input', 
        defaultValue: 'Quero Descobrir meu Estilo Agora!' 
      },
      {
        key: 'showNameInput',
        label: 'Mostrar Campo de Nome',
        type: 'boolean-switch',
        defaultValue: true
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
        itemSchema: [
          { key: 'text', label: 'Benefício', type: 'text-input', placeholder: 'Descubra seu estilo único' }
        ],
        defaultValue: [
          { text: 'Descubra seu estilo único' },
          { text: 'Tenha mais confiança ao se vestir' },
          { text: 'Economize tempo na escolha de looks' }
        ]
      }
    ]
  },

  {
    id: 'question-multiple',
    type: 'QuestionMultipleBlock',
    name: 'Questão Múltipla Escolha',
    description: 'Questões do quiz com múltiplas seleções (dados reais)',
    icon: 'CheckSquare',
    category: 'Quiz Real',
    propertiesSchema: [
      { 
        key: 'question', 
        label: 'Pergunta', 
        type: 'textarea', 
        rows: 2,
        defaultValue: 'Qual o seu tipo de roupa favorita?' 
      },
      {
        key: 'options',
        label: 'Opções de Resposta',
        type: 'array-editor',
        itemSchema: [
          { key: 'id', label: 'ID', type: 'text-input', placeholder: 'natural' },
          { key: 'text', label: 'Texto', type: 'textarea', rows: 2, placeholder: 'Conforto, leveza e praticidade no vestir' },
          { key: 'value', label: 'Valor', type: 'text-input', placeholder: 'natural' },
          { key: 'imageUrl', label: 'Imagem', type: 'image-url', placeholder: 'https://...' },
          { key: 'category', label: 'Categoria', type: 'text-input', placeholder: 'natural' }
        ]
      },
      {
        key: 'multipleSelection',
        label: 'Seleção Múltipla',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'maxSelections',
        label: 'Máximo de Seleções',
        type: 'number-input',
        min: 1,
        max: 8,
        defaultValue: 3
      },
      {
        key: 'showImages',
        label: 'Mostrar Imagens',
        type: 'boolean-switch',
        defaultValue: true
      },
      { 
        key: 'progressLabel', 
        label: 'Label do Progresso', 
        type: 'text-input', 
        defaultValue: 'Questão 1 de 10' 
      },
      {
        key: 'progressValue',
        label: 'Valor do Progresso',
        type: 'number-input',
        min: 0,
        max: 100,
        defaultValue: 10
      }
    ]
  },

  {
    id: 'strategic-question',
    type: 'StrategicQuestionBlock',
    name: 'Questão Estratégica',
    description: 'Questões estratégicas para segmentação (dados reais)',
    icon: 'Target',
    category: 'Quiz Real',
    propertiesSchema: [
      { 
        key: 'question', 
        label: 'Pergunta', 
        type: 'textarea', 
        rows: 2,
        defaultValue: 'Como você se vê hoje?' 
      },
      {
        key: 'options',
        label: 'Opções de Resposta',
        type: 'array-editor',
        itemSchema: [
          { key: 'id', label: 'ID', type: 'text-input', placeholder: 'option1' },
          { key: 'text', label: 'Texto', type: 'textarea', rows: 2, placeholder: 'Texto da opção' },
          { key: 'value', label: 'Valor', type: 'text-input', placeholder: 'option1' },
          { key: 'category', label: 'Categoria', type: 'text-input', placeholder: 'categoria' }
        ]
      },
      {
        key: 'isStrategic',
        label: 'É Questão Estratégica',
        type: 'boolean-switch',
        defaultValue: true
      },
      { 
        key: 'progressLabel', 
        label: 'Label do Progresso', 
        type: 'text-input', 
        defaultValue: 'Questão estratégica 1 de 6' 
      },
      {
        key: 'progressValue',
        label: 'Valor do Progresso',
        type: 'number-input',
        min: 0,
        max: 100,
        defaultValue: 65
      }
    ]
  },

  {
    id: 'quiz-transition',
    type: 'QuizTransitionBlock',
    name: 'Transição do Quiz',
    description: 'Páginas de transição entre etapas (dados reais)',
    icon: 'ArrowRight',
    category: 'Quiz Real',
    propertiesSchema: [
      { 
        key: 'title', 
        label: 'Título', 
        type: 'text-input', 
        defaultValue: 'Agora vamos conhecer você melhor' 
      },
      { 
        key: 'message', 
        label: 'Mensagem', 
        type: 'textarea', 
        rows: 3,
        defaultValue: 'Baseado nas suas respostas anteriores, agora queremos entender melhor seu perfil e necessidades.' 
      },
      {
        key: 'progressValue',
        label: 'Valor do Progresso',
        type: 'number-input',
        min: 0,
        max: 100,
        defaultValue: 60
      },
      {
        key: 'showAnimation',
        label: 'Mostrar Animação',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'animationType',
        label: 'Tipo de Animação',
        type: 'select',
        options: [
          { label: 'Pulse', value: 'pulse' },
          { label: 'Spin', value: 'spin' },
          { label: 'Bounce', value: 'bounce' }
        ],
        defaultValue: 'pulse'
      }
    ]
  },

  {
    id: 'result-page',
    type: 'ResultPageBlock',
    name: 'Página de Resultado',
    description: 'Etapa 20 - Resultado do estilo predominante (dados reais)',
    icon: 'Award',
    category: 'Quiz Real',
    propertiesSchema: [
      { 
        key: 'primaryStyle', 
        label: 'Estilo Predominante', 
        type: 'select',
        options: [
          { label: 'Natural', value: 'natural' },
          { label: 'Clássico', value: 'classico' },
          { label: 'Contemporâneo', value: 'contemporaneo' },
          { label: 'Elegante', value: 'elegante' },
          { label: 'Romântico', value: 'romantico' },
          { label: 'Sexy', value: 'sexy' },
          { label: 'Dramático', value: 'dramatico' },
          { label: 'Criativo', value: 'criativo' }
        ],
        defaultValue: 'elegante' 
      },
      {
        key: 'secondaryStyles',
        label: 'Estilos Secundários',
        type: 'array-editor',
        itemSchema: [
          { key: 'style', label: 'Estilo', type: 'text-input', placeholder: 'natural' }
        ],
        defaultValue: [
          { style: 'natural' },
          { style: 'contemporaneo' }
        ]
      },
      {
        key: 'showHeader',
        label: 'Mostrar Cabeçalho',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'showDescription',
        label: 'Mostrar Descrição',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'showSecondaryStyles',
        label: 'Mostrar Estilos Secundários',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'showTransformation',
        label: 'Mostrar Transformação',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'showMotivation',
        label: 'Mostrar Motivação',
        type: 'boolean-switch',
        defaultValue: true
      },
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
        defaultValue: 'Visitante' 
      }
    ]
  },

  {
    id: 'quiz-offer-page',
    type: 'QuizOfferPageBlock',
    name: 'Página de Oferta',
    description: 'Etapa 21 - Oferta do produto (dados reais)',
    icon: 'ShoppingBag',
    category: 'Quiz Real',
    propertiesSchema: [
      { 
        key: 'title', 
        label: 'Título da Oferta', 
        type: 'text-input', 
        defaultValue: 'Guia Completo do Seu Estilo' 
      },
      { 
        key: 'subtitle', 
        label: 'Subtítulo', 
        type: 'textarea', 
        rows: 2,
        defaultValue: 'Tudo que você precisa para se vestir com confiança' 
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
        defaultValue: 'R$ 297,00' 
      },
      { 
        key: 'discount', 
        label: 'Desconto', 
        type: 'text-input', 
        defaultValue: '67% OFF' 
      },
      { 
        key: 'ctaText', 
        label: 'Texto do Botão', 
        type: 'text-input', 
        defaultValue: 'Quero Transformar Meu Estilo Agora' 
      },
      { 
        key: 'ctaUrl', 
        label: 'URL do Botão', 
        type: 'text-input', 
        defaultValue: 'https://pay.hotmart.com/seu-link-de-pagamento' 
      },
      {
        key: 'showGuarantee',
        label: 'Mostrar Garantia',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'guaranteeDays',
        label: 'Dias de Garantia',
        type: 'number-input',
        min: 1,
        max: 365,
        defaultValue: 7
      },
      {
        key: 'showTestimonials',
        label: 'Mostrar Depoimentos',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'showBonus',
        label: 'Mostrar Bônus',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'showTimer',
        label: 'Mostrar Timer',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'timerMinutes',
        label: 'Minutos do Timer',
        type: 'number-input',
        min: 1,
        max: 60,
        defaultValue: 15
      }
    ]
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

  // NOVOS BLOCOS PARA AS 21 ETAPAS DO QUIZ
  {
    id: 'progress-block',
    type: 'ProgressBlock',
    name: 'Barra de Progresso',
    description: 'Barra de progresso para indicar avanço no quiz',
    icon: 'BarChart3',
    category: 'Quiz',
    propertiesSchema: [
      { 
        key: 'value', 
        label: 'Valor (%)', 
        type: 'number-input', 
        placeholder: '0-100',
        defaultValue: 0,
        min: 0,
        max: 100
      },
      { 
        key: 'label', 
        label: 'Texto do Label', 
        type: 'text-input', 
        placeholder: 'Ex: Questão 1 de 10',
        defaultValue: 'Progresso' 
      },
      {
        key: 'showPercentage',
        label: 'Mostrar Porcentagem',
        type: 'boolean-switch',
        defaultValue: true,
      },
    ],
  },

  {
    id: 'question-block',
    type: 'QuestionBlock',
    name: 'Pergunta Quiz',
    description: 'Pergunta com opções de resposta (texto e/ou imagem)',
    icon: 'HelpCircle',
    category: 'Quiz',
    propertiesSchema: [
      { 
        key: 'question', 
        label: 'Pergunta', 
        type: 'textarea', 
        placeholder: 'Digite sua pergunta aqui...',
        defaultValue: 'Qual é a sua pergunta?',
        rows: 2
      },
      {
        key: 'required',
        label: 'Resposta Obrigatória',
        type: 'boolean-switch',
        defaultValue: true,
      },
      {
        key: 'multipleSelection',
        label: 'Múltipla Escolha',
        type: 'boolean-switch',
        defaultValue: false,
      },
      { 
        key: 'maxSelections', 
        label: 'Máximo de Seleções', 
        type: 'number-input', 
        placeholder: 'Ex: 3',
        defaultValue: 1,
        min: 1,
        max: 10
      },
      {
        key: 'options',
        label: 'Opções de Resposta',
        type: 'array-editor',
        defaultValue: [
          { id: 'opcao-1', text: 'Opção A', value: 'a' },
          { id: 'opcao-2', text: 'Opção B', value: 'b' }
        ],
        itemSchema: [
          { key: 'id', label: 'ID', type: 'text-input' },
          { key: 'text', label: 'Texto', type: 'text-input' },
          { key: 'value', label: 'Valor', type: 'text-input' },
          { key: 'imageUrl', label: 'URL da Imagem (opcional)', type: 'image-url' },
        ]
      },
    ],
  },

  // BLOCOS ESPECÍFICOS DO QUIZ INTRO - LAYOUT ESTRUTURADO
  {
    id: 'quiz-intro-header',
    type: 'quiz-intro-header',
    name: 'Header Quiz Intro',
    description: 'Header com logo, progress bar e botão voltar',
    icon: 'Layout',
    category: 'Quiz Intro',
    propertiesSchema: [
      { 
        key: 'logoUrl', 
        label: 'URL da Logo', 
        type: 'image-url', 
        placeholder: 'https://...',
        defaultValue: 'https://cakto-quiz-br01.b-cdn.net/uploads/47fd613e-91a9-48cf-bd52-a9d4e180d5ab.png'
      },
      { 
        key: 'logoAlt', 
        label: 'Alt da Logo', 
        type: 'text-input', 
        placeholder: 'Logo',
        defaultValue: 'Logo' 
      },
      { 
        key: 'progressValue', 
        label: 'Progresso (%)', 
        type: 'number-input', 
        min: 0,
        max: 100,
        defaultValue: 7.14 
      },
      { 
        key: 'showBackButton', 
        label: 'Mostrar Botão Voltar', 
        type: 'boolean-switch', 
        defaultValue: true 
      },
      { 
        key: 'logoWidth', 
        label: 'Largura da Logo', 
        type: 'number-input', 
        min: 50,
        max: 200,
        defaultValue: 96 
      }
    ]
  },

  {
    id: 'quiz-title',
    type: 'quiz-title',
    name: 'Título do Quiz',
    description: 'Título editável com configurações de tipografia',
    icon: 'Type',
    category: 'Quiz Intro',
    propertiesSchema: [
      {
        key: 'contentType',
        label: 'Configurar Opção',
        type: 'content-type-buttons',
        defaultValue: 'text'
      },
      { 
        key: 'title', 
        label: 'Título', 
        type: 'text-input', 
        placeholder: 'Título do quiz...',
        defaultValue: 'Teste de Estilo Pessoal' 
      },
      {
        key: 'fontSize',
        label: 'Tamanho da Fonte',
        type: 'font-size-slider',
        min: 12,
        max: 48,
        defaultValue: 24
      },
      {
        key: 'fontWeight',
        label: 'Peso da Fonte',
        type: 'font-weight-buttons',
        defaultValue: '700'
      },
      {
        key: 'textStyle',
        label: 'Estilo do Texto',
        type: 'text-style-buttons',
        defaultValue: ''
      },
      {
        key: 'textAlign',
        label: 'Alinhamento',
        type: 'text-align-buttons',
        defaultValue: 'center'
      },
      {
        key: 'colors',
        label: 'Cores',
        type: 'color-palette',
        defaultValue: {
          text: '#f29c68',
          background: 'transparent'
        }
      },
      {
        key: 'spacing',
        label: 'Espaçamento',
        type: 'font-size-slider',
        min: 0,
        max: 40,
        defaultValue: 16
      }
    ]
  },

  {
    id: 'quiz-name-input',
    type: 'quiz-name-input',
    name: 'Campo Nome Quiz',
    description: 'Campo de input para nome com validação',
    icon: 'User',
    category: 'Quiz Intro',
    propertiesSchema: [
      { 
        key: 'label', 
        label: 'Label do Campo', 
        type: 'text-input', 
        placeholder: 'Label...',
        defaultValue: 'NOME' 
      },
      { 
        key: 'placeholder', 
        label: 'Placeholder', 
        type: 'text-input', 
        placeholder: 'Digite aqui...',
        defaultValue: 'Digite seu nome aqui...' 
      },
      { 
        key: 'required', 
        label: 'Campo Obrigatório', 
        type: 'boolean-switch', 
        defaultValue: true 
      },
      { 
        key: 'inputType', 
        label: 'Tipo de Input', 
        type: 'select', 
        options: [
          { label: 'Texto', value: 'text' },
          { label: 'Email', value: 'email' },
          { label: 'Telefone', value: 'tel' },
          { label: 'Número', value: 'number' }
        ],
        defaultValue: 'text' 
      },
      { 
        key: 'helperText', 
        label: 'Texto de Ajuda', 
        type: 'text-input', 
        placeholder: 'Texto opcional...',
        defaultValue: '' 
      }
    ]
  },

  // 🚀 BLOCOS UNIFICADOS DO FUNIL - Componentes reutilizáveis que garantem fidelidade visual
  {
    id: 'FunnelHeroBlock',
    type: 'FunnelHeroBlock',
    name: 'Hero Section Unificado',
    description: 'Seção hero que usa exatamente o mesmo componente do funil real. Edição apenas via painel de propriedades.',
    icon: 'Star',
    category: 'Funil Unificado',
    isNew: true,
    propertiesSchema: [
      { 
        key: 'title', 
        label: 'Título Principal', 
        type: 'textarea', 
        placeholder: 'Seu título principal aqui...',
        rows: 2,
        defaultValue: 'Chega de um guarda-roupa lotado e da sensação de que nada combina com você.' 
      },
      { 
        key: 'description', 
        label: 'Descrição', 
        type: 'textarea', 
        placeholder: 'Descrição persuasiva...',
        rows: 3,
        defaultValue: 'Descubra seu Estilo e aprenda a montar looks que realmente refletem sua essência, com praticidade e confiança.' 
      },
      { 
        key: 'ctaText', 
        label: 'Texto do Botão', 
        type: 'text-input', 
        placeholder: 'Call to Action',
        defaultValue: 'Descobrir Meu Estilo - 5x R$ 8,83' 
      },
      { 
        key: 'ctaSubtext', 
        label: 'Subtexto do Botão (Opcional)', 
        type: 'text-input', 
        placeholder: 'Texto adicional abaixo do botão',
        defaultValue: '' 
      },
      { 
        key: 'logoUrl', 
        label: 'URL do Logo', 
        type: 'image-url', 
        placeholder: 'https://exemplo.com/logo.png',
        defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp' 
      },
      { 
        key: 'logoAlt', 
        label: 'Alt do Logo', 
        type: 'text-input', 
        placeholder: 'Descrição do logo',
        defaultValue: 'Gisele Galvão - Logo da Marca' 
      },
      { 
        key: 'heroImageUrl', 
        label: 'URL da Imagem Hero', 
        type: 'image-url', 
        placeholder: 'https://exemplo.com/hero.jpg',
        defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.jpg' 
      },
      { 
        key: 'heroImageAlt', 
        label: 'Alt da Imagem Hero', 
        type: 'text-input', 
        placeholder: 'Descrição da imagem',
        defaultValue: 'Mulher descobrindo seu estilo autêntico' 
      },
      { 
        key: 'layout', 
        label: 'Layout', 
        type: 'select', 
        options: [
          { label: 'Lado a Lado', value: 'side-by-side' },
          { label: 'Empilhado', value: 'stacked' },
          { label: 'Hero Centralizado', value: 'hero-centered' }
        ],
        defaultValue: 'side-by-side' 
      },
      { 
        key: 'imagePosition', 
        label: 'Posição da Imagem', 
        type: 'select', 
        options: [
          { label: 'Direita', value: 'right' },
          { label: 'Esquerda', value: 'left' },
          { label: 'Fundo', value: 'background' }
        ],
        defaultValue: 'right' 
      },
      { 
        key: 'backgroundColor', 
        label: 'Cor de Fundo', 
        type: 'color-picker', 
        defaultValue: '#FAF9F7' 
      },
      { 
        key: 'textColor', 
        label: 'Cor do Texto', 
        type: 'color-picker', 
        defaultValue: '#432818' 
      },
      { 
        key: 'primaryColor', 
        label: 'Cor Primária', 
        type: 'color-picker', 
        defaultValue: '#B89B7A' 
      }
    ]
  },

  {
    id: 'FunnelPainBlock',
    type: 'FunnelPainBlock',
    name: 'Seção de Problemas Unificada',
    description: 'Seção de pain points que usa exatamente o mesmo componente do funil real. Edição apenas via painel de propriedades.',
    icon: 'Target',
    category: 'Funil Unificado',
    isNew: true,
    propertiesSchema: [
      { 
        key: 'title', 
        label: 'Título da Seção', 
        type: 'text-input', 
        placeholder: 'Título principal...',
        defaultValue: 'Você Reconhece Esses Problemas?' 
      },
      { 
        key: 'subtitle', 
        label: 'Subtítulo (Opcional)', 
        type: 'textarea', 
        placeholder: 'Subtítulo explicativo...',
        rows: 2,
        defaultValue: 'Armário cheio, mas nada para vestir? Você não está sozinha.' 
      },
      { 
        key: 'description', 
        label: 'Descrição (Opcional)', 
        type: 'textarea', 
        placeholder: 'Descrição adicional...',
        rows: 2,
        defaultValue: '' 
      },
      { 
        key: 'conclusion', 
        label: 'Conclusão (Opcional)', 
        type: 'textarea', 
        placeholder: 'Texto conclusivo persuasivo...',
        rows: 3,
        defaultValue: 'A solução está em descobrir seu estilo autêntico. Com essa clareza, você criará um guarda-roupa harmonioso que expressa verdadeiramente quem você é.' 
      },
      {
        key: 'painPoints',
        label: 'Pontos de Dor',
        type: 'array-editor',
        itemSchema: [
          { key: 'title', label: 'Título do Problema', type: 'text-input', placeholder: 'Ex: Não sei o que usar' },
          { key: 'description', label: 'Descrição', type: 'textarea', placeholder: 'Descrição do problema...', rows: 2 },
          { key: 'icon', label: 'Ícone', type: 'text-input', placeholder: 'Nome do ícone Lucide', defaultValue: 'AlertCircle' }
        ],
        defaultValue: [
          {
            title: 'Problemas de autoestima',
            description: 'Você se sente insegura com sua imagem e não sabe como melhorar',
            icon: 'Heart'
          },
          {
            title: 'Compras sem direção',
            description: 'Gasta dinheiro em roupas que não combinam com você',
            icon: 'ShoppingBag'
          },
          {
            title: 'Perda de tempo',
            description: 'Demora horas para se arrumar e ainda não fica satisfeita',
            icon: 'Clock'
          },
          {
            title: 'Falta de estilo próprio',
            description: 'Copia looks dos outros mas nunca fica do mesmo jeito',
            icon: 'Users'
          }
        ],
        description: 'Configure os problemas que sua solução resolve.'
      },
      { 
        key: 'columns', 
        label: 'Colunas', 
        type: 'select', 
        options: [
          { label: '1 Coluna', value: '1' },
          { label: '2 Colunas', value: '2' },
          { label: '3 Colunas', value: '3' },
          { label: '4 Colunas', value: '4' }
        ],
        defaultValue: '4' 
      },
      { 
        key: 'backgroundColor', 
        label: 'Cor de Fundo', 
        type: 'color-picker', 
        defaultValue: '#ffffff' 
      },
      { 
        key: 'textColor', 
        label: 'Cor do Texto', 
        type: 'color-picker', 
        defaultValue: '#432818' 
      },
      { 
        key: 'primaryColor', 
        label: 'Cor Primária', 
        type: 'color-picker', 
        defaultValue: '#B89B7A' 
      },
      { 
        key: 'cardBorderColor', 
        label: 'Cor da Borda dos Cards', 
        type: 'color-picker', 
        defaultValue: 'rgba(184, 155, 122, 0.2)' 
      }
    ]
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
