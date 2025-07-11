
import React, { useState, useEffect } from 'react';
import { getOptimizedImage, getImageMetadata } from '@/utils/imageManager';

export interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  onLoad?: () => void;
  onError?: () => void;
  placeholderColor?: string;
  loading?: 'lazy' | 'eager';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  quality = 80,
  format = 'webp',
  onLoad,
  onError,
  placeholderColor = '#f3f4f6',
  loading = 'lazy'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const optimizedSrc = getOptimizedImage(src, {
    quality,
    format: format === 'auto' ? 'webp' : format,
    width,
    height
  });

  const metadata = getImageMetadata(src);
  const finalAlt = metadata?.alt || alt;

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-200 ${className}`}
        style={{ 
          backgroundColor: placeholderColor,
          width: width || 'auto',
          height: height || 'auto'
        }}
      >
        <span className="text-gray-500 text-sm">Image failed to load</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && (
        <div 
          className="absolute inset-0 animate-pulse"
          style={{ backgroundColor: placeholderColor }}
        />
      )}
      <img
        src={optimizedSrc}
        alt={finalAlt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        loading={loading}
      />
    </div>
  );
};

export default OptimizedImage;
