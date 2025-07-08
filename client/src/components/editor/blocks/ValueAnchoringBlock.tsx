import React from 'react';
import { cn } from '@/lib/utils';
import { Check, TrendingUp } from 'lucide-react';

interface ValueAnchoringBlockProps {
  originalPrice?: number;
  currentPrice?: number;
  valueItems?: Array<{
    item: string;
    value: number;
  }>;
  showTotal?: boolean;
  highlightSavings?: boolean;
  className?: string;
}

const ValueAnchoringBlock: React.FC<ValueAnchoringBlockProps> = ({
  originalPrice = 497,
  currentPrice = 97,
  valueItems = [
    { item: 'Consultoria Personalizada', value: 200 },
    { item: 'Análise de Coloração', value: 150 },
    { item: 'Guia de Estilo Digital', value: 97 },
    { item: 'Suporte VIP 30 dias', value: 50 }
  ],
  showTotal = true,
  highlightSavings = true,
  className
}) => {
  const totalValue = valueItems.reduce((sum, item) => sum + item.value, 0);
  const savings = originalPrice - currentPrice;
  const savingsPercentage = Math.round((savings / originalPrice) * 100);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className={cn("py-8 bg-gradient-to-br from-blue-50 to-indigo-50", className)}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Valor Total do Pacote</h2>
            <p className="text-blue-100">Tudo o que você receberá:</p>
          </div>

          <div className="p-6">
            {/* Lista de itens */}
            <div className="space-y-4 mb-6">
              {valueItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item.item}</span>
                  </div>
                  <span className="text-gray-900 font-semibold">
                    {formatPrice(item.value)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total e preços */}
            {showTotal && (
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-700">
                    Valor Total:
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(totalValue)}
                  </span>
                </div>

                <div className="text-center bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-red-600 text-lg line-through mr-3">
                      {formatPrice(originalPrice)}
                    </span>
                    <TrendingUp className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {formatPrice(currentPrice)}
                  </div>
                  
                  {highlightSavings && (
                    <div className="bg-red-600 text-white inline-block px-4 py-2 rounded-full">
                      <span className="font-bold">
                        Economize {formatPrice(savings)} ({savingsPercentage}% OFF)
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-center text-sm text-gray-600">
                  <p>⚡ Esta oferta especial é por tempo limitado</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueAnchoringBlock;