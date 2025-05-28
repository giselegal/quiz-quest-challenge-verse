import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Copy, 
  Trash2, 
  Palette, 
  Type, 
  Image as ImageIcon,
  MousePointer,
  Layout,
  Link,
  Eye,
  EyeOff
} from 'lucide-react';

interface PropertiesPanelProps {
  selectedItem: any;
  step: any;
  onUpdateItem: (itemId: string, props: Record<string, any>) => void;
  onUpdateStep: (updates: any) => void;
  onDeleteItem: (itemId: string) => void;
  onDuplicateItem: (itemId: string) => void;
  collapsed: boolean;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedItem,
  step,
  onUpdateItem,
  onUpdateStep,
  onDeleteItem,
  onDuplicateItem,
  collapsed
}) => {
  if (collapsed) {
    return (
      <div className="p-4 text-center">
        <Settings className="w-6 h-6 mx-auto text-gray-400" />
      </div>
    );
  }

  if (!selectedItem) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">
          <Settings className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="font-medium mb-2">Nenhum item selecionado</h3>
          <p className="text-sm">Clique em um componente para editar suas propriedades</p>
        </div>
        
        {step && (
          <Card className="mt-8 p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Configurações da Etapa
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="showLogo" className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Mostrar Logo
                </Label>
                <Switch
                  id="showLogo"
                  checked={step.settings.showLogo}
                  onCheckedChange={(checked) => 
                    onUpdateStep({ settings: { ...step.settings, showLogo: checked } })
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="showProgress" className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full" />
                  Mostrar Progresso
                </Label>
                <Switch
                  id="showProgress"
                  checked={step.settings.showProgress}
                  onCheckedChange={(checked) => 
                    onUpdateStep({ settings: { ...step.settings, showProgress: checked } })
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="allowReturn" className="flex items-center gap-2">
                  <MousePointer className="w-4 h-4" />
                  Permitir Voltar
                </Label>
                <Switch
                  id="allowReturn"
                  checked={step.settings.allowReturn}
                  onCheckedChange={(checked) => 
                    onUpdateStep({ settings: { ...step.settings, allowReturn: checked } })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="isVisible" className="flex items-center gap-2">
                  {step.settings.isVisible ? 
                    <Eye className="w-4 h-4 text-green-500" /> : 
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  }
                  Visível
                </Label>
                <Switch
                  id="isVisible"
                  checked={step.settings.isVisible}
                  onCheckedChange={(checked) => 
                    onUpdateStep({ settings: { ...step.settings, isVisible: checked } })
                  }
                />
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  }

  const updateProp = (key: string, value: any) => {
    onUpdateItem(selectedItem.id, { [key]: value });
  };

  // Componente para controles de espaçamento
  const SpacingControls = () => (
    <div className="space-y-4">
      <div>
        <Label className="flex items-center gap-2 mb-2">
          Margens e Padding
        </Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs">Margin Top</Label>
            <Input
              type="number"
              value={selectedItem.props.marginTop || 0}
              onChange={(e) => updateProp('marginTop', parseInt(e.target.value))}
              min="0"
              className="h-8"
            />
          </div>
          <div>
            <Label className="text-xs">Margin Bottom</Label>
            <Input
              type="number"
              value={selectedItem.props.marginBottom || 0}
              onChange={(e) => updateProp('marginBottom', parseInt(e.target.value))}
              min="0"
              className="h-8"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Componente para animações
  const AnimationControls = () => (
    <div className="space-y-4">
      <div>
        <Label>Animação de Entrada</Label>
        <Select
          value={selectedItem.props.animation || 'none'}
          onValueChange={(value) => updateProp('animation', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Nenhuma</SelectItem>
            <SelectItem value="fadeIn">Fade In</SelectItem>
            <SelectItem value="slideUp">Slide Up</SelectItem>
            <SelectItem value="slideDown">Slide Down</SelectItem>
            <SelectItem value="zoomIn">Zoom In</SelectItem>
            <SelectItem value="bounceIn">Bounce In</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Duração (ms)</Label>
        <Slider
          value={[selectedItem.props.animationDuration || 300]}
          onValueChange={([value]) => updateProp('animationDuration', value)}
          min={100}
          max={2000}
          step={100}
          className="mt-2"
        />
        <span className="text-xs text-gray-500">{selectedItem.props.animationDuration || 300}ms</span>
      </div>

      <div>
        <Label>Delay (ms)</Label>
        <Slider
          value={[selectedItem.props.animationDelay || 0]}
          onValueChange={([value]) => updateProp('animationDelay', value)}
          min={0}
          max={2000}
          step={100}
          className="mt-2"
        />
        <span className="text-xs text-gray-500">{selectedItem.props.animationDelay || 0}ms</span>
      </div>
    </div>
  );

  const renderPropertyControls = () => {
    switch (selectedItem.type) {
      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <Label className="flex items-center gap-2">
                <Type className="w-4 h-4" />
                Conteúdo
              </Label>
              <Textarea
                value={selectedItem.props.content || ''}
                onChange={(e) => updateProp('content', e.target.value)}
                rows={4}
                placeholder="Digite seu texto aqui..."
                className="mt-1"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm">Tamanho</Label>
                <div className="mt-1">
                  <Slider
                    value={[selectedItem.props.fontSize || 16]}
                    onValueChange={([value]) => updateProp('fontSize', value)}
                    min={8}
                    max={72}
                    step={1}
                  />
                  <span className="text-xs text-gray-500 mt-1 block">{selectedItem.props.fontSize || 16}px</span>
                </div>
              </div>

              <div>
                <Label className="text-sm">Peso da Fonte</Label>
                <Select
                  value={selectedItem.props.fontWeight || 'normal'}
                  onValueChange={(value) => updateProp('fontWeight', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="300">Leve</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="500">Médio</SelectItem>
                    <SelectItem value="600">Semi-negrito</SelectItem>
                    <SelectItem value="bold">Negrito</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label className="text-sm">Cor do Texto</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  type="color"
                  value={selectedItem.props.color || '#432818'}
                  onChange={(e) => updateProp('color', e.target.value)}
                  className="w-16 h-8 p-1"
                />
                <Input
                  value={selectedItem.props.color || '#432818'}
                  onChange={(e) => updateProp('color', e.target.value)}
                  placeholder="#432818"
                  className="flex-1 h-8"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-sm">Alinhamento</Label>
              <Select
                value={selectedItem.props.textAlign || 'left'}
                onValueChange={(value) => updateProp('textAlign', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">⬅️ Esquerda</SelectItem>
                  <SelectItem value="center">⬆️ Centro</SelectItem>
                  <SelectItem value="right">➡️ Direita</SelectItem>
                  <SelectItem value="justify">📐 Justificado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm">Altura da Linha</Label>
              <Slider
                value={[selectedItem.props.lineHeight || 1.5]}
                onValueChange={([value]) => updateProp('lineHeight', value)}
                min={1}
                max={3}
                step={0.1}
                className="mt-1"
              />
              <span className="text-xs text-gray-500">{selectedItem.props.lineHeight || 1.5}</span>
            </div>
          </div>
        );

      case 'heading':
        return (
          <div className="space-y-4">
            <div>
              <Label className="flex items-center gap-2">
                <Type className="w-4 h-4" />
                Título
              </Label>
              <Input
                value={selectedItem.props.content || ''}
                onChange={(e) => updateProp('content', e.target.value)}
                placeholder="Digite o título..."
                className="mt-1"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm">Nível</Label>
                <Select
                  value={selectedItem.props.level?.toString() || '1'}
                  onValueChange={(value) => updateProp('level', parseInt(value))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">H1 - Principal</SelectItem>
                    <SelectItem value="2">H2 - Seção</SelectItem>
                    <SelectItem value="3">H3 - Subseção</SelectItem>
                    <SelectItem value="4">H4 - Tópico</SelectItem>
                    <SelectItem value="5">H5 - Subtópico</SelectItem>
                    <SelectItem value="6">H6 - Menor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm">Tamanho</Label>
                <div className="mt-1">
                  <Slider
                    value={[selectedItem.props.fontSize || 32]}
                    onValueChange={([value]) => updateProp('fontSize', value)}
                    min={16}
                    max={72}
                    step={1}
                  />
                  <span className="text-xs text-gray-500 mt-1 block">{selectedItem.props.fontSize || 32}px</span>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm">Cores</Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div>
                  <Label className="text-xs">Cor Principal</Label>
                  <Input
                    type="color"
                    value={selectedItem.props.color || '#432818'}
                    onChange={(e) => updateProp('color', e.target.value)}
                    className="w-full h-8 p-1 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Cor de Fundo</Label>
                  <Input
                    type="color"
                    value={selectedItem.props.backgroundColor || 'transparent'}
                    onChange={(e) => updateProp('backgroundColor', e.target.value)}
                    className="w-full h-8 p-1 mt-1"
                  />
                </div>
              </div>
            </div>
            
            <Card className="p-3 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center justify-between">
                <Label htmlFor="gradient" className="text-sm font-medium">✨ Texto Gradiente</Label>
                <Switch
                  id="gradient"
                  checked={selectedItem.props.gradient || false}
                  onCheckedChange={(checked) => updateProp('gradient', checked)}
                />
              </div>
              
              {selectedItem.props.gradient && (
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div>
                    <Label className="text-xs">Cor 1</Label>
                    <Input
                      type="color"
                      value={selectedItem.props.gradientFrom || '#3B82F6'}
                      onChange={(e) => updateProp('gradientFrom', e.target.value)}
                      className="w-full h-6 p-1 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Cor 2</Label>
                    <Input
                      type="color"
                      value={selectedItem.props.gradientTo || '#8B5CF6'}
                      onChange={(e) => updateProp('gradientTo', e.target.value)}
                      className="w-full h-6 p-1 mt-1"
                    />
                  </div>
                </div>
              )}
            </Card>
          </div>
        );

      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <Label className="flex items-center gap-2">
                <MousePointer className="w-4 h-4" />
                Texto do Botão
              </Label>
              <Input
                value={selectedItem.props.text || ''}
                onChange={(e) => updateProp('text', e.target.value)}
                placeholder="Clique aqui"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="flex items-center gap-2">
                <Link className="w-4 h-4" />
                Link/Ação
              </Label>
              <Input
                value={selectedItem.props.href || ''}
                onChange={(e) => updateProp('href', e.target.value)}
                placeholder="https://exemplo.com"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm">Estilo do Botão</Label>
              <Select
                value={selectedItem.props.variant || 'default'}
                onValueChange={(value) => updateProp('variant', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">🎯 Padrão</SelectItem>
                  <SelectItem value="outline">⭕ Outline</SelectItem>
                  <SelectItem value="ghost">👻 Ghost</SelectItem>
                  <SelectItem value="destructive">🚨 Destrutivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm">Cor de Fundo</Label>
                <Input
                  type="color"
                  value={selectedItem.props.backgroundColor || '#B89B7A'}
                  onChange={(e) => updateProp('backgroundColor', e.target.value)}
                  className="w-full h-8 p-1 mt-1"
                />
              </div>
              
              <div>
                <Label className="text-sm">Cor do Texto</Label>
                <Input
                  type="color"
                  value={selectedItem.props.textColor || '#ffffff'}
                  onChange={(e) => updateProp('textColor', e.target.value)}
                  className="w-full h-8 p-1 mt-1"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm">Tamanho</Label>
              <Select
                value={selectedItem.props.size || 'default'}
                onValueChange={(value) => updateProp('size', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sm">🔸 Pequeno</SelectItem>
                  <SelectItem value="default">🔷 Médio</SelectItem>
                  <SelectItem value="lg">🔶 Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="fullWidth" className="text-sm">📏 Largura Completa</Label>
                <Switch
                  id="fullWidth"
                  checked={selectedItem.props.fullWidth || false}
                  onCheckedChange={(checked) => updateProp('fullWidth', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="gradient" className="text-sm">✨ Gradiente</Label>
                <Switch
                  id="gradient"
                  checked={selectedItem.props.gradient || false}
                  onCheckedChange={(checked) => updateProp('gradient', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="disabled" className="text-sm">🚫 Desabilitado</Label>
                <Switch
                  id="disabled"
                  checked={selectedItem.props.disabled || false}
                  onCheckedChange={(checked) => updateProp('disabled', checked)}
                />
              </div>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <Label>URL da Imagem</Label>
              <Input
                value={selectedItem.props.src || ''}
                onChange={(e) => updateProp('src', e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
            
            <div>
              <Label>Texto Alternativo</Label>
              <Input
                value={selectedItem.props.alt || ''}
                onChange={(e) => updateProp('alt', e.target.value)}
              />
            </div>
            
            <div>
              <Label>Largura</Label>
              <div className="mt-2">
                <Slider
                  value={[selectedItem.props.width || 400]}
                  onValueChange={([value]) => updateProp('width', value)}
                  min={100}
                  max={800}
                  step={10}
                />
                <span className="text-xs text-gray-500">{selectedItem.props.width || 400}px</span>
              </div>
            </div>
            
            <div>
              <Label>Altura</Label>
              <div className="mt-2">
                <Slider
                  value={[selectedItem.props.height || 300]}
                  onValueChange={([value]) => updateProp('height', value)}
                  min={100}
                  max={600}
                  step={10}
                />
                <span className="text-xs text-gray-500">{selectedItem.props.height || 300}px</span>
              </div>
            </div>
            
            <div>
              <Label>Legenda</Label>
              <Input
                value={selectedItem.props.caption || ''}
                onChange={(e) => updateProp('caption', e.target.value)}
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500 py-8">
            <Palette className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">Propriedades não disponíveis para este componente</p>
            <Badge variant="outline" className="mt-2">
              {selectedItem.type}
            </Badge>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header com informações do componente */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              {selectedItem.type === 'text' && <Type className="w-4 h-4 text-blue-600" />}
              {selectedItem.type === 'heading' && <Type className="w-4 h-4 text-blue-600" />}
              {selectedItem.type === 'button' && <MousePointer className="w-4 h-4 text-blue-600" />}
              {selectedItem.type === 'image' && <ImageIcon className="w-4 h-4 text-blue-600" />}
            </div>
            <div>
              <h3 className="font-semibold capitalize">{selectedItem.type}</h3>
              <p className="text-xs text-gray-500">ID: {selectedItem.id.split('-')[0]}...</p>
            </div>
          </div>
          
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDuplicateItem(selectedItem.id)}
              className="h-8 w-8 p-0"
            >
              <Copy className="w-3 h-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDeleteItem(selectedItem.id)}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
        
        <Badge variant="secondary" className="text-xs">
          Posição: {selectedItem.position + 1}
        </Badge>
      </div>

      {/* Properties com tabs melhoradas */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-4 m-2">
            <TabsTrigger value="content" className="text-xs">📝 Conteúdo</TabsTrigger>
            <TabsTrigger value="style" className="text-xs">🎨 Estilo</TabsTrigger>
            <TabsTrigger value="layout" className="text-xs">📐 Layout</TabsTrigger>
            <TabsTrigger value="animation" className="text-xs">✨ Animação</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="p-4 space-y-4">
            {renderPropertyControls()}
          </TabsContent>
          
          <TabsContent value="style" className="p-4">
            <SpacingControls />
          </TabsContent>
          
          <TabsContent value="layout" className="p-4 space-y-4">
            <div>
              <Label className="text-sm font-medium">Visibilidade</Label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="visible" className="text-sm">👁️ Visível</Label>
                  <Switch
                    id="visible"
                    checked={selectedItem.props.visible !== false}
                    onCheckedChange={(checked) => updateProp('visible', checked)}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Responsividade</Label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="hideOnMobile" className="text-sm">📱 Ocultar no Mobile</Label>
                  <Switch
                    id="hideOnMobile"
                    checked={selectedItem.props.hideOnMobile || false}
                    onCheckedChange={(checked) => updateProp('hideOnMobile', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="hideOnTablet" className="text-sm">📟 Ocultar no Tablet</Label>
                  <Switch
                    id="hideOnTablet"
                    checked={selectedItem.props.hideOnTablet || false}
                    onCheckedChange={(checked) => updateProp('hideOnTablet', checked)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="animation" className="p-4">
            <AnimationControls />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
