import React from 'react';
import { Star, Badge } from 'lucide-react';
import { InlineEditableText } from './InlineEditableText';
import type { BlockComponentProps } from '@/types/blocks';

const ResultHeaderBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const { 
    title = 'Seu Resultado', 
    subtitle = '', 
    badgeText = 'SEU ESTILO' 
  } = block.properties;

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  return (
    <div 
      className={`
        p-6 rounded-lg cursor-pointer transition-all duration-200 text-center
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
      <div className="space-y-4">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#B89B7A] text-white">
            <Star className="w-3 h-3 mr-1" />
            <InlineEditableText
              value={badgeText}
              onSave={(value: string) => handlePropertyChange('badgeText', value)}
              className="text-white font-medium"
              placeholder="Badge do resultado"
              tag="span"
            />
          </span>
        </div>
        
        {/* Título */}
        <InlineEditableText
          value={title}
          onSave={(value: string) => handlePropertyChange('title', value)}
          className="text-3xl md:text-4xl font-bold text-[#432818]"
          placeholder="Título do resultado"
          tag="h1"
        />
        
        {/* Subtítulo */}
        <InlineEditableText
          value={subtitle}
          onSave={(value: string) => handlePropertyChange('subtitle', value)}
          className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          placeholder="Subtítulo ou descrição do resultado"
          tag="p"
        />
      </div>
    </div>
  );
};

export default ResultHeaderBlock;
