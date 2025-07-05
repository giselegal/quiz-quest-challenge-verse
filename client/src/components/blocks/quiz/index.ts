/**
 * Componentes de Quiz Reutilizáveis
 * 
 * Blocos 100% editáveis para uso no editor visual /advanced-editor
 * Cada componente é totalmente configurável via props e pode ser usado
 * independentemente ou integrado com o DynamicBlockRenderer.
 */

export { default as QuizQuestionBlock } from './QuizQuestionBlock';
export { default as QuizProgressBlock } from './QuizProgressBlock';
export { default as QuizNavigationBlock } from './QuizNavigationBlock';
export { default as QuizTransitionBlock } from './QuizTransitionBlock';

// Re-export types para facilitar importação
export type { QuizQuestionBlockProps, QuestionOption } from './QuizQuestionBlock';
export type { QuizProgressBlockProps } from './QuizProgressBlock';
export type { QuizNavigationBlockProps } from './QuizNavigationBlock';
export type { QuizTransitionBlockProps } from './QuizTransitionBlock';
