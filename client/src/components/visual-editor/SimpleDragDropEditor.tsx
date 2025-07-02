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
      {/* COLUNA 1: ETAPAS DO FUNIL - 260px */}
      <div className="w-[260px] min-w-[260px] border-r border-gray-200 bg-white overflow-hidden flex flex-col shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-3">
            Etapas do Funil
          </h2>

          {/* Navegação simplificada */}
          <div className="flex border-b border-gray-200 -mx-4 mb-3">
            <button
              onClick={() => setActiveTab("editor")}
              className={`px-4 py-2 text-xs font-medium transition-colors ${
                activeTab === "editor"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab("config")}
              className={`px-4 py-2 text-xs font-medium transition-colors ${
                activeTab === "config"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Config
            </button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          {activeTab === "editor" ? (
            <div className="space-y-3">
              <div className="mb-4">
                <h3 className="text-xs font-medium text-gray-700 mb-2">ETAPAS DISPONÍVEIS</h3>
                <div className="space-y-2">
                  {functionalSteps.map((step) => (
                    <Button
                      key={step.id}
                      onClick={() => addStepToFunnel(step)}
                      size="sm"
                      variant="outline"
                      className="w-full justify-start text-xs h-auto py-2 px-3"
                    >
                      <Plus className="h-3 w-3 mr-2" />
                      <div className="text-left">
                        <div className="font-medium">{step.title}</div>
                        <div className="text-xs text-muted-foreground">{step.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {currentFunnel.pages.length > 0 && (
                <div>
                  <h3 className="text-xs font-medium text-gray-700 mb-2">PÁGINAS NO FUNIL</h3>
                  <div className="space-y-2">
                    {currentFunnel.pages.map((page, index) => (
                      <div
                        key={page.id}
                        className={`p-2 border rounded-md cursor-pointer transition-colors ${
                          selectedPageId === page.id
                            ? "border-blue-300 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedPageId(page.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="text-xs font-medium">{page.title}</div>
                            <div className="text-xs text-muted-foreground">{page.components.length} componentes</div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                removePageFromFunnel(page.id);
                              }}
                              className="h-6 w-6 p-0"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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

      {/* COLUNA 2: CANVAS PRINCIPAL */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header do Canvas */}
        <div className="h-14 border-b border-gray-200 flex items-center justify-between px-6 bg-white">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-medium text-gray-900">{currentFunnel.name}</h1>
            {selectedPage && (
              <span className="text-xs text-gray-500">• {selectedPage.title}</span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="text-xs">
              <Eye className="h-3 w-3 mr-1" />
              Preview
            </Button>
            <Button size="sm" className="text-xs">
              <Play className="h-3 w-3 mr-1" />
              Publicar
            </Button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 p-6 overflow-auto">
          {selectedPage ? (
            <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6 space-y-4">
                {selectedPage.components.map((component, index) => (
                  <div
                    key={component.id}
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                      selectedComponentId === component.id
                        ? "border-blue-300 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
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
                        className="font-medium"
                        style={{
                          fontSize: component.style.fontSize,
                          textAlign: component.style.textAlign,
                          color: component.style.color
                        }}
                      >
                        {component.data.text}
                      </h2>
                    )}
                    
                    {component.type === "text" && (
                      <p 
                        style={{
                          fontSize: component.style.fontSize,
                          textAlign: component.style.textAlign,
                          color: component.style.color
                        }}
                      >
                        {component.data.text}
                      </p>
                    )}
                    
                    {component.type === "input" && (
                      <div>
                        <Label className="text-sm">{component.data.text}</Label>
                        <Input 
                          placeholder={component.data.placeholder}
                          className="mt-1"
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
                    
                    {component.type === "options" && (
                      <div className="space-y-2">
                        {component.data.options?.map((option) => (
                          <Button
                            key={option.id}
                            variant="outline"
                            className="w-full p-4 h-auto text-left"
                          >
                            {option.text}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center">
              <div className="text-gray-500">
                <div className="text-lg font-medium mb-2">Selecione uma página para editar</div>
                <div className="text-sm">
                  Clique em uma etapa à esquerda ou adicione uma nova página ao funil
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* COLUNA 3: PROPRIEDADES - 300px */}
      <div className="w-[300px] min-w-[300px] border-l border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            Propriedades
          </h2>
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