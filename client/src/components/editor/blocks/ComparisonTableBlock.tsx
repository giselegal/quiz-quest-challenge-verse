import React from 'react';
import { cn } from '@/lib/utils';
import { Check, X, Star } from 'lucide-react';

interface ComparisonTableBlockProps {
  title?: string;
  columns?: Array<{
    title: string;
    features: string[];
    highlighted?: boolean;
    price?: string;
    buttonText?: string;
  }>;
  showHeaders?: boolean;
  className?: string;
}

const ComparisonTableBlock: React.FC<ComparisonTableBlockProps> = ({
  title = 'Compare as Opções',
  columns = [
    {
      title: 'Sem Orientação',
      features: ['Tentativa e erro', 'Compras desnecessárias', 'Insegurança'],
      highlighted: false
    },
    {
      title: 'Com Nosso Método',
      features: ['Estilo definido', 'Compras certeiras', 'Confiança total'],
      highlighted: true,
      price: 'R$ 97',
      buttonText: 'ESCOLHER ESTE PLANO'
    }
  ],
  showHeaders = true,
  className
}) => {
  const maxFeatures = Math.max(...columns.map(col => col.features.length));

  return (
    <div className={cn("py-12 bg-gray-50", className)}>
      <div className="max-w-6xl mx-auto px-6">
        {title && (
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            {title}
          </h2>
        )}

        <div className="overflow-x-auto">
          <div className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Headers */}
            {showHeaders && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-0">
                {columns.map((column, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-6 text-center relative",
                      column.highlighted
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700",
                      index !== 0 && "border-l border-gray-200"
                    )}
                  >
                    {column.highlighted && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="bg-yellow-400 text-black px-4 py-1 rounded-full text-xs font-bold flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          RECOMENDADO
                        </div>
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-2">{column.title}</h3>
                    {column.price && (
                      <div className="text-2xl font-bold mb-2">{column.price}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Features Comparison */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-0">
              {columns.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  className={cn(
                    "p-6 space-y-4",
                    columnIndex !== 0 && "border-l border-gray-200"
                  )}
                >
                  {Array.from({ length: maxFeatures }, (_, featureIndex) => {
                    const feature = column.features[featureIndex];
                    const hasFeature = !!feature;
                    
                    return (
                      <div
                        key={featureIndex}
                        className="flex items-center min-h-[50px] py-2"
                      >
                        {hasFeature ? (
                          <>
                            <Check className={cn(
                              "w-5 h-5 mr-3 flex-shrink-0",
                              column.highlighted ? "text-green-500" : "text-green-600"
                            )} />
                            <span className="text-gray-700">{feature}</span>
                          </>
                        ) : (
                          <>
                            <X className="w-5 h-5 mr-3 text-red-400 flex-shrink-0" />
                            <span className="text-gray-400">Não incluído</span>
                          </>
                        )}
                      </div>
                    );
                  })}

                  {/* Action Button */}
                  {column.buttonText && (
                    <div className="pt-4">
                      <button className={cn(
                        "w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300",
                        column.highlighted
                          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                      )}>
                        {column.buttonText}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            ✨ Escolha a opção que mais se adequa ao seu perfil
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTableBlock;