
import React from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import EditableBlock from './EditableBlock';
import { Block } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditorPreviewProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  isPreviewing: boolean;
  primaryStyle: StyleResult;
  onReorderBlocks: (sourceIndex: number, destinationIndex: number) => void;
}

export const EditorPreview: React.FC<EditorPreviewProps> = ({
  blocks,
  selectedBlockId,
  onSelectBlock,
  isPreviewing,
  primaryStyle,
  onReorderBlocks
}) => {
  const [viewMode, setViewMode] = React.useState<'desktop' | 'mobile'>('desktop');
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px
      },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const activeIndex = blocks.findIndex((block) => block.id === active.id);
      const overIndex = blocks.findIndex((block) => block.id === over.id);
      
      onReorderBlocks(activeIndex, overIndex);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Preview Controls */}
      <div className="border-b border-[#B89B7A]/20 p-4 bg-white flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('desktop')}
            className={viewMode === 'desktop' ? 'bg-[#FAF9F7]' : ''}
          >
            <Monitor className="w-4 h-4 mr-2" />
            Desktop
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('mobile')}
            className={viewMode === 'mobile' ? 'bg-[#FAF9F7]' : ''}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile
          </Button>
        </div>

        <div className="flex items-center text-sm text-[#8F7A6A]">
          {isPreviewing ? (
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>Modo de visualização</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <EyeOff className="w-4 h-4" />
              <span>Modo de edição</span>
            </div>
          )}
        </div>
      </div>

      {/* Preview Content */}
      <div className={cn(
        "flex-1 overflow-auto p-4 bg-[#FAF9F7]",
        viewMode === 'mobile' && 'flex justify-center'
      )}>
        <div className={cn(
          "min-h-full bg-white rounded-lg shadow-sm border border-[#B89B7A]/20 p-6",
          viewMode === 'mobile' && 'max-w-md w-full'
        )}>
          {blocks.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-[#8F7A6A] border-2 border-dashed border-[#B89B7A]/20 rounded-lg">
              <p className="mb-2">Nenhum bloco adicionado.</p>
              <p>Use o painel da esquerda para adicionar blocos à página.</p>
            </div>
          ) : (
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              autoScroll={{ threshold: { x: 0, y: 0 } }}
            >
              <SortableContext 
                items={blocks.map(block => block.id)}
                strategy={verticalListSortingStrategy}
                disabled={isPreviewing}
              >
                <div className="space-y-4">
                  {blocks.map((block, index) => (
                    <EditableBlock
                      key={block.id}
                      block={block}
                      index={index}
                      isSelected={selectedBlockId === block.id}
                      onClick={() => onSelectBlock(block.id)}
                      isPreviewMode={isPreviewing}
                      onReorderBlocks={onReorderBlocks}
                      primaryStyle={primaryStyle}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
};
