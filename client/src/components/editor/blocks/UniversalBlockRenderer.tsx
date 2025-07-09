import React from 'react';
import { cn } from '@/lib/utils';
import type { BlockData } from '@/types/blocks';

// Componentes Base do Padrão Inline
import InlineBaseWrapper from './base/InlineBaseWrapper';
import InlineEditableText from './base/InlineEditableText';

// Componentes que ainda são utilizados (não inline)
import { SpacerBlock } from './SpacerBlock';
import FAQSectionBlock from './FAQSectionBlock';
import GuaranteeBlock from './GuaranteeBlock';
import BeforeAfterBlock from './BeforeAfterBlock';
import MentorBlock from './MentorBlock';
import SecurePurchaseBlock from './SecurePurchaseBlock';
import ValueStackBlock from './ValueStackBlock';
import QuizQuestionBlock from './QuizQuestionBlock';
import QuizProgressBlock from './QuizProgressBlock';
import { VideoPlayerBlock } from './VideoPlayerBlock';
import ArgumentsBlock from './ArgumentsBlock';
import AudioBlock from './AudioBlock';
import ConfettiBlock from './ConfettiBlock';
import FormInputBlock from './FormInputBlock';
import ListBlock from './ListBlock';
import MarqueeBlock from './MarqueeBlock';
import OptionsGridBlock from './OptionsGridBlock';
import ScriptBlock from './ScriptBlock';
import TermsBlock from './TermsBlock';
import QuizStartPageBlock from './QuizStartPageBlock';
import ProductCarouselBlock from './ProductCarouselBlock';
import ResultPageBlock from './ResultPageBlock';
import QuizOfferPageBlock from './QuizOfferPageBlock';
import QuestionMultipleBlock from './QuestionMultipleBlock';
import StrategicQuestionBlock from './StrategicQuestionBlock';
import QuizTransitionBlock from './QuizTransitionBlock';
import ModernResultPageBlock from './ModernResultPageBlock';
import UnifiedFunnelBlock from './UnifiedFunnelBlock';
import TestimonialsGridBlock from './TestimonialsGridBlock';
import SocialProofBlock from './SocialProofBlock';
import ValueAnchoringBlock from './ValueAnchoringBlock';

// Blocos específicos do Quiz Intro
import QuizIntroHeaderBlock from './QuizIntroHeaderBlock';
import QuizNameInputBlock from './QuizNameInputBlock';
import QuizTitleBlock from './QuizTitleBlock';

// TODOS OS COMPONENTES INLINE editáveis
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
import ComparisonTableInlineBlock from './ComparisonTableInlineBlock';
import AdvancedCTAInlineBlock from './AdvancedCTAInlineBlock';

// Novos componentes inline para a etapa 20 (ResultPage)
import ResultHeaderInlineBlock from './ResultHeaderInlineBlock';
import ValueStackInlineBlock from './ValueStackInlineBlock';
import CTASectionInlineBlock from './CTASectionInlineBlock';
import GuaranteeInlineBlock from './GuaranteeInlineBlock';
import TransformationInlineBlock from './TransformationInlineBlock';
import FinalValuePropositionInlineBlock from './FinalValuePropositionInlineBlock';
import TwoColumnsInlineBlock from './TwoColumnsInlineBlock';

export interface BlockRendererProps {
  block: BlockData;
  isSelected?: boolean;
  onClick?: () => void;
  onSaveInline?: (blockId: string, updates: Partial<BlockData>) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Universal Block Renderer for Schema-Driven Editor (ALL INLINE)
 * Renders any block type based on its type property
 * All components are now inline-editable for better UX
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
      // Blocos básicos - TODOS INLINE
      case 'header':
        return <HeadingInlineBlock {...commonProps} />;
      case 'text':
        return <TextInlineBlock {...commonProps} />;
      case 'image':
        return <ImageInlineBlock {...commonProps} />;
      case 'button':
        return <ButtonInlineBlock {...commonProps} />;
      case 'spacer':
        return <SpacerBlock {...commonProps} />;

      // Blocos de resultado - INLINE
      case 'result-header':
        return <ResultHeaderInlineBlock {...commonProps} />;
      case 'result-description':
        return <TextInlineBlock {...commonProps} />;

      // Blocos de oferta - INLINE
      case 'product-offer':
        return <PricingInlineBlock {...commonProps} />;
      case 'urgency-timer':
        return <LoaderInlineBlock {...commonProps} />;

      // Blocos de credibilidade - INLINE
      case 'faq-section':
        return <FAQSectionBlock {...commonProps} />;
      case 'testimonials':
        return <TestimonialInlineBlock {...commonProps} />;
      case 'guarantee':
        return <GuaranteeBlock {...commonProps} />;

      // Blocos de mídia
      case 'video-player':
        return <VideoPlayerBlock {...commonProps} />;
      case 'audio':
        return <AudioBlock {...commonProps} />;

      // Blocos UI/Avançados - INLINE
      case 'alert':
        return <NotificationInlineBlock {...commonProps} />;
      case 'arguments':
        return <ArgumentsBlock {...commonProps} />;
      case 'carousel':
        return <ProductCarouselBlock {...commonProps} />;
      case 'loader':
        return <LoaderInlineBlock {...commonProps} />;
      case 'compare':
        return <ComparisonInlineBlock {...commonProps} />;
      case 'confetti':
        return <ConfettiBlock {...commonProps} />;
      case 'quote':
        return <TestimonialInlineBlock {...commonProps} />;
      case 'form-input':
        return <FormInputBlock {...commonProps} />;
      case 'chart-area':
        return <StatInlineBlock {...commonProps} />;
      case 'chart-level':
        return <ProgressInlineBlock {...commonProps} />;
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
        return <StyleCardInlineBlock {...commonProps} />;
      case 'before-after':
        return <BeforeAfterBlock {...commonProps} />;
      case 'bonus-section':
        return <BonusInlineBlock {...commonProps} />;
      case 'testimonials-real':
        return <TestimonialInlineBlock {...commonProps} />;
      case 'guarantee-section':
        return <GuaranteeBlock {...commonProps} />;
      case 'mentor-section':
        return <MentorBlock {...commonProps} />;
      case 'secure-purchase':
        return <SecurePurchaseBlock {...commonProps} />;
      case 'value-stack':
        return <ValueStackBlock {...commonProps} />;
      case 'final-cta':
        return <CTAInlineBlock {...commonProps} />;

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
      
      // Componentes que estavam causando erro - CORRIGIDOS
      case 'testimonials-grid':
        return <TestimonialsGridBlock {...commonProps} />;
      case 'social-proof':
        return <SocialProofBlock {...commonProps} />;
      case 'value-anchoring':
        return <ValueAnchoringBlock {...commonProps} />;

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
      
      // BLOCOS DE RESULTADO ANTIGOS (mantidos para compatibilidade) - INLINE
      case 'quiz-result-header':
        return <HeadingInlineBlock {...commonProps} />;
      case 'quiz-result-card':
        return <ResultPageBlock {...commonProps} />;
      case 'quiz-offer-title':
        return <HeadingInlineBlock {...commonProps} />;
      case 'quiz-offer-countdown':
        return <LoaderInlineBlock {...commonProps} />;
      case 'quiz-offer-pricing':
        return <PricingInlineBlock {...commonProps} />;
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
      case 'comparison-table':
        return <ComparisonTableInlineBlock {...commonProps} />;
      case 'advanced-cta':
        return <AdvancedCTAInlineBlock {...commonProps} />;

      // COMPONENTES INLINE ESPECÍFICOS DA ETAPA 20 (RESULT PAGE) 
      case 'result-header-inline':
        return <ResultHeaderInlineBlock {...commonProps} />;
      case 'value-stack-inline':
        return <ValueStackInlineBlock {...commonProps} />;
      case 'cta-section-inline':
        return <CTASectionInlineBlock {...commonProps} />;
      case 'guarantee-inline':
        return <GuaranteeInlineBlock {...commonProps} />;
      case 'transformation-inline':
        return <TransformationInlineBlock {...commonProps} />;
      case 'final-value-proposition-inline':
        return <FinalValuePropositionInlineBlock {...commonProps} />;
      case 'two-columns-inline':
        return <TwoColumnsInlineBlock {...commonProps} />;

      // BLOCOS AVANÇADOS RESTANTES - INLINE
      case 'main-heading':
        return <HeadingInlineBlock {...commonProps} />;
      case 'chart-compare':
        return <ComparisonInlineBlock {...commonProps} />;
      case 'sales-offer':
        return <PricingInlineBlock {...commonProps} />;


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