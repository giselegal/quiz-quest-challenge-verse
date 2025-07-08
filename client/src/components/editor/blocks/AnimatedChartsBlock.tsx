import React, { useState, useEffect } from 'react';
import { useSpring, animated, useTrail, config } from '@react-spring/web';
import { InlineEditableText } from './InlineEditableText';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Sparkles,
  Target
} from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DataPoint {
  id: string;
  label: string;
  value: number;
  previousValue?: number;
  suffix?: string;
  prefix?: string;
  color?: string;
  trend?: 'up' | 'down' | 'neutral';
  category?: string;
}

interface AnimatedChartsBlockProps extends BlockComponentProps {
  block: {
    id: string;
    type: 'animated-charts';
    properties: {
      title?: string;
      subtitle?: string;
      dataPoints?: DataPoint[];
      chartType?: 'bars' | 'lines' | 'circles' | 'mixed';
      animationDelay?: number;
      showTrends?: boolean;
      showComparison?: boolean;
      colorScheme?: 'brand' | 'rainbow' | 'monochrome' | 'gradient';
      backgroundColor?: string;
      gridLayout?: boolean;
    };
  };
}

const AnimatedChartsBlock: React.FC<AnimatedChartsBlockProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    title = 'Performance & Resultados',
    subtitle = 'Acompanhe seus resultados em tempo real',
    dataPoints = [
      {
        id: 'point-1',
        label: 'Receita Total',
        value: 127500,
        previousValue: 98400,
        prefix: 'R$ ',
        color: '#22c55e',
        trend: 'up',
        category: 'Financeiro'
      },
      {
        id: 'point-2',
        label: 'Clientes Ativas',
        value: 2847,
        previousValue: 2105,
        suffix: '+',
        color: '#3b82f6',
        trend: 'up',
        category: 'Clientes'
      },
      {
        id: 'point-3',
        label: 'Taxa de Conversão',
        value: 67,
        previousValue: 54,
        suffix: '%',
        color: '#f59e0b',
        trend: 'up',
        category: 'Performance'
      },
      {
        id: 'point-4',
        label: 'Avaliação Média',
        value: 4.9,
        previousValue: 4.7,
        suffix: '/5',
        color: '#ef4444',
        trend: 'up',
        category: 'Qualidade'
      }
    ],
    chartType = 'mixed',
    animationDelay = 100,
    showTrends = true,
    showComparison = true,
    colorScheme = 'brand',
    backgroundColor = '#ffffff',
    gridLayout = true
  } = block.properties;

  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  // Main container spring
  const containerSpring = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: `translateY(${isVisible ? 0 : 20}px)`,
    config: config.gentle
  });

  // Trail animation for data points
  const trail = useTrail(dataPoints.length, {
    opacity: isVisible ? 1 : 0,
    transform: `translateY(${isVisible ? 0 : 30}px)`,
    config: config.molasses,
    delay: animationDelay
  });

  const getColorForValue = (index: number, customColor?: string) => {
    if (customColor) return customColor;
    
    const colors = {
      brand: ['#B89B7A', '#D4B896', '#E8D5B7', '#FAF9F7'],
      rainbow: ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#8b5cf6'],
      monochrome: ['#374151', '#6b7280', '#9ca3af', '#d1d5db'],
      gradient: ['#ff6b6b', '#ffa726', '#66bb6a', '#42a5f5']
    };
    
    return colors[colorScheme][index % colors[colorScheme].length];
  };

  const calculatePercentageChange = (current: number, previous?: number) => {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="w-4 h-4 text-green-500" />;
      case 'down':
        return <ArrowDownRight className="w-4 h-4 text-red-500" />;
      case 'neutral':
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const renderBarChart = (point: DataPoint, index: number, style: any) => {
    const maxValue = Math.max(...dataPoints.map(p => p.value));
    const barHeight = (point.value / maxValue) * 200;
    
    const barSpring = useSpring({
      height: isVisible ? barHeight : 0,
      config: config.wobbly,
      delay: index * 150
    });

    return (
      <animated.div style={style} className="flex flex-col items-center">
        <Card className="w-full h-full p-4 hover:shadow-lg transition-shadow">
          <CardContent className="flex flex-col items-center justify-end h-64">
            <div className="flex-1 flex items-end w-full justify-center mb-4">
              <animated.div
                style={barSpring}
                className="w-12 rounded-t-lg flex items-end justify-center"
                style={{
                  backgroundColor: getColorForValue(index, point.color),
                  ...barSpring
                }}
              />
            </div>
            
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 mb-1">
                {point.prefix}{point.value.toLocaleString()}{point.suffix}
              </div>
              <div className="text-sm text-gray-600 mb-2">{point.label}</div>
              
              {showTrends && point.trend && (
                <div className="flex items-center justify-center gap-1">
                  {getTrendIcon(point.trend)}
                  <span className="text-xs text-gray-500">
                    {point.previousValue && 
                      `${calculatePercentageChange(point.value, point.previousValue).toFixed(1)}%`
                    }
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </animated.div>
    );
  };

  const renderCircleChart = (point: DataPoint, index: number, style: any) => {
    const percentage = point.suffix === '%' ? point.value : 
                      Math.min((point.value / 5000) * 100, 100); // Normalize to percentage
    
    const circleSpring = useSpring({
      strokeDasharray: isVisible ? `${percentage} ${100 - percentage}` : '0 100',
      config: config.slow,
      delay: index * 200
    });

    return (
      <animated.div style={style}>
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <CardContent className="flex flex-col items-center">
            <div className="relative w-24 h-24 mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                <animated.path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={getColorForValue(index, point.color)}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={circleSpring.strokeDasharray}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold" style={{ color: getColorForValue(index, point.color) }}>
                  {Math.round(percentage)}%
                </span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 mb-1">
                {point.prefix}{point.value.toLocaleString()}{point.suffix}
              </div>
              <div className="text-sm text-gray-600">{point.label}</div>
            </div>
          </CardContent>
        </Card>
      </animated.div>
    );
  };

  const renderStatCard = (point: DataPoint, index: number, style: any) => {
    const isHovered = hoveredPoint === point.id;
    
    const hoverSpring = useSpring({
      transform: `scale(${isHovered ? 1.05 : 1})`,
      config: config.wobbly
    });

    return (
      <animated.div 
        style={{ ...style, ...hoverSpring }}
        onMouseEnter={() => setHoveredPoint(point.id)}
        onMouseLeave={() => setHoveredPoint(null)}
      >
        <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div 
                className="p-3 rounded-lg"
                style={{ backgroundColor: `${getColorForValue(index, point.color)}20` }}
              >
                <Target 
                  className="w-6 h-6" 
                  style={{ color: getColorForValue(index, point.color) }}
                />
              </div>
              
              {showTrends && point.trend && (
                <Badge 
                  variant={point.trend === 'up' ? 'default' : 'destructive'}
                  className="flex items-center gap-1"
                >
                  {getTrendIcon(point.trend)}
                  {point.previousValue && 
                    `${calculatePercentageChange(point.value, point.previousValue).toFixed(1)}%`
                  }
                </Badge>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-900">
                {point.prefix}{point.value.toLocaleString()}{point.suffix}
              </div>
              
              <div className="text-sm font-medium text-gray-600">
                {isEditing ? (
                  <InlineEditableText
                    value={point.label}
                    onSave={(value: string) => {
                      const updatedPoints = dataPoints.map(p => 
                        p.id === point.id ? { ...p, label: value } : p
                      );
                      handlePropertyChange('dataPoints', updatedPoints);
                    }}
                    className="inline-block"
                    placeholder="Rótulo do dado"
                    tag="span"
                  />
                ) : (
                  point.label
                )}
              </div>
              
              {point.category && (
                <Badge variant="outline" className="text-xs">
                  {point.category}
                </Badge>
              )}
              
              {showComparison && point.previousValue && (
                <div className="text-xs text-gray-500 pt-2 border-t">
                  Anterior: {point.prefix}{point.previousValue.toLocaleString()}{point.suffix}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </animated.div>
    );
  };

  const renderChart = (point: DataPoint, index: number) => {
    const style = trail[index];
    
    switch (chartType) {
      case 'bars':
        return renderBarChart(point, index, style);
      case 'circles':
        return renderCircleChart(point, index, style);
      case 'lines':
      case 'mixed':
      default:
        return renderStatCard(point, index, style);
    }
  };

  if (!dataPoints || dataPoints.length === 0) {
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
        <p className="text-center">Configure os dados do gráfico no painel de propriedades.</p>
      </div>
    );
  }

  return (
    <animated.div
      style={containerSpring}
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#432818] mb-4">
              <InlineEditableText
                value={title}
                onSave={(value: string) => handlePropertyChange('title', value)}
                className="inline-block"
                placeholder="Título dos gráficos"
                tag="span"
              />
            </h2>
            
            {subtitle && (
              <p className="text-lg text-[#8F7A6A] max-w-2xl mx-auto">
                <InlineEditableText
                  value={subtitle}
                  onSave={(value: string) => handlePropertyChange('subtitle', value)}
                  className="inline-block"
                  placeholder="Subtítulo dos gráficos"
                  tag="span"
                />
              </p>
            )}
          </div>
        )}

        {/* Charts Grid */}
        <div className={cn(
          gridLayout 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
            : 'flex flex-wrap justify-center gap-6'
        )}>
          {dataPoints.map((point, index) => renderChart(point, index))}
        </div>

        {/* Summary */}
        <div className="mt-12 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#B89B7A]" />
            <span className="text-sm text-[#8F7A6A] font-medium">
              Atualizado em tempo real
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div>Total de métricas: {dataPoints.length}</div>
            <div>Tendência geral: {dataPoints.filter(p => p.trend === 'up').length} crescendo</div>
            <div>Última atualização: agora</div>
          </div>
        </div>
      </div>

      {/* Debug info */}
      {isEditing && (
        <div className="mt-8 p-4 bg-[#FAF9F7] border border-[#B89B7A]/20 rounded-md">
          <p className="text-sm text-[#8F7A6A]">
            Modo de edição: {dataPoints.length} ponto(s) de dados • 
            Tipo: {chartType} • 
            Esquema de cores: {colorScheme} • 
            Grid: {gridLayout ? 'ativo' : 'inativo'} • 
            Hover: {hoveredPoint || 'nenhum'}
          </p>
        </div>
      )}
    </animated.div>
  );
};

export default AnimatedChartsBlock;
