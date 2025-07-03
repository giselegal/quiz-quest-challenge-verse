import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

/**
 * ETAPAS REAIS DO FUNIL MAPEADAS DO QUIZ FUNCIONANTE
 * Cada etapa corresponde exatamente ao que acontece em /quiz
 */
const REAL_FUNNEL_STEPS = [
  {
    id: "quiz-intro",
    title: "1. Página de Introdução",
    description: "QuizIntro - Coleta do nome do usuário",
    component: "QuizIntro",
    route: "/quiz",
    progress: 0,
    state: "showIntro: true",
    editableElements: [
      "Título Principal",
      "Subtítulo", 
      "Placeholder Input",
      "Texto do Botão",
      "Imagem Principal",
      "Logo"
    ]
  },
  {
    id: "quiz-questions-normal",
    title: "2. 10 Questões Normais",
    description: "QuizContent - Questões 1-10 do quiz principal",
    component: "QuizContent", 
    route: "/quiz",
    progress: 60,
    state: "showIntro: false, showingStrategicQuestions: false",
    editableElements: [
      "Título da Questão",
      "Opções de Resposta",
      "Barra de Progresso",
      "Limite de Seleções"
    ]
  },
  {
    id: "main-transition",
    title: "3. Transição Principal",
    description: "MainTransition - Enquanto calculamos o resultado...",
    component: "MainTransition",
    route: "/quiz", 
    progress: 65,
    state: "showingTransition: true",
    editableElements: [
      "Título",
      "Descrição",
      "Texto CTA",
      "Cores e Fonte"
    ]
  },
  {
    id: "strategic-questions",
    title: "4. 6 Questões Estratégicas", 
    description: "QuizContent - Questões estratégicas de segmentação",
    component: "QuizContent",
    route: "/quiz",
    progress: 85,
    state: "showingStrategicQuestions: true",
    editableElements: [
      "Título da Questão Estratégica",
      "Opções Estratégicas",
      "Progresso 70-95%"
    ]
  },
  {
    id: "final-transition", 
    title: "5. Transição Final",
    description: "QuizTransitionManager - Loading final e cálculo",
    component: "QuizTransitionManager",
    route: "/quiz",
    progress: 95,
    state: "showingFinalTransition: true",
    editableElements: [
      "Texto de Loading",
      "Animação",
      "Tempo de Redirecionamento"
    ]
  },
  {
    id: "result-page",
    title: "6. Página de Resultado",
    description: "ResultPage - Apresentação do resultado e oferta",
    component: "ResultPage", 
    route: "/resultado",
    progress: 100,
    state: "quiz completed, showing results",
    editableElements: [
      "Título do Resultado",
      "Descrição do Estilo",
      "Seção de Oferta",
      "Depoimentos",
      "Preços",
      "Call to Action"
    ]
  },
  {
    id: "alternative-landing",
    title: "7. Landing Alternativa",
    description: "QuizDescubraSeuEstilo - Página alternativa do teste A/B",
    component: "QuizDescubraSeuEstilo",
    route: "/quiz-descubra-seu-estilo", 
    progress: 100,
    state: "alternative funnel variation",
    editableElements: [
      "Seção Hero",
      "Benefícios",
      "Prova Social",
      "Detalhes da Oferta"
    ]
  }
];

interface FunnelStepsColumnProps {
  onStepSelect?: (step: typeof REAL_FUNNEL_STEPS[0]) => void;
  selectedStepId?: string;
}

const FunnelStepsColumn: React.FC<FunnelStepsColumnProps> = ({ 
  onStepSelect, 
  selectedStepId 
}) => {
  return (
    <div className="w-[280px] min-w-[280px] border-r bg-slate-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-white">
        <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          🎯 ETAPAS REAIS DO FUNIL
        </h2>
        <p className="text-xs text-gray-600 mt-1">
          Mapeadas do /quiz funcionante
        </p>
      </div>

      {/* Lista de Etapas */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-3">
          {REAL_FUNNEL_STEPS.map((step, index) => (
            <Card 
              key={step.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedStepId === step.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onStepSelect?.(step)}
            >
              <CardHeader className="p-3 pb-2">
                <div className="flex items-start justify-between">
                  <Badge 
                    variant={step.progress === 100 ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {index + 1}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {step.progress}%
                  </Badge>
                </div>
                <CardTitle className="text-sm font-semibold">
                  {step.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-3 pt-0">
                <p className="text-xs text-gray-600 mb-2">
                  {step.description}
                </p>
                
                <div className="space-y-1">
                  <div className="text-xs">
                    <span className="font-medium text-blue-600">Componente:</span> {step.component}
                  </div>
                  <div className="text-xs">
                    <span className="font-medium text-green-600">Rota:</span> {step.route}
                  </div>
                  <div className="text-xs">
                    <span className="font-medium text-orange-600">Estado:</span> {step.state}
                  </div>
                </div>
                
                <div className="mt-2">
                  <div className="text-xs font-medium text-gray-700 mb-1">
                    Elementos Editáveis:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {step.editableElements.slice(0, 3).map((element, idx) => (
                      <Badge 
                        key={idx}
                        variant="outline" 
                        className="text-xs px-1 py-0"
                      >
                        {element}
                      </Badge>
                    ))}
                    {step.editableElements.length > 3 && (
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        +{step.editableElements.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Botão de ação */}
          <div className="pt-2">
            <Button 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              size="sm"
            >
              📥 Carregar Todas as Etapas
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default FunnelStepsColumn;
export { REAL_FUNNEL_STEPS };
