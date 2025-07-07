/**
 * Mapeamento dos Blocos Modernos para o Editor
 * 
 * Este arquivo conecta os blockDefinitions com os componentes reais
 * implementados em /components/editor/blocks/ e /components/funnel-blocks/
 * 
 * ATUALIZADO: Usando blocos confirmados como funcionais + novos blocos de funil
 */

import { ComponentType } from 'react';

// Imports dos blocos básicos modernos do editor (confirmados como funcionais)
import HeaderBlock from '@/components/editor/blocks/HeaderBlock';
import TextBlock from '@/components/editor/blocks/TextBlock';
import { ImageBlock } from '@/components/editor/blocks/ImageBlock';
import ButtonBlock from '@/components/editor/blocks/ButtonBlock';
import { SpacerBlock } from '@/components/editor/blocks/SpacerBlock';
import { RichTextBlock } from '@/components/editor/blocks/RichTextBlock';
import { QuizStepBlock } from '@/components/editor/blocks/QuizStepBlock';

// Imports dos blocos específicos de Quiz (confirmados como funcionais)
import QuizStartPageBlock from '@/components/editor/blocks/QuizStartPageBlock';
import QuizQuestionBlock from '@/components/editor/blocks/QuizQuestionBlock';
import ResultPageBlock from '@/components/editor/blocks/ResultPageBlock';
import QuizOfferPageBlock from '@/components/editor/blocks/QuizOfferPageBlock';
import QuestionMultipleBlock from '@/components/editor/blocks/QuestionMultipleBlock';
import StrategicQuestionBlock from '@/components/editor/blocks/StrategicQuestionBlock';
import QuizTransitionBlock from '@/components/editor/blocks/QuizTransitionBlock';

// Imports dos blocos de resultado e oferta (confirmados como funcionais)
import ResultHeaderBlock from '@/components/editor/blocks/ResultHeaderBlock';
import FAQSectionBlock from '@/components/editor/blocks/FAQSectionBlock';
import TestimonialsBlock from '@/components/editor/blocks/TestimonialsBlock';
import GuaranteeBlock from '@/components/editor/blocks/GuaranteeBlock';
import { VideoPlayerBlock } from '@/components/editor/blocks/VideoPlayerBlock';

// Imports dos novos blocos de funil
import FunnelStepBlock from '@/components/funnel-blocks/editor/FunnelStepBlock';
import { 
  FunnelIntroStep, 
  NameCollectStep, 
  QuizIntroStep, 
  QuestionMultipleStep,
  QuizTransitionStep, 
  ProcessingStep, 
  ResultIntroStep, 
  ResultDetailsStep, 
  ResultGuideStep, 
  OfferTransitionStep, 
  OfferPageStep
} from '@/components/funnel-blocks';

// Interface para props genéricas de bloco
export interface BaseBlockProps {
  blockId: string;
  isEditing?: boolean;
  isSelected?: boolean;
  onEdit?: () => void;
  onSelect?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

// Mapeamento de tipos para componentes (blocos funcionais + novos blocos de funil)
export const EDITOR_BLOCKS_MAP: Record<string, ComponentType<any>> = {
  // Blocos Básicos Modernos
  'header': HeaderBlock,
  'text': TextBlock,
  'image': ImageBlock,
  'button': ButtonBlock,
  'spacer': SpacerBlock,
  
  // Blocos avançados modernos
  'rich-text': RichTextBlock,
  'quiz-step': QuizStepBlock,

  // Blocos específicos do Quiz (funcionais)
  'quiz-start-page': QuizStartPageBlock,
  'QuizStartPageBlock': QuizStartPageBlock,
  'quiz-question': QuizQuestionBlock,
  'QuizQuestionBlock': QuizQuestionBlock,
  'question-multiple': QuestionMultipleBlock,
  'QuestionMultipleBlock': QuestionMultipleBlock,
  'strategic-question': StrategicQuestionBlock,
  'StrategicQuestionBlock': StrategicQuestionBlock,
  'quiz-transition': QuizTransitionBlock,
  'QuizTransitionBlock': QuizTransitionBlock,
  'result-page': ResultPageBlock,
  'ResultPageBlock': ResultPageBlock,
  'quiz-offer-page': QuizOfferPageBlock,
  'QuizOfferPageBlock': QuizOfferPageBlock,

  // Blocos de Resultado (funcionais)
  'result-header': ResultHeaderBlock,
  'faq-section': FAQSectionBlock,
  'testimonials': TestimonialsBlock,
  'guarantee': GuaranteeBlock,
  'video-player': VideoPlayerBlock,
  
  // Novos blocos de funil reutilizáveis
  'funnel-step': FunnelStepBlock,
  'funnel-intro': FunnelIntroStep,
  'funnel-name-collect': NameCollectStep,
  'funnel-quiz-intro': QuizIntroStep,
  'funnel-question': QuestionMultipleStep,
  'funnel-transition': QuizTransitionStep,
  'funnel-processing': ProcessingStep,
  'funnel-result-intro': ResultIntroStep,
  'funnel-result-details': ResultDetailsStep,
  'funnel-result-guide': ResultGuideStep,
  'funnel-offer-transition': OfferTransitionStep,
  'funnel-offer-page': OfferPageStep
};

// Helper para verificar se um tipo de bloco existe
export const hasBlockComponent = (blockType: string): boolean => {
  return blockType in EDITOR_BLOCKS_MAP;
};

// Helper para obter o componente de um tipo
export const getBlockComponent = (blockType: string): ComponentType<any> | null => {
  return EDITOR_BLOCKS_MAP[blockType] || null;
};

// Lista de tipos de blocos disponíveis (todos funcionais)
export const AVAILABLE_BLOCK_TYPES = Object.keys(EDITOR_BLOCKS_MAP);

// Categorias de blocos para organização na sidebar
export const BLOCK_CATEGORIES = {
  basic: ['header', 'text', 'image', 'button', 'spacer'],
  advanced: ['rich-text', 'quiz-step'],
  quiz: [
    'quiz-start-page', 'quiz-question', 'question-multiple', 
    'strategic-question', 'quiz-transition'
  ],
  result: [
    'result-page', 'result-header'
  ],
  offer: [
    'quiz-offer-page', 'testimonials', 'guarantee', 'faq-section', 'video-player'
  ],
  // Nova categoria para os blocos de funil
  funnel: [
    'funnel-step', 'funnel-intro', 'funnel-name-collect', 
    'funnel-quiz-intro', 'funnel-question', 'funnel-transition', 
    'funnel-processing', 'funnel-result-intro', 'funnel-result-details', 
    'funnel-result-guide', 'funnel-offer-transition', 'funnel-offer-page'
  ]
};

export type BlockCategory = keyof typeof BLOCK_CATEGORIES;

// Log para debug - verificar blocos disponíveis
console.log('[EditorBlocksMapping] Blocos disponíveis:', AVAILABLE_BLOCK_TYPES.length);
console.log('[EditorBlocksMapping] Categorias:', Object.keys(BLOCK_CATEGORIES));
