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
    title = 'Escolha sua opção:',
    options = [
      { text: 'Opção 1', imageUrl: '' },
      { text: 'Opção 2', imageUrl: '' },
      { text: 'Opção 3', imageUrl: '' }
    ],
    columns = 2
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
      <h3 className="text-xl font-bold text-[#432818]">
        <InlineEditableText
          value={title}
          onSave={(value: string) => handlePropertyChange('title', value)}
          className="inline-block"
          placeholder="Título das opções"
          tag="h3"
        />
      </h3>
      <div className={`grid gap-4 ${getGridCols(columns)} max-w-4xl mx-auto`}>
        {options.map((option: any, index: number) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 text-center space-y-2 bg-white shadow-sm hover:shadow-md transition-shadow">
            {option.imageUrl && (
              <img
                src={option.imageUrl}
                alt={option.text}
                className="w-full h-24 object-cover rounded-md mb-2"
                onError={(e) => (e.currentTarget.src = 'https://placehold.co/150x96/cccccc/333333?text=Erro')}
              />
            )}
            <p className="font-medium text-[#432818]">
              {option.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionsGridBlock;
