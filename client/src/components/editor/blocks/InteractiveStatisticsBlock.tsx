import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { InlineEditableText } from './InlineEditableText';
import { TrendingUp, Users, Star, Award, Heart, Target, ArrowUpRight, Sparkles } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Statistic {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon?: string;
  color?: string;
  description?: string;
  trend?: number; // percentage change
}

interface InteractiveStatisticsBlockProps extends BlockComponentProps {
  block: {
    id: string;
    type: 'interactive-statistics';
    properties: {
      title?: string;
      subtitle?: string;
      statistics?: Statistic[];
      layout?: 'grid' | 'horizontal' | 'vertical';
      animationType?: 'counter' | 'progress' | 'fade';
      showTrends?: boolean;
      showIcons?: boolean;
      colorScheme?: 'brand' | 'gradient' | 'monochrome';
      backgroundColor?: string;
      cardStyle?: 'elevated' | 'flat' | 'bordered';
    };
  };
}

// Função para mapear ícones por string
const getIcon = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    'TrendingUp': TrendingUp,
    'Users': Users,
    'Star': Star,
    'Award': Award,
    'Heart': Heart,
    'Target': Target,
    'ArrowUpRight': ArrowUpRight,
    'Sparkles': Sparkles,
  };
  return icons[iconName] || TrendingUp;
};

// Componente de contador animado
const AnimatedCounter: React.FC<{
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}> = ({ value, prefix = '', suffix = '', duration = 2 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const springValue = useSpring(0, { 
    stiffness: 100, 
    damping: 30,
    restDelta: 0.001 
  });
  const display = useTransform(springValue, (current) => 
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [springValue, isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
};

const InteractiveStatisticsBlock: React.FC<InteractiveStatisticsBlockProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    title = 'Resultados que Comprovam',
    subtitle = 'Números reais de transformação das nossas clientes',
    statistics = [
      {
        id: 'stat-1',
        label: 'Clientes Transformadas',
        value: 2847,
        suffix: '+',
        icon: 'Users',
        color: '#B89B7A',
        description: 'Mulheres descobriram seu estilo',
        trend: 24
      },
      {
        id: 'stat-2',
        label: 'Avaliação Média',
        value: 4.9,
        suffix: '/5',
        icon: 'Star',
        color: '#F4D03F',
        description: 'Satisfação dos clientes',
        trend: 8
      },
      {
        id: 'stat-3',
        label: 'Aumento de Autoestima',
        value: 89,
        suffix: '%',
        icon: 'Heart',
        color: '#F1948A',
        description: 'Relatam maior confiança',
        trend: 15
      },
      {
        id: 'stat-4',
        label: 'Economia no Guarda-roupa',
        value: 67,
        suffix: '%',
        icon: 'Target',
        color: '#85C1E9',
        description: 'Compras mais inteligentes',
        trend: 31
      }
    ],
    layout = 'grid',
    animationType = 'counter',
    showTrends = true,
    showIcons = true,
    colorScheme = 'brand',
    backgroundColor = '#ffffff',
    cardStyle = 'elevated'
  } = block.properties;

  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'horizontal':
        return 'flex flex-wrap gap-4 justify-center';
      case 'vertical':
        return 'flex flex-col gap-4 max-w-md mx-auto';
      case 'grid':
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6';
    }
  };

  const getCardStyleClasses = () => {
    const baseClasses = 'relative overflow-hidden transition-all duration-300 group cursor-pointer';
    
    switch (cardStyle) {
      case 'flat':
        return `${baseClasses} bg-white rounded-lg`;
      case 'bordered':
        return `${baseClasses} bg-white border-2 border-gray-200 rounded-lg hover:border-[#B89B7A]/40`;
      case 'elevated':
      default:
        return `${baseClasses} bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1`;
    }
  };

  const getColorClasses = (color?: string) => {
    if (colorScheme === 'monochrome') {
      return 'text-gray-600';
    }
    return color ? { color } : 'text-[#B89B7A]';
  };

  const renderStatistic = (stat: Statistic, index: number) => {
    const IconComponent = getIcon(stat.icon || 'TrendingUp');
    const isHovered = hoveredStat === stat.id;

    return (
      <motion.div
        key={stat.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        onHoverStart={() => setHoveredStat(stat.id)}
        onHoverEnd={() => setHoveredStat(null)}
      >
        <Card className={getCardStyleClasses()}>
          <CardContent className="p-6">
            {/* Header com ícone e trend */}
            <div className="flex items-start justify-between mb-4">
              {showIcons && (
                <div 
                  className="p-3 rounded-full bg-gray-50 group-hover:bg-[#FAF9F7] transition-colors"
                  style={getColorClasses(stat.color)}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
              )}
              
              {showTrends && stat.trend && (
                <Badge 
                  variant="secondary" 
                  className="bg-green-100 text-green-700 flex items-center gap-1"
                >
                  <ArrowUpRight className="w-3 h-3" />
                  +{stat.trend}%
                </Badge>
              )}
            </div>

            {/* Valor principal */}
            <div className="mb-2">
              <div className="text-3xl font-bold text-[#432818] mb-1">
                {animationType === 'counter' ? (
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                ) : (
                  `${stat.prefix || ''}${stat.value.toLocaleString()}${stat.suffix || ''}`
                )}
              </div>
              
              <h3 className="text-sm font-medium text-[#8F7A6A] uppercase tracking-wide">
                {isEditing ? (
                  <InlineEditableText
                    value={stat.label}
                    onSave={(value: string) => {
                      const updatedStats = statistics.map((s: Statistic) => 
                        s.id === stat.id ? { ...s, label: value } : s
                      );
                      handlePropertyChange('statistics', updatedStats);
                    }}
                    className="inline-block"
                    placeholder="Rótulo da estatística"
                    tag="span"
                  />
                ) : (
                  stat.label
                )}
              </h3>
            </div>

            {/* Descrição */}
            {stat.description && (
              <p className="text-xs text-gray-600 leading-relaxed">
                {isEditing ? (
                  <InlineEditableText
                    value={stat.description}
                    onSave={(value: string) => {
                      const updatedStats = statistics.map((s: Statistic) => 
                        s.id === stat.id ? { ...s, description: value } : s
                      );
                      handlePropertyChange('statistics', updatedStats);
                    }}
                    className="inline-block"
                    placeholder="Descrição da estatística"
                    tag="span"
                  />
                ) : (
                  stat.description
                )}
              </p>
            )}

            {/* Indicador de progresso animado */}
            {animationType === 'progress' && (
              <div className="mt-4">
                <motion.div 
                  className="h-1 bg-gray-200 rounded-full overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: index * 0.2 }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: stat.color || '#B89B7A' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(stat.value, 100)}%` }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
                  />
                </motion.div>
              </div>
            )}

            {/* Efeito de hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#B89B7A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{
                background: colorScheme === 'gradient' 
                  ? `linear-gradient(135deg, ${stat.color || '#B89B7A'}15, transparent)`
                  : undefined
              }}
            />
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  if (!statistics || statistics.length === 0) {
    return (
      <div
        className={cn(
          'bg-gray-100 p-8 rounded-lg text-gray-500 flex flex-col items-center justify-center min-h-[300px] cursor-pointer transition-all duration-200',
          isSelected 
            ? 'outline-2 outline-[#B89B7A] outline-offset-2' 
            : 'hover:shadow-sm',
          className
        )}
        onClick={onClick}
        data-block-id={block.id}
        data-block-type={block.type}
      >
        <TrendingUp className="w-12 h-12 mb-4 opacity-50" />
        <p className="text-center">Configure as estatísticas no painel de propriedades.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'py-12 px-4 cursor-pointer transition-all duration-200',
        isSelected 
          ? 'outline-2 outline-[#B89B7A] outline-offset-2' 
          : 'hover:shadow-sm',
        className
      )}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {title && (
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-[#432818] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <InlineEditableText
                value={title}
                onSave={(value: string) => handlePropertyChange('title', value)}
                className="inline-block"
                placeholder="Título das estatísticas"
                tag="span"
              />
            </motion.h2>
            
            {subtitle && (
              <motion.p 
                className="text-lg text-[#8F7A6A] max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <InlineEditableText
                  value={subtitle}
                  onSave={(value: string) => handlePropertyChange('subtitle', value)}
                  className="inline-block"
                  placeholder="Subtítulo das estatísticas"
                  tag="span"
                />
              </motion.p>
            )}
          </div>
        )}

        {/* Estatísticas */}
        <div className={getLayoutClasses()}>
          {statistics.map((stat, index) => renderStatistic(stat, index))}
        </div>

        {/* Badge decorativo */}
        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Badge 
            variant="outline" 
            className="border-[#B89B7A] text-[#B89B7A] bg-white/80 backdrop-blur-sm flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Resultados Reais e Verificados
          </Badge>
        </motion.div>
      </div>

      {/* Debug info para edição */}
      {isEditing && (
        <motion.div 
          className="mt-8 p-4 bg-[#FAF9F7] border border-[#B89B7A]/20 rounded-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-sm text-[#8F7A6A]">
            Modo de edição: {statistics.length} estatística(s) • 
            Layout: {layout} • 
            Animação: {animationType} •
            Hovered: {hoveredStat || 'nenhuma'}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default InteractiveStatisticsBlock;
