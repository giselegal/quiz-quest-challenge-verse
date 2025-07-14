
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EditorCanvasProps {
  stage?: any;
  selectedComponentId: string | null;
  onSelectComponent: (componentId: string | null) => void;
  isPreviewMode: boolean;
}

const EditorCanvas: React.FC<EditorCanvasProps> = ({
  stage,
  selectedComponentId,
  onSelectComponent,
  isPreviewMode
}) => {
  if (!stage) {
    return (
      <div className="h-full flex items-center justify-center bg-[#FAF9F7]">
        <div className="text-center text-gray-500">
          <div className="text-lg font-semibold mb-2">Selecione uma página</div>
          <div className="text-sm">Escolha uma página na sidebar para começar a editar</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative bg-[#FAF9F7]">
      {/* Header do Canvas */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-[#432818]">{stage.title}</h2>
          <Badge variant="secondary" className="bg-[#B89B7A] text-white">
            {stage.type}
          </Badge>
          <Badge variant="outline" className="text-[#432818]">
            {stage.components.length} componentes
          </Badge>
        </div>
        
        {!isPreviewMode && (
          <div className="text-xs text-gray-500">
            Clique nos elementos para editar
          </div>
        )}
      </div>

      {/* Área de Edição */}
      <div className="h-[calc(100%-73px)] overflow-auto p-8">
        <div className="max-w-4xl mx-auto">
          {/* Preview da página baseado no tipo */}
          {stage.type === 'intro' && (
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-[#432818]">
                  Descubra Seu Estilo Pessoal
                </h1>
                <p className="text-lg text-[#5D4A3A]">
                  Um quiz personalizado para transformar seu guarda-roupa
                </p>
              </div>
              
              <div className="w-64 h-48 bg-[#B89B7A] rounded-lg mx-auto flex items-center justify-center">
                <span className="text-white">Imagem Principal</span>
              </div>
              
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Digite seu nome..."
                  className="w-full max-w-md mx-auto px-4 py-3 border border-gray-300 rounded-lg text-center"
                />
                <button className="bg-[#B89B7A] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#A1835D] transition-colors">
                  Quero Descobrir meu Estilo Agora!
                </button>
              </div>
            </div>
          )}

          {stage.type === 'question-multiple' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-[#B89B7A] h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
                <h2 className="text-2xl font-bold text-[#432818] mb-2">
                  Qual dessas situações mais te representa?
                </h2>
                <p className="text-gray-600">Questão 3 de 10</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((option) => (
                  <Card key={option} className="p-4 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-[#B89B7A]">
                    <div className="aspect-video bg-gray-200 rounded mb-3 flex items-center justify-center">
                      <span className="text-gray-500">Opção {option}</span>
                    </div>
                    <p className="text-center font-medium">Descrição da opção {option}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {stage.type === 'result-details' && (
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-[#432818]">
                  Seu Estilo: Elegante
                </h1>
                <div className="w-32 h-32 bg-[#B89B7A] rounded-full mx-auto flex items-center justify-center">
                  <span className="text-white font-bold">85%</span>
                </div>
                <p className="text-lg text-[#5D4A3A]">
                  Você é uma mulher que irradia refinamento e classe
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold mb-4">Suas características:</h3>
                <ul className="space-y-2 text-left">
                  <li>• Prefere peças clássicas e atemporais</li>
                  <li>• Valoriza qualidade sobre quantidade</li>
                  <li>• Gosta de looks sofisticados</li>
                </ul>
              </div>
            </div>
          )}

          {stage.type === 'offer-page' && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-[#432818] mb-4">
                  Oferta Especial Para Você!
                </h1>
                <p className="text-lg text-[#5D4A3A]">
                  Guia personalizado baseado no seu estilo Elegante
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">47% OFF</div>
                <div className="text-2xl text-gray-500 line-through">De R$ 297</div>
                <div className="text-4xl font-bold text-[#B89B7A]">Por R$ 157</div>
                <button className="mt-6 bg-[#B89B7A] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#A1835D] transition-colors">
                  QUERO MEU GUIA PERSONALIZADO
                </button>
              </div>
            </div>
          )}

          {/* Placeholder para outros tipos */}
          {!['intro', 'question-multiple', 'result-details', 'offer-page'].includes(stage.type) && (
            <div className="text-center py-16">
              <div className="text-gray-500">
                <h3 className="text-lg font-semibold mb-2">
                  {stage.title}
                </h3>
                <p>Tipo: {stage.type}</p>
                <p className="mt-4 text-sm">
                  Preview específico será implementado para este tipo de página
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorCanvas;
