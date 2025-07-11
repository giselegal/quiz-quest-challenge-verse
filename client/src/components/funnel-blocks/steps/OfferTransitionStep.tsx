import React from 'react';
import { cn } from '@/lib/utils';
import { FunnelStepProps } from '@/types/funnel';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

/**
 * OfferTransitionStep - Etapa 20: Transição para oferta
 * 
 * Este componente faz a transição entre o resultado e a oferta final,
 * explicando o valor da oferta e seus benefícios.
 */
export const OfferTransitionStep: React.FC<FunnelStepProps> = ({
  id,
  className = '',
  isEditable = false,
  onNext,
  onPrevious,
  data = {},
  onEdit
}) => {
  const {
    title = 'Leve sua experiência para o próximo nível',
    subtitle = 'Descubra como potencializar seus resultados com nossa solução completa',
    benefits = [
      'Acesso a conteúdo exclusivo e aprofundado',
      'Suporte personalizado para suas necessidades específicas',
      'Ferramentas profissionais para implementação prática',
      'Comunidade de pessoas com perfil similar ao seu'
    ],
    imageUrl = '/placeholder-transition.jpg',
    buttonText = 'Quero conhecer a oferta',
    prevButtonText = 'Voltar ao meu resultado',
    backgroundColor = 'bg-gradient-to-br from-purple-50 to-indigo-100'
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
      <div className="max-w-4xl mx-auto">
        {/* Conteúdo em grid */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Lado esquerdo - Texto e benefícios */}
          <div className="space-y-8">
            {/* Título e subtítulo */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
              
              <p className="text-xl text-gray-700">
                {subtitle}
              </p>
            </div>
            
            {/* Lista de benefícios */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Você vai ter acesso a:</h3>
              
              <ul className="space-y-3">
                {benefits.map((benefit: any, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="bg-green-500 rounded-full p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <span className="text-gray-800">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Botão CTA */}
            <Button
              onClick={isEditable ? undefined : onNext}
              size="lg"
              className="w-full text-lg py-6"
            >
              {buttonText}
            </Button>
            
            {/* Botão voltar */}
            {onPrevious && (
              <div className="text-center">
                <button
                  onClick={isEditable ? undefined : onPrevious}
                  className="text-gray-600 hover:text-gray-900 text-sm underline"
                >
                  {prevButtonText}
                </button>
              </div>
            )}
          </div>
          
          {/* Lado direito - Imagem */}
          {imageUrl && (
            <div className="relative">
              <img 
                src={imageUrl} 
                alt="Oferta especial"
                className="w-full rounded-lg shadow-md"
              />
              
              {/* Badge de oferta especial */}
              <div className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full py-2 px-4 text-sm font-bold shadow-lg transform rotate-12">
                Oferta Especial
              </div>
            </div>
          )}
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

export default OfferTransitionStep;
