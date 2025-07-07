/**
 * Índice para componentes reutilizáveis de funil
 * 
 * Este arquivo exporta todos os componentes necessários para implementar
 * as 21 etapas de um funil completo (/quiz, /resultado, /quiz-descubra-seu-estilo)
 */

// Componentes para as 21 etapas do funil
export { default as FunnelIntroStep } from './steps/FunnelIntroStep';
export { default as NameCollectStep } from './steps/NameCollectStep';
export { default as QuizIntroStep } from './steps/QuizIntroStep';
export { default as QuestionMultipleStep } from './steps/QuestionMultipleStep';
export { default as QuizTransitionStep } from './steps/QuizTransitionStep';
export { default as ProcessingStep } from './steps/ProcessingStep';
export { default as ResultIntroStep } from './steps/ResultIntroStep';
export { default as ResultDetailsStep } from './steps/ResultDetailsStep';
export { default as ResultGuideStep } from './steps/ResultGuideStep';
export { default as OfferTransitionStep } from './steps/OfferTransitionStep';
export { default as OfferPageStep } from './steps/OfferPageStep';

// Componentes compartilhados entre etapas
export { default as FunnelProgressBar } from './shared/FunnelProgressBar';
export { default as FunnelNavigation } from './shared/FunnelNavigation';
export { default as AnimatedTransition } from './shared/AnimatedTransition';
export { default as QuizOption } from './shared/QuizOption';
export { default as ResultCard } from './shared/ResultCard';
export { default as StyleGuideViewer } from './shared/StyleGuideViewer';
export { default as OfferCard } from './shared/OfferCard';
export { default as CountdownTimer } from './shared/CountdownTimer';

// Componentes para edição visual (compatíveis com editor)
export { default as FunnelStepBlock } from './editor/FunnelStepBlock';
export { default as FunnelConfigProvider } from './editor/FunnelConfigProvider';

// Hook para lógica do funil
export { default as useFunnelNavigation } from './hooks/useFunnelNavigation';
export { default as useQuizProgress } from './hooks/useQuizProgress';
export { default as useQuizResult } from './hooks/useQuizResult';
