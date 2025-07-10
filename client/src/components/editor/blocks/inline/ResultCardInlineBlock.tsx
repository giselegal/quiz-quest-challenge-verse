import React from 'react';
import { cn } from '@/lib/utils';
import { Award } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';

/**
 * ResultCardInlineBlock - Componente modular para sistema de canvas
 * Card de resultado que se adapta ao grid responsivo do editor
 * CANVAS-READY | MODULAR | GRID-RESPONSIVE | PROPERTY-DRIVEN
 */
const ResultCardInlineBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  onClick,
  className = ''
}) => {
  const {
    resultStyle = 'Elegante',
    percentage = 85,
    showIcon = true,
    showPercentage = true,
    cardSize = 'medium',
    backgroundColor = 'white',
    borderColor = '#B89B7A',
    // Propriedades do grid system
    gridColumns = 'auto', // 'auto', 'half', 'full'
    spacing = 'normal'
  } = block.properties;

  // Sistema de grid responsivo seguindo o padrão do canvas
  const gridClasses = {
    auto: 'w-full md:w-[calc(50%-0.5rem)]', // Máximo 2 colunas em MD+
    half: 'w-full md:w-[calc(50%-0.5rem)]',  // Força 2 colunas
    full: 'w-full'  // Largura total
  };

  const sizeClasses = {
    small: 'p-4 min-h-[180px]',
    medium: 'p-6 min-h-[220px]',
    large: 'p-8 min-h-[280px]'
  };

  const iconSizes = {
    small: 'w-10 h-10 sm:w-12 sm:h-12',
    medium: 'w-12 h-12 sm:w-16 sm:h-16',
    large: 'w-16 h-16 sm:w-20 sm:h-20'
  };

  const spacingClasses = {
    tight: 'space-y-2',
    normal: 'space-y-4',
    loose: 'space-y-6'
  };

  return (
    <div
      className={cn(
        // CANVAS GRID SYSTEM: Compatível com flex-wrap do canvas
        'flex-shrink-0 flex-grow-0',
        gridClasses[gridColumns as keyof typeof gridClasses],
        
        // VISUAL STYLING: Modular e independente
        'bg-white/80 backdrop-blur-sm rounded-xl border shadow-lg',
        'hover:shadow-xl transition-all duration-300',
        
        // EDITOR STATES: Seleção e interação
        isSelected && 'ring-2 ring-blue-500 ring-offset-2',
        'cursor-pointer hover:scale-[1.02]',
        
        // SIZE VARIANT
        sizeClasses[cardSize as keyof typeof sizeClasses],
        
        className
      )}
      style={{ 
        backgroundColor: backgroundColor === 'white' ? undefined : backgroundColor,
        borderColor 
      }}
      onClick={onClick}
    >
      <div className={cn(
        'h-full flex flex-col items-center justify-center text-center',
        spacingClasses[spacing as keyof typeof spacingClasses]
      )}>
        {/* Ícone com badge */}
        {showIcon && (
          <div className="relative">
            <div className="bg-gradient-to-br from-[#B89B7A] to-[#A1835D] rounded-full flex items-center justify-center p-4">
              <Award className={cn('text-white', iconSizes[cardSize as keyof typeof iconSizes])} />
            </div>
            
            {/* Badge de porcentagem */}
            {showPercentage && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="bg-[#432818] text-white px-3 py-1 rounded-full text-sm font-bold">
                  {percentage}%
                </div>
              </div>
            )}
          </div>
        )}

        {/* Título com estilo responsivo */}
        <div className="space-y-2">
          <h3 className={cn(
            'font-bold text-[#432818]',
            cardSize === 'large' ? 'text-2xl' : cardSize === 'medium' ? 'text-xl' : 'text-lg'
          )}>
            Estilo {resultStyle}
          </h3>
          
          {/* Linha decorativa */}
          <div className="w-16 h-1 bg-gradient-to-r from-[#B89B7A] to-[#A1835D] mx-auto rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ResultCardInlineBlock;
