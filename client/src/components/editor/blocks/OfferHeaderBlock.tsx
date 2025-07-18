import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface OfferHeaderBlockProps {
  block: {
    id: string;
    type: string;
    properties: {
      logoUrl?: string;
      logoAlt?: string;
      mainTitle?: string;
      subtitle?: string;
      badgeText?: string;
      showCountdown?: boolean;
      initialMinutes?: number;
      backgroundColor?: string;
      textColor?: string;
      accentColor?: string;
    };
  };
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
  className?: string;
}

const OfferHeaderBlock: React.FC<OfferHeaderBlockProps> = ({
  block,
  isSelected,
  isEditing,
  onClick,
  className
}) => {
  const {
    logoUrl = 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
    logoAlt = 'Logo Gisele Galvão',
    mainTitle = 'Etapa 21: Oferta Exclusiva Para Seu Estilo!',
    subtitle = 'Leve sua transformação de estilo para o próximo nível com nosso Guia Completo personalizado para seu resultado',
    badgeText = '3000+ mulheres transformadas',
    showCountdown = true,
    initialMinutes = 15,
    backgroundColor = '#FFFBF7',
    textColor = '#432818',
    accentColor = '#B89B7A'
  } = block.properties;

  // Countdown timer state
  const [time, setTime] = useState({
    hours: 0,
    minutes: initialMinutes || 15,
    seconds: 0
  });

  useEffect(() => {
    if (!showCountdown) return;

    const interval = setInterval(() => {
      setTime(prevTime => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return { hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 0, minutes: initialMinutes || 15, seconds: 0 }; // Reinicia
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showCountdown, initialMinutes]);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div
      className={cn(
        'w-full border-2 border-transparent transition-all duration-200 rounded-lg p-6',
        isSelected && 'border-blue-500 shadow-lg',
        className
      )}
      onClick={onClick}
      style={{
        backgroundColor,
        color: textColor
      }}
    >
      {/* Header Section - Horizontal Layout */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-8">
        {/* Top Bar com Logo e Countdown */}
        <div className="flex items-center justify-between mb-8">
          {/* Logo */}
          <img
            src={logoUrl}
            alt={logoAlt}
            className="h-16 object-contain"
          />

          {/* Countdown Timer */}
          {showCountdown && (
            <div className="flex flex-col items-center">
              <p className="text-sm font-semibold mb-2 flex items-center" style={{ color: textColor }}>
                <Clock size={16} className="mr-1" style={{ color: accentColor }} />
                Esta oferta expira em:
              </p>
              <div className="flex items-center justify-center gap-1">
                <div 
                  className="text-white px-3 py-2 rounded-md text-lg font-mono font-bold shadow-sm"
                  style={{ backgroundColor: textColor }}
                >
                  {formatNumber(time.hours)}
                </div>
                <span className="font-bold text-xl" style={{ color: accentColor }}>:</span>
                <div 
                  className="text-white px-3 py-2 rounded-md text-lg font-mono font-bold shadow-sm"
                  style={{ backgroundColor: textColor }}
                >
                  {formatNumber(time.minutes)}
                </div>
                <span className="font-bold text-xl" style={{ color: accentColor }}>:</span>
                <div 
                  className="text-white px-3 py-2 rounded-md text-lg font-mono font-bold shadow-sm"
                  style={{ backgroundColor: textColor }}
                >
                  {formatNumber(time.seconds)}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content - Horizontal */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2"
              style={{ 
                backgroundColor: `${accentColor}10`,
                borderColor: `${accentColor}30`,
                color: accentColor 
              }}
            >
              <span className="text-sm font-semibold">{badgeText}</span>
            </div>

            {/* Title */}
            <h1 
              className="text-4xl font-bold leading-tight"
              style={{ 
                color: textColor,
                fontFamily: 'Playfair Display, serif' 
              }}
            >
              {mainTitle}
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-600 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Right Side - Visual Element */}
          <div className="flex justify-center">
            <div className="relative max-w-sm">
              <img
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp"
                alt="Transformação de guarda-roupa"
                className="w-full h-auto rounded-xl shadow-lg"
              />
              <div 
                className="absolute -top-3 -right-3 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium transform rotate-12"
                style={{ backgroundColor: accentColor }}
              >
                Exclusivo!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full"></div>
      )}
    </div>
  );
};

export default OfferHeaderBlock;
