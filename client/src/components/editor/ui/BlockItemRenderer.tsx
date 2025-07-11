/**
 * Block Item Renderer - Renderiza um bloco individual
 */

import React from 'react';
import { EditorBlock } from '../core/EditorTypes';

interface BlockItemRendererProps {
  block: EditorBlock;
  isSelected?: boolean;
  isEditing?: boolean;
  onSelect?: () => void;
}

const BlockItemRenderer: React.FC<BlockItemRendererProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onSelect
}) => {
  const handleClick = () => {
    onSelect?.();
  };

  const renderContent = () => {
    switch (block.type) {
      case 'quiz-question':
        return (
          <div className="quiz-question-block">
            <h3 className="text-lg font-medium mb-3">
              {block.content.question || 'Pergunta sem texto'}
            </h3>
            {block.content.options && (
              <div className="space-y-2">
                {block.content.options.map((option: any, index: number) => (
                  <div 
                    key={option.id || index}
                    className="p-2 border border-gray-300 rounded bg-gray-50"
                  >
                    {option.text || `Opção ${index + 1}`}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'quiz-result':
        return (
          <div className="quiz-result-block text-center">
            <h2 className="text-2xl font-bold mb-4">
              {block.content.title || 'Resultado'}
            </h2>
            <p className="text-gray-600">
              {block.content.description || 'Descrição do resultado...'}
            </p>
          </div>
        );

      case 'heading':
        const HeadingTag = `h${block.content.level || 1}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag 
            className={`font-bold ${
              block.content.level === 1 ? 'text-3xl' :
              block.content.level === 2 ? 'text-2xl' :
              block.content.level === 3 ? 'text-xl' :
              'text-lg'
            }`}
          >
            {block.content.text || 'Título sem texto'}
          </HeadingTag>
        );

      case 'paragraph':
        return (
          <p className="text-gray-700 leading-relaxed">
            {block.content.text || 'Parágrafo sem texto'}
          </p>
        );

      case 'button':
        return (
          <button 
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              if (block.content.url) {
                window.open(block.content.url, '_blank');
              }
            }}
          >
            {block.content.text || 'Botão sem texto'}
          </button>
        );

      case 'image':
        return (
          <img 
            src={block.content.src || 'https://via.placeholder.com/400x300'}
            alt={block.content.alt || 'Imagem'}
            className="max-w-full h-auto rounded-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Erro+ao+carregar';
            }}
          />
        );

      default:
        return (
          <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg">
            <div className="text-sm text-gray-500 mb-2">
              Tipo: {block.type}
            </div>
            <pre className="text-xs bg-gray-200 p-2 rounded overflow-auto">
              {JSON.stringify(block.content, null, 2)}
            </pre>
          </div>
        );
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`block-item-renderer cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-blue-400' : ''
      }`}
      style={{
        backgroundColor: block.styles?.backgroundColor,
        color: block.styles?.color,
        textAlign: block.styles?.textAlign as any,
        ...block.styles
      }}
    >
      {renderContent()}
    </div>
  );
};

export default BlockItemRenderer;
