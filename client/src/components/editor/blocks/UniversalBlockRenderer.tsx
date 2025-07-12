
import React from 'react';
import { Block } from '@/types/editor';

export interface BlockRendererProps {
  block: Block;
  isSelected?: boolean;
  isEditing?: boolean;
  onSelect?: () => void;
  onUpdate?: (updates: any) => void;
  onDelete?: () => void;
  className?: string;
}

export const UniversalBlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isSelected = false,
  isEditing = true,
  onSelect,
  onUpdate,
  onDelete,
  className = ''
}) => {
  const handleClick = () => {
    if (isEditing && onSelect) {
      onSelect();
    }
  };

  const renderBlockContent = () => {
    const { content } = block;
    
    switch (block.type) {
      case 'header':
        return (
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {content.title || 'Cabeçalho'}
            </h1>
            {content.subtitle && (
              <p className="text-gray-600 mt-2">{content.subtitle}</p>
            )}
          </div>
        );
      
      case 'text':
        return (
          <div className="p-4">
            <p className="text-gray-800">
              {content.text || 'Texto do parágrafo'}
            </p>
          </div>
        );
      
      case 'button':
        return (
          <div className="p-4">
            <button 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              style={{
                backgroundColor: content.backgroundColor || '#2563eb',
                color: content.textColor || '#ffffff'
              }}
            >
              {content.buttonText || 'Clique aqui'}
            </button>
          </div>
        );
      
      case 'image':
        return (
          <div className="p-4">
            {content.imageUrl ? (
              <img 
                src={content.imageUrl} 
                alt={content.caption || 'Imagem'} 
                className="max-w-full h-auto rounded-lg"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Adicionar imagem</span>
              </div>
            )}
          </div>
        );
      
      case 'spacer':
        return (
          <div 
            className="bg-gray-100 border-2 border-dashed border-gray-300"
            style={{ height: content.height || 40 }}
          >
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
              Espaçador ({content.height || 40}px)
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-600 text-center">
              Bloco: {block.type}
            </p>
          </div>
        );
    }
  };

  return (
    <div
      className={`
        relative group transition-all duration-200
        ${isEditing ? 'cursor-pointer' : ''}
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
        ${isEditing && !isSelected ? 'hover:ring-1 hover:ring-gray-300' : ''}
        ${className}
      `}
      onClick={handleClick}
    >
      {renderBlockContent()}
      
      {/* Controles de edição */}
      {isEditing && isSelected && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-1 bg-white shadow-lg rounded-md p-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="p-1 text-red-600 hover:bg-red-50 rounded text-xs"
              title="Deletar"
            >
              🗑️
            </button>
          </div>
        </div>
      )}

      {/* Indicador de bloco invisível */}
      {!block.visible && isEditing && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <span className="text-white text-sm bg-gray-800 px-2 py-1 rounded">
            Oculto
          </span>
        </div>
      )}
    </div>
  );
};
