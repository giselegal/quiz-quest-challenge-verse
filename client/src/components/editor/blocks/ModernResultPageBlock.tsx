import React, { useEffect, useState, Suspense, lazy, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import {
  ShoppingCart,
  CheckCircle,
  ArrowDown,
  Clock,
  ChevronLeft,
  ChevronRight,
  Shield,
  Award,
  Hourglass,
  Star,
  Gift,
  Target,
  Zap,
  TrendingUp,
} from "lucide-react";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import ProgressiveImage from "@/components/ui/progressive-image";
import { trackButtonClick } from "@/utils/analytics";
import { InlineEditText } from "./InlineEditText";

// Design tokens - Sistema aprimorado
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
    text: "#2C1810",
    textSecondary: "#5D4A3A",
    textMuted: "#8F7A6A",
    textLight: "#B5A394",
    success: "#4CAF50",
    successDark: "#45a049",
    warning: "#FF6B35",
    border: "rgba(184, 155, 122, 0.15)",
    borderLight: "rgba(184, 155, 122, 0.08)",
    overlay: "rgba(44, 24, 16, 0.02)",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem", 
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    "2xl": "2rem",
    "3xl": "3rem",
    "4xl": "4rem",
    "5xl": "6rem",
    "6xl": "7rem",
  },
  shadows: {
    xs: "0 1px 2px rgba(184, 155, 122, 0.05)",
    sm: "0 2px 4px rgba(184, 155, 122, 0.08)",
    md: "0 4px 12px rgba(184, 155, 122, 0.12)",
    lg: "0 8px 24px rgba(184, 155, 122, 0.15)",
    xl: "0 16px 40px rgba(184, 155, 122, 0.18)",
    cta: "0 8px 32px rgba(76, 175, 80, 0.25)",
    inner: "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
  },
  radius: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    full: "9999px",
  },
  typography: {
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
    lineHeights: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
    },
  },
};

// Componente de título melhorado
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
      {variant === "primary" && (
        <div className="flex justify-center items-center gap-3 mb-8">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
        </div>
      )}

      <h2
        className={`font-playfair font-bold leading-tight tracking-tight ${
          variant === "primary"
            ? "bg-gradient-to-r from-[#2C1810] via-[#aa6b5d] to-[#2C1810] bg-clip-text text-transparent mb-8"
            : "text-[#2C1810] mb-6"
        } ${
          size === "xl"
            ? "text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
            : size === "lg"
            ? "text-xl md:text-2xl lg:text-3xl xl:text-4xl"
            : "text-lg md:text-xl lg:text-2xl xl:text-3xl"
        }`}
      >
        {children}
      </h2>

      {subtitle && (
        <div className="max-w-4xl mx-auto">
          <p className="text-base md:text-lg lg:text-xl text-[#5D4A3A] leading-relaxed font-medium">
            {subtitle}
          </p>
        </div>
      )}

      {variant === "primary" && (
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] rounded-full mt-8 shadow-sm"></div>
        </div>
      )}
    </AnimatedWrapper>
  )
);

interface ModernResultPageBlockProps {
  block: {
    id: string;
    type: string;
    properties: {
      userName?: string;
      primaryStyle?: {
        category: string;
        percentage: number;
      };
      backgroundColor?: string;
      textColor?: string;
      ctaText?: string;
      ctaUrl?: string;
      showTimer?: boolean;
      showGuarantees?: boolean;
      products?: Array<{
        title: string;
        subtitle: string;
        image: string;
        badge: string;
        originalPrice: string;
      }>;
    };
  };
  isSelected?: boolean;
  onClick?: () => void;
  onPropertyChange?: (key: string, value: any) => void;
  disabled?: boolean;
  className?: string;
}

const ModernResultPageBlock: React.FC<ModernResultPageBlockProps> = ({
  block,
  isSelected = false,
  onClick,
  onPropertyChange,
  disabled = false,
  className
}) => {
  const {
    userName = "Visitante",
    primaryStyle = { category: "Elegante", percentage: 85 },
    backgroundColor = tokens.colors.background,
    textColor = tokens.colors.text,
    ctaText = "Quero Transformar Meu Estilo Agora",
    ctaUrl = "#",
    showTimer = true,
    showGuarantees = true,
    products = [
      {
        title: "Manual de Estilo Personalizado",
        subtitle: "Descubra combinações infalíveis que valorizam sua personalidade única.",
        image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071344/GUIA_NATURAL_fzp6fc.webp",
        badge: "GUIA PRINCIPAL",
        originalPrice: "R$ 77,00"
      },
      {
        title: "Guia das Peças Estratégicas",
        subtitle: "Peças-chave que maximizam combinações e garantem versatilidade.",
        image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1744911677/Cópia_de_MOCKUPS_15_-_Copia_grstwl.png",
        badge: "BÔNUS EXCLUSIVO",
        originalPrice: "R$ 59,00"
      }
    ]
  } = block.properties;

  const [timer, setTimer] = useState({
    hours: 2,
    minutes: 59,
    seconds: 59,
  });

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

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!disabled) {
      trackButtonClick("checkout_button", "Iniciar Checkout", "results_page");
      if (ctaUrl && ctaUrl !== "#") {
        window.open(ctaUrl, "_blank");
      }
    }
  };

  return (
    <div
      className={cn(
        "relative w-full min-h-screen overflow-hidden rounded-lg",
        isSelected ? "ring-2 ring-blue-500" : "",
        className
      )}
      onClick={onClick}
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      {/* Scrollbar personalizada */}
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
        `,
        }}
      />

      {/* Background decorativo */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-[#B89B7A]/8 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#aa6b5d]/6 to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 text-center border-b border-[#B89B7A]/10">
        <div className="flex justify-center">
          <div className="text-2xl font-bold text-[#B89B7A]">Logo</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 max-w-6xl relative z-10">
        {/* Primary Style Card */}
        <section className="mb-24 lg:mb-28">
          <Card
            className="relative overflow-hidden bg-gradient-to-br from-white to-[#fff7f3] border border-[#B89B7A]/15 rounded-2xl p-6 lg:p-10"
            style={{ boxShadow: tokens.shadows.xl }}
          >
            {/* Decoração de cantos */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#B89B7A]/20 rounded-tl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#B89B7A]/20 rounded-br-2xl"></div>

            <AnimatedWrapper animation="fade" show={true} duration={600} delay={200}>
              {/* Header personalizado */}
              <div className="text-center mb-12 lg:mb-16">
                <AnimatedWrapper className="mb-8" animation="scale" show={true} duration={500} delay={100}>
                  <div className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] px-6 py-3 rounded-full border border-[#B89B7A]/20">
                    <InlineEditText
                      as="span"
                      value={`Parabéns, ${userName}!`}
                      onChange={(value) => handlePropertyChange('userName', value.replace('Parabéns, ', '').replace('!', ''))}
                      disabled={disabled}
                      className="text-lg lg:text-xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent"
                    />
                  </div>
                </AnimatedWrapper>

                {/* Título principal */}
                <h1 className="text-2xl lg:text-4xl xl:text-5xl font-playfair text-[#2C1810] mb-8 leading-tight">
                  Descobrimos Seu Estilo Predominante:
                  <br />
                  <InlineEditText
                    as="span"
                    value={primaryStyle.category}
                    onChange={(value) => handlePropertyChange('primaryStyle', { ...primaryStyle, category: value })}
                    disabled={disabled}
                    className="text-3xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] bg-clip-text text-transparent mt-2 block"
                  />
                </h1>

                {/* Progress bar */}
                <div className="max-w-lg mx-auto mb-8">
                  <div className="flex items-center justify-between text-sm font-medium text-[#5D4A3A] mb-3">
                    <span>Compatibilidade</span>
                    <span className="text-lg font-bold text-[#B89B7A]">
                      {primaryStyle.percentage}%
                    </span>
                  </div>
                  <div className="relative">
                    <Progress
                      value={primaryStyle.percentage}
                      className="h-3 bg-gradient-to-r from-[#f5f2ec] to-[#f0ebe3] rounded-full overflow-hidden border border-[#B89B7A]/10"
                      style={{ boxShadow: tokens.shadows.inner }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Grid principal */}
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Conteúdo textual */}
                <div className="space-y-8 order-2 lg:order-1">
                  <div className="space-y-6">
                    <div
                      className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-xl p-6 border border-[#B89B7A]/10"
                      style={{ boxShadow: tokens.shadows.sm }}
                    >
                      <p className="text-[#2C1810] leading-relaxed text-lg font-medium mb-6">
                        <strong className="text-[#aa6b5d]">
                          Agora você tem clareza total
                        </strong>{" "}
                        sobre quem você é e como expressar sua personalidade
                        através do seu estilo!
                      </p>

                      <div className="bg-white/60 rounded-lg p-4 border border-[#B89B7A]/5">
                        <p className="text-[#2C1810] text-base leading-relaxed">
                          <strong className="text-[#aa6b5d]">
                            Seu estilo {primaryStyle.category}
                          </strong>{" "}
                          revela uma mulher que valoriza sofisticação atemporal e elegância natural.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Imagem principal */}
                <div className="order-1 lg:order-2">
                  <div className="relative max-w-md mx-auto">
                    <div
                      className="relative overflow-hidden rounded-2xl"
                      style={{ boxShadow: tokens.shadows.lg }}
                    >
                      <ProgressiveImage
                        src="https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_500/v1745071344/GUIA_NATURAL_fzp6fc.webp"
                        alt={`Estilo ${primaryStyle.category}`}
                        width={500}
                        height={600}
                        className="w-full h-auto transition-all duration-500 hover:scale-105"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
                    </div>

                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-4 py-2 rounded-full text-sm font-bold transform rotate-12 shadow-lg">
                      <span>{primaryStyle.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedWrapper>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="mb-24 lg:mb-28">
          <div
            className="relative overflow-hidden bg-gradient-to-br from-white via-[#fff7f3] to-[#f9f4ef] rounded-3xl p-8 lg:p-16 border border-[#B89B7A]/20 text-center"
            style={{ boxShadow: tokens.shadows.xl }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#B89B7A]/5 via-transparent to-[#aa6b5d]/5 pointer-events-none"></div>

            <div className="relative z-10">
              {/* Header da CTA */}
              <div className="mb-16 lg:mb-20">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
                  <div className="w-6 h-6 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full animate-pulse shadow-lg"></div>
                  <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
                </div>

                <h2 className="text-4xl lg:text-6xl xl:text-7xl font-playfair font-bold leading-tight mb-8">
                  <span className="bg-gradient-to-r from-[#2C1810] via-[#aa6b5d] to-[#2C1810] bg-clip-text text-transparent block mb-4">
                    Desperte Sua Confiança
                  </span>
                  <span className="text-[#aa6b5d] block">
                    Com Seu Estilo Único!
                  </span>
                </h2>

                <p className="text-xl lg:text-2xl text-[#5D4A3A] font-medium mb-6">
                  Guia {primaryStyle.category} Personalizado + Bônus Exclusivos
                </p>

                {showTimer && (
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B89B7A]/10 to-[#aa6b5d]/10 px-4 py-2 rounded-full border border-[#B89B7A]/20">
                    <Clock className="w-4 h-4 text-[#aa6b5d]" />
                    <span className="text-sm font-medium text-[#aa6b5d]">
                      Oferta por tempo limitado: {timer.hours.toString().padStart(2, '0')}:{timer.minutes.toString().padStart(2, '0')}:{timer.seconds.toString().padStart(2, '0')}
                    </span>
                  </div>
                )}
              </div>

              {/* Grid de produtos */}
              <div className="mb-16">
                <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-8 max-w-6xl mx-auto mb-12">
                  {products.map((product, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 flex-grow w-full md:w-[calc(50%-1rem)] group bg-white rounded-2xl p-6 lg:p-8 border border-[#B89B7A]/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl relative"
                      style={{ boxShadow: tokens.shadows.lg }}
                    >
                      <div className="absolute -top-4 -right-4 z-10">
                        <span className="text-xs font-bold px-4 py-2 rounded-full text-white shadow-lg transform rotate-12 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]">
                          <InlineEditText
                            as="span"
                            value={product.badge}
                            onChange={(value) => {
                              const newProducts = [...products];
                              newProducts[index] = { ...product, badge: value };
                              handlePropertyChange('products', newProducts);
                            }}
                            disabled={disabled}
                          />
                        </span>
                      </div>

                      <div className="relative mb-6 bg-gradient-to-br from-[#f9f4ef] to-[#fff7f3] rounded-xl p-4 overflow-hidden aspect-[4/5]">
                        <ProgressiveImage
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>

                      <div className="text-left space-y-4">
                        <InlineEditText
                          as="h4"
                          value={product.title}
                          onChange={(value) => {
                            const newProducts = [...products];
                            newProducts[index] = { ...product, title: value };
                            handlePropertyChange('products', newProducts);
                          }}
                          disabled={disabled}
                          className="font-bold text-[#2C1810] text-lg lg:text-xl leading-tight"
                        />
                        
                        <InlineEditText
                          as="p"
                          value={product.subtitle}
                          onChange={(value) => {
                            const newProducts = [...products];
                            newProducts[index] = { ...product, subtitle: value };
                            handlePropertyChange('products', newProducts);
                          }}
                          disabled={disabled}
                          multiline={true}
                          className="text-sm lg:text-base text-[#5D4A3A] leading-relaxed"
                        />

                        <div className="pt-4 border-t border-[#B89B7A]/10">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[#8F7A6A]">
                              Valor individual:
                            </span>
                            <InlineEditText
                              as="span"
                              value={product.originalPrice}
                              onChange={(value) => {
                                const newProducts = [...products];
                                newProducts[index] = { ...product, originalPrice: value };
                                handlePropertyChange('products', newProducts);
                              }}
                              disabled={disabled}
                              className="text-lg font-bold text-[#B89B7A] line-through"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resumo de valor */}
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
                      <span className="font-bold text-[#B89B7A] text-xl lg:text-2xl line-through">
                        R$ 175,00
                      </span>{" "}
                      por apenas:
                    </p>

                    <div className="space-y-2">
                      <InlineEditText
                        as="p"
                        value="R$ 39,90"
                        onChange={(value) => handlePropertyChange('finalPrice', value)}
                        disabled={disabled}
                        className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent"
                      />
                      <p className="text-lg lg:text-xl font-bold text-[#4CAF50]">
                        ou 5x de R$ 8,83
                      </p>
                    </div>

                    <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4CAF50]/10 to-[#43a047]/10 px-4 py-2 rounded-full border border-[#4CAF50]/20">
                      <TrendingUp className="w-4 h-4 text-[#4CAF50]" />
                      <span className="text-sm font-bold text-[#4CAF50]">
                        Economia de R$ 135,10 (77% OFF)
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[#8F7A6A] text-sm">
                      <Hourglass className="w-4 h-4 animate-pulse" />
                      <span>
                        Esta oferta expira quando você sair desta página
                      </span>
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
                >
                  <span
                    className="flex items-center justify-center gap-2 sm:gap-3"
                    style={{
                      fontSize: "clamp(0.875rem, 2.5vw, 1.25rem)",
                    }}
                  >
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
                    <InlineEditText
                      as="span"
                      value={ctaText}
                      onChange={(value) => handlePropertyChange('ctaText', value)}
                      disabled={disabled}
                      className="leading-tight text-white"
                    />
                    <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce flex-shrink-0" />
                  </span>

                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
                </Button>

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
          </div>
        </section>
      </main>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded z-50">
          Página de Resultado Moderna
        </div>
      )}
    </div>
  );
};

export default ModernResultPageBlock;
