import React, { useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { BlockComponentProps } from '@/types/blocks';

/**
 * TextInlineBlock - Componente de texto responsivo
 * Visualização: Canvas responsivo
 * Edição: Painel de propriedades (lado direito)
 */
const TextInlineBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onClick,
  disabled = false,
  className = ''
}) => {
  const { 
    content = 'Conteúdo do texto aqui...',
    fontSize = 'base',
    fontWeight = 'normal',
    textAlign = 'left',
    useUsername = false,
    usernamePattern = '',
    textColor = 'text-gray-900',
    backgroundColor = 'transparent',
    padding = 'medium',
    borderRadius = 'none'
  } = block.properties;

  // Get username from context or props (placeholder for now)
  const username = 'Usuário'; // This would come from user context

  // Personalização do conteúdo com username
  const personalizedContent = useMemo(() => {
    if (useUsername && usernamePattern && username) {
      return content.replace(usernamePattern, username);
    }
    return content;
  }, [content, useUsername, usernamePattern, username]);

  // Classes responsivas para fontSize
  const fontSizeClasses = {
    'xs': 'text-xs sm:text-sm',
    'sm': 'text-sm sm:text-base',
    'base': 'text-base sm:text-lg',
    'lg': 'text-lg sm:text-xl lg:text-2xl',
    'xl': 'text-xl sm:text-2xl lg:text-3xl',
    '2xl': 'text-2xl sm:text-3xl lg:text-4xl'
  };

  // Classes responsivas para fontWeight
  const fontWeightClasses = {
    'light': 'font-light',
    'normal': 'font-normal',
    'medium': 'font-medium',
    'semibold': 'font-semibold',
    'bold': 'font-bold'
  };

  // Classes responsivas para textAlign
  const textAlignClasses = {
    'left': 'text-left',
    'center': 'text-center',
    'right': 'text-right',
    'justify': 'text-justify'
  };

  // Classes responsivas para padding
  const paddingClasses = {
    'none': 'p-0',
    'small': 'p-2 sm:p-3',
    'medium': 'p-3 sm:p-4 lg:p-6',
    'large': 'p-4 sm:p-6 lg:p-8'
  };

  // Classes responsivas para borderRadius
  const borderRadiusClasses = {
    'none': 'rounded-none',
    'sm': 'rounded-sm',
    'md': 'rounded-md',
    'lg': 'rounded-lg',
    'full': 'rounded-full'
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
        // Background e bordas
        backgroundColor !== 'transparent' && backgroundColor,
        borderRadiusClasses[borderRadius as keyof typeof borderRadiusClasses] || borderRadiusClasses.none,
        // Estados visuais
        'transition-all duration-200',
        isSelected && 'ring-2 ring-blue-500 bg-blue-50',
        !disabled && 'cursor-pointer hover:bg-gray-50',
        className
      )}
      onClick={onClick}
    >
      <div 
        className={cn(
          // Layout do texto
          'w-full flex items-center justify-start',
          // Responsividade de texto
          fontSizeClasses[fontSize as keyof typeof fontSizeClasses] || fontSizeClasses.base,
          fontWeightClasses[fontWeight as keyof typeof fontWeightClasses] || fontWeightClasses.normal,
          textAlignClasses[textAlign as keyof typeof textAlignClasses] || textAlignClasses.left,
          // Cores
          textColor,
          // Espaçamento e altura de linha
          'leading-relaxed',
          // Quebra de texto
          'break-words whitespace-pre-wrap'
        )}
      >
        {personalizedContent}
      </div>
    </div>
  );
};

export default TextInlineBlock;