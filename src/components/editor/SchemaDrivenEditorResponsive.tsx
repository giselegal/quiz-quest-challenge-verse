
import React, { useState, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, 
  Eye, 
  EyeOff, 
  Settings, 
  FileText,
  Palette,
  BarChart3
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { createDefaultFunnel } from '@/services/schemaDrivenFunnelService';
import StagesPanel from './panels/StagesPanel';
import ComponentsPanel from './panels/ComponentsPanel';
import PropertiesPanel from './panels/PropertiesPanel';
import EditorCanvas from './canvas/EditorCanvas';
import { FunnelStepType } from '@/types/funnel';

interface SchemaDrivenEditorResponsiveProps {
  funnelId?: string;
}

interface FunnelStage {
  id: string;
  title: string;
  type: FunnelStepType;
  order: number;
  isActive: boolean;
  components: any[];
}

const SchemaDrivenEditorResponsive: React.FC<SchemaDrivenEditorResponsiveProps> = ({ funnelId }) => {
  const [stages, setStages] = useState<FunnelStage[]>([]);
  const [activeStageId, setActiveStageId] = useState<string | null>(null);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize with default 21-stage funnel
  useEffect(() => {
    const initializeFunnel = async () => {
      try {
        const defaultFunnel = await createDefaultFunnel();
        
        // Convert funnel pages to editor stages
        const funnelStages: FunnelStage[] = defaultFunnel.pages.map((page, index) => ({
          id: page.id,
          title: page.title || `Etapa ${index + 1}`,
          type: getStageTypeFromPage(page, index),
          order: index,
          isActive: index === 0,
          components: page.blocks || []
        }));

        setStages(funnelStages);
        if (funnelStages.length > 0) {
          setActiveStageId(funnelStages[0].id);
        }
      } catch (error) {
        console.error('Erro ao inicializar funil:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar o editor.",
          variant: "destructive",
        });
      }
    };

    initializeFunnel();
  }, [funnelId]);

  const getStageTypeFromPage = (page: any, index: number): FunnelStepType => {
    if (index === 0) return 'intro';
    if (index === 1) return 'name-collect';
    if (index === 2) return 'quiz-intro';
    if (index >= 3 && index <= 13) return 'question-multiple';
    if (index === 14) return 'quiz-transition';
    if (index === 15) return 'processing';
    if (index === 16) return 'result-intro';
    if (index === 17) return 'result-details';
    if (index === 18) return 'result-guide';
    if (index === 19) return 'offer-transition';
    if (index === 20) return 'offer-page';
    return 'intro';
  };

  const handleStageSelect = (stageId: string) => {
    setActiveStageId(stageId);
    setSelectedComponentId(null);
    setStages(prev => prev.map(stage => ({
      ...stage,
      isActive: stage.id === stageId
    })));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Sucesso",
        description: "Editor salvo com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar o editor.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
    setSelectedComponentId(null);
  };

  const activeStage = stages.find(s => s.id === activeStageId);

  return (
    <div className="h-screen flex flex-col bg-[#1A1F2C] text-white">
      {/* Toolbar Superior */}
      <div className="border-b border-gray-700 bg-[#252A3A] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">Editor de Funil - 21 Etapas</h1>
            <Badge variant="secondary" className="bg-[#B89B7A] text-white">
              {stages.length} Etapas
            </Badge>
            {activeStage && (
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                {activeStage.title}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={togglePreview}
              className="border-gray-600 text-gray-300 hover:text-white"
            >
              {isPreviewMode ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {isPreviewMode ? 'Editar' : 'Preview'}
            </Button>
            
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-[#B89B7A] hover:bg-[#A1835D] text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </div>
      </div>

      {/* Área Principal com Tabs */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="pages" className="h-full flex flex-col">
          <div className="border-b border-gray-700 bg-[#252A3A] px-4">
            <TabsList className="bg-transparent border-none h-12">
              <TabsTrigger 
                value="pages" 
                className="data-[state=active]:bg-[#B89B7A] data-[state=active]:text-white text-gray-400"
              >
                <FileText className="w-4 h-4 mr-2" />
                Páginas
              </TabsTrigger>
              <TabsTrigger 
                value="design" 
                className="data-[state=active]:bg-[#B89B7A] data-[state=active]:text-white text-gray-400"
              >
                <Palette className="w-4 h-4 mr-2" />
                Design
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="data-[state=active]:bg-[#B89B7A] data-[state=active]:text-white text-gray-400"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="pages" className="flex-1 m-0 overflow-hidden">
            <ResizablePanelGroup direction="horizontal" className="h-full">
              {/* Painel de Páginas/Etapas */}
              <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                <div className="h-full bg-[#252A3A] border-r border-gray-700">
                  <StagesPanel
                    stages={stages}
                    activeStageId={activeStageId}
                    onStageSelect={handleStageSelect}
                  />
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Painel de Componentes */}
              <ResizablePanel defaultSize={15} minSize={12} maxSize={20}>
                <div className="h-full bg-[#2A2F3E] border-r border-gray-700">
                  <ComponentsPanel
                    stageType={activeStage?.type}
                    onAddComponent={(componentType) => {
                      console.log('Adicionar componente:', componentType);
                    }}
                  />
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Canvas Principal */}
              <ResizablePanel defaultSize={45}>
                <div className="h-full bg-[#FAF9F7] overflow-auto">
                  <EditorCanvas
                    stage={activeStage}
                    selectedComponentId={selectedComponentId}
                    onSelectComponent={setSelectedComponentId}
                    isPreviewMode={isPreviewMode}
                  />
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Painel de Propriedades */}
              <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
                <div className="h-full bg-[#252A3A] border-l border-gray-700">
                  <PropertiesPanel
                    selectedComponentId={selectedComponentId}
                    stage={activeStage}
                    onUpdateComponent={(updates) => {
                      console.log('Atualizar componente:', updates);
                    }}
                  />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </TabsContent>

          <TabsContent value="design" className="flex-1 m-0 p-4">
            <div className="text-center text-gray-500">
              <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">Configurações de Design</h3>
              <p>Personalize cores, fontes e estilos do funil</p>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="flex-1 m-0 p-4">
            <div className="text-center text-gray-500">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">Analytics</h3>
              <p>Métricas e performance do funil</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SchemaDrivenEditorResponsive;
