import React from 'react';
import { useRoute } from 'wouter';
import EditorPage from '../app/editor/page';

const SchemaDrivenEditorPage: React.FC = () => {
  const [match, params] = useRoute('/editor/:id');
  const funnelId = params?.id;

  // Use nosso editor principal melhorado
  return <EditorPage />;
};

export default SchemaDrivenEditorPage;
