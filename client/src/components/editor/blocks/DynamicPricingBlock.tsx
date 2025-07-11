
import React from 'react';
import { Check, Star, Crown, Zap } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';

interface DynamicPricingBlockProps extends BlockComponentProps {
  block: {
    id: string;
    type: 'dynamic-pricing';
    properties: {
      title?: string;
      subtitle?: string;
      plans: Array<{
        id: string;
        name: string;
        description?: string;
        price: string;
        originalPrice?: string;
        period?: string;
        discount?: string;
        badge?: string;
        badgeColor?: string;
        features: string[];
        ctaText: string;
        ctaUrl?: string;
        isPopular?: boolean;
        isRecommended?: boolean;
      }>;
      layout?: 'cards' | 'table' | 'minimal';
      showComparison?: boolean;
      currency?: string;
      backgroundColor?: string;
      textColor?: string;
    };
  };
}

const DynamicPricingBlock: React.FC<DynamicPricingBlockProps> = ({
  block,
  isSelected = false,
  onClick,
  className = ''
}) => {
  const {
    title = 'Escolha seu Plano',
    subtitle = '',
    plans = [],
    layout = 'cards',
    showComparison = true,
    currency = 'R$',
    backgroundColor = '#ffffff',
    textColor = '#374151'
  } = block.properties;

  const renderPlanCard = (plan: any, index: number) => (
    <div
      key={plan.id}
      className={`
        relative rounded-lg border-2 transition-all duration-200 hover:shadow-lg
        ${plan.isPopular 
          ? 'border-[#B89B7A] bg-gradient-to-b from-[#B89B7A]/5 to-white scale-105' 
          : 'border-gray-200 bg-white hover:border-[#B89B7A]/50'
        }
        ${plan.isRecommended ? 'ring-2 ring-[#B89B7A] ring-opacity-50' : ''}
      `}
    >
      {/* Badge */}
      {plan.badge && (
        <div 
          className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-medium text-white`}
          style={{ backgroundColor: plan.badgeColor || '#B89B7A' }}
        >
          {plan.badge}
        </div>
      )}

      {/* Popular indicator */}
      {plan.isPopular && (
        <div className="absolute -top-2 -right-2 bg-yellow-500 text-white p-2 rounded-full">
          <Star className="w-4 h-4 fill-current" />
        </div>
      )}

      <div className="p-6">
        {/* Plan Header */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold mb-2" style={{ color: textColor }}>
            {plan.name}
          </h3>
          {plan.description && (
            <p className="text-gray-600 text-sm">
              {plan.description}
            </p>
          )}
        </div>

        {/* Pricing */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-1">
            {plan.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                {currency}{plan.originalPrice}
              </span>
            )}
            {plan.discount && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                {plan.discount}
              </span>
            )}
          </div>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-bold text-[#B89B7A]">
              {currency}{plan.price}
            </span>
            {plan.period && (
              <span className="text-gray-600">
                /{plan.period}
              </span>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <ul className="space-y-3">
            {plan.features.map((feature: string, featureIndex: number) => (
              <li key={featureIndex} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm" style={{ color: textColor }}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <button
          className={`
            w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200
            ${plan.isPopular || plan.isRecommended
              ? 'bg-[#B89B7A] hover:bg-[#8F7A6A] text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300'
            }
          `}
          onClick={(e) => {
            e.stopPropagation();
            if (plan.ctaUrl) {
              window.open(plan.ctaUrl, '_blank');
            }
          }}
        >
          {plan.ctaText}
        </button>
      </div>
    </div>
  );

  const renderTableLayout = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-200 p-4 text-left font-semibold">
              Recursos
            </th>
            {plans.map((plan) => (
              <th key={plan.id} className="border border-gray-200 p-4 text-center font-semibold">
                <div>
                  <div className="font-bold">{plan.name}</div>
                  <div className="text-[#B89B7A] font-bold mt-1">
                    {currency}{plan.price}
                    {plan.period && <span className="text-sm font-normal">/{plan.period}</span>}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Get all unique features */}
          {Array.from(new Set(plans.flatMap(plan => plan.features))).map((feature, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="border border-gray-200 p-4 font-medium">
                {feature}
              </td>
              {plans.map((plan) => (
                <td key={plan.id} className="border border-gray-200 p-4 text-center">
                  {plan.features.includes(feature) ? (
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="border border-gray-200 p-4"></td>
            {plans.map((plan) => (
              <td key={plan.id} className="border border-gray-200 p-4">
                <button
                  className="w-full py-2 px-4 bg-[#B89B7A] hover:bg-[#8F7A6A] text-white rounded-lg font-semibold transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (plan.ctaUrl) {
                      window.open(plan.ctaUrl, '_blank');
                    }
                  }}
                >
                  {plan.ctaText}
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderMinimalLayout = () => (
    <div className="space-y-4">
      {plans.map((plan, index) => (
        <div key={plan.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
          <div className="flex-1">
            <h3 className="font-semibold" style={{ color: textColor }}>
              {plan.name}
            </h3>
            {plan.description && (
              <p className="text-sm text-gray-600">{plan.description}</p>
            )}
          </div>
          <div className="text-center mx-6">
            <div className="text-2xl font-bold text-[#B89B7A]">
              {currency}{plan.price}
            </div>
            {plan.period && (
              <div className="text-sm text-gray-600">/{plan.period}</div>
            )}
          </div>
          <button
            className="bg-[#B89B7A] hover:bg-[#8F7A6A] text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              if (plan.ctaUrl) {
                window.open(plan.ctaUrl, '_blank');
              }
            }}
          >
            {plan.ctaText}
          </button>
        </div>
      ))}
    </div>
  );

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
      {/* Header */}
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

      {/* Pricing Layout */}
      {layout === 'cards' && (
        <div className={`flex flex-wrap gap-6 justify-center ${
          plans.length === 1 ? 'max-w-md mx-auto' : 'max-w-4xl mx-auto'
        }`}>
          {plans.map((plan, index) => (
            <div key={index} className={`flex-1 ${plans.length === 1 ? 'w-full' : 'min-w-[280px] max-w-md'}`}>
              {renderPlanCard(plan, index)}
            </div>
          ))}
        </div>
      )}

      {layout === 'table' && renderTableLayout()}
      {layout === 'minimal' && renderMinimalLayout()}
    </div>
  );
};

export default DynamicPricingBlock;
