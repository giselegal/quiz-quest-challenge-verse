import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
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
import { funnelService, type FunnelData, type PageData, type BlockData } from '@/services/funnelService';
import { REAL_QUIZ_QUESTIONS, STRATEGIC_QUESTIONS, TRANSITIONS } from './realQuizData';
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
  Underline,
  Download,
  Upload,
  GripVertical,
  Lock,
  Shield,
  Award
} from 'lucide-react';

// Hook personalizado para redimensionamento de colunas
const useResizableColumns = (initialLeftWidth = 320, initialRightWidth = 320) => {
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth);
  const [rightWidth, setRightWidth] = useState(initialRightWidth);
  const [isResizingLeft, setIsResizingLeft] = useState(false);
  const [isResizingRight, setIsResizingRight] = useState(false);
  
  const startResizeLeft = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizingLeft(true);
  }, []);
  
  const startResizeRight = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizingRight(true);
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingLeft) {
        const newWidth = Math.max(200, Math.min(600, e.clientX));
        setLeftWidth(newWidth);
      }
      if (isResizingRight) {
        const newWidth = Math.max(200, Math.min(600, window.innerWidth - e.clientX));
        setRightWidth(newWidth);
      }
    };
    
    const handleMouseUp = () => {
      setIsResizingLeft(false);
      setIsResizingRight(false);
    };
    
    if (isResizingLeft || isResizingRight) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizingLeft, isResizingRight]);
  
  return {
    leftWidth,
    rightWidth,
    startResizeLeft,
    startResizeRight,
    isResizingLeft,
    isResizingRight
  };
};

// Usando tipos do serviço + tipos adicionais para compatibilidade
interface FunnelBlock extends BlockData {
  order?: number;
  settings?: Record<string, any>;
  style?: Record<string, any>;
}

interface FunnelPage extends Omit<PageData, 'blocks'> {
  name: string;
  title: string;
  type: 'intro' | 'question' | 'main-transition' | 'strategic' | 'final-transition' | 'result' | 'result-variant-b' | 'offer';
  blocks: FunnelBlock[];
  settings?: {
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

// Dados iniciais do funil - EXATAMENTE como o quiz real
const createInitialFunnel = (): FunnelData => ({
  id: crypto.randomUUID(),
  name: 'Quiz CaktoQuiz - Descubra Seu Estilo',
  description: 'Funil completo para descoberta do estilo pessoal - 21 etapas',
  config: {
    name: 'Quiz CaktoQuiz - Descubra Seu Estilo',
    description: 'Funil completo para descoberta do estilo pessoal - 21 etapas',
    isPublished: false,
    theme: 'caktoquiz'
  },
  pages: [
    // ETAPA 1: QuizIntrodução → Coleta do nome
    {
      id: 'etapa-1-intro',
      type: 'intro',
      title: 'Etapa 1: Introdução (Coleta do Nome)',
      order: 1,
      settings: {
        backgroundColor: '#ffffff',
        textColor: '#432818',
        showProgress: false,
        progressValue: 0
      },
      blocks: [
        {
          id: 'intro-header',
          type: 'header',
          order: 1,
          settings: {
            title: 'Chega de um guarda-roupa lotado e da sensação de que nada combina com Você.',
            subtitle: 'Em poucos minutos, descubra seu Estilo Predominante — e aprenda a montar looks que realmente refletem sua essência, com praticidade e confiança.',
            titleSize: 'large',
            alignment: 'center',
            color: '#432818'
          }
        },
        {
          id: 'intro-image',
          type: 'image',
          order: 2,
          settings: {
            src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.webp',
            alt: 'Descubra seu estilo predominante e transforme seu guarda-roupa',
            width: 300,
            height: 204,
            alignment: 'center'
          }
        },
        {
          id: 'name-input',
          type: 'form-input',
          order: 2,
          settings: {
            label: 'Como você gostaria de ser chamada?',
            placeholder: 'Digite seu nome aqui...',
            required: true,
            type: 'text'
          }
        }
      ]
    },

    // ETAPAS 2-11: 10 questões principais com pontuação
    ...REAL_QUIZ_QUESTIONS.map((questionData, i) => ({
      id: `etapa-${i + 2}-questao-${i + 1}`,
      name: `Etapa ${i + 2}: Questão ${i + 1}`,
      title: questionData.question,
      type: 'question' as const,
      order: i + 2,
      settings: {
        backgroundColor: '#ffffff',
        textColor: '#432818',
        showProgress: true,
        progressValue: 5 + (i + 1) * 5 // 5% a 55%
      },
      blocks: [
        {
          id: `progress-q${i + 1}`,
          type: 'quiz-progress-bar',
          order: 1,
          settings: {
            currentStep: i + 1,
            totalSteps: 18,
            progressPercent: 5 + (i + 1) * 5,
            stepName: `Questão ${i + 1} de 10`
          }
        },
        {
          id: `question-${i + 1}`,
          type: 'question-multiple',
          order: 2,
          settings: {
            question: questionData.question,
            options: questionData.options.map(opt => ({
              id: opt.id,
              text: opt.text,
              value: opt.value,
              imageUrl: (opt as any).imageUrl || undefined
            })),
            required: true,
            multipleSelection: questionData.multipleSelection || false,
            maxSelections: questionData.maxSelections || 1
          }
        },
        {
          id: `navigation-q${i + 1}`,
          type: 'quiz-navigation-controls',
          order: 3,
          settings: {
            currentQuestion: i + 1,
            totalQuestions: 10,
            hideBackButton: i === 0,
            backButtonText: 'Voltar',
            nextButtonText: i === 9 ? 'Continuar' : 'Próxima'
          }
        }
      ]
    })),

    // ETAPA 12: QuizTransição → Apresenta primeira questão estratégica
    {
      id: 'etapa-12-transicao-1',
      name: 'Etapa 12: Transição 1',
      title: TRANSITIONS.mainTransition.title,
      type: 'main-transition',
      order: 12,
      settings: {
        backgroundColor: '#f9f4ef',
        textColor: '#432818',
        showProgress: true,
        progressValue: 60,
        transitionDuration: 4000
      },
      blocks: [
        {
          id: 'main-transition-header',
          type: 'header',
          order: 1,
          settings: {
            title: TRANSITIONS.mainTransition.title,
            subtitle: TRANSITIONS.mainTransition.message,
            alignment: 'center'
          }
        },
        {
          id: 'main-transition-description',
          type: 'text',
          order: 2,
          settings: {
            content: TRANSITIONS.mainTransition.submessage,
            fontSize: 'medium',
            alignment: 'center'
          }
        },
        {
          id: 'main-transition-note',
          type: 'text',
          order: 3,
          settings: {
            content: TRANSITIONS.mainTransition.additionalMessage,
            fontSize: 'small',
            alignment: 'center'
          }
        }
      ]
    },

    // ETAPAS 13-18: 6 questões estratégicas restantes
    ...STRATEGIC_QUESTIONS.map((questionData, i) => ({
      id: `etapa-${i + 13}-estrategica-${i + 1}`,
      name: `Etapa ${i + 13}: Estratégica ${i + 1}`,
      title: questionData.question,
      type: 'strategic' as const,
      order: i + 13,
      settings: {
        backgroundColor: '#ffffff',
        textColor: '#432818',
        showProgress: true,
        progressValue: 65 + (i + 1) * 5 // 70% a 95%
      },
      blocks: [
        {
          id: `strategic-${i + 1}`,
          type: 'strategic-question',
          order: 1,
          settings: {
            question: questionData.question,
            subtitle: questionData.subtitle || undefined,
            options: questionData.options.map(opt => ({
              id: opt.id,
              text: opt.text,
              value: opt.value
            })),
            required: true
          }
        }
      ]
    })),

    // ETAPA 19: Transição Final (antes do resultado)
    {
      id: 'etapa-19-transicao-final',
      name: 'Etapa 19: Transição Final',
      title: TRANSITIONS.finalTransition.title,
      type: 'final-transition',
      order: 19,
      settings: {
        backgroundColor: '#432818',
        textColor: '#ffffff',
        showProgress: true,
        progressValue: 95,
        transitionDuration: TRANSITIONS.finalTransition.duration
      },
      blocks: [
        {
          id: 'final-transition',
          type: 'quiz-final-transition',
          order: 1,
          settings: {
            title: TRANSITIONS.finalTransition.title,
            description: TRANSITIONS.finalTransition.message,
            showSteps: true,
            waitMessage: 'Isso levará apenas alguns segundos...'
          }
        }
      ]
    },

    // ETAPA 20: Resultado A (/resultado) - COMPONENTES REAIS DA ResultPage.tsx
    {
      id: 'etapa-20-resultado-a',
      name: 'Etapa 20: Resultado A (/resultado)',
      title: 'Seu Estilo Predominante - Resultado',
      type: 'result',
      order: 20,
      settings: {
        backgroundColor: '#fffaf7',
        textColor: '#432818',
        showProgress: true,
        progressValue: 100,
        abTestVariant: 'A'
      },
      blocks: [
        // 1. Header (componente Header real)
        {
          id: 'result-header-component',
          type: 'header-component-real',
          order: 1,
          settings: {
            componentName: 'Header',
            props: {
              primaryStyle: 'dynamic',
              logoHeight: 'globalStyles.logoHeight',
              logo: 'globalStyles.logo',
              logoAlt: 'globalStyles.logoAlt',
              userName: 'user?.userName'
            }
          }
        },
        // 2. Card Principal com Progress (componente Card real)
        {
          id: 'result-main-card',
          type: 'card-component-real',
          order: 2,
          settings: {
            componentName: 'Card',
            className: 'p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20 card-elegant',
            children: [
              {
                type: 'progress-component-real',
                componentName: 'Progress',
                props: {
                  value: 'primaryStyle.percentage',
                  className: 'h-2 bg-[#F3E8E6]',
                  indicatorClassName: 'bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]'
                }
              }
            ]
          }
        },
        // 3. SecondaryStylesSection (componente real)
        {
          id: 'result-secondary-styles-component',
          type: 'secondary-styles-component-real',
          order: 3,
          settings: {
            componentName: 'SecondaryStylesSection',
            props: {
              secondaryStyles: 'secondaryStyles'
            }
          }
        },
        // 4. BeforeAfterTransformation (componente real)
        {
          id: 'result-before-after-component',
          type: 'before-after-component-real',
          order: 4,
          settings: {
            componentName: 'BeforeAfterTransformation',
            props: {}
          }
        },
        // 5. MotivationSection (componente real)
        {
          id: 'result-motivation-component',
          type: 'motivation-component-real',
          order: 5,
          settings: {
            componentName: 'MotivationSection',
            props: {}
          }
        },
        // 6. BonusSection (componente real)
        {
          id: 'result-bonus-component',
          type: 'bonus-component-real',
          order: 6,
          settings: {
            componentName: 'BonusSection',
            props: {}
          }
        },
        // 7. Testimonials (componente real)
        {
          id: 'result-testimonials-component',
          type: 'testimonials-component-real',
          order: 7,
          settings: {
            componentName: 'Testimonials',
            props: {}
          }
        },
        // 8. CTA Verde Featured (componente Button real)
        {
          id: 'result-cta-featured',
          type: 'button-component-real',
          order: 8,
          settings: {
            componentName: 'Button',
            onClick: 'handleCTAClick',
            className: 'text-white py-4 px-6 rounded-md btn-cta-green',
            style: {
              background: 'linear-gradient(to right, #4CAF50, #45a049)',
              boxShadow: '0 4px 14px rgba(76, 175, 80, 0.4)'
            },
            children: 'Quero meu Guia de Estilo Agora'
          }
        },
        // 9. SecurePurchaseElement (componente real)
        {
          id: 'result-secure-purchase-component',
          type: 'secure-purchase-component-real',
          order: 9,
          settings: {
            componentName: 'SecurePurchaseElement',
            props: {}
          }
        },
        // 10. GuaranteeSection (componente real)
        {
          id: 'result-guarantee-component',
          type: 'guarantee-component-real',
          order: 10,
          settings: {
            componentName: 'GuaranteeSection',
            props: {}
          }
        },
        // 11. MentorSection (componente real)
        {
          id: 'result-mentor-component',
          type: 'mentor-component-real',
          order: 11,
          settings: {
            componentName: 'MentorSection',
            props: {}
          }
        },
        // 12. Seção "Vista-se de Você — na Prática" (estrutura real)
        {
          id: 'result-vista-se-section',
          type: 'vista-se-section-real',
          order: 12,
          settings: {
            title: 'Vista-se de Você — na Prática',
            subtitle: 'Agora que você conhece seu estilo, é hora de aplicá-lo com clareza e intenção.',
            description: 'O Guia da Gisele Galvão foi criado para mulheres como você — que querem se vestir com autenticidade e transformar sua imagem em ferramenta de poder.',
            benefits: [
              'Looks com intenção e identidade',
              'Cores, modelagens e tecidos a seu favor',
              'Imagem alinhada aos seus objetivos',
              'Guarda-roupa funcional, sem compras por impulso'
            ]
          }
        },
        // 13. Value Stack Real (estrutura exata da página)
        {
          id: 'result-value-stack-real',
          type: 'value-stack-component-real',
          order: 13,
          settings: {
            title: 'O Que Você Recebe Hoje',
            items: [
              { name: 'Guia Principal', price: 'R$ 67,00' },
              { name: 'Bônus - Peças-chave', price: 'R$ 79,00' },
              { name: 'Bônus - Visagismo Facial', price: 'R$ 29,00' }
            ],
            totalValue: 'R$ 175,00',
            currentPrice: 'R$ 39,00',
            paymentInfo: 'Pagamento único',
            className: 'bg-white p-6 rounded-lg shadow-md border border-[#B89B7A]/20 card-elegant mb-8 max-w-md mx-auto'
          }
        },
        // 14. CTA Final Green (Button component real)
        {
          id: 'result-final-cta-component',
          type: 'button-component-real',
          order: 14,
          settings: {
            componentName: 'Button',
            onClick: 'handleCTAClick',
            className: 'text-white py-5 px-8 rounded-md shadow-md transition-colors btn-3d mb-2',
            style: {
              background: 'linear-gradient(to right, #4CAF50, #45a049)',
              boxShadow: '0 4px 14px rgba(76, 175, 80, 0.4)',
              fontSize: '1rem'
            },
            children: 'Garantir Meu Guia + Bônus Especiais'
          }
        },
        // 15. SecurePurchaseElement Final (componente real)
        {
          id: 'result-secure-purchase-final',
          type: 'secure-purchase-component-real',
          order: 15,
          settings: {
            componentName: 'SecurePurchaseElement',
            props: {}
          }
        },
        // 16. BuildInfo (componente real)
        {
          id: 'result-build-info-component',
          type: 'build-info-component-real',
          order: 16,
          settings: {
            componentName: 'BuildInfo',
            props: {}
          }
        }
      ]
    },

    // ETAPA 21: Oferta B (/quiz-descubra-seu-estilo) - COMPONENTES REAIS DA QuizOfferPage.tsx
    {
      id: 'etapa-21-oferta-b',
      name: 'Etapa 21: Oferta B (/quiz-descubra-seu-estilo)',
      title: 'Descubra Seu Estilo Predominante',
      type: 'offer',
      order: 21,
      settings: {
        backgroundColor: '#FFFBF7',
        textColor: '#432818',
        showProgress: false,
        abTestVariant: 'B'
      },
      blocks: [
        // 1. Estilos CSS customizados da página (injetados no head)
        {
          id: 'offer-custom-styles',
          type: 'custom-styles-component-real',
          order: 1,
          settings: {
            componentName: 'CustomStyles',
            styles: `
              :root {
                --primary: #B89B7A;
                --secondary: #432818;
                --accent: #aa6b5d;
                --background: #FFFBF7;
                --success: #22c55e;
              }
              .btn-primary-clean {
                background: linear-gradient(135deg, var(--success) 0%, #16a34a 100%);
                color: white;
                font-weight: 700;
                border-radius: 12px;
                padding: 1rem 2rem;
              }
            `
          }
        },
        // 2. FixedIntroImage para hero (componente real)
        {
          id: 'offer-hero-fixed-image',
          type: 'fixed-intro-image-component-real',
          order: 2,
          settings: {
            componentName: 'FixedIntroImage',
            props: {
              src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
              alt: 'Logo Gisele Galvão',
              width: 200,
              height: 80
            }
          }
        },
        // 3. SectionTitle component real
        {
          id: 'offer-section-title-hero',
          type: 'section-title-component-real',
          order: 3,
          settings: {
            componentName: 'SectionTitle',
            variant: 'primary',
            title: 'Descubra Seu Estilo Predominante em 5 Minutos',
            subtitle: 'Tenha finalmente um guarda-roupa que funciona 100%, onde tudo combina e reflete sua personalidade'
          }
        },
        // 4. FixedIntroImage hero complementary
        {
          id: 'offer-hero-complementary-image',
          type: 'fixed-intro-image-component-real',
          order: 4,
          settings: {
            componentName: 'FixedIntroImage',
            props: {
              src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp',
              alt: 'Transformação de guarda-roupa',
              width: 600,
              height: 400
            }
          }
        },
        // 5. Button com onClick real
        {
          id: 'offer-hero-cta-button',
          type: 'offer-button-component-real',
          order: 5,
          settings: {
            componentName: 'OfferButton',
            onClick: 'handleCtaClick("hero_cta", "Descobrir Estilo")',
            href: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
            className: 'btn-primary-clean',
            children: 'Descobrir Meu Estilo Agora'
          }
        },
        // 6. ProblemSection real (seção "Você se identifica?")
        {
          id: 'offer-problem-section-real',
          type: 'problem-section-component-real',
          order: 6,
          settings: {
            componentName: 'ProblemSection',
            title: 'Você se identifica com isso?',
            problems: [
              'Guarda-roupa cheio mas nunca tem o que vestir?',
              'Compra peças que nunca combinam com nada?',
              'Sente que "nada fica bom" em você?',
              'Gasta dinheiro em roupas que ficam no armário?'
            ],
            insight: 'Isso acontece porque você ainda não descobriu seu estilo predominante.'
          }
        },
        // 7. FixedIntroImage para problema
        {
          id: 'offer-problem-image',
          type: 'fixed-intro-image-component-real',
          order: 7,
          settings: {
            componentName: 'FixedIntroImage',
            props: {
              src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp',
              alt: 'Frustração com guarda-roupa',
              width: 500,
              height: 350
            }
          }
        },
        // 8. SolutionSection real
        {
          id: 'offer-solution-section-real',
          type: 'solution-section-component-real',
          order: 8,
          settings: {
            componentName: 'SolutionSection',
            title: 'A Solução: Quiz de Estilo',
            subtitle: 'Método preciso para identificar seu estilo entre os 7 estilos universais + guia personalizado completo.'
          }
        },
        // 9. FixedIntroImage para solução
        {
          id: 'offer-solution-image',
          type: 'fixed-intro-image-component-real',
          order: 9,
          settings: {
            componentName: 'FixedIntroImage',
            props: {
              src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746650306/oie_1_gcozz9.webp',
              alt: 'Quiz de Estilo',
              width: 400,
              height: 300
            }
          }
        },
        // 10. CountdownTimer component real
        {
          id: 'offer-countdown-timer-real',
          type: 'countdown-timer-component-real',
          order: 10,
          settings: {
            componentName: 'CountdownTimer',
            props: {}
          }
        },
        // 11. GuidesBenefitsSection real
        {
          id: 'offer-guides-benefits-section',
          type: 'guides-benefits-section-real',
          order: 11,
          settings: {
            componentName: 'GuidesBenefitsSection',
            title: 'Transformação Completa',
            subtitle: 'Tudo que você precisa para descobrir e aplicar seu estilo'
          }
        },
        // 12. FixedIntroImage para guias principal
        {
          id: 'offer-guides-main-image',
          type: 'fixed-intro-image-component-real',
          order: 12,
          settings: {
            componentName: 'FixedIntroImage',
            props: {
              src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp',
              alt: 'Guia Principal',
              width: 400,
              height: 500
            }
          }
        },
        // 13. FixedIntroImage para guias complementar
        {
          id: 'offer-guides-complementary-image',
          type: 'fixed-intro-image-component-real',
          order: 13,
          settings: {
            componentName: 'FixedIntroImage',
            props: {
              src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_14_oxegnd.webp',
              alt: 'Materiais Complementares',
              width: 350,
              height: 400
            }
          }
        },
        // 14. BonusSection real - Peças-chave
        {
          id: 'offer-bonus-1-section',
          type: 'bonus-section-component-real',
          order: 14,
          settings: {
            componentName: 'BonusSection',
            bonusNumber: 1,
            title: 'Bônus: Peças-Chave',
            description: 'Guarda-roupa funcional',
            imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp'
          }
        },
        // 15. BonusSection real - Visagismo
        {
          id: 'offer-bonus-2-section',
          type: 'bonus-section-component-real',
          order: 15,
          settings: {
            componentName: 'BonusSection',
            bonusNumber: 2,
            title: 'Bônus: Visagismo',
            description: 'Valorize seus traços',
            imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp'
          }
        },
        // 16. PricingSection real (preço focado)
        {
          id: 'offer-pricing-section-real',
          type: 'pricing-section-component-real',
          order: 16,
          settings: {
            componentName: 'PricingSection',
            title: 'Oferta por tempo limitado',
            installments: '5x de R$ 8,83',
            fullPrice: 'R$ 39,90',
            savings: '77% OFF - Economia de R$ 135,10',
            className: 'bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white text-center mb-8'
          }
        },
        // 17. Final CTA Button real
        {
          id: 'offer-final-cta-button',
          type: 'offer-button-component-real',
          order: 17,
          settings: {
            componentName: 'OfferButton',
            onClick: 'handleCtaClick("final_cta", "Garantir Transformação")',
            href: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
            className: 'btn-primary-clean',
            children: 'Garantir Minha Transformação'
          }
        },
        // 18. GuaranteeSection real
        {
          id: 'offer-guarantee-section-real',
          type: 'guarantee-section-component-real',
          order: 18,
          settings: {
            componentName: 'GuaranteeSection',
            title: '7 Dias de Garantia',
            description: 'Se não ficar satisfeita, devolvemos 100% do seu dinheiro. Sem perguntas.',
            imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp'
          }
        },
        // 19. FaqSectionNew component real
        {
          id: 'offer-faq-section-real',
          type: 'faq-section-component-real',
          order: 19,
          settings: {
            componentName: 'FaqSectionNew',
            props: {}
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
  },
  // Blocos específicos do Quiz
  { 
    id: 'quiz-intro-section',
    type: 'quiz-intro-section', 
    name: 'Seção de Introdução do Quiz', 
    description: 'Bloco completo de introdução com CTA',
    icon: <Sparkles className="w-4 h-4" />,
    category: 'Quiz'
  },
  { 
    id: 'quiz-progress-bar',
    type: 'quiz-progress-bar', 
    name: 'Barra de Progresso', 
    description: 'Indicador visual do progresso do quiz',
    icon: <Target className="w-4 h-4" />,
    category: 'Quiz'
  },
  { 
    id: 'quiz-navigation-controls',
    type: 'quiz-navigation-controls', 
    name: 'Controles de Navegação', 
    description: 'Botões de voltar/avançar do quiz',
    icon: <ArrowRight className="w-4 h-4" />,
    category: 'Quiz'
  },
  { 
    id: 'quiz-transition-page',
    type: 'quiz-transition-page', 
    name: 'Página de Transição', 
    description: 'Página entre seções do quiz',
    icon: <RotateCcw className="w-4 h-4" />,
    category: 'Quiz'
  },
  { 
    id: 'quiz-final-transition',
    type: 'quiz-final-transition', 
    name: 'Transição Final', 
    description: 'Página de loading antes do resultado',
    icon: <Trophy className="w-4 h-4" />,
    category: 'Quiz'
  }
];

// Templates pré-configurados
const pageTemplates = [
  {
    id: 'etapa-1-intro',
    name: 'Etapa 1: Introdução (Coleta Nome)',
    type: 'intro',
    description: 'Página de introdução completa com coleta de nome',
    blocks: [
      {
        id: 'template-quiz-intro',
        type: 'quiz-intro-section',
        order: 1,
        settings: {
          title: 'Descubra Seu Estilo Único',
          subtitle: 'Um quiz personalizado para transformar seu guarda-roupa',
          showBenefits: true,
          ctaText: 'Começar Quiz Agora',
          showTrust: true
        }
      },
      {
        id: 'template-progress',
        type: 'quiz-progress-bar',
        order: 2,
        settings: {
          currentStep: 0,
          totalSteps: 18,
          progressPercent: 0,
          stepName: 'Introdução'
        }
      }
    ]
  },
  {
    id: 'etapa-2-questao-1',
    name: 'Etapa 2: Questão 1 - Tipo de Roupa',
    type: 'question',
    description: 'Qual o seu tipo de roupa favorita? (texto + imagem)',
    blocks: [
      {
        id: 'template-progress-q1',
        type: 'quiz-progress-bar',
        order: 1,
        settings: {
          currentStep: 1,
          totalSteps: 18,
          progressPercent: 6,
          stepName: 'Questão 1 de 10'
        }
      },
      {
        id: 'template-question-1',
        type: 'question-multiple',
        order: 2,
        settings: {
          question: 'Qual o seu tipo de roupa favorita?',
          multipleSelection: true,
          maxSelections: 3,
          options: [
            {
              id: 'natural',
              text: 'Conforto, leveza e praticidade no vestir',
              imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/11_hqmr8l.webp',
              value: 'natural'
            },
            {
              id: 'classico',
              text: 'Discrição, caimento clássico e sobriedade',
              imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/12_edlmwf.webp',
              value: 'classico'
            },
            {
              id: 'contemporaneo',
              text: 'Praticidade com um toque de estilo atual',
              imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/4_snhaym.webp',
              value: 'contemporaneo'
            },
            {
              id: 'elegante',
              text: 'Elegância refinada, moderna e sem exageros',
              imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/14_l2nprc.webp',
              value: 'elegante'
            },
            {
              id: 'romantico',
              text: 'Delicadeza em tecidos suaves e fluidos',
              imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/15_xezvcy.webp',
              value: 'romantico'
            },
            {
              id: 'sexy',
              text: 'Sensualidade com destaque para o corpo',
              imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735316/16_mpqpew.webp',
              value: 'sexy'
            },
            {
              id: 'dramatico',
              text: 'Impacto visual com peças estruturadas e assimétricas',
              imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735319/17_m5ogub.webp',
              value: 'dramatico'
            },
            {
              id: 'criativo',
              text: 'Mix criativo com formas ousadas e originais',
              imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/18_j8ipfb.webp',
              value: 'criativo'
            }
          ]
        }
      },
      {
        id: 'template-navigation-q1',
        type: 'quiz-navigation-controls',
        order: 3,
        settings: {
          currentQuestion: 1,
          totalQuestions: 10,
          hideBackButton: true,
          backButtonText: 'Voltar',
          nextButtonText: 'Próxima'
        }
      }
    ]
  },
  {
    id: 'etapa-3-questao-2',
    name: 'Etapa 3: Questão 2 - Personalidade',
    type: 'question',
    description: 'Resuma a sua personalidade (apenas texto)',
    blocks: [
      {
        id: 'template-progress-q2',
        type: 'quiz-progress-bar',
        order: 1,
        settings: {
          currentStep: 2,
          totalSteps: 18,
          progressPercent: 11,
          stepName: 'Questão 2 de 10'
        }
      },
      {
        id: 'template-question-2',
        type: 'question-multiple',
        order: 2,
        settings: {
          question: 'Resuma a sua personalidade:',
          multipleSelection: true,
          maxSelections: 3,
          options: [
            { id: 'natural', text: 'Informal, espontânea, alegre, essencialista', value: 'natural' },
            { id: 'classico', text: 'Conservadora, séria, organizada', value: 'classico' },
            { id: 'contemporaneo', text: 'Informada, ativa, prática', value: 'contemporaneo' },
            { id: 'elegante', text: 'Exigente, sofisticada, seletiva', value: 'elegante' },
            { id: 'romantico', text: 'Feminina, meiga, delicada, sensível', value: 'romantico' },
            { id: 'sexy', text: 'Glamorosa, vaidosa, sensual', value: 'sexy' },
            { id: 'dramatico', text: 'Cosmopolita, moderna e audaciosa', value: 'dramatico' },
            { id: 'criativo', text: 'Exótica, aventureira, livre', value: 'criativo' }
          ]
        }
      },
      {
        id: 'template-navigation-q2',
        type: 'quiz-navigation-controls',
        order: 3,
        settings: {
          currentQuestion: 2,
          totalQuestions: 10,
          hideBackButton: false,
          backButtonText: 'Voltar',
          nextButtonText: 'Próxima'
        }
      }
    ]
  },
  {
    id: 'etapa-12-transicao-1',
    name: 'Etapa 12: Transição 1 - Antes Estratégicas',
    type: 'main-transition',
    description: 'Página de transição antes das questões estratégicas',
    blocks: [
      {
        id: 'template-transition-1',
        type: 'quiz-transition-page',
        order: 1,
        settings: {
          title: '🕐 Enquanto calculamos o seu resultado...',
          description: 'Queremos te fazer algumas perguntas que vão tornar sua experiência ainda mais completa. A ideia é simples: te ajudar a enxergar com mais clareza onde você está agora — e para onde pode ir com mais intenção, leveza e autenticidade.',
          showProgress: true,
          progressValue: 60,
          ctaText: 'Continuar'
        }
      },
      {
        id: 'template-transition-note',
        type: 'text',
        order: 2,
        settings: {
          content: '💬 Responda com sinceridade. Isso é só entre você e a sua nova versão.',
          fontSize: 'medium',
          alignment: 'center'
        }
      }
    ]
  },
  {
    id: 'etapa-13-estrategica-1',
    name: 'Etapa 13: Estratégica 1 - Como se vê',
    type: 'strategic',
    description: 'Como você se vê hoje?',
    blocks: [
      {
        id: 'template-strategic-1',
        type: 'strategic-question',
        order: 1,
        settings: {
          question: 'Como você se vê hoje? Quando você se olha no espelho, como se sente com sua imagem pessoal atualmente?',
          options: [
            { id: 'a', text: 'Me sinto desconectada da mulher que sou hoje', value: 'desconectada' },
            { id: 'b', text: 'Tenho dúvidas sobre o que realmente me valoriza', value: 'duvidas' },
            { id: 'c', text: 'Às vezes acerto, às vezes erro', value: 'indefinida' },
            { id: 'd', text: 'Me sinto segura, mas sei que posso evoluir', value: 'segura' }
          ]
        }
      }
    ]
  },
  {
    id: 'etapa-19-transicao-final',
    name: 'Etapa 19: Transição Final',
    type: 'final-transition',
    description: 'Página de loading antes do resultado',
    blocks: [
      {
        id: 'template-final-transition',
        type: 'quiz-final-transition',
        order: 1,
        settings: {
          title: 'Processando Suas Respostas...',
          description: 'Obrigada por compartilhar. Estamos analisando suas preferências para criar seu perfil único de estilo.',
          showSteps: true,
          waitMessage: 'Isso levará apenas alguns segundos...'
        }
      }
    ]
  },
  {
    id: 'etapa-20-resultado-a',
    name: 'Etapa 20: Resultado A (/resultado)',
    type: 'result',
    description: 'Página de resultado completa - Teste A',
    blocks: [
      {
        id: 'template-result-display',
        type: 'style-result-display',
        order: 1,
        settings: {
          styleName: 'Seu Estilo Personalizado',
          percentMatch: 92,
          styleDescription: 'Baseado nas suas respostas, identificamos seu perfil único de estilo que reflete sua personalidade e preferências.',
          styleImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp'
        }
      },
      {
        id: 'template-testimonials-result',
        type: 'testimonials-grid',
        order: 2,
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
        id: 'template-sales-offer-result',
        type: 'sales-offer',
        order: 3,
        settings: {
          title: 'Transforme Seu Estilo Hoje',
          subtitle: 'Guia Completo de Estilo Personalizado',
          originalPrice: 'R$ 197,00',
          currentPrice: 'R$ 97,00',
          discount: '50% OFF',
          urgency: 'Oferta limitada - apenas hoje!'
        }
      }
    ]
  },
  {
    id: 'etapa-21-oferta-b',
    name: 'Etapa 21: Oferta B (/quiz-descubra-seu-estilo)',
    type: 'offer',
    description: 'Página de oferta - Teste B',
    blocks: [
      {
        id: 'template-offer-header',
        type: 'header',
        order: 1,
        settings: {
          title: 'Descubra Seu Estilo Único',
          subtitle: 'Transforme seu guarda-roupa com nosso guia completo',
          titleSize: 'large',
          alignment: 'center'
        }
      },
      {
        id: 'template-offer-price',
        type: 'price',
        order: 2,
        settings: {
          originalPrice: 'R$ 197,00',
          currentPrice: 'R$ 97,00',
          discount: '50% OFF',
          urgency: 'Oferta por tempo limitado!'
        }
      },
      {
        id: 'template-offer-bonus',
        type: 'bonus',
        order: 3,
        settings: {
          title: 'E-book Exclusivo de Estilo',
          description: 'Guia completo com dicas avançadas de styling',
          value: 'R$ 47,00'
        }
      },
      {
        id: 'template-offer-guarantee',
        type: 'guarantee-section',
        order: 4,
        settings: {
          title: 'Garantia de 30 Dias',
          description: 'Se não ficar satisfeita, devolvemos 100% do seu dinheiro',
          features: [
            'Garantia incondicional',
            'Suporte personalizado',
            'Acesso vitalício'
          ]
        }
      },
      {
        id: 'template-offer-cta',
        type: 'button',
        order: 5,
        settings: {
          text: 'Quero Transformar Meu Estilo Agora!',
          style: 'primary',
          size: 'lg',
          fullWidth: true
        }
      }
    ]
  }
];

const CaktoQuizAdvancedEditor: React.FC = () => {
  // Hook para colunas redimensionáveis
  const {
    leftWidth,
    rightWidth,
    startResizeLeft,
    startResizeRight,
    isResizingLeft,
    isResizingRight
  } = useResizableColumns(320, 320);

  // Estados principais
  const [funnel, setFunnel] = useState<FunnelData>(createInitialFunnel);
  const [currentPageId, setCurrentPageId] = useState<string>('etapa-1-intro');
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'funnel' | 'blocks' | 'templates' | 'settings'>('funnel');
  const [deviceView, setDeviceView] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isAutoSaving, setIsAutoSaving] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Hook para toast
  const { toast } = useToast();

  // Garantir que o funnel tenha estrutura válida
  React.useEffect(() => {
    if (!funnel || !funnel.pages || funnel.pages.length === 0) {
      console.log('Inicializando funnel com dados padrão...');
      setFunnel(createInitialFunnel());
    }
  }, [funnel]);

  // Computed values
  const currentPage = useMemo(() => {
    const page = funnel?.pages?.find(page => page.id === currentPageId);
    
    // Garantir que a página tenha estrutura válida
    if (page && !page.settings) {
      return {
        ...page,
        settings: {
          backgroundColor: '#ffffff',
          textColor: '#432818',
          showProgress: true,
          progressValue: 50
        }
      };
    }
    
    return page;
  }, [funnel?.pages, currentPageId]);

  const currentPageIndex = useMemo(() => 
    funnel?.pages?.findIndex(page => page.id === currentPageId) || 0, 
    [funnel?.pages, currentPageId]
  );

  const selectedBlock = useMemo(() => 
    currentPage?.blocks?.find(block => block.id === selectedBlockId), 
    [currentPage?.blocks, selectedBlockId]
  );

  // Função para adicionar bloco
  const addBlock = useCallback((blockType: string) => {
    if (!currentPage) return;

    const newBlock: FunnelBlock = {
      id: `${blockType}-${Date.now()}`,
      type: blockType,
      order: currentPage.blocks.length + 1,
      content: {},
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
          content: {},
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

  // Função para adicionar nova página
  const addNewPage = useCallback((template?: any) => {
    const newPageId = `page-${Date.now()}`;
    const newPage: FunnelPage = {
      id: newPageId,
      name: template ? template.name : 'Nova Página',
      title: template ? template.name : 'Nova Página',
      type: template ? template.type : 'question',
      settings: {
        backgroundColor: '#ffffff',
        textColor: '#432818',
        showProgress: true,
        progressValue: 50
      },
      blocks: template ? template.blocks.map((block: any, index: number) => ({
        ...block,
        id: `${block.type}-${Date.now()}-${index}`,
        order: index + 1
      })) : []
    };

    setFunnel(prev => ({
      ...prev,
      pages: [...prev.pages, newPage]
    }));

    setCurrentPageId(newPageId);

    toast({
      title: "Nova página criada!",
      description: template ? `Página criada com template "${template.name}"` : "Nova página criada com sucesso",
      variant: "default",
    });
  }, [toast]);

  // Função para salvar o funil
  const saveFunnel = useCallback(async () => {
    try {
      setIsSaving(true);
      
      // Converter dados do editor para formato do serviço
      const funnelData: FunnelData = {
        ...funnel,
        pages: funnel.pages.map((page, index) => ({
          id: page.id,
          type: page.type,
          title: page.title,
          order: index + 1,
          blocks: page.blocks.map((block, blockIndex) => ({
            id: block.id,
            type: block.type,
            content: block.settings || {},
            styles: block.style,
            position: { x: 0, y: blockIndex * 100 }
          })),
          metadata: page.settings
        }))
      };

      // Tentar salvar no backend primeiro
      try {
        await funnelService.saveFunnelData(funnelData, 1); // TODO: usar userId real
        console.log('Funil salvo no backend com sucesso!');
      } catch (backendError) {
        console.warn('Erro ao salvar no backend, salvando localmente:', backendError);
        // Fallback para localStorage
        localStorage.setItem('caktoquiz-funnel', JSON.stringify(funnelData));
      }

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
    } finally {
      setIsSaving(false);
    }
  }, [funnel, toast]);

  // Função para carregar funil salvo
  const loadSavedFunnel = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Tentar carregar do backend primeiro
      try {
        const funnelData = await funnelService.loadFunnelData(funnel.id);
        if (funnelData) {
          // Converter dados do serviço para formato do editor
          const editorFunnel: FunnelData = {
            ...funnelData,
            pages: funnelData.pages.map(page => ({
              id: page.id,
              name: page.title || `Página ${page.order}`,
              title: page.title || '',
              type: page.type as any,
              order: page.order,
              blocks: page.blocks?.map((block, index) => ({
                id: block.id,
                type: block.type,
                order: index + 1,
                settings: block.content,
                style: block.styles
              })) || [],
              settings: page.metadata as any || {}
            }))
          };
          
          setFunnel(editorFunnel);
          console.log('Funil carregado do backend com sucesso!');
          return;
        }
      } catch (backendError) {
        console.warn('Erro ao carregar do backend, tentando localStorage:', backendError);
      }
      
      // Fallback para localStorage
      const savedFunnel = localStorage.getItem('caktoquiz-funnel');
      if (savedFunnel) {
        const parsedFunnel = JSON.parse(savedFunnel);
        
        // Garantir que as páginas tenham a estrutura correta
        const normalizedFunnel = {
          ...parsedFunnel,
          pages: parsedFunnel.pages?.map((page: any) => ({
            ...page,
            settings: page.settings || {
              backgroundColor: '#ffffff',
              textColor: '#432818',
              showProgress: true,
              progressValue: 50
            },
            blocks: page.blocks || []
          })) || []
        };
        
        setFunnel(normalizedFunnel);
        console.log('Funil carregado do localStorage!');
      }
    } catch (error) {
      console.error('Erro ao carregar funil salvo:', error);
      toast({
        title: "Erro ao carregar",
        description: "Não foi possível carregar o funil salvo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [funnel.id, toast]);

  // Função para carregar funil específico
  const loadFunnelById = useCallback(async (funnelId: string) => {
    try {
      setIsLoading(true);
      const funnelData = await funnelService.loadFunnelData(funnelId);
      
      if (funnelData) {
        // Converter dados do serviço para formato do editor
        const editorFunnel: FunnelData = {
          ...funnelData,
          pages: funnelData.pages.map(page => ({
            id: page.id,
            name: page.title || `Página ${page.order}`,
            title: page.title || '',
            type: page.type as any,
            order: page.order,
            blocks: page.blocks?.map((block, index) => ({
              id: block.id,
              type: block.type,
              order: index + 1,
              settings: block.content,
              style: block.styles
            })) || [],
            settings: page.metadata as any || {}
          }))
        };
        
        setFunnel(editorFunnel);
        setCurrentPageId(editorFunnel.pages[0]?.id || 'intro');
        
        toast({
          title: "Funil carregado!",
          description: `Funil "${funnelData.name}" carregado com sucesso.`,
          variant: "default",
        });
      }
    } catch (error) {
      console.error('Erro ao carregar funil:', error);
      toast({
        title: "Erro ao carregar funil",
        description: "Não foi possível carregar o funil selecionado.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Carregar funil salvo na inicialização
  React.useEffect(() => {
    // Verificar se o funil atual tem estrutura válida
    if (!funnel?.pages || funnel.pages.length === 0) {
      console.log('Inicializando funil padrão...');
      return;
    }
    
    // Só carregar funil salvo se não for o inicial
    if (funnel.pages.length > 0 && funnel.pages[0]?.id === 'intro') {
      loadSavedFunnel();
    }
  }, []); // Remover dependência para evitar loops

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
    const autoSaveInterval = setInterval(async () => {
      setIsAutoSaving(true);
      try {
        // Converter dados do editor para formato do serviço
        const funnelData: FunnelData = {
          ...funnel,
          pages: funnel.pages.map((page, index) => ({
            id: page.id,
            type: page.type,
            title: page.title,
            order: index + 1,
            blocks: page.blocks.map((block, blockIndex) => ({
              id: block.id,
              type: block.type,
              content: block.settings || {},
              styles: block.style,
              position: { x: 0, y: blockIndex * 100 }
            })),
            metadata: page.settings
          }))
        };

        // Tentar salvar no backend
        try {
          await funnelService.saveFunnelData(funnelData, 1); // TODO: usar userId real
          console.log('Auto-save realizado no backend');
        } catch (backendError) {
          // Fallback para localStorage
          localStorage.setItem('caktoquiz-funnel', JSON.stringify(funnelData));
          console.log('Auto-save realizado no localStorage');
        }
      } catch (error) {
        console.error('Erro no auto-save:', error);
      } finally {
        setTimeout(() => setIsAutoSaving(false), 1000);
      }
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
              textAlign: block?.settings?.alignment || 'center'
            }} 
            onClick={handleBlockClick} 
            className="py-4"
          >
            <h1 className={`font-bold text-[#432818] mb-4 font-playfair ${
              block?.settings?.titleSize === 'small' ? 'text-xl md:text-2xl' :
              block?.settings?.titleSize === 'medium' ? 'text-2xl md:text-3xl' :
              'text-3xl md:text-4xl'
            }`}>
              {block?.settings?.title || 'Título do Cabeçalho'}
            </h1>
            {block?.settings?.subtitle && (
              <p className="text-lg text-[#6B5B73] mb-6">
                {block?.settings?.subtitle}
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
              textAlign: block?.settings?.alignment || 'left'
            }} 
            onClick={handleBlockClick}
            className="py-2"
          >
            <p className={`text-[#432818] leading-relaxed ${
              block?.settings?.fontSize === 'small' ? 'text-sm' :
              block?.settings?.fontSize === 'large' ? 'text-lg' :
              'text-base'
            }`}>
              {block?.settings?.content || 'Conteúdo do texto aqui...'}
            </p>
          </div>
        );
        break;

      case 'image':
        content = (
          <div 
            style={{
              ...baseStyle,
              textAlign: block?.settings?.alignment || 'center'
            }} 
            onClick={handleBlockClick} 
            className="py-4"
          >
            <img
              src={block?.settings?.src || 'https://via.placeholder.com/600x400?text=Imagem'}
              alt={block?.settings?.alt || 'Imagem'}
              className="max-w-full h-auto rounded-lg shadow-md mx-auto"
              style={{ width: block?.settings?.width || 'auto' }}
            />
          </div>
        );
        break;

      case 'button':
        const buttonStyle = block?.settings?.style || 'primary';
        const buttonClasses: Record<string, string> = {
          primary: 'bg-[#B89B7A] hover:bg-[#A1835D] text-white',
          secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
          accent: 'bg-[#6B5B73] hover:bg-[#5A4A5F] text-white'
        };

        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="text-center py-4">
            <Button 
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${buttonClasses[buttonStyle] || buttonClasses.primary} ${
                block?.settings?.fullWidth ? 'w-full' : ''
              } ${
                block?.settings?.size === 'sm' ? 'px-6 py-2 text-sm' :
                block?.settings?.size === 'lg' ? 'px-12 py-4 text-lg' :
                'px-8 py-3'
              }`}
            >
              {block?.settings?.text || 'Texto do Botão'}
            </Button>
          </div>
        );
        break;

      case 'form-input':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#432818]">
                {block?.settings?.label || 'Campo de entrada'}
                {block?.settings?.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              <Input
                type={block?.settings?.type || 'text'}
                placeholder={block?.settings?.placeholder || 'Digite aqui...'}
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
                {block?.settings?.question || 'Qual é a sua pergunta?'}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {(block?.settings?.options || [
                  { id: 'a', text: 'Opção A', value: 'a' },
                  { id: 'b', text: 'Opção B', value: 'b' },
                  { id: 'c', text: 'Opção C', value: 'c' },
                  { id: 'd', text: 'Opção D', value: 'd' }
                ]).map((option: any, index: number) => (
                  <div
                    key={option.id}
                    className="border-2 border-[#B89B7A]/30 hover:border-[#B89B7A] hover:bg-[#f9f4ef] rounded-xl transition-all duration-200 cursor-pointer group"
                  >
                    {option.imageUrl && (
                      <div className="aspect-[4/3] overflow-hidden rounded-t-xl">
                        <img
                          src={option.imageUrl}
                          alt={option.text}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="font-bold text-[#B89B7A] text-lg min-w-[24px] group-hover:scale-110 transition-transform">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        <span className="text-[#432818] group-hover:text-[#432818] text-sm leading-relaxed">
                          {option.text}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {block?.settings?.multipleSelection && (
                <div className="text-center text-sm text-[#6B5B73] italic">
                  Selecione até {block?.settings?.maxSelections || 3} opções
                </div>
              )}
            </div>
          </div>
        );
        break;

      case 'question-strategic':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6">
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-semibold text-[#432818] text-center leading-relaxed">
                {block?.settings?.question || 'Pergunta estratégica sobre seus objetivos'}
              </h3>
              {block?.settings?.subtitle && (
                <p className="text-center text-[#6B5B73] text-lg">
                  {block?.settings?.subtitle}
                </p>
              )}
              <div className="space-y-3 max-w-2xl mx-auto">
                {(block?.settings?.options || [
                  { id: 'a', text: 'Sim, definitivamente', value: 'high' },
                  { id: 'b', text: 'Talvez, preciso saber mais', value: 'medium' },
                  { id: 'c', text: 'Não, não me interessa', value: 'low' }
                ]).map((option: any, index: number) => (
                  <div
                    key={option.id}
                    className="border-2 border-[#6B5B73]/30 hover:border-[#6B5B73] hover:bg-[#6B5B73]/10 rounded-xl transition-all duration-200 cursor-pointer group p-4"
                  >
                    <div className="flex items-center justify-center text-center">
                      <span className="text-[#432818] group-hover:text-[#6B5B73] font-medium">
                        {option.text}
                      </span>
                    </div>
                  </div>
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
                {block?.settings?.message || 'Carregando...'}
              </span>
            </div>
          </div>
        );
        break;

      case 'price':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="text-center py-6">
            <div className="bg-gradient-to-br from-[#B89B7A] to-[#A1835D] p-8 rounded-2xl text-white shadow-2xl max-w-md mx-auto">
              {block?.settings?.originalPrice && (
                <div className="text-xl line-through opacity-75 mb-2">
                  {block?.settings?.originalPrice}
                </div>
              )}
              <div className="text-5xl font-bold mb-4">
                {block?.settings?.currentPrice || 'R$ 97,00'}
              </div>
              {block?.settings?.discount && (
                <div className="text-sm font-semibold bg-red-500 text-white px-4 py-2 rounded-full inline-block mb-4 animate-pulse">
                  {block?.settings?.discount}
                </div>
              )}
              {block?.settings?.urgency && (
                <div className="text-base opacity-90 font-medium">
                  {block?.settings?.urgency}
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
              height: block?.settings?.height || '50px'
            }} 
            onClick={handleBlockClick}
            className="w-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm"
          >
            Espaçador ({block?.settings?.height || '50px'})
          </div>
        );
        break;

      case 'testimonial':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 max-w-lg mx-auto">
              <div className="flex items-center mb-4">
                <img
                  src={block?.settings?.avatar || 'https://via.placeholder.com/60x60?text=👤'}
                  alt={block?.settings?.author || 'Cliente'}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-[#432818]">
                    {block?.settings?.author || 'Maria Silva'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {block?.settings?.role || 'Cliente satisfeita'}
                  </p>
                </div>
              </div>
              <div className="flex mb-3">
                {Array.from({ length: block?.settings?.rating || 5 }, (_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-[#432818] italic">
                "{block?.settings?.text || 'Este produto mudou minha vida! Recomendo para todos.'}"
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
                    {block?.settings?.title || 'Garantia de 30 dias'}
                  </h4>
                  <p className="text-sm text-green-700">
                    {block?.settings?.description || 'Se não ficar satisfeito, devolvemos 100% do seu dinheiro.'}
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
                {block?.settings?.title || 'Oferta por tempo limitado!'}
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
                {block?.settings?.title || 'E-book Exclusivo de Estilo'}
              </h4>
              <p className="text-sm opacity-90">
                {block?.settings?.description || 'Guia completo com dicas avançadas de styling'}
              </p>
              <div className="mt-3 text-sm font-semibold">
                Valor: {block?.settings?.value || 'R$ 47,00'}
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
                {(block?.settings?.questions || [
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
                    {block?.settings?.number1 || '10.000+'}
                  </div>
                  <div className="text-sm text-blue-800">
                    {block?.settings?.label1 || 'Mulheres'}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {block?.settings?.number2 || '4.9★'}
                  </div>
                  <div className="text-sm text-blue-800">
                    {block?.settings?.label2 || 'Avaliação'}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {block?.settings?.number3 || '99%'}
                  </div>
                  <div className="text-sm text-blue-800">
                    {block?.settings?.label3 || 'Satisfação'}
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
                {block?.settings?.videoUrl ? (
                  <iframe
                    src={block?.settings?.videoUrl}
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
              {block?.settings?.caption && (
                <p className="text-center text-sm text-gray-600 mt-3">
                  {block?.settings?.caption}
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
              {block?.settings?.type === 'elegant' ? (
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-[#B89B7A] border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-[#6B5B73] rounded-full animate-ping"></div>
                </div>
              ) : (
                <RotateCcw className="h-10 w-10 animate-spin text-[#B89B7A]" />
              )}
              <span className="text-[#432818] text-lg font-medium">
                {block?.settings?.message || 'Carregando...'}
              </span>
              {block?.settings?.duration && (
                <div className="text-sm text-gray-500">
                  Duração: {block?.settings?.duration / 1000}s
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
                  {block?.settings?.styleName || 'Seu Estilo'}
                </h2>
                <div className="flex justify-center items-center gap-4 mb-4">
                  <div className="text-2xl font-semibold text-[#B89B7A]">
                    {block?.settings?.percentMatch || 92}% de compatibilidade
                  </div>
                </div>
              </div>
              
              {block?.settings?.styleImage && (
                <div className="mb-6">
                  <img
                    src={block?.settings?.styleImage}
                    alt={block?.settings?.styleName || 'Estilo'}
                    className="w-full max-w-md mx-auto rounded-xl shadow-lg"
                  />
                </div>
              )}
              
              <p className="text-lg text-[#6B5B73] leading-relaxed">
                {block?.settings?.styleDescription || 'Descrição do seu estilo personalizado baseado nas suas respostas.'}
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
                  {block?.settings?.title || 'Oferta Especial'}
                </h3>
                <p className="text-xl mb-6 opacity-90">
                  {block?.settings?.subtitle || 'Não perca esta oportunidade'}
                </p>
                
                <div className="flex justify-center items-center gap-4 mb-6">
                  {block?.settings?.originalPrice && (
                    <span className="text-xl line-through opacity-75">
                      {block?.settings?.originalPrice}
                    </span>
                  )}
                  <span className="text-5xl font-bold">
                    {block?.settings?.currentPrice || 'R$ 97,00'}
                  </span>
                  {block?.settings?.discount && (
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                      {block?.settings?.discount}
                    </span>
                  )}
                </div>
                
                {block?.settings?.urgency && (
                  <p className="text-lg mb-6 opacity-90 font-semibold">
                    {block?.settings?.urgency}
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
                {(block?.settings?.testimonials || [
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
                ]).map((testimonial: any, index: number) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-[#432818]">{testimonial.author}</h4>
                        <p className="text-sm text-[#6B5B73]">{testimonial.role}</p>
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
                  {block?.settings?.title || 'Garantia de Satisfação'}
                </h4>
                
                <p className="text-green-700 text-lg mb-6">
                  {block?.settings?.description || 'Sua satisfação é garantida'}
                </p>
                
                {block?.settings?.features && (
                  <div className="space-y-3">
                    {block?.settings?.features.map((feature: string, index: number) => (
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
                  {block?.settings?.question || 'Pergunta estratégica sobre seus objetivos'}
                </h3>
              </div>
              
              <div className="space-y-3">
                {(block?.settings?.options || [
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
                {block?.settings?.label || 'Email'}
                {block?.settings?.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              <Input
                type="email"
                placeholder={block?.settings?.placeholder || 'seu@email.com'}
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
                {block?.settings?.label || 'Telefone'}
                {block?.settings?.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              <Input
                type="tel"
                placeholder={block?.settings?.placeholder || '(11) 99999-9999'}
                className="w-full h-12 text-base border-2 border-[#B89B7A]/30 focus:border-[#B89B7A] rounded-xl bg-white focus:ring-2 focus:ring-[#B89B7A]/20"
              />
            </div>
          </div>
        );
        break;

      case 'transition-text':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-8 text-center">
            <div className="max-w-2xl mx-auto space-y-4">
              <h3 className="text-2xl font-bold text-[#432818]">
                {block?.settings?.title || 'Processando suas respostas...'}
              </h3>
              <p className="text-lg text-[#6B5B73] leading-relaxed">
                {block?.settings?.description || 'Aguarde enquanto calculamos seu perfil personalizado.'}
              </p>
              {block?.settings?.showProgress && (
                <div className="w-full bg-gray-200 rounded-full h-2 max-w-md mx-auto">
                  <div 
                    className="bg-[#B89B7A] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${block?.settings?.progressValue || 75}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        );
        break;

      case 'quiz-intro-section':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-12 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-[#432818] font-playfair">
                  {block?.settings?.title || 'Descubra Seu Estilo Único'}
                </h1>
                <p className="text-xl text-[#6B5B73] leading-relaxed">
                  {block?.settings?.subtitle || 'Um quiz personalizado para transformar seu guarda-roupa'}
                </p>
              </div>
              
              {block?.settings?.showBenefits && (
                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#B89B7A] rounded-full flex items-center justify-center mx-auto mb-3">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-[#432818] mb-2">Personalizado</h3>
                    <p className="text-sm text-[#6B5B73]">Resultado único para você</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#B89B7A] rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-[#432818] mb-2">Rápido</h3>
                    <p className="text-sm text-[#6B5B73]">Apenas 3 minutos</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#B89B7A] rounded-full flex items-center justify-center mx-auto mb-3">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-[#432818] mb-2">Gratuito</h3>
                    <p className="text-sm text-[#6B5B73]">100% sem custo</p>
                  </div>
                </div>
              )}
              
              <Button className="bg-[#B89B7A] hover:bg-[#A1835D] text-white px-12 py-4 text-lg rounded-full font-semibold transform hover:scale-105 transition-all">
                {block?.settings?.ctaText || 'Começar Quiz Agora'}
              </Button>
              
              {block?.settings?.showTrust && (
                <div className="flex items-center justify-center gap-2 text-sm text-[#6B5B73] mt-4">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Mais de 10.000 mulheres já fizeram o quiz</span>
                </div>
              )}
            </div>
          </div>
        );
        break;

      case 'quiz-progress-bar':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-4">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#432818]">
                  Progresso do Quiz
                </span>
                <span className="text-sm text-[#6B5B73]">
                  {block?.settings?.currentStep || 3} de {block?.settings?.totalSteps || 7}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-[#B89B7A] to-[#A1835D] h-3 rounded-full transition-all duration-500 relative"
                  style={{ width: `${block?.settings?.progressPercent || 43}%` }}
                >
                  <div className="absolute right-0 top-0 w-3 h-3 bg-white border-2 border-[#B89B7A] rounded-full transform translate-x-1/2"></div>
                </div>
              </div>
              {block?.settings?.showStepName && (
                <div className="text-center mt-2 text-sm text-[#6B5B73]">
                  {block?.settings?.stepName || 'Definindo seu perfil'}
                </div>
              )}
            </div>
          </div>
        );
        break;

      case 'quiz-navigation-controls':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6">
            <div className="flex justify-between items-center max-w-2xl mx-auto">
              <Button 
                variant="outline" 
                className="border-[#B89B7A] text-[#B89B7A] hover:bg-[#B89B7A] hover:text-white px-6 py-3 rounded-full"
                disabled={block?.settings?.hideBackButton}
              >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                {block?.settings?.backButtonText || 'Voltar'}
              </Button>
              
              <div className="text-center">
                <span className="text-sm text-[#6B5B73]">
                  Questão {block?.settings?.currentQuestion || 3} de {block?.settings?.totalQuestions || 7}
                </span>
              </div>
              
              <Button 
                className="bg-[#B89B7A] hover:bg-[#A1835D] text-white px-6 py-3 rounded-full"
                disabled={block?.settings?.hideNextButton}
              >
                {block?.settings?.nextButtonText || 'Próxima'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );
        break;

      case 'quiz-transition-page':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-16 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="w-20 h-20 bg-gradient-to-r from-[#B89B7A] to-[#A1835D] rounded-full flex items-center justify-center mx-auto">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-[#432818]">
                {block?.settings?.title || 'Ótimo Progresso!'}
              </h2>
              
              <p className="text-lg text-[#6B5B73] leading-relaxed">
                {block?.settings?.description || 'Você está indo muito bem. Vamos continuar descobrindo seu estilo único.'}
              </p>
              
              {block?.settings?.showProgress && (
                <div className="w-full bg-gray-200 rounded-full h-2 max-w-md mx-auto">
                  <div 
                    className="bg-[#B89B7A] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${block?.settings?.progressValue || 60}%` }}
                  ></div>
                </div>
              )}
              
              <Button className="bg-[#B89B7A] hover:bg-[#A1835D] text-white px-8 py-3 rounded-full font-semibold mt-6">
                {block?.settings?.ctaText || 'Continuar Quiz'}
              </Button>
            </div>
          </div>
        );
        break;

      case 'quiz-final-transition':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-20 text-center">
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="relative">
                <div className="w-24 h-24 border-4 border-[#B89B7A] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-r-[#6B5B73] rounded-full animate-ping mx-auto"></div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-[#432818]">
                  {block?.settings?.title || 'Processando Suas Respostas...'}
                </h2>
                
                <p className="text-lg text-[#6B5B73]">
                  {block?.settings?.description || 'Estamos analisando suas preferências para criar seu perfil único de estilo.'}
                </p>
              </div>
              
              {block?.settings?.showSteps && (
                <div className="space-y-3 max-w-md mx-auto">
                  <div className="flex items-center text-left">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-[#432818]">Analisando suas cores favoritas</span>
                  </div>
                  <div className="flex items-center text-left">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-[#432818]">Identificando seu estilo de vida</span>
                  </div>
                  <div className="flex items-center text-left">
                    <RotateCcw className="w-5 h-5 text-[#B89B7A] mr-3 flex-shrink-0 animate-spin" />
                    <span className="text-sm text-[#6B5B73]">Criando seu perfil personalizado</span>
                  </div>
                </div>
              )}
              
              <div className="text-sm text-[#6B5B73] italic">
                {block?.settings?.waitMessage || 'Isso levará apenas alguns segundos...'}
              </div>
            </div>
          </div>
        );
        break;

      // COMPONENTES REAIS - RESULTPAGE.TSX
      case 'header-component-real':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-4">
            <div className="bg-white border-b border-gray-100 py-4">
              <div className="container mx-auto px-4 flex items-center justify-between">
                <img 
                  src={block?.settings?.props?.logo || 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp'} 
                  alt={block?.settings?.props?.logoAlt || 'Logo'} 
                  className="h-12 object-contain"
                />
                <div className="text-sm text-gray-600">
                  Olá, {block?.settings?.props?.userName || 'Usuária'}! 👋
                </div>
              </div>
            </div>
          </div>
        );
        break;

      case 'card-component-real':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-4">
            <div className={block?.settings?.className || "p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20 rounded-lg"}>
              <div className="text-center mb-8">
                <div className="max-w-md mx-auto mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[#8F7A6A]">Seu estilo predominante</span>
                    <span className="text-[#aa6b5d] font-medium">92%</span>
                  </div>
                  <div className="w-full bg-[#F3E8E6] rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <p className="text-[#432818] leading-relaxed">
                    Descoberta de estilo personalizada baseada nas suas respostas do quiz.
                  </p>
                </div>
                <div className="max-w-[238px] mx-auto relative">
                  <img 
                    src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp" 
                    alt="Estilo" 
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        );
        break;

      case 'secondary-styles-component-real':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B89B7A]/10">
              <h3 className="text-lg font-medium text-[#432818] mb-2">Estilos que Também Influenciam Você</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#432818]">Estilo Secundário 1</span>
                  <span className="text-[#aa6b5d] font-medium">25%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#432818]">Estilo Secundário 2</span>
                  <span className="text-[#aa6b5d] font-medium">18%</span>
                </div>
              </div>
            </div>
          </div>
        );
        break;

      case 'before-after-component-real':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6">
            <div className="bg-gradient-to-r from-[#f9f4ef] to-[#fff7f3] p-6 rounded-lg border border-[#B89B7A]/10">
              <h3 className="text-xl font-medium text-[#aa6b5d] text-center mb-4">Transformação de Estilo</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <h4 className="font-medium text-[#432818] mb-2">Antes</h4>
                  <p className="text-sm text-[#6B5B73]">Guarda-roupa confuso, sem identidade</p>
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-[#432818] mb-2">Depois</h4>
                  <p className="text-sm text-[#6B5B73]">Estilo autêntico e poderoso</p>
                </div>
              </div>
            </div>
          </div>
        );
        break;

      case 'motivation-component-real':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6">
            <div className="text-center bg-[#f9f4ef] p-6 rounded-lg">
              <h3 className="text-xl font-medium text-[#aa6b5d] mb-4">Sua Jornada de Transformação</h3>
              <p className="text-[#432818] mb-4">
                Agora que você descobriu seu estilo, está na hora de aplicá-lo na prática.
              </p>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-[#432818]">Resultado personalizado entregue</span>
              </div>
            </div>
          </div>
        );
        break;

      case 'bonus-component-real':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-lg">
              <div className="flex items-center mb-3">
                <Gift className="w-6 h-6 mr-2" />
                <span className="font-bold text-lg">BÔNUS EXCLUSIVOS</span>
              </div>
              <h4 className="font-bold text-xl mb-2">Materiais Complementares</h4>
              <ul className="text-sm space-y-1">
                <li>• Guia de Peças-Chave do seu Estilo</li>
                <li>• Manual de Visagismo Facial</li>
                <li>• Planner de Looks</li>
              </ul>
            </div>
          </div>
        );
        break;

      case 'testimonials-component-real':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-[#432818] text-center mb-6">O que as mulheres estão dizendo</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex mb-3">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-[#432818] italic mb-2">
                    "Finalmente descobri meu estilo! Mudou completamente minha relação com a moda."
                  </p>
                  <p className="text-xs text-gray-600">- Ana Carolina</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex mb-3">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-[#432818] italic mb-2">
                    "Agora tudo no meu guarda-roupa combina. É incrível!"
                  </p>
                  <p className="text-xs text-gray-600">- Patricia Santos</p>
                </div>
              </div>
            </div>
          </div>
        );
        break;

      case 'button-component-real':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="text-center py-4">
            <button 
              className={block?.settings?.className || "text-white py-4 px-6 rounded-md shadow-md transition-colors"}
              style={block?.settings?.style || {
                background: 'linear-gradient(to right, #4CAF50, #45a049)',
                boxShadow: '0 4px 14px rgba(76, 175, 80, 0.4)'
              }}
            >
              {block?.settings?.children || 'Botão de Ação'}
            </button>
          </div>
        );
        break;

      case 'secure-purchase-component-real':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-4">
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Lock className="w-4 h-4 text-green-600" />
                <span>Compra 100% Segura</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-green-600" />
                <span>SSL Criptografado</span>
              </div>
            </div>
          </div>
        );
        break;

      case 'guarantee-component-real':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Garantia de 7 Dias</h3>
              <p className="text-sm text-green-700">
                Se não ficar satisfeita, devolvemos 100% do seu dinheiro. Sem perguntas.
              </p>
            </div>
          </div>
        );
        break;

      case 'mentor-component-real':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#B89B7A]/20">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp" 
                  alt="Gisele Galvão" 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-[#432818]">Gisele Galvão</h3>
                  <p className="text-sm text-[#6B5B73]">Consultora de Imagem</p>
                </div>
              </div>
              <p className="text-[#432818] text-sm">
                "Minha missão é ajudar mulheres a descobrirem seu estilo autêntico e se vestirem com confiança."
              </p>
            </div>
          </div>
        );
        break;

      case 'vista-se-section-real':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-8">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-4">
                {block?.settings?.title || 'Vista-se de Você — na Prática'}
              </h2>
              <div className="elegant-divider mb-6"></div>
              <p className="text-[#432818] mb-6 max-w-xl mx-auto">
                {block?.settings?.description || 'Agora que você conhece seu estilo, é hora de aplicá-lo com clareza e intenção.'}
              </p>
              <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] p-6 rounded-lg mb-6 border border-[#B89B7A]/10">
                <h3 className="text-xl font-medium text-[#aa6b5d] mb-4">O Guia de Estilo e Imagem + Bônus Exclusivos</h3>
                <ul className="space-y-3 text-left max-w-xl mx-auto text-[#432818]">
                  {(block?.settings?.benefits || []).map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#B89B7A] mr-2 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
        break;

      case 'value-stack-component-real':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6">
            <div className={block?.settings?.className || "bg-white p-6 rounded-lg shadow-md border border-[#B89B7A]/20 max-w-md mx-auto"}>
              <h3 className="text-xl font-medium text-center text-[#aa6b5d] mb-4">
                {block?.settings?.title || 'O Que Você Recebe Hoje'}
              </h3>
              <div className="space-y-3 mb-6">
                {(block?.settings?.items || []).map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-2 border-b border-[#B89B7A]/10">
                    <span>{item.name}</span>
                    <span className="font-medium">{item.price}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center p-2 pt-3 font-bold">
                  <span>Valor Total</span>
                  <div className="relative">
                    <span>{block?.settings?.totalValue || 'R$ 175,00'}</span>
                    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#ff5a5a] transform -translate-y-1/2 -rotate-3"></div>
                  </div>
                </div>
              </div>
              <div className="text-center p-4 bg-[#f9f4ef] rounded-lg">
                <p className="text-sm text-[#aa6b5d] uppercase font-medium">Hoje por apenas</p>
                <p className="text-4xl font-bold text-[#B89B7A]">{block?.settings?.currentPrice || 'R$ 39,00'}</p>
                <p className="text-xs text-[#3a3a3a]/60 mt-1">{block?.settings?.paymentInfo || 'Pagamento único'}</p>
              </div>
            </div>
          </div>
        );
        break;

      // COMPONENTES REAIS - QUIZOFFERPAGE.TSX
      case 'custom-styles-component-real':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-2">
            <div className="bg-gray-100 border border-dashed border-gray-300 p-3 rounded text-center text-sm text-gray-600">
              🎨 Estilos CSS Customizados da Página (Injetados no &lt;head&gt;)
            </div>
          </div>
        );
        break;

      case 'fixed-intro-image-component-real':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-4 text-center">
            <img
              src={block?.settings?.props?.src || 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp'}
              alt={block?.settings?.props?.alt || 'Imagem'}
              width={block?.settings?.props?.width || 200}
              height={block?.settings?.props?.height || 80}
              className="mx-auto h-auto object-contain"
            />
          </div>
        );
        break;

      case 'section-title-component-real':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6 text-center">
            <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200 mb-6">
              <Award className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-700">3000+ mulheres transformadas</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#432818] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              {block?.settings?.title || 'Descubra Seu Estilo Predominante'}
            </h1>
            <p className="text-lg text-[#6B5B73] max-w-2xl mx-auto">
              {block?.settings?.subtitle || 'Tenha finalmente um guarda-roupa que funciona 100%'}
            </p>
          </div>
        );
        break;

      case 'offer-button-component-real':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="text-center py-4">
            <button className={block?.settings?.className || "btn-primary-clean"}>
              <ArrowRight className="w-5 h-5" />
              {block?.settings?.children || 'Descobrir Meu Estilo Agora'}
            </button>
          </div>
        );
        break;

      case 'problem-section-component-real':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-[#432818] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {block?.settings?.title || 'Você se identifica com isso?'}
                </h2>
                <div className="space-y-4 text-[#6B5B73]">
                  {(block?.settings?.problems || []).map((problem: string, index: number) => (
                    <p key={index}>
                      <strong>{problem}</strong>
                    </p>
                  ))}
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400 mt-6">
                  <p className="text-[#432818] font-semibold">
                    {block?.settings?.insight || 'Isso acontece porque você ainda não descobriu seu estilo predominante.'}
                  </p>
                </div>
              </div>
              <div>
                <img 
                  src="https://via.placeholder.com/500x350?text=Problema" 
                  alt="Frustração com guarda-roupa" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        );
        break;

      case 'solution-section-component-real':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6 text-center">
            <h2 className="text-2xl font-bold text-[#432818] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              {block?.settings?.title || 'A Solução: Quiz de Estilo'}
            </h2>
            <p className="text-lg text-[#6B5B73] mb-8 max-w-2xl mx-auto">
              {block?.settings?.subtitle || 'Método preciso para identificar seu estilo entre os 7 estilos universais + guia personalizado completo.'}
            </p>
          </div>
        );
        break;

      case 'countdown-timer-component-real':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6 text-center">
            <div className="flex flex-col items-center">
              <p className="text-[#432818] font-semibold mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-1 text-[#B89B7A]" />
                Esta oferta expira em:
              </p>
              <div className="flex items-center justify-center gap-1">
                <div className="bg-[#432818] text-white px-3 py-2 rounded-md text-lg font-mono font-bold shadow-sm">01</div>
                <span className="text-[#B89B7A] font-bold text-xl">:</span>
                <div className="bg-[#432818] text-white px-3 py-2 rounded-md text-lg font-mono font-bold shadow-sm">59</div>
                <span className="text-[#B89B7A] font-bold text-xl">:</span>
                <div className="bg-[#432818] text-white px-3 py-2 rounded-md text-lg font-mono font-bold shadow-sm">42</div>
              </div>
            </div>
          </div>
        );
        break;

      case 'guides-benefits-section-real':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6 text-center">
            <h2 className="text-2xl font-bold text-[#432818] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              {block?.settings?.title || 'Transformação Completa'}
            </h2>
            <p className="text-lg text-[#6B5B73] mb-8">
              {block?.settings?.subtitle || 'Tudo que você precisa para descobrir e aplicar seu estilo'}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="aspect-[4/5] bg-white rounded-lg mb-3 flex items-center justify-center overflow-hidden shadow-sm border border-gray-100">
                  <img 
                    src="https://via.placeholder.com/250x312?text=Guia+Principal" 
                    alt="Guia Principal" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#432818] mb-2">Guia Principal</h3>
                <p className="text-sm text-[#6B5B73]">Descoberta completa do seu estilo</p>
              </div>
              <div className="text-center">
                <div className="aspect-[4/5] bg-white rounded-lg mb-3 flex items-center justify-center overflow-hidden shadow-sm border border-gray-100">
                  <img 
                    src="https://via.placeholder.com/250x312?text=Bônus+Peças" 
                    alt="Bônus Peças-Chave" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#432818] mb-2">Bônus: Peças-Chave</h3>
                <p className="text-sm text-[#6B5B73]">Guarda-roupa funcional</p>
              </div>
              <div className="text-center">
                <div className="aspect-[4/5] bg-white rounded-lg mb-3 flex items-center justify-center overflow-hidden shadow-sm border border-gray-100">
                  <img 
                    src="https://via.placeholder.com/250x312?text=Bônus+Visagismo" 
                    alt="Bônus Visagismo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#432818] mb-2">Bônus: Visagismo</h3>
                <p className="text-sm text-[#6B5B73]">Valorize seus traços</p>
              </div>
            </div>
          </div>
        );
        break;

      case 'pricing-section-component-real':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6">
            <div className={block?.settings?.className || "bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white text-center"}>
              <p className="text-sm opacity-90 mb-2">{block?.settings?.title || 'Oferta por tempo limitado'}</p>
              <div className="mb-4">
                <span className="text-sm">5x de</span>
                <span className="text-4xl font-bold mx-2">{block?.settings?.installments || 'R$ 8,83'}</span>
              </div>
              <p className="text-lg">ou à vista <strong>{block?.settings?.fullPrice || 'R$ 39,90'}</strong></p>
              <p className="text-sm mt-2 opacity-75">{block?.settings?.savings || '77% OFF - Economia de R$ 135,10'}</p>
            </div>
          </div>
        );
        break;

      case 'faq-section-component-real':
        content = (
          <div style={baseStyle} onClick={handleBlockClick} className="py-6">
            <h2 className="text-2xl font-bold text-[#432818] text-center mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
              Perguntas Frequentes
            </h2>
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-[#432818] mb-2">Como funciona o quiz?</h4>
                <p className="text-gray-700 text-sm">É muito simples! Você responde algumas perguntas sobre suas preferências e recebe seu resultado personalizado.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-[#432818] mb-2">Quanto tempo demora?</h4>
                <p className="text-gray-700 text-sm">O quiz leva apenas 5 minutos para ser concluído.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-[#432818] mb-2">O material é digital?</h4>
                <p className="text-gray-700 text-sm">Sim, você recebe tudo por email imediatamente após a compra.</p>
              </div>
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
    <>
      {/* CSS customizado para melhorar as barras de rolagem */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
          .sidebar-shadow-top::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 8px;
            background: linear-gradient(to bottom, rgba(0,0,0,0.05), transparent);
            pointer-events: none;
            z-index: 5;
          }
          .sidebar-shadow-bottom::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 8px;
            background: linear-gradient(to top, rgba(0,0,0,0.05), transparent);
            pointer-events: none;
            z-index: 5;
          }
        `}
      </style>
      
      <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* SIDEBAR ESQUERDA */}
      <div 
        className="bg-white border-r shadow-lg flex flex-col transition-all duration-200 ease-in-out"
        style={{ 
          width: `${leftWidth}px`, 
          minWidth: '200px', 
          maxWidth: '600px',
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'funnel' | 'blocks' | 'templates' | 'settings')} className="flex-1 flex flex-col h-full">
          <TabsList className="grid w-full grid-cols-4 m-2 flex-shrink-0">
            <TabsTrigger value="funnel" className="text-xs">Funil</TabsTrigger>
            <TabsTrigger value="blocks" className="text-xs">Blocos</TabsTrigger>
            <TabsTrigger value="templates" className="text-xs">Templates</TabsTrigger>
            <TabsTrigger value="settings" className="text-xs">Config</TabsTrigger>
          </TabsList>

          <TabsContent value="funnel" className="flex-1 p-2 overflow-hidden relative" style={{ height: 'calc(100vh - 120px)' }}>
            <ScrollArea className="h-full custom-scrollbar">
              <div className="space-y-2 pr-3">
                <div className="flex items-center justify-between mb-3 sticky top-0 bg-white z-10 pb-2">
                  <h3 className="text-sm font-medium">Páginas do Funil</h3>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => addNewPage()}
                    className="h-6 text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Nova
                  </Button>
                </div>
                <div className="space-y-2">
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
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{page?.name || `Página ${index + 1}`}</p>
                          <p className="text-xs text-gray-500">{page?.blocks?.length || 0} blocos</p>
                        </div>
                        <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                          {index + 1}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="blocks" className="flex-1 p-2 overflow-hidden relative" style={{ height: 'calc(100vh - 120px)' }}>
            <ScrollArea className="h-full custom-scrollbar">
              <div className="space-y-3 pr-3">
                <h3 className="text-sm font-medium mb-3 sticky top-0 bg-white z-10 pb-2">Biblioteca de Blocos</h3>
                
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
                              <div className="text-gray-600">{block?.icon}</div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{block?.name || 'Bloco'}</p>
                                <p className="text-xs text-gray-500">{block?.description || 'Sem descrição'}</p>
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

          <TabsContent value="templates" className="flex-1 p-2 overflow-hidden" style={{ height: 'calc(100vh - 120px)' }}>
            <ScrollArea className="h-full custom-scrollbar">
              <div className="space-y-3 pr-3">
                <h3 className="text-sm font-medium mb-3">Templates de Página</h3>
                
                {pageTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="group p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors hover:shadow-sm"
                    onClick={() => {
                      // Aplicar template à página atual
                      if (currentPage) {
                        const newBlocks = template.blocks.map((block, index) => ({
                          ...block,
                          id: `${block.type}-${Date.now()}-${index}`,
                          order: index + 1
                        }));
                        
                        setFunnel(prev => ({
                          ...prev,
                          pages: prev.pages.map(page => 
                            page.id === currentPageId 
                              ? { ...page, blocks: newBlocks }
                              : page
                          )
                        }));

                        // Notificação de sucesso
                        toast({
                          title: "Template aplicado!",
                          description: `Template "${template.name}" foi aplicado à página atual.`,
                          variant: "default",
                        });
                      }
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-[#B89B7A] rounded flex items-center justify-center text-white text-xs font-bold">
                        {template?.name?.charAt(0) || 'T'}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{template?.name || 'Template'}</p>
                        <p className="text-xs text-gray-500 mb-1">{template?.description || 'Sem descrição'}</p>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="text-xs">
                            {template.type}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {template.blocks.length} blocos
                          </Badge>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="outline" className="h-6 text-xs">
                          Aplicar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Como usar</h4>
                  <p className="text-xs text-blue-700">
                    Clique em um template para aplicá-lo à página atual. Os blocos existentes serão substituídos pelos do template.
                  </p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="settings" className="flex-1 p-2 overflow-hidden" style={{ height: 'calc(100vh - 120px)' }}>
            <ScrollArea className="h-full custom-scrollbar">
              <div className="space-y-4 pr-3">
                <h3 className="text-sm font-medium mb-3">Configurações do Funil</h3>
                
                <div>
                  <Label className="text-xs">Nome do Funil</Label>
                  <Input
                    value={funnel?.config?.name || ''}
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
                    value={funnel?.config?.description || ''}
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
                    checked={funnel?.config?.isPublished || false}
                    onCheckedChange={(checked) => setFunnel(prev => ({
                      ...prev,
                      config: { ...prev.config, isPublished: checked }
                    }))}
                  />
                  <Label className="text-xs">Funil Publicado</Label>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-3">Configurações Avançadas</h4>
                  
                  <div>
                    <Label className="text-xs">Tema</Label>
                    <select 
                      value={funnel?.config?.theme || 'default'}
                      onChange={(e) => setFunnel(prev => ({
                        ...prev,
                        config: { ...prev.config, theme: e.target.value }
                      }))}
                      className="w-full h-8 text-sm border border-gray-300 rounded mt-1 px-2"
                    >
                      <option value="caktoquiz">CaktoQuiz</option>
                      <option value="minimal">Minimal</option>
                      <option value="elegant">Elegante</option>
                    </select>
                  </div>

                  <div className="mt-3">
                    <Label className="text-xs">Versão A/B Testing</Label>
                    <div className="flex gap-2 mt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          // Implementar lógica A/B testing
                          toast({
                            title: "A/B Testing",
                            description: "Funcionalidade em desenvolvimento",
                            variant: "default",
                          });
                        }}
                        className="flex-1 h-8 text-xs"
                      >
                        Versão A
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          // Implementar lógica A/B testing
                          toast({
                            title: "A/B Testing",
                            description: "Funcionalidade em desenvolvimento",
                            variant: "default",
                          });
                        }}
                        className="flex-1 h-8 text-xs"
                      >
                        Versão B
                      </Button>
                    </div>
                  </div>

                  <div className="mt-3">
                    <Label className="text-xs">Analytics</Label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div className="bg-gray-50 p-2 rounded text-center">
                        <div className="text-lg font-bold text-gray-800">0</div>
                        <div className="text-xs text-gray-600">Visualizações</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded text-center">
                        <div className="text-lg font-bold text-gray-800">0%</div>
                        <div className="text-xs text-gray-600">Conversão</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* DIVISOR REDIMENSIONÁVEL ESQUERDO */}
      <div
        className={`w-1 bg-gray-200 hover:bg-blue-300 cursor-col-resize flex items-center justify-center transition-all duration-200 group relative ${
          isResizingLeft ? 'bg-blue-400 w-2' : ''
        }`}
        onMouseDown={startResizeLeft}
        title="Arraste para redimensionar a sidebar esquerda"
      >
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <GripVertical className="h-4 w-4 text-gray-500 group-hover:text-blue-600" />
        </div>
        {isResizingLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 animate-pulse" />
        )}
      </div>

      {/* CANVAS PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0">
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
              {/* Layout info */}
              {(isResizingLeft || isResizingRight) && (
                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {Math.round(leftWidth)}px | Canvas | {Math.round(rightWidth)}px
                </div>
              )}
              
              {isAutoSaving && (
                <div className="flex items-center text-xs text-gray-500">
                  <RotateCcw className="h-3 w-3 animate-spin mr-1" />
                  Salvando...
                </div>
              )}
              
              <Button 
                size="sm" 
                variant="outline" 
                className="h-8" 
                onClick={loadSavedFunnel}
                disabled={isLoading}
              >
                <Download className="h-3 w-3 mr-1" />
                {isLoading ? 'Carregando...' : 'Carregar'}
              </Button>
              
              <Button 
                size="sm" 
                className="h-8 bg-[#B89B7A] hover:bg-[#A1835D]" 
                onClick={saveFunnel}
                disabled={isSaving}
              >
                <Save className="h-3 w-3 mr-1" />
                {isSaving ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-gray-50 overflow-auto">
          <ScrollArea className="h-full">
            <div className="p-6">
              <div className={`mx-auto bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
                deviceView === 'mobile' ? 'max-w-sm' :
                deviceView === 'tablet' ? 'max-w-2xl' :
                'max-w-4xl'
              }`}>
            {/* Header da página com progress bar */}
            {currentPage && currentPage.settings?.showProgress && (
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
                          transform: `translateX(-${100 - (currentPage.settings?.progressValue || 0)}%)` 
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
                backgroundColor: currentPage?.settings?.backgroundColor || '#ffffff',
                color: currentPage?.settings?.textColor || '#432818'
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
                            .sort((a, b) => (a?.order || 0) - (b?.order || 0))
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
        </ScrollArea>
      </div>
      </div>

      {/* DIVISOR REDIMENSIONÁVEL DIREITO */}
      <div
        className={`w-1 bg-gray-200 hover:bg-blue-300 cursor-col-resize flex items-center justify-center transition-all duration-200 group relative ${
          isResizingRight ? 'bg-blue-400 w-2' : ''
        }`}
        onMouseDown={startResizeRight}
        title="Arraste para redimensionar a sidebar direita"
      >
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <GripVertical className="h-4 w-4 text-gray-500 group-hover:text-blue-600" />
        </div>
        {isResizingRight && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 animate-pulse" />
        )}
      </div>

      {/* SIDEBAR DIREITA: Propriedades */}
      <div 
        className="border-l bg-white flex flex-col transition-all duration-200 ease-in-out"
        style={{ width: `${rightWidth}px`, minWidth: '200px', maxWidth: '600px' }}
      >
        <div className="h-14 border-b flex items-center px-4">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="font-medium text-sm">Propriedades</span>
          </div>
        </div>
        
        <div className="flex-1 p-4 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="pr-2">
            {selectedBlock ? (
              <div className="space-y-4">
                {/* Cabeçalho do bloco */}
                <div className="pb-4 border-b">
                  <h3 className="font-medium text-sm mb-2">
                    {blockLibrary.find(b => b.type === selectedBlock?.type)?.name || selectedBlock?.type || 'Bloco Desconhecido'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {blockLibrary.find(b => b.type === selectedBlock?.type)?.description || 'Bloco personalizado'}
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
                          order: (selectedBlock?.order || 0) + 1
                        };
                        
                        setFunnel(prev => ({
                          ...prev,
                          pages: prev.pages.map(page => 
                            page.id === currentPageId 
                              ? { 
                                  ...page, 
                                  blocks: [
                                    ...page.blocks.map(b => 
                                      (b?.order || 0) > (selectedBlock?.order || 0)
                                        ? { ...b, order: (b?.order || 0) + 1 }
                                        : b
                                    ),
                                    newBlock
                                  ].sort((a, b) => (a?.order || 0) - (b?.order || 0))
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
                {selectedBlock && selectedBlock.settings && (
                  <>
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
                        value={selectedBlock?.settings?.alt || ''}
                        onChange={(e) => updateBlockSetting('alt', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="Descrição da imagem"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Largura</Label>
                      <Input
                        value={selectedBlock?.settings?.width || '100%'}
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

                {selectedBlock.type === 'loading-animation' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">Mensagem</Label>
                      <Input
                        value={selectedBlock.settings.message || ''}
                        onChange={(e) => updateBlockSetting('message', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="Processando suas respostas..."
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Tipo de Animação</Label>
                      <select 
                        value={selectedBlock.settings.type || 'spinning'}
                        onChange={(e) => updateBlockSetting('type', e.target.value)}
                        className="w-full h-8 text-sm border border-gray-300 rounded mt-1 px-2"
                      >
                        <option value="spinning">Girando</option>
                        <option value="elegant">Elegante</option>
                        <option value="dots">Pontos</option>
                        <option value="bars">Barras</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label className="text-xs">Duração (ms)</Label>
                      <Input
                        type="number"
                        value={selectedBlock.settings.duration || 4000}
                        onChange={(e) => updateBlockSetting('duration', parseInt(e.target.value))}
                        className="text-sm h-8 mt-1"
                        placeholder="4000"
                      />
                    </div>
                  </div>
                )}

                {selectedBlock.type === 'style-result-display' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">Nome do Estilo</Label>
                      <Input
                        value={selectedBlock.settings.styleName || ''}
                        onChange={(e) => updateBlockSetting('styleName', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="Elegante Clássica"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">URL da Imagem do Estilo</Label>
                      <Input
                        value={selectedBlock.settings.styleImage || ''}
                        onChange={(e) => updateBlockSetting('styleImage', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="https://exemplo.com/estilo.jpg"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Descrição do Estilo</Label>
                      <Textarea
                        value={selectedBlock.settings.styleDescription || ''}
                        onChange={(e) => updateBlockSetting('styleDescription', e.target.value)}
                        className="text-sm resize-none mt-1"
                        rows={4}
                        placeholder="Descrição detalhada do estilo personalizado..."
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Porcentagem de Compatibilidade</Label>
                      <Input
                        type="number"
                        min="1"
                        max="100"
                        value={selectedBlock.settings.percentMatch || 92}
                        onChange={(e) => updateBlockSetting('percentMatch', parseInt(e.target.value))}
                        className="text-sm h-8 mt-1"
                        placeholder="92"
                      />
                    </div>
                  </div>
                )}

                {selectedBlock.type === 'sales-offer' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">Título da Oferta</Label>
                      <Input
                        value={selectedBlock.settings.title || ''}
                        onChange={(e) => updateBlockSetting('title', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="Transforme Seu Guarda-Roupa Hoje!"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Subtítulo</Label>
                      <Input
                        value={selectedBlock.settings.subtitle || ''}
                        onChange={(e) => updateBlockSetting('subtitle', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="Guias Personalizados de Estilo"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
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
                        <Label className="text-xs">Preço Atual</Label>
                        <Input
                          value={selectedBlock.settings.currentPrice || ''}
                          onChange={(e) => updateBlockSetting('currentPrice', e.target.value)}
                          className="text-sm h-8 mt-1"
                          placeholder="R$ 97,00"
                        />
                      </div>
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

                {selectedBlock.type === 'testimonials-grid' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">Depoimentos</Label>
                      <div className="space-y-3 mt-1">
                        {(selectedBlock.settings.testimonials || []).map((testimonial: any, index: number) => (
                          <div key={index} className="border border-gray-200 rounded p-3 space-y-2">
                            <Input
                              value={testimonial.author}
                              onChange={(e) => {
                                const testimonials = [...(selectedBlock.settings.testimonials || [])];
                                testimonials[index] = { ...testimonials[index], author: e.target.value };
                                updateBlockSetting('testimonials', testimonials);
                              }}
                              className="text-sm h-8"
                              placeholder="Nome do cliente"
                            />
                            <Input
                              value={testimonial.role}
                              onChange={(e) => {
                                const testimonials = [...(selectedBlock.settings.testimonials || [])];
                                testimonials[index] = { ...testimonials[index], role: e.target.value };
                                updateBlockSetting('testimonials', testimonials);
                              }}
                              className="text-sm h-8"
                              placeholder="Profissão"
                            />
                            <Textarea
                              value={testimonial.text}
                              onChange={(e) => {
                                const testimonials = [...(selectedBlock.settings.testimonials || [])];
                                testimonials[index] = { ...testimonials[index], text: e.target.value };
                                updateBlockSetting('testimonials', testimonials);
                              }}
                              className="text-sm resize-none"
                              rows={2}
                              placeholder="Texto do depoimento"
                            />
                            <div className="flex gap-2">
                              <Input
                                value={testimonial.avatar}
                                onChange={(e) => {
                                  const testimonials = [...(selectedBlock.settings.testimonials || [])];
                                  testimonials[index] = { ...testimonials[index], avatar: e.target.value };
                                  updateBlockSetting('testimonials', testimonials);
                                }}
                                className="text-sm h-8 flex-1"
                                placeholder="URL do avatar"
                              />
                              <select 
                                value={testimonial.rating || 5}
                                onChange={(e) => {
                                  const testimonials = [...(selectedBlock.settings.testimonials || [])];
                                  testimonials[index] = { ...testimonials[index], rating: parseInt(e.target.value) };
                                  updateBlockSetting('testimonials', testimonials);
                                }}
                                className="h-8 text-sm border border-gray-300 rounded px-2"
                              >
                                <option value="1">1⭐</option>
                                <option value="2">2⭐</option>
                                <option value="3">3⭐</option>
                                <option value="4">4⭐</option>
                                <option value="5">5⭐</option>
                              </select>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const testimonials = [...(selectedBlock.settings.testimonials || [])];
                                testimonials.splice(index, 1);
                                updateBlockSetting('testimonials', testimonials);
                              }}
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
                          onClick={() => {
                            const testimonials = [...(selectedBlock.settings.testimonials || [])];
                            testimonials.push({
                              author: 'Nova Cliente',
                              role: 'Cliente Satisfeita',
                              text: 'Adorei o resultado!',
                              rating: 5,
                              avatar: 'https://via.placeholder.com/60x60?text=👤'
                            });
                            updateBlockSetting('testimonials', testimonials);
                          }}
                          className="w-full h-8"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Adicionar Depoimento
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {selectedBlock.type === 'guarantee-section' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">Título da Garantia</Label>
                      <Input
                        value={selectedBlock.settings.title || ''}
                        onChange={(e) => updateBlockSetting('title', e.target.value)}
                        className="text-sm h-8 mt-1"
                        placeholder="Garantia de Satisfação"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Descrição</Label>
                      <Textarea
                        value={selectedBlock.settings.description || ''}
                        onChange={(e) => updateBlockSetting('description', e.target.value)}
                        className="text-sm resize-none mt-1"
                        rows={3}
                        placeholder="Sua satisfação é garantida..."
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Recursos da Garantia</Label>
                      <div className="space-y-2 mt-1">
                        {(selectedBlock.settings.features || []).map((feature: string, index: number) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={feature}
                              onChange={(e) => {
                                const features = [...(selectedBlock.settings.features || [])];
                                features[index] = e.target.value;
                                updateBlockSetting('features', features);
                              }}
                              className="text-sm h-8 flex-1"
                              placeholder="Recurso da garantia"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const features = [...(selectedBlock.settings.features || [])];
                                features.splice(index, 1);
                                updateBlockSetting('features', features);
                              }}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const features = [...(selectedBlock.settings.features || [])];
                            features.push('Novo recurso');
                            updateBlockSetting('features', features);
                          }}
                          className="w-full h-8"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Adicionar Recurso
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {selectedBlock.type === 'strategic-question' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">Pergunta Estratégica</Label>
                      <Textarea
                        value={selectedBlock.settings.question || ''}
                        onChange={(e) => updateBlockSetting('question', e.target.value)}
                        className="text-sm resize-none mt-1"
                        rows={3}
                        placeholder="Digite a pergunta estratégica"
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
                            <select 
                              value={option.value}
                              onChange={(e) => updateQuestionOption(index, 'value', e.target.value)}
                              className="h-8 text-sm border border-gray-300 rounded px-2"
                            >
                              <option value="high">Alto interesse</option>
                              <option value="medium">Médio interesse</option>
                              <option value="low">Baixo interesse</option>
                            </select>
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
                </>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Settings className="h-8 w-8 mx-auto mb-4 opacity-50" />
                <p className="font-medium mb-2">Nenhum bloco selecionado</p>
                <p className="text-sm">Clique em um bloco para editar suas propriedades</p>
              </div>
            )}
            </div>
          </ScrollArea>
        </div>
      </div>

      <Toaster />
    </div>
    </>
  );
};

export default CaktoQuizAdvancedEditor;