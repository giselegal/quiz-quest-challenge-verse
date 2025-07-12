
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
  Type, 
  Image, 
  MousePointer2, 
  Layout,
  MessageSquare,
  Star,
  Users,
  Gift
} from 'lucide-react';
import { FunnelStepType } from '@/types/funnel';

interface ComponentsPanelProps {
  stageType?: FunnelStepType;
  onAddComponent: (componentType: string) => void;
}

const getAvailableComponents = (stageType?: FunnelStepType) => {
  const basicComponents = [
    { id: 'text-inline', name: 'Texto', icon: Type, category: 'Básico' },
    { id: 'heading-inline', name: 'Título', icon: Type, category: 'Básico' },
    { id: 'image-display-inline', name: 'Imagem', icon: Image, category: 'Básico' },
    { id: 'button-inline', name: 'Botão', icon: MousePointer2, category: 'Básico' },
    { id: 'spacer', name: 'Espaçador', icon: Layout, category: 'Básico' },
  ];

  const quizComponents = [
    { id: 'quiz-intro-header', name: 'Cabeçalho Quiz', icon: Layout, category: 'Quiz' },
    { id: 'quiz-title', name: 'Título Quiz', icon: Type, category: 'Quiz' },
    { id: 'form-input', name: 'Campo Nome', icon: Type, category: 'Quiz' },
    { id: 'options-grid', name: 'Grid Opções', icon: Layout, category: 'Quiz' },
    { id: 'progress-inline', name: 'Progresso', icon: Layout, category: 'Quiz' },
  ];

  const resultComponents = [
    { id: 'result-header-inline', name: 'Cabeçalho Result.', icon: Layout, category: 'Resultado' },
    { id: 'result-card-inline', name: 'Card Resultado', icon: Star, category: 'Resultado' },
    { id: 'style-card-inline', name: 'Card Estilo', icon: Star, category: 'Resultado' },
  ];

  const offerComponents = [
    { id: 'countdown-inline', name: 'Timer', icon: Layout, category: 'Oferta' },
    { id: 'quiz-offer-pricing-inline', name: 'Preços', icon: Gift, category: 'Oferta' },
    { id: 'testimonial-card-inline', name: 'Depoimento', icon: Users, category: 'Oferta' },
    { id: 'badge-inline', name: 'Garantia', icon: Star, category: 'Oferta' },
  ];

  let availableComponents = [...basicComponents];

  if (stageType?.includes('quiz') || stageType?.includes('question') || stageType?.includes('intro') || stageType === 'name-collect') {
    availableComponents.push(...quizComponents);
  }

  if (stageType?.includes('result')) {
    availableComponents.push(...resultComponents);
  }

  if (stageType?.includes('offer')) {
    availableComponents.push(...offerComponents);
  }

  return availableComponents;
};

const ComponentsPanel: React.FC<ComponentsPanelProps> = ({ 
  stageType, 
  onAddComponent 
}) => {
  const components = getAvailableComponents(stageType);
  const categories = Array.from(new Set(components.map(c => c.category)));

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="font-semibold text-white mb-2">Componentes</h2>
        <p className="text-sm text-gray-400">
          Arraste para o canvas
        </p>
      </div>

      <ScrollArea className="flex-1 p-2">
        <div className="space-y-4">
          {categories.map(category => (
            <div key={category}>
              <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2 px-2">
                {category}
              </h3>
              
              <div className="space-y-1">
                {components
                  .filter(comp => comp.category === category)
                  .map(component => (
                    <Button
                      key={component.id}
                      variant="ghost"
                      className="w-full justify-start p-3 h-auto text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => onAddComponent(component.id)}
                    >
                      <component.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                      <span className="text-sm">{component.name}</span>
                    </Button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-gray-700">
        <div className="text-xs text-gray-400 text-center">
          {components.length} componentes disponíveis
        </div>
      </div>
    </div>
  );
};

export default ComponentsPanel;
