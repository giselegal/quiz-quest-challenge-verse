// =====================================================================
// 1. src/types.ts - Definições de tipos (Corrigido e Expandido)
// =====================================================================
import React from 'react';

// Tipos para ícones Lucide React (expandido para incluir todos os usados nas definições)
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
  | 'RotateCw'
  | 'Heart'
  | 'Stack'
  | 'Users'
  | 'TriangleAlert'
  | 'Book'
  | 'Mic'
  | 'GalleryHorizontalEnd'
  | 'Zap'
  | 'Target'
  | 'TrendingUp'
  | 'BarChart3'
  | 'MousePointer';

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
  hidden?: boolean;
}

export interface BlockDefinition {
  type: string;
  name: string;
  description: string;
  icon: IconType;
  category: string;
  tags?: string[];
  isNew?: boolean;
  propertiesSchema?: PropertySchema[];
}

export interface Block {
  id: string;
  type: string;
  properties: Record<string, any>;
}

export interface QuizOption {
  id: string;
  text: string;
  imageUrl?: string;
  profileType?: string;
  scoreValue?: number;
  nextStepId?: string;
}

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

export type LayoutType = '1-column' | '2-columns' | '3-columns';
export type DirectionType = 'vertical' | 'horizontal';
export type DispositionType = 'image-text' | 'text-image' | 'text-only' | 'image-only';
export type BorderSizeType = 'none' | 'small' | 'medium' | 'large';
export type ShadowSizeType = 'none' | 'small' | 'medium' | 'large';
export type SpacingType = 'small' | 'medium' | 'large';
export type DetailType = 'none' | 'line' | 'dot';
export type StyleType = 'simple' | 'card';

export interface Funnel {
  id: string;
  name: string;
  pages: Page[];
  config: Record<string, any>;
  version: number;
  isPublished: boolean;
}

export interface Page {
  id: string;
  title: string;
  blocks: Block[];
}

// =====================================================================
// 2. Definição dos schemas para cada tipo de bloco (Corrigido)
// =====================================================================

export const blockDefinitions: BlockDefinition[] = [
  // Categoria: Texto
  {
    type: 'main-heading-inline',
    name: 'Título Principal (Inline)',
    description: 'Cabeçalho principal horizontal responsivo inline.',
    icon: 'Heading1',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Texto do Título',
        type: 'text-input',
        placeholder: 'Seu Título Aqui',
        defaultValue: 'Título Principal'
      }
    ]
  },

  {
    type: 'text-inline',
    name: 'Parágrafo (Inline)',
    description: 'Bloco de texto horizontal responsivo inline com suporte a personalização.',
    icon: 'Type',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'content',
        label: 'Conteúdo',
        type: 'textarea',
        placeholder: 'Digite seu texto aqui...',
        rows: 4,
        defaultValue: 'Conteúdo do texto aqui...'
      }
    ]
  },

  // Categoria: Mídia
  {
    type: 'image-inline',
    name: 'Imagem (Inline)',
    description: 'Imagem horizontal responsiva inline.',
    icon: 'Image',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'src',
        label: 'URL da Imagem',
        type: 'image-url',
        placeholder: 'https://via.placeholder.com/600x400',
        defaultValue: 'https://via.placeholder.com/600x400?text=Imagem'
      }
    ]
  },

  {
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
        placeholder: 'https://youtube.com/watch?v=...',
        description: 'Insira a URL direta para o arquivo de vídeo (.mp4, .webm, etc.) ou link do YouTube/Vimeo.'
      }
    ]
  },

  {
    type: 'audio',
    name: 'Player de Áudio',
    description: 'Player de áudio.',
    icon: 'Mic',
    category: 'Mídia',
    propertiesSchema: [
      {
        key: 'audioUrl',
        label: 'URL do Áudio',
        type: 'video-url',
        placeholder: 'https://example.com/audio.mp3',
        description: 'Insira a URL direta para o arquivo de áudio (.mp3, .wav, etc.).'
      }
    ]
  },

  // Categoria: Interação
  {
    type: 'button',
    name: 'Botão',
    description: 'Botão de ação personalizável.',
    icon: 'RectangleHorizontal',
    category: 'Interação',
    propertiesSchema: [
      {
        key: 'text',
        label: 'Texto do Botão',
        type: 'text-input',
        placeholder: 'Clique aqui',
        defaultValue: 'Texto do Botão'
      }
    ]
  },

  {
    type: 'button-inline',
    name: 'Botão Inline',
    description: 'Botão de ação inline para uso em fluxos e formulários.',
    icon: 'RectangleHorizontal',
    category: 'Interação',
    propertiesSchema: [
      {
        key: 'text',
        label: 'Texto do Botão',
        type: 'text-input',
        placeholder: 'Clique aqui',
        defaultValue: 'Continuar'
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
          { label: 'Pequeno', value: 'sm' },
          { label: 'Médio', value: 'md' },
          { label: 'Grande', value: 'lg' }
        ],
        defaultValue: 'md'
      }
    ]
  },

  {
    type: 'options-grid',
    name: 'Grid de Opções',
    description: 'Grade de opções para questionários e formulários com suporte a imagens.',
    icon: 'List',
    category: 'Interação',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        placeholder: 'Pergunta ou instrução',
        defaultValue: ''
      },
      {
        key: 'columns',
        label: 'Colunas',
        type: 'number-input',
        min: 1,
        max: 4,
        defaultValue: 2
      },
      {
        key: 'showImages',
        label: 'Mostrar Imagens',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'multipleSelection',
        label: 'Seleção Múltipla',
        type: 'boolean-switch',
        defaultValue: false
      },
      {
        key: 'maxSelections',
        label: 'Máx. Seleções',
        type: 'number-input',
        min: 1,
        max: 10,
        defaultValue: 1
      }
    ]
  },

  {
    type: 'form-input',
    name: 'Campo de Entrada',
    description: 'Input de texto genérico para formulários.',
    icon: 'TextCursorInput',
    category: 'Formulário',
    propertiesSchema: [
      {
        key: 'label',
        label: 'Rótulo',
        type: 'text-input',
        placeholder: 'Nome Completo'
      },
      {
        key: 'required',
        label: 'Obrigatório',
        type: 'boolean-switch',
        defaultValue: false
      }
    ]
  },

  // Categoria: UI
  {
    type: 'spacer',
    name: 'Espaçador',
    description: 'Adiciona espaço em branco entre blocos.',
    icon: 'StretchHorizontal',
    category: 'UI',
    propertiesSchema: [
      {
        key: 'height',
        label: 'Altura',
        type: 'text-input',
        placeholder: '50px, 2rem, etc.',
        defaultValue: '50px'
      }
    ]
  },

  {
    type: 'alert',
    name: 'Alerta',
    description: 'Caixa de mensagem de alerta com diferentes variantes.',
    icon: 'TriangleAlert',
    category: 'UI',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título do Alerta',
        type: 'text-input',
        placeholder: 'Atenção!'
      }
    ]
  },

  // Categoria: Vendas
  {
    type: 'sales-offer',
    name: 'Oferta de Vendas',
    description: 'Apresentação da oferta principal com preços.',
    icon: 'ShoppingCart',
    category: 'Vendas',
    propertiesSchema: [
      {
        key: 'productName',
        label: 'Nome do Produto/Serviço',
        type: 'text-input',
        defaultValue: 'Consultoria de Estilo Personalizada'
      }
    ]
  },

  {
    type: 'urgency-timer',
    name: 'Timer de Urgência',
    description: 'Contador regressivo para criar urgência.',
    icon: 'Clock',
    category: 'Vendas',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Oferta expira em:'
      }
    ]
  },

  // Categoria: Credibilidade
  {
    type: 'testimonials-grid',
    name: 'Grade de Depoimentos',
    description: 'Seção com múltiplos depoimentos de clientes.',
    icon: 'Users',
    category: 'Credibilidade',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título da Seção',
        type: 'text-input',
        placeholder: 'O que nossos clientes dizem',
        defaultValue: 'Depoimentos'
      }
    ]
  },

  {
    type: 'guarantee-section',
    name: 'Seção de Garantia',
    description: 'Selo de garantia para transmitir confiança.',
    icon: 'Shield',
    category: 'Credibilidade',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Garantia Incondicional'
      }
    ]
  },

  // Categoria: Resultado (Componentes para página de resultado do quiz)
  {
    type: 'quiz-result-display',
    name: 'Exibição de Resultado do Quiz',
    description: 'Componente principal para exibir resultado do quiz com diferentes layouts',
    icon: 'Award',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      {
        key: 'layout',
        label: 'Layout',
        type: 'select',
        options: [
          { label: 'Card', value: 'card' },
          { label: 'Hero', value: 'hero' },
          { label: 'Minimal', value: 'minimal' }
        ],
        defaultValue: 'card'
      },
      {
        key: 'showPercentage',
        label: 'Mostrar Porcentagem',
        type: 'boolean-switch',
        defaultValue: true
      },
      {
        key: 'showDescription',
        label: 'Mostrar Descrição',
        type: 'boolean-switch',
        defaultValue: true
      }
    ]
  },

  {
    type: 'result-header-inline',
    name: 'Cabeçalho de Resultado (Modular)',
    description: 'Cabeçalho modular para página de resultado',
    icon: 'Award',
    category: 'Resultado',
    propertiesSchema: [
      {
        key: 'logoUrl',
        label: 'URL do Logo',
        type: 'image-url',
        defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp'
      }
    ]
  },

  // Categoria: Outros
  {
    type: 'script',
    name: 'Script Personalizado',
    description: 'Insere código JavaScript customizado na página.',
    icon: 'Code',
    category: 'Outros',
    propertiesSchema: [
      {
        key: 'code',
        label: 'Código JavaScript',
        type: 'textarea',
        rows: 10,
        placeholder: 'console.log("Olá mundo!");',
        description: 'Insira o código JS que será injetado na página.'
      }
    ]
  },

  {
    type: 'terms',
    name: 'Termos e Condições',
    description: 'Bloco de termos e condições ou aviso legal.',
    icon: 'Scale',
    category: 'Outros',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Termos e Condições'
      },
      {
        key: 'content',
        label: 'Conteúdo',
        type: 'textarea',
        rows: 5,
        defaultValue: 'Leia nossos termos de uso...'
      }
    ]
  },

  // =====================================================================
  // Componentes Modulares para Etapas 20 e 21 (Resultado e Ofertas)
  // =====================================================================

  {
    type: 'result-page-header',
    name: 'Cabeçalho da Página de Resultado',
    description: 'Cabeçalho modular com logo, progresso e informações do usuário para página de resultado.',
    icon: 'Layers',
    category: 'Resultado',
    propertiesSchema: [
      {
        key: 'logoUrl',
        label: 'URL do Logo',
        type: 'text-input',
        defaultValue: '/images/logo.png'
      },
      {
        key: 'logoAlt',
        label: 'Texto Alternativo do Logo',
        type: 'text-input',
        defaultValue: 'Logo'
      },
      {
        key: 'progressPercentage',
        label: 'Porcentagem do Progresso',
        type: 'number-input',
        defaultValue: 100,
        min: 0,
        max: 100
      },
      {
        key: 'progressText',
        label: 'Texto do Progresso',
        type: 'text-input',
        defaultValue: 'Quiz Completo!'
      },
      {
        key: 'userName',
        label: 'Nome do Usuário',
        type: 'text-input',
        defaultValue: 'Usuário'
      },
      {
        key: 'userStyle',
        label: 'Estilo do Usuário',
        type: 'text-input',
        defaultValue: 'Clássico Elegante'
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
        defaultValue: '#333333'
      }
    ]
  },

  {
    type: 'style-result-card',
    name: 'Card de Resultado do Estilo',
    description: 'Card modular horizontal mostrando análise do estilo, imagem e estilos secundários.',
    icon: 'RectangleHorizontal',
    category: 'Resultado',
    propertiesSchema: [
      {
        key: 'mainStyleName',
        label: 'Nome do Estilo Principal',
        type: 'text-input',
        defaultValue: 'Clássico Elegante'
      },
      {
        key: 'mainStyleDescription',
        label: 'Descrição do Estilo Principal',
        type: 'textarea',
        rows: 3,
        defaultValue: 'Você tem um gosto refinado e aprecia peças atemporais...'
      },
      {
        key: 'mainStyleImage',
        label: 'Imagem do Estilo Principal',
        type: 'text-input',
        defaultValue: '/images/style-classic.jpg'
      },
      {
        key: 'progressPercentage',
        label: 'Porcentagem de Compatibilidade',
        type: 'number-input',
        defaultValue: 85,
        min: 0,
        max: 100
      },
      {
        key: 'secondaryStyle1',
        label: 'Estilo Secundário 1',
        type: 'text-input',
        defaultValue: 'Moderno Minimalista'
      },
      {
        key: 'secondaryStyle1Percentage',
        label: 'Porcentagem Estilo Secundário 1',
        type: 'number-input',
        defaultValue: 65,
        min: 0,
        max: 100
      },
      {
        key: 'secondaryStyle2',
        label: 'Estilo Secundário 2',
        type: 'text-input',
        defaultValue: 'Boêmio Chic'
      },
      {
        key: 'secondaryStyle2Percentage',
        label: 'Porcentagem Estilo Secundário 2',
        type: 'number-input',
        defaultValue: 45,
        min: 0,
        max: 100
      },
      {
        key: 'guideTitle',
        label: 'Título do Guia',
        type: 'text-input',
        defaultValue: 'Seu Guia de Estilo Personalizado'
      },
      {
        key: 'backgroundColor',
        label: 'Cor de Fundo',
        type: 'color-picker',
        defaultValue: '#f8f9fa'
      }
    ]
  },

  {
    type: 'result-cta',
    name: 'CTA da Página de Resultado',
    description: 'Seção modular horizontal de chamada para ação com proposta de valor e botão de compra.',
    icon: 'CircleDollarSign',
    category: 'Resultado',
    propertiesSchema: [
      {
        key: 'mainTitle',
        label: 'Título Principal',
        type: 'text-input',
        defaultValue: 'Descubra Seu Estilo Completo'
      },
      {
        key: 'subtitle',
        label: 'Subtítulo',
        type: 'text-input',
        defaultValue: 'Acesse seu guia personalizado agora!'
      },
      {
        key: 'valueItem1',
        label: 'Item de Valor 1',
        type: 'text-input',
        defaultValue: 'Análise completa do seu perfil'
      },
      {
        key: 'valueItem2',
        label: 'Item de Valor 2',
        type: 'text-input',
        defaultValue: 'Recomendações personalizadas'
      },
      {
        key: 'valueItem3',
        label: 'Item de Valor 3',
        type: 'text-input',
        defaultValue: 'Guia de compras exclusivo'
      },
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
        key: 'ctaText',
        label: 'Texto do Botão CTA',
        type: 'text-input',
        defaultValue: 'QUERO MEU GUIA AGORA'
      },
      {
        key: 'ctaUrl',
        label: 'URL do Botão CTA',
        type: 'text-input',
        defaultValue: '/checkout'
      },
      {
        key: 'securityText',
        label: 'Texto de Segurança',
        type: 'text-input',
        defaultValue: 'Compra 100% Segura'
      },
      {
        key: 'backgroundColor',
        label: 'Cor de Fundo',
        type: 'color-picker',
        defaultValue: '#ffffff'
      },
      {
        key: 'ctaColor',
        label: 'Cor do Botão CTA',
        type: 'color-picker',
        defaultValue: '#007bff'
      }
    ]
  },

  {
    type: 'offer-header',
    name: 'Cabeçalho da Página de Oferta',
    description: 'Cabeçalho modular horizontal com logo, countdown e mensagem principal da oferta.',
    icon: 'Layers',
    category: 'Ofertas',
    propertiesSchema: [
      {
        key: 'logoUrl',
        label: 'URL do Logo',
        type: 'text-input',
        defaultValue: '/images/logo.png'
      },
      {
        key: 'logoAlt',
        label: 'Texto Alternativo do Logo',
        type: 'text-input',
        defaultValue: 'Logo'
      },
      {
        key: 'countdownTitle',
        label: 'Título do Countdown',
        type: 'text-input',
        defaultValue: 'Oferta por tempo limitado!'
      },
      {
        key: 'countdownMinutes',
        label: 'Minutos do Countdown',
        type: 'number-input',
        defaultValue: 15,
        min: 1,
        max: 60
      },
      {
        key: 'mainTitle',
        label: 'Título Principal',
        type: 'text-input',
        defaultValue: 'OFERTA ESPECIAL PARA VOCÊ!'
      },
      {
        key: 'subtitle',
        label: 'Subtítulo',
        type: 'text-input',
        defaultValue: 'Seu Guia de Estilo Personalizado'
      },
      {
        key: 'description',
        label: 'Descrição',
        type: 'textarea',
        rows: 3,
        defaultValue: 'Com base no seu resultado, preparamos uma oferta exclusiva...'
      },
      {
        key: 'heroImageUrl',
        label: 'URL da Imagem Principal',
        type: 'text-input',
        defaultValue: '/images/offer-hero.jpg'
      },
      {
        key: 'backgroundColor',
        label: 'Cor de Fundo',
        type: 'color-picker',
        defaultValue: '#f8f9fa'
      },
      {
        key: 'titleColor',
        label: 'Cor do Título',
        type: 'color-picker',
        defaultValue: '#dc3545'
      }
    ]
  },

  {
    type: 'product-showcase',
    name: 'Vitrine de Produtos',
    description: 'Vitrine modular horizontal de produtos com imagens, preços e benefícios.',
    icon: 'Gift',
    category: 'Ofertas',
    propertiesSchema: [
      {
        key: 'sectionTitle',
        label: 'Título da Seção',
        type: 'text-input',
        defaultValue: 'O que você vai receber:'
      },
      {
        key: 'product1Name',
        label: 'Nome do Produto 1',
        type: 'text-input',
        defaultValue: 'Guia de Estilo Personalizado'
      },
      {
        key: 'product1Image',
        label: 'Imagem do Produto 1',
        type: 'text-input',
        defaultValue: '/images/product1.jpg'
      },
      {
        key: 'product1Price',
        label: 'Preço do Produto 1',
        type: 'text-input',
        defaultValue: 'R$ 97,00'
      },
      {
        key: 'product1Benefits',
        label: 'Benefícios do Produto 1',
        type: 'textarea',
        rows: 3,
        defaultValue: 'Análise completa\nRecomendações personalizadas\nGuia de compras'
      },
      {
        key: 'product2Name',
        label: 'Nome do Produto 2',
        type: 'text-input',
        defaultValue: 'Consultoria de Estilo'
      },
      {
        key: 'product2Image',
        label: 'Imagem do Produto 2',
        type: 'text-input',
        defaultValue: '/images/product2.jpg'
      },
      {
        key: 'product2Price',
        label: 'Preço do Produto 2',
        type: 'text-input',
        defaultValue: 'R$ 197,00'
      },
      {
        key: 'product2Benefits',
        label: 'Benefícios do Produto 2',
        type: 'textarea',
        rows: 3,
        defaultValue: 'Sessão individual\nPlano personalizado\nSuporte contínuo'
      },
      {
        key: 'totalValue',
        label: 'Valor Total',
        type: 'text-input',
        defaultValue: 'R$ 294,00'
      },
      {
        key: 'backgroundColor',
        label: 'Cor de Fundo',
        type: 'color-picker',
        defaultValue: '#ffffff'
      }
    ]
  },

  {
    type: 'offer-cta',
    name: 'CTA da Página de Oferta',
    description: 'Seção modular horizontal de call-to-action da oferta com preço especial e urgência.',
    icon: 'ShoppingCart',
    category: 'Ofertas',
    propertiesSchema: [
      {
        key: 'urgencyText',
        label: 'Texto de Urgência',
        type: 'text-input',
        defaultValue: '🔥 ÚLTIMAS VAGAS DISPONÍVEIS!'
      },
      {
        key: 'discountText',
        label: 'Texto do Desconto',
        type: 'text-input',
        defaultValue: 'DESCONTO ESPECIAL DE 70%'
      },
      {
        key: 'originalPrice',
        label: 'Preço Original',
        type: 'text-input',
        defaultValue: 'R$ 294,00'
      },
      {
        key: 'discountPrice',
        label: 'Preço com Desconto',
        type: 'text-input',
        defaultValue: 'R$ 87,00'
      },
      {
        key: 'installments',
        label: 'Parcelamento',
        type: 'text-input',
        defaultValue: 'ou 3x de R$ 29,00'
      },
      {
        key: 'ctaText',
        label: 'Texto do Botão Principal',
        type: 'text-input',
        defaultValue: 'SIM, QUERO APROVEITAR ESTA OFERTA!'
      },
      {
        key: 'ctaUrl',
        label: 'URL do Botão Principal',
        type: 'text-input',
        defaultValue: '/checkout'
      },
      {
        key: 'guaranteeText',
        label: 'Texto da Garantia',
        type: 'text-input',
        defaultValue: '✅ Garantia de 30 dias'
      },
      {
        key: 'securityText',
        label: 'Texto de Segurança',
        type: 'text-input',
        defaultValue: '🔒 Compra 100% Segura'
      },
      {
        key: 'backgroundColor',
        label: 'Cor de Fundo',
        type: 'color-picker',
        defaultValue: '#f8f9fa'
      },
      {
        key: 'ctaColor',
        label: 'Cor do Botão CTA',
        type: 'color-picker',
        defaultValue: '#28a745'
      },
      {
        key: 'urgencyColor',
        label: 'Cor do Texto de Urgência',
        type: 'color-picker',
        defaultValue: '#dc3545'
      }
    ]
  },

  // =====================================================================
  // COMPONENTES BÁSICOS FALTANDO
  // =====================================================================
  {
    type: 'header',
    name: 'Cabeçalho',
    description: 'Componente de cabeçalho básico',
    icon: 'Type',
    category: 'UI',
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
        type: 'text-input',
        defaultValue: 'Subtítulo opcional'
      }
    ]
  },
  {
    type: 'text',
    name: 'Texto',
    description: 'Componente de texto básico',
    icon: 'Type',
    category: 'UI',
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
    description: 'Componente de imagem básico',
    icon: 'Image',
    category: 'Mídia',
    propertiesSchema: [
      {
        key: 'src',
        label: 'URL da Imagem',
        type: 'image-url',
        defaultValue: '/images/placeholder.jpg'
      },
      {
        key: 'alt',
        label: 'Texto Alternativo',
        type: 'text-input',
        defaultValue: 'Descrição da imagem'
      }
    ]
  },
  {
    type: 'list',
    name: 'Lista',
    description: 'Componente de lista básico',
    icon: 'List',
    category: 'UI',
    propertiesSchema: [
      {
        key: 'items',
        label: 'Itens da Lista',
        type: 'textarea',
        defaultValue: 'Item 1\nItem 2\nItem 3'
      }
    ]
  },

  // =====================================================================
  // COMPONENTES DE RESULTADO
  // =====================================================================
  {
    type: 'result-header',
    name: 'Cabeçalho Resultado',
    description: 'Cabeçalho para página de resultado',
    icon: 'Award',
    category: 'Resultado',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Seu Resultado'
      }
    ]
  },
  {
    type: 'result-description',
    name: 'Descrição Resultado',
    description: 'Descrição do resultado do quiz',
    icon: 'Type',
    category: 'Resultado',
    propertiesSchema: [
      {
        key: 'description',
        label: 'Descrição',
        type: 'textarea',
        defaultValue: 'Descrição do resultado...'
      }
    ]
  },

  // =====================================================================
  // COMPONENTES DE OFERTA
  // =====================================================================
  {
    type: 'product-offer',
    name: 'Oferta Produto',
    description: 'Componente de oferta de produto',
    icon: 'ShoppingCart',
    category: 'Ofertas',
    propertiesSchema: [
      {
        key: 'productName',
        label: 'Nome do Produto',
        type: 'text-input',
        defaultValue: 'Produto Incrível'
      },
      {
        key: 'price',
        label: 'Preço',
        type: 'text-input',
        defaultValue: 'R$ 97,00'
      }
    ]
  },

  // =====================================================================
  // COMPONENTES ESPECIAIS
  // =====================================================================
  {
    type: 'faq-section',
    name: 'Seção FAQ',
    description: 'Seção de perguntas frequentes',
    icon: 'HelpCircle',
    category: 'UI',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título da Seção',
        type: 'text-input',
        defaultValue: 'Perguntas Frequentes'
      }
    ]
  },
  {
    type: 'testimonials',
    name: 'Depoimentos',
    description: 'Componente de depoimentos',
    icon: 'Quote',
    category: 'Credibilidade',
    propertiesSchema: [
      {
        key: 'testimonial',
        label: 'Depoimento',
        type: 'textarea',
        defaultValue: 'Depoimento incrível...'
      }
    ]
  },
  {
    type: 'guarantee',
    name: 'Garantia',
    description: 'Componente de garantia',
    icon: 'Shield',
    category: 'Credibilidade',
    propertiesSchema: [
      {
        key: 'guaranteeText',
        label: 'Texto da Garantia',
        type: 'text-input',
        defaultValue: 'Garantia de 30 dias'
      }
    ]
  },

  // =====================================================================
  // COMPONENTES INLINE ESSENCIAIS
  // =====================================================================
  {
    type: 'heading-inline',
    name: 'Título Inline',
    description: 'Título inline editável',
    icon: 'Type',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'text',
        label: 'Texto',
        type: 'text-input',
        defaultValue: 'Título Inline'
      }
    ]
  },
  {
    type: 'badge-inline',
    name: 'Badge Inline',
    description: 'Badge inline editável',
    icon: 'Award',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'text',
        label: 'Texto',
        type: 'text-input',
        defaultValue: 'Badge'
      }
    ]
  },
  {
    type: 'progress-inline',
    name: 'Progresso Inline',
    description: 'Barra de progresso inline',
    icon: 'BarChart3',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'percentage',
        label: 'Porcentagem',
        type: 'number-input',
        defaultValue: 75
      }
    ]
  },
  {
    type: 'image-display-inline',
    name: 'Imagem Display Inline',
    description: 'Imagem display inline editável',
    icon: 'Image',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'src',
        label: 'URL da Imagem',
        type: 'image-url',
        defaultValue: '/images/placeholder.jpg'
      }
    ]
  },
  {
    type: 'style-card-inline',
    name: 'Card Estilo Inline',
    description: 'Card de estilo inline editável',
    icon: 'Award',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'styleName',
        label: 'Nome do Estilo',
        type: 'text-input',
        defaultValue: 'Estilo Natural'
      }
    ]
  },
  {
    type: 'result-card-inline',
    name: 'Card Resultado Inline',
    description: 'Card de resultado inline editável',
    icon: 'Award',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'resultTitle',
        label: 'Título do Resultado',
        type: 'text-input',
        defaultValue: 'Seu Resultado'
      }
    ]
  },
  {
    type: 'before-after-inline',
    name: 'Antes/Depois Inline',
    description: 'Componente antes/depois inline',
    icon: 'ArrowRightLeft',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'beforeText',
        label: 'Texto Antes',
        type: 'text-input',
        defaultValue: 'Antes'
      }
    ]
  },
  {
    type: 'bonus-list-inline',
    name: 'Lista Bônus Inline',
    description: 'Lista de bônus inline editável',
    icon: 'Gift',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'bonuses',
        label: 'Lista de Bônus',
        type: 'textarea',
        defaultValue: 'Bônus 1\nBônus 2\nBônus 3'
      }
    ]
  },
  {
    type: 'step-header-inline',
    name: 'Header Etapa Inline',
    description: 'Cabeçalho de etapa inline',
    icon: 'Layers',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'stepTitle',
        label: 'Título da Etapa',
        type: 'text-input',
        defaultValue: 'Etapa 1'
      }
    ]
  },
  {
    type: 'testimonial-card-inline',
    name: 'Card Depoimento Inline',
    description: 'Card de depoimento inline',
    icon: 'Quote',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'testimonial',
        label: 'Depoimento',
        type: 'textarea',
        defaultValue: 'Depoimento...'
      }
    ]
  },
  {
    type: 'countdown-inline',
    name: 'Countdown Inline',
    description: 'Contador regressivo inline',
    icon: 'Clock',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'targetDate',
        label: 'Data Alvo',
        type: 'text-input',
        defaultValue: '2024-12-31'
      }
    ]
  },
  {
    type: 'stat-inline',
    name: 'Estatística Inline',
    description: 'Estatística inline editável',
    icon: 'BarChart3',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'number',
        label: 'Número',
        type: 'text-input',
        defaultValue: '100%'
      }
    ]
  },
  {
    type: 'pricing-card-inline',
    name: 'Card Preço Inline',
    description: 'Card de preço inline editável',
    icon: 'CircleDollarSign',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'price',
        label: 'Preço',
        type: 'text-input',
        defaultValue: 'R$ 97,00'
      }
    ]
  },

  // =====================================================================
  // COMPONENTES QUIZ
  // =====================================================================
  {
    type: 'quiz-intro-header',
    name: 'Header Intro Quiz',
    description: 'Cabeçalho de introdução do quiz',
    icon: 'Play',
    category: 'Interação',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Descubra Seu Estilo'
      }
    ]
  },
  {
    type: 'vertical-canvas-header',
    name: 'Header Canvas Vertical',
    description: 'Cabeçalho vertical do canvas',
    icon: 'Layers',
    category: 'UI',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Canvas Vertical'
      }
    ]
  },
  {
    type: 'loading-animation',
    name: 'Animação Loading',
    description: 'Animação de carregamento',
    icon: 'LoaderCircle',
    category: 'UI',
    propertiesSchema: [
      {
        key: 'message',
        label: 'Mensagem',
        type: 'text-input',
        defaultValue: 'Carregando...'
      }
    ]
  },
  {
    type: 'quiz-question',
    name: 'Questão Quiz',
    description: 'Componente de questão do quiz',
    icon: 'HelpCircle',
    category: 'Interação',
    propertiesSchema: [
      {
        key: 'question',
        label: 'Pergunta',
        type: 'text-input',
        defaultValue: 'Qual é sua preferência?'
      }
    ]
  },
  {
    type: 'quiz-progress',
    name: 'Progresso Quiz',
    description: 'Barra de progresso do quiz',
    icon: 'BarChart3',
    category: 'Interação',
    propertiesSchema: [
      {
        key: 'currentStep',
        label: 'Etapa Atual',
        type: 'number-input',
        defaultValue: 1
      }
    ]
  },

  // =====================================================================
  // COMPONENTES ETAPA 20/21
  // =====================================================================
  {
    type: 'quiz-offer-pricing-inline',
    name: 'Preço Oferta Quiz Inline',
    description: 'Preço da oferta do quiz inline',
    icon: 'CircleDollarSign',
    category: 'Ofertas',
    propertiesSchema: [
      {
        key: 'price',
        label: 'Preço',
        type: 'text-input',
        defaultValue: 'R$ 97,00'
      }
    ]
  },
  {
    type: 'divider-inline',
    name: 'Divisor Inline',
    description: 'Divisor inline editável',
    icon: 'Rows3',
    category: 'UI',
    propertiesSchema: [
      {
        key: 'style',
        label: 'Estilo',
        type: 'select',
        options: [
          { label: 'Linha', value: 'linha' },
          { label: 'Pontilhado', value: 'pontilhado' },
          { label: 'Tracejado', value: 'tracejado' }
        ],
        defaultValue: 'linha'
      }
    ]
  },

  // =====================================================================
  // COMPONENTES ETAPA 21 ESPECÍFICOS
  // =====================================================================
  {
    type: 'hero-badge-inline',
    name: 'Badge Hero Inline',
    description: 'Badge hero inline editável',
    icon: 'Award',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'text',
        label: 'Texto',
        type: 'text-input',
        defaultValue: 'Oferta Especial'
      }
    ]
  },
  {
    type: 'hero-title-inline',
    name: 'Título Hero Inline',
    description: 'Título hero inline editável',
    icon: 'Type',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Título Hero'
      }
    ]
  },
  {
    type: 'problem-list-inline',
    name: 'Lista Problemas Inline',
    description: 'Lista de problemas inline',
    icon: 'List',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'problems',
        label: 'Lista de Problemas',
        type: 'textarea',
        defaultValue: 'Problema 1\nProblema 2\nProblema 3'
      }
    ]
  },
  {
    type: 'highlight-box-inline',
    name: 'Caixa Destaque Inline',
    description: 'Caixa de destaque inline',
    icon: 'Award',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'content',
        label: 'Conteúdo',
        type: 'textarea',
        defaultValue: 'Conteúdo destacado...'
      }
    ]
  },
  {
    type: 'product-card-inline',
    name: 'Card Produto Inline',
    description: 'Card de produto inline',
    icon: 'Gift',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'productName',
        label: 'Nome do Produto',
        type: 'text-input',
        defaultValue: 'Produto Incrível'
      }
    ]
  },
  {
    type: 'price-highlight-inline',
    name: 'Destaque Preço Inline',
    description: 'Destaque de preço inline',
    icon: 'CircleDollarSign',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'price',
        label: 'Preço',
        type: 'text-input',
        defaultValue: 'R$ 97,00'
      }
    ]
  },
  {
    type: 'cta-button-inline',
    name: 'Botão CTA Inline',
    description: 'Botão CTA inline editável',
    icon: 'MousePointer',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'text',
        label: 'Texto do Botão',
        type: 'text-input',
        defaultValue: 'CLIQUE AQUI'
      }
    ]
  },
  {
    type: 'trust-elements-inline',
    name: 'Elementos Confiança Inline',
    description: 'Elementos de confiança inline',
    icon: 'Shield',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'trustText',
        label: 'Texto de Confiança',
        type: 'text-input',
        defaultValue: '100% Seguro'
      }
    ]
  },
  {
    type: 'countdown-timer-inline',
    name: 'Timer Countdown Inline',
    description: 'Timer countdown inline',
    icon: 'Clock',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'minutes',
        label: 'Minutos',
        type: 'number-input',
        defaultValue: 30
      }
    ]
  },
  {
    type: 'guarantee-seal-inline',
    name: 'Selo Garantia Inline',
    description: 'Selo de garantia inline',
    icon: 'Shield',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'guaranteeText',
        label: 'Texto da Garantia',
        type: 'text-input',
        defaultValue: 'Garantia 30 dias'
      }
    ]
  },
  {
    type: 'faq-item-inline',
    name: 'Item FAQ Inline',
    description: 'Item de FAQ inline',
    icon: 'HelpCircle',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'question',
        label: 'Pergunta',
        type: 'text-input',
        defaultValue: 'Pergunta frequente?'
      }
    ]
  },
  {
    type: 'section-header-inline',
    name: 'Header Seção Inline',
    description: 'Cabeçalho de seção inline',
    icon: 'Layers',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título da Seção',
        type: 'text-input',
        defaultValue: 'Nova Seção'
      }
    ]
  },
  {
    type: 'sticky-header-inline',
    name: 'Header Fixo Inline',
    description: 'Cabeçalho fixo inline',
    icon: 'Layers',
    category: 'Inline',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Header Fixo'
      }
    ]
  },

  // =====================================================================
  // COMPONENTES ESTRATÉGICOS
  // =====================================================================
  {
    type: 'strategic-question-image',
    name: 'Questão Estratégica Imagem',
    description: 'Questão estratégica com imagem',
    icon: 'Image',
    category: 'Interação',
    propertiesSchema: [
      {
        key: 'question',
        label: 'Pergunta',
        type: 'text-input',
        defaultValue: 'Questão estratégica...'
      }
    ]
  },
  {
    type: 'strategic-question-main',
    name: 'Questão Estratégica Principal',
    description: 'Questão estratégica principal',
    icon: 'HelpCircle',
    category: 'Interação',
    propertiesSchema: [
      {
        key: 'question',
        label: 'Pergunta',
        type: 'text-input',
        defaultValue: 'Questão principal...'
      }
    ]
  },
  {
    type: 'strategic-question-inline',
    name: 'Questão Estratégica Inline',
    description: 'Questão estratégica inline',
    icon: 'HelpCircle',
    category: 'Interação',
    propertiesSchema: [
      {
        key: 'question',
        label: 'Pergunta',
        type: 'text-input',
        defaultValue: 'Questão inline...'
      }
    ]
  },

  // =====================================================================
  // BLOCOS QUIZ ESPECÍFICOS
  // =====================================================================
  {
    type: 'QuizQuestionBlock',
    name: 'Bloco Questão Quiz',
    description: 'Bloco de questão do quiz',
    icon: 'HelpCircle',
    category: 'Interação',
    propertiesSchema: [
      {
        key: 'questionText',
        label: 'Texto da Questão',
        type: 'text-input',
        defaultValue: 'Pergunta do quiz...'
      }
    ]
  },
  {
    type: 'QuestionMultipleBlock',
    name: 'Bloco Questão Múltipla',
    description: 'Bloco de questão múltipla escolha',
    icon: 'HelpCircle',
    category: 'Interação',
    propertiesSchema: [
      {
        key: 'questionText',
        label: 'Texto da Questão',
        type: 'text-input',
        defaultValue: 'Questão múltipla escolha...'
      }
    ]
  },
  {
    type: 'StrategicQuestionBlock',
    name: 'Bloco Questão Estratégica',
    description: 'Bloco de questão estratégica',
    icon: 'HelpCircle',
    category: 'Interação',
    propertiesSchema: [
      {
        key: 'questionText',
        label: 'Texto da Questão',
        type: 'text-input',
        defaultValue: 'Questão estratégica...'
      }
    ]
  },
  {
    type: 'QuizTransitionBlock',
    name: 'Bloco Transição Quiz',
    description: 'Bloco de transição do quiz',
    icon: 'ArrowRightLeft',
    category: 'UI',
    propertiesSchema: [
      {
        key: 'message',
        label: 'Mensagem',
        type: 'text-input',
        defaultValue: 'Preparando resultado...'
      }
    ]
  },
  {
    type: 'ResultPageBlock',
    name: 'Bloco Página Resultado',
    description: 'Bloco da página de resultado',
    icon: 'Award',
    category: 'Resultado',
    propertiesSchema: [
      {
        key: 'resultTitle',
        label: 'Título do Resultado',
        type: 'text-input',
        defaultValue: 'Seu Resultado'
      }
    ]
  },

  // =====================================================================
  // MAPEAMENTOS ADICIONAIS
  // =====================================================================
  {
    type: 'quiz-title',
    name: 'Título Quiz',
    description: 'Título do quiz',
    icon: 'Type',
    category: 'Interação',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Quiz de Estilo'
      }
    ]
  },
  {
    type: 'quiz-name-input',
    name: 'Input Nome Quiz',
    description: 'Campo de entrada do nome no quiz',
    icon: 'TextCursorInput',
    category: 'Formulário',
    propertiesSchema: [
      {
        key: 'placeholder',
        label: 'Placeholder',
        type: 'text-input',
        defaultValue: 'Digite seu nome...'
      }
    ]
  },
  {
    type: 'quiz-result-header',
    name: 'Header Resultado Quiz',
    description: 'Cabeçalho do resultado do quiz',
    icon: 'Award',
    category: 'Resultado',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Resultado do Quiz'
      }
    ]
  },
  {
    type: 'quiz-result-card',
    name: 'Card Resultado Quiz',
    description: 'Card com resultado do quiz',
    icon: 'Award',
    category: 'Resultado',
    propertiesSchema: [
      {
        key: 'resultText',
        label: 'Texto do Resultado',
        type: 'textarea',
        defaultValue: 'Descrição do resultado...'
      }
    ]
  },
  {
    type: 'quiz-offer-title',
    name: 'Título Oferta Quiz',
    description: 'Título da oferta no quiz',
    icon: 'Type',
    category: 'Ofertas',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Oferta Especial'
      }
    ]
  },
  {
    type: 'quiz-offer-countdown',
    name: 'Countdown Oferta Quiz',
    description: 'Countdown da oferta do quiz',
    icon: 'Clock',
    category: 'Ofertas',
    propertiesSchema: [
      {
        key: 'minutes',
        label: 'Minutos',
        type: 'number-input',
        defaultValue: 15
      }
    ]
  },
  {
    type: 'quiz-offer-faq',
    name: 'FAQ Oferta Quiz',
    description: 'FAQ da oferta do quiz',
    icon: 'HelpCircle',
    category: 'Ofertas',
    propertiesSchema: [
      {
        key: 'faqTitle',
        label: 'Título FAQ',
        type: 'text-input',
        defaultValue: 'Dúvidas Frequentes'
      }
    ]
  },

  // =====================================================================
  // COMPONENTES MODULARES ORIGINAIS (mantidos)
  // =====================================================================
  {
    type: 'hero-section',
    name: 'Seção Hero',
    description: 'Seção hero principal',
    icon: 'Layers',
    category: 'UI',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'Título Hero'
      }
    ]
  },
  {
    type: 'bonus-carousel',
    name: 'Carrossel de Bônus',
    description: 'Carrossel com bônus',
    icon: 'Gift',
    category: 'UI',
    propertiesSchema: [
      {
        key: 'bonuses',
        label: 'Lista de Bônus',
        type: 'textarea',
        defaultValue: 'Bônus 1\nBônus 2\nBônus 3'
      }
    ]
  },
  {
    type: 'headline',
    name: 'Título',
    description: 'Título principal',
    icon: 'Type',
    category: 'UI',
    propertiesSchema: [
      {
        key: 'text',
        label: 'Texto',
        type: 'text-input',
        defaultValue: 'Título Principal'
      }
    ]
  },
  {
    type: 'benefits',
    name: 'Benefícios',
    description: 'Lista de benefícios',
    icon: 'CheckCircle',
    category: 'UI',
    propertiesSchema: [
      {
        key: 'benefits',
        label: 'Lista de Benefícios',
        type: 'textarea',
        defaultValue: 'Benefício 1\nBenefício 2\nBenefício 3'
      }
    ]
  },
  {
    type: 'pricing',
    name: 'Preço',
    description: 'Componente de preço',
    icon: 'CircleDollarSign',
    category: 'Vendas',
    propertiesSchema: [
      {
        key: 'price',
        label: 'Preço',
        type: 'text-input',
        defaultValue: 'R$ 97,00'
      }
    ]
  },
  {
    type: 'cta',
    name: 'Botão CTA',
    description: 'Botão call-to-action',
    icon: 'MousePointer',
    category: 'UI',
    propertiesSchema: [
      {
        key: 'text',
        label: 'Texto do Botão',
        type: 'text-input',
        defaultValue: 'CLIQUE AQUI'
      }
    ]
  },
  {
    type: 'style-result',
    name: 'Resultado do Estilo',
    description: 'Resultado do estilo identificado',
    icon: 'Award',
    category: 'Resultado',
    propertiesSchema: [
      {
        key: 'styleName',
        label: 'Nome do Estilo',
        type: 'text-input',
        defaultValue: 'Estilo Natural'
      }
    ]
  },
  {
    type: 'secondary-styles',
    name: 'Estilos Secundários',
    description: 'Estilos secundários identificados',
    icon: 'Layers',
    category: 'Resultado',
    propertiesSchema: [
      {
        key: 'styles',
        label: 'Estilos',
        type: 'textarea',
        defaultValue: 'Estilo 1\nEstilo 2\nEstilo 3'
      }
    ]
  },
  {
    type: 'bonus',
    name: 'Bônus',
    description: 'Componente de bônus',
    icon: 'Gift',
    category: 'Vendas',
    propertiesSchema: [
      {
        key: 'bonusName',
        label: 'Nome do Bônus',
        type: 'text-input',
        defaultValue: 'Bônus Especial'
      }
    ]
  }
];

// =====================================================================
// 3. Funções utilitárias para trabalhar com as definições de blocos
// =====================================================================

/**
 * Encontra uma definição de bloco pelo tipo
 */
export function findBlockDefinition(type: string): BlockDefinition | undefined {
  return blockDefinitions.find(def => def.type === type);
}

/**
 * Obtém todas as categorias únicas dos blocos
 */
export function getCategories(): string[] {
  const categories = new Set(blockDefinitions.map(def => def.category));
  return Array.from(categories).sort();
}

/**
 * Obtém todos os blocos de uma categoria específica
 */
export function getBlocksByCategory(category: string): BlockDefinition[] {
  return blockDefinitions.filter(def => def.category === category);
}

/**
 * Obtém blocos marcados como novos
 */
export function getNewBlocks(): BlockDefinition[] {
  return blockDefinitions.filter(def => def.isNew === true);
}

/**
 * Busca blocos por texto (nome, descrição ou tags)
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
 */
export function isValidBlockType(type: string): boolean {
  return blockDefinitions.some(def => def.type === type);
}

/**
 * Cria um bloco com propriedades padrão baseado na definição
 */
export function createDefaultBlock(type: string, id?: string): Block | null {
  const definition = findBlockDefinition(type);
  if (!definition) return null;

  const defaultProperties: Record<string, any> = {};
  
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
 */
export function getBlockPropertiesSchema(type: string): PropertySchema[] | undefined {
  const definition = findBlockDefinition(type);
  return definition?.propertiesSchema;
}

// Export default para compatibilidade
export default blockDefinitions;
