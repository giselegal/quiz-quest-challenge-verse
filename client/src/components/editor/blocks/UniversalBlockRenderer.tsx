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

// Novos componentes para Etapa 20
import CharacteristicsListInlineBlock from './inline/CharacteristicsListInlineBlock';
import SecondaryStylesInlineBlock from './inline/SecondaryStylesInlineBlock';

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

  // ES7+ Sistema responsivo simplificado - SEM wrapper duplo
  const renderComponent = () => {
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
      className: cn(
        // Responsividade nativa mobile-first
        'w-full transition-all duration-200',
        'border border-gray-200 rounded-lg shadow-sm bg-white',
        'hover:shadow-md hover:border-blue-300',
        isSelected && 'ring-2 ring-blue-500 border-blue-400 bg-blue-50'
      )
    };

    const componentMap: Record<string, () => React.ReactNode> = {
      // ES7+ Componentes básicos sem wrapper
      header: () => <HeadingInlineBlock {...commonProps} />,
      text: () => <TextInlineBlock {...commonProps} />,
      image: () => <ImageInlineBlock {...commonProps} />,
      button: () => <ButtonInlineBlock {...commonProps} />,
      spacer: () => <SpacerBlock {...commonProps} />,

      // Componentes de resultado
      'result-header': () => <HeadingInlineBlock {...commonProps} />,
      'result-description': () => <TextInlineBlock {...commonProps} />,

      // Componentes de oferta 
      'product-offer': () => <PricingCardInlineBlock {...commonProps} />,
      'urgency-timer': () => <CountdownInlineBlock {...commonProps} />,

      // Componentes especiais
      'faq-section': () => <FAQSectionBlock {...commonProps} />,
      testimonials: () => <TestimonialsGridBlock {...commonProps} />,
      guarantee: () => <GuaranteeBlock {...commonProps} />,

      // === COMPONENTES DE MÍDIA ES7+ ===
      'video-player': () => <VideoPlayerBlock {...commonProps} />,
      audio: () => <TestimonialCardInlineBlock {...commonProps} />,

      // === COMPONENTES UI AVANÇADOS ES7+ ===
      alert: () => <BadgeInlineBlock {...commonProps} />,
      arguments: () => <HeadingInlineBlock {...commonProps} />,
      carousel: () => <ImageDisplayInlineBlock {...commonProps} />,
      loader: () => <LoadingAnimationBlock {...commonProps} />,
      compare: () => <PricingCardInlineBlock {...commonProps} />,
      confetti: () => <BadgeInlineBlock {...commonProps} />,
      quote: () => <TestimonialCardInlineBlock {...commonProps} />,
      'form-input': () => <FormInputBlock {...commonProps} />,
      'chart-area': () => <ImageInlineBlock {...commonProps} />,
      'chart-level': () => <TextInlineBlock {...commonProps} />,
      list: () => <ListBlock {...commonProps} />,
      marquee: () => <TextInlineBlock {...commonProps} />,
      'options-grid': () => <OptionsGridBlock {...commonProps} />,
      script: () => <TextInlineBlock {...commonProps} />,
      terms: () => <TextInlineBlock {...commonProps} />,

      // === COMPONENTES MODULARES ETAPA 20 ES7+ ===
      'style-card': () => <StyleCardInlineBlock {...commonProps} />,
      'before-after': () => <ImageDisplayInlineBlock {...commonProps} />,
      'bonus-section': () => <BonusListInlineBlock {...commonProps} />,
      'testimonials-real': () => <TestimonialsGridBlock {...commonProps} />,
      'guarantee-section': () => <GuaranteeBlock {...commonProps} />,
      'mentor-section': () => <HeadingInlineBlock {...commonProps} />,
      'secure-purchase': () => <ButtonInlineBlock {...commonProps} />,
      'value-stack': () => <PricingCardInlineBlock {...commonProps} />,
      'final-cta': () => <CTAInlineBlock {...commonProps} />,

      // === COMPONENTES INLINE FUNCIONAIS ES7+ ===
      'text-inline': () => <TextInlineBlock {...commonProps} />,
      'heading-inline': () => <HeadingInlineBlock {...commonProps} />,
      'button-inline': () => <ButtonInlineBlock {...commonProps} />,
      'result-card-inline': () => <ResultCardInlineBlock {...commonProps} />,
      'countdown-inline': () => <CountdownInlineBlock {...commonProps} />,
      'quiz-offer-pricing-inline': () => <QuizOfferPricingInlineBlock {...commonProps} />,
      'pricing-inline': () => <PricingCardInlineBlock {...commonProps} />,

      // === COMPONENTES ESPECIALIZADOS QUIZ ES7+ ===
      'quiz-intro-header': () => <QuizIntroHeaderBlock {...commonProps} />,
      'progress-inline': () => <ProgressInlineBlock {...commonProps} />,
      'loading-animation': () => <LoadingAnimationBlock {...commonProps} />,
      'image-display-inline': () => <ImageDisplayInlineBlock {...commonProps} />,
      'style-card-inline': () => <StyleCardInlineBlock {...commonProps} />,
      'testimonial-card-inline': () => <TestimonialCardInlineBlock {...commonProps} />,
      'badge-inline': () => <BadgeInlineBlock {...commonProps} />,

      // === COMPONENTES MODULARES ETAPA 21 ES7+ ===
      'hero-badge-inline': () => <BadgeInlineBlock {...commonProps} />,
      'hero-title-inline': () => <HeadingInlineBlock {...commonProps} />,
      'problem-list-inline': () => <ListBlock {...commonProps} />,
      'highlight-box-inline': () => <BadgeInlineBlock {...commonProps} />,
      'product-card-inline': () => <PricingCardInlineBlock {...commonProps} />,
      'price-highlight-inline': () => <PricingCardInlineBlock {...commonProps} />,
      'cta-button-inline': () => <ButtonInlineBlock {...commonProps} />,
      'trust-elements-inline': () => <TestimonialsGridBlock {...commonProps} />,
      'countdown-timer-inline': () => <CountdownInlineBlock {...commonProps} />,
      'guarantee-seal-inline': () => <BadgeInlineBlock {...commonProps} />,
      'faq-item-inline': () => <FAQSectionBlock {...commonProps} />,
      'section-header-inline': () => <HeadingInlineBlock {...commonProps} />,
      'sticky-header-inline': () => <QuizIntroHeaderBlock {...commonProps} />,

      // === COMPONENTES QUIZ REAIS ES7+ ===
      'quiz-question': () => <QuizQuestionBlock {...commonProps} />,
      'quiz-progress': () => <QuizProgressBlock {...commonProps} />,
      'testimonials-grid': () => <TestimonialsGridBlock {...commonProps} />,
      'social-proof': () => <TestimonialsGridBlock {...commonProps} />,
      'value-anchoring': () => <PricingCardInlineBlock {...commonProps} />,

      // === COMPONENTES ADICIONAIS ES7+ ===
      'main-heading-inline': () => <HeadingInlineBlock {...commonProps} />,
      'image-inline': () => <ImageDisplayInlineBlock {...commonProps} />,
      'stat-inline': () => <StatInlineBlock {...commonProps} />,
      'pricing-card-inline': () => <PricingCardInlineBlock {...commonProps} />,
      'testimonial-inline': () => <TestimonialCardInlineBlock {...commonProps} />,

      // === BLOCOS QUIZ ESPECÍFICOS ES7+ ===
      QuizQuestionBlock: () => <QuizQuestionBlock {...commonProps} />,
      QuestionMultipleBlock: () => <QuestionMultipleBlock {...commonProps} />,
      StrategicQuestionBlock: () => <StrategicQuestionBlock {...commonProps} />,
      QuizTransitionBlock: () => <QuizTransitionBlock {...commonProps} />,
      ResultPageBlock: () => <ResultPageBlock {...commonProps} />,

      // === SCHEMA SERVICE MAPPINGS ES7+ ===
      'quiz-title': () => <HeadingInlineBlock {...commonProps} />,
      'quiz-name-input': () => <FormInputBlock {...commonProps} />,
      'quiz-question-main': () => <QuestionMultipleBlock {...commonProps} />,
      'quiz-transition-main': () => <QuizTransitionBlock {...commonProps} />,
      'quiz-question-strategic': () => <StrategicQuestionBlock {...commonProps} />,
      'quiz-transition-final': () => <QuizTransitionBlock {...commonProps} />,
      'quiz-result-header': () => <HeadingInlineBlock {...commonProps} />,
      'quiz-result-card': () => <PricingCardInlineBlock {...commonProps} />,
      'quiz-offer-title': () => <HeadingInlineBlock {...commonProps} />,
      'quiz-offer-countdown': () => <CountdownInlineBlock {...commonProps} />,
      'quiz-offer-faq': () => <FAQSectionBlock {...commonProps} />,

      // === NOVOS COMPONENTES MODULARES ETAPAS 20/21 ES7+ ===
      'result-header-inline': () => <ResultHeaderInlineBlock {...commonProps} />,
      'testimonials-result': () => <TestimonialsInlineBlock {...commonProps} />,
      'quiz-offer-pricing': () => <QuizOfferPricingInlineBlock {...commonProps} />,
      'countdown-timer': () => <CountdownInlineBlock {...commonProps} />,
      'bonus-list': () => <BonusListInlineBlock {...commonProps} />,

      // === ETAPA 20 - COMPONENTES RESULTADO MODULARES ES7+ (novos) ===
      'before-after-inline': () => <ImageDisplayInlineBlock {...commonProps} />,
      'divider-inline': () => <SpacerBlock {...commonProps} />,

      // === ETAPA 21 - COMPONENTES FALTANTES ES7+ (únicos) ===
      // Removidas duplicatas, mantidos apenas os únicos
    };

    // ES7+ Return com fallback usando optional chaining
    return componentMap[blockType as keyof typeof componentMap]?.() ?? 
           <TextInlineBlock {...commonProps} />;
  };

  return (
    <div className={cn(
      // ES7+ Container principal flexbox responsivo
      'universal-block-renderer',
      'flex flex-col w-full',
      'transition-all duration-300 ease-out'
    )}>
      {renderComponent()}
    </div>
  );
};

export default UniversalBlockRenderer;