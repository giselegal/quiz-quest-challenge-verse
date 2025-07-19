import React from 'react';
import { useRoute } from 'wouter';
import SchemaDrivenEditorResponsive from '../components/editor/SchemaDrivenEditorResponsive';

const SchemaDrivenEditorPage: React.FC = () => {
  const [match, params] = useRoute('/editor/:id');
  const funnelId = params?.id;

  // Use o editor responsivo com sistema Save/Publish integrado
  return <SchemaDrivenEditorResponsive funnelId={funnelId} />;
};

export default SchemaDrivenEditorPage;
