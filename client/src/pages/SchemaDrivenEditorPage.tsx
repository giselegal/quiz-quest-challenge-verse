import React from 'react';
import { useParams } from 'react-router-dom';
import SchemaDrivenEditorResponsive from '@/components/editor/SchemaDrivenEditorResponsive';

const SchemaDrivenEditorPage: React.FC = () => {
  const { id } = useParams();
  const funnelId = id;

  return (
    <div className="min-h-screen bg-gray-100">
      <SchemaDrivenEditorResponsive funnelId={funnelId} />
    </div>
  );
};

export default SchemaDrivenEditorPage;
