import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// Componentes UI
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

// Ícones
import {
  Save, Eye, Monitor, Tablet, Smartphone, Settings, Plus, Trash2, Copy,
  GripVertical, Edit3, Image as ImageIcon, Type, MousePointer, Layout,
  BarChart3, Users, HelpCircle, Gift, Clock, ArrowRight, Play, FileText,
  Palette, Zap, Target, ChevronDown, ChevronRight
} from 'lucide-react';

// Interfaces para o Editor de Funil CaktoQuiz Style
interface FunnelPage {
  id: string;
  title: string;
  type: 'intro' | 'question' | 'strategic' | 'main-transition' | 'final-transition' | 'result' | 'result-variant-b' | 'offer' | 'thank-you';
  order: number;
  isActive: boolean;
  settings: {
    showProgress: boolean;
    progressValue: number;
    backgroundColor: string;
    textColor: string;
    maxWidth: string;
  };
  blocks: FunnelBlock[];
}

interface FunnelBlock {
  id: string;
  type: 'heading' | 'text' | 'image' | 'button' | 'input' | 'question' | 'options' | 'progress' | 'video' | 'divider' | 'loading-animation' | 'transition-text' | 'style-result-display' | 'sales-offer' | 'testimonials-grid' | 'guarantee-section' | 'strategic-question';
  order: number;
  settings: {
    content?: string;
    style?: {
      fontSize?: string;
      fontWeight?: string;
      textAlign?: 'left' | 'center' | 'right';
      color?: string;
      backgroundColor?: string;
      padding?: string;
      margin?: string;
      borderRadius?: string;
      border?: string;
    };
    // Configurações específicas por tipo
    src?: string; // para imagem/video
    alt?: string;
    placeholder?: string; // para input
    options?: Array<{
      id: string;
      text: string;
      image?: string;
      value: string;
    }>;
    maxSelections?: number;
    required?: boolean;
    buttonText?: string;
    href?: string;
  };
}

interface FunnelConfig {
  id: string;
  name: string;
  description: string;
  domain: string;
  isPublished: boolean;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
  };
  integrations: {
    analytics: {
      googleAnalyticsId?: string;
      facebookPixelId?: string;
    };
    webhook: {
      url?: string;
      events: string[];
    };
  };
}

// Templates baseados no CaktoQuiz real
const FUNNEL_TEMPLATES = {
  styleQuiz: {
    name: "Quiz de Estilo Pessoal",
    description: "Template completo baseado no quiz funcionante",
    pages: [
      {
        id: 'intro',
        title: 'Introdução',
        type: 'intro' as const,
        order: 1,
        isActive: true,
        settings: {
          showProgress: true,
          progressValue: 7.14,
          backgroundColor: '#ffffff',
          textColor: '#2c2c2c',
          maxWidth: '600px'
        },
        blocks: [
          {
            id: 'logo',
            type: 'image' as const,
            order: 1,
            settings: {
              src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
              alt: 'Logo Gisele Galvão',
              style: {
                textAlign: 'center',
                margin: '0 0 2rem 0'
              }
            }
          },
          {
            id: 'title',
            type: 'heading' as const,
            order: 2,
            settings: {
              content: 'Teste de Estilo Pessoal',
              style: {
                fontSize: '1.875rem',
                fontWeight: '700',
                textAlign: 'center',
                margin: '0 0 1rem 0'
              }
            }
          },
          {
            id: 'hero-image',
            type: 'image' as const,
            order: 3,
            settings: {
              src: 'https://cakto-quiz-br01.b-cdn.net/uploads/ecbe689b-1c0a-4071-98d3-4d391b6dd98f.png',
              alt: 'Quiz Hero Image',
              style: {
                textAlign: 'center',
                borderRadius: '0.5rem',
                margin: '0 0 1rem 0'
              }
            }
          },
          {
            id: 'name-input',
            type: 'input' as const,
            order: 4,
            settings: {
              placeholder: 'Digite seu nome aqui..',
              required: true,
              style: {
                margin: '0 0 1rem 0'
              }
            }
          },
          {
            id: 'continue-button',
            type: 'button' as const,
            order: 5,
            settings: {
              buttonText: 'Continuar',
              style: {
                backgroundColor: 'hsl(var(--primary))',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                textAlign: 'center'
              }
            }
          }
        ]
      }
    ]
  }
};

const BLOCK_LIBRARY = [
  {
    id: 'heading',
    name: 'Título',
    icon: Type,
    category: 'Texto',
    description: 'Adicionar um título (H1, H2, H3)',
    defaultSettings: {
      content: 'Novo Título',
      style: {
        fontSize: '1.5rem',
        fontWeight: '600',
        textAlign: 'center' as const,
        margin: '0 0 1rem 0'
      }
    }
  },
  {
    id: 'text',
    name: 'Parágrafo',
    icon: FileText,
    category: 'Texto',
    description: 'Adicionar texto/parágrafo',
    defaultSettings: {
      content: 'Digite seu texto aqui...',
      style: {
        fontSize: '1rem',
        textAlign: 'left' as const,
        margin: '0 0 1rem 0'
      }
    }
  },
  {
    id: 'image',
    name: 'Imagem',
    icon: ImageIcon,
    category: 'Mídia',
    description: 'Adicionar uma imagem',
    defaultSettings: {
      src: '/placeholder.svg',
      alt: 'Imagem',
      style: {
        textAlign: 'center' as const,
        margin: '0 0 1rem 0'
      }
    }
  },
  {
    id: 'button',
    name: 'Botão',
    icon: MousePointer,
    category: 'Interação',
    description: 'Botão de ação/CTA',
    defaultSettings: {
      buttonText: 'Clique Aqui',
      style: {
        backgroundColor: '#3b82f6',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.375rem',
        textAlign: 'center' as const,
        margin: '0 0 1rem 0'
      }
    }
  },
  {
    id: 'input',
    name: 'Campo de Entrada',
    icon: Edit3,
    category: 'Formulário',
    description: 'Campo de texto/email',
    defaultSettings: {
      placeholder: 'Digite aqui...',
      required: false,
      style: {
        margin: '0 0 1rem 0'
      }
    }
  },
  {
    id: 'question',
    name: 'Pergunta Quiz',
    icon: HelpCircle,
    category: 'Quiz',
    description: 'Pergunta do quiz com opções',
    defaultSettings: {
      content: 'Qual é a sua pergunta?',
      style: {
        fontSize: '1.25rem',
        fontWeight: '600',
        textAlign: 'center' as const,
        margin: '0 0 1.5rem 0'
      }
    }
  },
  {
    id: 'options',
    name: 'Opções Múltiplas',
    icon: Layout,
    category: 'Quiz',
    description: 'Opções de resposta do quiz',
    defaultSettings: {
      options: [
        { id: '1', text: 'Opção 1', value: 'option1' },
        { id: '2', text: 'Opção 2', value: 'option2' },
        { id: '3', text: 'Opção 3', value: 'option3' }
      ],
      maxSelections: 1,
      style: {
        margin: '0 0 1rem 0'
      }
    }
  },
  {
    id: 'progress',
    name: 'Barra de Progresso',
    icon: BarChart3,
    category: 'UI',
    description: 'Barra de progresso do quiz',
    defaultSettings: {
      progressValue: 50,
      style: {
        margin: '0 0 1rem 0'
      }
    }
  }
];

const CaktoQuizAdvancedEditor: React.FC = () => {
  const { toast } = useToast();
  
  // Estados principais
  const [funnel, setFunnel] = useState<{
    config: FunnelConfig;
    pages: FunnelPage[];
  }>({
    config: {
      id: 'funnel-1',
      name: 'Quiz de Estilo Pessoal',
      description: 'Descubra seu estilo personalizado',
      domain: 'https://quiz.cakto.com.br',
      isPublished: false,
      theme: {
        primaryColor: '#3b82f6',
        secondaryColor: '#1e40af',
        backgroundColor: '#ffffff',
        textColor: '#1f2937',
        fontFamily: 'Inter, sans-serif'
      },
      seo: {
        title: 'Teste de Estilo Pessoal',
        description: 'Descubra seu estilo pessoal único',
        keywords: 'quiz, estilo, moda, personalidade',
        ogImage: ''
      },
      integrations: {
        analytics: {},
        webhook: { events: [] }
      }
    },
    pages: []
  });

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('pages');
  const [deviceView, setDeviceView] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [draggedBlock, setDraggedBlock] = useState<any>(null);

  const currentPage = funnel.pages[currentPageIndex];
  const selectedBlock = currentPage?.blocks.find(block => block.id === selectedBlockId);

  // Inicializar com template
  useEffect(() => {
    if (funnel.pages.length === 0) {
      setFunnel(prev => ({
        ...prev,
        pages: FUNNEL_TEMPLATES.styleQuiz.pages
      }));
    }
  }, []);

  // Função para adicionar nova página
  const addNewPage = (type: FunnelPage['type']) => {
    const newPage: FunnelPage = {
      id: `page-${Date.now()}`,
      title: `Nova ${type === 'intro' ? 'Introdução' : 
                    type === 'question' ? 'Pergunta' : 
                    type === 'result' ? 'Resultado' : 'Página'}`,
      type,
      order: funnel.pages.length + 1,
      isActive: true,
      settings: {
        showProgress: type !== 'intro',
        progressValue: Math.round((funnel.pages.length + 1) / 10 * 100),
        backgroundColor: '#ffffff',
        textColor: '#2c2c2c',
        maxWidth: '600px'
      },
      blocks: []
    };

    setFunnel(prev => ({
      ...prev,
      pages: [...prev.pages, newPage]
    }));
    
    setCurrentPageIndex(funnel.pages.length);
    
    toast({
      title: "✅ Página adicionada!",
      description: `Nova página ${newPage.title} criada.`,
    });
  };

  // Função para adicionar novo bloco
  const addBlock = (blockType: string) => {
    if (!currentPage) return;

    const blockTemplate = BLOCK_LIBRARY.find(b => b.id === blockType);
    if (!blockTemplate) return;

    const newBlock: FunnelBlock = {
      id: `block-${Date.now()}`,
      type: blockType as any,
      order: currentPage.blocks.length + 1,
      settings: { ...blockTemplate.defaultSettings }
    };

    const updatedPages = [...funnel.pages];
    updatedPages[currentPageIndex] = {
      ...currentPage,
      blocks: [...currentPage.blocks, newBlock]
    };

    setFunnel(prev => ({
      ...prev,
      pages: updatedPages
    }));

    setSelectedBlockId(newBlock.id);

    toast({
      title: "✅ Bloco adicionado!",
      description: `${blockTemplate.name} adicionado à página.`,
    });
  };

  // Função para atualizar bloco
  const updateBlock = (blockId: string, updates: Partial<FunnelBlock>) => {
    if (!currentPage) return;

    const updatedPages = [...funnel.pages];
    const pageIndex = currentPageIndex;
    const blockIndex = currentPage.blocks.findIndex(b => b.id === blockId);
    
    if (blockIndex !== -1) {
      updatedPages[pageIndex] = {
        ...currentPage,
        blocks: currentPage.blocks.map((block, index) => 
          index === blockIndex ? { ...block, ...updates } : block
        )
      };

      setFunnel(prev => ({
        ...prev,
        pages: updatedPages
      }));
    }
  };

  // Função para deletar bloco
  const deleteBlock = (blockId: string) => {
    if (!currentPage) return;

    const updatedPages = [...funnel.pages];
    updatedPages[currentPageIndex] = {
      ...currentPage,
      blocks: currentPage.blocks.filter(block => block.id !== blockId)
    };

    setFunnel(prev => ({
      ...prev,
      pages: updatedPages
    }));

    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }

    toast({
      title: "🗑️ Bloco removido!",
      description: "Bloco deletado da página.",
    });
  };

  // Função para renderizar bloco no canvas
  const renderBlock = (block: FunnelBlock) => {
    const isSelected = selectedBlockId === block.id;
    
    const blockStyle = {
      ...block.settings.style,
      border: isSelected ? '2px solid #3b82f6' : '2px solid transparent',
      borderRadius: '4px',
      position: 'relative' as const,
      minHeight: '40px',
      cursor: 'pointer'
    };

    const handleBlockClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedBlockId(block.id);
    };

    let content = null;

    switch (block.type) {
      case 'heading':
        content = (
          <h1 style={blockStyle} onClick={handleBlockClick}>
            {block.settings.content || 'Título'}
          </h1>
        );
        break;
        
      case 'text':
        content = (
          <p style={blockStyle} onClick={handleBlockClick}>
            {block.settings.content || 'Texto'}
          </p>
        );
        break;
        
      case 'image':
        content = (
          <div style={{ ...blockStyle, textAlign: block.settings.style?.textAlign || 'center' }} onClick={handleBlockClick}>
            <img 
              src={block.settings.src || '/placeholder.svg'} 
              alt={block.settings.alt || 'Imagem'}
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }}
            />
          </div>
        );
        break;
        
      case 'button':
        content = (
          <div style={{ ...blockStyle, textAlign: block.settings.style?.textAlign || 'center' }} onClick={handleBlockClick}>
            <button 
              style={{
                backgroundColor: block.settings.style?.backgroundColor || '#3b82f6',
                color: block.settings.style?.color || 'white',
                padding: block.settings.style?.padding || '0.75rem 1.5rem',
                borderRadius: block.settings.style?.borderRadius || '0.375rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              {block.settings.buttonText || 'Botão'}
            </button>
          </div>
        );
        break;
        
      case 'input':
        content = (
          <div style={blockStyle} onClick={handleBlockClick}>
            <input 
              type="text"
              placeholder={block.settings.placeholder || 'Digite aqui...'}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            />
          </div>
        );
        break;
        
      case 'question':
        content = (
          <div style={blockStyle} onClick={handleBlockClick}>
            <h2 style={{ 
              fontSize: block.settings.style?.fontSize || '1.25rem',
              fontWeight: block.settings.style?.fontWeight || '600',
              textAlign: block.settings.style?.textAlign || 'center',
              margin: '0'
            }}>
              {block.settings.content || 'Pergunta do Quiz'}
            </h2>
          </div>
        );
        break;
        
      case 'options':
        content = (
          <div style={blockStyle} onClick={handleBlockClick}>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {block.settings.options?.map((option, index) => (
                <div 
                  key={option.id}
                  style={{
                    padding: '1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {option.text}
                </div>
              )) || (
                <div style={{ padding: '1rem', border: '2px dashed #d1d5db', borderRadius: '0.5rem' }}>
                  Adicione opções...
                </div>
              )}
            </div>
          </div>
        );
        break;
        
      case 'progress':
        content = (
          <div style={blockStyle} onClick={handleBlockClick}>
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${block.settings.progressValue || 0}%`,
                height: '100%',
                backgroundColor: '#3b82f6',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        );
        break;
        
      default:
        content = (
          <div style={blockStyle} onClick={handleBlockClick}>
            <p>Bloco desconhecido: {block.type}</p>
          </div>
        );
    }

    return (
      <div key={block.id} className="relative group">
        {content}
        {isSelected && (
          <div className="absolute -top-8 right-0 flex gap-1 bg-white border rounded shadow-lg p-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => deleteBlock(block.id)}
              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                // Implementar duplicação
                const duplicatedBlock = {
                  ...block,
                  id: `block-${Date.now()}`,
                  order: block.order + 1
                };
                const updatedPages = [...funnel.pages];
                updatedPages[currentPageIndex] = {
                  ...currentPage,
                  blocks: [...currentPage.blocks, duplicatedBlock]
                };
                setFunnel(prev => ({ ...prev, pages: updatedPages }));
              }}
              className="h-6 w-6 p-0"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  // Função para renderizar painel de propriedades
  const renderPropertiesPanel = () => {
    if (!selectedBlock) {
      return (
        <div className="text-center text-muted-foreground mt-8">
          <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Selecione um bloco para editar suas propriedades</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm">
            Editando: {BLOCK_LIBRARY.find(b => b.id === selectedBlock.type)?.name || selectedBlock.type}
          </h3>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSelectedBlockId(null)}
            className="h-6 w-6 p-0"
          >
            ×
          </Button>
        </div>

        {/* Propriedades específicas por tipo de bloco */}
        {(selectedBlock.type === 'heading' || selectedBlock.type === 'text' || selectedBlock.type === 'question') && (
          <div>
            <Label className="text-xs">Conteúdo</Label>
            <Textarea
              value={selectedBlock.settings.content || ''}
              onChange={(e) => updateBlock(selectedBlock.id, {
                settings: { ...selectedBlock.settings, content: e.target.value }
              })}
              className="text-sm resize-none mt-1"
              rows={3}
            />
          </div>
        )}

        {selectedBlock.type === 'image' && (
          <div>
            <Label className="text-xs">URL da Imagem</Label>
            <Input
              value={selectedBlock.settings.src || ''}
              onChange={(e) => updateBlock(selectedBlock.id, {
                settings: { ...selectedBlock.settings, src: e.target.value }
              })}
              className="text-sm h-8 mt-1"
              placeholder="https://exemplo.com/imagem.jpg"
            />
            <Label className="text-xs mt-2 block">Texto Alternativo</Label>
            <Input
              value={selectedBlock.settings.alt || ''}
              onChange={(e) => updateBlock(selectedBlock.id, {
                settings: { ...selectedBlock.settings, alt: e.target.value }
              })}
              className="text-sm h-8 mt-1"
              placeholder="Descrição da imagem"
            />
          </div>
        )}

        {selectedBlock.type === 'button' && (
          <div>
            <Label className="text-xs">Texto do Botão</Label>
            <Input
              value={selectedBlock.settings.buttonText || ''}
              onChange={(e) => updateBlock(selectedBlock.id, {
                settings: { ...selectedBlock.settings, buttonText: e.target.value }
              })}
              className="text-sm h-8 mt-1"
            />
            <Label className="text-xs mt-2 block">Cor de Fundo</Label>
            <Input
              type="color"
              value={selectedBlock.settings.style?.backgroundColor || '#3b82f6'}
              onChange={(e) => updateBlock(selectedBlock.id, {
                settings: { 
                  ...selectedBlock.settings, 
                  style: { 
                    ...selectedBlock.settings.style, 
                    backgroundColor: e.target.value 
                  }
                }
              })}
              className="text-sm h-8 mt-1"
            />
          </div>
        )}

        {selectedBlock.type === 'input' && (
          <div>
            <Label className="text-xs">Placeholder</Label>
            <Input
              value={selectedBlock.settings.placeholder || ''}
              onChange={(e) => updateBlock(selectedBlock.id, {
                settings: { ...selectedBlock.settings, placeholder: e.target.value }
              })}
              className="text-sm h-8 mt-1"
            />
            <div className="flex items-center space-x-2 mt-2">
              <Switch
                checked={selectedBlock.settings.required || false}
                onCheckedChange={(checked) => updateBlock(selectedBlock.id, {
                  settings: { ...selectedBlock.settings, required: checked }
                })}
              />
              <Label className="text-xs">Campo obrigatório</Label>
            </div>
          </div>
        )}

        {selectedBlock.type === 'options' && (
          <div>
            <Label className="text-xs">Opções de Resposta</Label>
            <div className="space-y-2 mt-2">
              {selectedBlock.settings.options?.map((option, index) => (
                <div key={option.id} className="flex gap-2">
                  <Input
                    value={option.text}
                    onChange={(e) => {
                      const updatedOptions = [...(selectedBlock.settings.options || [])];
                      updatedOptions[index] = { ...option, text: e.target.value };
                      updateBlock(selectedBlock.id, {
                        settings: { ...selectedBlock.settings, options: updatedOptions }
                      });
                    }}
                    className="text-sm h-8 flex-1"
                    placeholder={`Opção ${index + 1}`}
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      const updatedOptions = selectedBlock.settings.options?.filter((_, i) => i !== index) || [];
                      updateBlock(selectedBlock.id, {
                        settings: { ...selectedBlock.settings, options: updatedOptions }
                      });
                    }}
                    className="h-8 w-8 p-0 text-red-500"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )) || []}
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const newOption = {
                    id: `option-${Date.now()}`,
                    text: `Nova opção`,
                    value: `option-${Date.now()}`
                  };
                  const updatedOptions = [...(selectedBlock.settings.options || []), newOption];
                  updateBlock(selectedBlock.id, {
                    settings: { ...selectedBlock.settings, options: updatedOptions }
                  });
                }}
                className="w-full h-8"
              >
                <Plus className="h-3 w-3 mr-1" />
                Adicionar Opção
              </Button>
            </div>
          </div>
        )}

        {selectedBlock.type === 'progress' && (
          <div>
            <Label className="text-xs">Valor do Progresso (%)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={selectedBlock.settings.progressValue || 0}
              onChange={(e) => updateBlock(selectedBlock.id, {
                settings: { ...selectedBlock.settings, progressValue: parseInt(e.target.value) || 0 }
              })}
              className="text-sm h-8 mt-1"
            />
          </div>
        )}

        {/* Estilos comuns */}
        <div className="border-t pt-4">
          <h4 className="text-xs font-medium mb-2">Estilo</h4>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Tamanho da Fonte</Label>
              <Select
                value={selectedBlock.settings.style?.fontSize || '1rem'}
                onValueChange={(value) => updateBlock(selectedBlock.id, {
                  settings: { 
                    ...selectedBlock.settings, 
                    style: { ...selectedBlock.settings.style, fontSize: value }
                  }
                })}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.75rem">Pequeno</SelectItem>
                  <SelectItem value="1rem">Normal</SelectItem>
                  <SelectItem value="1.25rem">Médio</SelectItem>
                  <SelectItem value="1.5rem">Grande</SelectItem>
                  <SelectItem value="1.875rem">Extra Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-xs">Alinhamento</Label>
              <Select
                value={selectedBlock.settings.style?.textAlign || 'left'}
                onValueChange={(value: 'left' | 'center' | 'right') => updateBlock(selectedBlock.id, {
                  settings: { 
                    ...selectedBlock.settings, 
                    style: { ...selectedBlock.settings.style, textAlign: value }
                  }
                })}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Esquerda</SelectItem>
                  <SelectItem value="center">Centro</SelectItem>
                  <SelectItem value="right">Direita</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedBlock.type !== 'image' && (
            <div className="mt-2">
              <Label className="text-xs">Cor do Texto</Label>
              <Input
                type="color"
                value={selectedBlock.settings.style?.color || '#000000'}
                onChange={(e) => updateBlock(selectedBlock.id, {
                  settings: { 
                    ...selectedBlock.settings, 
                    style: { ...selectedBlock.settings.style, color: e.target.value }
                  }
                })}
                className="text-sm h-8 mt-1"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex bg-background">
      {/* SIDEBAR: Páginas e Blocos */}
      <div className="w-80 border-r bg-slate-50 flex flex-col">
        <div className="p-4 border-b bg-white">
          <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            🎯 CaktoQuiz Advanced Editor
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Editor de funil estilo CaktoQuiz
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 m-2">
            <TabsTrigger value="pages" className="text-xs">Páginas</TabsTrigger>
            <TabsTrigger value="blocks" className="text-xs">Blocos</TabsTrigger>
            <TabsTrigger value="config" className="text-xs">Config</TabsTrigger>
          </TabsList>

          <TabsContent value="pages" className="flex-1 p-2">
            <ScrollArea className="h-full">
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">Páginas do Funil</h3>
                  <Button size="sm" variant="outline" className="h-6 text-xs">
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                
                {funnel.pages.map((page, index) => (
                  <Card 
                    key={page.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      currentPageIndex === index ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => setCurrentPageIndex(index)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant={page.type === 'intro' ? 'default' : 'secondary'} className="text-xs">
                            {index + 1}
                          </Badge>
                          <div>
                            <p className="text-sm font-medium truncate">{page.title}</p>
                            <p className="text-xs text-muted-foreground capitalize">{page.type}</p>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {page.blocks.length} blocos
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Botões para adicionar páginas */}
                <div className="space-y-1 pt-2 border-t">
                  <p className="text-xs text-muted-foreground mb-2">Adicionar Página:</p>
                  {[
                    { type: 'intro' as const, label: 'Introdução', icon: '🏠' },
                    { type: 'question' as const, label: 'Pergunta', icon: '❓' },
                    { type: 'result' as const, label: 'Resultado', icon: '🎯' },
                    { type: 'offer' as const, label: 'Oferta', icon: '💰' }
                  ].map(pageType => (
                    <Button
                      key={pageType.type}
                      size="sm"
                      variant="outline"
                      onClick={() => addNewPage(pageType.type)}
                      className="w-full justify-start h-8 text-xs"
                    >
                      {pageType.icon} {pageType.label}
                    </Button>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="blocks" className="flex-1 p-2">
            <ScrollArea className="h-full">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Biblioteca de Blocos</h3>
                
                {['Texto', 'Mídia', 'Interação', 'Formulário', 'Quiz', 'UI'].map(category => (
                  <div key={category}>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                      {category}
                    </h4>
                    <div className="space-y-1">
                      {BLOCK_LIBRARY.filter(block => block.category === category).map(block => {
                        const Icon = block.icon;
                        return (
                          <Button
                            key={block.id}
                            size="sm"
                            variant="outline"
                            onClick={() => addBlock(block.id)}
                            className="w-full justify-start h-10 text-xs"
                            disabled={!currentPage}
                          >
                            <Icon className="h-3 w-3 mr-2" />
                            <div className="text-left">
                              <div className="font-medium">{block.name}</div>
                              <div className="text-xs text-muted-foreground">{block.description}</div>
                            </div>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="config" className="flex-1 p-2">
            <ScrollArea className="h-full">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Configurações do Funil</h3>
                
                <div>
                  <Label className="text-xs">Nome do Funil</Label>
                  <Input
                    value={funnel.config.name}
                    onChange={(e) => setFunnel(prev => ({
                      ...prev,
                      config: { ...prev.config, name: e.target.value }
                    }))}
                    className="text-sm h-8 mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs">Descrição</Label>
                  <Textarea
                    value={funnel.config.description}
                    onChange={(e) => setFunnel(prev => ({
                      ...prev,
                      config: { ...prev.config, description: e.target.value }
                    }))}
                    className="text-sm resize-none mt-1"
                    rows={3}
                  />
                </div>

                <div>
                  <Label className="text-xs">Domínio</Label>
                  <Input
                    value={funnel.config.domain}
                    onChange={(e) => setFunnel(prev => ({
                      ...prev,
                      config: { ...prev.config, domain: e.target.value }
                    }))}
                    className="text-sm h-8 mt-1"
                    placeholder="https://quiz.cakto.com.br"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={funnel.config.isPublished}
                    onCheckedChange={(checked) => setFunnel(prev => ({
                      ...prev,
                      config: { ...prev.config, isPublished: checked }
                    }))}
                  />
                  <Label className="text-xs">Funil Publicado</Label>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* CANVAS PRINCIPAL */}
      <div className="flex-1 flex flex-col">
        {/* Header do Canvas */}
        <div className="h-14 border-b bg-white flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs">
              Página {currentPageIndex + 1} de {funnel.pages.length}
            </Badge>
            <span className="text-sm font-medium">
              {currentPage?.title || 'Nenhuma página selecionada'}
            </span>
            <Badge variant="secondary" className="text-xs capitalize">
              {currentPage?.type}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {/* Device View */}
            <div className="flex gap-1">
              <Button
                variant={deviceView === 'mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDeviceView('mobile')}
                className="h-8 w-8 p-0"
              >
                <Smartphone className="h-3 w-3" />
              </Button>
              <Button
                variant={deviceView === 'tablet' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDeviceView('tablet')}
                className="h-8 w-8 p-0"
              >
                <Tablet className="h-3 w-3" />
              </Button>
              <Button
                variant={deviceView === 'desktop' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDeviceView('desktop')}
                className="h-8 w-8 p-0"
              >
                <Monitor className="h-3 w-3" />
              </Button>
            </div>

            <Button
              variant={isPreviewMode ? 'default' : 'outline'}
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="h-8"
            >
              <Eye className="h-3 w-3 mr-1" />
              Preview
            </Button>

            <Button size="sm" className="h-8">
              <Save className="h-3 w-3 mr-1" />
              Salvar
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 p-6 bg-gray-50 overflow-auto">
          <div className={`mx-auto bg-white rounded-lg shadow-lg overflow-hidden ${
            deviceView === 'mobile' ? 'max-w-sm' :
            deviceView === 'tablet' ? 'max-w-2xl' :
            'max-w-4xl'
          }`}>
            <div 
              className="min-h-[600px] p-6 space-y-4"
              onClick={() => setSelectedBlockId(null)}
              style={{
                backgroundColor: currentPage?.settings.backgroundColor || '#ffffff',
                color: currentPage?.settings.textColor || '#2c2c2c'
              }}
            >
              {currentPage ? (
                <>
                  {/* Barra de progresso da página */}
                  {currentPage.settings.showProgress && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${currentPage.settings.progressValue}%` }}
                      />
                    </div>
                  )}

                  {/* Blocos da página */}
                  {currentPage.blocks.length > 0 ? (
                    currentPage.blocks
                      .sort((a, b) => a.order - b.order)
                      .map(block => renderBlock(block))
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Layout className="h-8 w-8 mx-auto mb-4 opacity-50" />
                      <p className="mb-2">Esta página está vazia</p>
                      <p className="text-sm">Adicione blocos da biblioteca para começar</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="h-8 w-8 mx-auto mb-4 opacity-50" />
                  <p className="mb-2">Nenhuma página selecionada</p>
                  <p className="text-sm">Selecione uma página para começar a editar</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SIDEBAR DIREITA: Propriedades */}
      <div className="w-80 border-l bg-white flex flex-col">
        <div className="h-14 border-b flex items-center px-4">
          <h2 className="text-sm font-semibold flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Propriedades
          </h2>
        </div>

        <ScrollArea className="flex-1 p-4">
          {renderPropertiesPanel()}
        </ScrollArea>
      </div>

      <Toaster />
    </div>
  );
};

export default CaktoQuizAdvancedEditor;
