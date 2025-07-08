import React from 'react';
import { cn } from '@/lib/utils';
import { Shield, Lock, CreditCard, Clock } from 'lucide-react';

interface SecurePurchaseBlockProps {
  title?: string;
  showFeatures?: boolean;
  className?: string;
}

const SecurePurchaseBlock: React.FC<SecurePurchaseBlockProps> = ({
  title = 'Compra 100% Segura e Protegida',
  showFeatures = true,
  className
}) => {
  const securityFeatures = [
    {
      icon: <Shield className="w-4 h-4" />,
      text: "SSL 256-bits"
    },
    {
      icon: <Lock className="w-4 h-4" />,
      text: "Dados protegidos"
    },
    {
      icon: <CreditCard className="w-4 h-4" />,
      text: "Pagamento seguro"
    },
    {
      icon: <Clock className="w-4 h-4" />,
      text: "Acesso imediato"
    }
  ];

  return (
    <div className={cn("py-6", className)}>
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-r from-[#f9f4ef] to-[#fff7f3] p-6 rounded-lg border border-[#B89B7A]/20 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-[#aa6b5d] mb-4">
            {title}
          </h3>
          
          {showFeatures && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#B89B7A] shadow-sm">
                    {feature.icon}
                  </div>
                  <span className="text-xs text-[#432818] font-medium">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          <p className="text-sm text-[#8F7A6A] mb-4">
            Seus dados estão protegidos por criptografia de nível bancário. 
            Processamento via Hotmart, plataforma líder em produtos digitais no Brasil.
          </p>
          
          <div className="flex items-center justify-center gap-4 text-xs text-[#8F7A6A]">
            <img 
              src="https://static.hotmart.com/img/hotmart-logo.png" 
              alt="Hotmart" 
              className="h-4 opacity-70"
            />
            <span>•</span>
            <span>Ambiente seguro</span>
            <span>•</span>
            <span>Certificado SSL</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurePurchaseBlock;