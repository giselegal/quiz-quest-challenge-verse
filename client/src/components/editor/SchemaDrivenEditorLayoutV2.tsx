
import React, { useState, useEffect } from 'react';
import { SchemaDrivenComponentsSidebar } from './sidebar/SchemaDrivenComponentsSidebar';
import { DynamicPropertiesPanel } from './panels/DynamicPropertiesPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSchemaEditor } from '@/hooks/useSchemaEditor';
import { blockDefinitions } from '@/config/blockDefinitions';
import { DndProvider } from './dnd/DndProvider';
import { DroppableCanvas } from './dnd/DroppableCanvas';
import { 
  Save, 
  Eye, 
  Settings, 
  Plus,
  Monitor,
  Tablet,
  Smartphone,
  FileText,
  Menu
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
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(true);

  // Hook principal do editor com backend - apenas funcionalidades essenciais
  const {
    funnel,
    currentPage,
    selectedBlock,
    isLoading,
    isSaving,
    currentPageId,
    selectedBlockId,
    createNewFunnel,
    saveFunnel,
    addPage,
    updatePage,
    setCurrentPage,
    addBlock,
    updateBlock,
    deleteBlock,
    setSelectedBlock,
    updateFunnelConfig
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

  // Handler para adicionar novo bloco - TODOS os componentes agora funcionais
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

  // Controles simplificados - apenas save manual
  const handleSave = () => {
    saveFunnel(true);
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
        <div className="inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-sm border">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#B89B7A] mr-3"></div>
          <span className="text-gray-700">Carregando...</span>
        </div>
      </div>
    );
  }

  if (!funnel) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white rounded-lg shadow-sm border">
            <span className="text-gray-700 mr-3">Nenhum funil encontrado</span>
            <Button onClick={createNewFunnel} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Criar Novo
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DndProvider
      blocks={currentPage?.blocks || []}
      onBlocksReorder={(newBlocks) => {
        if (currentPage) {
          updatePage(currentPage.id, { blocks: newBlocks });
        }
      }}
      onBlockAdd={(blockType) => {
        // TODOS os blocos agora são permitidos
        if (currentPage) {
          const definition = blockDefinitions.find(def => def.type === blockType);
          if (definition) {
            const defaultProperties: Record<string, any> = {};
            definition.propertiesSchema?.forEach(prop => {
              if (prop.defaultValue !== undefined) {
                defaultProperties[prop.key] = prop.defaultValue;
              }
            });
            addBlock({
              type: blockType,
              properties: defaultProperties
            });
          }
        }
      }}
      onBlockSelect={setSelectedBlock}
      selectedBlockId={selectedBlockId || undefined}
      onBlockUpdate={handleInlineEdit}
    >
    <div className={`h-screen flex flex-col overflow-hidden bg-gray-50 editor-mobile-layout ${className}`}>
      {/* Header - Mobile First Design */}
      <div className="h-12 sm:h-14 bg-white border-b border-gray-200 flex items-center justify-between px-2 sm:px-4">
        <div className="flex items-center space-x-1 sm:space-x-4 min-w-0 flex-1">
          {/* Info do funil - Mobile compact */}
          <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
            <span className="font-medium text-gray-800 text-sm sm:text-base truncate">{funnel.name}</span>
            <Badge variant={funnel.isPublished ? 'default' : 'secondary'} className="text-xs hidden sm:inline-flex">
              {funnel.isPublished ? 'Publicado' : 'Rascunho'}
            </Badge>
          </div>

          {/* Info da página atual - Mobile hidden */}
          {currentPage && (
            <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
              <span>•</span>
              <span className="truncate">{currentPage.title}</span>
              <Badge variant="outline" className="text-xs">
                {currentPage.blocks.length} bloco{currentPage.blocks.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Status simples inline */}
          <div className="hidden sm:flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              isSaving ? 'bg-yellow-500 animate-pulse' : 
              isOnline ? 'bg-green-500' : 'bg-red-500'
            }`} />
            <span className="text-xs text-gray-600">
              {isSaving ? 'Salvando...' : isOnline ? 'Online' : 'Offline'}
            </span>
          </div>

          {/* Mobile Toggle Buttons - FORÇAR VISIBILIDADE */}
          <div className="flex space-x-2 lg:hidden">
            <Button
              variant="default"
              size="sm"
              onClick={() => setShowLeftSidebar(!showLeftSidebar)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1"
            >
              <Menu className="w-4 h-4 mr-1" />
              Menu
            </Button>
            <Button
              variant="default" 
              size="sm"
              onClick={() => setShowRightSidebar(!showRightSidebar)}
              className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1"
            >
              <Settings className="w-4 h-4 mr-1" />
              Props
            </Button>
          </div>

          {/* Device view controls - Mobile optimized */}
          <div className="flex border rounded-md hidden-mobile md:flex">
            <Button
              variant={deviceView === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => {
                setDeviceView('mobile');
                setShowLeftSidebar(false);
                setShowRightSidebar(false);
              }}
              className="rounded-r-none px-1.5 sm:px-2"
            >
              <Smartphone className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button
              variant={deviceView === 'tablet' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => {
                setDeviceView('tablet');
                setShowLeftSidebar(true);
                setShowRightSidebar(true);
              }}
              className="rounded-none px-1.5 sm:px-2 hidden sm:inline-flex"
            >
              <Tablet className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button
              variant={deviceView === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => {
                setDeviceView('desktop');
                setShowLeftSidebar(true);
                setShowRightSidebar(true);
              }}
              className="rounded-l-none px-1.5 sm:px-2"
            >
              <Monitor className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>

          {/* Ações principais - Mobile minimized */}
          <div className="hidden md:block">
            <Button variant="outline" size="sm" onClick={() => saveFunnel(true)}>
              <Save className="w-4 h-4 mr-1" />
              Backup
            </Button>
          </div>

          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            <Eye className="w-4 h-4 mr-1" />
            <span className="hidden lg:inline">Preview</span>
          </Button>

          <Button 
            size="sm" 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#B89B7A] hover:bg-[#a08965] px-2 sm:px-3"
          >
            <Save className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
            <span className="hidden sm:inline">{isSaving ? 'Salvando...' : 'Salvar'}</span>
          </Button>
        </div>
      </div>

      {/* Main Content - LAYOUT CONSISTENTE PARA TODAS AS TELAS */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar - RESPONSIVO CORRETO */}
        {showLeftSidebar && (
          <div className={`
            ${deviceView === 'mobile' 
              ? 'fixed top-14 left-0 bottom-0 w-72 z-50 bg-white shadow-xl border-r border-gray-300' 
              : deviceView === 'tablet'
              ? 'relative w-64 bg-white border-r border-gray-200'
              : 'relative w-80 bg-white border-r border-gray-200'
            } 
            flex flex-col
          `}>
            {/* Header with close button for mobile */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Componentes</h2>
              {deviceView === 'mobile' && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowLeftSidebar(false)}
                  className="h-8 w-8 p-0"
                >
                  ×
                </Button>
              )}
            </div>
            <div className="flex-1 overflow-hidden">
              <SchemaDrivenComponentsSidebar 
                onComponentSelect={(type) => {
                  handleComponentSelect(type);
                  // Removida lógica que fechava sidebar automaticamente no mobile
                  // A sidebar agora permanece aberta para melhor experiência do usuário
                }}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                funnelPages={funnel.pages}
                currentPageId={currentPageId ?? undefined}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        )}
        
        {/* Central Canvas - LARGURAS ESPECÍFICAS POR DISPOSITIVO */}
        <div className={`
          flex-1 flex flex-col overflow-hidden bg-gray-50 editor-main-content
          ${deviceView === 'mobile' && (showLeftSidebar || showRightSidebar) ? 'blur-sm' : ''}
        `}>
          <div className="flex-1 overflow-auto flex justify-center editor-canvas-area">
            <div className={`
              ${deviceView === 'mobile' 
                ? 'w-full px-2' 
                : deviceView === 'tablet'
                ? 'w-full max-w-2xl mx-auto p-4'
                : 'w-full max-w-4xl mx-auto p-6'
              }
            `}>
              {/* CANVAS MOBILE - Largura de smartphone real */}
              {deviceView === 'mobile' ? (
                <div className="mobile-canvas-container">
                  <div className="p-3">
                    <DroppableCanvas
                      blocks={currentPage?.blocks || []}
                      selectedBlockId={selectedBlockId || undefined}
                      onBlockSelect={(blockId) => setSelectedBlock(blockId)}
                      onBlockDelete={deleteBlock}
                      onBlockDuplicate={(blockId) => {
                        const block = currentPage?.blocks.find(b => b.id === blockId);
                        if (block && currentPage) {
                          const newBlock = {
                            ...block,
                            id: `${block.type}-${Date.now()}`
                          };
                          const blockIndex = currentPage.blocks.findIndex(b => b.id === blockId);
                          const newBlocks = [...currentPage.blocks];
                          newBlocks.splice(blockIndex + 1, 0, newBlock);
                          updatePage(currentPage.id, { blocks: newBlocks });
                        }
                      }}
                      onBlockToggleVisibility={(blockId) => {
                        const block = currentPage?.blocks.find(b => b.id === blockId);
                        if (block && currentPage) {
                          const updatedBlock = {
                            ...block,
                            properties: {
                              ...block.properties,
                              hidden: !block.properties?.hidden
                            }
                          };
                          const newBlocks = currentPage.blocks.map(b => 
                            b.id === blockId ? updatedBlock : b
                          );
                          updatePage(currentPage.id, { blocks: newBlocks });
                        }
                      }}
                      onSaveInline={handleInlineEdit}
                      onAddBlock={(blockType) => {
                        // TODOS os componentes são permitidos agora
                        const definition = blockDefinitions.find(def => def.type === blockType);
                        if (definition) {
                          const defaultProperties: Record<string, any> = {};
                          definition.propertiesSchema?.forEach(prop => {
                            if (prop.defaultValue !== undefined) {
                              defaultProperties[prop.key] = prop.defaultValue;
                            }
                          });
                          addBlock({
                            type: blockType,
                            properties: defaultProperties
                          });
                        }
                      }}
                      className="mobile-canvas"
                    />
                    
                    {!currentPage && (
                      <div className="text-center py-8 text-gray-500">
                        <h3 className="text-sm font-medium mb-2">Nenhuma página selecionada</h3>
                        <p className="text-xs">Selecione uma página para começar a editar</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : deviceView === 'tablet' ? (
                <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg min-h-[calc(100vh-120px)] mx-auto">
                    <div className="p-6">
                      <DroppableCanvas
                        blocks={currentPage?.blocks || []}
                        selectedBlockId={selectedBlockId || undefined}
                        onBlockSelect={(blockId) => setSelectedBlock(blockId)}
                        onBlockDelete={deleteBlock}
                        onBlockDuplicate={(blockId) => {
                          const block = currentPage?.blocks.find(b => b.id === blockId);
                          if (block && currentPage) {
                            const newBlock = {
                              ...block,
                              id: `${block.type}-${Date.now()}`
                            };
                            const blockIndex = currentPage.blocks.findIndex(b => b.id === blockId);
                            const newBlocks = [...currentPage.blocks];
                            newBlocks.splice(blockIndex + 1, 0, newBlock);
                            updatePage(currentPage.id, { blocks: newBlocks });
                          }
                        }}
                        onBlockToggleVisibility={(blockId) => {
                          const block = currentPage?.blocks.find(b => b.id === blockId);
                          if (block && currentPage) {
                            const updatedBlock = {
                              ...block,
                              properties: {
                                ...block.properties,
                                hidden: !block.properties?.hidden
                              }
                            };
                            const newBlocks = currentPage.blocks.map(b => 
                              b.id === blockId ? updatedBlock : b
                            );
                            updatePage(currentPage.id, { blocks: newBlocks });
                          }
                        }}
                        onSaveInline={handleInlineEdit}
                        onAddBlock={(blockType) => {
                          // TODOS os componentes são permitidos agora
                          const definition = blockDefinitions.find(def => def.type === blockType);
                          if (definition) {
                            const defaultProperties: Record<string, any> = {};
                            definition.propertiesSchema?.forEach(prop => {
                              if (prop.defaultValue !== undefined) {
                                defaultProperties[prop.key] = prop.defaultValue;
                              }
                            });
                            addBlock({
                              type: blockType,
                              properties: defaultProperties
                            });
                          }
                        }}
                        className=""
                      />
                      
                      {!currentPage && (
                        <div className="text-center py-16 text-gray-500">
                          <h3 className="text-lg font-medium mb-2">Nenhuma página selecionada</h3>
                          <p className="text-sm">Selecione uma página para começar a editar.</p>
                        </div>
                      )}
                    </div>
                </div>
              ) : (
                <div className="w-full bg-white rounded-lg shadow-lg min-h-[calc(100vh-120px)]">
                    <div className="p-6">
                      <DroppableCanvas
                        blocks={currentPage?.blocks || []}
                        selectedBlockId={selectedBlockId || undefined}
                        onBlockSelect={(blockId) => setSelectedBlock(blockId)}
                        onBlockDelete={deleteBlock}
                        onBlockDuplicate={(blockId) => {
                          const block = currentPage?.blocks.find(b => b.id === blockId);
                          if (block && currentPage) {
                            const newBlock = {
                              ...block,
                              id: `${block.type}-${Date.now()}`
                            };
                            const blockIndex = currentPage.blocks.findIndex(b => b.id === blockId);
                            const newBlocks = [...currentPage.blocks];
                            newBlocks.splice(blockIndex + 1, 0, newBlock);
                            updatePage(currentPage.id, { blocks: newBlocks });
                          }
                        }}
                        onBlockToggleVisibility={(blockId) => {
                          const block = currentPage?.blocks.find(b => b.id === blockId);
                          if (block && currentPage) {
                            const updatedBlock = {
                              ...block,
                              properties: {
                                ...block.properties,
                                hidden: !block.properties?.hidden
                              }
                            };
                            const newBlocks = currentPage.blocks.map(b => 
                              b.id === blockId ? updatedBlock : b
                            );
                            updatePage(currentPage.id, { blocks: newBlocks });
                          }
                        }}
                        onSaveInline={handleInlineEdit}
                        onAddBlock={(blockType) => {
                          // TODOS os componentes são permitidos agora
                          const definition = blockDefinitions.find(def => def.type === blockType);
                          if (definition) {
                            const defaultProperties: Record<string, any> = {};
                            definition.propertiesSchema?.forEach(prop => {
                              if (prop.defaultValue !== undefined) {
                                defaultProperties[prop.key] = prop.defaultValue;
                              }
                            });
                            addBlock({
                              type: blockType,
                              properties: defaultProperties
                            });
                          }
                        }}
                        className=""
                      />
                      
                      {!currentPage && (
                        <div className="text-center py-16 text-gray-500">
                          <h3 className="text-lg font-medium mb-2">Nenhuma página selecionada</h3>
                          <p className="text-sm">Selecione uma página para começar a editar.</p>
                        </div>
                      )}
                    </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right Sidebar - Properties Panel */}
        {showRightSidebar && (
          <div className={`
            ${deviceView === 'mobile' 
              ? 'fixed top-14 right-0 bottom-0 w-72 z-50 bg-white shadow-xl border-l border-gray-300' 
              : deviceView === 'tablet'
              ? 'relative w-64 bg-white border-l border-gray-200'
              : 'relative w-80 bg-white border-l border-gray-200'
            } 
            flex flex-col
          `}>
            {/* Header with close button for mobile */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Propriedades</h2>
              {deviceView === 'mobile' && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowRightSidebar(false)}
                  className="h-8 w-8 p-0"
                >
                  ×
                </Button>
              )}
            </div>
            <div className="flex-1 overflow-hidden">
              <DynamicPropertiesPanel
                selectedBlock={selectedBlock}
                funnelConfig={funnel}
                onBlockPropertyChange={handleBlockPropertyChange}
                onNestedPropertyChange={handleNestedPropertyChange}
                onFunnelConfigChange={updateFunnelConfig}
              />
            </div>
        )}
        
        {/* Mobile Overlay */}
        {deviceView === 'mobile' && (showLeftSidebar || showRightSidebar) && (
          <div 
            className="mobile-overlay"
            onClick={() => {
              setShowLeftSidebar(false);
              setShowRightSidebar(false);
            }}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default SchemaDrivenEditorLayoutV2;
