import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';

interface GuaranteeBlockProps {
  block: {
    id: string;
    type: string;
    properties: {
      title?: string;
      description?: string;
      guaranteePeriod?: string;
      iconType?: 'shield' | 'check';
      bgColor?: string;
      textColor?: string;
    };
  };
  isSelected?: boolean;
  onClick?: () => void;
  onSaveInline?: (blockId: string, key: string, newValue: string) => void;
  disabled?: boolean;
  className?: string;
}

const GuaranteeBlock: React.FC<GuaranteeBlockProps> = ({ 
  block,
  isSelected = false,
  onClick,
  disabled = false,
  className = ''
}) => {
  const { 
    title = 'Garantia de Satisfação',
    description = 'Se não ficar satisfeito, devolvemos 100% do seu dinheiro.',
    guaranteePeriod = '30 dias',
    iconType = 'shield',
    bgColor = 'bg-green-50',
    textColor = 'text-green-800'
  } = block.properties;

  const IconComponent = iconType === 'shield' ? Shield : CheckCircle;

  return (
    <div 
      className={`
        p-4 rounded-lg cursor-pointer transition-all duration-200
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
      <div className={`${bgColor} rounded-lg p-6 border border-green-200`}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <IconComponent className={`w-8 h-8 ${textColor}`} />
          </div>
          
          <div className="flex-1">
            <h3 className={`text-lg font-semibold ${textColor} mb-2`}>
              {title}
            </h3>
            
            <p className={`${textColor} text-sm leading-relaxed mb-2`}>
              {description}
            </p>
            
            <div className={`text-xs ${textColor} font-medium`}>
              Período: {guaranteePeriod}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuaranteeBlock;