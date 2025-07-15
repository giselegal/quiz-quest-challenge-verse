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
  ImageDisplayInlineBlock,
  PricingCardInlineBlock,
  TestimonialCardInlineBlock,
  // Etapa 20 (Resultado)
  TestimonialsInlineBlock,
  // Etapa 21 (Oferta)
  QuizOfferPricingInlineBlock,
  CountdownInlineBlock,
  // Componentes especializados para Quiz
  QuizIntroHeaderBlock,
  LoadingAnimationBlock
} from './inline';

// Novos componentes BoxFlex da Etapa 20
import {
  HeaderBoxFlexInline,
  ResultMainBoxFlexInline,
  SecondaryStylesBoxFlexInline,
  BeforeAfterBoxFlexInline,
  MotivationBoxFlexInline,
  BonusBoxFlexInline,
  TestimonialsBoxFlexInline,
  CTAGreenBoxFlexInline,
  GuaranteeBoxFlexInline,
  MentorBoxFlexInline,
  ValueStackBoxFlexInline,
  BuildInfoBoxFlexInline
} from './inline/BoxFlexInlineComponents_Etapa20';

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

// Novos componentes inline criados
import ResultHeaderInlineBlock from './inline/ResultHeaderInlineBlock';
import ResultCardInlineBlock from './inline/ResultCardInlineBlock';
import BeforeAfterInlineBlock from './inline/BeforeAfterInlineBlock';
import BonusListInlineBlock from './inline/BonusListInlineBlock';
import StepHeaderInlineBlock from './inline/StepHeaderInlineBlock';

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
      // === COMPONENTES BÁSICOS ===
      header: () => <HeadingInlineBlock {...commonProps} />,
      text: () => <TextInlineBlock {...commonProps} />,
      image: () => <ImageInlineBlock {...commonProps} />,
      button: () => <ButtonInlineBlock {...commonProps} />,
      spacer: () => <SpacerBlock {...commonProps} />,
      'form-input': () => <FormInputBlock {...commonProps} />,
      list: () => <ListBlock {...commonProps} />,
      
      // === COMPONENTES DE RESULTADO ===
      'result-header': () => <HeadingInlineBlock {...commonProps} />,
      'result-description': () => <TextInlineBlock {...commonProps} />,
      
      // === COMPONENTES DE OFERTA ===
      'product-offer': () => <PricingCardInlineBlock {...commonProps} />,
      'urgency-timer': () => <CountdownInlineBlock {...commonProps} />,
      
      // === COMPONENTES ESPECIAIS ===
      'faq-section': () => <FAQSectionBlock {...commonProps} />,
      testimonials: () => <TestimonialsGridBlock {...commonProps} />,
      guarantee: () => <GuaranteeBlock {...commonProps} />,
      'video-player': () => <VideoPlayerBlock {...commonProps} />,
      
      // === COMPONENTES INLINE ESSENCIAIS ===
      'text-inline': () => <TextInlineBlock {...commonProps} />,
      'heading-inline': () => <HeadingInlineBlock {...commonProps} />,
      'button-inline': () => <ButtonInlineBlock {...commonProps} />,
      'badge-inline': () => <BadgeInlineBlock {...commonProps} />,
      'progress-inline': () => <ProgressInlineBlock {...commonProps} />,
      'image-display-inline': () => <ImageDisplayInlineBlock {...commonProps} />,
      'style-card-inline': () => <StyleCardInlineBlock {...commonProps} />,
      'result-card-inline': () => <ResultCardInlineBlock {...commonProps} />,
      'result-header-inline': () => <ResultHeaderInlineBlock {...commonProps} />,
      'before-after-inline': () => <BeforeAfterInlineBlock {...commonProps} />,
      'bonus-list-inline': () => <BonusListInlineBlock {...commonProps} />,
      'step-header-inline': () => <StepHeaderInlineBlock {...commonProps} />,
      'testimonial-card-inline': () => <TestimonialCardInlineBlock {...commonProps} />,
      'countdown-inline': () => <CountdownInlineBlock {...commonProps} />,
      'stat-inline': () => <StatInlineBlock {...commonProps} />,
      'pricing-card-inline': () => <PricingCardInlineBlock {...commonProps} />,
      
      // === COMPONENTES QUIZ ===
      'quiz-intro-header': () => <QuizIntroHeaderBlock {...commonProps} />,
      'loading-animation': () => <LoadingAnimationBlock {...commonProps} />,
      'options-grid': () => <OptionsGridBlock {...commonProps} />,
      'quiz-question': () => <QuizQuestionBlock {...commonProps} />,
      'quiz-progress': () => <QuizProgressBlock {...commonProps} />,
      
      // === COMPONENTES ETAPA 20/21 (sem duplicação) ===
      'quiz-offer-pricing-inline': () => <QuizOfferPricingInlineBlock {...commonProps} />,
      'divider-inline': () => <SpacerBlock {...commonProps} />,
      
      // === COMPONENTES ETAPA 21 ESPECÍFICOS ===
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
      
      // === COMPONENTES ESTRATÉGICOS ===
      'strategic-question-image': () => <StrategicQuestionBlock {...commonProps} />,
      'strategic-question-main': () => <StrategicQuestionBlock {...commonProps} />,
      'strategic-question-inline': () => <StrategicQuestionBlock {...commonProps} />,
      
      // === BLOCOS QUIZ ESPECÍFICOS ===
      QuizQuestionBlock: () => <QuizQuestionBlock {...commonProps} />,
      QuestionMultipleBlock: () => <QuestionMultipleBlock {...commonProps} />,
      StrategicQuestionBlock: () => <StrategicQuestionBlock {...commonProps} />,
      QuizTransitionBlock: () => <QuizTransitionBlock {...commonProps} />,
      ResultPageBlock: () => <ResultPageBlock {...commonProps} />,
      
      // === COMPONENTES ETAPA 20 - BOXFLEX HORIZONTAL ===
      'header-boxflex-inline': () => <HeaderBoxFlexInline {...commonProps} />,
      'result-main-boxflex-inline': () => <ResultMainBoxFlexInline {...commonProps} />,
      'secondary-styles-boxflex-inline': () => <SecondaryStylesBoxFlexInline {...commonProps} />,
      'before-after-boxflex-inline': () => <BeforeAfterBoxFlexInline {...commonProps} />,
      'motivation-boxflex-inline': () => <MotivationBoxFlexInline {...commonProps} />,
      'bonus-boxflex-inline': () => <BonusBoxFlexInline {...commonProps} />,
      'testimonials-boxflex-inline': () => <TestimonialsBoxFlexInline {...commonProps} />,
      'cta-green-boxflex-inline': () => <CTAGreenBoxFlexInline {...commonProps} />,
      'guarantee-boxflex-inline': () => <GuaranteeBoxFlexInline {...commonProps} />,
      'mentor-boxflex-inline': () => <MentorBoxFlexInline {...commonProps} />,
      'value-stack-boxflex-inline': () => <ValueStackBoxFlexInline {...commonProps} />,
      'build-info-boxflex-inline': () => <BuildInfoBoxFlexInline {...commonProps} />,
      
      // === MAPEAMENTOS ALTERNATIVOS ETAPA 20 ===
      'etapa20-header': () => <HeaderBoxFlexInline {...commonProps} />,
      'etapa20-resultado-principal': () => <ResultMainBoxFlexInline {...commonProps} />,
      'etapa20-estilos-secundarios': () => <SecondaryStylesBoxFlexInline {...commonProps} />,
      'etapa20-antes-depois': () => <BeforeAfterBoxFlexInline {...commonProps} />,
      'etapa20-motivacao': () => <MotivationBoxFlexInline {...commonProps} />,
      'etapa20-bonus': () => <BonusBoxFlexInline {...commonProps} />,
      'etapa20-depoimentos': () => <TestimonialsBoxFlexInline {...commonProps} />,
      'etapa20-cta-verde': () => <CTAGreenBoxFlexInline {...commonProps} />,
      'etapa20-garantia': () => <GuaranteeBoxFlexInline {...commonProps} />,
      'etapa20-mentora': () => <MentorBoxFlexInline {...commonProps} />,
      'etapa20-value-stack': () => <ValueStackBoxFlexInline {...commonProps} />,
      'etapa20-build-info': () => <BuildInfoBoxFlexInline {...commonProps} />,

      // ...existing components...
    };

    // ES7+ Return com fallback usando optional chaining
    return componentMap[block.type as keyof typeof componentMap]?.() ?? 
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