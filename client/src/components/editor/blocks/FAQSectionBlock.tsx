import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import InlineBaseWrapper from './base/InlineBaseWrapper';
import InlineEditableText from './base/InlineEditableText';
import type { BlockComponentProps } from '@/types/blocks';
import { 
  getPersonalizedText, 
  trackComponentView, 
  trackComponentClick,
  RESPONSIVE_PATTERNS,
  INLINE_ANIMATIONS
} from '@/utils/inlineComponentUtils';
import { 
  BRAND_COLORS,
  TYPOGRAPHY,
  ANIMATIONS,
  EFFECTS,
  SPACING
} from '@/utils/brandDesignSystem';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FAQSectionBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onPropertyChange,
  className = ''
}) => {
  const [openQuestions, setOpenQuestions] = useState<Set<number>>(new Set());

  const { 
    title = 'Perguntas Frequentes',
    showTitle = true,
    questions = [
      { 
        id: '1',
        question: 'Como funciona o Quiz de Estilo?', 
        answer: 'Nosso quiz analisa suas respostas através de 10 questões sobre suas preferências de roupas, cores e detalhes, plus 6 questões estratégicas sobre sua relação com a moda. Com base nisso, identificamos seu estilo predominante entre os 8 tipos: Natural, Clássico, Contemporâneo, Elegante, Romântico, Sexy, Dramático ou Criativo.'
      },
      { 
        id: '2',
        question: 'O resultado é realmente preciso?', 
        answer: 'Sim! Nosso método é baseado em estudos de consultoria de imagem e análise de estilo pessoal. O algoritmo considera não apenas suas preferências visuais, mas também sua personalidade e estilo de vida para dar um resultado personalizado e confiável.'
      },
      { 
        id: '3',
        question: 'Quanto tempo demora para fazer o quiz?', 
        answer: 'O quiz completo leva entre 5 a 10 minutos. São 16 questões no total: 10 questões principais sobre suas preferências de estilo (onde você seleciona 3 opções) e 6 questões estratégicas sobre sua relação com a moda (seleção única).'
      },
      { 
        id: '4',
        question: 'Posso refazer o quiz se não gostar do resultado?', 
        answer: 'Claro! Você pode refazer o quiz quantas vezes quiser. Porém, recomendamos responder com sinceridade na primeira vez, pois o resultado tende a ser mais preciso quando você segue sua intuição inicial.'
      },
      { 
        id: '5',
        question: 'O que recebo após descobrir meu estilo?', 
        answer: 'Você recebe uma análise completa do seu estilo predominante, incluindo as características principais, como se vestir dentro do seu estilo, cores que mais combinam com você, e dicas de como montar looks autênticos que refletem sua personalidade.'
      }
    ],
    alignment = 'center',
    cardStyle = 'bordered',
    spacing = 'normal',
    useUsername = false,
    trackingEnabled = false,
    animation = 'fadeIn'
  } = block.properties;

  // Get username from context (placeholder)
  const username = 'Usuário';

  useEffect(() => {
    if (trackingEnabled) {
      trackComponentView(block.id, 'faq-section');
    }
  }, [trackingEnabled, block.id]);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const toggleQuestion = (index: number) => {
    const newOpenQuestions = new Set(openQuestions);
    if (newOpenQuestions.has(index)) {
      newOpenQuestions.delete(index);
    } else {
      newOpenQuestions.add(index);
    }
    setOpenQuestions(newOpenQuestions);
  };

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now().toString(),
      question: 'Nova pergunta',
      answer: 'Nova resposta aqui...'
    };
    handlePropertyChange('questions', [...questions, newQuestion]);
  };

  const updateQuestion = (id: string, field: 'question' | 'answer', value: string) => {
    const updatedQuestions = questions.map((q: any) => 
      q.id === id ? { ...q, [field]: value } : q
    );
    handlePropertyChange('questions', updatedQuestions);
  };

  const removeQuestion = (id: string) => {
    const updatedQuestions = questions.filter((q: any) => q.id !== id);
    handlePropertyChange('questions', updatedQuestions);
  };

  const cardStyles = {
    bordered: `border-2 border-[${BRAND_COLORS.primary.light}] bg-white`,
    filled: `bg-[${BRAND_COLORS.primary.light}] border-transparent`,
    minimal: 'bg-white border border-gray-200',
    elevated: `bg-white border border-[${BRAND_COLORS.primary.main}] ${EFFECTS.shadows.brand}`
  };

  const spacingClasses = {
    tight: 'space-y-2 md:space-y-3',
    normal: 'space-y-3 md:space-y-4', 
    loose: 'space-y-4 md:space-y-6'
  };

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <InlineBaseWrapper
      block={block}
      isSelected={isSelected}
      onPropertyChange={onPropertyChange}
      className={cn(className, INLINE_ANIMATIONS[animation as keyof typeof INLINE_ANIMATIONS])}
      minHeight="20rem"
      editLabel="Editar FAQ"
    >
      <div className={cn(
        'w-full max-w-4xl mx-auto',
        'py-6 md:py-8 lg:py-12',
        'px-4 md:px-6'
      )}>
        {/* Title */}
        {showTitle && (
          <div className={cn('mb-6 md:mb-8', alignmentClasses[alignment as keyof typeof alignmentClasses])}>
            <InlineEditableText
              value={getPersonalizedText(title, title, username, useUsername)}
              onChange={(value) => handlePropertyChange('title', value)}
              placeholder="Título da seção FAQ..."
              className={cn(
                TYPOGRAPHY.heading.h2,
                `text-[${BRAND_COLORS.secondary.main}]`
              )}
              fontWeight="bold"
              textAlign={alignment as any}
            />
          </div>
        )}
        
        {/* FAQ Questions */}
        <div className={spacingClasses[spacing as keyof typeof spacingClasses]}>
          {questions.map((faq: any, index: number) => {
            const isOpen = openQuestions.has(index);
            
            return (
              <div 
                key={faq.id || index} 
                className={cn(
                  cardStyles[cardStyle as keyof typeof cardStyles],
                  'rounded-lg overflow-hidden group relative',
                  ANIMATIONS.transition,
                  ANIMATIONS.hover.lift
                )}
              >
                {/* Remove Button - Visible when selected */}
                {isSelected && questions.length > 1 && (
                  <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 bg-white/90 hover:bg-white"
                      onClick={() => removeQuestion(faq.id || index.toString())}
                    >
                      <Trash2 className="w-3 h-3 text-red-500" />
                    </Button>
                  </div>
                )}

                {/* Question Header */}
                <div 
                  className={cn(
                    'flex items-center justify-between',
                    'p-4 md:p-5 lg:p-6',
                    'bg-gray-50 hover:bg-gray-100 cursor-pointer',
                    ANIMATIONS.transition
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleQuestion(index);
                  }}
                >
                  <div className="flex-1 pr-4">
                    <InlineEditableText
                      value={faq.question}
                      onChange={(value) => updateQuestion(faq.id || index.toString(), 'question', value)}
                      placeholder="Pergunta da FAQ..."
                      className={cn(
                        TYPOGRAPHY.heading.h6,
                        `text-[${BRAND_COLORS.secondary.main}]`,
                        'w-full'
                      )}
                      fontWeight="semibold"
                      textAlign="left"
                    />
                  </div>
                  
                  {/* Chevron Icon */}
                  <div className="flex-shrink-0">
                    {isOpen ? (
                      <ChevronUp className={cn(
                        'w-4 h-4 md:w-5 md:h-5',
                        `text-[${BRAND_COLORS.primary.main}]`,
                        ANIMATIONS.transition
                      )} />
                    ) : (
                      <ChevronDown className={cn(
                        'w-4 h-4 md:w-5 md:h-5',
                        `text-[${BRAND_COLORS.primary.main}]`,
                        ANIMATIONS.transition
                      )} />
                    )}
                  </div>
                </div>

                {/* Answer Content */}
                {isOpen && (
                  <div className={cn(
                    'p-4 md:p-5 lg:p-6',
                    'bg-white border-t border-gray-100',
                    ANIMATIONS.transition
                  )}>
                    <InlineEditableText
                      value={faq.answer}
                      onChange={(value) => updateQuestion(faq.id || index.toString(), 'answer', value)}
                      placeholder="Resposta da FAQ..."
                      className={cn(
                        'text-sm md:text-base lg:text-lg',
                        `text-[${BRAND_COLORS.neutral.gray600}]`,
                        'leading-relaxed'
                      )}
                      textAlign="left"
                      multiline
                    />
                  </div>
                )}
              </div>
            );
          })}

          {/* Add New Question - Only when selected */}
          {isSelected && (
            <div 
              className={cn(
                'border-2 border-dashed border-gray-300 rounded-lg',
                'flex items-center justify-center',
                'min-h-[80px] group cursor-pointer',
                'hover:border-gray-400 transition-colors',
                'p-4 md:p-6'
              )}
              onClick={addQuestion}
            >
              <div className="text-center text-gray-500 group-hover:text-gray-700">
                <Plus className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2" />
                <span className={TYPOGRAPHY.body.small}>
                  Adicionar Pergunta
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Instructions - Only when selected */}
        {isSelected && (
          <div className="mt-6 md:mt-8 p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className={cn(TYPOGRAPHY.body.small, 'text-blue-700')}>
              💡 <strong>Dica:</strong> Clique nas perguntas para editá-las. Em mobile, o layout se adapta automaticamente para melhor legibilidade.
            </p>
          </div>
        )}
      </div>
    </InlineBaseWrapper>
  );
};

export default FAQSectionBlock;
