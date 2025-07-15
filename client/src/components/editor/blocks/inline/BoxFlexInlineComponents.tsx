import React, { useState } from "react";
import { cn } from "@/lib/utils";
import type { BlockData } from "@/types/blocks";
import { Crown, Target, RefreshCw, Sparkles, Gift, ShoppingCart, Shield, User, DollarSign, Settings } from 'lucide-react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// ===== CORES DA MARCA GISELE GALVÃO =====
const BRAND_COLORS = {
  primary: '#B89B7A',      // Dourado elegante
  secondary: '#432818',    // Marrom sofisticado  
  accent: '#aa6b5d',       // Rosé suave
  background: '#FFFBF7',   // Creme claro
  surface: '#F9F4EF',      // Bege claro
  text: {
    primary: '#432818',
    secondary: '#6B4F43',
    light: '#8B7355'
  }
};

// ===== BASE COMPONENT ELEGANTE =====
interface BoxFlexInlineProps {
  label?: string;
  value: string;
  onChange?: (value: string) => void;
  icon?: React.ReactNode;
  editable?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'elegant' | 'highlight' | 'minimal';
  [key: string]: any;
}

// UI Component elegante usando Radix UI
export const BoxFlexInlineComponent: React.FC<BoxFlexInlineProps> = ({
  label,
  value,
  onChange,
  icon,
  editable = true,
  children,
  className,
  variant = 'default',
  ...props
}) => {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  
  const handleBlur = () => {
    setEditing(false);
    if (editValue !== value) onChange?.(editValue);
  };

  const variantStyles = {
    default: 'bg-white border-gray-200 hover:border-brand-primary/30',
    elegant: `bg-white border-2 border-[${BRAND_COLORS.primary}]/20 hover:border-[${BRAND_COLORS.primary}]/40`,
    highlight: `bg-gradient-to-r from-[${BRAND_COLORS.surface}] to-white border-[${BRAND_COLORS.accent}]/30`,
    minimal: 'bg-gray-50 border-gray-100'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200",
        "hover:shadow-md hover:shadow-black/5",
        variantStyles[variant],
        className
      )}
      style={{ 
        borderColor: `${BRAND_COLORS.primary}20`,
        backgroundColor: variant === 'elegant' ? BRAND_COLORS.surface : undefined,
        ...props.style 
      }}
      {...props}
    >
      {icon && (
        <div className="flex-shrink-0 p-1.5 rounded-md" style={{ backgroundColor: `${BRAND_COLORS.primary}15` }}>
          {icon}
        </div>
      )}
      
      {label && (
        <span className="text-sm font-medium flex-shrink-0" style={{ color: BRAND_COLORS.text.secondary }}>
          {label}
        </span>
      )}
      
      <div className="flex-1 min-w-0">
        {editable ? (
          editing ? (
            <input
              type="text"
              className="w-full px-2 py-1 text-sm rounded border border-gray-300 focus:border-brand-primary focus:outline-none"
              value={editValue}
              autoFocus
              onChange={e => setEditValue(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={e => {
                if (e.key === "Enter") handleBlur();
                if (e.key === "Escape") {
                  setEditing(false);
                  setEditValue(value);
                }
              }}
              style={{ borderColor: `${BRAND_COLORS.primary}50` }}
            />
          ) : (
            <span
              className="block w-full cursor-pointer text-sm hover:underline truncate"
              onClick={() => setEditing(true)}
              title={value}
              style={{ color: BRAND_COLORS.text.primary }}
            >
              {value}
            </span>
          )
        ) : (
          <span className="block w-full text-sm truncate" style={{ color: BRAND_COLORS.text.primary }}>
            {value}
          </span>
        )}
      </div>
      
      {children}
    </motion.div>
  );
};

// ===== ETAPA 20 COMPONENTS - ORDEM CORRETA DO CANVAS =====

interface BaseInlineProps {
  block: BlockData;
  isSelected?: boolean;
  onClick?: () => void;
  onPropertyChange?: (key: string, value: any) => void;
  disabled?: boolean;
  className?: string;
}

// 1. Header section - ELEGANTE COM CORES DA MARCA
const HeaderBoxFlexInline: React.FC<BaseInlineProps> = ({
  block,
  onPropertyChange,
  disabled,
  className
}) => {
  const { properties = {} } = block;
  
  return (
    <Card className={cn("border-0 shadow-lg", className)} style={{ backgroundColor: BRAND_COLORS.surface }}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <motion.img 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src={properties.logo || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"} 
            alt="Logo Gisele Galvão" 
            className="h-12 w-auto" 
          />
          <div className="flex-1">
            <BoxFlexInlineComponent
              icon={<Crown className="w-5 h-5" style={{ color: BRAND_COLORS.primary }} />}
              value={properties.title || "Seu Estilo Predominante Foi Descoberto!"}
              onChange={(value: string) => onPropertyChange?.('title', value)}
              editable={!disabled}
              variant="elegant"
              className="mb-2"
            />
            <Badge 
              variant="secondary" 
              className="text-xs"
              style={{ 
                backgroundColor: `${BRAND_COLORS.accent}20`,
                color: BRAND_COLORS.accent,
                border: `1px solid ${BRAND_COLORS.accent}30`
              }}
            >
              {properties.percentage || "85%"} de compatibilidade
            </Badge>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

// 2. Result main section - ELEGANTE COM DESIGN SOFISTICADO
const ResultMainBoxFlexInline: React.FC<BaseInlineProps> = ({
  block,
  onPropertyChange,
  disabled,
  className
}) => {
  const { properties = {} } = block;
  const percentage = properties.percentage || 85;
  
  return (
    <Card className={cn("overflow-hidden border-0 shadow-xl", className)}>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6" style={{ color: BRAND_COLORS.primary }} />
              <h3 className="text-2xl font-serif" style={{ color: BRAND_COLORS.text.primary }}>
                Seu Estilo
              </h3>
            </div>
            
            <BoxFlexInlineComponent
              label="Categoria:"
              value={properties.styleName || "Natural"}
              onChange={(value: string) => onPropertyChange?.('styleName', value)}
              editable={!disabled}
              variant="highlight"
              className="text-lg font-semibold"
            />
            
            <BoxFlexInlineComponent
              label="Descrição:"
              value={properties.description || "Você valoriza o conforto e a praticidade, com um visual descontraído e autêntico."}
              onChange={(value: string) => onPropertyChange?.('description', value)}
              editable={!disabled}
              variant="minimal"
            />
            
            <div className="flex items-center gap-2 mt-4">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: BRAND_COLORS.primary }}
              />
              <span className="text-sm" style={{ color: BRAND_COLORS.text.secondary }}>
                {percentage}% de compatibilidade
              </span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <img 
              src={properties.styleImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp"} 
              alt="Seu Estilo" 
              className="w-full h-64 object-cover rounded-xl shadow-lg" 
            />
            <div 
              className="absolute -top-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
              style={{ backgroundColor: BRAND_COLORS.accent }}
            >
              {percentage}%
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};
// 3. Secondary styles (estilos secundários) - ELEGANTE
const SecondaryStylesBoxFlexInline: React.FC<BaseInlineProps> = ({
  block,
  onPropertyChange,
  disabled,
  className
}) => {
  const { properties = {} } = block;
  const secondaryStyles = properties.secondaryStyles || [
    { name: 'Clássico', percentage: 12, color: BRAND_COLORS.secondary },
    { name: 'Contemporâneo', percentage: 3, color: BRAND_COLORS.accent }
  ];
  
  return (
    <Card className={cn("border-0 shadow-md", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5" style={{ color: BRAND_COLORS.primary }} />
          <h4 className="text-lg font-semibold" style={{ color: BRAND_COLORS.text.primary }}>
            Estilos Complementares
          </h4>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {secondaryStyles.map((style: any, i: number) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg"
            style={{ backgroundColor: `${style.color}10`, border: `1px solid ${style.color}20` }}
          >
            <span className="font-medium" style={{ color: BRAND_COLORS.text.primary }}>
              {style.name}
            </span>
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: style.color }}
              />
              <span className="text-lg font-bold" style={{ color: style.color }}>
                {style.percentage}%
              </span>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

// 4. Before/After section (transformação) - ELEGANTE
const BeforeAfterBoxFlexInline: React.FC<BaseInlineProps> = ({
  block,
  onPropertyChange,
  disabled,
  className
}) => {
  const { properties = {} } = block;
  
  return (
    <Card className={cn("overflow-hidden border-0 shadow-lg", className)}>
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <RefreshCw className="w-8 h-8 mx-auto mb-2" style={{ color: BRAND_COLORS.primary }} />
          <h3 className="text-xl font-serif" style={{ color: BRAND_COLORS.text.primary }}>
            Sua Transformação
          </h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <div className="relative">
              <img 
                src={properties.beforeImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334756/ChatGPT_Image_4_de_mai._de_2025_01_42_42_jlugsc.webp"} 
                alt="Antes" 
                className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg"
                style={{ border: `3px solid ${BRAND_COLORS.accent}50` }}
              />
              <Badge 
                variant="destructive" 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
              >
                Antes
              </Badge>
            </div>
            
            <BoxFlexInlineComponent
              value={properties.beforeText || "Dúvidas sobre qual estilo combina comigo"}
              onChange={(value: string) => onPropertyChange?.('beforeText', value)}
              editable={!disabled}
              variant="minimal"
              className="text-center"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center space-y-4"
          >
            <div className="relative">
              <img 
                src={properties.afterImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334754/ChatGPT_Image_4_de_mai._de_2025_00_30_44_naqom0.webp"} 
                alt="Depois" 
                className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg"
                style={{ border: `3px solid ${BRAND_COLORS.primary}` }}
              />
              <Badge 
                variant="default" 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                style={{ backgroundColor: BRAND_COLORS.primary }}
              >
                Agora
              </Badge>
            </div>
            
            <BoxFlexInlineComponent
              value={properties.afterText || "Clareza total sobre seu estilo único"}
              onChange={(value: string) => onPropertyChange?.('afterText', value)}
              editable={!disabled}
              variant="elegant"
              className="text-center"
            />
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

// 5. Motivation section (motivação) - ELEGANTE
const MotivationBoxFlexInline: React.FC<BaseInlineProps> = ({
  block,
  onPropertyChange,
  disabled,
  className
}) => {
  const { properties = {} } = block;
  
  return (
    <Card className={cn("border-0 shadow-lg", className)} style={{ backgroundColor: BRAND_COLORS.surface }}>
      <CardContent className="p-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="w-8 h-8 mx-auto mb-4" style={{ color: BRAND_COLORS.primary }} />
          <BoxFlexInlineComponent
            value={properties.motivationText || "Vista-se de você — na prática, com o seu Guia de Estilo Personalizado"}
            onChange={(value: string) => onPropertyChange?.('motivationText', value)}
            editable={!disabled}
            variant="highlight"
            className="text-lg font-medium text-center"
          />
        </motion.div>
      </CardContent>
    </Card>
  );
};

// 6. Bonus section (bônus) - ELEGANTE
const BonusBoxFlexInline: React.FC<BaseInlineProps> = ({
  block,
  onPropertyChange,
  disabled,
  className
}) => {
  const { properties = {} } = block;
  const bonusList = properties.bonusList || [
    "Guia de Peças Essenciais para seu Estilo Natural - R$ 79,00",
    "Visagismo Facial Personalizado - R$ 29,00",
    "Checklist de Compras por Estilo"
  ];
  
  return (
    <Card className={cn("border-0 shadow-lg", className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Gift className="w-6 h-6" style={{ color: BRAND_COLORS.accent }} />
          <h3 className="text-xl font-serif" style={{ color: BRAND_COLORS.text.primary }}>
            Bônus Exclusivos
          </h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {bonusList.map((bonus: string, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
          >
            <BoxFlexInlineComponent
              icon={<div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_COLORS.accent }} />}
              value={bonus}
              onChange={(val: string) => {
                const newBonus = [...bonusList];
                newBonus[idx] = val;
                onPropertyChange?.('bonusList', newBonus);
              }}
              editable={!disabled}
              variant="minimal"
            />
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

// 7. Testimonials section (depoimentos) - ELEGANTE
const TestimonialsBoxFlexInline: React.FC<BaseInlineProps> = ({
  block,
  onPropertyChange,
  disabled,
  className
}) => {
  const { properties = {} } = block;
  const testimonials = properties.testimonials || [
    "Finalmente entendi meu estilo! O quiz foi preciso e o guia é incrível. Recomendo!",
    "Mudou completamente minha forma de me vestir. Agora sei o que funciona para mim!"
  ];
  
  return (
    <div className={cn("grid gap-4", className)}>
      {testimonials.map((testimonial: string, idx: number) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
        >
          <Card className="border-0 shadow-md" style={{ backgroundColor: `${BRAND_COLORS.primary}05` }}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div 
                  className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: BRAND_COLORS.accent }}
                />
                <BoxFlexInlineComponent
                  value={testimonial}
                  onChange={(val: string) => {
                    const newTestimonials = [...testimonials];
                    newTestimonials[idx] = val;
                    onPropertyChange?.('testimonials', newTestimonials);
                  }}
                  editable={!disabled}
                  variant="minimal"
                  className="italic"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

// 8. CTA section with green styling (call-to-action)
const CTAGreenBoxFlexInline: React.FC<BaseInlineProps> = ({
  block,
  onPropertyChange,
  disabled,
  className
}) => {
  const { properties = {} } = block;
  
  return (
    <BoxFlexInlineComponent
      label="🛒 CTA Principal"
      value={properties.ctaText || "Garantir Meu Guia + Bônus Especiais"}
      onChange={(value: string) => onPropertyChange?.('ctaText', value)}
      icon={<span>�</span>}
      editable={!disabled}
      className={cn(
        "min-w-[240px] text-white font-bold",
        className
      )}
      style={{ 
        background: "linear-gradient(to right, #22c55e, #16a34a)", 
        color: "#fff" 
      }}
    >
      <button 
        className="ml-4 px-3 py-1 bg-green-700 rounded text-white font-bold text-sm hover:bg-green-800 transition-colors"
        onClick={() => !disabled && window.open("https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912", "_blank")}
        disabled={disabled}
      >
        Comprar R$ 39,00
      </button>
    </BoxFlexInlineComponent>
  );
};

// 9. Guarantee section (garantia)
const GuaranteeBoxFlexInline: React.FC<BaseInlineProps> = ({
  block,
  onPropertyChange,
  disabled,
  className
}) => {
  const { properties = {} } = block;
  
  return (
    <BoxFlexInlineComponent
      label="🛡️ Garantia"
      value={properties.guaranteeText || "7 dias de garantia total. Se não ficar satisfeita, devolvemos 100% do seu dinheiro"}
      onChange={(value: string) => onPropertyChange?.('guaranteeText', value)}
      icon={<span className="text-blue-600">�</span>}
      editable={!disabled}
      className={cn("min-w-[240px] bg-blue-50 border-blue-200", className)}
    />
  );
};

// 10. Mentor section (mentora)
const MentorBoxFlexInline: React.FC<BaseInlineProps> = ({
  block,
  onPropertyChange,
  disabled,
  className
}) => {
  const { properties = {} } = block;
  
  return (
    <div className={cn("flex items-center gap-4 mb-4 p-4 bg-purple-50 rounded-lg border border-purple-200", className)}>
      <img 
        src={properties.mentorImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.webp"} 
        alt="Gisele Galvão" 
        className="h-16 w-16 rounded-full object-cover border-2 border-purple-300" 
      />
      <BoxFlexInlineComponent
        label="👩‍🏫 Mentora"
        value={properties.mentorText || "Gisele Galvão - Especialista em Imagem e Estilo Pessoal"}
        onChange={(value: string) => onPropertyChange?.('mentorText', value)}
        icon={<span className="text-purple-600">�</span>}
        editable={!disabled}
        className="flex-1 bg-white rounded-lg"
      />
    </div>
  );
};

// 11. Value stack section (pilha de valor)
const ValueStackBoxFlexInline: React.FC<BaseInlineProps> = ({
  block,
  onPropertyChange,
  disabled,
  className
}) => {
  const { properties = {} } = block;
  const stackList = properties.stackList || [
    "Guia principal - R$ 67,00",
    "Bônus Peças-chave - R$ 79,00", 
    "Bônus Visagismo - R$ 29,00"
  ];
  
  const handleEditItem = (index: number, value: string) => {
    const newStack = [...stackList];
    newStack[index] = value;
    onPropertyChange?.('stackList', newStack);
  };
  
  return (
    <div className={cn("flex flex-wrap gap-4 items-center mb-4 p-4 bg-green-50 rounded-lg border border-green-200", className)}>
      <h4 className="text-lg font-semibold text-green-800 w-full mb-2">💰 Valor Total do Pacote</h4>
      <div className="flex flex-wrap gap-4 w-full">
        {stackList.map((item: string, idx: number) => (
          <BoxFlexInlineComponent
            key={idx}
            label={`Item ${idx + 1}`}
            value={item}
            onChange={(val: string) => handleEditItem(idx, val)}
            icon={<span className="text-green-600">✅</span>}
            editable={!disabled}
            className="min-w-[180px] bg-white"
          />
        ))}
        <div className="flex gap-4 w-full mt-2">
          <BoxFlexInlineComponent
            label="🔒 Total"
            value={properties.totalValue || "R$ 175,00"}
            onChange={(value: string) => onPropertyChange?.('totalValue', value)}
            icon={<span className="text-red-600">�</span>}
            editable={!disabled}
            className="min-w-[110px] bg-red-50 border-red-200 line-through"
          />
          <BoxFlexInlineComponent
            label="💚 Sua Oferta"
            value={properties.offerValue || "R$ 39,00"}
            onChange={(value: string) => onPropertyChange?.('offerValue', value)}
            icon={<span className="text-green-600">🎯</span>}
            editable={!disabled}
            className="min-w-[110px] bg-green-100 border-green-300 font-bold text-green-800"
          />
        </div>
      </div>
    </div>
  );
};

// 12. Build info section (informações do build)
const BuildInfoBoxFlexInline: React.FC<BaseInlineProps> = ({
  block,
  onPropertyChange,
  disabled,
  className
}) => {
  const { properties = {} } = block;
  
  return (
    <div className={cn("text-xs text-gray-500 mt-6 flex justify-end", className)}>
      <BoxFlexInlineComponent
        label="Build"
        value={properties.buildInfo || "v1.0.0 - 2025-01-15"}
        onChange={(value: string) => onPropertyChange?.('buildInfo', value)}
        editable={!disabled}
        className="min-w-[160px] text-xs"
      />
    </div>
  );
};

// Export all components in the correct order
export {
  BoxFlexInlineComponent as default,
  HeaderBoxFlexInline,
  ResultMainBoxFlexInline,
  SecondaryStylesBoxFlexInline,
  BeforeAfterBoxFlexInline,
  MotivationBoxFlexInline,
  BonusBoxFlexInline,
  TestimonialsBoxFlexInline,
  CTAGreenBoxFlexInline,
  GuaranteeBoxFlexInline,
  MentorBoxFlexInline,
  ValueStackBoxFlexInline,
  BuildInfoBoxFlexInline
};
