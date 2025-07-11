
export interface StyleResult {
  style: string;
  category: string;
  points: number;
  percentage: number;
  rank: number;
}

export interface QuizQuestion {
  id: string;
  text: string;
  type: 'single' | 'multiple' | 'strategic';
  options: QuizOption[];
  maxSelections?: number;
}

export interface QuizOption {
  id: string;
  text: string;
  points: { [styleType: string]: number };
  image?: string;
}

export interface UserResponse {
  questionId: string;
  selectedOptions: string[];
  timestamp: number;
}

export interface ResultPageConfig {
  globalStyles?: {
    backgroundColor?: string;
    textColor?: string;
  };
  offer?: {
    hero?: {
      content?: any;
    };
  };
}
