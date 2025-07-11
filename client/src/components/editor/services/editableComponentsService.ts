// Serviço para gerenciar componentes editáveis no editor
import React, { type ReactNode } from 'react';

// Importar componentes editáveis
import MotivationSectionEditable, { type MotivationSectionProps } from '../adaptable/MotivationSectionEditable';
import BonusSectionEditable, { type BonusSectionProps } from '../adaptable/BonusSectionEditable';
import GuaranteeSectionEditable, { type GuaranteeSectionProps } from '../adaptable/GuaranteeSectionEditable';

// Importar componentes originais como fallback
import MotivationSection from '@/components/result/MotivationSection';
import BonusSection from '@/components/result/BonusSection';
import GuaranteeSection from '@/components/result/GuaranteeSection';
import { BeforeAfterTransformation } from '@/components/result/BeforeAfterTransformation';
import Testimonials from '@/components/quiz-result/sales/Testimonials';
import SecurePurchaseElement from '@/components/result/SecurePurchaseElement';

export interface EditableComponentConfig {
  componentPath: string;
  componentName: string;
  description?: string;
  category: 'result' | 'sales' | 'interaction' | 'content';
  editable: boolean;
  editableFields: string[];
  defaultProps: Record<string, any>;
  requiredProps?: string[];
  previewProps?: Record<string, any>;
}

// Configurações dos componentes editáveis
export const EDITABLE_COMPONENTS_CONFIG: Record<string, EditableComponentConfig> = {
  '@/components/result/MotivationSection': {
    componentPath: '@/components/result/MotivationSection',
    componentName: 'Seção Motivacional',
    description: 'Comparação antes/depois para motivar a transformação',
    category: 'result',
    editable: true,
    editableFields: [
      'title',
      'backgroundColor',
      'accentColor',
      'leftTitle',
      'rightTitle',
      'leftItems',
      'rightItems',
      'showAnimation'
    ],
    defaultProps: {
      title: 'Transforme seu Guarda-roupa',
      backgroundColor: '#ffffff',
      accentColor: '#B89B7A',
      leftTitle: 'Quando você não conhece seu estilo...',
      rightTitle: 'Quando você domina seu estilo...',
      leftItems: [
        'Compra peças por impulso que não combinam entre si',
        'Sente que tem um guarda-roupa cheio, mas "nada para vestir"',
        'Investe em tendências que não valorizam sua imagem',
        'Tem dificuldade em criar uma imagem coerente e autêntica'
      ],
      rightItems: [
        'Economiza tempo e dinheiro em compras conscientes',
        'Projeta a imagem que realmente representa você',
        'Aumenta sua confiança em qualquer ambiente',
        'Cria looks harmoniosos com menos peças'
      ],
      showAnimation: true
    },
    requiredProps: ['title'],
    previewProps: {
      title: 'Preview: Seção Motivacional',
      leftItems: ['Problema 1', 'Problema 2'],
      rightItems: ['Solução 1', 'Solução 2']
    }
  },

  '@/components/result/BonusSection': {
    componentPath: '@/components/result/BonusSection',
    componentName: 'Seção de Bônus',
    description: 'Apresenta bônus exclusivos do produto',
    category: 'sales',
    editable: true,
    editableFields: [
      'title',
      'subtitle',
      'accentColor',
      'backgroundColor',
      'showAnimations',
      'cardStyle',
      'bonusItems'
    ],
    defaultProps: {
      title: 'Bônus Exclusivos para Você',
      subtitle: 'Além do guia principal, você receberá estas ferramentas complementares',
      accentColor: '#B89B7A',
      backgroundColor: '#ffffff',
      showAnimations: true,
      cardStyle: 'elevated',
      bonusItems: [
        {
          title: 'Guia Peças-Chave',
          description: 'Lista completa das 20 peças essenciais',
          value: 'R$ 97'
        },
        {
          title: 'Checklist de Compras',
          description: 'Sistema prático para compras conscientes',
          value: 'R$ 67'
        }
      ]
    },
    requiredProps: ['title'],
    previewProps: {
      title: 'Preview: Bônus',
      bonusItems: [
        { title: 'Bônus 1', description: 'Descrição do bônus', value: 'R$ 50' }
      ]
    }
  },

  '@/components/result/GuaranteeSection': {
    componentPath: '@/components/result/GuaranteeSection',
    componentName: 'Seção de Garantia',
    description: 'Garantia de satisfação e redução de risco',
    category: 'sales',
    editable: true,
    editableFields: [
      'title',
      'subtitle',
      'description',
      'guaranteePeriod',
      'accentColor',
      'backgroundColor',
      'features',
      'showAnimation'
    ],
    defaultProps: {
      title: 'Sua Satisfação 100% Garantida',
      subtitle: 'Risco Zero',
      description: 'Se por qualquer motivo você não ficar 100% satisfeita, reembolsamos o valor integral sem perguntas.',
      guaranteePeriod: '7 dias',
      accentColor: '#B89B7A',
      backgroundColor: '#ffffff',
      features: ['Sem perguntas', 'Sem burocracia', 'Reembolso fácil'],
      showAnimation: true
    },
    requiredProps: ['title', 'guaranteePeriod'],
    previewProps: {
      title: 'Preview: Garantia',
      guaranteePeriod: '7 dias',
      features: ['Sem perguntas', 'Sem burocracia']
    }
  },

  '@/components/result/BeforeAfterTransformation': {
    componentPath: '@/components/result/BeforeAfterTransformation',
    componentName: 'Transformações Before/After',
    description: 'Galeria de transformações de clientes',
    category: 'result',
    editable: true,
    editableFields: ['primaryStyle', 'autoSlide', 'showArrows'],
    defaultProps: {
      primaryStyle: 'dinamicPrimaryStyle',
      autoSlide: true,
      showArrows: true,
      slideInterval: 6000
    },
    requiredProps: [],
    previewProps: {
      autoSlide: false,
      showArrows: true
    }
  },

  '@/components/quiz-result/sales/Testimonials': {
    componentPath: '@/components/quiz-result/sales/Testimonials',
    componentName: 'Depoimentos de Clientes',
    description: 'Depoimentos e avaliações de clientes',
    category: 'sales',
    editable: true,
    editableFields: ['title', 'showRatings', 'layout', 'maxItems'],
    defaultProps: {
      title: 'Transformações Reais',
      showRatings: true,
      layout: 'grid',
      maxItems: 3
    },
    requiredProps: ['title'],
    previewProps: {
      title: 'Preview: Depoimentos',
      maxItems: 2
    }
  },

  '@/components/result/SecurePurchaseElement': {
    componentPath: '@/components/result/SecurePurchaseElement',
    componentName: 'Elemento de Compra Segura',
    description: 'Selos de segurança e confiança',
    category: 'sales',
    editable: true,
    editableFields: ['showSecurityIcons', 'accentColor'],
    defaultProps: {
      showSecurityIcons: true,
      accentColor: '#B89B7A'
    },
    requiredProps: [],
    previewProps: {}
  }
};

// Função para renderizar componente editável ou original
export const renderEditableComponent = (
  componentPath: string,
  props: Record<string, any> = {},
  forEditor: boolean = false
): ReactNode => {
  const config = EDITABLE_COMPONENTS_CONFIG[componentPath];
  
  if (!config) {
    console.warn(`Componente não encontrado: ${componentPath}`);
    return null;
  }

  // Mesclar props padrão com props fornecidas
  const finalProps = { ...config.defaultProps, ...props };
  
  // Se for para o editor, usar versão editável; senão usar original
  switch (componentPath) {
    case '@/components/result/MotivationSection':
      return forEditor 
        ? React.createElement(MotivationSectionEditable, finalProps as MotivationSectionProps)
        : React.createElement(MotivationSection);

    case '@/components/result/BonusSection':
      return forEditor 
        ? React.createElement(BonusSectionEditable, finalProps as BonusSectionProps)
        : React.createElement(BonusSection);

    case '@/components/result/GuaranteeSection':
      return forEditor 
        ? React.createElement(GuaranteeSectionEditable, finalProps as GuaranteeSectionProps)
        : React.createElement(GuaranteeSection);

    case '@/components/result/BeforeAfterTransformation':
      return React.createElement(BeforeAfterTransformation, finalProps);

    case '@/components/quiz-result/sales/Testimonials':
      return React.createElement(Testimonials, finalProps);

    case '@/components/result/SecurePurchaseElement':
      return React.createElement(SecurePurchaseElement, finalProps);

    default:
      console.warn(`Componente não mapeado: ${componentPath}`);
      return null;
  }
};

// Função para obter configuração de um componente
export const getComponentConfig = (componentPath: string): EditableComponentConfig | null => {
  return EDITABLE_COMPONENTS_CONFIG[componentPath] || null;
};

// Função para obter todos os componentes por categoria
export const getComponentsByCategory = (category: EditableComponentConfig['category']) => {
  return Object.entries(EDITABLE_COMPONENTS_CONFIG)
    .filter(([_, config]) => config.category === category)
    .map(([path, config]) => ({ path, ...config }));
};

// Função para validar props de um componente
export const validateComponentProps = (
  componentPath: string,
  props: Record<string, any>
): { valid: boolean; errors: string[] } => {
  const config = getComponentConfig(componentPath);
  
  if (!config) {
    return { valid: false, errors: [`Componente não encontrado: ${componentPath}`] };
  }

  const errors: string[] = [];
  
  // Verificar props obrigatórias
  if (config.requiredProps) {
    for (const requiredProp of config.requiredProps) {
      if (!(requiredProp in props) || props[requiredProp] === undefined || props[requiredProp] === null) {
        errors.push(`Propriedade obrigatória ausente: ${requiredProp}`);
      }
    }
  }

  return { valid: errors.length === 0, errors };
};

export default {
  renderEditableComponent,
  getComponentConfig,
  getComponentsByCategory,
  validateComponentProps,
  EDITABLE_COMPONENTS_CONFIG
};
