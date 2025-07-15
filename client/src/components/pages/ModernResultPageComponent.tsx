import React, { useState, useEffect } from 'react';
import { Award, Star, Gift, Crown, Users, CheckCircle, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import type { BlockComponentProps } from '@/types/blocks';

interface ModernResultPageComponentProps extends BlockComponentProps {
  // Props específicas do componente
}

const ModernResultPageComponent: React.FC<ModernResultPageComponentProps> = ({
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
    userName = 'Querida',
    primaryStyle = 'elegante',
    showStyleImage = true,
    showCharacteristics = true,
    showSecondaryStyles = true,
    ctaText = 'DESCOBRIR MEU GUARDA-ROUPA IDEAL',
    ctaUrl = '#oferta',
    backgroundColor = '#FFFBF7',
    accentColor = '#B89B7A',
    textColor = '#432818'
  } = block.properties;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  // Configuração dos estilos
  const styleConfig = {
    elegante: {
      name: 'Elegante',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911574/ELEGANTE_PREDOMINANTE_awmgit.webp',
      description: 'Seu estilo reflete sofisticação e refinamento em cada detalhe.',
      characteristics: [
        'Peças estruturadas e bem cortadas',
        'Cores neutras e sóbrias',
        'Acessórios refinados',
        'Tecidos nobres e de qualidade'
      ],
      icon: Crown
    },
    natural: {
      name: 'Natural',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911575/NATURAL_PREDOMINANTE_baqkts.webp',
      description: 'Você valoriza o conforto e a autenticidade acima de tudo.',
      characteristics: [
        'Conforto em primeiro lugar',
        'Tecidos naturais e respiráveis',
        'Cores terrosas e suaves',
        'Silhuetas relaxadas'
      ],
      icon: Star
    },
    contemporaneo: {
      name: 'Contemporâneo',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911573/CONTEMPORANEO_PREDOMINANTE_xllhxm.webp',
      description: 'Você está sempre em sintonia com as tendências atuais.',
      characteristics: [
        'Tendências da moda atual',
        'Mix de texturas modernas',
        'Cores em alta',
        'Peças statement'
      ],
      icon: Award
    }
  };

  const currentStyle = styleConfig[primaryStyle as keyof typeof styleConfig] || styleConfig.elegante;
  const Icon = currentStyle.icon;

  if (!isLoaded && !isEditing) {
    return (
      <div 
        className={`min-h-screen flex items-center justify-center ${className}`}
        style={{ backgroundColor }}
      >
        <div className="animate-pulse text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-32 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        min-h-screen p-4 md:p-8 transition-all duration-200
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
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <AnimatedWrapper show={isLoaded}>
          <div className="text-center mb-8">
            <img 
              src={logoUrl} 
              alt={logoAlt}
              style={{ height: logoHeight }}
              className="mx-auto mb-6"
            />
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: textColor }}>
              Parabéns, {userName}!
            </h1>
            <p className="text-lg text-gray-600">
              Seu resultado personalizado está pronto
            </p>
          </div>
        </AnimatedWrapper>

        {/* Resultado Principal */}
        <AnimatedWrapper show={isLoaded} delay={200}>
          <Card className="overflow-hidden shadow-xl border-0" style={{ borderColor: accentColor }}>
            <CardHeader className="text-center pb-4" style={{ backgroundColor: `${accentColor}15` }}>
              <div className="flex items-center justify-center mb-4">
                <Icon className="w-12 h-12 mr-3" style={{ color: accentColor }} />
                <h2 className="text-3xl md:text-4xl font-bold" style={{ color: textColor }}>
                  Estilo {currentStyle.name}
                </h2>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {currentStyle.description}
              </p>
            </CardHeader>
            
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {showStyleImage && (
                  <div className="order-2 md:order-1">
                    <img
                      src={currentStyle.image}
                      alt={`Estilo ${currentStyle.name}`}
                      className="w-full rounded-lg shadow-lg"
                    />
                  </div>
                )}
                
                {showCharacteristics && (
                  <div className="order-1 md:order-2">
                    <h3 className="text-2xl font-semibold mb-6" style={{ color: textColor }}>
                      Suas Características
                    </h3>
                    <div className="space-y-4">
                      {currentStyle.characteristics.map((characteristic, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                          <span className="text-gray-700">{characteristic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </AnimatedWrapper>

        {/* Estilos Secundários */}
        {showSecondaryStyles && (
          <AnimatedWrapper show={isLoaded} delay={400}>
            <Card className="shadow-lg">
              <CardHeader>
                <h3 className="text-2xl font-semibold text-center" style={{ color: textColor }}>
                  Seus Estilos Secundários
                </h3>
                <p className="text-center text-gray-600">
                  Estes estilos complementam seu estilo predominante
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {Object.entries(styleConfig)
                    .filter(([key]) => key !== primaryStyle)
                    .slice(0, 3)
                    .map(([key, style]) => {
                      const SecondaryIcon = style.icon;
                      return (
                        <div key={key} className="text-center p-4 rounded-lg bg-gray-50">
                          <SecondaryIcon className="w-8 h-8 mx-auto mb-3" style={{ color: accentColor }} />
                          <h4 className="font-semibold mb-2" style={{ color: textColor }}>
                            {style.name}
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {style.description}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </AnimatedWrapper>
        )}

        {/* Call to Action */}
        <AnimatedWrapper show={isLoaded} delay={600}>
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full" style={{ backgroundColor: `${accentColor}15` }}>
              <Gift className="w-5 h-5" style={{ color: accentColor }} />
              <span className="font-medium" style={{ color: textColor }}>
                Oferta Especial para Você
              </span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: textColor }}>
              Quer descobrir seu guarda-roupa ideal?
            </h3>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Tenha acesso ao guia completo personalizado para o seu estilo e 
              transforme sua forma de se vestir para sempre.
            </p>
            
            <Button
              size="lg"
              className="px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300"
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
              <ShoppingBag className="w-6 h-6 mr-2" />
              {ctaText}
            </Button>
            
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                +10.000 mulheres transformadas
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-current text-yellow-400" />
                4.9/5 estrelas
              </div>
            </div>
          </div>
        </AnimatedWrapper>
      </div>
    </div>
  );
};

export default ModernResultPageComponent;
