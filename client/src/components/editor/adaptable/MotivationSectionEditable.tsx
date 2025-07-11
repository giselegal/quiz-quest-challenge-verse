import React from 'react';
import { Card } from '@/components/ui/card';

// Interface para props editáveis no editor
interface MotivationSectionProps {
  title?: string;
  backgroundColor?: string;
  accentColor?: string;
  leftTitle?: string;
  rightTitle?: string;
  leftItems?: string[];
  rightItems?: string[];
  showAnimation?: boolean;
}

// Componente otimizado para o editor com props editáveis
const MotivationSectionEditable: React.FC<MotivationSectionProps> = ({
  title = 'Transforme seu Guarda-roupa',
  backgroundColor = '#ffffff',
  accentColor = '#B89B7A',
  leftTitle = 'Quando você não conhece seu estilo...',
  rightTitle = 'Quando você domina seu estilo...',
  leftItems = [
    'Compra peças por impulso que não combinam entre si',
    'Sente que tem um guarda-roupa cheio, mas "nada para vestir"',
    'Investe em tendências que não valorizam sua imagem',
    'Tem dificuldade em criar uma imagem coerente e autêntica'
  ],
  rightItems = [
    'Economiza tempo e dinheiro em compras conscientes',
    'Projeta a imagem que realmente representa você',
    'Aumenta sua confiança em qualquer ambiente',
    'Cria looks harmoniosos com menos peças'
  ],
  showAnimation = true
}) => {
  return (
    <Card 
      className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20 card-elegant"
      style={{ backgroundColor }}
    >
      <div className="text-center mb-8">
        {showAnimation && (
          <div className="inline-flex items-center gap-3 mb-6 justify-center">
            <div 
              className="w-8 h-px bg-gradient-to-r from-transparent" 
              style={{ background: `linear-gradient(to right, transparent, ${accentColor})` }}
            ></div>
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: accentColor }}
            ></div>
            <div 
              className="w-8 h-px bg-gradient-to-l from-transparent"
              style={{ background: `linear-gradient(to left, transparent, ${accentColor})` }}
            ></div>
          </div>
        )}
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 text-left">
        {/* Coluna Esquerda - Problemas */}
        <div className="bg-[#fff7f3] p-4 rounded-lg border border-[#B89B7A]/10">
          <h3 className="font-medium text-[#aa6b5d] mb-2">{leftTitle}</h3>
          <ul className="text-[#432818] space-y-2">
            {leftItems.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1 w-4 h-4 flex items-center justify-center">
                  <svg width="16" height="16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke={accentColor} strokeWidth="1.5"/>
                    <path d="M5.5 8.5l2 2 3-4" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna Direita - Soluções */}
        <div className="bg-[#f9f4ef] p-4 rounded-lg border border-[#B89B7A]/10">
          <h3 className="font-medium text-[#aa6b5d] mb-2">{rightTitle}</h3>
          <ul className="text-[#432818] space-y-2">
            {rightItems.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1 w-4 h-4 flex items-center justify-center">
                  <svg width="16" height="16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke={accentColor} strokeWidth="1.5"/>
                    <path d="M5.5 8.5l2 2 3-4" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default MotivationSectionEditable;
export type { MotivationSectionProps };
