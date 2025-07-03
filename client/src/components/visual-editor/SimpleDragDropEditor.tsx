import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings, 
  Eye, 
  Edit3, 
  Move, 
  Copy, 
  Trash2, 
  Plus,
  ChevronRight,
  Play
} from "lucide-react";

// Importar componentes do quiz para renderização no canvas
import QuizIntro from "@/components/QuizIntro";
import { QuizQuestion } from "@/components/QuizQuestion";
import QuizTransition from "@/components/QuizTransition";
import QuizResult from "@/components/QuizResult";
import QuizOfferPage from "@/components/QuizOfferPage";
import { quizQuestions } from "@/data/quizQuestions";
import { strategicQuestions } from "@/data/strategicQuestions";
import { StyleResult } from "@/types/quiz";

const SimpleDragDropEditor: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  
  // Definição das 18 etapas do funil baseadas no fluxo real
  const funnelStages = [
    { 
      id: "intro", 
      name: "QuizIntro - Coleta do nome", 
      type: "intro", 
      route: "/",
      description: "Página inicial com entrada do nome",
      color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100",
      icon: "🚀"
    },
    { 
      id: "q1", 
      name: "Q1 - Roupa favorita", 
      type: "question", 
      route: "/quiz/1",
      description: "Primeira questão: tipo de roupa favorita",
      color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
      icon: "👕"
    },
    { 
      id: "q2", 
      name: "Q2 - Personalidade", 
      type: "question", 
      route: "/quiz/2",
      description: "Como você se descreve",
      color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
      icon: "✨"
    },
    { 
      id: "q3", 
      name: "Q3 - Visual no espelho", 
      type: "question", 
      route: "/quiz/3",
      description: "Como se vê ao se olhar no espelho",
      color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
      icon: "🪞"
    },
    { 
      id: "q4", 
      name: "Q4 - Detalhes importantes", 
      type: "question", 
      route: "/quiz/4",
      description: "O que mais valoriza no look",
      color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
      icon: "💎"
    },
    { 
      id: "q5", 
      name: "Q5 - Estampas favoritas", 
      type: "question", 
      route: "/quiz/5",
      description: "Tipo de estampa preferida",
      color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
      icon: "🎨"
    },
    { 
      id: "q6", 
      name: "Q6 - Casaco ideal", 
      type: "question", 
      route: "/quiz/6",
      description: "Estilo de casaco preferido",
      color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
      icon: "🧥"
    },
    { 
      id: "q7", 
      name: "Q7 - Calça preferida", 
      type: "question", 
      route: "/quiz/7",
      description: "Tipo de calça favorita",
      color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
      icon: "👖"
    },
    { 
      id: "q8", 
      name: "Q8 - Sapatos favoritos", 
      type: "question", 
      route: "/quiz/8",
      description: "Estilo de sapato preferido",
      color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
      icon: "👠"
    },
    { 
      id: "q9", 
      name: "Q9 - Acessórios", 
      type: "question", 
      route: "/quiz/9",
      description: "Acessórios que mais usa",
      color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
      icon: "💍"
    },
    { 
      id: "q10", 
      name: "Q10 - Tecidos preferidos", 
      type: "question", 
      route: "/quiz/10",
      description: "Material de roupa favorito",
      color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
      icon: "🧵"
    },
    { 
      id: "transition1", 
      name: "QuizTransition - 1ª Transição", 
      type: "transition", 
      route: "/quiz/transition",
      description: "Transição para questões estratégicas",
      color: "bg-amber-50 border-amber-200 hover:bg-amber-100",
      icon: "⚡"
    },
    { 
      id: "s1", 
      name: "S1 - Como se vê hoje", 
      type: "strategic", 
      route: "/quiz/strategic/1",
      description: "Autopercepção atual",
      color: "bg-violet-50 border-violet-200 hover:bg-violet-100",
      icon: "🎯"
    },
    { 
      id: "s2", 
      name: "S2 - Desafios ao se vestir", 
      type: "strategic", 
      route: "/quiz/strategic/2",
      description: "Principais dificuldades",
      color: "bg-violet-50 border-violet-200 hover:bg-violet-100",
      icon: "🤔"
    },
    { 
      id: "s3", 
      name: "S3 - Frequência de indecisão", 
      type: "strategic", 
      route: "/quiz/strategic/3",
      description: "Com que frequência fica indecisa",
      color: "bg-violet-50 border-violet-200 hover:bg-violet-100",
      icon: "⏰"
    },
    { 
      id: "s4", 
      name: "S4 - Interesse em material", 
      type: "strategic", 
      route: "/quiz/strategic/4",
      description: "Interesse em guias de estilo",
      color: "bg-violet-50 border-violet-200 hover:bg-violet-100",
      icon: "📚"
    },
    { 
      id: "s5", 
      name: "S5 - Preço R$97", 
      type: "strategic", 
      route: "/quiz/strategic/5",
      description: "Validação de preço",
      color: "bg-violet-50 border-violet-200 hover:bg-violet-100",
      icon: "💰"
    },
    { 
      id: "s6", 
      name: "S6 - Resultados desejados", 
      type: "strategic", 
      route: "/quiz/strategic/6",
      description: "O que espera alcançar",
      color: "bg-violet-50 border-violet-200 hover:bg-violet-100",
      icon: "🎉"
    },
    { 
      id: "transition2", 
      name: "Transição Final", 
      type: "transition", 
      route: "/quiz/final-transition",
      description: "Preparação para resultado",
      color: "bg-amber-50 border-amber-200 hover:bg-amber-100",
      icon: "🏁"
    },
    { 
      id: "result", 
      name: "Resultado - Teste A", 
      type: "result", 
      route: "/resultado",
      description: "Página de resultado do quiz",
      color: "bg-rose-50 border-rose-200 hover:bg-rose-100",
      icon: "🎊"
    },
    { 
      id: "offer", 
      name: "Oferta - Teste B", 
      type: "offer", 
      route: "/quiz-descubra-seu-estilo",
      description: "Página de oferta/venda",
      color: "bg-pink-50 border-pink-200 hover:bg-pink-100",
      icon: "💝"
    }
  ];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "intro": return "INTRO";
      case "question": return "QUESTÃO";
      case "strategic": return "ESTRATÉGICA";
      case "transition": return "TRANSIÇÃO";
      case "result": return "RESULTADO";
      case "offer": return "OFERTA";
      default: return type.toUpperCase();
    }
  };

  const selectedStageData = selectedStage ? funnelStages.find(s => s.id === selectedStage) : null;

  // Mock data para preview dos componentes
  const mockStyleResult: StyleResult = {
    category: "Clássico" as const,
    score: 8,
    percentage: 35
  };

  // Mock question data para demonstração
  const mockQuestion = {
    id: "1",
    title: "QUAL O SEU TIPO DE ROUPA FAVORITA?",
    type: "both" as const,
    multiSelect: 3,
    options: [
      {
        id: "1a",
        text: "Conforto, leveza e praticidade no vestir.",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/11_hqmr8l.webp",
        styleCategory: "Natural" as const,
        points: 1
      },
      {
        id: "1b", 
        text: "Discrição, caimento clássico e sobriedade.",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/12_edlmwf.webp",
        styleCategory: "Clássico" as const,
        points: 1
      }
    ]
  };

  // Função para renderizar o componente correto baseado na etapa
  const renderStageComponent = (stage: any) => {
    if (!stage) return null;

    const className = "transform scale-75 origin-top";

    switch (stage.type) {
      case "intro":
        return (
          <div className={className}>
            <QuizIntro onStart={() => {}} />
          </div>
        );

      case "question":
      case "strategic":
        return (
          <div className={className}>
            <QuizQuestion 
              question={mockQuestion}
              onAnswer={() => {}}
              currentAnswers={[]}
              autoAdvance={false}
              isStrategicQuestion={stage.type === "strategic"}
            />
          </div>
        );

      case "transition":
        return (
          <div className={className}>
            <QuizTransition 
              onContinue={() => {}}
              onAnswer={() => {}}
              currentAnswers={[]}
            />
          </div>
        );

      case "result":
        return (
          <div className={className}>
            <QuizResult 
              primaryStyle={mockStyleResult}
              secondaryStyles={[]}
              previewMode={true}
            />
          </div>
        );

      case "offer":
        return (
          <div className={className}>
            <QuizOfferPage />
          </div>
        );

      default:
        return (
          <div className="p-8 text-center bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-4xl mb-4">{stage.icon}</div>
            <h3 className="text-white text-lg font-semibold mb-2">{stage.name}</h3>
            <p className="text-slate-400">{stage.description}</p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Quiz Funnel Builder</h1>
              <p className="text-sm text-slate-400">Editor visual do funil de conversão</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="outline" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Play className="w-4 h-4 mr-2" />
              Testar Funil
            </Button>
          </div>
        </div>
      </div>

      {/* Layout Principal */}
      <div className="flex h-[calc(100vh-80px)]">
        
        {/* Sidebar: Etapas do Funil */}
        <div className="w-80 border-r border-slate-700 bg-slate-800">
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Etapas do Funil</h2>
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                {funnelStages.length}
              </Badge>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Clique para editar uma etapa
            </p>
          </div>
          
          <ScrollArea className="h-[calc(100vh-140px)]">
            <div className="p-3 space-y-1">
              {funnelStages.map((stage, index) => (
                <Button
                  key={stage.id}
                  variant={selectedStage === stage.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedStage(stage.id)}
                  className={`w-full justify-start h-auto p-3 text-left transition-all duration-200 ${
                    selectedStage === stage.id 
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg" 
                      : "hover:bg-slate-700 text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-sm">
                      {stage.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <Badge 
                          variant="secondary" 
                          className="text-xs bg-slate-600 text-slate-200 border-slate-500"
                        >
                          {getTypeLabel(stage.type)}
                        </Badge>
                        <span className="text-xs text-slate-400">#{index + 1}</span>
                      </div>
                      <p className="text-xs font-medium truncate">{stage.name}</p>
                      <p className="text-xs text-slate-400 truncate">{stage.route}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 flex-shrink-0 text-slate-400" />
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Canvas Principal */}
        <div className="flex-1 bg-slate-900">
          <div className="h-full flex flex-col">
            {/* Toolbar do Canvas */}
            <div className="border-b border-slate-700 bg-slate-800 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {selectedStageData ? (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
                          {selectedStageData.icon}
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-white">{selectedStageData.name}</h3>
                          <p className="text-xs text-slate-400">{selectedStageData.description}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>
                      <h3 className="text-sm font-semibold text-white">Selecione uma etapa</h3>
                      <p className="text-xs text-slate-400">Escolha uma etapa para editar</p>
                    </div>
                  )}
                </div>
                
                {selectedStageData && (
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicar
                    </Button>
                    <Button size="sm" variant="outline" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                      <Move className="w-4 h-4 mr-2" />
                      Mover
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Canvas Content */}
            <div className="flex-1 p-6 overflow-auto bg-slate-900">
              {selectedStageData ? (
                <div className="h-full">
                  {/* Preview do componente real */}
                  <div className="bg-white rounded-lg shadow-xl mx-auto max-w-2xl h-full overflow-auto">
                    <div className="h-full">
                      {renderStageComponent(selectedStageData)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Settings className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Selecione uma etapa do funil</h3>
                    <p className="text-slate-400 max-w-sm">
                      Escolha uma das {funnelStages.length} etapas na barra lateral para visualizar o componente real.
                    </p>
                    <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-700 max-w-md mx-auto">
                      <p className="text-xs text-slate-300">
                        ✨ <strong>Preview Real:</strong> Os componentes que aparecem aqui são os mesmos que os usuários veem no quiz
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Painel de Propriedades */}
        <div className="w-80 border-l border-slate-700 bg-slate-800">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-sm font-semibold text-white">Propriedades</h2>
            <p className="text-xs text-slate-400 mt-1">
              Configurações da etapa selecionada
            </p>
          </div>
          
          <ScrollArea className="h-[calc(100vh-140px)]">
            <div className="p-4 space-y-4">
              {selectedStageData ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="stage-name" className="text-slate-300 text-xs">Nome da Etapa</Label>
                    <Input 
                      id="stage-name"
                      defaultValue={selectedStageData.name}
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="stage-description" className="text-slate-300 text-xs">Descrição</Label>
                    <Textarea 
                      id="stage-description"
                      defaultValue={selectedStageData.description}
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="stage-route" className="text-slate-300 text-xs">Rota</Label>
                    <Input 
                      id="stage-route"
                      defaultValue={selectedStageData.route}
                      className="mt-1 bg-slate-700 border-slate-600 text-white font-mono text-xs"
                    />
                  </div>
                  
                  <div className="pt-4 border-t border-slate-700">
                    <h4 className="text-xs font-semibold text-slate-300 mb-3">Ações</h4>
                    <div className="space-y-2">
                      <Button size="sm" variant="outline" className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                        <Eye className="w-4 h-4 mr-2" />
                        Visualizar
                      </Button>
                      <Button size="sm" variant="outline" className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicar
                      </Button>
                      <Button size="sm" variant="outline" className="w-full bg-red-900 border-red-700 text-red-200 hover:bg-red-800">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remover
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-slate-400">
                  <p className="text-sm">Selecione uma etapa para ver suas propriedades</p>
                </div>
              )}
              
              <div className="pt-4 border-t border-slate-700">
                <h4 className="text-xs font-semibold text-slate-300 mb-3">Estatísticas do Funil</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Total de etapas:</span>
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      {funnelStages.length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Questões normais:</span>
                    <Badge variant="outline" className="border-emerald-600 text-emerald-300">
                      10
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Questões estratégicas:</span>
                    <Badge variant="outline" className="border-violet-600 text-violet-300">
                      6
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Transições:</span>
                    <Badge variant="outline" className="border-amber-600 text-amber-300">
                      2
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default SimpleDragDropEditor;