import React from 'react';
import { cn } from '@/lib/utils';
import { Shield, Clock } from 'lucide-react';

interface AdvancedCTABlockProps {
  mainText?: string;
  subText?: string;
  buttonText?: string;
  urgencyText?: string;
  guaranteeText?: string;
  showUrgency?: boolean;
  showGuarantee?: boolean;
  buttonAnimation?: 'none' | 'pulse' | 'bounce' | 'glow';
  className?: string;
}

const AdvancedCTABlock: React.FC<AdvancedCTABlockProps> = ({
  mainText = 'TRANSFORME SEU ESTILO AGORA',
  subText = 'Descubra seu estilo único em 15 minutos',
  buttonText = 'QUERO DESCOBRIR MEU ESTILO',
  urgencyText = 'Últimas 24 horas com desconto especial!',
  guaranteeText = 'Garantia de 30 dias ou seu dinheiro de volta',
  showUrgency = true,
  showGuarantee = true,
  buttonAnimation = 'pulse',
  className
}) => {
  const getButtonAnimation = () => {
    switch (buttonAnimation) {
      case 'pulse':
        return 'animate-pulse';
      case 'bounce':
        return 'animate-bounce';
      case 'glow':
        return 'shadow-lg shadow-blue-500/50';
      default:
        return '';
    }
  };

  return (
    <div className={cn(
      "py-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden",
      className
    )}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black bg-opacity-20"></div>
      
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Urgency Banner */}
        {showUrgency && urgencyText && (
          <div className="inline-flex items-center bg-red-500 text-white px-6 py-2 rounded-full mb-6 animate-pulse">
            <Clock className="w-4 h-4 mr-2" />
            <span className="font-semibold text-sm">{urgencyText}</span>
          </div>
        )}

        {/* Main Content */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          {mainText}
        </h1>
        
        {subText && (
          <p className="text-xl md:text-2xl mb-8 text-blue-100 font-light">
            {subText}
          </p>
        )}

        {/* CTA Button */}
        <div className="mb-8">
          <button className={cn(
            "bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-8 rounded-lg text-lg md:text-xl transition-all duration-300 transform hover:scale-105",
            getButtonAnimation()
          )}>
            {buttonText}
          </button>
        </div>

        {/* Guarantee */}
        {showGuarantee && guaranteeText && (
          <div className="inline-flex items-center text-blue-100 bg-black bg-opacity-20 px-6 py-3 rounded-lg">
            <Shield className="w-5 h-5 mr-2 text-green-400" />
            <span className="text-sm font-medium">{guaranteeText}</span>
          </div>
        )}

        {/* Additional Trust Elements */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-blue-200">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Acesso imediato
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Sem mensalidades
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Suporte incluído
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedCTABlock;