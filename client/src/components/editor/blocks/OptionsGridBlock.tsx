import React from 'react';
import { InlineEditableText } from './InlineEditableText';
import { Rows3 } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';

const OptionsGridBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    title = '',
    options = [
      { id: 'opcao-1', text: 'Opção 1', value: 'opcao-1', imageUrl: '', category: '' },
      { id: 'opcao-2', text: 'Opção 2', value: 'opcao-2', imageUrl: '', category: '' }
    ],
    columns = 2,
    showImages = true,
    imageSize = 'large',
    multipleSelection = false,
    maxSelections = 1,
    minSelections = 1,
    validationMessage = 'Selecione uma opção',
    gridGap = 16
  } = block.properties;

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const getGridCols = (cols: number) => {
    switch (cols) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-2';
      case 3: return 'grid-cols-3';
      case 4: return 'grid-cols-4';
      default: return 'grid-cols-2';
    }
  };

  const getImageHeight = (size: string) => {
    switch (size) {
      case 'small': return 'h-20';
      case 'medium': return 'h-32';
      case 'large': return 'h-full';
      default: return 'h-full';
    }
  };

  if (!options || options.length === 0) {
    return (
      <div
        className={`
          bg-gray-100 p-8 rounded-lg text-gray-500 flex flex-col items-center justify-center min-h-[150px] cursor-pointer transition-all duration-200
          ${isSelected 
            ? 'outline-2 outline-blue-500 outline-offset-2' 
            : 'hover:shadow-sm'
          }
          ${className}
        `}
        onClick={onClick}
        data-block-id={block.id}
        data-block-type={block.type}
      >
        <Rows3 className="w-12 h-12 mb-4 opacity-50" />
        <p>Configure as opções do grid no painel de propriedades.</p>
      </div>
    );
  }

  return (
    <div
      className={`
        py-6 text-center space-y-4 cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'outline-2 outline-blue-500 outline-offset-2' 
          : 'hover:shadow-sm'
        }
        ${className}
      `}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      {title && (
        <h3 className="text-xl font-bold text-[#432818] mb-6">
          <InlineEditableText
            value={title}
            onSave={(value: string) => handlePropertyChange('title', value)}
            className="inline-block"
            placeholder="Título das opções"
            tag="h3"
          />
        </h3>
      )}
      <div 
        className={`grid ${getGridCols(columns)} max-w-4xl mx-auto`}
        style={{ gap: `${gridGap}px` }}
      >
        {options.map((option: any, index: number) => (
          <button 
            key={option.id || index} 
            className="whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 option border-zinc-200 bg-background hover:bg-primary hover:text-foreground px-4 hover:shadow-2xl overflow-hidden min-w-full gap-2 flex h-auto py-2 flex-col items-center justify-start border drop-shadow-none option-button"
            type="button"
            data-option-id={option.id}
            data-option-value={option.value}
            data-option-category={option.category}
          >
            {showImages && option.imageUrl && (
              <img
                src={option.imageUrl}
                alt={option.text}
                width="256"
                height="256"
                className={`w-full rounded-t-md bg-white ${getImageHeight(imageSize)} object-cover`}
                onError={(e) => (e.currentTarget.src = 'https://placehold.co/256x256/cccccc/333333?text=Erro')}
              />
            )}
            <div className="py-2 px-4 w-full flex flex-row text-base items-center text-full-primary justify-between">
              <div className="break-words w-full custom-quill quill ql-editor quill-option text-centered mt-2">
                <div 
                  className="font-medium text-[#432818]"
                  dangerouslySetInnerHTML={{ __html: option.text || 'Opção sem texto' }}
                />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OptionsGridBlock;

