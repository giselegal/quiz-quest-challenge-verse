import React from 'react';
import { cn } from '@/lib/utils';
import type { BlockData } from '@/types/blocks';

// === COMPONENTES PRINCIPAIS DO SISTEMA ===
// Componentes de página completa (funcionais)
import ResultPageBlock from './ResultPageBlock';

// Componentes de quiz (funcionais)
import QuizQuestionBlock from './QuizQuestionBlock';
import QuizProgressBlock from './QuizProgressBlock';
import QuestionMultipleBlock from './QuestionMultipleBlock';
import StrategicQuestionBlock from './StrategicQuestionBlock';
import QuizTransitionBlock from './QuizTransitionBlock';
import OptionsGridBlock from './OptionsGridBlock';

// === COMPONENTES INLINE MODULARES (ES7+) ===
// Importação corrigida e otimizada dos componentes inline
import {
  TextInlineBlock,
  StyleCardInlineBlock,
  StatInlineBlock,
  BadgeInlineBlock,
  ProgressInlineBlock,
  ResultCardInlineBlock,
  ImageDisplayInlineBlock,
  PricingCardInlineBlock,
  TestimonialCardInlineBlock,
  // Etapa 20 (Resultado)
  ResultHeaderInlineBlock,
  TestimonialsInlineBlock,
  // Etapa 21 (Oferta)
  QuizOfferPricingInlineBlock,
  CountdownInlineBlock,
  BonusListInlineBlock,
  // Componentes especializados para Quiz
  QuizIntroHeaderBlock,
  LoadingAnimationBlock
} from './inline';

// Componentes básicos (funcionais)
import { SpacerBlock } from './SpacerBlock';
import { VideoPlayerBlock } from './VideoPlayerBlock';
import FormInputBlock from './FormInputBlock';
import ListBlock from './ListBlock';

// Componentes inline básicos e funcionais
import HeadingInlineBlock from './HeadingInlineBlock';
import ImageInlineBlock from './ImageInlineBlock';
import ButtonInlineBlock from './ButtonInlineBlock';
import CTAInlineBlock from './CTAInlineBlock';

// Componentes modernos (funcionais)
import TestimonialsGridBlock from './TestimonialsGridBlock';
import FAQSectionBlock from './FAQSectionBlock';
import GuaranteeBlock from './GuaranteeBlock';

export interface BlockRendererProps {
  block: BlockData;
  isSelected?: boolean;
  onClick?: () => void;
  onSaveInline?: (blockId: string, updates: Partial<BlockData>) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Universal Block Renderer for Schema-Driven Editor (ALL INLINE HORIZONTAL)
 * Renders any block type based on its type property
 * All components are now inline-editable with horizontal flexbox layout
 * Implements responsive, mobile-first design with max 2 columns
 */
export const UniversalBlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isSelected = false,
  onClick,
  onSaveInline,
  disabled = false,
  className
}) => {
  // ES7+ Props comuns padronizados para flexbox inline responsivo
  const commonProps = {
    block,
    isSelected,
    onClick,
    onPropertyChange: (key: string, value: any) => {
      if (onSaveInline) {
        const updatedBlock = {
          ...block,
          properties: { ...block.properties, [key]: value }
        };
        onSaveInline(block.id, updatedBlock);
      }
    },
    disabled,
    className: cn(
      // ES7+ Flexbox container responsivo padronizado
      'flex flex-wrap items-start gap-2 sm:gap-4',
      'w-full min-h-[60px] transition-all duration-300 ease-out',
      // Background e padding responsivos
      'bg-white p-2 sm:p-3 md:p-4 rounded-lg',
      // Estados visuais modernos
      isSelected && 'ring-2 ring-blue-500/50 bg-blue-50/30 shadow-md',
      !disabled && 'hover:bg-gray-50/80 hover:shadow-sm cursor-pointer',
      // Responsividade avançada
      'max-w-full overflow-hidden',
      className
    )
  };

  // TODOS os componentes são agora inline - removido conceito de não-inline
  const isInlineBlock = (blockType: string): boolean => {
    return true; // Todos são inline agora
  };

  // ES7+ Wrapper flexbox responsivo padronizado
  const ResponsiveFlexWrapper: React.FC<{ children: React.ReactNode; blockType: string }> = ({ 
    children, 
    blockType 
  }) => (
    <div className={cn(
      // ES7+ Flexbox container principal
      'flex flex-col sm:flex-row items-start justify-start',
      'w-full min-h-[60px] gap-2 sm:gap-4',
      // Background e espaçamento responsivos
      'bg-gradient-to-r from-white to-gray-50/30',
      'p-3 sm:p-4 md:p-6 rounded-xl',
      // Bordas e sombras modernas
      'border border-gray-100 shadow-sm',
      // Hover states ES7+
      'hover:shadow-md hover:border-gray-200 transition-all duration-300',
      // Responsividade mobile-first
      'max-w-full overflow-hidden'
    )}>
      {/* ES7+ Header opcional com tipografia moderna */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 z-20">
          <span className={cn(
            'inline-flex items-center px-2 py-1',
            'bg-blue-600 text-white text-xs font-medium',
            'rounded-full shadow-lg border-2 border-white',
            'transform -translate-y-1 translate-x-1'
          )}>
            {blockType}
          </span>
        </div>
      )}
      
      {/* ES7+ Conteúdo flex responsivo */}
      <div className={cn(
        'flex-1 w-full',
        'flex flex-col sm:flex-row items-start gap-2 sm:gap-4',
        'min-h-[40px]'
      )}>
        {children}
      </div>
    </div>
  );

  // ES7+ Render engine com mapeamento padronizado flexbox
  const renderBlock = () => {
    const blockType = block.type;
    
    // ES7+ Switch com arrow functions e destructuring
    const blockMap = {
      // === COMPONENTES BÁSICOS INLINE ES7+ ===
      header: () => <ResponsiveFlexWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      text: () => <ResponsiveFlexWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      image: () => <ResponsiveFlexWrapper blockType={blockType}><ImageInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      button: () => <ResponsiveFlexWrapper blockType={blockType}><ButtonInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      spacer: () => <ResponsiveFlexWrapper blockType={blockType}><SpacerBlock {...commonProps} /></ResponsiveFlexWrapper>,

      // === COMPONENTES DE RESULTADO ES7+ ===
      'result-header': () => <ResponsiveFlexWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'result-description': () => <ResponsiveFlexWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,

      // === COMPONENTES DE OFERTA ES7+ ===
      'product-offer': () => <ResponsiveFlexWrapper blockType={blockType}><PricingCardInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'urgency-timer': () => <ResponsiveFlexWrapper blockType={blockType}><CountdownInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,

      // === COMPONENTES DE CREDIBILIDADE ES7+ ===
      'faq-section': () => <ResponsiveFlexWrapper blockType={blockType}><FAQSectionBlock {...commonProps} /></ResponsiveFlexWrapper>,
      testimonials: () => <ResponsiveFlexWrapper blockType={blockType}><TestimonialsGridBlock {...commonProps} /></ResponsiveFlexWrapper>,
      guarantee: () => <ResponsiveFlexWrapper blockType={blockType}><GuaranteeBlock {...commonProps} /></ResponsiveFlexWrapper>,

      // === COMPONENTES DE MÍDIA ES7+ ===
      'video-player': () => <ResponsiveFlexWrapper blockType={blockType}><VideoPlayerBlock {...commonProps} /></ResponsiveFlexWrapper>,
      audio: () => <ResponsiveFlexWrapper blockType={blockType}><TestimonialCardInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,

      // === COMPONENTES UI AVANÇADOS ES7+ ===
      alert: () => <ResponsiveFlexWrapper blockType={blockType}><BadgeInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      arguments: () => <ResponsiveFlexWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      carousel: () => <ResponsiveFlexWrapper blockType={blockType}><ImageDisplayInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      loader: () => <ResponsiveFlexWrapper blockType={blockType}><LoadingAnimationBlock {...commonProps} /></ResponsiveFlexWrapper>,
      compare: () => <ResponsiveFlexWrapper blockType={blockType}><PricingCardInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      confetti: () => <ResponsiveFlexWrapper blockType={blockType}><BadgeInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      quote: () => <ResponsiveFlexWrapper blockType={blockType}><TestimonialCardInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'form-input': () => <ResponsiveFlexWrapper blockType={blockType}><FormInputBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'chart-area': () => <ResponsiveFlexWrapper blockType={blockType}><ImageInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'chart-level': () => <ResponsiveFlexWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      list: () => <ResponsiveFlexWrapper blockType={blockType}><ListBlock {...commonProps} /></ResponsiveFlexWrapper>,
      marquee: () => <ResponsiveFlexWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'options-grid': () => <ResponsiveFlexWrapper blockType={blockType}><OptionsGridBlock {...commonProps} /></ResponsiveFlexWrapper>,
      script: () => <ResponsiveFlexWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      terms: () => <ResponsiveFlexWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
    };

    // ES7+ Return com fallback usando optional chaining
    return blockMap[blockType as keyof typeof blockMap]?.() ?? 
           <ResponsiveFlexWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></ResponsiveFlexWrapper>;
  };

      // Componentes modulares reais da ResultPage - INLINE e EDITÁVEIS (ETAPA 20)
      case 'style-card':
        return <ElegantWrapper blockType={blockType}><StyleCardInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'before-after':
        return <ElegantWrapper blockType={blockType}><ImageDisplayInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'bonus-section':
        return <ElegantWrapper blockType={blockType}><BonusListInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'testimonials-real':
        return <ElegantWrapper blockType={blockType}><TestimonialsGridBlock {...commonProps} /></ElegantWrapper>;
      case 'guarantee-section':
        return <ElegantWrapper blockType={blockType}><GuaranteeBlock {...commonProps} /></ElegantWrapper>;
      case 'mentor-section':
        return <ElegantWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'secure-purchase':
        return <ElegantWrapper blockType={blockType}><ButtonInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'value-stack':
        return <ElegantWrapper blockType={blockType}><PricingCardInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'final-cta':
        return <ElegantWrapper blockType={blockType}><CTAInlineBlock {...commonProps} /></ElegantWrapper>;

      // Componentes modulares das Etapas 20 e 21 - INLINE e MODULARES
      case 'result-header-inline':
        return <ElegantWrapper blockType={blockType}><ResultHeaderInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'testimonials-result':
        return <ElegantWrapper blockType={blockType}><TestimonialsInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'quiz-offer-pricing':
        return <ElegantWrapper blockType={blockType}><QuizOfferPricingInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'countdown-timer':
        return <ElegantWrapper blockType={blockType}><CountdownInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'bonus-list':
        return <ElegantWrapper blockType={blockType}><BonusListInlineBlock {...commonProps} /></ElegantWrapper>;

      // === COMPONENTES INLINE FUNCIONAIS (ES7+) ===
      case 'text-inline':
        return <ElegantWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'heading-inline':
        return <ElegantWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'button-inline':
        return <ElegantWrapper blockType={blockType}><ButtonInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'result-card-inline':
        return <ElegantWrapper blockType={blockType}><ResultCardInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'countdown-inline':
        return <ElegantWrapper blockType={blockType}><CountdownInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'quiz-offer-pricing-inline':
        return <ElegantWrapper blockType={blockType}><QuizOfferPricingInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'pricing-inline':
        return <ElegantWrapper blockType={blockType}><PricingCardInlineBlock {...commonProps} /></ElegantWrapper>;
      
      // === COMPONENTES ESPECIALIZADOS PARA QUIZ ===
      case 'quiz-intro-header':
        return <ElegantWrapper blockType={blockType}><QuizIntroHeaderBlock {...commonProps} /></ElegantWrapper>;
      case 'progress-inline':
        return <ElegantWrapper blockType={blockType}><ProgressInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'loading-animation':
        return <ElegantWrapper blockType={blockType}><LoadingAnimationBlock {...commonProps} /></ElegantWrapper>;
      case 'image-display-inline':
        return <ElegantWrapper blockType={blockType}><ImageDisplayInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'style-card-inline':
        return <ElegantWrapper blockType={blockType}><StyleCardInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'testimonial-card-inline':
        return <ElegantWrapper blockType={blockType}><TestimonialCardInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'badge-inline':
        return <ElegantWrapper blockType={blockType}><BadgeInlineBlock {...commonProps} /></ElegantWrapper>;

      // === COMPONENTES MODULARES DA ETAPA 21 (ES7+) ===
      // Cada componente é independente e pode ser usado sozinho
      case 'hero-badge-inline':
        return <ElegantWrapper blockType={blockType}><BadgeInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'hero-title-inline':
        return <ElegantWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'problem-list-inline':
        return <ElegantWrapper blockType={blockType}><ListBlock {...commonProps} /></ElegantWrapper>;
      case 'highlight-box-inline':
        return <ElegantWrapper blockType={blockType}><BadgeInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'product-card-inline':
        return <ElegantWrapper blockType={blockType}><PricingCardInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'price-highlight-inline':
        return <ElegantWrapper blockType={blockType}><PricingCardInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'cta-button-inline':
        return <ElegantWrapper blockType={blockType}><ButtonInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'trust-elements-inline':
        return <ElegantWrapper blockType={blockType}><TestimonialsGridBlock {...commonProps} /></ElegantWrapper>;
      case 'countdown-timer-inline':
        return <ElegantWrapper blockType={blockType}><CountdownInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'guarantee-seal-inline':
        return <ElegantWrapper blockType={blockType}><BadgeInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'faq-item-inline':
        return <ElegantWrapper blockType={blockType}><FAQSectionBlock {...commonProps} /></ElegantWrapper>;
      case 'section-header-inline':
        return <ElegantWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'sticky-header-inline':
        return <ElegantWrapper blockType={blockType}><QuizIntroHeaderBlock {...commonProps} /></ElegantWrapper>;

      // === CASOS ADICIONAIS (sem duplicação) ===
      case 'main-heading-inline':
        return <ElegantWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'image-inline':
        return <ElegantWrapper blockType={blockType}><ImageDisplayInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'stat-inline':
        return <ElegantWrapper blockType={blockType}><StatInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'pricing-card-inline':
        return <ElegantWrapper blockType={blockType}><PricingCardInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'testimonial-inline':
        return <ElegantWrapper blockType={blockType}><TestimonialCardInlineBlock {...commonProps} /></ElegantWrapper>;

      // Componentes modulares reais do Quiz - COM WRAPPER
      case 'quiz-question':
        return <ElegantWrapper blockType={blockType}><QuizQuestionBlock {...commonProps} /></ElegantWrapper>;
      case 'quiz-progress':
        return <ElegantWrapper blockType={blockType}><QuizProgressBlock {...commonProps} /></ElegantWrapper>;

      // Componentes que estavam causando erro - CORRIGIDOS COM WRAPPER
      case 'testimonials-grid':
        return <ElegantWrapper blockType={blockType}><TestimonialsGridBlock {...commonProps} /></ElegantWrapper>;
      case 'social-proof':
        return <ElegantWrapper blockType={blockType}><TestimonialsGridBlock {...commonProps} /></ElegantWrapper>;
      case 'value-anchoring':
        return <ElegantWrapper blockType={blockType}><PricingCardInlineBlock {...commonProps} /></ElegantWrapper>;

      // BLOCOS ESPECÍFICOS DO QUIZ - DADOS REAIS COM WRAPPER
      case 'QuizQuestionBlock':
        return <ElegantWrapper blockType={blockType}><QuizQuestionBlock {...commonProps} /></ElegantWrapper>;
      case 'QuestionMultipleBlock':
        return <ElegantWrapper blockType={blockType}><QuestionMultipleBlock {...commonProps} /></ElegantWrapper>;
      case 'StrategicQuestionBlock':
        return <ElegantWrapper blockType={blockType}><StrategicQuestionBlock {...commonProps} /></ElegantWrapper>;
      case 'QuizTransitionBlock':
        return <ElegantWrapper blockType={blockType}><QuizTransitionBlock {...commonProps} /></ElegantWrapper>;
      case 'ResultPageBlock':
        return <ElegantWrapper blockType={blockType}><ResultPageBlock {...commonProps} /></ElegantWrapper>;

      // BLOCOS ESPECÍFICOS DO QUIZ - MODULARES E SCHEMA-DRIVEN COM WRAPPER
      case 'quiz-title':
        return <ElegantWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'quiz-name-input':
        return <ElegantWrapper blockType={blockType}><FormInputBlock {...commonProps} /></ElegantWrapper>;
      case 'quiz-question-main':
        return <ElegantWrapper blockType={blockType}><QuestionMultipleBlock {...commonProps} /></ElegantWrapper>;
      case 'quiz-transition-main':
        return <ElegantWrapper blockType={blockType}><QuizTransitionBlock {...commonProps} /></ElegantWrapper>;
      case 'quiz-question-strategic':
        return <ElegantWrapper blockType={blockType}><StrategicQuestionBlock {...commonProps} /></ElegantWrapper>;
      case 'quiz-transition-final':
        return <ElegantWrapper blockType={blockType}><QuizTransitionBlock {...commonProps} /></ElegantWrapper>;
      
      // BLOCOS DE RESULTADO ANTIGOS (mantidos para compatibilidade) - INLINE
      case 'quiz-result-header':
        return <ElegantWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'quiz-result-card':
        return <ElegantWrapper blockType={blockType}><PricingCardInlineBlock {...commonProps} /></ElegantWrapper>;

      // NOVOS MAPEAMENTOS PARA TIPOS DO SCHEMA SERVICE
      case 'quiz-offer-title':
        return <ElegantWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'quiz-offer-countdown':
        return <ElegantWrapper blockType={blockType}><CountdownInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'quiz-offer-faq':
        return <ElegantWrapper blockType={blockType}><FAQSectionBlock {...commonProps} /></ElegantWrapper>;
        
      // FALLBACK PARA COMPONENTES GENÉRICOS
      default:
        return <ElegantWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></ElegantWrapper>;
    }
  };

  return (
    <div className="universal-block-renderer">
      {renderBlock()}
    </div>
  );
};

export default UniversalBlockRenderer;