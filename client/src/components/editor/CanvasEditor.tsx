import React, { useState, useCallback, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Eye, 
  EyeOff, 
  Trash2, 
  Move, 
  Edit3, 
  Copy, 
  ArrowUp, 
  ArrowDown,
  Save,
  Undo,
  Redo,
  Smartphone,
  Tablet,
  Monitor
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ComponentLibrarySidebar from './panels/ComponentLibrarySidebar';
import ComponentPropertiesPanel from './panels/ComponentPropertiesPanel';
import { 
  type EditableComponentConfig,
  getComponentConfig,
  getAllEditableComponents,
  validateComponentProps
} from './services/editableComponentsService';
import editableComponentsService from './services/editableComponentsService';
import { type FlexComponentConfig, renderFlexComponent } from './services/flexComponentsService';

interface CanvasEditorProps {
  className?: string;
}

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

interface ComponentInstance {
  id: string;
  componentPath: string;
  componentName: string;
  props: Record<string, any>;
  visible: boolean;
  order: number;
  type?: 'original' | 'flex'; // Tipo do componente
  flexType?: string; // Para componentes flexíveis
}

interface EditorState {
  components: ComponentInstance[];
  selectedComponentId: string | null;
  history: ComponentInstance[][];
  historyIndex: number;
  viewport: ViewportMode;
  isPreviewMode: boolean;
}

const CanvasEditor: React.FC<CanvasEditorProps> = ({ className }) => {
  const [editorState, setEditorState] = useState<EditorState>({
    components: [],
    selectedComponentId: null,
    history: [[]],
    historyIndex: 0,
    viewport: 'desktop',
    isPreviewMode: false
  });

  // Salvar estado no histórico
  const saveToHistory = useCallback((newComponents: ComponentInstance[]) => {
    setEditorState(prev => {
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push([...newComponents]);
      
      return {
        ...prev,
        components: newComponents,
        history: newHistory.slice(-50), // Manter apenas 50 estados
        historyIndex: Math.min(newHistory.length - 1, 49)
      };
    });
  }, []);

  // Adicionar componente original
  const handleAddComponent = useCallback((componentConfig: EditableComponentConfig & { path: string }) => {
    const newComponent: ComponentInstance = {
      id: `${componentConfig.componentName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      componentPath: componentConfig.path,
      componentName: componentConfig.componentName,
      props: componentConfig.defaultProps || {},
      visible: true,
      order: editorState.components.length,
      type: 'original'
    };

    const newComponents = [...editorState.components, newComponent];
    saveToHistory(newComponents);
  }, [editorState.components, saveToHistory]);

  // Adicionar componente flexível
  const handleAddFlexComponent = useCallback((componentConfig: FlexComponentConfig) => {
    const newComponent: ComponentInstance = {
      id: `${componentConfig.type}-${Date.now()}`,
      componentPath: componentConfig.type, // Usar o tipo como path para componentes flexíveis
      componentName: componentConfig.name,
      props: componentConfig.defaultProps || {},
      visible: true,
      order: editorState.components.length,
      type: 'flex',
      flexType: componentConfig.type
    };

    const newComponents = [...editorState.components, newComponent];
    saveToHistory(newComponents);
  }, [editorState.components, saveToHistory]);

  // Selecionar componente
  const handleSelectComponent = useCallback((componentId: string | null) => {
    setEditorState(prev => ({
      ...prev,
      selectedComponentId: componentId
    }));
  }, []);

  // Atualizar propriedades do componente
  const handleUpdateComponentProps = useCallback((componentId: string, newProps: Record<string, any>) => {
    const component = editorState.components.find(c => c.id === componentId);
    if (!component) return;

    const componentConfig = editableComponentsService.getComponentConfig(component.componentPath);
    if (!componentConfig) return;

    // Validar propriedades
    const validation = validateComponentProps(componentConfig, newProps);
    if (!validation.isValid) {
      console.warn('Propriedades inválidas:', validation.errors);
      return;
    }

    const newComponents = editorState.components.map(comp => 
      comp.id === componentId 
        ? { ...comp, props: { ...comp.props, ...newProps } }
        : comp
    );

    saveToHistory(newComponents);
  }, [editorState.components, saveToHistory]);

  // Remover componente
  const handleRemoveComponent = useCallback((componentId: string) => {
    const newComponents = editorState.components.filter(comp => comp.id !== componentId);
    saveToHistory(newComponents);
    
    if (editorState.selectedComponentId === componentId) {
      handleSelectComponent(null);
    }
  }, [editorState.components, editorState.selectedComponentId, saveToHistory, handleSelectComponent]);

  // Duplicar componente
  const handleDuplicateComponent = useCallback((componentId: string) => {
    const component = editorState.components.find(c => c.id === componentId);
    if (!component) return;

    const duplicatedComponent: ComponentInstance = {
      ...component,
      id: `${component.componentName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      order: editorState.components.length
    };

    const newComponents = [...editorState.components, duplicatedComponent];
    saveToHistory(newComponents);
  }, [editorState.components, saveToHistory]);

  // Mover componente
  const handleMoveComponent = useCallback((componentId: string, direction: 'up' | 'down') => {
    const currentIndex = editorState.components.findIndex(c => c.id === componentId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= editorState.components.length) return;

    const newComponents = [...editorState.components];
    [newComponents[currentIndex], newComponents[newIndex]] = [newComponents[newIndex], newComponents[currentIndex]];
    
    // Atualizar ordem
    newComponents.forEach((comp, index) => {
      comp.order = index;
    });

    saveToHistory(newComponents);
  }, [editorState.components, saveToHistory]);

  // Toggle visibilidade
  const handleToggleVisibility = useCallback((componentId: string) => {
    const newComponents = editorState.components.map(comp => 
      comp.id === componentId 
        ? { ...comp, visible: !comp.visible }
        : comp
    );

    saveToHistory(newComponents);
  }, [editorState.components, saveToHistory]);

  // Undo/Redo
  const handleUndo = useCallback(() => {
    if (editorState.historyIndex > 0) {
      setEditorState(prev => ({
        ...prev,
        components: prev.history[prev.historyIndex - 1],
        historyIndex: prev.historyIndex - 1
      }));
    }
  }, [editorState.historyIndex]);

  const handleRedo = useCallback(() => {
    if (editorState.historyIndex < editorState.history.length - 1) {
      setEditorState(prev => ({
        ...prev,
        components: prev.history[prev.historyIndex + 1],
        historyIndex: prev.historyIndex + 1
      }));
    }
  }, [editorState.historyIndex, editorState.history.length]);

  // Mudar viewport
  const handleViewportChange = useCallback((viewport: ViewportMode) => {
    setEditorState(prev => ({ ...prev, viewport }));
  }, []);

  // Toggle preview mode
  const handleTogglePreview = useCallback(() => {
    setEditorState(prev => ({ ...prev, isPreviewMode: !prev.isPreviewMode }));
  }, []);

  // Obter largura do canvas baseada no viewport
  const getCanvasWidth = useMemo(() => {
    switch (editorState.viewport) {
      case 'mobile': return 'max-w-sm';
      case 'tablet': return 'max-w-2xl';
      case 'desktop': return 'max-w-6xl';
      default: return 'max-w-6xl';
    }
  }, [editorState.viewport]);

  // Componente selecionado
  const selectedComponent = useMemo(() => 
    editorState.components.find(c => c.id === editorState.selectedComponentId)
  , [editorState.components, editorState.selectedComponentId]);

  // Renderizar componente no canvas
  const renderCanvasComponent = useCallback((component: ComponentInstance, index: number) => {
    const isSelected = component.id === editorState.selectedComponentId;
    const isVisible = component.visible;

    return (
      <div
        key={component.id}
        className={cn(
          "relative group",
          !isVisible && "opacity-50",
          isSelected && "ring-2 ring-[#B89B7A] ring-offset-2"
        )}
        onClick={(e) => {
          e.stopPropagation();
          handleSelectComponent(component.id);
        }}
      >
        {/* Overlay de controles */}
        {!editorState.isPreviewMode && (
          <div className={cn(
            "absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10",
            isSelected && "opacity-100"
          )}>
            <div className="absolute top-2 right-2 flex gap-1">
              <Badge variant="secondary" className="text-xs">
                {component.componentName}
              </Badge>
            </div>
            
            <div className="absolute bottom-2 right-2 flex gap-1">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleVisibility(component.id);
                }}
                className="h-7 w-7 p-0"
              >
                {isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMoveComponent(component.id, 'up');
                }}
                disabled={index === 0}
                className="h-7 w-7 p-0"
              >
                <ArrowUp className="w-3 h-3" />
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMoveComponent(component.id, 'down');
                }}
                disabled={index === editorState.components.length - 1}
                className="h-7 w-7 p-0"
              >
                <ArrowDown className="w-3 h-3" />
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDuplicateComponent(component.id);
                }}
                className="h-7 w-7 p-0"
              >
                <Copy className="w-3 h-3" />
              </Button>
              
              <Button
                size="sm"
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveComponent(component.id);
                }}
                className="h-7 w-7 p-0"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}

        {/* Renderizar o componente real */}
        <div className={cn(!isVisible && "pointer-events-none")}>
          {component.type === 'flex' && component.flexType 
            ? renderFlexComponent(component.flexType as any, component.props)
            : editableComponentsService.renderEditableComponent(component.componentPath, component.props)
          }
        </div>
      </div>
    );
  }, [
    editorState.selectedComponentId, 
    editorState.isPreviewMode,
    handleSelectComponent,
    handleToggleVisibility,
    handleMoveComponent,
    handleDuplicateComponent,
    handleRemoveComponent
  ]);

  return (
    <div className={cn("flex h-screen bg-gray-50", className)}>
      {/* Sidebar da Biblioteca de Componentes */}
      <div className="w-80 border-r bg-white overflow-y-auto">
        <ComponentLibrarySidebar 
          onAddComponent={handleAddComponent} 
          onAddFlexComponent={handleAddFlexComponent}
        />
      </div>

      {/* Canvas Principal */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="border-b bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-playfair text-[#432818]">
                Editor de Funil
              </h1>
              
              <Separator orientation="vertical" className="h-6" />
              
              {/* Controles de Histórico */}
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleUndo}
                  disabled={editorState.historyIndex === 0}
                >
                  <Undo className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleRedo}
                  disabled={editorState.historyIndex === editorState.history.length - 1}
                >
                  <Redo className="w-4 h-4" />
                </Button>
              </div>
              
              <Separator orientation="vertical" className="h-6" />
              
              {/* Controles de Viewport */}
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant={editorState.viewport === 'desktop' ? 'default' : 'outline'}
                  onClick={() => handleViewportChange('desktop')}
                >
                  <Monitor className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={editorState.viewport === 'tablet' ? 'default' : 'outline'}
                  onClick={() => handleViewportChange('tablet')}
                >
                  <Tablet className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={editorState.viewport === 'mobile' ? 'default' : 'outline'}
                  onClick={() => handleViewportChange('mobile')}
                >
                  <Smartphone className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleTogglePreview}
              >
                {editorState.isPreviewMode ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {editorState.isPreviewMode ? 'Editar' : 'Preview'}
              </Button>
              
              <Button size="sm" className="bg-[#B89B7A] hover:bg-[#aa6b5d]">
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className={cn("mx-auto transition-all duration-300", getCanvasWidth)}>
            {/* Canvas Container */}
            <Card 
              className="min-h-[600px] bg-white shadow-lg"
              onClick={() => handleSelectComponent(null)}
            >
              <div className="p-6 space-y-4">
                {editorState.components.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="text-gray-400 mb-4">
                      <Move className="w-12 h-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-600 mb-2">
                      Canvas Vazio
                    </h3>
                    <p className="text-gray-500">
                      Arraste componentes da biblioteca para começar a criar seu funil
                    </p>
                  </div>
                ) : (
                  editorState.components
                    .sort((a, b) => a.order - b.order)
                    .map((component, index) => renderCanvasComponent(component, index))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Panel de Propriedades */}
      <div className="w-80 border-l bg-white overflow-y-auto">
        <ComponentPropertiesPanel
          selectedComponent={selectedComponent}
          onUpdateProps={handleUpdateComponentProps}
        />
      </div>
    </div>
  );
};

export default CanvasEditor;
