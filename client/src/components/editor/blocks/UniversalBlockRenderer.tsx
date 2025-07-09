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
import TestimonialsRealInlineBlock from './TestimonialsRealInlineBlock';
import MentorSectionInlineBlock from './MentorSectionInlineBlock';
import BeforeAfterInlineBlock from './BeforeAfterInlineBlock';
import FAQSectionInlineBlock from './FAQSectionInlineBlock';

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
  // Props comuns para todos os blocos com larguras responsivas
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
      'block-renderer-item transition-all duration-200 w-full h-full',
      'flex flex-col min-h-[120px]', // Layout vertical interno consistente
      isSelected && 'ring-2 ring-blue-500 bg-blue-50',
      !disabled && 'cursor-pointer hover:bg-gray-50',
      className
    )
  };

  // TODOS os componentes são agora inline - removido conceito de não-inline
  const isInlineBlock = (blockType: string): boolean => {
    return true; // Todos são inline agora
  };

  // Wrapper unificado para todos os componentes
  const UnifiedWrapper: React.FC<{ children: React.ReactNode; blockType: string }> = ({ 
    children, 
    blockType 
  }) => {
    return (
      <div className="w-full h-full p-3 flex flex-col">
        {/* Header opcional para identificação */}
        <div className="text-xs text-gray-500 mb-2 font-medium opacity-75">
          {blockType}
        </div>
        {/* Conteúdo do componente */}
        <div className="flex-1 w-full min-h-0">
          {children}
        </div>
      </div>
    );
  };

  // Render do bloco baseado no tipo com wrapper unificado
  const renderBlock = () => {
    const blockType = block.type;
    
    switch (blockType) {
      // Blocos básicos - TODOS INLINE
      case 'header':
        return <UnifiedWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'text':
        return <UnifiedWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'image':
        return <UnifiedWrapper blockType={blockType}><ImageInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'button':
        return <UnifiedWrapper blockType={blockType}><ButtonInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'spacer':
        return <UnifiedWrapper blockType={blockType}><SpacerBlock {...commonProps} /></UnifiedWrapper>;

      // Blocos de resultado - INLINE
      case 'result-header':
        return <UnifiedWrapper blockType={blockType}><ResultHeaderInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'result-description':
        return <UnifiedWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></UnifiedWrapper>;

      // Blocos de oferta - INLINE
      case 'product-offer':
        return <UnifiedWrapper blockType={blockType}><PricingInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'urgency-timer':
        return <UnifiedWrapper blockType={blockType}><LoaderInlineBlock {...commonProps} /></UnifiedWrapper>;

      // Blocos de credibilidade - INLINE
      case 'faq-section':
        return <UnifiedWrapper blockType={blockType}><FAQSectionInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'testimonials':
        return <UnifiedWrapper blockType={blockType}><TestimonialInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'guarantee':
        return <UnifiedWrapper blockType={blockType}><GuaranteeBlock {...commonProps} /></UnifiedWrapper>;

      // Blocos de mídia - INLINE
      case 'video-player':
        return <UnifiedWrapper blockType={blockType}><VideoPlayerBlock {...commonProps} /></UnifiedWrapper>;
      case 'audio':
        return <UnifiedWrapper blockType={blockType}><AudioBlock {...commonProps} /></UnifiedWrapper>;

      // Blocos UI/Avançados - INLINE
      case 'alert':
        return <UnifiedWrapper blockType={blockType}><NotificationInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'arguments':
        return <UnifiedWrapper blockType={blockType}><ArgumentsBlock {...commonProps} /></UnifiedWrapper>;
      case 'carousel':
        return <UnifiedWrapper blockType={blockType}><ProductCarouselBlock {...commonProps} /></UnifiedWrapper>;
      case 'loader':
        return <UnifiedWrapper blockType={blockType}><LoaderInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'compare':
        return <UnifiedWrapper blockType={blockType}><ComparisonInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'confetti':
        return <UnifiedWrapper blockType={blockType}><ConfettiBlock {...commonProps} /></UnifiedWrapper>;
      case 'quote':
        return <UnifiedWrapper blockType={blockType}><TestimonialInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'form-input':
        return <UnifiedWrapper blockType={blockType}><FormInputBlock {...commonProps} /></UnifiedWrapper>;
      case 'chart-area':
        return <UnifiedWrapper blockType={blockType}><StatInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'chart-level':
        return <UnifiedWrapper blockType={blockType}><ProgressInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'list':
        return <UnifiedWrapper blockType={blockType}><ListBlock {...commonProps} /></UnifiedWrapper>;
      case 'marquee':
        return <UnifiedWrapper blockType={blockType}><MarqueeBlock {...commonProps} /></UnifiedWrapper>;
      case 'options-grid':
        return <UnifiedWrapper blockType={blockType}><OptionsGridBlock {...commonProps} /></UnifiedWrapper>;
      case 'script':
        return <UnifiedWrapper blockType={blockType}><ScriptBlock {...commonProps} /></UnifiedWrapper>;
      case 'terms':
        return <UnifiedWrapper blockType={blockType}><TermsBlock {...commonProps} /></UnifiedWrapper>;

      // Componentes modulares reais da ResultPage - INLINE e EDITÁVEIS (ETAPA 20)
      case 'style-card':
        return <UnifiedWrapper blockType={blockType}><StyleCardInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'before-after':
        return <UnifiedWrapper blockType={blockType}><BeforeAfterInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'bonus-section':
        return <UnifiedWrapper blockType={blockType}><BonusInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'testimonials-real':
        return <UnifiedWrapper blockType={blockType}><TestimonialsRealInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'guarantee-section':
        return <UnifiedWrapper blockType={blockType}><GuaranteeBlock {...commonProps} /></UnifiedWrapper>;
      case 'mentor-section':
        return <UnifiedWrapper blockType={blockType}><MentorSectionInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'secure-purchase':
        return <UnifiedWrapper blockType={blockType}><SecurePurchaseBlock {...commonProps} /></UnifiedWrapper>;
      case 'value-stack':
        return <UnifiedWrapper blockType={blockType}><ValueStackBlock {...commonProps} /></UnifiedWrapper>;
      case 'final-cta':
        return <UnifiedWrapper blockType={blockType}><CTAInlineBlock {...commonProps} /></UnifiedWrapper>;

      // Componentes modulares reais do Quiz - COM WRAPPER
      case 'quiz-question':
        return <UnifiedWrapper blockType={blockType}><QuizQuestionBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-progress':
        return <UnifiedWrapper blockType={blockType}><QuizProgressBlock {...commonProps} /></UnifiedWrapper>;

      // NOVOS COMPONENTES INLINE EDITÁVEIS E RESPONSIVOS
      case 'style-card-inline':
        return <UnifiedWrapper blockType={blockType}><StyleCardInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'testimonial-inline':
        return <UnifiedWrapper blockType={blockType}><TestimonialInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'bonus-inline':
        return <UnifiedWrapper blockType={blockType}><BonusInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'cta-inline':
        return <UnifiedWrapper blockType={blockType}><CTAInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'progress-inline':
        return <UnifiedWrapper blockType={blockType}><ProgressInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'badge-inline':
        return <UnifiedWrapper blockType={blockType}><BadgeInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'stat-inline':
        return <UnifiedWrapper blockType={blockType}><StatInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'pricing-inline':
        return <UnifiedWrapper blockType={blockType}><PricingInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'loader-inline':
        return <UnifiedWrapper blockType={blockType}><LoaderInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'comparison-inline':
        return <UnifiedWrapper blockType={blockType}><ComparisonInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'notification-inline':
        return <UnifiedWrapper blockType={blockType}><NotificationInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'product-carousel':
        return <UnifiedWrapper blockType={blockType}><ProductCarouselBlock {...commonProps} /></UnifiedWrapper>;
      
      // Componentes que estavam causando erro - CORRIGIDOS COM WRAPPER
      case 'testimonials-grid':
        return <UnifiedWrapper blockType={blockType}><TestimonialsGridBlock {...commonProps} /></UnifiedWrapper>;
      case 'social-proof':
        return <UnifiedWrapper blockType={blockType}><SocialProofBlock {...commonProps} /></UnifiedWrapper>;
      case 'value-anchoring':
        return <UnifiedWrapper blockType={blockType}><ValueAnchoringBlock {...commonProps} /></UnifiedWrapper>;

      // BLOCOS ESPECÍFICOS DO QUIZ - DADOS REAIS COM WRAPPER
      case 'QuizStartPageBlock':
        return <UnifiedWrapper blockType={blockType}><QuizStartPageBlock {...commonProps} /></UnifiedWrapper>;
      case 'QuizQuestionBlock':
        return <UnifiedWrapper blockType={blockType}><QuizQuestionBlock {...commonProps} /></UnifiedWrapper>;
      case 'QuestionMultipleBlock':
        return <UnifiedWrapper blockType={blockType}><QuestionMultipleBlock {...commonProps} /></UnifiedWrapper>;
      case 'StrategicQuestionBlock':
        return <UnifiedWrapper blockType={blockType}><StrategicQuestionBlock {...commonProps} /></UnifiedWrapper>;
      case 'QuizTransitionBlock':
        return <UnifiedWrapper blockType={blockType}><QuizTransitionBlock {...commonProps} /></UnifiedWrapper>;
      case 'ResultPageBlock':
        return <UnifiedWrapper blockType={blockType}><ResultPageBlock {...commonProps} /></UnifiedWrapper>;
      case 'QuizOfferPageBlock':
        return <UnifiedWrapper blockType={blockType}><QuizOfferPageBlock {...commonProps} /></UnifiedWrapper>;

      // BLOCOS ESPECÍFICOS DE QUIZ/FUNNEL - SCHEMA DRIVEN COM WRAPPER
      case 'quiz-intro-page':
        return <UnifiedWrapper blockType={blockType}><QuizStartPageBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-transition-page':
        return <UnifiedWrapper blockType={blockType}><QuizTransitionBlock {...commonProps} /></UnifiedWrapper>;
      case 'result-page':
        return <UnifiedWrapper blockType={blockType}><ResultPageBlock {...commonProps} /></UnifiedWrapper>;
      case 'offer-page':
        return <UnifiedWrapper blockType={blockType}><QuizOfferPageBlock {...commonProps} /></UnifiedWrapper>;

      // BLOCOS ESPECÍFICOS DO QUIZ - MODULARES E SCHEMA-DRIVEN COM WRAPPER
      case 'quiz-intro-header':
        return <UnifiedWrapper blockType={blockType}><QuizIntroHeaderBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-title':
        return <UnifiedWrapper blockType={blockType}><QuizTitleBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-name-input':
        return <UnifiedWrapper blockType={blockType}><QuizNameInputBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-question-main':
        return <UnifiedWrapper blockType={blockType}><QuestionMultipleBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-transition-main':
        return <UnifiedWrapper blockType={blockType}><QuizTransitionBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-question-strategic':
        return <UnifiedWrapper blockType={blockType}><StrategicQuestionBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-transition-final':
        return <UnifiedWrapper blockType={blockType}><QuizTransitionBlock {...commonProps} /></UnifiedWrapper>;
      
      // NOVOS COMPONENTES ESPECÍFICOS DE PÁGINAS (Etapas 20 e 21) COM WRAPPER
      case 'modern-result-page':
        return <UnifiedWrapper blockType={blockType}><ModernResultPageBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-offer-page':
        return <UnifiedWrapper blockType={blockType}><QuizOfferPageBlock {...commonProps} /></UnifiedWrapper>;
      
      // BLOCOS DE RESULTADO ANTIGOS (mantidos para compatibilidade) - INLINE
      case 'quiz-result-header':
        return <UnifiedWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-result-card':
        return <UnifiedWrapper blockType={blockType}><ResultPageBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-offer-title':
        return <UnifiedWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-offer-countdown':
        return <UnifiedWrapper blockType={blockType}><LoaderInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-offer-pricing':
        return <UnifiedWrapper blockType={blockType}><PricingInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-offer-faq':
        return <UnifiedWrapper blockType={blockType}><FAQSectionBlock {...commonProps} /></UnifiedWrapper>;

      // COMPONENTES INLINE BÁSICOS
      case 'main-heading-inline':
        return <UnifiedWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'text-inline':
        return <UnifiedWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'image-inline':
        return <UnifiedWrapper blockType={blockType}><ImageInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'button-inline':
        return <UnifiedWrapper blockType={blockType}><ButtonInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'comparison-table':
        return <UnifiedWrapper blockType={blockType}><ComparisonTableInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'advanced-cta':
        return <UnifiedWrapper blockType={blockType}><AdvancedCTAInlineBlock {...commonProps} /></UnifiedWrapper>;

      // COMPONENTES INLINE ESPECÍFICOS DA ETAPA 20 (RESULT PAGE) 
      case 'result-header-inline':
        return <UnifiedWrapper blockType={blockType}><ResultHeaderInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'value-stack-inline':
        return <UnifiedWrapper blockType={blockType}><ValueStackInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'cta-section-inline':
        return <UnifiedWrapper blockType={blockType}><CTASectionInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'guarantee-inline':
        return <UnifiedWrapper blockType={blockType}><GuaranteeInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'transformation-inline':
        return <UnifiedWrapper blockType={blockType}><TransformationInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'final-value-proposition-inline':
        return <UnifiedWrapper blockType={blockType}><FinalValuePropositionInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'two-columns-inline':
        return <UnifiedWrapper blockType={blockType}><TwoColumnsInlineBlock {...commonProps} /></UnifiedWrapper>;

      // BLOCOS AVANÇADOS RESTANTES - INLINE
      case 'main-heading':
        return <UnifiedWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'chart-compare':
        return <UnifiedWrapper blockType={blockType}><ComparisonInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'sales-offer':
        return <UnifiedWrapper blockType={blockType}><PricingInlineBlock {...commonProps} /></UnifiedWrapper>;


      // BLOCOS UNIFICADOS DO FUNIL - Componentes reutilizáveis que garantem fidelidade visual COM WRAPPER
      case 'FunnelHeroBlock':
      case 'FunnelPainBlock':
        return <UnifiedWrapper blockType={blockType}><UnifiedFunnelBlock {...commonProps} /></UnifiedWrapper>;

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