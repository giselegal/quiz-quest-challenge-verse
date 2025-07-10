import React from 'react';
import { cn } from '@/lib/utils';
import type { BlockComponentProps } from '@/types/blocks';

/**
 * SecondaryStylesInlineBlock - Estilos secundários com percentual
 * Componente modular para mostrar estilos complementares
 */
const SecondaryStylesInlineBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  onClick,
  className = ''
}) => {
  const {
    title = 'Seus Estilos Secundários',
    styles = [
      { name: 'Moderno', description: 'Traços modernos na sua personalidade', percentage: 20 },
      { name: 'Casual', description: 'Praticidade em situações do dia a dia', percentage: 15 },
      { name: 'Romântico', description: 'Toques delicados e femininos', percentage: 10 }
    ],
    layout = 'grid' // grid, vertical, horizontal
  } = block.properties;

  const getProgressColor = (percentage: number) => {
    if (percentage >= 20) return '#B89B7A';
    if (percentage >= 15) return '#D4B896';
    return '#E5D5B7';
  };

  const layoutClasses = {
    grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
    vertical: 'flex flex-col space-y-4',
    horizontal: 'flex flex-wrap gap-4'
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
      <h3 className="text-lg sm:text-xl font-semibold mb-6 text-[#432818] text-center">
        {title}
      </h3>
      
      {/* Grid de estilos */}
      <div className={layoutClasses[layout as keyof typeof layoutClasses]}>
        {styles.map((style: any, index: number) => (
          <div 
            key={index}
            className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow-sm transition-all duration-200"
          >
            {/* Nome do estilo */}
            <h4 className="font-semibold text-[#432818] text-base mb-2">
              {style.name}
            </h4>
            
            {/* Descrição */}
            <p className="text-gray-600 text-sm mb-3">
              {style.description}
            </p>
            
            {/* Label compatibilidade */}
            <div className="text-xs text-gray-500 mb-2">
              Compatibilidade
            </div>
            
            {/* Percentual e barra */}
            <div className="flex items-center space-x-3">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${style.percentage}%`,
                    backgroundColor: getProgressColor(style.percentage)
                  }}
                />
              </div>
              <span 
                className="font-semibold text-base"
                style={{ color: getProgressColor(style.percentage) }}
              >
                {style.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecondaryStylesInlineBlock;
