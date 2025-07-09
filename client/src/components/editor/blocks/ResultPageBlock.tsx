import React, { useEffect, useState } from 'react';
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
} from "lucide-react";
import { trackButtonClick } from "@/utils/analytics";

// Design tokens modernos
const tokens = {
  colors: {
    primary: "#B89B7A",
    secondary: "#aa6b5d",
    background: "#fffaf7",
    text: "#2C1810",
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
      ctaUrl?: string;
      backgroundColor?: string;
      textColor?: string;
      showTimer?: boolean;
      showGuarantees?: boolean;
      finalPrice?: string;
    };
  };
  isSelected?: boolean;
  onClick?: () => void;
  onPropertyChange?: (key: string, value: any) => void;
  disabled?: boolean;
  className?: string;
}

const ResultPageBlock: React.FC<ResultPageBlockProps> = ({
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
    title = 'Etapa 20: Seu Resultado Personalizado',
    description = 'Baseado em suas respostas, identificamos seu estilo predominante',
    resultTitle = 'Seu Estilo: Elegante',
    resultDescription = 'Você tem um estilo elegante, refinado e atemporal. Prefere peças de qualidade, cortes clássicos e looks que transmitem sofisticação.',
    recommendations = [
      "✓ Invista em peças atemporais de qualidade superior",
      "✓ Prefira cores neutras, sóbrias e tons terrosos",
      "✓ Escolha acessórios discretos e elegantes",
      "✓ Priorize tecidos nobres e caimentos clássicos"
    ],
    ctaText = 'Quero Meu Guia Completo de Estilo',
    ctaUrl = "#",
    backgroundColor = tokens.colors.background,
    textColor = tokens.colors.text,
    showTimer = true,
    showGuarantees = true,
    finalPrice = "R$ 97,00"
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
        'relative w-full min-h-[600px] rounded-lg border-2',
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300',
        'cursor-pointer hover:border-gray-400 transition-all duration-300',
        className
      )}
      onClick={onClick}
      style={{ backgroundColor, color: textColor }}
    >
      {/* Background decorativo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-[#B89B7A]/8 to-transparent rounded-full blur-2xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-[#aa6b5d]/6 to-transparent rounded-full blur-xl transform -translate-x-1/4 translate-y-1/4"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6 lg:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-4 bg-gradient-to-r from-[#B89B7A]/10 to-[#aa6b5d]/10 border-[#B89B7A]/20">
            Resultado do Quiz
          </Badge>

          {/* Título principal editável */}
          <InlineEditText
            as="h1"
            value={title}
            onSave={(value) => handlePropertyChange('title', value)}
            placeholder="Título do resultado..."
            disabled={disabled}
            className="text-2xl md:text-3xl font-bold mb-4 font-playfair"
            style={{ color: textColor }}
          />

          {/* Descrição editável */}
          <InlineEditText
            as="p"
            value={description}
            onSave={(value) => handlePropertyChange('description', value)}
            placeholder="Descrição do resultado..."
            disabled={disabled}
            multiline={true}
            className="text-base lg:text-lg mb-6 opacity-80"
            style={{ color: textColor }}
          />
        </div>

        {/* Result Card Principal */}
        <Card
          className="relative overflow-hidden bg-gradient-to-br from-white/95 to-[#fff7f3]/95 border border-[#B89B7A]/15 rounded-xl p-6 lg:p-8 mb-8"
          style={{ boxShadow: tokens.shadows.lg }}
        >
          {/* Saudação personalizada */}
          {userName && (
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] px-4 py-2 rounded-full border border-[#B89B7A]/15">
                <InlineEditText
                  as="span"
                  value={`Parabéns, ${userName}!`}
                  onSave={(value) => handlePropertyChange('userName', value.replace('Parabéns, ', '').replace('!', ''))}
                  disabled={disabled}
                  className="font-semibold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent"
                />
              </div>
            </div>
          )}

          {/* Estilo principal */}
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">✨</div>
            
            <InlineEditText
              as="h2"
              value={primaryStyle.category}
              onSave={(value) => handlePropertyChange('primaryStyle', { ...primaryStyle, category: value })}
              placeholder="Nome do estilo..."
              disabled={disabled}
              className="text-xl md:text-2xl font-bold mb-4 font-playfair bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent"
            />

            {/* Progress bar de compatibilidade */}
            <div className="max-w-md mx-auto mb-6">
              <div className="flex items-center justify-between text-sm font-medium text-[#5D4A3A] mb-2">
                <span>Compatibilidade</span>
                <span className="font-bold text-[#B89B7A]">
                  {primaryStyle.percentage}%
                </span>
              </div>
              <Progress
                value={primaryStyle.percentage}
                className="h-2 bg-gradient-to-r from-[#f5f2ec] to-[#f0ebe3] rounded-full"
                style={{ boxShadow: tokens.shadows.sm }}
              />
            </div>
            
            <InlineEditText
              as="p"
              value={resultDescription}
              onSave={(value) => handlePropertyChange('resultDescription', value)}
              placeholder="Descrição detalhada do resultado..."
              disabled={disabled}
              multiline={true}
              className="text-base lg:text-lg mb-6 opacity-90 leading-relaxed"
              style={{ color: textColor }}
            />
          </div>

          {/* Recomendações */}
          {recommendations.length > 0 && (
            <div className="text-left max-w-2xl mx-auto mb-6">
              <h3 className="text-lg font-semibold mb-4 text-[#aa6b5d]">
                Recomendações para você:
              </h3>
              <ul className="space-y-3">
                {recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                    <InlineEditText
                      as="span"
                      value={rec}
                      onSave={(value) => {
                        const newRecs = [...recommendations];
                        newRecs[index] = value;
                        handlePropertyChange('recommendations', newRecs);
                      }}
                      disabled={disabled}
                      className="text-sm lg:text-base"
                      style={{ color: textColor }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>

        {/* Seção de Oferta/CTA */}
        <Card
          className="relative overflow-hidden bg-gradient-to-br from-white via-[#fff7f3] to-[#f9f4ef] border border-[#B89B7A]/20 rounded-xl p-6 lg:p-8 text-center"
          style={{ boxShadow: tokens.shadows.xl }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#B89B7A]/3 via-transparent to-[#aa6b5d]/3 pointer-events-none"></div>

          <div className="relative z-10">
            {/* Timer (se habilitado) */}
            {showTimer && (
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B89B7A]/10 to-[#aa6b5d]/10 px-4 py-2 rounded-full border border-[#B89B7A]/20">
                  <Clock className="w-4 h-4 text-[#aa6b5d]" />
                  <span className="text-sm font-medium text-[#aa6b5d]">
                    Oferta expira em: {timer.hours.toString().padStart(2, '0')}:{timer.minutes.toString().padStart(2, '0')}:{timer.seconds.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            )}

            {/* Preço */}
            <div className="mb-8">
              <p className="text-lg font-semibold text-[#5D4A3A] mb-2">
                Transforme seu estilo por apenas:
              </p>
              <InlineEditText
                as="p"
                value={finalPrice}
                onSave={(value) => handlePropertyChange('finalPrice', value)}
                disabled={disabled}
                className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent mb-4"
              />
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4CAF50]/10 to-[#43a047]/10 px-3 py-1 rounded-full">
                <TrendingUp className="w-4 h-4 text-[#4CAF50]" />
                <span className="text-sm font-semibold text-[#4CAF50]">
                  77% de desconto
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={handleCTAClick}
              disabled={disabled}
              size="lg"
              className="group relative font-bold py-4 px-8 lg:px-12 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 mb-6"
              style={{
                background: "linear-gradient(135deg, #4CAF50 0%, #43a047 50%, #388e3c 100%)",
                boxShadow: "0 10px 25px rgba(76, 175, 80, 0.3)",
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                <InlineEditText
                  as="span"
                  value={ctaText}
                  onSave={(value) => handlePropertyChange('ctaText', value)}
                  placeholder="Texto do botão de ação..."
                  disabled={disabled}
                  className="text-white font-bold"
                />
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </span>
            </Button>

            {/* Garantias */}
            {showGuarantees && (
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#8F7A6A]">
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
            )}
          </div>
        </Card>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded z-50">
          Página de Resultado
        </div>
      )}
    </div>
  );
};

export default ResultPageBlock;