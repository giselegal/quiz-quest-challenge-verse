import React from 'react';
import type { BlockComponentProps } from '@/types/blocks';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  originalPrice?: string;
  currentPrice: string;
  discount?: string;
  features: Array<{
    id: string;
    text: string;
    included: boolean;
    highlight?: boolean;
  }>;
  popular?: boolean;
  ctaText?: string;
  ctaUrl?: string;
}

interface PriceComparisonBlockProps extends BlockComponentProps {
  block: BlockComponentProps['block'] & {
    properties: {
      title?: string;
      subtitle?: string;
      plans?: PricingPlan[];
      layout?: 'table' | 'cards' | 'minimal';
      showDiscount?: boolean;
      highlightPopular?: boolean;
      accentColor?: string;
      backgroundColor?: string;
      textColor?: string;
      cardStyle?: 'modern' | 'classic' | 'minimal' | 'bordered';
    };
  };
}

const PriceComparisonBlock: React.FC<PriceComparisonBlockProps> = ({
  block,
  isSelected = false,
  onClick,
  className = ''
}) => {
  const {
    title = 'Compare Plans',
    subtitle = 'Choose the best plan for your needs',
    plans = [],
    layout = 'cards',
    showDiscount = true,
    highlightPopular = true,
    accentColor = '#B89B7A',
    backgroundColor = '#ffffff',
    textColor = '#374151',
    cardStyle = 'modern'
  } = block.properties;

  return (
    <div 
      className={`
        w-full p-6 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-[#B89B7A]/40 hover:bg-[#FAF9F7]'
        }
        ${className}
      `}
      style={{ backgroundColor, color: textColor }}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: textColor }}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {plans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`
                relative p-6 rounded-lg border
                ${plan.popular && highlightPopular 
                  ? 'border-2 ring-2 ring-opacity-50' 
                  : 'border-gray-200'
                }
              `}
              style={{
                borderColor: plan.popular && highlightPopular ? accentColor : undefined,
                ringColor: plan.popular && highlightPopular ? accentColor : undefined
              }}
            >
              {plan.popular && highlightPopular && (
                <div
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 text-white text-sm font-medium rounded-full"
                  style={{ backgroundColor: accentColor }}
                >
                  Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: textColor }}>
                  {plan.name}
                </h3>
                <div className="mb-4">
                  {plan.originalPrice && showDiscount && (
                    <span className="text-sm text-gray-500 line-through mr-2">
                      {plan.originalPrice}
                    </span>
                  )}
                  <span className="text-3xl font-bold" style={{ color: accentColor }}>
                    {plan.currentPrice}
                  </span>
                  {plan.discount && showDiscount && (
                    <span className="ml-2 text-sm font-medium text-green-600">
                      {plan.discount}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature.id} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.highlight ? 'font-medium' : ''
                      } ${!feature.included ? 'text-gray-400 line-through' : ''}`}
                      style={{ color: feature.included ? textColor : undefined }}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                style={{
                  backgroundColor: plan.popular && highlightPopular ? accentColor : undefined
                }}
                variant={plan.popular && highlightPopular ? 'default' : 'outline'}
              >
                {plan.ctaText || 'Escolher Plano'}
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 text-gray-400">
          <p>Nenhum plano configurado</p>
        </div>
      )}
    </div>
  );
};

export default PriceComparisonBlock;
