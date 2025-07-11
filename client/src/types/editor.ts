
export interface EditorBlock {
  id: string;
  type: string;
  content: EditableContent;
  order?: number;
  properties?: any;
}

export interface Block {
  id: string;
  type: string;
  content: any;
  order: number;
}

export interface EditableContent {
  title?: string;
  subtitle?: string;
  text?: string;
  items?: string[];
  buttonText?: string;
  salePrice?: string;
  textColor?: string;
  alignment?: string;
  logo?: string;
  logoAlt?: string;
  heroImage?: string;
  heroImageAlt?: string;
  quote?: string;
  quoteAuthor?: string;
  bonusImages?: Array<{
    url: string;
    alt: string;
    title?: string;
  }>;
}

export type BlockType = 
  | 'headline' 
  | 'text' 
  | 'image' 
  | 'benefits' 
  | 'testimonials' 
  | 'pricing' 
  | 'guarantee' 
  | 'cta'
  | 'header'
  | 'hero'
  | 'bonus-carousel'
  | 'video'
  | 'two-column'
  | 'icon'
  | 'faq'
  | 'carousel'
  | 'custom-code'
  | 'animation-block';

export interface EditorConfig {
  blocks: EditorBlock[];
}
