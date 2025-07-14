import React from 'react';
import { 
  Plus, 
  GripVertical, 
  MoreVertical,
  FileText,
  HelpCircle,
  Target,
  ShoppingCart
} from 'lucide-react';
import { EditorStage } from '../LiveQuizEditor';

// Componente Button simples
const Button: React.FC<{ 
  onClick: () => void;
  variant?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ onClick, className = '', children }) => (
  <button 
    onClick={onClick}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${className}`}
  >
    {children}
  </button>
);

interface StepButtonProps {
  stage: EditorStage;
  index: number;
  isActive: boolean;
  onSelect: () => void;
  onDelete?: () => void;
}

const StepButton: React.FC<StepButtonProps> = ({ 
  stage, 
  index, 
  isActive, 
  onSelect,
  onDelete 
}) => {
  const getStageColor = (type: EditorStage['type']) => {
    switch (type) {
      case 'intro': return 'border-blue-600';
      case 'question': return 'border-purple-600';
      case 'result': return 'border-green-600';
      case 'offer': return 'border-orange-600';
      default: return 'border-gray-600';
    }
  };

  return (
    <div 
      role="button" 
      tabIndex={0}
      aria-disabled="false" 
      className="group border-r md:border-y md:border-r-0 min-w-[10rem] -mt-[1px] flex pl-2 relative items-center cursor-pointer"
      onClick={onSelect}
    >
      <div className={`absolute bottom-0 z-[5] left-0 w-full md:w-0 md:h-full border md:border-2 ${
        isActive ? getStageColor(stage.type) : 'border-transparent'
      }`}></div>
      
      <span>
        <GripVertical className="w-4 h-4 text-zinc-100" />
      </span>
      
      <div className="w-full relative z-[5]">
        <span className="block h-[3rem] w-full cursor-pointer bg-transparent p-3 placeholder:italic text-zinc-100">
          Etapa {index + 1}
        </span>
      </div>
      
      {onDelete && (
        <MoreVertical 
          className="mr-2 w-4 h-4 cursor-pointer text-zinc-100" 
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        />
      )}
    </div>
  );
};

interface StagesSidebarProps {
  stages: EditorStage[];
  activeStageId: string | null;
  onStageSelect: (stageId: string) => void;
  onAddStage: (type: EditorStage['type']) => void;
  onUpdateStage: (stageId: string, updates: Partial<EditorStage>) => void;
  onDeleteStage: (stageId: string) => void;
}

const StagesSidebar: React.FC<StagesSidebarProps> = ({
  stages,
  activeStageId,
  onStageSelect,
  onAddStage,
  onUpdateStage,
  onDeleteStage
}) => {
  return (
    <div className="w-full min-h-[3rem] relative border-b overflow-auto none-scrollbar md:max-w-[13rem] border-r bg-zinc-950/50">
      <div className="relative overflow-hidden flex md:grid h-full">
        <div className="h-full w-full rounded-[inherit]" style={{ overflow: 'hidden scroll' }}>
          <div>
            {stages.map((stage, index) => (
              <StepButton
                key={stage.id}
                stage={stage}
                index={index}
                isActive={activeStageId === stage.id}
                onSelect={() => onStageSelect(stage.id)}
                onDelete={stages.length > 1 ? () => onDeleteStage(stage.id) : undefined}
              />
            ))}
            
            <div className="grid md:p-1 relative">
              <Button
                onClick={() => onAddStage('question')}
                className="hover:bg-primary hover:text-foreground h-10 px-4 py-2 text-zinc-100 bg-transparent"
              >
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Etapa
              </Button>
            </div>
            
            <div className="py-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StagesSidebar;
