import React, { useState, useEffect } from 'react';
import { InlineEditableText } from './InlineEditableText';
import { Rows3, Check, Zap } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';
import { useQuizValidation } from '@/hooks/useQuizValidation';
import { 
  OptionsGridUtils, 
  IMAGE_SIZE_CLASSES, 
  GRID_LAYOUT_CONFIG,
  VISUAL_STATES_CONFIG,
  ANIMATION_CONFIG,
  SPACING_CONFIG,
  ACCESSIBILITY_CONFIG,
  VALIDATION_CONFIG,
  type OptionItem,
  type OptionsGridConfig 
} from '@/config/optionsGridConfig';
const OptionsGridBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const { 
    validateOptionSelection, 
    isQuizConfigured, 
    getValidationRulesForBlock 
  } = useQuizValidation();
  
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
  const [quizValidationStatus, setQuizValidationStatus] = useState<'none' | 'valid' | 'invalid'>('none');

  // Sincronizar estado interno com propriedades do bloco apenas na inicialização
  useEffect(() => {
    if (selectedOptions && Array.isArray(selectedOptions)) {
      setInternalSelectedOptions(selectedOptions);
    }
  }, []); // Removido todas as dependências para evitar loop

  const handlePropertyChange = (key: string, value: any) => {
    console.log('🎯 OptionsGridBlock.handlePropertyChange:', { key, value, hasCallback: !!onPropertyChange });
    if (onPropertyChange) {
      onPropertyChange(key, value);
    } else {
      console.warn('⚠️ onPropertyChange callback não fornecido!');
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
          const errorMessage = VALIDATION_CONFIG.messages.selectMaximum(maxSelections);
          setValidationError(errorMessage);
          return;
        }
      }
    } else {
      // Seleção única
      newSelectedOptions = internalSelectedOptions.includes(optionId) ? [] : [optionId];
    }

    // Validação de quiz integrada
    if (isQuizConfigured) {
      const validationResult = validateOptionSelection(block.id, optionId, newSelectedOptions);
      
      if (!validationResult.isValid) {
        setValidationError(validationResult.errors.join(', '));
        setQuizValidationStatus('invalid');
        console.log('❌ Validação de quiz falhou:', validationResult.errors);
        // Permitir seleção mas mostrar erro
      } else {
        setValidationError('');
        setQuizValidationStatus('valid');
        console.log('✅ Validação de quiz OK');
      }
    }

    setInternalSelectedOptions(newSelectedOptions);
    console.log('🔄 OptionsGridBlock.handleOptionSelect:', { 
      optionId, 
      newSelectedOptions, 
      quizConfigured: isQuizConfigured,
      validationStatus: quizValidationStatus 
    });
    
    const handlePropertyChange = onPropertyChange;
    if (handlePropertyChange) {
      handlePropertyChange('selectedOptions', newSelectedOptions);
    }
    
    // Validar seleção usando configuração de validação
    if (newSelectedOptions.length < minSelections) {
      const errorMessage = validationMessage || VALIDATION_CONFIG.messages.selectMinimum(minSelections);
      setValidationError(errorMessage);
    } else {
      setValidationError('');
    }
  };

  const isOptionSelected = (optionId: string) => {
    return internalSelectedOptions.includes(optionId);
  };

  const getGridCols = (hasImages: boolean, textOnlyColumns: number = 1) => {
    // Usar utilitário do optionsGridConfig
    return OptionsGridUtils.getGridClasses(options, columns);
  };

  const getImageHeight = (size: string) => {
    // Usar classes de altura da configuração
    return OptionsGridUtils.getImageHeightClasses(size as 'small' | 'medium' | 'large');
  };

  if (!options || options.length === 0) {
    return (
      <div
        className={`
          bg-gray-100 p-4 sm:p-6 md:p-8 rounded-lg text-gray-500 flex flex-col items-center justify-center min-h-[120px] sm:min-h-[150px] cursor-pointer transition-all duration-200
          ${isSelected 
            ? 'ring-1 ring-gray-400/40 bg-gray-50/30' 
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
          ? 'ring-1 ring-gray-400/40 bg-gray-50/30' 
          : 'hover:shadow-sm'
        }
        ${className}
      `}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      {title && (
        <div className="mb-3 sm:mb-4 md:mb-6 px-1 sm:px-2">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#432818] mb-2">
            <InlineEditableText
              value={title}
              onChange={(value: string) => onPropertyChange && onPropertyChange('title', value)}
              className="inline-block"
              placeholder="Título das opções"
            />
          </h3>
          
          {/* Indicador de Status do Quiz */}
          {isQuizConfigured && (
            <div className="flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-green-600" />
              <span className="text-green-700 font-medium">Quiz Integrado</span>
              {quizValidationStatus === 'valid' && (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                  ✅ Validação OK
                </span>
              )}
              {quizValidationStatus === 'invalid' && (
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                  ❌ Erro de Validação
                </span>
              )}
            </div>
          )}
          
          {!isQuizConfigured && isSelected && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Zap className="w-4 h-4" />
              <span>Configure o quiz na aba Quiz para ativar validação</span>
            </div>
          )}
        </div>
      )}
      
      {/* Detectar se tem imagens para escolher layout automaticamente */}
      {(() => {
        const hasImages = OptionsGridUtils.hasImages(options);
        const gridCols = getGridCols(hasImages, columns);
        const cardAspectConfig = OptionsGridUtils.getCardAspectConfig(hasImages);
        
        return (
          <div 
            className={`grid ${gridCols} w-full mx-auto px-1 sm:px-0 ${SPACING_CONFIG.grid.mobile} ${SPACING_CONFIG.grid.tablet} ${SPACING_CONFIG.grid.desktop}`}
          >
            {options.map((option: any, index: number) => {
          const isSelected = isOptionSelected(option.id);
          const hasOptionImage = option.imageUrl && option.imageUrl.trim() !== '';
          
          return (
            <button 
              key={option.id || index} 
              className={`
                group relative rounded-lg text-sm sm:text-base md:text-lg font-medium ring-offset-background 
                ${ANIMATION_CONFIG.transition} transform hover:scale-[1.02] 
                ${ACCESSIBILITY_CONFIG.button.focusVisible}
                disabled:pointer-events-none disabled:opacity-50 active:scale-95 
                border-2 bg-white hover:shadow-lg overflow-hidden w-full gap-1 flex 
                flex-col items-center justify-start option-button
                ${hasImages && hasOptionImage ? cardAspectConfig.aspectRatio : `${cardAspectConfig.aspectRatio} ${cardAspectConfig.minHeight} ${cardAspectConfig.padding}`} 
                ${isSelected 
                  ? `${VISUAL_STATES_CONFIG.selected.border} ${VISUAL_STATES_CONFIG.selected.background} ${VISUAL_STATES_CONFIG.selected.shadow} ${VISUAL_STATES_CONFIG.selected.transform}` 
                  : `${VISUAL_STATES_CONFIG.default.border} ${VISUAL_STATES_CONFIG.hover.border} ${VISUAL_STATES_CONFIG.hover.background} ${VISUAL_STATES_CONFIG.default.shadow}`
                }
                ${isEditing ? 'cursor-default' : 'cursor-pointer'}
                ${ACCESSIBILITY_CONFIG.touchTarget.class}
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
                <div className={`absolute ${ANIMATION_CONFIG.selectionIndicator.position} ${ANIMATION_CONFIG.selectionIndicator.size} ${ANIMATION_CONFIG.selectionIndicator.background} rounded-full flex items-center justify-center shadow-lg z-10 ${ANIMATION_CONFIG.selectionIndicator.animation}`}>
                  <Check className={`${ANIMATION_CONFIG.selectionIndicator.iconSize} text-white`} />
                </div>
              )}
              
              {showImages && option.imageUrl && (
                <div className="relative w-full flex-1">
                  <img
                    src={option.imageUrl}
                    alt={option.text}
                    width={ACCESSIBILITY_CONFIG.image.width}
                    height={ACCESSIBILITY_CONFIG.image.height}
                    loading={ACCESSIBILITY_CONFIG.image.loading}
                    className={`w-full rounded-t-lg bg-white ${getImageHeight(imageSize)} object-cover ${ANIMATION_CONFIG.transition}`}
                    onError={(e) => {
                      e.currentTarget.src = OptionsGridUtils.getFallbackImageUrl(option.text);
                    }}
                  />
                  {/* Overlay de seleção */}
                  {isSelected && (
                    <div className={`absolute inset-0 ${ANIMATION_CONFIG.overlay.background} ${ANIMATION_CONFIG.overlay.borderRadius} ${ANIMATION_CONFIG.overlay.transition}`}></div>
                  )}
                </div>
              )}
              
              <div className={`w-full flex flex-row items-center justify-center flex-shrink-0 ${
                hasOptionImage ? SPACING_CONFIG.cards.withImages.padding : SPACING_CONFIG.cards.textOnly.padding
              }`}>
                <div className="break-words w-full custom-quill quill ql-editor quill-option text-center">
                  <div 
                    className={`font-medium ${ANIMATION_CONFIG.transition} ${
                      hasOptionImage ? SPACING_CONFIG.cards.withImages.leading : SPACING_CONFIG.cards.textOnly.leading
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
        );
      })()}
      
      {/* Mensagem de validação */}
      {validationError && (
        <div className={VALIDATION_CONFIG.styles.error.container}>
          <p className={VALIDATION_CONFIG.styles.error.text}>{validationError}</p>
        </div>
      )}
      
      {/* Informações de seleção para modo de edição */}
      {isEditing && (
        <div className={VALIDATION_CONFIG.styles.info.container}>
          <p className={VALIDATION_CONFIG.styles.info.text}>
            Modo de edição: {internalSelectedOptions.length} opção(ões) selecionada(s)
            {multipleSelection && ` (máx: ${maxSelections}, mín: ${minSelections})`}
          </p>
        </div>
      )}
    </div>
  );
};

export default OptionsGridBlock;

