
/**
 * Editor Components Index
 * Exportações centralizadas dos componentes do editor
 */

// Componentes principais do editor (export default)
export { default as ComponentList } from './ComponentList';
export { default as PageEditorCanvas } from './PageEditorCanvas';
export { default as ModernQuizEditor } from './ModernQuizEditor';
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

// Painéis de propriedades (export both default and named)
export { default as PropertyPanel } from './PropertyPanel';
export { default as ModernPropertyPanel } from './ModernPropertyPanel';

// Layouts responsivos (export default)
export { default as SchemaDrivenEditorLayoutV2 } from './SchemaDrivenEditorLayoutV2';

// Testes e exemplos (export default)
export { default as SimpleEditorTest } from './SimpleEditorTest';
