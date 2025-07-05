'use client';

import React from 'react';
import SchemaDrivenEditorLayoutV2 from '@/components/editor/SchemaDrivenEditorLayoutV2';

/**
 * Página principal do Editor de Funis
 * 
 * Utiliza a versão V2 do editor que inclui:
 * - Persistência automática com backend
 * - Sistema de versionamento
 * - Auto-save
 * - Sincronização online/offline
 * - Interface aprimorada com status de sync
 */
export default function EditorPage() {
  return (
    <div className="min-h-screen">
      <SchemaDrivenEditorLayoutV2 />
    </div>
  );
}
