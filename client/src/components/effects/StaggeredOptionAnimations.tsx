
import React from 'react';
import { cn } from '@/lib/utils';

interface StaggeredOptionAnimationsProps {
  questionId: string;
  isVisible: boolean;
  className?: string;
  children: React.ReactNode;
}

export const StaggeredOptionAnimations: React.FC<StaggeredOptionAnimationsProps> = ({
  questionId,
  isVisible,
  className,
  children
}) => {
  return (
    <div className={cn("transition-all duration-300", className)}>
      {children}
    </div>
  );
};
