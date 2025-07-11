
export interface EditableContent {
  title?: string;
  subtitle?: string;
  description?: string;
  text?: string;
  imageUrl?: string;
  imageAlt?: string;
  logoUrl?: string;
  logoHeight?: number;
  question?: string;
  progressPercent?: number;
  showBackButton?: boolean;
  multipleSelection?: boolean;
  maxSelections?: number;
  optionLayout?: 'grid' | 'list';
  showImages?: boolean;
  regularPrice?: string;
  salePrice?: string;
  ctaText?: string;
  ctaUrl?: string;
  url?: string;
  customImage?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  options?: Array<{
    id: string;
    text: string;
    imageUrl?: string;
  }>;
}

export type BlockType = 
  | 'header' 
  | 'quiz-question' 
  | 'progress' 
  | 'navigation' 
  | 'quiz-options' 
  | 'image' 
  | 'text' 
  | 'cta' 
  | 'pricing' 
  | 'style-result'
  | 'video'
  | 'two-column'
  | 'icon'
  | 'faq'
  | 'carousel'
  | 'custom-code'
  | 'animation-block';

export interface Block {
  id: string;
  type: BlockType;
  content: EditableContent;
  order: number;
  isSelected?: boolean;
}

export interface EditorBlock extends Block {
  // EditorBlock is now compatible with Block
}

export interface EditorConfig {
  blocks: Block[];
}

export interface ModernPropertyPanelProps {
  block: Block | null;
  onUpdate: (updates: Partial<Block>) => void;
}
