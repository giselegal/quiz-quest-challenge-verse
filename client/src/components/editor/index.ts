/**
 * Editor Components Index
 * Exportações centralizadas dos componentes do editor
 */

// Componentes principais do editor (export default)
export { default as ComponentList } from './ComponentList';
export { default as PageEditorCanvas } from './PageEditorCanvas';
export { default as ModernQuizEditor } from './ModernQuizEditor';
export { default as ModularQuizEditor } from './ModularQuizEditor';
export { default as EditorLayout } from './EditorLayout';
export { default as SalesPageEditor } from './SalesPageEditor';
export { default as QuizEditorInterface } from './QuizEditorInterface';
export { default as QuizEditorSteps } from './QuizEditorSteps';

// Componentes de UI e blocos (export named)
export { AddBlockButton } from './AddBlockButton';
export { BlockRenderer } from './BlockRenderer';
export { EditorBlockItem } from './EditorBlockItem';
export { EditBlockContent } from './EditBlockContent';
export { EmptyEditor } from './EmptyEditor';

// Painéis de propriedades (export named)
export { PropertyPanel } from './PropertyPanel';
export { ModernPropertyPanel } from './ModernPropertyPanel';

// Layouts responsivos (export default)
export { default as SchemaDrivenEditorResponsive } from './SchemaDrivenEditorResponsive';

// Testes e exemplos (export default)
export { default as EditorTestPage } from './EditorTestPage';
export { default as SimpleEditorTest } from './SimpleEditorTest';
