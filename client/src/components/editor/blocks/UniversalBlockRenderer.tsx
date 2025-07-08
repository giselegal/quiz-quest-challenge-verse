import React from 'react';
import { cn } from '@/lib/utils';
import type { BlockData } from '@/types/blocks';

// Importar todos os componentes dos blocos
import HeaderBlock from './HeaderBlock';
import TextBlock from './TextBlock';
import { ImageBlock } from './ImageBlock';
import ButtonBlock from './ButtonBlock';
import { SpacerBlock } from './SpacerBlock';
import ResultHeaderBlock from './ResultHeaderBlock';
import ResultDescriptionBlock from './ResultDescriptionBlock';
import ProductOfferBlock from './ProductOfferBlock';
import UrgencyTimerBlock from './UrgencyTimerBlock';
import FAQSectionBlock from './FAQSectionBlock';
import TestimonialsBlock from './TestimonialsBlock';
import GuaranteeBlock from './GuaranteeBlock';

// Import new modular blocks from ResultPage
import StyleCardBlock from './StyleCardBlock';
import BeforeAfterBlock from './BeforeAfterBlock';
import BonusBlock from './BonusBlock';
import MentorBlock from './MentorBlock';
import SecurePurchaseBlock from './SecurePurchaseBlock';
import ValueStackBlock from './ValueStackBlock';
import FinalCTABlock from './FinalCTABlock';
import QuizQuestionBlock from './QuizQuestionBlock';
import QuizProgressBlock from './QuizProgressBlock';

// Novos componentes INLINE editáveis
import StyleCardInlineBlock from './StyleCardInlineBlock';
import TestimonialInlineBlock from './TestimonialInlineBlock';
import BonusInlineBlock from './BonusInlineBlock';
import CTAInlineBlock from './CTAInlineBlock';
import ProgressInlineBlock from './ProgressInlineBlock';
import BadgeInlineBlock from './BadgeInlineBlock';
import StatInlineBlock from './StatInlineBlock';
import PricingInlineBlock from './PricingInlineBlock';
import LoaderInlineBlock from './LoaderInlineBlock';
import ComparisonInlineBlock from './ComparisonInlineBlock';
import NotificationInlineBlock from './NotificationInlineBlock';
import HeadingInlineBlock from './HeadingInlineBlock';
import TextInlineBlock from './TextInlineBlock';
import ImageInlineBlock from './ImageInlineBlock';
import ButtonInlineBlock from './ButtonInlineBlock';
import { VideoPlayerBlock } from './VideoPlayerBlock';

// Blocos específicos do Quiz Intro
import QuizIntroHeaderBlock from './QuizIntroHeaderBlock';
import QuizNameInputBlock from './QuizNameInputBlock';
import QuizTitleBlock from './QuizTitleBlock';

// Blocos de passos do funil
import FunnelIntroStep from '../../funnel-blocks/steps/FunnelIntroStep';
import OfferTransitionStep from '../../funnel-blocks/steps/OfferTransitionStep';
import OfferPageStep from '../../funnel-blocks/steps/OfferPageStep';

// Blocos UI/Avançados
import AlertBlock from './AlertBlock';
import ArgumentsBlock from './ArgumentsBlock';
import AudioBlock from './AudioBlock';
import CarouselBlock from './CarouselBlock';
import LoaderBlock from './LoaderBlock';
import CompareBlock from './CompareBlock';
import ConfettiBlock from './ConfettiBlock';
import QuoteBlock from './QuoteBlock';
import FormInputBlock from './FormInputBlock';
import ChartAreaBlock from './ChartAreaBlock';
import ChartLevelBlock from './ChartLevelBlock';
import ListBlock from './ListBlock';
import MarqueeBlock from './MarqueeBlock';
import OptionsGridBlock from './OptionsGridBlock';
import ScriptBlock from './ScriptBlock';
import TermsBlock from './TermsBlock';

// Blocos especiais do quiz
import QuizStartPageBlock from './QuizStartPageBlock';

// Novos blocos modulares avançados
import SocialProofBlock from './SocialProofBlock';
import ValueAnchoringBlock from './ValueAnchoringBlock';
import AdvancedCTABlock from './AdvancedCTABlock';
import ComparisonTableBlock from './ComparisonTableBlock';
import ProductCarouselBlock from './ProductCarouselBlock';
import ResultPageBlock from './ResultPageBlock';
import QuizOfferPageBlock from './QuizOfferPageBlock';
import QuestionMultipleBlock from './QuestionMultipleBlock';
import StrategicQuestionBlock from './StrategicQuestionBlock';
import QuizTransitionBlock from './QuizTransitionBlock';
import ModernResultPageBlock from './ModernResultPageBlock';

// Blocos unificados do funil
import UnifiedFunnelBlock from './UnifiedFunnelBlock';

export interface BlockRendererProps {
  block: BlockData;
  isSelected?: boolean;
  onClick?: () => void;
  onSaveInline?: (blockId: string, updates: Partial<BlockData>) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Universal Block Renderer for Schema-Driven Editor
 * Renders any block type based on its type property
 */
export const UniversalBlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isSelected = false,
  onClick,
  onSaveInline,
  disabled = false,
  className
}) => {
  // Props comuns para todos os blocos
  const commonProps = {
    block: block,
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
      'block-renderer-item transition-all duration-200',
      isSelected && 'ring-2 ring-blue-500 bg-blue-50',
      !disabled && 'cursor-pointer hover:bg-gray-50',
      className
    )
  };

  // Render do bloco baseado no tipo
  const renderBlock = () => {
    switch (block.type) {
      // Blocos básicos
      case 'header':
        return <HeaderBlock {...commonProps} />;
      case 'text':
        return <TextBlock {...commonProps} />;
      case 'image':
        return <ImageBlock {...commonProps} />;
      case 'button':
        return <ButtonBlock {...commonProps} />;
      case 'spacer':
        return <SpacerBlock {...commonProps} />;

      // Blocos de resultado
      case 'result-header':
        return <ResultHeaderBlock {...commonProps} />;
      case 'result-description':
        return <ResultDescriptionBlock {...commonProps} />;

      // Blocos de oferta
      case 'product-offer':
        return <ProductOfferBlock {...commonProps} />;
      case 'urgency-timer':
        return <UrgencyTimerBlock {...commonProps} />;

      // Blocos de credibilidade
      case 'faq-section':
        return <FAQSectionBlock {...commonProps} />;
      case 'testimonials':
        return <TestimonialsBlock {...{...commonProps, block: {...block, type: 'testimonials-grid' as const}}} />;
      case 'guarantee':
        return <GuaranteeBlock {...commonProps} />;

      // Blocos de mídia
      case 'video-player':
        return <VideoPlayerBlock {...commonProps} />;
      case 'audio':
        return <AudioBlock {...commonProps} />;

      // Blocos UI/Avançados
      case 'alert':
        return <AlertBlock {...commonProps} />;
      case 'arguments':
        return <ArgumentsBlock {...commonProps} />;
      case 'carousel':
        return <CarouselBlock {...commonProps} />;
      case 'loader':
        return <LoaderBlock {...commonProps} />;
      case 'compare':
        return <CompareBlock {...commonProps} />;
      case 'confetti':
        return <ConfettiBlock {...commonProps} />;
      case 'quote':
        return <QuoteBlock {...commonProps} />;
      case 'form-input':
        return <FormInputBlock {...commonProps} />;
      case 'chart-area':
        return <ChartAreaBlock {...commonProps} />;
      case 'chart-level':
        return <ChartLevelBlock {...commonProps} />;
      case 'list':
        return <ListBlock {...commonProps} />;
      case 'marquee':
        return <MarqueeBlock {...commonProps} />;
      case 'options-grid':
        return <OptionsGridBlock {...commonProps} />;
      case 'script':
        return <ScriptBlock {...commonProps} />;
      case 'terms':
        return <TermsBlock {...commonProps} />;

      // Componentes modulares reais da ResultPage - INLINE e EDITÁVEIS
      case 'style-card':
        return <StyleCardBlock {...commonProps} />;
      case 'before-after':
        return <BeforeAfterBlock {...commonProps} />;
      case 'bonus-section':
        return <BonusBlock {...commonProps} />;
      case 'testimonials-real':
        return <TestimonialsBlock {...commonProps} />;
      case 'guarantee-section':
        return <GuaranteeBlock {...commonProps} />;
      case 'mentor-section':
        return <MentorBlock {...commonProps} />;
      case 'secure-purchase':
        return <SecurePurchaseBlock {...commonProps} />;
      case 'value-stack':
        return <ValueStackBlock {...commonProps} />;
      case 'final-cta':
        return <FinalCTABlock {...commonProps} />;

      // Componentes modulares reais do Quiz
      case 'quiz-question':
        return <QuizQuestionBlock {...commonProps} />;
      case 'quiz-progress':
        return <QuizProgressBlock {...commonProps} />;

      // NOVOS COMPONENTES INLINE EDITÁVEIS E RESPONSIVOS
      case 'style-card-inline':
        return <StyleCardInlineBlock {...commonProps} />;
      case 'testimonial-inline':
        return <TestimonialInlineBlock {...commonProps} />;
      case 'bonus-inline':
        return <BonusInlineBlock {...commonProps} />;
      case 'cta-inline':
        return <CTAInlineBlock {...commonProps} />;
      case 'progress-inline':
        return <ProgressInlineBlock {...commonProps} />;
      case 'badge-inline':
        return <BadgeInlineBlock {...commonProps} />;
      case 'stat-inline':
        return <StatInlineBlock {...commonProps} />;
      case 'pricing-inline':
        return <PricingInlineBlock {...commonProps} />;
      case 'loader-inline':
        return <LoaderInlineBlock {...commonProps} />;
      case 'comparison-inline':
        return <ComparisonInlineBlock {...commonProps} />;
      case 'notification-inline':
        return <NotificationInlineBlock {...commonProps} />;
      case 'product-carousel':
        return <ProductCarouselBlock {...commonProps} />;

      // BLOCOS ESPECÍFICOS DO QUIZ - DADOS REAIS
      case 'QuizStartPageBlock':
        return <QuizStartPageBlock {...commonProps} />;
      case 'QuizQuestionBlock':
        return <QuizQuestionBlock {...commonProps} />;
      case 'QuestionMultipleBlock':
        return <QuestionMultipleBlock {...commonProps} />;
      case 'StrategicQuestionBlock':
        return <StrategicQuestionBlock {...commonProps} />;
      case 'QuizTransitionBlock':
        return <QuizTransitionBlock {...commonProps} />;
      case 'ResultPageBlock':
        return <ResultPageBlock {...commonProps} />;
      case 'QuizOfferPageBlock':
        return <QuizOfferPageBlock {...commonProps} />;

      // BLOCOS ESPECÍFICOS DE QUIZ/FUNNEL - SCHEMA DRIVEN
      case 'quiz-intro-page':
        return <QuizStartPageBlock {...commonProps} />;
      case 'quiz-transition-page':
        return <QuizTransitionBlock {...commonProps} />;
      case 'result-page':
        return <ResultPageBlock {...commonProps} />;
      case 'offer-page':
        return <QuizOfferPageBlock {...commonProps} />;

      // BLOCOS ESPECÍFICOS DO QUIZ - MODULARES E SCHEMA-DRIVEN
      case 'quiz-intro-header':
        return <QuizIntroHeaderBlock {...commonProps} />;
      case 'quiz-title':
        return <QuizTitleBlock {...commonProps} />;
      case 'quiz-name-input':
        return <QuizNameInputBlock {...commonProps} />;
      case 'quiz-question-main':
        return <QuestionMultipleBlock {...commonProps} />;
      case 'quiz-transition-main':
        return <QuizTransitionBlock {...commonProps} />;
      case 'quiz-question-strategic':
        return <StrategicQuestionBlock {...commonProps} />;
      case 'quiz-transition-final':
        return <QuizTransitionBlock {...commonProps} />;
      
      // NOVOS COMPONENTES ESPECÍFICOS DE PÁGINAS (Etapas 20 e 21)
      case 'modern-result-page':
        return <ModernResultPageBlock {...commonProps} />;
      case 'quiz-offer-page':
        return <QuizOfferPageBlock {...commonProps} />;
      
      // BLOCOS DE RESULTADO ANTIGOS (mantidos para compatibilidade)
      case 'quiz-result-header':
        return <ResultHeaderBlock {...commonProps} />;
      case 'quiz-result-card':
        return <ResultPageBlock {...commonProps} />;
      case 'quiz-offer-title':
        return <HeaderBlock {...commonProps} />;
      case 'quiz-offer-countdown':
        return <UrgencyTimerBlock {...commonProps} />;
      case 'quiz-offer-pricing':
        return <ProductOfferBlock {...commonProps} />;
      case 'quiz-offer-faq':
        return <FAQSectionBlock {...commonProps} />;

      // COMPONENTES INLINE BÁSICOS
      case 'main-heading-inline':
        return <HeadingInlineBlock {...commonProps} />;
      case 'text-inline':
        return <TextInlineBlock {...commonProps} />;
      case 'image-inline':
        return <ImageInlineBlock {...commonProps} />;
      case 'button-inline':
        return <ButtonInlineBlock {...commonProps} />;

      // BLOCOS AVANÇADOS RESTANTES
      case 'main-heading':
        return <HeaderBlock {...commonProps} />;
      case 'chart-compare':
        return <CompareBlock {...commonProps} />;
      case 'sales-offer':
        return <ProductOfferBlock {...commonProps} />;


      // BLOCOS UNIFICADOS DO FUNIL - Componentes reutilizáveis que garantem fidelidade visual
      case 'FunnelHeroBlock':
      case 'FunnelPainBlock':
        return <UnifiedFunnelBlock {...commonProps} />;

      // Fallback para tipos não reconhecidos
      default:
        console.warn(`Block type "${block.type}" not recognized`);
        return (
          <div className="p-4 border-2 border-dashed border-yellow-400 bg-yellow-50 rounded-lg">
            <div className="text-center">
              <h3 className="font-medium text-yellow-800 mb-2">
                Bloco não reconhecido: {block.type}
              </h3>
              <p className="text-sm text-yellow-600 mb-3">
                Este tipo de bloco ainda não está implementado no renderizador.
              </p>
              <pre className="text-xs bg-yellow-100 p-2 rounded text-left overflow-auto">
                {JSON.stringify(block.properties, null, 2)}
              </pre>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={cn(
        'relative group',
        className
      )}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      {renderBlock()}
      
      {/* Overlay de seleção */}
      {isSelected && (
        <div className="absolute inset-0 pointer-events-none ring-2 ring-blue-500 ring-opacity-50 bg-blue-500 bg-opacity-5 rounded" />
      )}
    </div>
  );
};

export default UniversalBlockRenderer;