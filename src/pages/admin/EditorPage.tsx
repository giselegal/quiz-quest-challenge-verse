import React from 'react';
import { EditorProvider } from '../../components/editor/EditorProvider';
import { UnifiedEditor } from '../../components/editor/UnifiedEditor';

const EditorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <EditorProvider storageKey="quiz21-editor-state">
        <UnifiedEditor />
      </EditorProvider>
    </div>
  );
};

export default EditorPage;
