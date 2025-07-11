/**
 * Página de Teste do Editor Reorganizado
 * Substitui os editores confusos por uma estrutura limpa
 */

import React from 'react';
import { EditorProvider } from './core/EditorContext';
import EditorMain from './core/EditorMain';

const OrganizedEditorTestPage: React.FC = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5'
    }}>
      {/* Header informativo */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ 
            margin: '0 0 8px 0', 
            fontSize: '24px', 
            fontWeight: 'bold',
            color: '#1f2937'
          }}>
            🎯 Editor Reorganizado
          </h1>
          <p style={{ 
            margin: 0, 
            color: '#6b7280', 
            fontSize: '14px' 
          }}>
            Estrutura limpa e organizada • Core + UI + Utils • Context centralizado
          </p>
        </div>
      </div>

      {/* Editor */}
      <EditorProvider>
        <EditorMain />
      </EditorProvider>
    </div>
  );
};

export default OrganizedEditorTestPage;
