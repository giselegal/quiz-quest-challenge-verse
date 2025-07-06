import React, { useState, useEffect } from 'react';
import { SchemaDrivenComponentsSidebar } from './sidebar/SchemaDrivenComponentsSidebar';
import { SimpleSidebar } from './sidebar/SimpleSidebar';
import { DynamicPropertiesPanel } from './panels/DynamicPropertiesPanel';
import { SyncStatus } from './status/SyncStatus';
import { VersionManager } from './version/VersionManager';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSchemaEditor } from '@/hooks/useSchemaEditor';
import { blockDefinitions } from '@/config/blockDefinitions';
import { UniversalBlockRenderer } from './blocks/UniversalBlockRenderer';
import { 
  Save, 
  Eye, 
  Settings, 
  Plus,
  Monitor,
  Tablet,
  Smartphone,
  FileText,
  Users,
  BarChart3
} from 'lucide-react';

interface SchemaDrivenEditorLayoutV2Props {
  funnelId?: string;
  className?: string;
}

const SchemaDrivenEditorLayoutV2: React.FC<SchemaDrivenEditorLayoutV2Props> = ({ 
  funnelId,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState('blocks');
  const [deviceView, setDeviceView] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Hook principal do editor com backend
  const {
    funnel,
    currentPage,
    selectedBlock,
    isLoading,
    isSaving,
    autoSaveState,
    currentPageId,
    selectedBlockId,
    createNewFunnel,
    loadFunnel,
    saveFunnel,
    syncWithBackend,
    addPage,
    updatePage,
    deletePage,
    setCurrentPage,
    addBlock,
    updateBlock,
    deleteBlock,
    reorderBlocks,
    setSelectedBlock,
    updateFunnelConfig,
    updatePageSettings,
    getVersionHistory,
    restoreVersion,
    enableAutoSave,
    disableAutoSave
  } = useSchemaEditor(funnelId);

  // Monitorar status de conexão
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Handler para adicionar novo bloco
  const handleComponentSelect = (blockType: string) => {
    const definition = blockDefinitions.find(def => def.type === blockType);
    if (!definition) return;

    // Gerar propriedades padrão baseadas no schema
    const defaultProperties: Record<string, any> = {};
    definition.propertiesSchema?.forEach(prop => {
      if (prop.defaultValue !== undefined) {
        if (prop.nestedPath) {
          const keys = prop.nestedPath.split('.');
          let target = defaultProperties;
          for (let i = 0; i < keys.length - 1; i++) {
            if (!target[keys[i]]) target[keys[i]] = {};
            target = target[keys[i]];
          }
          target[keys[keys.length - 1]] = prop.defaultValue;
        } else {
          defaultProperties[prop.key] = prop.defaultValue;
        }
      }
    });

    addBlock({
      type: blockType,
      properties: defaultProperties
    });
  };

  // Handler para mudanças nas propriedades dos blocos
  const handleBlockPropertyChange = (key: string, value: any) => {
    if (!selectedBlockId) return;

    const currentProperties = selectedBlock?.properties || {};
    updateBlock(selectedBlockId, {
      properties: { ...currentProperties, [key]: value }
    });
  };

  // Handler para propriedades aninhadas
  const handleNestedPropertyChange = (path: string, value: any) => {
    if (!selectedBlockId) return;

    const keys = path.split('.');
    const newProperties = { ...selectedBlock?.properties };
    let target = newProperties;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!target[keys[i]]) target[keys[i]] = {};
      target = target[keys[i]];
    }
    target[keys[keys.length - 1]] = value;

    updateBlock(selectedBlockId, { properties: newProperties });
  };

  // Handler para edição inline
  const handleInlineEdit = (blockId: string, updates: Partial<any>) => {
    if (updates.properties) {
      updateBlock(blockId, updates);
    }
  };

  // Controles de auto-save
  const handleToggleAutoSave = () => {
    if (autoSaveState.isEnabled) {
      disableAutoSave();
    } else {
      enableAutoSave();
    }
  };

  // Se não há funil e não está carregando, criar novo
  useEffect(() => {
    if (!funnel && !isLoading && !funnelId) {
      createNewFunnel();
    }
  }, [funnel, isLoading, funnelId, createNewFunnel]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#B89B7A] mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Carregando Editor...</h2>
          <p className="text-gray-500">Aguarde enquanto configuramos seu workspace</p>
        </div>
      </div>
    );
  }

  if (!funnel) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Nenhum funil encontrado</h2>
          <Button onClick={createNewFunnel}>
            <Plus className="w-4 h-4 mr-2" />
            Criar Novo Funil
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-screen flex flex-col overflow-hidden bg-gray-50 ${className}`}>
      {/* Header */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          {/* Info do funil */}
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-800">{funnel.name}</span>
            <Badge variant={funnel.isPublished ? 'default' : 'secondary'}>
              {funnel.isPublished ? 'Publicado' : 'Rascunho'}
            </Badge>
          </div>

          {/* Info da página atual */}
          {currentPage && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>•</span>
              <span>{currentPage.title}</span>
              <Badge variant="outline" className="text-xs">
                {currentPage.blocks.length} bloco{currentPage.blocks.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* Status de sincronização compacto */}
          <SyncStatus
            autoSaveState={autoSaveState}
            isSaving={isSaving}
            isOnline={isOnline}
            onManualSave={() => saveFunnel(true)}
            onSync={syncWithBackend}
            onToggleAutoSave={handleToggleAutoSave}
            compact
          />

          {/* Device view controls */}
          <div className="flex border rounded-md">
            <Button
              variant={deviceView === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setDeviceView('mobile')}
              className="rounded-r-none px-2"
            >
              <Smartphone className="w-4 h-4" />
            </Button>
            <Button
              variant={deviceView === 'tablet' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setDeviceView('tablet')}
              className="rounded-none px-2"
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={deviceView === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setDeviceView('desktop')}
              className="rounded-l-none px-2"
            >
              <Monitor className="w-4 h-4" />
            </Button>
          </div>

          {/* Ações principais */}
          <VersionManager
            versions={getVersionHistory()}
            currentVersion={funnel.version}
            onRestoreVersion={restoreVersion}
            trigger={
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-1" />
                Versões
              </Button>
            }
          />

          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>

          <Button 
            size="sm" 
            onClick={() => saveFunnel(true)}
            disabled={isSaving}
            className="bg-[#B89B7A] hover:bg-[#a08965]"
          >
            <Save className="w-4 h-4 mr-1" />
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Left Sidebar */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <div className="h-full border-r border-gray-200 bg-white">
            <SchemaDrivenComponentsSidebar 
              onComponentSelect={handleComponentSelect}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              funnelPages={funnel.pages}
              currentPageId={currentPageId ?? undefined}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Central Canvas */}
        <ResizablePanel defaultSize={55}>
          <div className="h-full overflow-auto bg-gray-50">
            <div className="p-8">
              <div className={`mx-auto bg-white min-h-[800px] shadow-lg rounded-lg transition-all duration-300 ${
                deviceView === 'mobile' ? 'max-w-sm' :
                deviceView === 'tablet' ? 'max-w-2xl' :
                'max-w-4xl'
              }`}>
                <div className="p-6">
                  {/* Canvas Content */}
                  {currentPage ? (
                    <div className="space-y-4">
                      {currentPage.blocks.length === 0 ? (
                        <div className="text-center py-16 text-gray-500">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <Plus className="w-8 h-8" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">Página vazia</h3>
                          <p className="text-sm mb-4">
                            Adicione blocos da biblioteca à esquerda para começar.
                          </p>
                          <Button 
                            variant="outline" 
                            onClick={() => setActiveTab('blocks')}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Adicionar Primeiro Bloco
                          </Button>
                        </div>
                      ) : (
                        currentPage.blocks.map((block) => (
                          <div key={block.id} className="group relative">
                            {/* Renderiza o bloco usando o UniversalBlockRenderer */}
                            <UniversalBlockRenderer
                              block={block}
                              isSelected={block.id === selectedBlockId}
                              onClick={() => setSelectedBlock(block.id)}
                              onSaveInline={handleInlineEdit}
                              disabled={false}
                            />
                            
                            {/* Botão de exclusão do bloco */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteBlock(block.id);
                              }}
                              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-xs hover:bg-red-600 z-10"
                            >
                              ×
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-16 text-gray-500">
                      <h3 className="text-lg font-medium mb-2">Nenhuma página selecionada</h3>
                      <p className="text-sm">Selecione uma página para começar a editar.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Right Properties Panel */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
          <div className="h-full border-l border-gray-200 bg-white">
            <DynamicPropertiesPanel
              selectedBlock={selectedBlock}
              funnelConfig={funnel.config}
              onBlockPropertyChange={handleBlockPropertyChange}
              onNestedPropertyChange={handleNestedPropertyChange}
              onFunnelConfigChange={updateFunnelConfig}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default SchemaDrivenEditorLayoutV2;
