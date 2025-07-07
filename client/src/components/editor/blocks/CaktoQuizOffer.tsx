import React from 'react';
import { cn } from '@/lib/utils';
import { BlockData } from '@/types/blocks';
import { ShoppingBag, Clock, Star, Gift, CheckCircle } from 'lucide-react';

interface CaktoQuizOfferProps {
  block: BlockData;
  isSelected?: boolean;
  onClick?: () => void;
  onPropertyChange?: (key: string, value: any) => void;
  disabled?: boolean;
  className?: string;
}

export const CaktoQuizOffer: React.FC<CaktoQuizOfferProps> = ({
  block,
  isSelected = false,
  onClick,
  onPropertyChange,
  disabled = false,
  className
}) => {
  const {
    title = 'Transforme seu Estilo Agora',
    subtitle = 'Guia Completo de Estilo Personalizado',
    originalPrice = 197,
    currentPrice = 97,
    timeLimit = '24:00:00',
    features = [
      'Guia de Estilo Personalizado baseado no seu resultado',
      'Manual de Combinações de Cores',
      'Dicas de Compras Inteligentes',
      'Guia de Ocasiões (trabalho, casual, festas)',
      'Bônus: Análise de Guarda-roupa',
      'Suporte por 30 dias'
    ],
    testimonials = [
      {
        name: 'Maria Silva',
        text: 'Revolucionou minha forma de me vestir!',
        rating: 5
      }
    ],
    buttonText = 'Quero Transformar Meu Estilo',
    urgencyText = 'Oferta por tempo limitado!',
    backgroundImage,
    primaryColor = '#B89B7A',
    textColor = '#2D2D2D',
    guarantee = '30 dias de garantia ou seu dinheiro de volta'
  } = block.properties || {};

  const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  return (
    <div
      className={cn(
        'w-full min-h-screen flex flex-col justify-center items-center relative overflow-hidden',
        'bg-gradient-to-br from-neutral-50 to-neutral-100',
        isSelected && 'ring-4 ring-blue-500 ring-opacity-50',
        !disabled && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: textColor
      }}
    >
      {/* Overlay escuro se houver imagem de fundo */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
      )}

      {/* Conteúdo principal */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 py-8">
        
        {/* Badge de urgência */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-6 py-2 bg-red-500 text-white rounded-full font-bold text-sm animate-pulse">
            <Clock className="w-4 h-4 mr-2" />
            {urgencyText}
          </div>
        </div>

        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {title}
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-8">
            {subtitle}
          </h2>

          {/* Timer de contagem regressiva */}
          <div className="inline-flex items-center space-x-4 bg-black text-white px-8 py-4 rounded-xl font-mono text-2xl">
            <Clock className="w-6 h-6" />
            <span>{timeLimit}</span>
          </div>
        </div>

        {/* Seção de preço */}
        <div className="text-center mb-12">
          <div className="inline-block bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            
            {/* Badge de desconto */}
            <div className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg">
              -{discount}%
            </div>

            {/* Preços */}
            <div className="mb-6">
              <div className="text-gray-500 line-through text-xl mb-2">
                De R$ {originalPrice}
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: primaryColor }}>
                R$ {currentPrice}
              </div>
              <div className="text-gray-600">
                ou 12x de R$ {Math.round(currentPrice / 12)} sem juros
              </div>
            </div>

            {/* Botão principal */}
            <button
              className={cn(
                'w-full max-w-md px-8 py-4 text-white font-bold text-xl rounded-full',
                'hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl',
                'animate-pulse'
              )}
              style={{ backgroundColor: primaryColor }}
            >
              <ShoppingBag className="w-6 h-6 inline mr-2" />
              {buttonText}
            </button>

            {/* Garantia */}
            <div className="mt-4 text-sm text-gray-600 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              {guarantee}
            </div>
          </div>
        </div>

        {/* Grid de conteúdo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          
          {/* O que você vai receber */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 flex items-center" style={{ color: primaryColor }}>
              <Gift className="w-6 h-6 mr-2" />
              O que você vai receber:
            </h3>
            
            <ul className="space-y-4">
              {features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Depoimentos */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 flex items-center" style={{ color: primaryColor }}>
              <Star className="w-6 h-6 mr-2" />
              O que nossos clientes dizem:
            </h3>
            
            <div className="space-y-6">
              {testimonials.map((testimonial: any, index: number) => (
                <div key={index} className="border-l-4 pl-4" style={{ borderColor: primaryColor }}>
                  <div className="flex items-center mb-2">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-2">"{testimonial.text}"</p>
                  <p className="text-sm font-medium" style={{ color: primaryColor }}>
                    - {testimonial.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call-to-action final */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-600 mb-6">
              Não perca esta oportunidade de transformar seu estilo e elevar sua autoestima. 
              Centenas de pessoas já transformaram seu guarda-roupa com nosso método.
            </p>
            
            <button
              className={cn(
                'px-12 py-4 text-white font-bold text-xl rounded-full',
                'hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl',
                'mb-4'
              )}
              style={{ backgroundColor: primaryColor }}
            >
              Garantir Minha Transformação Agora
            </button>
            
            <p className="text-sm text-gray-500">
              Pagamento 100% seguro • Satisfação garantida
            </p>
          </div>
        </div>
      </div>

      {/* Marca do CaktoQuiz */}
      <div className="absolute bottom-6 right-6 z-30">
        <div className="px-4 py-2 rounded-lg text-white font-medium text-sm bg-black bg-opacity-20 backdrop-blur-sm">
          CaktoQuiz
        </div>
      </div>

      {/* Elementos decorativos de urgência */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-red-500 rounded-full animate-ping" />
      <div className="absolute top-20 right-20 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
      <div className="absolute bottom-32 left-20 w-2 h-2 bg-green-500 rounded-full animate-bounce" />
    </div>
  );
};

export default CaktoQuizOffer;
