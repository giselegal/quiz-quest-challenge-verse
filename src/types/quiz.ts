
export interface StyleResult {
  category: 'Natural' | 'Clássico' | 'Contemporâneo' | 'Elegante' | 'Romântico' | 'Sexy' | 'Dramático' | 'Criativo' | 'Strategic';
  score: number;
  percentage: number;
  name?: string;
  description?: string;
}

export interface QuizResult {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  totalSelections: number;
  userName: string;
}

export interface UserResponse {
  questionId: string;
  selectedOptions: string[];
}

export interface QuizComponentData {
  id: string;
  type: string;
  content: any;
  data?: any;
}

export interface QuizOption {
  id: string;
  text: string;
  imageUrl?: string;
  styleCategory: StyleResult['category'];
  points?: number;
}

export interface QuizQuestion {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  options: QuizOption[];
  multiSelect?: number;
  type: 'single' | 'multiple' | 'text' | 'both' | 'image';
}

// Block types for result editor
export type BlockType = 'headline' | 'text' | 'image' | 'cta' | 'testimonial' | 'features' | 'transformation' | 'bonus' | 'heading' | 'paragraph' | 'button' | 'benefits';
