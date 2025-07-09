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
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const [openQuestions, setOpenQuestions] = useState<Set<number>>(new Set());

  const { 
    title = 'Perguntas Frequentes',
    questions = [
      { 
        question: 'Como funciona o Quiz de Estilo?', 
        answer: 'Nosso quiz analisa suas respostas através de 10 questões sobre suas preferências de roupas, cores e detalhes, plus 6 questões estratégicas sobre sua relação com a moda. Com base nisso, identificamos seu estilo predominante entre os 8 tipos: Natural, Clássico, Contemporâneo, Elegante, Romântico, Sexy, Dramático ou Criativo.'
      },
      { 
        question: 'O resultado é realmente preciso?', 
        answer: 'Sim! Nosso método é baseado em estudos de consultoria de imagem e análise de estilo pessoal. O algoritmo considera não apenas suas preferências visuais, mas também sua personalidade e estilo de vida para dar um resultado personalizado e confiável.'
      },
      { 
        question: 'Quanto tempo demora para fazer o quiz?', 
        answer: 'O quiz completo leva entre 5 a 10 minutos. São 16 questões no total: 10 questões principais sobre suas preferências de estilo (onde você seleciona 3 opções) e 6 questões estratégicas sobre sua relação com a moda (seleção única).'
      },
      { 
        question: 'Posso refazer o quiz se não gostar do resultado?', 
        answer: 'Claro! Você pode refazer o quiz quantas vezes quiser. Porém, recomendamos responder com sinceridade na primeira vez, pois o resultado tende a ser mais preciso quando você segue sua intuição inicial.'
      },
      { 
        question: 'O que recebo após descobrir meu estilo?', 
        answer: 'Você recebe uma análise completa do seu estilo predominante, incluindo as características principais, como se vestir dentro do seu estilo, cores que mais combinam com você, e dicas de como montar looks autênticos que refletem sua personalidade.'
      }
    ]
  } = block.properties;

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

  return (
    <div 
      className={`
        p-6 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-[#B89B7A]/40 hover:bg-[#FAF9F7]'
        }
        ${className}
      `}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      <div className="max-w-2xl mx-auto">
        <InlineEditableText
          tag="h3"
          value={title}
          onSave={(value: string) => handlePropertyChange('title', value)}
          className="text-2xl font-bold text-[#432818] text-center mb-8"
          placeholder="Título da seção FAQ"
        />
        
        <div className="space-y-4">
          {questions.map((faq: any, index: number) => {
            const isOpen = openQuestions.has(index);
            
            return (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <div 
                  className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleQuestion(index);
                  }}
                >
                  {isEditing ? (
                    <InlineEditableText
                      value={faq.question}
                      onSave={(value: string) => {
                        const updatedQuestions = questions.map((q: any, i: number) => 
                          i === index ? { ...q, question: value } : q
                        );
                        handlePropertyChange('questions', updatedQuestions);
                      }}
                      className="font-semibold text-[#432818] flex-1"
                      placeholder="Pergunta da FAQ"
                      tag="h4"
                    />
                  ) : (
                    <h4 className="font-semibold text-[#432818] flex-1">
                      {faq.question}
                    </h4>
                  )}
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 ml-4" />
                  )}
                </div>
                {isOpen && (
                  <div className="p-4 bg-white">
                    {isEditing ? (
                      <InlineEditableText
                        value={faq.answer}
                        onSave={(value: string) => {
                          const updatedQuestions = questions.map((q: any, i: number) => 
                            i === index ? { ...q, answer: value } : q
                          );
                          handlePropertyChange('questions', updatedQuestions);
                        }}
                        className="text-gray-600 leading-relaxed"
                        placeholder="Resposta da FAQ"
                        tag="p"
                      />
                    ) : (
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQSectionBlock;
