import React from 'react';
import { InlineEditableText } from './InlineEditableText';
import { Image } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';

const ImageInlineBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onPropertyChange,
  className = ''
}) => {
  const { 
    src = 'https://via.placeholder.com/600x400?text=Imagem',
    alt = 'Imagem',
    width = 'auto',
    alignment = 'center'
  } = block.properties;

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  };

  return (
    <div 
      className={`
        inline-flex items-center max-w-fit mx-auto
        p-3 rounded-lg transition-all duration-200
        ${alignmentClasses[alignment as keyof typeof alignmentClasses]}
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-transparent hover:border-blue-300 hover:bg-blue-50/30'
        }
        ${className}
      `}
    >
      <div className="relative group">
        {src ? (
          <img
            src={src}
            alt={alt}
            className={`
              rounded-lg shadow-sm transition-all duration-200
              ${width === 'auto' ? 'w-auto max-w-sm' : `w-[${width}]`}
              h-auto object-cover
              group-hover:shadow-md
            `}
            style={{ width: width !== 'auto' ? width : undefined }}
          />
        ) : (
          <div className="w-64 h-40 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center text-gray-500">
              <Image className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Clique para adicionar imagem</p>
            </div>
          </div>
        )}
        
        {/* Overlay para edição */}
        {isSelected && (
          <div className="absolute inset-0 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <div className="bg-white/90 px-3 py-1 rounded text-xs font-medium text-blue-600">
              Editável
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageInlineBlock;