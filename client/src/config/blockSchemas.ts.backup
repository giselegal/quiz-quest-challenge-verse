// =====================================================================
// Block Schemas Configuration
// Define os schemas de propriedades para cada tipo de bloco do editor
// =====================================================================

// Tipos para as propriedades de cada campo no painel de propriedades
export type PropertyType = 'text' | 'number' | 'color' | 'select' | 'boolean' | 'url' | 'array-of-objects' | 'image';

export interface PropertySchema {
  key: string; // Chave da propriedade (ex: 'text', 'fontSize')
  label: string; // Rótulo visível no painel
  type: PropertyType; // Tipo de controle (text, color, select, array-of-objects, etc.)
  defaultValue?: any; // Valor padrão
  options?: { label: string; value: string }[]; // Para tipo 'select'
  nestedPath?: string; // Para propriedades aninhadas (ex: 'styles.backgroundColor')
  itemSchema?: PropertySchema[]; // Para 'array-of-objects', define o schema de cada item
}

// Interface base para qualquer bloco
export interface Block {
  id: string;
  type: string; // Ex: 'text', 'heading', 'button', 'question'
  properties: Record<string, any>; // Propriedades específicas do bloco
}

// Interface para as opções de uma pergunta
export interface QuestionOption {
    id: string;
    text: string;
    imageUrl?: string; // Opcional, para opções com imagem
}

// Interface para o funil (simplificado para este exemplo)
export interface Funnel {
  id: string;
  name: string;
  pages: Page[];
  config: Record<string, any>; // Configurações globais do funil
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
// 2. Configurações dos schemas para cada tipo de bloco
// =====================================================================

// Schema para Text Block
export const textBlockSchema: PropertySchema[] = [
  {
    key: 'text',
    label: 'Texto',
    type: 'text',
    defaultValue: 'Digite seu texto aqui'
  },
  {
    key: 'fontSize',
    label: 'Tamanho da fonte',
    type: 'select',
    defaultValue: 'base',
    options: [
      { label: 'Pequeno', value: 'sm' },
      { label: 'Normal', value: 'base' },
      { label: 'Grande', value: 'lg' },
      { label: 'Extra Grande', value: 'xl' }
    ]
  },
  {
    key: 'textAlign',
    label: 'Alinhamento',
    type: 'select',
    defaultValue: 'left',
    options: [
      { label: 'Esquerda', value: 'left' },
      { label: 'Centro', value: 'center' },
      { label: 'Direita', value: 'right' }
    ]
  },
  {
    key: 'color',
    label: 'Cor do texto',
    type: 'color',
    defaultValue: '#000000'
  }
];

// Schema para Header Block
export const headerBlockSchema: PropertySchema[] = [
  {
    key: 'text',
    label: 'Título',
    type: 'text',
    defaultValue: 'Título'
  },
  {
    key: 'level',
    label: 'Nível do título',
    type: 'select',
    defaultValue: 'h2',
    options: [
      { label: 'H1', value: 'h1' },
      { label: 'H2', value: 'h2' },
      { label: 'H3', value: 'h3' },
      { label: 'H4', value: 'h4' }
    ]
  },
  {
    key: 'textAlign',
    label: 'Alinhamento',
    type: 'select',
    defaultValue: 'left',
    options: [
      { label: 'Esquerda', value: 'left' },
      { label: 'Centro', value: 'center' },
      { label: 'Direita', value: 'right' }
    ]
  },
  {
    key: 'color',
    label: 'Cor do texto',
    type: 'color',
    defaultValue: '#000000'
  }
];

// Schema para Button Block
export const buttonBlockSchema: PropertySchema[] = [
  {
    key: 'text',
    label: 'Texto do botão',
    type: 'text',
    defaultValue: 'Clique aqui'
  },
  {
    key: 'href',
    label: 'Link (URL)',
    type: 'url',
    defaultValue: '#'
  },
  {
    key: 'variant',
    label: 'Estilo',
    type: 'select',
    defaultValue: 'primary',
    options: [
      { label: 'Primário', value: 'primary' },
      { label: 'Secundário', value: 'secondary' },
      { label: 'Outline', value: 'outline' }
    ]
  },
  {
    key: 'size',
    label: 'Tamanho',
    type: 'select',
    defaultValue: 'md',
    options: [
      { label: 'Pequeno', value: 'sm' },
      { label: 'Médio', value: 'md' },
      { label: 'Grande', value: 'lg' }
    ]
  },
  {
    key: 'width',
    label: 'Largura',
    type: 'select',
    defaultValue: 'auto',
    options: [
      { label: 'Automática', value: 'auto' },
      { label: 'Largura total', value: 'full' }
    ]
  }
];

// Schema para Image Block
export const imageBlockSchema: PropertySchema[] = [
  {
    key: 'src',
    label: 'URL da imagem',
    type: 'image',
    defaultValue: 'https://via.placeholder.com/400x300'
  },
  {
    key: 'alt',
    label: 'Texto alternativo',
    type: 'text',
    defaultValue: 'Imagem'
  },
  {
    key: 'width',
    label: 'Largura',
    type: 'select',
    defaultValue: 'full',
    options: [
      { label: '25%', value: '1/4' },
      { label: '50%', value: '1/2' },
      { label: '75%', value: '3/4' },
      { label: '100%', value: 'full' }
    ]
  },
  {
    key: 'alignment',
    label: 'Alinhamento',
    type: 'select',
    defaultValue: 'center',
    options: [
      { label: 'Esquerda', value: 'left' },
      { label: 'Centro', value: 'center' },
      { label: 'Direita', value: 'right' }
    ]
  }
];

// Schema para Spacer Block
export const spacerBlockSchema: PropertySchema[] = [
  {
    key: 'height',
    label: 'Altura',
    type: 'select',
    defaultValue: 'md',
    options: [
      { label: 'Pequeno', value: 'sm' },
      { label: 'Médio', value: 'md' },
      { label: 'Grande', value: 'lg' },
      { label: 'Extra Grande', value: 'xl' }
    ]
  }
];

// Schema para Rich Text Block
export const richTextBlockSchema: PropertySchema[] = [
  {
    key: 'content',
    label: 'Conteúdo HTML',
    type: 'text',
    defaultValue: '<p>Digite seu texto aqui</p>'
  }
];

// Schema para Quiz Step Block
export const quizStepBlockSchema: PropertySchema[] = [
  {
    key: 'title',
    label: 'Título da pergunta',
    type: 'text',
    defaultValue: 'Qual é a sua pergunta?'
  },
  {
    key: 'description',
    label: 'Descrição (opcional)',
    type: 'text',
    defaultValue: ''
  },
  {
    key: 'options',
    label: 'Opções de resposta',
    type: 'array-of-objects',
    defaultValue: [
      { id: '1', text: 'Opção 1', imageUrl: '' },
      { id: '2', text: 'Opção 2', imageUrl: '' }
    ],
    itemSchema: [
      {
        key: 'text',
        label: 'Texto da opção',
        type: 'text',
        defaultValue: 'Nova opção'
      },
      {
        key: 'imageUrl',
        label: 'Imagem (opcional)',
        type: 'image',
        defaultValue: ''
      }
    ]
  },
  {
    key: 'allowMultiple',
    label: 'Permitir múltiplas seleções',
    type: 'boolean',
    defaultValue: false
  }
];

// =====================================================================
// 3. Mapeamento dos schemas por tipo de bloco
// =====================================================================

export const blockSchemas: Record<string, PropertySchema[]> = {
  text: textBlockSchema,
  header: headerBlockSchema,
  button: buttonBlockSchema,
  image: imageBlockSchema,
  spacer: spacerBlockSchema,
  richtext: richTextBlockSchema,
  'quiz-step': quizStepBlockSchema,
};

// Função para obter o schema de um tipo de bloco
export const getBlockSchema = (blockType: string): PropertySchema[] => {
  return blockSchemas[blockType] || [];
};

// Função para obter as propriedades padrão de um tipo de bloco
export const getDefaultBlockProperties = (blockType: string): Record<string, any> => {
  const schema = getBlockSchema(blockType);
  const defaultProperties: Record<string, any> = {};
  
  schema.forEach(property => {
    if (property.defaultValue !== undefined) {
      defaultProperties[property.key] = property.defaultValue;
    }
  });
  
  return defaultProperties;
};

// Re-exports dos tipos do arquivo de schemas
export * from '../schemas/editorSchemas';
