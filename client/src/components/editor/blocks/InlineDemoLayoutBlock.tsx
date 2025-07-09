import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import InlineBaseWrapper from './base/InlineBaseWrapper';
import InlineEditableText from './base/InlineEditableText';
import type { BlockComponentProps } from '@/types/blocks';
import { 
  getPersonalizedText, 
  RESPONSIVE_PATTERNS,
  INLINE_ANIMATIONS
} from '@/utils/inlineComponentUtils';
import { Button } from '@/components/ui/button';
import { Plus, Settings, Eye, Star, Users, TrendingUp } from 'lucide-react';

/**
 * InlineDemoLayoutBlock - Demonstração prática de componentes lado a lado
 * 
 * Este componente mostra como múltiplos elementos podem ser organizados
 * horizontalmente usando o InlineBaseWrapper com flexbox responsivo.
 * 
 * CARACTERÍSTICAS DEMONSTRADAS:
 * - Layout horizontal com múltiplos elementos
 * - Responsividade mobile-first (vertical no mobile, horizontal no desktop)
 * - Props flexíveis de gap, justify e align
 * - Componentes reutilizáveis e independentes
 * - Estados visuais interativos
 */
const InlineDemoLayoutBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onPropertyChange,
  className = ''
}) => {
  const { 
    title = 'Layout Horizontal Demonstração',
    subtitle = 'Componentes lado a lado com flexbox responsivo',
    layout = 'horizontal',
    showStats = true,
    showButtons = true,
    alignment = 'center',
    spacing = 'normal',
    responsive = true,
    animation = 'slideIn'
  } = block.properties;

  const [activeSection, setActiveSection] = useState<string>('left');

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  // Dados mock para demonstração
  const stats = [
    { icon: Users, label: 'Usuários', value: '1.2K' },
    { icon: Star, label: 'Avaliação', value: '4.9' },
    { icon: TrendingUp, label: 'Crescimento', value: '+15%' }
  ];

  return (
    <InlineBaseWrapper
      block={block}
      isSelected={isSelected}
      onPropertyChange={onPropertyChange}
      className={cn(className, INLINE_ANIMATIONS[animation as keyof typeof INLINE_ANIMATIONS])}
      
      // Layout horizontal configurável
      gap={spacing === 'tight' ? 'sm' : spacing === 'loose' ? 'lg' : 'md'}
      justify={alignment === 'left' ? 'start' : alignment === 'right' ? 'end' : 'between'}
      align="start"
      direction="row"
      wrap={responsive}
      
      // Responsividade
      responsive={{
        mobile: {
          direction: 'col',
          gap: 'sm',
          justify: 'center'
        },
        tablet: {
          direction: 'row',
          gap: 'md',
          justify: 'between'
        },
        desktop: {
          direction: 'row',
          gap: 'lg',
          justify: 'between'
        }
      }}
      
      minHeight="8rem"
      editLabel="Editar Layout Demo"
      trackingData={{
        componentName: 'InlineDemoLayoutBlock',
        category: 'demonstration',
        metadata: { layout, activeSection }
      }}
    >
      {/* LEFT SECTION: Content */}
      <div 
        className={cn(
          "flex-1 p-4 bg-white rounded-lg border-2 transition-all duration-200",
          activeSection === 'left' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
        )}
        onClick={() => setActiveSection('left')}
      >
        <div className="space-y-3">
          {/* Title */}
          <div>
            <InlineEditableText
              value={title}
              onChange={(value) => handlePropertyChange('title', value)}
              placeholder="Título do componente..."
              fontSize="lg"
              fontWeight="bold"
              className="text-gray-800"
            />
          </div>
          
          {/* Subtitle */}
          <div>
            <InlineEditableText
              value={subtitle}
              onChange={(value) => handlePropertyChange('subtitle', value)}
              placeholder="Subtítulo explicativo..."
              fontSize="sm"
              className="text-gray-600"
              multiline={true}
              maxLines={2}
            />
          </div>
          
          {/* Action Buttons */}
          {showButtons && (
            <div className="flex flex-wrap gap-2 pt-2">
              <Button size="sm" variant="default" className="text-xs">
                <Plus className="w-3 h-3 mr-1" />
                Adicionar
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <Settings className="w-3 h-3 mr-1" />
                Configurar
              </Button>
              <Button size="sm" variant="ghost" className="text-xs">
                <Eye className="w-3 h-3 mr-1" />
                Visualizar
              </Button>
            </div>
          )}
        </div>
        
        {/* Section Indicator */}
        <div className="absolute top-1 right-1 text-xs text-blue-500 font-medium">
          Seção Principal
        </div>
      </div>

      {/* CENTER DIVIDER (opcional para desktop) */}
      <div className="hidden lg:flex w-px bg-gray-200 self-stretch mx-2" />

      {/* RIGHT SECTION: Stats */}
      {showStats && (
        <div 
          className={cn(
            "flex-1 p-4 bg-white rounded-lg border-2 transition-all duration-200",
            activeSection === 'right' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'
          )}
          onClick={() => setActiveSection('right')}
        >
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Estatísticas
            </h3>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-3">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <stat.icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-600">{stat.label}</div>
                    <div className="text-sm font-bold text-gray-800">{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Progress Indicator */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Progresso</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
          </div>
          
          {/* Section Indicator */}
          <div className="absolute top-1 right-1 text-xs text-green-500 font-medium">
            Métricas
          </div>
        </div>
      )}

      {/* MOBILE RESPONSIVE MESSAGE */}
      <div className="lg:hidden w-full mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="text-xs text-blue-700 text-center">
          📱 <strong>Responsivo:</strong> Layout vertical no mobile, horizontal no desktop
        </div>
      </div>
    </InlineBaseWrapper>
  );
};

export default InlineDemoLayoutBlock;
