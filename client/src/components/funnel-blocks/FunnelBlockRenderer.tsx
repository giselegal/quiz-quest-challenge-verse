import React from 'react';
import {
  FunnelIntroStep,
  QuestionMultipleStep,
  ProcessingStep,
  ResultIntroStep,
  OfferPageStep,
  FunnelProgressBar,
  CountdownTimer
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
  const progressValue = Math.round(((currentPageIndex + 1) / totalPages) * 100);
  
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
        <FunnelIntroStep
          id={block.id}
          stepType="intro"
          stepNumber={currentPageIndex + 1}
          totalSteps={totalPages}
          onNext={() => onBlockInteraction(block.id, { type: 'intro_submit' })}
          data={{
            title: block.settings.title || 'Bem-vinda!',
            subtitle: block.settings.subtitle,
            buttonText: block.settings.buttonText || 'Continuar'
          }}
        />
      );

    case 'question-multiple':
    case 'question-strategic':
      return (
        <QuestionMultipleStep
          id={block.id}
          stepType="question-multiple"
          stepNumber={currentPageIndex + 1}
          totalSteps={totalPages}
          onNext={() => onBlockInteraction(block.id, { type: 'question_answer' })}
          data={{
            question: block.settings.question || 'Selecione uma opção:',
            options: block.settings.options || []
          }}
        />
      );

    case 'loading-animation':
    case 'loader':
      return (
        <ProcessingStep
          id={block.id}
          stepType="processing"
          stepNumber={currentPageIndex + 1}
          totalSteps={totalPages}
          onNext={() => onBlockInteraction(block.id, { type: 'loading_complete' })}
          data={{
            title: block.settings.message || 'Processando suas respostas...',
            duration: block.settings.duration || 4000
          }}
        />
      );

    case 'style-result-display':
      return (
        <ResultIntroStep
          id={block.id}
          stepType="result-intro"
          stepNumber={currentPageIndex + 1}
          totalSteps={totalPages}
          onNext={() => onBlockInteraction(block.id, { type: 'result_continue' })}
          data={{
            title: block.settings.styleName || 'Seu Estilo Único',
            description: block.settings.styleDescription || ''
          }}
        />
      );

    case 'sales-offer':
    case 'price':
      return (
        <OfferPageStep
          id={block.id}
          stepType="offer-page"
          stepNumber={currentPageIndex + 1}
          totalSteps={totalPages}
          onNext={() => onBlockInteraction(block.id, { type: 'purchase_intent' })}
          data={{
            title: block.settings.title || 'Oferta Especial',
            price: block.settings.currentPrice || 'R$ 97,00',
            features: block.settings.features || []
          }}
        />
      );

    case 'testimonials-grid':
      return (
        <div className="p-8 text-center">
          <h3 className="text-lg font-semibold mb-4">{block.settings.title || 'Depoimentos'}</h3>
          <p className="text-gray-600">Componente de depoimentos não implementado</p>
        </div>
      );

    case 'guarantee-section':
    case 'guarantee':
      return (
        <div className="p-8 text-center">
          <h3 className="text-lg font-semibold mb-4">{block.settings.title || 'Garantia de Satisfação'}</h3>
          <p className="text-gray-600">Componente de garantia não implementado</p>
        </div>
      );

    case 'faq':
      return (
        <div className="p-8 text-center">
          <h3 className="text-lg font-semibold mb-4">{block.settings.title || 'Perguntas Frequentes'}</h3>
          <p className="text-gray-600">Componente de FAQ não implementado</p>
        </div>
      );

    case 'social-proof':
      return (
        <div className="p-8 text-center">
          <h3 className="text-lg font-semibold mb-4">{block.settings.title || 'Prova Social'}</h3>
          <p className="text-gray-600">Componente de prova social não implementado</p>
        </div>
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
