import React from 'react';
import { EditorProvider } from '../../components/editor/EditorProvider';
import { NewUnifiedEditor } from '../../components/editor/NewUnifiedEditor';

const EditorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <EditorProvider storageKey="quiz21-editor-state">
        <NewUnifiedEditor />
      </EditorProvider>
    </div>
  );
};

export default EditorPage;
