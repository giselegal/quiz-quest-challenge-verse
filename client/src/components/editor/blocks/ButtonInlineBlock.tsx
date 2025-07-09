import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import InlineBaseWrapper from './base/InlineBaseWrapper';
import InlineEditableText from './base/InlineEditableText';
import type { BlockComponentProps } from '@/types/blocks';
import { 
  getPersonalizedText, 
  trackComponentView, 
  trackComponentClick,
  trackComponentConversion,
  RESPONSIVE_PATTERNS,
  INLINE_ANIMATIONS
} from '@/utils/inlineComponentUtils';
import { 
  ArrowRight, 
  Download, 
  ExternalLink, 
  Play,
  ShoppingCart,
  Star,
  Heart,
  Zap,
  Loader2
} from 'lucide-react';

const ButtonInlineBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onPropertyChange,
  className = ''
}) => {
  const { 
    text = 'Clique Aqui',
    style = 'primary',
    variant = 'primary', // new property name
    size = 'default',
    icon = 'arrow-right',
    showIcon = true,
    iconPosition = 'right',
    fullWidth = false,
    disabled = false,
    loading = false,
    url = '',
    action = 'link',
    useUsername = false,
    usernamePattern = 'Clique aqui {{username}}!',
    trackingEnabled = false,
    animation = 'scaleIn',
    clickAction = 'redirect',
    redirectUrl = '',
    conversionValue = 50
  } = block.properties;

  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Get username from context (placeholder)
  const username = 'Usuário';

  useEffect(() => {
    if (trackingEnabled) {
      trackComponentView(block.id, 'button-inline');
    }
  }, [trackingEnabled, block.id]);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const getIcon = () => {
    const iconMap = {
      'arrow-right': ArrowRight,
      'download': Download,
      'external-link': ExternalLink,
      'play': Play,
      'shopping-cart': ShoppingCart,
      'star': Star,
      'heart': Heart,
      'zap': Zap
    };
    const IconComponent = iconMap[icon as keyof typeof iconMap] || ArrowRight;
    return <IconComponent className="w-4 h-4" />;
  };

  const handleClick = async () => {
    if (disabled || isLoading) return;

    setIsLoading(true);
    
    if (trackingEnabled) {
      trackComponentClick(block.id, 'button-inline', 'button_click');
      trackComponentConversion(block.id, 'button-inline', conversionValue);
    }

    try {
      const targetUrl = redirectUrl || url;
      if ((clickAction === 'redirect' || action === 'link') && targetUrl) {
        window.open(targetUrl, '_blank');
      }
    } catch (error) {
      console.error('Button click error:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const personalizedText = getPersonalizedText(
    text,
    usernamePattern,
    username,
    useUsername
  );

  // Support both old 'style' and new 'variant' properties
  const currentVariant = variant || style;

  const styleClasses = {
    primary: 'bg-[#B89B7A] hover:bg-[#a08965] text-white border-[#B89B7A] hover:border-[#a08965]',
    secondary: 'bg-white hover:bg-gray-50 text-gray-800 border-gray-300 hover:border-gray-400',
    accent: 'bg-[#432818] hover:bg-[#2a1910] text-white border-[#432818] hover:border-[#2a1910]',
    outline: 'bg-transparent hover:bg-[#B89B7A] text-[#B89B7A] hover:text-white border-[#B89B7A]',
    success: 'bg-green-600 hover:bg-green-700 text-white border-green-600',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white border-red-600',
    ghost: 'bg-transparent hover:bg-gray-50 text-gray-700 border-transparent'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    default: 'px-6 py-2.5 text-base',
    medium: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
    large: 'px-8 py-3 text-lg',
    xl: 'px-10 py-4 text-xl'
  };

  return (
    <InlineBaseWrapper
      block={block}
      isSelected={isSelected}
      onPropertyChange={onPropertyChange}
      className={cn(className, INLINE_ANIMATIONS[animation as keyof typeof INLINE_ANIMATIONS])}
      minHeight="2.5rem"
      editLabel="Editar Botão"
    >
      <div className={cn(
        "flex items-center",
        fullWidth ? "w-full" : "w-auto",
        RESPONSIVE_PATTERNS.MOBILE_CENTER
      )}>
        <button
          onClick={handleClick}
          disabled={disabled || isLoading}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            // Base button styles
            'relative overflow-hidden rounded-lg font-semibold border-2',
            'transition-all duration-300 ease-in-out',
            'transform hover:scale-105 active:scale-95',
            'focus:outline-none focus:ring-4 focus:ring-blue-300',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
            
            // Size classes
            sizeClasses[size as keyof typeof sizeClasses],
            
            // Style/Variant classes
            styleClasses[currentVariant as keyof typeof styleClasses],
            
            // Full width
            fullWidth && 'w-full',
            
            // Loading state
            (isLoading || loading) && 'cursor-wait',
            
            // Hover effects
            isHovered && 'shadow-lg'
          )}
        >
          {/* Loading Overlay */}
          {(isLoading || loading) && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          )}
          
          {/* Button Content */}
          <div className={cn(
            "flex items-center gap-2",
            (isLoading || loading) && "opacity-50",
            fullWidth && "justify-center"
          )}>
            {/* Left Icon */}
            {showIcon && iconPosition === 'left' && !isLoading && (
              <span className={cn(
                'transition-transform duration-300',
                isHovered && '-translate-x-1'
              )}>
                {getIcon()}
              </span>
            )}
            
            {/* Text */}
            <InlineEditableText
              value={personalizedText}
              onChange={(value) => handlePropertyChange('text', value)}
              placeholder="Texto do botão..."
              fontSize={size === 'xl' ? 'xl' : size === 'lg' || size === 'large' ? 'lg' : size === 'sm' ? 'sm' : 'base'}
              fontWeight="semibold"
              textAlign="center"
              className="bg-transparent outline-none min-w-0"
            />
            
            {/* Right Icon */}
            {showIcon && iconPosition === 'right' && !isLoading && (
              <span className={cn(
                'transition-transform duration-300',
                isHovered && 'translate-x-1'
              )}>
                {getIcon()}
              </span>
            )}
          </div>
        </button>
      </div>
    </InlineBaseWrapper>
  );
};

export default ButtonInlineBlock;