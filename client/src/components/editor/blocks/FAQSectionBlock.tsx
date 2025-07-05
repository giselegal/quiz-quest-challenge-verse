import React from 'react';
import { InlineEditableText } from './InlineEditableText';
import { ChevronDown } from 'lucide-react';

interface FAQSectionBlockProps {
  properties: {
    title?: string;
    questions?: Array<{
      question: string;
      answer: string;
    }>;
  };
  isSelected?: boolean;
  onClick?: () => void;
  onSaveInline?: (key: string) => (newValue: string) => void;
}

export const FAQSectionBlock: React.FC<FAQSectionBlockProps> = ({ 
  properties, 
  isSelected = false,
  onClick,
  onSaveInline
}) => {
  const { 
    title = 'Perguntas Frequentes',
    questions = [
      { question: 'Como funciona o quiz?', answer: 'Nosso quiz analisa suas respostas para identificar seu estilo pessoal...' },
      { question: 'O resultado é confiável?', answer: 'Sim! Nosso método é baseado em estudos de consultoria de imagem...' }
    ]
  } = properties;

  return (
    <div 
      className={`
        p-6 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-[#B89B7A]/40 hover:bg-[#FAF9F7]'
        }
      `}
      onClick={onClick}
    >
      <div className="max-w-2xl mx-auto">
        {onSaveInline ? (
          <InlineEditableText
            tag="h3"
            value={title}
            onSave={onSaveInline('title')}
            className="text-2xl font-bold text-[#432818] text-center mb-8"
            placeholder="Título da seção FAQ"
          />
        ) : (
          <h3 className="text-2xl font-bold text-[#432818] text-center mb-8">
            {title}
          </h3>
        )}
        
        <div className="space-y-4">
          {questions.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100">
                <h4 className="font-semibold text-[#432818] flex-1">
                  {faq.question}
                </h4>
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </div>
              <div className="p-4 bg-white">
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
