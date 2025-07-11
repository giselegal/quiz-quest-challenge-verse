
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Type, 
  Image, 
  ListChecks, 
  MessageSquare, 
  DollarSign, 
  Shield, 
  MousePointer,
  Layout,
  Award,
  Gift,
  LayoutTemplate,
  Quote,
  ImagePlus,
  Star,
  Heart,
  TrendingUp,
  Clock,
  Users,
  CheckCircle
} from 'lucide-react';
import { Block } from '@/types/editor';
import { ComponentItem } from './ComponentItem';

interface ComponentsSidebarProps {
  onComponentSelect: (type: Block['type']) => void;
}

// ES7+ Arrow function component with destructuring
export const ComponentsSidebar: React.FC<ComponentsSidebarProps> = ({ onComponentSelect }) => {
  // ES7+ Component configuration with modern array methods and object destructuring
  const componentCategories = {
    basic: [
      { type: 'text-inline', label: 'Texto', icon: Type, description: 'Bloco de texto editável inline' },
      { type: 'heading-inline', label: 'Título', icon: Type, description: 'Título responsivo editável' },
      { type: 'image-display-inline', label: 'Imagem', icon: Image, description: 'Imagem otimizada e responsiva' },
      { type: 'button-inline', label: 'Botão', icon: MousePointer, description: 'Botão de ação editável' },
      { type: 'spacer', label: 'Espaçador', icon: Layout, description: 'Espaço em branco configurável' }
    ],
    
    result: [
      { type: 'result-header-inline', label: 'Header Resultado', icon: Award, description: 'Cabeçalho da página de resultado' },
      { type: 'result-card-inline', label: 'Card Resultado', icon: Star, description: 'Card principal do estilo identificado' },
      { type: 'style-card-inline', label: 'Card Estilo', icon: Heart, description: 'Card dos estilos secundários' },
      { type: 'progress-inline', label: 'Barra Progresso', icon: TrendingUp, description: 'Barra de progresso animada' },
      { type: 'stat-inline', label: 'Estatística', icon: TrendingUp, description: 'Estatística com porcentagem' }
    ],
    
    content: [
      { type: 'component-reference', label: 'Seção Motivação', icon: MessageSquare, description: 'Seção antes/depois motivacional', componentPath: '@/components/result/MotivationSection' },
      { type: 'component-reference', label: 'Transformações', icon: Users, description: 'Before/After de clientes reais', componentPath: '@/components/result/BeforeAfterTransformation' },
      { type: 'component-reference', label: 'Bônus Exclusivos', icon: Gift, description: 'Seção de bônus com imagens', componentPath: '@/components/result/BonusSection' },
      { type: 'component-reference', label: 'Depoimentos', icon: Quote, description: 'Testimonials reais de clientes', componentPath: '@/components/quiz-result/sales/Testimonials' },
      { type: 'component-reference', label: 'Garantia', icon: Shield, description: 'Seção de garantia animada', componentPath: '@/components/result/GuaranteeSection' },
      { type: 'component-reference', label: 'Compra Segura', icon: CheckCircle, description: 'Elementos de segurança', componentPath: '@/components/result/SecurePurchaseElement' }
    ],
    
    interactive: [
      { type: 'testimonial-card-inline', label: 'Card Depoimento', icon: Quote, description: 'Depoimento individual editável' },
      { type: 'countdown-inline', label: 'Timer Urgência', icon: Clock, description: 'Contador regressivo animado' },
      { type: 'pricing-card-inline', label: 'Card Preço', icon: DollarSign, description: 'Card de pricing com desconto' },
      { type: 'badge-inline', label: 'Badge', icon: Award, description: 'Badge de destaque editável' }
    ]
  };

  // ES7+ Render function with modern array methods
  const renderComponentList = (components: typeof componentCategories.basic) => 
    components.map(({ type, label, icon, description, ...rest }) => (
      <ComponentItem
        key={type}
        type={type as Block['type']}
        label={label}
        icon={icon}
        description={description}
        onSelect={onComponentSelect}
        {...rest}
      />
    ));
  
  return (
    <div className="h-full bg-white flex flex-col border-r border-[#B89B7A]/20">
      <div className="p-4 border-b border-[#B89B7A]/20">
        <h2 className="font-medium text-[#432818]">Componentes</h2>
        <p className="text-xs text-[#B89B7A] mt-1">Arraste para o canvas</p>
      </div>
      
      <Tabs defaultValue="basic" className="flex-1 flex flex-col">
        <div className="px-4 pt-2">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="basic">Básico</TabsTrigger>
            <TabsTrigger value="result">Resultado</TabsTrigger>
            <TabsTrigger value="content">Seções</TabsTrigger>
            <TabsTrigger value="interactive">Interativo</TabsTrigger>
          </TabsList>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <TabsContent value="basic" className="m-0 space-y-2">
            {renderComponentList(componentCategories.basic)}
          </TabsContent>
          
          <TabsContent value="result" className="m-0 space-y-2">
            {renderComponentList(componentCategories.result)}
          </TabsContent>
          
          <TabsContent value="content" className="m-0 space-y-2">
            {renderComponentList(componentCategories.content)}
          </TabsContent>
          
          <TabsContent value="interactive" className="m-0 space-y-2">
            {renderComponentList(componentCategories.interactive)}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};
