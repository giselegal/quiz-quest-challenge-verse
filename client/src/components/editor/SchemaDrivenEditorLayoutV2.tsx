
import React, { useState, useEffect } from 'react';
import { DroppableCanvas } from './DroppableCanvas';
import { UniversalBlockRenderer } from './blocks/UniversalBlockRenderer';
import { useSchemaEditorFixed } from '@/hooks/useSchemaEditorFixed';
import { Block } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { Save, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface SchemaDrivenEditorLayoutV2Props {
  funnelId?: string;
}

const SchemaDrivenEditorLayoutV2: React.FC<SchemaDrivenEditorLayoutV2Props> = ({ 
  funnelId 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    funnel,
    currentPage,
    blocks,
    selectedBlock,
    loading,
    error: hookError,
    actions
  } = useSchemaEditorFixed(funnelId);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hookError) {
      setError(hookError);
      console.error('Schema Editor Error:', hookError);
    }
  }, [hookError]);

  const handleSave = async () => {
    try {
      await actions.saveFunnel();
      toast({
        title: "Sucesso",
        description: "Funil salvo com sucesso",
      });
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "Erro ao salvar",
        description: "Tente novamente em alguns instantes",
        variant: "destructive",
      });
    }
  };

  const handleAddBlock = (type: Block['type']) => {
    try {
      actions.addBlock(type);
    } catch (error) {
      console.error('Add block error:', error);
    }
  };

  const handleBlockSelect = (blockId: string | null) => {
    try {
      actions.selectBlock(blockId);
    } catch (error) {
      console.error('Block select error:', error);
    }
  };

  const handleBlockDelete = (blockId: string) => {
    try {
      actions.deleteBlock(blockId);
    } catch (error) {
      console.error('Block delete error:', error);
    }
  };

  const handleBlockDuplicate = (blockId: string) => {
    try {
      actions.duplicateBlock(blockId);
    } catch (error) {
      console.error('Block duplicate error:', error);
    }
  };

  const handleBlockToggleVisibility = (blockId: string) => {
    try {
      actions.toggleBlockVisibility(blockId);
    } catch (error) {
      console.error('Block visibility error:', error);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  if (isLoading || loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando editor...</p>
        </div>
      </div>
    );
  }

  if (error || hookError) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-semibold mb-4">Erro no Editor</h2>
          <p className="text-gray-600 mb-4">{error || hookError}</p>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Recarregar
          </Button>
        </div>
      </div>
    );
  }

  const pages = funnel?.pages || [];
  const currentPageData = currentPage || pages[0];

  return (
    <div className="h-screen flex flex-col">
      <div className="border-b bg-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">Editor de Funil</h1>
          {funnel?.name && (
            <span className="text-sm text-gray-500">- {funnel.name}</span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => actions.togglePreview?.()}
          >
            {actions.isPreviewing ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Editar
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </>
            )}
          </Button>
          
          <Button onClick={handleSave} size="sm">
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      {pages.length > 0 && (
        <div className="border-b bg-gray-50 p-2 flex gap-2 overflow-x-auto">
          {pages.slice(0, 10).map((page, index) => (
            <Button
              key={page.id || `page-${index}`}
              variant={currentPageData?.id === page.id ? "default" : "outline"}
              size="sm"
              onClick={() => actions.setCurrentPage?.(page.id)}
              className="min-w-0 flex-shrink-0"
            >
              {(page.name || `Página ${index + 1}`).slice(0, 12)}
            </Button>
          ))}
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-auto">
          <DroppableCanvas
            blocks={blocks}
            selectedBlockId={selectedBlock?.id || null}
            onBlockSelect={handleBlockSelect}
            onBlockDelete={handleBlockDelete}
            onBlockDuplicate={handleBlockDuplicate}
            onBlockToggleVisibility={handleBlockToggleVisibility}
            onSaveInline={handleSave}
            onAddBlock={handleAddBlock}
            renderBlock={(block) => (
              <UniversalBlockRenderer
                key={block.id}
                block={block}
                isSelected={selectedBlock?.id === block.id}
                isEditing={!actions.isPreviewing}
                onSelect={() => handleBlockSelect(block.id)}
                onUpdate={(updates: any) => actions.updateBlock?.(block.id, updates)}
                onDelete={() => handleBlockDelete(block.id)}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SchemaDrivenEditorLayoutV2;
