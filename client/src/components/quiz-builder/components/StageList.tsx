
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import { QuizStage } from '@/types/quizBuilder';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface StageListProps {
  stages: QuizStage[];
  activeStageId: string | null;
  onStageAdd: (type: QuizStage['type']) => string;
  onStageSelect: (id: string) => void;
  onStageUpdate: (id: string, updates: Partial<QuizStage>) => void;
  onStageDelete: (id: string) => void;
  onStageMove: (sourceId: string, targetId: string) => void;
}

interface SortableStageItemProps {
  stage: QuizStage;
  isActive: boolean;
  onSelect: (id: string) => void;
  onTitleChange: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

const SortableStageItem: React.FC<SortableStageItemProps> = ({
  stage,
  isActive,
  onSelect,
  onTitleChange,
  onDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: stage.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-2 ${isActive ? 'border-[#B89B7A] bg-[#FAF9F7]' : ''} ${
        isDragging ? 'shadow-md opacity-50' : ''
      }`}
      onClick={() => onSelect(stage.id)}
    >
      <div className="flex items-center justify-between">
        <Input
          value={stage.title}
          onChange={(e) => onTitleChange(stage.id, e.target.value)}
          className="flex-1 mr-2"
          onClick={(e) => e.stopPropagation()}
        />
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 h-8 w-8 p-0"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(stage.id);
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export const StageList: React.FC<StageListProps> = ({
  stages,
  activeStageId,
  onStageAdd,
  onStageSelect,
  onStageUpdate,
  onStageDelete,
  onStageMove,
}) => {
  const handleTitleChange = (id: string, title: string) => {
    onStageUpdate(id, { title });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    
    onStageMove(active.id as string, over.id as string);
  };

  const sortedStages = [...stages].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={sortedStages.map(stage => stage.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {sortedStages.map((stage) => (
              <SortableStageItem
                key={stage.id}
                stage={stage}
                isActive={stage.id === activeStageId}
                onSelect={onStageSelect}
                onTitleChange={handleTitleChange}
                onDelete={onStageDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="grid grid-cols-2 gap-2 pt-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onStageAdd('question')}
        >
          <Plus className="h-4 w-4 mr-2" /> Pergunta
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onStageAdd('result')}
        >
          <Plus className="h-4 w-4 mr-2" /> Resultado
        </Button>
      </div>
    </div>
  );
};
