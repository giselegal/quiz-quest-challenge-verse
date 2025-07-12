import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { InlineEditableText } from './InlineEditableText';
import type { BlockComponentProps } from '@/types/blocks';

const UrgencyTimerBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const { 
    title = '🚨 Oferta Limitada - Expira em:',
    duration = 15, // em minutos
    showExpiredMessage = true,
    expiredMessage = '⏰ Esta oferta especial expirou! Mas não se preocupe, ainda temos outras oportunidades para você.',
    timerColor = 'red'
  } = block.properties;

  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert to seconds
  const [isExpired, setIsExpired] = useState(false);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

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

  const colorClasses = {
    red: 'bg-red-500 text-white',
    orange: 'bg-orange-500 text-white',
    yellow: 'bg-yellow-500 text-black',
    green: 'bg-green-500 text-white'
  };

  return (
    <div 
      className={`
        p-6 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-[#B89B7A]/40 hover:bg-[#FAF9F7]'
        }
        ${className}
      `}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      <div className="text-center">
        {!isExpired ? (
          <>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Clock className="w-5 h-5 text-red-500 animate-pulse" />
              <InlineEditableText
                value={title}
                onChange={(value: string) => handlePropertyChange('title', value)}
                className="text-lg font-semibold text-[#432818]"
                placeholder="Título do timer de urgência"
              />
            </div>
            
            <div className={`${colorClasses[timerColor as keyof typeof colorClasses] || colorClasses.red} rounded-lg py-4 px-6 inline-block shadow-lg`}>
              <div className="text-3xl font-bold font-mono">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm mt-1 opacity-90">
                minutos restantes
              </div>
            </div>
          </>
        ) : (
          showExpiredMessage && (
            <div className="bg-gray-100 rounded-lg py-4 px-6">
              <InlineEditableText
                value={expiredMessage}
                onChange={(value: string) => handlePropertyChange('expiredMessage', value)}
                className="text-gray-600 font-medium"
                placeholder="Mensagem quando o timer expira"
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UrgencyTimerBlock;
