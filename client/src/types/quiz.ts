
export interface QuizOption {
  id: string;
  text: string;
  image?: string;
  imageUrl?: string;
  description?: string;
  points?: Record<string, number>;
  styleCode?: string;
}

export interface QuizQuestion {
  id: string;
  title: string;
  text: string;
  type: 'multiple' | 'single';
  imageUrl?: string;
  options: QuizOption[];
  required?: boolean;
}

export interface UserResponse {
  questionId: string;
  selectedOptionId: string;
  selectedOptionIds?: string[];
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
