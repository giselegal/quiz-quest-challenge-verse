
import React from 'react';
import { cn } from '@/lib/utils';

interface AspectRatioProps {
  ratio: number;
  className?: string;
  children: React.ReactNode;
}

export const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio,
  className,
  children
}) => {
  return (
    <div 
      className={cn("relative w-full", className)}
      style={{ aspectRatio: ratio }}
    >
      {children}
    </div>
  );
};
