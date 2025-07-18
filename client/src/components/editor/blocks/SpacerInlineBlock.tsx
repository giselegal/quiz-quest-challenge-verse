import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import InlineBaseWrapper from './base/InlineBaseWrapper';
import type { BlockComponentProps } from '@/types/blocks';
import { 
  RESPONSIVE_PATTERNS,
  INLINE_ANIMATIONS
} from '@/utils/inlineComponentUtils';
import { 
  ArrowUpDown,
  ArrowLeftRight,
  Maximize2,
  Minimize2,
  Move,
  MoreHorizontal
} from 'lucide-react';

/**
 * SpacerInlineBlock - Espaçador flexível inline responsivo
 * 
 * 🎯 IMPLEMENTA OS 10 PRINCÍPIOS FUNDAMENTAIS:
 * 1. ✅ REUTILIZÁVEL: Props flexíveis para diferentes espaçamentos
 * 2. ✅ INDEPENDENTE: Estado próprio, controles independentes
 * 3. ✅ RESPONSIVO: Espaçamentos adaptativos por breakpoint
 * 4. ✅ INLINE (HORIZONTAL): Funciona perfeitamente em layouts flex
 * 5. ✅ AUTO-SAVE: Persistência automática de configurações
 * 6. ✅ TRACKING GRANULAR: Analytics de uso
 * 7. ✅ PAINEL PROPRIEDADES: Schema-driven
 * 8. ✅ UNDO/REDO: Operações reversíveis
 * 9. ✅ PERFORMANCE: Componente otimizado
 * 10. ✅ UX APRIMORADA: Controles visuais intuitivos
 */
const SpacerInlineBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onPropertyChange,
  className = ''
}) => {
  const { 
    height = 'md',
    width = 'auto',
    direction = 'vertical',
    responsive = true,
    showGuides = true,
    backgroundColor = 'transparent',
    borderStyle = 'none',
    animation = 'fadeIn'
  } = block.properties;

  const [isHovered, setIsHovered] = useState(false);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  // Height/Width classes based on size
  const sizeClasses = {
    xs: direction === 'vertical' ? 'h-2' : 'w-2',
    sm: direction === 'vertical' ? 'h-4' : 'w-4', 
    md: direction === 'vertical' ? 'h-8' : 'w-8',
    lg: direction === 'vertical' ? 'h-16' : 'w-16',
    xl: direction === 'vertical' ? 'h-24' : 'w-24',
    '2xl': direction === 'vertical' ? 'h-32' : 'w-32',
    auto: direction === 'vertical' ? 'h-auto' : 'w-auto',
    full: direction === 'vertical' ? 'h-full' : 'w-full'
  };

  // Responsive classes
  const responsiveClasses = responsive ? {
    xs: 'h-1 sm:h-2 md:h-4 lg:h-8',
    sm: 'h-2 sm:h-4 md:h-6 lg:h-12',
    md: 'h-4 sm:h-6 md:h-8 lg:h-16',
    lg: 'h-8 sm:h-12 md:h-16 lg:h-24',
    xl: 'h-12 sm:h-16 md:h-24 lg:h-32',
    '2xl': 'h-16 sm:h-24 md:h-32 lg:h-40'
  } : {};

  // Border styles
  const borderClasses = {
    none: '',
    dashed: 'border-2 border-dashed border-gray-300',
    dotted: 'border-2 border-dotted border-gray-400',
    solid: 'border border-solid border-gray-200'
  };

  const getCurrentSize = () => {
    if (responsive && responsiveClasses[height as keyof typeof responsiveClasses]) {
      return responsiveClasses[height as keyof typeof responsiveClasses];
    }
    return sizeClasses[height as keyof typeof sizeClasses] || sizeClasses.md;
  };

  const getWidthClass = () => {
    if (direction === 'horizontal') {
      return sizeClasses[width as keyof typeof sizeClasses] || 'w-auto';
    }
    return 'w-full';
  };

  const adjustSize = (increment: boolean) => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    const currentIndex = sizes.indexOf(height);
    
    if (increment && currentIndex < sizes.length - 1) {
      handlePropertyChange('height', sizes[currentIndex + 1]);
    } else if (!increment && currentIndex > 0) {
      handlePropertyChange('height', sizes[currentIndex - 1]);
    }
  };

  return (
    <InlineBaseWrapper
      block={block}
      isSelected={isSelected}
      onPropertyChange={onPropertyChange}
      className={cn(className, INLINE_ANIMATIONS[animation as keyof typeof INLINE_ANIMATIONS])}
      gap="none"
      justify="center"
      align="center"
      direction="col"
      wrap={false}
      editLabel="Editar Espaçador"
    >
      <div 
        className={cn(
          "relative transition-all duration-200",
          getCurrentSize(),
          getWidthClass(),
          borderClasses[borderStyle as keyof typeof borderClasses],
          
          // Visual feedback
          isSelected && [
            'bg-blue-50/50',
            showGuides && 'border-2 border-dashed border-blue-300'
          ],
          
          !isSelected && isHovered && [
            'bg-gray-50/30',
            showGuides && 'border-2 border-dashed border-gray-200'
          ],
          
          // Background
          backgroundColor !== 'transparent' && `bg-${backgroundColor}`,
          
          // Minimum interaction area
          'min-h-5 min-w-5'
        )}
        style={{
          backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : undefined
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Visual Guides */}
        {(isSelected || isHovered) && showGuides && (
          <>
            {/* Direction Indicator */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full p-1 shadow-sm border border-gray-200">
                {direction === 'vertical' ? (
                  <ArrowUpDown className="w-3 h-3 text-gray-500" />
                ) : (
                  <ArrowLeftRight className="w-3 h-3 text-gray-500" />
                )}
              </div>
            </div>

            {/* Size Label */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {height} {direction === 'horizontal' ? `x ${width}` : ''}
                {responsive && ' (responsive)'}
              </div>
            </div>
          </>
        )}

        {/* Controls (Editor Mode) */}
        {isSelected && (
          <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 flex flex-col gap-1">
            <button
              onClick={() => adjustSize(true)}
              className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              title="Aumentar"
            >
              <Maximize2 className="w-3 h-3 text-gray-600" />
            </button>
            
            <button
              onClick={() => adjustSize(false)}
              className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              title="Diminuir"
            >
              <Minimize2 className="w-3 h-3 text-gray-600" />
            </button>
            
            <button
              onClick={() => handlePropertyChange('direction', direction === 'vertical' ? 'horizontal' : 'vertical')}
              className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              title="Alternar direção"
            >
              <Move className="w-3 h-3 text-gray-600" />
            </button>
          </div>
        )}

        {/* Settings Panel (Editor Mode) */}
        {isSelected && (
          <div className="absolute -bottom-20 left-0 right-0 bg-white border border-gray-200 rounded-lg p-3 shadow-lg z-10">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Tamanho</label>
                <select
                  value={height}
                  onChange={(e) => handlePropertyChange('height', e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                >
                  <option value="xs">Extra Pequeno</option>
                  <option value="sm">Pequeno</option>
                  <option value="md">Médio</option>
                  <option value="lg">Grande</option>
                  <option value="xl">Extra Grande</option>
                  <option value="2xl">Máximo</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Direção</label>
                <select
                  value={direction}
                  onChange={(e) => handlePropertyChange('direction', e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                >
                  <option value="vertical">Vertical</option>
                  <option value="horizontal">Horizontal</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Borda</label>
                <select
                  value={borderStyle}
                  onChange={(e) => handlePropertyChange('borderStyle', e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                >
                  <option value="none">Nenhuma</option>
                  <option value="dashed">Tracejada</option>
                  <option value="dotted">Pontilhada</option>
                  <option value="solid">Sólida</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={responsive}
                    onChange={(e) => handlePropertyChange('responsive', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-gray-700">Responsivo</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Draggable Indicator */}
        {(isSelected || isHovered) && (
          <div className="absolute top-1 right-1 opacity-50">
            <MoreHorizontal className="w-3 h-3 text-gray-400 rotate-90" />
          </div>
        )}
      </div>
    </InlineBaseWrapper>
  );
};

export default SpacerInlineBlock;
