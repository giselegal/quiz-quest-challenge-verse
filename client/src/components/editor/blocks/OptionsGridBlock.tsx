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
    columns = 'auto',
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

  // Sincronizar estado interno com propriedades do bloco apenas na inicialização
  useEffect(() => {
    if (selectedOptions && Array.isArray(selectedOptions)) {
      setInternalSelectedOptions(selectedOptions);
    }
  }, []); // Removido todas as dependências para evitar loop

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

  // Detectar automaticamente se há imagens para ajustar o grid
  const hasImages = showImages && options.some((option: any) => option.imageUrl && option.imageUrl.trim() !== '');
  
  // Lógica automática: 2 colunas para imagens, 1 coluna para só texto
  const autoColumns = hasImages ? 2 : 1;
  const effectiveColumns = columns === 'auto' ? autoColumns : columns;

  const getGridCols = (cols: string | number) => {
    // Usar lógica automática baseada na presença de imagens
    let numCols: number;
    
    if (cols === 'auto') {
      numCols = hasImages ? 2 : 1;
    } else {
      numCols = typeof cols === 'string' ? parseInt(cols) : cols;
    }
    
    const baseClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    };
    return baseClasses[numCols as keyof typeof baseClasses] || 'grid-cols-1';
  };

  // Tamanhos de imagem baseados no HTML de referência
  const getImageHeight = (size: string) => {
    // Baseado no HTML: width="256" height="256" class="w-full rounded-t-md bg-white h-full"
    // Para imagens grandes como no exemplo
    const sizeClasses = {
      small: 'h-48 sm:h-56 md:h-60',
      medium: 'h-56 sm:h-64 md:h-72', 
      large: 'h-64 sm:h-72 md:h-80'
    };
    return sizeClasses[size as keyof typeof sizeClasses] || 'h-64 sm:h-72 md:h-80';
  };

  // Tamanhos de card baseados no tipo de conteúdo
  const getCardHeight = () => {
    if (hasImages) {
      // Cards com imagem: mais altos para acomodar imagem + texto
      return 'min-h-[240px] sm:min-h-[280px] md:min-h-[320px]';
    } else {
      // Cards só texto: mais compactos, baseados no conteúdo
      return 'min-h-[60px] sm:min-h-[80px] md:min-h-[100px]';
    }
  };

  // Espaçamento baseado no tipo de conteúdo  
  const getCardGap = () => {
    if (hasImages) {
      return 'gap-4 sm:gap-5 md:gap-6';
    } else {
      return 'gap-3 sm:gap-4 md:gap-5';
    }
  };

  if (!options || options.length === 0) {
    return (
      <div
        className={`
          bg-gray-100 p-4 sm:p-6 md:p-8 rounded-lg text-gray-500 flex flex-col items-center justify-center min-h-[120px] sm:min-h-[150px] cursor-pointer transition-all duration-200
          ${isSelected 
            ? 'outline-2 outline-[#B89B7A] outline-offset-2' 
            : 'hover:shadow-sm'
          }
          ${className}
        `}
        onClick={onClick}
        data-block-id={block.id}
        data-block-type={block.type}
      >
        <Rows3 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2 sm:mb-3 md:mb-4 opacity-50" />
        <p className="text-xs sm:text-sm md:text-base text-center px-2">Configure as opções do grid no painel de propriedades.</p>
      </div>
    );
  }

  return (
    <div
      className={`
        py-2 sm:py-3 md:py-4 text-center space-y-3 sm:space-y-4 cursor-pointer transition-all duration-200 w-full
        ${isSelected 
          ? 'outline-2 outline-[#B89B7A] outline-offset-2' 
          : 'hover:shadow-sm'
        }
        ${className}
      `}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      {title && (
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#432818] mb-3 sm:mb-4 md:mb-6 px-1 sm:px-2">
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
        className={`grid ${getGridCols(columns)} w-full mx-auto px-1 sm:px-2 ${getCardGap()}`}
      >
        {options.map((option: any, index: number) => {
          const isSelected = isOptionSelected(option.id);
          return (
            <button 
              key={option.id || index} 
              className={`
                group relative rounded-lg font-medium ring-offset-background 
                transition-all duration-300 ease-in-out transform hover:scale-[1.02] 
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89B7A] focus-visible:ring-offset-2 
                disabled:pointer-events-none disabled:opacity-50 active:scale-95 
                border-2 bg-white hover:shadow-lg overflow-hidden w-full flex 
                flex-col items-center justify-start option-button ${getCardHeight()}
                ${hasImages ? 'gap-1' : 'gap-2 py-3'}
                ${hasImages ? 'text-sm sm:text-base' : 'text-base sm:text-lg'}
                ${isSelected 
                  ? 'border-[#B89B7A] bg-[#FAF9F7] shadow-lg scale-[1.02]' 
                  : 'border-zinc-200 hover:border-[#B89B7A] hover:bg-[#FAF9F7] shadow-sm'
                }
                ${isEditing ? 'cursor-default' : 'cursor-pointer'}
                touch-manipulation
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
                <div className="absolute top-2 right-2 w-5 h-5 sm:w-6 sm:h-6 bg-[#B89B7A] rounded-full flex items-center justify-center shadow-lg z-10 animate-pulse">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              )}
              
              {showImages && option.imageUrl && (
                <div className="relative w-full flex-1">
                  <img
                    src={option.imageUrl}
                    alt={option.text}
                    width="256"
                    height="256"
                    className={`w-full rounded-t-md bg-white ${getImageHeight(imageSize)} object-cover transition-all duration-300`}
                    onError={(e) => (e.currentTarget.src = 'https://placehold.co/256x256/cccccc/333333?text=Erro')}
                  />
                  {/* Overlay de seleção */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-[#B89B7A] bg-opacity-20 rounded-t-md transition-opacity duration-300"></div>
                  )}
                </div>
              )}
              
              <div className={`
                w-full flex flex-row items-center justify-center flex-shrink-0
                ${hasImages ? 'py-2 px-4' : 'py-3 px-4'}
                ${hasImages ? 'text-base' : 'text-base sm:text-lg'}
              `}>
                <div className="break-words w-full custom-quill quill ql-editor quill-option text-center">
                  <div 
                    className={`font-medium transition-colors duration-300 ${
                      hasImages ? 'leading-tight' : 'leading-relaxed'
                    } ${
                      isSelected ? 'text-[#432818]' : 'text-[#432818] group-hover:text-[#B89B7A]'
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
        <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm sm:text-base text-red-600">{validationError}</p>
        </div>
      )}
      
      {/* Informações de seleção para modo de edição */}
      {isEditing && (
        <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-[#FAF9F7] border border-[#B89B7A]/20 rounded-md">
          <p className="text-sm sm:text-base text-[#8F7A6A]">
            Modo de edição: {internalSelectedOptions.length} opção(ões) selecionada(s)
            {multipleSelection && ` (máx: ${maxSelections}, mín: ${minSelections})`}
          </p>
        </div>
      )}
    </div>
  );
};

export default OptionsGridBlock;

