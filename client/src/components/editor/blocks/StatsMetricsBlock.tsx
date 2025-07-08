import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { InlineEditableText } from './InlineEditableText';
import { 
  TrendingUp, 
  Users, 
  Star, 
  Target, 
  Clock,
  Award,
  Heart,
  ShoppingCart,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Crown,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { BlockComponentProps } from '@/types/blocks';

interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  change?: number;
  changeLabel?: string;
  isPercentage?: boolean;
  icon?: string;
  color?: string;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  isAnimated?: boolean;
}

interface StatsBlockProps extends BlockComponentProps {
  block: {
    id: string;
    type: 'stats-metrics';
    properties: {
      title?: string;
      subtitle?: string;
      stats?: Stat[];
      layout?: 'grid' | 'horizontal' | 'vertical' | 'cards';
      columns?: number;
      showProgress?: boolean;
      showTrends?: boolean;
      showIcons?: boolean;
      animateNumbers?: boolean;
      cardStyle?: 'minimal' | 'elegant' | 'bold' | 'gradient';
      backgroundColor?: string;
      textColor?: string;
      accentColor?: string;
    };
  };
}

const StatsMetricsBlock: React.FC<StatsBlockProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    title = 'Nossos Resultados Falam por Si',
    subtitle = 'Transformando a vida de milhares de mulheres todos os dias',
    stats = [
      {
        id: 'stat-1',
        label: 'Mulheres Transformadas',
        value: 15420,
        suffix: '+',
        change: 12.5,
        changeLabel: 'este mês',
        icon: 'Users',
        color: '#B89B7A',
        description: 'Descobriram seu estilo único',
        trend: 'up',
        isAnimated: true
      },
      {
        id: 'stat-2',
        label: 'Avaliação Média',
        value: 4.9,
        suffix: '/5',
        change: 0.2,
        changeLabel: 'último trimestre',
        icon: 'Star',
        color: '#F59E0B',
        description: 'Satisfação das clientes',
        trend: 'up',
        isAnimated: true
      },
      {
        id: 'stat-3',
        label: 'Taxa de Sucesso',
        value: 96,
        suffix: '%',
        change: 3.1,
        changeLabel: 'este ano',
        icon: 'Target',
        color: '#10B981',
        description: 'Clientes satisfeitas',
        trend: 'up',
        isAnimated: true
      },
      {
        id: 'stat-4',
        label: 'Estilos Descobertos',
        value: 8,
        prefix: '',
        icon: 'Crown',
        color: '#8B5CF6',
        description: 'Diferentes personalidades de estilo',
        trend: 'neutral',
        isAnimated: false
      }
    ],
    layout = 'grid',
    columns = 4,
    showProgress = false,
    showTrends = true,
    showIcons = true,
    animateNumbers = true,
    cardStyle = 'elegant',
    backgroundColor = '#ffffff',
    textColor = '#432818',
    accentColor = '#B89B7A'
  } = block.properties;

  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  // Animate numbers on mount
  useEffect(() => {
    if (animateNumbers) {
      stats.forEach(stat => {
        if (stat.isAnimated) {
          let current = 0;
          const target = stat.value;
          const increment = target / 100;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setAnimatedValues(prev => ({
              ...prev,
              [stat.id]: current
            }));
          }, 20);
        } else {
          setAnimatedValues(prev => ({
            ...prev,
            [stat.id]: stat.value
          }));
        }
      });
    } else {
      const initialValues: Record<string, number> = {};
      stats.forEach(stat => {
        initialValues[stat.id] = stat.value;
      });
      setAnimatedValues(initialValues);
    }
  }, [stats, animateNumbers]);

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ComponentType<any>> = {
      TrendingUp, Users, Star, Target, Clock, Award, Heart, ShoppingCart,
      CheckCircle, ArrowUp, ArrowDown, Sparkles, Crown, Zap
    };
    return icons[iconName] || TrendingUp;
  };

  const getCardStyleClasses = () => {
    const baseClasses = 'relative overflow-hidden transition-all duration-300 hover:shadow-lg group';
    
    switch (cardStyle) {
      case 'minimal':
        return `${baseClasses} bg-white border border-gray-200 rounded-lg shadow-sm`;
      case 'bold':
        return `${baseClasses} bg-gradient-to-br from-[#B89B7A] to-[#A68A6A] text-white rounded-xl shadow-lg`;
      case 'gradient':
        return `${baseClasses} bg-gradient-to-br from-white to-[#FAF9F7] border border-[#B89B7A]/20 rounded-xl shadow-md`;
      case 'elegant':
      default:
        return `${baseClasses} bg-white border border-[#B89B7A]/20 rounded-lg shadow-md hover:shadow-xl hover:border-[#B89B7A]/40`;
    }
  };

  const formatNumber = (num: number, isDecimal = false) => {
    if (isDecimal) {
      return num.toFixed(1);
    }
    
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return Math.floor(num).toLocaleString('pt-BR');
  };

  const renderStat = (stat: Stat, index: number) => {
    const IconComponent = getIcon(stat.icon || 'TrendingUp');
    const currentValue = animatedValues[stat.id] || 0;
    const isDecimal = stat.value % 1 !== 0;

    return (
      <motion.div
        key={stat.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="w-full"
      >
        <Card className={getCardStyleClasses()}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              {showIcons && (
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: stat.color || accentColor }}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              )}
              {showTrends && stat.change && stat.trend !== 'neutral' && (
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  {stat.change}%
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3">
            <div>
              <div className="text-3xl font-bold mb-1" style={{ color: stat.color || accentColor }}>
                {stat.prefix}
                {formatNumber(currentValue, isDecimal)}
                {stat.suffix}
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                {stat.label}
              </CardTitle>
            </div>

            {stat.description && (
              <p className="text-sm text-gray-600">
                {stat.description}
              </p>
            )}

            {showProgress && stat.isPercentage && (
              <div className="space-y-2">
                <Progress 
                  value={currentValue} 
                  className="h-2"
                  style={{ '--progress-background': stat.color || accentColor } as any}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            )}

            {showTrends && stat.changeLabel && stat.change && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Badge variant="outline" className="text-xs">
                  {stat.changeLabel}
                </Badge>
              </div>
            )}
          </CardContent>

          {/* Decorative background element */}
          <div 
            className="absolute top-4 right-4 opacity-10"
            style={{ color: stat.color || accentColor }}
          >
            <IconComponent className="w-8 h-8" />
          </div>
        </Card>
      </motion.div>
    );
  };

  if (!stats || stats.length === 0) {
    return (
      <div
        className={`
          bg-gray-100 p-8 rounded-lg text-gray-500 flex flex-col items-center justify-center min-h-[300px] cursor-pointer transition-all duration-200
          ${isSelected 
            ? 'outline-2 outline-[#B89B7A] outline-offset-2' 
            : 'hover:shadow-sm'
          }
          ${className}
        `}
        onClick={onClick}
        data-block-id={block.id}
        data-block-type={block.type}
      >
        <TrendingUp className="w-16 h-16 mb-4 opacity-50" />
        <p className="text-center text-lg font-medium mb-2">Nenhuma estatística configurada</p>
        <p className="text-center">Configure as métricas no painel de propriedades.</p>
      </div>
    );
  }

  return (
    <div
      className={`
        py-12 px-4 cursor-pointer transition-all duration-200 w-full
        ${isSelected 
          ? 'outline-2 outline-[#B89B7A] outline-offset-2' 
          : 'hover:shadow-sm'
        }
        ${className}
      `}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <InlineEditableText
                value={title}
                onSave={(value: string) => handlePropertyChange('title', value)}
                className="inline-block"
                placeholder="Título das estatísticas"
                tag="h2"
              />
            </h2>
            {subtitle && (
              <p className="text-lg text-opacity-80 max-w-3xl mx-auto">
                <InlineEditableText
                  value={subtitle}
                  onSave={(value: string) => handlePropertyChange('subtitle', value)}
                  className="inline-block"
                  placeholder="Subtítulo das estatísticas"
                  tag="p"
                />
              </p>
            )}
          </div>
        )}

        {/* Stats Grid */}
        <div className={`
          ${layout === 'horizontal' ? 'flex flex-wrap justify-center gap-6' :
            layout === 'vertical' ? 'space-y-6 max-w-md mx-auto' :
            `grid gap-6 ${
              columns === 1 ? 'grid-cols-1 max-w-md mx-auto' :
              columns === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto' :
              columns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto' :
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
            }`
          }
        `}>
          {stats.map((stat, index) => renderStat(stat, index))}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Dados atualizados em tempo real</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-500" />
            <span>Empresa certificada</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500" />
            <span>Mais de 10 anos de experiência</span>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mt-8 p-4 bg-[#FAF9F7] border border-[#B89B7A]/20 rounded-md">
          <p className="text-sm text-[#8F7A6A]">
            Modo de edição: {stats.length} estatística(s) • 
            Layout: {layout} • 
            Colunas: {columns} • 
            {animateNumbers && 'Animações ativas'} • 
            Estilo: {cardStyle}
          </p>
        </div>
      )}
    </div>
  );
};

export default StatsMetricsBlock;
