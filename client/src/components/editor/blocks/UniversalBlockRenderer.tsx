import React from 'react';
import { cn } from '@/lib/utils';
import type { BlockData } from '@/types/blocks';

// === COMPONENTES PRINCIPAIS DO SISTEMA ===
// Componentes de página completa (funcionais)
import QuizStartPageBlock from './QuizStartPageBlock';
import QuizOfferPageBlock from './QuizOfferPageBlock';
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
  BonusListInlineBlock
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
import TestimonialInlineBlock from './TestimonialInlineBlock';
import PricingInlineBlock from './PricingInlineBlock';
import CTAInlineBlock from './CTAInlineBlock';
import AdvancedCTAInlineBlock from './AdvancedCTAInlineBlock';

// Componentes modernos (funcionais)
import TestimonialsGridBlock from './TestimonialsGridBlock';
import SocialProofBlock from './SocialProofBlock';
import ValueAnchoringBlock from './ValueAnchoringBlock';
import FAQSectionBlock from './FAQSectionBlock';
import GuaranteeBlock from './GuaranteeBlock';
import BeforeAfterBlock from './BeforeAfterBlock';

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
        return <UnifiedWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'result-description':
        return <UnifiedWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></UnifiedWrapper>;

      // Blocos de oferta - INLINE
      case 'product-offer':
        return <UnifiedWrapper blockType={blockType}><PricingInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'urgency-timer':
        return <UnifiedWrapper blockType={blockType}><TestimonialInlineBlock {...commonProps} /></UnifiedWrapper>;

      // Blocos de credibilidade - INLINE
      case 'faq-section':
        return <UnifiedWrapper blockType={blockType}><FAQSectionBlock {...commonProps} /></UnifiedWrapper>;
      case 'testimonials':
        return <UnifiedWrapper blockType={blockType}><TestimonialInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'guarantee':
        return <UnifiedWrapper blockType={blockType}><GuaranteeBlock {...commonProps} /></UnifiedWrapper>;

      // Blocos de mídia - INLINE
      case 'video-player':
        return <UnifiedWrapper blockType={blockType}><VideoPlayerBlock {...commonProps} /></UnifiedWrapper>;
      case 'audio':
        return <UnifiedWrapper blockType={blockType}><TestimonialInlineBlock {...commonProps} /></UnifiedWrapper>;

      // Blocos UI/Avançados - INLINE
      case 'alert':
        return <UnifiedWrapper blockType={blockType}><TestimonialInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'arguments':
        return <UnifiedWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'carousel':
        return <UnifiedWrapper blockType={blockType}><ImageInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'loader':
        return <UnifiedWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'compare':
        return <UnifiedWrapper blockType={blockType}><PricingInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'confetti':
        return <UnifiedWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'quote':
        return <UnifiedWrapper blockType={blockType}><TestimonialInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'form-input':
        return <UnifiedWrapper blockType={blockType}><FormInputBlock {...commonProps} /></UnifiedWrapper>;
      case 'chart-area':
        return <UnifiedWrapper blockType={blockType}><ImageInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'chart-level':
        return <UnifiedWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'list':
        return <UnifiedWrapper blockType={blockType}><ListBlock {...commonProps} /></UnifiedWrapper>;
      case 'marquee':
        return <UnifiedWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'options-grid':
        return <UnifiedWrapper blockType={blockType}><OptionsGridBlock {...commonProps} /></UnifiedWrapper>;
      case 'script':
        return <UnifiedWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'terms':
        return <UnifiedWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></UnifiedWrapper>;

      // Componentes modulares reais da ResultPage - INLINE e EDITÁVEIS (ETAPA 20)
      case 'style-card':
        return <UnifiedWrapper blockType={blockType}><PricingInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'before-after':
        return <UnifiedWrapper blockType={blockType}><BeforeAfterBlock {...commonProps} /></UnifiedWrapper>;
      case 'bonus-section':
        return <UnifiedWrapper blockType={blockType}><TestimonialInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'testimonials-real':
        return <UnifiedWrapper blockType={blockType}><TestimonialInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'guarantee-section':
        return <UnifiedWrapper blockType={blockType}><GuaranteeBlock {...commonProps} /></UnifiedWrapper>;
      case 'mentor-section':
        return <UnifiedWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'secure-purchase':
        return <UnifiedWrapper blockType={blockType}><ButtonInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'value-stack':
        return <UnifiedWrapper blockType={blockType}><PricingInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'final-cta':
        return <UnifiedWrapper blockType={blockType}><CTAInlineBlock {...commonProps} /></UnifiedWrapper>;

      // Componentes modulares das Etapas 20 e 21 - INLINE e MODULARES
      case 'result-header-inline':
        return <UnifiedWrapper blockType={blockType}><ResultHeaderInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'testimonials-result':
        return <UnifiedWrapper blockType={blockType}><TestimonialsInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-offer-pricing':
        return <UnifiedWrapper blockType={blockType}><QuizOfferPricingInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'countdown-timer':
        return <UnifiedWrapper blockType={blockType}><CountdownInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'bonus-list':
        return <UnifiedWrapper blockType={blockType}><BonusListInlineBlock {...commonProps} /></UnifiedWrapper>;

      // NOVOS BLOCOS INLINE MODULARES - ES7+ PADRÃO (Etapas 20 e 21)
      case 'result-card-inline':
        return <UnifiedWrapper blockType={blockType}><ResultCardInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-offer-pricing-inline':
        return <UnifiedWrapper blockType={blockType}><QuizOfferPricingInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'countdown-inline':
        return <UnifiedWrapper blockType={blockType}><CountdownInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'button-inline':
        return <UnifiedWrapper blockType={blockType}><ButtonInlineBlock {...commonProps} /></UnifiedWrapper>;

      // === COMPONENTES INLINE ADICIONAIS FUNCIONAIS (ES7+) ===
      case 'text-inline':
        return <UnifiedWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'heading-inline':
      case 'main-heading-inline':
        return <UnifiedWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'image-inline':
        return <UnifiedWrapper blockType={blockType}><ImageDisplayInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'style-card-inline':
        return <UnifiedWrapper blockType={blockType}><StyleCardInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'stat-inline':
        return <UnifiedWrapper blockType={blockType}><StatInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'badge-inline':
        return <UnifiedWrapper blockType={blockType}><BadgeInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'progress-inline':
        return <UnifiedWrapper blockType={blockType}><ProgressInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'pricing-inline':
      case 'pricing-card-inline':
        return <UnifiedWrapper blockType={blockType}><PricingCardInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'testimonial-inline':
      case 'testimonial-card-inline':
        return <UnifiedWrapper blockType={blockType}><TestimonialCardInlineBlock {...commonProps} /></UnifiedWrapper>;

      // Componentes modulares reais do Quiz - COM WRAPPER
      case 'quiz-question':
        return <UnifiedWrapper blockType={blockType}><QuizQuestionBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-progress':
        return <UnifiedWrapper blockType={blockType}><QuizProgressBlock {...commonProps} /></UnifiedWrapper>;

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
        return <UnifiedWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-title':
        return <UnifiedWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-name-input':
        return <UnifiedWrapper blockType={blockType}><FormInputBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-question-main':
        return <UnifiedWrapper blockType={blockType}><QuestionMultipleBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-transition-main':
        return <UnifiedWrapper blockType={blockType}><QuizTransitionBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-question-strategic':
        return <UnifiedWrapper blockType={blockType}><StrategicQuestionBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-transition-final':
        return <UnifiedWrapper blockType={blockType}><QuizTransitionBlock {...commonProps} /></UnifiedWrapper>;
      
      // BLOCOS DE RESULTADO ANTIGOS (mantidos para compatibilidade) - INLINE
      case 'quiz-result-header':
        return <UnifiedWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-result-card':
        return <UnifiedWrapper blockType={blockType}><PricingInlineBlock {...commonProps} /></UnifiedWrapper>;

      // NOVOS MAPEAMENTOS PARA TIPOS DO SCHEMA SERVICE
      case 'quiz-offer-title':
        return <UnifiedWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-offer-countdown':
        return <UnifiedWrapper blockType={blockType}><CountdownInlineBlock {...commonProps} /></UnifiedWrapper>;
      case 'quiz-offer-faq':
        return <UnifiedWrapper blockType={blockType}><FAQSectionBlock {...commonProps} /></UnifiedWrapper>;
        
      // FALLBACK PARA COMPONENTES GENÉRICOS
      default:
        return <UnifiedWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></UnifiedWrapper>;
    }
  };

  return (
    <div className="universal-block-renderer">
      {renderBlock()}
    </div>
  );
};

export default UniversalBlockRenderer;