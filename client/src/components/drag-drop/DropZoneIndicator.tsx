import React from 'react';
import { cn } from '@/lib/utils';

interface DropZoneIndicatorProps {
  isOver: boolean;
  canDrop: boolean;
  position?: 'top' | 'bottom' | 'between';
  className?: string;
  children?: React.ReactNode;
}

export const DropZoneIndicator: React.FC<DropZoneIndicatorProps> = ({
  isOver,
  canDrop,
  position = 'between',
  className,
  children
}) => {
  if (!isOver && !canDrop) return <>{children}</>;

  const indicatorClasses = cn(
    'relative transition-all duration-200',
    {
      'border-2 border-dashed border-primary/50 bg-primary/5 rounded-lg': canDrop,
      'border-primary bg-primary/10 shadow-lg': isOver && canDrop,
      'border-red-300 bg-red-50': isOver && !canDrop,
    },
    className
  );

  const dropLineClasses = cn(
    'absolute left-0 right-0 h-0.5 bg-primary transition-all duration-200',
    {
      'top-0 -mt-px': position === 'top',
      'bottom-0 -mb-px': position === 'bottom',
      'top-1/2 -translate-y-1/2': position === 'between',
    }
  );

  return (
    <div className={indicatorClasses}>
      {isOver && canDrop && (
        <>
          <div className={dropLineClasses} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              Solte aqui
            </div>
          </div>
        </>
      )}
      
      {isOver && !canDrop && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            Posição inválida
          </div>
        </div>
      )}
      
      {children && (
        <div className={cn('relative z-10', isOver && 'opacity-50')}>
          {children}
        </div>
      )}
    </div>
  );
};
