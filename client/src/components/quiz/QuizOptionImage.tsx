
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { AspectRatio } from '../ui/aspect-ratio';
import { getImageUrlWithFallback } from '@/utils/imageManager';

interface QuizOptionImageProps {
  imageUrl: string;
  altText: string;
  styleCategory: string;
  isSelected: boolean;
  is3DQuestion: boolean;
  questionId: string;
}

export const QuizOptionImage: React.FC<QuizOptionImageProps> = ({
  imageUrl,
  altText,
  styleCategory,
  isSelected,
  is3DQuestion,
  questionId
}) => {
  const isMobile = useIsMobile();
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Usar sistema de fallback para URLs quebradas
  const safeImageUrl = getImageUrlWithFallback(imageUrl);

  console.log(`[QuizOptionImage] Loading image: ${imageUrl} -> ${safeImageUrl}`);

  const handleImageLoad = () => {
    console.log(`[QuizOptionImage] Successfully loaded: ${safeImageUrl}`);
    setImageLoaded(true);
  };

  const handleImageError = () => {
    console.error(`[QuizOptionImage] Failed to load: ${safeImageUrl}`);
    setImageError(true);
  };

  if (imageError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <span className="text-sm text-gray-500">{styleCategory}</span>
      </div>
    );
  }

  return (
    <div className={cn(
      "w-full relative flex-grow overflow-hidden",
      "md:mx-auto",
      !isMobile && "md:max-w-[40%]"
    )}>
      <AspectRatio 
        ratio={imageUrl.includes('sapatos') ? 1 : 3/4} 
        className="w-full h-full"
      >
        <div className={cn(
          "w-full h-full flex items-center justify-center overflow-hidden transform-gpu",
          "transition-all duration-300",
          isSelected && "scale-[1.03]",
          !isSelected && "hover:scale-110"
        )}>
          <img 
            src={safeImageUrl}
            alt={altText}
            className={cn(
              "object-cover w-full h-full transition-all duration-300",
              isSelected 
                ? "shadow-3d" 
                : "shadow-sm hover:shadow-md",
              isSelected && is3DQuestion && "transform-3d rotate-y-12"
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        </div>
      </AspectRatio>
    </div>
  );
};
