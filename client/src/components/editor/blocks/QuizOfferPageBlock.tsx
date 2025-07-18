import React, { useEffect, useState, Suspense, lazy, useCallback } from 'react';
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
  Star,
  Gift,
  Target,
  Zap,
  Crown,
  Flame,
  Eye,
} from "lucide-react";
import { trackButtonClick } from "@/utils/analytics";

// Design tokens fiéis ao funil real moderno - Sistema APRIMORADO
const tokens = {
  colors: {
    primary: "#B89B7A",
    primaryDark: "#A1835D",
    primaryLight: "#D4B79F",
    secondary: "#aa6b5d",
    secondaryDark: "#8F5A4D",
    secondaryLight: "#C28A7D",
    background: "#fffaf7",
    backgroundAlt: "#f9f4ef",
    backgroundCard: "#ffffff",
    text: "#2C1810", // Mais escuro para melhor contraste
    textSecondary: "#5D4A3A", // Melhor hierarquia
    textMuted: "#8F7A6A",
    textLight: "#B5A394",
    success: "#4CAF50",
    successDark: "#45a049",
    warning: "#FF6B35",
    border: "rgba(184, 155, 122, 0.15)",
    borderLight: "rgba(184, 155, 122, 0.08)",
    overlay: "rgba(44, 24, 16, 0.02)",
  },
  // SISTEMA DE SPACING REFINADO E PADRONIZADO
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "0.75rem", // 12px
    lg: "1rem", // 16px
    xl: "1.5rem", // 24px
    "2xl": "2rem", // 32px
    "3xl": "3rem", // 48px
    "4xl": "4rem", // 64px
    "5xl": "6rem", // 96px
    "6xl": "7rem", // 112px
  },
  // SHADOWS MAIS SUTIS E ELEGANTES
  shadows: {
    xs: "0 1px 2px rgba(184, 155, 122, 0.05)",
    sm: "0 2px 4px rgba(184, 155, 122, 0.08)",
    md: "0 4px 12px rgba(184, 155, 122, 0.12)",
    lg: "0 8px 24px rgba(184, 155, 122, 0.15)",
    xl: "0 16px 40px rgba(184, 155, 122, 0.18)",
    cta: "0 8px 32px rgba(76, 175, 80, 0.25)",
    inner: "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
  },
  // BORDER RADIUS HARMONIOSO
  radius: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "0.75rem", // 12px
    lg: "1rem", // 16px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    full: "9999px",
  },
  // TIPOGRAFIA MELHORADA
  typography: {
    fontSizes: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
    },
    lineHeights: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
    },
  },
};

// Componente de título melhorado - ESPAÇAMENTO PADRONIZADO
// Este componente é um bom exemplo de como ser Flexbox-driven e responsivo.
const SectionTitle = React.memo<{
  children: React.ReactNode;
  subtitle?: string;
  size?: "md" | "lg" | "xl";
  className?: string;
  variant?: "primary" | "secondary" | "simple";
  centered?: boolean;
}>(
  ({
    children,
    subtitle,
    size = "xl",
    className = "",
    variant = "simple",
    centered = true,
  }) => (
    <AnimatedWrapper
      className={`${centered ? "text-center" : ""} mb-12 lg:mb-16 ${className}`}
      animation="fade"
      show={true}
      duration={600}
    >
      {/* Decoração superior refinada - Usando flex para centralizar os elementos inline */}
      {variant === "primary" && (
        <div className="flex justify-center items-center gap-3 mb-8">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
        </div>
      )}

      {/* Título com melhor hierarquia e responsividade de fonte */}
      <h2
        className={`font-playfair font-bold leading-tight tracking-tight ${
          variant === "primary"
            ? "bg-gradient-to-r from-[#2C1810] via-[#aa6b5d] to-[#2C1810] bg-clip-text text-transparent mb-8"
            : "text-[#2C1810] mb-6"
        } ${
          size === "xl"
            ? "text-2xl md:text-3xl lg:text-4xl xl:text-5xl" // Fontes responsivas
            : size === "lg"
            ? "text-xl md:text-2xl lg:text-3xl xl:text-4xl"
            : "text-lg md:text-xl lg:text-2xl xl:text-3xl"
        }`}
      >
        {children}
      </h2>

      {/* Subtítulo melhorado - Max-width para controle de linha */}
      {subtitle && (
        <div className="max-w-4xl mx-auto">
          <p className="text-base md:text-lg lg:text-xl text-[#5D4A3A] leading-relaxed font-medium">
            {subtitle}
          </p>
        </div>
      )}

      {/* Linha decorativa - Usando flex para centralizar */}
      {variant === "primary" && (
        <div className="flex justify-center"> {/* Adicionado flex para centralizar */}
          <div className="w-24 h-1 bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] rounded-full mt-8 shadow-sm"></div>
        </div>
      )}
    </AnimatedWrapper>
  )
);

interface QuizOfferPageBlockProps {
  block: {
    id: string;
    type: string;
    properties: {
      offerTitle?: string;
      offerSubtitle?: string;
      originalPrice?: string;
      discountPrice?: string;
      discountPercentage?: number;
      ctaText?: string;
      ctaUrl?: string;
      backgroundColor?: string;
      textColor?: string;
      showTimer?: boolean;
      showGuarantees?: boolean;
      showBonuses?: boolean;
      bonuses?: Array<{
        title: string;
        description: string;
        value: string;
        image?: string;
      }>;
      urgencyText?: string;
      benefits?: string[];
      logoUrl?: string;
      finalPrice?: string;
      paymentOptions?: string;
    };
  };
  isSelected?: boolean;
  onClick?: () => void;
  onPropertyChange?: (key: string, value: any) => void;
  disabled?: boolean;
  className?: string;
}

const QuizOfferPageBlock: React.FC<QuizOfferPageBlockProps> = ({
  block,
  isSelected = false,
  onClick,
  onPropertyChange,
  disabled = false,
  className
}) => {
  // Dados fiéis ao funil real moderno
  const {
    offerTitle = "Desperte Sua Confiança Com Seu Estilo Único!",
    offerSubtitle = "Guia Personalizado + Bônus Exclusivos",
    originalPrice = "R$ 175,00",
    finalPrice = "R$ 39,90",
    paymentOptions = "ou 5x de R$ 8,83",
    ctaText = "Quero Transformar Meu Estilo Agora",
    ctaUrl = "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912",
    backgroundColor = tokens.colors.background,
    textColor = tokens.colors.text,
    showTimer = true,
    showGuarantees = true,
    showBonuses = true,
    bonuses = [
      {
        title: "Manual de Estilo Personalizado",
        description: "Descubra combinações infalíveis de cores, tecidos e acessórios que valorizam sua personalidade única.",
        value: "R$ 77,00",
        image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071344/GUIA_NATURAL_fzp6fc.webp"
      },
      {
        title: "Guia das Peças Estratégicas",
        description: "Peças-chave que maximizam combinações e garantem versatilidade em qualquer situação.",
        value: "R$ 59,00",
        image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1744911677/Cópia_de_MOCKUPS_15_-_Copia_grstwl.png"
      },
      {
        title: "Manual de Visagismo",
        description: "Descubra os cortes ideais para seu rosto e realce sua beleza natural.",
        value: "R$ 39,00",
        image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1744911666/Cópia_de_Template_Dossiê_Completo_2024_15_-_Copia_ssrhu3.png"
      }
    ],
    benefits = [
      "Looks com intenção e identidade",
      "Cores, modelagens e tecidos a seu favor",
      "Imagem alinhada aos seus objetivos",
      "Guarda-roupa funcional, sem compras por impulso"
    ],
    logoUrl = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
  } = block.properties;

  // Estados de interação melhorados
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [timer, setTimer] = useState({
    hours: 2,
    minutes: 59,
    seconds: 59,
  });

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  // Timer otimizado (mantido como está)
  useEffect(() => {
    if (!showTimer) return;
    
    const countdownInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer.seconds > 0) {
          return { ...prevTimer, seconds: prevTimer.seconds - 1 };
        } else if (prevTimer.minutes > 0) {
          return { ...prevTimer, minutes: prevTimer.minutes - 1, seconds: 59 };
        } else if (prevTimer.hours > 0) {
          return { hours: prevTimer.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 2, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [showTimer]);

  const handleCTAClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    interface WindowWithCTAProcessing extends Window {
      ctaClickProcessing?: boolean;
    }

    const windowTyped = window as WindowWithCTAProcessing;

    if (windowTyped.ctaClickProcessing || disabled) return;
    windowTyped.ctaClickProcessing = true;

    trackButtonClick("checkout_button", "Iniciar Checkout", "offer_page");

    if (ctaUrl && ctaUrl !== "#") {
      if (window.innerWidth >= 768) {
        window.open(ctaUrl, "_blank");
      } else {
        window.location.href = ctaUrl;
      }
    }

    setTimeout(() => {
      windowTyped.ctaClickProcessing = false;
    }, 1000);
  }, [ctaUrl, disabled]);

  return (
    <div
      className={cn(
        'relative w-full min-h-[800px] rounded-lg border-2 overflow-hidden',
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300',
        'cursor-pointer hover:border-gray-400 transition-all duration-300',
        className
      )}
      onClick={onClick}
      style={{
        backgroundColor,
        color: textColor,
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Scrollbar personalizada e Focus states (CSS puro, não React/Tailwind) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          ::-webkit-scrollbar {
            width: 6px;
          }
          ::-webkit-scrollbar-track {
            background: rgba(184, 155, 122, 0.1);
          }
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, ${tokens.colors.primary}, ${tokens.colors.secondary});
            border-radius: 3px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, ${tokens.colors.secondary}, ${tokens.colors.primary});
          }

          /* Focus states melhorados */
          button:focus-visible,
          a:focus-visible {
            outline: 2px solid ${tokens.colors.primary};
            outline-offset: 2px;
            border-radius: ${tokens.radius.sm};
          }
        `,
        }}
      />

      {/* Background decorativo refinado (mantido como está) */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-[#B89B7A]/8 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#aa6b5d]/6 to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-1/2 left-1/4 w-1/4 h-1/4 bg-gradient-to-r from-[#B89B7A]/4 to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* Header minimalista e elegante - Já usa flex para centralizar o logo */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-[#B89B7A]/10">
        <div className="container mx-auto max-w-6xl px-4 py-4 lg:py-6">
          {/* Flexbox para centralizar o logo horizontalmente */}
          <div className="flex justify-center">
            <img
              src={logoUrl}
              alt="Logo"
              className="h-12 lg:h-16 w-auto object-contain transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>
      </header>

      {/* CONTAINER PRINCIPAL - ESPAÇAMENTO PADRONIZADO */}
      <main className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 max-w-6xl relative z-10">
        
        {/* CTA Final completamente redesenhada - ESPAÇAMENTO PADRONIZADO */}
        <section className="scroll-mt-24 mb-24 lg:mb-28">
          <div
            className="relative overflow-hidden bg-gradient-to-br from-white via-[#fff7f3] to-[#f9f4ef] rounded-3xl p-8 lg:p-16 border border-[#B89B7A]/20 text-center"
            style={{ boxShadow: tokens.shadows.xl }}
          >
            {/* Background decorativo (mantido como está) */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#B89B7A]/5 via-transparent to-[#aa6b5d]/5 pointer-events-none"></div>

            <AnimatedWrapper
              animation="fade"
              show={true}
              duration={600}
              delay={200}
            >
              <div className="relative z-10">
                {/* Header da CTA - Flexbox para elementos inline */}
                <div className="mb-16 lg:mb-20">
                  {/* Flexbox para alinhar as decorações e o pulso horizontalmente */}
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
                    <div className="w-6 h-6 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full animate-pulse shadow-lg"></div>
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
                  </div>

                  {/* Título principal da CTA */}
                  <InlineEditText
                    as="h2"
                    value={offerTitle}
                    onChange={(value) => handlePropertyChange('offerTitle', value)}
                    placeholder="Título da oferta..."
                    disabled={disabled}
                    className="text-4xl lg:text-6xl xl:text-7xl font-playfair font-bold leading-tight mb-8 bg-gradient-to-r from-[#2C1810] via-[#aa6b5d] to-[#2C1810] bg-clip-text text-transparent"
                  />

                  <InlineEditText
                    as="p"
                    value={offerSubtitle}
                    onChange={(value) => handlePropertyChange('offerSubtitle', value)}
                    placeholder="Subtítulo da oferta..."
                    disabled={disabled}
                    className="text-xl lg:text-2xl text-[#5D4A3A] font-medium mb-6"
                  />

                  {/* Timer de urgência */}
                  {showTimer && (
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B89B7A]/10 to-[#aa6b5d]/10 px-4 py-2 rounded-full border border-[#B89B7A]/20 mb-6">
                      <Clock className="w-4 h-4 text-[#aa6b5d]" />
                      <span className="text-sm font-medium text-[#aa6b5d]">
                        Oferta expira em: {String(timer.hours).padStart(2, '0')}:
                        {String(timer.minutes).padStart(2, '0')}:
                        {String(timer.seconds).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Grid de produtos otimizado - Layout responsivo de múltiplas colunas */}
                {showBonuses && bonuses && bonuses.length > 0 && (
                  <div className="mb-16">
                    <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-8 max-w-6xl mx-auto mb-12">
                      {bonuses.map((bonus, index) => (
                        <div
                          key={index}
                          className={`flex-shrink-0 flex-grow w-full md:w-[calc(50%-1rem)] lg:w-[calc(50%-1rem)] group bg-white rounded-2xl p-6 lg:p-8 border border-[#B89B7A]/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl relative`}
                          style={{ boxShadow: tokens.shadows.lg }}
                        >
                          {/* Badge premium */}
                          <div className="absolute -top-4 -right-4 z-10">
                            <span
                              className={`text-xs font-bold px-4 py-2 rounded-full text-white shadow-lg transform rotate-12 ${
                                index === 0
                                  ? "bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]"
                                  : "bg-gradient-to-r from-[#aa6b5d] to-[#B89B7A]"
                              }`}
                            >
                              {index === 0 ? "GUIA PRINCIPAL" : "BÔNUS EXCLUSIVO"}
                            </span>
                          </div>

                          {/* Imagem do produto */}
                          {bonus.image && (
                            <div className="relative mb-6 bg-gradient-to-br from-[#f9f4ef] to-[#fff7f3] rounded-xl p-4 overflow-hidden"
                                 style={{ boxShadow: tokens.shadows.sm }}>
                              <ProgressiveImage
                                src={bonus.image}
                                alt={bonus.title}
                                className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#B89B7A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"></div>
                            </div>
                          )}

                          {/* Conteúdo do produto */}
                          <div className="text-left space-y-4">
                            <h4 className="font-bold text-[#2C1810] text-lg lg:text-xl leading-tight">
                              {bonus.title}
                            </h4>
                            <p className="text-sm lg:text-base text-[#5D4A3A] leading-relaxed">
                              {bonus.description}
                            </p>

                            {/* Preço original */}
                            <div className="pt-4 border-t border-[#B89B7A]/10">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-[#8F7A6A]">
                                  Valor individual:
                                </span>
                                <span className="text-lg font-bold text-[#B89B7A] line-through">
                                  {bonus.value}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resumo de valor redesenhado */}
                <div className="max-w-lg mx-auto mb-12">
                  <div
                    className="relative bg-white rounded-2xl p-8 lg:p-10 border-4 border-double border-[#B89B7A]/30 overflow-hidden"
                    style={{
                      boxShadow: "0 20px 40px rgba(184,155,122,0.15), 0 0 0 1px rgba(255,255,255,0.8) inset",
                      background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(249,244,239,0.95) 100%)",
                    }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B89B7A]/10 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>

                    <div className="relative z-10 text-center space-y-6">
                      <p className="text-lg lg:text-xl font-semibold text-[#5D4A3A]">
                        De{" "}
                        <InlineEditText
                          as="span"
                          value={originalPrice}
                          onChange={(value) => handlePropertyChange('originalPrice', value)}
                          disabled={disabled}
                          className="font-bold text-[#B89B7A] text-xl lg:text-2xl line-through"
                        />{" "}
                        por apenas:
                      </p>

                      <div className="space-y-2">
                        <InlineEditText
                          as="p"
                          value={finalPrice}
                          onChange={(value) => handlePropertyChange('finalPrice', value)}
                          disabled={disabled}
                          className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent"
                        />
                        <InlineEditText
                          as="p"
                          value={paymentOptions}
                          onChange={(value) => handlePropertyChange('paymentOptions', value)}
                          disabled={disabled}
                          className="text-lg lg:text-xl font-bold text-[#4CAF50]"
                        />
                      </div>

                      <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4CAF50]/10 to-[#43a047]/10 px-4 py-2 rounded-full border border-[#4CAF50]/20">
                        <TrendingUp className="w-4 h-4 text-[#4CAF50]" />
                        <span className="text-sm font-bold text-[#4CAF50]">
                          Economia de R$ 135,10 (77% OFF)
                        </span>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-[#8F7A6A] text-sm">
                        <Hourglass className="w-4 h-4 animate-pulse" />
                        <span>Esta oferta expira quando você sair desta página</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button principal */}
                <div className="text-center">
                  <Button
                    onClick={handleCTAClick}
                    disabled={disabled}
                    className="group relative text-white font-bold py-6 px-8 sm:px-12 lg:px-16 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
                    style={{
                      background: "linear-gradient(135deg, #4CAF50 0%, #43a047 50%, #388e3c 100%)",
                      boxShadow: "0 20px 40px rgba(76, 175, 80, 0.3), 0 0 0 1px rgba(255,255,255,0.2) inset",
                    }}
                    type="button"
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                  >
                    <span
                      className="flex items-center justify-center gap-2 sm:gap-3"
                      style={{
                        fontSize: "clamp(0.875rem, 2.5vw, 1.25rem)",
                      }}
                    >
                      <ShoppingCart className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-transform duration-300 ${isButtonHovered ? 'scale-110' : ''} flex-shrink-0`} />
                      <InlineEditText
                        as="span"
                        value={ctaText}
                        onChange={(value) => handlePropertyChange('ctaText', value)}
                        placeholder="Texto do CTA..."
                        disabled={disabled}
                        className="leading-tight text-white font-bold"
                      />
                      <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce flex-shrink-0" />
                    </span>

                    {/* Efeito de brilho */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
                  </Button>

                  {/* Garantias de segurança */}
                  {showGuarantees && (
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-[#8F7A6A]">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-[#B89B7A]" />
                        <span>Pagamento 100% Seguro</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#B89B7A]" />
                        <span>Acesso Imediato</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#B89B7A]" />
                        <span>Garantia de 7 Dias</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </AnimatedWrapper>
          </div>
        </section>
      </main>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded z-50">
          Etapa 21 - Página de Oferta
        </div>
      )}
    </div>
  );
};

export default QuizOfferPageBlock;
