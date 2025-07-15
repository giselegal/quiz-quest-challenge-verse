import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Layout, 
  Type, 
  Image, 
  Video, 
  FileText, 
  Users, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Eye, 
  Save, 
  Sliders,
  X,
  MousePointer,
  HelpCircle,
  CheckSquare,
  BarChart,
  Timer,
  Receipt,
  Shield,
  Gift,
  Clock,
  Minus
} from "lucide-react";

// Funnel Steps Configuration - Based on real quiz structure
interface FunnelStep {
  id: string;
  title: string;
  type: "intro" | "question" | "transition" | "result" | "offer";
  isActive?: boolean;
}

const FUNNEL_STEPS: FunnelStep[] = [
  // Questões Normais do Quiz (1-10)
  { id: "intro", title: "Introdução do Quiz", type: "intro" },
  { id: "question-1", title: "Q1: Tipo de Roupa Favorita", type: "question" },
  { id: "question-2", title: "Q2: Personalidade/Humor", type: "question" },
  { id: "question-3", title: "Q3: Visual Preferido", type: "question" },
  { id: "question-4", title: "Q4: Detalhes que Valorizam", type: "question" },
  { id: "question-5", title: "Q5: Estampas/Tecidos", type: "question" },
  { id: "question-6", title: "Q6: Casaco/Outerwear", type: "question" },
  { id: "question-7", title: "Q7: Calça Favorita", type: "question" },
  { id: "question-8", title: "Q8: Sapatos/Footwear", type: "question" },
  { id: "question-9", title: "Q9: Acessórios", type: "question" },
  { id: "question-10", title: "Q10: Tecidos Preferidos", type: "question" },
  
  // Transição Estratégica
  { id: "transition-1", title: "Transição: Calculando Resultado", type: "transition" },
  
  // Questões Estratégicas (S1-S6)
  { id: "strategic-1", title: "S1: Como se vê hoje", type: "question" },
  { id: "strategic-2", title: "S2: Desafios ao se vestir", type: "question" },
  { id: "strategic-3", title: "S3: Frequência de indecisão", type: "question" },
  { id: "strategic-4", title: "S4: Interesse em material", type: "question" },
  { id: "strategic-5", title: "S5: Preço R$97", type: "question" },
  { id: "strategic-6", title: "S6: Resultados desejados", type: "question" },
  
  // Transição Final e Resultado
  { id: "transition-2", title: "Transição: Preparando Resultado", type: "transition" },
  { id: "result", title: "Página de Resultado", type: "result" },
  { id: "offer", title: "Página de Oferta R$97", type: "offer" },
];

// Component Library - Real quiz components
interface ComponentLibraryItem {
  id: string;
  label: string;
  icon: any;
  category: string;
  new?: boolean;
}

const COMPONENT_LIBRARY: ComponentLibraryItem[] = [
  // Básicos
  { id: "heading", label: "Título", icon: Type, category: "basic" },
  { id: "paragraph", label: "Parágrafo", icon: FileText, category: "basic" },
  { id: "image", label: "Imagem", icon: Image, category: "basic" },
  { id: "video", label: "Vídeo", icon: Video, category: "basic" },
  { id: "button", label: "Botão", icon: MousePointer, category: "basic" },
  { id: "divider", label: "Divisor", icon: Minus, category: "basic" },
  
  // Quiz Específico
  { id: "quiz-question", label: "Pergunta Quiz", icon: HelpCircle, category: "quiz" },
  { id: "quiz-options", label: "Opções Múltipla Escolha", icon: CheckSquare, category: "quiz" },
  { id: "quiz-progress", label: "Barra Progresso", icon: BarChart, category: "quiz" },
  { id: "quiz-result", label: "Resultado do Quiz", icon: Gift, category: "quiz", new: true },
  { id: "quiz-transition", label: "Transição do Quiz", icon: Clock, category: "quiz" },
  { id: "strategic-question", label: "Pergunta Estratégica", icon: Users, category: "quiz" },
  { id: "quiz-timer", label: "Cronômetro", icon: Timer, category: "quiz" },
  
  // Vendas
  { id: "testimonial", label: "Depoimento", icon: Users, category: "sales" },
  { id: "price-offer", label: "Oferta R$97", icon: Receipt, category: "sales" },
  { id: "guarantee", label: "Garantia", icon: Shield, category: "sales" },
  { id: "bonus", label: "Bônus", icon: Gift, category: "sales" },
  { id: "urgency", label: "Urgência", icon: Clock, category: "sales" },
];

// Component and Page Data Types
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

// Page templates for different step types
const getPageTemplate = (stepId: string, stepType: string, stepTitle: string): PageData => {
  const baseSettings = {
    layout: "Em Lista",
    direction: "Vertical",
    disposition: "Centro",
    validations: {
      multipleChoice: true,
      required: true,
      autoAdvance: false,
    },
    styling: {
      borders: "Arredondadas",
      shadows: "Suaves",
      spacing: "Médio",
      details: "Simples",
      style: "Moderno",
    },
  };

  const templates: Record<string, ComponentData[]> = {
    intro: [
      {
        id: "intro-heading",
        type: "heading",
        data: { text: "Descubra Seu Estilo Pessoal", size: "2xl" }
      },
      {
        id: "intro-text",
        type: "text",
        data: { text: "Responda às perguntas abaixo para descobrir qual estilo combina mais com você." }
      },
      {
        id: "intro-button",
        type: "button",
        data: { text: "Começar Quiz", link: "#start-quiz", style: "primary" }
      }
    ],
    question: [
      {
        id: "question-component",
        type: "quiz-question",
        data: { 
          question: stepTitle || "Qual é sua preferência?",
          options: [
            "Opção A - Estilo clássico e elegante",
            "Opção B - Estilo moderno e despojado", 
            "Opção C - Estilo romântico e delicado",
            "Opção D - Estilo criativo e único"
          ]
        }
      },
      {
        id: "question-progress",
        type: "quiz-progress",
        data: { progress: 30, current: 3, total: 10 }
      }
    ],
    transition: [
      {
        id: "transition-component",
        type: "quiz-transition",
        data: {
          title: "🕐 Enquanto calculamos o seu resultado...",
          description: "Queremos te fazer algumas perguntas que vão tornar sua experiência ainda mais completa.",
          subtitle: "💬 Responda com sinceridade. Isso é só entre você e a sua nova versão."
        }
      }
    ],
    result: [
      {
        id: "result-component",
        type: "quiz-result",
        data: {
          style: "Elegante Clássico",
          description: "Você tem um estilo sofisticado e refinado, que preza pela elegância em todas as ocasiões.",
          characteristics: ["Peças atemporais", "Cores neutras", "Cortes clássicos", "Acessórios discretos"],
          tips: ["Invista em peças de qualidade", "Prefira tecidos nobres", "Mantenha um guarda-roupa cápsula"]
        }
      }
    ],
    offer: [
      {
        id: "offer-heading",
        type: "heading",
        data: { text: "Guia Completo de Estilo - R$ 97", size: "2xl" }
      },
      {
        id: "offer-description",
        type: "text", 
        data: { text: "Transforme seu estilo com nosso guia completo personalizado para seu perfil." }
      },
      {
        id: "offer-price",
        type: "price-offer",
        data: {
          originalPrice: "R$ 197",
          currentPrice: "R$ 97",
          discount: "50% OFF",
          urgency: "Oferta válida por apenas 24 horas"
        }
      },
      {
        id: "offer-button",
        type: "button",
        data: { text: "Quero Meu Guia Agora", link: "#checkout", style: "primary" }
      }
    ]
  };

  return {
    id: stepId,
    title: stepTitle,
    components: templates[stepType] || [],
    settings: baseSettings
  };
};

// Initial page data
const INITIAL_PAGE_DATA: PageData = getPageTemplate("intro", "intro", "Introdução do Quiz");

const EnhancedSimpleDragDropEditor: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<string>("intro");
  const [currentPage, setCurrentPage] = useState<PageData>(INITIAL_PAGE_DATA);
  const [selectedComponent, setSelectedComponent] = useState<ComponentData | null>(null);
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);

  // Load page data when step changes
  useEffect(() => {
    const step = FUNNEL_STEPS.find(s => s.id === selectedStep);
    if (step) {
      const pageTemplate = getPageTemplate(step.id, step.type, step.title);
      setCurrentPage(pageTemplate);
      setSelectedComponent(null); // Clear selected component when changing pages
    }
  }, [selectedStep]);

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, componentId: string) => {
    setDraggedComponent(componentId);
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedComponent) {
      const componentTemplate = COMPONENT_LIBRARY.find(c => c.id === draggedComponent);
      if (componentTemplate) {
        const newComponent: ComponentData = {
          id: `${draggedComponent}-${Date.now()}`,
          type: draggedComponent,
          data: getDefaultComponentData(draggedComponent),
          style: getDefaultComponentStyle(draggedComponent),
        };
        
        setCurrentPage(prev => ({
          ...prev,
          components: [...prev.components, newComponent]
        }));
      }
      setDraggedComponent(null);
    }
  };

  // Component default data based on real quiz structure
  const getDefaultComponentData = (type: string) => {
    const defaults: { [key: string]: any } = {
      heading: { text: "QUAL O SEU TIPO DE ROUPA FAVORITA?", level: 1 },
      paragraph: { text: "Escolha até 3 opções que mais combinam com você:" },
      image: { src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/11_hqmr8l.webp", alt: "Estilo", width: 300, height: 200 },
      button: { text: "CONTINUAR", link: "#", style: "primary" },
      "quiz-question": { 
        question: "QUAL O SEU TIPO DE ROUPA FAVORITA?", 
        type: "multiple",
        multiSelect: 3
      },
      "quiz-options": { 
        options: [
          { text: "Conforto, leveza e praticidade no vestir.", image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/11_hqmr8l.webp" },
          { text: "Discrição, caimento clássico e sobriedade.", image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/12_edlmwf.webp" },
          { text: "Praticidade com um toque de estilo atual.", image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/4_snhaym.webp" }
        ]
      },
      testimonial: { 
        name: "Ana Silva", 
        text: "Descobri meu estilo e agora me visto com muito mais confiança!", 
        avatar: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/testimonial.webp" 
      },
      "quiz-result": {
        styleName: "Estilo Elegante",
        description: "Você tem um estilo sofisticado e refinado, que preza pela elegância em todas as ocasiões. Sua personalidade forte se reflete nas escolhas conscientes e na busca pela qualidade.",
        characteristics: ["Peças atemporais", "Cores neutras", "Cortes clássicos", "Acessórios discretos"],
        tips: ["Invista em peças de qualidade", "Prefira tecidos nobres", "Mantenha um guarda-roupa cápsula", "Escolha acessórios com parcimônia"]
      },
      "quiz-progress": {
        progress: 70,
        current: 7,
        total: 10
      },
      "quiz-transition": {
        title: "🕐 Enquanto calculamos o seu resultado...",
        description: "Queremos te fazer algumas perguntas que vão tornar sua experiência ainda mais completa. A ideia é simples: te ajudar a enxergar com mais clareza onde você está agora — e para onde pode ir com mais intenção, leveza e autenticidade.",
        subtitle: "💬 Responda com sinceridade. Isso é só entre você e a sua nova versão."
      },
      "strategic-question": {
        question: "Como você se vê hoje?",
        subtitle: "Quando você se olha no espelho, como se sente com sua imagem pessoal atualmente?",
        options: [
          "Me sinto desconectada da mulher que sou hoje",
          "Tenho dúvidas sobre o que realmente me valoriza",
          "Às vezes acerto, às vezes erro",
          "Me sinto segura, mas sei que posso evoluir"
        ]
      },
      "price-offer": { 
        price: "R$ 97", 
        old_price: "R$ 297", 
        title: "Consultoria de Estilo Completa",
        features: ["Análise personalizada", "Guia de cores", "Dicas de styling", "Suporte 30 dias"] 
      },
    };
    return defaults[type] || {};
  };

  const getDefaultComponentStyle = (type: string) => {
    return {
      margin: "16px 0",
      padding: "16px",
      backgroundColor: "transparent",
      borderRadius: "8px",
      textAlign: "center",
    };
  };

  // Component rendering - matches real quiz components
  const renderComponent = (component: ComponentData) => {
    const isSelected = selectedComponent?.id === component.id;
    
    return (
      <div
        key={component.id}
        className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
          isSelected 
            ? "border-blue-500 bg-blue-50" 
            : "border-transparent hover:border-gray-300"
        }`}
        onClick={() => setSelectedComponent(component)}
      >
        {/* Real Quiz Question Component */}
        {component.type === "quiz-question" && (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {component.data.question}
            </h2>
            <p className="text-gray-600">
              Escolha até {component.data.multiSelect} opções que mais combinam com você:
            </p>
          </div>
        )}
        
        {/* Real Quiz Options Component - Interactive Style Choices */}
        {component.type === "quiz-options" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {component.data.options.map((option: any, index: number) => (
              <div key={`${component.id}-option-${index}`} className="group border-2 border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-lg cursor-pointer transition-all duration-200 bg-white">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="absolute top-2 right-2 w-6 h-6 border-2 border-gray-300 rounded-full group-hover:border-blue-500 transition-colors"></div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{option.text}</p>
              </div>
            ))}
          </div>
        )}
        
        {/* Standard Components */}
        {component.type === "heading" && (
          <h1 className="text-3xl font-bold text-center text-gray-800">
            {component.data.text}
          </h1>
        )}
        
        {component.type === "paragraph" && (
          <p className="text-gray-700 text-center">
            {component.data.text}
          </p>
        )}
        
        {component.type === "button" && (
          <div className="text-center">
            <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
              {component.data.text}
            </Button>
          </div>
        )}
        
        {/* Quiz Result Component */}
        {component.type === "quiz-result" && (
          <div className="text-center space-y-6 bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl">
            <div className="w-24 h-24 mx-auto bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl text-white font-bold">🎯</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Seu Estilo é: {component.data.styleName}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {component.data.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">Características</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {component.data.characteristics?.map((char: string, index: number) => (
                    <li key={`${component.id}-char-${index}`}>• {char}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">Dicas de Styling</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {component.data.tips?.map((tip: string, index: number) => (
                    <li key={`${component.id}-tip-${index}`}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Price Offer Component - Enhanced for Quiz */}
        {component.type === "price-offer" && (
          <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 text-sm font-bold transform rotate-12 translate-x-4 -translate-y-2">
              OFERTA ESPECIAL
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-800 mb-2">{component.data.title}</h3>
              <p className="text-gray-600 mb-6">Descubra seu estilo completo com nossa consultoria personalizada</p>
              
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-2">DE:</div>
                <span className="text-2xl text-gray-500 line-through">{component.data.old_price}</span>
                <div className="text-sm text-gray-500 mt-1 mb-4">POR APENAS:</div>
                <span className="text-5xl font-bold text-green-600">{component.data.price}</span>
                <div className="text-sm text-gray-600 mt-2">ou 12x de R$ 9,70</div>
              </div>

              <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-4">O que você vai receber:</h4>
                <div className="space-y-3">
                  {component.data.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center text-left">
                      <CheckSquare className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-4 rounded-lg font-bold">
                QUERO DESCOBRIR MEU ESTILO COMPLETO
              </Button>
              
              <div className="flex items-center justify-center mt-4 text-sm text-gray-600">
                <Shield className="w-4 h-4 mr-2" />
                Garantia de 30 dias ou seu dinheiro de volta
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar Component */}
        {component.type === "quiz-progress" && (
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-blue-500 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${component.data.progress || 70}%` }}
            ></div>
            <div className="text-center text-sm text-gray-600 mt-2">
              Questão {component.data.current || 7} de {component.data.total || 10}
            </div>
          </div>
        )}

        {/* Quiz Transition Component */}
        {component.type === "quiz-transition" && (
          <div className="text-center space-y-6 bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-xl border border-orange-200">
            <div className="text-4xl mb-4">🕐</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{component.data.title}</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto mb-6">
              {component.data.description}
            </p>
            <p className="text-base text-gray-600 font-medium">
              {component.data.subtitle}
            </p>
          </div>
        )}

        {/* Strategic Question Component */}
        {component.type === "strategic-question" && (
          <div className="space-y-6 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">{component.data.question}</h2>
              <p className="text-gray-600 text-lg">{component.data.subtitle}</p>
            </div>
            <div className="space-y-3">
              {component.data.options.map((option: string, index: number) => (
                <div key={`${component.id}-strategic-option-${index}`} className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                    <span className="text-gray-700">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonial Component - Enhanced */}
        {component.type === "testimonial" && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-700 italic mb-3">"{component.data.text}"</p>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-800">{component.data.name}</span>
                  <div className="flex ml-2">
                    {[1,2,3,4,5].map(star => (
                      <span key={`${component.id}-star-${star}`} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Delete button */}
        {isSelected && (
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentPage(prev => ({
                ...prev,
                components: prev.components.filter(c => c.id !== component.id)
              }));
              setSelectedComponent(null);
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      {/* Painel 1: Etapas do Funil - Sidebar Compacta */}
      <div className="w-64 bg-gray-900 text-white flex flex-col border-r border-gray-800">
        <div className="p-3 border-b border-gray-800">
          <h2 className="text-lg font-bold">Etapas do Funil</h2>
          <p className="text-xs text-gray-400 mt-1">Quiz Estilo + Oferta</p>
        </div>
        
        <ScrollArea className="flex-1 p-1">
          {FUNNEL_STEPS.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center space-x-2 p-2 mb-1 rounded cursor-pointer transition-colors ${
                selectedStep === step.id 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
              onClick={() => setSelectedStep(step.id)}
            >
              <div className="flex items-center space-x-2 w-full">
                <span className="flex-shrink-0 w-5 h-5 rounded bg-gray-700 flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </span>
                <div className="text-left flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{step.title}</div>
                  <div className="text-xs text-gray-400 capitalize">{step.type}</div>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Painel 2: Biblioteca de Componentes */}
      <div className="w-60 bg-white flex flex-col border-r border-gray-300">
        <div className="p-3 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-800">Componentes</h3>
          <p className="text-xs text-gray-500">Arraste para o canvas</p>
        </div>
        
        <Tabs defaultValue="basic" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mx-2 mt-2 text-xs h-8">
            <TabsTrigger value="basic" className="text-xs py-1">Básico</TabsTrigger>
            <TabsTrigger value="quiz" className="text-xs py-1">Quiz</TabsTrigger>
            <TabsTrigger value="sales" className="text-xs py-1">Vendas</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="flex-1 p-2">
            {["basic", "quiz", "sales"].map(category => (
              <TabsContent key={category} value={category} className="mt-2 space-y-1">
                {COMPONENT_LIBRARY
                  .filter(comp => comp.category === category)
                  .map(component => (
                    <div
                      key={component.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, component.id)}
                      className="flex items-center space-x-2 p-2 bg-gray-50 hover:bg-gray-100 rounded cursor-grab active:cursor-grabbing transition-colors group border border-gray-200"
                    >
                      <component.icon className="w-4 h-4 text-gray-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-gray-800 truncate">
                          {component.label}
                        </div>
                        {component.new && (
                          <Badge className="text-xs bg-green-100 text-green-700 px-1 py-0 mt-1">
                            Novo
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))
                }
              </TabsContent>
            ))}
          </ScrollArea>
        </Tabs>
      </div>

      {/* Painel 3: Canvas Principal */}
      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-800">
              Editor de Funil - Quiz Estilo
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
          className="min-h-[600px] bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 mx-auto shadow-lg"
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
                Arraste componentes da biblioteca ao lado para construir sua página do quiz
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Ex: Pergunta + Opções + Botão Continuar
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {currentPage.components.map(renderComponent)}
            </div>
          )}
        </div>
      </div>

      {/* Painel 4: Propriedades */}
      <div className="w-80 bg-white border-l border-gray-300 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Propriedades</h3>
          <p className="text-sm text-gray-500">Configure o componente</p>
        </div>

        <ScrollArea className="flex-1 p-4">
          {selectedComponent ? (
            <div className="space-y-6">
              {/* Component Type Info */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">
                    Componente: {COMPONENT_LIBRARY.find(c => c.id === selectedComponent.type)?.label}
                  </CardTitle>
                </CardHeader>
              </Card>

              {/* Content Section */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Conteúdo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedComponent.type === "quiz-question" && (
                    <div>
                      <Label className="text-gray-300">Pergunta</Label>
                      <Textarea
                        value={selectedComponent.data.question}
                        onChange={(e) => {
                          const updatedComponent = {
                            ...selectedComponent,
                            data: { ...selectedComponent.data, question: e.target.value }
                          };
                          setSelectedComponent(updatedComponent);
                          setCurrentPage(prev => ({
                            ...prev,
                            components: prev.components.map(c => 
                              c.id === selectedComponent.id ? updatedComponent : c
                            )
                          }));
                        }}
                        className="bg-gray-700 border-gray-600 text-white"
                        rows={3}
                      />
                    </div>
                  )}
                  
                  {selectedComponent.type === "heading" && (
                    <div>
                      <Label className="text-gray-300">Texto do Título</Label>
                      <Input
                        value={selectedComponent.data.text}
                        onChange={(e) => {
                          const updatedComponent = {
                            ...selectedComponent,
                            data: { ...selectedComponent.data, text: e.target.value }
                          };
                          setSelectedComponent(updatedComponent);
                          setCurrentPage(prev => ({
                            ...prev,
                            components: prev.components.map(c => 
                              c.id === selectedComponent.id ? updatedComponent : c
                            )
                          }));
                        }}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  )}
                  
                  {selectedComponent.type === "button" && (
                    <>
                      <div>
                        <Label className="text-gray-300">Texto do Botão</Label>
                        <Input
                          value={selectedComponent.data.text}
                          onChange={(e) => {
                            const updatedComponent = {
                              ...selectedComponent,
                              data: { ...selectedComponent.data, text: e.target.value }
                            };
                            setSelectedComponent(updatedComponent);
                            setCurrentPage(prev => ({
                              ...prev,
                              components: prev.components.map(c => 
                                c.id === selectedComponent.id ? updatedComponent : c
                              )
                            }));
                          }}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300">Link/Ação</Label>
                        <Input
                          value={selectedComponent.data.link}
                          onChange={(e) => {
                            const updatedComponent = {
                              ...selectedComponent,
                              data: { ...selectedComponent.data, link: e.target.value }
                            };
                            setSelectedComponent(updatedComponent);
                            setCurrentPage(prev => ({
                              ...prev,
                              components: prev.components.map(c => 
                                c.id === selectedComponent.id ? updatedComponent : c
                              )
                            }));
                          }}
                          className="bg-gray-700 border-gray-600 text-white"
                          placeholder="Ex: #next-question"
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Layout Section */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Layout</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Disposição</Label>
                    <Select value={currentPage.settings.disposition}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Esquerda">Esquerda</SelectItem>
                        <SelectItem value="Centro">Centro</SelectItem>
                        <SelectItem value="Direita">Direita</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Sliders className="w-12 h-12 mb-4" />
              <h3 className="text-lg font-medium mb-2 text-gray-800">Selecione um componente</h3>
              <p className="text-center text-sm">
                Clique em um componente no canvas para configurar suas propriedades
              </p>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default EnhancedSimpleDragDropEditor;