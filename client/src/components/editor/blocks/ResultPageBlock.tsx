// Usando snippet "imd" para imports com destructuring
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { InlineEditText } from './InlineEditText';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import ProgressiveImage from '@/components/ui/progressive-image';
import {
  ShoppingCart,
  CheckCircle,
  ArrowDown,
  Clock,
  Shield,
  Award,
  Hourglass,
  TrendingUp,
  Lock,
} from "lucide-react";
import { trackButtonClick } from "@/utils/analytics";

// Design tokens fiéis ao funil real
const tokens = {
  colors: {
    primary: "#B89B7A",
    secondary: "#aa6b5d",
    background: "#fffaf7",
    text: "#432818",
    textSecondary: "#5D4A3A",
    success: "#4CAF50",
  },
  shadows: {
    sm: "0 2px 4px rgba(184, 155, 122, 0.08)",
    md: "0 4px 12px rgba(184, 155, 122, 0.12)",
    lg: "0 8px 24px rgba(184, 155, 122, 0.15)",
    xl: "0 16px 40px rgba(184, 155, 122, 0.18)",
  },
};

// Usando snippet "uch" + Tab para criar custom hook
const useAnimatedCounter = (target: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (target === 0) return;
    
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [target, duration]);
  
  return count;
};

// Usando snippet "uch" + Tab para criar hook de hover
const useHoverAnimation = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);
  
  return {
    isHovered,
    hoverProps: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
};

// Usando snippet "uch" + Tab para criar hook de scroll
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('result-page-block');
    if (element) {
      observer.observe(element);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return isVisible;
};

interface ResultPageBlockProps {
  block: {
    id: string;
    type: string;
    properties: {
      userName?: string;
      primaryStyle?: {
        category: string;
        percentage: number;
      };
      title?: string;
      description?: string;
      resultTitle?: string;
      resultDescription?: string;
      recommendations?: string[];
      ctaText?: string;
      ctaSecondaryText?: string;
      ctaUrl?: string;
      backgroundColor?: string;
      textColor?: string;
      showTimer?: boolean;
      showGuarantees?: boolean;
      finalPrice?: string;
      originalPrice?: string;
      guidePrice?: string;
      bonusPrice1?: string;
      bonusPrice2?: string;
      logoUrl?: string;
    };
  };
  isSelected?: boolean;
  onClick?: () => void;
  onPropertyChange?: (key: string, value: any) => void;
  disabled?: boolean;
  className?: string;
}

// Usando snippet "memo" + Tab para otimizar performance
const ResultPageBlock: React.FC<ResultPageBlockProps> = React.memo(({
  block,
  isSelected = false,
  onClick,
  onPropertyChange,
  disabled = false,
  className
}) => {
  // Usando snippet "dob" + Tab para destructuring
  const {
    userName = "Visitante",
    primaryStyle = { category: "Elegante", percentage: 85 },
    title = 'Olá',
    description = 'seu Estilo Predominante é:',
    resultTitle = 'Elegante',
    resultDescription = 'Você tem um estilo elegante, refinado e atemporal. Prefere peças de qualidade, cortes clássicos e looks que transmitem sofisticação.',
    recommendations = [
      "Looks com intenção e identidade",
      "Cores, modelagens e tecidos a seu favor", 
      "Imagem alinhada aos seus objetivos",
      "Guarda-roupa funcional, sem compras por impulso"
    ],
    ctaText = 'Quero meu Guia de Estilo Agora',
    ctaSecondaryText = 'Garantir Meu Guia + Bônus Especiais',
    ctaUrl = "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912",
    backgroundColor = tokens.colors.background,
    textColor = tokens.colors.text,
    showTimer = false,
    showGuarantees = true,
    finalPrice = "R$ 39,00",
    originalPrice = "R$ 175,00",
    guidePrice = "R$ 67,00",
    bonusPrice1 = "R$ 79,00",
    bonusPrice2 = "R$ 29,00",
    logoUrl = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
  } = block.properties;

  // Usando custom hooks criados com snippets ES7
  const animatedPercentage = useAnimatedCounter(primaryStyle.percentage, 2000);
  const { isHovered, hoverProps } = useHoverAnimation();
  const isVisible = useScrollAnimation();

  // Usando snippet "useCallback" + Tab para otimizar callbacks
  const handlePropertyChange = useCallback((key: string, value: any) => {
    onPropertyChange?.(key, value);
  }, [onPropertyChange]);

  const handleCTAClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!disabled) {
      trackButtonClick("checkout_button", "Iniciar Checkout", "results_page");
      if (ctaUrl && ctaUrl !== "#") {
        window.open(ctaUrl, "_blank");
      }
    }
  }, [disabled, ctaUrl]);

  // Usando snippet "useMemo" + Tab para otimizar cálculos
  const progressValue = useMemo(() => {
    return isVisible ? animatedPercentage : 0;
  }, [isVisible, animatedPercentage]);

  const containerStyles = useMemo(() => ({
    backgroundColor,
    color: textColor,
    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
    transition: 'all 0.3s ease-in-out',
  }), [backgroundColor, textColor, isHovered]);

  return (
    <div
      id="result-page-block"
      className={cn(
        'relative w-full min-h-[800px] rounded-lg border-2',
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300',
        'cursor-pointer hover:border-gray-400 transition-all duration-300',
        className
      )}
      onClick={onClick}
      style={containerStyles}
      {...hoverProps}
    >
      {/* Background decorativo fiel ao funil real */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#B89B7A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#aa6b5d]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      {/* Main Content Container - Fiel ao funil real */}
      <div className="relative z-10 container mx-auto px-4 py-6 max-w-4xl">
        
        {/* Header com Logo - Exatamente como no funil real */}
        <div className="text-center mb-8">
          <div className="flex justify-center w-full mb-6">
            <img 
              src={logoUrl}
              alt="Logo Gisele Galvão"
              className="h-20 w-auto"
              loading="eager"
            />
          </div>
          
          <InlineEditText
            as="h1"
            value={`${title} ${userName}, ${description}`}
            onChange={(value) => {
              const parts = value.split(',');
              if (parts.length >= 2) {
                const titleUserPart = parts[0].trim();
                const descPart = parts.slice(1).join(',').trim();
                const titleParts = titleUserPart.split(' ');
                if (titleParts.length >= 2) {
                  const newTitle = titleParts[0];
                  const newUserName = titleParts.slice(1).join(' ');
                  handlePropertyChange('title', newTitle);
                  handlePropertyChange('userName', newUserName);
                  handlePropertyChange('description', descPart);
                }
              }
            }}
            placeholder="Olá Nome, seu estilo predominante é:"
            disabled={disabled}
            className="text-xl md:text-2xl font-playfair mb-4"
            style={{ color: textColor }}
          />
          
          <InlineEditText
            as="h2"
            value={primaryStyle.category}
            onChange={(value) => handlePropertyChange('primaryStyle', { ...primaryStyle, category: value })}
            placeholder="Nome do estilo..."
            disabled={disabled}
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent"
          />
        </div>

        {/* Card Principal de Resultado - Fiel ao funil real */}
        <AnimatedWrapper animation="fade" show={true} duration={600} delay={300}>
          <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20 card-elegant">
            <div className="text-center mb-8">
              <div className="max-w-md mx-auto mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#8F7A6A]">
                    Seu estilo predominante
                  </span>
                  <span className="text-[#aa6b5d] font-medium">{animatedPercentage}%</span>
                </div>
                <Progress 
                  value={progressValue} 
                  className="h-2 bg-[#F3E8E6]" 
                  style={{
                    '--progress-background': 'linear-gradient(to right, #B89B7A, #aa6b5d)',
                    transition: 'all 0.3s ease-in-out'
                  } as React.CSSProperties}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <InlineEditText
                  as="p"
                  value={resultDescription}
                  onChange={(value) => handlePropertyChange('resultDescription', value)}
                  placeholder="Descrição detalhada do resultado..."
                  disabled={disabled}
                  multiline={true}
                  className="text-[#432818] leading-relaxed"
                />
                
                {/* Estilos Secundários - Simulando estrutura real */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B89B7A]/10 glass-panel">
                  <h3 className="text-lg font-medium text-[#432818] mb-2">Estilos que Também Influenciam Você</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#432818]">Romântico</span>
                      <span className="text-sm font-semibold text-[#aa6b5d]">20%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#432818]">Natural</span>
                      <span className="text-sm font-semibold text-[#aa6b5d]">15%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Imagem do Estilo - 238px como no funil real */}
              <div className="max-w-[238px] mx-auto relative">
                <img 
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744992677/estilo-elegante-preview.jpg"
                  alt={`Estilo ${primaryStyle.category}`}
                  className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                  loading="eager"
                  width="238"
                  height="auto"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#B89B7A]"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#B89B7A]"></div>
              </div>
            </div>
            
            {/* Imagem do Guia - 540px como no funil real */}
            <div className="mt-8 max-w-[540px] mx-auto relative">
              <img 
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744992677/guia-de-estilo-preview.jpg"
                alt={`Guia de Estilo ${primaryStyle.category}`}
                loading="lazy"
                className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                width="540"
                height="auto"
              />
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium transform rotate-12">
                Exclusivo
              </div>
            </div>
          </Card>
        </AnimatedWrapper>

        {/* Seções Intermediárias Placeholder - Como no funil real */}
        <div className="space-y-8 mb-10">
          {/* Before/After Placeholder */}
          <Card className="p-6 bg-gradient-to-br from-white to-[#fff7f3] border border-[#B89B7A]/15">
            <h3 className="text-lg font-medium text-[#aa6b5d] mb-2">🔄 Transformação Antes/Depois</h3>
            <p className="text-sm text-[#8F7A6A]">Seção editável no modo avançado</p>
          </Card>

          {/* Motivation Placeholder */}
          <Card className="p-6 bg-gradient-to-br from-white to-[#fff7f3] border border-[#B89B7A]/15">
            <h3 className="text-lg font-medium text-[#aa6b5d] mb-2">💪 Seção Motivacional</h3>
            <p className="text-sm text-[#8F7A6A]">Seção editável no modo avançado</p>
          </Card>

          {/* Bonus Placeholder */}
          <Card className="p-6 bg-gradient-to-br from-white to-[#fff7f3] border border-[#B89B7A]/15">
            <h3 className="text-lg font-medium text-[#aa6b5d] mb-2">🎁 Seção de Bônus</h3>
            <p className="text-sm text-[#8F7A6A]">Seção editável no modo avançado</p>
          </Card>

          {/* Testimonials Placeholder */}
          <Card className="p-6 bg-gradient-to-br from-white to-[#fff7f3] border border-[#B89B7A]/15">
            <h3 className="text-lg font-medium text-[#aa6b5d] mb-2">💬 Depoimentos</h3>
            <p className="text-sm text-[#8F7A6A]">Seção editável no modo avançado</p>
          </Card>
        </div>

        {/* CTA Principal Verde - Exato como no funil real */}
        <AnimatedWrapper animation="fade" show={true} duration={400} delay={950}>
          <div className="text-center my-10">
            <div className="bg-[#f9f4ef] p-6 rounded-lg border border-[#B89B7A]/10 mb-6">
              <h3 className="text-xl font-medium text-center text-[#aa6b5d] mb-4">
                Descubra Como Aplicar Seu Estilo na Prática
              </h3>
              <div className="flex justify-center">
                <ArrowDown className="w-8 h-8 text-[#B89B7A] animate-bounce" />
              </div>
            </div>
            
            <Button 
              onClick={handleCTAClick} 
              disabled={disabled}
              className="text-white py-4 px-6 rounded-md mb-4"
              {...hoverProps}
              style={{
                background: "linear-gradient(to right, #4CAF50, #45a049)",
                boxShadow: "0 4px 14px rgba(76, 175, 80, 0.4)"
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <ShoppingCart className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
                <InlineEditText
                  as="span"
                  value={ctaText}
                  onChange={(value) => handlePropertyChange('ctaText', value)}
                  placeholder="Texto do CTA principal..."
                  disabled={disabled}
                  className="text-white font-bold"
                />
              </span>
            </Button>
            
            <div className="mt-2 inline-block bg-[#aa6b5d]/10 px-3 py-1 rounded-full">
              <p className="text-sm text-[#aa6b5d] font-medium flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" />
                Pagamento 100% Seguro
              </p>
            </div>
          </div>
        </AnimatedWrapper>

        {/* Value Stack e CTA Final - 100% Fiel ao funil real */}
        <AnimatedWrapper animation="fade" show={true} duration={400} delay={1100}>
          <div className="text-center mt-10">
            <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-4">
              Vista-se de Você — na Prática
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] mx-auto mb-6"></div>
            <p className="text-[#432818] mb-6 max-w-xl mx-auto">
              Agora que você conhece seu estilo, é hora de aplicá-lo com clareza e intenção. 
              O Guia da Gisele Galvão foi criado para mulheres como você — que querem se vestir 
              com autenticidade e transformar sua imagem em ferramenta de poder.
            </p>

            <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] p-6 rounded-lg mb-6 border border-[#B89B7A]/10">
              <h3 className="text-xl font-medium text-[#aa6b5d] mb-4">O Guia de Estilo e Imagem + Bônus Exclusivos</h3>
              <ul className="space-y-3 text-left max-w-xl mx-auto text-[#432818]">
                {recommendations.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full flex items-center justify-center text-white mr-2 mt-0.5">
                      <CheckCircle className="h-3 w-3" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Value Stack com preços reais do funil */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#B89B7A]/20 mb-8 max-w-md mx-auto">
              <h3 className="text-xl font-medium text-center text-[#aa6b5d] mb-4">O Que Você Recebe Hoje</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/10">
                  <span>Guia Principal</span>
                  <InlineEditText
                    as="span"
                    value={guidePrice}
                    onChange={(value) => handlePropertyChange('guidePrice', value)}
                    disabled={disabled}
                    className="font-medium"
                  />
                </div>
                <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/10">
                  <span>Bônus - Peças-chave</span>
                  <InlineEditText
                    as="span"
                    value={bonusPrice1}
                    onChange={(value) => handlePropertyChange('bonusPrice1', value)}
                    disabled={disabled}
                    className="font-medium"
                  />
                </div>
                <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/10">
                  <span>Bônus - Visagismo Facial</span>
                  <InlineEditText
                    as="span"
                    value={bonusPrice2}
                    onChange={(value) => handlePropertyChange('bonusPrice2', value)}
                    disabled={disabled}
                    className="font-medium"
                  />
                </div>
                <div className="flex justify-between items-center p-2 pt-3 font-bold">
                  <span>Valor Total</span>
                  <div className="relative">
                    <InlineEditText
                      as="span"
                      value={originalPrice}
                      onChange={(value) => handlePropertyChange('originalPrice', value)}
                      disabled={disabled}
                    />
                    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#ff5a5a] transform -translate-y-1/2 -rotate-3"></div>
                  </div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-[#f9f4ef] rounded-lg">
                <p className="text-sm text-[#aa6b5d] uppercase font-medium">Hoje por apenas</p>
                <InlineEditText
                  as="p"
                  value={finalPrice}
                  onChange={(value) => handlePropertyChange('finalPrice', value)}
                  disabled={disabled}
                  className="text-4xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent mb-1"
                />
                <p className="text-xs text-[#3a3a3a]/60">Pagamento único</p>
              </div>
            </div>

            {/* CTA Secundário - Exato como no funil real */}
            <Button
              onClick={handleCTAClick}
              disabled={disabled}
              className="text-white py-5 px-8 rounded-md shadow-md transition-colors mb-2 w-full max-w-md mx-auto"
              style={{
                background: "linear-gradient(to right, #4CAF50, #45a049)",
                boxShadow: "0 4px 14px rgba(76, 175, 80, 0.4)",
                fontSize: "1rem"
              }}
              {...hoverProps}
            >
              <span className="flex items-center justify-center gap-2">
                <ShoppingCart className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
                <InlineEditText
                  as="span"
                  value={ctaSecondaryText}
                  onChange={(value) => handlePropertyChange('ctaSecondaryText', value)}
                  placeholder="Texto do CTA secundário..."
                  disabled={disabled}
                  className="text-white font-bold"
                />
              </span>
            </Button>

            {/* Elementos de segurança */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#8F7A6A] mt-4">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-[#B89B7A]" />
                <span>Pagamento Seguro</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-[#B89B7A]" />
                <span>Acesso Imediato</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-[#B89B7A]" />
                <span>Garantia 7 Dias</span>
              </div>
            </div>

            <p className="text-sm text-[#aa6b5d] mt-2 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Oferta exclusiva nesta página</span>
            </p>
          </div>
        </AnimatedWrapper>

        {/* Placeholders para seções de confiança */}
        <div className="space-y-6 mt-10">
          <Card className="p-6 bg-gradient-to-br from-white to-[#fff7f3] border border-[#B89B7A]/15">
            <h3 className="text-lg font-medium text-[#aa6b5d] mb-2">🛡️ Seção de Garantias</h3>
            <p className="text-sm text-[#8F7A6A]">Seção editável no modo avançado</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-white to-[#fff7f3] border border-[#B89B7A]/15">
            <h3 className="text-lg font-medium text-[#aa6b5d] mb-2">👨‍🏫 Seção de Mentoria</h3>
            <p className="text-sm text-[#8F7A6A]">Seção editável no modo avançado</p>
          </Card>
        </div>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded z-50">
          Etapa 20 - Página de Resultado
        </div>
      )}
    </div>
  );
});

// Usando snippet para definir displayName
ResultPageBlock.displayName = 'ResultPageBlock';

export default ResultPageBlock;