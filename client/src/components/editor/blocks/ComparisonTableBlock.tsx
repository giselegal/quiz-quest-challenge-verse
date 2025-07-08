import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { InlineEditableText } from './InlineEditableText';
import { 
  Check, 
  X, 
  Star, 
  Crown, 
  Zap, 
  Shield, 
  ArrowRight,
  TrendingUp,
  Users,
  Clock,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { BlockComponentProps } from '@/types/blocks';

interface Feature {
  id: string;
  name: string;
  included: boolean;
  highlighted?: boolean;
  tooltip?: string;
}

interface Plan {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  period?: string;
  isPopular?: boolean;
  isPremium?: boolean;
  features: Feature[];
  ctaText?: string;
  badge?: string;
  icon?: string;
  color?: string;
}

interface ComparisonTableBlockProps extends BlockComponentProps {
  block: {
    id: string;
    type: 'comparison-table';
    properties: {
      title?: string;
      subtitle?: string;
      plans?: Plan[];
      displayMode?: 'table' | 'cards' | 'tabs';
      showPrices?: boolean;
      showFeatures?: boolean;
      highlightPopular?: boolean;
      backgroundColor?: string;
      textColor?: string;
      accentColor?: string;
      compactMode?: boolean;
    };
  };
}

const ComparisonTableBlock: React.FC<ComparisonTableBlockProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    title = 'Escolha o Plano Ideal para Você',
    subtitle = 'Compare nossos planos e encontre o que melhor se adapta às suas necessidades',
    plans = [
      {
        id: 'basic',
        name: 'Básico',
        description: 'Perfeito para começar',
        price: 97,
        originalPrice: 147,
        period: '/mês',
        features: [
          { id: 'f1', name: 'Análise de estilo básica', included: true },
          { id: 'f2', name: 'Paleta de cores personalizada', included: true },
          { id: 'f3', name: 'Guia de compras', included: true },
          { id: 'f4', name: 'Consultoria individual', included: false },
          { id: 'f5', name: 'Atualização de guarda-roupa', included: false },
          { id: 'f6', name: 'Suporte prioritário', included: false }
        ],
        ctaText: 'Começar Agora',
        color: '#6B7280'
      },
      {
        id: 'premium',
        name: 'Premium',
        description: 'Mais popular',
        price: 197,
        originalPrice: 297,
        period: '/mês',
        isPopular: true,
        features: [
          { id: 'f1', name: 'Análise de estilo básica', included: true },
          { id: 'f2', name: 'Paleta de cores personalizada', included: true },
          { id: 'f3', name: 'Guia de compras', included: true },
          { id: 'f4', name: 'Consultoria individual', included: true, highlighted: true },
          { id: 'f5', name: 'Atualização de guarda-roupa', included: true, highlighted: true },
          { id: 'f6', name: 'Suporte prioritário', included: false }
        ],
        ctaText: 'Mais Escolhido',
        badge: 'Mais Popular',
        color: '#B89B7A'
      },
      {
        id: 'pro',
        name: 'Profissional',
        description: 'Solução completa',
        price: 397,
        originalPrice: 597,
        period: '/mês',
        isPremium: true,
        features: [
          { id: 'f1', name: 'Análise de estilo básica', included: true },
          { id: 'f2', name: 'Paleta de cores personalizada', included: true },
          { id: 'f3', name: 'Guia de compras', included: true },
          { id: 'f4', name: 'Consultoria individual', included: true },
          { id: 'f5', name: 'Atualização de guarda-roupa', included: true },
          { id: 'f6', name: 'Suporte prioritário', included: true, highlighted: true }
        ],
        ctaText: 'Solução Premium',
        badge: 'Mais Completo',
        color: '#7C2D12'
      }
    ],
    displayMode = 'cards',
    showPrices = true,
    showFeatures = true,
    highlightPopular = true,
    backgroundColor = '#ffffff',
    textColor = '#432818',
    accentColor = '#B89B7A',
    compactMode = false
  } = block.properties;

  const [activeTab, setActiveTab] = useState(plans[0]?.id || '');

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const getIconForPlan = (plan: Plan) => {
    if (plan.isPremium) return Crown;
    if (plan.isPopular) return Star;
    return Target;
  };

  const renderFeatureIcon = (feature: Feature) => {
    if (feature.included) {
      return (
        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
          feature.highlighted ? 'bg-green-500' : 'bg-green-100'
        }`}>
          <Check className={`w-3 h-3 ${
            feature.highlighted ? 'text-white' : 'text-green-600'
          }`} />
        </div>
      );
    }
    return (
      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
        <X className="w-3 h-3 text-gray-400" />
      </div>
    );
  };

  const renderPlanCard = (plan: Plan, index: number) => {
    const IconComponent = getIconForPlan(plan);
    const isHighlighted = plan.isPopular && highlightPopular;

    return (
      <motion.div
        key={plan.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="w-full"
      >
        <Card className={`relative h-full transition-all duration-300 ${
          isHighlighted 
            ? 'ring-2 ring-[#B89B7A] shadow-lg scale-105 z-10' 
            : 'hover:shadow-lg hover:scale-[1.02]'
        } ${compactMode ? 'p-4' : 'p-6'}`}>
          {/* Popular Badge */}
          {plan.badge && isHighlighted && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-[#B89B7A] text-white hover:bg-[#A68A6A] px-4 py-1">
                <Star className="w-3 h-3 mr-1" />
                {plan.badge}
              </Badge>
            </div>
          )}

          <CardHeader className={compactMode ? 'pb-4' : 'pb-6'}>
            <div className="flex items-center gap-3 mb-2">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: plan.color || accentColor }}
              >
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                {plan.description && (
                  <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                )}
              </div>
            </div>

            {showPrices && (
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold" style={{ color: plan.color || accentColor }}>
                    R$ {plan.price}
                  </span>
                  {plan.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      R$ {plan.originalPrice}
                    </span>
                  )}
                  {plan.period && (
                    <span className="text-gray-600">{plan.period}</span>
                  )}
                </div>
                {plan.originalPrice && (
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    Economize R$ {plan.originalPrice - plan.price}
                  </div>
                )}
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            {showFeatures && plan.features && (
              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature.id} className="flex items-center gap-3">
                    {renderFeatureIcon(feature)}
                    <span className={`text-sm ${
                      feature.included ? 'text-gray-900' : 'text-gray-400'
                    } ${feature.highlighted ? 'font-medium' : ''}`}>
                      {feature.name}
                    </span>
                    {feature.highlighted && (
                      <Badge variant="outline" className="text-xs">
                        Novo
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}

            <Button 
              className={`w-full ${
                isHighlighted 
                  ? 'bg-[#B89B7A] hover:bg-[#A68A6A] text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
              size={compactMode ? 'sm' : 'default'}
            >
              {plan.ctaText || 'Escolher Plano'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const renderComparisonTable = () => {
    const allFeatures = Array.from(
      new Set(plans.flatMap(plan => plan.features.map(f => f.name)))
    ).map(name => ({
      name,
      plans: plans.map(plan => {
        const feature = plan.features.find(f => f.name === name);
        return {
          planId: plan.id,
          included: feature?.included || false,
          highlighted: feature?.highlighted || false
        };
      })
    }));

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-4 border-b"></th>
              {plans.map((plan) => (
                <th key={plan.id} className="text-center p-4 border-b min-w-[200px]">
                  {renderPlanCard(plan, 0)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allFeatures.map((feature, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="p-4 font-medium text-gray-900">
                  {feature.name}
                </td>
                {feature.plans.map((planFeature) => (
                  <td key={planFeature.planId} className="p-4 text-center">
                    <div className="flex justify-center">
                      {renderFeatureIcon({
                        id: '',
                        name: '',
                        included: planFeature.included,
                        highlighted: planFeature.highlighted
                      })}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (!plans || plans.length === 0) {
    return (
      <div
        className={`
          bg-gray-100 p-8 rounded-lg text-gray-500 flex flex-col items-center justify-center min-h-[400px] cursor-pointer transition-all duration-200
          ${isSelected 
            ? 'outline-2 outline-[#B89B7A] outline-offset-2' 
            : 'hover:shadow-sm'
          }
          ${className}
        `}
        onClick={onClick}
        data-block-id={block.id}
        data-block-type={block.type}
      >
        <Target className="w-16 h-16 mb-4 opacity-50" />
        <p className="text-center text-lg font-medium mb-2">Nenhum plano configurado</p>
        <p className="text-center">Configure os planos no painel de propriedades.</p>
      </div>
    );
  }

  return (
    <div
      className={`
        py-12 px-4 cursor-pointer transition-all duration-200 w-full
        ${isSelected 
          ? 'outline-2 outline-[#B89B7A] outline-offset-2' 
          : 'hover:shadow-sm'
        }
        ${className}
      `}
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
              placeholder="Título da comparação"
              tag="h2"
            />
          </h2>
          {subtitle && (
            <p className="text-lg text-opacity-80 max-w-3xl mx-auto">
              <InlineEditableText
                value={subtitle}
                onSave={(value: string) => handlePropertyChange('subtitle', value)}
                className="inline-block"
                placeholder="Subtítulo da comparação"
                tag="p"
              />
            </p>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {displayMode === 'tabs' ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {plans.map((plan) => (
                <TabsTrigger key={plan.id} value={plan.id} className="flex items-center gap-2">
                  {React.createElement(getIconForPlan(plan), { className: "w-4 h-4" })}
                  {plan.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {plans.map((plan) => (
              <TabsContent key={plan.id} value={plan.id} className="mt-0">
                <div className="max-w-md mx-auto">
                  {renderPlanCard(plan, 0)}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : displayMode === 'table' ? (
          renderComparisonTable()
        ) : (
          <div className={`grid gap-8 ${
            plans.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
            plans.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' :
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {plans.map((plan, index) => renderPlanCard(plan, index))}
          </div>
        )}
      </div>

      {/* Trust Indicators */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 text-gray-600">
          <Shield className="w-5 h-5 text-green-500" />
          <span className="text-sm">Garantia de 30 dias</span>
        </div>
        <div className="flex items-center justify-center gap-3 text-gray-600">
          <Users className="w-5 h-5 text-blue-500" />
          <span className="text-sm">+10.000 clientes satisfeitas</span>
        </div>
        <div className="flex items-center justify-center gap-3 text-gray-600">
          <Clock className="w-5 h-5 text-purple-500" />
          <span className="text-sm">Acesso imediato</span>
        </div>
      </div>

      {isEditing && (
        <div className="mt-8 p-4 bg-[#FAF9F7] border border-[#B89B7A]/20 rounded-md">
          <p className="text-sm text-[#8F7A6A]">
            Modo de edição: {plans.length} plano(s) • 
            Exibição: {displayMode} • 
            {highlightPopular && 'Destaque popular ativo'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ComparisonTableBlock;
