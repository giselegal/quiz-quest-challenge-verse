/**
 * Editor Toolbar - ES7 Pattern
 * Barra de ferramentas superior do editor
 */

import React from 'react';

interface EditorToolbarProps {
  onSave: () => Promise<void>;
  isLoading: boolean;
  isDirty: boolean;
  error: string | null;
  onClearError: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onSave,
  isLoading,
  isDirty,
  error,
  onClearError
}) => {
  return (
    <div className="editor-toolbar bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Logo/Title */}
        <div className="flex items-center space-x-4">
          <div className="text-2xl">🎯</div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Quiz Editor</h1>
            <div className="text-xs text-gray-500">Editor Visual ES7</div>
          </div>
        </div>

        {/* Center - Actions */}
        <div className="flex items-center space-x-4">
          {/* Status indicator */}
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              isLoading ? 'bg-yellow-400' : 
              isDirty ? 'bg-orange-400' : 'bg-green-400'
            }`} />
            <span className="text-sm text-gray-600">
              {isLoading ? 'Salvando...' : 
               isDirty ? 'Não salvo' : 'Salvo'}
            </span>
          </div>

          {/* Preview button */}
          <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            👁️ Preview
          </button>

          {/* Save button */}
          <button
            onClick={onSave}
            disabled={isLoading || !isDirty}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              isLoading || !isDirty
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isLoading ? '💾 Salvando...' : '💾 Salvar'}
          </button>
        </div>

        {/* Right side - Tools */}
        <div className="flex items-center space-x-3">
          {/* View options */}
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button className="px-3 py-1 text-sm bg-blue-50 text-blue-700 border-r border-gray-200">
              📱 Mobile
            </button>
            <button className="px-3 py-1 text-sm hover:bg-gray-50 border-r border-gray-200">
              💻 Desktop
            </button>
            <button className="px-3 py-1 text-sm hover:bg-gray-50">
              📺 Full
            </button>
          </div>

          {/* Settings */}
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            ⚙️
          </button>

          {/* Help */}
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            ❓
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-red-600">⚠️</span>
            <span className="text-sm text-red-700">{error}</span>
          </div>
          <button
            onClick={onClearError}
            className="text-red-600 hover:text-red-800"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default EditorToolbar;
