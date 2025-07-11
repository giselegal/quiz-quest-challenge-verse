
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
  // Additional properties for missing fields
  logo?: string;
  logoAlt?: string;
  logoWidth?: string;
  buttonText?: string;
  alignment?: 'left' | 'center' | 'right';
  heroImage?: string;
  heroImageAlt?: string;
  heroImage2?: string;
  quote?: string;
  quoteAuthor?: string;
  urgencyText?: string;
  items?: string[];
  bonusImages?: Array<{
    url: string;
    alt: string;
    title?: string;
  }>;
  useIcons?: boolean;
  icon?: string;
  iconColor?: string;
  style?: Record<string, any>;
  options?: Array<{
    id: string;
    text: string;
    imageUrl?: string;
  }>;
  // New properties to fix the errors
  animationType?: string;
  animationDuration?: string;
  animationDelay?: string;
  animationTrigger?: string;
  image?: string;
  size?: string;
  color?: string;
  position?: string;
  width?: string;
  borderRadius?: string;
  height?: string;
  testimonialsImage?: string;
  caption?: string;
  responsive?: Record<string, any>;
  // Add index signature to allow dynamic property access
  [key: string]: any;
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
  | 'animation-block'
  | 'headline'
  | 'benefits'
  | 'testimonials'
  | 'guarantee'
  | 'hero'
  | 'bonus-carousel'
  | 'button'
  | 'spacer'
  | 'divider'
  | 'testimonial'
  | 'offer'
  | 'hero-section'
  | 'secondary-styles'
  | 'products'
  | 'component-reference';

export interface Block {
  id: string;
  type: BlockType;
  content: EditableContent;
  order: number;
  isSelected?: boolean;
  properties?: Record<string, any>;
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
