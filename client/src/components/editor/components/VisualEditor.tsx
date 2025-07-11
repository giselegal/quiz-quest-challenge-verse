/**
 * Visual Editor - ES7 Pattern
 * Componente principal do editor visual reorganizado
 */

import React, { useEffect } from 'react';
import { useEditor } from '../hooks/useEditor';
import { EditorSidebar } from './EditorSidebar';
import { EditorCanvas } from './EditorCanvas';
import { EditorProperties } from './EditorProperties';
import { EditorToolbar } from './EditorToolbar';
import { EDITOR_CONFIG } from '../config/EditorConfig';

interface VisualEditorProps {
  className?: string;
  onSave?: (blocks: any[]) => void;
  initialBlocks?: any[];
}

export const VisualEditor: React.FC<VisualEditorProps> = ({
  className = '',
  onSave,
  initialBlocks = []
}) => {
  const editor = useEditor();

  // Carregar blocos iniciais
  useEffect(() => {
    if (initialBlocks.length > 0) {
      // Implementar carregamento de blocos iniciais
    } else {
      editor.loadFromStorage();
    }
  }, [initialBlocks, editor.loadFromStorage]);

  // Callback de save
  useEffect(() => {
    if (onSave && editor.isDirty) {
      onSave(editor.blocks);
    }
  }, [editor.blocks, editor.isDirty, onSave]);

  return (
    <div className={`visual-editor min-h-screen bg-gray-50 ${className}`}>
      {/* Toolbar superior */}
      <EditorToolbar
        onSave={editor.save}
        isLoading={editor.isLoading}
        isDirty={editor.isDirty}
        error={editor.error}
        onClearError={editor.clearError}
      />

      {/* Layout principal */}
      <div className="editor-layout flex h-[calc(100vh-64px)]">
        {/* Sidebar esquerda - Componentes */}
        <EditorSidebar
          onAddBlock={editor.addBlock}
          className="flex-shrink-0"
          style={{ width: EDITOR_CONFIG.layout.sidebar.width }}
        />

        {/* Canvas central */}
        <EditorCanvas
          blocks={editor.blocks}
          selectedBlockId={editor.selectedBlockId}
          onSelectBlock={editor.selectBlock}
          onUpdateBlock={editor.updateBlock}
          onDeleteBlock={editor.deleteBlock}
          className="flex-1"
        />

        {/* Properties panel direita */}
        <EditorProperties
          selectedBlock={editor.selectedBlock}
          onUpdateBlock={editor.updateBlock}
          onDeleteBlock={editor.deleteBlock}
          className="flex-shrink-0"
          style={{ width: EDITOR_CONFIG.layout.properties.width }}
        />
      </div>

      {/* Status bar ou notificações */}
      {editor.error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {editor.error}
          <button
            onClick={editor.clearError}
            className="ml-2 text-white hover:text-gray-200"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default VisualEditor;
