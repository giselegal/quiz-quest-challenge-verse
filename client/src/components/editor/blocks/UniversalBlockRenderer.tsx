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

// Componentes específicos de Resultado (Etapa 20)
import QuizResultHeaderBlock from './QuizResultHeaderBlock';
import QuizResultMainCardBlock from './QuizResultMainCardBlock';

// Componentes específicos de Oferta (Etapa 21)
import QuizOfferCountdownBlock from './QuizOfferCountdownBlock';
import QuizOfferPricingBlock from './QuizOfferPricingBlock';
import QuizOfferFAQBlock from './QuizOfferFAQBlock';

// === COMPONENTES INLINE MODULARES (ES7+) ===
// Importação corrigida e otimizada dos componentes inline
import {
  TextInlineBlock,
  StyleCardInlineBlock,
  StatInlineBlock,
  BadgeInlineBlock,
  ProgressInlineBlock,
  ImageDisplayInlineBlock,
  PricingCardInlineBlock,
  TestimonialCardInlineBlock,
  // Etapa 20 (Resultado)
  TestimonialsInlineBlock,
  // Etapa 21 (Oferta)
  QuizOfferPricingInlineBlock,
  CountdownInlineBlock,
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

// Novos componentes inline criados
import ResultHeaderInlineBlock from './inline/ResultHeaderInlineBlock';
import ResultCardInlineBlock from './inline/ResultCardInlineBlock';
import BeforeAfterInlineBlock from './inline/BeforeAfterInlineBlock';
import BonusListInlineBlock from './inline/BonusListInlineBlock';
import StepHeaderInlineBlock from './inline/StepHeaderInlineBlock';

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
  // ES7+ Props comuns padronizados para flexbox inline responsivo
  const commonProps = {
    block,
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
      // ES7+ Flexbox container responsivo padronizado
      'flex flex-wrap items-start gap-2 sm:gap-4',
      'w-full min-h-[60px] transition-all duration-300 ease-out',
      // Background e padding responsivos
      'bg-white p-2 sm:p-3 md:p-4 rounded-lg',
      // Estados visuais modernos
      isSelected && 'ring-2 ring-blue-500/50 bg-blue-50/30 shadow-md',
      !disabled && 'hover:bg-gray-50/80 hover:shadow-sm cursor-pointer',
      // Responsividade avançada
      'max-w-full overflow-hidden',
      className
    )
  };

  // TODOS os componentes são agora inline - removido conceito de não-inline
  const isInlineBlock = (blockType: string): boolean => {
    return true; // Todos são inline agora
  };

  // ES7+ Sistema responsivo simplificado - SEM wrapper duplo
  const renderComponent = () => {
    const commonProps = {
      block,
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
      className: cn(
        // Responsividade nativa mobile-first
        'w-full transition-all duration-200',
        'border border-gray-200 rounded-lg shadow-sm bg-white',
        'hover:shadow-md hover:border-blue-300',
        isSelected && 'ring-2 ring-blue-500 border-blue-400 bg-blue-50'
      )
    };

    const componentMap: Record<string, () => React.ReactNode> = {
      // === COMPONENTES BÁSICOS ===
      header: () => <HeadingInlineBlock {...commonProps} />,
      text: () => <TextInlineBlock {...commonProps} />,
      image: () => <ImageInlineBlock {...commonProps} />,
      button: () => <ButtonInlineBlock {...commonProps} />,
      spacer: () => <SpacerBlock {...commonProps} />,
      'form-input': () => <FormInputBlock {...commonProps} />,
      list: () => <ListBlock {...commonProps} />,
      
      // === COMPONENTES DE RESULTADO ===
      'result-header': () => <HeadingInlineBlock {...commonProps} />,
      'result-description': () => <TextInlineBlock {...commonProps} />,
      
      // === COMPONENTES DE OFERTA ===
      'product-offer': () => <PricingCardInlineBlock {...commonProps} />,
      'urgency-timer': () => <CountdownInlineBlock {...commonProps} />,
      
      // === COMPONENTES ESPECIAIS ===
      'faq-section': () => <FAQSectionBlock {...commonProps} />,
      testimonials: () => <TestimonialsGridBlock {...commonProps} />,
      guarantee: () => <GuaranteeBlock {...commonProps} />,
      'video-player': () => <VideoPlayerBlock {...commonProps} />,
      
      // === COMPONENTES INLINE ESSENCIAIS ===
      'text-inline': () => <TextInlineBlock {...commonProps} />,
      'heading-inline': () => <HeadingInlineBlock {...commonProps} />,
      'button-inline': () => <ButtonInlineBlock {...commonProps} />,
      'badge-inline': () => <BadgeInlineBlock {...commonProps} />,
      'progress-inline': () => <ProgressInlineBlock {...commonProps} />,
      'image-display-inline': () => <ImageDisplayInlineBlock {...commonProps} />,
      'style-card-inline': () => <StyleCardInlineBlock {...commonProps} />,
      'result-card-inline': () => <ResultCardInlineBlock {...commonProps} />,
      'result-header-inline': () => <ResultHeaderInlineBlock {...commonProps} />,
      'before-after-inline': () => <BeforeAfterInlineBlock {...commonProps} />,
      'bonus-list-inline': () => <BonusListInlineBlock {...commonProps} />,
      'step-header-inline': () => <StepHeaderInlineBlock {...commonProps} />,
      'testimonial-card-inline': () => <TestimonialCardInlineBlock {...commonProps} />,
      'countdown-inline': () => <CountdownInlineBlock {...commonProps} />,
      'stat-inline': () => <StatInlineBlock {...commonProps} />,
      'pricing-card-inline': () => <PricingCardInlineBlock {...commonProps} />,
      
      // === COMPONENTES QUIZ ===
      'quiz-intro-header': () => <QuizIntroHeaderBlock {...commonProps} />,
      'loading-animation': () => <LoadingAnimationBlock {...commonProps} />,
      'options-grid': () => <OptionsGridBlock {...commonProps} />,
      'quiz-question': () => <QuizQuestionBlock {...commonProps} />,
      'quiz-progress': () => <QuizProgressBlock {...commonProps} />,
      
      // === COMPONENTES ETAPA 20/21 (sem duplicação) ===
      'quiz-offer-pricing-inline': () => <QuizOfferPricingInlineBlock {...commonProps} />,
      'divider-inline': () => <SpacerBlock {...commonProps} />,
      
      // === COMPONENTES ETAPA 21 ESPECÍFICOS ===
      'hero-badge-inline': () => <BadgeInlineBlock {...commonProps} />,
      'hero-title-inline': () => <HeadingInlineBlock {...commonProps} />,
      'problem-list-inline': () => <ListBlock {...commonProps} />,
      'highlight-box-inline': () => <BadgeInlineBlock {...commonProps} />,
      'product-card-inline': () => <PricingCardInlineBlock {...commonProps} />,
      'price-highlight-inline': () => <PricingCardInlineBlock {...commonProps} />,
      'cta-button-inline': () => <ButtonInlineBlock {...commonProps} />,
      'trust-elements-inline': () => <TestimonialsGridBlock {...commonProps} />,
      'countdown-timer-inline': () => <CountdownInlineBlock {...commonProps} />,
      'guarantee-seal-inline': () => <BadgeInlineBlock {...commonProps} />,
      'faq-item-inline': () => <FAQSectionBlock {...commonProps} />,
      'section-header-inline': () => <HeadingInlineBlock {...commonProps} />,
      'sticky-header-inline': () => <QuizIntroHeaderBlock {...commonProps} />,
      
      // === COMPONENTES ESTRATÉGICOS ===
      'strategic-question-image': () => <StrategicQuestionBlock {...commonProps} />,
      'strategic-question-main': () => <StrategicQuestionBlock {...commonProps} />,
      'strategic-question-inline': () => <StrategicQuestionBlock {...commonProps} />,
      
      // === BLOCOS QUIZ ESPECÍFICOS ===
      QuizQuestionBlock: () => <QuizQuestionBlock {...commonProps} />,
      QuestionMultipleBlock: () => <QuestionMultipleBlock {...commonProps} />,
      StrategicQuestionBlock: () => <StrategicQuestionBlock {...commonProps} />,
      QuizTransitionBlock: () => <QuizTransitionBlock {...commonProps} />,
      ResultPageBlock: () => <ResultPageBlock {...commonProps} />,
      
      // === MAPEAMENTOS ESPECÍFICOS DAS ETAPAS 20 E 21 ===
      'quiz-title': () => <HeadingInlineBlock {...commonProps} />,
      'quiz-name-input': () => <FormInputBlock {...commonProps} />,
      
      // ETAPA 20 - Resultado (componentes específicos)
      'quiz-result-header': () => <QuizResultHeaderBlock {...commonProps} />,
      'quiz-result-card': () => <QuizResultMainCardBlock {...commonProps} />,
      
      // ETAPA 21 - Oferta (componentes específicos)
      'quiz-offer-title': () => <HeadingInlineBlock {...commonProps} />,
      'quiz-offer-countdown': () => <QuizOfferCountdownBlock {...commonProps} />,
      'quiz-offer-pricing': () => <QuizOfferPricingBlock {...commonProps} />,
      'quiz-offer-faq': () => <QuizOfferFAQBlock {...commonProps} />,
      
      // Componente de transição final
      'quiz-transition-final': () => <QuizTransitionBlock {...commonProps} />,
      
      // === COMPONENTE REFERENCE SYSTEM ===
      // Para renderizar componentes reais do projeto no editor
      'component-reference': () => {
        const { componentPath, componentName, props: componentProps = {}, editable = true, editableFields = [] } = block.properties;
        
        // ES7+ Handler para editar propriedades inline
        const handlePropertyEdit = (field: string, value: any) => {
          if (onSaveInline && editable) {
            const updatedBlock = {
              ...block,
              properties: {
                ...block.properties,
                props: {
                  ...componentProps,
                  [field]: value
                }
              }
            };
            onSaveInline(block.id, updatedBlock);
          }
        };

        // Para o editor, renderizamos um placeholder informativo E EDITÁVEL
        return (
          <div 
            className={cn(
              'w-full p-6 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50',
              'flex flex-col items-center justify-center gap-4',
              'min-h-[140px] text-center transition-all duration-300',
              isSelected && 'border-blue-500 bg-blue-100 shadow-lg',
              editable && 'hover:border-blue-400 hover:bg-blue-75 cursor-pointer'
            )}
            onClick={onClick}
          >
            {/* Header do componente */}
            <div className="flex items-center gap-2 text-blue-700">
              <span className="text-2xl">🧩</span>
              <span className="font-semibold text-lg">{componentName || 'Component'}</span>
              {editable && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">✏️ Editável</span>}
            </div>
            
            {/* Path do componente */}
            <p className="text-sm text-blue-600 max-w-md">
              <code className="bg-blue-200 px-2 py-1 rounded text-xs">{componentPath}</code>
            </p>
            
            {/* Status de renderização */}
            <div className="text-xs text-blue-500 bg-blue-100 px-3 py-1 rounded-full">
              ✅ Renderizado na visualização final
            </div>

            {/* Props editáveis quando selecionado */}
            {isSelected && editable && editableFields.length > 0 && (
              <div className="w-full mt-4 p-3 bg-blue-200 rounded border">
                <h4 className="text-xs font-semibold text-blue-800 mb-2">Propriedades Editáveis:</h4>
                <div className="space-y-2">
                  {editableFields.map((field: string) => (
                    <div key={field} className="flex items-center gap-2 text-xs">
                      <label className="font-medium text-blue-700 min-w-[60px]">{field}:</label>
                      <input
                        type="text"
                        value={componentProps[field] || ''}
                        onChange={(e) => handlePropertyEdit(field, e.target.value)}
                        className="flex-1 px-2 py-1 text-xs border rounded bg-white"
                        placeholder={`Editar ${field}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preview das props quando selecionado */}
            {isSelected && Object.keys(componentProps).length > 0 && (
              <details className="w-full mt-2">
                <summary className="text-xs text-blue-700 cursor-pointer hover:text-blue-800">
                  Ver Props Atuais
                </summary>
                <pre className="text-xs text-blue-700 mt-2 p-2 bg-blue-200 rounded text-left overflow-auto max-h-32">
                  {JSON.stringify(componentProps, null, 2)}
                </pre>
              </details>
            )}

            {/* Indicadores de reutilização */}
            <div className="flex gap-2 text-xs">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                🔄 Reutilizável
              </span>
              {editable && (
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  ⚙️ Configurável
                </span>
              )}
            </div>
          </div>
        );
      }
    };

    // ES7+ Return com fallback usando optional chaining
    return componentMap[block.type as keyof typeof componentMap]?.() ?? 
           <TextInlineBlock {...commonProps} />;
  };

  return (
    <div className={cn(
      // ES7+ Container principal flexbox responsivo
      'universal-block-renderer',
      'flex flex-col w-full',
      'transition-all duration-300 ease-out'
    )}>
      {renderComponent()}
    </div>
  );
};

export default UniversalBlockRenderer;