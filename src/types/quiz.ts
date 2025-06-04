export interface StyleResult {
  category: 'Natural' | 'Clássico' | 'Contemporâneo' | 'Elegante' | 'Romântico' | 'Sexy' | 'Dramático' | 'Criativo';
  score: number;
  percentage: number;
}

export interface QuizResult {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  totalSelections: number;
  userName?: string; // Make it optional to fix build errors
}

export interface QuizComponentData {
  id: string;
  type: string;
  content: any;
  position: number;
}

export type BlockType =
  | "hero"
  | "image"
  | "text"
  | "video"
  | "button"
  | "divider"
  | "spacer"
  | "code"
  | "list"
  | "table"
  | "form"
  | "social"
  | "map"
  | "raw-html"
  | "raw-js"
  | "transformation"
  | "pricing"
  | "testimonials"
  | "guarantee"
  | "faq"
  | "bonus"
  | "scarcity-timer"
  | "dynamic-content"
  | "integrations"
  | "legal"
  | "custom-code";

export interface UserResponse {
  questionId: string;
  selectedOptions: string[];
}

export interface QuizQuestion {
  id: string;
  title: string;
  type: 'image' | 'text';
  options: QuizOption[];
  multiSelect: number;
  imageUrl?: string;
}

export interface QuizOption {
  id: string;
  text: string;
  styleCategory: string;
  imageUrl?: string;
}
