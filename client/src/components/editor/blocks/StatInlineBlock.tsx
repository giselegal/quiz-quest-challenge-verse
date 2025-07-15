import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import InlineBaseWrapper from './base/InlineBaseWrapper';
import InlineEditableText from './base/InlineEditableText';
import type { BlockComponentProps } from '@/types/blocks';
import { 
  getPersonalizedText, 
  trackComponentView, 
  trackComponentClick,
  RESPONSIVE_PATTERNS,
  INLINE_ANIMATIONS
} from '@/utils/inlineComponentUtils';
import { 
  Users, 
  TrendingUp, 
  Heart, 
  Clock, 
  Star,
  Award,
  Target,
  Zap,
  BarChart3
} from 'lucide-react';

const StatInlineBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  onPropertyChange,
  className = ''
}) => {
  const {
    value = '1000+',
    label = 'Clientes Satisfeitas',
    type = 'users',
    icon = 'users',
    showIcon = true,
    animatedCounter = true,
    useUsername = false,
    usernamePattern = '{{username}}, você será a próxima!',
    trackingEnabled = false,
    animation = 'scaleIn',
    theme = 'primary',
    size = 'medium',
    layout = 'horizontal'
  } = block.properties;

  const [displayValue, setDisplayValue] = useState('0');
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Get username from context (placeholder)
  const username = 'Usuário';

  useEffect(() => {
    if (trackingEnabled) {
      trackComponentView(block.id, 'stat-inline');
    }
  }, [trackingEnabled, block.id]);

  useEffect(() => {
    if (animatedCounter && value) {
      animateValue();
    } else {
      setDisplayValue(value);
    }
  }, [value, animatedCounter]);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const getIcon = () => {
    const iconMap = {
      'users': Users,
      'trending-up': TrendingUp,
      'heart': Heart,
      'clock': Clock,
      'star': Star,
      'award': Award,
      'target': Target,
      'zap': Zap,
      'bar-chart': BarChart3
    };
    const IconComponent = iconMap[icon as keyof typeof iconMap] || Users;
    
    const colorMap = {
      'users': 'text-[#B89B7A]',
      'trending-up': 'text-green-500',
      'heart': 'text-red-500',
      'clock': 'text-blue-500',
      'star': 'text-yellow-500',
      'award': 'text-purple-500',
      'target': 'text-indigo-500',
      'zap': 'text-orange-500',
      'bar-chart': 'text-cyan-500'
    };
    
    const colorClass = colorMap[icon as keyof typeof colorMap] || 'text-[#B89B7A]';
    
    return <IconComponent className={`w-6 h-6 ${colorClass}`} />;
  };

  const animateValue = () => {
    const numericValue = parseFloat(value.replace(/[^\d.]/g, ''));
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    setIsAnimating(true);
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const currentValue = Math.floor(numericValue * progress);
      
      // Preserve the original format (with + or other characters)
      const suffix = value.replace(/[\d.]/g, '').replace(/[0-9]/g, '');
      setDisplayValue(currentValue + suffix);

      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
        setIsAnimating(false);
      }
    }, stepDuration);
  };

  const handleClick = () => {
    if (trackingEnabled) {
      trackComponentClick(block.id, 'stat-inline', 'stat_click');
    }
    if (animatedCounter) {
      animateValue();
    }
  };

  const personalizedLabel = getPersonalizedText(
    label,
    usernamePattern,
    username,
    useUsername
  );

  const sizeClasses = {
    small: {
      value: 'text-xl md:text-2xl',
      label: 'text-xs md:text-sm',
      icon: 'w-4 h-4 md:w-5 md:h-5',
      padding: 'p-3'
    },
    medium: {
      value: 'text-2xl md:text-3xl',
      label: 'text-sm md:text-base',
      icon: 'w-5 h-5 md:w-6 md:h-6',
      padding: 'p-4'
    },
    large: {
      value: 'text-3xl md:text-4xl',
      label: 'text-base md:text-lg',
      icon: 'w-6 h-6 md:w-8 md:h-8',
      padding: 'p-5'
    }
  };

  const currentSize = sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.medium;

  return (
    <InlineBaseWrapper
      block={block}
      isSelected={isSelected}
      onPropertyChange={onPropertyChange}
      className={cn(className, INLINE_ANIMATIONS[animation as keyof typeof INLINE_ANIMATIONS])}
      minHeight="4rem"
      editLabel="Editar Estatística"
    >
      <div 
        className={cn(
          "w-full bg-white rounded-lg border border-gray-200 shadow-sm",
          "transition-all duration-300 hover:shadow-md hover:scale-[1.02] cursor-pointer",
          currentSize.padding,
          layout === 'vertical' ? 'flex flex-col items-center text-center' : 'flex items-center gap-4'
        )}
        onClick={handleClick}
      >
        {/* Icon */}
        {showIcon && (
          <div className={cn(
            "flex-shrink-0 p-2 bg-gray-50 rounded-full",
            layout === 'vertical' && 'mb-2'
          )}>
            {getIcon()}
          </div>
        )}
        
        {/* Content */}
        <div className={cn(
          "flex-1",
          layout === 'vertical' ? 'text-center' : 'text-left'
        )}>
          {/* Value */}
          <div className={cn(
            "font-bold text-gray-800 leading-none",
            currentSize.value,
            isAnimating && 'animate-pulse'
          )}>
            <InlineEditableText
              value={displayValue}
              onChange={(value) => handlePropertyChange('value', value)}
              placeholder="1000+"
              fontSize={size === 'large' ? '3xl' : size === 'small' ? 'xl' : '2xl'}
              fontWeight="bold"
              textAlign={layout === 'vertical' ? 'center' : 'left'}
              className="text-gray-800"
            />
          </div>
          
          {/* Label */}
          <div className={cn(
            "text-gray-600 mt-1",
            currentSize.label
          )}>
            <InlineEditableText
              value={personalizedLabel}
              onChange={(value) => handlePropertyChange('label', value)}
              placeholder="Estatística..."
              fontSize={size === 'large' ? 'base' : 'sm'}
              textAlign={layout === 'vertical' ? 'center' : 'left'}
              className="text-gray-600"
            />
          </div>
        </div>

        {/* Animated Indicator */}
        {isAnimating && (
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
    </InlineBaseWrapper>
  );
};

export default StatInlineBlock;