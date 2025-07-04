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
import { useToast } from '@/hooks/use-toast';
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
  type: 'intro' | 'question' | 'main-transition' | 'strategic' | 'final-transition' | 'result' | 'result-variant-b' | 'offer';
  blocks: FunnelBlock[];
  settings: {
    backgroundColor?: string;
    textColor?: string;
    showProgress?: boolean;
    progressValue?: number;
    transitionDuration?: number; // Para transições
    abTestVariant?: 'A' | 'B'; // Para A/B testing
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
    // 12. Página de Transição Principal
    {
      id: 'main-transition',
      name: 'Transição Principal',
      title: 'Analisando Respostas',
      type: 'main-transition',
      settings: {
        backgroundColor: '#f9f4ef',
        textColor: '#432818',
        showProgress: true,
        progressValue: 75,
        transitionDuration: 4000
      },
      blocks: [
        {
          id: 'main-transition-header',
          type: 'header',
          order: 1,
          settings: {
            title: 'Analisando suas respostas...',
            subtitle: 'Criando seu perfil personalizado',
            alignment: 'center'
          }
        },
        {
          id: 'main-transition-loader',
          type: 'loading-animation',
          order: 2,
          settings: {
            type: 'spinning',
            message: 'Processando suas preferências...',
            duration: 4000
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
    // 20. Página de Transição Final
    {
      id: 'final-transition',
      name: 'Transição Final',
      title: 'Finalizando Análise',
      type: 'final-transition',
      settings: {
        backgroundColor: '#432818',
        textColor: '#ffffff',
        showProgress: true,
        progressValue: 95,
        transitionDuration: 3000
      },
      blocks: [
        {
          id: 'final-transition-header',
          type: 'header',
          order: 1,
          settings: {
            title: 'Obrigada por compartilhar!',
            subtitle: 'Preparando seu resultado personalizado...',
            alignment: 'center',
            color: 'white'
          }
        },
        {
          id: 'final-transition-loader',
          type: 'loading-animation',
          order: 2,
          settings: {
            type: 'elegant',
            message: 'Criando seu guia de estilo...',
            duration: 3000
          }
        }
      ]
    },
    // 21. Página de Resultado
    {
      id: 'result',
      name: 'Resultado',
      title: 'Seu Perfil de Estilo',
      type: 'result',
      settings: {
        backgroundColor: '#ffffff',
        textColor: '#432818',
        showProgress: true,
        progressValue: 100,
        abTestVariant: 'A'
      },
      blocks: [
        {
          id: 'result-header',
          type: 'header',
          order: 1,
          settings: {
            title: 'Parabéns! Descobrimos Seu Perfil',
            subtitle: 'Resultado baseado em suas respostas',
            alignment: 'center'
          }
        },
        {
          id: 'result-style-display',
          type: 'style-result-display',
          order: 2,
          settings: {
            styleName: 'Elegante Clássica',
            styleImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_webp,q_70,w_600,h_400,c_fit/v1744911572/style_classic.webp',
            styleDescription: 'Seu estilo é sofisticado e atemporal. Você valoriza peças de qualidade, cortes bem estruturados e uma paleta de cores mais neutra e elegante.',
            percentMatch: 92
          }
        },
        {
          id: 'result-sales-offer',
          type: 'sales-offer',
          order: 3,
          settings: {
            title: 'Transforme Seu Guarda-Roupa Hoje!',
            subtitle: 'Guias Personalizados de Estilo',
            originalPrice: 'R$ 297,00',
            currentPrice: 'R$ 97,00',
            discount: '67% OFF',
            urgency: 'Oferta válida apenas hoje!'
          }
        },
        {
          id: 'result-testimonials',
          type: 'testimonials-grid',
          order: 4,
          settings: {
            testimonials: [
              {
                author: 'Maria Silva',
                role: 'Empresária',
                text: 'O quiz mudou completamente minha forma de me vestir!',
                rating: 5,
                avatar: 'https://via.placeholder.com/60x60?text=M'
              },
              {
                author: 'Ana Costa',
                role: 'Professora',
                text: 'Descobri meu estilo verdadeiro, amei o resultado!',
                rating: 5,
                avatar: 'https://via.placeholder.com/60x60?text=A'
              }
            ]
          }
        },
        {
          id: 'result-guarantee',
          type: 'guarantee-section',
          order: 5,
          settings: {
            title: 'Garantia de 30 dias',
            description: 'Se não ficar satisfeita, devolvemos 100% do seu dinheiro.',
            features: [
              'Garantia incondicional',
              'Suporte 24/7',
              'Acesso vitalício'
            ]
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
  // Transição
  { 
    id: 'loading-animation',
    type: 'loading-animation', 
    name: 'Loading Animado', 
    description: 'Animação de carregamento customizada',
    icon: <RotateCcw className="w-4 h-4" />,
    category: 'Transição'
  },
  { 
    id: 'transition-text',
    type: 'transition-text', 
    name: 'Texto de Transição', 
    description: 'Texto personalizado durante loading',
    icon: <Type className="w-4 h-4" />,
    category: 'Transição'
  },
  // Resultado Específico
  { 
    id: 'style-result-display',
    type: 'style-result-display', 
    name: 'Exibição de Estilo', 
    description: 'Mostra estilo calculado com imagem',
    icon: <Sparkles className="w-4 h-4" />,
    category: 'Resultado'
  },
  { 
    id: 'sales-offer',
    type: 'sales-offer', 
    name: 'Oferta de Venda', 
    description: 'Seção de oferta com preço e CTA',
    icon: <CreditCard className="w-4 h-4" />,
    category: 'Vendas'
  },
  { 
    id: 'testimonials-grid',
    type: 'testimonials-grid', 
    name: 'Grade de Depoimentos', 
    description: 'Grid de depoimentos com fotos',
    icon: <Users className="w-4 h-4" />,
    category: 'Social'
  },
  { 
    id: 'guarantee-section',
    type: 'guarantee-section', 
    name: 'Seção de Garantia', 
    description: 'Garantia com ícones e detalhes',
    icon: <CheckCircle className="w-4 h-4" />,
    category: 'Vendas'
  },
  // Quiz Estratégico
  { 
    id: 'strategic-question',
    type: 'strategic-question', 
    name: 'Questão Estratégica', 
    description: 'Pergunta de qualificação de lead',
    icon: <Target className="w-4 h-4" />,
    category: 'Quiz Avançado'
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
    name: 'Loading Simples', 
    description: 'Indicador de carregamento básico',
    icon: <RotateCcw className="w-4 h-4" />,
    category: 'UI'
  },
  // Vendas
  { 
    id: 'price',
    type: 'price', 
    name: 'Preço', 
    description: 'Exibição de preços',
    icon: <CreditCard className="w-4 h-4" />,
    category: 'Vendas'
  },
  // Componentes específicos do CaktoQuiz
  { 
    id: 'testimonial',
    type: 'testimonial', 
    name: 'Depoimento', 
    description: 'Depoimento com avatar e estrelas',
    icon: <MessageCircle className="w-4 h-4" />,
    category: 'Social'
  },
  { 
    id: 'guarantee',
    type: 'guarantee', 
    name: 'Garantia', 
    description: 'Selo de garantia',
    icon: <CheckCircle className="w-4 h-4" />,
    category: 'Vendas'
  },
  { 
    id: 'countdown',
    type: 'countdown', 
    name: 'Contador Regressivo', 
    description: 'Timer de urgência',
    icon: <Clock className="w-4 h-4" />,
    category: 'Urgência'
  },
  { 
    id: 'bonus',
    type: 'bonus', 
    name: 'Bônus', 
    description: 'Destaque de bônus',
    icon: <Gift className="w-4 h-4" />,
    category: 'Vendas'
  },
  { 
    id: 'faq',
    type: 'faq', 
    name: 'FAQ', 
    description: 'Perguntas frequentes',
    icon: <MessageCircle className="w-4 h-4" />,
    category: 'Informação'
  },
  { 
    id: 'social-proof',
    type: 'social-proof', 
    name: 'Prova Social', 
    description: 'Números e estatísticas',
    icon: <Users className="w-4 h-4" />,
    category: 'Social'
  },
  { 
    id: 'video',
    type: 'video', 
    name: 'Vídeo', 
    description: 'Player de vídeo',
    icon: <Play className="w-4 h-4" />,
    category: 'Mídia'
  },
  { 
    id: 'email-input',
    type: 'email-input', 
    name: 'Campo de Email', 
    description: 'Input específico para email',
    icon: <Calendar className="w-4 h-4" />,
    category: 'Formulário'
  },
  { 
    id: 'phone-input',
    type: 'phone-input', 
    name: 'Campo de Telefone', 
    description: 'Input específico para telefone',
    icon: <Calendar className="w-4 h-4" />,
    category: 'Formulário'
  }
];

const CaktoQuizAdvancedEditor: React.FC = () => {
  // Estados principais
  const [funnel, setFunnel] = useState<Funnel>(createInitialFunnel);
  const [currentPageId, setCurrentPageId] = useState<string>('intro');
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'funnel' | 'blocks' | 'settings'>('funnel');
  const [deviceView, setDeviceView] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isAutoSaving, setIsAutoSaving] = useState<boolean>(false);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Hook para toast
  const { toast } = useToast();

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

  // Função para atualizar configurações do bloco
  const updateBlockSetting = useCallback((key: string, value: any) => {
    if (!selectedBlockId) return;

    setFunnel(prev => ({
      ...prev,
      pages: prev.pages.map(page => 
        page.id === currentPageId 
          ? {
              ...page,
              blocks: page.blocks.map(block =>
                block.id === selectedBlockId
                  ? { ...block, settings: { ...block.settings, [key]: value } }
                  : block
              )
            }
          : page
      )
    }));
  }, [selectedBlockId, currentPageId]);

  // Função para atualizar estilos do bloco
  const updateBlockStyle = useCallback((key: string, value: any) => {
    if (!selectedBlockId) return;

    setFunnel(prev => ({
      ...prev,
      pages: prev.pages.map(page => 
        page.id === currentPageId 
          ? {
              ...page,
              blocks: page.blocks.map(block =>
                block.id === selectedBlockId
                  ? { ...block, style: { ...block.style, [key]: value } }
                  : block
              )
            }
          : page
      )
    }));
  }, [selectedBlockId, currentPageId]);

  // Função para atualizar opções de pergunta
  const updateQuestionOption = useCallback((optionIndex: number, key: string, value: any) => {
    if (!selectedBlockId || !selectedBlock) return;

    const options = [...(selectedBlock.settings.options || [])];
    options[optionIndex] = { ...options[optionIndex], [key]: value };

    updateBlockSetting('options', options);
  }, [selectedBlockId, selectedBlock, updateBlockSetting]);

  // Função para adicionar opção de pergunta
  const addQuestionOption = useCallback(() => {
    if (!selectedBlockId || !selectedBlock) return;

    const options = [...(selectedBlock.settings.options || [])];
    const nextLetter = String.fromCharCode(65 + options.length);
    
    options.push({
      id: nextLetter.toLowerCase(),
      text: `Opção ${nextLetter}`,
      value: nextLetter.toLowerCase()
    });

    updateBlockSetting('options', options);
  }, [selectedBlockId, selectedBlock, updateBlockSetting]);

  // Função para remover opção de pergunta
  const removeQuestionOption = useCallback((optionIndex: number) => {
    if (!selectedBlockId || !selectedBlock) return;

    const options = [...(selectedBlock.settings.options || [])];
    options.splice(optionIndex, 1);

    updateBlockSetting('options', options);
  }, [selectedBlockId, selectedBlock, updateBlockSetting]);

  // Funções para gerenciar FAQ
  const updateFAQ = useCallback((faqIndex: number, key: string, value: any) => {
    if (!selectedBlockId || !selectedBlock) return;

    const questions = [...(selectedBlock.settings.questions || [])];
    questions[faqIndex] = { ...questions[faqIndex], [key]: value };

    updateBlockSetting('questions', questions);
  }, [selectedBlockId, selectedBlock, updateBlockSetting]);

  const addFAQ = useCallback(() => {
    if (!selectedBlockId || !selectedBlock) return;

    const questions = [...(selectedBlock.settings.questions || [])];
    questions.push({
      question: 'Nova pergunta',
      answer: 'Nova resposta'
    });

    updateBlockSetting('questions', questions);
  }, [selectedBlockId, selectedBlock, updateBlockSetting]);

  const removeFAQ = useCallback((faqIndex: number) => {
    if (!selectedBlockId || !selectedBlock) return;

    const questions = [...(selectedBlock.settings.questions || [])];
    questions.splice(faqIndex, 1);

    updateBlockSetting('questions', questions);
  }, [selectedBlockId, selectedBlock, updateBlockSetting]);

  // Funções de Drag & Drop modernas
  const handleDragStart = useCallback((e: React.DragEvent, blockId: string, sourceIndex: number) => {
    setIsDragging(true);
    e.dataTransfer.setData('application/json', JSON.stringify({
      type: 'reorder',
      blockId,
      sourceIndex
    }));
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(targetIndex);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    setIsDragging(false);
    setDragOverIndex(null);

    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      
      if (data.type === 'reorder' && currentPage) {
        const blocks = [...currentPage.blocks];
        const sourceIndex = data.sourceIndex;
        
        if (sourceIndex !== targetIndex) {
          // Remover o bloco da posição original
          const [movedBlock] = blocks.splice(sourceIndex, 1);
          
          // Inserir na nova posição
          blocks.splice(targetIndex, 0, movedBlock);
          
          // Atualizar orders
          blocks.forEach((block, index) => {
            block.order = index + 1;
          });
          
          setFunnel(prev => ({
            ...prev,
            pages: prev.pages.map(page => 
              page.id === currentPageId 
                ? { ...page, blocks }
                : page
            )
          }));
        }
      }
    } catch (error) {
      // Se não conseguir fazer parse, pode ser um novo bloco da biblioteca
      const blockType = e.dataTransfer.getData('text/plain');
      if (blockType && currentPage) {
        const newBlock: FunnelBlock = {
          id: `${blockType}-${Date.now()}`,
          type: blockType,
          order: targetIndex + 1,
          settings: {}
        };

        const blocks = [...currentPage.blocks];
        blocks.splice(targetIndex, 0, newBlock);
        
        // Reordenar todos os blocos
        blocks.forEach((block, index) => {
          block.order = index + 1;
        });

        setFunnel(prev => ({
          ...prev,
          pages: prev.pages.map(page => 
            page.id === currentPageId 
              ? { ...page, blocks }
              : page
          )
        }));

        setSelectedBlockId(newBlock.id);
      }
    }
  }, [currentPage, currentPageId]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    setDragOverIndex(null);
  }, []);

  const handleCanvasDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setDragOverIndex(null);

    const blockType = e.dataTransfer.getData('text/plain');
    if (blockType && currentPage) {
      addBlock(blockType);
    }
  }, [currentPage, addBlock]);

  const handleCanvasDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  // Função para salvar o funil
  const saveFunnel = useCallback(() => {
    try {
      localStorage.setItem('caktoquiz-funnel', JSON.stringify(funnel));
      // Aqui poderia fazer uma chamada para API para salvar no servidor
      console.log('Funil salvo com sucesso!');
      
      // Notificação de sucesso
      toast({
        title: "Funil salvo!",
        description: "Suas alterações foram salvas com sucesso.",
        variant: "default",
      });
    } catch (error) {
      console.error('Erro ao salvar funil:', error);
      
      // Notificação de erro
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar o funil. Tente novamente.",
        variant: "destructive",
      });
    }
  }, [funnel]);

  // Função para carregar funil salvo
  const loadSavedFunnel = useCallback(() => {
    try {
      const savedFunnel = localStorage.getItem('caktoquiz-funnel');
      if (savedFunnel) {
        setFunnel(JSON.parse(savedFunnel));
        console.log('Funil carregado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao carregar funil salvo:', error);
    }
  }, []);

  // Carregar funil salvo na inicialização
  React.useEffect(() => {
    loadSavedFunnel();
  }, [loadSavedFunnel]);

  // Atalhos de teclado
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+S ou Cmd+S para salvar
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveFunnel();
      }
      
      // Delete para remover bloco selecionado
      if (e.key === 'Delete' && selectedBlockId && selectedBlock) {
        setFunnel(prev => ({
          ...prev,
          pages: prev.pages.map(page => 
            page.id === currentPageId 
              ? { 
                  ...page, 
                  blocks: page.blocks
                    .filter(b => b.id !== selectedBlock.id)
                    .map((b, index) => ({ ...b, order: index + 1 }))
                }
              : page
          )
        }));
        
        setSelectedBlockId(null);
      }
      
      // Escape para deselecionar bloco
      if (e.key === 'Escape') {
        setSelectedBlockId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saveFunnel, selectedBlockId, selectedBlock, currentPageId, setFunnel]);

  // Auto-save a cada 30 segundos
  React.useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      setIsAutoSaving(true);
      setTimeout(() => {
        try {
          localStorage.setItem('caktoquiz-funnel', JSON.stringify(funnel));
          console.log('Auto-save realizado');
        } catch (error) {
          console.error('Erro no auto-save:', error);
        } finally {
          setIsAutoSaving(false);
        }
      }, 500);
    }, 30000); // 30 segundos

    return () => clearInterval(autoSaveInterval);
  }, [funnel]);

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
          <div 
            style={{
              ...baseStyle,
              textAlign: block.settings.alignment || 'center'
            }} 
            onClick={handleBlockClick} 
            className="py-4"
          >
            <h1 className={`font-bold text-[#432818] mb-4 font-playfair ${
              block.settings.titleSize === 'small' ? 'text-xl md:text-2xl' :
              block.settings.titleSize === 'medium' ? 'text-2xl md:text-3xl' :
              'text-3xl md:text-4xl'
            }`}>
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
          <div 
            style={{
              ...baseStyle,
              textAlign: block.settings.alignment || 'left'
            }} 
            onClick={handleBlockClick}
            className="py-2"
          >
            <p className={`text-[#432818] leading-relaxed ${
              block.settings.fontSize === 'small' ? 'text-sm' :
              block.settings.fontSize === 'large' ? 'text-lg' :
              'text-base'
            }`}>
              {block.settings.content || 'Conteúdo do texto aqui...'}
            </p>
          </div>
        );
        break;

      case 'image':
        content = (
          <div 
            style={{
              ...baseStyle,
              textAlign: block.settings.alignment || 'center'
            }} 
            onClick={handleBlockClick} 
            className="py-4"
          >
            <img
              src={block.settings.src || 'https://via.placeholder.com/600x400?text=Imagem'}
              alt={block.settings.alt || 'Imagem'}
              className="max-w-full h-auto rounded-lg shadow-md mx-auto"
              style={{ width: block.settings.width || 'auto' }}
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
          <div style={baseStyle} onClick={handleBlockClick} className="text-center py-4">
            <Button 
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${buttonClasses[buttonStyle] || buttonClasses.primary} ${
                block.settings.fullWidth ? 'w-full' : ''
              } ${
                block.settings.size === 'sm' ? 'px-6 py-2 text-sm' :
                block.settings.size === 'lg' ? 'px-12 py-4 text-lg' :
                'px-8 py-3'
              }`}
            >
              {block.settings.text || 'Texto do Botão'}
            </Button>
          </div>
        );
        break;

      case 'form-input':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#432818]">
                {block.settings.label || 'Campo de entrada'}
                {block.settings.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              <Input
                type={block.settings.type || 'text'}
                placeholder={block.settings.placeholder || 'Digite aqui...'}
                className="w-full h-12 text-base border-2 border-[#B89B7A]/30 focus:border-[#B89B7A] rounded-xl bg-white focus:ring-2 focus:ring-[#B89B7A]/20"
              />
            </div>
          </div>
        );
        break;

      case 'question-multiple':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6">
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-semibold text-[#432818] text-center leading-relaxed">
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
                    className="w-full p-4 h-auto text-left justify-start border-2 border-[#B89B7A]/30 hover:border-[#B89B7A] hover:bg-[#f9f4ef] rounded-xl transition-all duration-200 text-base group"
                  >
                    <span className="font-semibold text-[#B89B7A] mr-3 min-w-[24px] group-hover:scale-110 transition-transform">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="text-[#432818] group-hover:text-[#432818]">
                      {option.text}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );
        break;

      case 'question-strategic':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6">
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-semibold text-[#432818] text-center leading-relaxed">
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
                    className="w-full p-4 h-auto text-center border-2 border-[#6B5B73]/30 hover:border-[#6B5B73] hover:bg-[#6B5B73]/10 rounded-xl transition-all duration-200 text-base group"
                  >
                    <span className="text-[#432818] group-hover:text-[#6B5B73] font-medium">
                      {option.text}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );
        break;

      case 'loader':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="text-center py-12">
            <div className="inline-flex items-center space-x-3">
              <RotateCcw className="h-8 w-8 animate-spin text-[#B89B7A]" />
              <span className="text-[#432818] text-lg font-medium">
                {block.settings.message || 'Carregando...'}
              </span>
            </div>
          </div>
        );
        break;

      case 'price':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="text-center py-6">
            <div className="bg-gradient-to-br from-[#B89B7A] to-[#A1835D] p-8 rounded-2xl text-white shadow-2xl max-w-md mx-auto">
              {block.settings.originalPrice && (
                <div className="text-xl line-through opacity-75 mb-2">
                  {block.settings.originalPrice}
                </div>
              )}
              <div className="text-5xl font-bold mb-4">
                {block.settings.currentPrice || 'R$ 97,00'}
              </div>
              {block.settings.discount && (
                <div className="text-sm font-semibold bg-red-500 text-white px-4 py-2 rounded-full inline-block mb-4 animate-pulse">
                  {block.settings.discount}
                </div>
              )}
              {block.settings.urgency && (
                <div className="text-base opacity-90 font-medium">
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

      case 'testimonial':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 max-w-lg mx-auto">
              <div className="flex items-center mb-4">
                <img
                  src={block.settings.avatar || 'https://via.placeholder.com/60x60?text=👤'}
                  alt={block.settings.author || 'Cliente'}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-[#432818]">
                    {block.settings.author || 'Maria Silva'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {block.settings.role || 'Cliente satisfeita'}
                  </p>
                </div>
              </div>
              <div className="flex mb-3">
                {Array.from({ length: block.settings.rating || 5 }, (_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-[#432818] italic">
                "{block.settings.text || 'Este produto mudou minha vida! Recomendo para todos.'}"
              </blockquote>
            </div>
          </div>
        );
        break;

      case 'guarantee':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6">
            <div className="flex items-center justify-center bg-green-50 border-2 border-green-200 rounded-2xl p-6 max-w-md mx-auto">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800">
                    {block.settings.title || 'Garantia de 30 dias'}
                  </h4>
                  <p className="text-sm text-green-700">
                    {block.settings.description || 'Se não ficar satisfeito, devolvemos 100% do seu dinheiro.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        break;

      case 'countdown':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6">
            <div className="text-center bg-red-50 border-2 border-red-200 rounded-2xl p-6 max-w-md mx-auto">
              <h4 className="font-bold text-red-800 mb-4">
                {block.settings.title || 'Oferta por tempo limitado!'}
              </h4>
              <div className="flex justify-center gap-4">
                <div className="bg-red-600 text-white p-3 rounded-lg">
                  <div className="text-2xl font-bold">23</div>
                  <div className="text-xs">Horas</div>
                </div>
                <div className="bg-red-600 text-white p-3 rounded-lg">
                  <div className="text-2xl font-bold">59</div>
                  <div className="text-xs">Min</div>
                </div>
                <div className="bg-red-600 text-white p-3 rounded-lg">
                  <div className="text-2xl font-bold">42</div>
                  <div className="text-xs">Seg</div>
                </div>
              </div>
            </div>
          </div>
        );
        break;

      case 'bonus':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl max-w-md mx-auto">
              <div className="flex items-center mb-3">
                <Gift className="w-6 h-6 mr-2" />
                <span className="font-bold text-lg">BÔNUS ESPECIAL</span>
              </div>
              <h4 className="font-bold text-xl mb-2">
                {block.settings.title || 'E-book Exclusivo de Estilo'}
              </h4>
              <p className="text-sm opacity-90">
                {block.settings.description || 'Guia completo com dicas avançadas de styling'}
              </p>
              <div className="mt-3 text-sm font-semibold">
                Valor: {block.settings.value || 'R$ 47,00'}
              </div>
            </div>
          </div>
        );
        break;

      case 'faq':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-[#432818] mb-6 text-center">
                Perguntas Frequentes
              </h3>
              <div className="space-y-4">
                {(block.settings.questions || [
                  { question: 'Como funciona o quiz?', answer: 'É muito simples! Você responde algumas perguntas e recebe seu resultado personalizado.' },
                  { question: 'Quanto tempo demora?', answer: 'O quiz leva apenas 3 minutos para ser concluído.' }
                ]).map((faq: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-[#432818] mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-gray-700 text-sm">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        break;

      case 'social-proof':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 max-w-md mx-auto text-center">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {block.settings.number1 || '10.000+'}
                  </div>
                  <div className="text-sm text-blue-800">
                    {block.settings.label1 || 'Mulheres'}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {block.settings.number2 || '4.9★'}
                  </div>
                  <div className="text-sm text-blue-800">
                    {block.settings.label2 || 'Avaliação'}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {block.settings.number3 || '99%'}
                  </div>
                  <div className="text-sm text-blue-800">
                    {block.settings.label3 || 'Satisfação'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        break;

      case 'video':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6">
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-900 rounded-2xl overflow-hidden aspect-video relative">
                {block.settings.videoUrl ? (
                  <iframe
                    src={block.settings.videoUrl}
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                    title="Vídeo"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="opacity-75">Adicione uma URL de vídeo</p>
                    </div>
                  </div>
                )}
              </div>
              {block.settings.caption && (
                <p className="text-center text-sm text-gray-600 mt-3">
                  {block.settings.caption}
                </p>
              )}
            </div>
          </div>
        );
        break;

      // Novos blocos específicos
      case 'loading-animation':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="text-center py-12">
            <div className="inline-flex flex-col items-center space-y-4">
              {block.settings.type === 'elegant' ? (
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-[#B89B7A] border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-[#6B5B73] rounded-full animate-ping"></div>
                </div>
              ) : (
                <RotateCcw className="h-10 w-10 animate-spin text-[#B89B7A]" />
              )}
              <span className="text-[#432818] text-lg font-medium">
                {block.settings.message || 'Carregando...'}
              </span>
              {block.settings.duration && (
                <div className="text-sm text-gray-500">
                  Duração: {block.settings.duration / 1000}s
                </div>
              )}
            </div>
          </div>
        );
        break;

      case 'style-result-display':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-[#432818] mb-2">
                  {block.settings.styleName || 'Seu Estilo'}
                </h2>
                {block.settings.percentMatch && (
                  <div className="text-lg text-[#B89B7A] font-semibold">
                    {block.settings.percentMatch}% de compatibilidade
                  </div>
                )}
              </div>
              
              {block.settings.styleImage && (
                <div className="mb-6">
                  <img
                    src={block.settings.styleImage}
                    alt={block.settings.styleName || 'Estilo'}
                    className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
                  />
                </div>
              )}
              
              <p className="text-lg text-[#432818] leading-relaxed">
                {block.settings.styleDescription || 'Descrição do seu estilo personalizado.'}
              </p>
            </div>
          </div>
        );
        break;

      case 'sales-offer':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-8">
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-[#B89B7A] to-[#A1835D] rounded-3xl p-8 text-white text-center shadow-2xl">
                <h3 className="text-3xl font-bold mb-4">
                  {block.settings.title || 'Oferta Especial'}
                </h3>
                <p className="text-xl mb-6 opacity-90">
                  {block.settings.subtitle || 'Não perca esta oportunidade'}
                </p>
                
                <div className="flex justify-center items-center gap-4 mb-6">
                  {block.settings.originalPrice && (
                    <span className="text-xl line-through opacity-75">
                      {block.settings.originalPrice}
                    </span>
                  )}
                  <span className="text-5xl font-bold">
                    {block.settings.currentPrice || 'R$ 97,00'}
                  </span>
                  {block.settings.discount && (
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                      {block.settings.discount}
                    </span>
                  )}
                </div>
                
                {block.settings.urgency && (
                  <p className="text-lg mb-6 opacity-90 font-semibold">
                    {block.settings.urgency}
                  </p>
                )}
                
                <Button className="bg-white text-[#B89B7A] hover:bg-gray-100 text-xl px-12 py-4 rounded-full font-bold transform hover:scale-105 transition-all">
                  Quero Transformar Meu Estilo!
                </Button>
              </div>
            </div>
          </div>
        );
        break;

      case 'testimonials-grid':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-[#432818] mb-8 text-center">
                O que nossas clientes dizem
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {(block.settings.testimonials || [
                  {
                    author: 'Cliente Satisfeita',
                    role: 'Usuária do Quiz',
                    text: 'Adorei descobrir meu estilo!',
                    rating: 5,
                    avatar: 'https://via.placeholder.com/60x60?text=👤'
                  }
                ]).map((testimonial: any, index: number) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <p className="font-semibold text-[#432818]">{testimonial.author}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {Array.from({ length: testimonial.rating || 5 }, (_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-[#432818] italic">
                      "{testimonial.text}"
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        break;

      case 'guarantee-section':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-8">
            <div className="max-w-2xl mx-auto">
              <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                
                <h4 className="text-2xl font-bold text-green-800 mb-4">
                  {block.settings.title || 'Garantia de Satisfação'}
                </h4>
                
                <p className="text-green-700 text-lg mb-6">
                  {block.settings.description || 'Sua satisfação é garantida'}
                </p>
                
                {block.settings.features && (
                  <div className="space-y-3">
                    {block.settings.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-green-800 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        break;

      case 'strategic-question':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-8">
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center">
                <span className="inline-block bg-[#6B5B73] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Pergunta Estratégica
                </span>
                <h3 className="text-xl md:text-2xl font-semibold text-[#432818] leading-relaxed">
                  {block.settings.question || 'Pergunta estratégica sobre seus objetivos'}
                </h3>
              </div>
              
              <div className="space-y-3">
                {(block.settings.options || [
                  { id: 'a', text: 'Sim, definitivamente', value: 'high' },
                  { id: 'b', text: 'Talvez, preciso saber mais', value: 'medium' },
                  { id: 'c', text: 'Não, não me interessa', value: 'low' }
                ]).map((option: any) => (
                  <Button
                    key={option.id}
                    variant="outline"
                    className="w-full p-6 h-auto text-center border-2 border-[#6B5B73]/30 hover:border-[#6B5B73] hover:bg-[#6B5B73]/10 rounded-xl transition-all duration-200 text-base group"
                  >
                    <span className="text-[#432818] group-hover:text-[#6B5B73] font-medium">
                      {option.text}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );
        break;

      case 'email-input':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-4">
            <div className="space-y-2 max-w-md mx-auto">
              <Label className="text-sm font-medium text-[#432818]">
                {block.settings.label || 'Email'}
                {block.settings.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              <Input
                type="email"
                placeholder={block.settings.placeholder || 'seu@email.com'}
                className="w-full h-12 text-base border-2 border-[#B89B7A]/30 focus:border-[#B89B7A] rounded-xl bg-white focus:ring-2 focus:ring-[#B89B7A]/20"
              />
            </div>
          </div>
        );
        break;

      case 'phone-input':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-4">
            <div className="space-y-2 max-w-md mx-auto">
              <Label className="text-sm font-medium text-[#432818]">
                {block.settings.label || 'Telefone'}
                {block.settings.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              <Input
                type="tel"
                placeholder={block.settings.placeholder || '(11) 99999-9999'}
                className="w-full h-12 text-base border-2 border-[#B89B7A]/30 focus:border-[#B89B7A] rounded-xl bg-white focus:ring-2 focus:ring-[#B89B7A]/20"
              />
            </div>
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
                
                {/* Agrupar blocos por categoria */}
                {['Texto', 'Mídia', 'Interação', 'Quiz', 'Quiz Avançado', 'Formulário', 'Vendas', 'Social', 'Urgência', 'Informação', 'UI'].map(category => {
                  const categoryBlocks = blockLibrary.filter(block => block.category === category);
                  if (categoryBlocks.length === 0) return null;
                  
                  return (
                    <div key={category}>
                      <h4 className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">
                        {category}
                      </h4>
                      <div className="space-y-2 mb-4">
                        {categoryBlocks.map((block) => (
                          <div
                            key={block.type}
                            className="group p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors hover:shadow-sm"
                            onClick={() => addBlock(block.type)}
                            draggable
                            onDragStart={(e) => {
                              e.dataTransfer.setData('text/plain', block.type);
                              e.dataTransfer.effectAllowed = 'copy';
                              setIsDragging(true);
                            }}
                            onDragEnd={() => setIsDragging(false)}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="text-gray-600">{block.icon}</div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{block.name}</p>
                                <p className="text-xs text-gray-500">{block.description}</p>
                              </div>
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-3 h-4 flex flex-col justify-center items-center">
                                  <div className="w-0.5 h-0.5 bg-gray-400 rounded-full mb-0.5"></div>
                                  <div className="w-0.5 h-0.5 bg-gray-400 rounded-full mb-0.5"></div>
                                  <div className="w-0.5 h-0.5 bg-gray-400 rounded-full"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
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
            {currentPage && (
              <Badge variant="outline" className="text-xs text-gray-500">
                {currentPage.blocks.length} bloco{currentPage.blocks.length !== 1 ? 's' : ''}
              </Badge>
            )}
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
              size="sm" 
              variant="outline"
              onClick={() => {
                // Preview do funil - abrir em nova aba
                window.open('/quiz', '_blank');
              }}
              className="h-8"
            >
              <Eye className="h-3 w-3 mr-1" />
              Preview
            </Button>

            <div className="flex items-center gap-2">
              {isAutoSaving && (
                <div className="flex items-center text-xs text-gray-500">
                  <RotateCcw className="h-3 w-3 animate-spin mr-1" />
                  Salvando...
                </div>
              )}
              
              <Button size="sm" className="h-8 bg-[#B89B7A] hover:bg-[#A1835D]" onClick={saveFunnel}>
                <Save className="h-3 w-3 mr-1" />
                Salvar
              </Button>
            </div>
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
                        <>
                          {currentPage.blocks
                            .sort((a, b) => a.order - b.order)
                            .map((block, index) => (
                              <div 
                                key={block.id}
                                className="group/canvas-item max-w-full canvas-item min-h-[1.25rem] relative self-auto mr-auto mb-4 w-full"
                                draggable
                                onDragStart={(e) => handleDragStart(e, block.id, index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, index)}
                                onDragEnd={handleDragEnd}
                              >
                                {/* Indicador visual de drop zone */}
                                {dragOverIndex === index && isDragging && (
                                  <div className="absolute -top-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full z-10" />
                                )}
                                
                                <div 
                                  className={`min-h-[1.25rem] min-w-full relative self-auto box-border ${
                                    selectedBlockId === block.id 
                                      ? 'border-2 border-blue-500 border-dashed' 
                                      : 'group-hover/canvas-item:border-2 hover:border-2 border-dashed border-blue-500'
                                  } rounded-md transition-all duration-200 ${
                                    isDragging && dragOverIndex === index 
                                      ? 'bg-blue-50 border-blue-300' 
                                      : ''
                                  }`}
                                  style={{ 
                                    opacity: isDragging && selectedBlockId === block.id ? 0.5 : 1 
                                  }}
                                >
                                  {/* Controles de drag handle - visível no hover */}
                                  <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover/canvas-item:opacity-100 transition-opacity">
                                    <div className="w-4 h-8 bg-gray-200 rounded border border-gray-300 flex flex-col justify-center items-center cursor-grab hover:bg-gray-300 active:cursor-grabbing">
                                      <div className="w-0.5 h-0.5 bg-gray-500 rounded-full mb-0.5"></div>
                                      <div className="w-0.5 h-0.5 bg-gray-500 rounded-full mb-0.5"></div>
                                      <div className="w-0.5 h-0.5 bg-gray-500 rounded-full"></div>
                                    </div>
                                  </div>
                                  
                                  {renderBlock(block)}
                                </div>
                              </div>
                            ))}
                          
                          {/* Drop zone no final para adicionar novos blocos */}
                          <div 
                            className={`w-full h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-sm transition-all ${
                              isDragging ? 'border-blue-400 bg-blue-50 text-blue-600' : 'hover:border-gray-400 hover:bg-gray-50'
                            }`}
                            onDragOver={handleCanvasDragOver}
                            onDrop={handleCanvasDrop}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            {isDragging ? 'Solte aqui para adicionar' : 'Arraste um bloco aqui ou clique na biblioteca'}
                          </div>
                        </>
                      ) : (
                        <div 
                          className={`text-center py-12 text-gray-500 w-full border-2 border-dashed border-gray-300 rounded-lg transition-all ${
                            isDragging ? 'border-blue-400 bg-blue-50 text-blue-600' : 'hover:border-gray-400'
                          }`}
                          onDragOver={handleCanvasDragOver}
                          onDrop={handleCanvasDrop}
                        >
                          <Layout className="h-8 w-8 mx-auto mb-4 opacity-50" />
                          <p className="font-medium mb-2">
                            {isDragging ? 'Solte aqui para adicionar o primeiro bloco' : 'Esta página está vazia'}
                          </p>
                          <p className="text-sm">
                            {isDragging ? '' : 'Adicione blocos da biblioteca para começar'}
                          </p>
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
            {selectedBlock ? (
              <div className="space-y-4">
                {/* Cabeçalho do bloco */}
                <div className="pb-4 border-b">
                  <h3 className="font-medium text-sm mb-2">
                    {blockLibrary.find(b => b.type === selectedBlock.type)?.name || selectedBlock.type}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {blockLibrary.find(b => b.type === selectedBlock.type)?.description || 'Bloco personalizado'}
                  </p>
                  
                  {/* Ações do bloco */}
                  <div className="flex gap-2 mt-3">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        // Mover bloco para cima
                        const blocks = [...(currentPage?.blocks || [])];
                        const currentIndex = blocks.findIndex(b => b.id === selectedBlockId);
                        
                        if (currentIndex > 0) {
                          // Trocar posições
                          [blocks[currentIndex - 1], blocks[currentIndex]] = [blocks[currentIndex], blocks[currentIndex - 1]];
                          
                          // Atualizar orders
                          blocks.forEach((block, index) => {
                            block.order = index + 1;
                          });
                          
                          setFunnel(prev => ({
                            ...prev,
                            pages: prev.pages.map(page => 
                              page.id === currentPageId 
                                ? { ...page, blocks }
                                : page
                            )
                          }));
                        }
                      }}
                      disabled={!currentPage || currentPage.blocks.findIndex(b => b.id === selectedBlockId) === 0}
                      className="h-7 text-xs"
                    >
                      ↑ Subir
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        // Mover bloco para baixo
                        const blocks = [...(currentPage?.blocks || [])];
                        const currentIndex = blocks.findIndex(b => b.id === selectedBlockId);
                        
                        if (currentIndex < blocks.length - 1) {
                          // Trocar posições
                          [blocks[currentIndex], blocks[currentIndex + 1]] = [blocks[currentIndex + 1], blocks[currentIndex]];
                          
                          // Atualizar orders
                          blocks.forEach((block, index) => {
                            block.order = index + 1;
                          });
                          
                          setFunnel(prev => ({
                            ...prev,
                            pages: prev.pages.map(page => 
                              page.id === currentPageId 
                                ? { ...page, blocks }
                                : page
                            )
                          }));
                        }
                      }}
                      disabled={!currentPage || currentPage.blocks.findIndex(b => b.id === selectedBlockId) === (currentPage?.blocks.length || 1) - 1}
                      className="h-7 text-xs"
                    >
                      ↓ Descer
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        // Duplicar bloco
                        const newBlock: FunnelBlock = {
                          ...selectedBlock,
                          id: `${selectedBlock.type}-${Date.now()}`,
                          order: selectedBlock.order + 1
                        };
                        
                        setFunnel(prev => ({
                          ...prev,
                          pages: prev.pages.map(page => 
                            page.id === currentPageId 
                              ? { 
                                  ...page, 
                                  blocks: [
                                    ...page.blocks.map(b => 
                                      b.order > selectedBlock.order 
                                        ? { ...b, order: b.order + 1 }
                                        : b
                                    ),
                                    newBlock
                                  ].sort((a, b) => a.order - b.order)
                                }
                              : page
                          )
                        }));
                        
                        setSelectedBlockId(newBlock.id);
                      }}
                      className="h-7 text-xs"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Duplicar
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        // Remover bloco
                        setFunnel(prev => ({
                          ...prev,
                          pages: prev.pages.map(page => 
                            page.id === currentPageId 
                              ? { 
                                  ...page, 
                                  blocks: page.blocks
                                    .filter(b => b.id !== selectedBlock.id)
                                    .map((b, index) => ({ ...b, order: index + 1 }))
                                }
                              : page
                          )
                        }));
                        
                        setSelectedBlockId(null);
                      }}
                      className="h-7 text-xs text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remover
                    </Button>
                  </div>
                </div>

                {/* Propriedades específicas do bloco */}
                {selectedBlock.type === 'header' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">Título</Label>
                      <Input
                        value={selectedBlock.settings.title || ''}
                        onChange={(e) => updateBlockSetting('title', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="Digite o título"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Subtítulo</Label>
                      <Input
                        value={selectedBlock.settings.subtitle || ''}
                        onChange={(e) => updateBlockSetting('subtitle', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="Digite o subtítulo"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Tamanho do Título</Label>
                      <select 
                        value={selectedBlock.settings.titleSize || 'large'}
                        onChange={(e) => updateBlockSetting('titleSize', e.target.value)}
                        className="w-full h-8 text-sm border border-gray-300 rounded mt-1 px-2"
                      >
                        <option value="small">Pequeno</option>
                        <option value="medium">Médio</option>
                        <option value="large">Grande</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label className="text-xs">Alinhamento</Label>
                      <div className="flex gap-1 mt-1">
                        <Button
                          size="sm"
                          variant={selectedBlock.settings.alignment === 'left' ? 'default' : 'outline'}
                          onClick={() => updateBlockSetting('alignment', 'left')}
                          className="h-7 w-7 p-0"
                        >
                          <AlignLeft className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant={selectedBlock.settings.alignment === 'center' ? 'default' : 'outline'}
                          onClick={() => updateBlockSetting('alignment', 'center')}
                          className="h-7 w-7 p-0"
                        >
                          <AlignCenter className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant={selectedBlock.settings.alignment === 'right' ? 'default' : 'outline'}
                          onClick={() => updateBlockSetting('alignment', 'right')}
                          className="h-7 w-7 p-0"
                        >
                          <AlignRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {selectedBlock.type === 'text' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">Conteúdo</Label>
                      <Textarea
                        value={selectedBlock.settings.content || ''}
                        onChange={(e) => updateBlockSetting('content', e.target.value)}
                        className="text-sm resize-none mt-1"
                        rows={4}
                        placeholder="Digite o conteúdo do texto"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Tamanho da Fonte</Label>
                      <select 
                        value={selectedBlock.settings.fontSize || 'medium'}
                        onChange={(e) => updateBlockSetting('fontSize', e.target.value)}
                        className="w-full h-8 text-sm border border-gray-300 rounded mt-1 px-2"
                      >
                        <option value="small">Pequena</option>
                        <option value="medium">Média</option>
                        <option value="large">Grande</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label className="text-xs">Alinhamento</Label>
                      <div className="flex gap-1 mt-1">
                        <Button
                          size="sm"
                          variant={selectedBlock.settings.alignment === 'left' ? 'default' : 'outline'}
                          onClick={() => updateBlockSetting('alignment', 'left')}
                          className="h-7 w-7 p-0"
                        >
                          <AlignLeft className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant={selectedBlock.settings.alignment === 'center' ? 'default' : 'outline'}
                          onClick={() => updateBlockSetting('alignment', 'center')}
                          className="h-7 w-7 p-0"
                        >
                          <AlignCenter className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant={selectedBlock.settings.alignment === 'right' ? 'default' : 'outline'}
                          onClick={() => updateBlockSetting('alignment', 'right')}
                          className="h-7 w-7 p-0"
                        >
                          <AlignRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {selectedBlock.type === 'image' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">URL da Imagem</Label>
                      <Input
                        value={selectedBlock.settings.src || ''}
                        onChange={(e) => updateBlockSetting('src', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Texto Alternativo</Label>
                      <Input
                        value={selectedBlock.settings.alt || ''}
                        onChange={(e) => updateBlockSetting('alt', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="Descrição da imagem"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Largura</Label>
                      <Input
                        value={selectedBlock.settings.width || '100%'}
                        onChange={(e) => updateBlockSetting('width', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="100% ou 500px"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Alinhamento</Label>
                      <div className="flex gap-1 mt-1">
                        <Button
                          size="sm"
                          variant={selectedBlock.settings.alignment === 'left' ? 'default' : 'outline'}
                          onClick={() => updateBlockSetting('alignment', 'left')}
                          className="h-7 w-7 p-0"
                        >
                          <AlignLeft className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant={selectedBlock.settings.alignment === 'center' ? 'default' : 'outline'}
                          onClick={() => updateBlockSetting('alignment', 'center')}
                          className="h-7 w-7 p-0"
                        >
                          <AlignCenter className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant={selectedBlock.settings.alignment === 'right' ? 'default' : 'outline'}
                          onClick={() => updateBlockSetting('alignment', 'right')}
                          className="h-7 w-7 p-0"
                        >
                          <AlignRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {selectedBlock.type === 'button' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">Texto do Botão</Label>
                      <Input
                        value={selectedBlock.settings.text || ''}
                        onChange={(e) => updateBlockSetting('text', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="Digite o texto do botão"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Estilo</Label>
                      <select 
                        value={selectedBlock.settings.style || 'primary'}
                        onChange={(e) => updateBlockSetting('style', e.target.value)}
                        className="w-full h-8 text-sm border border-gray-300 rounded mt-1 px-2"
                      >
                        <option value="primary">Primário</option>
                        <option value="secondary">Secundário</option>
                        <option value="accent">Destaque</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label className="text-xs">Tamanho</Label>
                      <select 
                        value={selectedBlock.settings.size || 'default'}
                        onChange={(e) => updateBlockSetting('size', e.target.value)}
                        className="w-full h-8 text-sm border border-gray-300 rounded mt-1 px-2"
                      >
                        <option value="sm">Pequeno</option>
                        <option value="default">Padrão</option>
                        <option value="lg">Grande</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={selectedBlock.settings.fullWidth || false}
                        onCheckedChange={(checked) => updateBlockSetting('fullWidth', checked)}
                      />
                      <Label className="text-xs">Largura Total</Label>
                    </div>
                  </div>
                )}

                {selectedBlock.type === 'form-input' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">Rótulo</Label>
                      <Input
                        value={selectedBlock.settings.label || ''}
                        onChange={(e) => updateBlockSetting('label', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="Digite o rótulo"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Placeholder</Label>
                      <Input
                        value={selectedBlock.settings.placeholder || ''}
                        onChange={(e) => updateBlockSetting('placeholder', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="Digite o placeholder"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Tipo</Label>
                      <select 
                        value={selectedBlock.settings.type || 'text'}
                        onChange={(e) => updateBlockSetting('type', e.target.value)}
                        className="w-full h-8 text-sm border border-gray-300 rounded mt-1 px-2"
                      >
                        <option value="text">Texto</option>
                        <option value="email">Email</option>
                        <option value="tel">Telefone</option>
                        <option value="number">Número</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={selectedBlock.settings.required || false}
                        onCheckedChange={(checked) => updateBlockSetting('required', checked)}
                      />
                      <Label className="text-xs">Campo Obrigatório</Label>
                    </div>
                  </div>
                )}

                {(selectedBlock.type === 'question-multiple' || selectedBlock.type === 'question-strategic') && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">Pergunta</Label>
                      <Textarea
                        value={selectedBlock.settings.question || ''}
                        onChange={(e) => updateBlockSetting('question', e.target.value)}
                        className="text-sm resize-none mt-1"
                        rows={3}
                        placeholder="Digite a pergunta"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Opções</Label>
                      <div className="space-y-2 mt-1">
                        {(selectedBlock.settings.options || []).map((option: any, index: number) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={option.text}
                              onChange={(e) => updateQuestionOption(index, 'text', e.target.value)}
                              className="text-sm h-8 flex-1"
                              placeholder={`Opção ${String.fromCharCode(65 + index)}`}
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeQuestionOption(index)}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={addQuestionOption}
                          className="w-full h-8"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Adicionar Opção
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={selectedBlock.settings.required || false}
                        onCheckedChange={(checked) => updateBlockSetting('required', checked)}
                      />
                      <Label className="text-xs">Resposta Obrigatória</Label>
                    </div>
                  </div>
                )}

                {selectedBlock.type === 'price' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">Preço Atual</Label>
                      <Input
                        value={selectedBlock.settings.currentPrice || ''}
                        onChange={(e) => updateBlockSetting('currentPrice', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="R$ 97,00"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Preço Original</Label>
                      <Input
                        value={selectedBlock.settings.originalPrice || ''}
                        onChange={(e) => updateBlockSetting('originalPrice', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="R$ 297,00"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Desconto</Label>
                      <Input
                        value={selectedBlock.settings.discount || ''}
                        onChange={(e) => updateBlockSetting('discount', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="67% OFF"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Urgência</Label>
                      <Input
                        value={selectedBlock.settings.urgency || ''}
                        onChange={(e) => updateBlockSetting('urgency', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="Oferta válida apenas hoje!"
                      />
                    </div>
                  </div>
                )}

                {selectedBlock.type === 'loader' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">Mensagem</Label>
                      <Input
                        value={selectedBlock.settings.message || ''}
                        onChange={(e) => updateBlockSetting('message', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="Carregando..."
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Tipo</Label>
                      <select 
                        value={selectedBlock.settings.type || 'spinning'}
                        onChange={(e) => updateBlockSetting('type', e.target.value)}
                        className="w-full h-8 text-sm border border-gray-300 rounded mt-1 px-2"
                      >
                        <option value="spinning">Girando</option>
                        <option value="dots">Pontos</option>
                        <option value="bars">Barras</option>
                      </select>
                    </div>
                  </div>
                )}

                {selectedBlock.type === 'spacer' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">Altura</Label>
                      <Input
                        value={selectedBlock.settings.height || '50px'}
                        onChange={(e) => updateBlockSetting('height', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="50px"
                      />
                    </div>
                  </div>
                )}

                {selectedBlock.type === 'testimonial' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">Texto do Depoimento</Label>
                      <Textarea
                        value={selectedBlock.settings.text || ''}
                        onChange={(e) => updateBlockSetting('text', e.target.value)}
                        className="text-sm resize-none mt-1"
                        rows={3}
                        placeholder="Este produto mudou minha vida!"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Nome do Cliente</Label>
                      <Input
                        value={selectedBlock.settings.author || ''}
                        onChange={(e) => updateBlockSetting('author', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="Maria Silva"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Profissão/Papel</Label>
                      <Input
                        value={selectedBlock.settings.role || ''}
                        onChange={(e) => updateBlockSetting('role', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="Cliente satisfeita"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">URL do Avatar</Label>
                      <Input
                        value={selectedBlock.settings.avatar || ''}
                        onChange={(e) => updateBlockSetting('avatar', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="https://exemplo.com/foto.jpg"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Avaliação (estrelas)</Label>
                      <select 
                        value={selectedBlock.settings.rating || 5}
                        onChange={(e) => updateBlockSetting('rating', parseInt(e.target.value))}
                        className="w-full h-8 text-sm border border-gray-300 rounded mt-1 px-2"
                      >
                        <option value="1">1 estrela</option>
                        <option value="2">2 estrelas</option>
                        <option value="3">3 estrelas</option>
                        <option value="4">4 estrelas</option>
                        <option value="5">5 estrelas</option>
                      </select>
                    </div>
                  </div>
                )}

                {selectedBlock.type === 'guarantee' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">Título da Garantia</Label>
                      <Input
                        value={selectedBlock.settings.title || ''}
                        onChange={(e) => updateBlockSetting('title', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="Garantia de 30 dias"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Descrição</Label>
                      <Textarea
                        value={selectedBlock.settings.description || ''}
                        onChange={(e) => updateBlockSetting('description', e.target.value)}
                        className="text-sm resize-none mt-1"
                        rows={3}
                        placeholder="Se não ficar satisfeito, devolvemos 100% do seu dinheiro."
                      />
                    </div>
                  </div>
                )}

                {selectedBlock.type === 'countdown' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">Título</Label>
                      <Input
                        value={selectedBlock.settings.title || ''}
                        onChange={(e) => updateBlockSetting('title', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="Oferta por tempo limitado!"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Horas para expirar</Label>
                      <Input
                        type="number"
                        value={selectedBlock.settings.hours || 24}
                        onChange={(e) => updateBlockSetting('hours', parseInt(e.target.value))}
                        className="text-sm h-8 mt-1"
                        placeholder="24"
                      />
                    </div>
                  </div>
                )}

                {selectedBlock.type === 'bonus' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">Título do Bônus</Label>
                      <Input
                        value={selectedBlock.settings.title || ''}
                        onChange={(e) => updateBlockSetting('title', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="E-book Exclusivo de Estilo"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Descrição</Label>
                      <Textarea
                        value={selectedBlock.settings.description || ''}
                        onChange={(e) => updateBlockSetting('description', e.target.value)}
                        className="text-sm resize-none mt-1"
                        rows={3}
                        placeholder="Guia completo com dicas avançadas"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Valor</Label>
                      <Input
                        value={selectedBlock.settings.value || ''}
                        onChange={(e) => updateBlockSetting('value', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="R$ 47,00"
                      />
                    </div>
                  </div>
                )}

                {selectedBlock.type === 'faq' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">Perguntas e Respostas</Label>
                      <div className="space-y-3 mt-1">
                        {(selectedBlock.settings.questions || []).map((faq: any, index: number) => (
                          <div key={index} className="border border-gray-200 rounded p-3 space-y-2">
                            <Input
                              value={faq.question}
                              onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                              className="text-sm h-8"
                              placeholder="Pergunta"
                            />
                            <Textarea
                              value={faq.answer}
                              onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                              className="text-sm resize-none"
                              rows={2}
                              placeholder="Resposta"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeFAQ(index)}
                              className="h-6 text-xs w-full"
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Remover
                            </Button>
                          </div>
                        ))}
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={addFAQ}
                          className="w-full h-8"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Adicionar FAQ
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {selectedBlock.type === 'social-proof' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Número 1</Label>
                        <Input
                          value={selectedBlock.settings.number1 || ''}
                          onChange={(e) => updateBlockSetting('number1', e.target.value)}
                          className="text-sm h-8 mt-1"
                          placeholder="10.000+"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Label 1</Label>
                        <Input
                          value={selectedBlock.settings.label1 || ''}
                          onChange={(e) => updateBlockSetting('label1', e.target.value)}
                          className="text-sm h-8 mt-1"
                          placeholder="Mulheres"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Número 2</Label>
                        <Input
                          value={selectedBlock.settings.number2 || ''}
                          onChange={(e) => updateBlockSetting('number2', e.target.value)}
                          className="text-sm h-8 mt-1"
                          placeholder="4.9★"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Label 2</Label>
                        <Input
                          value={selectedBlock.settings.label2 || ''}
                          onChange={(e) => updateBlockSetting('label2', e.target.value)}
                          className="text-sm h-8 mt-1"
                          placeholder="Avaliação"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Número 3</Label>
                        <Input
                          value={selectedBlock.settings.number3 || ''}
                          onChange={(e) => updateBlockSetting('number3', e.target.value)}
                          className="text-sm h-8 mt-1"
                          placeholder="99%"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Label 3</Label>
                        <Input
                          value={selectedBlock.settings.label3 || ''}
                          onChange={(e) => updateBlockSetting('label3', e.target.value)}
                          className="text-sm h-8 mt-1"
                          placeholder="Satisfação"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedBlock.type === 'video' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">URL do Vídeo</Label>
                      <Input
                        value={selectedBlock.settings.videoUrl || ''}
                        onChange={(e) => updateBlockSetting('videoUrl', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="https://youtube.com/embed/..."
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Legenda</Label>
                      <Input
                        value={selectedBlock.settings.caption || ''}
                        onChange={(e) => updateBlockSetting('caption', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="Descrição do vídeo"
                      />
                    </div>
                  </div>
                )}

                {(selectedBlock.type === 'email-input' || selectedBlock.type === 'phone-input') && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">Rótulo</Label>
                      <Input
                        value={selectedBlock.settings.label || ''}
                        onChange={(e) => updateBlockSetting('label', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder={selectedBlock.type === 'email-input' ? 'Email' : 'Telefone'}
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Placeholder</Label>
                      <Input
                        value={selectedBlock.settings.placeholder || ''}
                        onChange={(e) => updateBlockSetting('placeholder', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder={selectedBlock.type === 'email-input' ? 'seu@email.com' : '(11) 99999-9999'}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={selectedBlock.settings.required || false}
                        onCheckedChange={(checked) => updateBlockSetting('required', checked)}
                      />
                      <Label className="text-xs">Campo Obrigatório</Label>
                    </div>
                  </div>
                )}

                {/* Configurações de estilo gerais */}
                <div className="pt-4 border-t">
                  <h4 className="text-xs font-medium mb-3">Estilos</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Margem Superior</Label>
                      <Input
                        value={selectedBlock.style?.marginTop || ''}
                        onChange={(e) => updateBlockStyle('marginTop', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="0px"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Margem Inferior</Label>
                      <Input
                        value={selectedBlock.style?.marginBottom || ''}
                        onChange={(e) => updateBlockStyle('marginBottom', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="0px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Settings className="h-8 w-8 mx-auto mb-4 opacity-50" />
                <p className="font-medium mb-2">Nenhum bloco selecionado</p>
                <p className="text-sm">Clique em um bloco para editar suas propriedades</p>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default CaktoQuizAdvancedEditor;