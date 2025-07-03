import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import { StageData } from "@/interfaces/editor";

interface PropertiesPanelProps {
  selectedElement: string | null;
  selectedStageData: StageData | null;
  onElementDeselect: () => void;
  mockQuestion: any;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedElement,
  selectedStageData,
  onElementDeselect,
  mockQuestion
}) => {
  return (
    <div className="w-80 border-l border-slate-700 bg-slate-800">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-sm font-semibold text-white">Propriedades</h2>
        <p className="text-xs text-slate-400 mt-1">
          Configurações da etapa selecionada
        </p>
      </div>
      
      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="p-4 space-y-4">
          {selectedElement ? (
            <ElementProperties 
              selectedElement={selectedElement}
              onElementDeselect={onElementDeselect}
              mockQuestion={mockQuestion}
            />
          ) : selectedStageData ? (
            <StageProperties selectedStageData={selectedStageData} />
          ) : (
            <div className="text-center text-slate-400">
              <p className="text-sm">Selecione uma etapa para ver suas propriedades</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

const ElementProperties: React.FC<{
  selectedElement: string;
  onElementDeselect: () => void;
  mockQuestion: any;
}> = ({ selectedElement, onElementDeselect, mockQuestion }) => {
  return (
    <div className="space-y-4">
      <div className="bg-slate-700 p-3 rounded-lg">
        <h4 className="text-xs font-semibold text-slate-300 mb-2">Elemento Selecionado</h4>
        <p className="text-white text-sm">{selectedElement}</p>
      </div>

      {/* Campos específicos baseados no elemento selecionado */}
      {selectedElement === "intro-header" && (
        <>
          <div>
            <Label htmlFor="intro-title" className="text-slate-300 text-xs">Título Principal</Label>
            <Input 
              id="intro-title"
              defaultValue="Descubra Seu Estilo Pessoal"
              className="mt-1 bg-slate-700 border-slate-600 text-white"
            />
          </div>
          <div>
            <Label htmlFor="intro-subtitle" className="text-slate-300 text-xs">Subtítulo</Label>
            <Textarea 
              id="intro-subtitle"
              defaultValue="Um quiz personalizado para descobrir seu estilo único"
              className="mt-1 bg-slate-700 border-slate-600 text-white"
              rows={2}
            />
          </div>
        </>
      )}

      {selectedElement === "intro-form" && (
        <>
          <div>
            <Label htmlFor="input-placeholder" className="text-slate-300 text-xs">Placeholder do Input</Label>
            <Input 
              id="input-placeholder"
              defaultValue="Digite seu nome"
              className="mt-1 bg-slate-700 border-slate-600 text-white"
            />
          </div>
          <div>
            <Label htmlFor="button-text" className="text-slate-300 text-xs">Texto do Botão</Label>
            <Input 
              id="button-text"
              defaultValue="Iniciar Quiz"
              className="mt-1 bg-slate-700 border-slate-600 text-white"
            />
          </div>
        </>
      )}

      {selectedElement === "question-title" && (
        <>
          <div>
            <Label htmlFor="question-text" className="text-slate-300 text-xs">Texto da Questão</Label>
            <Textarea 
              id="question-text"
              defaultValue={mockQuestion?.title}
              className="mt-1 bg-slate-700 border-slate-600 text-white"
              rows={3}
            />
          </div>
        </>
      )}

      {selectedElement === "question-options" && (
        <>
          <div>
            <Label className="text-slate-300 text-xs">Opções de Resposta</Label>
            <div className="mt-2 space-y-2">
              {mockQuestion?.options?.map((option: any, index: number) => (
                <div key={option.id} className="bg-slate-700 p-2 rounded">
                  <Input 
                    defaultValue={option.text}
                    className="bg-slate-600 border-slate-500 text-white text-xs"
                    placeholder={`Opção ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {selectedElement === "result-header" && (
        <>
          <div>
            <Label htmlFor="result-title-template" className="text-slate-300 text-xs">Template do Título</Label>
            <Input 
              id="result-title-template"
              defaultValue="Seu Estilo é: {categoria}"
              className="mt-1 bg-slate-700 border-slate-600 text-white"
            />
          </div>
          <div>
            <Label htmlFor="result-subtitle" className="text-slate-300 text-xs">Subtítulo</Label>
            <Input 
              id="result-subtitle"
              defaultValue="Parabéns! Descobrimos seu estilo pessoal"
              className="mt-1 bg-slate-700 border-slate-600 text-white"
            />
          </div>
        </>
      )}

      <div className="pt-4 border-t border-slate-700">
        <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
          <Edit3 className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <div className="pt-2">
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
          onClick={onElementDeselect}
        >
          Cancelar Seleção
        </Button>
      </div>
    </div>
  );
};

const StageProperties: React.FC<{ selectedStageData: StageData }> = ({ selectedStageData }) => {
  return (
    <div className="space-y-4">
      <div className="text-center text-slate-400 p-4 bg-slate-700 rounded-lg">
        <p className="text-sm mb-2">👆 Clique em um elemento no canvas para editá-lo</p>
        <p className="text-xs">Elementos editáveis aparecerão com destaque azul</p>
      </div>
      
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
    </div>
  );
};