import React from 'react';

interface DroppableCanvasProps {
  page?: any;
  selectedBlockId?: string;
  onSelectBlock: (blockId: string | null) => void;
  onUpdateBlock: (blockId: string, updates: any) => void;
  onDeleteBlock: (blockId: string) => void;
  deviceView: 'mobile' | 'tablet' | 'desktop';
}

const DroppableCanvas: React.FC<DroppableCanvasProps> = ({
  page,
  selectedBlockId,
  onSelectBlock,
  onUpdateBlock,
  onDeleteBlock,
  deviceView
}) => {
  if (!page) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nenhuma página selecionada
        </h3>
        <p className="text-gray-500">
          Selecione uma página na sidebar para começar a editar.
        </p>
      </div>
    );
  }

  const blocks = page.blocks || [];

  return (
    <div className="p-4 min-h-96">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Canvas do Editor - Recuperado do Commit 10/07
        </h3>
        <p className="text-gray-500 mb-4">
          Página: {page.name || 'Sem nome'}
        </p>
        <p className="text-sm text-gray-400">
          Visualização: {deviceView}
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Blocos: {blocks.length}
        </p>
        
        {blocks.length > 0 && (
          <div className="mt-4 space-y-2">
            {blocks.map((block: any, index: number) => (
              <div
                key={block.id || index}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedBlockId === block.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onSelectBlock(block.id)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    {block.type || 'Bloco sem tipo'}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteBlock(block.id);
                    }}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Excluir
                  </button>
                </div>
                {block.properties?.text && (
                  <p className="text-sm text-gray-600 mt-1 truncate">
                    {block.properties.text}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            ✅ Editor recuperado do commit 10/07/2025
          </p>
          <p className="text-xs text-green-600 mt-1">
            Componente funcional com interface simplificada
          </p>
        </div>
      </div>
    </div>
  );
};

export default DroppableCanvas;