/**
 * Toolbar - Barra de ferramentas superior
 */

import React from 'react';
import { useEditor } from '../core/EditorContext';

const Toolbar: React.FC = () => {
  const { state, saveProject, exportProject, addPage } = useEditor();

  const handleSave = async () => {
    await saveProject();
    alert('Projeto salvo!');
  };

  const handleExport = () => {
    const data = exportProject();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'projeto-editor.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="toolbar bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      {/* Logo/Título */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-gray-800">Quiz Editor</h1>
        {state.currentProject && (
          <span className="text-sm text-gray-500">
            {state.currentProject.name}
            {state.isDirty && <span className="text-red-500"> *</span>}
          </span>
        )}
      </div>

      {/* Actions Centrais */}
      <div className="flex items-center space-x-2">
        <button
          onClick={addPage}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          + Página
        </button>
        
        <div className="w-px h-6 bg-gray-300"></div>
        
        <button
          onClick={() => window.open('/preview', '_blank')}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
        >
          🔍 Preview
        </button>
      </div>

      {/* Actions Direita */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleExport}
          className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
        >
          📥 Exportar
        </button>
        
        <button
          onClick={handleSave}
          disabled={!state.isDirty}
          className={`px-3 py-1 rounded text-sm ${
            state.isDirty
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          💾 Salvar
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
