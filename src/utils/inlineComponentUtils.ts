/**
 * Utilitários para personalização com username e sistema de métricas
 */

// Username utilities
export const USERNAME_PATTERNS = {
  GREETING: 'Olá {{username}}!',
  QUESTION: 'E você, {{username}}?',
  RESULT: 'Parabéns {{username}}!',
  CTA: 'Clique aqui {{username}}',
  TESTIMONIAL: 'Como {{username}}, eu também...',
  BONUS: 'Especial para {{username}}',
  GUARANTEE: 'Garantia para {{username}}',
  URGENCY: 'Última chance {{username}}!'
};

export const applyUsernamePersonalization = (
  text: string, 
  username: string | null | undefined,
  useUsername: boolean = false
): string => {
  if (!useUsername || !username || !text) {
    return text;
  }
  
  return text.replace(/\{\{username\}\}/g, username);
};

export const getPersonalizedText = (
  originalText: string,
  usernamePattern: string,
  username: string | null | undefined,
  useUsername: boolean = false
): string => {
  if (!useUsername) {
    return originalText;
  }
  
  const pattern = usernamePattern || originalText;
  return applyUsernamePersonalization(pattern, username, useUsername);
};

// Metrics utilities
export interface ComponentMetrics {
  views?: number;
  clicks?: number;
  conversions?: number;
  engagementRate?: number;
  lastUpdated?: string;
}

export const trackComponentView = (componentId: string, componentType: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'component_view', {
      component_id: componentId,
      component_type: componentType,
      timestamp: new Date().toISOString()
    });
  }
};

export const trackComponentClick = (
  componentId: string, 
  componentType: string, 
  action: string = 'click'
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'component_interaction', {
      component_id: componentId,
      component_type: componentType,
      action: action,
      timestamp: new Date().toISOString()
    });
  }
};

export const trackComponentConversion = (
  componentId: string,
  componentType: string,
  conversionValue?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'component_conversion', {
      component_id: componentId,
      component_type: componentType,
      value: conversionValue || 1,
      timestamp: new Date().toISOString()
    });
  }
};

// Animation utilities for inline components
export const INLINE_ANIMATIONS = {
  fadeIn: 'animate-in fade-in duration-300',
  slideInFromLeft: 'animate-in slide-in-from-left-4 duration-300',
  slideInFromRight: 'animate-in slide-in-from-right-4 duration-300',
  scaleIn: 'animate-in zoom-in-95 duration-300',
  bounceIn: 'animate-bounce'
};

export const getAnimationClass = (animation: keyof typeof INLINE_ANIMATIONS) => {
  return INLINE_ANIMATIONS[animation] || '';
};

// Responsive utilities for inline components
export const RESPONSIVE_PATTERNS = {
  // Mobile first approach for inline components
  MOBILE_STACK: 'flex-col md:flex-row',
  MOBILE_CENTER: 'text-center md:text-left',
  MOBILE_FULL: 'w-full md:w-auto',
  MOBILE_HIDE: 'hidden md:block',
  DESKTOP_HIDE: 'block md:hidden',
  
  // Spacing patterns
  SPACING_COMPACT: 'space-y-2 md:space-y-0 md:space-x-4',
  SPACING_NORMAL: 'space-y-3 md:space-y-0 md:space-x-6',
  SPACING_RELAXED: 'space-y-4 md:space-y-0 md:space-x-8',
  
  // Grid patterns for inline components
  GRID_AUTO: 'grid grid-cols-1 md:grid-cols-auto gap-4',
  GRID_2: 'grid grid-cols-1 md:grid-cols-2 gap-4',
  GRID_3: 'grid grid-cols-1 md:grid-cols-3 gap-4'
};

// Theme utilities for consistent styling
export const INLINE_THEMES = {
  primary: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-900',
    accent: 'text-blue-600'
  },
  secondary: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    text: 'text-gray-900',
    accent: 'text-gray-600'
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-900',
    accent: 'text-green-600'
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-900',
    accent: 'text-yellow-600'
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-900',
    accent: 'text-red-600'
  }
};

export const getThemeClasses = (theme: keyof typeof INLINE_THEMES) => {
  return INLINE_THEMES[theme] || INLINE_THEMES.primary;
};
