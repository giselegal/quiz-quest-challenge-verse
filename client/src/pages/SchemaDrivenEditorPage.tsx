import React from 'react';
import { useRoute } from 'wouter';
import SchemaDrivenEditorLayoutV2 from '@/components/editor/SchemaDrivenEditorLayoutV2';

const SchemaDrivenEditorPage: React.FC = () => {
  const [match, params] = useRoute('/editor/:id');
  const funnelId = params?.id;

  return (
    <div className="min-h-screen bg-gray-100">
      <SchemaDrivenEditorLayoutV2 funnelId={funnelId} />
    </div>
  );
};

export default SchemaDrivenEditorPage;
