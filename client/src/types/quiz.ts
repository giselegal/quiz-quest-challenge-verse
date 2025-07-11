
// Core quiz types
export interface QuizQuestion {
  id: string;
  text: string;
  title?: string;
  question?: string;
  type: 'single' | 'multiple' | 'strategic' | 'text' | 'image' | 'both';
  options: QuizOption[];
  maxSelections?: number;
  multiSelect?: number;
  imageUrl?: string;
}

export interface QuizOption {
  id: string;
  text: string;
  points: { [styleType: string]: number };
  image?: string;
  imageUrl?: string;
  styleCategory?: string;
  style?: string;
  description?: string;
  weight?: number;
}

export interface UserResponse {
  questionId: string;
  selectedOptions: string[];
  timestamp: number;
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
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  predominantStyle?: string;
  complementaryStyles?: string[];
  styleScores?: { [key: string]: number };
  participantName?: string;
  totalNormalQuestions?: number;
}

// Additional types for compatibility
export interface QuizResponse {
  questionId: string;
  selectedOptions: string[];
  timestamp: number;
}

export interface StyleType {
  id: string;
  name: string;
  description?: string;
  color_primary?: string;
  color_secondary?: string;
}

export interface BlockType {
  id: string;
  type: string;
  content: any;
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

// Supabase types
export interface SupabaseQuizQuestion {
  id: string;
  quiz_id?: string;
  order_index: number;
  required_selections?: number;
  active?: boolean;
  created_at?: string;
  title: string;
  type: string;
  question_options?: SupabaseQuestionOption[];
}

export interface SupabaseQuestionOption {
  id: string;
  question_id?: string;
  points?: number;
  order_index: number;
  created_at?: string;
  text: string;
  image_url?: string;
  style_code?: string;
}

export interface SupabaseQuizParticipant {
  id: string;
  quiz_id?: string;
  created_at?: string;
  name?: string;
  email?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface SupabaseStyleResult {
  id: string;
  participant_id?: string;
  points?: number;
  percentage?: number;
  is_primary?: boolean;
  rank?: number;
  created_at?: string;
  style_type_id?: string;
}
