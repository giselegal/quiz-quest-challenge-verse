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

// === IMPORTAR COMPONENTES REAIS PARA O EDITOR ===
import MotivationSection from '@/components/result/MotivationSection';
import BonusSection from '@/components/result/BonusSection';
import GuaranteeSection from '@/components/result/GuaranteeSection';
import { BeforeAfterTransformation } from '@/components/result/BeforeAfterTransformation';
import Testimonials from '@/components/quiz-result/sales/Testimonials';
import SecurePurchaseElement from '@/components/result/SecurePurchaseElement';

// === SERVIÇO DE COMPONENTES EDITÁVEIS ===
import { renderEditableComponent, getComponentConfig } from '../services/editableComponentsService';

// Componentes modernos (funcionais) - usando fallbacks
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
 * Universal Block Renderer - Editor Visual Moderno (ES7+)
 * Sistema completo de renderização com drag & drop
 * Design responsivo com identidade visual consistente
 * Edição via painel de propriedades (sem inline editing)
 */
export const UniversalBlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isSelected = false,
  onClick,
  onSaveInline,
  disabled = false,
  className
}) => {
  // ES7+ Props base com sistema de edição moderno
  const commonProps = {
    block,
    isSelected,
    onClick,
    disabled,
    className: cn(
      // Design System baseado no HTML fornecido
      'relative w-full transition-all duration-200 ease-out',
      'border border-[#B89B7A]/20 rounded-lg bg-white shadow-sm',
      'hover:border-[#B89B7A]/40 hover:shadow-md cursor-pointer',
      // Estados de seleção com cores da marca
      isSelected && 'ring-2 ring-[#B89B7A] border-[#B89B7A] bg-[#FAF9F7]',
      // Estados de interação
      !disabled && 'group/canvas-item max-w-full canvas-item min-h-[1.25rem] relative self-auto mr-auto',
      className
    )
  };

  // ES7+ Sistema de renderização moderno - baseado no HTML exemplo
  const renderComponent = () => {
    // Props padrão para todos os componentes no editor
    const editorComponentProps = {
      block,
      isSelected,
      onClick,
      className: cn(
        // Layout moderno conforme HTML de referência
        'w-full relative rounded-md overflow-hidden',
        'group-hover/canvas-item:border-2 border-dashed hover:border-2 border-blue-500',
        'min-h-[1.25rem] min-w-full box-border customizable-gap',
        // Estados visuais conforme o design do HTML
        isSelected && 'border-2 border-blue-600 bg-blue-50/10',
        'transition-all duration-200 ease-out'
      )
    };

    const componentMap: Record<string, () => React.ReactNode> = {
      // === COMPONENTES BÁSICOS DO EDITOR ===
      header: () => (
        <div className={editorComponentProps.className} onClick={onClick}>
          <HeadingInlineBlock {...commonProps} />
        </div>
      ),
      text: () => (
        <div className={editorComponentProps.className} onClick={onClick}>
          <TextInlineBlock {...commonProps} />
        </div>
      ),
      image: () => (
        <div className={editorComponentProps.className} onClick={onClick}>
          <ImageInlineBlock {...commonProps} />
        </div>
      ),
      button: () => (
        <div className={editorComponentProps.className} onClick={onClick}>
          <ButtonInlineBlock {...commonProps} />
        </div>
      ),
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
      // RENDERIZA COMPONENTES REAIS NO EDITOR (não placeholders!)
      'component-reference': () => {
        const { componentPath, componentName, props: componentProps = {} } = block.properties;
        
        // Obter configuração do componente
        const componentConfig = getComponentConfig(componentPath);
        
        if (!componentConfig) {
          // Fallback com design da marca
          return (
            <div className={cn(
              'w-full p-6 border-2 border-dashed border-[#B89B7A]/40 rounded-xl',
              'bg-gradient-to-br from-[#FAF9F7] to-[#F5F4F1]',
              'flex flex-col items-center justify-center gap-3',
              'min-h-[120px] text-center transition-all duration-300',
              isSelected && 'border-[#B89B7A] bg-gradient-to-br from-[#B89B7A]/10 to-[#B89B7A]/5',
              'cursor-pointer hover:border-[#B89B7A]/60'
            )}
            onClick={onClick}
            >
              <div className="flex items-center gap-3 text-[#432818]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B89B7A] to-[#aa6b5d] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="font-playfair font-semibold text-lg">{componentName || 'Componente'}</span>
              </div>
              <p className="text-sm text-[#8F7A6A]">
                Componente não mapeado: <code className="bg-[#B89B7A]/10 px-2 py-1 rounded text-xs">{componentPath}</code>
              </p>
            </div>
          );
        }

        // Renderizar componente real usando o serviço
        const renderedComponent = renderEditableComponent(componentPath, componentProps, true);
        
        if (!renderedComponent) {
          return (
            <div className="w-full p-4 border border-red-300 rounded-lg bg-red-50 text-red-700">
              <p className="font-medium">Erro ao renderizar componente</p>
              <p className="text-sm">Caminho: {componentPath}</p>
            </div>
          );
        }

        // Container do editor com identidade da marca
        return (
          <div className={cn(
            'relative border-2 border-[#B89B7A]/30 rounded-xl overflow-hidden',
            'bg-white shadow-sm transition-all duration-300',
            isSelected && 'border-[#B89B7A] shadow-lg ring-2 ring-[#B89B7A]/20',
            'hover:border-[#B89B7A]/50 cursor-pointer'
          )}
          onClick={onClick}
          >
            {/* Badge do editor */}
            <div className="absolute top-2 right-2 z-10 bg-[#B89B7A] text-white text-xs px-2 py-1 rounded-full font-medium">
              {componentConfig.editable ? 'Editável' : 'Componente'}
            </div>
            
            {/* Componente real renderizado */}
            {renderedComponent}
          </div>
        );
      }
    };

    // ES7+ Return com fallback usando optional chaining
    return componentMap[block.type as keyof typeof componentMap]?.() ?? 
           <TextInlineBlock {...commonProps} />;
  };

  return (
    <div 
      className={cn(
        // ES7+ Container principal - Design conforme HTML exemplo
        'universal-block-renderer w-full',
        'transition-all duration-300 ease-out',
        // Hover states conforme o design de referência
        'group/canvas-item max-w-full canvas-item relative self-auto mr-auto',
        // Transform support para drag & drop
        'transform-gpu will-change-transform',
        // Estilos de posicionamento dinâmicos
        isSelected && 'z-[5]'
      )}
      // Atributos de acessibilidade conforme HTML exemplo
      role="button"
      tabIndex={0}
      aria-disabled={disabled}
      aria-roledescription="sortable"
      // Style inline dinâmico para flexbox
      style={{ 
        transform: 'translate3d(0px, 0px, 0px) scaleX(1) scaleY(1)',
        flexBasis: '100%',
        opacity: 1,
        willChange: 'transform'
      }}
    >
      {/* Container do componente editável */}
      <div 
        id={block.id}
        className={cn(
          // Layout base conforme especificações do HTML
          'min-h-[1.25rem] min-w-full relative self-auto box-border customizable-gap',
          'group-hover/canvas-item:border-2 border-dashed hover:border-2 border-blue-500 rounded-md',
          // Estados visuais
          isSelected && 'border-2 border-blue-600'
        )}
        data-state={isSelected ? 'selected' : 'closed'}
        style={{ 
          opacity: 1, 
          willChange: 'transform' 
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
      >
        {renderComponent()}
      </div>
    </div>
  );
};

export default UniversalBlockRenderer;