import React, { useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import type { BlockComponentProps } from '@/types/blocks';

/**
 * HeadingInlineBlock - Componente de título responsivo
 * Visualização: Canvas responsivo
 * Edição: Painel de propriedades (lado direito)
 * Utiliza funcionalidades modernas do ES7+
 */
const HeadingInlineBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onClick,
  className = ''
}) => {
  // ES7+ Destructuring com optional chaining e nullish coalescing
  const { 
    content = 'Seu Título Aqui',
    title = 'Título Principal',
    subtitle = '',
    level = 'h2',
    size = 'large',
    titleSize = 'large',
    subtitleSize = 'medium',
    alignment = 'center',
    showSubtitle = false,
    useUsername = false,
    usernamePattern = 'Olá {{username}}!',
    theme = 'primary',
    textColor = 'text-gray-900',
    backgroundColor = 'transparent',
    padding = 'medium',
    borderRadius = 'none'
  } = block?.properties ?? {};

  // Get username from context (placeholder)
  const username = 'Usuário';

  // ES7+ useMemo para personalização do conteúdo com performance otimizada
  const personalizedTitle = useMemo(() => {
    const text = content || title;
    if (useUsername && usernamePattern && username) {
      // ES7+ Optional chaining e nullish coalescing
      return text?.replace?.('{{username}}', username) ?? text;
    }
    return text;
  }, [content, title, useUsername, usernamePattern, username]);

  // ES7+ Const assertions para readonly objects
  const titleSizeClasses = {
    'small': 'text-lg sm:text-xl lg:text-2xl',
    'medium': 'text-xl sm:text-2xl lg:text-3xl',
    'large': 'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl',
    'xlarge': 'text-3xl sm:text-4xl lg:text-5xl xl:text-6xl'
  } as const;

  const subtitleSizeClasses = {
    'small': 'text-sm sm:text-base',
    'medium': 'text-base sm:text-lg',
    'large': 'text-lg sm:text-xl lg:text-2xl'
  };

  // Classes de alinhamento
  const alignmentClasses = {
    'left': 'text-left',
    'center': 'text-center',
    'right': 'text-right'
  };

  // Classes de padding
  const paddingClasses = {
    'none': 'p-0',
    'small': 'p-2 sm:p-3',
    'medium': 'p-4 sm:p-6 lg:p-8',
    'large': 'p-6 sm:p-8 lg:p-12'
  };

  // Classes de tema
  const themeClasses = {
    'primary': 'text-[#432818]',
    'secondary': 'text-[#B89B7A]',
    'accent': 'text-blue-600',
    'dark': 'text-gray-900',
    'light': 'text-gray-100'
  };

  // Componente de título baseado no level
  const TitleComponent = level as keyof JSX.IntrinsicElements;

  // ES7+ useCallback para otimização de performance
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  // ES7+ Template literal para criação de data attributes
  const dataAttributes = useMemo(() => ({
    'data-block-id': block?.id,
    'data-block-type': block?.type,
    'data-heading-level': level
  }), [block?.id, block?.type, level]);

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
        // Background
        backgroundColor !== 'transparent' && backgroundColor,
        // Alinhamento
        alignmentClasses[alignment as keyof typeof alignmentClasses] || alignmentClasses.center,
        // Estados visuais
        'transition-all duration-200',
        isSelected && 'ring-2 ring-blue-500 bg-blue-50',
        'cursor-pointer hover:bg-gray-50',
        className
      )}
      onClick={handleClick}
      {...dataAttributes}
    >
      <div className="w-full space-y-2 sm:space-y-3">
        {/* Título Principal */}
        <TitleComponent
          className={cn(
            // Tamanho responsivo
            titleSizeClasses[titleSize as keyof typeof titleSizeClasses] || titleSizeClasses.large,
            // Tema de cor
            themeClasses[theme as keyof typeof themeClasses] || themeClasses.primary,
            // Cor personalizada se especificada
            textColor !== 'text-gray-900' && textColor,
            // Tipografia
            'font-bold leading-tight tracking-tight',
            // Quebra de texto
            'break-words'
          )}
        >
          {personalizedTitle}
        </TitleComponent>

        {/* Subtítulo (se habilitado) */}
        {showSubtitle && subtitle && (
          <p
            className={cn(
              // Tamanho responsivo
              subtitleSizeClasses[subtitleSize as keyof typeof subtitleSizeClasses] || subtitleSizeClasses.medium,
              // Cor mais suave
              'text-gray-600',
              // Tipografia
              'font-medium leading-relaxed',
              // Quebra de texto
              'break-words'
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

// ES7+ Export com named exports e default
export default HeadingInlineBlock;

// ES7+ Type exports para reutilização
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingSize = 'small' | 'medium' | 'large' | 'xlarge';
export type HeadingTheme = 'primary' | 'secondary' | 'accent' | 'dark' | 'light';
export type HeadingAlignment = 'left' | 'center' | 'right';

// ES7+ Const assertions para arrays readonly
export const HEADING_LEVELS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export const HEADING_SIZES = ['small', 'medium', 'large', 'xlarge'] as const;
export const HEADING_THEMES = ['primary', 'secondary', 'accent', 'dark', 'light'] as const;

// ES7+ Factory function com advanced TypeScript features
export const createHeadingBlock = (
  title: string,
  options: Partial<{
    level: HeadingLevel;
    size: HeadingSize;
    theme: HeadingTheme;
    alignment: HeadingAlignment;
    subtitle?: string;
  }> = {}
) => ({
  id: crypto.randomUUID?.() ?? Math.random().toString(36),
  type: 'heading-inline',
  properties: {
    title,
    showSubtitle: Boolean(options.subtitle),
    ...options
  }
});

// ES7+ Utility function com template literals
export const formatHeadingText = (
  text: string, 
  username?: string,
  pattern: string = '{{username}}'
): string => {
  if (!username) return text;
  // ES7+ String methods com fallback
  return text.replace(new RegExp(pattern.replace(/[{}]/g, '\\$&'), 'g'), username);
};