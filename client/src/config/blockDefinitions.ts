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
  | 'TrendingUp';

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

  {
    type: 'testimonials-result',
    name: 'Depoimentos de Resultado (Modular)',
    description: 'Seção modular de depoimentos para página de resultado',
    icon: 'MessageSquare',
    category: 'Resultado',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título',
        type: 'text-input',
        defaultValue: 'O que nossas clientes dizem'
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
    icon: 'Header',
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
    icon: 'Card',
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
    icon: 'Button',
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
    icon: 'Header',
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
    icon: 'Package',
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
