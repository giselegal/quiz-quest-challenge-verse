import type { BlockData } from '@/components/editor/blocks';
import type { SchemaDrivenFunnelData, SchemaDrivenPageData } from '@/services/schemaDrivenFunnelService';
import { REAL_QUIZ_QUESTIONS, STRATEGIC_QUESTIONS, TRANSITIONS } from '@/components/visual-editor/realQuizData';

/**
 * Adapter service to convert real quiz data to schema-driven format
 * This is the critical missing piece for the migration
 */
export class QuizDataAdapter {
  /**
   * Converts real quiz data to schema-driven funnel format
   * with proper block structure for canvas editing
   */
  static createSchemaFunnelFromRealData(): SchemaDrivenFunnelData {
    const now = new Date();
    
    return {
      id: `real-quiz-funnel-${Date.now()}`,
      name: 'Quiz CaktoQuiz - Estilo Pessoal (Dados Reais)',
      description: 'Funil completo com 21 etapas reais convertidas para schema-driven',
      theme: 'caktoquiz',
      isPublished: false,
      pages: this.createAllPages(),
      config: {
        name: 'Quiz CaktoQuiz',
        description: 'Quiz para descoberta do estilo pessoal',
        isPublished: false,
        theme: 'caktoquiz',
        primaryColor: '#B89B7A',
        secondaryColor: '#432818',
        fontFamily: 'Inter, sans-serif',
        analytics: {
          trackingId: 'FB_PIXEL_ID',
          events: ['page_view', 'quiz_start', 'quiz_complete', 'conversion'],
          conversionGoals: ['quiz_completion', 'purchase']
        },
        seo: {
          title: 'Descubra Seu Estilo Pessoal - Quiz CaktoQuiz',
          description: 'Descubra seu estilo pessoal em poucos minutos com nosso quiz especializado.',
          keywords: ['estilo pessoal', 'moda', 'quiz', 'consultoria']
        }
      },
      version: 1,
      lastModified: now,
      createdAt: now
    };
  }

  /**
   * Creates all 21 pages with proper block structure
   */
  private static createAllPages(): SchemaDrivenPageData[] {
    const pages: SchemaDrivenPageData[] = [];

    // ETAPA 1: Introdução (Quiz Start)
    pages.push({
      id: 'page-intro',
      name: 'Introdução',
      title: 'Bem-vindo ao Quiz de Estilo',
      type: 'intro',
      order: 1,
      blocks: [
        {
          id: 'intro-block-1',
          type: 'QuizStartPageBlock',
          properties: {
            title: 'Chega de um guarda-roupa lotado e da sensação de que nada combina com você.',
            subtitle: 'Em poucos minutos, descubra seu Estilo Predominante — e aprenda a montar looks que realmente refletem sua essência, com praticidade e confiança.',
            logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
            imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.webp',
            inputPlaceholder: 'Digite seu nome aqui...',
            buttonText: 'Quero Descobrir meu Estilo Agora!',
            showNameInput: true,
            showBenefits: true,
            benefits: [
              'Descubra seu estilo único',
              'Tenha mais confiança ao se vestir',
              'Economize tempo na escolha de looks'
            ]
          }
        }
      ],
      settings: {
        showProgress: false,
        progressValue: 0,
        backgroundColor: '#ffffff',
        textColor: '#432818',
        maxWidth: 'max-w-4xl'
      }
    });

    // ETAPAS 2-11: Questões principais (10 questões)
    REAL_QUIZ_QUESTIONS.forEach((question, index) => {
      pages.push({
        id: `page-question-${index + 1}`,
        name: `Questão ${index + 1}`,
        title: question.question,
        type: 'question',
        order: index + 2,
        blocks: [
          {
            id: `question-block-${index + 1}`,
            type: 'QuestionMultipleBlock',
            properties: {
              question: question.question,
              options: question.options.map(opt => ({
                id: opt.id,
                text: opt.text,
                value: opt.value,
                imageUrl: (opt as any).imageUrl || undefined,
                category: opt.category
              })),
              multipleSelection: question.multipleSelection || false,
              maxSelections: question.maxSelections || 1,
              showImages: question.type === 'both' || question.type === 'image',
              progressLabel: `Questão ${index + 1} de 10`,
              progressValue: 5 + (index + 1) * 5
            }
          }
        ],
        settings: {
          showProgress: true,
          progressValue: 5 + (index + 1) * 5,
          backgroundColor: '#ffffff',
          textColor: '#432818',
          maxWidth: 'max-w-4xl'
        }
      });
    });

    // ETAPA 12: Transição Principal
    pages.push({
      id: 'page-transition-main',
      name: 'Transição Principal',
      title: 'Agora vamos conhecer você melhor',
      type: 'custom',
      order: 12,
      blocks: [
        {
          id: 'transition-main-block',
          type: 'QuizTransitionBlock',
          properties: {
            title: TRANSITIONS.mainTransition.title,
            message: TRANSITIONS.mainTransition.message,
            progressValue: 60,
            showAnimation: true,
            animationType: 'pulse'
          }
        }
      ],
      settings: {
        showProgress: true,
        progressValue: 60,
        backgroundColor: '#f9f4ef',
        textColor: '#432818',
        maxWidth: 'max-w-4xl'
      }
    });

    // ETAPAS 13-18: Questões estratégicas (6 questões)
    STRATEGIC_QUESTIONS.forEach((question, index) => {
      pages.push({
        id: `page-strategic-${index + 1}`,
        name: `Questão Estratégica ${index + 1}`,
        title: question.question,
        type: 'question',
        order: index + 13,
        blocks: [
          {
            id: `strategic-block-${index + 1}`,
            type: 'StrategicQuestionBlock',
            properties: {
              question: question.question,
              options: question.options.map(opt => ({
                id: opt.id,
                text: opt.text,
                value: opt.value,
                category: opt.category
              })),
              isStrategic: true,
              progressLabel: `Questão estratégica ${index + 1} de 6`,
              progressValue: 65 + (index + 1) * 5
            }
          }
        ],
        settings: {
          showProgress: true,
          progressValue: 65 + (index + 1) * 5,
          backgroundColor: '#ffffff',
          textColor: '#432818',
          maxWidth: 'max-w-4xl'
        }
      });
    });

    // ETAPA 19: Transição Final
    pages.push({
      id: 'page-transition-final',
      name: 'Transição Final',
      title: 'Preparando seu resultado',
      type: 'custom',
      order: 19,
      blocks: [
        {
          id: 'transition-final-block',
          type: 'QuizTransitionBlock',
          properties: {
            title: TRANSITIONS.finalTransition.title,
            message: TRANSITIONS.finalTransition.message,
            progressValue: 95,
            showAnimation: true,
            animationType: 'spin'
          }
        }
      ],
      settings: {
        showProgress: true,
        progressValue: 95,
        backgroundColor: '#f9f4ef',
        textColor: '#432818',
        maxWidth: 'max-w-4xl'
      }
    });

    // ETAPA 20: Página de Resultado
    pages.push({
      id: 'page-result',
      name: 'Resultado',
      title: 'Seu Estilo Predominante',
      type: 'result',
      order: 20,
      blocks: [
        {
          id: 'result-main-block',
          type: 'ResultPageBlock',
          properties: {
            primaryStyle: 'elegante', // Dynamic value
            secondaryStyles: ['natural', 'contemporaneo'],
            showHeader: true,
            showDescription: true,
            showSecondaryStyles: true,
            showTransformation: true,
            showMotivation: true,
            logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
            userName: 'Visitante'
          }
        }
      ],
      settings: {
        showProgress: true,
        progressValue: 100,
        backgroundColor: '#ffffff',
        textColor: '#432818',
        maxWidth: 'max-w-6xl'
      }
    });

    // ETAPA 21: Página de Oferta
    pages.push({
      id: 'page-offer',
      name: 'Oferta',
      title: 'Transforme seu Estilo Agora',
      type: 'offer',
      order: 21,
      blocks: [
        {
          id: 'offer-main-block',
          type: 'QuizOfferPageBlock',
          properties: {
            title: 'Guia Completo do Seu Estilo',
            subtitle: 'Tudo que você precisa para se vestir com confiança',
            price: 'R$ 97,00',
            originalPrice: 'R$ 297,00',
            discount: '67% OFF',
            ctaText: 'Quero Transformar Meu Estilo Agora',
            ctaUrl: 'https://pay.hotmart.com/seu-link-de-pagamento',
            showGuarantee: true,
            guaranteeDays: 7,
            showTestimonials: true,
            showBonus: true,
            showTimer: true,
            timerMinutes: 15
          }
        }
      ],
      settings: {
        showProgress: false,
        progressValue: 100,
        backgroundColor: '#ffffff',
        textColor: '#432818',
        maxWidth: 'max-w-4xl'
      }
    });

    return pages;
  }

  /**
   * Validates if a funnel has the correct structure for canvas editing
   */
  static validateFunnelStructure(funnel: SchemaDrivenFunnelData): boolean {
    // Check if all pages have blocks
    const hasBlocks = funnel.pages.every(page => page.blocks && page.blocks.length > 0);
    
    // Check if all blocks have valid types
    const hasValidBlockTypes = funnel.pages.every(page => 
      page.blocks.every(block => block.type && block.properties)
    );
    
    // Check if we have the expected 21 pages
    const hasCorrectPageCount = funnel.pages.length === 21;
    
    return hasBlocks && hasValidBlockTypes && hasCorrectPageCount;
  }

  /**
   * Repairs a funnel structure if needed
   */
  static repairFunnelStructure(funnel: SchemaDrivenFunnelData): SchemaDrivenFunnelData {
    if (this.validateFunnelStructure(funnel)) {
      return funnel;
    }
    
    // If structure is invalid, create a new one from real data
    console.warn('⚠️ Funnel structure invalid, creating new one from real data');
    return this.createSchemaFunnelFromRealData();
  }
}