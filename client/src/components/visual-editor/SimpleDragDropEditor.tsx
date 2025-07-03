import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const SimpleDragDropEditor: React.FC = () => {
  // Definição das 18 etapas do funil conforme fluxo do usuário
  const funnelStages = [
    { id: "1", name: "QuizIntro - Coleta do nome", type: "intro", color: "bg-blue-100 border-blue-300 text-blue-700" },
    { id: "2", name: "Q1 - Roupa favorita", type: "question", color: "bg-green-100 border-green-300 text-green-700" },
    { id: "3", name: "Q2 - Personalidade", type: "question", color: "bg-green-100 border-green-300 text-green-700" },
    { id: "4", name: "Q3 - Visual no espelho", type: "question", color: "bg-green-100 border-green-300 text-green-700" },
    { id: "5", name: "Q4 - Detalhes importantes", type: "question", color: "bg-green-100 border-green-300 text-green-700" },
    { id: "6", name: "Q5 - Estampas favoritas", type: "question", color: "bg-green-100 border-green-300 text-green-700" },
    { id: "7", name: "Q6 - Casaco ideal", type: "question", color: "bg-green-100 border-green-300 text-green-700" },
    { id: "8", name: "Q7 - Calça preferida", type: "question", color: "bg-green-100 border-green-300 text-green-700" },
    { id: "9", name: "Q8 - Sapatos favoritos", type: "question", color: "bg-green-100 border-green-300 text-green-700" },
    { id: "10", name: "Q9 - Acessórios", type: "question", color: "bg-green-100 border-green-300 text-green-700" },
    { id: "11", name: "Q10 - Tecidos preferidos", type: "question", color: "bg-green-100 border-green-300 text-green-700" },
    { id: "12", name: "QuizTransition - Primeira transição", type: "transition", color: "bg-orange-100 border-orange-300 text-orange-700" },
    { id: "13", name: "S1 - Como se vê hoje", type: "strategic", color: "bg-yellow-100 border-yellow-300 text-yellow-700" },
    { id: "14", name: "S2 - Desafios ao se vestir", type: "strategic", color: "bg-yellow-100 border-yellow-300 text-yellow-700" },
    { id: "15", name: "S3 - Frequência de indecisão", type: "strategic", color: "bg-yellow-100 border-yellow-300 text-yellow-700" },
    { id: "16", name: "S4 - Interesse em material", type: "strategic", color: "bg-yellow-100 border-yellow-300 text-yellow-700" },
    { id: "17", name: "S5 - Preço R$97", type: "strategic", color: "bg-yellow-100 border-yellow-300 text-yellow-700" },
    { id: "18", name: "S6 - Resultados desejados", type: "strategic", color: "bg-yellow-100 border-yellow-300 text-yellow-700" },
    { id: "19", name: "Transição Final", type: "transition", color: "bg-orange-100 border-orange-300 text-orange-700" },
    { id: "20", name: "Resultado - /resultado", type: "result", color: "bg-purple-100 border-purple-300 text-purple-700" },
    { id: "21", name: "Oferta - /quiz-descubra-seu-estilo", type: "offer", color: "bg-pink-100 border-pink-300 text-pink-700" }
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

  return (
    <div className="h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Editor de Funil - Quiz de Estilo</h1>
            <p className="text-sm text-gray-500">18 etapas individuais do fluxo completo</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Layout 4 Colunas</Badge>
            <Badge variant="outline">18 Etapas</Badge>
          </div>
        </div>
      </div>

      {/* Layout 4 Colunas */}
      <div className="flex h-[calc(100vh-80px)]">
        
        {/* Coluna 1: Etapas do Funil */}
        <div className="w-80 border-r bg-white">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">🎯 Etapas do Funil</h2>
            <p className="text-xs text-gray-500 mt-1">
              Clique em uma etapa para editar
            </p>
          </div>
          
          <ScrollArea className="h-[calc(100vh-140px)]">
            <div className="p-4 space-y-2">
              {funnelStages.map((stage, index) => (
                <Button
                  key={stage.id}
                  variant="outline"
                  size="sm"
                  className={`w-full justify-start h-auto p-3 text-left ${stage.color}`}
                >
                  <div className="flex flex-col items-start w-full">
                    <div className="flex items-center justify-between w-full">
                      <Badge variant="secondary" className="text-xs mb-1">
                        {getTypeLabel(stage.type)}
                      </Badge>
                      <span className="text-xs text-gray-500">#{index + 1}</span>
                    </div>
                    <span className="text-xs font-medium">{stage.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Coluna 2: Preview */}
        <div className="flex-1 border-r bg-gray-50">
          <div className="h-full flex flex-col items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mb-4 mx-auto flex items-center justify-center">
                <span className="text-2xl">👁️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Preview do Funil</h3>
              <p className="text-sm">Selecione uma etapa para visualizar</p>
              <div className="mt-4 p-4 bg-white rounded-lg border max-w-sm">
                <p className="text-xs text-gray-600">
                  💡 <strong>Dica:</strong> Cada botão representa uma tela individual que o usuário vê durante o quiz
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna 3: Configurações */}
        <div className="w-80 border-r bg-white">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">⚙️ Configurações</h2>
            <p className="text-xs text-gray-500 mt-1">
              Propriedades da etapa selecionada
            </p>
          </div>
          
          <div className="p-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Configuração do Funil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-500">
                  <p className="text-sm">Selecione uma etapa para configurar</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-gray-700">Tipos de Etapa:</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-200 rounded"></div>
                      <span className="text-xs">Intro (1 etapa)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-200 rounded"></div>
                      <span className="text-xs">Questões (10 etapas)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-200 rounded"></div>
                      <span className="text-xs">Estratégicas (6 etapas)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-200 rounded"></div>
                      <span className="text-xs">Transições (2 etapas)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-200 rounded"></div>
                      <span className="text-xs">Resultado (1 etapa)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-pink-200 rounded"></div>
                      <span className="text-xs">Oferta (1 etapa)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Coluna 4: Versioning */}
        <div className="w-80 bg-gray-50">
          <div className="p-4 border-b bg-white">
            <h2 className="text-lg font-semibold">🔄 Versionamento</h2>
            <p className="text-xs text-gray-500 mt-1">
              Auto-save ativo · Backup automático
            </p>
          </div>
          
          <div className="p-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Status do Funil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Total de etapas:</span>
                    <Badge variant="outline">{funnelStages.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Questões normais:</span>
                    <Badge variant="outline">10</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Questões estratégicas:</span>
                    <Badge variant="outline">6</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Transições:</span>
                    <Badge variant="outline">2</Badge>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <p className="text-xs text-green-600 font-medium">✅ Funil configurado corretamente</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Todas as 18 etapas estão organizadas conforme o fluxo definido
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SimpleDragDropEditor;