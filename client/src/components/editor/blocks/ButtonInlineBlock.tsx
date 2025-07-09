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
  BRAND_COLORS,
  BUTTON_STYLES,
  TYPOGRAPHY,
  ANIMATIONS,
  EFFECTS,
  RESPONSIVE_PATTERNS as BRAND_RESPONSIVE
} from '@/utils/brandDesignSystem';
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

  // Usar o sistema de design da marca
  const variantClasses = {
    primary: `bg-[${BRAND_COLORS.primary.main}] hover:bg-[${BRAND_COLORS.primary.hover}] text-white border-[${BRAND_COLORS.primary.main}] hover:border-[${BRAND_COLORS.primary.hover}] ${EFFECTS.shadows.brand}`,
    secondary: `bg-[${BRAND_COLORS.secondary.main}] hover:bg-[${BRAND_COLORS.secondary.hover}] text-white border-[${BRAND_COLORS.secondary.main}] hover:border-[${BRAND_COLORS.secondary.hover}]`,
    accent: `bg-gradient-to-r from-[${BRAND_COLORS.primary.main}] to-[${BRAND_COLORS.secondary.main}] hover:from-[${BRAND_COLORS.primary.hover}] hover:to-[${BRAND_COLORS.secondary.hover}] text-white border-transparent ${EFFECTS.shadows.glow}`,
    outline: `bg-transparent hover:bg-[${BRAND_COLORS.primary.main}] text-[${BRAND_COLORS.primary.main}] hover:text-white border-[${BRAND_COLORS.primary.main}] ${EFFECTS.borders.brand}`,
    ghost: `bg-transparent hover:bg-[${BRAND_COLORS.primary.light}] text-[${BRAND_COLORS.primary.main}] hover:text-[${BRAND_COLORS.secondary.main}] border-transparent`,
    success: `bg-[${BRAND_COLORS.success}] hover:bg-green-700 text-white border-[${BRAND_COLORS.success}]`,
    warning: `bg-[${BRAND_COLORS.warning}] hover:bg-yellow-600 text-white border-[${BRAND_COLORS.warning}]`,
    danger: `bg-[${BRAND_COLORS.error}] hover:bg-red-700 text-white border-[${BRAND_COLORS.error}]`
  };

  // Tamanhos responsivos com tipografia da marca
  const sizeClasses = {
    sm: `px-3 py-1.5 md:px-4 md:py-2 ${TYPOGRAPHY.button.small}`,
    default: `px-4 py-2 md:px-6 md:py-2.5 ${TYPOGRAPHY.button.medium}`,
    medium: `px-4 py-2 md:px-6 md:py-2.5 ${TYPOGRAPHY.button.medium}`,
    lg: `px-6 py-2.5 md:px-8 md:py-3 ${TYPOGRAPHY.button.large}`,
    large: `px-6 py-2.5 md:px-8 md:py-3 ${TYPOGRAPHY.button.large}`,
    xl: `px-8 py-3 md:px-10 md:py-4 ${TYPOGRAPHY.button.xl}`
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
        BRAND_RESPONSIVE.flex.centerToLeft
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
            
            // Style/Variant classes com cores da marca
            variantClasses[currentVariant as keyof typeof variantClasses],
            
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