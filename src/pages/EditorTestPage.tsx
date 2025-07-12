/**
 * Editor Test Page - ES7 Pattern
 * Página para testar o novo editor reorganizado
 */

import React from 'react';
import { VisualEditor } from '@/components/editor';

const EditorTestPage: React.FC = () => {
  const handleSave = (blocks: any[]) => {
    console.log('Salvando blocos:', blocks);
    // Aqui você pode implementar a lógica de save
  };

  return (
    <div className="editor-test-page">
      <VisualEditor
        onSave={handleSave}
        className="h-screen"
      />
    </div>
  );
};

export default EditorTestPage;
