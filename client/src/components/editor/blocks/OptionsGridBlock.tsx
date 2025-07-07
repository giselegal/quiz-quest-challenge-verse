import React, { useState, useEffect } from 'react';
import { InlineEditableText } from './InlineEditableText';
import { Rows3, Check } from 'lucide-react';
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
    gridGap = 16,
    selectedOptions = []
  } = block.properties;

  // Estado local para gerenciar seleções
  const [internalSelectedOptions, setInternalSelectedOptions] = useState<string[]>(selectedOptions || []);
  const [validationError, setValidationError] = useState<string>('');

  // Sincronizar estado interno com propriedades do bloco
  useEffect(() => {
    if (selectedOptions && Array.isArray(selectedOptions)) {
      setInternalSelectedOptions(selectedOptions);
    }
  }, [selectedOptions]);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const handleOptionSelect = (optionId: string, optionValue: string) => {
    if (isEditing) return; // Não permitir seleção no modo de edição

    let newSelectedOptions: string[] = [];
    
    if (multipleSelection) {
      // Seleção múltipla
      if (internalSelectedOptions.includes(optionId)) {
        // Desmarcar opção
        newSelectedOptions = internalSelectedOptions.filter(id => id !== optionId);
      } else {
        // Marcar opção (respeitando limite máximo)
        if (internalSelectedOptions.length < maxSelections) {
          newSelectedOptions = [...internalSelectedOptions, optionId];
        } else {
          setValidationError(`Máximo de ${maxSelections} seleções permitidas`);
          return;
        }
      }
    } else {
      // Seleção única
      newSelectedOptions = internalSelectedOptions.includes(optionId) ? [] : [optionId];
    }

    setInternalSelectedOptions(newSelectedOptions);
    handlePropertyChange('selectedOptions', newSelectedOptions);
    
    // Validar seleção
    if (newSelectedOptions.length < minSelections) {
      setValidationError(validationMessage || `Selecione pelo menos ${minSelections} opção(ões)`);
    } else {
      setValidationError('');
    }
  };

  const isOptionSelected = (optionId: string) => {
    return internalSelectedOptions.includes(optionId);
  };

  const getGridCols = (cols: number) => {
    const baseClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    };
    return baseClasses[cols as keyof typeof baseClasses] || 'grid-cols-1 md:grid-cols-2';
  };

  const getImageHeight = (size: string) => {
    const sizeClasses = {
      small: 'h-20 sm:h-24',
      medium: 'h-24 sm:h-32',
      large: 'h-32 sm:h-48 md:h-64'
    };
    return sizeClasses[size as keyof typeof sizeClasses] || 'h-32 sm:h-48 md:h-64';
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
        py-4 sm:py-6 text-center space-y-4 cursor-pointer transition-all duration-200
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
        <h3 className="text-lg sm:text-xl font-bold text-[#432818] mb-4 sm:mb-6 px-4">
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
        className={`grid ${getGridCols(columns)} w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8`}
        style={{ gap: `${gridGap}px` }}
      >
        {options.map((option: any, index: number) => {
          const isSelected = isOptionSelected(option.id);
          return (
            <button 
              key={option.id || index} 
              className={`
                group relative whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background 
                transition-all duration-300 ease-in-out transform hover:scale-105 
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 
                disabled:pointer-events-none disabled:opacity-50 
                border-2 bg-white hover:shadow-xl overflow-hidden w-full gap-2 flex 
                flex-col items-center justify-start option-button
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 shadow-lg scale-105' 
                  : 'border-zinc-200 hover:border-zinc-300 hover:bg-gray-50 shadow-md'
                }
                ${isEditing ? 'cursor-default' : 'cursor-pointer'}
              `}
              type="button"
              onClick={() => handleOptionSelect(option.id, option.value)}
              disabled={isEditing}
              data-option-id={option.id}
              data-option-value={option.value}
              data-option-category={option.category}
              data-selected={isSelected}
            >
              {/* Indicador de seleção */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg z-10 animate-pulse">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              
              {showImages && option.imageUrl && (
                <div className="relative w-full">
                  <img
                    src={option.imageUrl}
                    alt={option.text}
                    width="256"
                    height="256"
                    className={`w-full rounded-t-lg bg-white ${getImageHeight(imageSize)} object-cover transition-all duration-300`}
                    onError={(e) => (e.currentTarget.src = 'https://placehold.co/256x256/cccccc/333333?text=Erro')}
                  />
                  {/* Overlay de seleção */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-20 rounded-t-lg transition-opacity duration-300"></div>
                  )}
                </div>
              )}
              
              <div className="py-3 px-4 w-full flex flex-row text-base items-center justify-center">
                <div className="break-words w-full custom-quill quill ql-editor quill-option text-center">
                  <div 
                    className={`font-medium transition-colors duration-300 ${
                      isSelected ? 'text-blue-700' : 'text-[#432818] group-hover:text-blue-600'
                    }`}
                    dangerouslySetInnerHTML={{ __html: option.text || 'Opção sem texto' }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Mensagem de validação */}
      {validationError && (
        <div className="mt-4 mx-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{validationError}</p>
        </div>
      )}
      
      {/* Informações de seleção para modo de edição */}
      {isEditing && (
        <div className="mt-4 mx-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
          <p className="text-sm text-gray-600">
            Modo de edição: {internalSelectedOptions.length} opção(ões) selecionada(s)
            {multipleSelection && ` (máx: ${maxSelections}, mín: ${minSelections})`}
          </p>
        </div>
      )}
    </div>
  );
};

export default OptionsGridBlock;

