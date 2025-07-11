/**
 * Block Renderer - ES7 Pattern
 * Renderiza blocos individuais no canvas
 */

import React from 'react';
import { EditorBlock, BlockContent } from '../types/EditorTypes';

// Import dos componentes de bloco
import QuizQuestionBlock from '../../blocks/quiz/QuizQuestionBlock';

interface BlockRendererProps {
  block: EditorBlock;
  isSelected: boolean;
  onEdit: (blockId: string, updates: Partial<BlockContent>) => void;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isSelected,
  onEdit
}) => {
  // Handler para edição inline
  const handleEdit = (updates: Partial<BlockContent>) => {
    onEdit(block.id, updates);
  };

  // Props comuns para todos os blocos
  const commonProps = {
    isSelected,
    onClick: () => {}, // Gerenciado pelo canvas
    className: `editor-block ${isSelected ? 'selected' : ''}`,
    style: {
      ...block.content.style,
      transition: 'all 0.2s ease-in-out'
    }
  };

  // Renderizar baseado no tipo do bloco
  switch (block.type) {
    case 'quiz-question':
      return (
        <QuizQuestionBlock
          blockId={block.id}
          question={block.content.question || 'Nova pergunta'}
          options={block.content.options || []}
          multipleSelection={block.content.multipleSelection}
          showImages={block.content.showImages}
          maxSelections={block.content.maxSelections}
          logoUrl={block.content.logoUrl}
          showBackButton={block.content.showBackButton}
          progressPercent={block.content.progressPercent}
          onAnswer={(answers: string[]) => {
            handleEdit({ selectedAnswers: answers });
          }}
          {...commonProps}
        />
      );

    case 'heading':
      return (
        <div {...commonProps}>
          <div className="p-6 bg-white rounded-lg border">
            <input
              type="text"
              value={block.content.title || ''}
              onChange={(e) => handleEdit({ title: e.target.value })}
              placeholder="Digite o título..."
              className="w-full text-2xl font-bold border-none outline-none bg-transparent"
            />
            {block.content.subtitle !== undefined && (
              <input
                type="text"
                value={block.content.subtitle || ''}
                onChange={(e) => handleEdit({ subtitle: e.target.value })}
                placeholder="Digite o subtítulo..."
                className="w-full text-lg text-gray-600 mt-2 border-none outline-none bg-transparent"
              />
            )}
          </div>
        </div>
      );

    case 'paragraph':
      return (
        <div {...commonProps}>
          <div className="p-6 bg-white rounded-lg border">
            <textarea
              value={block.content.text || ''}
              onChange={(e) => handleEdit({ text: e.target.value })}
              placeholder="Digite o texto..."
              className="w-full border-none outline-none bg-transparent resize-none"
              rows={4}
            />
          </div>
        </div>
      );

    case 'image':
      return (
        <div {...commonProps}>
          <div className="p-6 bg-white rounded-lg border">
            <div className="text-center">
              {block.content.imageUrl ? (
                <img
                  src={block.content.imageUrl}
                  alt={block.content.imageAlt || 'Imagem'}
                  className="max-w-full h-auto rounded"
                />
              ) : (
                <div className="bg-gray-100 p-8 rounded border-2 border-dashed border-gray-300">
                  <div className="text-4xl mb-2">🖼️</div>
                  <p className="text-gray-500">Clique para adicionar imagem</p>
                </div>
              )}
              <input
                type="text"
                value={block.content.imageUrl || ''}
                onChange={(e) => handleEdit({ imageUrl: e.target.value })}
                placeholder="URL da imagem..."
                className="w-full mt-4 p-2 border rounded"
              />
              <input
                type="text"
                value={block.content.imageAlt || ''}
                onChange={(e) => handleEdit({ imageAlt: e.target.value })}
                placeholder="Texto alternativo..."
                className="w-full mt-2 p-2 border rounded"
              />
            </div>
          </div>
        </div>
      );

    case 'button':
      return (
        <div {...commonProps}>
          <div className="p-6 bg-white rounded-lg border">
            <div className="text-center">
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                style={{
                  backgroundColor: block.content.backgroundColor || '#3b82f6',
                  color: block.content.textColor || '#ffffff'
                }}
              >
                {block.content.buttonText || 'Botão'}
              </button>
              <div className="mt-4 space-y-2">
                <input
                  type="text"
                  value={block.content.buttonText || ''}
                  onChange={(e) => handleEdit({ buttonText: e.target.value })}
                  placeholder="Texto do botão..."
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={block.content.buttonUrl || ''}
                  onChange={(e) => handleEdit({ buttonUrl: e.target.value })}
                  placeholder="URL do botão..."
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div {...commonProps}>
          <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-center text-red-600">
              <div className="text-2xl mb-2">⚠️</div>
              <p>Tipo de bloco desconhecido: {block.type}</p>
            </div>
          </div>
        </div>
      );
  }
};

export default BlockRenderer;
