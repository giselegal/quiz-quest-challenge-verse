import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
// Remove unused Tabs import since we're not using it in this component
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Save,
  Trash2,
  Copy,
  Monitor,
  Smartphone,
  Tablet,
  ChevronUp,
  ChevronDown,
  Type,
  Image as ImageIcon,
  MousePointer,
  Layout,
  GripVertical,
  Eye,
  Plus,
  ArrowLeft,
  ArrowRight,
  Play,
  Download,
  Upload,
  Video,
  Star,
  DollarSign,
  Clock,
  Shield,
  Gift,
  HelpCircle,
  Users,
  Settings,
  Globe,
  BarChart3,
  Target,
  Link,
  TrendingUp,
  Bell,
  Mic,
  ShoppingCart,
  RotateCcw,
  FileText,
  Sliders,
  MoreHorizontal,
  Edit3,
} from "lucide-react";

// Professional component library based on the screenshots
const COMPONENT_LIBRARY = [
  { id: "alert", icon: Bell, label: "Alerta", category: "Interactive" },
  { id: "arguments", icon: FileText, label: "Argumentos", category: "Content" },
  { id: "audio", icon: Mic, label: "Áudio", category: "Media" },
  { id: "button", icon: MousePointer, label: "Botão", category: "Interactive" },
  { id: "loading", icon: RotateCcw, label: "Carregando", category: "Feedback" },
  { id: "carousel", icon: ArrowRight, label: "Carrossel", category: "Layout" },
  { id: "timer", icon: Clock, label: "Cartesiano", category: "Interactive" },
  { id: "compare", icon: BarChart3, label: "Comparar", category: "Content", new: true },
  { id: "confetti", icon: Star, label: "Confetti", category: "Effects" },
  { id: "testimonials", icon: Users, label: "Depoimentos", category: "Social" },
  { id: "entrance", icon: ArrowRight, label: "Entrada", category: "Navigation" },
  { id: "spacer", icon: Layout, label: "Espaçador", category: "Layout" },
  { id: "faq", icon: HelpCircle, label: "FAQ", category: "Content", new: true },
  { id: "charts", icon: BarChart3, label: "Gráficos", category: "Data" },
  { id: "image", icon: ImageIcon, label: "Imagem", category: "Media" },
  { id: "list", icon: FileText, label: "Lista", category: "Content", new: true },
  { id: "marquee", icon: TrendingUp, label: "Marquise", category: "Animation", new: true },
  { id: "level", icon: Target, label: "Nível", category: "Progress" },
];

// Interfaces
interface FunnelStep {
  id: string;
  title: string;
  type: "intro" | "question" | "transition" | "result" | "offer";
  isActive?: boolean;
}

interface ComponentData {
  id: string;
  type: string;
  data: any;
  style?: any;
}

interface PageData {
  id: string;
  title: string;
  components: ComponentData[];
  settings: {
    layout: string;
    direction: string;
    disposition: string;
    validations: {
      multipleChoice: boolean;
      required: boolean;
      autoAdvance: boolean;
    };
    styling: {
      borders: string;
      shadows: string;
      spacing: string;
      details: string;
      style: string;
    };
  };
}

// Mock funnel steps data
const FUNNEL_STEPS: FunnelStep[] = Array.from({ length: 14 }, (_, i) => ({
  id: `etapa-${i + 1}`,
  title: `Etapa ${i + 1}`,
  type: i === 0 ? "intro" : i === 13 ? "result" : "question",
  isActive: i === 0,
}));

const EnhancedSimpleDragDropEditor: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<string>("etapa-1");
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<PageData>({
    id: "page-1",
    title: "Como você define o seu jeito de Ser?",
    components: [
      {
        id: "comp-1",
        type: "question",
        data: {
          title: "Como você define o seu jeito de Ser?",
          options: [
            {
              id: "opt-1",
              text: "A) Sou espontânea e descontraída, adoro coisas simples.",
              emoji: "🌟",
            },
            {
              id: "opt-2", 
              text: "B) Gosto de organização, sou uma pessoa séria e conservadora.",
              emoji: "😌",
            },
            {
              id: "opt-3",
              text: "C) Sou prática e objetiva, valorizo a funcionalidade.",
              emoji: "🎯",
            },
            {
              id: "opt-4",
              text: "D) Sou exigente e sofisticada, cuidadosa nas minhas escolhas.",
              emoji: "💎",
            },
            {
              id: "opt-5",
              text: "E) Tenho um lado delicado e sensível que transparece em tudo.",
              emoji: "🌸",
            },
            {
              id: "opt-6",
              text: "F) Sou confiante e sensual e adoro me cuidar.",
              emoji: "💋",
            },
            {
              id: "opt-7",
              text: "G) Sou moderna e audaciosa, tenho presença.",
              emoji: "🔥",
            },
            {
              id: "opt-8",
              text: "H) Sou exótica e aventureira, gosto da liberdade.",
              emoji: "🦋",
            },
          ],
        },
        style: {},
      },
    ],
    settings: {
      layout: "Em Lista",
      direction: "Horizontal",
      disposition: "Sem Imagem",
      validations: {
        multipleChoice: false,
        required: true,
        autoAdvance: false,
      },
      styling: {
        borders: "Pequena",
        shadows: "Média",
        spacing: "Pequena",
        details: "Nenhum",
        style: "Simples",
      },
    },
  });

  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const { toast } = useToast();

  // Handle component drag start
  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData("componentType", componentType);
  };

  // Handle drop on canvas
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData("componentType");
    
    const newComponent: ComponentData = {
      id: `comp-${Date.now()}`,
      type: componentType,
      data: getDefaultComponentData(componentType),
      style: {},
    };

    setCurrentPage(prev => ({
      ...prev,
      components: [...prev.components, newComponent],
    }));

    toast({
      title: "Componente adicionado",
      description: `${componentType} foi adicionado à página`,
    });
  };

  // Get default data for component type
  const getDefaultComponentData = (type: string) => {
    switch (type) {
      case "button":
        return { text: "Clique aqui", action: "next" };
      case "image":
        return { src: "", alt: "Imagem" };
      case "text":
        return { content: "Texto do componente" };
      default:
        return {};
    }
  };

  // Allow drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Component renderer for canvas
  const renderComponent = (component: ComponentData) => {
    switch (component.type) {
      case "question":
        return (
          <div 
            key={component.id}
            className="w-full bg-white border-2 border-dashed border-blue-300 rounded-lg p-6 min-h-[400px]"
            onClick={() => setSelectedComponent(component.id)}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {component.data.title}
              </h2>
            </div>
            
            <div className="grid gap-3 max-w-2xl mx-auto">
              {component.data.options?.map((option: any) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border cursor-pointer"
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="text-gray-700">{option.text}</span>
                  <button className="ml-auto p-1 hover:bg-gray-200 rounded">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return (
          <div 
            key={component.id}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg"
            onClick={() => setSelectedComponent(component.id)}
          >
            <p className="text-gray-500 text-center">Componente: {component.type}</p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Left Sidebar - Steps Panel */}
      <div className="w-64 bg-gray-900 text-white flex flex-col border-r border-gray-800">
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-800"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Steps List */}
        <ScrollArea className="flex-1 p-2">
          <div className="space-y-1">
            {FUNNEL_STEPS.map((step) => (
              <button
                key={step.id}
                onClick={() => setSelectedStep(step.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                  selectedStep === step.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <GripVertical className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
                {selectedStep === step.id && (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>
          
          {/* Add Step Button */}
          <Button
            variant="ghost"
            className="w-full mt-4 text-gray-400 hover:text-white hover:bg-gray-800 justify-start"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Etapa
          </Button>
        </ScrollArea>
      </div>

      {/* Center Area - Component Library + Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar - Component Library */}
        <div className="bg-gray-900 border-b border-gray-800 p-2">
          <ScrollArea>
            <div className="flex space-x-2">
              {COMPONENT_LIBRARY.map((comp) => (
                <div
                  key={comp.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, comp.id)}
                  className="flex flex-col items-center p-3 min-w-[80px] bg-gray-800 hover:bg-gray-700 rounded-lg cursor-grab active:cursor-grabbing transition-colors group"
                >
                  <div className="relative">
                    <comp.icon className="w-6 h-6 text-gray-300 group-hover:text-white mb-2" />
                    {comp.new && (
                      <Badge className="absolute -top-2 -right-2 text-xs bg-blue-600 text-white px-1 py-0.5">
                        Novo
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-gray-200 text-center">
                    {comp.label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex">
          {/* Main Canvas */}
          <div className="flex-1 p-6 overflow-auto">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-semibold text-gray-800">
                  Editor de Funil
                </h1>
                <Badge variant="outline" className="text-sm">
                  {currentPage.title}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* View Mode Selector */}
                <div className="flex bg-gray-200 rounded-lg p-1">
                  <Button
                    variant={viewMode === "desktop" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("desktop")}
                  >
                    <Monitor className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "tablet" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("tablet")}
                  >
                    <Tablet className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "mobile" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("mobile")}
                  >
                    <Smartphone className="w-4 h-4" />
                  </Button>
                </div>

                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                
                <Button size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar
                </Button>
                
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Publicar
                </Button>
              </div>
            </div>

            {/* Canvas Container */}
            <div 
              className="min-h-[600px] bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 mx-auto"
              style={{
                maxWidth: viewMode === "mobile" ? "375px" : viewMode === "tablet" ? "768px" : "100%"
              }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {currentPage.components.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Layout className="w-12 h-12 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Canvas vazio</h3>
                  <p className="text-center">
                    Arraste componentes da biblioteca acima para começar a construir sua página
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {currentPage.components.map(renderComponent)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Properties Panel */}
      <div className="w-96 bg-gray-900 text-white border-l border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h3 className="text-lg font-semibold">Propriedades</h3>
        </div>

        <ScrollArea className="flex-1 p-4">
          {selectedComponent ? (
            <div className="space-y-6">
              {/* Layout Section */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Layout</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Layout</Label>
                    <Select value={currentPage.settings.layout}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Em Lista">Em Lista</SelectItem>
                        <SelectItem value="2 Colunas">2 Colunas</SelectItem>
                        <SelectItem value="3 Colunas">3 Colunas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-gray-300">Direção</Label>
                    <Select value={currentPage.settings.direction}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Horizontal">Horizontal</SelectItem>
                        <SelectItem value="Vertical">Vertical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-gray-300">Disposição</Label>
                    <Select value={currentPage.settings.disposition}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sem Imagem">Sem Imagem</SelectItem>
                        <SelectItem value="Imagem | Texto">Imagem | Texto</SelectItem>
                        <SelectItem value="Texto | Imagem">Texto | Imagem</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Options Section */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Opções</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentPage.components[0]?.data?.options?.map((option: any, index: number) => (
                    <div key={option.id} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                      <span className="text-2xl">{option.emoji}</span>
                      <div className="flex-1">
                        <span className="text-white text-sm">{option.text.substring(0, 30)}...</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Validations Section */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Validações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Múltipla Escolha</Label>
                    <Switch 
                      checked={currentPage.settings.validations.multipleChoice}
                      className="data-[state=checked]:bg-green-600"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Obrigatório</Label>
                    <Switch 
                      checked={currentPage.settings.validations.required}
                      className="data-[state=checked]:bg-green-600"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Auto-avançar</Label>
                    <Switch 
                      checked={currentPage.settings.validations.autoAdvance}
                      className="data-[state=checked]:bg-green-600"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Styling Section */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Estilização</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Bordas</Label>
                    <Select value={currentPage.settings.styling.borders}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pequena">Pequena</SelectItem>
                        <SelectItem value="Média">Média</SelectItem>
                        <SelectItem value="Grande">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-gray-300">Sombras</Label>
                    <Select value={currentPage.settings.styling.shadows}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pequena">Pequena</SelectItem>
                        <SelectItem value="Média">Média</SelectItem>
                        <SelectItem value="Grande">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-gray-300">Espaçamento</Label>
                    <Select value={currentPage.settings.styling.spacing}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pequena">Pequena</SelectItem>
                        <SelectItem value="Média">Média</SelectItem>
                        <SelectItem value="Grande">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-gray-300">Estilo</Label>
                    <Select value={currentPage.settings.styling.style}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Simples">Simples</SelectItem>
                        <SelectItem value="Moderno">Moderno</SelectItem>
                        <SelectItem value="Elegante">Elegante</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Color Customization */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Personalização</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label className="text-gray-300 text-xs">Cor</Label>
                      <div className="w-full h-8 bg-red-500 rounded border border-gray-600"></div>
                    </div>
                    <div>
                      <Label className="text-gray-300 text-xs">Texto</Label>
                      <div className="w-full h-8 bg-blue-500 rounded border border-gray-600"></div>
                    </div>
                    <div>
                      <Label className="text-gray-300 text-xs">Borda</Label>
                      <div className="w-full h-8 bg-green-500 rounded border border-gray-600"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Sliders className="w-12 h-12 mb-4" />
              <h3 className="text-lg font-medium mb-2">Selecione um componente</h3>
              <p className="text-center text-sm">
                Clique em um componente no canvas para ver suas propriedades
              </p>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default EnhancedSimpleDragDropEditor;