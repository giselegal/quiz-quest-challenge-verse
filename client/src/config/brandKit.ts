// Brand Kit Global - Configurações centralizadas de marca
export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  button: {
    primary: string;
    primaryHover: string;
    secondary: string;
    secondaryHover: string;
  };
  success: string;
  warning: string;
  error: string;
}

export interface BrandTypography {
  fontFamily: {
    primary: string;
    secondary: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface BrandSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

export interface BrandConfig {
  colors: BrandColors;
  typography: BrandTypography;
  spacing: BrandSpacing;
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// Configuração padrão da marca
export const defaultBrandConfig: BrandConfig = {
  colors: {
    primary: '#B89B7A',
    secondary: '#432818',
    accent: '#aa6b5d',
    background: '#FFFBF7',
    text: {
      primary: '#432818',
      secondary: '#6B4F43',
      muted: '#8B7355'
    },
    button: {
      primary: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      primaryHover: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
      secondary: '#B89B7A',
      secondaryHover: '#A08966'
    },
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444'
  },
  typography: {
    fontFamily: {
      primary: 'Inter, system-ui, sans-serif',
      secondary: 'Playfair Display, serif',
      mono: 'Fira Code, monospace'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      tight: 1.1,
      normal: 1.5,
      relaxed: 1.7
    }
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem'
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  }
};

// Função para aplicar brand kit em componentes
export const applyBrandStyles = (element: HTMLElement, brandConfig: BrandConfig = defaultBrandConfig) => {
  const { colors, typography, spacing } = brandConfig;
  
  // Aplicar variáveis CSS customizadas
  element.style.setProperty('--brand-primary', colors.primary);
  element.style.setProperty('--brand-secondary', colors.secondary);
  element.style.setProperty('--brand-accent', colors.accent);
  element.style.setProperty('--brand-background', colors.background);
  element.style.setProperty('--brand-text-primary', colors.text.primary);
  element.style.setProperty('--brand-text-secondary', colors.text.secondary);
  element.style.setProperty('--brand-text-muted', colors.text.muted);
  element.style.setProperty('--brand-button-primary', colors.button.primary);
  element.style.setProperty('--brand-button-primary-hover', colors.button.primaryHover);
  element.style.setProperty('--brand-font-family-primary', typography.fontFamily.primary);
  element.style.setProperty('--brand-font-family-secondary', typography.fontFamily.secondary);
  element.style.setProperty('--brand-spacing-md', spacing.md);
  element.style.setProperty('--brand-spacing-lg', spacing.lg);
};

// Hook para usar brand kit
export const useBrandKit = () => {
  const [brandConfig, setBrandConfig] = useState<BrandConfig>(defaultBrandConfig);
  
  const updateBrandConfig = (updates: Partial<BrandConfig>) => {
    setBrandConfig(prev => ({
      ...prev,
      ...updates,
      colors: { ...prev.colors, ...updates.colors },
      typography: { ...prev.typography, ...updates.typography },
      spacing: { ...prev.spacing, ...updates.spacing }
    }));
  };
  
  const applyToDocument = () => {
    if (typeof document !== 'undefined') {
      applyBrandStyles(document.documentElement, brandConfig);
    }
  };
  
  const generateCSS = () => {
    const { colors, typography, spacing, borderRadius, shadows } = brandConfig;
    
    return `
      :root {
        --brand-primary: ${colors.primary};
        --brand-secondary: ${colors.secondary};
        --brand-accent: ${colors.accent};
        --brand-background: ${colors.background};
        --brand-text-primary: ${colors.text.primary};
        --brand-text-secondary: ${colors.text.secondary};
        --brand-text-muted: ${colors.text.muted};
        --brand-button-primary: ${colors.button.primary};
        --brand-button-primary-hover: ${colors.button.primaryHover};
        --brand-success: ${colors.success};
        --brand-warning: ${colors.warning};
        --brand-error: ${colors.error};
        
        --brand-font-family-primary: ${typography.fontFamily.primary};
        --brand-font-family-secondary: ${typography.fontFamily.secondary};
        --brand-font-family-mono: ${typography.fontFamily.mono};
        
        --brand-spacing-xs: ${spacing.xs};
        --brand-spacing-sm: ${spacing.sm};
        --brand-spacing-md: ${spacing.md};
        --brand-spacing-lg: ${spacing.lg};
        --brand-spacing-xl: ${spacing.xl};
        
        --brand-border-radius-sm: ${borderRadius.sm};
        --brand-border-radius-md: ${borderRadius.md};
        --brand-border-radius-lg: ${borderRadius.lg};
        --brand-border-radius-xl: ${borderRadius.xl};
        
        --brand-shadow-sm: ${shadows.sm};
        --brand-shadow-md: ${shadows.md};
        --brand-shadow-lg: ${shadows.lg};
        --brand-shadow-xl: ${shadows.xl};
      }
      
      .brand-text-primary { color: var(--brand-text-primary); }
      .brand-text-secondary { color: var(--brand-text-secondary); }
      .brand-text-muted { color: var(--brand-text-muted); }
      .brand-bg-primary { background-color: var(--brand-primary); }
      .brand-bg-secondary { background-color: var(--brand-secondary); }
      .brand-bg-background { background-color: var(--brand-background); }
      .brand-font-primary { font-family: var(--brand-font-family-primary); }
      .brand-font-secondary { font-family: var(--brand-font-family-secondary); }
      
      .brand-button {
        background: var(--brand-button-primary);
        color: white;
        font-family: var(--brand-font-family-primary);
        padding: var(--brand-spacing-md) var(--brand-spacing-lg);
        border-radius: var(--brand-border-radius-md);
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .brand-button:hover {
        background: var(--brand-button-primary-hover);
        transform: translateY(-2px);
        box-shadow: var(--brand-shadow-lg);
      }
    `;
  };
  
  return {
    brandConfig,
    updateBrandConfig,
    applyToDocument,
    generateCSS
  };
};

import { useState } from 'react';
