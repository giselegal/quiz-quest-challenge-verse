import SchemaDrivenEditorResponsive from '@/components/editor/SchemaDrivenEditorResponsive';
import { Quiz21StepsProvider } from '@/components/quiz/Quiz21StepsProvider';
import { EditorProvider } from '@/context/EditorContext';
import { EditorQuizProvider } from '@/context/EditorQuizContext';
import { FunnelsProvider } from '@/context/FunnelsContext';
import React from 'react';

/**
 * 🎯 PÁGINA PRINCIPAL DO EDITOR
 *
 * Integra todos os contextos necessários e o layout responsivo
 * com as 21 etapas do quiz de estilo pessoal
 */
const EditorPage: React.FC = () => {
  return (
    <FunnelsProvider debug={true}>
      <EditorProvider>
        <EditorQuizProvider>
          <Quiz21StepsProvider debug={true}>
            <div className="h-screen w-full overflow-hidden bg-background">
              <SchemaDrivenEditorResponsive />
            </div>
          </Quiz21StepsProvider>
        </EditorQuizProvider>
      </EditorProvider>
    </FunnelsProvider>
  );
};

export default EditorPage;
