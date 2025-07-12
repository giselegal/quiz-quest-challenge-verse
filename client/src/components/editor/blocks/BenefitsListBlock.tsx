
import React from 'react';
import { InlineEditableText } from './InlineEditableText';
import { CheckCircle, Star } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';

interface BenefitsListBlockProps extends BlockComponentProps {
  benefits?: Array<{
    text: string;
    icon?: string;
  }>;
  title?: string;
  titleAlignment?: 'left' | 'center' | 'right';
  iconStyle?: 'check' | 'star' | 'arrow';
}

const BenefitsListBlock: React.FC<BenefitsListBlockProps> = ({
  block,
  benefits,
  title = 'Benefícios Exclusivos',
  titleAlignment = 'center',
  iconStyle = 'check',
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    benefits: blockBenefits = [
      { text: 'Acesso vitalício ao conteúdo', icon: 'check' },
      { text: 'Suporte especializado 24/7', icon: 'check' },
      { text: 'Atualizações gratuitas', icon: 'check' }
    ],
    title: blockTitle = title,
    titleAlignment: blockTitleAlignment = titleAlignment,
    iconStyle: blockIconStyle = iconStyle
  } = block.properties;

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'star':
        return <Star className="w-5 h-5 text-yellow-500 flex-shrink-0" />;
      case 'check':
      default:
        return <CheckCircle className="w-5 h-5 text-[#B89B7A] flex-shrink-0" />;
    }
  };

  const titleAlignmentClasses: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const alignmentClass = titleAlignmentClasses[blockTitleAlignment as keyof typeof titleAlignmentClasses] || 'text-center';

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
      <h3 className={`text-xl font-bold text-[#432818] ${alignmentClass}`}>
        <InlineEditableText
          value={blockTitle}
          onChange={(value: string) => handlePropertyChange('title', value)}
          className="inline-block"
          placeholder="Título dos benefícios"
        />
      </h3>
      
      <div className="space-y-3">
        {blockBenefits.map((benefit: any, index: number) => (
          <div key={index} className="flex items-start gap-3">
            {getIcon(benefit.icon || blockIconStyle)}
            <p className="flex-1 text-[#432818] leading-relaxed">
              {benefit.text}
            </p>
          </div>
        ))}
      </div>

      {(!blockBenefits || blockBenefits.length === 0) && (
        <div className="bg-gray-100 p-8 rounded-lg text-gray-500 flex flex-col items-center justify-center">
          <CheckCircle className="w-12 h-12 mb-4 opacity-50" />
          <p>Configure os benefícios no painel de propriedades.</p>
        </div>
      )}
    </div>
  );
};

export default BenefitsListBlock;
