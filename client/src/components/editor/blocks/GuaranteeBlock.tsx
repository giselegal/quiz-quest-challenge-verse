import React from 'react';
import { cn } from '@/lib/utils';
import { Shield, CheckCircle } from 'lucide-react';

interface GuaranteeBlockProps {
  title?: string;
  guaranteePeriod?: string;
  showIcon?: boolean;
  className?: string;
}

const GuaranteeBlock: React.FC<GuaranteeBlockProps> = ({
  title = 'Garantia Incondicional',
  guaranteePeriod = '7 dias',
  showIcon = true,
  className
}) => {
  return (
    <div className={cn("py-8", className)}>
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-[#fff7f3] to-[#f9f4ef] p-8 rounded-xl border border-[#B89B7A]/20 shadow-lg text-center">
          {showIcon && (
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
          )}
          
          <h3 className="text-2xl font-bold text-[#aa6b5d] mb-4">
            {title}
          </h3>
          
          <p className="text-[#432818] leading-relaxed mb-6">
            Experimente o conteúdo por <strong>{guaranteePeriod}</strong>. Se não ficar completamente satisfeita, 
            devolvemos 100% do seu investimento, sem perguntas.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-[#B89B7A] mt-0.5 flex-shrink-0" />
              <span className="text-sm text-[#432818]">Reembolso integral garantido</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-[#B89B7A] mt-0.5 flex-shrink-0" />
              <span className="text-sm text-[#432818]">Sem burocracia ou questionamentos</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-[#B89B7A] mt-0.5 flex-shrink-0" />
              <span className="text-sm text-[#432818]">Processamento em até 5 dias úteis</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-[#B89B7A] mt-0.5 flex-shrink-0" />
              <span className="text-sm text-[#432818]">Suporte dedicado disponível</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-lg border border-[#B89B7A]/10">
            <p className="text-xs text-[#8F7A6A] italic">
              "Nosso compromisso é com sua satisfação e transformação. Se o conteúdo não atender suas expectativas, faremos a devolução integral." - Equipe Gisele Galvão
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuaranteeBlock;