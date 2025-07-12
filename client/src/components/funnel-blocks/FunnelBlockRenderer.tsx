import React from 'react';
import {
  IntroPage,
  QuizQuestion,
  LoadingTransition,
  StyleResultDisplay,
  SalesOffer,
  TestimonialsGrid,
  GuaranteeSection,
  FAQSection,
  SocialProof,
  funnelHelpers
} from '@/components/funnel-blocks';

/**
 * Exemplo de como integrar os componentes de funil com o editor avançado
 * 
 * Este arquivo demonstra como renderizar cada tipo de bloco usando os
 * componentes reutilizáveis da biblioteca de funil.
 */

interface BlockRendererProps {
  block: {
    id: string;
    type: string;
    settings: Record<string, any>;
    order: number;
  };
  currentPageIndex: number;
  totalPages: number;
  deviceView: 'mobile' | 'tablet' | 'desktop';
  onBlockInteraction: (blockId: string, data: any) => void;
}

export const renderFunnelBlock = ({ 
  block, 
  currentPageIndex, 
  totalPages, 
  deviceView,
  onBlockInteraction 
}: BlockRendererProps) => {
  
  // Calcular progresso baseado na página atual
  const progressValue = funnelHelpers.calculateProgress(currentPageIndex + 1, totalPages);
  
  const progressConfig = {
    showProgress: block.settings.showProgress || false,
    progressValue,
    currentStep: currentPageIndex + 1,
    totalSteps: totalPages
  };

  switch (block.type) {
    case 'intro':
    case 'header':
      return (
        <IntroPage
          title={block.settings.title || 'Bem-vinda!'}
          subtitle={block.settings.subtitle}
          description={block.settings.description}
          logoUrl={block.settings.logoUrl}
          imageUrl={block.settings.imageUrl}
          showNameInput={block.settings.showNameInput !== false}
          nameInputLabel={block.settings.nameInputLabel}
          nameInputPlaceholder={block.settings.nameInputPlaceholder}
          buttonText={block.settings.buttonText || 'Continuar'}
          buttonStyle={block.settings.buttonStyle || 'primary'}
          alignment={block.settings.alignment || 'center'}
          progressConfig={progressConfig}
          deviceView={deviceView}
          onSubmit={(data) => onBlockInteraction(block.id, { type: 'intro_submit', ...data })}
        />
      );

    case 'question-multiple':
    case 'question-strategic':
      return (
        <QuizQuestion
          question={block.settings.question || 'Selecione uma opção:'}
          description={block.settings.description}
          questionNumber={currentPageIndex}
          totalQuestions={totalPages}
          options={block.settings.options || []}
          multipleSelection={block.settings.multipleSelection || false}
          required={block.settings.required !== false}
          autoAdvance={block.settings.autoAdvance !== false}
          autoAdvanceDelay={block.settings.autoAdvanceDelay || 1000}
          optionStyle={block.settings.optionStyle || 'card'}
          optionLayout={block.settings.optionLayout || 'vertical'}
          showLetters={block.settings.showLetters !== false}
          progressConfig={progressConfig}
          deviceView={deviceView}
          onAnswer={(answers) => onBlockInteraction(block.id, { 
            type: 'question_answer', 
            answers,
            questionId: block.id 
          })}
        />
      );

    case 'loading-animation':
    case 'loader':
      return (
        <LoadingTransition
          message={block.settings.message || 'Processando suas respostas...'}
          submessage={block.settings.submessage}
          loadingTexts={block.settings.loadingTexts || [
            'Analisando suas preferências...',
            'Identificando seu estilo único...',
            'Preparando recomendações personalizadas...'
          ]}
          animationType={block.settings.animationType || 'elegant'}
          duration={block.settings.duration || 4000}
          showProgress={block.settings.showProgress !== false}
          deviceView={deviceView}
          onComplete={() => onBlockInteraction(block.id, { type: 'loading_complete' })}
          onProgress={(progress) => onBlockInteraction(block.id, { 
            type: 'loading_progress', 
            progress 
          })}
        />
      );

    case 'style-result-display':
      return (
        <StyleResultDisplay
          styleName={block.settings.styleName || 'Seu Estilo Único'}
          styleImage={block.settings.styleImage || ''}
          styleDescription={block.settings.styleDescription || ''}
          percentMatch={block.settings.percentMatch || 92}
          characteristics={block.settings.characteristics || []}
          styleKeywords={block.settings.styleKeywords || []}
          showPercentage={block.settings.showPercentage !== false}
          showCharacteristics={block.settings.showCharacteristics !== false}
          congratulationsText={block.settings.congratulationsText}
          subtitleText={block.settings.subtitleText}
          continueButtonText={block.settings.continueButtonText || 'Ver Minha Transformação'}
          deviceView={deviceView}
          onContinue={() => onBlockInteraction(block.id, { type: 'result_continue' })}
        />
      );

    case 'sales-offer':
    case 'price':
      return (
        <SalesOffer
          title={block.settings.title || 'Oferta Especial'}
          subtitle={block.settings.subtitle}
          description={block.settings.description}
          priceConfig={{
            originalPrice: block.settings.originalPrice,
            currentPrice: block.settings.currentPrice || 'R$ 97,00',
            discount: block.settings.discount,
            currency: block.settings.currency || 'BRL',
            installments: block.settings.installments
          }}
          features={block.settings.features || []}
          urgencyText={block.settings.urgency || block.settings.urgencyText}
          buttonText={block.settings.buttonText || 'Quero Aproveitar'}
          buttonSubtext={block.settings.buttonSubtext}
          cardStyle={block.settings.cardStyle || 'elegant'}
          deviceView={deviceView}
          onPurchase={() => onBlockInteraction(block.id, { type: 'purchase_intent' })}
        />
      );

    case 'testimonials-grid':
      return (
        <TestimonialsGrid
          title={block.settings.title || 'Depoimentos'}
          subtitle={block.settings.subtitle}
          testimonials={block.settings.testimonials || []}
          layout={block.settings.layout || 'grid'}
          columns={block.settings.columns || 3}
          showRatings={block.settings.showRatings !== false}
          showAvatars={block.settings.showAvatars !== false}
          showRoles={block.settings.showRoles !== false}
          cardStyle={block.settings.cardStyle || 'elegant'}
          deviceView={deviceView}
        />
      );

    case 'guarantee-section':
    case 'guarantee':
      return (
        <GuaranteeSection
          title={block.settings.title || 'Garantia de Satisfação'}
          period={block.settings.period || '30 dias'}
          description={block.settings.description || ''}
          features={block.settings.features || []}
          sealStyle={block.settings.sealStyle || 'badge'}
          layout={block.settings.layout || 'centered'}
          showIcon={block.settings.showIcon !== false}
          iconStyle={block.settings.iconStyle || 'shield'}
          cardStyle={block.settings.cardStyle || 'elevated'}
          deviceView={deviceView}
        />
      );

    case 'faq':
      return (
        <FAQSection
          title={block.settings.title || 'Perguntas Frequentes'}
          subtitle={block.settings.subtitle}
          faqs={block.settings.questions || block.settings.faqs || []}
          allowMultipleOpen={block.settings.allowMultipleOpen || false}
          openFirst={block.settings.openFirst || false}
          cardStyle={block.settings.cardStyle || 'bordered'}
          iconStyle={block.settings.iconStyle || 'chevron'}
          deviceView={deviceView}
          onFAQToggle={(faqId, isOpen) => onBlockInteraction(block.id, {
            type: 'faq_toggle',
            faqId,
            isOpen
          })}
        />
      );

    case 'social-proof':
      return (
        <SocialProof
          title={block.settings.title}
          subtitle={block.settings.subtitle}
          stats={[
            { 
              number: block.settings.number1 || '10.000+', 
              label: block.settings.label1 || 'Clientes' 
            },
            { 
              number: block.settings.number2 || '4.9★', 
              label: block.settings.label2 || 'Avaliação' 
            },
            { 
              number: block.settings.number3 || '99%', 
              label: block.settings.label3 || 'Satisfação' 
            }
          ]}
          layout={block.settings.layout || 'horizontal'}
          showReviews={block.settings.showReviews !== false}
          averageRating={block.settings.averageRating || 4.9}
          totalReviews={block.settings.totalReviews || 1250}
          backgroundColor={block.settings.backgroundColor}
          accentColor={block.settings.accentColor}
          deviceView={deviceView}
        />
      );

    // Fallback para blocos não mapeados ainda
    default:
      return (
        <div className="p-8 text-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Bloco não implementado: {block.type}
          </h3>
          <p className="text-gray-500">
            Este tipo de bloco ainda não foi mapeado para os componentes de funil.
          </p>
          <pre className="mt-4 text-xs text-left bg-white p-4 rounded border overflow-auto">
            {JSON.stringify(block.settings, null, 2)}
          </pre>
        </div>
      );
  }
};

/**
 * Exemplo de uso no CaktoQuizAdvancedEditor
 * 
 * Substitua a renderização atual dos blocos por:
 */
export const ExampleUsageInEditor = () => {
  // No lugar da renderização atual, use:
  return (
    <div className="funnel-preview">
      {/* currentPage.blocks.map((block) => (
        <div key={block.id}>
          {renderFunnelBlock({
            block,
            currentPageIndex,
            totalPages: funnel.pages.length,
            deviceView,
            onBlockInteraction: (blockId, data) => {
              console.log('Block interaction:', blockId, data);
              // Aqui você pode processar as interações
              // como navegação, coleta de dados, etc.
            }
          })}
        </div>
      )) */}
    </div>
  );
};

/**
 * Utilitários para conversão de dados do editor
 */
export const editorHelpers = {
  /**
   * Converte configurações do editor para props dos componentes
   */
  convertBlockSettings: (block: any) => {
    // Mapeamento específico baseado no tipo do bloco
    const baseProps = {
      id: block.id,
      className: block.className,
      style: block.style
    };

    switch (block.type) {
      case 'question-multiple':
        return {
          ...baseProps,
          question: block.settings.question,
          options: (block.settings.options || []).map((opt: any, index: number) => ({
            id: opt.id || index.toString(),
            text: opt.text || `Opção ${index + 1}`,
            value: opt.value || opt.text || index.toString()
          }))
        };

      case 'testimonial':
        return {
          ...baseProps,
          testimonials: [{
            author: block.settings.author,
            role: block.settings.role,
            text: block.settings.text,
            rating: block.settings.rating,
            avatar: block.settings.avatar
          }]
        };

      default:
        return { ...baseProps, ...block.settings };
    }
  },

  /**
   * Valida se um bloco tem todas as propriedades necessárias
   */
  validateBlock: (block: any): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!block.id) errors.push('ID do bloco é obrigatório');
    if (!block.type) errors.push('Tipo do bloco é obrigatório');

    // Validações específicas por tipo
    switch (block.type) {
      case 'question-multiple':
        if (!block.settings?.question) {
          errors.push('Pergunta é obrigatória para blocos de questão');
        }
        if (!block.settings?.options || block.settings.options.length === 0) {
          errors.push('Pelo menos uma opção é obrigatória para blocos de questão');
        }
        break;

      case 'sales-offer':
        if (!block.settings?.currentPrice) {
          errors.push('Preço atual é obrigatório para blocos de oferta');
        }
        break;
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
};

export default renderFunnelBlock;
