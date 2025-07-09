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
      'block-renderer-item transition-all duration-200 w-full',
      'flex-1 min-w-0', // Flex item que pode shrink
      isSelected && 'ring-2 ring-blue-500 bg-blue-50',
      !disabled && 'cursor-pointer hover:bg-gray-50',
      className
    )
  };

  // Determinar se o bloco deve ser inline horizontal
  const isInlineBlock = (blockType: string): boolean => {
    const inlineTypes = [
      'header', 'text', 'image', 'button', 'spacer',
      'result-header', 'style-card', 'before-after', 'bonus-section',
      'testimonials-real', 'guarantee-section', 'mentor-section',
      'cta-inline', 'pricing-inline', 'badge-inline', 'stat-inline',
      'notification-inline', 'testimonial-inline', 'loader-inline'
    ];
    return inlineTypes.includes(blockType) || blockType.includes('-inline');
  };

  // Wrapper para componentes não-inline
  const InlineWrapper: React.FC<{ children: React.ReactNode; blockType: string }> = ({ 
    children, 
    blockType 
  }) => {
    if (isInlineBlock(blockType)) {
      return <>{children}</>;
    }
    
    // Wrapper para tornar componentes não-inline compatíveis com layout horizontal
    return (
      <div className="w-full min-w-0 flex-1 p-2 border border-gray-200 rounded-lg bg-white">
        <div className="text-xs text-gray-500 mb-1 font-medium">{blockType}</div>
        <div className="w-full">{children}</div>
      </div>
    );
  };

  // Render do bloco baseado no tipo com wrapper inline
  const renderBlock = () => {
    const blockType = block.type;
    
    switch (blockType) {
      // Blocos básicos - TODOS INLINE
      case 'header':
        return <InlineWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></InlineWrapper>;
      case 'text':
        return <InlineWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></InlineWrapper>;
      case 'image':
        return <InlineWrapper blockType={blockType}><ImageInlineBlock {...commonProps} /></InlineWrapper>;
      case 'button':
        return <InlineWrapper blockType={blockType}><ButtonInlineBlock {...commonProps} /></InlineWrapper>;
      case 'spacer':
        return <InlineWrapper blockType={blockType}><SpacerBlock {...commonProps} /></InlineWrapper>;

      // Blocos de resultado - INLINE
      case 'result-header':
        return <InlineWrapper blockType={blockType}><ResultHeaderInlineBlock {...commonProps} /></InlineWrapper>;
      case 'result-description':
        return <InlineWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></InlineWrapper>;

      // Blocos de oferta - INLINE
      case 'product-offer':
        return <InlineWrapper blockType={blockType}><PricingInlineBlock {...commonProps} /></InlineWrapper>;
      case 'urgency-timer':
        return <InlineWrapper blockType={blockType}><LoaderInlineBlock {...commonProps} /></InlineWrapper>;

      // Blocos de credibilidade - INLINE com wrapper
      case 'faq-section':
        return <InlineWrapper blockType={blockType}><FAQSectionBlock {...commonProps} /></InlineWrapper>;
      case 'testimonials':
        return <InlineWrapper blockType={blockType}><TestimonialInlineBlock {...commonProps} /></InlineWrapper>;
      case 'guarantee':
        return <InlineWrapper blockType={blockType}><GuaranteeBlock {...commonProps} /></InlineWrapper>;

      // Blocos de mídia - COM WRAPPER
      case 'video-player':
        return <InlineWrapper blockType={blockType}><VideoPlayerBlock {...commonProps} /></InlineWrapper>;
      case 'audio':
        return <InlineWrapper blockType={blockType}><AudioBlock {...commonProps} /></InlineWrapper>;

      // Blocos UI/Avançados - INLINE
      case 'alert':
        return <InlineWrapper blockType={blockType}><NotificationInlineBlock {...commonProps} /></InlineWrapper>;
      case 'arguments':
        return <InlineWrapper blockType={blockType}><ArgumentsBlock {...commonProps} /></InlineWrapper>;
      case 'carousel':
        return <InlineWrapper blockType={blockType}><ProductCarouselBlock {...commonProps} /></InlineWrapper>;
      case 'loader':
        return <InlineWrapper blockType={blockType}><LoaderInlineBlock {...commonProps} /></InlineWrapper>;
      case 'compare':
        return <InlineWrapper blockType={blockType}><ComparisonInlineBlock {...commonProps} /></InlineWrapper>;
      case 'confetti':
        return <InlineWrapper blockType={blockType}><ConfettiBlock {...commonProps} /></InlineWrapper>;
      case 'quote':
        return <InlineWrapper blockType={blockType}><TestimonialInlineBlock {...commonProps} /></InlineWrapper>;
      case 'form-input':
        return <InlineWrapper blockType={blockType}><FormInputBlock {...commonProps} /></InlineWrapper>;
      case 'chart-area':
        return <InlineWrapper blockType={blockType}><StatInlineBlock {...commonProps} /></InlineWrapper>;
      case 'chart-level':
        return <InlineWrapper blockType={blockType}><ProgressInlineBlock {...commonProps} /></InlineWrapper>;
      case 'list':
        return <InlineWrapper blockType={blockType}><ListBlock {...commonProps} /></InlineWrapper>;
      case 'marquee':
        return <InlineWrapper blockType={blockType}><MarqueeBlock {...commonProps} /></InlineWrapper>;
      case 'options-grid':
        return <InlineWrapper blockType={blockType}><OptionsGridBlock {...commonProps} /></InlineWrapper>;
      case 'script':
        return <InlineWrapper blockType={blockType}><ScriptBlock {...commonProps} /></InlineWrapper>;
      case 'terms':
        return <InlineWrapper blockType={blockType}><TermsBlock {...commonProps} /></InlineWrapper>;

      // Componentes modulares reais da ResultPage - INLINE e EDITÁVEIS (ETAPA 20)
      case 'style-card':
        return <InlineWrapper blockType={blockType}><StyleCardInlineBlock {...commonProps} /></InlineWrapper>;
      case 'before-after':
        return <InlineWrapper blockType={blockType}><BeforeAfterBlock {...commonProps} /></InlineWrapper>;
      case 'bonus-section':
        return <InlineWrapper blockType={blockType}><BonusInlineBlock {...commonProps} /></InlineWrapper>;
      case 'testimonials-real':
        return <InlineWrapper blockType={blockType}><TestimonialInlineBlock {...commonProps} /></InlineWrapper>;
      case 'guarantee-section':
        return <InlineWrapper blockType={blockType}><GuaranteeBlock {...commonProps} /></InlineWrapper>;
      case 'mentor-section':
        return <InlineWrapper blockType={blockType}><MentorBlock {...commonProps} /></InlineWrapper>;
      case 'secure-purchase':
        return <InlineWrapper blockType={blockType}><SecurePurchaseBlock {...commonProps} /></InlineWrapper>;
      case 'value-stack':
        return <InlineWrapper blockType={blockType}><ValueStackBlock {...commonProps} /></InlineWrapper>;
      case 'final-cta':
        return <InlineWrapper blockType={blockType}><CTAInlineBlock {...commonProps} /></InlineWrapper>;

      // Componentes modulares reais do Quiz - COM WRAPPER
      case 'quiz-question':
        return <InlineWrapper blockType={blockType}><QuizQuestionBlock {...commonProps} /></InlineWrapper>;
      case 'quiz-progress':
        return <InlineWrapper blockType={blockType}><QuizProgressBlock {...commonProps} /></InlineWrapper>;

      // NOVOS COMPONENTES INLINE EDITÁVEIS E RESPONSIVOS
      case 'style-card-inline':
        return <InlineWrapper blockType={blockType}><StyleCardInlineBlock {...commonProps} /></InlineWrapper>;
      case 'testimonial-inline':
        return <InlineWrapper blockType={blockType}><TestimonialInlineBlock {...commonProps} /></InlineWrapper>;
      case 'bonus-inline':
        return <InlineWrapper blockType={blockType}><BonusInlineBlock {...commonProps} /></InlineWrapper>;
      case 'cta-inline':
        return <InlineWrapper blockType={blockType}><CTAInlineBlock {...commonProps} /></InlineWrapper>;
      case 'progress-inline':
        return <InlineWrapper blockType={blockType}><ProgressInlineBlock {...commonProps} /></InlineWrapper>;
      case 'badge-inline':
        return <InlineWrapper blockType={blockType}><BadgeInlineBlock {...commonProps} /></InlineWrapper>;
      case 'stat-inline':
        return <InlineWrapper blockType={blockType}><StatInlineBlock {...commonProps} /></InlineWrapper>;
      case 'pricing-inline':
        return <InlineWrapper blockType={blockType}><PricingInlineBlock {...commonProps} /></InlineWrapper>;
      case 'loader-inline':
        return <InlineWrapper blockType={blockType}><LoaderInlineBlock {...commonProps} /></InlineWrapper>;
      case 'comparison-inline':
        return <InlineWrapper blockType={blockType}><ComparisonInlineBlock {...commonProps} /></InlineWrapper>;
      case 'notification-inline':
        return <InlineWrapper blockType={blockType}><NotificationInlineBlock {...commonProps} /></InlineWrapper>;
      case 'product-carousel':
        return <InlineWrapper blockType={blockType}><ProductCarouselBlock {...commonProps} /></InlineWrapper>;
      
      // Componentes que estavam causando erro - CORRIGIDOS COM WRAPPER
      case 'testimonials-grid':
        return <InlineWrapper blockType={blockType}><TestimonialsGridBlock {...commonProps} /></InlineWrapper>;
      case 'social-proof':
        return <InlineWrapper blockType={blockType}><SocialProofBlock {...commonProps} /></InlineWrapper>;
      case 'value-anchoring':
        return <InlineWrapper blockType={blockType}><ValueAnchoringBlock {...commonProps} /></InlineWrapper>;

      // BLOCOS ESPECÍFICOS DO QUIZ - DADOS REAIS COM WRAPPER
      case 'QuizStartPageBlock':
        return <InlineWrapper blockType={blockType}><QuizStartPageBlock {...commonProps} /></InlineWrapper>;
      case 'QuizQuestionBlock':
        return <InlineWrapper blockType={blockType}><QuizQuestionBlock {...commonProps} /></InlineWrapper>;
      case 'QuestionMultipleBlock':
        return <InlineWrapper blockType={blockType}><QuestionMultipleBlock {...commonProps} /></InlineWrapper>;
      case 'StrategicQuestionBlock':
        return <InlineWrapper blockType={blockType}><StrategicQuestionBlock {...commonProps} /></InlineWrapper>;
      case 'QuizTransitionBlock':
        return <InlineWrapper blockType={blockType}><QuizTransitionBlock {...commonProps} /></InlineWrapper>;
      case 'ResultPageBlock':
        return <InlineWrapper blockType={blockType}><ResultPageBlock {...commonProps} /></InlineWrapper>;
      case 'QuizOfferPageBlock':
        return <InlineWrapper blockType={blockType}><QuizOfferPageBlock {...commonProps} /></InlineWrapper>;

      // BLOCOS ESPECÍFICOS DE QUIZ/FUNNEL - SCHEMA DRIVEN COM WRAPPER
      case 'quiz-intro-page':
        return <InlineWrapper blockType={blockType}><QuizStartPageBlock {...commonProps} /></InlineWrapper>;
      case 'quiz-transition-page':
        return <InlineWrapper blockType={blockType}><QuizTransitionBlock {...commonProps} /></InlineWrapper>;
      case 'result-page':
        return <InlineWrapper blockType={blockType}><ResultPageBlock {...commonProps} /></InlineWrapper>;
      case 'offer-page':
        return <InlineWrapper blockType={blockType}><QuizOfferPageBlock {...commonProps} /></InlineWrapper>;

      // BLOCOS ESPECÍFICOS DO QUIZ - MODULARES E SCHEMA-DRIVEN COM WRAPPER
      case 'quiz-intro-header':
        return <InlineWrapper blockType={blockType}><QuizIntroHeaderBlock {...commonProps} /></InlineWrapper>;
      case 'quiz-title':
        return <InlineWrapper blockType={blockType}><QuizTitleBlock {...commonProps} /></InlineWrapper>;
      case 'quiz-name-input':
        return <InlineWrapper blockType={blockType}><QuizNameInputBlock {...commonProps} /></InlineWrapper>;
      case 'quiz-question-main':
        return <InlineWrapper blockType={blockType}><QuestionMultipleBlock {...commonProps} /></InlineWrapper>;
      case 'quiz-transition-main':
        return <InlineWrapper blockType={blockType}><QuizTransitionBlock {...commonProps} /></InlineWrapper>;
      case 'quiz-question-strategic':
        return <InlineWrapper blockType={blockType}><StrategicQuestionBlock {...commonProps} /></InlineWrapper>;
      case 'quiz-transition-final':
        return <InlineWrapper blockType={blockType}><QuizTransitionBlock {...commonProps} /></InlineWrapper>;
      
      // NOVOS COMPONENTES ESPECÍFICOS DE PÁGINAS (Etapas 20 e 21) COM WRAPPER
      case 'modern-result-page':
        return <InlineWrapper blockType={blockType}><ModernResultPageBlock {...commonProps} /></InlineWrapper>;
      case 'quiz-offer-page':
        return <InlineWrapper blockType={blockType}><QuizOfferPageBlock {...commonProps} /></InlineWrapper>;
      
      // BLOCOS DE RESULTADO ANTIGOS (mantidos para compatibilidade) - INLINE
      case 'quiz-result-header':
        return <InlineWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></InlineWrapper>;
      case 'quiz-result-card':
        return <InlineWrapper blockType={blockType}><ResultPageBlock {...commonProps} /></InlineWrapper>;
      case 'quiz-offer-title':
        return <InlineWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></InlineWrapper>;
      case 'quiz-offer-countdown':
        return <InlineWrapper blockType={blockType}><LoaderInlineBlock {...commonProps} /></InlineWrapper>;
      case 'quiz-offer-pricing':
        return <InlineWrapper blockType={blockType}><PricingInlineBlock {...commonProps} /></InlineWrapper>;
      case 'quiz-offer-faq':
        return <InlineWrapper blockType={blockType}><FAQSectionBlock {...commonProps} /></InlineWrapper>;

      // COMPONENTES INLINE BÁSICOS
      case 'main-heading-inline':
        return <InlineWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></InlineWrapper>;
      case 'text-inline':
        return <InlineWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></InlineWrapper>;
      case 'image-inline':
        return <InlineWrapper blockType={blockType}><ImageInlineBlock {...commonProps} /></InlineWrapper>;
      case 'button-inline':
        return <InlineWrapper blockType={blockType}><ButtonInlineBlock {...commonProps} /></InlineWrapper>;
      case 'comparison-table':
        return <InlineWrapper blockType={blockType}><ComparisonTableInlineBlock {...commonProps} /></InlineWrapper>;
      case 'advanced-cta':
        return <InlineWrapper blockType={blockType}><AdvancedCTAInlineBlock {...commonProps} /></InlineWrapper>;

      // COMPONENTES INLINE ESPECÍFICOS DA ETAPA 20 (RESULT PAGE) 
      case 'result-header-inline':
        return <InlineWrapper blockType={blockType}><ResultHeaderInlineBlock {...commonProps} /></InlineWrapper>;
      case 'value-stack-inline':
        return <InlineWrapper blockType={blockType}><ValueStackInlineBlock {...commonProps} /></InlineWrapper>;
      case 'cta-section-inline':
        return <InlineWrapper blockType={blockType}><CTASectionInlineBlock {...commonProps} /></InlineWrapper>;
      case 'guarantee-inline':
        return <InlineWrapper blockType={blockType}><GuaranteeInlineBlock {...commonProps} /></InlineWrapper>;
      case 'transformation-inline':
        return <InlineWrapper blockType={blockType}><TransformationInlineBlock {...commonProps} /></InlineWrapper>;
      case 'final-value-proposition-inline':
        return <InlineWrapper blockType={blockType}><FinalValuePropositionInlineBlock {...commonProps} /></InlineWrapper>;
      case 'two-columns-inline':
        return <InlineWrapper blockType={blockType}><TwoColumnsInlineBlock {...commonProps} /></InlineWrapper>;

      // BLOCOS AVANÇADOS RESTANTES - INLINE
      case 'main-heading':
        return <InlineWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></InlineWrapper>;
      case 'chart-compare':
        return <InlineWrapper blockType={blockType}><ComparisonInlineBlock {...commonProps} /></InlineWrapper>;
      case 'sales-offer':
        return <InlineWrapper blockType={blockType}><PricingInlineBlock {...commonProps} /></InlineWrapper>;


      // BLOCOS UNIFICADOS DO FUNIL - Componentes reutilizáveis que garantem fidelidade visual COM WRAPPER
      case 'FunnelHeroBlock':
      case 'FunnelPainBlock':
        return <InlineWrapper blockType={blockType}><UnifiedFunnelBlock {...commonProps} /></InlineWrapper>;

      // ETAPA 20 - USAR COMPONENTES INDIVIDUAIS DA CATEGORIA "RESULTADO"
      case 'quiz-resultado-completo':
        return (
          <div className="p-6 bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg text-center">
            <h3 className="font-bold text-blue-800 mb-2">
              🎯 Etapa 20 - Resultado
            </h3>
            <p className="text-blue-600 text-sm mb-4">
              Use os 7 componentes individuais da categoria "Resultado" na sidebar:
            </p>
            <div className="text-left text-xs text-blue-700 space-y-1">
              <div>• result-header - Cabeçalho de Resultado</div>
              <div>• style-card - Card do Estilo</div>
              <div>• before-after - Antes e Depois</div>
              <div>• bonus-section - Seção de Bônus</div>
              <div>• testimonials-real - Depoimentos Reais</div>
              <div>• guarantee-section - Seção de Garantia</div>
              <div>• mentor-section - Seção da Mentora</div>
            </div>
            <p className="text-blue-600 text-xs mt-4">
              Arraste cada componente individualmente da sidebar para criar a etapa 20.
            </p>
          </div>
        );

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
        'relative group w-full flex-1 min-w-0',
        className
      )}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      {renderBlock()}
      
      {/* Overlay de seleção mais discreto */}
      {isSelected && (
        <div className="absolute inset-0 pointer-events-none ring-1 ring-blue-400 ring-opacity-60 bg-blue-500 bg-opacity-[0.02] rounded-md" />
      )}
    </div>
  );
};

export default UniversalBlockRenderer;