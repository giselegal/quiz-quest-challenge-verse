import React from 'react';
import { Card } from '@/components/ui/card';
import { Gift, Star } from 'lucide-react';

interface BonusItem {
  title: string;
  description: string;
  value?: string;
  image?: string;
}

interface BonusSectionProps {
  title?: string;
  subtitle?: string;
  accentColor?: string;
  backgroundColor?: string;
  showAnimations?: boolean;
  cardStyle?: 'flat' | 'elevated' | 'modern';
  bonusItems?: BonusItem[];
}

const BonusSectionEditable: React.FC<BonusSectionProps> = ({
  title = 'Bônus Exclusivos para Você',
  subtitle = 'Além do guia principal, você receberá estas ferramentas complementares para potencializar sua jornada de transformação:',
  accentColor = '#B89B7A',
  backgroundColor = '#ffffff',
  showAnimations = true,
  cardStyle = 'elevated',
  bonusItems = [
    {
      title: 'Guia Peças-Chave',
      description: 'Lista completa das 20 peças essenciais que toda mulher deve ter no guarda-roupa, organizadas por categoria e ocasião.',
      value: 'R$ 97',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911668/C%C3%B3pia_de_Passo_5_Pe%C3%A7as_chaves_Documento_A4_lxmekf.webp'
    },
    {
      title: 'Checklist de Compras Inteligentes',
      description: 'Sistema prático para fazer compras conscientes e nunca mais errar na escolha de uma peça.',
      value: 'R$ 67',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp'
    }
  ]
}) => {
  const getCardClass = () => {
    const baseClass = "bg-white p-4 rounded-lg transition-shadow transform-3d";
    switch (cardStyle) {
      case 'flat':
        return `${baseClass} border border-gray-200`;
      case 'elevated':
        return `${baseClass} shadow-sm hover:shadow-md hover:scale-[1.01]`;
      case 'modern':
        return `${baseClass} shadow-lg hover:shadow-xl hover:scale-[1.02] border-0`;
      default:
        return `${baseClass} shadow-sm hover:shadow-md hover:scale-[1.01] border-0`;
    }
  };

  return (
    <div 
      className="py-10"
      style={{ backgroundColor }}
    >
      <h2 
        className="text-2xl md:text-3xl font-playfair text-center mb-2"
        style={{ color: accentColor }}
      >
        {title}
      </h2>
      <p className="text-center text-[#3a3a3a] mb-6 max-w-md mx-auto">
        {subtitle}
      </p>
      
      {/* Divider elegante */}
      <div 
        className="w-32 mx-auto mt-0 mb-6 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${accentColor}, transparent)` }}
      ></div>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {bonusItems.map((bonus, index) => (
            <div
              key={index}
              className={getCardClass()}
              style={{
                animationDelay: showAnimations ? `${index * 0.2}s` : '0s'
              }}
            >
              {bonus.image && (
                <div className="flex justify-center mb-4">
                  <img
                    src={bonus.image}
                    alt={bonus.title}
                    className="w-full max-w-[200px] h-auto object-contain rounded-lg"
                    loading="lazy"
                  />
                </div>
              )}
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Gift 
                    className="w-5 h-5" 
                    style={{ color: accentColor }} 
                  />
                  <h3 
                    className="text-lg font-semibold"
                    style={{ color: accentColor }}
                  >
                    {bonus.title}
                  </h3>
                </div>
                
                <p className="text-[#6B5B4E] text-sm leading-relaxed mb-4">
                  {bonus.description}
                </p>
                
                {bonus.value && (
                  <div className="flex items-center justify-center">
                    <div 
                      className="px-3 py-1 rounded-full text-white text-sm font-medium"
                      style={{ backgroundColor: accentColor }}
                    >
                      Valor: {bonus.value}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Valor total */}
        <div className="text-center mt-8">
          <div 
            className="inline-block px-6 py-3 rounded-lg text-white font-semibold text-lg"
            style={{ backgroundColor: accentColor }}
          >
            + R$ 164 em bônus inclusos!
          </div>
        </div>
      </div>
    </div>
  );
};

export default BonusSectionEditable;
export type { BonusSectionProps, BonusItem };
