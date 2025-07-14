import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Menu, 
  Settings, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Save, 
  Eye,
  Plus,
  Upload
} from 'lucide-react';
import { useSchemaEditorFixed as useSchemaEditor } from '@/hooks/useSchemaEditorFixed';
import { SchemaDrivenComponentsSidebar, DynamicPropertiesPanel, DroppableCanvas } from './index';
import { blockDefinitions } from '@/config/blockDefinitions';

interface SchemaDrivenEditorResponsiveProps {
  funnelId?: string;
  className?: string;
}

type DeviceView = 'mobile' | 'tablet' | 'desktop';

const SchemaDrivenEditorResponsive: React.FC<SchemaDrivenEditorResponsiveProps> = ({
  funnelId,
  className = ''
}) => {
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');
  const [showLeftSidebar, setShowLeftSidebar] = useState(true); 
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  const [activeTab, setActiveTab] = useState<'components' | 'pages'>('components');

  // Hook principal do editor
  const {
    funnel,
    currentPage,
    currentPageId,
    selectedBlock,
    selectedBlockId,
    setCurrentPage,
    setSelectedBlock,
    updatePage,
    updateFunnelConfig,
    addBlock,
    updateBlock,
    deleteBlock,
    saveFunnel,
    createNewFunnel,
    isLoading,
    isSaving
  } = useSchemaEditor(funnelId || undefined);

  // Handlers
  const handleComponentSelect = (type: string) => {
    const definition = blockDefinitions.find((def: any) => def.type === type);
    if (definition && currentPage) {
      const defaultProperties: Record<string, any> = {};
      definition.propertiesSchema?.forEach((prop: any) => {
        if (prop.defaultValue !== undefined) {
          defaultProperties[prop.key] = prop.defaultValue;
        }
      });
      addBlock({
        type,
        properties: defaultProperties
      });
    }
  };

  const handleBlockPropertyChange = (key: string, value: any) => {
    if (!selectedBlockId) return;
    const selectedBlock = currentPage?.blocks.find((b: any) => b.id === selectedBlockId);
    if (!selectedBlock) return;

    const newProperties = {
      ...selectedBlock.properties,
      [key]: value
    };

    updateBlock(selectedBlockId, { properties: newProperties });
  };

  const handleNestedPropertyChange = (path: string, value: any) => {
    if (!selectedBlockId) return;
    const selectedBlock = currentPage?.blocks.find((b: any) => b.id === selectedBlockId);
    if (!selectedBlock) return;

    const newProperties = { ...selectedBlock.properties };
    const pathArray = path.split('.');
    let current = newProperties;
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      if (!current[pathArray[i]]) current[pathArray[i]] = {};
      current = current[pathArray[i]];
    }
    
    current[pathArray[pathArray.length - 1]] = value;
    updateBlock(selectedBlockId, { properties: newProperties });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen bg-gray-50 ${className}`}>
      {/* Left Sidebar - Components/Pages */}
      {showLeftSidebar && (
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-900">
                Editor Visual
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLeftSidebar(false)}
              >
                <Menu className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 rounded-md p-1">
              <button
                className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'components'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('components')}
              >
                Componentes
              </button>
              <button
                className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'pages'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('pages')}
              >
                Páginas
              </button>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'components' ? (
              <SchemaDrivenComponentsSidebar
                onComponentSelect={handleComponentSelect}
              />
            ) : (
              <div className="p-4">
                <div className="space-y-2">
                  {funnel?.pages.map((page: any, index: number) => (
                    <button
                      key={page.id}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        currentPageId === page.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setCurrentPage(page.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">
                            {page.name || `Página ${index + 1}`}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {page.blocks.length} blocos
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {page.type}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
                
                <Button
                  className="w-full mt-4"
                  variant="outline"
                  onClick={() => {
                    // TODO: Implementar criação de nova página
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Página
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {!showLeftSidebar && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLeftSidebar(true)}
                >
                  <Menu className="w-4 h-4" />
                </Button>
              )}
              
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-900">
                  {funnel?.name || 'Funil Sem Nome'}
                </span>
                {isSaving && (
                  <Badge variant="secondary" className="text-xs">
                    Salvando...
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Device View Toggle */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-md p-1">
                <button
                  className={`p-1.5 rounded-md transition-colors ${
                    deviceView === 'mobile'
                      ? 'bg-white shadow-sm'
                      : 'hover:bg-gray-200'
                  }`}
                  onClick={() => setDeviceView('mobile')}
                  title="Visualização Mobile"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
                <button
                  className={`p-1.5 rounded-md transition-colors ${
                    deviceView === 'tablet'
                      ? 'bg-white shadow-sm'
                      : 'hover:bg-gray-200'
                  }`}
                  onClick={() => setDeviceView('tablet')}
                  title="Visualização Tablet"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  className={`p-1.5 rounded-md transition-colors ${
                    deviceView === 'desktop'
                      ? 'bg-white shadow-sm'
                      : 'hover:bg-gray-200'
                  }`}
                  onClick={() => setDeviceView('desktop')}
                  title="Visualização Desktop"
                >
                  <Monitor className="w-4 h-4" />
                </button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // TODO: Implementar preview
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>

              <Button
                variant="default"
                size="sm"
                onClick={() => saveFunnel()}
                disabled={isSaving}
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>

              {!showRightSidebar && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRightSidebar(true)}
                >
                  <Settings className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full p-4">
            <div className={`mx-auto bg-white rounded-lg shadow-lg overflow-hidden ${
              deviceView === 'mobile' ? 'max-w-sm' :
              deviceView === 'tablet' ? 'max-w-2xl' :
              'max-w-6xl'
            }`}>
              <DroppableCanvas
                page={currentPage}
                selectedBlockId={selectedBlockId || undefined}
                onSelectBlock={setSelectedBlock}
                onUpdateBlock={updateBlock}
                onDeleteBlock={deleteBlock}
                deviceView={deviceView}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Properties */}
      {showRightSidebar && (
        <div className="w-80 bg-white border-l border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Propriedades
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowRightSidebar(false)}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <DynamicPropertiesPanel
              selectedBlock={selectedBlock}
              onPropertyChange={handleBlockPropertyChange}
              onNestedPropertyChange={handleNestedPropertyChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SchemaDrivenEditorResponsive;