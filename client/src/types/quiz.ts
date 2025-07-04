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
  multiSelect?: number;
}

export interface QuizOption {
  id: string;
  text: string;
  style?: StyleType;
  imageUrl?: string;
  weight?: number;
}

export interface QuizResponse {
  questionId: string;
  selectedOptionIds: string[]; // Array para múltiplas seleções
  selectedStyles?: StyleType[]; // Estilos das opções selecionadas
  timestamp: Date;
}

export interface StyleScore {
  style: StyleType;
  points: number;
  percentage: number;
  rank: number;
}

export interface QuizResult {
  id: string;
  participantName: string;
  responses: QuizResponse[];
  styleScores: StyleScore[];
  predominantStyle: StyleType;
  complementaryStyles: StyleType[];
  totalNormalQuestions: number;
  calculatedAt: Date;
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

// Engine de cálculo
export interface StyleCalculationEngine {
  calculateStyleScores(responses: QuizResponse[]): StyleScore[];
  determineResult(responses: QuizResponse[], participantName: string): QuizResult;
  getStyleRanking(styleScores: StyleScore[]): StyleScore[];
}

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