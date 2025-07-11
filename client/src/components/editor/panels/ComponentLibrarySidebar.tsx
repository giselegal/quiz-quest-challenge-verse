import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getComponentsByCategory, type EditableComponentConfig } from '../services/editableComponentsService';
import { getAllFlexComponents, type FlexComponentConfig, type FlexComponentType } from '../services/flexComponentsService';
import { cn } from '@/lib/utils';
import { 
  Gift, 
  Shield, 
  MessageSquareQuote, 
  Lightbulb, 
  RefreshCw, 
  ShieldCheck,
  Plus,
  Package,
  FileText,
  MousePointer,
  Image
} from 'lucide-react';

interface ComponentLibrarySidebarProps {
  onAddComponent?: (componentConfig: EditableComponentConfig & { path: string }) => void;
  onAddFlexComponent?: (componentConfig: FlexComponentConfig) => void;
  className?: string;
}

const ComponentLibrarySidebar: React.FC<ComponentLibrarySidebarProps> = ({
  onAddComponent,
  onAddFlexComponent,
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

  // Ícones para componentes flexíveis
  const getFlexComponentIcon = (type: FlexComponentType) => {
    switch (type) {
      case 'container': return <Package className="w-4 h-4" />;
      case 'card': return <Plus className="w-4 h-4" />;
      case 'text': return <FileText className="w-4 h-4" />;
      case 'button': return <MousePointer className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      default: return <Plus className="w-4 h-4" />;
    }
  };

  // Cores por categoria
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'result': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'sales': return 'bg-green-100 text-green-700 border-green-200';
      case 'interaction': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'content': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'layout': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'media': return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'interactive': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Agrupar componentes por categoria
  const resultComponents = getComponentsByCategory('result');
  const salesComponents = getComponentsByCategory('sales');
  const interactionComponents = getComponentsByCategory('interaction');
  const contentComponents = getComponentsByCategory('content');

  // Obter componentes flexíveis
  const flexComponents = getAllFlexComponents();

  const handleAddComponent = (component: EditableComponentConfig & { path: string }) => {
    onAddComponent?.(component);
  };

  const handleAddFlexComponent = (component: FlexComponentConfig) => {
    onAddFlexComponent?.(component);
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
          🚀 Agora com componentes flexíveis para layouts horizontais!
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto">
        {/* Seção de Componentes Flexíveis */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
          <h2 className="font-bold text-[#432818] mb-4 flex items-center gap-2">
            <Package className="w-5 h-5" />
            🔥 Componentes Flexíveis (BoxFlex)
          </h2>
          
          <div className="space-y-3">
            {flexComponents.map(component => (
              <Card 
                key={component.type}
                className="cursor-pointer hover:shadow-md transition-all duration-200 border-[#B89B7A]/20 hover:border-[#B89B7A]/40"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#B89B7A]/10 flex items-center justify-center text-[#B89B7A]">
                      {getFlexComponentIcon(component.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm text-[#432818] truncate">
                          {component.name}
                        </h4>
                        <div className="text-lg">
                          {component.icon}
                        </div>
                        <Badge 
                          variant="outline" 
                          className={cn("text-xs", getCategoryColor(component.category))}
                        >
                          {component.category}
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-[#8F7A6A] line-clamp-2 mb-2">
                        {component.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-[#6B5B4E]">
                          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                          {component.editableFields.length} campos • Horizontal
                        </div>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAddFlexComponent(component)}
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
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-white/50 rounded border border-blue-300">
            <h4 className="font-semibold text-xs text-blue-800 mb-1">✨ Características dos Componentes Flexíveis:</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• 📐 <strong>Layout Horizontal:</strong> Podem ser colocados lado a lado</li>
              <li>• 🔧 <strong>Totalmente Modulares:</strong> Configuração independente</li>
              <li>• 🎨 <strong>Reutilizáveis:</strong> Use quantas vezes quiser</li>
              <li>• ⚡ <strong>Performance:</strong> Renderização otimizada</li>
            </ul>
          </div>
        </div>
        
        <Separator />
        
        {/* Componentes Originais */}
        <div>
          <h2 className="font-bold text-[#432818] mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Componentes do Sistema (Verticais)
          </h2>
          
          <div className="space-y-3">
            {[...resultComponents, ...salesComponents, ...interactionComponents, ...contentComponents].map(component => (
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
                          {component.editableFields.length} campos • Vertical
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
            ))}
          </div>
        </div>
        
        <Separator />
        
        {/* Estatísticas */}
        <div className="bg-[#B89B7A]/5 rounded-lg p-4">
          <h4 className="font-medium text-sm text-[#432818] mb-2">
            Resumo da Biblioteca
          </h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-[#8F7A6A]">Componentes Sistema</div>
              <div className="font-semibold text-[#432818]">
                {resultComponents.length + salesComponents.length + interactionComponents.length + contentComponents.length}
              </div>
            </div>
            <div>
              <div className="text-[#8F7A6A]">Componentes Flexíveis</div>
              <div className="font-semibold text-[#432818]">
                {flexComponents.length}
              </div>
            </div>
            <div>
              <div className="text-[#8F7A6A]">Layouts Horizontais</div>
              <div className="font-semibold text-[#432818]">
                {flexComponents.filter(c => c.category === 'layout').length}
              </div>
            </div>
            <div>
              <div className="text-[#8F7A6A]">Total Editáveis</div>
              <div className="font-semibold text-[#432818]">
                {resultComponents.length + salesComponents.length + interactionComponents.length + contentComponents.length + flexComponents.length}
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
              <strong>Como usar:</strong> Os <strong>Componentes Flexíveis</strong> são modulares e independentes. Use o <strong>Container Flexível</strong> para organizar outros componentes horizontalmente. Cada componente é totalmente reutilizável!
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComponentLibrarySidebar;
