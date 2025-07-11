/**
 * Editor Properties - ES7 Pattern
 * Painel de propriedades para configuração de blocos
 */

import React from 'react';
import { EditorBlock, BlockContent } from '../types/EditorTypes';

interface EditorPropertiesProps {
  selectedBlock: EditorBlock | null;
  onUpdateBlock: (id: string, updates: Partial<BlockContent>) => void;
  onDeleteBlock: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const EditorProperties: React.FC<EditorPropertiesProps> = ({
  selectedBlock,
  onUpdateBlock,
  onDeleteBlock,
  className = '',
  style
}) => {
  if (!selectedBlock) {
    return (
      <div className={`editor-properties bg-white border-l border-gray-200 ${className}`} style={style}>
        <div className="p-6 text-center text-gray-500">
          <div className="text-4xl mb-4">⚙️</div>
          <h3 className="text-lg font-medium mb-2">Propriedades</h3>
          <p className="text-sm">Selecione um componente para configurar suas propriedades</p>
        </div>
      </div>
    );
  }

  const handleUpdate = (updates: Partial<BlockContent>) => {
    onUpdateBlock(selectedBlock.id, updates);
  };

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja deletar este componente?')) {
      onDeleteBlock(selectedBlock.id);
    }
  };

  return (
    <div className={`editor-properties bg-white border-l border-gray-200 overflow-y-auto ${className}`} style={style}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Propriedades</h2>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 p-1"
            title="Deletar componente"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L7.586 12l-1.293 1.293a1 1 0 101.414 1.414L9 13.414l2.293 2.293a1 1 0 001.414-1.414L11.414 12l1.293-1.293z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="text-sm text-gray-500 mt-1">
          {selectedBlock.type}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Propriedades específicas do tipo */}
        {renderTypeSpecificProperties(selectedBlock, handleUpdate)}

        {/* Propriedades de estilo comuns */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-800 border-b pb-2">Estilo</h3>
          
          {/* Background Color */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Cor de Fundo</label>
            <input
              type="color"
              value={selectedBlock.content.backgroundColor || '#ffffff'}
              onChange={(e) => handleUpdate({ backgroundColor: e.target.value })}
              className="w-full h-10 border rounded"
            />
          </div>

          {/* Text Color */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Cor do Texto</label>
            <input
              type="color"
              value={selectedBlock.content.textColor || '#000000'}
              onChange={(e) => handleUpdate({ textColor: e.target.value })}
              className="w-full h-10 border rounded"
            />
          </div>

          {/* Padding */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Espaçamento Interno</label>
            <select
              value={selectedBlock.content.padding || '16px'}
              onChange={(e) => handleUpdate({ padding: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="8px">Pequeno (8px)</option>
              <option value="16px">Médio (16px)</option>
              <option value="24px">Grande (24px)</option>
              <option value="32px">Extra Grande (32px)</option>
            </select>
          </div>

          {/* Border Radius */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Bordas Arredondadas</label>
            <select
              value={selectedBlock.content.borderRadius || '8px'}
              onChange={(e) => handleUpdate({ borderRadius: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="0px">Nenhuma</option>
              <option value="4px">Pequena</option>
              <option value="8px">Média</option>
              <option value="16px">Grande</option>
              <option value="50%">Circular</option>
            </select>
          </div>
        </div>

        {/* Informações do bloco */}
        <div className="space-y-2 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-800">Informações</h3>
          <div className="text-xs text-gray-500 space-y-1">
            <div>ID: {selectedBlock.id}</div>
            <div>Tipo: {selectedBlock.type}</div>
            <div>Ordem: {selectedBlock.order}</div>
            {selectedBlock.metadata && (
              <>
                <div>Criado: {selectedBlock.metadata.createdAt.toLocaleString()}</div>
                <div>Atualizado: {selectedBlock.metadata.updatedAt.toLocaleString()}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Função para renderizar propriedades específicas de cada tipo
const renderTypeSpecificProperties = (
  block: EditorBlock,
  onUpdate: (updates: Partial<BlockContent>) => void
) => {
  switch (block.type) {
    case 'quiz-question':
      return (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-800 border-b pb-2">Quiz Question</h3>
          
          {/* Pergunta */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Pergunta</label>
            <textarea
              value={block.content.question || ''}
              onChange={(e) => onUpdate({ question: e.target.value })}
              placeholder="Digite a pergunta..."
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>

          {/* Múltipla seleção */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={block.content.multipleSelection || false}
                onChange={(e) => onUpdate({ multipleSelection: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm text-gray-600">Permitir múltiplas seleções</span>
            </label>
          </div>

          {/* Máximo de seleções */}
          {block.content.multipleSelection && (
            <div>
              <label className="block text-sm text-gray-600 mb-1">Máximo de Seleções</label>
              <input
                type="number"
                min="1"
                max="10"
                value={block.content.maxSelections || 3}
                onChange={(e) => onUpdate({ maxSelections: parseInt(e.target.value) })}
                className="w-full p-2 border rounded"
              />
            </div>
          )}

          {/* Layout das opções */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Layout das Opções</label>
            <select
              value={block.content.optionLayout || 'grid'}
              onChange={(e) => onUpdate({ optionLayout: e.target.value as any })}
              className="w-full p-2 border rounded"
            >
              <option value="vertical">Vertical</option>
              <option value="horizontal">Horizontal</option>
              <option value="grid">Grid</option>
            </select>
          </div>

          {/* Mostrar imagens */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={block.content.showImages !== false}
                onChange={(e) => onUpdate({ showImages: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm text-gray-600">Mostrar imagens nas opções</span>
            </label>
          </div>

          {/* Header config */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Cabeçalho</h4>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">URL do Logo</label>
                <input
                  type="text"
                  value={block.content.logoUrl || ''}
                  onChange={(e) => onUpdate({ logoUrl: e.target.value })}
                  placeholder="https://exemplo.com/logo.png"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Progresso (%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={block.content.progressPercent || 0}
                  onChange={(e) => onUpdate({ progressPercent: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {block.content.progressPercent || 0}%
                </div>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={block.content.showBackButton || false}
                    onChange={(e) => onUpdate({ showBackButton: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600">Mostrar botão voltar</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      );

    case 'heading':
      return (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-800 border-b pb-2">Título</h3>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Título</label>
            <input
              type="text"
              value={block.content.title || ''}
              onChange={(e) => onUpdate({ title: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Subtítulo</label>
            <input
              type="text"
              value={block.content.subtitle || ''}
              onChange={(e) => onUpdate({ subtitle: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      );

    case 'button':
      return (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-800 border-b pb-2">Botão</h3>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Texto do Botão</label>
            <input
              type="text"
              value={block.content.buttonText || ''}
              onChange={(e) => onUpdate({ buttonText: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">URL/Link</label>
            <input
              type="text"
              value={block.content.buttonUrl || ''}
              onChange={(e) => onUpdate({ buttonUrl: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      );

    default:
      return (
        <div className="text-sm text-gray-500">
          Propriedades específicas não disponíveis para este tipo de bloco.
        </div>
      );
  }
};

export default EditorProperties;
