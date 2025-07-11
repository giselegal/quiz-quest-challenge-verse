import React from 'react';
import { cn } from '@/lib/utils';
import { Gift, Star, CheckCircle2 } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';

/**
 * BonusListInlineBlock - Componente modular inline horizontal
 * Lista de bônus e benefícios
 * MODULAR | REUTILIZÁVEL | RESPONSIVO | INDEPENDENTE
 */
const BonusListInlineBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  onClick,
  className = ''
}) => {
  const {
    title = 'Bônus Exclusivos',
    bonusItems = [
      {
        title: 'Guia de Combinações',
        description: 'Como criar looks incríveis',
        value: 'R$ 47'
      },
      {
        title: 'Checklist de Compras',
        description: 'Evite compras desnecessárias',
        value: 'R$ 27'
      },
      {
        title: 'Consultoria Express',
        description: '30 min de consultoria online',
        value: 'R$ 97'
      }
    ],
    showValues = true,
    totalValue = 'R$ 171',
    highlightColor = '#B89B7A',
    backgroundColor = 'white',
    variant = 'card' // card, list, minimal
  } = block.properties;

  // Variantes de estilo
  const variantClasses = {
    card: 'p-6 rounded-xl border border-gray-200 shadow-sm',
    list: 'p-4 border-l-4 border-opacity-50',
    minimal: 'p-4'
  };

  return (
    <div
      className={cn(
        // INLINE HORIZONTAL: Flexível e quebra linha automaticamente
        'flex-shrink-0 flex-grow-0',
        // Container responsivo
        'w-full',
        // Variante
        variantClasses[variant as keyof typeof variantClasses],
        // Estados do editor
        isSelected && 'ring-2 ring-blue-500 ring-offset-2',
        'cursor-pointer transition-all duration-200 hover:shadow-lg',
        className
      )}
      style={{ 
        backgroundColor,
        borderLeftColor: variant === 'list' ? highlightColor : undefined
      }}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-center mb-6">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
          style={{ backgroundColor: `${highlightColor}20` }}
        >
          <Gift 
            className="w-5 h-5"
            style={{ color: highlightColor }}
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">Inclusos no seu pacote</p>
        </div>
      </div>

      {/* Lista de bônus */}
      <div className="space-y-4">
        {bonusItems.map((bonus: any, index: number) => (
          <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 mr-4">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: highlightColor }}
              >
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {bonus.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {bonus.description}
                  </p>
                </div>
                
                {showValues && bonus.value && (
                  <div className="ml-4 text-right">
                    <div 
                      className="text-sm font-bold"
                      style={{ color: highlightColor }}
                    >
                      {bonus.value}
                    </div>
                    <div className="text-xs text-gray-500 line-through">
                      Valor individual
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      {showValues && totalValue && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star 
                className="w-5 h-5 mr-2"
                style={{ color: highlightColor }}
              />
              <span className="font-semibold text-gray-900">
                Valor total dos bônus:
              </span>
            </div>
            <div 
              className="text-2xl font-bold"
              style={{ color: highlightColor }}
            >
              {totalValue}
            </div>
          </div>
          <p className="text-sm text-gray-500 text-center mt-2">
            Tudo isso <strong>grátis</strong> para você
          </p>
        </div>
      )}
    </div>
  );
};

export default BonusListInlineBlock;