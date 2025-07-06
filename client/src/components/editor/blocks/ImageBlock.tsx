import React from 'react';
import { InlineEditableText } from './InlineEditableText';

interface ImageBlockProps {
  block?: {
    id: string;
    type: string;
    properties: {
      src?: string;
      alt?: string;
      width?: string | number;
      height?: string | number;
      className?: string;
      alignment?: 'left' | 'center' | 'right';
    };
  };
  properties?: {
    src?: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
    className?: string;
    alignment?: 'left' | 'center' | 'right';
  };
  isSelected?: boolean;
  onClick?: () => void;
  onSaveInline?: (blockId: string, key: string, newValue: string) => void;
  disabled?: boolean;
}

export const ImageBlock: React.FC<ImageBlockProps> = ({ 
  block,
  properties = {}, 
  isSelected = false,
  onClick,
  onSaveInline,
  disabled = false
}) => {
  // Use block.properties first, then fallback to properties
  const blockProps = block?.properties || properties;
  
  const { 
    src = 'https://via.placeholder.com/600x400?text=Imagem', 
    alt = 'Imagem', 
    width = 'auto',
    height = 'auto',
    className = '',
    alignment = 'center' 
  } = blockProps;

  const alignmentClasses = {
    left: 'flex justify-start',
    center: 'flex justify-center',
    right: 'flex justify-end'
  };

  return (
    <div 
      className={`
        p-4 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-[#B89B7A]/40 hover:bg-[#FAF9F7]'
        }
        ${alignmentClasses[alignment]}
      `}
      onClick={onClick}
    >
      <div className="flex flex-col items-center space-y-2">
        <img 
          src={src} 
          alt={alt}
          style={{ width: width === 'auto' ? 'auto' : width }}
          className="max-w-full h-auto rounded"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Erro+ao+carregar+imagem';
          }}
        />
        {onSaveInline && (
          <InlineEditableText
            tag="p"
            value={alt}
            onSave={(newValue) => onSaveInline?.(block?.id || 'unknown', 'alt', newValue)}
            className="text-sm text-gray-600 italic"
            placeholder="Descrição da imagem (alt text)"
          />
        )}
      </div>
    </div>
  );
};
