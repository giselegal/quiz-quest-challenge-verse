import React, { useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import type { BlockComponentProps } from '@/types/blocks';

/**
 * TextInlineBlock - Componente modular inline horizontal
 * Texto responsivo e configurável
 * MODULAR | REUTILIZÁVEL | RESPONSIVO | INDEPENDENTE
 * Utiliza funcionalidades modernas do ES7+: destructuring, optional chaining, nullish coalescing
 */
const TextInlineBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  onClick,
  className = ''
}) => {
  // ES7+ Destructuring com default values e optional chaining
  const {
    content = 'Texto exemplo',
    fontSize = 'medium',
    fontWeight = 'normal',
    textAlign = 'left',
    color = '#374151',
    backgroundColor = 'transparent',
    maxWidth = 'auto',
    useUsername = false,
    usernamePattern = '{userName}',
    // Propriedades do grid system
    gridColumns = 'auto', // 'auto', 'half', 'full'
    spacing = 'normal'
  } = block?.properties ?? {};

  // ES7+ Object property shorthand e computed property names
  const fontSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    medium: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl'
  } as const;

  // ES7+ Object spread com type assertion
  const fontWeightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  } as const;

  // ES7+ Template literals implícitos nas keys
  const textAlignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  } as const;

  // ES7+ Arrow functions e object shorthand
  const gridClasses = {
    auto: 'w-full md:w-[calc(50%-0.5rem)]', // Máximo 2 colunas em MD+
    half: 'w-full md:w-[calc(50%-0.5rem)]',  // Força 2 colunas
    full: 'w-full'  // Largura total
  } as const;

  const spacingClasses = {
    tight: 'p-2',
    normal: 'p-4',
    loose: 'p-6'
  } as const;

  // ES7+ useMemo para otimização de performance
  const personalizedContent = useMemo(() => {
    // ES7+ Optional chaining e nullish coalescing
    if (useUsername && usernamePattern) {
      return content?.replace?.(usernamePattern, 'Usuário') ?? content;
    }
    return content;
  }, [content, useUsername, usernamePattern]);

  // ES7+ useCallback para otimização de re-renders
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <div
      className={cn(
        // CANVAS GRID SYSTEM: Compatível com flex-wrap do canvas
        'flex-shrink-0 flex-grow-0',
        gridClasses[gridColumns as keyof typeof gridClasses],
        
        // VISUAL STYLING: Modular e independente
        'rounded-lg transition-all duration-200',
        
        // EDITOR STATES: Seleção e interação
        isSelected && 'ring-2 ring-blue-500 ring-offset-2',
        'cursor-pointer',
        
        // SPACING
        spacingClasses[spacing as keyof typeof spacingClasses],
        
        className
      )}
      style={{ backgroundColor }}
      onClick={onClick}
    >
      <div
        className={cn(
          // Tipografia
          fontSizeClasses[fontSize as keyof typeof fontSizeClasses],
          fontWeightClasses[fontWeight as keyof typeof fontWeightClasses],
          textAlignClasses[textAlign as keyof typeof textAlignClasses],
          
          // Responsividade e quebra de texto
          'leading-relaxed break-words whitespace-pre-wrap'
        )}
        style={{ color }}
      >
        {personalizedContent}
      </div>
    </div>
  );
};

export default TextInlineBlock;
