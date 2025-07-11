
import React from 'react';
import { StyleResult } from '@/types/quiz';

/**
 * BLOCO EDITÁVEL: Card de Resultado de Estilo Predominante
 * 
 * Props Editáveis:
 * - primaryStyle: StyleResult (objeto com dados do estilo)
 * - showPercentage: boolean (mostrar porcentagem)
 * - cardStyle: 'default' | 'elegant' | 'modern'
 * - backgroundColor: string
 * - borderColor: string
 * - textColor: string
 * 
 * Exemplo de Uso:
 * <PrimaryStyleCardBlock 
 *   primaryStyle={{
 *     category: 'Natural',
 *     score: 92,
 *     percentage: 92
 *   }}
 *   showPercentage={true}
 *   cardStyle="elegant"
 * />
 */

export interface PrimaryStyleCardBlockProps {
  blockId?: string;
  primaryStyle?: StyleResult;
  showPercentage?: boolean;
  cardStyle?: 'default' | 'elegant' | 'modern';
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  className?: string;
}

const PrimaryStyleCardBlock: React.FC<PrimaryStyleCardBlockProps> = ({
  blockId = 'primary-style-card',
  primaryStyle = {
    category: 'Natural' as any,
    score: 92,
    percentage: 92
  },
  showPercentage = true,
  cardStyle = 'elegant',
  backgroundColor = '#ffffff',
  borderColor = '#B89B7A',
  textColor = '#432818',
  className = '',
}) => {
  return (
    <div className={`primary-style-card-block ${className}`} data-block-id={blockId}>
      <div 
        className="p-6 bg-white shadow-md border border-[#B89B7A]/20 rounded-lg card-elegant"
        style={{
          backgroundColor,
          borderColor,
          color: textColor
        }}
      >
        <div className="text-center mb-8">
          <div className="max-w-md mx-auto mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[#8F7A6A]">
                Seu estilo predominante
              </span>
              {showPercentage && (
                <span className="text-[#aa6b5d] font-medium">{primaryStyle.percentage}%</span>
              )}
            </div>
            {showPercentage && (
              <div className="w-full bg-[#F3E8E6] rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] h-2 rounded-full transition-all duration-300 ease-in-out" 
                  style={{ width: `${primaryStyle.percentage}%` }} 
                />
              </div>
            )}
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-[#aa6b5d] mb-4">
            Estilo {primaryStyle.category}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PrimaryStyleCardBlock;
