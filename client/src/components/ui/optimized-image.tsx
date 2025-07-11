import React, { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { 
  optimizeImage, 
  preloadImage, 
  isImagePreloaded,
  OptimizedImageOptions 
} from '@/utils/imageManager';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  className?: string;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  quality = 85,
  format = 'webp',
  className,
  loading = 'lazy',
  placeholder,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(loading === 'eager');
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
          observerRef.current = null;
        }
      });
    },
    []
  );

  useEffect(() => {
    if (loading === 'lazy' && !isInView) {
      observerRef.current = new IntersectionObserver(handleIntersection, {
        threshold: 0.2,
      });

      if (imgRef.current) {
        observerRef.current.observe(imgRef.current);
      }

      return () => {
        observerRef.current?.disconnect();
        observerRef.current = null;
      };
    }
  }, [handleIntersection, loading, isInView]);

  const optimizedSrc = optimizeImage(src, {
    width,
    height,
    quality,
    format: format === 'auto' ? 'webp' : format // Fix the auto format issue
  });

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  if (!isInView) {
    return (
      <div 
        className={cn('bg-gray-200 animate-pulse', className)}
        style={{ width, height }}
        ref={imgRef}
      />
    );
  }

  if (hasError) {
    return (
      <div 
        className={cn('bg-gray-200 flex items-center justify-center text-gray-500', className)}
        style={{ width, height }}
      >
        Failed to load image
      </div>
    );
  }

  return (
    <>
      {!isLoaded && placeholder && (
        <img 
          src={placeholder}
          alt=""
          className={cn('absolute inset-0 w-full h-full object-cover filter blur-sm', className)}
        />
      )}
      <img
        ref={imgRef}
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        {...props}
      />
    </>
  );
};

export default OptimizedImage;
