
export interface QuizOption {
  id: string;
  text: string;
  image?: string;
  imageUrl?: string;
  description?: string;
  points?: Record<string, number>;
  styleCode?: string;
  styleCategory?: string;
  weight?: number;
}

export interface QuizQuestion {
  id: string;
  title: string;
  text: string;
  question?: string; // Added for backward compatibility
  type: 'multiple' | 'single' | 'both' | 'image' | 'text' | 'strategic';
  imageUrl?: string;
  options: QuizOption[];
  required?: boolean;
  multiSelect?: number; // Added for multi-select support
}

export interface UserResponse {
  questionId: string;
  selectedOptionId: string;
  selectedOptionIds?: string[];
  selectedOptions?: string[]; // Added for backward compatibility
  timestamp?: number;
  answers?: string[];
  styleCategories?: string[];
}

export interface StyleResult {
  style: string;
  category: string;
  points: number;
  percentage: number;
  rank: number;
  score: number;
}

export interface QuizResult {
  id: string;
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  responses: UserResponse[];
  completedAt: Date;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  active: boolean;
}
