
import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  style?: React.CSSProperties;
}

/**
 * Simplified OptimizedImage component to fix loading issues
 * Uses direct URLs without complex transformations
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  onLoad,
  objectFit = 'cover',
  style
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  console.log(`[OptimizedImage] Loading image: ${src}`);

  // Reset states when src changes
  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src]);
  
  const handleLoad = () => {
    console.log(`[OptimizedImage] Successfully loaded: ${src}`);
    setLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    console.error(`[OptimizedImage] Failed to load: ${src}`);
    setError(true);
  };
  
  return (
    <div 
      className="relative"
      style={{
        width: style?.width || '100%',
        height: style?.height || (height ? `${height}px` : 'auto'),
        ...style
      }} 
    >
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse rounded" />
      )}
      
      <img 
        src={src} 
        alt={alt}
        width={width} 
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "w-full h-full transition-opacity duration-300",
          !loaded && "opacity-0",
          loaded && "opacity-100",
          objectFit === 'cover' && "object-cover",
          objectFit === 'contain' && "object-contain",
          objectFit === 'fill' && "object-fill",
          objectFit === 'none' && "object-none",
          objectFit === 'scale-down' && "object-scale-down",
          className
        )}
        style={style}
      />
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded">
          <span className="text-sm text-gray-500">Imagem não disponível</span>
        </div>
      )}
    </div>
  );
}
