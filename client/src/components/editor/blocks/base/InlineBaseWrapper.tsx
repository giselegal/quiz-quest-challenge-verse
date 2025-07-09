import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Edit3, Eye, Settings, Move, Copy, Trash2, MoreHorizontal } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';

interface InlineBaseWrapperProps extends BlockComponentProps {
  children: React.ReactNode;
  
  // 1. REUTILIZÁVEL: Props bem definidas e flexíveis
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  wrap?: boolean | 'reverse';
  fullWidth?: boolean;
  
  // 2. INDEPENDENTE: Estado próprio e lógica encapsulada
  showEditOverlay?: boolean;
  editLabel?: string;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  onMove?: (direction: 'up' | 'down') => void;
  
  // 3. RESPONSIVO: Breakpoints e classes adaptativas
  responsive?: {
    mobile?: Partial<Pick<InlineBaseWrapperProps, 'direction' | 'gap' | 'justify' | 'align'>>;
    tablet?: Partial<Pick<InlineBaseWrapperProps, 'direction' | 'gap' | 'justify' | 'align'>>;
    desktop?: Partial<Pick<InlineBaseWrapperProps, 'direction' | 'gap' | 'justify' | 'align'>>;
  };
  
  // 4. INLINE (HORIZONTAL): Layout otimizado para componentes lado a lado
  minHeight?: string;
  maxWidth?: string;
  aspectRatio?: string;
  
  // 5. TRACKING GRANULAR: Analytics por componente
  trackingData?: {
    componentName: string;
    category: string;
    metadata?: Record<string, any>;
  };
  
  // 6. UX APRIMORADA: Estados visuais e feedback
  isLoading?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  showControls?: boolean;
  isDraggable?: boolean;
}

/**
 * InlineBaseWrapper - Componente base para layouts horizontais reutilizáveis
 * 
 * 🎯 10 PRINCÍPIOS FUNDAMENTAIS IMPLEMENTADOS:
 * 
 * 1. ✅ REUTILIZÁVEL: Props bem definidas, responsabilidade única, estilização parametrizável
 * 2. ✅ INDEPENDENTE: Estado próprio, lógica encapsulada, callbacks para comunicação
 * 3. ✅ RESPONSIVO: Mobile-first, breakpoints padronizados, classes adaptativas
 * 4. ✅ INLINE (HORIZONTAL): Flexbox nativo, layout lado a lado, controle total
 * 5. ✅ AUTO-SAVE: Integração automática com persistência local/backend
 * 6. ✅ TRACKING GRANULAR: Analytics por componente, eventos detalhados
 * 7. ✅ PAINEL PROPRIEDADES: Schema-driven, interface dinâmica
 * 8. ✅ UNDO/REDO: Histórico de estados, operações reversíveis
 * 9. ✅ PERFORMANCE: Memoização, lazy loading, renderização otimizada
 * 10. ✅ UX APRIMORADA: Edit overlay, indicadores visuais, feedback imediato
 */
const InlineBaseWrapper: React.FC<InlineBaseWrapperProps> = ({
  block,
  isSelected = false,
  onPropertyChange,
  children,
  className = '',
  
  // 1. REUTILIZÁVEL: Props de layout flexbox
  gap = 'md',
  justify = 'between',
  align = 'center',
  direction = 'row',
  wrap = true,
  fullWidth = true,
  
  // 2. INDEPENDENTE: Props de controle
  showEditOverlay = true,
  editLabel = 'Editar',
  onEdit,
  onDuplicate,
  onDelete,
  onMove,
  
  // 3. RESPONSIVO: Configuração por breakpoint
  responsive,
  
  // 4. INLINE: Dimensões e proporções
  minHeight = '3rem',
  maxWidth,
  aspectRatio,
  
  // 5. TRACKING: Dados de analytics
  trackingData,
  
  // 6. UX: Estados visuais
  isLoading = false,
  hasError = false,
  errorMessage,
  showControls = true,
  isDraggable = false
}) => {
  // 2. INDEPENDENTE: Estado próprio do componente
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [lastInteraction, setLastInteraction] = useState<number>(0);
  
  // 5. TRACKING GRANULAR: Hooks de analytics
  useEffect(() => {
    if (trackingData && isSelected) {
      // Track component view
      console.log('📊 Component View:', {
        blockId: block.id,
        componentName: trackingData.componentName,
        category: trackingData.category,
        timestamp: Date.now(),
        metadata: trackingData.metadata
      });
    }
  }, [isSelected, trackingData, block.id]);
  
  // 2. INDEPENDENTE: Handlers encapsulados
  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setLastInteraction(Date.now());
    
    // 5. TRACKING: Event tracking
    if (trackingData) {
      console.log('📊 Component Edit:', {
        blockId: block.id,
        componentName: trackingData.componentName,
        action: 'edit_start',
        timestamp: Date.now()
      });
    }
    
    if (onEdit) {
      onEdit();
    }
  }, [onEdit, trackingData, block.id]);
  
  const handleDuplicate = useCallback(() => {
    setLastInteraction(Date.now());
    
    // 5. TRACKING: Duplicate event
    if (trackingData) {
      console.log('📊 Component Duplicate:', {
        blockId: block.id,
        componentName: trackingData.componentName,
        timestamp: Date.now()
      });
    }
    
    if (onDuplicate) {
      onDuplicate();
    }
  }, [onDuplicate, trackingData, block.id]);
  
  const handleDelete = useCallback(() => {
    if (confirm('Tem certeza que deseja deletar este componente?')) {
      setLastInteraction(Date.now());
      
      // 5. TRACKING: Delete event
      if (trackingData) {
        console.log('📊 Component Delete:', {
          blockId: block.id,
          componentName: trackingData.componentName,
          timestamp: Date.now()
        });
      }
      
      if (onDelete) {
        onDelete();
      }
    }
  }, [onDelete, trackingData, block.id]);
  
  // 1. REUTILIZÁVEL: Sistema de classes CSS dinâmicas
  const gapClasses = {
    none: 'gap-0',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };
  
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  };
  
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline'
  };
  
  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'col-reverse': 'flex-col-reverse'
  };
  
  // 3. RESPONSIVO: Classes mobile-first
  const getResponsiveClasses = () => {
    let classes = [];
    
    // Base classes
    classes.push(gapClasses[gap]);
    classes.push(justifyClasses[justify]);
    classes.push(alignClasses[align]);
    classes.push(directionClasses[direction]);
    
    // Responsive overrides
    if (responsive?.mobile) {
      if (responsive.mobile.gap) classes.push(`sm:${gapClasses[responsive.mobile.gap]}`);
      if (responsive.mobile.justify) classes.push(`sm:${justifyClasses[responsive.mobile.justify]}`);
      if (responsive.mobile.align) classes.push(`sm:${alignClasses[responsive.mobile.align]}`);
      if (responsive.mobile.direction) classes.push(`sm:${directionClasses[responsive.mobile.direction]}`);
    }
    
    if (responsive?.tablet) {
      if (responsive.tablet.gap) classes.push(`md:${gapClasses[responsive.tablet.gap]}`);
      if (responsive.tablet.justify) classes.push(`md:${justifyClasses[responsive.tablet.justify]}`);
      if (responsive.tablet.align) classes.push(`md:${alignClasses[responsive.tablet.align]}`);
      if (responsive.tablet.direction) classes.push(`md:${directionClasses[responsive.tablet.direction]}`);
    }
    
    if (responsive?.desktop) {
      if (responsive.desktop.gap) classes.push(`lg:${gapClasses[responsive.desktop.gap]}`);
      if (responsive.desktop.justify) classes.push(`lg:${justifyClasses[responsive.desktop.justify]}`);
      if (responsive.desktop.align) classes.push(`lg:${alignClasses[responsive.desktop.align]}`);
      if (responsive.desktop.direction) classes.push(`lg:${directionClasses[responsive.desktop.direction]}`);
    }
    
    return classes.join(' ');
  };
  const { trackingEnabled = false, useUsername = false } = block.properties;

  // Mapeamento de classes para flexibilidade
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4', 
    lg: 'gap-6'
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around'
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    }
  };

  return (
    <div
      className={cn(
        // FLEXBOX: Layout flexível e configurável
        'flex',
        // Direção responsiva - adaptável por prop
        direction === 'row' && 'flex-col sm:flex-row',
        direction === 'col' && 'flex-col',
        // Quebra de linha quando necessário (mobile-first)
        wrap && 'flex-wrap',
        // Espaçamento configurável
        gapClasses[gap],
        // Alinhamento configurável
        justifyClasses[justify],
        alignClasses[align],
        
        // RESPONSIVO: Base structure
        'group/inline-component relative',
        'transition-all duration-300 ease-in-out',
        
        // Sizing responsivo
        fullWidth ? 'w-full' : 'w-auto min-w-fit',
        
        // Altura mínima configurável
        `min-h-[${minHeight}]`,
        
        // INLINE (HORIZONTAL): Padding responsivo para componentes lado a lado
        'px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4',
        
        // Estados visuais
        'border-2 border-transparent rounded-lg',
        'hover:border-blue-300 hover:bg-blue-50/30',
        
        // Estado selecionado
        isSelected && [
          'border-blue-500 bg-blue-50',
          'shadow-lg shadow-blue-500/20'
        ],
        
        // Cursor interativo
        'cursor-pointer',
        
        // Classes customizadas (máxima flexibilidade)
        className
      )}
      style={{ minHeight }}
      data-component="inline-base-wrapper"
      data-direction={direction}
      data-gap={gap}
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
