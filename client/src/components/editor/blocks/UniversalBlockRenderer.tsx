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
import QuizQuestionBlock from './QuizQuestionBlock';
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
        return <TestimonialsBlock {...commonProps} />;
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
      case 'quiz-question':
        return <QuizQuestionBlock {...commonProps} />;
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

      // BLOCOS AVANÇADOS RESTANTES
      case 'main-heading':
        return <HeaderBlock {...commonProps} />;
      case 'chart-compare':
        return <CompareBlock {...commonProps} />;
      case 'testimonials-grid':
        return <TestimonialsBlock {...commonProps} />;
      case 'guarantee-section':
        return <GuaranteeBlock {...commonProps} />;
      case 'sales-offer':
        return <ProductOfferBlock {...commonProps} />;
      case 'bonus-section':
        return (
          <div {...commonProps} className={cn("p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-500", commonProps.className)}>
            <h3 className="text-lg font-semibold text-green-800 mb-4">
              {block.properties?.title || 'Bônus Especial'}
            </h3>
            <p className="text-green-700 mb-4">
              {block.properties?.description || 'Descrição do bônus especial incluso.'}
            </p>
            {block.properties?.bonuses && Array.isArray(block.properties.bonuses) && (
              <ul className="space-y-2">
                {block.properties.bonuses.map((bonus: any, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">🎁</span>
                    <span className="text-green-700">{typeof bonus === 'string' ? bonus : (bonus.title || bonus.text || 'Bônus')}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

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