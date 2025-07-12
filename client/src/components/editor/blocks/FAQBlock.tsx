
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { InlineEditableText } from './InlineEditableText';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { BlockComponentProps } from '@/types/blocks';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQBlockProps extends BlockComponentProps {
  title?: string;
  faqs?: FAQItem[];
  showIcon?: boolean;
  allowMultiple?: boolean;
}

const FAQBlock: React.FC<FAQBlockProps> = ({
  block,
  title = 'Perguntas Frequentes',
  faqs = [
    { question: 'Como funciona o produto?', answer: 'Nosso produto funciona de forma simples e intuitiva...' },
    { question: 'Qual é a garantia oferecida?', answer: 'Oferecemos garantia de 30 dias...' },
    { question: 'Como posso entrar em contato?', answer: 'Você pode nos contatar através do email...' }
  ],
  showIcon = true,
  allowMultiple = false,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    title: blockTitle = title,
    faqs: blockFaqs = faqs,
    showIcon: blockShowIcon = showIcon,
    allowMultiple: blockAllowMultiple = allowMultiple
  } = block.properties;

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  return (
    <div
      className={`
        py-6 space-y-4 cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'ring-1 ring-gray-400/40 bg-gray-50/30' 
          : 'hover:shadow-sm'
        }
        ${className}
      `}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      <div className="flex items-center gap-3 mb-6">
        {blockShowIcon && <HelpCircle className="w-6 h-6 text-[#B89B7A]" />}
        <h3 className="text-2xl font-bold text-[#432818]">
          <InlineEditableText
            value={blockTitle}
            onChange={(value: string) => handlePropertyChange('title', value)}
            className="inline-block"
            placeholder="Título das FAQs"
          />
        </h3>
      </div>

      <Accordion 
        type={blockAllowMultiple ? "multiple" : "single"} 
        className="space-y-3"
        collapsible
      >
        {blockFaqs.map((faq: FAQItem, index: number) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="border border-gray-200 rounded-lg bg-white"
          >
            <AccordionTrigger className="px-4 py-3 text-left hover:no-underline">
              <span className="font-medium text-[#432818]">
                {faq.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3 text-gray-700">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {(!blockFaqs || blockFaqs.length === 0) && (
        <div className="bg-gray-100 p-8 rounded-lg text-gray-500 flex flex-col items-center justify-center">
          <HelpCircle className="w-12 h-12 mb-4 opacity-50" />
          <p>Configure as perguntas frequentes no painel de propriedades.</p>
        </div>
      )}
    </div>
  );
};

export default FAQBlock;
