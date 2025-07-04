import React, { useState, useCallback, useMemo } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Button 
} from '@/components/ui/button';
import { 
  Badge 
} from '@/components/ui/badge';
import { 
  Input 
} from '@/components/ui/input';
import { 
  Label 
} from '@/components/ui/label';
import { 
  Textarea 
} from '@/components/ui/textarea';
import { 
  Switch 
} from '@/components/ui/switch';
import { 
  ScrollArea 
} from '@/components/ui/scroll-area';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Toaster 
} from '@/components/ui/toaster';
import {
  Type,
  Image as ImageIcon,
  Star,
  Heart,
  Zap,
  CheckCircle,
  ArrowRight,
  Eye,
  Layout,
  FileText,
  Settings,
  Save,
  Smartphone,
  Tablet,
  Monitor,
  Plus,
  Trash2,
  RotateCcw,
  Play,
  Users,
  Trophy,
  Gift,
  MessageCircle,
  Calendar,
  CreditCard,
  Clock,
  Target,
  Sparkles,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline
} from 'lucide-react';

// Tipos principais
interface FunnelBlock {
  id: string;
  type: string;
  order: number;
  settings: Record<string, any>;
  style?: Record<string, any>;
}

interface FunnelPage {
  id: string;
  name: string;
  title: string;
  type: 'intro' | 'question' | 'transition' | 'strategic' | 'result' | 'offer';
  blocks: FunnelBlock[];
  settings: {
    backgroundColor?: string;
    textColor?: string;
    showProgress?: boolean;
    progressValue?: number;
  };
}

interface FunnelConfig {
  name: string;
  description: string;
  isPublished: boolean;
  theme: string;
}

interface Funnel {
  id: string;
  config: FunnelConfig;
  pages: FunnelPage[];
}

// Dados iniciais do funil
const createInitialFunnel = (): Funnel => ({
  id: '1',
  config: {
    name: 'Quiz CaktoQuiz - Descubra Seu Estilo',
    description: 'Funil completo para descoberta do estilo pessoal',
    isPublished: false,
    theme: 'caktoquiz'
  },
  pages: [
    // 1. Página de Introdução
    {
      id: 'intro',
      name: 'Introdução',
      title: 'Bem-vinda ao Quiz',
      type: 'intro',
      settings: {
        backgroundColor: '#ffffff',
        textColor: '#432818',
        showProgress: true,
        progressValue: 5
      },
      blocks: [
        {
          id: 'intro-header',
          type: 'header',
          order: 1,
          settings: {
            title: 'Descubra Seu Estilo Único',
            subtitle: 'Um quiz personalizado para transformar seu guarda-roupa',
            titleSize: 'large',
            alignment: 'center'
          }
        },
        {
          id: 'intro-image',
          type: 'image',
          order: 2,
          settings: {
            src: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_webp,q_70,w_800,h_600,c_fit/v1744911572/quiz_intro_image.webp',
            alt: 'Mulher elegante descobrindo seu estilo',
            width: '100%',
            alignment: 'center'
          }
        },
        {
          id: 'intro-description',
          type: 'text',
          order: 3,
          settings: {
            content: 'Em apenas alguns minutos, você descobrirá qual é o seu perfil de estilo e receberá dicas personalizadas para valorizar ainda mais sua beleza natural.',
            fontSize: 'medium',
            alignment: 'center'
          }
        },
        {
          id: 'intro-name-input',
          type: 'form-input',
          order: 4,
          settings: {
            label: 'Como você gostaria de ser chamada?',
            placeholder: 'Digite seu nome aqui...',
            required: true,
            type: 'text'
          }
        },
        {
          id: 'intro-button',
          type: 'button',
          order: 5,
          settings: {
            text: 'Começar o Quiz',
            style: 'primary',
            size: 'large',
            fullWidth: true
          }
        }
      ]
    },
    // 2-11. Perguntas principais (10 perguntas)
    ...Array.from({ length: 10 }, (_, i) => ({
      id: `question-${i + 1}`,
      name: `Pergunta ${i + 1}`,
      title: `Pergunta ${i + 1} de 10`,
      type: 'question' as const,
      settings: {
        backgroundColor: '#ffffff',
        textColor: '#432818',
        showProgress: true,
        progressValue: 10 + (i + 1) * 6
      },
      blocks: [
        {
          id: `q${i + 1}-question`,
          type: 'question-multiple',
          order: 1,
          settings: {
            question: `Esta é a pergunta ${i + 1} sobre seu estilo pessoal`,
            options: [
              { id: 'a', text: 'Opção A - Estilo clássico', value: 'classic' },
              { id: 'b', text: 'Opção B - Estilo moderno', value: 'modern' },
              { id: 'c', text: 'Opção C - Estilo romântico', value: 'romantic' },
              { id: 'd', text: 'Opção D - Estilo casual', value: 'casual' }
            ],
            required: true
          }
        }
      ]
    })),
    // 12. Página de Transição
    {
      id: 'transition',
      name: 'Transição',
      title: 'Processando Respostas',
      type: 'transition',
      settings: {
        backgroundColor: '#f9f4ef',
        textColor: '#432818',
        showProgress: true,
        progressValue: 75
      },
      blocks: [
        {
          id: 'transition-header',
          type: 'header',
          order: 1,
          settings: {
            title: 'Estamos Analisando Seu Perfil...',
            subtitle: 'Preparando suas recomendações personalizadas',
            alignment: 'center'
          }
        },
        {
          id: 'transition-loader',
          type: 'loader',
          order: 2,
          settings: {
            type: 'spinning',
            message: 'Analisando suas preferências...'
          }
        }
      ]
    },
    // 13-19. Perguntas estratégicas (7 perguntas)
    ...Array.from({ length: 7 }, (_, i) => ({
      id: `strategic-${i + 1}`,
      name: `Estratégica ${i + 1}`,
      title: `Pergunta Estratégica ${i + 1}`,
      type: 'strategic' as const,
      settings: {
        backgroundColor: '#ffffff',
        textColor: '#432818',
        showProgress: true,
        progressValue: 80 + (i + 1) * 2.5
      },
      blocks: [
        {
          id: `s${i + 1}-question`,
          type: 'question-strategic',
          order: 1,
          settings: {
            question: `Pergunta estratégica ${i + 1} sobre seus objetivos de estilo`,
            options: [
              { id: 'a', text: 'Sim, definitivamente', value: 'high' },
              { id: 'b', text: 'Talvez, preciso saber mais', value: 'medium' },
              { id: 'c', text: 'Não, não me interessa', value: 'low' }
            ],
            required: true
          }
        }
      ]
    })),
    // 20. Página de Resultado
    {
      id: 'result',
      name: 'Resultado',
      title: 'Seu Perfil de Estilo',
      type: 'result',
      settings: {
        backgroundColor: '#ffffff',
        textColor: '#432818',
        showProgress: true,
        progressValue: 100
      },
      blocks: [
        {
          id: 'result-header',
          type: 'header',
          order: 1,
          settings: {
            title: 'Parabéns! Descobrimos Seu Perfil',
            subtitle: 'Você é do tipo: Elegante Clássica',
            alignment: 'center'
          }
        },
        {
          id: 'result-profile-image',
          type: 'image',
          order: 2,
          settings: {
            src: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_webp,q_70,w_600,h_400,c_fit/v1744911572/style_classic.webp',
            alt: 'Estilo Elegante Clássica',
            alignment: 'center'
          }
        },
        {
          id: 'result-description',
          type: 'text',
          order: 3,
          settings: {
            content: 'Seu estilo é sofisticado e atemporal. Você valoriza peças de qualidade, cortes bem estruturados e uma paleta de cores mais neutra e elegante.',
            fontSize: 'medium',
            alignment: 'center'
          }
        }
      ]
    },
    // 21. Página de Oferta
    {
      id: 'offer',
      name: 'Oferta',
      title: 'Oferta Especial',
      type: 'offer',
      settings: {
        backgroundColor: '#432818',
        textColor: '#ffffff',
        showProgress: false
      },
      blocks: [
        {
          id: 'offer-header',
          type: 'header',
          order: 1,
          settings: {
            title: 'Transforme Seu Guarda-Roupa Hoje!',
            subtitle: 'Consultoria Personalizada de Estilo',
            alignment: 'center',
            color: 'white'
          }
        },
        {
          id: 'offer-price',
          type: 'price',
          order: 2,
          settings: {
            originalPrice: 'R$ 297,00',
            currentPrice: 'R$ 97,00',
            discount: '67% OFF',
            urgency: 'Oferta válida apenas hoje!'
          }
        },
        {
          id: 'offer-cta',
          type: 'button',
          order: 3,
          settings: {
            text: 'Quero Transformar Meu Estilo Agora',
            style: 'accent',
            size: 'large',
            fullWidth: true
          }
        }
      ]
    }
  ]
});

// Biblioteca de blocos disponíveis
const blockLibrary = [
  // Texto
  { 
    id: 'header',
    type: 'header', 
    name: 'Cabeçalho', 
    description: 'Título e subtítulo',
    icon: <Type className="w-4 h-4" />,
    category: 'Texto'
  },
  { 
    id: 'text',
    type: 'text', 
    name: 'Texto', 
    description: 'Parágrafo de texto',
    icon: <AlignLeft className="w-4 h-4" />,
    category: 'Texto'
  },
  // Mídia
  { 
    id: 'image',
    type: 'image', 
    name: 'Imagem', 
    description: 'Imagem responsiva',
    icon: <ImageIcon className="w-4 h-4" />,
    category: 'Mídia'
  },
  // Interação
  { 
    id: 'button',
    type: 'button', 
    name: 'Botão', 
    description: 'Botão de ação',
    icon: <ArrowRight className="w-4 h-4" />,
    category: 'Interação'
  },
  // Quiz
  { 
    id: 'question-multiple',
    type: 'question-multiple', 
    name: 'Pergunta Múltipla Escolha', 
    description: 'Pergunta com opções',
    icon: <CheckCircle className="w-4 h-4" />,
    category: 'Quiz'
  },
  { 
    id: 'question-strategic',
    type: 'question-strategic', 
    name: 'Pergunta Estratégica', 
    description: 'Pergunta para qualificação',
    icon: <Target className="w-4 h-4" />,
    category: 'Quiz Avançado'
  },
  // Formulário
  { 
    id: 'form-input',
    type: 'form-input', 
    name: 'Campo de Entrada', 
    description: 'Input de texto',
    icon: <Layout className="w-4 h-4" />,
    category: 'Formulário'
  },
  // UI
  { 
    id: 'spacer',
    type: 'spacer', 
    name: 'Espaçador', 
    description: 'Espaço em branco',
    icon: <Layout className="w-4 h-4" />,
    category: 'UI'
  },
  { 
    id: 'loader',
    type: 'loader', 
    name: 'Loading', 
    description: 'Indicador de carregamento',
    icon: <RotateCcw className="w-4 h-4" />,
    category: 'Transição'
  },
  // Vendas
  { 
    id: 'price',
    type: 'price', 
    name: 'Preço', 
    description: 'Exibição de preços',
    icon: <CreditCard className="w-4 h-4" />,
    category: 'Vendas'
  }
];

const CaktoQuizAdvancedEditor: React.FC = () => {
  // Estados principais
  const [funnel, setFunnel] = useState<Funnel>(createInitialFunnel);
  const [currentPageId, setCurrentPageId] = useState<string>('intro');
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'funnel' | 'blocks' | 'settings'>('funnel');
  const [deviceView, setDeviceView] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  // Computed values
  const currentPage = useMemo(() => 
    funnel.pages.find(page => page.id === currentPageId), 
    [funnel.pages, currentPageId]
  );

  const currentPageIndex = useMemo(() => 
    funnel.pages.findIndex(page => page.id === currentPageId), 
    [funnel.pages, currentPageId]
  );

  const selectedBlock = useMemo(() => 
    currentPage?.blocks.find(block => block.id === selectedBlockId), 
    [currentPage?.blocks, selectedBlockId]
  );

  // Função para adicionar bloco
  const addBlock = useCallback((blockType: string) => {
    if (!currentPage) return;

    const newBlock: FunnelBlock = {
      id: `${blockType}-${Date.now()}`,
      type: blockType,
      order: currentPage.blocks.length + 1,
      settings: {}
    };

    setFunnel(prev => ({
      ...prev,
      pages: prev.pages.map(page => 
        page.id === currentPageId 
          ? { ...page, blocks: [...page.blocks, newBlock] }
          : page
      )
    }));

    setSelectedBlockId(newBlock.id);
  }, [currentPage, currentPageId]);

  // Função para renderizar blocos no canvas
  const renderBlock = (block: FunnelBlock) => {
    const isSelected = selectedBlockId === block.id;
    const baseStyle = isSelected ? {
      outline: '2px solid #3b82f6',
      outlineOffset: '2px'
    } : {};

    const handleBlockClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedBlockId(block.id);
    };

    let content: React.ReactNode;

    switch (block.type) {
      case 'header':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#432818] mb-4 font-playfair">
              {block.settings.title || 'Título do Cabeçalho'}
            </h1>
            {block.settings.subtitle && (
              <p className="text-lg text-[#6B5B73] mb-6">
                {block.settings.subtitle}
              </p>
            )}
          </div>
        );
        break;

      case 'text':
        content = (
          <div style={baseStyle} onClick={handleBlockClick}>
            <p className="text-[#432818] leading-relaxed">
              {block.settings.content || 'Conteúdo do texto aqui...'}
            </p>
          </div>
        );
        break;

      case 'image':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="text-center">
            <img
              src={block.settings.src || 'https://via.placeholder.com/600x400?text=Imagem'}
              alt={block.settings.alt || 'Imagem'}
              className="max-w-full h-auto rounded-lg shadow-md mx-auto"
            />
          </div>
        );
        break;

      case 'button':
        const buttonStyle = block.settings.style || 'primary';
        const buttonClasses: Record<string, string> = {
          primary: 'bg-[#B89B7A] hover:bg-[#A1835D] text-white',
          secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
          accent: 'bg-[#6B5B73] hover:bg-[#5A4A5F] text-white'
        };

        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="text-center">
            <Button 
              className={`px-8 py-3 rounded-full font-semibold transition-all ${buttonClasses[buttonStyle] || buttonClasses.primary} ${
                block.settings.fullWidth ? 'w-full' : ''
              }`}
              size={block.settings.size || 'default'}
            >
              {block.settings.text || 'Texto do Botão'}
            </Button>
          </div>
        );
        break;

      case 'form-input':
        content = (
          <div style={baseStyle} onClick={handleBlockClick}>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#432818]">
                {block.settings.label || 'Campo de entrada'}
              </Label>
              <Input
                placeholder={block.settings.placeholder || 'Digite aqui...'}
                className="w-full h-12 text-base border-2 border-[#B89B7A]/30 focus:border-[#B89B7A] rounded-xl"
              />
            </div>
          </div>
        );
        break;

      case 'question-multiple':
        content = (
          <div style={baseStyle} onClick={handleBlockClick}>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#432818] text-center">
                {block.settings.question || 'Qual é a sua pergunta?'}
              </h3>
              <div className="space-y-3">
                {(block.settings.options || [
                  { id: 'a', text: 'Opção A', value: 'a' },
                  { id: 'b', text: 'Opção B', value: 'b' },
                  { id: 'c', text: 'Opção C', value: 'c' },
                  { id: 'd', text: 'Opção D', value: 'd' }
                ]).map((option: any, index: number) => (
                  <Button
                    key={option.id}
                    variant="outline"
                    className="w-full p-4 h-auto text-left justify-start border-2 border-[#B89B7A]/30 hover:border-[#B89B7A] hover:bg-[#f9f4ef] rounded-xl"
                  >
                    <span className="font-semibold text-[#B89B7A] mr-3">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option.text}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );
        break;

      case 'question-strategic':
        content = (
          <div style={baseStyle} onClick={handleBlockClick}>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#432818] text-center">
                {block.settings.question || 'Pergunta estratégica sobre seus objetivos'}
              </h3>
              <div className="space-y-3">
                {(block.settings.options || [
                  { id: 'a', text: 'Sim, definitivamente', value: 'high' },
                  { id: 'b', text: 'Talvez, preciso saber mais', value: 'medium' },
                  { id: 'c', text: 'Não, não me interessa', value: 'low' }
                ]).map((option: any) => (
                  <Button
                    key={option.id}
                    variant="outline"
                    className="w-full p-4 h-auto text-center border-2 border-[#6B5B73]/30 hover:border-[#6B5B73] hover:bg-[#6B5B73]/10 rounded-xl"
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );
        break;

      case 'loader':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="text-center py-8">
            <div className="inline-flex items-center space-x-3">
              <RotateCcw className="h-6 w-6 animate-spin text-[#B89B7A]" />
              <span className="text-[#432818]">
                {block.settings.message || 'Carregando...'}
              </span>
            </div>
          </div>
        );
        break;

      case 'price':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="text-center">
            <div className="bg-gradient-to-br from-[#B89B7A] to-[#A1835D] p-6 rounded-2xl text-white">
              {block.settings.originalPrice && (
                <div className="text-lg line-through opacity-75 mb-2">
                  {block.settings.originalPrice}
                </div>
              )}
              <div className="text-4xl font-bold mb-2">
                {block.settings.currentPrice || 'R$ 97,00'}
              </div>
              {block.settings.discount && (
                <div className="text-sm font-semibold bg-red-500 text-white px-3 py-1 rounded-full inline-block mb-3">
                  {block.settings.discount}
                </div>
              )}
              {block.settings.urgency && (
                <div className="text-sm opacity-90">
                  {block.settings.urgency}
                </div>
              )}
            </div>
          </div>
        );
        break;

      case 'spacer':
        content = (
          <div 
            style={{
              ...baseStyle,
              height: block.settings.height || '50px'
            }} 
            onClick={handleBlockClick}
            className="w-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm"
          >
            Espaçador ({block.settings.height || '50px'})
          </div>
        );
        break;

      default:
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="border-2 border-dashed border-gray-300 p-4 text-center text-gray-500">
            Bloco desconhecido: {block.type}
          </div>
        );
    }

    return content;
  };

  // Render principal
  return (
    <div className="flex h-screen bg-gray-50">
      {/* SIDEBAR ESQUERDA */}
      <div className="w-80 bg-white border-r shadow-lg flex flex-col">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'funnel' | 'blocks' | 'settings')} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 m-2">
            <TabsTrigger value="funnel" className="text-xs">Funil</TabsTrigger>
            <TabsTrigger value="blocks" className="text-xs">Blocos</TabsTrigger>
            <TabsTrigger value="settings" className="text-xs">Config</TabsTrigger>
          </TabsList>

          <TabsContent value="funnel" className="flex-1 p-2">
            <ScrollArea className="h-full">
              <div className="space-y-2">
                <h3 className="text-sm font-medium mb-3">Páginas do Funil</h3>
                {funnel.pages.map((page, index) => (
                  <div
                    key={page.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      currentPageId === page.id 
                        ? 'bg-blue-50 border-blue-200 shadow-sm' 
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                    onClick={() => setCurrentPageId(page.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{page.name}</p>
                        <p className="text-xs text-gray-500">{page.blocks.length} blocos</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {index + 1}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="blocks" className="flex-1 p-2">
            <ScrollArea className="h-full">
              <div className="space-y-3">
                <h3 className="text-sm font-medium mb-3">Biblioteca de Blocos</h3>
                {blockLibrary.map((block) => (
                  <div
                    key={block.type}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => addBlock(block.type)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-gray-600">{block.icon}</div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{block.name}</p>
                        <p className="text-xs text-gray-500">{block.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="settings" className="flex-1 p-2">
            <ScrollArea className="h-full">
              <div className="space-y-4">
                <h3 className="text-sm font-medium mb-3">Configurações do Funil</h3>
                
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
            {/* Header da página com progress bar */}
            {currentPage && currentPage.settings.showProgress && (
              <div className="flex flex-col gap-4 p-5 border-b">
                <div className="flex flex-row w-full h-auto justify-center relative">
                  <div className="flex flex-col w-full justify-start items-center gap-4">
                    <img 
                      width="96" 
                      height="96" 
                      className="max-w-24 object-cover" 
                      alt="Logo" 
                      src="https://res.cloudinary.com/dqljyf76t/image/upload/f_webp,q_70,w_96,h_96,c_fit/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
                    />
                    <div 
                      role="progressbar" 
                      className="relative w-full overflow-hidden rounded-full bg-zinc-300 h-2"
                    >
                      <div 
                        className="progress h-full w-full flex-1 bg-[#B89B7A] transition-all" 
                        style={{ 
                          transform: `translateX(-${100 - (currentPage.settings.progressValue || 0)}%)` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div 
              className="flex flex-col gap-4 md:gap-6 h-full justify-between p-3 md:p-5 pb-10"
              onClick={() => setSelectedBlockId(null)}
              style={{
                backgroundColor: currentPage?.settings.backgroundColor || '#ffffff',
                color: currentPage?.settings.textColor || '#432818'
              }}
            >
              {currentPage ? (
                <>
                  {/* Container principal */}
                  <div className="main-content w-full relative mx-auto h-full">
                    <div className="flex flex-row flex-wrap pb-10">
                      {currentPage.blocks.length > 0 ? (
                        currentPage.blocks
                          .sort((a, b) => a.order - b.order)
                          .map(block => (
                            <div 
                              key={block.id}
                              className="group/canvas-item max-w-full canvas-item min-h-[1.25rem] relative self-auto mr-auto mb-4 w-full"
                            >
                              <div 
                                className={`min-h-[1.25rem] min-w-full relative self-auto box-border ${
                                  selectedBlockId === block.id 
                                    ? 'border-2 border-blue-500 border-dashed' 
                                    : 'group-hover/canvas-item:border-2 hover:border-2 border-dashed border-blue-500'
                                } rounded-md`}
                                style={{ opacity: 1 }}
                              >
                                {renderBlock(block)}
                              </div>
                            </div>
                          ))
                      ) : (
                        <div className="text-center py-12 text-gray-500 w-full">
                          <Layout className="h-8 w-8 mx-auto mb-4 opacity-50" />
                          <p className="font-medium mb-2">Esta página está vazia</p>
                          <p className="text-sm">Adicione blocos da biblioteca para começar</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-10 md:pt-24"></div>
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
            <div className="text-center py-8 text-gray-500">
              <Settings className="h-8 w-8 mx-auto mb-4 opacity-50" />
              <p className="font-medium mb-2">Nenhum bloco selecionado</p>
              <p className="text-sm">Clique em um bloco para editar suas propriedades</p>
            </div>
          </ScrollArea>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default CaktoQuizAdvancedEditor;