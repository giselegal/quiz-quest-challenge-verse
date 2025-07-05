import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface UrgencyTimerBlockProps {
  properties: {
    title?: string;
    duration?: number;
    showExpiredMessage?: boolean;
    expiredMessage?: string;
  };
  isSelected?: boolean;
  onClick?: () => void;
}

export const UrgencyTimerBlock: React.FC<UrgencyTimerBlockProps> = ({ 
  properties, 
  isSelected = false,
  onClick 
}) => {
  const { 
    title = 'Oferta Expira em:',
    duration = 15,
    showExpiredMessage = true,
    expiredMessage = 'Essa oferta especial expirou.'
  } = properties;

  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert to seconds
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className={`
        p-6 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-[#B89B7A]/40 hover:bg-[#FAF9F7]'
        }
      `}
      onClick={onClick}
    >
      <div className="text-center">
        {!isExpired ? (
          <>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Clock className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-semibold text-[#432818]">
                {title}
              </h3>
            </div>
            
            <div className="bg-red-500 text-white rounded-lg py-4 px-6 inline-block">
              <div className="text-3xl font-bold font-mono">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm mt-1">
                minutos restantes
              </div>
            </div>
          </>
        ) : (
          showExpiredMessage && (
            <div className="bg-gray-100 rounded-lg py-4 px-6">
              <div className="text-gray-600 font-medium">
                {expiredMessage}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
