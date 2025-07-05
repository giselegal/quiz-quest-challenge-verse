'use client';

import React from 'react';
import SchemaDrivenEditorLayoutV2 from '@/components/editor/SchemaDrivenEditorLayoutV2';

interface FunnelEditorPageProps {
  params: {
    id: string;
  };
}

/**
 * Página de edição de funil específico
 * 
 * Carrega automaticamente o funil pelo ID e permite:
 * - Edição em tempo real
 * - Auto-save
 * - Versionamento
 * - Colaboração (futuro)
 */
export default function FunnelEditorPage({ params }: FunnelEditorPageProps) {
  return (
    <div className="min-h-screen">
      <SchemaDrivenEditorLayoutV2 
        funnelId={params.id}
      />
    </div>
  );
}
