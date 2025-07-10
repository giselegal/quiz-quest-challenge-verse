import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Image } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';

/**
 * ImageInlineBlock - Componente de imagem responsivo
 * Visualização: Canvas responsivo
 * Edição: Painel de propriedades (lado direito)
 */
const ImageInlineBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onClick,
  className = ''
}) => {
  const { 
    src = 'https://via.placeholder.com/600x400?text=Imagem',
    alt = 'Imagem',
    width = 'auto',
    height = 'auto',
    alignment = 'center',
    borderRadius = 'md',
    objectFit = 'cover',
    padding = 'medium',
    backgroundColor = 'transparent',
    showCaption = false,
    caption = '',
    maxWidth = 'full'
  } = block.properties;

  // Classes de alinhamento
  const alignmentClasses = {
    'left': 'justify-start text-left',
    'center': 'justify-center text-center',
    'right': 'justify-end text-right'
  };

  // Classes de largura máxima
  const maxWidthClasses = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    'full': 'max-w-full'
  };

  // Classes de padding
  const paddingClasses = {
    'none': 'p-0',
    'small': 'p-2 sm:p-3',
    'medium': 'p-3 sm:p-4 lg:p-6',
    'large': 'p-4 sm:p-6 lg:p-8'
  };

  // Classes de border radius
  const borderRadiusClasses = {
    'none': 'rounded-none',
    'sm': 'rounded-sm',
    'md': 'rounded-md',
    'lg': 'rounded-lg',
    'xl': 'rounded-xl',
    'full': 'rounded-full'
  };

  // Classes de object fit
  const objectFitClasses = {
    'contain': 'object-contain',
    'cover': 'object-cover',
    'fill': 'object-fill',
    'none': 'object-none',
    'scale-down': 'object-scale-down'
  };

  return (
    <div
      className={cn(
        // Layout responsivo base
        'w-full h-full flex flex-col',
        // Responsividade horizontal com quebra
        'sm:flex-row sm:flex-wrap',
        // Largura máxima e centralização
        'max-w-full mx-auto',
        // Padding responsivo
        paddingClasses[padding as keyof typeof paddingClasses] || paddingClasses.medium,
        // Alinhamento
        alignmentClasses[alignment as keyof typeof alignmentClasses] || alignmentClasses.center,
        // Background
        backgroundColor !== 'transparent' && backgroundColor,
        // Estados visuais
        'transition-all duration-200',
        isSelected && 'ring-2 ring-blue-500 bg-blue-50',
        'cursor-pointer hover:bg-gray-50',
        className
      )}
      onClick={onClick}
    >
      <div 
        className={cn(
          'relative group',
          // Largura máxima responsiva
          maxWidthClasses[maxWidth as keyof typeof maxWidthClasses] || maxWidthClasses.full,
          // Centralização dentro do container
          alignment === 'center' && 'mx-auto'
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className={cn(
              // Layout responsivo
              'w-full h-auto',
              // Border radius
              borderRadiusClasses[borderRadius as keyof typeof borderRadiusClasses] || borderRadiusClasses.md,
              // Object fit
              objectFitClasses[objectFit as keyof typeof objectFitClasses] || objectFitClasses.cover,
              // Sombra e transições
              'shadow-sm transition-all duration-200',
              'hover:shadow-md',
              // Aspectos responsivos
              height !== 'auto' && `h-${height}`,
              width !== 'auto' && width !== 'full' && `w-${width}`
            )}
            style={{
              maxHeight: height !== 'auto' ? height : undefined,
              width: width === 'full' ? '100%' : width === 'auto' ? 'auto' : width
            }}
          />
        ) : (
          // Placeholder quando não há imagem
          <div
            className={cn(
              'w-full aspect-video flex items-center justify-center',
              'bg-gray-100 border-2 border-dashed border-gray-300',
              borderRadiusClasses[borderRadius as keyof typeof borderRadiusClasses] || borderRadiusClasses.md,
              'text-gray-500'
            )}
          >
            <div className="text-center">
              <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium">Clique para adicionar imagem</p>
            </div>
          </div>
        )}

        {/* Overlay para seleção */}
        {isSelected && (
          <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center rounded-md">
            <span className="text-blue-800 font-medium text-sm bg-white px-2 py-1 rounded shadow">
              Imagem selecionada
            </span>
          </div>
        )}
      </div>

      {/* Caption/Legenda (se habilitada) */}
      {showCaption && caption && (
        <div className="mt-2 sm:mt-3">
          <p className="text-sm text-gray-600 leading-relaxed break-words">
            {caption}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageInlineBlock;