import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
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
} from "lucide-react";
import { trackButtonClick } from "@/utils/analytics";

// Design tokens modernos para ofertas
const tokens = {
  colors: {
    primary: "#B89B7A",
    secondary: "#aa6b5d",
    background: "#fffaf7",
    text: "#2C1810",
    textSecondary: "#5D4A3A",
    success: "#4CAF50",
    warning: "#FF6B35",
  },
  shadows: {
    sm: "0 2px 4px rgba(184, 155, 122, 0.08)",
    md: "0 4px 12px rgba(184, 155, 122, 0.12)",
    lg: "0 8px 24px rgba(184, 155, 122, 0.15)",
    xl: "0 16px 40px rgba(184, 155, 122, 0.18)",
  },
};

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
      }>;
      urgencyText?: string;
      benefits?: string[];
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
  const {
    offerTitle = "Etapa 21: Oferta Exclusiva Para Seu Estilo!",
    offerSubtitle = "Leve sua transformação de estilo para o próximo nível",
    originalPrice = "R$ 297,00",
    discountPrice = "R$ 97,00",
    discountPercentage = 67,
    ctaText = "Sim! Quero Meu Guia Completo de Estilo",
    ctaUrl = "#",
    backgroundColor = tokens.colors.background,
    textColor = tokens.colors.text,
    showTimer = true,
    showGuarantees = true,
    showBonuses = true,
    bonuses = [
      {
        title: "Guia de Looks Completo",
        description: "50+ combinações prontas para seu estilo",
        value: "R$ 97,00"
      },
      {
        title: "Cartela de Cores Personalizada",
        description: "Cores que mais valorizam sua beleza natural",
        value: "R$ 67,00"
      },
      {
        title: "Guia de Compras Consciente",
        description: "Lista do que comprar primeiro para transformar seu guarda-roupa",
        value: "R$ 47,00"
      },
      {
        title: "Consultoria de Estilo por WhatsApp",
        description: "30 dias de suporte direto com nossa especialista",
        value: "R$ 197,00"
      }
    ],
    urgencyText = "Oferta disponível apenas para os próximos participantes do quiz!",
    benefits = [
      "✓ Acesso vitalício ao conteúdo completo",
      "✓ Atualizações gratuitas por 1 ano",
      "✓ Garantia de 7 dias - 100% do seu dinheiro de volta",
      "✓ Suporte especializado via WhatsApp por 30 dias",
      "✓ Comunidade exclusiva de pessoas com seu estilo"
    ]
  } = block.properties;

  const [timer, setTimer] = useState({
    hours: 1,
    minutes: 30,
    seconds: 0,
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
          return { hours: 1, minutes: 30, seconds: 0 };
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
      trackButtonClick("offer_cta", "Aproveitar Oferta", "offer_page");
      if (ctaUrl && ctaUrl !== "#") {
        window.open(ctaUrl, "_blank");
      }
    }
  };

  return (
    <div
      className={cn(
        'relative w-full min-h-[700px] rounded-lg border-2',
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300',
        'cursor-pointer hover:border-gray-400 transition-all duration-300',
        className
      )}
      onClick={onClick}
      style={{ backgroundColor, color: textColor }}
    >
      {/* Background decorativo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-[#B89B7A]/8 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#aa6b5d]/6 to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-1/2 left-1/4 w-1/4 h-1/4 bg-gradient-to-r from-[#B89B7A]/4 to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6 lg:p-8">
        {/* Header da Oferta */}
        <div className="text-center mb-8">
          <Badge 
            variant="outline" 
            className="mb-4 bg-gradient-to-r from-[#FF6B35]/10 to-[#ff8a65]/10 border-[#FF6B35]/30 text-[#FF6B35] font-semibold"
          >
            <Gift className="w-4 h-4 mr-1" />
            Oferta Especial
          </Badge>

          {/* Título da oferta */}
          <InlineEditText
            as="h1"
            value={offerTitle}
            onSave={(value) => handlePropertyChange('offerTitle', value)}
            placeholder="Título da oferta..."
            disabled={disabled}
            className="text-2xl md:text-4xl font-bold mb-4 font-playfair bg-gradient-to-r from-[#2C1810] via-[#aa6b5d] to-[#2C1810] bg-clip-text text-transparent"
          />

          {/* Subtítulo */}
          <InlineEditText
            as="p"
            value={offerSubtitle}
            onSave={(value) => handlePropertyChange('offerSubtitle', value)}
            placeholder="Subtítulo da oferta..."
            disabled={disabled}
            multiline={true}
            className="text-lg lg:text-xl mb-6 text-[#5D4A3A] font-medium"
          />

          {/* Timer de urgência */}
          {showTimer && (
            <div className="mb-6">
              <p className="text-sm text-[#8F7A6A] mb-2">
                <InlineEditText
                  as="span"
                  value={urgencyText}
                  onSave={(value) => handlePropertyChange('urgencyText', value)}
                  disabled={disabled}
                />
              </p>
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FF6B35]/15 to-[#ff8a65]/15 px-6 py-3 rounded-full border border-[#FF6B35]/20">
                <Clock className="w-5 h-5 text-[#FF6B35] animate-pulse" />
                <div className="flex items-center gap-1 text-xl font-bold text-[#FF6B35]">
                  <span className="bg-[#FF6B35] text-white px-2 py-1 rounded text-sm">
                    {timer.hours.toString().padStart(2, '0')}
                  </span>
                  <span>:</span>
                  <span className="bg-[#FF6B35] text-white px-2 py-1 rounded text-sm">
                    {timer.minutes.toString().padStart(2, '0')}
                  </span>
                  <span>:</span>
                  <span className="bg-[#FF6B35] text-white px-2 py-1 rounded text-sm">
                    {timer.seconds.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Card principal da oferta */}
        <Card
          className="relative overflow-hidden bg-gradient-to-br from-white via-[#fff7f3] to-[#f9f4ef] border border-[#B89B7A]/20 rounded-2xl p-6 lg:p-10 mb-8"
          style={{ boxShadow: tokens.shadows.xl }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#B89B7A]/5 via-transparent to-[#aa6b5d]/5 pointer-events-none"></div>

          <div className="relative z-10">
            {/* Preços em destaque */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
                <Star className="w-6 h-6 text-[#FFD700] fill-current" />
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
              </div>

              <p className="text-lg font-semibold text-[#5D4A3A] mb-2">
                De{" "}
                <InlineEditText
                  as="span"
                  value={originalPrice}
                  onSave={(value) => handlePropertyChange('originalPrice', value)}
                  disabled={disabled}
                  className="text-xl font-bold text-[#B89B7A] line-through"
                />
                {" "}por apenas:
              </p>

              <InlineEditText
                as="p"
                value={discountPrice}
                onSave={(value) => handlePropertyChange('discountPrice', value)}
                disabled={disabled}
                className="text-4xl lg:text-6xl font-extrabold bg-gradient-to-r from-[#4CAF50] to-[#43a047] bg-clip-text text-transparent mb-4"
              />

              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4CAF50]/10 to-[#43a047]/10 px-4 py-2 rounded-full border border-[#4CAF50]/20">
                <TrendingUp className="w-4 h-4 text-[#4CAF50]" />
                <span className="text-sm font-bold text-[#4CAF50]">
                  {discountPercentage}% de desconto
                </span>
              </div>
            </div>

            {/* Bônus (se habilitado) */}
            {showBonuses && bonuses.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#aa6b5d] mb-6 text-center">
                  🎁 Bônus Exclusivos Inclusos:
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {bonuses.map((bonus, index) => (
                    <div
                      key={index}
                      className="bg-white/80 rounded-lg p-4 border border-[#B89B7A]/10"
                      style={{ boxShadow: tokens.shadows.sm }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <InlineEditText
                          as="h4"
                          value={bonus.title}
                          onSave={(value) => {
                            const newBonuses = [...bonuses];
                            newBonuses[index] = { ...bonus, title: value };
                            handlePropertyChange('bonuses', newBonuses);
                          }}
                          disabled={disabled}
                          className="font-semibold text-[#2C1810] text-sm"
                        />
                        <InlineEditText
                          as="span"
                          value={bonus.value}
                          onSave={(value) => {
                            const newBonuses = [...bonuses];
                            newBonuses[index] = { ...bonus, value: value };
                            handlePropertyChange('bonuses', newBonuses);
                          }}
                          disabled={disabled}
                          className="text-xs font-bold text-[#4CAF50] bg-[#4CAF50]/10 px-2 py-1 rounded"
                        />
                      </div>
                      <InlineEditText
                        as="p"
                        value={bonus.description}
                        onSave={(value) => {
                          const newBonuses = [...bonuses];
                          newBonuses[index] = { ...bonus, description: value };
                          handlePropertyChange('bonuses', newBonuses);
                        }}
                        disabled={disabled}
                        multiline={true}
                        className="text-xs text-[#5D4A3A]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lista de benefícios */}
            {benefits.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#aa6b5d] mb-4 text-center">
                  ✅ O que você vai receber:
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#4CAF50] flex-shrink-0" />
                      <InlineEditText
                        as="span"
                        value={benefit}
                        onSave={(value) => {
                          const newBenefits = [...benefits];
                          newBenefits[index] = value;
                          handlePropertyChange('benefits', newBenefits);
                        }}
                        disabled={disabled}
                        className="text-sm font-medium text-[#2C1810]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Principal */}
            <div className="text-center">
              <Button
                onClick={handleCTAClick}
                disabled={disabled}
                size="lg"
                className="group relative font-bold py-6 px-8 lg:px-16 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 mb-6"
                style={{
                  background: "linear-gradient(135deg, #4CAF50 0%, #43a047 50%, #388e3c 100%)",
                  boxShadow: "0 20px 40px rgba(76, 175, 80, 0.3), 0 0 0 1px rgba(255,255,255,0.2) inset",
                }}
              >
                <span className="flex items-center justify-center gap-3 text-white">
                  <ShoppingCart className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  <InlineEditText
                    as="span"
                    value={ctaText}
                    onSave={(value) => handlePropertyChange('ctaText', value)}
                    placeholder="Texto do botão..."
                    disabled={disabled}
                    className="text-white font-bold text-lg"
                  />
                  <ArrowDown className="w-5 h-5 animate-bounce" />
                </span>

                {/* Efeito de brilho */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
              </Button>

              {/* Garantias */}
              {showGuarantees && (
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#8F7A6A]">
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
        </Card>

        {/* Rodapé com urgência */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B35]/10 to-[#ff8a65]/10 px-4 py-2 rounded-full border border-[#FF6B35]/20">
            <Hourglass className="w-4 h-4 text-[#FF6B35] animate-pulse" />
            <span className="text-sm font-medium text-[#FF6B35]">
              Esta oferta expira quando você sair desta página
            </span>
          </div>
        </div>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded z-50">
          Página de Oferta
        </div>
      )}
    </div>
  );
};

export default QuizOfferPageBlock;
