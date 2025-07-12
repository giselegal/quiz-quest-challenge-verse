import React, { useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, ExternalLink, ShoppingCart } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';

/**
 * ButtonInlineBlock - Componente de botão modular
 * Botão responsivo e configurável para CTAs
 * MODULAR | REUTILIZÁVEL | RESPONSIVO | INDEPENDENTE
 * Utiliza funcionalidades modernas do ES7+
 */
const ButtonInlineBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  onClick,
  className = ''
}) => {
  // ES7+ Destructuring com optional chaining e nullish coalescing
  const {
    text = 'Clique Aqui',
    url = '#',
    variant = 'primary',
    size = 'medium',
    icon = 'arrow-right',
    showIcon = true,
    fullWidth = false,
    target = '_self',
    backgroundColor = '#B89B7A',
    textColor = '#ffffff',
    hoverColor = '#A1835D',
    borderRadius = 'medium',
    // Propriedades do grid system
    gridColumns = 'auto',
    spacing = 'normal'
  } = block?.properties ?? {};

  // ES7+ Icon mapping com const assertion
  const iconComponents = {
    'arrow-right': ArrowRight,
    'download': Download,
    'external-link': ExternalLink,
    'shopping-cart': ShoppingCart,
    'none': null
  } as const;

  // ES7+ Computed property access
  const IconComponent = iconComponents[icon as keyof typeof iconComponents] ?? ArrowRight;

  // ES7+ Object shorthand para classes
  const variantClasses = {
    primary: 'bg-[#B89B7A] hover:bg-[#A1835D] text-white border-transparent',
    secondary: 'bg-transparent border-[#B89B7A] text-[#B89B7A] hover:bg-[#B89B7A] hover:text-white',
    outline: 'bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50',
    ghost: 'bg-transparent border-transparent text-[#B89B7A] hover:bg-[#B89B7A]/10'
  } as const;

  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
    xlarge: 'px-12 py-6 text-xl'
  } as const;

  const radiusClasses = {
    none: 'rounded-none',
    small: 'rounded-sm',
    medium: 'rounded-md',
    large: 'rounded-lg',
    full: 'rounded-full'
  } as const;

  // ES7+ Grid system classes
  const gridClasses = {
    auto: 'w-full md:w-[calc(50%-0.5rem)]',
    half: 'w-full md:w-[calc(50%-0.5rem)]',
    full: 'w-full'
  } as const;

  const spacingClasses = {
    tight: 'p-2',
    normal: 'p-4',
    loose: 'p-6'
  } as const;

  // ES7+ useCallback para otimização
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (url && url !== '#') {
      if (target === '_blank') {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = url;
      }
    }
    
    // Callback opcional do editor
    onClick?.();
  }, [url, target, onClick]);

  // ES7+ useMemo para data attributes
  const dataAttributes = useMemo(() => ({
    'data-block-id': block?.id,
    'data-block-type': block?.type,
    'data-button-variant': variant
  }), [block?.id, block?.type, variant]);

  return (
    <div
      className={cn(
        // CANVAS GRID SYSTEM
        'flex-shrink-0 flex-grow-0',
        gridClasses[gridColumns as keyof typeof gridClasses] ?? gridClasses.auto,
        
        // SPACING
        spacingClasses[spacing as keyof typeof spacingClasses] ?? spacingClasses.normal,
        
        // EDITOR STATES
        isSelected && 'ring-2 ring-blue-500 ring-offset-2',
        'transition-all duration-200',
        
        className
      )}
      onClick={(e) => e.stopPropagation()}
      {...dataAttributes}
    >
      <Button
        className={cn(
          // Variant styling
          variantClasses[variant as keyof typeof variantClasses] ?? variantClasses.primary,
          
          // Size styling
          sizeClasses[size as keyof typeof sizeClasses] ?? sizeClasses.medium,
          
          // Border radius
          radiusClasses[borderRadius as keyof typeof radiusClasses] ?? radiusClasses.medium,
          
          // Full width option
          fullWidth ? 'w-full' : 'w-auto',
          
          // Interactive states
          'transition-all duration-300 transform hover:scale-105 active:scale-95',
          'font-semibold shadow-lg hover:shadow-xl',
          
          // Focus states
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B89B7A]'
        )}
        style={{
          backgroundColor: variant === 'primary' ? backgroundColor : undefined,
          color: variant === 'primary' ? textColor : undefined,
          '--hover-bg': hoverColor
        } as React.CSSProperties}
        onClick={handleClick}
        type="button"
      >
        <span className="flex items-center gap-2">
          {text}
          {/* ES7+ Conditional rendering com logical AND */}
          {showIcon && IconComponent && (
            <IconComponent className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          )}
        </span>
      </Button>
    </div>
  );
};

// ES7+ Export com named exports e default
export default ButtonInlineBlock;

// ES7+ Type exports
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge';
export type ButtonIcon = 'arrow-right' | 'download' | 'external-link' | 'shopping-cart' | 'none';

// ES7+ Const assertions para arrays readonly
export const BUTTON_VARIANTS = ['primary', 'secondary', 'outline', 'ghost'] as const;
export const BUTTON_SIZES = ['small', 'medium', 'large', 'xlarge'] as const;
export const BUTTON_ICONS = ['arrow-right', 'download', 'external-link', 'shopping-cart', 'none'] as const;

// ES7+ Factory function
export const createButtonBlock = (
  text: string,
  url: string,
  options: Partial<{
    variant: ButtonVariant;
    size: ButtonSize;
    icon: ButtonIcon;
    fullWidth: boolean;
  }> = {}
) => ({
  id: crypto.randomUUID?.() ?? Math.random().toString(36),
  type: 'button-inline',
  properties: {
    text,
    url,
    ...options
  }
});
