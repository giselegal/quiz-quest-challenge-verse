import React from 'react';
import { Star, Badge } from 'lucide-react';

interface ResultHeaderBlockProps {
  properties: {
    title?: string;
    subtitle?: string;
    badgeText?: string;
  };
  isSelected?: boolean;
  onClick?: () => void;
}

export const ResultHeaderBlock: React.FC<ResultHeaderBlockProps> = ({ 
  properties, 
  isSelected = false,
  onClick 
}) => {
  const { title = 'Seu Resultado', subtitle, badgeText = 'SEU ESTILO' } = properties;

  return (
    <div 
      className={`
        p-6 rounded-lg cursor-pointer transition-all duration-200 text-center
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-[#B89B7A]/40 hover:bg-[#FAF9F7]'
        }
      `}
      onClick={onClick}
    >
      <div className="space-y-4">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#B89B7A] text-white">
            <Star className="w-3 h-3 mr-1" />
            {badgeText}
          </span>
        </div>
        
        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#432818]">
          {title}
        </h1>
        
        {/* Subtítulo */}
        {subtitle && (
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
