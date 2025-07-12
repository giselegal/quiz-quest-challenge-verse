import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

/**
 * FLUXO COMPLETO - ETAPAS REAIS DO QUIZ DE ESTILO PESSOAL
 * Mapeamento exato do funcionamento em /quiz com todas as questões e transições
 */
const REAL_FUNNEL_STEPS = [
  {
    id: "quiz-intro",
    title: "1. QuizIntro",
    description: "Coleta do nome do usuário - Página inicial",
    component: "QuizIntro",
    route: "/quiz",
    progress: 0,
    state: "showIntro: true",
    editableElements: [
      "Título: Descubra Seu Estilo Pessoal",
      "Subtítulo: Chega de guarda-roupa lotado...", 
      "Placeholder: Digite seu nome aqui...",
      "Botão: COMEÇAR AGORA",
      "Imagem Principal",
      "Logo"
    ]
  },
  {
    id: "quiz-questions-1-10",
    title: "2. 10 Questões Normais",
    description: "QuizContent - Questões principais com pontuação",
    component: "QuizContent", 
    route: "/quiz",
    progress: 60,
    state: "currentQuestionIndex: 0-9, showingStrategicQuestions: false",
    editableElements: [
      "Q1: Tipo de roupa favorita (both, 3 seleções)",
      "Q2: Personalidade (text, 3 seleções)", 
      "Q3: Visual que se identifica (both, 3 seleções)",
      "Q4: Detalhes que gosta (text, 3 seleções)",
      "Q5: Estampas favoritas (both, 3 seleções)",
      "Q6: Casaco favorito (both, 3 seleções)",
      "Q7: Calça favorita (both, 3 seleções)",
      "Q8: Sapatos preferidos (both, 3 seleções)",
      "Q9: Tipo de acessórios (text, 3 seleções)",
      "Q10: Escolha de tecidos (both, 3 seleções)"
    ]
  },
  {
    id: "main-transition",
    title: "3. QuizTransition",
    description: "Transição: 'Enquanto calculamos o seu resultado...'",
    component: "MainTransition",
    route: "/quiz", 
    progress: 65,
    state: "showingTransition: true",
    editableElements: [
      "Título: Enquanto calculamos o seu resultado...",
      "Texto: Queremos te fazer algumas perguntas...",
      "Destaque: experiência ainda mais completa",
      "Call to Action: Continuar",
      "Styling e cores"
    ]
  },
  {
    id: "strategic-question-1",
    title: "4. Questão Estratégica 1",
    description: "Q12: Como você se vê hoje?",
    component: "QuizContent",
    route: "/quiz",
    progress: 70,
    state: "showingStrategicQuestions: true, currentStrategicQuestionIndex: 0",
    editableElements: [
      "Título: Como você se vê hoje?",
      "Subtítulo: Quando você se olha no espelho...",
      "Opção 1: Me sinto desconectada da mulher que sou hoje",
      "Opção 2: Tenho dúvidas sobre o que realmente me valoriza",
      "Opção 3: Às vezes acerto, às vezes erro",
      "Opção 4: Me sinto segura, mas sei que posso evoluir"
    ]
  },
  {
    id: "strategic-questions-2-6", 
    title: "5. Questões Estratégicas 2-6",
    description: "Q13-Q17: Segmentação e qualificação",
    component: "QuizContent",
    route: "/quiz",
    progress: 85,
    state: "showingStrategicQuestions: true, currentStrategicQuestionIndex: 1-5",
    editableElements: [
      "Q13: O que mais te desafia na hora de se vestir?",
      "Q14: Frequência do 'Com que roupa eu vou?'",
      "Q15: Gastou com roupas que não usa + interesse no material",
      "Q16: Investimento R$ 97,00 - consideraria?",
      "Q17: Qual resultado gostaria de alcançar?"
    ]
  },
  {
    id: "final-transition", 
    title: "6. Transição Final",
    description: "Mensagem: 'Obrigada por compartilhar...'",
    component: "QuizTransitionManager",
    route: "/quiz",
    progress: 95,
    state: "showingFinalTransition: true",
    editableElements: [
      "Mensagem: Obrigada por compartilhar...",
      "Loading: Calculando seu resultado personalizado",
      "Animação de carregamento",
      "Tempo de redirecionamento"
    ]
  },
  {
    id: "result-page-test-a",
    title: "7A. Resultado - Teste A",
    description: "ResultPage - /resultado (Página de resultado personalizada)",
    component: "ResultPage", 
    route: "/resultado",
    progress: 100,
    state: "quiz completed, showing results, abTest: A",
    editableElements: [
      "Título do estilo identificado",
      "Descrição personalizada do estilo",
      "Seção de oferta dos Guias R$ 97,00",
      "Depoimentos e prova social",
      "Garantia e bônus",
      "Call to Action principal",
      "Seção de urgência/escassez"
    ]
  },
  {
    id: "result-page-test-b",
    title: "7B. Resultado - Teste B", 
    description: "QuizDescubraSeuEstilo - /quiz-descubra-seu-estilo (Landing alternativa)",
    component: "QuizDescubraSeuEstilo",
    route: "/quiz-descubra-seu-estilo", 
    progress: 100,
    state: "alternative funnel, abTest: B",
    editableElements: [
      "Hero: Descubra Seu Estilo Pessoal",
      "Benefícios dos Guias de Estilo",
      "Prova social e depoimentos",
      "Detalhes da oferta R$ 97,00",
      "Garantia e bônus especiais",
      "CTA: Quero Descobrir Meu Estilo",
      "Seção de FAQ"
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
          {/* Header do Fluxo */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-200">
            <h3 className="text-xs font-bold text-blue-800 mb-1">
              🎯 FLUXO COMPLETO - QUIZ DE ESTILO PESSOAL
            </h3>
            <p className="text-xs text-blue-600">
              8 etapas | 10 questões normais + 6 estratégicas | Teste A/B no resultado
            </p>
          </div>
          
          {REAL_FUNNEL_STEPS.map((step, index) => {
            // Definir cores por seção
            const getSectionColor = (stepId: string) => {
              if (stepId.includes('intro')) return { bg: 'bg-green-50', border: 'border-green-300', badge: 'bg-green-600' };
              if (stepId.includes('questions-1-10')) return { bg: 'bg-blue-50', border: 'border-blue-300', badge: 'bg-blue-600' };
              if (stepId.includes('main-transition')) return { bg: 'bg-yellow-50', border: 'border-yellow-300', badge: 'bg-yellow-600' };
              if (stepId.includes('strategic')) return { bg: 'bg-purple-50', border: 'border-purple-300', badge: 'bg-purple-600' };
              if (stepId.includes('final-transition')) return { bg: 'bg-orange-50', border: 'border-orange-300', badge: 'bg-orange-600' };
              if (stepId.includes('result')) return { bg: 'bg-red-50', border: 'border-red-300', badge: 'bg-red-600' };
              return { bg: 'bg-gray-50', border: 'border-gray-300', badge: 'bg-gray-600' };
            };
            
            const colors = getSectionColor(step.id);
            
            return (
              <Card 
                key={step.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedStepId === step.id 
                    ? `border-blue-500 ${colors.bg}` 
                    : `${colors.border} hover:border-gray-400 ${colors.bg}`
                }`}
                onClick={() => onStepSelect?.(step)}
              >
                <CardHeader className="p-3 pb-2">
                  <div className="flex items-start justify-between">
                    <Badge 
                      className={`text-xs text-white ${colors.badge}`}
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
                      Elementos Editáveis ({step.editableElements.length}):
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {step.editableElements.slice(0, 2).map((element, idx) => (
                        <Badge 
                          key={idx}
                          variant="outline" 
                          className="text-xs px-1 py-0"
                        >
                          {element.length > 20 ? element.substring(0, 20) + '...' : element}
                        </Badge>
                      ))}
                      {step.editableElements.length > 2 && (
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          +{step.editableElements.length - 2} mais
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          {/* Botão de ação */}
          <div className="pt-2">
            <Button 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              size="sm"
            >
              📥 Carregar Fluxo Completo (8 etapas)
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default FunnelStepsColumn;
export { REAL_FUNNEL_STEPS };
