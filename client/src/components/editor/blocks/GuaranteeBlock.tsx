import React from 'react';
import { InlineEditableText } from './InlineEditableText';
import { Shield, CheckCircle } from 'lucide-react';

interface GuaranteeBlockProps {
  properties: {
    title?: string;
    subtitle?: string;
    description?: string;
    guaranteePeriod?: string;
    showIcon?: boolean;
  };
  isSelected?: boolean;
  onClick?: () => void;
  onSaveInline?: (key: string) => (newValue: string) => void;
}

export const GuaranteeBlock: React.FC<GuaranteeBlockProps> = ({ 
  properties, 
  isSelected = false,
  onClick,
  onSaveInline
}) => {
  const { 
    title = 'Garantia de Satisfação',
    subtitle = '100% Sem Riscos',
    description = 'Se você não ficar completamente satisfeita com seu resultado e nossa consultoria, devolvemos 100% do seu investimento em até 30 dias.',
    guaranteePeriod = '30 dias',
    showIcon = true
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
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
          {showIcon && (
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <Shield className="w-12 h-12 text-green-600" />
              </div>
            </div>
          )}
          
          {onSaveInline ? (
            <InlineEditableText
              tag="h3"
              value={title}
              onSave={onSaveInline('title')}
              className="text-2xl font-bold text-green-800 mb-2"
              placeholder="Título da garantia"
            />
          ) : (
            <h3 className="text-2xl font-bold text-green-800 mb-2">
              {title}
            </h3>
          )}
          
          {onSaveInline ? (
            <InlineEditableText
              tag="p"
              value={subtitle}
              onSave={onSaveInline('subtitle')}
              className="text-green-700 font-semibold text-lg mb-4"
              placeholder="Subtítulo da garantia"
            />
          ) : (
            <p className="text-green-700 font-semibold text-lg mb-4">
              {subtitle}
            </p>
          )}
          
          {onSaveInline ? (
            <InlineEditableText
              tag="p"
              isTextArea
              value={description}
              onSave={onSaveInline('description')}
              className="text-green-600 leading-relaxed mb-6"
              placeholder="Descrição da garantia"
            />
          ) : (
            <p className="text-green-600 leading-relaxed mb-6">
              {description}
            </p>
          )}
          
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium">
              Garantia de {guaranteePeriod}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
