
export interface QuizOption {
  id: string;
  text: string;
  imageUrl?: string;
  points?: Record<string, number>;
  styleCategory?: string;
}

export interface QuizQuestion {
  id: string;
  title: string;
  text?: string;
  type: 'single' | 'multiple' | 'strategic';
  options: QuizOption[];
  multiSelect?: number;
  question?: string;
}

export interface UserResponse {
  questionId: string;
  selectedOptions: string[];
  answers?: string[];
}

export interface QuizResponse {
  questionId: string;
  selectedOptions: string[];
}

export interface QuizResult {
  primaryStyle: string;
  secondaryStyles: string[];
  scores: Record<string, number>;
}

export interface StyleResult {
  id: string;
  name: string;
  description: string;
  percentage: number;
  color: string;
}

export interface SimpleComponent {
  type: string;
  props: Record<string, any>;
}

export interface OptimizedImageOptions {
  width?: number;
  height?: number;
  alt?: string;
}

export interface ImageMetadata {
  src: string;
  width?: number;
  height?: number;
}
