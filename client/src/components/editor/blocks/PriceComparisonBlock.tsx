import React, { useState } from 'react';
import { InlineEditableText } from './InlineEditableText';
import { 
  Check, 
  X, 
  Star, 
  Crown, 
  Zap, 
  Shield,
  TrendingUp,
  CreditCard,
  Clock,
  Gift
} from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PricingPlan {
  id: string;
  name: string;
  description?: string;
  originalPrice?: string;
  currentPrice: string;
  currency?: string;
  billingPeriod?: string;
  discount?: string;
  isPopular?: boolean;
  isRecommended?: boolean;
  features: Array<{
    id: string;
    text: string;
    included: boolean;
    highlight?: boolean;
  }>;
  buttonText?: string;
  buttonUrl?: string;
  badge?: string;
  footerText?: string;
}

interface PriceComparisonBlockProps extends BlockComponentProps {
  block: {
    id: string;
    type: 'price-comparison';
    properties: {
      title?: string;
      subtitle?: string;
      plans?: PricingPlan[];
      layout?: 'cards' | 'table' | 'minimal';
      showDiscount?: boolean;
      showFeatures?: boolean;
      highlightPopular?: boolean;
      animateOnHover?: boolean;
      backgroundColor?: string;
      textColor?: string;
      accentColor?: string;
      cardStyle?: 'modern' | 'classic' | 'glassmorphism' | 'gradient';
    };
  };
}

const PriceComparisonBlock: React.FC<PriceComparisonBlockProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    title = 'Escolha seu plano',
    subtitle = 'Opções flexíveis para diferentes necessidades',
    plans = [
      {
        id: 'basic',
        name: 'Básico',
        description: 'Ideal para começar',
        originalPrice: 'R$ 197,00',
        currentPrice: 'R$ 97,00',
        currency: 'R$',
        billingPeriod: 'pagamento único',
        discount: '51% OFF',
        isPopular: false,
        isRecommended: false,
        features: [
          { id: 'f1', text: 'Análise de estilo básica', included: true },
          { id: 'f2', text: 'Guia em PDF', included: true },
          { id: 'f3', text: 'Suporte por email', included: true },
          { id: 'f4', text: 'Consultoria personalizada', included: false },
          { id: 'f5', text: 'Atualizações vitalícias', included: false }
        ],
        buttonText: 'Começar Agora',
        footerText: 'Acesso imediato'
      },
      {
        id: 'premium',
        name: 'Premium',
        description: 'Mais completo e popular',
        originalPrice: 'R$ 497,00',
        currentPrice: 'R$ 197,00',
        currency: 'R$',
        billingPeriod: 'pagamento único',
        discount: '60% OFF',
        isPopular: true,
        isRecommended: true,
        features: [
          { id: 'f1', text: 'Análise de estilo completa', included: true, highlight: true },
          { id: 'f2', text: 'Guia personalizado', included: true, highlight: true },
          { id: 'f3', text: 'Suporte prioritário', included: true },
          { id: 'f4', text: 'Consultoria personalizada', included: true, highlight: true },
          { id: 'f5', text: 'Atualizações vitalícias', included: true }
        ],
        buttonText: 'Quero Este Plano',
        badge: 'Mais Popular',
        footerText: 'Garantia de 30 dias'
      }
    ],
    layout = 'cards',
    showDiscount = true,
    showFeatures = true,
    highlightPopular = true,
    animateOnHover = true,
    backgroundColor = '#ffffff',
    textColor = '#432818',
    accentColor = '#B89B7A',
    cardStyle = 'modern'
  } = block.properties;

  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const handlePlanAction = (plan: PricingPlan) => {
    if (isEditing) return;
    
    if (plan.buttonUrl) {
      window.open(plan.buttonUrl, '_blank');
    } else {
      console.log(`Plano selecionado: ${plan.name}`);
    }
  };

  const getCardStyleClasses = (plan: PricingPlan) => {
    const baseClasses = 'relative overflow-hidden transition-all duration-300 h-full';
    const isHovered = hoveredPlan === plan.id;
    const isPopularPlan = plan.isPopular && highlightPopular;
    
    let styleClasses = '';
    
    switch (cardStyle) {
      case 'classic':
        styleClasses = 'bg-white border-2 rounded-lg shadow-sm';
        break;
      case 'glassmorphism':
        styleClasses = 'bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl shadow-lg';
        break;
      case 'gradient':
        styleClasses = isPopularPlan 
          ? 'bg-gradient-to-br from-[#B89B7A] to-[#A68A6A] text-white rounded-xl shadow-xl' 
          : 'bg-gradient-to-br from-gray-50 to-white border-2 rounded-xl shadow-md';
        break;
      case 'modern':
      default:
        styleClasses = 'bg-white rounded-xl shadow-md border border-gray-100';
        break;
    }

    if (isPopularPlan) {
      styleClasses += ' border-[#B89B7A] shadow-[#B89B7A]/20 scale-105 z-10';
    }

    if (animateOnHover && isHovered && !isEditing) {
      styleClasses += ' scale-105 shadow-xl';
    }

    return `${baseClasses} ${styleClasses}`;
  };

  const renderFeatures = (features: PricingPlan['features']) => {
    if (!showFeatures) return null;

    return (
      <ul className="space-y-3 mb-6">
        {features.map((feature) => (
          <li key={feature.id} className="flex items-start gap-3">
            <div className={cn(
              'flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5',
              feature.included 
                ? 'bg-green-100 text-green-600' 
                : 'bg-gray-100 text-gray-400'
            )}>
              {feature.included ? (
                <Check className="w-3 h-3" />
              ) : (
                <X className="w-3 h-3" />
              )}
            </div>
            <span className={cn(
              'text-sm',
              feature.included ? 'text-gray-700' : 'text-gray-400 line-through',
              feature.highlight && 'font-semibold text-[#B89B7A]'
            )}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  const renderPlan = (plan: PricingPlan, index: number) => (
    <motion.div
      key={plan.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        'relative',
        layout === 'cards' ? 'flex-1 min-w-[280px] max-w-sm' : 'w-full'
      )}
      onMouseEnter={() => !isEditing && setHoveredPlan(plan.id)}
      onMouseLeave={() => !isEditing && setHoveredPlan(null)}
    >
      <Card className={getCardStyleClasses(plan)}>
        {/* Popular Badge */}
        {plan.isPopular && highlightPopular && plan.badge && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
            <Badge className="bg-[#B89B7A] text-white px-4 py-1 shadow-lg">
              <Star className="w-3 h-3 mr-1" />
              {plan.badge}
            </Badge>
          </div>
        )}

        <CardHeader className="text-center pb-4">
          <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
          {plan.description && (
            <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
          )}

          {/* Pricing */}
          <div className="mb-4">
            {showDiscount && plan.originalPrice && (
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-lg text-gray-400 line-through">
                  {plan.originalPrice}
                </span>
                {plan.discount && (
                  <Badge variant="destructive" className="text-xs">
                    {plan.discount}
                  </Badge>
                )}
              </div>
            )}
            
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl md:text-4xl font-bold text-[#B89B7A]">
                {plan.currentPrice}
              </span>
              {plan.billingPeriod && (
                <span className="text-sm text-gray-500 ml-1">
                  /{plan.billingPeriod}
                </span>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Features */}
          {renderFeatures(plan.features)}

          {/* CTA Button */}
          <Button
            className={cn(
              'w-full mb-4 transition-all duration-200',
              plan.isPopular 
                ? 'bg-[#B89B7A] hover:bg-[#A68A6A] text-white shadow-lg' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            )}
            onClick={(e) => {
              e.stopPropagation();
              handlePlanAction(plan);
            }}
            disabled={isEditing}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            {plan.buttonText || 'Escolher Plano'}
          </Button>

          {/* Footer Text */}
          {plan.footerText && (
            <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" />
              {plan.footerText}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  if (!plans || plans.length === 0) {
    return (
      <div
        className={cn(
          'bg-gray-100 p-8 rounded-lg text-gray-500 flex flex-col items-center justify-center min-h-[300px] cursor-pointer transition-all duration-200',
          isSelected && 'outline-2 outline-[#B89B7A] outline-offset-2',
          !isSelected && 'hover:shadow-sm',
          className
        )}
        onClick={onClick}
        data-block-id={block.id}
        data-block-type={block.type}
      >
        <CreditCard className="w-12 h-12 mb-4 opacity-50" />
        <p className="text-center">Configure os planos de preço no painel de propriedades.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'py-12 px-4 cursor-pointer transition-all duration-200 w-full',
        isSelected && 'outline-2 outline-[#B89B7A] outline-offset-2',
        !isSelected && 'hover:shadow-sm',
        className
      )}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
      style={{ backgroundColor, color: textColor }}
    >
      {/* Header */}
      {title && (
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <InlineEditableText
              value={title}
              onSave={(value: string) => handlePropertyChange('title', value)}
              className="inline-block"
              placeholder="Título dos preços"
              tag="h2"
            />
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              <InlineEditableText
                value={subtitle}
                onSave={(value: string) => handlePropertyChange('subtitle', value)}
                className="inline-block"
                placeholder="Subtítulo dos preços"
                tag="p"
              />
            </p>
          )}
        </div>
      )}

      {/* Plans */}
      <div className="max-w-6xl mx-auto">
        {layout === 'cards' ? (
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch">
            {plans.map((plan, index) => renderPlan(plan, index))}
          </div>
        ) : (
          <div className="space-y-6">
            {plans.map((plan, index) => renderPlan(plan, index))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="text-center mt-8">
        <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Shield className="w-4 h-4" />
            <span>Pagamento Seguro</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Acesso Imediato</span>
          </div>
          <div className="flex items-center gap-1">
            <Gift className="w-4 h-4" />
            <span>Garantia de Satisfação</span>
          </div>
        </div>
      </div>

      {/* Editor Info */}
      {isEditing && (
        <div className="mt-8 p-4 bg-[#FAF9F7] border border-[#B89B7A]/20 rounded-md">
          <p className="text-sm text-[#8F7A6A]">
            Modo de edição: {plans.length} plano(s) • Layout: {layout} • 
            {hoveredPlan ? `Hover: ${hoveredPlan}` : 'Sem hover'}
          </p>
        </div>
      )}
    </div>
  );
};

export default PriceComparisonBlock;
