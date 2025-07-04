
// Tipos para o sistema de quiz e cálculo de estilos CaktoQuiz

export type StyleType = 
  | 'classico'
  | 'romantico' 
  | 'dramatico'
  | 'natural'
  | 'criativo'
  | 'elegante'
  | 'sensual'
  | 'contemporaneo';

export interface Style {
  id: StyleType;
  name: string;
  description: string;
  imageUrl: string;
  guideImageUrl: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  keywords: string[];
}

export interface QuizQuestion {
  id: string;
  order: number;
  question: string;
  type: 'normal' | 'strategic';
  options: QuizOption[];
  imageUrl?: string;
  multiSelect?: number; // Para questões que permitem múltiplas seleções
}

export interface QuizOption {
  id: string;
  text: string;
  style?: StyleType; // Para questões normais
  imageUrl?: string;
  weight?: number; // Peso da resposta (padrão 1)
}

export interface QuizResponse {
  questionId: string;
  selectedOptionId: string;
  selectedStyle?: StyleType;
  timestamp: Date;
}

export interface StyleScore {
  style: StyleType;
  points: number;
  percentage: number;
  rank: number; // 1º, 2º, 3º lugar
}

export interface QuizResult {
  id: string;
  participantName: string;
  responses: QuizResponse[];
  styleScores: StyleScore[];
  predominantStyle: StyleType;
  complementaryStyles: StyleType[]; // 2º e 3º lugar
  totalNormalQuestions: number;
  calculatedAt: Date;
  // Para analytics
  utmParams?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
}

export interface QuizSession {
  id: string;
  participantName?: string;
  currentQuestionIndex: number;
  responses: QuizResponse[];
  startedAt: Date;
  completedAt?: Date;
  result?: QuizResult;
}

// Tipos de compatibilidade e outros
export interface QuizComponentData {
  id: string;
  type: string;
  content: any;
  position: number;
  data?: any;
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
  | "custom-code"
  | "heading"
  | "paragraph";
  points?: number;
}
