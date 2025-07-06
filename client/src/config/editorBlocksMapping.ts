/**
 * Mapeamento dos Blocos Reais para o Editor
 * 
 * Este arquivo conecta os blockDefinitions com os componentes reais
 * implementados em /components/blocks/
 */

import { ComponentType } from 'react';

// Imports dos blocos reais implementados
import { 
  QuizQuestionBlock,
  QuizIntroBlock,
  QuizProgressBlock,
  QuizNavigationBlock,
  QuizTransitionBlock,
  StartButtonBlock,
  QuizBenefitsBlock,
  StrategicQuestionBlock,
  LoadingTransitionBlock
} from '@/components/blocks/quiz';

import {
  HeaderBlock as ResultHeaderBlock,
  PrimaryStyleCardBlock,
  TestimonialsBlock as ResultTestimonialsBlock,
  BeforeAfterTransformationBlock,
  MotivationSectionBlock,
  BonusSectionBlock,
  FinalCTABlock
} from '@/components/blocks/result';

import {
  HeroSectionBlock,
  SectionTitleBlock
} from '@/components/blocks/offer';

// Imports dos blocos básicos do editor
import {
  HeaderBlock,
  TextBlock,
  ImageBlock,
  ButtonBlock,
  SpacerBlock,
  RichTextBlock,
  QuizStepBlock
} from '@/components/editor/blocks';

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

// Mapeamento de tipos para componentes
export const EDITOR_BLOCKS_MAP: Record<string, ComponentType<any>> = {
  // Blocos Básicos
  'header': HeaderBlock,
  'text': TextBlock,
  'image': ImageBlock,
  'button': ButtonBlock,
  'spacer': SpacerBlock,
  
  // Novos blocos avançados
  'rich-text': RichTextBlock,
  'quiz-step': QuizStepBlock,

  // Blocos de Quiz (Etapas 1-19)
  'quiz-intro': QuizIntroBlock,
  'quiz-question': QuizQuestionBlock,
  'quiz-progress': QuizProgressBlock,
  'quiz-navigation': QuizNavigationBlock,
  'quiz-transition': QuizTransitionBlock,
  'start-button': StartButtonBlock,
  'quiz-benefits': QuizBenefitsBlock,
  'strategic-question': StrategicQuestionBlock,
  'loading-transition': LoadingTransitionBlock,

  // Blocos de Resultado (Etapa 20) - Componentes Reais
  'result-header': ResultHeaderBlock,
  'primary-style-card': PrimaryStyleCardBlock,
  'result-testimonials': ResultTestimonialsBlock,
  'before-after-transformation': BeforeAfterTransformationBlock,
  'motivation-section': MotivationSectionBlock,
  'bonus-section': BonusSectionBlock,
  'final-cta': FinalCTABlock,

  // Blocos de Oferta (Etapa 21) - Componentes Reais
  'hero-section': HeroSectionBlock,
  'section-title': SectionTitleBlock,
};

// Helper para verificar se um tipo de bloco existe
export const hasBlockComponent = (blockType: string): boolean => {
  return blockType in EDITOR_BLOCKS_MAP;
};

// Helper para obter o componente de um tipo
export const getBlockComponent = (blockType: string): ComponentType<any> | null => {
  return EDITOR_BLOCKS_MAP[blockType] || null;
};

// Lista de tipos de blocos disponíveis
export const AVAILABLE_BLOCK_TYPES = Object.keys(EDITOR_BLOCKS_MAP);

// Categorias de blocos para organização na sidebar
export const BLOCK_CATEGORIES = {
  basic: ['header', 'text', 'image', 'button', 'spacer', 'rich-text'],
  quiz: [
    'quiz-step', 'quiz-intro', 'quiz-question', 'quiz-progress', 'quiz-navigation',
    'quiz-transition', 'start-button', 'quiz-benefits', 'strategic-question',
    'loading-transition'
  ],
  result: [
    'result-header', 'result-description', 'bonus-carousel',
    'personalized-result', 'share-result', 'cta-result'
  ],
  offer: [
    'product-offer', 'urgency-timer', 'testimonials',
    'guarantee', 'faq-section'
  ]
};

export type BlockCategory = keyof typeof BLOCK_CATEGORIES;
