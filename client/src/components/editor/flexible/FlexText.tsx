import React from 'react';

export interface FlexTextProps {
  id?: string;
  content?: string;
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
  fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  fontWeight?: 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  fontFamily?: 'sans' | 'serif' | 'mono' | 'playfair';
  color?: string;
  backgroundColor?: string;
  alignment?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
  letterSpacing?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  textDecoration?: 'none' | 'underline' | 'line-through';
  margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  width?: 'auto' | 'full' | 'fit' | 'max';
  maxWidth?: string;
  truncate?: boolean;
  gradient?: {
    from: string;
    to: string;
    direction?: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-br' | 'to-bl' | 'to-tr' | 'to-tl';
  };
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: {
    width?: 'none' | 'thin' | 'medium' | 'thick';
    color?: string;
    radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  };
  hover?: {
    color?: string;
    backgroundColor?: string;
    scale?: boolean;
    shadow?: boolean;
  };
  animation?: 'none' | 'pulse' | 'ping' | 'bounce' | 'fade-in' | 'slide-in';
  className?: string;
}

const FlexText: React.FC<FlexTextProps> = ({
  id,
  content = 'Text content',
  tag = 'p',
  fontSize = 'base',
  fontWeight = 'normal',
  fontFamily = 'sans',
  color = '#432818',
  backgroundColor = 'transparent',
  alignment = 'left',
  lineHeight = 'normal',
  letterSpacing = 'normal',
  textTransform = 'none',
  textDecoration = 'none',
  margin = 'none',
  padding = 'none',
  width = 'auto',
  maxWidth,
  truncate = false,
  gradient,
  shadow = 'none',
  border,
  hover,
  animation = 'none',
  className = ''
}) => {
  // Mapeamento de classes CSS
  const fontSizeClasses = {
    'xs': 'text-xs',
    'sm': 'text-sm',
    'base': 'text-base',
    'lg': 'text-lg',
    'xl': 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl'
  };

  const fontWeightClasses = {
    'thin': 'font-thin',
    'light': 'font-light',
    'normal': 'font-normal',
    'medium': 'font-medium',
    'semibold': 'font-semibold',
    'bold': 'font-bold',
    'extrabold': 'font-extrabold',
    'black': 'font-black'
  };

  const fontFamilyClasses = {
    'sans': 'font-sans',
    'serif': 'font-serif',
    'mono': 'font-mono',
    'playfair': 'font-playfair'
  };

  const alignmentClasses = {
    'left': 'text-left',
    'center': 'text-center',
    'right': 'text-right',
    'justify': 'text-justify'
  };

  const lineHeightClasses = {
    'none': 'leading-none',
    'tight': 'leading-tight',
    'snug': 'leading-snug',
    'normal': 'leading-normal',
    'relaxed': 'leading-relaxed',
    'loose': 'leading-loose'
  };

  const letterSpacingClasses = {
    'tighter': 'tracking-tighter',
    'tight': 'tracking-tight',
    'normal': 'tracking-normal',
    'wide': 'tracking-wide',
    'wider': 'tracking-wider',
    'widest': 'tracking-widest'
  };

  const textTransformClasses = {
    'none': 'normal-case',
    'uppercase': 'uppercase',
    'lowercase': 'lowercase',
    'capitalize': 'capitalize'
  };

  const textDecorationClasses = {
    'none': 'no-underline',
    'underline': 'underline',
    'line-through': 'line-through'
  };

  const marginClasses = {
    'none': 'm-0',
    'xs': 'm-1',
    'sm': 'm-2',
    'md': 'm-4',
    'lg': 'm-6',
    'xl': 'm-8'
  };

  const paddingClasses = {
    'none': 'p-0',
    'xs': 'p-1',
    'sm': 'p-2',
    'md': 'p-4',
    'lg': 'p-6',
    'xl': 'p-8'
  };

  const widthClasses = {
    'auto': 'w-auto',
    'full': 'w-full',
    'fit': 'w-fit',
    'max': 'w-max'
  };

  const shadowClasses = {
    'none': 'shadow-none',
    'sm': 'shadow-sm',
    'md': 'shadow-md',
    'lg': 'shadow-lg'
  };

  const borderWidthClasses = {
    'none': 'border-0',
    'thin': 'border',
    'medium': 'border-2',
    'thick': 'border-4'
  };

  const borderRadiusClasses = {
    'none': 'rounded-none',
    'sm': 'rounded-sm',
    'md': 'rounded-md',
    'lg': 'rounded-lg',
    'full': 'rounded-full'
  };

  const animationClasses = {
    'none': '',
    'pulse': 'animate-pulse',
    'ping': 'animate-ping',
    'bounce': 'animate-bounce',
    'fade-in': 'animate-fadeIn',
    'slide-in': 'animate-slideIn'
  };

  const gradientDirectionClasses = {
    'to-r': 'bg-gradient-to-r',
    'to-l': 'bg-gradient-to-l',
    'to-t': 'bg-gradient-to-t',
    'to-b': 'bg-gradient-to-b',
    'to-br': 'bg-gradient-to-br',
    'to-bl': 'bg-gradient-to-bl',
    'to-tr': 'bg-gradient-to-tr',
    'to-tl': 'bg-gradient-to-tl'
  };

  const textClasses = [
    fontSizeClasses[fontSize],
    fontWeightClasses[fontWeight],
    fontFamilyClasses[fontFamily],
    alignmentClasses[alignment],
    lineHeightClasses[lineHeight],
    letterSpacingClasses[letterSpacing],
    textTransformClasses[textTransform],
    textDecorationClasses[textDecoration],
    marginClasses[margin],
    paddingClasses[padding],
    widthClasses[width],
    shadowClasses[shadow],
    animationClasses[animation],
    truncate && 'truncate',
    gradient && gradientDirectionClasses[gradient.direction || 'to-r'],
    gradient && 'bg-clip-text text-transparent',
    border?.width && borderWidthClasses[border.width],
    border?.radius && borderRadiusClasses[border.radius],
    hover?.scale && 'transition-transform duration-200 hover:scale-[1.02]',
    hover?.shadow && 'transition-shadow duration-200 hover:shadow-md',
    'transition-colors duration-200',
    className
  ].filter(Boolean).join(' ');

  const textStyle: React.CSSProperties = {
    color: gradient ? undefined : color,
    backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : undefined,
    maxWidth,
    borderColor: border?.color,
    background: gradient ? 
      `linear-gradient(${gradient.direction?.replace('to-', 'to ')}, ${gradient.from}, ${gradient.to})` : 
      undefined,
    backgroundClip: gradient ? 'text' : undefined,
  };

  const hoverStyle = hover ? {
    '--hover-color': hover.color,
    '--hover-bg': hover.backgroundColor
  } as React.CSSProperties : {};

  const combinedStyle = { ...textStyle, ...hoverStyle };

  const Tag = tag as keyof JSX.IntrinsicElements;

  return (
    <Tag
      id={id}
      className={textClasses}
      style={combinedStyle}
    >
      {content.split('\n').map((line, index) => (
        <span key={index}>
          {line}
          {index < content.split('\n').length - 1 && <br />}
        </span>
      ))}
    </Tag>
  );
};

export default FlexText;
