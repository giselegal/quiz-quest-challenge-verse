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
    
    // ES7+ Switch com arrow functions e destructuring - TODOS OS BLOCOS
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

      // === COMPONENTES MODULARES ETAPA 20 ES7+ ===
      'style-card': () => <ResponsiveFlexWrapper blockType={blockType}><StyleCardInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'before-after': () => <ResponsiveFlexWrapper blockType={blockType}><ImageDisplayInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'bonus-section': () => <ResponsiveFlexWrapper blockType={blockType}><BonusListInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'testimonials-real': () => <ResponsiveFlexWrapper blockType={blockType}><TestimonialsGridBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'guarantee-section': () => <ResponsiveFlexWrapper blockType={blockType}><GuaranteeBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'mentor-section': () => <ResponsiveFlexWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'secure-purchase': () => <ResponsiveFlexWrapper blockType={blockType}><ButtonInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'value-stack': () => <ResponsiveFlexWrapper blockType={blockType}><PricingCardInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'final-cta': () => <ResponsiveFlexWrapper blockType={blockType}><CTAInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,

      // === COMPONENTES INLINE FUNCIONAIS ES7+ ===
      'text-inline': () => <ResponsiveFlexWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'heading-inline': () => <ResponsiveFlexWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'button-inline': () => <ResponsiveFlexWrapper blockType={blockType}><ButtonInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'result-card-inline': () => <ResponsiveFlexWrapper blockType={blockType}><ResultCardInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'countdown-inline': () => <ResponsiveFlexWrapper blockType={blockType}><CountdownInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'quiz-offer-pricing-inline': () => <ResponsiveFlexWrapper blockType={blockType}><QuizOfferPricingInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'pricing-inline': () => <ResponsiveFlexWrapper blockType={blockType}><PricingCardInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,

      // === COMPONENTES ESPECIALIZADOS QUIZ ES7+ ===
      'quiz-intro-header': () => <ResponsiveFlexWrapper blockType={blockType}><QuizIntroHeaderBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'progress-inline': () => <ResponsiveFlexWrapper blockType={blockType}><ProgressInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'loading-animation': () => <ResponsiveFlexWrapper blockType={blockType}><LoadingAnimationBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'image-display-inline': () => <ResponsiveFlexWrapper blockType={blockType}><ImageDisplayInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'style-card-inline': () => <ResponsiveFlexWrapper blockType={blockType}><StyleCardInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'testimonial-card-inline': () => <ResponsiveFlexWrapper blockType={blockType}><TestimonialCardInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'badge-inline': () => <ResponsiveFlexWrapper blockType={blockType}><BadgeInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,

      // === COMPONENTES MODULARES ETAPA 21 ES7+ ===
      'hero-badge-inline': () => <ResponsiveFlexWrapper blockType={blockType}><BadgeInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'hero-title-inline': () => <ResponsiveFlexWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'problem-list-inline': () => <ResponsiveFlexWrapper blockType={blockType}><ListBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'highlight-box-inline': () => <ResponsiveFlexWrapper blockType={blockType}><BadgeInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'product-card-inline': () => <ResponsiveFlexWrapper blockType={blockType}><PricingCardInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'price-highlight-inline': () => <ResponsiveFlexWrapper blockType={blockType}><PricingCardInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'cta-button-inline': () => <ResponsiveFlexWrapper blockType={blockType}><ButtonInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'trust-elements-inline': () => <ResponsiveFlexWrapper blockType={blockType}><TestimonialsGridBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'countdown-timer-inline': () => <ResponsiveFlexWrapper blockType={blockType}><CountdownInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'guarantee-seal-inline': () => <ResponsiveFlexWrapper blockType={blockType}><BadgeInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'faq-item-inline': () => <ResponsiveFlexWrapper blockType={blockType}><FAQSectionBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'section-header-inline': () => <ResponsiveFlexWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'sticky-header-inline': () => <ResponsiveFlexWrapper blockType={blockType}><QuizIntroHeaderBlock {...commonProps} /></ResponsiveFlexWrapper>,

      // === COMPONENTES QUIZ REAIS ES7+ ===
      'quiz-question': () => <ResponsiveFlexWrapper blockType={blockType}><QuizQuestionBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'quiz-progress': () => <ResponsiveFlexWrapper blockType={blockType}><QuizProgressBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'testimonials-grid': () => <ResponsiveFlexWrapper blockType={blockType}><TestimonialsGridBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'social-proof': () => <ResponsiveFlexWrapper blockType={blockType}><TestimonialsGridBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'value-anchoring': () => <ResponsiveFlexWrapper blockType={blockType}><PricingCardInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,

      // === COMPONENTES ADICIONAIS ES7+ ===
      'main-heading-inline': () => <ResponsiveFlexWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'image-inline': () => <ResponsiveFlexWrapper blockType={blockType}><ImageDisplayInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'stat-inline': () => <ResponsiveFlexWrapper blockType={blockType}><StatInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'pricing-card-inline': () => <ResponsiveFlexWrapper blockType={blockType}><PricingCardInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'testimonial-inline': () => <ResponsiveFlexWrapper blockType={blockType}><TestimonialCardInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,

      // === BLOCOS QUIZ ESPECÍFICOS ES7+ ===
      QuizQuestionBlock: () => <ResponsiveFlexWrapper blockType={blockType}><QuizQuestionBlock {...commonProps} /></ResponsiveFlexWrapper>,
      QuestionMultipleBlock: () => <ResponsiveFlexWrapper blockType={blockType}><QuestionMultipleBlock {...commonProps} /></ResponsiveFlexWrapper>,
      StrategicQuestionBlock: () => <ResponsiveFlexWrapper blockType={blockType}><StrategicQuestionBlock {...commonProps} /></ResponsiveFlexWrapper>,
      QuizTransitionBlock: () => <ResponsiveFlexWrapper blockType={blockType}><QuizTransitionBlock {...commonProps} /></ResponsiveFlexWrapper>,
      ResultPageBlock: () => <ResponsiveFlexWrapper blockType={blockType}><ResultPageBlock {...commonProps} /></ResponsiveFlexWrapper>,

      // === SCHEMA SERVICE MAPPINGS ES7+ ===
      'quiz-title': () => <ResponsiveFlexWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'quiz-name-input': () => <ResponsiveFlexWrapper blockType={blockType}><FormInputBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'quiz-question-main': () => <ResponsiveFlexWrapper blockType={blockType}><QuestionMultipleBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'quiz-transition-main': () => <ResponsiveFlexWrapper blockType={blockType}><QuizTransitionBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'quiz-question-strategic': () => <ResponsiveFlexWrapper blockType={blockType}><StrategicQuestionBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'quiz-transition-final': () => <ResponsiveFlexWrapper blockType={blockType}><QuizTransitionBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'quiz-result-header': () => <ResponsiveFlexWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'quiz-result-card': () => <ResponsiveFlexWrapper blockType={blockType}><PricingCardInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'quiz-offer-title': () => <ResponsiveFlexWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'quiz-offer-countdown': () => <ResponsiveFlexWrapper blockType={blockType}><CountdownInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'quiz-offer-faq': () => <ResponsiveFlexWrapper blockType={blockType}><FAQSectionBlock {...commonProps} /></ResponsiveFlexWrapper>,

      // === NOVOS COMPONENTES MODULARES ETAPAS 20/21 ES7+ ===
      'result-header-inline': () => <ResponsiveFlexWrapper blockType={blockType}><ResultHeaderInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'testimonials-result': () => <ResponsiveFlexWrapper blockType={blockType}><TestimonialsInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'quiz-offer-pricing': () => <ResponsiveFlexWrapper blockType={blockType}><QuizOfferPricingInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'countdown-timer': () => <ResponsiveFlexWrapper blockType={blockType}><CountdownInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
      'bonus-list': () => <ResponsiveFlexWrapper blockType={blockType}><BonusListInlineBlock {...commonProps} /></ResponsiveFlexWrapper>,
    };

    // ES7+ Return com fallback usando optional chaining
    return blockMap[blockType as keyof typeof blockMap]?.() ?? 
           <ResponsiveFlexWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></ResponsiveFlexWrapper>;
  };

  return (
    <div className={cn(
      // ES7+ Container principal flexbox responsivo
      'universal-block-renderer',
      'flex flex-col w-full',
      'transition-all duration-300 ease-out'
    )}>
      {renderBlock()}
    </div>
  );
};

export default UniversalBlockRenderer;