import React, { useState } from 'react';
import { SchemaDrivenComponentsSidebar } from './sidebar/SchemaDrivenComponentsSidebar';
import { DynamicPropertiesPanel } from './panels/DynamicPropertiesPanel';
import { BlockRenderer, BlockData } from './blocks';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { blockDefinitions } from '@/config/blockDefinitions';

interface SchemaDrivenEditorLayoutProps {
  initialBlocks?: BlockData[];
  onBlocksChange?: (blocks: BlockData[]) => void;
  funnelConfig?: {
    name?: string;
    description?: string;
    isPublished?: boolean;
    theme?: string;
  };
  onFunnelConfigChange?: (config: any) => void;
}

const SchemaDrivenEditorLayout: React.FC<SchemaDrivenEditorLayoutProps> = ({ 
  initialBlocks = [],
  onBlocksChange,
  funnelConfig = {
    name: 'Novo Funil',
    description: 'Descrição do funil',
    isPublished: false,
    theme: 'caktoquiz'
  },
  onFunnelConfigChange
}) => {
  const [blocks, setBlocks] = useState<BlockData[]>(initialBlocks);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('blocks');

  const selectedBlock = blocks.find(b => b.id === selectedBlockId) || null;

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

    const newBlock: BlockData = {
      id: `block-${Date.now()}`,
      type: blockType,
      properties: defaultProperties
    };

    const updatedBlocks = [...blocks, newBlock];
    setBlocks(updatedBlocks);
    setSelectedBlockId(newBlock.id);
    onBlocksChange?.(updatedBlocks);
  };

  // Handler para mudanças nas propriedades dos blocos
  const handleBlockPropertyChange = (key: string, value: any) => {
    if (!selectedBlockId) return;

    const updatedBlocks = blocks.map(block => 
      block.id === selectedBlockId 
        ? { ...block, properties: { ...block.properties, [key]: value } }
        : block
    );
    setBlocks(updatedBlocks);
    onBlocksChange?.(updatedBlocks);
  };

  // Handler para propriedades aninhadas
  const handleNestedPropertyChange = (path: string, value: any) => {
    if (!selectedBlockId) return;

    const keys = path.split('.');
    const updatedBlocks = blocks.map(block => {
      if (block.id !== selectedBlockId) return block;
      
      const newProperties = { ...block.properties };
      let target = newProperties;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!target[keys[i]]) target[keys[i]] = {};
        target = target[keys[i]];
      }
      target[keys[keys.length - 1]] = value;
      
      return { ...block, properties: newProperties };
    });

    setBlocks(updatedBlocks);
    onBlocksChange?.(updatedBlocks);
  };

  // Handler para seleção de bloco
  const handleBlockSelect = (blockId: string) => {
    setSelectedBlockId(blockId);
  };

  // Handler para remoção de bloco
  const handleBlockDelete = (blockId: string) => {
    const updatedBlocks = blocks.filter(block => block.id !== blockId);
    setBlocks(updatedBlocks);
    
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
    
    onBlocksChange?.(updatedBlocks);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Left Sidebar - Components Library */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <div className="h-full border-r border-[#B89B7A]/20 bg-white">
            <SchemaDrivenComponentsSidebar 
              onComponentSelect={handleComponentSelect}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Central Area - Canvas */}
        <ResizablePanel defaultSize={55}>
          <div className="h-full overflow-auto bg-gray-50">
            <div className="p-8">
              <div className="max-w-4xl mx-auto bg-white min-h-[800px] shadow-lg rounded-lg">
                <div className="p-6">
                  {/* Header do Canvas */}
                  <div className="border-b pb-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                          {funnelConfig.name}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {funnelConfig.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          funnelConfig.isPublished 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {funnelConfig.isPublished ? 'Publicado' : 'Rascunho'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Blocos do Funil */}
                  <div className="space-y-4">
                    {blocks.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium mb-2">Comece adicionando blocos</h3>
                        <p className="text-sm">
                          Selecione componentes da biblioteca à esquerda para começar a construir seu funil.
                        </p>
                      </div>
                    ) : (
                      blocks.map((block, index) => (
                        <div key={block.id} className="group relative">
                          <BlockRenderer
                            block={block}
                            isSelected={block.id === selectedBlockId}
                            onClick={() => handleBlockSelect(block.id)}
                          />
                          
                          {/* Botão de remoção */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBlockDelete(block.id);
                            }}
                            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Right Sidebar - Properties Panel */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
          <div className="h-full border-l border-[#B89B7A]/20 bg-white">
            <DynamicPropertiesPanel
              selectedBlock={selectedBlock}
              funnelConfig={funnelConfig}
              onBlockPropertyChange={handleBlockPropertyChange}
              onNestedPropertyChange={handleNestedPropertyChange}
              onFunnelConfigChange={onFunnelConfigChange || (() => {})}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default SchemaDrivenEditorLayout;
