import React from 'react';

export interface FlexContainerProps {
  id?: string;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  backgroundColor?: string;
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  width?: 'auto' | 'full' | 'screen' | 'max';
  height?: 'auto' | 'full' | 'screen' | 'min';
  minHeight?: string;
  maxWidth?: string;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  border?: {
    width?: 'none' | 'thin' | 'medium' | 'thick';
    color?: string;
    style?: 'solid' | 'dashed' | 'dotted';
  };
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children?: React.ReactNode;
}

const FlexContainer: React.FC<FlexContainerProps> = ({
  id,
  direction = 'row',
  wrap = 'wrap',
  justifyContent = 'start',
  alignItems = 'stretch',
  gap = 'md',
  padding = 'none',
  margin = 'none',
  backgroundColor = 'transparent',
  borderRadius = 'none',
  width = 'full',
  height = 'auto',
  minHeight,
  maxWidth,
  overflow = 'visible',
  border,
  shadow = 'none',
  className = '',
  children
}) => {
  // Mapeamento de classes CSS
  const directionClasses = {
    'row': 'flex-row',
    'column': 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'column-reverse': 'flex-col-reverse'
  };

  const wrapClasses = {
    'wrap': 'flex-wrap',
    'nowrap': 'flex-nowrap',
    'wrap-reverse': 'flex-wrap-reverse'
  };

  const justifyClasses = {
    'start': 'justify-start',
    'end': 'justify-end',
    'center': 'justify-center',
    'between': 'justify-between',
    'around': 'justify-around',
    'evenly': 'justify-evenly'
  };

  const alignClasses = {
    'start': 'items-start',
    'end': 'items-end',
    'center': 'items-center',
    'baseline': 'items-baseline',
    'stretch': 'items-stretch'
  };

  const gapClasses = {
    'none': 'gap-0',
    'xs': 'gap-1',
    'sm': 'gap-2',
    'md': 'gap-4',
    'lg': 'gap-6',
    'xl': 'gap-8'
  };

  const paddingClasses = {
    'none': 'p-0',
    'xs': 'p-1',
    'sm': 'p-2',
    'md': 'p-4',
    'lg': 'p-6',
    'xl': 'p-8'
  };

  const marginClasses = {
    'none': 'm-0',
    'xs': 'm-1',
    'sm': 'm-2',
    'md': 'm-4',
    'lg': 'm-6',
    'xl': 'm-8'
  };

  const radiusClasses = {
    'none': 'rounded-none',
    'sm': 'rounded-sm',
    'md': 'rounded-md',
    'lg': 'rounded-lg',
    'full': 'rounded-full'
  };

  const widthClasses = {
    'auto': 'w-auto',
    'full': 'w-full',
    'screen': 'w-screen',
    'max': 'w-max'
  };

  const heightClasses = {
    'auto': 'h-auto',
    'full': 'h-full',
    'screen': 'h-screen',
    'min': 'h-min'
  };

  const overflowClasses = {
    'visible': 'overflow-visible',
    'hidden': 'overflow-hidden',
    'scroll': 'overflow-scroll',
    'auto': 'overflow-auto'
  };

  const shadowClasses = {
    'none': 'shadow-none',
    'sm': 'shadow-sm',
    'md': 'shadow-md',
    'lg': 'shadow-lg',
    'xl': 'shadow-xl'
  };

  const borderWidthClasses = {
    'none': 'border-0',
    'thin': 'border',
    'medium': 'border-2',
    'thick': 'border-4'
  };

  const borderStyleClasses = {
    'solid': 'border-solid',
    'dashed': 'border-dashed',
    'dotted': 'border-dotted'
  };

  const containerClasses = [
    'flex',
    directionClasses[direction],
    wrapClasses[wrap],
    justifyClasses[justifyContent],
    alignClasses[alignItems],
    gapClasses[gap],
    paddingClasses[padding],
    marginClasses[margin],
    radiusClasses[borderRadius],
    widthClasses[width],
    heightClasses[height],
    overflowClasses[overflow],
    shadowClasses[shadow],
    border?.width && borderWidthClasses[border.width],
    border?.style && borderStyleClasses[border.style],
    className
  ].filter(Boolean).join(' ');

  const containerStyle: React.CSSProperties = {
    backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : undefined,
    minHeight,
    maxWidth,
    borderColor: border?.color
  };

  return (
    <div 
      id={id}
      className={containerClasses}
      style={containerStyle}
    >
      {children}
    </div>
  );
};

export default FlexContainer;
