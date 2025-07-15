import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';

/**
 * BeforeAfterInlineBlock - Componente modular inline horizontal
 * Comparação visual "antes vs depois"
 * MODULAR | REUTILIZÁVEL | RESPONSIVO | INDEPENDENTE
 */
const BeforeAfterInlineBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  onClick,
  className = ''
}) => {
  const {
    beforeTitle = 'Antes',
    afterTitle = 'Depois',
    beforeItems = [
      'Indecisão ao se vestir',
      'Guarda-roupa desorganizado',
      'Falta de confiança'
    ],
    afterItems = [
      'Clareza sobre seu estilo',
      'Peças que combinam',
      'Autoestima elevada'
    ],
    variant = 'horizontal', // horizontal, vertical
    showIcons = true,
    accentColor = '#B89B7A',
    backgroundColor = 'white'
  } = block.properties;

  const isHorizontal = variant === 'horizontal';

  return (
    <div
      className={cn(
        // INLINE HORIZONTAL: Flexível e quebra linha automaticamente
        'flex-shrink-0 flex-grow-0',
        // Container responsivo
        'w-full p-6 rounded-xl border border-gray-200',
        'transition-all duration-200',
        // Estados do editor
        isSelected && 'ring-2 ring-blue-500 ring-offset-2',
        'cursor-pointer hover:shadow-lg',
        className
      )}
      style={{ backgroundColor }}
      onClick={onClick}
    >
      <div 
        className={cn(
          'flex gap-6',
          isHorizontal ? 'flex-row' : 'flex-col'
        )}
      >
        {/* Seção "Antes" */}
        <div className="flex-1">
          <div className="flex items-center mb-4">
            {showIcons && (
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900">{beforeTitle}</h3>
          </div>
          
          <ul className="space-y-2">
            {beforeItems.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Seta de transição */}
        <div className={cn(
          'flex items-center justify-center',
          isHorizontal ? 'flex-col' : 'flex-row'
        )}>
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
            style={{ backgroundColor: accentColor }}
          >
            <ArrowRight className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Seção "Depois" */}
        <div className="flex-1">
          <div className="flex items-center mb-4">
            {showIcons && (
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900">{afterTitle}</h3>
          </div>
          
          <ul className="space-y-2">
            {afterItems.map((item, index) => (
              <li key={index} className="flex items-start">
                <div 
                  className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                  style={{ backgroundColor: accentColor }}
                />
                <span className="text-sm text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Linha decorativa */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="text-center">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            Transformação Comprovada
          </span>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterInlineBlock;