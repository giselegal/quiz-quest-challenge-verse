import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import {
  Play, Settings, Eye, Download, Upload, Copy, 
  Globe, BarChart3, Target, MessageSquare, Clock,
  Plus, Trash2, Move
} from 'lucide-react';

// Tipos necessários
interface QuizConfig {
  domain: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  pixel: {
    facebookPixelId: string;
    googleAnalyticsId: string;
  };
}

interface SimpleComponent {
  id: string;
  type: "title" | "subtitle" | "text" | "image" | "button" | "spacer" | "input" | "options";
  data: {
    text?: string;
    src?: string;
    alt?: string;
    placeholder?: string;
    options?: QuizOption[];
  };
  style: {
    fontSize?: string;
    fontWeight?: string;
    textAlign?: "left" | "center" | "right";
    color?: string;
    backgroundColor?: string;
    padding?: string;
    margin?: string;
  };
}

interface QuizOption {
  id: string;
  text: string;
  image?: string;
  value: string;
}

interface SimplePage {
  id: string;
  title: string;
  type: "intro" | "question" | "loading" | "result" | "offer";
  progress: number;
  showHeader: boolean;
  showProgress: boolean;
  components: SimpleComponent[];
}

interface QuizFunnel {
  id: string;
  name: string;
  pages: SimplePage[];
}

const SimpleDragDropEditor: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"editor" | "config">("editor");
  const [activeConfigSection, setActiveConfigSection] = useState<"domain" | "seo" | "pixel">("domain");
  const [selectedPageId, setSelectedPageId] = useState<string>("");
  const [selectedComponentId, setSelectedComponentId] = useState<string>("");

  // Quiz Config padrão
  const [quizConfig, setQuizConfig] = useState<QuizConfig>({
    domain: "https://seudominio.com.br",
    seo: {
      title: "Quiz: Descubra Seu Estilo Pessoal",
      description: "Descubra seu estilo pessoal único com nosso quiz personalizado...",
      keywords: "quiz estilo, moda feminina, consultoria"
    },
    pixel: {
      facebookPixelId: "1311550759901086",
      googleAnalyticsId: "G-XXXXXXXXXX"
    }
  });

  // Funil de exemplo
  const [currentFunnel, setCurrentFunnel] = useState<QuizFunnel>({
    id: "quiz-funnel-1",
    name: "Quiz: Descubra Seu Estilo",
    pages: []
  });

  // Etapas funcionais pré-configuradas
  const functionalSteps = [
    {
      id: "quiz-intro",
      title: "1. Página Inicial",
      description: "Introdução do quiz com captura de nome",
      type: "intro" as const,
      route: "/quiz",
      components: [
        {
          id: "intro-title",
          type: "title" as const,
          data: { text: "Descubra Seu Estilo Pessoal" },
          style: { fontSize: "32px", textAlign: "center" as const, color: "#1a1a1a" }
        },
        {
          id: "intro-subtitle", 
          type: "subtitle" as const,
          data: { text: "Um quiz personalizado para descobrir seu estilo único" },
          style: { fontSize: "18px", textAlign: "center" as const, color: "#666" }
        },
        {
          id: "name-input",
          type: "input" as const,
          data: { placeholder: "Digite seu nome", text: "Nome" },
          style: { textAlign: "center" as const }
        },
        {
          id: "start-button",
          type: "button" as const,
          data: { text: "Começar Quiz" },
          style: { backgroundColor: "#3b82f6", color: "#fff", textAlign: "center" as const }
        }
      ]
    },
    {
      id: "style-question",
      title: "2. Questão Estilo",
      description: "Pergunta sobre preferências de roupa",
      type: "question" as const,
      route: "/quiz?q=1",
      components: [
        {
          id: "question-title",
          type: "title" as const,
          data: { text: "QUAL O SEU TIPO DE ROUPA FAVORITA?" },
          style: { fontSize: "24px", textAlign: "center" as const, color: "#1a1a1a" }
        },
        {
          id: "question-options",
          type: "options" as const,
          data: {
            options: [
              { id: "opt1", text: "Conforto, leveza e praticidade no vestir", value: "natural" },
              { id: "opt2", text: "Discrição, caimento clássico e sobriedade", value: "classico" },
              { id: "opt3", text: "Praticidade com um toque de estilo atual", value: "contemporaneo" }
            ]
          },
          style: { textAlign: "center" as const }
        }
      ]
    },
    {
      id: "loading-transition",
      title: "3. Carregamento",
      description: "Página de transição com loading",
      type: "loading" as const,
      route: "/quiz-loading",
      components: [
        {
          id: "loading-text",
          type: "text" as const,
          data: { text: "Analisando suas respostas..." },
          style: { fontSize: "20px", textAlign: "center" as const, color: "#666" }
        }
      ]
    },
    {
      id: "quiz-result",
      title: "4. Resultado",
      description: "Página de resultado do quiz",
      type: "result" as const,
      route: "/resultado",
      components: [
        {
          id: "result-title",
          type: "title" as const,
          data: { text: "Seu Estilo Pessoal" },
          style: { fontSize: "28px", textAlign: "center" as const, color: "#1a1a1a" }
        },
        {
          id: "result-description",
          type: "text" as const,
          data: { text: "Baseado nas suas respostas, identificamos seu estilo único!" },
          style: { fontSize: "16px", textAlign: "center" as const, color: "#666" }
        }
      ]
    },
    {
      id: "offer-page",
      title: "5. Oferta",
      description: "Página de venda do produto",
      type: "offer" as const,
      route: "/quiz-descubra-seu-estilo",
      components: [
        {
          id: "offer-title",
          type: "title" as const,
          data: { text: "Transforme Seu Estilo Hoje!" },
          style: { fontSize: "28px", textAlign: "center" as const, color: "#1a1a1a" }
        },
        {
          id: "offer-button",
          type: "button" as const,
          data: { text: "Quero Minha Consultoria - R$ 97" },
          style: { backgroundColor: "#10b981", color: "#fff", textAlign: "center" as const }
        }
      ]
    }
  ];

  const updateQuizConfig = useCallback((updates: Partial<QuizConfig>) => {
    setQuizConfig(prev => ({ ...prev, ...updates }));
    // Auto-save
    try {
      localStorage.setItem('quiz-config', JSON.stringify({ ...quizConfig, ...updates }));
    } catch (error) {
      console.error('Erro ao salvar configuração:', error);
    }
  }, [quizConfig]);

  const updateConfig = useCallback((section: keyof QuizConfig, updates: any) => {
    setQuizConfig(prev => ({
      ...prev,
      [section]: { ...prev[section], ...updates }
    }));
  }, []);

  const addStepToFunnel = useCallback((step: typeof functionalSteps[0]) => {
    const newPage: SimplePage = {
      id: step.id,
      title: step.title,
      type: step.type,
      progress: (currentFunnel.pages.length + 1) * 20,
      showHeader: true,
      showProgress: true,
      components: step.components
    };

    setCurrentFunnel(prev => ({
      ...prev,
      pages: [...prev.pages, newPage]
    }));

    setSelectedPageId(newPage.id);
    toast({
      title: "Etapa adicionada",
      description: `${step.title} foi adicionada ao funil`,
    });
  }, [currentFunnel.pages.length, toast]);

  const removePageFromFunnel = useCallback((pageId: string) => {
    setCurrentFunnel(prev => ({
      ...prev,
      pages: prev.pages.filter(page => page.id !== pageId)
    }));
    if (selectedPageId === pageId) {
      setSelectedPageId("");
    }
    toast({
      title: "Etapa removida",
      description: "A etapa foi removida do funil",
    });
  }, [selectedPageId, toast]);

  const selectedPage = currentFunnel.pages.find(page => page.id === selectedPageId);
  const selectedComponent = selectedPage?.components.find(comp => comp.id === selectedComponentId);

  // Load config do localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('quiz-config');
      if (saved) {
        setQuizConfig(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Erro ao carregar configuração:', error);
    }
  }, []);

  const configSections = [
    { id: "domain", label: "Domínio", icon: Globe },
    { id: "seo", label: "SEO", icon: BarChart3 },
    { id: "pixel", label: "Pixels", icon: Target }
  ];

  return (
    <div className="h-screen flex bg-gray-50">
      {/* COLUNA 1: ETAPAS DO FUNIL - 180px */}
      <div className="w-[180px] min-w-[180px] border-r border-gray-200 bg-gray-900 text-white overflow-hidden flex flex-col">
        <div className="p-3 border-b border-gray-700">
          <button className="w-full mb-3 px-3 py-2 text-xs bg-gray-700 hover:bg-gray-600 rounded flex items-center gap-2">
            <Plus className="h-3 w-3" />
            Adicionar Etapa
          </button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {currentFunnel.pages.map((page, index) => (
              <div
                key={page.id}
                className={`p-2 rounded cursor-pointer transition-colors text-xs flex items-center gap-2 ${
                  selectedPageId === page.id
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700 text-gray-300"
                }`}
                onClick={() => setSelectedPageId(page.id)}
              >
                <div className="w-4 h-4 bg-gray-600 rounded-sm flex items-center justify-center text-xs">
                  {index + 1}
                </div>
                <span className="truncate">Etapa {index + 1}</span>
              </div>
            ))}
            
            {/* Etapas disponíveis para adicionar */}
            {functionalSteps.map((step, index) => {
              const isAdded = currentFunnel.pages.some(p => p.id === step.id);
              if (isAdded) return null;
              
              return (
                <div
                  key={`available-${step.id}-${index}`}
                  className="p-2 rounded cursor-pointer transition-colors text-xs flex items-center gap-2 hover:bg-gray-700 text-gray-400 border border-gray-700 border-dashed"
                  onClick={() => addStepToFunnel(step)}
                >
                  <div className="w-4 h-4 bg-gray-700 rounded-sm flex items-center justify-center text-xs">
                    +
                  </div>
                  <span className="truncate">{step.title}</span>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* COLUNA 2: COMPONENTES/FERRAMENTAS - 200px */}
      <div className="w-[200px] min-w-[200px] border-r border-gray-200 bg-white overflow-hidden flex flex-col">
        <div className="p-3 border-b border-gray-200 bg-gray-50">
          <div className="flex gap-1 mb-3">
            <button
              onClick={() => setActiveTab("editor")}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                activeTab === "editor"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab("config")}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                activeTab === "config"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Config
            </button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-2">
          {activeTab === "editor" ? (
            <div className="space-y-2">
              {/* Componentes como no CaktoQuiz */}
              {[
                { icon: "⚠️", name: "Alerta", type: "alert" },
                { icon: "📝", name: "Argumentos", type: "text" },
                { icon: "🔊", name: "Áudio", type: "audio" },
                { icon: "🔘", name: "Botão", type: "button" },
                { icon: "⏳", name: "Carregando", type: "loading" },
                { icon: "🎠", name: "Carrossel", type: "carousel" },
                { icon: "🏷️", name: "Cartesiano", type: "cartesian" },
                { icon: "🔗", name: "Comparar", type: "compare", badge: "Novo" },
                { icon: "📞", name: "Contati", type: "contact", badge: "Novo" },
                { icon: "📊", name: "Depoimentos", type: "testimonial" },
                { icon: "📄", name: "Entrada", type: "input" },
                { icon: "🎯", name: "Espaçador", type: "spacer" },
                { icon: "❓", name: "FAQ", type: "faq", badge: "Novo" },
                { icon: "📊", name: "Gráficos", type: "chart" },
                { icon: "🖼️", name: "Imagem", type: "image" },
                { icon: "📋", name: "Lista", type: "list", badge: "Novo" },
                { icon: "🏷️", name: "Marquise", type: "marquee", badge: "Novo" },
                { icon: "📏", name: "Nível", type: "level" }
              ].map((component) => (
                <div
                  key={component.type}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer text-xs border border-gray-200"
                >
                  <span className="text-sm">{component.icon}</span>
                  <span className="flex-1">{component.name}</span>
                  {component.badge && (
                    <span className="px-1 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                      {component.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                {configSections.map((section) => (
                  <Button
                    key={section.id}
                    onClick={() => setActiveConfigSection(section.id as any)}
                    size="sm"
                    variant={activeConfigSection === section.id ? "default" : "outline"}
                    className="w-full justify-start text-xs"
                  >
                    <section.icon className="h-3 w-3 mr-1" />
                    {section.label}
                  </Button>
                ))}
              </div>

              {/* Configuração de Domínio */}
              {activeConfigSection === "domain" && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Configuração de Domínio
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-xs">Domínio Principal</Label>
                      <Input
                        value={quizConfig.domain}
                        onChange={(e) => updateQuizConfig({ domain: e.target.value })}
                        placeholder="https://seudominio.com.br"
                        className="h-8 text-sm"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Domínio onde o quiz será publicado
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Configuração de SEO */}
              {activeConfigSection === "seo" && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Configurações de SEO
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-xs">Título da Página</Label>
                      <Input
                        value={quizConfig.seo.title}
                        onChange={(e) => updateConfig("seo", { title: e.target.value })}
                        placeholder="Quiz: Descubra Seu Estilo Pessoal"
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Descrição Meta</Label>
                      <Textarea
                        value={quizConfig.seo.description}
                        onChange={(e) => updateConfig("seo", { description: e.target.value })}
                        placeholder="Descubra seu estilo pessoal único com nosso quiz personalizado..."
                        className="text-sm resize-none"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Palavras-chave</Label>
                      <Input
                        value={quizConfig.seo.keywords}
                        onChange={(e) => updateConfig("seo", { keywords: e.target.value })}
                        placeholder="quiz estilo, moda feminina, consultoria"
                        className="h-8 text-sm"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Configuração de Pixels */}
              {activeConfigSection === "pixel" && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Pixels e Tracking
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-xs">Facebook Pixel ID</Label>
                      <Input
                        value={quizConfig.pixel.facebookPixelId}
                        onChange={(e) => updateConfig("pixel", { facebookPixelId: e.target.value })}
                        placeholder="1234567890123456"
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Google Analytics ID</Label>
                      <Input
                        value={quizConfig.pixel.googleAnalyticsId}
                        onChange={(e) => updateConfig("pixel", { googleAnalyticsId: e.target.value })}
                        placeholder="G-XXXXXXXXXX"
                        className="h-8 text-sm"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* COLUNA 3: CANVAS PRINCIPAL */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Header do Canvas - similar ao CaktoQuiz */}
        <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-gray-900 text-white">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <button className="w-3 h-3 bg-red-500 rounded-full"></button>
                <button className="w-3 h-3 bg-yellow-500 rounded-full"></button>
                <button className="w-3 h-3 bg-green-500 rounded-full"></button>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4" />
              <span className="text-gray-300">Construtor</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-300">Fluxo</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-300">Design</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-300">Leads</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-300">Configurações</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="text-xs bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
              Salvar
            </Button>
            <Button size="sm" className="text-xs bg-green-600 hover:bg-green-700">
              Publicar
            </Button>
          </div>
        </div>

        {/* Canvas Area - Simulando o mobile preview como no CaktoQuiz */}
        <div className="flex-1 p-8 overflow-auto">
          {selectedPage ? (
            <div className="max-w-sm mx-auto">
              {/* Simulador de celular */}
              <div className="bg-gray-800 rounded-[2rem] p-2 shadow-2xl">
                <div className="bg-white rounded-[1.5rem] overflow-hidden h-[600px]">
                  {/* Status bar */}
                  <div className="bg-gray-900 text-white text-xs px-4 py-1 flex justify-between items-center">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-2 bg-white rounded-sm"></div>
                      <div className="w-1 h-2 bg-white rounded-sm"></div>
                      <div className="w-6 h-2 bg-white rounded-sm"></div>
                    </div>
                  </div>
                  
                  {/* Header da página */}
                  <div className="bg-orange-400 h-1"></div>
                  
                  {/* Conteúdo da página */}
                  <div className="p-6 space-y-4 h-full overflow-auto">
                    <div className="text-center">
                      <img 
                        src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/11_hqmr8l.webp" 
                        alt="Mulheres com diferentes estilos"
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                      <h1 className="text-xl font-bold mb-2">Teste de Estilo Pessoal</h1>
                    </div>
                    
                    {selectedPage.components.map((component, index) => (
                      <div
                        key={component.id}
                        className={`p-2 rounded cursor-pointer transition-colors ${
                          selectedComponentId === component.id
                            ? "ring-2 ring-blue-400 bg-blue-50"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedComponentId(component.id)}
                      >
                        {component.type === "title" && (
                          <h1 
                            className="font-bold"
                            style={{
                              fontSize: component.style.fontSize,
                              textAlign: component.style.textAlign,
                              color: component.style.color
                            }}
                          >
                            {component.data.text}
                          </h1>
                        )}
                        
                        {component.type === "subtitle" && (
                          <h2 
                            className="font-medium text-gray-600"
                            style={{
                              fontSize: component.style.fontSize,
                              textAlign: component.style.textAlign,
                              color: component.style.color
                            }}
                          >
                            {component.data.text}
                          </h2>
                        )}
                        
                        {component.type === "input" && (
                          <div>
                            <Label className="text-sm font-medium">{component.data.text}</Label>
                            <Input 
                              placeholder={component.data.placeholder}
                              className="mt-2"
                            />
                          </div>
                        )}
                        
                        {component.type === "button" && (
                          <Button 
                            className="w-full"
                            style={{
                              backgroundColor: component.style.backgroundColor,
                              color: component.style.color
                            }}
                          >
                            {component.data.text}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center">
              <div className="text-gray-500">
                <div className="text-lg font-medium mb-2">Selecione uma etapa para editar</div>
                <div className="text-sm">
                  Clique em uma etapa na primeira coluna à esquerda
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* COLUNA 4: PROPRIEDADES - 280px */}
      <div className="w-[280px] min-w-[280px] border-l border-gray-200 bg-white">
        <div className="p-3 border-b border-gray-200 bg-gray-50">
          <div className="text-xs font-medium text-gray-700 mb-2">Título da Etapa</div>
          <div className="text-sm font-medium">
            {selectedPage ? selectedPage.title : "Etapa 1"}
          </div>
        </div>
        
        <div className="p-3 border-b border-gray-200">
          <div className="text-xs font-medium text-gray-700 mb-2">Nome da Etapa</div>
          <Input 
            value={selectedPage ? selectedPage.title : "Etapa 1"} 
            className="h-8 text-sm"
            onChange={(e) => {
              if (selectedPage) {
                const updatedPages = currentFunnel.pages.map(page => {
                  if (page.id === selectedPageId) {
                    return { ...page, title: e.target.value };
                  }
                  return page;
                });
                setCurrentFunnel(prev => ({ ...prev, pages: updatedPages }));
              }
            }}
          />
        </div>
        
        <div className="p-3 border-b border-gray-200">
          <div className="text-xs font-medium text-gray-700 mb-3">Header</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs">Mostrar Logo</span>
              <button className="w-10 h-6 bg-green-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs">Mostrar Progresso</span>
              <button className="w-10 h-6 bg-green-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs">Permitir Voltar</span>
              <button className="w-10 h-6 bg-green-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
              </button>
            </div>
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100vh-57px)] p-4">
          {selectedComponent ? (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    Editando: {selectedComponent.type}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedComponent.data.text !== undefined && (
                    <div>
                      <Label className="text-xs">Texto</Label>
                      <Textarea
                        value={selectedComponent.data.text}
                        onChange={(e) => {
                          const updatedPages = currentFunnel.pages.map(page => {
                            if (page.id === selectedPageId) {
                              return {
                                ...page,
                                components: page.components.map(comp => {
                                  if (comp.id === selectedComponentId) {
                                    return {
                                      ...comp,
                                      data: { ...comp.data, text: e.target.value }
                                    };
                                  }
                                  return comp;
                                })
                              };
                            }
                            return page;
                          });
                          setCurrentFunnel(prev => ({ ...prev, pages: updatedPages }));
                        }}
                        className="text-sm resize-none"
                        rows={3}
                      />
                    </div>
                  )}
                  
                  <div>
                    <Label className="text-xs">Cor do Texto</Label>
                    <Input
                      type="color"
                      value={selectedComponent.style.color || "#000000"}
                      onChange={(e) => {
                        const updatedPages = currentFunnel.pages.map(page => {
                          if (page.id === selectedPageId) {
                            return {
                              ...page,
                              components: page.components.map(comp => {
                                if (comp.id === selectedComponentId) {
                                  return {
                                    ...comp,
                                    style: { ...comp.style, color: e.target.value }
                                  };
                                }
                                return comp;
                              })
                            };
                          }
                          return page;
                        });
                        setCurrentFunnel(prev => ({ ...prev, pages: updatedPages }));
                      }}
                      className="h-8"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-xs">Tamanho da Fonte</Label>
                    <Input
                      value={selectedComponent.style.fontSize || "16px"}
                      onChange={(e) => {
                        const updatedPages = currentFunnel.pages.map(page => {
                          if (page.id === selectedPageId) {
                            return {
                              ...page,
                              components: page.components.map(comp => {
                                if (comp.id === selectedComponentId) {
                                  return {
                                    ...comp,
                                    style: { ...comp.style, fontSize: e.target.value }
                                  };
                                }
                                return comp;
                              })
                            };
                          }
                          return page;
                        });
                        setCurrentFunnel(prev => ({ ...prev, pages: updatedPages }));
                      }}
                      placeholder="16px"
                      className="h-8 text-sm"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : selectedPage ? (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    Página: {selectedPage.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs">Título da Página</Label>
                    <Input
                      value={selectedPage.title}
                      onChange={(e) => {
                        const updatedPages = currentFunnel.pages.map(page => {
                          if (page.id === selectedPageId) {
                            return { ...page, title: e.target.value };
                          }
                          return page;
                        });
                        setCurrentFunnel(prev => ({ ...prev, pages: updatedPages }));
                      }}
                      className="h-8 text-sm"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-xs">Progresso (%)</Label>
                    <Input
                      type="number"
                      value={selectedPage.progress}
                      onChange={(e) => {
                        const updatedPages = currentFunnel.pages.map(page => {
                          if (page.id === selectedPageId) {
                            return { ...page, progress: parseInt(e.target.value) || 0 };
                          }
                          return page;
                        });
                        setCurrentFunnel(prev => ({ ...prev, pages: updatedPages }));
                      }}
                      className="h-8 text-sm"
                      min="0"
                      max="100"
                    />
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    <div>Tipo: {selectedPage.type}</div>
                    <div>Componentes: {selectedPage.components.length}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-8">
              <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <div className="text-sm">
                Clique em um componente no canvas para editá-lo
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
      
      <Toaster />
    </div>
  );
};

export default SimpleDragDropEditor;