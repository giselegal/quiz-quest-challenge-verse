
export interface StyleResult {
  style: string;
  category: string;
  points: number;
  percentage: number;
  rank: number;
  score: number;
}

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

// Adicionar QuizResult que estava faltando
export interface QuizResult {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
}

// Tipos específicos do Supabase
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
