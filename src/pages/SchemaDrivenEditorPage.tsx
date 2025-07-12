import React from 'react';
import { useRoute } from 'wouter';
// import SchemaDrivenEditorResponsive from '@/components/editor/SchemaDrivenEditorResponsive'; // Temporarily disabled

// Placeholder component
const SchemaDrivenEditorResponsive = ({ funnelId }: { funnelId?: string }) => (
  <div className="p-8 text-center">
    <h1 className="text-2xl font-bold mb-4">Editor Visual</h1>
    <p className="text-gray-600">Editor de funil {funnelId || 'principal'}</p>
    <p className="text-sm text-gray-500 mt-2">Componente em desenvolvimento</p>
  </div>
);

const SchemaDrivenEditorPage: React.FC = () => {
  const [match, params] = useRoute('/editor/:id');
  const funnelId = params?.id;

  return (
    <div className="min-h-screen bg-gray-100">
      <SchemaDrivenEditorResponsive funnelId={funnelId} />
    </div>
  );
};

export default SchemaDrivenEditorPage;
