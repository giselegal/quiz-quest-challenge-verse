
export interface EditableContent {
  title?: string;
  subtitle?: string;
  text?: string;
  imageUrl?: string;
  buttonText?: string;
  backgroundColor?: string;
  textColor?: string;
  caption?: string; // Add caption property
  responsive?: ResponsiveConfig; // Add responsive property
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
  [key: string]: any; // Allow dynamic properties
}

export interface ResponsiveConfig {
  mobile?: EditableContent;
  tablet?: EditableContent;
  desktop?: EditableContent;
}

export interface Block {
  id: string;
  type: BlockType;
  content: EditableContent;
  order: number;
  visible: boolean;
}

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
  | 'guarantee';

export interface EditorConfig {
  blocks: Block[];
  theme: EditorTheme;
  globalStyles?: GlobalStyles; // Add globalStyles property
  saveConfig?: () => void; // Add saveConfig method
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
