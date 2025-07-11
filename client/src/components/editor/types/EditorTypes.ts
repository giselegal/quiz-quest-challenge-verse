/**
 * Block Types - ES7 Pattern
 * Definições de tipos para todos os blocos
 */

export interface BaseBlockProps {
  id: string;
  className?: string;
  style?: React.CSSProperties;
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
  onDoubleClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export interface BlockContent {
  // Conteúdo comum
  title?: string;
  subtitle?: string;
  text?: string;
  description?: string;
  
  // Mídia
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
  
  // Interação
  buttonText?: string;
  buttonUrl?: string;
  
  // Quiz específico
  question?: string;
  options?: QuestionOption[];
  multipleSelection?: boolean;
  maxSelections?: number;
  minSelections?: number;
  required?: boolean;
  
  // Header
  logoUrl?: string;
  showBackButton?: boolean;
  progressPercent?: number;
  
  // Layout
  alignment?: 'left' | 'center' | 'right';
  optionLayout?: 'vertical' | 'horizontal' | 'grid';
  showImages?: boolean;
  
  // Estilo
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
  padding?: string;
  margin?: string;
  
  // Dados dinâmicos
  [key: string]: any;
}

export interface QuestionOption {
  id: string;
  text: string;
  value: string;
  imageUrl?: string;
  category?: string;
}

export interface EditorBlock {
  id: string;
  type: BlockType;
  content: BlockContent;
  order: number;
  settings?: Record<string, any>;
  metadata?: {
    createdAt: Date;
    updatedAt: Date;
    version: string;
  };
}

export type BlockType = 
  | 'quiz-question'
  | 'quiz-intro'
  | 'quiz-result'
  | 'heading'
  | 'paragraph' 
  | 'image'
  | 'button'
  | 'testimonial'
  | 'pricing'
  | 'benefits'
  | 'faq'
  | 'countdown'
  | 'social-proof'
  | 'comparison-table'
  | 'product-carousel'
  | 'stats-metrics'
  | 'before-after'
  | 'advanced-cta';

export interface EditorState {
  blocks: EditorBlock[];
  selectedBlockId: string | null;
  isEditing: boolean;
  history: EditorBlock[][];
  currentHistoryIndex: number;
  isDirty: boolean;
  lastSaved: Date | null;
}

export interface EditorAction {
  type: string;
  payload?: any;
  meta?: {
    timestamp: Date;
    blockId?: string;
    undoable?: boolean;
  };
}
