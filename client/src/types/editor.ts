
export type BlockType = 
  | 'headline' 
  | 'text' 
  | 'image' 
  | 'button' 
  | 'spacer' 
  | 'divider'
  | 'testimonial'
  | 'benefits'
  | 'offer'
  | 'guarantee';

export interface EditorBlock {
  id: string;
  type: BlockType;
  content: any;
  order: number;
}

export interface Block extends EditorBlock {
  // Additional block properties can go here
}
