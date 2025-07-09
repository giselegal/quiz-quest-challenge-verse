// =====================================================================
// CLEAN BLOCK DEFINITIONS - ONLY FUNCTIONAL COMPONENTS
// =====================================================================

import type { BlockDefinition } from '@/types/blocks';

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
    category: 'Básico',
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
    category: 'Básico',
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
    category: 'Básico',
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
    icon: 'ArrowRight',
    category: 'Básico',
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
    category: 'Básico',
    propertiesSchema: [
      {
        key: 'height',
        label: 'Altura',
        type: 'number-input',
        defaultValue: 40
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
  }
];

// Helper functions
export const getCategories = (): string[] => {
  const categories = [...new Set(blockDefinitions.map(block => block.category))];
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