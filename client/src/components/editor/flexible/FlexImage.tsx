import React from 'react';

export interface FlexImageProps {
  id?: string;
  src?: string;
  alt?: string;
  title?: string;
  width?: 'auto' | 'full' | 'fit' | string;
  height?: 'auto' | 'full' | 'fit' | string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  border?: {
    width?: 'none' | 'thin' | 'medium' | 'thick';
    color?: string;
  };
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  overlay?: {
    color?: string;
    opacity?: number;
    content?: string;
    position?: 'center' | 'top' | 'bottom';
  };
  filter?: {
    blur?: number;
    brightness?: number;
    contrast?: number;
    grayscale?: number;
    sepia?: number;
    saturate?: number;
  };
  hover?: {
    scale?: boolean;
    filter?: boolean;
    overlay?: boolean;
  };
  lazy?: boolean;
  fallback?: string;
  aspectRatio?: '1:1' | '4:3' | '16:9' | '3:2' | '2:1' | 'auto';
  margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
}

const FlexImage: React.FC<FlexImageProps> = ({
  id,
  src,
  alt = 'Image',
  title,
  width = 'auto',
  height = 'auto',
  objectFit = 'cover',
  objectPosition = 'center',
  rounded = 'none',
  border,
  shadow = 'none',
  overlay,
  filter,
  hover,
  lazy = true,
  fallback = 'https://via.placeholder.com/400x300?text=Image',
  aspectRatio = 'auto',
  margin = 'none',
  padding = 'none',
  clickable = false,
  onClick,
  className = ''
}) => {
  const [imageSrc, setImageSrc] = React.useState(src || fallback);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  // Mapeamento de classes CSS
  const widthClasses = {
    'auto': 'w-auto',
    'full': 'w-full',
    'fit': 'w-fit'
  };

  const heightClasses = {
    'auto': 'h-auto',
    'full': 'h-full',
    'fit': 'h-fit'
  };

  const objectFitClasses = {
    'contain': 'object-contain',
    'cover': 'object-cover',
    'fill': 'object-fill',
    'none': 'object-none',
    'scale-down': 'object-scale-down'
  };

  const objectPositionClasses = {
    'center': 'object-center',
    'top': 'object-top',
    'bottom': 'object-bottom',
    'left': 'object-left',
    'right': 'object-right',
    'top-left': 'object-left-top',
    'top-right': 'object-right-top',
    'bottom-left': 'object-left-bottom',
    'bottom-right': 'object-right-bottom'
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
    'lg': 'shadow-lg',
    'xl': 'shadow-xl'
  };

  const borderWidthClasses = {
    'none': 'border-0',
    'thin': 'border',
    'medium': 'border-2',
    'thick': 'border-4'
  };

  const aspectRatioClasses = {
    '1:1': 'aspect-square',
    '4:3': 'aspect-[4/3]',
    '16:9': 'aspect-video',
    '3:2': 'aspect-[3/2]',
    '2:1': 'aspect-[2/1]',
    'auto': ''
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

  const imageClasses = [
    typeof width === 'string' && widthClasses[width as keyof typeof widthClasses] || (typeof width === 'string' ? `w-[${width}]` : 'w-auto'),
    typeof height === 'string' && heightClasses[height as keyof typeof heightClasses] || (typeof height === 'string' ? `h-[${height}]` : 'h-auto'),
    objectFitClasses[objectFit],
    objectPositionClasses[objectPosition],
    roundedClasses[rounded],
    shadowClasses[shadow],
    aspectRatioClasses[aspectRatio],
    marginClasses[margin],
    paddingClasses[padding],
    border?.width && borderWidthClasses[border.width],
    hover?.scale && 'transition-transform duration-300 hover:scale-105',
    hover?.filter && 'transition-all duration-300',
    clickable && 'cursor-pointer',
    'transition-opacity duration-300',
    !imageLoaded && 'opacity-0',
    imageLoaded && 'opacity-100',
    className
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'relative overflow-hidden',
    roundedClasses[rounded],
    clickable && 'cursor-pointer'
  ].filter(Boolean).join(' ');

  // Construir filtros CSS
  const buildFilter = () => {
    if (!filter) return undefined;
    
    const filters = [];
    if (filter.blur) filters.push(`blur(${filter.blur}px)`);
    if (filter.brightness) filters.push(`brightness(${filter.brightness}%)`);
    if (filter.contrast) filters.push(`contrast(${filter.contrast}%)`);
    if (filter.grayscale) filters.push(`grayscale(${filter.grayscale}%)`);
    if (filter.sepia) filters.push(`sepia(${filter.sepia}%)`);
    if (filter.saturate) filters.push(`saturate(${filter.saturate}%)`);
    
    return filters.length > 0 ? filters.join(' ') : undefined;
  };

  const imageStyle: React.CSSProperties = {
    borderColor: border?.color,
    filter: buildFilter(),
    width: typeof width === 'string' && !widthClasses[width as keyof typeof widthClasses] ? width : undefined,
    height: typeof height === 'string' && !heightClasses[height as keyof typeof heightClasses] ? height : undefined,
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    if (imageSrc !== fallback) {
      setImageSrc(fallback);
    }
  };

  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };

  return (
    <div className={containerClasses} onClick={handleClick}>
      <img
        id={id}
        src={imageSrc}
        alt={alt}
        title={title}
        className={imageClasses}
        style={imageStyle}
        loading={lazy ? 'lazy' : 'eager'}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />

      {/* Overlay */}
      {overlay && (
        <div 
          className={`absolute inset-0 flex items-${overlay.position || 'center'} justify-center transition-opacity duration-300 ${
            hover?.overlay ? 'opacity-0 hover:opacity-100' : ''
          }`}
          style={{ 
            backgroundColor: overlay.color || 'rgba(0,0,0,0.5)', 
            opacity: hover?.overlay ? undefined : (overlay.opacity || 0.5)
          }}
        >
          {overlay.content && (
            <div className="text-white text-center p-4">
              {overlay.content}
            </div>
          )}
        </div>
      )}

      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="animate-spin w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default FlexImage;
