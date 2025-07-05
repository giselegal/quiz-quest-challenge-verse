import React from 'react';
import { HeaderBlock } from './HeaderBlock';
import { TextBlock } from './TextBlock';
import { ImageBlock } from './ImageBlock';
import { ButtonBlock } from './ButtonBlock';
import { SpacerBlock } from './SpacerBlock';
import { ResultHeaderBlock } from './ResultHeaderBlock';
import { ResultDescriptionBlock } from './ResultDescriptionBlock';
import { ProductOfferBlock } from './ProductOfferBlock';
import { UrgencyTimerBlock } from './UrgencyTimerBlock';
import { FAQSectionBlock } from './FAQSectionBlock';
import { TestimonialsBlock } from './TestimonialsBlock';
import { GuaranteeBlock } from './GuaranteeBlock';
import { VideoPlayerBlock } from './VideoPlayerBlock';
import QuizIntroBlock from '@/components/blocks/quiz/QuizIntroBlock';
import QuizQuestionBlock from './QuizQuestionBlock';
import StrategicQuestionBlock from './StrategicQuestionBlock';
import QuizTransitionBlock from './QuizTransitionBlock';

export interface BlockData {
  id: string;
  type: string;
  properties: Record<string, any>;
}

interface BlockRendererProps {
  block: BlockData;
  isSelected?: boolean;
  onClick?: () => void;
  onSaveInline?: (key: string) => (newValue: string) => void;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ 
  block, 
  isSelected = false, 
  onClick,
  onSaveInline
}) => {
  const commonProps = {
    properties: block.properties,
    isSelected,
    onClick,
    onSaveInline
  };

  switch (block.type) {
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
    
    case 'result-header':
      return <ResultHeaderBlock {...commonProps} />;
    
    case 'result-description':
      return <ResultDescriptionBlock {...commonProps} />;
    
    case 'product-offer':
      return <ProductOfferBlock {...commonProps} />;
    
    case 'urgency-timer':
      return <UrgencyTimerBlock {...commonProps} />;
    
    case 'faq-section':
      return <FAQSectionBlock {...commonProps} />;
    
    case 'testimonials':
      return <TestimonialsBlock {...commonProps} />;
    
    case 'guarantee':
      return <GuaranteeBlock {...commonProps} />;
    
    case 'video-player':
      return <VideoPlayerBlock {...commonProps} />;
    
    // NOVOS COMPONENTES SCHEMA-DRIVEN DO QUIZ
    
    case 'quiz-intro':
      return <QuizIntroBlock 
        block={block}
        isSelected={isSelected}
        onClick={onClick}
        onPropertyChange={(key: string, value: any) => {
          // Callback para mudanças de propriedade
          console.log('Property changed:', key, value);
        }}
      />;
    
    case 'quiz-question':
      return <QuizQuestionBlock 
        block={block}
        isSelected={isSelected}
        onClick={onClick}
        onPropertyChange={(key: string, value: any) => {
          console.log('Property changed:', key, value);
        }}
        onAnswer={(answers: any) => {
          console.log('Question answered:', answers);
        }}
        onNext={() => {
          console.log('Next question');
        }}
        onPrevious={() => {
          console.log('Previous question');
        }}
      />;
    
    case 'strategic-question':
      return <StrategicQuestionBlock 
        block={block}
        isSelected={isSelected}
        onClick={onClick}
        onPropertyChange={(key: string, value: any) => {
          console.log('Property changed:', key, value);
        }}
        onAnswer={(answer: any) => {
          console.log('Strategic question answered:', answer);
        }}
        onNext={() => {
          console.log('Next strategic question');
        }}
        onPrevious={() => {
          console.log('Previous question');
        }}
      />;
    
    case 'quiz-transition':
      return <QuizTransitionBlock 
        block={block}
        isSelected={isSelected}
        onClick={onClick}
        onPropertyChange={(key: string, value: any) => {
          console.log('Property changed:', key, value);
        }}
        onComplete={() => {
          console.log('Transition completed');
        }}
      />;

    default:
      return (
        <div 
          className={`
            p-4 rounded-lg cursor-pointer transition-all duration-200 bg-gray-100
            ${isSelected 
              ? 'border-2 border-blue-500 bg-blue-50' 
              : 'border-2 border-dashed border-gray-300 hover:bg-gray-200'
            }
          `}
          onClick={onClick}
        >
          <div className="text-center text-gray-500">
            <p className="font-medium">Bloco Desconhecido</p>
            <p className="text-sm">Tipo: {block.type}</p>
          </div>
        </div>
      );
  }
};
