import React from 'react';
import { DragOverlay as DndKitDragOverlay } from '@dnd-kit/core';
import { Card, CardContent } from '@/components/ui/card';
import { GripVertical } from 'lucide-react';
import { Block } from '@/types/editor';
import { cn } from '@/lib/utils';

interface CustomDragOverlayProps {
  activeBlock: Block | null;
  children?: React.ReactNode;
}

export const CustomDragOverlay: React.FC<CustomDragOverlayProps> = ({ 
  activeBlock,
  children 
}) => {
  const getBlockPreview = (block: Block) => {
    switch (block.type) {
      case 'heading':
        return (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0" />
            <span className="font-semibold text-gray-800">
              {block.content?.text || 'Título'}
            </span>
          </div>
        );
      case 'paragraph':
        return (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0" />
            <span className="text-gray-600 truncate">
              {block.content?.text || 'Parágrafo de texto'}
            </span>
          </div>
        );
      case 'image':
        return (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-500 rounded-full flex-shrink-0" />
            <span className="text-gray-600">
              {block.content?.alt || 'Imagem'}
            </span>
          </div>
        );
      case 'button':
        return (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-orange-500 rounded-full flex-shrink-0" />
            <span className="text-gray-600">
              {block.content?.text || 'Botão'}
            </span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-500 rounded-full flex-shrink-0" />
            <span className="text-gray-600 capitalize">
              {block.type}
            </span>
          </div>
        );
    }
  };

  return (
    <DndKitDragOverlay
      adjustScale={false}
      modifiers={[]}
      className="z-50"
    >
      {activeBlock ? (
        <Card className={cn(
          'w-72 shadow-2xl border-2 border-primary/50 bg-white/95 backdrop-blur-sm',
          'transform rotate-3 scale-105 transition-all duration-200'
        )}>
          <CardContent className="p-3">
            <div className="flex items-center space-x-2 mb-2">
              <GripVertical className="h-4 w-4 text-primary/70" />
              <span className="text-xs font-medium text-primary/70 uppercase tracking-wide">
                Movendo {activeBlock.type}
              </span>
            </div>
            
            <div className="bg-gray-50 rounded-md p-2">
              {getBlockPreview(activeBlock)}
            </div>
            
            {/* Drag indicator */}
            <div className="flex justify-center mt-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        children
      )}
    </DndKitDragOverlay>
  );
};
