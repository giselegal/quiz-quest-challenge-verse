
import React from 'react';
import { useParams } from 'react-router-dom';
import SchemaDrivenEditorLayoutV2 from '@/components/editor/SchemaDrivenEditorLayoutV2';
import { EditorErrorBoundary } from '@/components/editor/EditorErrorBoundary';

const SchemaDrivenEditorPage: React.FC = () => {
  const { id } = useParams();
  const funnelId = id;

  return (
    <EditorErrorBoundary>
      <div className="min-h-screen bg-gray-100">
        <SchemaDrivenEditorLayoutV2 funnelId={funnelId} />
      </div>
    </EditorErrorBoundary>
  );
};

export default SchemaDrivenEditorPage;
