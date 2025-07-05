import React, { useState } from 'react';
import { InlineEditableText } from './InlineEditableText';
import { Clock, CheckCircle, Star, ArrowRight, Lock, Shield, Gift, Sparkles, Target, Crown, Flame } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { BlockComponentProps } from '@/types/blocks';

const QuizOfferPageBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    urgencyText = '🔥 ÚLTIMAS HORAS: 77% OFF - Apenas R$ 39,90!',
    logo = 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
    logoAlt = 'Logo Gisele Galvão',
    mainTitle = 'Descubra Seu Estilo Predominante em 5 Minutos',
    subtitle = 'Tenha finalmente um guarda-roupa que funciona 100%, onde tudo combina e reflete sua personalidade',
    heroImage = 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp',
    problemsTitle = 'Você se identifica com isso?',
    problems = [
      'Guarda-roupa cheio mas nunca tem o que vestir?',
      'Compra peças que nunca combinam com nada?',
      'Sente que "nada fica bom" em você?',
      'Gasta dinheiro em roupas que ficam no armário?'
    ],
    problemInsight = 'Isso acontece porque você ainda não descobriu seu estilo predominante.',
    solutionTitle = 'A Solução: Quiz de Estilo',
    solutionDescription = 'Nosso quiz científico identifica seu estilo predominante em apenas 5 minutos',
    benefitsTitle = 'Com o seu Guia Personalizado você vai:',
    benefits = [
      'Descobrir exatamente quais peças comprar',
      'Montar looks incríveis em segundos',
      'Economizar dinheiro em compras certeiras',
      'Ter confiança no seu visual todos os dias'
    ],
    socialProofTitle = 'Mais de 15.000 mulheres já transformaram seu estilo',
    testimonials = [
      {
        name: 'Carla M.',
        text: 'Finalmente entendi meu estilo! Agora todas as peças do meu guarda-roupa combinam.',
        rating: 5,
        verified: true
      },
      {
        name: 'Ana P.',
        text: 'Economizei muito dinheiro. Agora sei exatamente o que comprar.',
        rating: 5,
        verified: true
      },
      {
        name: 'Maria S.',
        text: 'Minha autoestima mudou completamente. Me sinto linda todos os dias!',
        rating: 5,
        verified: true
      }
    ],
    guaranteeTitle = 'Garantia Total de 7 Dias',
    guaranteeText = 'Se não ficar satisfeita, devolvemos 100% do seu dinheiro',
    ctaText = 'Descobrir Meu Estilo Agora',
    ctaSubtext = 'Quiz + Guia Personalizado por apenas R$ 39,90',
    urgencyNote = 'Oferta válida apenas hoje!',
    backgroundColor = '#FFFBF7'
  } = block.properties;

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const [isCtaHovered, setIsCtaHovered] = useState(false);

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
      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 text-center font-bold shadow-lg">
        <div className="flex items-center justify-center gap-2">
          <Flame className="w-5 h-5 animate-pulse" />
          <InlineEditableText
            value={urgencyText}
            onSave={(value: string) => handlePropertyChange('urgencyText', value)}
            className="inline-block"
            placeholder="Texto de urgência"
            tag="span"
          />
          <Flame className="w-5 h-5 animate-pulse" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src={logo} 
            alt={logoAlt} 
            className="h-16 md:h-20 mx-auto" 
            onError={(e) => (e.currentTarget.src = 'https://placehold.co/200x80/cccccc/333333?text=Logo')}
          />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-[#432818] mb-6 leading-tight">
            <InlineEditableText
              value={mainTitle}
              onSave={(value: string) => handlePropertyChange('mainTitle', value)}
              className="inline-block"
              placeholder="Título principal"
              tag="span"
            />
          </h1>
          
          <p className="text-xl text-[#6B4F43] mb-8 max-w-3xl mx-auto leading-relaxed">
            <InlineEditableText
              value={subtitle}
              onSave={(value: string) => handlePropertyChange('subtitle', value)}
              className="inline-block w-full"
              placeholder="Subtítulo"
              tag="span"
            />
          </p>
          
          <div className="max-w-2xl mx-auto mb-8">
            <img 
              src={heroImage} 
              alt="Transformação de Estilo" 
              className="w-full h-auto rounded-2xl shadow-2xl" 
              onError={(e) => (e.currentTarget.src = 'https://placehold.co/800x600/cccccc/333333?text=Hero+Image')}
            />
          </div>
        </div>

        {/* Problems Section */}
        <Card className="p-8 mb-12 bg-white shadow-lg border-l-4 border-red-500">
          <h2 className="text-2xl md:text-3xl font-bold text-[#432818] text-center mb-8">
            <InlineEditableText
              value={problemsTitle}
              onSave={(value: string) => handlePropertyChange('problemsTitle', value)}
              className="inline-block"
              placeholder="Título dos problemas"
              tag="span"
            />
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {problems.map((problem: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✗</span>
                </div>
                <p className="text-[#432818] font-medium">{problem}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white p-6 rounded-xl">
            <Target className="w-8 h-8 mx-auto mb-3" />
            <p className="text-lg font-semibold">
              <InlineEditableText
                value={problemInsight}
                onSave={(value: string) => handlePropertyChange('problemInsight', value)}
                className="inline-block"
                placeholder="Insight dos problemas"
                tag="span"
              />
            </p>
          </div>
        </Card>

        {/* Solution Section */}
        <Card className="p-8 mb-12 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
          <div className="text-center">
            <Sparkles className="w-12 h-12 text-[#B89B7A] mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-[#432818] mb-4">
              <InlineEditableText
                value={solutionTitle}
                onSave={(value: string) => handlePropertyChange('solutionTitle', value)}
                className="inline-block"
                placeholder="Título da solução"
                tag="span"
              />
            </h2>
            
            <p className="text-xl text-[#6B4F43] mb-8">
              <InlineEditableText
                value={solutionDescription}
                onSave={(value: string) => handlePropertyChange('solutionDescription', value)}
                className="inline-block w-full"
                placeholder="Descrição da solução"
                tag="span"
              />
            </p>
          </div>
        </Card>

        {/* Benefits Section */}
        <Card className="p-8 mb-12 bg-white shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-[#432818] text-center mb-8">
            <InlineEditableText
              value={benefitsTitle}
              onSave={(value: string) => handlePropertyChange('benefitsTitle', value)}
              className="inline-block"
              placeholder="Título dos benefícios"
              tag="span"
            />
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <p className="text-[#432818] font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Social Proof Section */}
        <Card className="p-8 mb-12 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
          <div className="text-center mb-8">
            <Crown className="w-12 h-12 text-[#B89B7A] mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-[#432818]">
              <InlineEditableText
                value={socialProofTitle}
                onSave={(value: string) => handlePropertyChange('socialProofTitle', value)}
                className="inline-block"
                placeholder="Título da prova social"
                tag="span"
              />
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i: number) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  {testimonial.verified && (
                    <Shield className="w-4 h-4 text-green-500 ml-2" />
                  )}
                </div>
                <p className="text-[#432818] mb-3">"{testimonial.text}"</p>
                <p className="text-[#6B4F43] font-medium">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Guarantee Section */}
        <Card className="p-8 mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
          <div className="text-center">
            <Shield className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#432818] mb-4">
              <InlineEditableText
                value={guaranteeTitle}
                onSave={(value: string) => handlePropertyChange('guaranteeTitle', value)}
                className="inline-block"
                placeholder="Título da garantia"
                tag="span"
              />
            </h2>
            <p className="text-lg text-[#6B4F43]">
              <InlineEditableText
                value={guaranteeText}
                onSave={(value: string) => handlePropertyChange('guaranteeText', value)}
                className="inline-block w-full"
                placeholder="Texto da garantia"
                tag="span"
              />
            </p>
          </div>
        </Card>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] p-8 rounded-2xl shadow-2xl">
            <Gift className="w-12 h-12 text-white mx-auto mb-4" />
            
            <button
              className={`
                bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-6 rounded-2xl font-bold text-xl shadow-lg transition-all duration-300 transform w-full max-w-md mx-auto block
                ${isCtaHovered ? 'scale-105 shadow-xl' : 'hover:scale-105 hover:shadow-xl'}
              `}
              onMouseEnter={() => setIsCtaHovered(true)}
              onMouseLeave={() => setIsCtaHovered(false)}
            >
              <div className="flex items-center justify-center gap-3">
                <ArrowRight className="w-6 h-6" />
                <div>
                  <div className="text-xl font-bold">
                    <InlineEditableText
                      value={ctaText}
                      onSave={(value: string) => handlePropertyChange('ctaText', value)}
                      className="inline-block"
                      placeholder="Texto do CTA"
                      tag="span"
                    />
                  </div>
                  <div className="text-sm opacity-90">
                    <InlineEditableText
                      value={ctaSubtext}
                      onSave={(value: string) => handlePropertyChange('ctaSubtext', value)}
                      className="inline-block"
                      placeholder="Subtexto do CTA"
                      tag="span"
                    />
                  </div>
                </div>
              </div>
            </button>
            
            <div className="mt-6 text-white">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Lock className="w-4 h-4" />
                <span className="text-sm">Pagamento 100% Seguro</span>
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-bold">
                  <InlineEditableText
                    value={urgencyNote}
                    onSave={(value: string) => handlePropertyChange('urgencyNote', value)}
                    className="inline-block"
                    placeholder="Nota de urgência"
                    tag="span"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizOfferPageBlock;
