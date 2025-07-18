export interface Block {
  id: string;
  type: string;
  content: Record<string, any>;
  order: number; // Changed from optional to required to match EditorBlock
  settings?: Record<string, any>;
  [key: string]: any;
}

export type BlockType = 
  // Básicos
  | 'heading'
  | 'paragraph'
  | 'image'
  | 'button'
  | 'title'
  | 'subtitle'
  | 'text'
  | 'styleResult'
  | 'cta'
  | 'testimonial'
  | 'carousel'
  | 'bonus'
  | 'guarantee'
  | 'quiz-question'
  // Componentes básicos
  | 'header'
  | 'spacer'
  | 'form-input'
  | 'list'
  // Componentes de resultado
  | 'result-header'
  | 'result-description'
  // Componentes de oferta
  | 'product-offer'
  | 'urgency-timer'
  // Componentes especiais
  | 'faq-section'
  | 'testimonials'
  | 'video-player'
  // Componentes inline essenciais
  | 'text-inline'
  | 'heading-inline'
  | 'button-inline'
  | 'badge-inline'
  | 'progress-inline'
  | 'image-display-inline'
  | 'style-card-inline'
  | 'result-card-inline'
  | 'result-header-inline'
  | 'before-after-inline'
  | 'bonus-list-inline'
  | 'step-header-inline'
  | 'testimonial-card-inline'
  | 'countdown-inline'
  | 'stat-inline'
  | 'pricing-card-inline'
  // Componentes quiz
  | 'quiz-intro-header'
  | 'vertical-canvas-header'
  | 'loading-animation'
  | 'options-grid'
  | 'quiz-progress'
  // Componentes etapa 20/21
  | 'quiz-offer-pricing-inline'
  | 'divider-inline'
  // Componentes etapa 21 específicos
  | 'hero-badge-inline'
  | 'hero-title-inline'
  | 'problem-list-inline'
  | 'highlight-box-inline'
  | 'product-card-inline'
  | 'price-highlight-inline'
  | 'cta-button-inline'
  | 'trust-elements-inline'
  | 'countdown-timer-inline'
  | 'guarantee-seal-inline'
  | 'faq-item-inline'
  | 'section-header-inline'
  | 'sticky-header-inline'
  // Componentes estratégicos
  | 'strategic-question-image'
  | 'strategic-question-main'
  | 'strategic-question-inline'
  // Blocos quiz específicos
  | 'QuizQuestionBlock'
  | 'QuestionMultipleBlock'
  | 'StrategicQuestionBlock'
  | 'QuizTransitionBlock'
  | 'ResultPageBlock'
  // Mapeamentos adicionais
  | 'quiz-title'
  | 'quiz-name-input'
  | 'quiz-result-header'
  | 'quiz-result-card'
  | 'quiz-offer-title'
  | 'quiz-offer-countdown'
  | 'quiz-offer-faq'
  // Componentes modulares originais
  | 'hero-section'
  | 'bonus-carousel'
  | 'headline'
  | 'benefits'
  | 'pricing'
  | 'quiz-result-display'
  | 'style-result'
  | 'secondary-styles'
  // Novos componentes modulares para etapas 20 e 21
  | 'result-page-header'
  | 'style-result-card'
  | 'result-cta'
  | 'offer-header'
  | 'product-showcase'
  | 'offer-cta'
  | string;

// Add missing EditorBlock type which was imported across many files
export interface EditorBlock extends Block {
  id: string;
  type: BlockType;
  content: EditableContent;
  order: number;
  settings?: Record<string, any>;
}

// Add missing EditableContent type
export interface EditableContent {
  title?: string;
  subtitle?: string;
  text?: string;
  imageUrl?: string;
  imageAlt?: string;
  caption?: string;
  buttonText?: string;
  buttonUrl?: string;
  description?: string;
  items?: any[];
  
  // Quiz Question properties
  question?: string;
  options?: Array<{ id: string; text: string; imageUrl?: string }>;
  multipleSelection?: boolean;
  showImages?: boolean;
  maxSelections?: number;
  minSelections?: number;
  progressPercent?: number;
  logoUrl?: string;
  showBackButton?: boolean;
  optionLayout?: 'vertical' | 'horizontal' | 'grid';
  alignment?: 'left' | 'center' | 'right';
  
  style?: {
    color?: string;
    backgroundColor?: string;
    padding?: string;
    margin?: string;
    textAlign?: string;
    fontSize?: string;
    fontWeight?: string;
    fontFamily?: string;
    lineHeight?: string;
    width?: string;
    height?: string;
    borderRadius?: string;
    display?: string;
    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;
    gap?: string;
    boxShadow?: string;
    letterSpacing?: string;
    borderWidth?: string;
    borderStyle?: string;
    borderColor?: string;
    objectFit?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

// Add missing EditorConfig type
export interface EditorConfig {
  blocks: EditorBlock[];
  globalStyles?: {
    backgroundColor?: string;
    fontFamily?: string;
    textColor?: string;
    accentColor?: string;
    secondaryColor?: string;
    buttonStyle?: string;
    headingStyle?: string;
    spacing?: string;
    borderRadius?: string;
    [key: string]: any;
  };
  settings?: {
    showLogo?: boolean;
    showNavigation?: boolean;
    showFooter?: boolean;
    [key: string]: any;
  };
}

// Tipos para as propriedades de cada campo no painel de propriedades
export type PropertyType = 
  | 'text' 
  | 'number' 
  | 'color' 
  | 'select' 
  | 'boolean' 
  | 'url' 
  | 'array-of-objects' 
  | 'image' 
  | 'icon-select' 
  | 'textarea' 
  | 'text-area'
  | 'range'
  | 'image-upload'
  | 'font-size-slider'
  | 'font-weight-buttons'
  | 'text-style-buttons'
  | 'text-align-buttons'
  | 'content-type-buttons'
  | 'color-palette'
  | 'image-url'
  | 'video-url'
  | 'json-editor';

export interface PropertySchema {
  key: string; // Chave da propriedade (ex: 'text', 'fontSize')
  label: string; // Rótulo visível no painel
  type: PropertyType; // Tipo de controle (text, color, select, array-of-objects, etc.)
  defaultValue?: any; // Valor padrão
  options?: { label: string; value: string }[]; // Para tipo 'select'
  nestedPath?: string; // Para propriedades aninhadas (ex: 'styles.backgroundColor')
  itemSchema?: PropertySchema[]; // Para 'array-of-objects', define o schema de cada item
  min?: number; // Para 'number' e 'range'
  max?: number; // Para 'number' e 'range'
  step?: number; // Para 'number' e 'range'
  placeholder?: string; // Para campos de texto
  helpText?: string; // Texto de ajuda
  description?: string; // Descrição adicional
  rows?: number; // Para textarea
}

// Interface para as opções de uma pergunta
export interface QuestionOption {
  id: string;
  text: string;
  imageUrl?: string; // Opcional, para opções com imagem
  value?: string; // Valor da opção para processamento
}

// Interface para pergunta do quiz
export interface QuizQuestion {
  id: string;
  type: 'single-choice' | 'multiple-choice' | 'text-input' | 'slider' | 'yes-no';
  title: string;
  description?: string;
  options?: QuestionOption[];
  required?: boolean;
  minSelections?: number;
  maxSelections?: number;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

// Interface para resultado do quiz
export interface QuizResult {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  recommendations?: string[];
  nextSteps?: {
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
  }[];
}

// Interface para o funil
export interface Funnel {
  id: string;
  name: string;
  pages: Page[];
  config: Record<string, any>; // Configurações globais do funil
  version: number;
  isPublished: boolean;
  theme?: FunnelTheme;
  metadata?: {
    description?: string;
    tags?: string[];
    createdAt?: string;
    updatedAt?: string;
  };
}

// Interface para uma página do funil
export interface Page {
  id: string;
  title: string;
  blocks: Block[];
  settings?: {
    backgroundColor?: string;
    padding?: string;
    maxWidth?: string;
  };
}

// Interface para tema do funil
export interface FunnelTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
  borderRadius: string;
}

// Definição de um bloco completo com schema
export interface BlockDefinition {
  type: string;
  label: string;
  icon: React.ElementType;
  category: 'content' | 'quiz' | 'funnel' | 'layout';
  propertiesSchema: PropertySchema[];
  defaultProperties: Record<string, any>;
  preview?: string; // URL ou caminho para preview do bloco
}

// Interface estendida para blocos com schema
export interface SchemaBlock extends Block {
  properties: Record<string, any>; // Propriedades configuráveis via painel
  schema?: PropertySchema[]; // Schema para validação e UI do painel
}

// =====================================================================
