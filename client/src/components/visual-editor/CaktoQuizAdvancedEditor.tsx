import React, { useState, useEffect, useCallback } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

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
import { Progress } from '@/components/ui/progress';

// Ícones
import {
  Save, Eye, Monitor, Tablet, Smartphone, Settings, Plus, Trash2, Copy,
  GripVertical, Edit3, Image as ImageIcon, Type, MousePointer, Layout,
  BarChart3, Users, HelpCircle, Gift, Clock, ArrowRight, Play, FileText,
  Palette, Zap, Target, ChevronDown, ChevronRight, Shield, ShoppingCart,
  CheckCircle, Star, Loader2
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
    // Novas propriedades para blocos específicos
    progressValue?: number; // para progress bar
    duration?: number; // para loading animation
    animationType?: string; // para loading animation
    questionType?: string; // para strategic question
    styleType?: string; // para style result display
    showImage?: boolean; // para style result display
    showDescription?: boolean; // para style result display
    productName?: string; // para sales offer
    price?: string; // para sales offer
    originalPrice?: string; // para sales offer
    ctaText?: string; // para sales offer
    urgency?: boolean; // para sales offer
    testimonials?: Array<{
      name: string;
      text: string;
      image: string;
    }>; // para testimonials grid
    columns?: number; // para testimonials grid
    guaranteeText?: string; // para guarantee section
    guaranteeDetails?: string; // para guarantee section
    showIcon?: boolean; // para guarantee section
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
    analytics: Record<string, any>;
    webhook: {
      events: string[];
    };
  };
}

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
        margin: '0 0 1rem 0',
        color: '#432818'
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
        margin: '0 0 1rem 0',
        color: '#432818'
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
      src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
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
      buttonText: 'Quero Descobrir Meu Estilo',
      style: {
        backgroundColor: '#B89B7A',
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
      placeholder: 'Digite seu nome aqui...',
      required: true,
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
        margin: '0 0 1.5rem 0',
        color: '#432818'
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
        { id: '1', text: 'Conforto, leveza e praticidade no vestir', value: 'natural' },
        { id: '2', text: 'Discrição, caimento clássico e sobriedade', value: 'classico' },
        { id: '3', text: 'Praticidade com um toque de estilo atual', value: 'contemporaneo' },
        { id: '4', text: 'Elegância refinada, moderna e sem exageros', value: 'elegante' }
      ],
      maxSelections: 3,
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
  },
  // NOVOS BLOCOS ESPECÍFICOS DO FUNIL
  {
    id: 'loading-animation',
    name: 'Loading Animado',
    icon: Clock,
    category: 'Transição',
    description: 'Tela de loading com animação',
    defaultSettings: {
      duration: 3000,
      animationType: 'spinner',
      style: {
        textAlign: 'center' as const,
        margin: '2rem 0'
      }
    }
  },
  {
    id: 'transition-text',
    name: 'Texto de Transição',
    icon: Zap,
    category: 'Transição',
    description: 'Texto personalizado durante loading',
    defaultSettings: {
      content: 'Analisando suas respostas...',
      style: {
        fontSize: '1.125rem',
        textAlign: 'center' as const,
        margin: '1rem 0',
        color: '#432818'
      }
    }
  },
  {
    id: 'strategic-question',
    name: 'Questão Estratégica',
    icon: Target,
    category: 'Quiz Avançado',
    description: 'Pergunta de qualificação de lead',
    defaultSettings: {
      content: 'Você já considerou investir em algum guia ou consultoria de estilo no passado?',
      questionType: 'strategic',
      style: {
        fontSize: '1.25rem',
        fontWeight: '600',
        textAlign: 'center' as const,
        margin: '0 0 1.5rem 0',
        color: '#432818'
      }
    }
  },
  {
    id: 'style-result-display',
    name: 'Exibição de Estilo',
    icon: Palette,
    category: 'Resultado',
    description: 'Mostra estilo calculado com imagem',
    defaultSettings: {
      styleType: 'primary',
      showImage: true,
      showDescription: true,
      style: {
        textAlign: 'center' as const,
        margin: '2rem 0'
      }
    }
  },
  {
    id: 'sales-offer',
    name: 'Oferta de Venda',
    icon: Gift,
    category: 'Vendas',
    description: 'Seção de oferta com preço e CTA',
    defaultSettings: {
      productName: 'Guia de Estilo e Imagem + Bônus Exclusivos',
      price: 'R$ 39,00',
      originalPrice: 'R$ 175,00',
      ctaText: 'Garantir Meu Guia + Bônus Especiais',
      urgency: true,
      style: {
        backgroundColor: '#f8f9fa',
        padding: '2rem',
        borderRadius: '1rem',
        margin: '2rem 0'
      }
    }
  },
  {
    id: 'testimonials-grid',
    name: 'Grade de Depoimentos',
    icon: Users,
    category: 'Prova Social',
    description: 'Grid de depoimentos com fotos',
    defaultSettings: {
      testimonials: [
        { name: 'Ana Paula', text: 'Transformou completamente meu guarda-roupa!', image: '/placeholder.svg' },
        { name: 'Marina Silva', text: 'Finalmente encontrei meu estilo!', image: '/placeholder.svg' }
      ],
      columns: 2,
      style: {
        margin: '2rem 0'
      }
    }
  },
  {
    id: 'guarantee-section',
    name: 'Seção de Garantia',
    icon: Shield,
    category: 'Vendas',
    description: 'Garantia com ícones e detalhes',
    defaultSettings: {
      guaranteeText: 'Garantia de 7 dias',
      guaranteeDetails: 'Se não ficar satisfeita, devolvemos seu dinheiro',
      showIcon: true,
      style: {
        backgroundColor: '#e8f5e8',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        textAlign: 'center' as const,
        margin: '1.5rem 0'
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
        primaryColor: '#B89B7A',
        secondaryColor: '#aa6b5d',
        backgroundColor: '#ffffff',
        textColor: '#432818',
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

  const currentPage = funnel.pages[currentPageIndex];
  const selectedBlock = currentPage?.blocks.find(block => block.id === selectedBlockId);

  // Inicializar com uma página exemplo
  useEffect(() => {
    if (funnel.pages.length === 0) {
      setFunnel(prev => ({
        ...prev,
        pages: [
          {
            id: 'intro',
            title: 'Introdução',
            type: 'intro' as const,
            order: 1,
            isActive: true,
            settings: {
              showProgress: false,
              progressValue: 0,
              backgroundColor: '#ffffff',
              textColor: '#432818',
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
                    textAlign: 'center' as const,
                    margin: '0 0 2rem 0'
                  }
                }
              },
              {
                id: 'title',
                type: 'heading' as const,
                order: 2,
                settings: {
                  content: 'Chega de um guarda-roupa lotado e da sensação de que nada combina com Você.',
                  style: {
                    fontSize: '1.875rem',
                    fontWeight: '400',
                    textAlign: 'center' as const,
                    margin: '0 0 1rem 0',
                    color: '#432818',
                    fontFamily: '"Playfair Display", serif'
                  }
                }
              }
            ]
          }
        ]
      }));
    }
  }, []);

  // Função para adicionar nova página
  const addNewPage = (type: FunnelPage['type']) => {
    const newPage: FunnelPage = {
      id: `page-${Date.now()}`,
      title: `Nova ${type === 'intro' ? 'Introdução' : 
                    type === 'question' ? 'Pergunta' : 
                    type === 'strategic' ? 'Questão Estratégica' :
                    type === 'result' ? 'Resultado' : 'Página'}`,
      type,
      order: funnel.pages.length + 1,
      isActive: true,
      settings: {
        showProgress: type !== 'intro',
        progressValue: Math.round((funnel.pages.length + 1) / 10 * 100),
        backgroundColor: '#ffffff',
        textColor: '#432818',
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

    setFunnel(prev => ({ ...prev, pages: updatedPages }));

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

  // Função para renderizar bloco no canvas usando componentes REAIS do funil
  const renderBlock = (block: FunnelBlock) => {
    const isSelected = selectedBlockId === block.id;
    
    const baseStyle = {
      border: isSelected ? '2px solid #B89B7A' : '2px solid transparent',
      borderRadius: '4px',
      position: 'relative' as const,
      minHeight: '40px',
      cursor: 'pointer',
      ...block.settings.style
    };

    const handleBlockClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedBlockId(block.id);
    };

    let content = null;

    switch (block.type) {
      case 'heading':
        content = (
          <h1 
            style={baseStyle} 
            onClick={handleBlockClick}
            className="font-playfair"
          >
            {block.settings.content || 'Título'}
          </h1>
        );
        break;
        
      case 'text':
        content = (
          <p style={baseStyle} onClick={handleBlockClick}>
            {block.settings.content || 'Texto'}
          </p>
        );
        break;
        
      case 'image':
        content = (
          <div style={{ ...baseStyle, textAlign: block.settings.style?.textAlign || 'center' }} onClick={handleBlockClick}>
            <img 
              src={block.settings.src || 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp'} 
              alt={block.settings.alt || 'Imagem'}
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }}
            />
          </div>
        );
        break;
        
      case 'button':
        content = (
          <div style={{ ...baseStyle, textAlign: block.settings.style?.textAlign || 'center' }} onClick={handleBlockClick}>
            <button 
              className="transition-all duration-300 hover:scale-[1.01] shadow-md"
              style={{
                backgroundColor: block.settings.style?.backgroundColor || '#B89B7A',
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
          <div style={baseStyle} onClick={handleBlockClick}>
            <label className="block text-xs font-semibold text-[#432818] mb-1.5">
              NOME {block.settings.required && <span className="text-red-500">*</span>}
            </label>
            <input 
              type="text"
              placeholder={block.settings.placeholder || 'Digite aqui...'}
              className="w-full p-2.5 bg-[#FEFEFE] rounded-md border-2 border-[#B89B7A] focus:outline-none focus:ring-2 focus:ring-[#A1835D]"
              style={{
                fontSize: '1rem'
              }}
            />
          </div>
        );
        break;
        
      case 'question':
        content = (
          <div style={baseStyle} onClick={handleBlockClick}>
            <h2 
              className="font-playfair text-center text-[#432818] font-semibold tracking-normal"
              style={{ 
                fontSize: block.settings.style?.fontSize || '1.25rem',
                fontWeight: block.settings.style?.fontWeight || '600',
                textAlign: block.settings.style?.textAlign || 'center',
                margin: '0'
              }}
            >
              {block.settings.content || 'Pergunta do Quiz'}
            </h2>
          </div>
        );
        break;
        
      case 'strategic-question':
        content = (
          <div style={baseStyle} onClick={handleBlockClick}>
            <h2 
              className="strategic-question-title text-[#432818] font-bold whitespace-pre-line text-center"
              style={{ 
                fontSize: block.settings.style?.fontSize || '1.25rem',
                fontWeight: '700',
                margin: '0 0 1.5rem 0'
              }}
            >
              {block.settings.content || 'Pergunta estratégica...'}
            </h2>
          </div>
        );
        break;
        
      case 'options':
        content = (
          <div style={baseStyle} onClick={handleBlockClick}>
            <div className="grid gap-3">
              {block.settings.options?.map((option, index) => (
                <div 
                  key={option.id}
                  className="p-4 border-2 border-[#e5e7eb] rounded-lg cursor-pointer transition-all hover:border-[#B89B7A] hover:shadow-md"
                  style={{
                    backgroundColor: '#ffffff'
                  }}
                >
                  {option.text}
                </div>
              )) || (
                <div className="p-4 border-2 dashed border-[#d1d5db] rounded-lg text-gray-500">
                  Adicione opções...
                </div>
              )}
            </div>
          </div>
        );
        break;
        
      case 'progress':
        content = (
          <div style={baseStyle} onClick={handleBlockClick}>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] h-2 rounded-full transition-all duration-300"
                style={{ width: `${block.settings.progressValue || 0}%` }}
              />
            </div>
          </div>
        );
        break;

      case 'loading-animation':
        content = (
          <div style={baseStyle} onClick={handleBlockClick}>
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-[#B89B7A] mb-4" />
              <p className="text-[#432818] text-lg">Carregando...</p>
            </div>
          </div>
        );
        break;

      case 'transition-text':
        content = (
          <div style={baseStyle} onClick={handleBlockClick}>
            <p className="text-center text-[#432818]" style={{
              fontSize: block.settings.style?.fontSize || '1.125rem',
              margin: '1rem 0'
            }}>
              {block.settings.content || 'Analisando suas respostas...'}
            </p>
          </div>
        );
        break;

      case 'style-result-display':
        content = (
          <div style={baseStyle} onClick={handleBlockClick}>
            <div className="text-center bg-white rounded-lg p-6 shadow-md border border-[#B89B7A]/20">
              <h3 className="text-xl font-medium text-[#432818] mb-4">Seu Estilo Predominante</h3>
              <div className="max-w-[238px] mx-auto relative mb-4">
                <img 
                  src="https://cakto-quiz-br01.b-cdn.net/uploads/ecbe689b-1c0a-4071-98d3-4d391b6dd98f.png" 
                  alt="Estilo Resultado" 
                  className="w-full h-auto rounded-lg shadow-md"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#B89B7A]"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#B89B7A]"></div>
              </div>
              <p className="text-[#432818] leading-relaxed">
                Seu estilo reflete elegância e sofisticação, com peças atemporais que valorizam sua personalidade única.
              </p>
            </div>
          </div>
        );
        break;

      case 'sales-offer':
        content = (
          <div style={baseStyle} onClick={handleBlockClick}>
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#B89B7A]/20 max-w-md mx-auto">
              <h3 className="text-xl font-medium text-center text-[#aa6b5d] mb-4">
                {block.settings.productName || 'Guia de Estilo Completo'}
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/10">
                  <span>Guia Principal</span>
                  <span className="font-medium">R$ 67,00</span>
                </div>
                <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/10">
                  <span>Bônus - Peças-chave</span>
                  <span className="font-medium">R$ 79,00</span>
                </div>
                <div className="flex justify-between items-center p-2 pt-3 font-bold">
                  <span>Valor Total</span>
                  <div className="relative">
                    <span className="text-gray-500 line-through">{block.settings.originalPrice || 'R$ 175,00'}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-[#f9f4ef] rounded-lg mb-4">
                <p className="text-sm text-[#aa6b5d] uppercase font-medium">Hoje por apenas</p>
                <p className="text-4xl font-bold text-[#B89B7A]">{block.settings.price || 'R$ 39,00'}</p>
                <p className="text-xs text-gray-600 mt-1">Pagamento único</p>
              </div>

              <button className="w-full bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white py-3 px-6 rounded-md shadow-lg transition-all hover:scale-105">
                <div className="flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>{block.settings.ctaText || 'Quero Meu Guia Agora'}</span>
                </div>
              </button>
            </div>
          </div>
        );
        break;

      case 'testimonials-grid':
        content = (
          <div style={baseStyle} onClick={handleBlockClick}>
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#B89B7A]/20">
              <h3 className="text-xl font-medium text-center text-[#432818] mb-6">O que nossas clientes dizem</h3>
              <div className={`grid gap-4 ${block.settings.columns === 1 ? 'grid-cols-1' : block.settings.columns === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
                {block.settings.testimonials?.map((testimonial, index) => (
                  <div key={index} className="bg-[#f9f4ef] p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <img 
                        src={testimonial.image || '/placeholder.svg'} 
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium text-[#432818]">{testimonial.name}</p>
                        <div className="flex text-yellow-400">
                          {[1,2,3,4,5].map(star => (
                            <Star key={star} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-[#432818]">"{testimonial.text}"</p>
                  </div>
                )) || (
                  <p className="text-gray-500 text-center col-span-full">Adicione depoimentos...</p>
                )}
              </div>
            </div>
          </div>
        );
        break;

      case 'guarantee-section':
        content = (
          <div style={baseStyle} onClick={handleBlockClick}>
            <div className="bg-[#e8f5e8] p-6 rounded-lg text-center border border-green-200">
              {block.settings.showIcon && (
                <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              )}
              <h3 className="text-lg font-medium text-green-800 mb-2">
                {block.settings.guaranteeText || 'Garantia de 7 dias'}
              </h3>
              <p className="text-green-700 text-sm">
                {block.settings.guaranteeDetails || 'Se não ficar satisfeita, devolvemos seu dinheiro'}
              </p>
              <div className="flex items-center justify-center mt-3">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-xs text-green-600 font-medium">100% Garantido</span>
              </div>
            </div>
          </div>
        );
        break;
        
      default:
        content = (
          <div style={baseStyle} onClick={handleBlockClick}>
            <p className="text-gray-500">Bloco não implementado: {block.type}</p>
          </div>
        );
    }

    return (
      <div key={block.id} className="relative group">
        {content}
        {isSelected && !isPreviewMode && (
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
        {(selectedBlock.type === 'heading' || selectedBlock.type === 'text' || selectedBlock.type === 'question' || selectedBlock.type === 'strategic-question' || selectedBlock.type === 'transition-text') && (
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
          </div>
        )}

        {selectedBlock.type === 'sales-offer' && (
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Nome do Produto</Label>
              <Input
                value={selectedBlock.settings.productName || ''}
                onChange={(e) => updateBlock(selectedBlock.id, {
                  settings: { ...selectedBlock.settings, productName: e.target.value }
                })}
                className="text-sm h-8 mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Preço Atual</Label>
              <Input
                value={selectedBlock.settings.price || ''}
                onChange={(e) => updateBlock(selectedBlock.id, {
                  settings: { ...selectedBlock.settings, price: e.target.value }
                })}
                className="text-sm h-8 mt-1"
                placeholder="R$ 39,00"
              />
            </div>
            <div>
              <Label className="text-xs">Preço Original</Label>
              <Input
                value={selectedBlock.settings.originalPrice || ''}
                onChange={(e) => updateBlock(selectedBlock.id, {
                  settings: { ...selectedBlock.settings, originalPrice: e.target.value }
                })}
                className="text-sm h-8 mt-1"
                placeholder="R$ 175,00"
              />
            </div>
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
                value={selectedBlock.settings.style?.color || '#432818'}
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
            Editor de funil com renderizações reais do CaktoQuiz
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
                    { type: 'strategic' as const, label: 'Estratégica', icon: '🎯' },
                    { type: 'result' as const, label: 'Resultado', icon: '🏆' },
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
                
                {['Texto', 'Mídia', 'Interação', 'Formulário', 'Quiz', 'Quiz Avançado', 'UI', 'Transição', 'Resultado', 'Vendas', 'Prova Social'].map(category => (
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
                              <div className="text-muted-foreground text-xs">{block.description}</div>
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

            <Button size="sm" className="h-8 bg-[#B89B7A] hover:bg-[#A1835D]">
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
                color: currentPage?.settings.textColor || '#432818'
              }}
            >
              {currentPage ? (
                <>
                  {/* Barra de progresso da página */}
                  {currentPage.settings.showProgress && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                      <div 
                        className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] h-2 rounded-full transition-all duration-300" 
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
                      <p className="font-medium mb-2">Esta página está vazia</p>
                      <p className="text-sm">Adicione blocos da biblioteca para começar</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="h-8 w-8 mx-auto mb-4 opacity-50" />
                  <p className="font-medium mb-2">Nenhuma página selecionada</p>
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
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="font-medium text-sm">Propriedades</span>
          </div>
        </div>
        
        <div className="flex-1 p-4">
          <ScrollArea className="h-full">
            {renderPropertiesPanel()}
          </ScrollArea>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default CaktoQuizAdvancedEditor;
