import React from 'react';
import { cn } from '@/lib/utils';
import { FunnelStepProps } from '@/types/funnel';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

/**
 * ResultDetailsStep - Etapa 18: Detalhes do resultado
 * 
 * Este componente exibe os detalhes completos do resultado do quiz,
 * incluindo descrição, características e recomendações personalizadas.
 */
export const ResultDetailsStep: React.FC<FunnelStepProps> = ({
  id,
  className = '',
  isEditable = false,
  onNext,
  onPrevious,
  data = {},
  onEdit
}) => {
  const {
    title = 'Seu Estilo Personalizado',
    result = {
      category: 'Estilo Moderno',
      title: 'Você é uma pessoa de estilo Moderno',
      description: 'Pessoas com estilo moderno valorizam ambientes limpos, funcionais e com linhas claras. Você tem preferência por tecnologia, inovação e uma abordagem minimalista.',
      imageUrl: '/placeholder-result.jpg',
      characteristics: [
        'Preferência por designs simples e funcionais',
        'Apreciação por tecnologia e inovação',
        'Valorização de espaços organizados',
        'Tendência a escolher qualidade sobre quantidade'
      ],
      recommendations: [
        'Invista em peças de design inteligente',
        'Mantenha cores neutras como base',
        'Adicione elementos tecnológicos ao seu ambiente',
        'Busque soluções minimalistas para organização'
      ]
    },
    nextButtonText = 'Ver meu guia personalizado',
    prevButtonText = 'Voltar',
    backgroundColor = 'bg-white'
  } = data;

  return (
    <div 
      className={cn(
        "relative rounded-xl shadow-md p-6",
        backgroundColor,
        className
      )}
      onClick={isEditable ? onEdit : undefined}
      data-funnel-step-id={id}
    >
      <div className="max-w-3xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
            {result.category}
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {result.title || title}
          </h2>
        </div>
        
        {/* Conteúdo em grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Lado esquerdo - Imagem e descrição */}
          <div>
            {result.imageUrl && (
              <div className="mb-6">
                <img 
                  src={result.imageUrl} 
                  alt={result.category}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
            
            <p className="text-gray-700 leading-relaxed mb-6">
              {result.description}
            </p>
          </div>
          
          {/* Lado direito - Características e recomendações */}
          <div className="space-y-6">
            {/* Características */}
            <Card className="p-5 bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">Suas características:</h3>
              <ul className="space-y-2">
                {result.characteristics?.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mr-2 mt-1">
                      <div className="h-4 w-4 rounded-full bg-green-500"></div>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
            
            {/* Recomendações */}
            <Card className="p-5 bg-indigo-50">
              <h3 className="text-lg font-semibold mb-4">Recomendações para você:</h3>
              <ul className="space-y-2">
                {result.recommendations?.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mr-2 mt-1">
                      <div className="h-4 w-4 rounded-full bg-indigo-500"></div>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
        
        {/* Navegação */}
        <div className="flex justify-between mt-10">
          {onPrevious && (
            <Button 
              variant="outline"
              onClick={isEditable ? undefined : onPrevious}
            >
              {prevButtonText}
            </Button>
          )}
          
          <div className="flex-1 flex justify-end">
            <Button
              onClick={isEditable ? undefined : onNext}
              size="lg"
              className={onPrevious ? "ml-4" : ""}
            >
              {nextButtonText}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Indicador de edição */}
      {isEditable && (
        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
          Editar
        </div>
      )}
    </div>
  );
};

export default ResultDetailsStep;
