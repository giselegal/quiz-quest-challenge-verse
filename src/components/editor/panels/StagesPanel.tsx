
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  MessageSquare, 
  Target, 
  Gift,
  User,
  Play,
  BarChart3
} from 'lucide-react';
import { FunnelStepType } from '@/types/funnel';

interface Stage {
  id: string;
  title: string;
  type: FunnelStepType;
  order: number;
  isActive: boolean;
  components: any[];
}

interface StagesPanelProps {
  stages: Stage[];
  activeStageId: string | null;
  onStageSelect: (stageId: string) => void;
}

const getStageIcon = (type: FunnelStepType) => {
  switch (type) {
    case 'intro':
    case 'quiz-intro':
      return <Play className="w-4 h-4" />;
    case 'name-collect':
      return <User className="w-4 h-4" />;
    case 'question-multiple':
      return <MessageSquare className="w-4 h-4" />;
    case 'quiz-transition':
    case 'offer-transition':
      return <Target className="w-4 h-4" />;
    case 'processing':
      return <BarChart3 className="w-4 h-4" />;
    case 'result-intro':
    case 'result-details':
    case 'result-guide':
      return <FileText className="w-4 h-4" />;
    case 'offer-page':
      return <Gift className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

const getStageTypeLabel = (type: FunnelStepType) => {
  switch (type) {
    case 'intro': return 'Introdução';
    case 'name-collect': return 'Coleta Nome';
    case 'quiz-intro': return 'Intro Quiz';
    case 'question-multiple': return 'Pergunta';
    case 'quiz-transition': return 'Transição';
    case 'processing': return 'Processando';
    case 'result-intro': return 'Resultado';
    case 'result-details': return 'Detalhes';
    case 'result-guide': return 'Guia';
    case 'offer-transition': return 'Pré Oferta';
    case 'offer-page': return 'Oferta';
    default: return 'Página';
  }
};

const StagesPanel: React.FC<StagesPanelProps> = ({ 
  stages, 
  activeStageId, 
  onStageSelect 
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="font-semibold text-white mb-2">Páginas do Funil</h2>
        <p className="text-sm text-gray-400">21 etapas configuradas</p>
      </div>

      <ScrollArea className="flex-1 p-2">
        <div className="space-y-1">
          {stages.map((stage, index) => (
            <Button
              key={stage.id}
              variant="ghost"
              className={`
                w-full justify-start p-3 h-auto text-left
                ${stage.isActive 
                  ? 'bg-[#B89B7A] text-white hover:bg-[#A1835D]' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }
              `}
              onClick={() => onStageSelect(stage.id)}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="flex-shrink-0 mt-0.5">
                  {getStageIcon(stage.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium opacity-70">
                      #{index + 1}
                    </span>
                    <Badge 
                      variant="secondary" 
                      className={`
                        text-xs px-1.5 py-0.5
                        ${stage.isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gray-600 text-gray-200'
                        }
                      `}
                    >
                      {getStageTypeLabel(stage.type)}
                    </Badge>
                  </div>
                  
                  <div className="font-medium text-sm leading-tight mb-1">
                    {stage.title}
                  </div>
                  
                  <div className="text-xs opacity-70">
                    {stage.components.length} componente{stage.components.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-gray-700">
        <div className="text-xs text-gray-400 text-center">
          Total: {stages.length} páginas
        </div>
      </div>
    </div>
  );
};

export default StagesPanel;
