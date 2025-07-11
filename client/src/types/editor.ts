
export type BlockType = 
  | 'headline' 
  | 'text' 
  | 'image' 
  | 'button' 
  | 'spacer' 
  | 'divider'
  | 'testimonial'
  | 'testimonials'
  | 'benefits'
  | 'offer'
  | 'guarantee'
  | 'pricing'
  | 'cta'
  | 'header'
  | 'hero-section'
  | 'bonus-carousel'
  | 'style-result'
  | 'secondary-styles'
  | 'products'
  | 'quiz-question'
  | 'component-reference';

export interface EditableContent {
  [key: string]: any;
}

export interface PropertySchema {
  [key: string]: {
    type: string;
    label: string;
    default?: any;
    options?: any[];
  };
}

export interface EditorBlock {
  id: string;
  type: BlockType;
  content: EditableContent;
  order: number;
  properties?: EditableContent;
}

export interface Block extends EditorBlock {
  properties?: EditableContent;
}
