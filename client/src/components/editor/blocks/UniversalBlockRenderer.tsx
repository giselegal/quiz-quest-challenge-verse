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

      // BLOCOS ESPECÍFICOS DO QUIZ INTRO - LAYOUT ESTRUTURADO
      case 'quiz-intro-header':
        return <QuizIntroHeaderBlock {...commonProps} />;
      case 'quiz-name-input':
        return <QuizNameInputBlock {...commonProps} />;
      case 'quiz-title':
        return <QuizTitleBlock {...commonProps} />;

      // BLOCOS DE PASSOS DO FUNIL
      case 'funnel-intro':
        return (
          <FunnelIntroStep
            id={block.id || 'funnel-intro'}
            stepType="intro"
            stepNumber={1}
            totalSteps={3}
            data={block.properties}
            className={commonProps.className}
            style={{}}
            isEditable={!disabled}
            onEdit={onClick}
          />
        );
      case 'funnel-offer-transition':
        return (
          <OfferTransitionStep
            id={block.id || 'offer-transition'}
            stepType="offer-transition"
            stepNumber={2}
            totalSteps={3}
            data={block.properties}
            className={commonProps.className}
            style={{}}
            isEditable={!disabled}
            onEdit={onClick}
          />
        );
      case 'funnel-offer-page':
        return (
          <OfferPageStep
            id={block.id || 'offer-page'}
            stepType="offer-page"
            stepNumber={3}
            totalSteps={3}
            data={block.properties}
            className={commonProps.className}
            style={{}}
            isEditable={!disabled}
            onEdit={onClick}
          />
        );

      // NOVOS BLOCOS ESPECÍFICOS DE FUNIL - EDITÁVEIS
      case 'rich-text':
        return (
          <div {...commonProps} className={cn("prose max-w-none p-4", commonProps.className)}>
            {block.properties?.content ? (
              <div dangerouslySetInnerHTML={{ __html: block.properties.content }} />
            ) : (
              <p className="text-gray-500 italic">Clique para editar o conteúdo...</p>
            )}
          </div>
        );
      
      case 'quiz-transition':
        return <QuizTransitionBlock {...commonProps} />;
      
      case 'funnel-name-collect':
        return (
          <div {...commonProps} className={cn("p-6 bg-white rounded-lg border", commonProps.className)}>
            <h3 className="text-lg font-semibold mb-4">
              {block.properties?.title || 'Coleta de Nome'}
            </h3>
            <input 
              type="text" 
              placeholder={block.properties?.placeholder || 'Digite seu nome'} 
              className="w-full p-3 border rounded-lg"
              disabled={disabled}
            />
            {block.properties?.subtitle && (
              <p className="mt-2 text-sm text-gray-600">{block.properties.subtitle}</p>
            )}
          </div>
        );
      
      case 'funnel-quiz-intro':
        return (
          <div {...commonProps} className={cn("p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg", commonProps.className)}>
            <h2 className="text-2xl font-bold mb-4">
              {block.properties?.title || 'Quiz Introdução'}
            </h2>
            {block.properties?.description && (
              <p className="text-gray-700 mb-4">{block.properties.description}</p>
            )}
            {block.properties?.bullets && Array.isArray(block.properties.bullets) && (
              <ul className="space-y-2 mb-4">
                {block.properties.bullets.map((bullet: any, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>{typeof bullet === 'string' ? bullet : (bullet[''] || bullet.text || 'Item')}</span>
                  </li>
                ))}
              </ul>
            )}
            {block.properties?.buttonText && (
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                {block.properties.buttonText}
              </button>
            )}
          </div>
        );
      
      case 'funnel-transition':
        return (
          <div {...commonProps} className={cn("p-6 bg-gray-50 rounded-lg text-center", commonProps.className)}>
            <h3 className="text-xl font-semibold mb-2">
              {block.properties?.title || 'Transição'}
            </h3>
            <p className="text-gray-600">
              {block.properties?.subtitle || 'Processando...'}
            </p>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${block.properties?.progress || 50}%` }}
              />
            </div>
          </div>
        );
      
      case 'funnel-result-intro':
        return (
          <div {...commonProps} className={cn("p-6 bg-green-50 rounded-lg", commonProps.className)}>
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              {block.properties?.title || 'Resultado'}
            </h2>
            <p className="text-green-700">
              {block.properties?.description || 'Aqui está o seu resultado!'}
            </p>
            {block.properties?.imageUrl && (
              <img 
                src={block.properties.imageUrl} 
                alt="Resultado" 
                className="mt-4 max-w-full h-auto rounded-lg"
              />
            )}
          </div>
        );
      
      case 'funnel-result-details':
        return (
          <div {...commonProps} className={cn("p-6 bg-white rounded-lg border-l-4 border-green-500", commonProps.className)}>
            <h3 className="font-semibold mb-2">
              {block.properties?.title || 'Detalhes do Resultado'}
            </h3>
            <p className="text-gray-600">
              {block.properties?.details || 'Detalhes específicos do resultado.'}
            </p>
            {block.properties?.recommendations && Array.isArray(block.properties.recommendations) && (
              <ul className="mt-3 space-y-1">
                {block.properties.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="text-sm text-gray-600">• {rec}</li>
                ))}
              </ul>
            )}
          </div>
        );
      
      case 'funnel-step':
        return (
          <div {...commonProps} className={cn("p-6 bg-white rounded-lg border shadow-sm", commonProps.className)}>
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                {block.properties?.stepNumber || '1'}
              </span>
              <h3 className="text-lg font-semibold">
                {block.properties?.title || 'Etapa do Funil'}
              </h3>
            </div>
            <p className="text-gray-600">
              {block.properties?.description || 'Descrição da etapa.'}
            </p>
            {block.properties?.actionText && (
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                {block.properties.actionText}
              </button>
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