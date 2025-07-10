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
      // Container único elegante e minimalista
      'block-renderer-elegant w-full transition-all duration-300 ease-out',
      'flex flex-col min-h-[80px] bg-white', 
      // Seleção elegante com cor da marca (marrom) e bordas discretas
      isSelected && 'ring-1 ring-[#B89B7A]/40 bg-[#B89B7A]/5 shadow-sm',
      !disabled && 'cursor-pointer hover:bg-gray-50/50 hover:shadow-sm',
      // Responsividade
      'rounded-md overflow-hidden',
      className
    )
  };

  // TODOS os componentes são agora inline - removido conceito de não-inline
  const isInlineBlock = (blockType: string): boolean => {
    return true; // Todos são inline agora
  };

  // Wrapper elegante único - removido container duplo
  const ElegantWrapper: React.FC<{ children: React.ReactNode; blockType: string }> = ({ 
    children, 
    blockType 
  }) => {
    return (
      <div className="relative w-full h-full">
        {/* Header opcional discreto */}
        {isSelected && (
          <div className="absolute top-1 right-1 z-10">
            <span className="text-xs bg-[#B89B7A] text-white px-2 py-1 rounded-sm font-medium">
              {blockType}
            </span>
          </div>
        )}
        {/* Conteúdo direto - sem container adicional */}
        <div className="w-full h-full p-3">
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
        return <ElegantWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'text':
        return <ElegantWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'image':
        return <ElegantWrapper blockType={blockType}><ImageInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'button':
        return <ElegantWrapper blockType={blockType}><ButtonInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'spacer':
        return <ElegantWrapper blockType={blockType}><SpacerBlock {...commonProps} /></ElegantWrapper>;

      // Blocos de resultado - INLINE
      case 'result-header':
        return <ElegantWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'result-description':
        return <ElegantWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></ElegantWrapper>;

      // Blocos de oferta - INLINE
      case 'product-offer':
        return <ElegantWrapper blockType={blockType}><PricingCardInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'urgency-timer':
        return <ElegantWrapper blockType={blockType}><CountdownInlineBlock {...commonProps} /></ElegantWrapper>;

      // Blocos de credibilidade - INLINE
      case 'faq-section':
        return <ElegantWrapper blockType={blockType}><FAQSectionBlock {...commonProps} /></ElegantWrapper>;
      case 'testimonials':
        return <ElegantWrapper blockType={blockType}><TestimonialsGridBlock {...commonProps} /></ElegantWrapper>;
      case 'guarantee':
        return <ElegantWrapper blockType={blockType}><GuaranteeBlock {...commonProps} /></ElegantWrapper>;

      // Blocos de mídia - INLINE
      case 'video-player':
        return <ElegantWrapper blockType={blockType}><VideoPlayerBlock {...commonProps} /></ElegantWrapper>;
      case 'audio':
        return <ElegantWrapper blockType={blockType}><TestimonialCardInlineBlock {...commonProps} /></ElegantWrapper>;

      // Blocos UI/Avançados - INLINE com componentes mais específicos
      case 'alert':
        return <ElegantWrapper blockType={blockType}><BadgeInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'arguments':
        return <ElegantWrapper blockType={blockType}><HeadingInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'carousel':
        return <ElegantWrapper blockType={blockType}><ImageDisplayInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'loader':
        return <ElegantWrapper blockType={blockType}><LoadingAnimationBlock {...commonProps} /></ElegantWrapper>;
      case 'compare':
        return <ElegantWrapper blockType={blockType}><PricingCardInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'confetti':
        return <ElegantWrapper blockType={blockType}><BadgeInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'quote':
        return <ElegantWrapper blockType={blockType}><TestimonialCardInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'form-input':
        return <ElegantWrapper blockType={blockType}><FormInputBlock {...commonProps} /></ElegantWrapper>;
      case 'chart-area':
        return <ElegantWrapper blockType={blockType}><ImageInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'chart-level':
        return <ElegantWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'list':
        return <ElegantWrapper blockType={blockType}><ListBlock {...commonProps} /></ElegantWrapper>;
      case 'marquee':
        return <ElegantWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'options-grid':
        return <ElegantWrapper blockType={blockType}><OptionsGridBlock {...commonProps} /></ElegantWrapper>;
      case 'script':
        return <ElegantWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></ElegantWrapper>;
      case 'terms':
        return <ElegantWrapper blockType={blockType}><TextInlineBlock {...commonProps} /></ElegantWrapper>;

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