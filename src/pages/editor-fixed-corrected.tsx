import SchemaDrivenEditorResponsive from '@/components/editor/SchemaDrivenEditorResponsive';
import { Quiz21StepsProvider } from '@/components/quiz/Quiz21StepsProvider';
import { EditorProvider } from '@/context/EditorContext';
import { EditorQuizProvider } from '@/context/EditorQuizContext';
import { FunnelsProvider } from '@/context/FunnelsContext';
import React from 'react';

/**
 * 🎯 PÁGINA DO EDITOR CORRIGIDA E ATUALIZADA
 *
 * Versão mais recente com todas as integrações:
 * - FunnelsProvider: Dados das etapas
 * - EditorProvider: Estado do editor
 * - EditorQuizProvider: Contexto do quiz
 * - Quiz21StepsProvider: Navegação integrada com analytics e Supabase
 */
const EditorFixedCorrectedPage: React.FC = () => {
  return (
    <FunnelsProvider debug={true}>
      <EditorProvider>
        <EditorQuizProvider>
          <Quiz21StepsProvider debug={true} initialStep={1}>
            <div className="h-screen w-full overflow-hidden bg-background">
              <SchemaDrivenEditorResponsive mode="editor" className="editor-main-container" />
            </div>
          </Quiz21StepsProvider>
        </EditorQuizProvider>
      </EditorProvider>
    </FunnelsProvider>
  );
};

export default EditorFixedCorrectedPage;
