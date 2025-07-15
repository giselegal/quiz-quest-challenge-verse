import React, { useState } from "react";
import { cn } from "@/lib/utils";
import type { BlockData } from "@/types/blocks";

// ===== BASE COMPONENT =====
interface BoxFlexInlineProps {
  label?: string;
  value: string;
  onChange?: (value: string) => void;
  icon?: React.ReactNode;
  editable?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

// UI Component base para todos os componentes BoxFlex
export const BoxFlexInlineComponent: React.FC<BoxFlexInlineProps> = ({
  label,
  value,
  onChange,
  icon,
  editable = true,
  children,
  className,
  ...props
}) => {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  
  const handleBlur = () => {
    setEditing(false);
    if (editValue !== value) onChange?.(editValue);
  };
  
  return (
    <div
      className={cn(
        "flex items-center gap-4 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200",
        "min-h-[56px] transition-all duration-200 hover:shadow-md",
        className
      )}
      {...props}
    >
      {icon && <div className="mr-2 flex-shrink-0">{icon}</div>}
      {label && <span className="text-gray-700 font-medium flex-shrink-0">{label}</span>}
      {editable ? (
        editing ? (
          <input
            type="text"
            className="flex-1 px-2 py-1 rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
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
          />
        ) : (
          <span
            className="flex-1 cursor-pointer text-blue-700 hover:underline truncate"
            onClick={() => setEditing(true)}
            title={value}
          >
            {value}
          </span>
        )
      ) : (
        <span className="flex-1 truncate">{value}</span>
      )}
      {children}
    </div>
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

// 1. Header section - DADOS REAIS da ResultPage
const HeaderBoxFlexInline: React.FC<BaseInlineProps> = ({
  block,
  onPropertyChange,
  disabled,
  className
}) => {
  const { properties = {} } = block;
  
  return (
    <div className={cn("flex gap-4 items-center mb-4 flex-wrap", className)}>
      <img 
        src={properties.logo || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"} 
        alt="Logo Gisele Galvão" 
        className="h-10 flex-shrink-0" 
      />
      <BoxFlexInlineComponent
        label="🏆 Resultado"
        value={properties.title || "Seu Estilo Predominante Foi Descoberto!"}
        onChange={(value: string) => onPropertyChange?.('title', value)}
        editable={!disabled}
        className="min-w-[300px] bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
      />
      <BoxFlexInlineComponent
        label="Percentual:"
        value={properties.percentage || "85%"}
        onChange={(value: string) => onPropertyChange?.('percentage', value)}
        editable={!disabled}
        className="min-w-[80px] bg-pink-50 border-pink-200"
      />
    </div>
  );
};

// 2. Result main section - DADOS REAIS da categoria do estilo
const ResultMainBoxFlexInline: React.FC<BaseInlineProps> = ({
  block,
  onPropertyChange,
  disabled,
  className
}) => {
  const { properties = {} } = block;
  const percentage = properties.percentage || 85;
  
  return (
    <div className={cn("flex flex-wrap gap-4 items-center mb-4 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200", className)}>
      <div className="flex flex-col items-center">
        <img 
          src={properties.styleImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp"} 
          alt="Seu Estilo Natural" 
          className="h-24 w-24 rounded-full object-cover shadow-lg border-4 border-white" 
        />
        <div className="text-3xl font-bold text-pink-600 mt-2 bg-white px-3 py-1 rounded-full shadow">
          {percentage}%
        </div>
      </div>
      <div className="flex-1 min-w-[250px]">
        <BoxFlexInlineComponent
          label="📱 Estilo:"
          value={properties.styleName || "Natural"}
          onChange={(value: string) => onPropertyChange?.('styleName', value)}
          editable={!disabled}
          className="mb-3 bg-white/70 rounded-lg text-2xl font-bold text-purple-800"
        />
        <BoxFlexInlineComponent
          label="📝 Descrição:"
          value={properties.description || "Você valoriza o conforto e a praticidade, com um visual descontraído e autêntico."}
          onChange={(value: string) => onPropertyChange?.('description', value)}
          editable={!disabled}
          className="text-gray-700 leading-relaxed bg-white/50 rounded-lg"
        />
      </div>
    </div>
  );
};
// 3. Secondary styles (estilos secundários)
const SecondaryStylesBoxFlexInline: React.FC<BaseInlineProps> = ({
  block,
  onPropertyChange,
  disabled,
  className
}) => {
  const { properties = {} } = block;
  const secondaryStyles = properties.secondaryStyles || [
    { name: 'Clássico', percentage: 12, color: '#8B4513' },
    { name: 'Contemporâneo', percentage: 3, color: '#4A90E2' }
  ];
  
  return (
    <div className={cn("flex flex-wrap gap-4 mb-4 p-4 bg-gray-50 rounded-lg", className)}>
      <h4 className="text-lg font-semibold text-gray-800 w-full mb-2">📊 Estilos Complementares</h4>
      <div className="flex gap-4 w-full">
        {secondaryStyles.map((style: any, i: number) => (
          <div key={i} className="flex flex-col items-center bg-white p-3 rounded-lg shadow-sm border" style={{ borderTopColor: style.color }}>
            <div className="text-sm font-medium text-gray-800">{style.name}</div>
            <div className="text-2xl font-bold mt-1" style={{ color: style.color }}>
              {style.percentage}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. Before/After section (transformação)
const BeforeAfterBoxFlexInline: React.FC<BaseInlineProps> = ({
  block,
  onPropertyChange,
  disabled,
  className
}) => {
  const { properties = {} } = block;
  
  return (
    <div className={cn("flex flex-wrap gap-6 items-center mb-6 bg-gradient-to-r from-red-50 via-orange-50 to-green-50 p-6 rounded-xl border", className)}>
      <div className="flex flex-col items-center gap-3 bg-white p-4 rounded-lg shadow-sm flex-1 min-w-[200px]">
        <img 
          src={properties.beforeImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334756/ChatGPT_Image_4_de_mai._de_2025_01_42_42_jlugsc.webp"} 
          alt="Antes da Transformação" 
          className="h-24 w-24 rounded-full object-cover border-4 border-red-200"
        />
        <h4 className="font-bold text-red-600">
          {properties.beforeTitle || "Antes do Quiz"}
        </h4>
        <p className="text-sm text-gray-600 text-center">
          {properties.beforeText || "Dúvidas sobre qual estilo combina comigo"}
        </p>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
          🔄 TRANSFORMAÇÃO
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-3 bg-white p-4 rounded-lg shadow-sm flex-1 min-w-[200px]">
        <img 
          src={properties.afterImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334754/ChatGPT_Image_4_de_mai._de_2025_00_30_44_naqom0.webp"} 
          alt="Depois da Transformação" 
          className="h-24 w-24 rounded-full object-cover border-4 border-green-200"
        />
        <h4 className="font-bold text-green-600">
          {properties.afterTitle || "Agora Você Sabe"}
        </h4>
        <p className="text-sm text-gray-600 text-center">
          {properties.afterText || "Clareza total sobre seu estilo único"}
        </p>
      </div>
    </div>
  );
};

// 5. Motivation section (motivação)
const MotivationBoxFlexInline: React.FC<BaseInlineProps> = ({
  block,
  onPropertyChange,
  disabled,
  className
}) => {
  const { properties = {} } = block;
  
  return (
    <div className={cn("mb-6 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border border-purple-200", className)}>
      <BoxFlexInlineComponent
        label="💎 Agora é hora de..."
        value={properties.motivationText || "Vista-se de você — na prática, com o seu Guia de Estilo Personalizado"}
        onChange={(value: string) => onPropertyChange?.('motivationText', value)}
        icon={<span className="text-2xl">✨</span>}
        editable={!disabled}
        className="text-lg font-medium text-purple-800 bg-white/70 rounded-lg"
      />
    </div>
  );
};

// 6. Bonus section (bônus)
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
  
  const handleEditBonus = (index: number, value: string) => {
    const newBonus = [...bonusList];
    newBonus[index] = value;
    onPropertyChange?.('bonusList', newBonus);
  };
  
  return (
    <div className={cn("mb-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200", className)}>
      <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center gap-2">
        🎁 Bônus Exclusivos Inclusos
      </h3>
      <div className="grid gap-3">
        {bonusList.map((bonus: string, idx: number) => (
          <BoxFlexInlineComponent
            key={idx}
            label={`Bônus ${idx + 1}:`}
            value={bonus}
            onChange={(val: string) => handleEditBonus(idx, val)}
            icon={<span className="text-green-600">✅</span>}
            editable={!disabled}
            className="bg-white rounded-lg shadow-sm"
          />
        ))}
      </div>
    </div>
  );
};

// 7. Testimonials section (depoimentos)
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
  
  const handleEditTestimonial = (index: number, value: string) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index] = value;
    onPropertyChange?.('testimonials', newTestimonials);
  };
  
  return (
    <div className={cn("flex flex-wrap gap-4 mb-4", className)}>
      {testimonials.map((testimonial: string, idx: number) => (
        <BoxFlexInlineComponent
          key={idx}
          label={`⭐ Depoimento ${idx + 1}`}
          value={testimonial}
          onChange={(val: string) => handleEditTestimonial(idx, val)}
          icon={<span>💬</span>}
          editable={!disabled}
          className="min-w-[220px] bg-blue-50 border-blue-200"
        />
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
