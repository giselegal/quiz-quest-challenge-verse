import React from 'react';
import { cn } from '@/lib/utils';
import { useQuizTracking } from '@/hooks/useQuizTracking';

/**
 * QuizBenefitsBlock - Bloco de benefícios/instruções do quiz para uso no editor visual
 * 
 * Props editáveis via editor visual:
 * - title: string - Título da seção
 * - subtitle: string - Subtítulo/descrição
 * - benefits: array - Lista de benefícios ou instruções
 * - showIcons: boolean - Se deve mostrar ícones nos benefícios
 * - iconType: string - Tipo de ícone (checkmark, star, arrow, etc.)
 * - layout: 'list' | 'grid' | 'cards' - Layout dos benefícios
 * - alignment: 'left' | 'center' | 'right' - Alinhamento do conteúdo
 * - colors: object - Paleta de cores customizável
 * 
 * @example
 * <QuizBenefitsBlock
 *   blockId="quiz-benefits-main"
 *   title="Por que fazer este quiz?"
 *   benefits={[
 *     { text: "Rápido e fácil - apenas 5 minutos", icon: "⏰" },
 *     { text: "Resultado personalizado", icon: "✨" },
 *     { text: "Sem custo algum", icon: "🆓" }
 *   ]}
 *   layout="list"
 * />
 */

export interface BenefitItem {
  text: string;
  icon?: string;
  description?: string;
  highlight?: boolean;
}

export interface QuizBenefitsBlockProps {
  // Identificação
  blockId: string;
  className?: string;
  style?: React.CSSProperties;

  // Conteúdo editável
  title?: string;
  subtitle?: string;
  benefits?: BenefitItem[];

  // Configurações visuais
  showIcons?: boolean;
  iconType?: 'checkmark' | 'star' | 'arrow' | 'custom';
  layout?: 'list' | 'grid' | 'cards';
  alignment?: 'left' | 'center' | 'right';
  spacing?: 'tight' | 'normal' | 'loose';

  // Cores customizáveis
  colors?: {
    primary?: string;
    secondary?: string;
    text?: string;
    textLight?: string;
    background?: string;
    backgroundAlt?: string;
    border?: string;
    icon?: string;
  };

  // Layout e responsividade
  maxWidth?: string;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

const QuizBenefitsBlock: React.FC<QuizBenefitsBlockProps> = ({
  blockId = 'quiz-benefits-block',
  className = '',
  style = {},

  // Conteúdo padrão
  title = 'Benefícios do Quiz',
  subtitle = 'Descubra as vantagens de fazer nosso quiz personalizado',
  benefits = [
    { text: 'Rápido e fácil de responder', icon: '⏰' },
    { text: 'Resultado personalizado e detalhado', icon: '✨' },
    { text: 'Totalmente gratuito', icon: '🆓' },
    { text: 'Baseado em anos de experiência', icon: '🎯' }
  ],

  // Configurações visuais
  showIcons = true,
  iconType = 'custom',
  layout = 'list',
  alignment = 'center',
  spacing = 'normal',

  // Cores padrão (tema original)
  colors = {
    primary: '#B89B7A',
    secondary: '#432818',
    text: '#432818',
    textLight: '#6B7280',
    background: '#FEFEFE',
    backgroundAlt: '#F8F5F0',
    border: '#E5E7EB',
    icon: '#B89B7A',
  },

  // Layout
  maxWidth = 'max-w-2xl',
  columns = {
    mobile: 1,
    tablet: 2,
    desktop: 2,
  },
}) => {
  const { trackUIInteraction } = useQuizTracking();

  // Handler para clique em benefício
  const handleBenefitClick = (benefitText: string, index: number) => {
    trackUIInteraction('benefit_item', `benefit_${index}`, 'benefit_clicked', {
      benefit_text: benefitText,
      benefit_index: index,
      total_benefits: benefits.length
    });
  };

  // Handler para clique no título
  const handleTitleClick = () => {
    trackUIInteraction('benefits_title', 'benefits_section_title', 'title_clicked', {
      title_text: title
    });
  };

  // Classes de espaçamento
  const spacingClasses = {
    tight: 'space-y-2',
    normal: 'space-y-4',
    loose: 'space-y-6',
  };

  // Classes de alinhamento
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  // Classes de layout
  const getLayoutClasses = () => {
    switch (layout) {
      case 'grid':
        return `grid gap-4 grid-cols-${columns.mobile} md:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop}`;
      case 'cards':
        return `grid gap-6 grid-cols-${columns.mobile} md:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop}`;
      default: // list
        return spacingClasses[spacing];
    }
  };

  // Renderizar ícone padrão baseado no tipo
  const renderDefaultIcon = (type: string) => {
    switch (type) {
      case 'checkmark':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path 
              fillRule="evenodd" 
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
        );
      case 'star':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      case 'arrow':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Renderizar um benefício individual
  const renderBenefit = (benefit: BenefitItem, index: number) => {
    const isCard = layout === 'cards';
    
    const benefitContent = (
      <div
        key={index}
        className={cn(
          'flex items-start gap-3 cursor-pointer hover:opacity-80 transition-opacity',
          isCard ? 'p-4 rounded-lg border shadow-sm' : '',
          alignment === 'center' && !isCard ? 'justify-center' : '',
          alignment === 'right' && !isCard ? 'justify-end flex-row-reverse' : ''
        )}
        style={{
          backgroundColor: isCard ? colors.backgroundAlt : 'transparent',
          borderColor: isCard ? colors.border : 'transparent',
        }}
        onClick={() => handleBenefitClick(benefit.text, index)}
      >
        {showIcons && (
          <div 
            className="flex-shrink-0 mt-0.5"
            style={{ color: colors.icon }}
          >
            {benefit.icon ? (
              <span className="text-lg">{benefit.icon}</span>
            ) : (
              renderDefaultIcon(iconType)
            )}
          </div>
        )}
        <div className={cn('flex-1', isCard ? 'text-center' : '')}>
          <p 
            className={cn(
              'font-medium',
              benefit.highlight ? 'text-lg' : 'text-base'
            )}
            style={{ 
              color: benefit.highlight ? colors.primary : colors.text 
            }}
          >
            {benefit.text}
          </p>
          {benefit.description && (
            <p 
              className="text-sm mt-1"
              style={{ color: colors.textLight }}
            >
              {benefit.description}
            </p>
          )}
        </div>
      </div>
    );

    return benefitContent;
  };

  return (
    <div
      className={cn(`w-full ${maxWidth} mx-auto px-4 py-6`, className)}
      data-block-id={blockId}
      data-component-type="QuizBenefitsBlock"
      style={style}
    >
      {/* Cabeçalho */}
      {(title || subtitle) && (
        <div className={cn('mb-8', alignmentClasses[alignment])}>
          {title && (
            <h2 
              className="text-2xl md:text-3xl font-bold mb-3 cursor-pointer hover:opacity-80 transition-opacity"
              style={{ 
                color: colors.text,
                fontFamily: '"Playfair Display", serif'
              }}
              onClick={handleTitleClick}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p 
              className="text-lg leading-relaxed"
              style={{ color: colors.textLight }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Lista de benefícios */}
      <div className={getLayoutClasses()}>
        {benefits.map((benefit, index) => renderBenefit(benefit, index))}
      </div>
    </div>
  );
};

export default QuizBenefitsBlock;
