import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface FlexButtonProps {
  id?: string;
  text?: string;
  icon?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverColor?: string;
  width?: 'auto' | 'full' | 'fit';
  disabled?: boolean;
  loading?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  badge?: {
    text: string;
    color?: string;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  };
  onClick?: () => void;
  className?: string;
}

const FlexButton: React.FC<FlexButtonProps> = ({
  id,
  text = 'Button',
  icon,
  variant = 'default',
  size = 'default',
  backgroundColor,
  textColor,
  borderColor,
  hoverColor,
  width = 'auto',
  disabled = false,
  loading = false,
  rounded = 'md',
  shadow = 'sm',
  fontSize = 'base',
  fontWeight = 'medium',
  badge,
  onClick,
  className = ''
}) => {
  const widthClasses = {
    'auto': 'w-auto',
    'full': 'w-full',
    'fit': 'w-fit'
  };

  const roundedClasses = {
    'none': 'rounded-none',
    'sm': 'rounded-sm',
    'md': 'rounded-md',
    'lg': 'rounded-lg',
    'full': 'rounded-full'
  };

  const shadowClasses = {
    'none': 'shadow-none',
    'sm': 'shadow-sm',
    'md': 'shadow-md',
    'lg': 'shadow-lg'
  };

  const fontSizeClasses = {
    'xs': 'text-xs',
    'sm': 'text-sm',
    'base': 'text-base',
    'lg': 'text-lg',
    'xl': 'text-xl'
  };

  const fontWeightClasses = {
    'normal': 'font-normal',
    'medium': 'font-medium',
    'semibold': 'font-semibold',
    'bold': 'font-bold'
  };

  const buttonClasses = [
    widthClasses[width],
    roundedClasses[rounded],
    shadowClasses[shadow],
    fontSizeClasses[fontSize],
    fontWeightClasses[fontWeight],
    'relative',
    'transition-all duration-200',
    !disabled && 'hover:scale-[1.02]',
    className
  ].filter(Boolean).join(' ');

  const buttonStyle: React.CSSProperties = {
    backgroundColor: backgroundColor || undefined,
    color: textColor || undefined,
    borderColor: borderColor || undefined,
  };

  const badgePositionClasses = {
    'top-right': 'absolute -top-2 -right-2',
    'top-left': 'absolute -top-2 -left-2',
    'bottom-right': 'absolute -bottom-2 -right-2',
    'bottom-left': 'absolute -bottom-2 -left-2'
  };

  return (
    <div className="relative inline-block">
      <Button
        id={id}
        variant={variant}
        size={size}
        disabled={disabled || loading}
        onClick={onClick}
        className={buttonClasses}
        style={buttonStyle}
      >
        {loading && (
          <div className="animate-spin mr-2 w-4 h-4 border-2 border-current border-t-transparent rounded-full"></div>
        )}
        
        {icon && !loading && (
          <span className="mr-2 text-lg">
            {icon}
          </span>
        )}
        
        {text}
      </Button>

      {badge && (
        <Badge 
          className={badgePositionClasses[badge.position || 'top-right']}
          style={{ backgroundColor: badge.color }}
        >
          {badge.text}
        </Badge>
      )}
    </div>
  );
};

export default FlexButton;
