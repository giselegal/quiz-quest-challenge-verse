import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InlineEditableText } from './InlineEditableText';
import { 
  Check, 
  X, 
  Star, 
  Crown, 
  Zap,
  Shield,
  ArrowRight,
  Sparkles,
  Users,
  Clock,
  Gift,
  Tag
} from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface PricingFeature {
  id: string;
  name: string;
  included: boolean;
  highlight?: boolean;
  description?: string;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  period: string;
  popular?: boolean;
  premium?: boolean;
  features: PricingFeature[];
  ctaText: string;
  ctaUrl?: string;
  badge?: string;
  color?: string;
  limitedTime?: boolean;
  discount?: number;
}

interface AdvancedPricingTableBlockProps extends BlockComponentProps {
  block: {
    id: string;
    type: 'advanced-pricing-table';
    properties: {
      title?: string;
      subtitle?: string;
      plans?: PricingPlan[];
      billingToggle?: boolean;
      showAnnualDiscount?: boolean;
      annualDiscountPercent?: number;
      currency?: string;
      testimonial?: {
        text: string;
        author: string;
        image?: string;
      };
      guaranteeBadge?: string;
      backgroundColor?: string;
      style?: 'modern' | 'elegant' | 'minimal' | 'bold';
    };
  };
}

const AdvancedPricingTableBlock: React.FC<AdvancedPricingTableBlockProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    title = 'Escolha Seu Plano de Transformação',
    subtitle = 'Descubra seu estilo pessoal e transforme seu guarda-roupa com nossa consultoria especializada',
    plans = [
      {
        id: 'plan-basic',
        name: 'Descoberta',
        description: 'Perfeito para começar sua jornada de estilo',
        price: 97,
        originalPrice: 197,
        period: 'único',
        popular: false,
        features: [
          { id: 'f1', name: 'Quiz completo de estilo', included: true },
          { id: 'f2', name: 'Resultado personalizado', included: true },
          { id: 'f3', name: 'Guia básico de estilo', included: true },
          { id: 'f4', name: 'Lista de compras', included: true },
          { id: 'f5', name: 'Suporte por email', included: true },
          { id: 'f6', name: 'Consultoria 1:1', included: false },
          { id: 'f7', name: 'Análise de guarda-roupa', included: false },
          { id: 'f8', name: 'Personal shopping', included: false }
        ],
        ctaText: 'Começar Agora',
        ctaUrl: '/checkout/basic',
        color: '#6b7280'
      },
      {
        id: 'plan-complete',
        name: 'Transformação',
        description: 'A escolha mais popular para uma transformação completa',
        price: 297,
        originalPrice: 497,
        period: 'único',
        popular: true,
        features: [
          { id: 'f1', name: 'Quiz completo de estilo', included: true },
          { id: 'f2', name: 'Resultado personalizado', included: true },
          { id: 'f3', name: 'Guia completo de estilo', included: true, highlight: true },
          { id: 'f4', name: 'Lista de compras detalhada', included: true },
          { id: 'f5', name: 'Suporte prioritário', included: true },
          { id: 'f6', name: 'Consultoria 1:1 (60min)', included: true, highlight: true },
          { id: 'f7', name: 'Análise de guarda-roupa', included: true, highlight: true },
          { id: 'f8', name: 'Personal shopping', included: false }
        ],
        ctaText: 'Transformar Estilo',
        ctaUrl: '/checkout/complete',
        badge: '🔥 Mais Popular',
        color: '#B89B7A',
        discount: 40
      },
      {
        id: 'plan-premium',
        name: 'VIP Experience',
        description: 'Experiência premium com acompanhamento completo',
        price: 697,
        originalPrice: 997,
        period: 'único',
        premium: true,
        features: [
          { id: 'f1', name: 'Quiz completo de estilo', included: true },
          { id: 'f2', name: 'Resultado personalizado', included: true },
          { id: 'f3', name: 'Guia premium de estilo', included: true, highlight: true },
          { id: 'f4', name: 'Lista de compras premium', included: true },
          { id: 'f5', name: 'Suporte VIP 24/7', included: true },
          { id: 'f6', name: 'Consultoria 1:1 (90min)', included: true, highlight: true },
          { id: 'f7', name: 'Análise completa de guarda-roupa', included: true, highlight: true },
          { id: 'f8', name: 'Personal shopping (3h)', included: true, highlight: true }
        ],
        ctaText: 'Experiência VIP',
        ctaUrl: '/checkout/premium',
        badge: '👑 Premium',
        color: '#fbbf24',
        limitedTime: true,
        discount: 30
      }
    ],
    billingToggle = false,
    showAnnualDiscount = false,
    annualDiscountPercent = 20,
    currency = 'R$',
    testimonial = {
      text: 'A consultoria mudou completamente minha relação com a moda. Agora me visto com muito mais confiança!',
      author: 'Maria Silva',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=60&h=60&fit=crop&crop=face'
    },
    guaranteeBadge = '✅ Garantia de 30 dias',
    backgroundColor = '#ffffff',
    style = 'modern'
  } = block.properties;

  const [isAnnual, setIsAnnual] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const getStyleClasses = () => {
    switch (style) {
      case 'elegant':
        return {
          container: 'bg-gradient-to-br from-[#FAF9F7] to-white',
          card: 'bg-white border border-[#B89B7A]/20 shadow-xl hover:shadow-2xl',
          popular: 'border-2 border-[#B89B7A] shadow-xl',
          premium: 'border-2 border-yellow-400 shadow-xl bg-gradient-to-br from-yellow-50 to-white'
        };
      case 'minimal':
        return {
          container: 'bg-white',
          card: 'bg-white border border-gray-200 shadow-sm hover:shadow-md',
          popular: 'border border-gray-900 shadow-md',
          premium: 'border border-gray-900 shadow-md'
        };
      case 'bold':
        return {
          container: 'bg-gradient-to-br from-purple-100 to-pink-100',
          card: 'bg-white border-2 border-transparent shadow-lg hover:shadow-xl',
          popular: 'border-2 border-purple-500 shadow-xl bg-gradient-to-br from-purple-50 to-white',
          premium: 'border-2 border-pink-500 shadow-xl bg-gradient-to-br from-pink-50 to-white'
        };
      case 'modern':
      default:
        return {
          container: 'bg-gradient-to-br from-gray-50 to-white',
          card: 'bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
          popular: 'border-2 border-blue-500 shadow-xl ring-4 ring-blue-100',
          premium: 'border-2 border-yellow-500 shadow-xl ring-4 ring-yellow-100'
        };
    }
  };

  const styleClasses = getStyleClasses();

  const calculatePrice = (plan: PricingPlan) => {
    let price = plan.price;
    if (isAnnual && showAnnualDiscount) {
      price = price * 12 * (1 - annualDiscountPercent / 100);
    }
    return price;
  };

  const renderFeature = (feature: PricingFeature) => (
    <div
      key={feature.id}
      className={cn(
        'flex items-center gap-3 py-2',
        feature.highlight && 'bg-yellow-50 px-3 rounded-lg border border-yellow-200'
      )}
    >
      <div className={cn(
        'flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center',
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
        feature.included ? 'text-gray-900' : 'text-gray-500',
        feature.highlight && 'font-medium'
      )}>
        {feature.name}
      </span>
      
      {feature.highlight && (
        <Sparkles className="w-4 h-4 text-yellow-500 ml-auto" />
      )}
    </div>
  );

  const renderPlan = (plan: PricingPlan, index: number) => {
    const isHovered = hoveredPlan === plan.id;
    const finalPrice = calculatePrice(plan);
    const isPopular = plan.popular;
    const isPremium = plan.premium;

    return (
      <motion.div
        key={plan.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={cn(
          'relative',
          isPopular && 'lg:-mt-4',
          isPremium && 'lg:-mt-2'
        )}
        onMouseEnter={() => setHoveredPlan(plan.id)}
        onMouseLeave={() => setHoveredPlan(null)}
      >
        <Card className={cn(
          styleClasses.card,
          isPopular && styleClasses.popular,
          isPremium && styleClasses.premium,
          'relative overflow-hidden'
        )}>
          {/* Badge */}
          {plan.badge && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Badge 
                className={cn(
                  'px-4 py-1 text-xs font-semibold',
                  isPopular && 'bg-[#B89B7A] text-white',
                  isPremium && 'bg-yellow-500 text-white'
                )}
              >
                {plan.badge}
              </Badge>
            </div>
          )}

          {/* Limited time indicator */}
          {plan.limitedTime && (
            <div className="absolute top-4 right-4">
              <div className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                <Clock className="w-3 h-3" />
                Oferta limitada
              </div>
            </div>
          )}

          <CardHeader className="text-center pb-4">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                {isEditing ? (
                  <InlineEditableText
                    value={plan.name}
                    onSave={(value: string) => {
                      const updatedPlans = plans.map(p => 
                        p.id === plan.id ? { ...p, name: value } : p
                      );
                      handlePropertyChange('plans', updatedPlans);
                    }}
                    className="inline-block"
                    placeholder="Nome do plano"
                    tag="span"
                  />
                ) : (
                  plan.name
                )}
              </h3>
              
              <p className="text-sm text-gray-600">
                {plan.description}
              </p>
            </div>

            {/* Pricing */}
            <div className="py-4">
              <div className="flex items-baseline justify-center gap-2">
                {plan.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {currency}{plan.originalPrice}
                  </span>
                )}
                
                <span className="text-4xl font-bold text-gray-900">
                  {currency}{finalPrice.toLocaleString()}
                </span>
                
                <span className="text-sm text-gray-600">
                  /{plan.period}
                </span>
              </div>

              {plan.discount && (
                <div className="mt-2">
                  <Badge variant="destructive" className="text-xs">
                    {plan.discount}% OFF
                  </Badge>
                </div>
              )}

              {isAnnual && showAnnualDiscount && (
                <div className="mt-2">
                  <span className="text-xs text-green-600 font-medium">
                    Economize {annualDiscountPercent}% no plano anual
                  </span>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Features */}
            <div className="space-y-1">
              {plan.features.map(renderFeature)}
            </div>

            {/* CTA Button */}
            <Button
              className={cn(
                'w-full py-3 font-semibold transition-all duration-300',
                isPopular 
                  ? 'bg-[#B89B7A] hover:bg-[#A68A6A] text-white shadow-lg hover:shadow-xl'
                  : isPremium
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-900 hover:bg-gray-800 text-white'
              )}
              onClick={(e) => {
                e.stopPropagation();
                if (!isEditing && plan.ctaUrl) {
                  window.location.href = plan.ctaUrl;
                }
              }}
            >
              <InlineEditableText
                value={plan.ctaText}
                onSave={(value: string) => {
                  const updatedPlans = plans.map(p => 
                    p.id === plan.id ? { ...p, ctaText: value } : p
                  );
                  handlePropertyChange('plans', updatedPlans);
                }}
                className="inline-block"
                placeholder="Texto do botão"
                tag="span"
              />
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            {/* Additional info */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Shield className="w-3 h-3" />
                Pagamento 100% seguro
              </div>
              
              {isPopular && (
                <div className="flex items-center justify-center gap-2 text-xs text-[#B89B7A]">
                  <Users className="w-3 h-3" />
                  Escolha de 78% dos clientes
                </div>
              )}
            </div>
          </CardContent>

          {/* Hover effect overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </Card>
      </motion.div>
    );
  };

  if (!plans || plans.length === 0) {
    return (
      <div
        className={cn(
          'bg-gray-100 p-8 rounded-lg text-gray-500 flex flex-col items-center justify-center min-h-[400px] cursor-pointer transition-all duration-200',
          isSelected 
            ? 'outline-2 outline-[#B89B7A] outline-offset-2' 
            : 'hover:shadow-sm',
          className
        )}
        onClick={onClick}
        data-block-id={block.id}
        data-block-type={block.type}
      >
        <Tag className="w-12 h-12 mb-4 opacity-50" />
        <p className="text-center">Configure os planos de preços no painel de propriedades.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'py-16 px-4 cursor-pointer transition-all duration-200',
        styleClasses.container,
        isSelected 
          ? 'outline-2 outline-[#B89B7A] outline-offset-2' 
          : 'hover:shadow-sm',
        className
      )}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-[#432818] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <InlineEditableText
              value={title}
              onSave={(value: string) => handlePropertyChange('title', value)}
              className="inline-block"
              placeholder="Título da tabela de preços"
              tag="span"
            />
          </motion.h2>
          
          {subtitle && (
            <motion.p 
              className="text-lg text-[#8F7A6A] max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <InlineEditableText
                value={subtitle}
                onSave={(value: string) => handlePropertyChange('subtitle', value)}
                className="inline-block"
                placeholder="Subtítulo da tabela de preços"
                tag="span"
              />
            </motion.p>
          )}

          {/* Billing Toggle */}
          {billingToggle && (
            <motion.div 
              className="flex items-center justify-center gap-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className={cn('text-sm', !isAnnual && 'font-semibold')}>
                Mensal
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                disabled={isEditing}
              />
              <span className={cn('text-sm', isAnnual && 'font-semibold')}>
                Anual
              </span>
              {showAnnualDiscount && (
                <Badge variant="secondary" className="ml-2">
                  Economize {annualDiscountPercent}%
                </Badge>
              )}
            </motion.div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 mb-12">
          {plans.map((plan, index) => renderPlan(plan, index))}
        </div>

        {/* Testimonial */}
        {testimonial && (
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="max-w-2xl mx-auto bg-[#FAF9F7] border border-[#B89B7A]/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  {testimonial.image && (
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div className="text-left">
                    <div className="font-semibold text-[#432818]">{testimonial.author}</div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote className="text-[#432818] italic">
                  "{testimonial.text}"
                </blockquote>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Guarantee */}
        {guaranteeBadge && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Badge variant="outline" className="border-green-500 text-green-700 bg-green-50 px-4 py-2">
              {guaranteeBadge}
            </Badge>
          </motion.div>
        )}
      </div>

      {/* Debug info */}
      {isEditing && (
        <motion.div 
          className="mt-8 p-4 bg-[#FAF9F7] border border-[#B89B7A]/20 rounded-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-sm text-[#8F7A6A]">
            Modo de edição: {plans.length} plano(s) • 
            Estilo: {style} • 
            Billing: {isAnnual ? 'anual' : 'mensal'} • 
            Hover: {hoveredPlan || 'nenhum'}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default AdvancedPricingTableBlock;
