import React from 'react';
import { cn } from '@/lib/utils';

interface ImageBlockProps {
  block: {
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
  isSelected?: boolean;
  onClick?: () => void;
  onSaveInline?: (blockId: string, key: string, newValue: string) => void;
  disabled?: boolean;
  className?: string;
}

export const ImageBlock: React.FC<ImageBlockProps> = ({ 
  block,
  isSelected = false,
  onClick,
  disabled = false,
  className
}) => {
  const { 
    src = 'https://via.placeholder.com/600x400?text=Imagem', 
    alt = 'Imagem', 
    width = 'auto',
    height = 'auto',
    alignment = 'center' 
  } = block?.properties || {};

  const alignmentClass = alignment === 'left' ? 'justify-start' : 
                        alignment === 'right' ? 'justify-end' : 
                        'justify-center';

  return (
    <div
      className={cn(
        'relative w-full p-2 sm:p-3 md:p-4 rounded-lg border-2 border-dashed',
        isSelected ? 'border-[#B89B7A] bg-[#FAF9F7]' : 'border-gray-300 bg-white',
        'cursor-pointer hover:border-[#B89B7A]/60 transition-all duration-200',
        className
      )}
      onClick={onClick}
    >
      {/* Image Container - Visual Only */}
      <div className={cn('flex w-full', alignmentClass)}>
        <img 
          src={src}
          alt={alt}
          style={{ 
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height,
          }}
          className="rounded-lg object-cover w-full h-auto max-w-full max-h-[300px] sm:max-h-[400px] md:max-h-[500px] shadow-sm"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Erro+ao+carregar+imagem';
          }}
        />
      </div>
    </div>
  );
};

export default ImageBlock;