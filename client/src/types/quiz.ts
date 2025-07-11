
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
  style?: string; // Add style property for mapping
  value?: string; // Add value property
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
  selectedStyles?: string[]; // Added for engine compatibility
  selectedStyle?: string; // Add selectedStyle property
}

export interface StyleResult {
  style: string;
  category: string;
  points: number;
  percentage: number;
  rank: number;
  score: number;
  id?: string; // Added for compatibility
  name?: string; // Added for compatibility
}

export interface QuizResult {
  id: string;
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  responses: UserResponse[];
  completedAt: number;
  participantName?: string;
  styleScores?: StyleScore[]; // Add styleScores property
  predominantStyle?: StyleResult; // Add predominantStyle property
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  active: boolean;
}

// Export additional types that are referenced in other files
export type StyleType = 'natural' | 'classico' | 'contemporaneo' | 'elegante' | 'romantico' | 'sensual' | 'dramatico' | 'criativo';
export type Style = StyleResult;
export type QuizResponse = UserResponse;
export interface StyleScore {
  style: StyleType;
  points: number;
  percentage: number;
  rank: number;
}
export type StyleCalculationEngine = any; // Placeholder type

// Add QuizComponentData export for unifiedEditor
export interface QuizComponentData {
  id: string;
  type: string;
  content: any;
  data: any; // Add data property
  order: number;
}
