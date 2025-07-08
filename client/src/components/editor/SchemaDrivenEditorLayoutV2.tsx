
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
  Users,
  BarChart3,
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
    <DndProvider
      blocks={currentPage?.blocks || []}
      onBlocksReorder={(newBlocks) => {
        if (currentPage) {
          updatePage(currentPage.id, { blocks: newBlocks });
        }
      }}
      onBlockAdd={(blockType) => {
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
    <div className={`h-screen flex flex-col overflow-hidden bg-gray-50 ${className}`}>
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
          {/* Status de sincronização compacto */}
          <div className="hidden sm:block">
            <SyncStatus
              autoSaveState={autoSaveState}
              isSaving={isSaving}
              isOnline={isOnline}
              onManualSave={() => saveFunnel(true)}
              onSync={syncWithBackend}
              onToggleAutoSave={handleToggleAutoSave}
              compact
            />
          </div>

          {/* Mobile Toggle Buttons */}
          {deviceView === 'mobile' && (
            <div className="flex space-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLeftSidebar(!showLeftSidebar)}
                className="px-2"
              >
                <Menu className="w-3 h-3" />
              </Button>
              <Button
                variant="outline" 
                size="sm"
                onClick={() => setShowRightSidebar(!showRightSidebar)}
                className="px-2"
              >
                <Settings className="w-3 h-3" />
              </Button>
            </div>
          )}

          {/* Device view controls - Mobile optimized */}
          <div className="flex border rounded-md">
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
          </div>

          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            <Eye className="w-4 h-4 mr-1" />
            <span className="hidden lg:inline">Preview</span>
          </Button>

          <Button 
            size="sm" 
            onClick={() => saveFunnel(true)}
            disabled={isSaving}
            className="bg-[#B89B7A] hover:bg-[#a08965] px-2 sm:px-3"
          >
            <Save className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
            <span className="hidden sm:inline">{isSaving ? 'Salvando...' : 'Salvar'}</span>
          </Button>
        </div>
      </div>

      {/* Main Content - Mobile Responsive Layout */}
      <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
        {/* Left Sidebar - Mobile: Show/Hide with toggle */}
        <div className={`
          ${deviceView === 'mobile' ? (showLeftSidebar ? 'block absolute left-0 top-0 bottom-0 z-50 bg-white shadow-lg' : 'hidden') : 'block'} 
          w-full sm:w-80 lg:w-96 h-full border-r border-gray-200 bg-white flex flex-col
        `}>
          {/* Close button for mobile */}
          {deviceView === 'mobile' && showLeftSidebar && (
            <div className="flex justify-end p-2 border-b">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowLeftSidebar(false)}
                className="h-8 w-8 p-0"
              >
                ×
              </Button>
            </div>
          )}
          <div className="flex-1 overflow-hidden">
            <SchemaDrivenComponentsSidebar 
              onComponentSelect={(type) => {
                handleComponentSelect(type);
                if (deviceView === 'mobile') setShowLeftSidebar(false);
              }}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              funnelPages={funnel.pages}
              currentPageId={currentPageId ?? undefined}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
        
        {/* Central Canvas - Mobile Optimized */}
        <div className="flex-1 h-full overflow-auto bg-gray-50">
          <div className={`flex justify-center ${
            deviceView === 'mobile' ? 'p-2' :
            deviceView === 'tablet' ? 'p-4' :
            'p-8'
          }`}>
            {/* Mobile/Tablet Preview - Show Full Editor Layout */}
            {deviceView === 'mobile' ? (
              <div className="w-[480px] min-h-[854px] bg-white shadow-lg overflow-hidden">
                {/* Full Editor Layout scaled for mobile */}
                <div className="h-full flex">
                  {/* Left Sidebar - Steps Panel */}
                  <div className="w-14 bg-gray-50 border-r overflow-hidden">
                    <div className="p-2 text-xs">
                      <div className="mb-3 text-center">
                        <span className="text-gray-600 font-bold text-sm">
                          {funnel?.pages.findIndex(p => p.id === currentPage?.id) + 1 || 1}
                        </span>
                        <div className="text-gray-500 text-xs">de {funnel?.pages.length || 0}</div>
                      </div>
                      {funnel?.pages.slice(0, 10).map((page, index) => (
                        <div 
                          key={page.id}
                          className={`w-8 h-8 mb-1 mx-auto rounded text-xs flex items-center justify-center cursor-pointer ${
                            page.id === currentPage?.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                          }`}
                          onClick={() => switchToPage(page.id)}
                        >
                          {index + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Middle - Components Sidebar */}
                  <div className="w-20 bg-white border-r overflow-hidden">
                    <div className="p-2">
                      <div className="text-xs text-gray-600 font-medium mb-2 text-center">Componentes</div>
                      <div className="space-y-2">
                        {blockDefinitions.slice(0, 8).map((definition) => (
                          <div
                            key={definition.type}
                            className="w-16 h-14 bg-gray-100 rounded text-xs flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200"
                            onMouseDown={() => {
                              const defaultProperties: Record<string, any> = {};
                              definition.propertiesSchema?.forEach(prop => {
                                if (prop.defaultValue !== undefined) {
                                  defaultProperties[prop.key] = prop.defaultValue;
                                }
                              });
                              addBlock({
                                type: definition.type,
                                properties: defaultProperties
                              });
                            }}
                          >
                            <span className="text-sm mb-1">{definition.icon}</span>
                            <span className="text-xs text-center leading-tight">{definition.label.slice(0, 8)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Canvas Area */}
                  <div className="flex-1 bg-gray-50 overflow-auto">
                    <div className="p-2">
                      <div className="bg-white rounded min-h-full">
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
                          onBlockUpdate={(blockId, updates) => {
                            updateBlock(blockId, updates);
                          }}
                          onReorder={reorderBlocks}
                          className="mobile-canvas p-2"
                        />
                        
                        {!currentPage && (
                          <div className="text-center py-8 text-gray-500">
                            <h3 className="text-sm font-medium mb-2">Nenhuma página selecionada</h3>
                            <p className="text-xs">Selecione uma página para começar a editar</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Sidebar - Properties */}
                  <div className="w-16 bg-white border-l overflow-hidden">
                    <div className="p-2">
                      <div className="text-xs text-gray-600 font-medium mb-2 text-center">Props</div>
                      {selectedBlockId && (
                        <div className="space-y-2">
                          <div className="w-12 h-8 bg-gray-100 rounded text-xs flex items-center justify-center">
                            Texto
                          </div>
                          <div className="w-12 h-8 bg-gray-100 rounded text-xs flex items-center justify-center">
                            Cor
                          </div>
                          <div className="w-12 h-8 bg-gray-100 rounded text-xs flex items-center justify-center">
                            Estilo
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : deviceView === 'tablet' ? (
              <div className="w-[768px] min-h-[1024px] bg-white shadow-lg overflow-hidden">
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
                      onBlockUpdate={(blockId, updates) => {
                        updateBlock(blockId, updates);
                      }}
                      onReorder={reorderBlocks}
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
              /* Desktop View */
              <div className="bg-white shadow-lg rounded-lg max-w-4xl min-h-[800px] w-full">
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
                    onBlockUpdate={(blockId, updates) => {
                      updateBlock(blockId, updates);
                    }}
                    onReorder={reorderBlocks}
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
        
        {/* Right Sidebar - Properties Panel - Mobile: Show/Hide with toggle */}
        <div className={`
          ${deviceView === 'mobile' ? (showRightSidebar ? 'block absolute right-0 top-0 bottom-0 z-50 bg-white shadow-lg' : 'hidden') : 'block'} 
          w-full sm:w-80 lg:w-96 h-full border-l border-gray-200 bg-white flex flex-col
        `}>
          {/* Close button for mobile */}
          {deviceView === 'mobile' && showRightSidebar && (
            <div className="flex justify-start p-2 border-b">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowRightSidebar(false)}
                className="h-8 w-8 p-0"
              >
                ×
              </Button>
            </div>
          )}
          <div className="flex-1 overflow-hidden">
            <DynamicPropertiesPanel
              selectedBlock={selectedBlock}
              funnelConfig={funnel}
              onBlockPropertyChange={handleBlockPropertyChange}
              onNestedPropertyChange={handleNestedPropertyChange}
              onFunnelConfigChange={updateFunnelConfig}
            />
          </div>
        </div>
        
        {/* Mobile Overlay */}
        {deviceView === 'mobile' && (showLeftSidebar || showRightSidebar) && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => {
              setShowLeftSidebar(false);
              setShowRightSidebar(false);
            }}
          />
        )}
      </div>
    </div>
    </DndProvider>
  );
};

export default SchemaDrivenEditorLayoutV2;
