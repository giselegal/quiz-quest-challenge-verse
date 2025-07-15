import React, { useState, useEffect } from 'react';
import { Clock, Shield, Star, Crown, Users, Gift, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import type { BlockComponentProps } from '@/types/blocks';

interface QuizOfferPageComponentProps extends BlockComponentProps {
  // Props específicas do componente
}

const QuizOfferPageComponent: React.FC<QuizOfferPageComponentProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    logoUrl = 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
    logoAlt = 'Logo Gisele Galvão',
    logoHeight = '60px',
    title = 'Descubra Seu Estilo Predominante',
    subtitle = 'Tenha finalmente um guarda-roupa que funciona 100%',
    heroImage = 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911574/ELEGANTE_PREDOMINANTE_awmgit.webp',
    countdownMinutes = 15,
    installmentPrice = 'R$ 8,83',
    fullPrice = 'R$ 39,90',
    originalPrice = 'R$ 175,00',
    savings = '77% OFF - Economia de R$ 135,10',
    ctaText = 'QUERO DESCOBRIR MEU ESTILO AGORA',
    ctaUrl = '#checkout',
    backgroundColor = '#FFFBF7',
    accentColor = '#B89B7A',
    textColor = '#432818',
    showTestimonials = true,
    showFaq = true,
    showGuarantee = true
  } = block.properties;

  const [timeLeft, setTimeLeft] = useState(countdownMinutes * 60);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    if (!isEditing) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isEditing]);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const benefits = block.properties.benefits || [
    'Identifique seu estilo predominante em minutos',
    'Guia completo personalizado para seu perfil',
    'Dicas exclusivas de combinações',
    'Acesso a comunidade VIP',
    'Garantia de 7 dias',
    'Suporte especializado'
  ];

  const testimonials = block.properties.testimonials || [
    {
      name: 'Marina S.',
      text: 'Finalmente entendi meu estilo! Agora me visto com muito mais confiança.',
      rating: 5
    },
    {
      name: 'Juliana R.',
      text: 'O guia transformou completamente meu guarda-roupa. Vale cada centavo!',
      rating: 5
    },
    {
      name: 'Carla M.',
      text: 'Nunca pensei que descobrir meu estilo seria tão fácil e prático.',
      rating: 5
    }
  ];

  const faqItems = block.properties.faqItems || [
    {
      question: 'Como funciona o quiz?',
      answer: 'O quiz é baseado em metodologia científica de análise de estilo. Você responde perguntas sobre suas preferências e recebe um resultado personalizado.'
    },
    {
      question: 'O que está incluso no guia?',
      answer: 'Você recebe um guia completo com seu estilo predominante, dicas de combinações, paleta de cores ideal e muito mais.'
    },
    {
      question: 'Posso usar em qualquer idade?',
      answer: 'Sim! Nosso método funciona para mulheres de todas as idades e estilos de vida.'
    }
  ];

  return (
    <div
      className={`
        min-h-screen transition-all duration-200
        ${isSelected 
          ? 'outline-2 outline-[#B89B7A] outline-offset-2' 
          : 'hover:shadow-sm'
        }
        ${className}
      `}
      style={{ backgroundColor }}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      {/* Header */}
      <div className="text-center py-6 px-4">
        <img 
          src={logoUrl} 
          alt={logoAlt}
          style={{ height: logoHeight }}
          className="mx-auto mb-4"
        />
      </div>

      {/* Hero Section */}
      <AnimatedWrapper show={isLoaded}>
        <div className="text-center px-4 py-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: textColor }}>
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {subtitle}
          </p>
          
          <div className="max-w-md mx-auto mb-8">
            <img
              src={heroImage}
              alt="Transformação de Estilo"
              className="w-full rounded-lg shadow-xl"
            />
          </div>
        </div>
      </AnimatedWrapper>

      {/* Countdown Timer */}
      <AnimatedWrapper show={isLoaded} delay={200}>
        <div className="bg-red-600 text-white py-4 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4">
              <Clock className="w-6 h-6" />
              <span className="text-lg font-semibold">Oferta expira em:</span>
              <span className="text-3xl font-bold font-mono">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>
      </AnimatedWrapper>

      {/* Pricing Section */}
      <AnimatedWrapper show={isLoaded} delay={400}>
        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl border-0 overflow-hidden">
              <CardHeader className="text-center py-8" style={{ backgroundColor: `${accentColor}15` }}>
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white shadow-sm">
                  <Gift className="w-5 h-5" style={{ color: accentColor }} />
                  <span className="font-semibold" style={{ color: textColor }}>
                    Oferta por tempo limitado
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="text-lg text-gray-600">12x de apenas</div>
                  <div className="text-4xl md:text-5xl font-bold" style={{ color: accentColor }}>
                    {installmentPrice}
                  </div>
                  <div className="text-2xl font-semibold" style={{ color: textColor }}>
                    ou {fullPrice} à vista
                  </div>
                  <div className="text-lg text-gray-500 line-through">
                    De {originalPrice}
                  </div>
                  <div className="text-xl font-bold text-green-600">
                    {savings}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Benefits */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-6" style={{ color: textColor }}>
                      O que você vai receber:
                    </h3>
                    <div className="space-y-4">
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* CTA */}
                  <div className="flex flex-col justify-center">
                    <Button
                      size="lg"
                      className="w-full py-6 text-xl font-bold rounded-xl shadow-lg hover:scale-105 transition-all duration-300 mb-6"
                      style={{ 
                        backgroundColor: accentColor, 
                        color: 'white',
                        border: 'none'
                      }}
                      onClick={() => {
                        if (ctaUrl.startsWith('#')) {
                          document.querySelector(ctaUrl)?.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          window.open(ctaUrl, '_blank');
                        }
                      }}
                    >
                      <Sparkles className="w-6 h-6 mr-2" />
                      {ctaText}
                    </Button>
                    
                    {showGuarantee && (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <Shield className="w-5 h-5" />
                        <span className="font-semibold">Garantia de 7 dias</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AnimatedWrapper>

      {/* Testimonials */}
      {showTestimonials && (
        <AnimatedWrapper show={isLoaded} delay={600}>
          <div className="py-16 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-3xl font-bold text-center mb-12" style={{ color: textColor }}>
                O que nossas clientes dizem
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="shadow-lg border-0">
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 italic">
                        "{testimonial.text}"
                      </p>
                      <p className="font-semibold" style={{ color: textColor }}>
                        {testimonial.name}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <div className="flex items-center justify-center gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    +10.000 mulheres transformadas
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-current text-yellow-400" />
                    4.9/5 estrelas
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedWrapper>
      )}

      {/* FAQ */}
      {showFaq && (
        <AnimatedWrapper show={isLoaded} delay={800}>
          <div className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-center mb-12" style={{ color: textColor }}>
                Perguntas Frequentes
              </h3>
              
              <div className="space-y-6">
                {faqItems.map((item, index) => (
                  <Card key={index} className="shadow-lg border-0">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold mb-3" style={{ color: textColor }}>
                        {item.question}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {item.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </AnimatedWrapper>
      )}

      {/* Final CTA */}
      <AnimatedWrapper show={isLoaded} delay={1000}>
        <div className="py-16 px-4 text-center" style={{ backgroundColor: `${accentColor}15` }}>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: textColor }}>
              Não perca esta oportunidade única!
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              Transforme seu estilo e sua confiança agora mesmo
            </p>
            
            <Button
              size="lg"
              className="px-12 py-6 text-xl font-bold rounded-xl shadow-xl hover:scale-105 transition-all duration-300"
              style={{ 
                backgroundColor: accentColor, 
                color: 'white',
                border: 'none'
              }}
              onClick={() => {
                if (ctaUrl.startsWith('#')) {
                  document.querySelector(ctaUrl)?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.open(ctaUrl, '_blank');
                }
              }}
            >
              <ArrowRight className="w-6 h-6 mr-2" />
              {ctaText}
            </Button>
            
            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              Oferta válida por tempo limitado
            </div>
          </div>
        </div>
      </AnimatedWrapper>
    </div>
  );
};

export default QuizOfferPageComponent;
