// =====================================================================
// 1. src/types.ts - Definições de tipos (Corrigido e Expandido)
// =====================================================================
import React from 'react';

// Tipos para ícones Lucide React (expandido para incluir todos os usados nas definições)
// A lista é grande, mas focaremos na correção da estrutura do schema.
export type IconType =
  | 'Type'
  | 'Heading1'
  | 'RectangleHorizontal'
  | 'StretchHorizontal'
  | 'Image'
  | 'Input'
  | 'HelpCircle'
  | 'Award'
  | 'CheckCircle'
  | 'Play'
  | 'LoaderCircle'
  | 'AlignHorizontalDistributeEnd'
  | 'Sparkles'
  | 'Quote'
  | 'TextCursorInput'
  | 'Proportions'
  | 'ChartArea'
  | 'SlidersHorizontal'
  | 'List'
  | 'ArrowRightLeft'
  | 'Rows3'
  | 'CircleDollarSign'
  | 'Code'
  | 'Scale'
  | 'Video'
  | 'ShoppingCart'
  | 'Clock'
  | 'MessageSquare'
  | 'Shield'
  | 'Gift'
  | 'Brain'
  | 'Crown'
  | 'Layers'
  | 'Refresh'
  | 'Heart'
  | 'Stack'
  | 'Users'
  | 'TriangleAlert'
  | 'Book'
  | 'Mic'
  | 'GalleryHorizontalEnd'
  | 'Zap'
  | 'Target'
  | 'TrendingUp'; // Adicionei os ícones que estavam faltando no HTML anterior


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
  itemSchema?: PropertySchema[]; // Para 'array-editor'
  nestedPath?: string; // Para propriedades aninhadas
  hidden?: boolean; // Para ocultar no painel
}

// Definição de um bloco para o editor (com metadados para a sidebar)
export interface BlockDefinition {
  // Removido 'id: string;' pois 'type' já serve como identificador único para a definição do bloco.
  type: string; // Tipo de bloco (usado para mapear para o componente React e como ID único)
  name: string; // Nome amigável para exibição na sidebar
  description: string; // Descrição breve do bloco
  icon: IconType; // Nome do ícone Lucide como string
  category: string; // Categoria para agrupar na sidebar (ex: 'Texto', 'Mídia', 'Quiz')
  tags?: string[]; // Tags opcionais para busca/filtragem
  isNew?: boolean; // Flag para indicar que é um bloco novo (pode exibir um badge "Novo!")
  propertiesSchema?: PropertySchema[]; // O schema de propriedades para este bloco
}

// Interface base para qualquer bloco (mantida do código anterior)
export interface Block {
  id: string; // ID único da instância do bloco no funil
  type: string; // Corresponde ao BlockDefinition.type
  properties: Record<string, any>; // Propriedades específicas do bloco
}

// Interface para as opções de um quiz (mais detalhada)
export interface QuizOption {
    id: string;
    text: string; // Pode ser HTML (rich text)
    imageUrl?: string;
    profileType?: string; // Ex: 'Natural', 'Clássico' - para pontuação/perfil
    scoreValue?: number; // Pontuação para a opção
    nextStepId?: string; // Se a opção leva a um caminho condicional
}

// Interfaces para as propriedades de blocos específicos (mantidas do código anterior)
export interface InputBlockProps {
  label: string;
  placeholder?: string;
  inputType: 'text' | 'email' | 'number' | 'password';
  required?: boolean;
  value?: string;
}

export interface ImageBlockProps {
  imageUrl: string;
  altText?: string;
  maxWidth?: number;
  height?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  borderRadius?: BorderSizeType;
}

// Tipos para layout e estilo (mantidos do código anterior)
export type LayoutType = '1-column' | '2-columns' | '3-columns';
export type DirectionType = 'vertical' | 'horizontal';
export type DispositionType = 'image-text' | 'text-image' | 'text-only' | 'image-only';
export type BorderSizeType = 'none' | 'small' | 'medium' | 'large';
export type ShadowSizeType = 'none' | 'small' | 'medium' | 'large';
export type SpacingType = 'small' | 'medium' | 'large';
export type DetailType = 'none' | 'line' | 'dot';
export type StyleType = 'simple' | 'card';

// Interface para o funil (simplificado para este exemplo)
export interface Funnel {
  id: string;
  name: string;
  pages: Page[];
  config: Record<string, any>;
  version: number;
  isPublished: boolean;
}

// Interface para uma página do funil (simplificado)
export interface Page {
  id: string;
  title: string;
  blocks: Block[];
}


// =====================================================================
// 2. src/config/blockDefinitions.ts - Definição dos schemas para cada tipo de bloco (Corrigido e Refatorado)
// =====================================================================
// Importe v4 as uuidv4 se ainda não estiver importado no arquivo principal
// import { v4 as uuidv4 } from 'uuid';

export const blockDefinitions: BlockDefinition[] = [
  // Categoria: Texto
  {
    type: 'main-heading', // Renomeado de 'header' para ser mais específico
    name: 'Título Principal',
    description: 'Cabeçalho principal da seção.',
    icon: 'Heading1', // Corrigido para o nome Lucide correto
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

  // Categoria: Mídia
  {
    type: 'image',
    name: 'Imagem',
    description: 'Imagem com configurações de tamanho e alinhamento.',
    icon: 'Image', // Corrigido para o nome Lucide correto
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
    type: 'video-player', // Corrigido de 'video' para 'video-player' para consistência
    name: 'Player de Vídeo',
    description: 'Incorporação de vídeo YouTube/Vimeo.',
    icon: 'Video', // Corrigido para o nome Lucide correto
    category: 'Mídia',
    propertiesSchema: [
      {
        key: 'videoUrl',
        label: 'URL do Vídeo',
        type: 'video-url',
        placeholder: 'https://youtube.com/watch?v=...',
        description: 'Insira a URL direta para o arquivo de vídeo (.mp4, .webm, etc.) ou link do YouTube/Vimeo.'
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

  {
    type: 'audio',
    name: 'Player de Áudio', // Mais descritivo
    description: 'Player de áudio.',
    icon: 'Mic', // Corrigido para o nome Lucide correto
    category: 'Mídia',
    propertiesSchema: [
      { key: 'audioUrl', label: 'URL do Áudio', type: 'video-url', placeholder: 'https://example.com/audio.mp3', description: 'Insira a URL direta para o arquivo de áudio (.mp3, .wav, etc.).' },
      { key: 'autoplay', label: 'Autoplay', type: 'boolean-switch', defaultValue: false },
      { key: 'controls', label: 'Mostrar Controles', type: 'boolean-switch', defaultValue: true },
    ],
  },

  {
    type: 'carousel',
    name: 'Carrossel de Imagens', // Mais descritivo
    description: 'Galeria de imagens deslizante.',
    icon: 'GalleryHorizontalEnd', // Corrigido para o nome Lucide correto
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

  // Categoria: Interação
  {
    type: 'button',
    name: 'Botão',
    description: 'Botão de ação personalizável.',
    icon: 'RectangleHorizontal', // Corrigido para o nome Lucide correto
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

  {
    type: 'form-input', // Renomeado para 'form-input' para clareza
    name: 'Campo de Entrada',
    description: 'Input de texto genérico para formulários.',
    icon: 'TextCursorInput', // Corrigido para o nome Lucide correto
    category: 'Formulário', // Nova categoria
    propertiesSchema: [
      { key: 'label', label: 'Rótulo', type: 'text-input', placeholder: 'Nome Completo' },
      { key: 'placeholder', label: 'Placeholder', type: 'text-input', placeholder: 'Digite seu nome aqui...' },
      {
        key: 'inputType', // Renomeado de 'type' para 'inputType' para evitar conflito com BlockDefinition.type
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

  // Categoria: UI
  {
    type: 'spacer',
    name: 'Espaçador',
    description: 'Adiciona espaço em branco entre blocos.',
    icon: 'StretchHorizontal', // Corrigido para o nome Lucide correto
    category: 'UI',
    propertiesSchema: [
      {
        key: 'height',
        label: 'Altura',
        type: 'text-input',
        placeholder: '50px, 2rem, etc.',
        defaultValue: '50px'
      },
      { key: 'backgroundColor', label: 'Cor de Fundo', type: 'color-picker', defaultValue: 'transparent' },
      { key: 'borderStyle', label: 'Estilo da Borda', type: 'select', defaultValue: 'none',
        options: [
          { label: 'Nenhum', value: 'none' },
          { label: 'Sólida', value: 'solid' },
          { label: 'Tracejada', value: 'dashed' },
          { label: 'Pontilhada', value: 'dotted' },
        ]
      },
      { key: 'borderColor', label: 'Cor da Borda', type: 'color-picker', defaultValue: '#facc15' },
    ],
  },

  {
    type: 'alert',
    name: 'Alerta',
    description: 'Caixa de mensagem de alerta com diferentes variantes.',
    icon: 'TriangleAlert', // Corrigido para o nome Lucide correto
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
    type: 'loader', // Renomeado de 'loader' para 'loader' para consistência
    name: 'Indicador de Carregamento', // Mais descritivo
    description: 'Indicador de carregamento animado.',
    icon: 'LoaderCircle', // Corrigido para o nome Lucide correto
    category: 'UI',
    propertiesSchema: [
      { key: 'message', label: 'Mensagem', type: 'text-input', placeholder: 'Carregando...' },
      {
        key: 'animationType', // Renomeado de 'type' para 'animationType' para evitar conflito
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
    type: 'confetti',
    name: 'Efeito Confetti', // Mais descritivo
    description: 'Efeito visual de confete.',
    icon: 'Sparkles', // Corrigido para o nome Lucide correto
    category: 'UI',
    isNew: true,
    propertiesSchema: [
      { key: 'duration', label: 'Duração (ms)', type: 'number-input', defaultValue: 3000, min: 500, description: 'Tempo que o confete fica visível.' },
      { key: 'particleCount', label: 'Contagem de Partículas', type: 'number-input', defaultValue: 100, min: 10, max: 500, description: 'Número de partículas de confete.' },
    ],
  },

  {
    type: 'marquee',
    name: 'Marquise (Texto Rolante)', // Mais descritivo
    description: 'Texto rolando horizontalmente.',
    icon: 'ArrowRightLeft', // Corrigido para o nome Lucide correto
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
    type: 'options-grid',
    name: 'Grid de Opções',
    description: 'Exibe opções em um formato de grade, ideal para seleção visual com imagens grandes.',
    icon: 'Rows3',
    category: 'UI',
    propertiesSchema: [
      { key: 'title', label: 'Título da Seção', type: 'text-input', placeholder: 'Escolha sua opção:', defaultValue: '' },
      {
        key: 'options',
        label: 'Opções',
        type: 'array-editor',
        itemSchema: [
          { key: 'id', label: 'ID da Opção', type: 'text-input', placeholder: 'opcao-1', defaultValue: '' },
          { key: 'text', label: 'Texto da Opção (HTML permitido)', type: 'textarea', placeholder: 'A) <strong>Texto</strong> da opção', defaultValue: '' },
          { key: 'value', label: 'Valor da Opção', type: 'text-input', placeholder: 'valor-opcao', defaultValue: '' },
          { key: 'imageUrl', label: 'URL da Imagem', type: 'image-url', placeholder: 'https://example.com/option1.jpg', defaultValue: '' },
          { key: 'category', label: 'Categoria', type: 'text-input', placeholder: 'categoria-estilo', defaultValue: '' },
        ],
        defaultValue: [
          { id: 'opcao-1', text: 'Opção 1', value: 'opcao-1', imageUrl: '', category: '' },
          { id: 'opcao-2', text: 'Opção 2', value: 'opcao-2', imageUrl: '', category: '' }
        ]
      },
      { key: 'columns', label: 'Colunas (Grade)', type: 'number-input', min: 1, max: 4, defaultValue: 2 },
      { key: 'showImages', label: 'Mostrar Imagens', type: 'boolean-switch', defaultValue: true },
      { key: 'imageSize', label: 'Tamanho das Imagens', type: 'select', options: [
        { label: 'Pequeno', value: 'small' },
        { label: 'Médio', value: 'medium' },
        { label: 'Grande', value: 'large' }
      ], defaultValue: 'large' },
      { key: 'multipleSelection', label: 'Seleção Múltipla', type: 'boolean-switch', defaultValue: false },
      { key: 'maxSelections', label: 'Máximo de Seleções', type: 'number-input', min: 1, max: 10, defaultValue: 1 },
      { key: 'minSelections', label: 'Mínimo de Seleções', type: 'number-input', min: 1, max: 10, defaultValue: 1 },
      { key: 'validationMessage', label: 'Mensagem de Validação', type: 'text-input', placeholder: 'Selecione uma opção', defaultValue: 'Selecione uma opção' },
      { key: 'gridGap', label: 'Espaçamento (px)', type: 'number-input', min: 4, max: 32, defaultValue: 16 },
      { key: 'selectedOptions', label: 'Opções Selecionadas', type: 'array-editor', itemSchema: [
        { key: 'value', label: 'ID da Opção', type: 'text-input', placeholder: 'opcao-1', defaultValue: '' }
      ], defaultValue: [] },
    ],
  },

  // Categoria: Gráficos
  {
    type: 'chart-area',
    name: 'Gráfico de Área',
    description: 'Gráfico de área para visualizar dados.',
    icon: 'ChartArea', // Corrigido para o nome Lucide correto
    category: 'Gráficos',
    propertiesSchema: [
      { key: 'title', label: 'Título do Gráfico', type: 'text-input', placeholder: 'Gráfico de Área' },
      { key: 'data', label: 'Dados (JSON)', type: 'json-editor', placeholder: '[{"x": 1, "y": 10}, {"x": 2, "y": 20}]', description: 'Array de objetos com dados para o gráfico.' },
      { key: 'xAxisKey', label: 'Chave do Eixo X', type: 'text-input', placeholder: 'x', defaultValue: 'x' },
      { key: 'yAxisKey', label: 'Chave do Eixo Y', type: 'text-input', placeholder: 'y', defaultValue: 'y' },
    ],
  },

  {
    type: 'chart-compare',
    name: 'Gráfico de Comparação', // Mais descritivo
    description: 'Gráfico de comparação de dois valores.',
    icon: 'AlignHorizontalDistributeEnd', // Corrigido para o nome Lucide correto
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
    type: 'chart-level',
    name: 'Indicador de Nível', // Mais descritivo
    description: 'Indicador circular de nível ou progresso.',
    icon: 'SlidersHorizontal', // Corrigido para o nome Lucide correto
    category: 'Gráficos',
    propertiesSchema: [
      { key: 'value', label: 'Valor (%)', type: 'number-input', defaultValue: 75, min: 0, max: 100 },
      { key: 'label', label: 'Rótulo', type: 'text-input', placeholder: 'Nível de Progresso' },
      { key: 'color', label: 'Cor Principal', type: 'color-picker', defaultValue: '#3b82f6' },
      { key: 'backgroundColor', label: 'Cor de Fundo', type: 'color-picker', defaultValue: '#e0e7ff' },
    ],
  },

  // Categoria: Social
  {
    type: 'arguments',
    name: 'Argumentos/Benefícios', // Mais descritivo
    description: 'Lista de argumentos ou benefícios com ícones.',
    icon: 'Book', // Corrigido para o nome Lucide correto
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
    type: 'quote',
    name: 'Citação',
    description: 'Um bloco de citação com autor.',
    icon: 'Quote', // Corrigido para o nome Lucide correto
    category: 'Social',
    propertiesSchema: [
      { key: 'text', label: 'Texto da Citação', type: 'textarea', placeholder: 'A vida é o que acontece enquanto você está ocupado fazendo outros planos.', rows: 3 },
      { key: 'author', label: 'Autor', type: 'text-input', placeholder: 'John Lennon' },
    ],
  },

  // Categoria: Credibilidade
  {
    type: 'testimonials-grid',
    name: 'Grade de Depoimentos',
    description: 'Seção com múltiplos depoimentos de clientes.',
    icon: 'Users', // Corrigido para o nome Lucide correto
    category: 'Credibilidade',
    propertiesSchema: [
      { key: 'title', label: 'Título da Seção', type: 'text-input', placeholder: 'O que nossos clientes dizem', defaultValue: 'Depoimentos' },
      {
        key: 'testimonials',
        label: 'Depoimentos',
        type: 'array-editor',
        defaultValue: [
          { name: 'Maria Silva', text: 'A consultoria mudou completamente minha relação com a moda!', rating: 5, image: 'https://placehold.co/100x100/cccccc/333333?text=Avatar', occupation: 'Empresária' }
        ],
        itemSchema: [
          { key: 'name', label: 'Nome', type: 'text-input' },
          { key: 'text', label: 'Depoimento', type: 'textarea', rows: 3 },
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
      { key: 'showRating', label: 'Mostrar Avaliações', type: 'boolean-switch', defaultValue: true }
    ],
  },

  {
    type: 'faq-section',
    name: 'Perguntas Frequentes',
    description: 'Seção de FAQ com perguntas e respostas.',
    icon: 'HelpCircle', // Corrigido para o nome Lucide correto
    category: 'Credibilidade',
    propertiesSchema: [
      { key: 'title', label: 'Título da Seção', type: 'text-input', placeholder: 'Perguntas Frequentes', defaultValue: 'Dúvidas Frequentes' },
      {
        key: 'faqs',
        label: 'Perguntas e Respostas',
        type: 'array-editor',
        itemSchema: [
          { key: 'question', label: 'Pergunta', type: 'text-input', placeholder: 'Como funciona?' },
          { key: 'answer', label: 'Resposta', type: 'textarea', placeholder: 'Resposta detalhada...', rows: 3 },
        ],
      },
      { key: 'allowMultiple', label: 'Permitir Múltiplas Abertas', type: 'boolean-switch', defaultValue: false }
    ],
  },

  {
    type: 'guarantee-section', // Renomeado para consistência
    name: 'Seção de Garantia',
    description: 'Selo de garantia para transmitir confiança.',
    icon: 'Shield', // Corrigido para o nome Lucide correto
    category: 'Credibilidade',
    propertiesSchema: [
      { key: 'title', label: 'Título', type: 'text-input', defaultValue: 'Garantia Incondicional' },
      { key: 'guaranteeText', label: 'Texto da Garantia', type: 'textarea', rows: 3, defaultValue: 'Se você não ficar 100% satisfeita com sua transformação, devolvemos seu dinheiro.' },
      { key: 'guaranteePeriod', label: 'Período de Garantia', type: 'text-input', defaultValue: '30 dias' },
      { key: 'guaranteeIcon', label: 'Ícone da Garantia', type: 'image-url', placeholder: 'https://...' },
      { key: 'showMoneyBackBadge', label: 'Mostrar Selo "Dinheiro de Volta"', type: 'boolean-switch', defaultValue: true }, // Corrigido o nome da chave
      { key: 'additionalInfo', label: 'Informações Adicionais', type: 'textarea', rows: 2, placeholder: 'Termos e condições adicionais' }
    ],
  },

  // Categoria: Vendas
  {
    type: 'product-carousel',
    name: 'Carrossel de Produtos',
    description: 'Carrossel responsivo com produtos e CTAs.',
    icon: 'ShoppingCart',
    category: 'Vendas',
    propertiesSchema: [
      { key: 'title', label: 'Título', type: 'text-input', defaultValue: 'Nossos Produtos' },
      { key: 'subtitle', label: 'Subtítulo', type: 'text-input', defaultValue: '' },
      {
        key: 'products',
        label: 'Produtos',
        type: 'array-editor',
        defaultValue: [
          { id: '1', name: 'Produto 1', description: 'Descrição do produto', price: 'R$ 97,00', image: 'https://placehold.co/400x300', ctaText: 'Comprar Agora' }
        ],
        itemSchema: [
          { key: 'id', label: 'ID', type: 'text-input' },
          { key: 'name', label: 'Nome', type: 'text-input' },
          { key: 'description', label: 'Descrição', type: 'textarea', rows: 2 },
          { key: 'price', label: 'Preço', type: 'text-input' },
          { key: 'originalPrice', label: 'Preço Original', type: 'text-input' },
          { key: 'discount', label: 'Desconto', type: 'text-input' },
          { key: 'image', label: 'Imagem', type: 'image-url' },
          { key: 'rating', label: 'Avaliação (1-5)', type: 'number-input', min: 1, max: 5 },
          { key: 'reviews', label: 'Número de Avaliações', type: 'number-input' },
          { key: 'ctaText', label: 'Texto do Botão', type: 'text-input' },
          { key: 'ctaUrl', label: 'URL do Botão', type: 'text-input' }
        ]
      },
      { key: 'itemsPerView', label: 'Items por Visualização', type: 'number-input', min: 1, max: 4, defaultValue: 3 },
      { key: 'showArrows', label: 'Mostrar Setas', type: 'boolean-switch', defaultValue: true },
      { key: 'showDots', label: 'Mostrar Pontos', type: 'boolean-switch', defaultValue: true },
      { key: 'autoplay', label: 'Autoplay', type: 'boolean-switch', defaultValue: false },
      { key: 'autoplayInterval', label: 'Intervalo Autoplay (ms)', type: 'number-input', defaultValue: 5000 }
    ],
  },

  {
    type: 'before-after',
    name: 'Antes e Depois',
    description: 'Comparação interativa antes e depois.',
    icon: 'ArrowRightLeft',
    category: 'Vendas',
    propertiesSchema: [
      { key: 'title', label: 'Título', type: 'text-input', defaultValue: 'Transformação' },
      { key: 'subtitle', label: 'Subtítulo', type: 'text-input', defaultValue: '' },
      { key: 'beforeImage', label: 'Imagem Antes', type: 'image-url', placeholder: 'https://example.com/before.jpg' },
      { key: 'afterImage', label: 'Imagem Depois', type: 'image-url', placeholder: 'https://example.com/after.jpg' },
      { key: 'beforeLabel', label: 'Label Antes', type: 'text-input', defaultValue: 'Antes' },
      { key: 'afterLabel', label: 'Label Depois', type: 'text-input', defaultValue: 'Depois' },
      { key: 'beforeDescription', label: 'Descrição Antes', type: 'textarea', rows: 3 },
      { key: 'afterDescription', label: 'Descrição Depois', type: 'textarea', rows: 3 },
      { key: 'showLabels', label: 'Mostrar Labels', type: 'boolean-switch', defaultValue: true },
      { key: 'showDescriptions', label: 'Mostrar Descrições', type: 'boolean-switch', defaultValue: true },
      { key: 'sliderPosition', label: 'Posição Inicial do Slider (%)', type: 'number-input', min: 0, max: 100, defaultValue: 50 }
    ],
  },

  {
    type: 'two-columns',
    name: 'Duas Colunas',
    description: 'Layout flexível de duas colunas.',
    icon: 'Rows3',
    category: 'Vendas',
    propertiesSchema: [
      { key: 'title', label: 'Título', type: 'text-input', defaultValue: '' },
      { key: 'subtitle', label: 'Subtítulo', type: 'text-input', defaultValue: '' },
      {
        key: 'columnRatio',
        label: 'Proporção das Colunas',
        type: 'select',
        options: [
          { label: '50% - 50%', value: '50-50' },
          { label: '60% - 40%', value: '60-40' },
          { label: '40% - 60%', value: '40-60' },
          { label: '70% - 30%', value: '70-30' },
          { label: '30% - 70%', value: '30-70' }
        ],
        defaultValue: '50-50'
      },
      {
        key: 'verticalAlignment',
        label: 'Alinhamento Vertical',
        type: 'select',
        options: [
          { label: 'Topo', value: 'top' },
          { label: 'Centro', value: 'center' },
          { label: 'Base', value: 'bottom' }
        ],
        defaultValue: 'top'
      },
      { key: 'gap', label: 'Espaçamento (px)', type: 'number-input', min: 0, max: 100, defaultValue: 32 },
      { key: 'mobileStack', label: 'Empilhar no Mobile', type: 'boolean-switch', defaultValue: true }
    ],
  },

  {
    type: 'pros-cons',
    name: 'Prós e Contras',
    description: 'Lista de vantagens e desvantagens.',
    icon: 'Scale',
    category: 'Vendas',
    propertiesSchema: [
      { key: 'title', label: 'Título', type: 'text-input', defaultValue: 'Prós e Contras' },
      { key: 'subtitle', label: 'Subtítulo', type: 'text-input', defaultValue: '' },
      { key: 'prosTitle', label: 'Título dos Prós', type: 'text-input', defaultValue: 'Vantagens' },
      { key: 'consTitle', label: 'Título dos Contras', type: 'text-input', defaultValue: 'Desvantagens' },
      {
        key: 'pros',
        label: 'Lista de Prós',
        type: 'array-editor',
        defaultValue: [
          { id: '1', text: 'Vantagem 1', highlight: false }
        ],
        itemSchema: [
          { key: 'id', label: 'ID', type: 'text-input' },
          { key: 'text', label: 'Texto', type: 'text-input' },
          { key: 'icon', label: 'Ícone', type: 'text-input' },
          { key: 'highlight', label: 'Destacar', type: 'boolean-switch' }
        ]
      },
      {
        key: 'cons',
        label: 'Lista de Contras',
        type: 'array-editor',
        defaultValue: [
          { id: '1', text: 'Desvantagem 1', severity: 'low' }
        ],
        itemSchema: [
          { key: 'id', label: 'ID', type: 'text-input' },
          { key: 'text', label: 'Texto', type: 'text-input' },
          { key: 'icon', label: 'Ícone', type: 'text-input' },
          { key: 'severity', label: 'Gravidade', type: 'select', options: [
            { label: 'Baixa', value: 'low' },
            { label: 'Média', value: 'medium' },
            { label: 'Alta', value: 'high' }
          ]}
        ]
      },
      {
        key: 'layout',
        label: 'Layout',
        type: 'select',
        options: [
          { label: 'Lado a Lado', value: 'side-by-side' },
          { label: 'Empilhado', value: 'stacked' }
        ],
        defaultValue: 'side-by-side'
      },
      { key: 'showIcons', label: 'Mostrar Ícones', type: 'boolean-switch', defaultValue: true }
    ],
  },

  {
    type: 'dynamic-pricing',
    name: 'Preços Dinâmicos',
    description: 'Tabela de preços flexível e responsiva.',
    icon: 'CircleDollarSign',
    category: 'Vendas',
    propertiesSchema: [
      { key: 'title', label: 'Título', type: 'text-input', defaultValue: 'Escolha seu Plano' },
      { key: 'subtitle', label: 'Subtítulo', type: 'text-input', defaultValue: '' },
      {
        key: 'plans',
        label: 'Planos',
        type: 'array-editor',
        defaultValue: [
          { id: '1', name: 'Básico', price: '97', features: ['Recurso 1', 'Recurso 2'], ctaText: 'Escolher Plano' }
        ],
        itemSchema: [
          { key: 'id', label: 'ID', type: 'text-input' },
          { key: 'name', label: 'Nome do Plano', type: 'text-input' },
          { key: 'description', label: 'Descrição', type: 'text-input' },
          { key: 'price', label: 'Preço', type: 'text-input' },
          { key: 'originalPrice', label: 'Preço Original', type: 'text-input' },
          { key: 'period', label: 'Período', type: 'text-input' },
          { key: 'discount', label: 'Desconto', type: 'text-input' },
          { key: 'badge', label: 'Badge', type: 'text-input' },
          { key: 'badgeColor', label: 'Cor do Badge', type: 'color-picker' },
          { key: 'ctaText', label: 'Texto do Botão', type: 'text-input' },
          { key: 'ctaUrl', label: 'URL do Botão', type: 'text-input' },
          { key: 'isPopular', label: 'Mais Popular', type: 'boolean-switch' },
          { key: 'isRecommended', label: 'Recomendado', type: 'boolean-switch' }
        ]
      },
      {
        key: 'layout',
        label: 'Layout',
        type: 'select',
        options: [
          { label: 'Cards', value: 'cards' },
          { label: 'Tabela', value: 'table' },
          { label: 'Minimal', value: 'minimal' }
        ],
        defaultValue: 'cards'
      },
      { key: 'currency', label: 'Moeda', type: 'text-input', defaultValue: 'R$' }
    ],
  },

                                  {
    type: 'value-anchoring',
    name: 'Ancoragem de Valor',
    description: 'Demonstração de valor e ROI.',
    icon: 'Target',
    category: 'Vendas',
    propertiesSchema: [
      { key: 'title', label: 'Título', type: 'text-input', defaultValue: 'Valor Investido vs Retorno' },
      { key: 'subtitle', label: 'Subtítulo', type: 'text-input', defaultValue: '' },
      {
        key: 'anchoringType',
        label: 'Tipo de Ancoragem',
        type: 'select',
        options: [
          { label: 'Comparação de Preços', value: 'price-comparison' },
          { label: 'Valor do Tempo', value: 'time-value' },
          { label: 'Análise de Custos', value: 'cost-analysis' },
          { label: 'Calculadora ROI', value: 'roi-calculator' }
        ],
        defaultValue: 'price-comparison'
      },
      { key: 'mainValue', label: 'Valor Principal', type: 'text-input', defaultValue: 'R$ 97,00' },
      { key: 'comparisonValue', label: 'Valor de Comparação', type: 'text-input', defaultValue: 'R$ 2.970,00' },
      { key: 'period', label: 'Período', type: 'text-input', defaultValue: '' },
      { key: 'description', label: 'Descrição', type: 'textarea', rows: 3 },
      { key: 'highlightSavings', label: 'Destacar Economia', type: 'boolean-switch', defaultValue: true },
      { key: 'savingsText', label: 'Texto da Economia', type: 'text-input', defaultValue: 'Economia de 96%' },
      {
        key: 'visualType',
        label: 'Tipo Visual',
        type: 'select',
        options: [
          { label: 'Comparação', value: 'comparison' },
          { label: 'Cards', value: 'cards' },
          { label: 'Gráfico', value: 'chart' },
          { label: 'Calculadora', value: 'calculator' }
        ],
        defaultValue: 'comparison'
      }
    ],
  },

  {
    type: 'sales-offer',
    name: 'Oferta de Vendas',
    description: 'Apresentação da oferta principal com preços.',
    icon: 'ShoppingCart', // Corrigido para o nome Lucide correto
    category: 'Vendas',
    propertiesSchema: [
      { key: 'productName', label: 'Nome do Produto/Serviço', type: 'text-input', defaultValue: 'Consultoria de Estilo Personalizada' },
      { key: 'headline', label: 'Título Principal', type: 'textarea', rows: 2, defaultValue: 'Transforme seu guarda-roupa com consultoria personalizada' },
      { key: 'description', label: 'Descrição da Oferta', type: 'textarea', rows: 4, defaultValue: 'Receba um plano completo e personalizado para potencializar seu estilo único' },
      { key: 'originalPrice', label: 'Preço Original', type: 'number-input', defaultValue: 497 },
      { key: 'currentPrice', label: 'Preço Promocional', type: 'number-input', defaultValue: 197 },
      { key: 'currency', label: 'Moeda', type: 'text-input', defaultValue: 'R$' },
      { key: 'showDiscount', label: 'Mostrar % de Desconto', type: 'boolean-switch', defaultValue: true },
      {
        key: 'features',
        label: 'Características/Benefícios',
        type: 'array-editor',
        defaultValue: [
          { text: 'Análise completa do seu estilo', highlight: false },
          { text: 'Cartela de cores personalizada', highlight: false },
          { text: 'Guia de compras direcionado', highlight: false },
          { text: 'Suporte por 30 dias', highlight: false }
        ],
        itemSchema: [
          { key: 'text', label: 'Benefício', type: 'text-input' },
          { key: 'highlight', label: 'Destacar', type: 'boolean-switch' }
        ]
      },
      { key: 'ctaText', label: 'Texto do Botão', type: 'text-input', defaultValue: 'Quero Transformar Meu Estilo Agora' },
      { key: 'urgencyText', label: 'Texto de Urgência', type: 'text-input', defaultValue: 'Oferta limitada por tempo!' }
    ],
  },

  {
    type: 'urgency-timer',
    name: 'Timer de Urgência',
    description: 'Contador regressivo para criar urgência.',
    icon: 'Clock', // Corrigido para o nome Lucide correto
    category: 'Vendas',
    propertiesSchema: [
      { key: 'title', label: 'Título', type: 'text-input', defaultValue: 'Oferta expira em:' },
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
      { key: 'duration', label: 'Duração (minutos)', type: 'number-input', defaultValue: 30, min: 1, max: 60, description: 'Para timer evergreen' },
      { key: 'endDate', label: 'Data de Fim', type: 'text-input', placeholder: 'YYYY-MM-DD HH:MM', description: 'Para timer de data específica' },
      { key: 'expiredText', label: 'Texto Quando Expira', type: 'text-input', defaultValue: 'Oferta Expirada' },
      { key: 'showLabels', label: 'Mostrar Labels (dias, horas, etc)', type: 'boolean-switch', defaultValue: true },
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
    ],
  },

  {
    type: 'bonus-section',
    name: 'Seção de Bônus',
    description: 'Bônus adicionais para aumentar o valor percebido.',
    icon: 'Gift', // Corrigido para o nome Lucide correto
    category: 'Vendas',
    propertiesSchema: [
      { key: 'title', label: 'Título', type: 'text-input', defaultValue: 'Bônus Exclusivos' },
      { key: 'subtitle', label: 'Subtítulo', type: 'text-input', defaultValue: 'Além da consultoria, você também recebe:' },
      {
        key: 'bonuses',
        label: 'Lista de Bônus',
        type: 'array-editor',
        defaultValue: [
          { name: 'Guia de Maquiagem', description: 'Técnicas para valorizar seu estilo', value: 97, image: 'https://placehold.co/100x100/cccccc/333333?text=Bonus' }
        ],
        itemSchema: [
          { key: 'name', label: 'Nome do Bônus', type: 'text-input' },
          { key: 'description', label: 'Descrição', type: 'textarea', rows: 2 },
          { key: 'value', label: 'Valor (R$)', type: 'number-input' },
          { key: 'image', label: 'Imagem', type: 'image-url' }
        ]
      },
      { key: 'showValues', label: 'Mostrar Valores dos Bônus', type: 'boolean-switch', defaultValue: true },
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
    ],
  },

  // Categoria: Outros (para blocos genéricos ou de integração)
  {
    type: 'script',
    name: 'Script Personalizado', // Mais descritivo
    description: 'Insere código JavaScript customizado na página.',
    icon: 'Code', // Corrigido para o nome Lucide correto
    category: 'Outros',
    propertiesSchema: [
      { key: 'code', label: 'Código JavaScript', type: 'textarea', rows: 10, placeholder: 'console.log("Olá mundo!");', description: 'Insira o código JS que será injetado na página.' },
      {
        key: 'placement',
        label: 'Posicionamento',
        type: 'select',
        options: [
          { label: 'Head', value: 'head' },
          { label: 'Body (Início)', value: 'body-start' },
          { label: 'Body (Fim)', value: 'body-end' }
        ],
        defaultValue: 'body-end'
      },
    ],
  },

  {
    type: 'terms',
    name: 'Termos e Condições', // Mais descritivo
    description: 'Bloco de termos e condições ou aviso legal.',
    icon: 'Scale', // Corrigido para o nome Lucide correto
    category: 'Outros',
    propertiesSchema: [
      { key: 'title', label: 'Título', type: 'text-input', defaultValue: 'Termos e Condições' },
      { key: 'content', label: 'Conteúdo', type: 'textarea', rows: 5, defaultValue: 'Leia nossos termos de uso...' }
    ],
  },

  // Outros blocos (mantidos e ajustados)
  {
    type: 'list',
    name: 'Lista de Itens', // Mais descritivo
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
    type: 'chart-compare',
    name: 'Gráfico de Comparação',
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
    type: 'confetti',
    name: 'Efeito Confetti',
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
    type: 'marquee',
    name: 'Marquise (Texto Rolante)',
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
    type: 'script',
    name: 'Script Personalizado',
    description: 'Insere código JavaScript customizado na página.',
    icon: 'Code',
    category: 'Outros',
    propertiesSchema: [
      { key: 'code', label: 'Código JavaScript', type: 'textarea', rows: 10, placeholder: 'console.log("Olá mundo!");', description: 'Insira o código JS que será injetado na página.' },
      {
        key: 'placement',
        label: 'Posicionamento',
        type: 'select',
        options: [{ label: 'Head', value: 'head' }, { label: 'Body (Início)', value: 'body-start' }, { label: 'Body (Fim)', value: 'body-end' }],
        defaultValue: 'body-end'
      },
    ],
  },

  {
    type: 'terms',
    name: 'Termos e Condições',
    description: 'Bloco de termos e condições ou aviso legal.',
    icon: 'Scale',
    category: 'Outros',
    propertiesSchema: [
      { key: 'title', label: 'Título', type: 'text-input', defaultValue: 'Termos e Condições' },
      { key: 'content', label: 'Conteúdo', type: 'textarea', rows: 5, defaultValue: 'Leia nossos termos de uso...' }
    ],
  },

  // Outros blocos de gráfico (mantidos e ajustados)
  {
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
    type: 'chart-level',
    name: 'Indicador de Nível',
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

  // =====================================================================
  // BLOCOS ESPECÍFICOS DO QUIZ - MODULARES E SCHEMA-DRIVEN
  // =====================================================================

  // Etapa 1: Blocos da Introdução
  {
    type: 'quiz-intro-header',
    name: 'Cabeçalho do Quiz',
    description: 'Cabeçalho com logo, barra de progresso e botão voltar',
    icon: 'Crown',
    category: 'Quiz',
    propertiesSchema: [
      { key: 'logoUrl', label: 'URL do Logo', type: 'image-url', defaultValue: 'https://cakto-quiz-br01.b-cdn.net/uploads/47fd613e-91a9-48cf-bd52-a9d4e180d5ab.png' },
      { key: 'logoAlt', label: 'Texto Alt do Logo', type: 'text-input', defaultValue: 'Logo' },
      { key: 'logoWidth', label: 'Largura do Logo', type: 'number-input', defaultValue: 96, min: 30, max: 200 },
      { key: 'logoHeight', label: 'Altura do Logo', type: 'number-input', defaultValue: 96, min: 30, max: 200 },
      { key: 'progressValue', label: 'Valor do Progresso', type: 'number-input', defaultValue: 0, min: 0, max: 100 },
      { key: 'progressMax', label: 'Máximo do Progresso', type: 'number-input', defaultValue: 100, min: 1, max: 100 },
      { key: 'showBackButton', label: 'Mostrar Botão Voltar', type: 'boolean-switch', defaultValue: true },
    ],
  },

  {
    type: 'quiz-title',
    name: 'Título do Quiz',
    description: 'Título principal do quiz com formatação customizável',
    icon: 'Type',
    category: 'Quiz',
    propertiesSchema: [
      { key: 'title', label: 'Título', type: 'text-input', defaultValue: 'Teste de Estilo Pessoal' },
      { key: 'fontSize', label: 'Tamanho da Fonte', type: 'select', options: [
        { label: 'Pequeno', value: 'text-lg' },
        { label: 'Médio', value: 'text-2xl' },
        { label: 'Grande', value: 'text-3xl' },
        { label: 'Extra Grande', value: 'text-4xl' },
      ], defaultValue: 'text-3xl' },
      { key: 'fontWeight', label: 'Peso da Fonte', type: 'select', options: [
        { label: 'Normal', value: 'font-normal' },
        { label: 'Médio', value: 'font-medium' },
        { label: 'Semibold', value: 'font-semibold' },
        { label: 'Bold', value: 'font-bold' },
      ], defaultValue: 'font-bold' },
      { key: 'textAlign', label: 'Alinhamento', type: 'select', options: [
        { label: 'Esquerda', value: 'text-left' },
        { label: 'Centro', value: 'text-center' },
        { label: 'Direita', value: 'text-right' },
      ], defaultValue: 'text-center' },
      { key: 'color', label: 'Cor do Texto', type: 'color-picker', defaultValue: '#374151' },
    ],
  },

  {
    type: 'quiz-name-input',
    name: 'Campo de Nome do Quiz',
    description: 'Campo para coleta do nome do usuário',
    icon: 'TextCursorInput',
    category: 'Quiz',
    propertiesSchema: [
      { key: 'label', label: 'Rótulo', type: 'text-input', defaultValue: 'NOME' },
      { key: 'placeholder', label: 'Placeholder', type: 'text-input', defaultValue: 'Digite seu nome aqui...' },
      { key: 'required', label: 'Campo Obrigatório', type: 'boolean-switch', defaultValue: true },
      { key: 'inputType', label: 'Tipo de Input', type: 'select', options: [
        { label: 'Texto', value: 'text' },
        { label: 'Email', value: 'email' },
        { label: 'Telefone', value: 'tel' },
      ], defaultValue: 'text' },
      { key: 'helperText', label: 'Texto de Ajuda', type: 'text-input', defaultValue: '' },
    ],
  },

  // Etapas 2-11: Blocos das Questões Principais
  {
    type: 'quiz-question-main',
    name: 'Questão Principal do Quiz',
    description: 'Questão principal com opções múltiplas e imagens',
    icon: 'HelpCircle',
    category: 'Quiz',
    propertiesSchema: [
      { key: 'question', label: 'Pergunta', type: 'textarea', defaultValue: 'Qual é a sua preferência?', rows: 3 },
      { key: 'options', label: 'Opções', type: 'array-editor', defaultValue: [], itemSchema: [
        { key: 'id', label: 'ID', type: 'text-input', placeholder: 'opcao-1' },
        { key: 'text', label: 'Texto', type: 'text-input', placeholder: 'Opção 1' },
        { key: 'value', label: 'Valor', type: 'text-input', placeholder: 'valor-1' },
        { key: 'imageUrl', label: 'URL da Imagem', type: 'image-url', placeholder: 'https://...' },
        { key: 'category', label: 'Categoria/Perfil', type: 'text-input', placeholder: 'natural' },
      ]},
      { key: 'multipleSelection', label: 'Múltipla Seleção', type: 'boolean-switch', defaultValue: true },
      { key: 'maxSelections', label: 'Máximo de Seleções', type: 'number-input', defaultValue: 3, min: 1, max: 10 },
      { key: 'showImages', label: 'Mostrar Imagens', type: 'boolean-switch', defaultValue: true },
      { key: 'progressLabel', label: 'Rótulo do Progresso', type: 'text-input', defaultValue: 'Questão 1 de 10' },
      { key: 'progressValue', label: 'Valor do Progresso', type: 'number-input', defaultValue: 10, min: 0, max: 100 },
    ],
  },

  // Etapa 12: Bloco da Transição Principal
  {
    type: 'quiz-transition-main',
    name: 'Transição Principal',
    description: 'Página de transição entre questões principais e estratégicas',
    icon: 'ArrowRightLeft',
    category: 'Quiz',
    propertiesSchema: [
      { key: 'title', label: 'Título', type: 'text-input', defaultValue: '🕐 Enquanto calculamos o seu resultado...' },
      { key: 'message', label: 'Mensagem Principal', type: 'textarea', defaultValue: 'Queremos te fazer algumas perguntas que vão tornar sua experiência ainda mais completa.', rows: 3 },
      { key: 'submessage', label: 'Submensagem', type: 'textarea', defaultValue: 'A ideia é simples: te ajudar a enxergar com mais clareza onde você está agora — e para onde pode ir com mais intenção, leveza e autenticidade.', rows: 4 },
      { key: 'additionalMessage', label: 'Mensagem Adicional', type: 'textarea', defaultValue: '💬 Responda com sinceridade. Isso é só entre você e a sua nova versão.', rows: 2 },
      { key: 'progressValue', label: 'Valor do Progresso', type: 'number-input', defaultValue: 60, min: 0, max: 100 },
    ],
  },

  // Etapas 13-18: Blocos das Questões Estratégicas
  {
    type: 'quiz-question-strategic',
    name: 'Questão Estratégica',
    description: 'Questão estratégica para qualificação e segmentação',
    icon: 'Brain',
    category: 'Quiz',
    propertiesSchema: [
      { key: 'question', label: 'Pergunta', type: 'textarea', defaultValue: 'Como você se vê hoje?', rows: 3 },
      { key: 'subtitle', label: 'Subtítulo (opcional)', type: 'textarea', defaultValue: '', rows: 2 },
      { key: 'options', label: 'Opções', type: 'array-editor', defaultValue: [], itemSchema: [
        { key: 'id', label: 'ID', type: 'text-input', placeholder: '1' },
        { key: 'text', label: 'Texto', type: 'textarea', placeholder: 'Opção 1', rows: 2 },
        { key: 'value', label: 'Valor', type: 'text-input', placeholder: 'valor-1' },
      ]},
      { key: 'progressLabel', label: 'Rótulo do Progresso', type: 'text-input', defaultValue: 'Questão estratégica 1 de 6' },
      { key: 'progressValue', label: 'Valor do Progresso', type: 'number-input', defaultValue: 70, min: 0, max: 100 },
    ],
  },

  // Etapa 19: Bloco da Transição Final
  {
    type: 'quiz-transition-final',
    name: 'Transição Final',
    description: 'Página de transição final antes do resultado',
    icon: 'LoaderCircle',
    category: 'Quiz',
    propertiesSchema: [
      { key: 'title', label: 'Título', type: 'text-input', defaultValue: 'Obrigada por compartilhar...' },
      { key: 'message', label: 'Mensagem', type: 'textarea', defaultValue: 'Agora vamos preparar seu resultado personalizado com base em todas as suas respostas.', rows: 3 },
      { key: 'showLoading', label: 'Mostrar Carregamento', type: 'boolean-switch', defaultValue: true },
      { key: 'duration', label: 'Duração (ms)', type: 'number-input', defaultValue: 3000, min: 1000, max: 10000 },
      { key: 'progressValue', label: 'Valor do Progresso', type: 'number-input', defaultValue: 95, min: 0, max: 100 },
    ],
  },

  // Etapa 20: Página de Resultado Moderna
  {
    type: 'modern-result-page',
    name: 'Página de Resultado Moderna',
    description: 'Página completa de resultado do quiz com design moderno e animações',
    icon: 'Award',
    category: 'Quiz',
    propertiesSchema: [
      { key: 'logoUrl', label: 'URL do Logo', type: 'image-url', defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp' },
      { key: 'logoAlt', label: 'Texto Alt do Logo', type: 'text-input', defaultValue: 'Logo Gisele Galvão' },
      { key: 'logoHeight', label: 'Altura do Logo', type: 'text-input', defaultValue: '60px' },
      { key: 'userName', label: 'Nome do Usuário', type: 'text-input', defaultValue: 'Querida' },
      { key: 'primaryStyle', label: 'Estilo Predominante', type: 'select', options: [
        { label: 'Natural', value: 'natural' },
        { label: 'Clássico', value: 'classico' },
        { label: 'Contemporâneo', value: 'contemporaneo' },
        { label: 'Elegante', value: 'elegante' },
        { label: 'Romântico', value: 'romantico' },
        { label: 'Sexy', value: 'sexy' },
        { label: 'Dramático', value: 'dramatico' },
        { label: 'Criativo', value: 'criativo' },
      ], defaultValue: 'elegante' },
      { key: 'showStyleImage', label: 'Mostrar Imagem do Estilo', type: 'boolean-switch', defaultValue: true },
      { key: 'showCharacteristics', label: 'Mostrar Características', type: 'boolean-switch', defaultValue: true },
      { key: 'showSecondaryStyles', label: 'Mostrar Estilos Secundários', type: 'boolean-switch', defaultValue: true },
      { key: 'ctaText', label: 'Texto do Botão', type: 'text-input', defaultValue: 'DESCOBRIR MEU GUARDA-ROUPA IDEAL' },
      { key: 'ctaUrl', label: 'URL do Botão', type: 'text-input', defaultValue: '#oferta' },
      { key: 'backgroundColor', label: 'Cor de Fundo', type: 'color-picker', defaultValue: '#FFFBF7' },
      { key: 'accentColor', label: 'Cor de Destaque', type: 'color-picker', defaultValue: '#B89B7A' },
      { key: 'textColor', label: 'Cor do Texto', type: 'color-picker', defaultValue: '#432818' },
    ],
  },

  // Etapa 21: Página de Oferta do Quiz
  {
    type: 'quiz-offer-page',
    name: 'Página de Oferta do Quiz',
    description: 'Página completa de oferta com countdown, preços e depoimentos',
    icon: 'ShoppingCart',
    category: 'Quiz',
    propertiesSchema: [
      { key: 'logoUrl', label: 'URL do Logo', type: 'image-url', defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp' },
      { key: 'logoAlt', label: 'Texto Alt do Logo', type: 'text-input', defaultValue: 'Logo Gisele Galvão' },
      { key: 'logoHeight', label: 'Altura do Logo', type: 'text-input', defaultValue: '60px' },
      { key: 'title', label: 'Título Principal', type: 'text-input', defaultValue: 'Descubra Seu Estilo Predominante' },
      { key: 'subtitle', label: 'Subtítulo', type: 'text-input', defaultValue: 'Tenha finalmente um guarda-roupa que funciona 100%' },
      { key: 'heroImage', label: 'Imagem Hero', type: 'image-url', defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911574/ELEGANTE_PREDOMINANTE_awmgit.webp' },
      { key: 'countdownMinutes', label: 'Minutos do Countdown', type: 'number-input', defaultValue: 15, min: 1, max: 60 },
      { key: 'installmentPrice', label: 'Preço Parcelado', type: 'text-input', defaultValue: 'R$ 8,83' },
      { key: 'fullPrice', label: 'Preço à Vista', type: 'text-input', defaultValue: 'R$ 39,90' },
      { key: 'originalPrice', label: 'Preço Original', type: 'text-input', defaultValue: 'R$ 175,00' },
      { key: 'savings', label: 'Economia', type: 'text-input', defaultValue: '77% OFF - Economia de R$ 135,10' },
      { key: 'ctaText', label: 'Texto do Botão', type: 'text-input', defaultValue: 'QUERO DESCOBRIR MEU ESTILO AGORA' },
      { key: 'ctaUrl', label: 'URL do Botão', type: 'text-input', defaultValue: '#checkout' },
      { 
        key: 'benefits', 
        label: 'Lista de Benefícios', 
        type: 'array-editor', 
        defaultValue: [
          'Identifique seu estilo predominante em minutos',
          'Guia completo personalizado para seu perfil',
          'Dicas exclusivas de combinações',
          'Acesso a comunidade VIP',
          'Garantia de 7 dias',
          'Suporte especializado'
        ],
        itemSchema: [
          { key: 'text', label: 'Benefício', type: 'text-input', placeholder: 'Novo benefício' }
        ]
      },
      { 
        key: 'testimonials', 
        label: 'Depoimentos', 
        type: 'array-editor', 
        defaultValue: [
          { name: 'Marina S.', text: 'Finalmente entendi meu estilo! Agora me visto com muito mais confiança.', rating: 5 },
          { name: 'Juliana R.', text: 'O guia transformou completamente meu guarda-roupa. Vale cada centavo!', rating: 5 },
          { name: 'Carla M.', text: 'Nunca pensei que descobrir meu estilo seria tão fácil e prático.', rating: 5 }
        ],
        itemSchema: [
          { key: 'name', label: 'Nome', type: 'text-input', placeholder: 'Nome do cliente' },
          { key: 'text', label: 'Depoimento', type: 'textarea', placeholder: 'Texto do depoimento', rows: 3 },
          { key: 'rating', label: 'Avaliação (1-5)', type: 'number-input', min: 1, max: 5, defaultValue: 5 }
        ]
      },
      { 
        key: 'faqItems', 
        label: 'Perguntas Frequentes', 
        type: 'array-editor', 
        defaultValue: [
          { question: 'Como funciona o quiz?', answer: 'O quiz é baseado em metodologia científica de análise de estilo. Você responde perguntas sobre suas preferências e recebe um resultado personalizado.' },
          { question: 'O que está incluso no guia?', answer: 'Você recebe um guia completo com seu estilo predominante, dicas de combinações, paleta de cores ideal e muito mais.' },
          { question: 'Posso usar em qualquer idade?', answer: 'Sim! Nosso método funciona para mulheres de todas as idades e estilos de vida.' }
        ],
        itemSchema: [
          { key: 'question', label: 'Pergunta', type: 'text-input', placeholder: 'Pergunta frequente' },
          { key: 'answer', label: 'Resposta', type: 'textarea', placeholder: 'Resposta detalhada', rows: 3 }
        ]
      },
      { key: 'showTestimonials', label: 'Mostrar Depoimentos', type: 'boolean-switch', defaultValue: true },
      { key: 'showFaq', label: 'Mostrar FAQ', type: 'boolean-switch', defaultValue: true },
      { key: 'showGuarantee', label: 'Mostrar Garantia', type: 'boolean-switch', defaultValue: true },
      { key: 'backgroundColor', label: 'Cor de Fundo', type: 'color-picker', defaultValue: '#FFFBF7' },
      { key: 'accentColor', label: 'Cor de Destaque', type: 'color-picker', defaultValue: '#B89B7A' },
      { key: 'textColor', label: 'Cor do Texto', type: 'color-picker', defaultValue: '#432818' },
    ],
  },

  // =====================================================================
  // NOVOS COMPONENTES MODERNOS E REUTILIZÁVEIS
  // =====================================================================

  {
    type: 'product-carousel',
    name: 'Carrossel de Produtos',
    description: 'Carrossel interativo de produtos com animações e filtros.',
    icon: 'ShoppingCart',
    category: 'Vendas',
    isNew: true,
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        placeholder: 'Nossos Produtos Exclusivos',
        defaultValue: 'Nossos Produtos Exclusivos'
      },
      {
        key: 'subtitle',
        label: 'Subtítulo',
        type: 'textarea',
        placeholder: 'Descubra produtos selecionados especialmente para você',
        defaultValue: 'Descubra produtos selecionados especialmente para o seu estilo',
        rows: 2
      },
      {
        key: 'displayMode',
        label: 'Modo de Exibição',
        type: 'select',
        options: [
          { label: 'Grade', value: 'grid' },
          { label: 'Carrossel', value: 'carousel' },
          { label: 'Masonry', value: 'masonry' }
        ],
        defaultValue: 'carousel'
      },
      {
        key: 'slidesPerView',
        label: 'Produtos por Linha',
        type: 'number-input',
        min: 1,
        max: 4,
        defaultValue: 2
      },
      {
        key: 'cardStyle',
        label: 'Estilo dos Cards',
        type: 'select',
        options: [
          { label: 'Minimal', value: 'minimal' },
          { label: 'Elegante', value: 'elegant' },
          { label: 'Negrito', value: 'bold' },
          { label: 'Gradiente', value: 'gradient' }
        ],
        defaultValue: 'elegant'
      },
      {
        key: 'showPrices',
        label: 'Mostrar Preços',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'showRatings',
        label: 'Mostrar Avaliações',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'showFeatures',
        label: 'Mostrar Recursos',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'autoplay',
        label: 'Reprodução Automática',
        type: 'boolean-switch',
        defaultValue: false
      },
      {
        key: 'products',
        label: 'Produtos',
        type: 'array-editor',
        defaultValue: [],
        itemSchema: [
          { key: 'name', label: 'Nome', type: 'text-input' },
          { key: 'price', label: 'Preço', type: 'number-input' },
          { key: 'originalPrice', label: 'Preço Original', type: 'number-input' },
          { key: 'image', label: 'Imagem', type: 'image-url' },
          { key: 'category', label: 'Categoria', type: 'text-input' },
          { key: 'rating', label: 'Avaliação (1-5)', type: 'number-input', min: 1, max: 5 },
          { key: 'ctaText', label: 'Texto do Botão', type: 'text-input' }
        ]
      }
    ]
  },

  {
    type: 'comparison-table',
    name: 'Tabela de Comparação',
    description: 'Comparação avançada de planos e recursos.',
    icon: 'Scale',
    category: 'Vendas',
    isNew: true,
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        placeholder: 'Escolha o Plano Ideal',
        defaultValue: 'Escolha o Plano Ideal para Você'
      },
      {
        key: 'subtitle',
        label: 'Subtítulo',
        type: 'textarea',
        placeholder: 'Compare nossos planos...',
        defaultValue: 'Compare nossos planos e encontre o que melhor se adapta às suas necessidades',
        rows: 2
      },
      {
        key: 'displayMode',
        label: 'Modo de Exibição',
        type: 'select',
        options: [
          { label: 'Tabela', value: 'table' },
          { label: 'Cards', value: 'cards' },
          { label: 'Abas', value: 'tabs' }
        ],
        defaultValue: 'cards'
      },
      {
        key: 'showPrices',
        label: 'Mostrar Preços',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'showFeatures',
        label: 'Mostrar Recursos',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'highlightPopular',
        label: 'Destacar Popular',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'compactMode',
        label: 'Modo Compacto',
        type: 'boolean-switch',
        defaultValue: false
      }
    ]
  },

  {
    type: 'social-proof',
    name: 'Prova Social Avançada',
    description: 'Depoimentos, estatísticas e atividades ao vivo.',
    icon: 'Users',
    category: 'Credibilidade',
    isNew: true,
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        placeholder: 'Junte-se a Milhares de Clientes',
        defaultValue: 'Junte-se a Milhares de Mulheres Satisfeitas'
      },
      {
        key: 'subtitle',
        label: 'Subtítulo',
        type: 'textarea',
        placeholder: 'Veja o que nossos clientes estão dizendo...',
        defaultValue: 'Veja o que nossas clientes estão dizendo sobre suas transformações',
        rows: 2
      },
      {
        key: 'displayMode',
        label: 'Modo de Exibição',
        type: 'select',
        options: [
          { label: 'Grade', value: 'grid' },
          { label: 'Carrossel', value: 'carousel' },
          { label: 'Ticker', value: 'ticker' },
          { label: 'Masonry', value: 'masonry' }
        ],
        defaultValue: 'grid'
      },
      {
        key: 'layout',
        label: 'Layout',
        type: 'select',
        options: [
          { label: 'Compacto', value: 'compact' },
          { label: 'Detalhado', value: 'detailed' },
          { label: 'Minimal', value: 'minimal' }
        ],
        defaultValue: 'detailed'
      },
      {
        key: 'showStats',
        label: 'Mostrar Estatísticas',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'autoplay',
        label: 'Reprodução Automática',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'animateNumbers',
        label: 'Animar Números',
        type: 'boolean-switch',
        defaultValue: true
      }
    ]
  },

  {
    type: 'advanced-cta',
    name: 'CTA Avançado',
    description: 'Call-to-action com countdown, garantias e animações.',
    icon: 'Zap',
    category: 'Vendas',
    isNew: true,
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        placeholder: 'Transforme Seu Estilo Hoje',
        defaultValue: 'Transforme Seu Estilo Hoje Mesmo'
      },
      {
        key: 'subtitle',
        label: 'Subtítulo',
        type: 'text-input',
        placeholder: 'Descubra seu estilo único...',
        defaultValue: 'Descubra seu estilo único em poucos minutos'
      },
      {
        key: 'description',
        label: 'Descrição',
        type: 'textarea',
        placeholder: 'Faça o quiz gratuito...',
        defaultValue: 'Faça o quiz gratuito e receba um guia personalizado com tudo o que você precisa para se vestir com mais confiança e estilo.',
        rows: 3
      },
      {
        key: 'urgencyText',
        label: 'Texto de Urgência',
        type: 'text-input',
        placeholder: 'Mais de 200 mulheres fizeram hoje!',
        defaultValue: '⚡ Mais de 200 mulheres fizeram o quiz hoje!'
      },
      {
        key: 'variant',
        label: 'Variante',
        type: 'select',
        options: [
          { label: 'Padrão', value: 'standard' },
          { label: 'Hero', value: 'hero' },
          { label: 'Fixo', value: 'sticky' },
          { label: 'Flutuante', value: 'floating' },
          { label: 'Modal', value: 'modal' }
        ],
        defaultValue: 'standard'
      },
      {
        key: 'style',
        label: 'Estilo',
        type: 'select',
        options: [
          { label: 'Minimal', value: 'minimal' },
          { label: 'Negrito', value: 'bold' },
          { label: 'Gradiente', value: 'gradient' },
          { label: 'Contornado', value: 'outlined' },
          { label: 'Glassmorphism', value: 'glassmorphism' }
        ],
        defaultValue: 'gradient'
      },
      {
        key: 'animation',
        label: 'Animação',
        type: 'select',
        options: [
          { label: 'Nenhuma', value: 'none' },
          { label: 'Pulse', value: 'pulse' },
          { label: 'Bounce', value: 'bounce' },
          { label: 'Brilho', value: 'glow' },
          { label: 'Shake', value: 'shake' }
        ],
        defaultValue: 'glow'
      },
      {
        key: 'showPricing',
        label: 'Mostrar Preço',
        type: 'boolean-switch',
        defaultValue: false
      },
      {
        key: 'price',
        label: 'Preço',
        type: 'number-input',
        defaultValue: 0
      },
      {
        key: 'originalPrice',
        label: 'Preço Original',
        type: 'number-input',
        defaultValue: 97
      }
    ]
  },

  
  // =====================================================================
  // BLOCOS MODULARES AVANÇADOS - Baseados no código do anexo
  // =====================================================================
  
  {
    type: 'social-proof',
    name: 'Prova Social',
    description: 'Componente de validação e credibilidade social',
    icon: 'Users',
    category: 'Vendas',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'O que nossos clientes dizem'
      },
      {
        key: 'testimonials',
        label: 'Depoimentos',
        type: 'array-editor',
        defaultValue: [
          { name: 'Maria Silva', text: 'Transformou meu guarda-roupa!', rating: 5 },
          { name: 'Ana Costa', text: 'Finalmente encontrei meu estilo!', rating: 5 }
        ]
      },
      {
        key: 'showRating',
        label: 'Mostrar Avaliações',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'layout',
        label: 'Layout',
        type: 'select',
        options: [
          { label: 'Grade', value: 'grid' },
          { label: 'Carrossel', value: 'carousel' },
          { label: 'Lista', value: 'list' }
        ],
        defaultValue: 'grid'
      }
    ]
  },

  {
    type: 'value-anchoring',
    name: 'Ancoragem de Valor',
    description: 'Demonstra o valor e economia da oferta',
    icon: 'CircleDollarSign',
    category: 'Vendas',
    propertiesSchema: [
      {
        key: 'originalPrice',
        label: 'Preço Original',
        type: 'number-input',
        defaultValue: 497
      },
      {
        key: 'currentPrice',
        label: 'Preço Atual',
        type: 'number-input',
        defaultValue: 97
      },
      {
        key: 'valueItems',
        label: 'Itens de Valor',
        type: 'array-editor',
        defaultValue: [
          { item: 'Consultoria Personalizada', value: 200 },
          { item: 'Análise de Coloração', value: 150 },
          { item: 'Guia de Estilo Digital', value: 97 },
          { item: 'Suporte VIP 30 dias', value: 50 }
        ]
      },
      {
        key: 'showTotal',
        label: 'Mostrar Total',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'highlightSavings',
        label: 'Destacar Economia',
        type: 'boolean-switch',
        defaultValue: true
      }
    ]
  },

  {
    type: 'advanced-cta',
    name: 'CTA Avançado',
    description: 'Call-to-action com múltiplos elementos persuasivos',
    icon: 'Target',
    category: 'Vendas',
    propertiesSchema: [
      {
        key: 'mainText',
        label: 'Texto Principal',
        type: 'text-input',
        defaultValue: 'TRANSFORME SEU ESTILO AGORA'
      },
      {
        key: 'subText',
        label: 'Subtexto',
        type: 'text-input',
        defaultValue: 'Descubra seu estilo único em 15 minutos'
      },
      {
        key: 'buttonText',
        label: 'Texto do Botão',
        type: 'text-input',
        defaultValue: 'QUERO DESCOBRIR MEU ESTILO'
      },
      {
        key: 'urgencyText',
        label: 'Texto de Urgência',
        type: 'text-input',
        defaultValue: 'Últimas 24 horas com desconto especial!'
      },
      {
        key: 'guaranteeText',
        label: 'Garantia',
        type: 'text-input',
        defaultValue: 'Garantia de 30 dias ou seu dinheiro de volta'
      },
      {
        key: 'showUrgency',
        label: 'Mostrar Urgência',
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
        key: 'buttonAnimation',
        label: 'Animação do Botão',
        type: 'select',
        options: [
          { label: 'Nenhuma', value: 'none' },
          { label: 'Pulse', value: 'pulse' },
          { label: 'Bounce', value: 'bounce' },
          { label: 'Brilho', value: 'glow' }
        ],
        defaultValue: 'pulse'
      }
    ]
  },

  {
    type: 'comparison-table',
    name: 'Tabela de Comparação',
    description: 'Tabela comparativa de opções ou produtos',
    icon: 'Scale',
    category: 'Vendas',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Compare as Opções'
      },
      {
        key: 'columns',
        label: 'Colunas',
        type: 'array-editor',
        defaultValue: [
          {
            title: 'Sem Orientação',
            features: ['Tentativa e erro', 'Compras desnecessárias', 'Insegurança'],
            highlighted: false
          },
          {
            title: 'Com Nosso Método',
            features: ['Estilo definido', 'Compras certeiras', 'Confiança total'],
            highlighted: true
          }
        ]
      },
      {
        key: 'showHeaders',
        label: 'Mostrar Cabeçalhos',
        type: 'boolean-switch',
        defaultValue: true
      }
    ]
  },

  {
    type: 'product-carousel',
    name: 'Carrossel de Produtos',
    description: 'Exibição em carrossel de produtos ou ofertas',
    icon: 'GalleryHorizontalEnd',
    category: 'Vendas',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Nossos Produtos'
      },
      {
        key: 'products',
        label: 'Produtos',
        type: 'array-editor',
        defaultValue: [
          {
            title: 'Análise Completa de Estilo',
            description: 'Descubra seu estilo pessoal único',
            price: 97,
            image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp'
          }
        ]
      },
      {
        key: 'autoPlay',
        label: 'Reprodução Automática',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'showDots',
        label: 'Mostrar Indicadores',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'itemsPerView',
        label: 'Itens por Vista',
        type: 'number-input',
        defaultValue: 3,
        min: 1,
        max: 6
      }
    ]
  },

  // ...existing code...
];

// =====================================================================
// 3. Funções utilitárias para trabalhar com as definições de blocos
// =====================================================================

/**
 * Encontra uma definição de bloco pelo tipo
 * @param type Tipo do bloco a ser encontrado
 * @returns A definição do bloco ou undefined se não encontrado
 */
export function findBlockDefinition(type: string): BlockDefinition | undefined {
  return blockDefinitions.find(def => def.type === type);
}

/**
 * Obtém todas as categorias únicas dos blocos
 * @returns Array com todas as categorias disponíveis
 */
export function getCategories(): string[] {
  const categories = new Set(blockDefinitions.map(def => def.category));
  return Array.from(categories).sort();
}

/**
 * Obtém todos os blocos de uma categoria específica
 * @param category Nome da categoria
 * @returns Array com todas as definições de blocos da categoria
 */
export function getBlocksByCategory(category: string): BlockDefinition[] {
  return blockDefinitions.filter(def => def.category === category);
}

/**
 * Obtém blocos marcados como novos
 * @returns Array com todas as definições de blocos novos
 */
export function getNewBlocks(): BlockDefinition[] {
  return blockDefinitions.filter(def => def.isNew === true);
}

/**
 * Busca blocos por texto (nome, descrição ou tags)
 * @param searchTerm Termo de busca
 * @returns Array com definições de blocos que correspondem à busca
 */
export function searchBlocks(searchTerm: string): BlockDefinition[] {
  const term = searchTerm.toLowerCase();
  return blockDefinitions.filter(def => 
    def.name.toLowerCase().includes(term) ||
    def.description.toLowerCase().includes(term) ||
    def.tags?.some(tag => tag.toLowerCase().includes(term))
  );
}

/**
 * Valida se um tipo de bloco existe
 * @param type Tipo do bloco
 * @returns true se o tipo existe, false caso contrário
 */
export function isValidBlockType(type: string): boolean {
  return blockDefinitions.some(def => def.type === type);
}

/**
 * Cria um bloco com propriedades padrão baseado na definição
 * @param type Tipo do bloco
 * @param id ID único para o bloco (se não fornecido, será gerado)
 * @returns Objeto Block com propriedades padrão ou null se tipo inválido
 */
export function createDefaultBlock(type: string, id?: string): Block | null {
  const definition = findBlockDefinition(type);
  if (!definition) return null;

  const defaultProperties: Record<string, any> = {};
  
  // Preencher propriedades padrão baseado no schema
  definition.propertiesSchema?.forEach(prop => {
    if (prop.defaultValue !== undefined) {
      defaultProperties[prop.key] = prop.defaultValue;
    }
  });

  return {
    id: id || `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    properties: defaultProperties
  };
}

/**
 * Obtém o schema de propriedades para um tipo de bloco
 * @param type Tipo do bloco
 * @returns Array com o schema de propriedades ou undefined se não encontrado
 */
export function getBlockPropertiesSchema(type: string): PropertySchema[] | undefined {
  const definition = findBlockDefinition(type);
  return definition?.propertiesSchema;
}

// Export default para compatibilidade
export default blockDefinitions;
