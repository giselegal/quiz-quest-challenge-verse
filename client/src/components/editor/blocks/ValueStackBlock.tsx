import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

interface ValueStackBlockProps {
  title?: string;
  showPricing?: boolean;
  className?: string;
}

const ValueStackBlock: React.FC<ValueStackBlockProps> = ({
  title = 'O Que Você Recebe Hoje',
  showPricing = true,
  className
}) => {
  // Dados reais da ancoragem de valor da ResultPage
  const valueItems = [
    {
      title: 'Guia de Estilo e Imagem Completo',
      description: 'Material exclusivo com seu perfil personalizado',
      value: 'R$ 197,00'
    },
    {
      title: 'Análise Detalhada do Seu Estilo',
      description: 'Relatório completo com suas características únicas',
      value: 'R$ 97,00'
    },
    {
      title: 'Bônus: Peças-chave do Guarda-roupa',
      description: 'Lista das peças essenciais para seu estilo',
      value: 'R$ 79,00'
    },
    {
      title: 'Bônus: Visagismo Facial',
      description: 'Guia de maquiagem ideal para seu rosto',
      value: 'R$ 29,00'
    }
  ];

  const totalValue = valueItems.reduce((sum, item) => {
    const value = parseInt(item.value.replace(/[^\d]/g, ''));
    return sum + value;
  }, 0);

  return (
    <div className={cn("py-8", className)}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#aa6b5d] text-center mb-8">
          {title}
        </h2>
        
        <div className="bg-white rounded-xl shadow-lg border border-[#B89B7A]/20 overflow-hidden">
          <div className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Pacote Completo de Transformação</h3>
            <p className="opacity-90">Tudo que você precisa para descobrir e aplicar seu estilo único</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {valueItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start justify-between p-4 bg-[#f9f4ef] rounded-lg border border-[#B89B7A]/10"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <CheckCircle className="w-5 h-5 text-[#B89B7A] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[#432818] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-[#8F7A6A]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {showPricing && (
                    <div className="text-right ml-4">
                      <span className="text-[#aa6b5d] font-bold">
                        {item.value}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {showPricing && (
              <div className="mt-6 pt-6 border-t border-[#B89B7A]/20">
                <div className="text-center">
                  <div className="mb-4">
                    <span className="text-lg text-[#8F7A6A]">Valor total se comprado separadamente:</span>
                    <div className="text-2xl font-bold text-gray-400 line-through">
                      R$ {totalValue.toLocaleString('pt-BR')},00
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white p-6 rounded-lg">
                    <div className="text-sm opacity-90 mb-2">Seu investimento hoje:</div>
                    <div className="text-4xl font-bold mb-2">R$ 97,00</div>
                    <div className="text-sm opacity-90">
                      Economize R$ {(totalValue - 97).toLocaleString('pt-BR')},00 (mais de 75% de desconto)
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueStackBlock;