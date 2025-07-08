import React from 'react';
import { cn } from '@/lib/utils';
import { Shield, Check, Star, Award, Edit3 } from 'lucide-react';

type BadgeType = 'security' | 'guarantee' | 'rating' | 'achievement';

interface BadgeInlineBlockProps {
  text?: string;
  type?: BadgeType;
  variant?: 'default' | 'success' | 'warning' | 'info';
  showIcon?: boolean;
  onClick?: () => void;
  className?: string;
  onPropertyChange?: (key: string, value: any) => void;
  disabled?: boolean;
}

const BadgeInlineBlock: React.FC<BadgeInlineBlockProps> = ({
  text = 'Compra Segura',
  type = 'security',
  variant = 'default',
  showIcon = true,
  onClick,
  className,
  onPropertyChange,
  disabled = false
}) => {
  const getIcon = () => {
    switch (type) {
      case 'security': return <Shield className="w-4 h-4" />;
      case 'guarantee': return <Check className="w-4 h-4" />;
      case 'rating': return <Star className="w-4 h-4" />;
      case 'achievement': return <Award className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-[#fff7f3] text-[#aa6b5d] border-[#B89B7A]/20';
    }
  };

  return (
    <div 
      className={cn(
        "inline-flex items-center gap-2 px-3 py-2 rounded-full border text-sm font-medium",
        "transition-all duration-200 hover:shadow-md hover:scale-105 cursor-pointer",
        "w-full",
        getVariantStyles(),
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
      
      {/* Text */}
      <span 
        className="truncate"
        onClick={(e) => {
          e.stopPropagation();
          if (onPropertyChange && !disabled) {
            const newText = prompt('Novo texto:', text);
            if (newText !== null) onPropertyChange('text', newText);
          }
        }}
      >
        {text}
      </span>
      
      {/* Edit indicator */}
      {!disabled && (
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <Edit3 className="w-3 h-3 opacity-50" />
        </div>
      )}
    </div>
  );
};

export default BadgeInlineBlock;