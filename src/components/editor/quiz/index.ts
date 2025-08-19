/**
 * Index file for modular quiz components
 * Exports all quiz-related components for easy importing
 */

export { QuizFlowPage, type QuizMode, type QuizFlowPageProps, type QuizState } from './QuizFlowPage';
export { QuizNavigationBlock, type QuizNavigationBlockProps } from './QuizNavigationBlock';
export { QuizStepRenderer, type QuizStepRendererProps } from './QuizStepRenderer';
export { QuizDataManager, type QuizDataManagerProps } from './QuizDataManager';
export { QuizValidationSystem, type QuizValidationSystemProps, type ValidationRule, type StepValidationConfig } from './QuizValidationSystem';
export { QuizScoreCalculator, type QuizScoreCalculatorProps, type ScoreConfig, type StyleScore } from './QuizScoreCalculator';
export { QuizQuestionBlockModular, type QuizQuestionBlockModularProps, type QuestionData, type QuestionOption } from './QuizQuestionBlockModular';
export { QuizEditorExample, type QuizEditorExampleProps } from './QuizEditorExample';

// Re-export the original QuizQuestionBlock for backward compatibility
export { default as QuizQuestionBlock } from './QuizQuestionBlock';