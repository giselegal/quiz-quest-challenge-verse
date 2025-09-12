import { cn } from '@/lib/utils';
import type { BlockComponentProps } from '@/types/blocks';
import React from 'react';

const TextInlineBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  onClick,
  className = '',
}) => {
  const content = block?.properties?.content || 'Texto exemplo';
  const color = block?.properties?.color || '#374151';

  return (
    <div
      className={cn(
        'cursor-pointer transition-all duration-200 text-base',
        isSelected && 'ring-2 ring-blue-500 ring-opacity-50',
        className
      )}
      style={{ color }}
      onClick={onClick}
    >
      {content}
    </div>
  );
};

export default TextInlineBlock;
