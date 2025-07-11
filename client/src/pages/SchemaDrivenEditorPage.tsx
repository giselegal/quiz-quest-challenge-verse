import React from 'react';
import { useRoute } from 'wouter';
import SchemaDrivenEditorResponsive from '@/components/editor/SchemaDrivenEditorResponsive';

const SchemaDrivenEditorPage: React.FC = () => {
  const [match, params] = useRoute('/editor/:id');
  const funnelId = params?.id;

  return (
    <div className="min-h-screen bg-gray-100">
      <SchemaDrivenEditorResponsive />
    </div>
  );
};

export default SchemaDrivenEditorPage;
