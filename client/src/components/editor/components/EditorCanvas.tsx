/**
 * Editor Canvas - ES7 Pattern
 * Canvas principal onde os blocos são renderizados
 */

import React, { useRef, useCallback } from 'react';
import { EditorBlock, BlockContent } from '../types/EditorTypes';
import { BlockRenderer } from './BlockRenderer';

interface EditorCanvasProps {
  blocks: EditorBlock[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  onUpdateBlock: (id: string, updates: Partial<BlockContent>) => void;
  onDeleteBlock: (id: string) => void;
  className?: string;
}

export const EditorCanvas: React.FC<EditorCanvasProps> = ({
  blocks,
  selectedBlockId,
  onSelectBlock,
  onUpdateBlock,
  onDeleteBlock,
  className = ''
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  // Handler para clique no canvas (deselecionar)
  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    // Se clicou diretamente no canvas (não em um bloco)
    if (e.target === canvasRef.current) {
      onSelectBlock(null);
    }
  }, [onSelectBlock]);

  // Handler para seleção de bloco
  const handleBlockSelect = useCallback((blockId: string) => {
    onSelectBlock(blockId);
  }, [onSelectBlock]);

  // Handler para edição inline
  const handleBlockEdit = useCallback((blockId: string, updates: Partial<BlockContent>) => {
    onUpdateBlock(blockId, updates);
  }, [onUpdateBlock]);

  return (
    <div className={`editor-canvas flex-1 overflow-auto ${className}`}>
      <div
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="canvas-container min-h-full p-6"
        style={{
          background: 'linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%)'
        }}
      >
        {/* Canvas Header */}
        <div className="canvas-header mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Quiz Editor</h1>
              <p className="text-sm text-gray-600">
                {blocks.length} {blocks.length === 1 ? 'componente' : 'componentes'}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-500">
                {selectedBlockId ? 'Componente selecionado' : 'Clique para adicionar componentes'}
              </div>
            </div>
          </div>
        </div>

        {/* Canvas Content */}
        <div className="canvas-content max-w-4xl mx-auto">
          {blocks.length === 0 ? (
            // Empty state
            <div className="empty-canvas text-center py-16">
              <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Comece criando seu quiz
                </h3>
                <p className="text-gray-500 mb-4">
                  Adicione componentes da barra lateral para começar a construir seu quiz
                </p>
                <div className="text-sm text-gray-400">
                  Dica: Comece com um componente "Quiz Question"
                </div>
              </div>
            </div>
          ) : (
            // Render blocks
            <div className="blocks-container space-y-4">
              {blocks
                .sort((a, b) => a.order - b.order)
                .map((block, index) => (
                  <div
                    key={block.id}
                    className={`block-wrapper relative group ${
                      selectedBlockId === block.id ? 'selected' : ''
                    }`}
                  >
                    {/* Block Selection Overlay */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBlockSelect(block.id);
                      }}
                      className={`absolute inset-0 z-10 cursor-pointer ${
                        selectedBlockId === block.id
                          ? 'ring-2 ring-blue-500 ring-opacity-50'
                          : 'hover:ring-2 hover:ring-gray-300 hover:ring-opacity-50'
                      }`}
                    />

                    {/* Block Controls */}
                    {selectedBlockId === block.id && (
                      <div className="absolute -top-10 left-0 z-20 flex items-center space-x-2">
                        <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                          {block.type}
                        </div>
                        <button
                          onClick={() => onDeleteBlock(block.id)}
                          className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors"
                          title="Deletar componente"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    )}

                    {/* Block Content */}
                    <div className="relative z-5">
                      <BlockRenderer
                        block={block}
                        isSelected={selectedBlockId === block.id}
                        onEdit={handleBlockEdit}
                      />
                    </div>

                    {/* Block Order Indicator */}
                    <div className="absolute top-2 left-2 bg-gray-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {index + 1}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Canvas Footer */}
        <div className="canvas-footer mt-12 text-center text-gray-400 text-sm">
          <p>Editor Visual de Quiz - Arraste componentes da barra lateral</p>
        </div>
      </div>
    </div>
  );
};

export default EditorCanvas;
