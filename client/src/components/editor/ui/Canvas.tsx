/**
 * Canvas - Área principal de edição
 */

import React from 'react';
import { useEditor } from '../core/EditorContext';
import BlockRenderer from '../BlockRenderer'; // Usar o renderer existente

const Canvas: React.FC = () => {
  const { state, selectBlock, deselectBlock } = useEditor();

  const currentPage = state.currentProject?.pages.find(
    page => page.id === state.currentPageId
  );

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Se clicar no canvas vazio, deselecionar bloco
    if (e.target === e.currentTarget) {
      deselectBlock();
    }
  };

  if (!state.currentProject) {
    return (
      <div className="canvas flex-1 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-xl font-medium text-gray-600 mb-2">
            Bem-vindo ao Editor
          </h2>
          <p className="text-gray-500">
            Crie um novo projeto ou carregue um existente
          </p>
          <button
            onClick={() => {
              // TODO: Implementar criação de projeto
              console.log('Criar novo projeto');
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Criar Novo Projeto
          </button>
        </div>
      </div>
    );
  }

  if (!currentPage) {
    return (
      <div className="canvas flex-1 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-xl font-medium text-gray-600 mb-2">
            Nenhuma página selecionada
          </h2>
          <p className="text-gray-500">
            Selecione uma página na sidebar ou crie uma nova
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="canvas flex-1 bg-gray-100 overflow-auto" onClick={handleCanvasClick}>
      {/* Header da página */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-medium text-gray-800">{currentPage.title}</h2>
          <p className="text-sm text-gray-500">
            {currentPage.blocks.length} blocos nesta página
          </p>
        </div>
      </div>

      {/* Área de edição */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {currentPage.blocks.length > 0 ? (
            <div className="space-y-4">
              {currentPage.blocks.map((block, index) => (
                <div
                  key={block.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectBlock(block.id);
                  }}
                  className={`relative border-2 rounded-lg transition-all ${
                    state.selectedBlockId === block.id
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  {/* Indicador de seleção */}
                  {state.selectedBlockId === block.id && (
                    <div className="absolute -top-6 left-0 px-2 py-1 bg-blue-500 text-white text-xs rounded">
                      {block.type} #{index + 1}
                    </div>
                  )}

                  {/* Render do bloco */}
                  <div className="p-4">
                    <BlockRenderer
                      block={block}
                      isSelected={state.selectedBlockId === block.id}
                      isEditing={state.isEditing}
                      onSelect={() => selectBlock(block.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Página vazia
              </h3>
              <p className="text-gray-500 mb-4">
                Adicione blocos usando a sidebar à esquerda
              </p>
              <div className="text-sm text-gray-400">
                Quiz • Conteúdo • Mídia • Layout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Canvas;
