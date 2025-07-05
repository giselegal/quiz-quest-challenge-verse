import React, { useState } from 'react';
import { InlineEditableText } from './InlineEditableText';
import { Star, CheckCircle, ArrowDown, ShoppingCart, Lock, Crown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { BlockComponentProps } from '@/types/blocks';

const ResultPageBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    userName = 'Usuário',
    primaryStyle = 'Elegante Clássica',
    percentage = 92,
    styleDescription = 'Sua personalidade refletida no seu estilo de vestir. Aqui está como aplicar na prática.',
    styleImage = 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/15_xezvcy.webp',
    guideImage = 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp',
    logo = 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
    logoAlt = 'Logo Gisele Galvão',
    valueStackTitle = 'O Que Você Recebe Hoje',
    valueItems = [
      { name: 'Guia Principal', price: 'R$ 67,00' },
      { name: 'Bônus - Peças-chave', price: 'R$ 79,00' },
      { name: 'Bônus - Visagismo Facial', price: 'R$ 29,00' }
    ],
    totalValue = 'R$ 175,00',
    finalPrice = 'R$ 39,00',
    ctaText = 'Garantir Meu Guia + Bônus Especiais',
    ctaSubtitle = 'Quero meu Guia de Estilo Agora',
    securityText = '🔒 Pagamento 100% Seguro\n✓ Garantia de 7 dias\n🛡️ Oferta exclusiva nesta página',
    backgroundColor = '#fffaf7',
    testimonials = [
      {
        name: 'Maria Silva',
        text: 'Transformou completamente meu guarda-roupa! Agora sei exatamente o que comprar.',
        rating: 5
      },
      {
        name: 'Ana Santos',
        text: 'Economizei muito dinheiro seguindo as dicas do guia. Recomendo!',
        rating: 5
      }
    ]
  } = block.properties;

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return (
    <div
      className={`
        min-h-screen relative overflow-hidden cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'outline-2 outline-blue-500 outline-offset-2' 
          : 'hover:shadow-sm'
        }
        ${className}
      `}
      style={{ backgroundColor }}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#B89B7A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#aa6b5d]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      {/* Header with Logo and Welcome */}
      <Card className="bg-white shadow-sm p-6 mb-6 mx-4 mt-4">
        <div className="flex flex-col items-center gap-5">
          <div className="flex justify-center w-full">
            <img 
              src={logo} 
              alt={logoAlt} 
              className="h-20 mx-auto" 
              onError={(e) => (e.currentTarget.src = 'https://placehold.co/200x80/cccccc/333333?text=Logo')}
            />
          </div>
          
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-playfair text-[#432818]">
              Olá <InlineEditableText
                value={userName}
                onSave={(value: string) => handlePropertyChange('userName', value)}
                className="inline-block font-medium"
                placeholder="Nome do usuário"
                tag="span"
              />, seu Estilo Predominante é:
            </h1>
            
            <h2 className="font-bold text-[#B89B7A] mt-2 text-2xl">
              <InlineEditableText
                value={primaryStyle}
                onSave={(value: string) => handlePropertyChange('primaryStyle', value)}
                className="inline-block"
                placeholder="Estilo predominante"
                tag="span"
              />
            </h2>
          </div>
        </div>
      </Card>

      <div className="container mx-auto px-4 py-6 max-w-4xl relative z-10">
        {/* Primary Style Card */}
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
          <div className="text-center mb-8">
            <div className="max-w-md mx-auto mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#8F7A6A]">Seu estilo predominante</span>
                <span className="text-[#aa6b5d] font-medium">{percentage}%</span>
              </div>
              <Progress 
                value={percentage} 
                className="h-2 bg-[#F3E8E6]" 
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="text-[#432818] leading-relaxed">
                <InlineEditableText
                  value={styleDescription}
                  onSave={(value: string) => handlePropertyChange('styleDescription', value)}
                  className="inline-block w-full"
                  placeholder="Descrição do estilo"
                  tag="p"
                />
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B89B7A]/10">
                <h3 className="text-lg font-medium text-[#432818] mb-2">
                  Estilos que Também Influenciam Você
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-[#6B4F43]">• Casual Chic (25%)</div>
                  <div className="text-[#6B4F43]">• Romântico (15%)</div>
                </div>
              </div>
            </div>
            
            <div className="max-w-[238px] mx-auto relative">
              <img 
                src={styleImage} 
                alt={`Estilo ${primaryStyle}`} 
                className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300" 
                onError={(e) => (e.currentTarget.src = 'https://placehold.co/238x300/cccccc/333333?text=Estilo')}
              />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#B89B7A]"></div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#B89B7A]"></div>
            </div>
          </div>
          
          <div className="mt-8 max-w-[540px] mx-auto relative">
            <img 
              src={guideImage} 
              alt={`Guia de Estilo ${primaryStyle}`} 
              className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300" 
              onError={(e) => (e.currentTarget.src = 'https://placehold.co/540x400/cccccc/333333?text=Guia')}
            />
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium transform rotate-12">
              Exclusivo
            </div>
          </div>
        </Card>

        {/* Value Stack Section */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-white to-[#FFF8F4] border-2 border-[#B89B7A]/20">
          <div className="text-center">
            <Crown className="w-12 h-12 text-[#B89B7A] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#432818] mb-6">
              <InlineEditableText
                value={valueStackTitle}
                onSave={(value: string) => handlePropertyChange('valueStackTitle', value)}
                className="inline-block"
                placeholder="Título da oferta"
                tag="span"
              />
            </h3>
            
            <div className="space-y-4 mb-6">
              {valueItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-[#B89B7A]/10">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-[#432818] font-medium">{item.name}</span>
                  </div>
                  <span className="text-[#6B4F43] line-through">{item.price}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t-2 border-[#B89B7A]/20 pt-4 mb-6">
              <div className="flex justify-between items-center text-lg">
                <span className="text-[#6B4F43]">Valor Total:</span>
                <span className="text-[#6B4F43] line-through">{totalValue}</span>
              </div>
              <div className="flex justify-between items-center text-2xl font-bold mt-2">
                <span className="text-[#432818]">Hoje por apenas:</span>
                <span className="text-[#B89B7A]">{finalPrice}</span>
              </div>
              <p className="text-sm text-[#6B4F43] mt-1">Pagamento único</p>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center mb-8">
          <button
            className={`
              bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 transform
              ${isButtonHovered ? 'scale-105 shadow-xl' : 'hover:scale-105 hover:shadow-xl'}
            `}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            <div className="flex items-center justify-center gap-3">
              <ShoppingCart className="w-6 h-6" />
              <div>
                <div className="text-xl font-bold">
                  <InlineEditableText
                    value={ctaText}
                    onSave={(value: string) => handlePropertyChange('ctaText', value)}
                    className="inline-block"
                    placeholder="Texto do botão principal"
                    tag="span"
                  />
                </div>
                <div className="text-sm opacity-90">
                  <InlineEditableText
                    value={ctaSubtitle}
                    onSave={(value: string) => handlePropertyChange('ctaSubtitle', value)}
                    className="inline-block"
                    placeholder="Subtítulo do botão"
                    tag="span"
                  />
                </div>
              </div>
            </div>
          </button>
          
          <div className="mt-4 text-sm text-[#6B4F43] space-y-1">
            {securityText.split('\n').map((line, index) => (
              <div key={index} className="flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" />
                <span>{line}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <Card className="p-6 bg-white shadow-md">
          <h3 className="text-xl font-bold text-[#432818] text-center mb-6">
            O que nossas clientes dizem
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#FFF8F4] p-4 rounded-lg">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-[#432818] mb-2">"{testimonial.text}"</p>
                <p className="text-[#6B4F43] font-medium">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResultPageBlock;
