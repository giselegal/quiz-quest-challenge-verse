import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Play,
  Eye,
  Save,
  Download,
  Upload,
  Settings,
  Smartphone,
  Monitor,
  Tablet,
  Plus,
  Trash2,
  Edit3,
  Copy,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Zap,
  Layout,
  Type,
  Image,
  Video,
  MousePointer,
  BarChart3,
  Gift,
  CreditCard,
  MessageSquare,
  Star,
  Users,
  TrendingUp,
  Clock,
  Check,
} from "lucide-react";

// Interfaces dos tipos
interface QuizPage {
  id: string;
  title: string;
  type: "intro" | "question" | "transition" | "loading" | "result" | "offer";
  progress: number;
  showHeader: boolean;
  showProgress: boolean;
  components: QuizComponent[];
}

interface QuizComponent {
  id: string;
  type: string;
  content: any;
  style?: Record<string, any>;
  data?: Record<string, any>;
}

interface QuizFunnel {
  id: string;
  name: string;
  pages: QuizPage[];
  settings?: {
    theme?: string;
    colors?: Record<string, string>;
    fonts?: Record<string, string>;
  };
  variants?: QuizVariant[];
}

interface QuizVariant {
  id: string;
  name: string;
  description: string;
  trafficPercent: number;
  isActive: boolean;
  pages: QuizPage[];
  settings?: {
    theme?: string;
    colors?: Record<string, string>;
    fonts?: Record<string, string>;
  };
}

// Categorias de componentes melhor organizadas
const COMPONENT_CATEGORIES = {
  structure: {
    title: "🏗️ ESTRUTURA",
    color: "blue",
    components: [
      { type: "heading", name: "Título", icon: Type, description: "Cabeçalhos H1-H6" },
      { type: "paragraph", name: "Parágrafo", icon: Type, description: "Texto descritivo" },
      { type: "separator", name: "Separador", icon: Layout, description: "Linha divisória" },
      { type: "spacer", name: "Espaçador", icon: Layout, description: "Espaço em branco" },
    ]
  },
  media: {
    title: "🎨 MÍDIA",
    color: "purple",
    components: [
      { type: "image", name: "Imagem", icon: Image, description: "Fotos e ilustrações" },
      { type: "video", name: "Vídeo", icon: Video, description: "Vídeos do YouTube/Vimeo" },
      { type: "gallery", name: "Galeria", icon: Image, description: "Múltiplas imagens" },
    ]
  },
  quiz: {
    title: "❓ QUIZ",
    color: "green",
    components: [
      { type: "question", name: "Pergunta", icon: MessageSquare, description: "Pergunta do quiz" },
      { type: "progress", name: "Progresso", icon: BarChart3, description: "Barra de progresso" },
      { type: "timer", name: "Cronômetro", icon: Clock, description: "Contador de tempo" },
      { type: "score", name: "Pontuação", icon: Star, description: "Sistema de pontos" },
    ]
  },
  interaction: {
    title: "🔘 INTERAÇÃO",
    color: "orange",
    components: [
      { type: "button", name: "Botão", icon: MousePointer, description: "Botão de ação" },
      { type: "form", name: "Formulário", icon: Edit3, description: "Campos de entrada" },
      { type: "rating", name: "Avaliação", icon: Star, description: "Sistema de estrelas" },
      { type: "poll", name: "Enquete", icon: BarChart3, description: "Votação rápida" },
    ]
  },
  sales: {
    title: "💰 VENDAS",
    color: "emerald",
    components: [
      { type: "price", name: "Preço", icon: CreditCard, description: "Exibição de preços" },
      { type: "offer", name: "Oferta", icon: Gift, description: "Promoção especial" },
      { type: "testimonial", name: "Depoimento", icon: Users, description: "Prova social" },
      { type: "guarantee", name: "Garantia", icon: Check, description: "Selo de garantia" },
      { type: "urgency", name: "Urgência", icon: Zap, description: "Escassez/tempo" },
      { type: "benefits", name: "Benefícios", icon: TrendingUp, description: "Lista de vantagens" },
    ]
  }
};

// Página tipos com templates
const PAGE_TEMPLATES = {
  intro: {
    name: "Página Inicial",
    description: "Apresentação do quiz",
    icon: Play,
    defaultComponents: ["heading", "paragraph", "button"]
  },
  question: {
    name: "Pergunta",
    description: "Questão do quiz",
    icon: MessageSquare,
    defaultComponents: ["question", "progress"]
  },
  transition: {
    name: "Transição",
    description: "Entre seções",
    icon: ArrowRight,
    defaultComponents: ["heading", "paragraph"]
  },
  loading: {
    name: "Carregando",
    description: "Processando resultado",
    icon: RotateCcw,
    defaultComponents: ["heading", "loading"]
  },
  result: {
    name: "Resultado",
    description: "Exibir resultado",
    icon: Star,
    defaultComponents: ["heading", "paragraph", "image"]
  },
  offer: {
    name: "Oferta",
    description: "Página de vendas",
    icon: Gift,
    defaultComponents: ["heading", "price", "offer", "button"]
  }
};

export default function ImprovedQuizEditor() {
  const { toast } = useToast();
  
  // Estados principais
  const [currentFunnel, setCurrentFunnel] = useState<QuizFunnel>({
    id: "quiz-funnel",
    name: "Funil de Quiz - Estilo Pessoal",
    pages: [
      {
        id: "intro",
        title: "Introdução",
        type: "intro",
        progress: 0,
        showHeader: true,
        showProgress: false,
        components: [
          {
            id: "intro-title",
            type: "heading",
            content: { text: "Descubra Seu Estilo Pessoal", level: 1 }
          }
        ]
      }
    ],
    variants: [
      {
        id: "variant-a",
        name: "Variante A (Original)",
        description: "Versão padrão do funil",
        trafficPercent: 50,
        isActive: true,
        pages: [
          {
            id: "intro-a",
            title: "Introdução - Variante A",
            type: "intro",
            progress: 0,
            showHeader: true,
            showProgress: false,
            components: [
              {
                id: "intro-title-a",
                type: "heading",
                content: { text: "Descubra Seu Estilo Pessoal", level: 1 }
              }
            ]
          }
        ]
      },
      {
        id: "variant-b",
        name: "Variante B (Teste)",
        description: "Versão alternativa para teste A/B",
        trafficPercent: 50,
        isActive: true,
        pages: [
          {
            id: "intro-b",
            title: "Introdução - Variante B",
            type: "intro",
            progress: 0,
            showHeader: true,
            showProgress: false,
            components: [
              {
                id: "intro-title-b",
                type: "heading",
                content: { text: "Qual é o Seu Estilo Único?", level: 1 }
              }
            ]
          }
        ]
      }
    ]
  });

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState("pages");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [isAbTestMode, setIsAbTestMode] = useState(false);

  // Determinar as páginas atuais baseado no modo A/B test
  const getCurrentPages = () => {
    if (isAbTestMode && selectedVariant) {
      const variant = currentFunnel.variants?.find(v => v.id === selectedVariant);
      return variant?.pages || currentFunnel.pages;
    }
    return currentFunnel.pages;
  };

  const currentPages = getCurrentPages();
  const currentPage = currentPages[currentPageIndex];

  // Funções de manipulação
  const addNewPage = useCallback((type: QuizPage["type"]) => {
    const template = PAGE_TEMPLATES[type];
    const newPage: QuizPage = {
      id: `page-${Date.now()}`,
      title: template.name,
      type,
      progress: (currentFunnel.pages.length / 10) * 100,
      showHeader: true,
      showProgress: type !== "intro" && type !== "loading",
      components: []
    };

    setCurrentFunnel(prev => ({
      ...prev,
      pages: [...prev.pages, newPage]
    }));

    setCurrentPageIndex(currentFunnel.pages.length);
    
    toast({
      title: "Página adicionada",
      description: `Nova página ${template.name} criada com sucesso.`,
    });
  }, [currentFunnel.pages.length, toast]);

  const duplicatePage = useCallback((pageIndex: number) => {
    const pageToClone = currentFunnel.pages[pageIndex];
    const clonedPage = {
      ...pageToClone,
      id: `page-${Date.now()}`,
      title: `${pageToClone.title} (Cópia)`,
      components: pageToClone.components.map(comp => ({
        ...comp,
        id: `${comp.id}-copy-${Date.now()}`
      }))
    };

    setCurrentFunnel(prev => ({
      ...prev,
      pages: [...prev.pages.slice(0, pageIndex + 1), clonedPage, ...prev.pages.slice(pageIndex + 1)]
    }));

    toast({
      title: "Página duplicada",
      description: "Página copiada com sucesso.",
    });
  }, [currentFunnel.pages, toast]);

  const deletePage = useCallback((pageIndex: number) => {
    if (currentFunnel.pages.length <= 1) {
      toast({
        title: "Erro",
        description: "Não é possível excluir a última página.",
        variant: "destructive",
      });
      return;
    }

    setCurrentFunnel(prev => ({
      ...prev,
      pages: prev.pages.filter((_, index) => index !== pageIndex)
    }));

    if (currentPageIndex >= pageIndex && currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }

    toast({
      title: "Página excluída",
      description: "Página removida com sucesso.",
    });
  }, [currentFunnel.pages.length, currentPageIndex, toast]);

  const addComponent = useCallback((componentType: string) => {
    const newComponent: QuizComponent = {
      id: `comp-${Date.now()}`,
      type: componentType,
      content: getDefaultContent(componentType),
      style: {},
      data: {}
    };

    if (isAbTestMode && selectedVariant) {
      // Adicionar componente à variante selecionada
      setCurrentFunnel(prev => ({
        ...prev,
        variants: prev.variants?.map(variant => 
          variant.id === selectedVariant
            ? {
                ...variant,
                pages: variant.pages.map((page, index) => 
                  index === currentPageIndex 
                    ? { ...page, components: [...page.components, newComponent] }
                    : page
                )
              }
            : variant
        )
      }));
    } else {
      // Adicionar componente ao funil principal
      setCurrentFunnel(prev => ({
        ...prev,
        pages: prev.pages.map((page, index) => 
          index === currentPageIndex 
            ? { ...page, components: [...page.components, newComponent] }
            : page
        )
      }));
    }

    setSelectedComponent(newComponent.id);

    toast({
      title: "Componente adicionado",
      description: `${componentType} adicionado à página.`,
    });
  }, [currentPageIndex, isAbTestMode, selectedVariant, toast]);

  // Funções para gerenciar variantes A/B
  const createNewVariant = useCallback(() => {
    const newVariant: QuizVariant = {
      id: `variant-${Date.now()}`,
      name: `Variante ${String.fromCharCode(65 + (currentFunnel.variants?.length || 0))}`,
      description: "Nova variante para teste A/B",
      trafficPercent: 50,
      isActive: true,
      pages: [...currentFunnel.pages] // Clonar páginas do funil principal
    };

    setCurrentFunnel(prev => ({
      ...prev,
      variants: [...(prev.variants || []), newVariant]
    }));

    setSelectedVariant(newVariant.id);

    toast({
      title: "Variante criada",
      description: `Nova variante ${newVariant.name} criada com sucesso.`,
    });
  }, [currentFunnel.pages, currentFunnel.variants, toast]);

  const deleteVariant = useCallback((variantId: string) => {
    setCurrentFunnel(prev => ({
      ...prev,
      variants: prev.variants?.filter(v => v.id !== variantId)
    }));

    if (selectedVariant === variantId) {
      setSelectedVariant(null);
      setIsAbTestMode(false);
    }

    toast({
      title: "Variante excluída",
      description: "Variante removida com sucesso.",
    });
  }, [selectedVariant, toast]);

  const toggleAbTestMode = useCallback(() => {
    setIsAbTestMode(!isAbTestMode);
    if (!isAbTestMode && currentFunnel.variants && currentFunnel.variants.length > 0) {
      setSelectedVariant(currentFunnel.variants[0].id);
    } else {
      setSelectedVariant(null);
    }
    setCurrentPageIndex(0); // Resetar para primeira página
  }, [isAbTestMode, currentFunnel.variants]);

  // Função para obter conteúdo padrão por tipo de componente
  function getDefaultContent(type: string) {
    const defaults: Record<string, any> = {
      heading: { text: "Novo Título", level: 2 },
      paragraph: { text: "Novo parágrafo de texto." },
      button: { text: "Clique aqui", action: "next" },
      image: { src: "", alt: "Imagem" },
      question: { 
        text: "Nova pergunta?", 
        options: [
          { id: "opt1", text: "Opção 1" },
          { id: "opt2", text: "Opção 2" }
        ]
      },
      price: { amount: "97", currency: "R$", period: "único" },
      offer: { title: "Oferta Especial", discount: "50%" }
    };
    return defaults[type] || { text: "Novo componente" };
  }

  const saveFunnel = useCallback(() => {
    localStorage.setItem("improved-quiz-funnel", JSON.stringify(currentFunnel));
    toast({
      title: "Funil salvo",
      description: "Suas alterações foram salvas com sucesso.",
    });
  }, [currentFunnel, toast]);

  const loadFunnel = useCallback(() => {
    try {
      const saved = localStorage.getItem("improved-quiz-funnel");
      if (saved) {
        setCurrentFunnel(JSON.parse(saved));
        setCurrentPageIndex(0);
        toast({
          title: "Funil carregado",
          description: "Dados carregados do armazenamento local.",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao carregar",
        description: "Não foi possível carregar os dados salvos.",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Carregar dados salvos ao inicializar
  useEffect(() => {
    loadFunnel();
  }, [loadFunnel]);

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      saveFunnel();
    }, 2000);
    return () => clearTimeout(timer);
  }, [currentFunnel, saveFunnel]);

  const deviceStyles = {
    desktop: "w-full max-w-none",
    tablet: "w-[768px] mx-auto",
    mobile: "w-[375px] mx-auto"
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      
      {/* Header da aplicação */}
      <div className="border-b bg-white">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-[#432818]">Editor de Quiz</h1>
            <Badge variant="secondary">{currentFunnel.name}</Badge>
          </div>
          
          <div className="flex items-center gap-2">
            {/* A/B Test Controls */}
            <div className="flex items-center gap-2 border rounded-lg p-2">
              <Button
                variant={isAbTestMode ? "default" : "outline"}
                size="sm"
                onClick={toggleAbTestMode}
                className="h-8"
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                Teste A/B
              </Button>
              
              {isAbTestMode && (
                <>
                  <Select value={selectedVariant || ""} onValueChange={setSelectedVariant}>
                    <SelectTrigger className="w-40 h-8">
                      <SelectValue placeholder="Selecionar variante" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentFunnel.variants?.map((variant) => (
                        <SelectItem key={variant.id} value={variant.id}>
                          {variant.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={createNewVariant}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* Controles de visualização */}
            <div className="flex gap-1 border rounded-lg p-1">
              <Button
                variant={deviceView === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => setDeviceView("desktop")}
                className="h-8 w-8 p-0"
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={deviceView === "tablet" ? "default" : "ghost"}
                size="sm"
                onClick={() => setDeviceView("tablet")}
                className="h-8 w-8 p-0"
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={deviceView === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setDeviceView("mobile")}
                className="h-8 w-8 p-0"
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6" />

            <Button
              variant={isPreviewMode ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {isPreviewMode ? "Editar" : "Preview"}
            </Button>

            <Button variant="outline" size="sm" onClick={saveFunnel}>
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Configurações
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Configurações do Funil</SheetTitle>
                  <SheetDescription>
                    Personalize as configurações gerais do seu funil de quiz.
                  </SheetDescription>
                </SheetHeader>
                {/* Conteúdo das configurações aqui */}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Layout principal */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar esquerda */}
        {!isPreviewMode && (
          <div className="w-80 border-r bg-white overflow-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="pages">Páginas</TabsTrigger>
                <TabsTrigger value="components">Componentes</TabsTrigger>
                <TabsTrigger value="abtest">A/B Test</TabsTrigger>
                <TabsTrigger value="settings">Config</TabsTrigger>
              </TabsList>

              {/* Aba de Páginas */}
              <TabsContent value="pages" className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Estrutura do Funil</h3>
                    {isAbTestMode && selectedVariant && (
                      <p className="text-xs text-muted-foreground">
                        Editando: {currentFunnel.variants?.find(v => v.id === selectedVariant)?.name}
                      </p>
                    )}
                  </div>
                  <Select onValueChange={(type) => addNewPage(type as QuizPage["type"])}>
                    <SelectTrigger className="w-32">
                      <Plus className="h-4 w-4" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(PAGE_TEMPLATES).map(([type, template]) => (
                        <SelectItem key={type} value={type}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <ScrollArea className="h-[calc(100vh-200px)]">
                  <div className="space-y-2">
                    {currentPages.map((page, index) => (
                      <Card 
                        key={page.id} 
                        className={`cursor-pointer transition-colors ${
                          index === currentPageIndex ? "ring-2 ring-blue-500" : ""
                        }`}
                        onClick={() => setCurrentPageIndex(index)}
                      >
                        <CardHeader className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {PAGE_TEMPLATES[page.type]?.name || page.type}
                              </Badge>
                              <span className="font-medium text-sm">{page.title}</span>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  duplicatePage(index);
                                }}
                                className="h-6 w-6 p-0"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deletePage(index);
                                }}
                                className="h-6 w-6 p-0"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {page.components.length} componente(s)
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Aba de A/B Test */}
              <TabsContent value="abtest" className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Testes A/B</h3>
                  <Button variant="outline" size="sm" onClick={createNewVariant}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Variante
                  </Button>
                </div>

                <ScrollArea className="h-[calc(100vh-200px)]">
                  <div className="space-y-3">
                    {currentFunnel.variants?.map((variant) => (
                      <Card 
                        key={variant.id} 
                        className={`cursor-pointer transition-colors ${
                          selectedVariant === variant.id ? "ring-2 ring-blue-500" : ""
                        }`}
                        onClick={() => {
                          setSelectedVariant(variant.id);
                          setIsAbTestMode(true);
                          setCurrentPageIndex(0);
                        }}
                      >
                        <CardHeader className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={variant.isActive ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {variant.isActive ? "Ativo" : "Inativo"}
                              </Badge>
                              <span className="font-medium text-sm">{variant.name}</span>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Toggle active status
                                  setCurrentFunnel(prev => ({
                                    ...prev,
                                    variants: prev.variants?.map(v => 
                                      v.id === variant.id 
                                        ? { ...v, isActive: !v.isActive }
                                        : v
                                    )
                                  }));
                                }}
                                className="h-6 w-6 p-0"
                                title={variant.isActive ? "Desativar" : "Ativar"}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteVariant(variant.id);
                                }}
                                className="h-6 w-6 p-0"
                                title="Excluir variante"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {variant.description}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              {variant.pages.length} página(s)
                            </span>
                            <span className="text-xs font-medium">
                              {variant.trafficPercent}% do tráfego
                            </span>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                    
                    {(!currentFunnel.variants || currentFunnel.variants.length === 0) && (
                      <div className="text-center py-8 text-gray-500">
                        <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-sm font-medium mb-2">Nenhuma variante criada</p>
                        <p className="text-xs">Crie variantes para testar diferentes versões do seu funil</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Aba de Componentes */}
              <TabsContent value="components" className="p-4 space-y-4">
                <h3 className="font-semibold">Adicionar Componentes</h3>
                
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <div className="space-y-4">
                    {Object.entries(COMPONENT_CATEGORIES).map(([categoryKey, category]) => (
                      <div key={categoryKey}>
                        <h4 className="text-sm font-medium mb-2 text-gray-700">
                          {category.title}
                        </h4>
                        <div className="space-y-2">
                          {category.components.map((component) => {
                            const Icon = component.icon;
                            return (
                              <Button
                                key={component.type}
                                variant="outline"
                                className="w-full justify-start h-auto p-3"
                                onClick={() => addComponent(component.type)}
                              >
                                <div className="flex items-center gap-3">
                                  <Icon className="h-4 w-4" />
                                  <div className="text-left">
                                    <div className="font-medium text-sm">{component.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {component.description}
                                    </div>
                                  </div>
                                </div>
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Aba de Propriedades */}
              <TabsContent value="settings" className="p-4 space-y-4">
                <h3 className="font-semibold">Propriedades</h3>
                
                {selectedComponent ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Editando: {selectedComponent}
                    </p>
                    {/* Aqui viriam os controles de propriedades do componente selecionado */}
                    <div className="text-center text-sm text-muted-foreground">
                      Controles de propriedades em desenvolvimento
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-sm text-muted-foreground">
                    Selecione um componente para editar suas propriedades
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Área principal - Canvas */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6">
            {/* Navegação entre páginas */}
            {!isPreviewMode && (
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 1))}
                    disabled={currentPageIndex === 0}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Anterior
                  </Button>
                  
                  <Badge variant="outline" className="px-3 py-1">
                    Página {currentPageIndex + 1} de {currentPages.length}
                  </Badge>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPageIndex(Math.min(currentPages.length - 1, currentPageIndex + 1))}
                    disabled={currentPageIndex === currentPages.length - 1}
                  >
                    Próxima
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{currentPage?.type}</Badge>
                  <span className="font-medium">{currentPage?.title}</span>
                  {isAbTestMode && selectedVariant && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {currentFunnel.variants?.find(v => v.id === selectedVariant)?.name}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Canvas da página */}
            <div className={`bg-white rounded-lg shadow-sm border ${deviceStyles[deviceView]}`}>
              <div className="p-6 min-h-[600px]">
                {currentPage?.showProgress && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Progresso</span>
                      <span className="text-sm font-medium">{currentPage.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all" 
                        style={{ width: `${currentPage.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {currentPage?.components.length === 0 ? (
                  <div className="text-center py-20 text-gray-500">
                    <Layout className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">Página vazia</p>
                    <p className="text-sm">Adicione componentes usando o painel lateral</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentPage?.components.map((component) => (
                      <div
                        key={component.id}
                        className={`border-2 border-dashed border-transparent p-2 rounded-lg transition-colors ${
                          selectedComponent === component.id ? "border-blue-500 bg-blue-50" : ""
                        } ${!isPreviewMode ? "hover:border-gray-300 cursor-pointer" : ""}`}
                        onClick={() => !isPreviewMode && setSelectedComponent(component.id)}
                      >
                        <ComponentRenderer component={component} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente para renderizar diferentes tipos de componentes
function ComponentRenderer({ component }: { component: QuizComponent }) {
  switch (component.type) {
    case "heading":
      const HeadingTag = `h${component.content.level || 2}` as keyof JSX.IntrinsicElements;
      return (
        <HeadingTag className="font-bold text-gray-900">
          {component.content.text || "Título"}
        </HeadingTag>
      );
    
    case "paragraph":
      return (
        <p className="text-gray-700 leading-relaxed">
          {component.content.text || "Parágrafo de texto."}
        </p>
      );
    
    case "button":
      return (
        <Button className="w-full sm:w-auto">
          {component.content.text || "Botão"}
        </Button>
      );
    
    case "question":
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {component.content.text || "Pergunta do quiz?"}
          </h3>
          <div className="space-y-2">
            {(component.content.options || []).map((option: any) => (
              <Button
                key={option.id}
                variant="outline"
                className="w-full justify-start"
              >
                {option.text}
              </Button>
            ))}
          </div>
        </div>
      );
    
    case "price":
      return (
        <div className="text-center p-4 border rounded-lg">
          <div className="text-3xl font-bold text-green-600">
            {component.content.currency || "R$"} {component.content.amount || "97"}
          </div>
          {component.content.period && (
            <div className="text-sm text-gray-600">{component.content.period}</div>
          )}
        </div>
      );
    
    case "offer":
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-lg font-semibold text-yellow-800">
            {component.content.title || "Oferta Especial"}
          </div>
          {component.content.discount && (
            <div className="text-2xl font-bold text-red-600">
              {component.content.discount} OFF
            </div>
          )}
        </div>
      );
    
    default:
      return (
        <div className="border border-gray-300 border-dashed rounded-lg p-4 text-center text-gray-500">
          Componente: {component.type}
        </div>
      );
  }
}