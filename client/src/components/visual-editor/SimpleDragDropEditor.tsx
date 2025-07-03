import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Save, Copy, Download, Upload, Eye, EyeOff, Settings, Palette, Layout, Type, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Types
interface SimpleComponent {
  id: string;
  type: 'title' | 'subtitle' | 'text' | 'button' | 'image' | 'input' | 'progress' | 'spacer';
  data: {
    text?: string;
    fontSize?: string;
    color?: string;
    backgroundColor?: string;
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
    progressValue?: number;
    showPercentage?: boolean;
    placeholder?: string;
    required?: boolean;
    buttonText?: string;
    buttonUrl?: string;
    variant?: string;
  };
  style: {
    margin?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    borderRadius?: string;
    border?: string;
    boxShadow?: string;
  };
}

interface SimplePage {
  id: string;
  title: string;
  type: 'intro' | 'question' | 'loading' | 'result' | 'offer' | 'transition' | 'sales' | 'checkout' | 'upsell' | 'thankyou' | 'webinar' | 'launch';
  progress: number;
  showHeader: boolean;
  showProgress: boolean;
  components: SimpleComponent[];
}

interface QuizFunnel {
  id: string;
  name: string;
  description: string;
  pages: SimplePage[];
  settings: {
    theme: string;
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    backgroundColor: string;
    containerMaxWidth: string;
  };
}

// Default templates
const defaultComponent = (type: SimpleComponent['type']): SimpleComponent => {
  const baseComponent = {
    id: `${type}-${Date.now()}`,
    type,
    style: {
      margin: '0',
      padding: '16px',
      textAlign: 'center' as const,
      borderRadius: '8px',
    }
  };

  switch (type) {
    case 'title':
      return {
        ...baseComponent,
        data: {
          text: 'Título Principal',
          fontSize: '32px',
          color: '#1a1a1a',
        }
      };
    case 'subtitle':
      return {
        ...baseComponent,
        data: {
          text: 'Subtítulo',
          fontSize: '20px',
          color: '#666666',
        }
      };
    case 'text':
      return {
        ...baseComponent,
        data: {
          text: 'Texto descritivo aqui...',
          fontSize: '16px',
          color: '#333333',
        }
      };
    case 'button':
      return {
        ...baseComponent,
        data: {
          buttonText: 'Clique Aqui',
          buttonUrl: '#',
          backgroundColor: '#007bff',
          color: '#ffffff',
          variant: 'default',
        }
      };
    case 'image':
      return {
        ...baseComponent,
        data: {
          src: 'https://via.placeholder.com/400x200',
          alt: 'Imagem',
          width: 400,
          height: 200,
        }
      };
    case 'input':
      return {
        ...baseComponent,
        data: {
          placeholder: 'Digite seu nome...',
          required: true,
        }
      };
    case 'progress':
      return {
        ...baseComponent,
        data: {
          progressValue: 50,
          showPercentage: true,
          backgroundColor: '#e5e5e5',
          color: '#007bff',
        }
      };
    case 'spacer':
      return {
        ...baseComponent,
        data: {
          height: 32,
        }
      };
    default:
      return baseComponent as SimpleComponent;
  }
};

const defaultPage: SimplePage = {
  id: 'page-1',
  title: 'Nova Página',
  type: 'intro',
  progress: 0,
  showHeader: true,
  showProgress: true,
  components: []
};

const defaultFunnel: QuizFunnel = {
  id: 'funnel-1',
  name: 'Novo Funil',
  description: 'Descrição do funil',
  pages: [defaultPage],
  settings: {
    theme: 'modern',
    primaryColor: '#007bff',
    secondaryColor: '#6c757d',
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#ffffff',
    containerMaxWidth: '800px',
  }
};

export default function SimpleDragDropEditor() {
  const [currentFunnel, setCurrentFunnel] = useState<QuizFunnel>(defaultFunnel);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const currentPage = currentFunnel.pages[currentPageIndex] || defaultPage;

  // Load saved config on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('simpleDragDropEditor');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        setCurrentFunnel(parsed);
      } catch (error) {
        console.error('Error loading saved config:', error);
      }
    }
  }, []);

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('simpleDragDropEditor', JSON.stringify(currentFunnel));
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentFunnel]);

  const addComponent = (type: SimpleComponent['type']) => {
    const newComponent = defaultComponent(type);
    setCurrentFunnel(prev => ({
      ...prev,
      pages: prev.pages.map((page, index) => 
        index === currentPageIndex 
          ? { ...page, components: [...page.components, newComponent] }
          : page
      )
    }));
    setSelectedComponent(newComponent.id);
    toast({ title: "Componente adicionado", description: `${type} foi adicionado à página` });
  };

  const updateComponent = (componentId: string, updates: Partial<SimpleComponent>) => {
    setCurrentFunnel(prev => ({
      ...prev,
      pages: prev.pages.map((page, index) => 
        index === currentPageIndex 
          ? {
              ...page,
              components: page.components.map(comp => 
                comp.id === componentId ? { ...comp, ...updates } : comp
              )
            }
          : page
      )
    }));
  };

  const deleteComponent = (componentId: string) => {
    setCurrentFunnel(prev => ({
      ...prev,
      pages: prev.pages.map((page, index) => 
        index === currentPageIndex 
          ? {
              ...page,
              components: page.components.filter(comp => comp.id !== componentId)
            }
          : page
      )
    }));
    setSelectedComponent(null);
    toast({ title: "Componente removido", description: "Componente foi removido da página" });
  };

  const addPage = () => {
    const newPage: SimplePage = {
      ...defaultPage,
      id: `page-${Date.now()}`,
      title: `Página ${currentFunnel.pages.length + 1}`
    };
    setCurrentFunnel(prev => ({
      ...prev,
      pages: [...prev.pages, newPage]
    }));
    setCurrentPageIndex(currentFunnel.pages.length);
    toast({ title: "Nova página", description: "Página adicionada ao funil" });
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      // Simulate save delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('simpleDragDropEditor', JSON.stringify(currentFunnel));
      toast({ title: "Salvo!", description: "Funil salvo com sucesso" });
    } catch (error) {
      toast({ title: "Erro", description: "Erro ao salvar funil", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const getDeviceClass = () => {
    switch (deviceView) {
      case 'mobile': return 'max-w-sm mx-auto';
      case 'tablet': return 'max-w-md mx-auto';
      default: return 'max-w-4xl mx-auto';
    }
  };

  const renderComponent = (component: SimpleComponent) => {
    const isSelected = selectedComponent === component.id;
    const baseClasses = `relative ${isSelected ? 'ring-2 ring-blue-500' : ''} group cursor-pointer`;

    switch (component.type) {
      case 'title':
        return (
          <div 
            key={component.id}
            className={baseClasses}
            onClick={() => setSelectedComponent(component.id)}
            style={component.style as React.CSSProperties}
          >
            <h1 
              style={{
                fontSize: component.data.fontSize,
                color: component.data.color,
                margin: 0
              }}
            >
              {component.data.text}
            </h1>
          </div>
        );
      
      case 'subtitle':
        return (
          <div 
            key={component.id}
            className={baseClasses}
            onClick={() => setSelectedComponent(component.id)}
            style={component.style as React.CSSProperties}
          >
            <h2 
              style={{
                fontSize: component.data.fontSize,
                color: component.data.color,
                margin: 0
              }}
            >
              {component.data.text}
            </h2>
          </div>
        );

      case 'text':
        return (
          <div 
            key={component.id}
            className={baseClasses}
            onClick={() => setSelectedComponent(component.id)}
            style={component.style as React.CSSProperties}
          >
            <p 
              style={{
                fontSize: component.data.fontSize,
                color: component.data.color,
                margin: 0
              }}
            >
              {component.data.text}
            </p>
          </div>
        );

      case 'button':
        return (
          <div 
            key={component.id}
            className={baseClasses}
            onClick={() => setSelectedComponent(component.id)}
            style={component.style as React.CSSProperties}
          >
            <Button 
              style={{
                backgroundColor: component.data.backgroundColor,
                color: component.data.color,
              }}
            >
              {component.data.buttonText}
            </Button>
          </div>
        );

      case 'image':
        return (
          <div 
            key={component.id}
            className={baseClasses}
            onClick={() => setSelectedComponent(component.id)}
            style={component.style as React.CSSProperties}
          >
            <img 
              src={component.data.src}
              alt={component.data.alt}
              style={{
                width: component.data.width,
                height: component.data.height,
                objectFit: 'cover'
              }}
            />
          </div>
        );

      case 'input':
        return (
          <div 
            key={component.id}
            className={baseClasses}
            onClick={() => setSelectedComponent(component.id)}
            style={component.style as React.CSSProperties}
          >
            <Input 
              placeholder={component.data.placeholder}
              required={component.data.required}
            />
          </div>
        );

      case 'progress':
        return (
          <div 
            key={component.id}
            className={baseClasses}
            onClick={() => setSelectedComponent(component.id)}
            style={component.style as React.CSSProperties}
          >
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${component.data.progressValue}%`,
                  backgroundColor: component.data.color
                }}
              />
            </div>
            {component.data.showPercentage && (
              <div className="text-sm text-center mt-2">
                {component.data.progressValue}%
              </div>
            )}
          </div>
        );

      case 'spacer':
        return (
          <div 
            key={component.id}
            className={baseClasses}
            onClick={() => setSelectedComponent(component.id)}
            style={{
              ...component.style,
              height: component.data.height,
              backgroundColor: isSelected ? '#f0f0f0' : 'transparent',
              border: isSelected ? '1px dashed #ccc' : 'none'
            } as React.CSSProperties}
          >
            {isSelected && (
              <div className="text-center text-gray-500 text-sm">
                Espaçador ({component.data.height}px)
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const renderPropertiesPanel = () => {
    if (!selectedComponent) {
      return (
        <div className="p-4 text-center text-gray-500">
          Selecione um componente para editá-lo
        </div>
      );
    }

    const component = currentPage.components.find(c => c.id === selectedComponent);
    if (!component) return null;

    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Propriedades</h3>
          <Button 
            size="sm" 
            variant="destructive"
            onClick={() => deleteComponent(component.id)}
          >
            Remover
          </Button>
        </div>

        {(component.type === 'title' || component.type === 'subtitle' || component.type === 'text') && (
          <>
            <div>
              <Label>Texto</Label>
              <Textarea 
                value={component.data.text || ''}
                onChange={(e) => updateComponent(component.id, {
                  data: { ...component.data, text: e.target.value }
                })}
              />
            </div>
            <div>
              <Label>Tamanho da Fonte</Label>
              <Input 
                value={component.data.fontSize || '16px'}
                onChange={(e) => updateComponent(component.id, {
                  data: { ...component.data, fontSize: e.target.value }
                })}
              />
            </div>
            <div>
              <Label>Cor</Label>
              <Input 
                type="color"
                value={component.data.color || '#000000'}
                onChange={(e) => updateComponent(component.id, {
                  data: { ...component.data, color: e.target.value }
                })}
              />
            </div>
          </>
        )}

        {component.type === 'button' && (
          <>
            <div>
              <Label>Texto do Botão</Label>
              <Input 
                value={component.data.buttonText || ''}
                onChange={(e) => updateComponent(component.id, {
                  data: { ...component.data, buttonText: e.target.value }
                })}
              />
            </div>
            <div>
              <Label>URL do Botão</Label>
              <Input 
                value={component.data.buttonUrl || ''}
                onChange={(e) => updateComponent(component.id, {
                  data: { ...component.data, buttonUrl: e.target.value }
                })}
              />
            </div>
            <div>
              <Label>Cor de Fundo</Label>
              <Input 
                type="color"
                value={component.data.backgroundColor || '#007bff'}
                onChange={(e) => updateComponent(component.id, {
                  data: { ...component.data, backgroundColor: e.target.value }
                })}
              />
            </div>
            <div>
              <Label>Cor do Texto</Label>
              <Input 
                type="color"
                value={component.data.color || '#ffffff'}
                onChange={(e) => updateComponent(component.id, {
                  data: { ...component.data, color: e.target.value }
                })}
              />
            </div>
          </>
        )}

        {component.type === 'image' && (
          <>
            <div>
              <Label>URL da Imagem</Label>
              <Input 
                value={component.data.src || ''}
                onChange={(e) => updateComponent(component.id, {
                  data: { ...component.data, src: e.target.value }
                })}
              />
            </div>
            <div>
              <Label>Texto Alternativo</Label>
              <Input 
                value={component.data.alt || ''}
                onChange={(e) => updateComponent(component.id, {
                  data: { ...component.data, alt: e.target.value }
                })}
              />
            </div>
            <div>
              <Label>Largura (px)</Label>
              <Input 
                type="number"
                value={component.data.width || 400}
                onChange={(e) => updateComponent(component.id, {
                  data: { ...component.data, width: parseInt(e.target.value) }
                })}
              />
            </div>
            <div>
              <Label>Altura (px)</Label>
              <Input 
                type="number"
                value={component.data.height || 200}
                onChange={(e) => updateComponent(component.id, {
                  data: { ...component.data, height: parseInt(e.target.value) }
                })}
              />
            </div>
          </>
        )}

        {component.type === 'input' && (
          <>
            <div>
              <Label>Placeholder</Label>
              <Input 
                value={component.data.placeholder || ''}
                onChange={(e) => updateComponent(component.id, {
                  data: { ...component.data, placeholder: e.target.value }
                })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={component.data.required || false}
                onCheckedChange={(checked) => updateComponent(component.id, {
                  data: { ...component.data, required: checked }
                })}
              />
              <Label>Campo obrigatório</Label>
            </div>
          </>
        )}

        {component.type === 'progress' && (
          <>
            <div>
              <Label>Valor do Progresso (%)</Label>
              <Input 
                type="number"
                min="0"
                max="100"
                value={component.data.progressValue || 0}
                onChange={(e) => updateComponent(component.id, {
                  data: { ...component.data, progressValue: parseInt(e.target.value) }
                })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={component.data.showPercentage || false}
                onCheckedChange={(checked) => updateComponent(component.id, {
                  data: { ...component.data, showPercentage: checked }
                })}
              />
              <Label>Mostrar porcentagem</Label>
            </div>
          </>
        )}

        {component.type === 'spacer' && (
          <div>
            <Label>Altura (px)</Label>
            <Input 
              type="number"
              value={component.data.height || 32}
              onChange={(e) => updateComponent(component.id, {
                data: { ...component.data, height: parseInt(e.target.value) }
              })}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen flex">
      {/* Left Sidebar - Components & Pages */}
      <div className="w-80 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-bold text-lg">Editor Visual</h2>
          <p className="text-sm text-gray-600">Arraste e solte componentes</p>
        </div>

        <Tabs defaultValue="components" className="flex-1">
          <TabsList className="w-full">
            <TabsTrigger value="components">Componentes</TabsTrigger>
            <TabsTrigger value="pages">Páginas</TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="p-4 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => addComponent('title')}
                className="flex items-center gap-2"
              >
                <Type className="h-4 w-4" />
                Título
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => addComponent('subtitle')}
                className="flex items-center gap-2"
              >
                <Type className="h-4 w-4" />
                Subtítulo
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => addComponent('text')}
                className="flex items-center gap-2"
              >
                <Type className="h-4 w-4" />
                Texto
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => addComponent('button')}
                className="flex items-center gap-2"
              >
                <Layout className="h-4 w-4" />
                Botão
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => addComponent('image')}
                className="flex items-center gap-2"
              >
                <Image className="h-4 w-4" />
                Imagem
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => addComponent('input')}
                className="flex items-center gap-2"
              >
                <Layout className="h-4 w-4" />
                Input
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => addComponent('progress')}
                className="flex items-center gap-2"
              >
                <Layout className="h-4 w-4" />
                Progresso
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => addComponent('spacer')}
                className="flex items-center gap-2"
              >
                <Layout className="h-4 w-4" />
                Espaço
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="pages" className="p-4">
            <div className="space-y-2">
              <Button 
                onClick={addPage}
                className="w-full"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nova Página
              </Button>
              
              <div className="space-y-1">
                {currentFunnel.pages.map((page, index) => (
                  <Button
                    key={page.id}
                    variant={index === currentPageIndex ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setCurrentPageIndex(index)}
                  >
                    {page.title}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Actions */}
        <div className="p-4 border-t space-y-2">
          <Button 
            onClick={saveChanges}
            disabled={isSaving}
            className="w-full"
          >
            {isSaving ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border border-current border-t-transparent mr-2" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Center - Preview */}
      <div className="flex-1 bg-gray-50 flex flex-col">
        {/* Device Selector */}
        <div className="bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{currentPage.title}</Badge>
            <span className="text-sm text-gray-500">
              {currentPageIndex + 1} de {currentFunnel.pages.length}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={deviceView === 'desktop' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDeviceView('desktop')}
            >
              Desktop
            </Button>
            <Button
              variant={deviceView === 'tablet' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDeviceView('tablet')}
            >
              Tablet
            </Button>
            <Button
              variant={deviceView === 'mobile' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDeviceView('mobile')}
            >
              Mobile
            </Button>
          </div>
        </div>

        {/* Preview Area */}
        <ScrollArea className="flex-1 p-8">
          <div className={`${getDeviceClass()} bg-white rounded-lg shadow-lg min-h-96 p-6`}>
            {currentPage.components.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <Layout className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>Adicione componentes para começar</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {currentPage.components.map(component => renderComponent(component))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Right Sidebar - Properties */}
      <div className="w-80 bg-white border-l">
        <div className="p-4 border-b">
          <h3 className="font-medium">Propriedades</h3>
        </div>
        <ScrollArea className="flex-1">
          {renderPropertiesPanel()}
        </ScrollArea>
      </div>
    </div>
  );
}