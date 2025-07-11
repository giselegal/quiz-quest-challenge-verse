import React from 'react';

interface GuaranteeSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  guaranteePeriod?: string;
  accentColor?: string;
  backgroundColor?: string;
  features?: string[];
  showAnimation?: boolean;
}

const GuaranteeSectionEditable: React.FC<GuaranteeSectionProps> = ({
  title = 'Sua Satisfação 100% Garantida',
  subtitle = 'Risco Zero',
  description = 'Se por qualquer motivo você não ficar 100% satisfeita, reembolsamos o valor integral sem perguntas.',
  guaranteePeriod = '7 dias',
  accentColor = '#B89B7A',
  backgroundColor = '#ffffff',
  features = ['Sem perguntas', 'Sem burocracia', 'Reembolso fácil'],
  showAnimation = true
}) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-md p-8 relative"
      style={{ backgroundColor }}
    >
      {/* Círculo animado no topo */}
      <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-28 h-28 md:w-36 md:h-36 bg-gradient-to-r from-[#fffaf7] to-[#f9f4ef] rounded-full flex items-center justify-center shadow-lg">
        <div 
          className="relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center"
          style={{ 
            background: `linear-gradient(to right, ${accentColor}, #aa6b5d)` 
          }}
        >
          {showAnimation && (
            <div 
              className="absolute inset-0 border-4 border-transparent rounded-full animate-spin-slow"
              style={{ 
                borderTopColor: accentColor, 
                borderBottomColor: '#aa6b5d' 
              }}
            ></div>
          )}
          <span className="text-white text-sm md:text-lg font-bold text-center">
            {guaranteePeriod}<br />de Garantia
          </span>
        </div>
      </div>

      <div className="text-center mt-16">
        <h2 className="text-2xl font-playfair text-[#432818] font-bold leading-tight mb-2">
          {title}
        </h2>
        
        <p className="text-lg text-[#aa6b5d] font-medium mb-4">
          {subtitle}
        </p>
        
        <div className="max-w-xl mx-auto">
          <p className="text-[#6B5B4E] leading-relaxed mb-6">
            {description}
          </p>
        </div>
        
        <div className="flex justify-center items-center space-x-4 text-[#432818] text-sm">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <span style={{ color: accentColor }} className="mr-2">✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default GuaranteeSectionEditable;
export type { GuaranteeSectionProps };
