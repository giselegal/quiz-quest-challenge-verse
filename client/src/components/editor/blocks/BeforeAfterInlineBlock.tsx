import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRightLeft, Eye, EyeOff } from 'lucide-react';
import type { BlockData } from '@/types/blocks';

interface BeforeAfterInlineBlockProps {
  block: BlockData;
  isSelected?: boolean;
  onClick?: () => void;
  onPropertyChange?: (key: string, value: any) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Componente inline para comparação antes/depois da etapa 20
 * 100% responsivo, mobile-first com máximo 2 colunas
 */
const BeforeAfterInlineBlock: React.FC<BeforeAfterInlineBlockProps> = ({
  block,
  isSelected = false,
  onClick,
  onPropertyChange,
  disabled = false,
  className
}) => {
  const properties = block.properties || {};
  const title = properties.title || 'Sua Transformação';
  const subtitle = properties.subtitle || 'Veja o antes e depois da sua nova imagem';
  const beforeImage = properties.beforeImage || 'https://placehold.co/400x500/cccccc/333333?text=Antes';
  const afterImage = properties.afterImage || 'https://placehold.co/400x500/cccccc/333333?text=Depois';
  const beforeLabel = properties.beforeLabel || 'ANTES';
  const afterLabel = properties.afterLabel || 'DEPOIS';
  const showComparison = properties.showComparison !== false;
  const layoutStyle = properties.layoutStyle || 'side-by-side';

  const [activeView, setActiveView] = useState<'before' | 'after'>('before');

  const handleEdit = (field: string, value: any) => {
    if (onPropertyChange && !disabled) {
      onPropertyChange(field, value);
    }
  };

  const renderSideBySide = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {/* Antes */}
      <div className="relative group">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={beforeImage}
            alt="Antes"
            className="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {beforeLabel}
          </div>
        </div>
      </div>

      {/* Depois */}
      <div className="relative group">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={afterImage}
            alt="Depois"
            className="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {afterLabel}
          </div>
        </div>
      </div>
    </div>
  );

  const renderToggle = () => (
    <div className="max-w-md mx-auto">
      {/* Toggle Buttons */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
        <button
          onClick={() => setActiveView('before')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all',
            activeView === 'before'
              ? 'bg-red-500 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          )}
        >
          <EyeOff className="w-4 h-4" />
          {beforeLabel}
        </button>
        <button
          onClick={() => setActiveView('after')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all',
            activeView === 'after'
              ? 'bg-green-500 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          )}
        >
          <Eye className="w-4 h-4" />
          {afterLabel}
        </button>
      </div>

      {/* Image Display */}
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={activeView === 'before' ? beforeImage : afterImage}
          alt={activeView === 'before' ? 'Antes' : 'Depois'}
          className="w-full h-64 md:h-80 object-cover transition-opacity duration-300"
        />
        <div className={cn(
          'absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold text-white',
          activeView === 'before' ? 'bg-red-500' : 'bg-green-500'
        )}>
          {activeView === 'before' ? beforeLabel : afterLabel}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        'w-full p-4 md:p-6 transition-all duration-200',
        'bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg',
        isSelected && 'ring-2 ring-blue-400 bg-blue-50',
        !disabled && 'cursor-pointer hover:bg-blue-50/80',
        className
      )}
      onClick={onClick}
    >
      {/* Título */}
      <div className="text-center mb-6">
        <h3 
          className="text-xl md:text-2xl font-bold text-gray-800 mb-2"
          contentEditable={!disabled}
          onBlur={(e) => handleEdit('title', e.target.textContent)}
          suppressContentEditableWarning={true}
        >
          {title}
        </h3>
        <p 
          className="text-gray-600 text-sm md:text-base"
          contentEditable={!disabled}
          onBlur={(e) => handleEdit('subtitle', e.target.textContent)}
          suppressContentEditableWarning={true}
        >
          {subtitle}
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto mt-3 rounded-full" />
      </div>

      {/* Comparação */}
      {showComparison && (
        <div className="mb-6">
          {layoutStyle === 'side-by-side' ? renderSideBySide() : renderToggle()}
        </div>
      )}

      {/* Ícone central de transformação para layout lado a lado */}
      {layoutStyle === 'side-by-side' && (
        <div className="flex justify-center -mt-3 mb-3">
          <div className="bg-blue-500 text-white p-3 rounded-full shadow-lg">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center">
        <p className="text-gray-700 text-sm md:text-base mb-4">
          Esta pode ser sua transformação! Comece hoje mesmo sua jornada rumo ao estilo dos sonhos.
        </p>
        <div className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
          <ArrowRightLeft className="w-4 h-4" />
          Quero Minha Transformação
        </div>
      </div>

      {/* Editor Inline */}
      {isSelected && !disabled && (
        <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
          <div className="text-xs text-gray-600 mb-2 font-medium">
            🔄 Editar Antes/Depois
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <label className="text-gray-700 block mb-1">Imagem Antes:</label>
              <input
                type="url"
                value={beforeImage}
                onChange={(e) => handleEdit('beforeImage', e.target.value)}
                className="w-full p-1 text-xs border border-gray-300 rounded"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="text-gray-700 block mb-1">Imagem Depois:</label>
              <input
                type="url"
                value={afterImage}
                onChange={(e) => handleEdit('afterImage', e.target.value)}
                className="w-full p-1 text-xs border border-gray-300 rounded"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="text-gray-700 block mb-1">Layout:</label>
              <select
                value={layoutStyle}
                onChange={(e) => handleEdit('layoutStyle', e.target.value)}
                className="w-full p-1 text-xs border border-gray-300 rounded"
              >
                <option value="side-by-side">Lado a Lado</option>
                <option value="toggle">Alternância</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showComparison}
                onChange={(e) => handleEdit('showComparison', e.target.checked)}
                className="w-3 h-3"
              />
              <label className="text-gray-700">Mostrar comparação</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeforeAfterInlineBlock;
