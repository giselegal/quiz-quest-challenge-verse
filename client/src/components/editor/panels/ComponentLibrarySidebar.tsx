import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getComponentsByCategory, type EditableComponentConfig } from '../services/editableComponentsService';
import { cn } from '@/lib/utils';
import { 
  Gift, 
  Shield, 
  MessageSquareQuote, 
  Lightbulb, 
  RefreshCw, 
  ShieldCheck,
  Plus
} from 'lucide-react';

interface ComponentLibrarySidebarProps {
  onAddComponent?: (componentConfig: EditableComponentConfig & { path: string }) => void;
  className?: string;
}

const ComponentLibrarySidebar: React.FC<ComponentLibrarySidebarProps> = ({
  onAddComponent,
  className
}) => {
  // Ícones para diferentes tipos de componentes
  const getComponentIcon = (componentPath: string) => {
    if (componentPath.includes('MotivationSection')) return <Lightbulb className="w-4 h-4" />;
    if (componentPath.includes('BonusSection')) return <Gift className="w-4 h-4" />;
    if (componentPath.includes('GuaranteeSection')) return <Shield className="w-4 h-4" />;
    if (componentPath.includes('BeforeAfterTransformation')) return <RefreshCw className="w-4 h-4" />;
    if (componentPath.includes('Testimonials')) return <MessageSquareQuote className="w-4 h-4" />;
    if (componentPath.includes('SecurePurchaseElement')) return <ShieldCheck className="w-4 h-4" />;
    return <Plus className="w-4 h-4" />;
  };

  // Cores por categoria
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'result': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'sales': return 'bg-green-100 text-green-700 border-green-200';
      case 'interaction': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'content': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Agrupar componentes por categoria
  const resultComponents = getComponentsByCategory('result');
  const salesComponents = getComponentsByCategory('sales');
  const interactionComponents = getComponentsByCategory('interaction');
  const contentComponents = getComponentsByCategory('content');

  const handleAddComponent = (component: EditableComponentConfig & { path: string }) => {
    onAddComponent?.(component);
  };

  const renderComponentItem = (component: EditableComponentConfig & { path: string }) => (
    <Card 
      key={component.path}
      className="cursor-pointer hover:shadow-md transition-all duration-200 border-[#B89B7A]/20 hover:border-[#B89B7A]/40"
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#B89B7A]/10 flex items-center justify-center text-[#B89B7A]">
            {getComponentIcon(component.path)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-sm text-[#432818] truncate">
                {component.componentName}
              </h4>
              <Badge 
                variant="outline" 
                className={cn("text-xs", getCategoryColor(component.category))}
              >
                {component.category}
              </Badge>
            </div>
            
            {component.description && (
              <p className="text-xs text-[#8F7A6A] line-clamp-2 mb-2">
                {component.description}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-[#6B5B4E]">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                {component.editableFields.length} campos
              </div>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAddComponent(component)}
                className="h-7 px-2 text-xs border-[#B89B7A]/30 text-[#B89B7A] hover:bg-[#B89B7A]/5"
              >
                <Plus className="w-3 h-3 mr-1" />
                Adicionar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderComponentSection = (
    title: string, 
    components: (EditableComponentConfig & { path: string })[], 
    icon: React.ReactNode
  ) => {
    if (components.length === 0) return null;
    
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 text-[#B89B7A]">
            {icon}
          </div>
          <h3 className="font-semibold text-sm text-[#432818]">
            {title}
          </h3>
          <Badge variant="secondary" className="text-xs">
            {components.length}
          </Badge>
        </div>
        
        <div className="space-y-2">
          {components.map(renderComponentItem)}
        </div>
      </div>
    );
  };

  return (
    <Card className={cn("w-full h-full", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-playfair text-[#432818] flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#B89B7A] to-[#aa6b5d] flex items-center justify-center">
            <span className="text-white font-bold text-xs">G</span>
          </div>
          Biblioteca de Componentes
        </CardTitle>
        <p className="text-sm text-[#8F7A6A]">
          Arraste ou clique para adicionar componentes ao seu funil
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Componentes de Resultado */}
        {renderComponentSection(
          "Resultado & Motivação",
          resultComponents,
          <Lightbulb className="w-5 h-5" />
        )}
        
        <Separator />
        
        {/* Componentes de Vendas */}
        {renderComponentSection(
          "Vendas & Conversão",
          salesComponents,
          <Gift className="w-5 h-5" />
        )}
        
        <Separator />
        
        {/* Componentes de Interação */}
        {renderComponentSection(
          "Interação & Engajamento",
          interactionComponents,
          <MessageSquareQuote className="w-5 h-5" />
        )}
        
        {/* Componentes de Conteúdo */}
        {contentComponents.length > 0 && (
          <>
            <Separator />
            {renderComponentSection(
              "Conteúdo & Mídia",
              contentComponents,
              <Plus className="w-5 h-5" />
            )}
          </>
        )}
        
        <Separator />
        
        {/* Estatísticas */}
        <div className="bg-[#B89B7A]/5 rounded-lg p-4">
          <h4 className="font-medium text-sm text-[#432818] mb-2">
            Resumo da Biblioteca
          </h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-[#8F7A6A]">Total de Componentes</div>
              <div className="font-semibold text-[#432818]">
                {resultComponents.length + salesComponents.length + interactionComponents.length + contentComponents.length}
              </div>
            </div>
            <div>
              <div className="text-[#8F7A6A]">Editáveis</div>
              <div className="font-semibold text-[#432818]">
                {[...resultComponents, ...salesComponents, ...interactionComponents, ...contentComponents]
                  .filter(c => c.editable).length}
              </div>
            </div>
          </div>
        </div>
        
        {/* Dica de uso */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 text-blue-600 mt-0.5">
              💡
            </div>
            <div className="text-xs text-blue-700">
              <strong>Dica:</strong> Componentes com badge "Editável" podem ter suas propriedades customizadas no painel da direita após serem adicionados.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComponentLibrarySidebar;
