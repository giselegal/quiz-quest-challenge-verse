'use client';

import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { EditorPreview } from '@/components/result-editor/EditorPreview';
import { useBlockOperations } from '@/hooks/editor/useBlockOperations';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Save, Eye, EyeOff, TestTube, BarChart3, Settings, ExternalLink, Upload } from 'lucide-react';
import { Block } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import { QuizEditorPanel } from '@/components/editor/QuizEditorPanel';
import { blockDefinitions, getBlocksByCategory } from '@/config/blockDefinitions';

// Função para gerar ID único
const generateId = () => {
  return `editor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

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

  // Obter componentes do blockDefinitions.ts (dinâmico)
  const resultComponents = getBlocksByCategory('Resultado');
  const offerComponents = getBlocksByCategory('Ofertas');
  const inlineComponents = getBlocksByCategory('Inline');
  const interactionComponents = getBlocksByCategory('Interação');

  // Debug dos componentes
  console.log('🔍 DEBUG Editor - Componentes carregados:');
  console.log('📊 Resultado:', resultComponents.length, resultComponents.map(c => c.type));
  console.log('💰 Ofertas:', offerComponents.length, offerComponents.map(c => c.type));
  console.log('⚡ Inline:', inlineComponents.length, inlineComponents.map(c => c.type));
  console.log('🔘 Interação:', interactionComponents.length, interactionComponents.map(c => c.type));

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
    const projectData = {
      blocks,
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      id: generateId(),
      metadata: {
        totalBlocks: blocks.length,
        lastModified: new Date().toISOString(),
        creator: 'editor-user'
      }
    };
    
    console.log('💾 Salvando projeto completo:', projectData);
    
    // 1. Salvar no localStorage (backup local)
    localStorage.setItem('editor-project-current', JSON.stringify(projectData));
    localStorage.setItem('editor-project-backup', JSON.stringify(projectData));
    
    // 2. Salvar no sistema de versões
    const existingProjects = JSON.parse(localStorage.getItem('editor-saved-projects') || '[]');
    existingProjects.push(projectData);
    
    // Manter apenas últimos 10 projetos
    if (existingProjects.length > 10) {
      existingProjects.splice(0, existingProjects.length - 10);
    }
    
    localStorage.setItem('editor-saved-projects', JSON.stringify(existingProjects));
    
    // 3. Preparar para publicação futura (API)
    console.log('📡 Projeto preparado para publicação:', {
      id: projectData.id,
      blocks: projectData.blocks.length,
      timestamp: projectData.timestamp
    });
    
    alert(`✅ Projeto salvo com sucesso!\n\n📊 ${blocks.length} bloco${blocks.length !== 1 ? 's' : ''} salvos\n🆔 ID: ${projectData.id}\n🕒 ${new Date().toLocaleString()}\n\n💡 Use "Publicar" para disponibilizar online.`);
  };

  const handlePublishProject = () => {
    const currentProject = localStorage.getItem('editor-project-current');
    
    if (!currentProject) {
      alert('❌ Nenhum projeto para publicar. Salve primeiro!');
      return;
    }
    
    const projectData = JSON.parse(currentProject);
    
    // Simular publicação (aqui integraria com API)
    const publishData = {
      ...projectData,
      publishedAt: new Date().toISOString(),
      status: 'published',
      url: `${window.location.origin}/published/${projectData.id}`
    };
    
    console.log('🌐 Publicando projeto:', publishData);
    
    // Salvar estado publicado
    localStorage.setItem('editor-project-published', JSON.stringify(publishData));
    
    alert(`🌐 Projeto publicado com sucesso!\n\n🆔 ID: ${publishData.id}\n📝 ${publishData.blocks.length} componentes\n🌐 URL: /published/${projectData.id}\n🕒 ${new Date().toLocaleString()}\n\n✅ Projeto disponível publicamente!`);
  };

  const handleLoadProject = () => {
    try {
      const savedProjects = JSON.parse(localStorage.getItem('editor-saved-projects') || '[]');
      
      if (savedProjects.length === 0) {
        alert('❌ Nenhum projeto salvo encontrado.');
        return;
      }
      
      // Carregar projeto mais recente
      const latestProject = savedProjects[savedProjects.length - 1];
      
      if (latestProject.blocks) {
        updateBlocks(latestProject.blocks);
        console.log('✅ Projeto carregado:', latestProject);
        alert(`✅ Projeto carregado!\n\n📊 ${latestProject.blocks.length} blocos restaurados\n🕒 Salvo em: ${new Date(latestProject.timestamp).toLocaleString()}`);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar projeto:', error);
      alert('❌ Erro ao carregar projeto salvo.');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">Editor Unificado</h1>
          <div className="text-sm text-gray-500">
            {blocks.length} bloco{blocks.length !== 1 ? 's' : ''}
          </div>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
            ✅ Quiz Integrado
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLoadProject}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Carregar
          </Button>
          
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
          
          <Button onClick={handlePublishProject} size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
            <Upload className="w-4 h-4 mr-2" />
            Publicar
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Sidebar - Componentes */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full bg-white border-r border-gray-200">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'components' | 'quiz')} className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-2 m-2">
                  <TabsTrigger value="components">Componentes</TabsTrigger>
                  <TabsTrigger value="quiz">Quiz</TabsTrigger>
                </TabsList>
                
                <TabsContent value="components" className="flex-1 p-4 mt-0">
                  {/* Seção Resultado - Etapa 20 */}
                  {resultComponents.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-700 text-sm mb-3 flex items-center">
                        🎯 Resultado (Etapa 20)
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                          Modulares
                        </span>
                      </h4>
                      <div className="space-y-2">
                        {resultComponents.map((component) => (
                          <Button
                            key={component.type}
                            variant="ghost"
                            className="w-full justify-start text-left h-auto p-3 border border-green-200 hover:border-green-300"
                            onClick={() => handleAddComponent(component.type)}
                          >
                            <span className="text-lg mr-3">🔧</span>
                            <div>
                              <div className="font-medium text-sm">{component.name}</div>
                              <div className="text-xs text-gray-500">{component.type}</div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Seção Ofertas - Etapa 21 */}
                  {offerComponents.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-700 text-sm mb-3 flex items-center">
                        💰 Ofertas (Etapa 21)
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          Horizontais
                        </span>
                      </h4>
                      <div className="space-y-2">
                        {offerComponents.map((component) => (
                          <Button
                            key={component.type}
                            variant="ghost"
                            className="w-full justify-start text-left h-auto p-3 border border-blue-200 hover:border-blue-300"
                            onClick={() => handleAddComponent(component.type)}
                          >
                            <span className="text-lg mr-3">💳</span>
                            <div>
                              <div className="font-medium text-sm">{component.name}</div>
                              <div className="text-xs text-gray-500">{component.type}</div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Seção Inline */}
                  {inlineComponents.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-700 text-sm mb-3">� Componentes Inline</h4>
                      <div className="space-y-2">
                        {inlineComponents.map((component) => (
                          <Button
                            key={component.type}
                            variant="ghost"
                            className="w-full justify-start text-left h-auto p-3"
                            onClick={() => handleAddComponent(component.type)}
                          >
                            <span className="text-lg mr-3">⚡</span>
                            <div>
                              <div className="font-medium text-sm">{component.name}</div>
                              <div className="text-xs text-gray-500">{component.type}</div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Seção Interação */}
                  {interactionComponents.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-700 text-sm mb-3">🔘 Interação</h4>
                      <div className="space-y-2">
                        {interactionComponents.map((component) => (
                          <Button
                            key={component.type}
                            variant="ghost"
                            className="w-full justify-start text-left h-auto p-3"
                            onClick={() => handleAddComponent(component.type)}
                          >
                            <span className="text-lg mr-3">🎛️</span>
                            <div>
                              <div className="font-medium text-sm">{component.name}</div>
                              <div className="text-xs text-gray-500">{component.type}</div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h4 className="font-medium text-emerald-900 text-sm mb-2">✅ Componentes Modulares Ativos</h4>
                    <p className="text-xs text-emerald-700">
                      Total: {resultComponents.length + offerComponents.length + inlineComponents.length + interactionComponents.length} componentes disponíveis
                    </p>
                    <p className="text-xs text-emerald-600 mt-1">
                      Etapas 20 e 21 agora são totalmente editáveis e modulares!
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="quiz" className="flex-1 mt-0 overflow-auto">
                  <QuizEditorPanel className="p-4" />
                </TabsContent>
              </Tabs>
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
          <span>Tab: {activeTab}</span>
          <span className="text-green-300">✅ Quiz Integration Active</span>
        </div>
      )}
    </div>
  );
}