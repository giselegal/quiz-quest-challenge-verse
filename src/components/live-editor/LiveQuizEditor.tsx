
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import FunnelNavbar from './navbar/FunnelNavbar';
import CaktoStagesSidebar from './sidebar/CaktoStagesSidebar';
import ToolbarSidebar from './sidebar/ToolbarSidebar';
import { useLiveEditor } from '../../hooks/useLiveEditor';

export interface EditorStage {
  id: string;
  name: string;
  type: 'intro' | 'question' | 'result' | 'offer';
  order: number;
  components: EditorComponent[];
  settings: Record<string, any>;
}

export interface EditorComponent {
  id: string;
  type: string;
  content: Record<string, any>;
  style: Record<string, any>;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const LiveQuizEditor: React.FC = () => {
  const {
    stages,
    activeStageId,
    selectedComponentId,
    isPreviewMode,
    setActiveStage,
    setSelectedComponent,
    addStage,
    updateStage,
    deleteStage,
    addComponent,
    updateComponent,
    deleteComponent,
    togglePreview,
    saveEditor,
    loadEditor
  } = useLiveEditor();

  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('builder');

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveEditor();
      toast.success('Editor salvo com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar o editor.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    toast.success('Funil publicado com sucesso!');
  };

  const handleAddStage = (type: EditorStage['type']) => {
    const newStage: EditorStage = {
      id: `stage-${Date.now()}`,
      name: `${type === 'intro' ? 'Introdução' : type === 'question' ? 'Questão' : type === 'result' ? 'Resultado' : 'Oferta'} ${stages.length + 1}`,
      type,
      order: stages.length,
      components: [],
      settings: {}
    };
    
    addStage(newStage);
    setActiveStage(newStage.id);
  };

  const handleAddComponent = (componentType: string) => {
    if (activeStageId) {
      const newComponent: EditorComponent = {
        id: `component-${Date.now()}`,
        type: componentType,
        content: { text: `Novo ${componentType}` },
        style: {},
        position: { x: 50, y: 50 },
        size: { width: 300, height: 100 }
      };
      addComponent(activeStageId, newComponent);
      setSelectedComponent(newComponent.id);
    }
  };

  const activeStage = stages.find(s => s.id === activeStageId);
  const selectedComponent = activeStage?.components.find(c => c.id === selectedComponentId);

  return (
    <div className="h-screen flex flex-col bg-[#1A1F2C] text-white overflow-hidden">
      {/* Navbar Superior */}
      <FunnelNavbar
        onSave={handleSave}
        onPublish={handlePublish}
        onPreview={togglePreview}
        onClose={() => window.history.back()}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Área Principal */}
      <div className="w-full h-full relative overflow-hidden">
        <div className="w-full h-full">
          <div className="flex flex-col md:flex-row h-full relative">
            
            {/* Sidebar Esquerda - Etapas */}
            <CaktoStagesSidebar
              stages={stages}
              activeStageId={activeStageId}
              onStageSelect={setActiveStage}
              onAddStage={handleAddStage}
              onUpdateStage={updateStage}
              onDeleteStage={deleteStage}
            />

            {/* Área Central de Edição */}
            <div className="w-full h-full">
              <div className="w-full md:flex-row flex-col overflow-hidden flex h-full relative">
                
                {/* Toolbar de Componentes */}
                <ToolbarSidebar onAddComponent={handleAddComponent} />

                {/* Canvas Principal */}
                <div className="relative w-full overflow-auto z-10">
                  <div className="h-full w-full rounded-[inherit]" style={{ overflow: 'hidden scroll' }}>
                    <div className="group relative main-content w-full min-h-full mx-auto">
                      <div className="flex flex-col gap-4 md:gap-6 h-full justify-between p-3 group-[.screen-mobile]:p-3 md:p-5 pb-10">
                        
                        {/* Header da Etapa */}
                        <div className="grid gap-4 opacity-100">
                          <div className="flex flex-row w-full h-auto justify-center relative">
                            <div className="flex flex-col w-full customizable-width justify-start items-center gap-4">
                              <img 
                                width="96" 
                                height="96" 
                                className="max-w-24 object-cover" 
                                alt="Logo" 
                                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
                              />
                              <div className="relative w-full overflow-hidden rounded-full bg-zinc-300 h-2">
                                <div 
                                  className="progress h-full w-full flex-1 bg-primary transition-all" 
                                  style={{ transform: `translateX(-${100 - (activeStage?.settings?.progressPercent || 0)}%)` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Conteúdo da Etapa */}
                        <div className="main-content w-full relative mx-auto customizable-width h-full">
                          <div className="flex flex-row flex-wrap pb-10">
                            {activeStage ? (
                              activeStage.components.length > 0 ? (
                                activeStage.components.map((component) => (
                                  <div
                                    key={component.id}
                                    className={`group/canvas-item max-w-full canvas-item min-h-[1.25rem] relative self-auto mr-auto cursor-pointer ${
                                      selectedComponentId === component.id ? 'border-2 border-blue-500' : 'border border-transparent hover:border-blue-500'
                                    }`}
                                    style={{ flexBasis: '100%' }}
                                    onClick={() => setSelectedComponent(component.id)}
                                  >
                                    <div className="min-h-[1.25rem] min-w-full relative self-auto box-border customizable-gap rounded-md p-4">
                                      <div className="text-center">
                                        <h3 className="text-lg font-semibold mb-2 capitalize">
                                          {component.type.replace('-', ' ')}
                                        </h3>
                                        <p className="text-gray-400">
                                          {component.content.text || 'Componente sem conteúdo'}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="w-full text-center py-20">
                                  <p className="text-gray-400 text-lg">
                                    Nenhum componente nesta etapa
                                  </p>
                                  <p className="text-gray-500 text-sm mt-2">
                                    Arraste componentes da barra lateral para começar
                                  </p>
                                </div>
                              )
                            ) : (
                              <div className="w-full text-center py-20">
                                <p className="text-gray-400 text-lg">
                                  Selecione uma etapa para começar a editar
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="pt-10 md:pt-24"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar Direita - Propriedades */}
                <div className="overflow-hidden canvas-editor hidden md:block w-full max-w-[24rem] relative overflow-auto-container sm-scrollbar border-l z-[50]">
                  <div className="h-full w-full rounded-[inherit]" style={{ overflow: 'hidden scroll' }}>
                    <div className="grid gap-4 px-4 pb-4 pt-2 my-4">
                      
                      {/* Configurações da Etapa */}
                      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="flex flex-col space-y-1.5 p-6">
                          <p className="text-sm text-muted-foreground">Título da Etapa</p>
                        </div>
                        <div className="p-6 pt-0">
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Nome da Etapa
                            </label>
                            <input 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" 
                              placeholder="Digite aqui..." 
                              value={activeStage?.name || ''}
                              onChange={(e) => activeStageId && updateStage(activeStageId, { name: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Configurações do Componente Selecionado */}
                      {selectedComponent && (
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                          <div className="flex flex-col space-y-1.5 p-6">
                            <p className="text-sm text-muted-foreground">Propriedades do Componente</p>
                          </div>
                          <div className="p-6 pt-0">
                            <div className="grid gap-4">
                              <div>
                                <label className="text-sm font-medium">Tipo:</label>
                                <p className="text-sm text-gray-400 capitalize">{selectedComponent.type}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Conteúdo:</label>
                                <textarea
                                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 min-h-[60px]"
                                  value={selectedComponent.content.text || ''}
                                  onChange={(e) => {
                                    if (activeStageId && selectedComponentId) {
                                      updateComponent(activeStageId, selectedComponentId, {
                                        content: { ...selectedComponent.content, text: e.target.value }
                                      });
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="py-4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveQuizEditor;

  return (
    <div className="h-screen flex flex-col bg-[#1A1F2C] text-white">
      {/* Toolbar Superior */}
      <div className="border-b border-gray-700 bg-[#252A3A] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">Editor de Quiz ao Vivo</h1>
            <Badge variant="secondary" className="bg-[#B89B7A] text-white">
              {stages.length} Etapas
            </Badge>
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

      {/* Área Principal do Editor */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Sidebar Esquerda - Etapas */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
            <div className="h-full bg-[#252A3A] border-r border-gray-700">
              <StagesSidebar
                stages={stages}
                activeStageId={activeStageId}
                onStageSelect={setActiveStage}
                onAddStage={handleAddStage}
                onUpdateStage={updateStage}
                onDeleteStage={deleteStage}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Sidebar Central - Componentes */}
          <ResizablePanel defaultSize={15} minSize={12} maxSize={20}>
            <div className="h-full bg-[#2A2F3E] border-r border-gray-700">
              <ComponentsSidebar
                onAddComponent={(type) => {
                  if (activeStageId) {
                    const newComponent: EditorComponent = {
                      id: `component-${Date.now()}`,
                      type,
                      content: {},
                      style: {},
                      position: { x: 50, y: 50 },
                      size: { width: 300, height: 100 }
                    };
                    addComponent(activeStageId, newComponent);
                    setSelectedComponent(newComponent.id);
                  }
                }}
                stageType={activeStage?.type}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Área Central - Preview/Edição */}
          <ResizablePanel defaultSize={45}>
            <div className="h-full bg-[#FAF9F7] overflow-auto">
              <LivePreview
                stage={activeStage}
                selectedComponentId={selectedComponentId}
                onSelectComponent={setSelectedComponent}
                onUpdateComponent={(componentId, updates) => {
                  if (activeStageId) {
                    updateComponent(activeStageId, componentId, updates);
                  }
                }}
                isPreviewMode={isPreviewMode}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Sidebar Direita - Propriedades */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
            <div className="h-full bg-[#252A3A] border-l border-gray-700">
              <PropertiesSidebar
                selectedComponent={selectedComponent}
                stage={activeStage}
                onUpdateComponent={(updates) => {
                  if (activeStageId && selectedComponentId) {
                    updateComponent(activeStageId, selectedComponentId, updates);
                  }
                }}
                onUpdateStage={(updates) => {
                  if (activeStageId) {
                    updateStage(activeStageId, updates);
                  }
                }}
                onDeleteComponent={() => {
                  if (activeStageId && selectedComponentId) {
                    deleteComponent(activeStageId, selectedComponentId);
                    setSelectedComponent(null);
                  }
                }}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default LiveQuizEditor;
