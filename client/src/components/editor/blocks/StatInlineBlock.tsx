import React from 'react';
import { cn } from '@/lib/utils';
import { Users, TrendingUp, Heart, Clock, Edit3 } from 'lucide-react';

type StatType = 'users' | 'growth' | 'satisfaction' | 'time';

interface StatInlineBlockProps {
  value?: string;
  label?: string;
  type?: StatType;
  showIcon?: boolean;
  onClick?: () => void;
  className?: string;
  onPropertyChange?: (key: string, value: any) => void;
  disabled?: boolean;
}

const StatInlineBlock: React.FC<StatInlineBlockProps> = ({
  value = '1000+',
  label = 'Clientes Satisfeitas',
  type = 'users',
  showIcon = true,
  onClick,
  className,
  onPropertyChange,
  disabled = false
}) => {
  const getIcon = () => {
    switch (type) {
      case 'users': return <Users className="w-5 h-5 text-[#B89B7A]" />;
      case 'growth': return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'satisfaction': return <Heart className="w-5 h-5 text-red-500" />;
      case 'time': return <Clock className="w-5 h-5 text-blue-500" />;
      default: return <Users className="w-5 h-5 text-[#B89B7A]" />;
    }
  };

  return (
    <div 
      className={cn(
        "inline-flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm",
        "transition-all duration-200 hover:shadow-md hover:scale-105 cursor-pointer",
        "min-w-[150px] max-w-[250px] w-full text-center",
        disabled && "opacity-75 cursor-not-allowed",
        className
      )}
      onClick={!disabled ? onClick : undefined}
    >
      {/* Icon */}
      {showIcon && (
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
      )}
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div 
          className="text-2xl font-bold text-[#432818] truncate"
          onClick={(e) => {
            e.stopPropagation();
            if (onPropertyChange && !disabled) {
              const newValue = prompt('Novo valor:', value);
              if (newValue !== null) onPropertyChange('value', newValue);
            }
          }}
        >
          {value}
        </div>
        <div 
          className="text-sm text-[#8F7A6A] truncate"
          onClick={(e) => {
            e.stopPropagation();
            if (onPropertyChange && !disabled) {
              const newLabel = prompt('Novo rótulo:', label);
              if (newLabel !== null) onPropertyChange('label', newLabel);
            }
          }}
        >
          {label}
        </div>
      </div>
      
      {/* Edit indicator */}
      {!disabled && (
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <Edit3 className="w-4 h-4 text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default StatInlineBlock;