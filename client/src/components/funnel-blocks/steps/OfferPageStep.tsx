import React from 'react';
import { cn } from '@/lib/utils';
import { FunnelStepProps } from '@/types/funnel';
import { Button } from '@/components/ui/button';
import { Check, ShieldCheck, Clock, Star } from 'lucide-react';

/**
 * OfferPageStep - Etapa 21: Página da oferta final
 * 
 * Este componente exibe a oferta final do funil, com detalhes de preço,
 * benefícios, garantias e botão de compra.
 */
export const OfferPageStep: React.FC<FunnelStepProps> = ({
  id,
  className = '',
  isEditable = false,
  onNext,
  onPrevious,
  data = {},
  onEdit
}) => {
  const {
    title = 'Oferta Exclusiva para Você',
    subtitle = 'Baseada no seu resultado personalizado',
    offer = {
      name: 'Programa Completo',
      description: 'Transforme seu estilo com nosso programa passo a passo',
      features: [
        'Acesso a todos os módulos e materiais',
        'Suporte personalizado por 30 dias',
        'Acesso vitalício a atualizações',
        'Comunidade exclusiva de alunos',
        'Bônus especiais para ação imediata'
      ],
      price: '197',
      originalPrice: '497',
      installments: {
        count: 12,
        value: '19,90'
      },
      bonuses: [
        { 
          name: 'E-book exclusivo',
          value: 'R$ 97,00',
          description: 'Guia completo com dicas exclusivas' 
        },
        { 
          name: 'Consulta personalizada',
          value: 'R$ 197,00',
          description: 'Sessão individual com especialista' 
        }
      ],
      guarantee: {
        days: 15,
        description: 'Se você não ficar satisfeito por qualquer motivo, devolveremos 100% do seu investimento.'
      }
    },
    testimonials = [
      {
        name: 'Maria Silva',
        text: 'Este programa transformou completamente minha visão. Recomendo!',
        imageUrl: '/avatar-1.jpg',
        stars: 5
      },
      {
        name: 'João Santos',
        text: 'Resultados impressionantes em apenas algumas semanas de aplicação.',
        imageUrl: '/avatar-2.jpg',
        stars: 5
      }
    ],
    buttonText = 'Sim! Quero Garantir Meu Acesso',
    secondaryButtonText = 'Quero conhecer mais detalhes',
    showCountdown = true,
    countdownHours = 24,
    backgroundColor = 'bg-white'
  } = data;
  
  // Renderizar estrelas de avaliação
  const renderStars = (count: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={cn(
          "w-4 h-4",
          index < count ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
        )} 
      />
    ));
  };

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
        {/* Cabeçalho */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          
          <p className="text-xl text-gray-700">
            {subtitle}
          </p>
          
          {/* Countdown opcional */}
          {showCountdown && (
            <div className="mt-6 p-3 bg-red-50 border border-red-200 rounded-lg inline-flex items-center gap-2">
              <Clock className="text-red-500" />
              <span className="text-red-700 font-medium">Esta oferta expira em: <span className="font-bold">{countdownHours}:00:00</span></span>
            </div>
          )}
        </div>
        
        {/* Conteúdo em grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Lado esquerdo - Detalhes da oferta */}
          <div className="md:col-span-2 space-y-8">
            {/* Nome e descrição */}
            <div>
              <h3 className="text-2xl font-bold mb-2">{offer.name}</h3>
              <p className="text-gray-700">{offer.description}</p>
            </div>
            
            {/* Lista de recursos/features */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">O que você vai receber:</h4>
              
              <ul className="space-y-3">
                {offer.features.map((feature: any, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="bg-green-500 rounded-full p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <span className="text-gray-800">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Bônus */}
            {offer.bonuses?.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="text-lg font-semibold mb-4">Bônus Exclusivos:</h4>
                
                <div className="space-y-4">
                  {offer.bonuses.map((bonus: any, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <div className="bg-yellow-500 rounded-full p-1">
                          <Star className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{bonus.name} <span className="text-green-600">({bonus.value})</span></div>
                        <p className="text-sm text-gray-600">{bonus.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Garantia */}
            {offer.guarantee && (
              <div className="flex items-start bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex-shrink-0 mr-4">
                  <ShieldCheck className="h-10 w-10 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Garantia de {offer.guarantee.days} dias</h4>
                  <p className="text-sm text-gray-700">{offer.guarantee.description}</p>
                </div>
              </div>
            )}
            
            {/* Testemunhos */}
            {testimonials?.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">O que estão dizendo:</h4>
                
                <div className="grid gap-4 md:grid-cols-2">
                  {data.testimonials?.map((testimonial: any, index: number) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        {testimonial.imageUrl && (
                          <img 
                            src={testimonial.imageUrl} 
                            alt={testimonial.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <div className="font-medium">{testimonial.name}</div>
                          <div className="flex">
                            {renderStars(testimonial.stars)}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm italic">"{testimonial.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Lado direito - Preço e CTA */}
          <div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-4">
              {/* Preço */}
              <div className="text-center mb-6">
                {offer.originalPrice && (
                  <div className="mb-1">
                    <span className="text-gray-500 line-through">De R$ {offer.originalPrice}</span>
                  </div>
                )}
                
                <div className="text-3xl font-bold">
                  Por apenas <span className="text-green-600">R$ {offer.price}</span>
                </div>
                
                {offer.installments && (
                  <div className="text-sm text-gray-600 mt-1">
                    ou {offer.installments.count}x de R$ {offer.installments.value}
                  </div>
                )}
              </div>
              
              {/* Botão principal */}
              <Button
                onClick={isEditable ? undefined : onNext}
                size="lg"
                className="w-full py-6 text-lg mb-4"
              >
                {buttonText}
              </Button>
              
              {/* Botão secundário */}
              <div className="text-center">
                <button
                  onClick={isEditable ? undefined : onPrevious}
                  className="text-indigo-600 hover:text-indigo-800 text-sm"
                >
                  {secondaryButtonText}
                </button>
              </div>
              
              {/* Selos de segurança */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Pagamento 100% seguro</span>
                </div>
              </div>
            </div>
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

export default OfferPageStep;
