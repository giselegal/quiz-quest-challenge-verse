import React from 'react';
import { Block } from '@/types/editor';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, Trash2, Copy } from 'lucide-react';

interface DraggableBlockListProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string) => void;
  onDeleteBlock?: (id: string) => void;
  onDuplicateBlock?: (id: string) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  isPreviewMode?: boolean;
}

export const DraggableBlockList: React.FC<DraggableBlockListProps> = ({
  blocks,
  selectedBlockId,
  onSelectBlock,
  onDeleteBlock,
  onDuplicateBlock,
  onMoveUp,
  onMoveDown,
  isPreviewMode = false
}) => {
  return (
    <div className="space-y-2">
      {blocks.map((block, index) => (
        <div
          key={block.id}
          className={cn(
            "p-3 border rounded-lg cursor-pointer transition-colors",
            selectedBlockId === block.id
              ? "border-[#B89B7A] bg-[#B89B7A]/10"
              : "border-gray-200 hover:border-[#B89B7A]/50"
          )}
          onClick={() => onSelectBlock(block.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium capitalize">
                {block.type.replace('-', ' ')}
              </span>
              {block.content.title && (
                <span className="text-xs text-gray-500 truncate max-w-32">
                  - {block.content.title}
                </span>
              )}
            </div>
            
            {!isPreviewMode && (
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveUp?.(index);
                  }}
                  disabled={index === 0}
                >
                  <ChevronUp className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveDown?.(index);
                  }}
                  disabled={index === blocks.length - 1}
                >
                  <ChevronDown className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicateBlock?.(block.id);
                  }}
                >
                  <Copy className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteBlock?.(block.id);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
