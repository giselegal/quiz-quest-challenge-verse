
import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
  priority?: boolean;
  width?: number;
  height?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  onLoad,
  priority,
  width,
  height
}) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      onLoad={onLoad}
      loading={priority ? 'eager' : 'lazy'}
      width={width}
      height={height}
    />
  );
};

export default OptimizedImage;
