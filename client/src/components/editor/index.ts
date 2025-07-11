/**
 * Editor Components Index - ES7 Pattern
 * Exportações centralizadas dos componentes do editor
 */

// Legacy exports (mantidos para compatibilidade)
export { default as ComponentList } from './ComponentList';
export { default as PageEditorCanvas } from './PageEditorCanvas';
export { default as ModernQuizEditor } from './ModernQuizEditor';

// New ES7 components
export { VisualEditor } from './components/VisualEditor';
export { EditorSidebar } from './components/EditorSidebar';
export { EditorCanvas } from './components/EditorCanvas';
export { EditorProperties } from './components/EditorProperties';
export { EditorToolbar } from './components/EditorToolbar';
export { BlockRenderer } from './components/BlockRenderer';

// Hooks
export { useEditor } from './hooks/useEditor';

// Types
export type {
  BaseBlockProps,
  BlockContent,
  EditorBlock,
  EditorState,
  EditorAction,
  QuestionOption,
  BlockType
} from './types/EditorTypes';

// Config
export { EDITOR_CONFIG } from './config/EditorConfig';

// Default export - Main Editor
export { VisualEditor as default } from './components/VisualEditor';
