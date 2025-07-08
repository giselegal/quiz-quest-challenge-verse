
import React from 'react';
import { TrendingUp, DollarSign, Calculator, Target } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';

interface ValueAnchoringBlockProps extends BlockComponentProps {
  block: {
    id: string;
    type: 'value-anchoring';
    properties: {
      title?: string;
      subtitle?: string;
      anchoringType?: 'price-comparison' | 'time-value' | 'cost-analysis' | 'roi-calculator';
      mainValue: string;
      comparisonValue?: string;
      period?: string;
      description?: string;
      breakdown?: Array<{
        id: string;
        label: string;
        value: string;
        description?: string;
      }>;
      highlightSavings?: boolean;
      savingsText?: string;
      ctaText?: string;
      ctaUrl?: string;
      visualType?: 'chart' | 'cards' | 'comparison' | 'calculator';
      accentColor?: string;
      backgroundColor?: string;
      textColor?: string;
    };
  };
}

const ValueAnchoringBlock: React.FC<ValueAnchoringBlockProps> = ({
  block,
  isSelected = false,
  onClick,
  className = ''
}) => {
  const {
    title = 'Valor Investido vs Retorno',
    subtitle = '',
    anchoringType = 'price-comparison',
    mainValue,
    comparisonValue,
    period = '',
    description = '',
    breakdown = [],
    highlightSavings = true,
    savingsText = '',
    ctaText = '',
    ctaUrl = '',
    visualType = 'comparison',
    accentColor = '#B89B7A',
    backgroundColor = '#ffffff',
    textColor = '#374151'
  } = block.properties;

  const getIcon = () => {
    switch (anchoringType) {
      case 'time-value':
        return <TrendingUp className="w-8 h-8" style={{ color: accentColor }} />;
      case 'cost-analysis':
        return <Calculator className="w-8 h-8" style={{ color: accentColor }} />;
      case 'roi-calculator':
        return <Target className="w-8 h-8" style={{ color: accentColor }} />;
      default:
        return <DollarSign className="w-8 h-8" style={{ color: accentColor }} />;
    }
  };

  const renderComparison = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Current Cost */}
      <div className="text-center p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-700 mb-2">
          Sem nossa solução
        </h3>
        <div className="text-3xl font-bold text-red-600 mb-2">
          {comparisonValue}
        </div>
        {period && (
          <p className="text-sm text-red-600">
            {period}
          </p>
        )}
        <div className="mt-4 space-y-2">
          <div className="text-sm text-red-600">
            • Perda de tempo
          </div>
          <div className="text-sm text-red-600">
            • Resultados inconsistentes
          </div>
          <div className="text-sm text-red-600">
            • Maior custo a longo prazo
          </div>
        </div>
      </div>

      {/* Our Solution */}
      <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg relative">
        {highlightSavings && (
          <div 
            className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: accentColor }}
          >
            ECONOMIA
          </div>
        )}
        <h3 className="text-lg font-semibold text-green-700 mb-2">
          Com nossa solução
        </h3>
        <div className="text-3xl font-bold text-green-600 mb-2">
          {mainValue}
        </div>
        {period && (
          <p className="text-sm text-green-600">
            {period}
          </p>
        )}
        <div className="mt-4 space-y-2">
          <div className="text-sm text-green-600">
            • Resultados garantidos
          </div>
          <div className="text-sm text-green-600">
            • Economia de tempo
          </div>
          <div className="text-sm text-green-600">
            • Suporte especializado
          </div>
        </div>
      </div>
    </div>
  );

  const renderCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {breakdown.map((item) => (
        <div key={item.id} className="text-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="text-2xl font-bold mb-2" style={{ color: accentColor }}>
            {item.value}
          </div>
          <h3 className="font-semibold mb-2" style={{ color: textColor }}>
            {item.label}
          </h3>
          {item.description && (
            <p className="text-sm text-gray-600">
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );

  const renderChart = () => (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="space-y-4">
        {breakdown.map((item, index) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="font-medium" style={{ color: textColor }}>
                {item.label}
              </div>
              {item.description && (
                <div className="text-sm text-gray-600">
                  {item.description}
                </div>
              )}
            </div>
            <div className="text-lg font-bold" style={{ color: accentColor }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCalculator = () => (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full mb-4">
          <Calculator className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold" style={{ color: textColor }}>
          Calculadora de ROI
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Investimento</div>
            <div className="text-2xl font-bold" style={{ color: accentColor }}>
              {mainValue}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Retorno Esperado</div>
            <div className="text-2xl font-bold text-green-600">
              {comparisonValue}
            </div>
          </div>
        </div>
      </div>
      
      {highlightSavings && savingsText && (
        <div className="mt-6 text-center">
          <div 
            className="inline-block px-6 py-3 rounded-lg text-white font-bold"
            style={{ backgroundColor: accentColor }}
          >
            {savingsText}
          </div>
        </div>
      )}
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
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          {getIcon()}
        </div>
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

      {/* Visual Content */}
      <div className="mb-8">
        {visualType === 'comparison' && renderComparison()}
        {visualType === 'cards' && renderCards()}
        {visualType === 'chart' && renderChart()}
        {visualType === 'calculator' && renderCalculator()}
      </div>

      {/* Description */}
      {description && (
        <div className="text-center mb-6">
          <p className="text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
      )}

      {/* CTA */}
      {ctaText && (
        <div className="text-center">
          <button
            className="inline-block px-8 py-3 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: accentColor }}
            onClick={(e) => {
              e.stopPropagation();
              if (ctaUrl) {
                window.open(ctaUrl, '_blank');
              }
            }}
          >
            {ctaText}
          </button>
        </div>
      )}
    </div>
  );
};

export default ValueAnchoringBlock;
