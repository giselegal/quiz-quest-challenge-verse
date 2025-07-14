/**
 * Tipos para componentes reutilizáveis de funil
 */

// Tipo principal para as 21 etapas
export type FunnelStepType =
  | 'intro'               // Etapa 1: Introdução ao quiz
  | 'name-collect'        // Etapa 2: Coleta de nome
  | 'quiz-intro'          // Etapa 3: Introdução às perguntas 
  | 'question-multiple'   // Etapa 4-14: Perguntas de quiz (11 perguntas)
  | 'quiz-transition'     // Etapa 15: Transição entre quiz e resultado
  | 'processing'          // Etapa 16: Processamento do resultado
  | 'result-intro'        // Etapa 17: Introdução ao resultado
  | 'result-details'      // Etapa 18: Detalhes do resultado
  | 'result-guide'        // Etapa 19: Guia baseado no resultado
  | 'offer-transition'    // Etapa 20: Transição para oferta
  | 'offer-page';         // Etapa 21: Página da oferta final

// Interface base para componentes de funil
export interface FunnelComponentProps {
  id: string;
  className?: string;
  style?: React.CSSProperties;
  isEditable?: boolean;
  onEdit?: () => void;
  data?: Record<string, any>;
}

// Props para cada tipo de etapa
export interface FunnelStepProps extends FunnelComponentProps {
  stepType: FunnelStepType;
  stepNumber: number;
  totalSteps: number;
  onNext?: () => void;
  onPrevious?: () => void;
  isActive?: boolean;
}

// Interface para configuração de etapas do funil
export interface FunnelConfig {
  steps: FunnelStepConfig[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
  };
  settings: {
    showProgressBar: boolean;
    autoAdvance: boolean;
    enableHistory: boolean;
    analyticsEnabled: boolean;
  };
}

// Config para uma etapa específica
export interface FunnelStepConfig {
  id: string;
  stepType: FunnelStepType;
  title: string;
  content?: any;
  settings?: Record<string, any>;
  conditions?: {
    nextStep?: string;
    skipIf?: string;
    showIf?: string;
  };
}

// Tipos específicos para dados de perguntas
export interface QuizQuestionData {
  id: string;
  question: string;
  imageUrl?: string;
  options: QuizOptionData[];
  multiSelect?: boolean;
  maxSelections?: number;
}

export interface QuizOptionData {
  id: string;
  text: string;
  imageUrl?: string;
  value: string;
  category?: string;
}

// Tipo para dados de resultado
export interface ResultData {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  guideImageUrl?: string;
  recommendations?: string[];
}
