
import React from 'react';
import { BlockType } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Type, 
  Image, 
  MousePointer, 
  Minus,
  Quote,
  Star,
  DollarSign,
  Shield,
  Zap
} from 'lucide-react';

interface ComponentsSidebarProps {
  onComponentSelect: (type: BlockType) => void;
}

const componentTypes: Array<{ type: BlockType; label: string; icon: React.ComponentType<any> }> = [
  { type: 'headline', label: 'Título', icon: Type },
  { type: 'text', label: 'Texto', icon: Type },
  { type: 'image', label: 'Imagem', icon: Image },
  { type: 'button', label: 'Botão', icon: MousePointer },
  { type: 'spacer', label: 'Espaçador', icon: Minus },
  { type: 'benefits', label: 'Benefícios', icon: Star },
  { type: 'testimonials', label: 'Depoimentos', icon: Quote },
  { type: 'pricing', label: 'Preços', icon: DollarSign },
  { type: 'guarantee', label: 'Garantia', icon: Shield },
  { type: 'cta', label: 'Call to Action', icon: Zap }
];

export const ComponentsSidebar: React.FC<ComponentsSidebarProps> = ({
  onComponentSelect
}) => {
  return (
    <div className="h-full bg-white border-r border-[#B89B7A]/20">
      <div className="p-4 border-b border-[#B89B7A]/20">
        <h2 className="font-medium text-[#432818]">Componentes</h2>
      </div>
      
      <ScrollArea className="h-[calc(100%-64px)]">
        <div className="p-4 space-y-2">
          {componentTypes.map((component) => {
            const IconComponent = component.icon;
            return (
              <Button
                key={component.type}
                variant="outline"
                className="w-full justify-start text-left h-auto p-3"
                onClick={() => onComponentSelect(component.type)}
              >
                <IconComponent className="w-4 h-4 mr-2 text-[#8F7A6A]" />
                <span className="text-[#432818]">{component.label}</span>
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
