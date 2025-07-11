import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface FlexCardProps {
  id?: string;
  title?: string;
  content?: string;
  subtitle?: string;
  icon?: string;
  image?: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  width?: 'auto' | 'full' | '1/2' | '1/3' | '1/4' | '2/3' | '3/4';
  height?: 'auto' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  alignment?: 'left' | 'center' | 'right';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  borderWidth?: 'none' | 'thin' | 'medium' | 'thick';
  fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  badge?: {
    text: string;
    color?: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  clickable?: boolean;
  hover?: boolean;
  onClick?: () => void;
  className?: string;
}

const FlexCard: React.FC<FlexCardProps> = ({
  id,
  title,
  content,
  subtitle,
  icon,
  image,
  backgroundColor = '#ffffff',
  textColor = '#432818',
  accentColor = '#B89B7A',
  borderColor,
  width = 'auto',
  height = 'auto',
  padding = 'md',
  alignment = 'left',
  shadow = 'sm',
  rounded = 'md',
  borderWidth = 'thin',
  fontSize = 'base',
  fontWeight = 'normal',
  badge,
  clickable = false,
  hover = true,
  onClick,
  className = ''
}) => {
  // Mapeamento de classes CSS
  const widthClasses = {
    'auto': 'w-auto',
    'full': 'w-full',
    '1/2': 'w-1/2',
    '1/3': 'w-1/3',
    '1/4': 'w-1/4',
    '2/3': 'w-2/3',
    '3/4': 'w-3/4'
  };

  const heightClasses = {
    'auto': 'h-auto',
    'sm': 'h-24',
    'md': 'h-32',
    'lg': 'h-48',
    'xl': 'h-64'
  };

  const paddingClasses = {
    'none': 'p-0',
    'sm': 'p-2',
    'md': 'p-4',
    'lg': 'p-6',
    'xl': 'p-8'
  };

  const alignmentClasses = {
    'left': 'text-left',
    'center': 'text-center',
    'right': 'text-right'
  };

  const shadowClasses = {
    'none': 'shadow-none',
    'sm': 'shadow-sm',
    'md': 'shadow-md',
    'lg': 'shadow-lg'
  };

  const roundedClasses = {
    'none': 'rounded-none',
    'sm': 'rounded-sm',
    'md': 'rounded-md',
    'lg': 'rounded-lg',
    'full': 'rounded-full'
  };

  const borderClasses = {
    'none': 'border-0',
    'thin': 'border',
    'medium': 'border-2',
    'thick': 'border-4'
  };

  const fontSizeClasses = {
    'xs': 'text-xs',
    'sm': 'text-sm',
    'base': 'text-base',
    'lg': 'text-lg',
    'xl': 'text-xl',
    '2xl': 'text-2xl'
  };

  const fontWeightClasses = {
    'normal': 'font-normal',
    'medium': 'font-medium',
    'semibold': 'font-semibold',
    'bold': 'font-bold'
  };

  const cardClasses = [
    widthClasses[width],
    heightClasses[height],
    paddingClasses[padding],
    alignmentClasses[alignment],
    shadowClasses[shadow],
    roundedClasses[rounded],
    borderClasses[borderWidth],
    fontSizeClasses[fontSize],
    fontWeightClasses[fontWeight],
    hover && 'transition-all duration-200',
    hover && 'hover:shadow-lg',
    clickable && 'cursor-pointer',
    clickable && hover && 'hover:scale-[1.02]',
    className
  ].filter(Boolean).join(' ');

  const cardStyle = {
    backgroundColor,
    color: textColor,
    borderColor: borderColor || accentColor + '20'
  };

  return (
    <Card 
      id={id}
      className={cardClasses}
      style={cardStyle}
      onClick={clickable ? onClick : undefined}
    >
      {/* Header com ícone e badge */}
      {(icon || badge) && (
        <div className="flex items-center justify-between mb-3">
          {icon && (
            <div className="text-2xl" style={{ color: accentColor }}>
              {icon}
            </div>
          )}
          
          {badge && (
            <Badge 
              variant={badge.variant || 'default'}
              className="ml-auto"
              style={{ backgroundColor: badge.color || accentColor }}
            >
              {badge.text}
            </Badge>
          )}
        </div>
      )}

      {/* Imagem */}
      {image && (
        <div className="mb-4">
          <img 
            src={image} 
            alt={title || 'Card image'} 
            className="w-full h-auto rounded"
          />
        </div>
      )}

      {/* Título */}
      {title && (
        <h3 
          className="font-playfair mb-2"
          style={{ color: accentColor }}
        >
          {title}
        </h3>
      )}

      {/* Subtítulo */}
      {subtitle && (
        <p className="text-sm opacity-75 mb-2">
          {subtitle}
        </p>
      )}

      {/* Conteúdo */}
      {content && (
        <div className="leading-relaxed">
          {content.split('\n').map((line, index) => (
            <p key={index} className="mb-1">
              {line}
            </p>
          ))}
        </div>
      )}
    </Card>
  );
};

export default FlexCard;
