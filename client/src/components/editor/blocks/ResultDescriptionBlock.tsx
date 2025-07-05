import React from 'react';
import { FileText } from 'lucide-react';

interface ResultDescriptionBlockProps {
  properties: {
    content?: string;
    showIcon?: boolean;
  };
  isSelected?: boolean;
  onClick?: () => void;
}

export const ResultDescriptionBlock: React.FC<ResultDescriptionBlockProps> = ({ 
  properties, 
  isSelected = false,
  onClick 
}) => {
  const { content = 'Baseado nas suas respostas, identificamos que...', showIcon = true } = properties;

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
      <div className="flex items-start space-x-4">
        {showIcon && (
          <div className="flex-shrink-0 w-12 h-12 bg-[#B89B7A]/10 rounded-full flex items-center justify-center">
            <FileText className="w-6 h-6 text-[#B89B7A]" />
          </div>
        )}
        
        <div className="flex-1">
          <div 
            className="text-gray-700 leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
};
