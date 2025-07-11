/**
 * Property Panel - Painel de propriedades à direita
 */

import React from 'react';
import { useEditor } from '../core/EditorContext';

const PropertyPanel: React.FC = () => {
  const { state, updateBlock, deleteBlock, deselectBlock } = useEditor();

  const currentPage = state.currentProject?.pages.find(
    page => page.id === state.currentPageId
  );

  const selectedBlock = currentPage?.blocks.find(
    block => block.id === state.selectedBlockId
  );

  if (!selectedBlock) {
    return (
      <div className="property-panel w-80 bg-white border-l border-gray-200 p-4">
        <div className="text-center text-gray-500 mt-8">
          <div className="text-4xl mb-4">⚙️</div>
          <h3 className="text-sm font-medium mb-2">Propriedades</h3>
          <p className="text-xs">
            Selecione um bloco no canvas para editar suas propriedades
          </p>
        </div>
      </div>
    );
  }

  const handleContentUpdate = (field: string, value: any) => {
    updateBlock(selectedBlock.id, {
      content: {
        ...selectedBlock.content,
        [field]: value
      }
    });
  };

  const handleStyleUpdate = (field: string, value: any) => {
    updateBlock(selectedBlock.id, {
      styles: {
        ...selectedBlock.styles,
        [field]: value
      }
    });
  };

  const handleDelete = () => {
    if (window.confirm('Excluir este bloco?')) {
      deleteBlock(selectedBlock.id);
    }
  };

  return (
    <div className="property-panel w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-800">Propriedades</h3>
          <button
            onClick={deselectBlock}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          {selectedBlock.type}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Conteúdo */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Conteúdo</h4>
          
          {/* Propriedades específicas por tipo */}
          {selectedBlock.type === 'quiz-question' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Pergunta
                </label>
                <textarea
                  value={selectedBlock.content.question || ''}
                  onChange={(e) => handleContentUpdate('question', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Opções
                </label>
                {selectedBlock.content.options?.map((option: any, index: number) => (
                  <div key={option.id} className="mb-2">
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) => {
                        const newOptions = [...selectedBlock.content.options];
                        newOptions[index] = { ...option, text: e.target.value };
                        handleContentUpdate('options', newOptions);
                      }}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                      placeholder={`Opção ${index + 1}`}
                    />
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newOption = {
                      id: Date.now().toString(),
                      text: 'Nova opção',
                      value: `opt-${Date.now()}`
                    };
                    const newOptions = [...(selectedBlock.content.options || []), newOption];
                    handleContentUpdate('options', newOptions);
                  }}
                  className="w-full px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                >
                  + Adicionar opção
                </button>
              </div>
            </div>
          )}

          {selectedBlock.type === 'heading' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Texto
                </label>
                <input
                  type="text"
                  value={selectedBlock.content.text || ''}
                  onChange={(e) => handleContentUpdate('text', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Nível
                </label>
                <select
                  value={selectedBlock.content.level || 1}
                  onChange={(e) => handleContentUpdate('level', parseInt(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1}>H1 - Principal</option>
                  <option value={2}>H2 - Seção</option>
                  <option value={3}>H3 - Subseção</option>
                  <option value={4}>H4 - Detalhes</option>
                </select>
              </div>
            </div>
          )}

          {selectedBlock.type === 'paragraph' && (
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Texto
              </label>
              <textarea
                value={selectedBlock.content.text || ''}
                onChange={(e) => handleContentUpdate('text', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
          )}

          {selectedBlock.type === 'button' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Texto do Botão
                </label>
                <input
                  type="text"
                  value={selectedBlock.content.text || ''}
                  onChange={(e) => handleContentUpdate('text', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  URL/Link
                </label>
                <input
                  type="text"
                  value={selectedBlock.content.url || ''}
                  onChange={(e) => handleContentUpdate('url', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {selectedBlock.type === 'image' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  URL da Imagem
                </label>
                <input
                  type="text"
                  value={selectedBlock.content.src || ''}
                  onChange={(e) => handleContentUpdate('src', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Texto Alternativo
                </label>
                <input
                  type="text"
                  value={selectedBlock.content.alt || ''}
                  onChange={(e) => handleContentUpdate('alt', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Estilos Básicos */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Estilo</h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Cor de Fundo
              </label>
              <input
                type="color"
                value={selectedBlock.styles?.backgroundColor || '#ffffff'}
                onChange={(e) => handleStyleUpdate('backgroundColor', e.target.value)}
                className="w-full h-8 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Cor do Texto
              </label>
              <input
                type="color"
                value={selectedBlock.styles?.color || '#000000'}
                onChange={(e) => handleStyleUpdate('color', e.target.value)}
                className="w-full h-8 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Alinhamento
              </label>
              <select
                value={selectedBlock.styles?.textAlign || 'left'}
                onChange={(e) => handleStyleUpdate('textAlign', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="left">Esquerda</option>
                <option value="center">Centro</option>
                <option value="right">Direita</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleDelete}
          className="w-full px-3 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
        >
          🗑️ Excluir Bloco
        </button>
      </div>
    </div>
  );
};

export default PropertyPanel;
