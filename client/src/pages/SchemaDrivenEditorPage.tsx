import React from 'react';
import { useRoute } from 'wouter';

// Placeholder para o editor por enquanto
const SchemaDrivenEditorResponsive = ({ funnelId }: { funnelId?: string }) => (
  <div className="p-8 text-center">
    <h1 className="text-3xl font-bold mb-4">Editor de Funis</h1>
    <p className="text-gray-600 mb-4">
      {funnelId ? `Editando funil: ${funnelId}` : 'Editor principal de funis'}
    </p>
    <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
      <p className="text-lg">
        O editor está sendo implementado. Em breve você poderá criar e editar seus funis aqui.
      </p>
    </div>
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