import React from 'react';
import { EditorUnifiedProvider } from '../../context/EditorUnifiedProvider';
import { EditorProUnified } from '../../legacy/editor/EditorProUnified';

const EditorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <EditorUnifiedProvider>
        <EditorProUnified />
      </EditorUnifiedProvider>
    </div>
  );
};

export default EditorPage;
