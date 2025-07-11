
import React, { useEffect } from 'react';

interface ResourcePreloaderProps {
  images: string[];
}

export const ResourcePreloader: React.FC<ResourcePreloaderProps> = ({ images }) => {
  useEffect(() => {
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  return null;
};
