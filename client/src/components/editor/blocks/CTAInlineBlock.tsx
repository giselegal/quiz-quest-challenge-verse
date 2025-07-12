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
  getThemeClasses,
  INLINE_ANIMATIONS
} from '@/utils/inlineComponentUtils';
import { 
  BRAND_COLORS,
  TYPOGRAPHY,
  SPACING,
  ANIMATIONS,
  EFFECTS,
  RESPONSIVE_PATTERNS as BRAND_RESPONSIVE
} from '@/utils/brandDesignSystem';
import { 
  ArrowRight, 
  ShoppingCart,
  Zap, 
  Star, 
  Clock, 
  Gift, 
  TrendingUp,
  Loader2
} from 'lucide-react';

const CTAInlineBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onPropertyChange,
  className = ''
}) => {
  const { 
    text = 'Transforme seu estilo hoje',
    buttonText = 'Quero meu Guia',
    price = 'R$ 97,00',
    showPrice = true,
    buttonStyle = 'brand',
    size = 'large',
    icon = 'shopping-cart',
    showIcon = true,
    useUsername = false,
    usernamePattern = 'Clique aqui {{username}}!',
    trackingEnabled = false,
    animation = 'scaleIn',
    theme = 'primary',
    urgencyText = '',
    showUrgency = false,
    loadingState = false,
    clickAction = 'redirect',
    redirectUrl = '#',
    conversionValue = 100
  } = block.properties;

  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Get username from context (placeholder)
  const username = 'Usuário';

  useEffect(() => {
    if (trackingEnabled) {
      trackComponentView(block.id, 'cta-inline');
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
      'shopping-cart': ShoppingCart,
      'zap': Zap,
      'star': Star,
      'clock': Clock,
      'gift': Gift,
      'trending-up': TrendingUp
    };
    const IconComponent = iconMap[icon as keyof typeof iconMap] || ShoppingCart;
    return <IconComponent className="w-5 h-5" />;
  };

  const handleClick = async () => {
    if (isLoading) return;

    setIsLoading(true);
    
    if (trackingEnabled) {
      trackComponentClick(block.id, 'cta-inline', 'cta_click');
      trackComponentConversion(block.id, 'cta-inline', conversionValue);
    }

    try {
      if (clickAction === 'redirect' && redirectUrl) {
        window.open(redirectUrl, '_blank');
      }
      // Add more click actions here (modal, form, etc.)
    } catch (error) {
      console.error('CTA click error:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 800);
    }
  };

  const personalizedText = getPersonalizedText(
    text,
    usernamePattern,
    username,
    useUsername
  );

  const personalizedButtonText = getPersonalizedText(
    buttonText,
    buttonText,
    username,
    useUsername
  );

  const styleClasses = {
    primary: `bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white ${EFFECTS.shadows.lg}`,
    brand: `bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white ${EFFECTS.shadows.brand}`,
    secondary: `bg-gradient-to-r from-amber-900 to-amber-950 hover:from-amber-950 hover:to-black text-white`,
    success: `bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white`,
    warning: `bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white`,
    danger: `bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white`
  };

  return (
    <InlineBaseWrapper
      block={block}
      isSelected={isSelected}
      onPropertyChange={onPropertyChange}
      className={cn(className, INLINE_ANIMATIONS[animation as keyof typeof INLINE_ANIMATIONS])}
      minHeight="4rem"
      editLabel="Editar CTA"
    >
      <div 
        className={cn(
          "w-full flex items-center gap-4 rounded-lg",
          SPACING.padding.md,
          ANIMATIONS.transition,
          ANIMATIONS.hover.lift,
          styleClasses[buttonStyle as keyof typeof styleClasses] || styleClasses.brand
        )}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Icon */}
        {showIcon && (
          <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              getIcon()
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <InlineEditableText
            value={personalizedText}
            onChange={(value) => handlePropertyChange('text', value)}
            placeholder="Texto principal do CTA..."
            fontSize="sm"
            fontWeight="medium"
            className="text-white placeholder-white/70 mb-1"
          />
          
          <InlineEditableText
            value={personalizedButtonText}
            onChange={(value) => handlePropertyChange('buttonText', value)}
            placeholder="Texto do botão..."
            fontSize="lg"
            fontWeight="bold"
            className="text-white placeholder-white/70"
          />
        </div>
        
        {/* Price */}
        {showPrice && (
          <div className="flex-shrink-0 text-right">
            <InlineEditableText
              value={price}
              onChange={(value) => handlePropertyChange('price', value)}
              placeholder="R$ 97,00"
              fontSize="lg"
              fontWeight="bold"
              className="text-white placeholder-white/70"
            />
            
            {showUrgency && urgencyText && (
              <div className="text-xs text-white/80 mt-1">
                ⏰ {urgencyText}
              </div>
            )}
          </div>
        )}
        
        {/* Arrow Icon */}
        <div className={cn(
          "flex-shrink-0 transition-transform duration-300",
          isHovered && "translate-x-1"
        )}>
          <ArrowRight className="w-6 h-6 text-white" />
        </div>
      </div>
    </InlineBaseWrapper>
  );
};

export default CTAInlineBlock;