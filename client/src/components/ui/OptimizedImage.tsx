
import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  onLoad,
  priority
}) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      onLoad={onLoad}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
};

export default OptimizedImage;
