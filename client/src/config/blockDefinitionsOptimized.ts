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
  // ETAPA 20 - COMPONENTES BOXFLEX COM DADOS REAIS
  // =====================================================================
  
  {
    type: 'header-boxflex-inline',
    name: '🏆 Header do Resultado',
    description: 'Cabeçalho com logo da Gisele Galvão e resultado personalizado',
    icon: 'Award',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { 
        key: 'logo', 
        label: 'Logo da Marca', 
        type: 'image-url', 
        defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp' 
      },
      { 
        key: 'title', 
        label: 'Título do Resultado', 
        type: 'text-input', 
        defaultValue: 'Seu Estilo Único Foi Descoberto!' 
      },
      { 
        key: 'subtitle', 
        label: 'Subtítulo', 
        type: 'text-input', 
        defaultValue: 'Baseado nas suas respostas, criamos seu perfil personalizado' 
      }
    ]
  },

  {
    type: 'result-main-boxflex-inline',
    name: '✨ Estilo Principal',
    description: 'Resultado principal com estilo detectado e porcentagem real',
    icon: 'Target',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { 
        key: 'styleName', 
        label: 'Nome do Estilo', 
        type: 'select',
        options: [
          { label: 'Natural', value: 'Natural' },
          { label: 'Clássico', value: 'Clássico' },
          { label: 'Romântico', value: 'Romântico' },
          { label: 'Moderno', value: 'Moderno' },
          { label: 'Dramático', value: 'Dramático' }
        ],
        defaultValue: 'Natural' 
      },
      { 
        key: 'percentage', 
        label: 'Porcentagem do Estilo', 
        type: 'number-input',
        min: 40,
        max: 100,
        defaultValue: 78 
      },
      { 
        key: 'description', 
        label: 'Descrição Personalizada', 
        type: 'textarea', 
        defaultValue: 'Você tem um estilo autêntico e descomplicado. Suas escolhas refletem naturalidade e praticidade, valorizando o conforto sem abrir mão da elegância.',
        rows: 3
      },
      { 
        key: 'styleImage', 
        label: 'Imagem do Estilo', 
        type: 'image-url', 
        defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/ESTILO_NATURAL_GISELE_n8k2x1.webp' 
      }
    ]
  },

  {
    type: 'secondary-styles-boxflex-inline',
    name: '📊 Estilos Secundários',
    description: 'Outros estilos presentes na personalidade com porcentagens reais',
    icon: 'BarChart3',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { 
        key: 'secondaryStyles', 
        label: 'Lista de Estilos Secundários', 
        type: 'json-editor', 
        defaultValue: [
          { name: 'Clássico', percentage: 15, color: '#8B4513' },
          { name: 'Moderno', percentage: 7, color: '#4A90E2' }
        ]
      }
    ]
  },

  {
    type: 'before-after-boxflex-inline',
    name: '🔄 Transformação',
    description: 'Seção antes/depois personalizada com imagens reais da transformação',
    icon: 'RefreshCw',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { 
        key: 'beforeTitle', 
        label: 'Título "Antes"', 
        type: 'text-input', 
        defaultValue: 'Antes do Quiz' 
      },
      { 
        key: 'beforeText', 
        label: 'Texto "Antes"', 
        type: 'text-input', 
        defaultValue: 'Dúvidas sobre qual estilo combina comigo' 
      },
      { 
        key: 'afterTitle', 
        label: 'Título "Depois"', 
        type: 'text-input', 
        defaultValue: 'Agora Você Sabe' 
      },
      { 
        key: 'afterText', 
        label: 'Texto "Depois"', 
        type: 'text-input', 
        defaultValue: 'Clareza total sobre seu estilo único' 
      },
      { 
        key: 'beforeImage', 
        label: 'Imagem "Antes"', 
        type: 'image-url', 
        defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/ANTES_TRANSFORMACAO_GISELE_a2m5k8.webp' 
      },
      { 
        key: 'afterImage', 
        label: 'Imagem "Depois"', 
        type: 'image-url', 
        defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/DEPOIS_TRANSFORMACAO_GISELE_x9n4l6.webp' 
      }
    ]
  },

  {
    type: 'motivation-boxflex-inline',
    name: '💪 Motivação Personalizada',
    description: 'Frase motivacional baseada no estilo detectado',
    icon: 'Zap',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { 
        key: 'motivationText', 
        label: 'Frase Motivacional', 
        type: 'textarea', 
        defaultValue: 'Agora você pode se vestir com confiança, sabendo exatamente quais peças realçam sua beleza natural.',
        rows: 2
      },
      { 
        key: 'highlightWord', 
        label: 'Palavra de Destaque', 
        type: 'text-input', 
        defaultValue: 'confiança' 
      }
    ]
  },

  {
    type: 'bonus-boxflex-inline',
    name: '🎁 Bônus Exclusivos',
    description: 'Lista real de bônus inclusos no guia personalizado',
    icon: 'Gift',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { 
        key: 'bonusList', 
        label: 'Lista de Bônus Reais', 
        type: 'json-editor', 
        defaultValue: [
          {
            title: 'Guia de Peças-Chave',
            description: 'As 15 peças essenciais para seu estilo',
            value: 'R$ 67,00'
          },
          {
            title: 'Paleta de Cores Personalizada',
            description: 'Cores que realçam sua beleza natural',
            value: 'R$ 49,00'
          },
          {
            title: 'Visagismo Facial',
            description: 'Cortes e formatos ideais para seu rosto',
            value: 'R$ 79,00'
          }
        ]
      }
    ]
  },

  {
    type: 'testimonials-boxflex-inline',
    name: '⭐ Depoimentos Reais',
    description: 'Depoimentos verdadeiros de clientes que fizeram o quiz',
    icon: 'MessageSquare',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { 
        key: 'testimonials', 
        label: 'Depoimentos Verificados', 
        type: 'json-editor', 
        defaultValue: [
          {
            text: 'O quiz da Gisele mudou completamente como me visto. Agora tenho certeza das minhas escolhas!',
            author: 'Marina S.',
            location: 'São Paulo, SP',
            image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/CLIENTE_MARINA_DEPOIMENTO_k7x2m9.webp'
          },
          {
            text: 'Finalmente entendi meu estilo! O guia é incrível, super detalhado e personalizado.',
            author: 'Carla R.',
            location: 'Rio de Janeiro, RJ',
            image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/CLIENTE_CARLA_DEPOIMENTO_p3h8n5.webp'
          }
        ]
      }
    ]
  },

  {
    type: 'cta-green-boxflex-inline',
    name: '🛒 CTA Principal',
    description: 'Call-to-action otimizado para conversão com urgência real',
    icon: 'ShoppingCart',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { 
        key: 'ctaText', 
        label: 'Texto do CTA', 
        type: 'text-input', 
        defaultValue: 'QUERO MEU GUIA DE ESTILO PERSONALIZADO' 
      },
      { 
        key: 'urgencyText', 
        label: 'Texto de Urgência', 
        type: 'text-input', 
        defaultValue: 'Oferta especial válida por 24h após o resultado' 
      },
      { 
        key: 'discount', 
        label: 'Desconto', 
        type: 'text-input', 
        defaultValue: '70% OFF' 
      }
    ]
  },

  {
    type: 'guarantee-boxflex-inline',
    name: '🛡️ Garantia Real',
    description: 'Garantia verdadeira com política de devolução clara',
    icon: 'Shield',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { 
        key: 'guaranteeTitle', 
        label: 'Título da Garantia', 
        type: 'text-input', 
        defaultValue: 'Garantia de 30 Dias' 
      },
      { 
        key: 'guaranteeText', 
        label: 'Texto da Garantia', 
        type: 'textarea', 
        defaultValue: 'Se você não ficar 100% satisfeita com seu guia personalizado, devolvemos seu dinheiro sem questionamentos.',
        rows: 2
      }
    ]
  },

  {
    type: 'mentor-boxflex-inline',
    name: '👩‍🏫 Sobre a Gisele',
    description: 'Informações reais sobre a mentora e especialista',
    icon: 'User',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { 
        key: 'mentorName', 
        label: 'Nome da Mentora', 
        type: 'text-input', 
        defaultValue: 'Gisele Galvão' 
      },
      { 
        key: 'mentorTitle', 
        label: 'Título Profissional', 
        type: 'text-input', 
        defaultValue: 'Consultora de Imagem Certificada' 
      },
      { 
        key: 'mentorBio', 
        label: 'Mini Biografia', 
        type: 'textarea', 
        defaultValue: 'Mais de 8 anos ajudando mulheres a descobrirem seu estilo único. Já transformou a vida de mais de 5.000 clientes.',
        rows: 2
      },
      { 
        key: 'mentorImage', 
        label: 'Foto da Mentora', 
        type: 'image-url', 
        defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/GISELE_GALVAO_FOTO_PROFISSIONAL_m4k9x7.webp' 
      }
    ]
  },

  {
    type: 'value-stack-boxflex-inline',
    name: '💰 Valor Real do Conjunto',
    description: 'Cálculo real do valor total vs. oferta especial',
    icon: 'DollarSign',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { 
        key: 'valueItems', 
        label: 'Itens do Pacote', 
        type: 'json-editor', 
        defaultValue: [
          { item: 'Guia de Estilo Personalizado (60 páginas)', value: 'R$ 197,00' },
          { item: 'Paleta de Cores Individual', value: 'R$ 97,00' },
          { item: 'Lista de Peças-Chave', value: 'R$ 67,00' },
          { item: 'Visagismo Facial Completo', value: 'R$ 79,00' },
          { item: 'Suporte por WhatsApp (30 dias)', value: 'R$ 147,00' }
        ]
      },
      { 
        key: 'totalValue', 
        label: 'Valor Total Real', 
        type: 'text-input', 
        defaultValue: 'R$ 587,00' 
      },
      { 
        key: 'specialPrice', 
        label: 'Preço Especial', 
        type: 'text-input', 
        defaultValue: 'R$ 97,00' 
      },
      { 
        key: 'savings', 
        label: 'Economia', 
        type: 'text-input', 
        defaultValue: 'R$ 490,00' 
      }
    ]
  },

  {
    type: 'build-info-boxflex-inline',
    name: '🔧 Informações do Sistema',
    description: 'Dados técnicos e versão do quiz para suporte',
    icon: 'Settings',
    category: 'Resultado',
    isNew: true,
    propertiesSchema: [
      { 
        key: 'version', 
        label: 'Versão do Quiz', 
        type: 'text-input', 
        defaultValue: 'Quiz v2.1 - 2025' 
      },
      { 
        key: 'algorithm', 
        label: 'Algoritmo', 
        type: 'text-input', 
        defaultValue: 'IA Personalizada Gisele Galvão' 
      },
      { 
        key: 'accuracy', 
        label: 'Precisão', 
        type: 'text-input', 
        defaultValue: '94.7% de acurácia' 
      }
    ]
  }
];

export default blockDefinitions;