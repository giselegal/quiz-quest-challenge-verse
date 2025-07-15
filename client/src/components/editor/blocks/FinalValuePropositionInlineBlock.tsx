import React, { useState } from 'react';
import { InlineEditableText } from './InlineEditableText';
import { Button } from '@/components/ui/button';
import { CheckCircle, ShoppingCart, Lock } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';

const FinalValuePropositionInlineBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onPropertyChange,
  className = ''
}) => {
  const { 
    title = 'Vista-se de Você — na Prática',
    description = 'Agora que você conhece seu estilo, é hora de aplicá-lo com clareza e intenção.',
    sectionTitle = 'O Guia de Estilo e Imagem + Bônus Exclusivos',
    benefits = [
      'Looks com intenção e identidade',
      'Cores, modelagens e tecidos a seu favor',
      'Imagem alinhada aos seus objetivos',
      'Guarda-roupa funcional, sem compras por impulso'
    ] as string[],
    buttonText = 'Garantir Meu Guia + Bônus Especiais',
    buttonUrl = '#',
    securityText = 'Oferta exclusiva nesta página',
    dividerEnabled = true
  } = block.properties;

  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const handleBenefitChange = (index: number, newValue: string) => {
    const newBenefits = [...benefits];
    newBenefits[index] = newValue;
    handlePropertyChange('benefits', newBenefits);
  };

  const handleCTAClick = () => {
    if (buttonUrl && buttonUrl !== '#') {
      window.open(buttonUrl, '_blank');
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
      <div className="text-center mt-10 space-y-6">
        {/* Main Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#aa6b5d] mb-4">
          <InlineEditableText
            value={title}
            onChange={(value) => handlePropertyChange('title', value)}
            placeholder="Título principal"
            className="text-2xl md:text-3xl font-bold text-[#aa6b5d]"
          />
        </h2>

        {/* Divider */}
        {dividerEnabled && (
          <div className="elegant-divider w-20 h-0.5 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] mx-auto rounded-full"></div>
        )}

        {/* Description */}
        <p className="text-[#432818] mb-6 max-w-xl mx-auto">
          <InlineEditableText
            value={description}
            onChange={(value) => handlePropertyChange('description', value)}
            placeholder="Descrição principal..."
            className="text-[#432818] max-w-xl mx-auto"
            multiline
          />
        </p>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] p-6 rounded-lg mb-6 border border-[#B89B7A]/10">
          <h3 className="text-xl font-medium text-[#aa6b5d] mb-4">
            <InlineEditableText
              value={sectionTitle}
              onChange={(value) => handlePropertyChange('sectionTitle', value)}
              placeholder="Título da seção"
              className="text-xl font-medium text-[#aa6b5d]"
            />
          </h3>
          
          <ul className="space-y-3 text-left max-w-xl mx-auto text-[#432818]">
            {benefits.map((benefit: string, index: number) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full flex items-center justify-center text-white mr-2 mt-0.5">
                  <CheckCircle className="h-3 w-3" />
                </div>
                <span 
                  className="cursor-pointer hover:bg-blue-50/50 rounded px-1"
                  onClick={() => {
                    const newBenefit = prompt('Editar benefício:', benefit);
                    if (newBenefit !== null) handleBenefitChange(index, newBenefit);
                  }}
                >
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={handleCTAClick}
          className="text-white py-5 px-8 rounded-md shadow-md transition-all duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(to right, #4CAF50, #45a049)",
            boxShadow: "0 4px 14px rgba(76, 175, 80, 0.4)",
            fontSize: "1rem"
          }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          <span className="flex items-center justify-center gap-2">
            <ShoppingCart className={`w-4 h-4 transition-transform duration-300 ${isButtonHovered ? 'scale-110' : ''}`} />
            <span 
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                const newText = prompt('Editar texto do botão:', buttonText);
                if (newText !== null) handlePropertyChange('buttonText', newText);
              }}
            >
              {buttonText}
            </span>
          </span>
        </Button>

        {/* Security Text */}
        <p className="text-sm text-[#aa6b5d] mt-2 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          <span 
            className="cursor-pointer hover:bg-blue-50/50 rounded px-1"
            onClick={() => {
              const newText = prompt('Editar texto de segurança:', securityText);
              if (newText !== null) handlePropertyChange('securityText', newText);
            }}
          >
            {securityText}
          </span>
        </p>

        {/* Configuration Controls */}
        <div className="mt-4 text-xs text-gray-500 space-y-1">
          <div>
            <span 
              className="cursor-pointer hover:bg-blue-50/50 rounded px-1"
              onClick={() => {
                const newUrl = prompt('Editar URL do botão:', buttonUrl);
                if (newUrl !== null) handlePropertyChange('buttonUrl', newUrl);
              }}
            >
              URL: {buttonUrl}
            </span>
          </div>
          <div>
            <span 
              className="cursor-pointer hover:bg-blue-50/50 rounded px-1"
              onClick={() => {
                const newDivider = confirm('Mostrar divisor?');
                handlePropertyChange('dividerEnabled', newDivider);
              }}
            >
              Divisor: {dividerEnabled ? 'Ativado' : 'Desativado'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalValuePropositionInlineBlock;
