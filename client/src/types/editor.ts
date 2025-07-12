
export interface EditableContent {
  title?: string;
  subtitle?: string;
  text?: string;
  imageUrl?: string;
  buttonText?: string;
  backgroundColor?: string;
  textColor?: string;
  caption?: string;
  responsive?: ResponsiveConfig;
  animationType?: string;
  animationDuration?: number;
  animationDelay?: number;
  animationTrigger?: string;
  image?: string;
  size?: number;
  color?: string;
  position?: string;
  width?: number;
  borderRadius?: number;
  height?: number;
  testimonialsImage?: string;
  properties?: Record<string, any>;
  items?: string[];
  [key: string]: any;
}

export interface ResponsiveConfig {
  mobile?: EditableContent;
  tablet?: EditableContent;
  desktop?: EditableContent;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
  mobileWidth?: string;
  tabletWidth?: string;
}

export interface Block {
  id: string;
  type: BlockType;
  content: EditableContent;
  order: number;
  visible: boolean;
  properties: Record<string, any>; // Changed from optional to required
}

// Add EditorBlock as an alias for Block for backward compatibility
export type EditorBlock = Block;

export type BlockType = 
  | 'header' 
  | 'text' 
  | 'image' 
  | 'button' 
  | 'spacer' 
  | 'divider' 
  | 'testimonial'
  | 'offer' 
  | 'hero-section' 
  | 'secondary-styles' 
  | 'products' 
  | 'component-reference'
  | 'icon'
  | 'guarantee'
  | 'headline'
  | 'benefits'
  | 'testimonials'
  | 'pricing'
  | 'cta'
  | 'quiz-question'
  | 'bonus-carousel'
  | 'style-result';

export interface EditorConfig {
  blocks: Block[];
  theme: EditorTheme;
  globalStyles?: GlobalStyles;
  saveConfig?: () => void;
}

export interface GlobalStyles {
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  fontSize?: string;
}

export interface EditorTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

export interface EditorState {
  config: EditorConfig;
  selectedBlockId: string | null;
  isPreviewMode: boolean;
}
