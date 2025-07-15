import React from 'react';
import { cn } from '@/lib/utils';
import { type FunnelStepType, type FunnelStepProps } from '@/types/funnel';

// Importar todos os componentes de etapas
import FunnelIntroStep from '../steps/FunnelIntroStep';
import NameCollectStep from '../steps/NameCollectStep';
import QuizIntroStep from '../steps/QuizIntroStep';
import QuestionMultipleStep from '../steps/QuestionMultipleStep';
import QuizTransitionStep from '../steps/QuizTransitionStep';
import ProcessingStep from '../steps/ProcessingStep';
import ResultIntroStep from '../steps/ResultIntroStep';
import ResultDetailsStep from '../steps/ResultDetailsStep';
import ResultGuideStep from '../steps/ResultGuideStep';
import OfferTransitionStep from '../steps/OfferTransitionStep';
import OfferPageStep from '../steps/OfferPageStep';

// Props para o FunnelStepBlock editável
export interface FunnelStepBlockProps {
  block: {
    id: string;
    type: string;
    properties: {
      stepType: FunnelStepType;
      stepNumber: number;
      totalSteps: number;
      title?: string;
      subtitle?: string;
      content?: string;
      imageUrl?: string;
      question?: string;
      options?: Array<{
        id: string;
        text: string;
        imageUrl?: string;
        value: string;
      }>;
      result?: {
        category?: string;
        title?: string;
        description?: string;
        imageUrl?: string;
        guideImageUrl?: string;
      };
      offer?: {
        title?: string;
        description?: string;
        price?: string;
        originalPrice?: string;
        buttonText?: string;
        buttonUrl?: string;
      };
      countdown?: {
        enabled: boolean;
        hours: number;
        minutes: number;
      };
      // Outras propriedades específicas podem ser adicionadas
    };
  };
  className?: string;
  isSelected?: boolean;
  onClick?: () => void;
  onPropertyChange?: (key: string, value: any) => void;
}

/**
 * FunnelStepBlock - Componente para renderizar qualquer etapa do funil no editor
 * 
 * Este componente é compatível com o editor visual e permite editar
 * qualquer etapa do funil através do painel de propriedades.
 */
export const FunnelStepBlock: React.FC<FunnelStepBlockProps> = ({ 
  block,
  className = '',
  isSelected = false,
  onClick,
  onPropertyChange
}) => {
  const { stepType = 'intro', stepNumber = 1, totalSteps = 21 } = block.properties;
  
  // Props comuns para todas as etapas
  const commonProps: FunnelStepProps = {
    id: block.id,
    stepType,
    stepNumber,
    totalSteps,
    isEditable: true,
    onEdit: onClick,
    data: { ...block.properties },
    className: cn(
      "funnel-step-block w-full transition-all duration-200",
      isSelected && "ring-2 ring-blue-500",
      className
    )
  };

  // Renderizar o componente correto baseado no tipo da etapa
  switch (stepType) {
    case 'intro':
      return <FunnelIntroStep {...commonProps} />;
    
    case 'name-collect':
      return <NameCollectStep {...commonProps} />;
    
    case 'quiz-intro':
      return <QuizIntroStep {...commonProps} />;
    
    case 'question-multiple':
      return <QuestionMultipleStep {...commonProps} />;
    
    case 'quiz-transition':
      return <QuizTransitionStep {...commonProps} />;
    
    case 'processing':
      return <ProcessingStep {...commonProps} />;
    
    case 'result-intro':
      return <ResultIntroStep {...commonProps} />;
    
    case 'result-details':
      return <ResultDetailsStep {...commonProps} />;
    
    case 'result-guide':
      return <ResultGuideStep {...commonProps} />;
    
    case 'offer-transition':
      return <OfferTransitionStep {...commonProps} />;
    
    case 'offer-page':
      return <OfferPageStep {...commonProps} />;
    
    default:
      return (
        <div 
          className={cn(
            "p-6 border border-gray-300 rounded-lg", 
            isSelected && "ring-2 ring-blue-500",
            className
          )}
          onClick={onClick}
        >
          <p className="text-lg font-medium">Etapa não reconhecida: {stepType}</p>
          <p className="text-sm text-gray-500 mt-2">
            Etapa {stepNumber} de {totalSteps}
          </p>
        </div>
      );
  }
};

export default FunnelStepBlock;
