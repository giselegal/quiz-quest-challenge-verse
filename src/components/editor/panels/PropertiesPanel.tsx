
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

interface PropertiesPanelProps {
  selectedComponentId: string | null;
  stage?: any;
  onUpdateComponent: (updates: any) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ 
  selectedComponentId, 
  stage,
  onUpdateComponent 
}) => {
  if (!selectedComponentId) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="font-semibold text-white mb-2">Propriedades</h2>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center text-gray-500">
            <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">Selecione um componente para ver suas propriedades</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="font-semibold text-white mb-2">Propriedades</h2>
        <p className="text-sm text-gray-400">Componente selecionado</p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-white">Configurações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-400">
                ID: {selectedComponentId}
              </div>
              <div className="text-sm text-gray-400">
                Propriedades específicas do componente aparecerão aqui
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-white">Estilo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-400">
                Configurações de aparência
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default PropertiesPanel;
