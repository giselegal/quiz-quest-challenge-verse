import React from 'react';

// Imports dos componentes flexíveis
import FlexContainer, { type FlexContainerProps } from '../flexible/FlexContainer';
import FlexCard, { type FlexCardProps } from '../flexible/FlexCard';
import FlexText, { type FlexTextProps } from '../flexible/FlexText';
import FlexButton, { type FlexButtonProps } from '../flexible/FlexButton';
import FlexImage, { type FlexImageProps } from '../flexible/FlexImage';

export type FlexComponentType = 'container' | 'card' | 'text' | 'button' | 'image';

export interface FlexComponentConfig {
  type: FlexComponentType;
  name: string;
  icon: string;
  description: string;
  category: 'layout' | 'content' | 'media' | 'interactive';
  defaultProps: Record<string, any>;
  editableFields: string[];
  previewProps?: Record<string, any>;
}

export interface FlexComponentInstance {
  id: string;
  type: FlexComponentType;
  name: string;
  props: Record<string, any>;
  children?: FlexComponentInstance[];
  parentId?: string;
}

// Configurações dos componentes flexíveis
export const FLEX_COMPONENTS_CONFIG: Record<FlexComponentType, FlexComponentConfig> = {
  container: {
    type: 'container',
    name: 'Container Flexível',
    icon: '📦',
    description: 'Container flexível para organizar outros componentes',
    category: 'layout',
    defaultProps: {
      direction: 'row',
      wrap: 'wrap',
      justifyContent: 'start',
      alignItems: 'stretch',
      gap: 'md',
      padding: 'md',
      backgroundColor: 'transparent',
      width: 'full'
    },
    editableFields: [
      'direction',
      'wrap', 
      'justifyContent',
      'alignItems',
      'gap',
      'padding',
      'margin',
      'backgroundColor',
      'borderRadius',
      'width',
      'height',
      'minHeight',
      'maxWidth'
    ]
  },

  card: {
    type: 'card',
    name: 'Card Modular',
    icon: '🎴',
    description: 'Card flexível e reutilizável',
    category: 'content',
    defaultProps: {
      title: 'Título do Card',
      content: 'Conteúdo do card aqui...',
      backgroundColor: '#ffffff',
      textColor: '#432818',
      accentColor: '#B89B7A',
      width: 'auto',
      padding: 'md',
      shadow: 'sm',
      rounded: 'md',
      alignment: 'left'
    },
    editableFields: [
      'title',
      'content',
      'subtitle',
      'icon',
      'image',
      'backgroundColor',
      'textColor',
      'accentColor',
      'borderColor',
      'width',
      'height',
      'padding',
      'alignment',
      'shadow',
      'rounded',
      'borderWidth',
      'fontSize',
      'fontWeight',
      'clickable',
      'hover'
    ],
    previewProps: {
      title: 'Preview Card',
      content: 'Este é um exemplo de como o card aparece',
      icon: '✨'
    }
  },

  text: {
    type: 'text',
    name: 'Texto Flexível',
    icon: '📝',
    description: 'Texto com múltiplas opções de formatação',
    category: 'content',
    defaultProps: {
      content: 'Texto editável',
      tag: 'p',
      fontSize: 'base',
      fontWeight: 'normal',
      fontFamily: 'sans',
      color: '#432818',
      alignment: 'left',
      width: 'auto'
    },
    editableFields: [
      'content',
      'tag',
      'fontSize',
      'fontWeight',
      'fontFamily',
      'color',
      'backgroundColor',
      'alignment',
      'lineHeight',
      'letterSpacing',
      'textTransform',
      'textDecoration',
      'margin',
      'padding',
      'width',
      'maxWidth',
      'truncate',
      'gradient',
      'shadow',
      'border',
      'animation'
    ],
    previewProps: {
      content: 'Texto de exemplo',
      fontSize: 'lg',
      fontWeight: 'medium'
    }
  },

  button: {
    type: 'button',
    name: 'Botão Interativo',
    icon: '🔲',
    description: 'Botão customizável com múltiplas variações',
    category: 'interactive',
    defaultProps: {
      text: 'Clique aqui',
      variant: 'default',
      size: 'default',
      backgroundColor: '#B89B7A',
      textColor: '#ffffff',
      width: 'auto',
      rounded: 'md'
    },
    editableFields: [
      'text',
      'icon',
      'variant',
      'size',
      'backgroundColor',
      'textColor',
      'borderColor',
      'hoverColor',
      'width',
      'disabled',
      'loading',
      'rounded',
      'shadow',
      'fontSize',
      'fontWeight',
      'badge'
    ],
    previewProps: {
      text: 'Botão Preview',
      icon: '🚀'
    }
  },

  image: {
    type: 'image',
    name: 'Imagem Responsiva',
    icon: '🖼️',
    description: 'Imagem com controles avançados de exibição',
    category: 'media',
    defaultProps: {
      src: 'https://via.placeholder.com/400x300?text=Imagem',
      alt: 'Imagem exemplo',
      width: 'auto',
      height: 'auto',
      objectFit: 'cover',
      rounded: 'md',
      shadow: 'sm'
    },
    editableFields: [
      'src',
      'alt',
      'title',
      'width',
      'height',
      'objectFit',
      'objectPosition',
      'rounded',
      'border',
      'shadow',
      'overlay',
      'filter',
      'hover',
      'lazy',
      'fallback',
      'aspectRatio',
      'margin',
      'padding',
      'clickable'
    ],
    previewProps: {
      src: 'https://via.placeholder.com/300x200?text=Preview',
      alt: 'Preview da imagem'
    }
  }
};

// Função para renderizar componente flexível
export const renderFlexComponent = (
  type: FlexComponentType, 
  props: Record<string, any> = {},
  children?: React.ReactNode
): React.ReactElement | null => {
  const config = FLEX_COMPONENTS_CONFIG[type];
  if (!config) {
    console.warn(`Componente flexível não encontrado: ${type}`);
    return null;
  }

  // Mesclar props padrão com props fornecidas
  const finalProps = { ...config.defaultProps, ...props };

  switch (type) {
    case 'container':
      return React.createElement(FlexContainer, finalProps as FlexContainerProps, children);
    
    case 'card':
      return React.createElement(FlexCard, finalProps as FlexCardProps);
    
    case 'text':
      return React.createElement(FlexText, finalProps as FlexTextProps);
    
    case 'button':
      return React.createElement(FlexButton, finalProps as FlexButtonProps);
    
    case 'image':
      return React.createElement(FlexImage, finalProps as FlexImageProps);
    
    default:
      console.warn(`Tipo de componente não mapeado: ${type}`);
      return null;
  }
};

// Função para obter configuração de um componente
export const getFlexComponentConfig = (type: FlexComponentType): FlexComponentConfig | null => {
  return FLEX_COMPONENTS_CONFIG[type] || null;
};

// Função para obter componentes por categoria
export const getFlexComponentsByCategory = (category: FlexComponentConfig['category']) => {
  return Object.values(FLEX_COMPONENTS_CONFIG)
    .filter(config => config.category === category);
};

// Função para obter todos os componentes flexíveis
export const getAllFlexComponents = () => {
  return Object.values(FLEX_COMPONENTS_CONFIG);
};

// Função para validar props de um componente flexível
export const validateFlexComponentProps = (
  type: FlexComponentType,
  props: Record<string, any>
): { isValid: boolean; errors: string[] } => {
  const config = getFlexComponentConfig(type);
  
  if (!config) {
    return { isValid: false, errors: [`Componente flexível não encontrado: ${type}`] };
  }

  const errors: string[] = [];
  
  // Validações específicas por tipo
  switch (type) {
    case 'text':
      if (props.content && typeof props.content !== 'string') {
        errors.push('Conteúdo deve ser uma string');
      }
      break;
    
    case 'image':
      if (props.src && typeof props.src !== 'string') {
        errors.push('URL da imagem deve ser uma string');
      }
      break;
    
    case 'button':
      if (props.text && typeof props.text !== 'string') {
        errors.push('Texto do botão deve ser uma string');
      }
      break;
  }

  return { isValid: errors.length === 0, errors };
};

// Função para criar uma instância de componente flexível
export const createFlexComponentInstance = (
  type: FlexComponentType,
  customProps: Record<string, any> = {}
): FlexComponentInstance => {
  const config = getFlexComponentConfig(type);
  if (!config) {
    throw new Error(`Tipo de componente inválido: ${type}`);
  }

  return {
    id: `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    name: config.name,
    props: { ...config.defaultProps, ...customProps },
    children: type === 'container' ? [] : undefined
  };
};

// Função para renderizar árvore de componentes
export const renderFlexComponentTree = (instance: FlexComponentInstance): React.ReactElement | null => {
  const children = instance.children?.map(child => 
    renderFlexComponentTree(child)
  );

  return renderFlexComponent(instance.type, instance.props, children);
};

export default {
  renderFlexComponent,
  getFlexComponentConfig,
  getFlexComponentsByCategory,
  getAllFlexComponents,
  validateFlexComponentProps,
  createFlexComponentInstance,
  renderFlexComponentTree,
  FLEX_COMPONENTS_CONFIG
};
