
import React, { useState, useEffect } from 'react';
import { useSchemaEditorFixed } from '@/hooks/useSchemaEditorFixed';
import { schemaDrivenFunnelService } from '@/services/schemaDrivenFunnelService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Play, 
  Save, 
  Settings, 
  Eye, 
  Smartphone, 
  Monitor,
  Layers,
  Edit3,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface SchemaDrivenEditorResponsiveProps {
  funnelId?: string;
}

const SchemaDrivenEditorResponsive: React.FC<SchemaDrivenEditorResponsiveProps> = ({ 
  funnelId 
}) => {
  const { toast } = useToast();
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showSidebar, setShowSidebar] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Hook principal com todas as 21 etapas
  const {
    funnel,
    currentPage,
    currentPageId,
    selectedBlock,
    isLoading,
    isSaving,
    autoSaveState,
    createNewFunnel,
    loadFunnel,
    saveFunnel,
    setCurrentPage,
    updateBlock,
    deleteBlock,
    addBlock,
    setSelectedBlock,
    enableAutoSave
  } = useSchemaEditorFixed(funnelId);

  // Inicialização do editor
  useEffect(() => {
    const initializeEditor = async () => {
      console.log('🚀 Inicializando SchemaDrivenEditorResponsive...');
      
      try {
        setIsInitialized(false);
        
        // Habilitar auto-save
        enableAutoSave(10);
        
        if (funnelId) {
          console.log('📂 Carregando funil existente:', funnelId);
          await loadFunnel(funnelId);
        } else {
          console.log('🆕 Criando novo funil com 21 etapas...');
          await createNewFunnel();
        }
        
        setIsInitialized(true);
        
        toast({
          title: "Editor Carregado",
          description: "21 etapas configuradas e prontas para edição!",
        });
        
      } catch (error) {
        console.error('❌ Erro ao inicializar editor:', error);
        toast({
          title: "Erro de Inicialização",
          description: "Falha ao carregar o editor. Tente novamente.",
          variant: "destructive",
        });
      }
    };

    initializeEditor();
  }, [funnelId, loadFunnel, createNewFunnel, enableAutoSave, toast]);

  // Handler para salvar manual
  const handleSave = async () => {
    try {
      await saveFunnel(true);
      toast({
        title: "Funil Salvo",
        description: "Todas as alterações foram salvas com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro ao Salvar",
        description: "Falha ao salvar. Verifique a conexão.",
        variant: "destructive",
      });
    }
  };

  // Handler para preview
  const handlePreview = () => {
    if (!currentPage) return;
    
    toast({
      title: "Preview Ativo",
      description: `Visualizando: ${currentPage.title}`,
    });
  };

  // Renderizar bloco no canvas
  const renderBlock = (block: any) => {
    const isSelected = selectedBlock?.id === block.id;
    
    return (
      <div
        key={block.id}
        className={cn(
          "border-2 border-dashed border-transparent p-2 rounded cursor-pointer transition-all",
          isSelected && "border-blue-500 bg-blue-50",
          "hover:border-gray-300"
        )}
        onClick={() => setSelectedBlock(block.id)}
      >
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {block.type}
          </Badge>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedBlock(block.id);
              }}
            >
              <Edit3 className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                deleteBlock(block.id);
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded border">
          {/* Renderização simplificada do bloco */}
          {block.type === 'heading-inline' && (
            <h3 className="font-bold text-lg">{block.properties?.content || 'Título'}</h3>
          )}
          {block.type === 'text-inline' && (
            <p className="text-sm">{block.properties?.content || 'Texto'}</p>
          )}
          {block.type === 'button-inline' && (
            <Button variant="outline" size="sm">
              {block.properties?.text || 'Botão'}
            </Button>
          )}
          {block.type === 'options-grid' && (
            <div className="grid grid-cols-2 gap-2">
              {block.properties?.options?.slice(0, 4).map((opt: any, i: number) => (
                <div key={i} className="border p-2 rounded text-xs">
                  {opt.text}
                </div>
              ))}
            </div>
          )}
          {!['heading-inline', 'text-inline', 'button-inline', 'options-grid'].includes(block.type) && (
            <div className="text-gray-500 text-sm">
              {block.type} component
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!isInitialized || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold">Carregando Editor...</h3>
          <p className="text-gray-600">Configurando 21 etapas do funil</p>
        </div>
      </div>
    );
  }

  if (!funnel) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Erro no Editor</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Não foi possível carregar o funil. Tente recarregar a página.
            </p>
            <Button onClick={() => window.location.reload()}>
              Recarregar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* SIDEBAR - Lista das 21 etapas */}
      <div className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300",
        showSidebar ? "w-80" : "w-0 overflow-hidden"
      )}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">21 Etapas</h2>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowSidebar(false)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <div className={cn(
                "w-2 h-2 rounded-full",
                autoSaveState.isEnabled ? "bg-green-500" : "bg-gray-400"
              )} />
              Auto-save: {autoSaveState.isEnabled ? 'Ativo' : 'Inativo'}
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {funnel.pages.map((page, index) => (
              <Card
                key={page.id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  currentPageId === page.id && "ring-2 ring-blue-500 bg-blue-50"
                )}
                onClick={() => setCurrentPage(page.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <Badge variant="secondary" className="text-xs">
                        {index + 1}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">
                        {page.name}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">
                        {page.type} • {page.blocks.length} blocos
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {!showSidebar && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowSidebar(true)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
              
              <div>
                <h1 className="font-bold text-xl">{funnel.name}</h1>
                <p className="text-sm text-gray-600">
                  {currentPage ? `Editando: ${currentPage.name}` : 'Selecione uma etapa'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Preview Mode Toggle */}
              <div className="flex items-center gap-1 border rounded-lg p-1">
                <Button
                  size="sm"
                  variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                  onClick={() => setPreviewMode('desktop')}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                  onClick={() => setPreviewMode('mobile')}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>

              <Separator orientation="vertical" className="h-6" />

              <Button size="sm" variant="outline" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>

              <Button 
                size="sm" 
                onClick={handleSave}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Salvando...' : 'Salvar'}
              </Button>

              <Button size="sm" variant="outline">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* CANVAS AREA */}
        <div className="flex-1 flex">
          {/* Canvas */}
          <div className="flex-1 p-6">
            <div className={cn(
              "mx-auto bg-white rounded-lg shadow-lg transition-all",
              previewMode === 'mobile' ? 'max-w-sm' : 'max-w-4xl'
            )}>
              {currentPage ? (
                <div className="p-6">
                  <div className="mb-4 pb-4 border-b">
                    <h2 className="font-bold text-xl text-gray-800">
                      {currentPage.title}
                    </h2>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{currentPage.type}</Badge>
                      <Badge variant="secondary">
                        {currentPage.blocks.length} blocos
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {currentPage.blocks.map(renderBlock)}
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const newBlock = {
                          type: 'text-inline',
                          properties: {
                            content: 'Novo texto',
                            fontSize: 'text-base',
                            textAlign: 'text-left',
                            color: '#000000'
                          }
                        };
                        addBlock(newBlock);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Bloco
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center text-gray-500">
                  <Layers className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold mb-2">Selecione uma etapa</h3>
                  <p>Escolha uma das 21 etapas na barra lateral para começar a editar</p>
                </div>
              )}
            </div>
          </div>

          {/* Properties Panel */}
          {selectedBlock && (
            <div className="w-80 bg-white border-l border-gray-200 p-4">
              <div className="mb-4">
                <h3 className="font-semibold text-lg">Propriedades</h3>
                <p className="text-sm text-gray-600">
                  Editando: {selectedBlock.type}
                </p>
              </div>

              <div className="space-y-4">
                {/* Propriedades básicas do bloco selecionado */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tipo do Bloco
                  </label>
                  <input
                    type="text"
                    value={selectedBlock.type}
                    disabled
                    className="w-full p-2 border rounded bg-gray-50"
                  />
                </div>

                {selectedBlock.properties?.content && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Conteúdo
                    </label>
                    <textarea
                      value={selectedBlock.properties.content}
                      onChange={(e) => updateBlock(selectedBlock.id, {
                        properties: {
                          ...selectedBlock.properties,
                          content: e.target.value
                        }
                      })}
                      className="w-full p-2 border rounded resize-none"
                      rows={3}
                    />
                  </div>
                )}

                {selectedBlock.properties?.text && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Texto do Botão
                    </label>
                    <input
                      type="text"
                      value={selectedBlock.properties.text}
                      onChange={(e) => updateBlock(selectedBlock.id, {
                        properties: {
                          ...selectedBlock.properties,
                          text: e.target.value
                        }
                      })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                )}

                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => deleteBlock(selectedBlock.id)}
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remover Bloco
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemaDrivenEditorResponsive;
