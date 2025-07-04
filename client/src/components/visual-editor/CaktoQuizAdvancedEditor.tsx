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
  Palette, Zap, Target, ChevronDown, ChevronRight, Shield
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
              content: 'Teste de Estilo Pessoal',
              style: {
                fontSize: '1.875rem',
                fontWeight: '700',
                textAlign: 'center' as const,
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
                textAlign: 'center' as const,
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
                textAlign: 'center' as const
              }
            }
          }
        ]
      },
      // QUESTÃO EXEMPLO (Q1-Q10)
      {
        id: 'question-1',
        title: 'Questão 1 - Tipo de Roupa',
        type: 'question' as const,
        order: 2,
        isActive: true,
        settings: {
          showProgress: true,
          progressValue: 14.28,
          backgroundColor: '#ffffff',
          textColor: '#2c2c2c',
          maxWidth: '600px'
        },
        blocks: [
          {
            id: 'progress-q1',
            type: 'progress' as const,
            order: 1,
            settings: {
              progressValue: 14.28,
              style: {
                margin: '0 0 2rem 0'
              }
            }
          },
          {
            id: 'question-q1',
            type: 'question' as const,
            order: 2,
            settings: {
              content: 'Qual o seu tipo de roupa favorita?',
              style: {
                fontSize: '1.25rem',
                fontWeight: '600',
                textAlign: 'center' as const,
                margin: '0 0 1.5rem 0'
              }
            }
          },
          {
            id: 'options-q1',
            type: 'options' as const,
            order: 3,
            settings: {
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
          }
        ]
      },
      // TRANSIÇÃO PRINCIPAL
      {
        id: 'main-transition',
        title: 'Transição Principal',
        type: 'main-transition' as const,
        order: 12,
        isActive: true,
        settings: {
          showProgress: true,
          progressValue: 78.57,
          backgroundColor: '#ffffff',
          textColor: '#2c2c2c',
          maxWidth: '600px'
        },
        blocks: [
          {
            id: 'progress-transition',
            type: 'progress' as const,
            order: 1,
            settings: {
              progressValue: 78.57,
              style: {
                margin: '0 0 2rem 0'
              }
            }
          },
          {
            id: 'transition-loading',
            type: 'loading-animation' as const,
            order: 2,
            settings: {
              duration: 3000,
              animationType: 'spinner',
              style: {
                textAlign: 'center' as const,
                margin: '2rem 0'
              }
            }
          },
          {
            id: 'transition-text-1',
            type: 'transition-text' as const,
            order: 3,
            settings: {
              content: 'Analisando suas respostas...',
              style: {
                fontSize: '1.125rem',
                textAlign: 'center' as const,
                margin: '1rem 0'
              }
            }
          },
          {
            id: 'transition-text-2',
            type: 'transition-text' as const,
            order: 4,
            settings: {
              content: 'Criando seu perfil de estilo personalizado...',
              style: {
                fontSize: '1rem',
                textAlign: 'center' as const,
                margin: '1rem 0',
                color: '#666'
              }
            }
          }
        ]
      },
      // QUESTÃO ESTRATÉGICA EXEMPLO
      {
        id: 'strategic-1',
        title: 'Questão Estratégica 1',
        type: 'strategic' as const,
        order: 13,
        isActive: true,
        settings: {
          showProgress: true,
          progressValue: 85.71,
          backgroundColor: '#ffffff',
          textColor: '#2c2c2c',
          maxWidth: '600px'
        },
        blocks: [
          {
            id: 'progress-strategic',
            type: 'progress' as const,
            order: 1,
            settings: {
              progressValue: 85.71,
              style: {
                margin: '0 0 2rem 0'
              }
            }
          },
          {
            id: 'strategic-question-1',
            type: 'strategic-question' as const,
            order: 2,
            settings: {
              content: 'Você já considerou investir em algum guia ou consultoria de estilo no passado?',
              questionType: 'strategic',
              style: {
                fontSize: '1.25rem',
                fontWeight: '600',
                textAlign: 'center' as const,
                margin: '0 0 1.5rem 0'
              }
            }
          },
          {
            id: 'strategic-options-1',
            type: 'options' as const,
            order: 3,
            settings: {
              options: [
                { id: '1', text: 'Sim, já pesquisei mas não cheguei a comprar', value: 'researched' },
                { id: '2', text: 'Sim, já investi em algum curso/guia/consultoria', value: 'invested' },
                { id: '3', text: 'Não, esta é a primeira vez que considero isso', value: 'first-time' },
                { id: '4', text: 'Prefiro não responder', value: 'no-answer' }
              ],
              maxSelections: 1,
              style: {
                margin: '0 0 1rem 0'
              }
            }
          }
        ]
      },
      // TRANSIÇÃO FINAL
      {
        id: 'final-transition',
        title: 'Transição Final',
        type: 'final-transition' as const,
        order: 19,
        isActive: true,
        settings: {
          showProgress: true,
          progressValue: 100,
          backgroundColor: '#ffffff',
          textColor: '#2c2c2c',
          maxWidth: '600px'
        },
        blocks: [
          {
            id: 'progress-final',
            type: 'progress' as const,
            order: 1,
            settings: {
              progressValue: 100,
              style: {
                margin: '0 0 2rem 0'
              }
            }
          },
          {
            id: 'final-loading',
            type: 'loading-animation' as const,
            order: 2,
            settings: {
              duration: 4000,
              animationType: 'celebration',
              style: {
                textAlign: 'center' as const,
                margin: '2rem 0'
              }
            }
          },
          {
            id: 'final-text',
            type: 'transition-text' as const,
            order: 3,
            settings: {
              content: 'Obrigada por compartilhar! Preparando seu resultado personalizado...',
              style: {
                fontSize: '1.125rem',
                textAlign: 'center' as const,
                margin: '1rem 0'
              }
            }
          }
        ]
      },
      // PÁGINA DE RESULTADO (VARIANTE A)
      {
        id: 'result-page',
        title: 'Resultado - Variante A',
        type: 'result' as const,
        order: 20,
        isActive: true,
        settings: {
          showProgress: false,
          progressValue: 100,
          backgroundColor: '#ffffff',
          textColor: '#2c2c2c',
          maxWidth: '800px'
        },
        blocks: [
          {
            id: 'result-header',
            type: 'heading' as const,
            order: 1,
            settings: {
              content: 'Seu Estilo Pessoal',
              style: {
                fontSize: '2rem',
                fontWeight: '700',
                textAlign: 'center' as const,
                margin: '0 0 2rem 0'
              }
            }
          },
          {
            id: 'style-display',
            type: 'style-result-display' as const,
            order: 2,
            settings: {
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
            id: 'sales-offer-main',
            type: 'sales-offer' as const,
            order: 3,
            settings: {
              productName: 'Guias de Estilo Completo',
              price: 'R$ 97,00',
              originalPrice: 'R$ 297,00',
              ctaText: 'Quero Meus Guias',
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
            id: 'testimonials',
            type: 'testimonials-grid' as const,
            order: 4,
            settings: {
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
            id: 'guarantee',
            type: 'guarantee-section' as const,
            order: 5,
            settings: {
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
        ]
      },
      // PÁGINA DE RESULTADO (VARIANTE B)
      {
        id: 'result-variant-b',
        title: 'Resultado - Variante B',
        type: 'result-variant-b' as const,
        order: 21,
        isActive: false,
        settings: {
          showProgress: false,
          progressValue: 100,
          backgroundColor: '#ffffff',
          textColor: '#2c2c2c',
          maxWidth: '1000px'
        },
        blocks: [
          {
            id: 'hero-variant-b',
            type: 'heading' as const,
            order: 1,
            settings: {
              content: 'Descubra Seu Estilo Pessoal',
              style: {
                fontSize: '2.5rem',
                fontWeight: '800',
                textAlign: 'center' as const,
                margin: '0 0 1rem 0'
              }
            }
          },
          {
            id: 'subtitle-variant-b',
            type: 'text' as const,
            order: 2,
            settings: {
              content: 'Transforme sua imagem e autoestima com nossos Guias de Estilo personalizados',
              style: {
                fontSize: '1.25rem',
                textAlign: 'center' as const,
                margin: '0 0 2rem 0',
                color: '#666'
              }
            }
          },
          {
            id: 'offer-variant-b',
            type: 'sales-offer' as const,
            order: 3,
            settings: {
              productName: 'Pacote Completo de Estilo',
              price: 'R$ 97,00',
              originalPrice: 'R$ 297,00',
              ctaText: 'Quero Descobrir Meu Estilo',
              urgency: true,
              style: {
                backgroundColor: '#f0f8ff',
                padding: '3rem',
                borderRadius: '1.5rem',
                margin: '2rem 0'
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
        margin: '1rem 0'
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
      content: 'Pergunta estratégica...',
      questionType: 'strategic',
      style: {
        fontSize: '1.25rem',
        fontWeight: '600',
        textAlign: 'center' as const,
        margin: '0 0 1.5rem 0'
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
      productName: 'Guias de Estilo Completo',
      price: 'R$ 97,00',
      originalPrice: 'R$ 297,00',
      ctaText: 'Quero Meus Guias',
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
        { name: 'Cliente 1', text: 'Transformou meu guarda-roupa!', image: '/placeholder.svg' },
        { name: 'Cliente 2', text: 'Finalmente encontrei meu estilo!', image: '/placeholder.svg' }
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
      // Template simplificado para evitar erros de tipo
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
              showProgress: true,
              progressValue: 7.14,
              backgroundColor: '#ffffff',
              textColor: '#2c2c2c',
              maxWidth: '600px'
            },
            blocks: []
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
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ 
                fontSize: block.settings.style?.fontSize || '1.5rem',
                fontWeight: block.settings.style?.fontWeight || '700',
                textAlign: block.settings.style?.textAlign || 'center',
                margin: '0 0 1rem 0',
                color: block.settings.style?.color || '#1f2937',
                lineHeight: '1.3'
              }}>
                {block.settings.content || 'Pergunta do Quiz'}
              </h2>
              
              {/* Subtítulo explicativo como no funil real */}
              <p style={{
                fontSize: '1rem',
                color: '#6b7280',
                margin: '0',
                fontWeight: '400'
              }}>
                Escolha as opções que mais combinam com você:
              </p>
            </div>
          </div>
        );
        break;
        
      case 'options':
        content = (
          <div style={blockStyle} onClick={handleBlockClick}>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              {block.settings.options?.map((option, index) => (
                <div 
                  key={option.id}
                  style={{
                    padding: '1.5rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    backgroundColor: 'white',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    position: 'relative'
                  }}
                  className="hover:border-blue-500 hover:shadow-lg group"
                >
                  {/* Checkbox no canto */}
                  <div style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    width: '1.25rem',
                    height: '1.25rem',
                    border: '2px solid #d1d5db',
                    borderRadius: block.settings.maxSelections === 1 ? '50%' : '0.25rem',
                    backgroundColor: 'white'
                  }} />
                  
                  {/* Imagem se houver */}
                  {option.image && (
                    <div style={{
                      width: '100%',
                      height: '120px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '0.5rem',
                      marginBottom: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ color: '#9ca3af' }}>📷</span>
                    </div>
                  )}
                  
                  {/* Texto da opção */}
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#374151',
                    lineHeight: '1.4',
                    margin: 0
                  }}>
                    {option.text}
                  </p>
                </div>
              )) || (
                <div style={{ 
                  padding: '2rem', 
                  border: '2px dashed #d1d5db', 
                  borderRadius: '0.5rem',
                  textAlign: 'center',
                  color: '#9ca3af'
                }}>
                  Adicione opções de resposta...
                </div>
              )}
            </div>
            
            {/* Instruções de seleção */}
            <div style={{
              textAlign: 'center',
              marginTop: '1rem',
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              {(block.settings.maxSelections || 1) > 1 
                ? `Escolha até ${block.settings.maxSelections || 1} opções`
                : 'Escolha uma opção'
              }
            </div>
          </div>
        );
        break;
        
      case 'progress':
        content = (
          <div style={blockStyle} onClick={handleBlockClick}>
            <div style={{
              width: '100%',
              marginBottom: '2rem'
            }}>
              {/* Barra de progresso */}
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#e5e7eb',
                borderRadius: '9999px',
                overflow: 'hidden',
                marginBottom: '0.75rem'
              }}>
                <div style={{
                  width: `${block.settings.progressValue || 0}%`,
                  height: '100%',
                  backgroundColor: '#3b82f6',
                  borderRadius: '9999px',
                  transition: 'width 0.5s ease'
                }} />
              </div>
              
              {/* Porcentagem e texto */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>
                <span>{Math.round(block.settings.progressValue || 0)}% concluído</span>
                <span>
                  Questão {Math.ceil(((block.settings.progressValue || 0) / 100) * 17)} de 17
                </span>
              </div>
            </div>
          </div>
        );
        break;

      // BLOCOS ESPECÍFICOS DO FUNIL REAL
      case 'loading-animation':
        content = (
          <div style={blockStyle} onClick={handleBlockClick}>
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600">Carregando...</p>
            </div>
          </div>
        );
        break;

      case 'transition-text':
        content = (
          <div style={blockStyle} onClick={handleBlockClick}>
            <div className="text-center py-4">
              <p style={{
                fontSize: block.settings.style?.fontSize || '1.125rem',
                fontWeight: block.settings.style?.fontWeight || '500',
                color: block.settings.style?.color || '#374151',
                textAlign: 'center'
              }}>
                {block.settings.content || 'Texto de transição...'}
              </p>
            </div>
          </div>
        );
        break;

      case 'strategic-question':
        content = (
          <div style={blockStyle} onClick={handleBlockClick}>
            <div className="space-y-6 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {block.settings.content || 'Pergunta estratégica'}
                </h2>
                <p className="text-gray-600">Selecione uma opção:</p>
              </div>
              <div className="space-y-3">
                {block.settings.options?.map((option, index) => (
                  <div 
                    key={option.id}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                      <span className="text-gray-700">{option.text}</span>
                    </div>
                  </div>
                )) || (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-500">
                    Adicione opções de resposta...
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        break;

      case 'style-result-display':
        content = (
          <div style={blockStyle} onClick={handleBlockClick}>
            <div className="text-center space-y-6 bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl">
              <div className="w-24 h-24 mx-auto bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl text-white font-bold">🎯</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                Seu Estilo: {block.settings.styleType || 'Elegante'}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Você tem um estilo sofisticado e refinado, que preza pela elegância em todas as ocasiões.
              </p>
              {block.settings.showImage && (
                <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Imagem do Estilo</span>
                </div>
              )}
            </div>
          </div>
        );
        break;

      case 'sales-offer':
        content = (
          <div style={blockStyle} onClick={handleBlockClick}>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-8 relative overflow-hidden">
              {block.settings.urgency && (
                <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 text-sm font-bold transform rotate-12 translate-x-4 -translate-y-2">
                  OFERTA ESPECIAL
                </div>
              )}
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {block.settings.productName || 'Guias de Estilo Completo'}
                </h3>
                <p className="text-gray-600 mb-6">
                  Descubra seu estilo completo com nossa consultoria personalizada
                </p>
                
                <div className="mb-6">
                  {block.settings.originalPrice && (
                    <>
                      <div className="text-sm text-gray-500 mb-2">DE:</div>
                      <span className="text-2xl text-gray-500 line-through">
                        {block.settings.originalPrice}
                      </span>
                      <div className="text-sm text-gray-500 mt-1 mb-4">POR APENAS:</div>
                    </>
                  )}
                  <span className="text-5xl font-bold text-green-600">
                    {block.settings.price || 'R$ 97,00'}
                  </span>
                  <div className="text-sm text-gray-600 mt-2">ou 12x de R$ 9,70</div>
                </div>

                <button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-4 rounded-lg font-bold transition-colors"
                  style={{ cursor: 'pointer' }}
                >
                  {block.settings.ctaText || 'QUERO DESCOBRIR MEU ESTILO COMPLETO'}
                </button>
              </div>
            </div>
          </div>
        );
        break;

      case 'testimonials-grid':
        content = (
          <div style={blockStyle} onClick={handleBlockClick}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center text-gray-800">
                O que nossas clientes dizem
              </h3>
              <div className={`grid gap-6 ${
                block.settings.columns === 1 ? 'grid-cols-1' :
                block.settings.columns === 3 ? 'grid-cols-1 md:grid-cols-3' :
                'grid-cols-1 md:grid-cols-2'
              }`}>
                {block.settings.testimonials?.map((testimonial, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm text-gray-600">👤</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 italic mb-3">"{testimonial.text}"</p>
                        <div className="flex items-center">
                          <span className="font-semibold text-gray-800">{testimonial.name}</span>
                          <div className="flex ml-2">
                            {[1,2,3,4,5].map(star => (
                              <span key={star} className="text-yellow-400">⭐</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )) || (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500">
                    Adicione depoimentos...
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        break;

      case 'guarantee-section':
        content = (
          <div style={blockStyle} onClick={handleBlockClick}>
            <div 
              className="p-6 rounded-lg text-center"
              style={{
                backgroundColor: block.settings.style?.backgroundColor || '#e8f5e8',
                borderRadius: block.settings.style?.borderRadius || '0.5rem'
              }}
            >
              {block.settings.showIcon && (
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🛡️</span>
                </div>
              )}
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                {block.settings.guaranteeText || 'Garantia de 7 dias'}
              </h4>
              <p className="text-gray-600">
                {block.settings.guaranteeDetails || 'Se não ficar satisfeita, devolvemos seu dinheiro'}
              </p>
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

        {/* PAINÉIS ESPECÍFICOS PARA NOVOS BLOCOS */}
        {selectedBlock.type === 'loading-animation' && (
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Duração (ms)</Label>
              <Input
                type="number"
                value={selectedBlock.settings.duration || 3000}
                onChange={(e) => updateBlock(selectedBlock.id, {
                  settings: { ...selectedBlock.settings, duration: parseInt(e.target.value) || 3000 }
                })}
                className="text-sm h-8 mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Tipo de Animação</Label>
              <Select
                value={selectedBlock.settings.animationType || 'spinner'}
                onValueChange={(value) => updateBlock(selectedBlock.id, {
                  settings: { ...selectedBlock.settings, animationType: value }
                })}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spinner">Spinner</SelectItem>
                  <SelectItem value="dots">Pontos</SelectItem>
                  <SelectItem value="pulse">Pulse</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {selectedBlock.type === 'transition-text' && (
          <div>
            <Label className="text-xs">Texto da Transição</Label>
            <Textarea
              value={selectedBlock.settings.content || ''}
              onChange={(e) => updateBlock(selectedBlock.id, {
                settings: { ...selectedBlock.settings, content: e.target.value }
              })}
              className="text-sm resize-none mt-1"
              rows={2}
              placeholder="Ex: Analisando suas respostas..."
            />
          </div>
        )}

        {selectedBlock.type === 'strategic-question' && (
          <div>
            <Label className="text-xs">Pergunta Estratégica</Label>
            <Textarea
              value={selectedBlock.settings.content || ''}
              onChange={(e) => updateBlock(selectedBlock.id, {
                settings: { ...selectedBlock.settings, content: e.target.value }
              })}
              className="text-sm resize-none mt-1"
              rows={3}
              placeholder="Ex: Você já considerou investir em consultoria de estilo?"
            />
          </div>
        )}

        {selectedBlock.type === 'style-result-display' && (
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Tipo de Estilo</Label>
              <Select
                value={selectedBlock.settings.styleType || 'primary'}
                onValueChange={(value) => updateBlock(selectedBlock.id, {
                  settings: { ...selectedBlock.settings, styleType: value }
                })}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="natural">Natural</SelectItem>
                  <SelectItem value="classico">Clássico</SelectItem>
                  <SelectItem value="contemporaneo">Contemporâneo</SelectItem>
                  <SelectItem value="elegante">Elegante</SelectItem>
                  <SelectItem value="romantico">Romântico</SelectItem>
                  <SelectItem value="sexy">Sexy</SelectItem>
                  <SelectItem value="dramatico">Dramático</SelectItem>
                  <SelectItem value="criativo">Criativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={selectedBlock.settings.showImage || false}
                onCheckedChange={(checked) => updateBlock(selectedBlock.id, {
                  settings: { ...selectedBlock.settings, showImage: checked }
                })}
              />
              <Label className="text-xs">Mostrar imagem</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={selectedBlock.settings.showDescription || false}
                onCheckedChange={(checked) => updateBlock(selectedBlock.id, {
                  settings: { ...selectedBlock.settings, showDescription: checked }
                })}
              />
              <Label className="text-xs">Mostrar descrição</Label>
            </div>
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
                placeholder="Ex: Guias de Estilo Completo"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Preço Atual</Label>
                <Input
                  value={selectedBlock.settings.price || ''}
                  onChange={(e) => updateBlock(selectedBlock.id, {
                    settings: { ...selectedBlock.settings, price: e.target.value }
                  })}
                  className="text-sm h-8 mt-1"
                  placeholder="R$ 97,00"
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
                  placeholder="R$ 297,00"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Texto do CTA</Label>
              <Input
                value={selectedBlock.settings.ctaText || ''}
                onChange={(e) => updateBlock(selectedBlock.id, {
                  settings: { ...selectedBlock.settings, ctaText: e.target.value }
                })}
                className="text-sm h-8 mt-1"
                placeholder="QUERO DESCOBRIR MEU ESTILO"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={selectedBlock.settings.urgency || false}
                onCheckedChange={(checked) => updateBlock(selectedBlock.id, {
                  settings: { ...selectedBlock.settings, urgency: checked }
                })}
              />
              <Label className="text-xs">Mostrar urgência</Label>
            </div>
          </div>
        )}

        {selectedBlock.type === 'testimonials-grid' && (
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Número de Colunas</Label>
              <Select
                value={String(selectedBlock.settings.columns || 2)}
                onValueChange={(value) => updateBlock(selectedBlock.id, {
                  settings: { ...selectedBlock.settings, columns: parseInt(value) }
                })}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Coluna</SelectItem>
                  <SelectItem value="2">2 Colunas</SelectItem>
                  <SelectItem value="3">3 Colunas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Depoimentos</Label>
              <p className="text-xs text-gray-500 mt-1">Configure os depoimentos abaixo:</p>
              {/* Aqui pode adicionar interface para gerenciar depoimentos */}
            </div>
          </div>
        )}

        {selectedBlock.type === 'guarantee-section' && (
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Texto da Garantia</Label>
              <Input
                value={selectedBlock.settings.guaranteeText || ''}
                onChange={(e) => updateBlock(selectedBlock.id, {
                  settings: { ...selectedBlock.settings, guaranteeText: e.target.value }
                })}
                className="text-sm h-8 mt-1"
                placeholder="Garantia de 7 dias"
              />
            </div>
            <div>
              <Label className="text-xs">Detalhes da Garantia</Label>
              <Textarea
                value={selectedBlock.settings.guaranteeDetails || ''}
                onChange={(e) => updateBlock(selectedBlock.id, {
                  settings: { ...selectedBlock.settings, guaranteeDetails: e.target.value }
                })}
                className="text-sm resize-none mt-1"
                rows={2}
                placeholder="Se não ficar satisfeita, devolvemos seu dinheiro"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={selectedBlock.settings.showIcon || false}
                onCheckedChange={(checked) => updateBlock(selectedBlock.id, {
                  settings: { ...selectedBlock.settings, showIcon: checked }
                })}
              />
              <Label className="text-xs">Mostrar ícone</Label>
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
