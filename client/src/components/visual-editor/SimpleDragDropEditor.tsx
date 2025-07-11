// @ts-nocheck
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
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import FunnelStepsColumn, { REAL_FUNNEL_STEPS } from "./FunnelStepsColumn";
import {
  Save,
  Copy,
  Monitor,
  Smartphone,
  Tablet,
  Eye,
  Plus,
  ArrowLeft,
  ArrowRight,
  Download,
  Upload,
  Settings,
  Type,
  Image as ImageIcon,
  MousePointer,
} from "lucide-react";

// Interfaces básicas
interface ComponentData {
  id: string;
  type: string;
  data: any;
  style: any;
}

interface PageData {
  id: string;
  title: string;
  type: string;
  progress: number;
  showHeader: boolean;
  showProgress: boolean;
  components: ComponentData[];
}

interface FunnelData {
  id: string;
  name: string;
  pages: PageData[];
}

/**
 * Cria uma página baseada em uma etapa real do funil com componentes específicos
 */
const createPageFromRealStep = (step: typeof REAL_FUNNEL_STEPS[0]): PageData => {
  const baseComponents: ComponentData[] = [];
  
  // Componentes específicos por tipo de etapa
  if (step.id === "quiz-intro") {
    baseComponents.push(
      {
        id: `${step.id}-logo`,
        type: "logo",
        data: {
          src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
          alt: "Gisele Galvão - Consultoria de Estilo",
          width: 200,
          height: 80
        },
        style: { textAlign: "center", marginBottom: "2rem" }
      },
      {
        id: `${step.id}-title`,
        type: "title",
        data: {
          text: "Descubra Seu Estilo Pessoal",
          fontSize: "2.5rem",
          fontWeight: "400",
          color: "#2c2c2c"
        },
        style: { textAlign: "center", marginBottom: "2rem" }
      },
      {
        id: `${step.id}-subtitle`,
        type: "subtitle",
        data: {
          text: "Chega de guarda-roupa lotado sem ter o que vestir",
          fontSize: "1.2rem",
          color: "#666"
        },
        style: { textAlign: "center", marginBottom: "2rem" }
      },
      {
        id: `${step.id}-input`,
        type: "input",
        data: {
          placeholder: "Digite seu nome aqui...",
          required: true,
          type: "text",
          label: "NOME*"
        },
        style: { maxWidth: "400px", margin: "0 auto 2rem" }
      },
      {
        id: `${step.id}-button`,
        type: "button",
        data: { text: "COMEÇAR AGORA", variant: "primary" },
        style: { maxWidth: "300px", margin: "0 auto" }
      }
    );
  } else if (step.id.includes("questions-1-10")) {
    baseComponents.push(
      {
        id: `${step.id}-title`,
        type: "title",
        data: {
          text: "QUAL O SEU TIPO DE ROUPA FAVORITA?",
          fontSize: "1.8rem",
          fontWeight: "600",
          color: "#432818"
        },
        style: { textAlign: "center", marginBottom: "2rem" }
      },
      {
        id: `${step.id}-options`,
        type: "options",
        data: {
          multiSelect: true,
          maxSelections: 3,
          hasImages: true,
          options: [
            { id: "1a", text: "Roupas confortáveis e práticas", value: "natural" },
            { id: "1b", text: "Peças discretas e clássicas", value: "classico" },
            { id: "1c", text: "Casuais com toque de estilo", value: "contemporaneo" }
          ]
        },
        style: { display: "grid", gap: "1rem", marginBottom: "2rem" }
      }
    );
  } else if (step.id.includes("strategic")) {
    baseComponents.push(
      {
        id: `${step.id}-title`,
        type: "title",
        data: {
          text: "Como você se vê hoje?",
          fontSize: "1.8rem",
          fontWeight: "600"
        },
        style: { textAlign: "center", marginBottom: "2rem" }
      },
      {
        id: `${step.id}-options`,
        type: "options",
        data: {
          multiSelect: false,
          maxSelections: 1,
          options: [
            { id: "s1", text: "Me sinto desconectada da mulher que sou hoje", value: "desconectada" },
            { id: "s2", text: "Tenho dúvidas sobre o que me valoriza", value: "duvidas" }
          ]
        },
        style: { marginBottom: "2rem" }
      }
    );
  } else if (step.id.includes("result")) {
    baseComponents.push(
      {
        id: `${step.id}-title`,
        type: "title",
        data: {
          text: "Seu Estilo Personalizado",
          fontSize: "2rem",
          fontWeight: "700"
        },
        style: { textAlign: "center", marginBottom: "2rem" }
      },
      {
        id: `${step.id}-style-result`,
        type: "subtitle",
        data: {
          text: "Natural Autêntica",
          fontSize: "1.5rem",
          color: "#D4AF37"
        },
        style: { textAlign: "center", marginBottom: "2rem" }
      },
      {
        id: `${step.id}-cta`,
        type: "button",
        data: { text: "Ver Guia Completo", variant: "primary" },
        style: { margin: "0 auto" }
      }
    );
  } else {
    // Componentes genéricos para outras etapas
    step.editableElements.forEach((element, index) => {
      baseComponents.push({
        id: `${step.id}-${index}`,
        type: "text",
        data: {
          text: element,
          configurable: true,
          stepId: step.id,
          componentName: step.component
        },
        style: { marginBottom: "1rem" }
      });
    });
  }

  return {
    id: step.id,
    title: step.title,
    type: step.id.includes("intro") ? "intro" : 
          step.id.includes("question") ? "question" : 
          step.id.includes("transition") ? "transition" :
          step.id.includes("result") ? "result" : "other",
    progress: step.progress,
    showHeader: true,
    showProgress: step.progress > 0,
    components: baseComponents
  };
};

const SimpleDragDropEditor: React.FC = () => {
  const { toast } = useToast();

  // Estados principais
  const [currentFunnel, setCurrentFunnel] = useState<FunnelData>({
    id: "default-funnel",
    name: "Funil de Quiz de Estilo",
    pages: []
  });
  
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [deviceView, setDeviceView] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

  const currentPage = currentFunnel?.pages?.[currentPageIndex] || null;

  /**
   * Função para lidar com seleção de etapas do FunnelStepsColumn
   */
  const handleStepSelect = (step: typeof REAL_FUNNEL_STEPS[0]) => {
    setSelectedStepId(step.id);
    
    // Verificar se já existe uma página para esta etapa
    const existingPageIndex = currentFunnel.pages.findIndex(page => page.id === step.id);
    
    if (existingPageIndex !== -1) {
      // Se existe, navegar para ela
      setCurrentPageIndex(existingPageIndex);
    } else {
      // Se não existe, criar nova página baseada na etapa
      const newPage = createPageFromRealStep(step);
      const newPages = [...currentFunnel.pages, newPage];
      
      setCurrentFunnel(prev => ({
        ...prev,
        pages: newPages
      }));
      
      // Navegar para a nova página
      setCurrentPageIndex(newPages.length - 1);
      
      toast({
        title: "✅ Etapa adicionada!",
        description: `${step.title} criada com ${step.editableElements.length} elementos editáveis.`,
      });
    }
  };

  // Funções de navegação
  const goToPreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPageIndex < currentFunnel.pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const addNewPage = () => {
    const newPage: PageData = {
      id: `page-${Date.now()}`,
      title: "Nova Página",
      type: "other",
      progress: 0,
      showHeader: true,
      showProgress: true,
      components: []
    };
    
    setCurrentFunnel(prev => ({
      ...prev,
      pages: [...prev.pages, newPage]
    }));
    
    setCurrentPageIndex(currentFunnel.pages.length);
    
    toast({
      title: "✅ Página adicionada!",
      description: "Nova página criada no funil.",
    });
  };

  // Função para renderizar componente no canvas
  const renderComponent = (component: ComponentData) => {
    const isSelected = selectedComponent === component.id;
    
    return (
      <div 
        key={component.id}
        className={`component-wrapper p-2 border-2 rounded ${
          isSelected ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:border-gray-300'
        } cursor-pointer transition-all`}
        onClick={() => setSelectedComponent(component.id)}
        style={component.style}
      >
        {component.type === "title" && (
          <h1 style={{ 
            fontSize: component.data.fontSize, 
            fontWeight: component.data.fontWeight,
            color: component.data.color,
            textAlign: component.style.textAlign || "left"
          }}>
            {component.data.text}
          </h1>
        )}
        
        {component.type === "subtitle" && (
          <h2 style={{ 
            fontSize: component.data.fontSize, 
            color: component.data.color,
            textAlign: component.style.textAlign || "left"
          }}>
            {component.data.text}
          </h2>
        )}
        
        {component.type === "text" && (
          <p style={{ textAlign: component.style.textAlign || "left" }}>
            {component.data.text}
          </p>
        )}
        
        {component.type === "logo" && (
          <img 
            src={component.data.src} 
            alt={component.data.alt}
            style={{ 
              width: component.data.width,
              height: component.data.height,
              display: "block",
              margin: component.style.margin || "0 auto"
            }}
          />
        )}
        
        {component.type === "input" && (
          <div>
            {component.data.label && (
              <label className="block text-sm font-medium mb-1">
                {component.data.label}
              </label>
            )}
            <input 
              type={component.data.type || "text"}
              placeholder={component.data.placeholder}
              className="w-full p-2 border rounded"
              style={component.style}
            />
          </div>
        )}
        
        {component.type === "button" && (
          <button 
            className={`px-6 py-3 rounded font-medium ${
              component.data.variant === "primary" 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            style={component.style}
          >
            {component.data.text}
          </button>
        )}
        
        {component.type === "options" && (
          <div style={component.style}>
            <p className="mb-4 text-center">
              Selecione até {component.data.maxSelections} opções:
            </p>
            <div className="grid gap-3">
              {component.data.options.map((option: any) => (
                <div 
                  key={option.id}
                  className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer transition-colors"
                >
                  {option.text}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Função para renderizar painel de propriedades
  const renderPropertiesPanel = () => {
    if (!selectedComponent || !currentPage) return null;
    
    const component = currentPage.components.find(c => c.id === selectedComponent);
    if (!component) return null;

    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">
            Editando: {component.type}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {component.type === "title" || component.type === "subtitle" || component.type === "text" ? (
            <>
              <div>
                <Label className="text-xs">Texto</Label>
                <Textarea
                  value={component.data.text}
                  onChange={(e) => {
                    const updatedComponents = currentPage.components.map(c =>
                      c.id === selectedComponent 
                        ? { ...c, data: { ...c.data, text: e.target.value } }
                        : c
                    );
                    const updatedPages = [...currentFunnel.pages];
                    updatedPages[currentPageIndex] = { ...currentPage, components: updatedComponents };
                    setCurrentFunnel(prev => ({ ...prev, pages: updatedPages }));
                  }}
                  className="text-sm resize-none"
                  rows={3}
                />
              </div>
              
              <div>
                <Label className="text-xs">Tamanho da Fonte</Label>
                <Input
                  value={component.data.fontSize || "1rem"}
                  onChange={(e) => {
                    const updatedComponents = currentPage.components.map(c =>
                      c.id === selectedComponent 
                        ? { ...c, data: { ...c.data, fontSize: e.target.value } }
                        : c
                    );
                    const updatedPages = [...currentFunnel.pages];
                    updatedPages[currentPageIndex] = { ...currentPage, components: updatedComponents };
                    setCurrentFunnel(prev => ({ ...prev, pages: updatedPages }));
                  }}
                  className="text-sm h-8"
                />
              </div>
              
              <div>
                <Label className="text-xs">Cor</Label>
                <Input
                  type="color"
                  value={component.data.color || "#000000"}
                  onChange={(e) => {
                    const updatedComponents = currentPage.components.map(c =>
                      c.id === selectedComponent 
                        ? { ...c, data: { ...c.data, color: e.target.value } }
                        : c
                    );
                    const updatedPages = [...currentFunnel.pages];
                    updatedPages[currentPageIndex] = { ...currentPage, components: updatedComponents };
                    setCurrentFunnel(prev => ({ ...prev, pages: updatedPages }));
                  }}
                  className="text-sm h-8"
                />
              </div>
            </>
          ) : null}
          
          {component.type === "input" ? (
            <>
              <div>
                <Label className="text-xs">Label</Label>
                <Input
                  value={component.data.label || ""}
                  onChange={(e) => {
                    const updatedComponents = currentPage.components.map(c =>
                      c.id === selectedComponent 
                        ? { ...c, data: { ...c.data, label: e.target.value } }
                        : c
                    );
                    const updatedPages = [...currentFunnel.pages];
                    updatedPages[currentPageIndex] = { ...currentPage, components: updatedComponents };
                    setCurrentFunnel(prev => ({ ...prev, pages: updatedPages }));
                  }}
                  className="text-sm h-8"
                />
              </div>
              
              <div>
                <Label className="text-xs">Placeholder</Label>
                <Input
                  value={component.data.placeholder || ""}
                  onChange={(e) => {
                    const updatedComponents = currentPage.components.map(c =>
                      c.id === selectedComponent 
                        ? { ...c, data: { ...c.data, placeholder: e.target.value } }
                        : c
                    );
                    const updatedPages = [...currentFunnel.pages];
                    updatedPages[currentPageIndex] = { ...currentPage, components: updatedComponents };
                    setCurrentFunnel(prev => ({ ...prev, pages: updatedPages }));
                  }}
                  className="text-sm h-8"
                />
              </div>
            </>
          ) : null}
          
          {component.type === "button" ? (
            <>
              <div>
                <Label className="text-xs">Texto do Botão</Label>
                <Input
                  value={component.data.text || ""}
                  onChange={(e) => {
                    const updatedComponents = currentPage.components.map(c =>
                      c.id === selectedComponent 
                        ? { ...c, data: { ...c.data, text: e.target.value } }
                        : c
                    );
                    const updatedPages = [...currentFunnel.pages];
                    updatedPages[currentPageIndex] = { ...currentPage, components: updatedComponents };
                    setCurrentFunnel(prev => ({ ...prev, pages: updatedPages }));
                  }}
                  className="text-sm h-8"
                />
              </div>
            </>
          ) : null}
        </CardContent>
      </Card>
    );
  };

  // Loading state se currentPage for null
  if (!currentPage && currentFunnel.pages.length > 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4 text-[#432818]">Editor Carregando...</h1>
          <p className="text-[#8F7A6A]">Inicializando editor visual</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-background">
      {/* COLUNA 1: ETAPAS REAIS DO FUNIL */}
      <FunnelStepsColumn 
        onStepSelect={handleStepSelect}
        selectedStepId={selectedStepId}
      />

      {/* COLUNA 2: COMPONENTES - 240px */}
      <div className="w-[240px] min-w-[240px] border-r bg-blue-50 overflow-hidden flex flex-col">
        <div className="p-3 border-b bg-blue-100">
          <h2 className="text-sm font-semibold mb-2 flex items-center gap-2">
            🧩 COMPONENTES
          </h2>
          <p className="text-xs text-muted-foreground">
            Arraste e solte no canvas
          </p>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {/* Componentes Básicos */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-gray-700 mb-2">
                COMPONENTES BÁSICOS
              </h4>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start h-8 text-xs"
                onClick={() => {
                  if (!currentPage) return;
                  
                  const newComponent: ComponentData = {
                    id: `title-${Date.now()}`,
                    type: "title",
                    data: {
                      text: "Novo Título",
                      fontSize: "2rem",
                      fontWeight: "600",
                      color: "#000000"
                    },
                    style: { textAlign: "center", marginBottom: "1rem" }
                  };
                  
                  const updatedComponents = [...currentPage.components, newComponent];
                  const updatedPages = [...currentFunnel.pages];
                  updatedPages[currentPageIndex] = { ...currentPage, components: updatedComponents };
                  setCurrentFunnel(prev => ({ ...prev, pages: updatedPages }));
                  
                  toast({
                    title: "✅ Título adicionado!",
                    description: "Novo componente de título criado.",
                  });
                }}
              >
                <Type className="h-3 w-3 mr-2" />
                Título
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start h-8 text-xs"
                onClick={() => {
                  if (!currentPage) return;
                  
                  const newComponent: ComponentData = {
                    id: `text-${Date.now()}`,
                    type: "text",
                    data: {
                      text: "Novo texto aqui...",
                      fontSize: "1rem",
                      color: "#666666"
                    },
                    style: { marginBottom: "1rem" }
                  };
                  
                  const updatedComponents = [...currentPage.components, newComponent];
                  const updatedPages = [...currentFunnel.pages];
                  updatedPages[currentPageIndex] = { ...currentPage, components: updatedComponents };
                  setCurrentFunnel(prev => ({ ...prev, pages: updatedPages }));
                  
                  toast({
                    title: "✅ Texto adicionado!",
                    description: "Novo componente de texto criado.",
                  });
                }}
              >
                <Type className="h-3 w-3 mr-2" />
                Texto
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start h-8 text-xs"
                onClick={() => {
                  if (!currentPage) return;
                  
                  const newComponent: ComponentData = {
                    id: `button-${Date.now()}`,
                    type: "button",
                    data: {
                      text: "Clique Aqui",
                      variant: "primary"
                    },
                    style: { margin: "1rem auto" }
                  };
                  
                  const updatedComponents = [...currentPage.components, newComponent];
                  const updatedPages = [...currentFunnel.pages];
                  updatedPages[currentPageIndex] = { ...currentPage, components: updatedComponents };
                  setCurrentFunnel(prev => ({ ...prev, pages: updatedPages }));
                  
                  toast({
                    title: "✅ Botão adicionado!",
                    description: "Novo componente de botão criado.",
                  });
                }}
              >
                <MousePointer className="h-3 w-3 mr-2" />
                Botão
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start h-8 text-xs"
                onClick={() => {
                  if (!currentPage) return;
                  
                  const newComponent: ComponentData = {
                    id: `input-${Date.now()}`,
                    type: "input",
                    data: {
                      placeholder: "Digite aqui...",
                      type: "text",
                      label: "Campo de entrada"
                    },
                    style: { marginBottom: "1rem" }
                  };
                  
                  const updatedComponents = [...currentPage.components, newComponent];
                  const updatedPages = [...currentFunnel.pages];
                  updatedPages[currentPageIndex] = { ...currentPage, components: updatedComponents };
                  setCurrentFunnel(prev => ({ ...prev, pages: updatedPages }));
                  
                  toast({
                    title: "✅ Input adicionado!",
                    description: "Novo campo de entrada criado.",
                  });
                }}
              >
                <Type className="h-3 w-3 mr-2" />
                Input
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* COLUNA 3: CANVAS - Flex restante */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-4">
          {/* Header do Canvas */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {currentPageIndex + 1} de {currentFunnel.pages.length}
              </Badge>
              <span className="font-medium text-sm">
                {currentPage?.title || "Nenhuma página"}
              </span>
              <Badge variant="secondary" className="text-xs">
                {currentPage?.type || ""}
              </Badge>
            </div>

            {/* Preview Controls */}
            <div className="flex gap-1">
              <Button
                variant={deviceView === "mobile" ? "default" : "outline"}
                size="sm"
                onClick={() => setDeviceView("mobile")}
                className="h-8 w-8 p-0"
              >
                <Smartphone className="h-3 w-3" />
              </Button>
              <Button
                variant={deviceView === "tablet" ? "default" : "outline"}
                size="sm"
                onClick={() => setDeviceView("tablet")}
                className="h-8 w-8 p-0"
              >
                <Tablet className="h-3 w-3" />
              </Button>
              <Button
                variant={deviceView === "desktop" ? "default" : "outline"}
                size="sm"
                onClick={() => setDeviceView("desktop")}
                className="h-8 w-8 p-0"
              >
                <Monitor className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className={`quiz-preview min-h-[600px] p-8 ${
              deviceView === "mobile" ? "max-w-sm mx-auto" :
              deviceView === "tablet" ? "max-w-2xl mx-auto" :
              "max-w-4xl mx-auto"
            }`}>
              {currentPage ? (
                <div className="space-y-4">
                  {currentPage.components.map(component => renderComponent(component))}
                  
                  {currentPage.components.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <p className="mb-4">Esta página está vazia</p>
                      <p className="text-sm">
                        Selecione uma etapa do funil ou adicione componentes para começar
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p className="mb-4">Nenhuma página selecionada</p>
                  <p className="text-sm">
                    Selecione uma etapa do funil para começar a editar
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* COLUNA 4: PROPRIEDADES - 300px */}
      <div className="w-[300px] min-w-[300px] border-l bg-amber-50 overflow-hidden flex flex-col">
        <div className="p-3 border-b bg-amber-100">
          <h2 className="text-sm font-semibold mb-1 flex items-center gap-2">
            ⚙️ PROPRIEDADES
          </h2>
          <p className="text-xs text-muted-foreground">
            {selectedComponent
              ? `Editando: ${
                  currentPage?.components?.find((c) => c.id === selectedComponent)
                    ?.type || "componente"
                }`
              : "Selecione um componente para editar"}
          </p>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-3">
            {selectedComponent ? (
              renderPropertiesPanel()
            ) : (
              <div className="text-center text-muted-foreground mt-8">
                <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">
                  Clique em um componente no canvas para editá-lo
                </p>
              </div>
            )}

            {/* Configurações da Página */}
            {currentPage && (
              <Card className="mt-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    Configurações da Página
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs">Título da Página</Label>
                    <Input
                      value={currentPage.title}
                      onChange={(e) => {
                        const updatedPages = [...currentFunnel.pages];
                        updatedPages[currentPageIndex] = { ...currentPage, title: e.target.value };
                        setCurrentFunnel(prev => ({ ...prev, pages: updatedPages }));
                      }}
                      className="h-8 text-sm"
                    />
                  </div>

                  <div>
                    <Label className="text-xs">Progresso (%)</Label>
                    <Input
                      type="number"
                      value={currentPage.progress}
                      onChange={(e) => {
                        const updatedPages = [...currentFunnel.pages];
                        updatedPages[currentPageIndex] = { 
                          ...currentPage, 
                          progress: parseInt(e.target.value) || 0 
                        };
                        setCurrentFunnel(prev => ({ ...prev, pages: updatedPages }));
                      }}
                      min="0"
                      max="100"
                      className="h-8 text-sm"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={currentPage?.showHeader || false}
                      onCheckedChange={(checked) => {
                        const updatedPages = [...currentFunnel.pages];
                        updatedPages[currentPageIndex] = { ...currentPage, showHeader: checked };
                        setCurrentFunnel(prev => ({ ...prev, pages: updatedPages }));
                      }}
                    />
                    <Label className="text-xs">Mostrar Header</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={currentPage?.showProgress || false}
                      onCheckedChange={(checked) => {
                        const updatedPages = [...currentFunnel.pages];
                        updatedPages[currentPageIndex] = { ...currentPage, showProgress: checked };
                        setCurrentFunnel(prev => ({ ...prev, pages: updatedPages }));
                      }}
                    />
                    <Label className="text-xs">Mostrar Progresso</Label>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navegação entre páginas */}
            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Navegação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={goToPreviousPage}
                    disabled={currentPageIndex === 0}
                    className="h-8 w-8 p-0"
                  >
                    <ArrowLeft className="h-3 w-3" />
                  </Button>
                  <span className="text-xs text-muted-foreground flex-1 text-center">
                    {currentPageIndex + 1} de {currentFunnel.pages.length}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={goToNextPage}
                    disabled={currentPageIndex === currentFunnel.pages.length - 1}
                    className="h-8 w-8 p-0"
                  >
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={addNewPage}
                  className="w-full justify-start"
                >
                  <Plus className="h-3 w-3 mr-2" />
                  Nova Página
                </Button>
              </CardContent>
            </Card>

            {/* Ações Rápidas */}
            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    // Implementar exportação
                    toast({
                      title: "📥 Exportando...",
                      description: "Funcionalidade em desenvolvimento.",
                    });
                  }}
                  className="w-full justify-start"
                >
                  <Download className="h-3 w-3 mr-2" />
                  Exportar Funil
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    // Implementar preview
                    toast({
                      title: "👁️ Preview",
                      description: "Funcionalidade em desenvolvimento.",
                    });
                  }}
                  className="w-full justify-start"
                >
                  <Eye className="h-3 w-3 mr-2" />
                  Preview Funil
                </Button>

                <Button
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    // Implementar salvamento
                    toast({
                      title: "💾 Salvando...",
                      description: "Funcionalidade em desenvolvimento.",
                    });
                  }}
                >
                  <Save className="h-3 w-3 mr-2" />
                  Salvar Funil
                </Button>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
      
      <Toaster />
    </div>
  );
};

export default SimpleDragDropEditor;
