import React from 'react';
import { cn } from '@/lib/utils';
import { Edit3, Eye, Settings } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';

interface InlineBaseWrapperProps extends BlockComponentProps {
  children: React.ReactNode;
  minHeight?: string;
  fullWidth?: boolean;
  showEditOverlay?: boolean;
  editLabel?: string;
  onEdit?: () => void;
}

/**
 * Wrapper base para todos os componentes Inline (Horizontal)
 * Fornece:
 * - Estrutura base responsiva
 * - Estados de seleção/hover
 * - Overlay de edição
 * - Classes CSS padronizadas
 * - Suporte a métricas e username
 */
const InlineBaseWrapper: React.FC<InlineBaseWrapperProps> = ({
  block,
  isSelected = false,
  onPropertyChange,
  children,
  className = '',
  minHeight = '3rem',
  fullWidth = true,
  showEditOverlay = true,
  editLabel = 'Editar',
  onEdit
}) => {
  const { trackingEnabled = false, useUsername = false } = block.properties;

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    }
  };

  return (
    <div
      className={cn(
        // Base structure - Inline (Horizontal) pattern
        'group/inline-component relative w-full',
        'flex items-center justify-between',
        'transition-all duration-300 ease-in-out',
        
        // Responsive sizing
        fullWidth ? 'w-full' : 'w-auto',
        
        // Minimum height
        `min-h-[${minHeight}]`,
        
        // Padding and spacing
        'px-4 py-3 md:px-6 md:py-4',
        
        // Border and background states
        'border-2 border-transparent rounded-lg',
        'hover:border-blue-300 hover:bg-blue-50/30',
        
        // Selected state
        isSelected && [
          'border-blue-500 bg-blue-50',
          'shadow-lg shadow-blue-500/20'
        ],
        
        // Interactive cursor
        'cursor-pointer',
        
        className
      )}
      style={{ minHeight }}
    >
      {/* Main Content */}
      <div className="flex-1 w-full">
        {children}
      </div>

      {/* Edit Overlay */}
      {showEditOverlay && isSelected && (
        <div className="absolute -top-3 -right-3 z-10">
          <div className="flex items-center gap-2">
            {/* Tracking Indicator */}
            {trackingEnabled && (
              <div className="px-2 py-1 bg-green-500 text-white rounded-full text-xs font-medium flex items-center gap-1">
                <Eye className="w-3 h-3" />
                Analytics
              </div>
            )}
            
            {/* Username Indicator */}
            {useUsername && (
              <div className="px-2 py-1 bg-purple-500 text-white rounded-full text-xs font-medium">
                👤 Personalizado
              </div>
            )}
            
            {/* Edit Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
              className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-medium hover:bg-blue-600 flex items-center gap-1 transition-colors"
            >
              <Edit3 className="w-3 h-3" />
              {editLabel}
            </button>
          </div>
        </div>
      )}

      {/* Metrics Overlay (if tracking enabled) */}
      {trackingEnabled && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-b-lg opacity-60" />
      )}
    </div>
  );
};

export default InlineBaseWrapper;
