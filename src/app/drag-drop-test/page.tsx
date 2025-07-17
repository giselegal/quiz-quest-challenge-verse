'use client';

import React from 'react';
import SchemaDrivenEditorResponsive from '@/components/editor/SchemaDrivenEditorResponsive';

export default function DragDropTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">🎯 Teste de Drag & Drop - Editor Ativado</h1>
        <p className="text-gray-600 mb-6">
          O sistema de drag & drop foi ativado no SchemaDrivenEditorResponsive. 
          Arraste componentes da barra lateral para o canvas!
        </p>
      </div>
      <SchemaDrivenEditorResponsive />
    </div>
  );
}
