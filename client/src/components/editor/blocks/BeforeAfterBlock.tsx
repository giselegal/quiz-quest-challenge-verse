import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

interface BeforeAfterBlockProps {
  title?: string;
  showComparison?: boolean;
  className?: string;
}

const BeforeAfterBlock: React.FC<BeforeAfterBlockProps> = ({
  title = 'Sua Transformação Começa Agora',
  showComparison = true,
  className
}) => {
  // Dados reais da seção Before/After da ResultPage
  const beforeItems = [
    'Compra peças por impulso que não combinam entre si',
    'Sente que tem um guarda-roupa cheio, mas "nada para vestir"',
    'Investe em tendências que não valorizam sua imagem',
    'Tem dificuldade em criar uma imagem coerente e autêntica'
  ];

  const afterItems = [
    'Cria looks harmoniosos com menos peças',
    'Investe conscientemente em peças que valorizam sua beleza',
    'Desenvolve uma assinatura visual autêntica e marcante',
    'Projeta confiança e profissionalismo em qualquer ambiente'
  ];

  return (
    <div className={cn("py-8", className)}>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-6 justify-center">
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#B89B7A]"></div>
          <div className="w-2 h-2 bg-[#B89B7A] rounded-full animate-pulse"></div>
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#B89B7A]"></div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#aa6b5d] mb-4">
          {title}
        </h2>
      </div>

      {showComparison && (
        <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
          <div className="bg-[#fff7f3] p-6 rounded-lg border border-[#B89B7A]/10">
            <h3 className="font-medium text-[#aa6b5d] mb-4">Quando você não conhece seu estilo...</h3>
            <ul className="text-[#432818] space-y-3">
              {beforeItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1 w-4 h-4 flex items-center justify-center">
                    <svg width="16" height="16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="#B89B7A" strokeWidth="1.5"/>
                      <path d="M5.5 8.5l2 2 3-4" stroke="#B89B7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-[#f9f4ef] p-6 rounded-lg border border-[#B89B7A]/10">
            <h3 className="font-medium text-[#aa6b5d] mb-4">Quando você domina seu estilo...</h3>
            <ul className="text-[#432818] space-y-3">
              {afterItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#B89B7A] mt-1 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeforeAfterBlock;