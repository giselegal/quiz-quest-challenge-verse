'use client';

import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { EditorPreview } from '@/components/result-editor/EditorPreview';
import { useBlockOperations } from '@/hooks/editor/useBlockOperations';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Save, Eye, EyeOff, TestTube, BarChart3, Settings, ExternalLink } from 'lucide-react';
import { Block } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import { QuizEditorPanel } from '@/components/editor/QuizEditorPanel';

// Mock data for testing
const mockStyleResult: StyleResult = {
  style: 'natural',
  points: 85,
  percentage: 85,
  rank: 1,
  category: 'natural',
  score: 85,
  description: 'Você tem um estilo natural e descontraído',
  imageUrl: 'https://example.com/natural.jpg',
  guideImageUrl: 'https://example.com/natural-guide.jpg'
};

export default function EditorPage() {
  const {
    blocks,
    selectedBlockId,
    setSelectedBlockId,
    actions: blockActions
  } = useBlockOperations();

  const [isPreviewing, setIsPreviewing] = useState(false);
  const [activeTab, setActiveTab] = useState<'components' | 'quiz'>('components');

  // Componentes disponíveis para adicionar
  const availableComponents = [
    { type: 'options-grid', name: 'Grid de Opções', icon: '⚡' },
    { type: 'text-inline', name: 'Texto', icon: '📝' },
    { type: 'heading-inline', name: 'Título', icon: '🔤' },
    { type: 'button-inline', name: 'Botão', icon: '🔘' },
    { type: 'image-display-inline', name: 'Imagem', icon: '🖼️' },
  ];

  const handleAddComponent = (type: Block['type']) => {
    console.log('🎯 Adicionando componente:', type);
    blockActions.handleAddBlock(type);
  };

  const handleSaveInline = (blockId: string, updates: any) => {
    console.log('💾 Editor Principal - onSaveInline:', { blockId, updates });
    
    // Aplicar mudanças usando o sistema de block operations
    if (updates.properties) {
      blockActions.handleUpdateBlock(blockId, updates.properties);
      console.log('✅ Bloco atualizado com sucesso!');
    }
  };

  const handleSaveProject = () => {
    console.log('💾 Salvando projeto:', { blocks });
    // Aqui você pode integrar com a API de salvamento
    alert(`Projeto salvo! ${blocks.length} blocos`);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">Editor Principal</h1>
          <div className="text-sm text-gray-500">
            {blocks.length} bloco{blocks.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPreviewing(!isPreviewing)}
          >
            {isPreviewing ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {isPreviewing ? 'Editar' : 'Visualizar'}
          </Button>
          
          <Button onClick={handleSaveProject} size="sm">
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Sidebar - Componentes */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full bg-white border-r border-gray-200 p-4">
              <h3 className="font-medium text-gray-900 mb-4">Componentes</h3>
              
              <div className="space-y-2">
                {availableComponents.map((component) => (
                  <Button
                    key={component.type}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => handleAddComponent(component.type)}
                  >
                    <span className="text-lg mr-3">{component.icon}</span>
                    <div>
                      <div className="font-medium text-sm">{component.name}</div>
                      <div className="text-xs text-gray-500">{component.type}</div>
                    </div>
                  </Button>
                ))}
              </div>

              <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 text-sm mb-2">💡 Teste o OptionsGrid</h4>
                <p className="text-xs text-blue-700">
                  Adicione um "Grid de Opções" e clique nas opções para ver o callback funcionando!
                </p>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Preview Area */}
          <ResizablePanel defaultSize={60}>
            <EditorPreview
              blocks={blocks}
              selectedBlockId={selectedBlockId}
              onSelectBlock={setSelectedBlockId}
              isPreviewing={isPreviewing}
              primaryStyle={mockStyleResult}
              onReorderBlocks={blockActions.handleReorderBlocks}
              onSaveInline={handleSaveInline}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Properties Panel */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full bg-white border-l border-gray-200 p-4">
              {selectedBlockId ? (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-900">Propriedades</h3>
                    <Button 
                      onClick={() => setSelectedBlockId(null)} 
                      size="sm" 
                      variant="ghost"
                    >
                      ✕
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo do Bloco
                      </label>
                      <div className="text-sm text-gray-500">
                        {blocks.find(b => b.id === selectedBlockId)?.type}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ID do Bloco
                      </label>
                      <div className="text-xs text-gray-500 font-mono">
                        {selectedBlockId}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <Button 
                        onClick={() => {
                          blockActions.handleDeleteBlock(selectedBlockId);
                          setSelectedBlockId(null);
                        }}
                        variant="destructive" 
                        size="sm"
                        className="w-full"
                      >
                        Remover Bloco
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 mt-8">
                  <div className="text-4xl mb-2">🎯</div>
                  <p className="text-sm">
                    Selecione um bloco para editar suas propriedades
                  </p>
                </div>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="h-8 bg-gray-800 text-white text-xs flex items-center px-4 gap-4">
          <span>🔧 Debug:</span>
          <span>Blocks: {blocks.length}</span>
          <span>Selected: {selectedBlockId || 'None'}</span>
          <span>Preview: {isPreviewing ? 'ON' : 'OFF'}</span>
        </div>
      )}
    </div>
  );
}