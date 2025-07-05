import React, { useState } from 'react';
import { InlineEditableText } from './InlineEditableText';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQBlockProps {
  properties: {
    title?: string;
    questions?: FAQItem[];
    allowMultipleOpen?: boolean;
  };
  isSelected?: boolean;
  onClick?: () => void;
  onSaveInline?: (key: string) => (newValue: string) => void;
}

export const FAQBlock: React.FC<FAQBlockProps> = ({ 
  properties, 
  isSelected = false,
  onClick,
  onSaveInline
}) => {
  const { 
    title = 'Perguntas Frequentes',
    questions = [
      { question: 'Como funciona?', answer: 'Explicação detalhada aqui...' },
      { question: 'É seguro?', answer: 'Sim, totalmente seguro.' }
    ],
    allowMultipleOpen = false
  } = properties;

  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (allowMultipleOpen) {
      setOpenItems(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div 
      className={`
        p-4 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-[#B89B7A]/40 hover:bg-[#FAF9F7]'
        }
      `}
      onClick={onClick}
    >
      {/* Título */}
      {onSaveInline ? (
        <InlineEditableText
          tag="h3"
          value={title}
          onSave={onSaveInline('title')}
          className="text-2xl font-bold text-[#432818] mb-6 text-center"
          placeholder="Título das FAQ"
        />
      ) : (
        <h3 className="text-2xl font-bold text-[#432818] mb-6 text-center">
          {title}
        </h3>
      )}

      {/* Lista de perguntas */}
      <div className="space-y-4">
        {questions.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                toggleItem(index);
              }}
            >
              <span className="font-medium text-[#432818]">
                {item.question}
              </span>
              {openItems.includes(index) ? (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {openItems.includes(index) && (
              <div className="px-4 py-3 bg-white">
                <p className="text-gray-700 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Nota sobre edição via painel */}
      {isSelected && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700">
            💡 Para editar as perguntas e respostas, use o painel de propriedades à direita
          </p>
        </div>
      )}
    </div>
  );
};
