import React from 'react';
import { InlineEditableText } from './InlineEditableText';
import { Shield, CheckCircle, Star } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';

const GuaranteeInlineBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onPropertyChange,
  className = ''
}) => {
  const { 
    title = 'Garantia de 30 Dias',
    description = 'Se você não ficar satisfeita com o resultado, devolvemos 100% do seu dinheiro em até 30 dias.',
    features = [
      'Garantia incondicional',
      'Devolução em até 30 dias',
      'Suporte completo',
      'Sem riscos'
    ] as string[],
    iconType = 'shield', // shield, star, check
    backgroundColor = '#f9f4ef',
    borderColor = '#B89B7A'
  } = block.properties;

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const handleFeatureChange = (index: number, newValue: string) => {
    const newFeatures = [...features];
    newFeatures[index] = newValue;
    handlePropertyChange('features', newFeatures);
  };

  const getIcon = () => {
    switch (iconType) {
      case 'star':
        return <Star className="w-12 h-12 text-[#B89B7A]" />;
      case 'check':
        return <CheckCircle className="w-12 h-12 text-[#B89B7A]" />;
      default:
        return <Shield className="w-12 h-12 text-[#B89B7A]" />;
    }
  };

  return (
    <div 
      className={`
        w-full
        p-3 rounded-lg transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-transparent hover:border-blue-300 hover:bg-blue-50/30'
        }
        ${className}
      `}
    >
      <div 
        className="p-6 rounded-lg border shadow-sm"
        style={{ 
          backgroundColor,
          borderColor: `${borderColor}/20`
        }}
      >
        <div className="text-center mb-6">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div 
              className="p-4 rounded-full bg-white shadow-md cursor-pointer hover:scale-105 transition-transform"
              onClick={() => {
                const newIcon = prompt('Tipo de ícone (shield, star, check):', iconType);
                if (newIcon && ['shield', 'star', 'check'].includes(newIcon)) {
                  handlePropertyChange('iconType', newIcon);
                }
              }}
            >
              {getIcon()}
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-2xl font-bold text-[#aa6b5d] mb-4">
            <InlineEditableText
              value={title}
              onChange={(value) => handlePropertyChange('title', value)}
              placeholder="Título da garantia"
              className="text-2xl font-bold text-[#aa6b5d]"
            />
          </h3>
          
          {/* Description */}
          <p className="text-[#432818] text-lg leading-relaxed mb-6">
            <InlineEditableText
              value={description}
              onChange={(value) => handlePropertyChange('description', value)}
              placeholder="Descrição da garantia..."
              className="text-[#432818] text-lg leading-relaxed"
              multiline
            />
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-4">
          {features.map((feature: string, index: number) => (
            <div key={index} className="flex items-center space-x-3 bg-white/50 p-3 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span 
                className="text-[#432818] cursor-pointer hover:bg-blue-50/50 rounded px-1 flex-1"
                onClick={() => {
                  const newFeature = prompt('Editar característica:', feature);
                  if (newFeature !== null) handleFeatureChange(index, newFeature);
                }}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Style Controls */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-500 space-y-1">
          <div>
            <span 
              className="cursor-pointer hover:bg-blue-50/50 rounded px-1"
              onClick={() => {
                const newBg = prompt('Cor de fundo (hex):', backgroundColor);
                if (newBg !== null) handlePropertyChange('backgroundColor', newBg);
              }}
            >
              Fundo: {backgroundColor}
            </span>
          </div>
          <div>
            <span 
              className="cursor-pointer hover:bg-blue-50/50 rounded px-1"
              onClick={() => {
                const newBorder = prompt('Cor da borda (hex):', borderColor);
                if (newBorder !== null) handlePropertyChange('borderColor', newBorder);
              }}
            >
              Borda: {borderColor}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuaranteeInlineBlock;
