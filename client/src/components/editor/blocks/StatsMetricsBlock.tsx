
import React from 'react';
import type { BlockComponentProps } from '@/types/blocks';
import { TrendingUp, Users, Award, Target } from 'lucide-react';

interface Stat {
  id: string;
  label: string;
  value: string;
  icon?: string;
  description?: string;
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
}

interface StatsBlockProps extends BlockComponentProps {
  block: BlockComponentProps['block'] & {
    properties: {
      title?: string;
      subtitle?: string;
      stats?: Stat[];
      layout?: 'grid' | 'horizontal' | 'vertical' | 'cards';
      showIcons?: boolean;
      showTrends?: boolean;
      showDescriptions?: boolean;
      animateOnView?: boolean;
      backgroundColor?: string;
      textColor?: string;
      accentColor?: string;
    };
  };
}

const StatsMetricsBlock: React.FC<StatsBlockProps> = ({
  block,
  isSelected = false,
  onClick,
  className = ''
}) => {
  const {
    title = 'Our Numbers',
    subtitle = 'Key metrics that matter',
    stats = [],
    layout = 'grid',
    showIcons = true,
    showTrends = true,
    showDescriptions = true,
    animateOnView = true,
    backgroundColor = '#ffffff',
    textColor = '#374151',
    accentColor = '#B89B7A'
  } = block.properties;

  const getIcon = (iconName?: string) => {
    const icons: Record<string, React.ReactNode> = {
      'trending-up': <TrendingUp className="w-6 h-6" />,
      'users': <Users className="w-6 h-6" />,
      'award': <Award className="w-6 h-6" />,
      'target': <Target className="w-6 h-6" />
    };
    return icons[iconName || 'trending-up'] || <TrendingUp className="w-6 h-6" />;
  };

  const getLayoutClasses = () => {
    const layouts = {
      'grid': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
      'horizontal': 'flex flex-wrap justify-center gap-8',
      'vertical': 'space-y-6',
      'cards': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    };
    return layouts[layout] || layouts.grid;
  };

  return (
    <div 
      className={`
        w-full p-6 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-[#B89B7A]/40 hover:bg-[#FAF9F7]'
        }
        ${className}
      `}
      style={{ backgroundColor, color: textColor }}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: textColor }}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {stats.length > 0 ? (
        <div className={getLayoutClasses()}>
          {stats.map((stat) => (
            <div
              key={stat.id}
              className={`
                text-center p-6 rounded-lg
                ${layout === 'cards' ? 'bg-white shadow-sm border' : ''}
              `}
            >
              {showIcons && stat.icon && (
                <div className="flex justify-center mb-4" style={{ color: accentColor }}>
                  {getIcon(stat.icon)}
                </div>
              )}
              
              <div className="mb-2">
                <span className="text-3xl font-bold" style={{ color: accentColor }}>
                  {stat.value}
                </span>
                {showTrends && stat.trend && (
                  <span
                    className={`ml-2 text-sm font-medium ${
                      stat.trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.trend.direction === 'up' ? '↗' : '↘'} {stat.trend.value}
                  </span>
                )}
              </div>
              
              <div className="text-sm font-medium mb-1" style={{ color: textColor }}>
                {stat.label}
              </div>
              
              {showDescriptions && stat.description && (
                <div className="text-xs text-gray-500">
                  {stat.description}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 text-gray-400">
          <p>Nenhuma métrica configurada</p>
        </div>
      )}
    </div>
  );
};

export default StatsMetricsBlock;
