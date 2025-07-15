import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Image, Upload, Edit3, ExternalLink } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';

/**
 * ImageInlineBlock - Componente modular inline horizontal
 * Imagem responsiva e configurável
 * MODULAR | REUTILIZÁVEL | RESPONSIVO | INDEPENDENTE
 */
const ImageInlineBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    imageUrl = '',
    alt = 'Imagem',
    width = 'auto',
    height = 'auto',
    objectFit = 'cover', // cover, contain, fill, none, scale-down
    borderRadius = 'medium',
    showCaption = false,
    caption = '',
    clickable = false,
    href = '',
    target = '_blank',
    maxWidth = 'full',
    aspectRatio = 'auto', // auto, square, video, portrait, landscape
    isEditable = true
  } = block.properties;

  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    imageUrl,
    alt,
    caption
  });

  // Tamanhos de largura
  const widthClasses = {
    auto: 'w-auto',
    full: 'w-full',
    '32': 'w-32',
    '48': 'w-48',
    '64': 'w-64',
    '80': 'w-80',
    '96': 'w-96'
  };

  // Tamanhos de altura
  const heightClasses = {
    auto: 'h-auto',
    '32': 'h-32',
    '48': 'h-48',
    '64': 'h-64',
    '80': 'h-80',
    '96': 'h-96'
  };

  // Object fit
  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down'
  };

  // Border radius
  const borderRadiusClasses = {
    none: 'rounded-none',
    small: 'rounded-sm',
    medium: 'rounded-md',
    large: 'rounded-lg',
    full: 'rounded-full'
  };

  // Aspect ratios
  const aspectRatioClasses = {
    auto: '',
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]'
  };

  // Max width
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full'
  };

  const handleSave = () => {
    if (onPropertyChange) {
      Object.entries(editValues).forEach(([key, value]) => {
        onPropertyChange(key, value);
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValues({ imageUrl, alt, caption });
    setIsEditing(false);
  };

  const handleImageClick = () => {
    if (clickable && href) {
      window.open(href, target);
    } else if (isEditable) {
      setIsEditing(true);
    }
  };

  return (
    <div
      className={cn(
        // INLINE HORIZONTAL: Flexível
        'flex-shrink-0 flex-grow-0 relative group',
        // Container
        'p-2 rounded-lg border border-transparent',
        'hover:border-gray-200 hover:bg-gray-50/30 transition-all duration-200',
        isSelected && 'border-blue-500 bg-blue-50/30',
        maxWidthClasses[maxWidth as keyof typeof maxWidthClasses],
        className
      )}
      onClick={onClick}
    >
      {isEditing ? (
        <div className="space-y-3 p-4 bg-white border rounded-lg shadow-sm min-w-80">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL da Imagem
            </label>
            <input
              type="url"
              value={editValues.imageUrl}
              onChange={(e) => setEditValues(prev => ({...prev, imageUrl: e.target.value}))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Texto Alternativo
            </label>
            <input
              type="text"
              value={editValues.alt}
              onChange={(e) => setEditValues(prev => ({...prev, alt: e.target.value}))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
              placeholder="Descrição da imagem"
            />
          </div>

          {showCaption && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Legenda
              </label>
              <input
                type="text"
                value={editValues.caption}
                onChange={(e) => setEditValues(prev => ({...prev, caption: e.target.value}))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
                placeholder="Legenda da imagem"
              />
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              Salvar
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          {imageUrl ? (
            <div className="space-y-2">
              <div 
                className={cn(
                  'relative overflow-hidden transition-transform duration-200',
                  borderRadiusClasses[borderRadius as keyof typeof borderRadiusClasses],
                  aspectRatioClasses[aspectRatio as keyof typeof aspectRatioClasses],
                  clickable && 'cursor-pointer hover:scale-105',
                  isEditable && !clickable && 'cursor-pointer'
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageClick();
                }}
              >
                <img
                  src={imageUrl}
                  alt={alt}
                  className={cn(
                    'transition-all duration-200',
                    widthClasses[width as keyof typeof widthClasses],
                    heightClasses[height as keyof typeof heightClasses],
                    objectFitClasses[objectFit as keyof typeof objectFitClasses],
                    aspectRatio === 'auto' ? 'w-full h-auto' : 'w-full h-full'
                  )}
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuw6NvIGVuY29udHJhZGE8L3RleHQ+PC9zdmc+';
                  }}
                />
                
                {/* Overlay para link externo */}
                {clickable && href && (
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
                    <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                )}
              </div>

              {/* Caption */}
              {showCaption && caption && (
                <p className="text-sm text-gray-600 text-center italic">
                  {caption}
                </p>
              )}
            </div>
          ) : (
            <div 
              className={cn(
                'bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg',
                'flex flex-col items-center justify-center p-8',
                'min-h-[120px] cursor-pointer hover:border-gray-400 transition-colors duration-200',
                aspectRatioClasses[aspectRatio as keyof typeof aspectRatioClasses]
              )}
              onClick={(e) => {
                e.stopPropagation();
                if (isEditable) setIsEditing(true);
              }}
            >
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 text-center">
                Clique para adicionar imagem
              </p>
            </div>
          )}

          {/* Indicador de edição */}
          {isEditable && isSelected && (
            <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
              <Edit3 className="w-3 h-3" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImageInlineBlock;