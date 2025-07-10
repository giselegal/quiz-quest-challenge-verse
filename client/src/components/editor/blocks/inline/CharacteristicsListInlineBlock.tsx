import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';

/**
 * CharacteristicsListInlineBlock - Lista de características do estilo
 * Componente modular para mostrar características principais
 */
const CharacteristicsListInlineBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  onClick,
  className = ''
}) => {
  const {
    title = 'Suas principais características:',
    characteristics = [
      'Elegância natural e sofisticação',
      'Preferência por peças atemporais',
      'Valoriza qualidade sobre quantidade'
    ],
    iconColor = '#B89B7A',
    titleColor = '#432818',
    textColor = '#374151',
    layout = 'vertical' // vertical, horizontal, compact
  } = block.properties;

  const layoutClasses = {
    vertical: 'flex-col space-y-3',
    horizontal: 'flex-wrap gap-4',
    compact: 'flex-col space-y-2'
  };

  return (
    <div
      className={cn(
        // Layout responsivo
        'w-full p-4 sm:p-6 bg-white rounded-lg border border-gray-200',
        'shadow-sm hover:shadow-md transition-all duration-200',
        // Estados do editor
        isSelected && 'ring-2 ring-blue-500 border-blue-400 bg-blue-50/30',
        className
      )}
      onClick={onClick}
    >
      {/* Título */}
      <h3 
        className="text-lg sm:text-xl font-semibold mb-4"
        style={{ color: titleColor }}
      >
        {title}
      </h3>
      
      {/* Lista de características */}
      <ul className={cn(
        'flex',
        layoutClasses[layout as keyof typeof layoutClasses]
      )}>
        {characteristics.map((characteristic: string, index: number) => (
          <li key={index} className="flex items-center">
            <span 
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm mr-3 flex-shrink-0"
              style={{ backgroundColor: iconColor }}
            >
              <Check className="w-3 h-3" />
            </span>
            <span 
              className="text-sm sm:text-base"
              style={{ color: textColor }}
            >
              {characteristic}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacteristicsListInlineBlock;
