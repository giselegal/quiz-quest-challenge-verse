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

// 1. Header section (primeiro componente)
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
        label="Resultado do Quiz"
        value={properties.title || "Seu Estilo Pessoal"}
        onChange={(value: string) => onPropertyChange?.('title', value)}
        icon={<span>✨</span>}
        editable={!disabled}
        className="min-w-[200px]"
      />
      <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700 font-medium">
        Resultado Personalizado
      </span>
    </div>
  );
};

// 2. Result main section (resultado principal)
const ResultMainBoxFlexInline: React.FC<BaseInlineProps> = ({
  block,
  onPropertyChange,
  disabled,
  className
}) => {
  const { properties = {} } = block;
  
  return (
    <div className={cn("flex flex-wrap gap-4 items-center mb-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200", className)}>
      <div className="flex flex-col items-center">
        <img 
          src={properties.styleImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/estilo-natural-feminino.webp"} 
          alt="Seu Estilo" 
          className="h-20 w-20 rounded-full object-cover shadow-lg border-2 border-white" 
        />
        <span className="text-2xl font-bold text-pink-600 mt-2">
          {properties.stylePercentage || "87"}%
        </span>
      </div>
      <div className="flex-1 min-w-[200px]">
        <BoxFlexInlineComponent
          label="Seu Estilo É"
          value={properties.styleName || "Natural Elegante"}
          onChange={(value: string) => onPropertyChange?.('styleName', value)}
          editable={!disabled}
          className="text-lg font-semibold mb-2"
        />
        <BoxFlexInlineComponent
          label="Características"
          value={properties.description || "Você valoriza conforto sem abrir mão da elegância. Prefere peças atemporais e versáteis."}
          onChange={(value: string) => onPropertyChange?.('description', value)}
          editable={!disabled}
          className="text-gray-700"
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
  const styles = properties.secondaryStyles || [
    { category: "Clássico", percentage: 8 },
    { category: "Moderno", percentage: 5 }
  ];
  
  const handleEditName = (index: number, newName: string) => {
    const newStyles = [...styles];
    newStyles[index].category = newName;
    onPropertyChange?.('secondaryStyles', newStyles);
  };
  
  const handleEditPercentage = (index: number, newPerc: string) => {
    const newStyles = [...styles];
    newStyles[index].percentage = parseInt(newPerc) || 0;
    onPropertyChange?.('secondaryStyles', newStyles);
  };
  
  return (
    <div className={cn("flex flex-wrap gap-4 mb-4 p-3 bg-gray-50 rounded-lg", className)}>
      <span className="text-sm font-medium text-gray-600 mb-2 w-full">Estilos Complementares:</span>
      {styles.map((style: any, i: number) => (
        <div key={i} className="flex gap-2 items-center bg-white p-2 rounded shadow-sm">
          <BoxFlexInlineComponent
            value={style.category}
            onChange={(newName: string) => handleEditName(i, newName)}
            editable={!disabled}
            className="min-w-[100px]"
          />
          <span className="text-sm text-gray-500">•</span>
          <BoxFlexInlineComponent
            value={`${style.percentage}%`}
            onChange={(newPerc: string) => handleEditPercentage(i, newPerc.replace('%', ''))}
            editable={!disabled}
            className="min-w-[50px]"
          />
        </div>
      ))}
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
      <div className="flex flex-col items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
        <img 
          src={properties.beforeImg || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/antes-transformacao.webp"} 
          alt="Antes da Transformação" 
          className="h-20 w-20 rounded-lg object-cover" 
        />
        <BoxFlexInlineComponent
          label="Problema"
          value={properties.before || "Roupas que não combinam com sua personalidade"}
          onChange={(value: string) => onPropertyChange?.('before', value)}
          editable={!disabled}
          className="min-w-[200px] text-center"
        />
      </div>
      
      <div className="flex flex-col items-center">
        <span className="text-3xl mb-2">🔄</span>
        <span className="text-sm font-medium text-gray-600">Transformação</span>
      </div>
      
      <div className="flex flex-col items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
        <img 
          src={properties.afterImg || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/depois-transformacao.webp"} 
          alt="Depois da Transformação" 
          className="h-20 w-20 rounded-lg object-cover" 
        />
        <BoxFlexInlineComponent
          label="Solução"
          value={properties.after || "Visual alinhado com quem você realmente é"}
          onChange={(value: string) => onPropertyChange?.('after', value)}
          editable={!disabled}
          className="min-w-[200px] text-center"
        />
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
    "Guia de Peças Essenciais para seu Estilo Natural",
    "Checklist de Compras Personalizadas",
    "Dicas de Combinações Exclusivas"
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
    "Adorei! Mudou completamente minha forma de me vestir",
    "Finalmente entendi meu estilo. Recomendo para todas!"
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
          label={`Depoimento ${idx + 1}`}
          value={testimonial}
          onChange={(val: string) => handleEditTestimonial(idx, val)}
          icon={<span>⭐</span>}
          editable={!disabled}
          className="min-w-[220px]"
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
      label="CTA"
      value={properties.ctaText || "Quero meu guia agora!"}
      onChange={(value: string) => onPropertyChange?.('ctaText', value)}
      icon={<span>🛒</span>}
      editable={!disabled}
      className={cn(
        "min-w-[240px]",
        className
      )}
      style={{ 
        background: "linear-gradient(to right, #4CAF50, #45a049)", 
        color: "#fff" 
      }}
    >
      <button 
        className="ml-4 px-3 py-1 bg-green-700 rounded text-white font-bold text-sm hover:bg-green-800 transition-colors"
        onClick={() => !disabled && alert("CTA clicado!")}
        disabled={disabled}
      >
        Comprar
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
      label="Garantia"
      value={properties.guaranteeText || "7 dias de garantia incondicional"}
      onChange={(value: string) => onPropertyChange?.('guaranteeText', value)}
      icon={<span>🛡️</span>}
      editable={!disabled}
      className={cn("min-w-[240px]", className)}
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
    <BoxFlexInlineComponent
      label="Mentora"
      value={properties.mentorText || "Gisele Galvão - Especialista em Imagem"}
      onChange={(value: string) => onPropertyChange?.('mentorText', value)}
      icon={<span>👩‍🏫</span>}
      editable={!disabled}
      className={cn("min-w-[260px]", className)}
    />
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
    "Guia principal - R$67",
    "Peças-chave - R$79", 
    "Visagismo facial - R$29"
  ];
  
  const handleEditItem = (index: number, value: string) => {
    const newStack = [...stackList];
    newStack[index] = value;
    onPropertyChange?.('stackList', newStack);
  };
  
  return (
    <div className={cn("flex flex-wrap gap-4 items-center mb-4", className)}>
      {stackList.map((item: string, idx: number) => (
        <BoxFlexInlineComponent
          key={idx}
          label={`Item ${idx + 1}`}
          value={item}
          onChange={(val: string) => handleEditItem(idx, val)}
          icon={<span>✅</span>}
          editable={!disabled}
          className="min-w-[180px]"
        />
      ))}
      <BoxFlexInlineComponent
        label="Total"
        value={properties.totalValue || "R$175,00"}
        onChange={(value: string) => onPropertyChange?.('totalValue', value)}
        icon={<span>🔒</span>}
        editable={!disabled}
        className="min-w-[110px]"
      />
      <BoxFlexInlineComponent
        label="Oferta"
        value={properties.offerValue || "R$39,00"}
        onChange={(value: string) => onPropertyChange?.('offerValue', value)}
        icon={<span>💚</span>}
        editable={!disabled}
        className="min-w-[110px]"
      />
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
