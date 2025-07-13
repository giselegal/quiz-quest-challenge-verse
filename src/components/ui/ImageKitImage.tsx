import React, { useState } from 'react';
import { IKImage, IKContext } from 'imagekitio-react';
import { imageKitConfig, convertToImageKit } from '@/services/imageKitService';
import { cn } from '@/lib/utils';

interface ImageKitImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  quality?: number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  loading?: 'lazy' | 'eager';
  transformation?: Array<{
    height?: string;
    width?: string;
    quality?: string;
    format?: string;
  }>;
}

/**
 * Optimized image component using ImageKit
 */
export const ImageKitImage: React.FC<ImageKitImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  quality = 80,
  format = 'auto',
  loading = 'lazy',
  transformation,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Convert Cloudinary URL to ImageKit if needed
  const isCloudinaryUrl = src.includes('cloudinary.com');
  let imagePath = src;
  let useImageKit = true;

  if (isCloudinaryUrl) {
    imagePath = convertToImageKit(src, { width, height, quality, format });
    useImageKit = false; // Use direct URL for converted Cloudinary images
  } else if (!src.startsWith('/')) {
    // If it's an external URL, use it directly
    useImageKit = false;
  }

  // Default transformation if not provided
  const defaultTransformation = transformation || [
    {
      height: height?.toString(),
      width: width?.toString(),
      quality: quality.toString(),
      format,
    },
  ].filter(t => Object.values(t).some(v => v !== undefined));

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    console.error('ImageKit image failed to load:', imagePath);
    setImageError(true);
    setIsLoading(false);
  };

  // Fallback for broken images
  if (imageError) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-gray-100 rounded",
          className
        )}
        style={{ width, height }}
      >
        <span className="text-sm text-gray-500">Imagem não disponível</span>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div 
        className={cn(
          "animate-pulse bg-gray-200 rounded",
          className
        )}
        style={{ width, height }}
      />
    );
  }

  // Use ImageKit component with context
  if (useImageKit) {
    return (
      <IKContext
        publicKey={imageKitConfig.publicKey}
        urlEndpoint={imageKitConfig.urlEndpoint}
        transformationPosition={imageKitConfig.transformationPosition}
      >
        <IKImage
          path={imagePath}
          transformation={defaultTransformation}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          className={className}
          onLoad={handleLoad}
          onError={handleError}
        />
      </IKContext>
    );
  }

  // Use regular img tag for external URLs
  return (
    <img
      src={imagePath}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={className}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
};

export default ImageKitImage;