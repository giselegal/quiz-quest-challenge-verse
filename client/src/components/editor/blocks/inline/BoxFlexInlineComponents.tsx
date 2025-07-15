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

// ===== ETAPA 20 COMPONENTS =====

interface BaseInlineProps {
  block: BlockData;
  isSelected?: boolean;
  onClick?: () => void;
  onPropertyChange?: (key: string, value: any) => void;
  disabled?: boolean;
  className?: string;
}

// Header section
export const HeaderBoxFlexInline: React.FC<BaseInlineProps> = ({
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
        alt="Logo" 
        className="h-10 flex-shrink-0" 
      />
      <BoxFlexInlineComponent
        label="Funil"
        value={properties.funnelName || "Quiz Gisele"}
        onChange={(value: string) => onPropertyChange?.('funnelName', value)}
        icon={<span>📄</span>}
        editable={!disabled}
        className="min-w-[160px]"
      />
      <span className={cn(
        "px-3 py-1 rounded-full text-xs",
        properties.isPublished 
          ? "bg-green-100 text-green-700" 
          : "bg-gray-100 text-gray-700"
      )}>
        {properties.isPublished ? "Publicado" : "Rascunho"}
      </span>
    </div>
  );
};

// Result main section
export const ResultMainBoxFlexInline: React.FC<BaseInlineProps> = ({
  block,
  onPropertyChange,
  disabled,
  className
}) => {
  const { properties = {} } = block;
  
  return (
    <div className={cn("flex flex-wrap gap-4 items-center mb-4", className)}>
      <BoxFlexInlineComponent
        label="Estilo"
        value={properties.styleName || "Natural"}
        onChange={(value: string) => onPropertyChange?.('styleName', value)}
        editable={!disabled}
        className="min-w-[120px]"
      />
      <BoxFlexInlineComponent
        label="%"
        value={properties.stylePercentage || "85"}
        onChange={(value: string) => onPropertyChange?.('stylePercentage', value)}
        editable={!disabled}
        className="min-w-[80px]"
      />
      <BoxFlexInlineComponent
        label="Descrição"
        value={properties.description || "Você é autêntica e natural"}
        onChange={(value: string) => onPropertyChange?.('description', value)}
        editable={!disabled}
        className="min-w-[220px] flex-1"
      />
      <div className="flex-shrink-0">
        <img 
          src={properties.image || "https://dummyimage.com/120x120/aaa/fff.png&text=Estilo"} 
          alt="Estilo" 
          className="h-14 rounded-lg shadow" 
        />
      </div>
    </div>
  );
};

// Secondary styles
export const SecondaryStylesBoxFlexInline: React.FC<BaseInlineProps> = ({
  block,
  onPropertyChange,
  disabled,
  className
}) => {
  const { properties = {} } = block;
  const styles = properties.secondaryStyles || [
    { category: "Moderno", percentage: 10 },
    { category: "Romântico", percentage: 5 }
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
    <div className={cn("flex flex-wrap gap-4 mb-4", className)}>
      {styles.map((style: any, i: number) => (
        <div key={i} className="flex gap-2">
          <BoxFlexInlineComponent
            label="Sec."
            value={style.category}
            onChange={(newName: string) => handleEditName(i, newName)}
            editable={!disabled}
            className="min-w-[100px]"
          />
          <BoxFlexInlineComponent
            label="%"
            value={style.percentage.toString()}
            onChange={(newPerc: string) => handleEditPercentage(i, newPerc)}
            editable={!disabled}
            className="min-w-[60px]"
          />
        </div>
      ))}
    </div>
  );
};

// Before/After section
export const BeforeAfterBoxFlexInline: React.FC<BaseInlineProps> = ({
  block,
  onPropertyChange,
  disabled,
  className
}) => {
  const { properties = {} } = block;
  
  return (
    <div className={cn("flex flex-wrap gap-4 items-center mb-4 bg-gray-50 p-4 rounded-lg", className)}>
      <div className="flex flex-col items-center gap-2">
        <img 
          src={properties.beforeImg || "https://dummyimage.com/80x80/eee/333.png&text=Antes"} 
          alt="Antes" 
          className="h-16 rounded-lg" 
        />
        <BoxFlexInlineComponent
          label="Antes"
          value={properties.before || "Antes: insegurança"}
          onChange={(value: string) => onPropertyChange?.('before', value)}
          editable={!disabled}
          className="min-w-[120px]"
        />
      </div>
      <span className="mx-2 text-2xl">⬇️</span>
      <div className="flex flex-col items-center gap-2">
        <img 
          src={properties.afterImg || "https://dummyimage.com/80x80/eee/333.png&text=Depois"} 
          alt="Depois" 
          className="h-16 rounded-lg" 
        />
        <BoxFlexInlineComponent
          label="Depois"
          value={properties.after || "Depois: confiança"}
          onChange={(value: string) => onPropertyChange?.('after', value)}
          editable={!disabled}
          className="min-w-[120px]"
        />
      </div>
    </div>
  );
};

// CTA section with green styling
export const CTAGreenBoxFlexInline: React.FC<BaseInlineProps> = ({
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

// Value stack section
export const ValueStackBoxFlexInline: React.FC<BaseInlineProps> = ({
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

// Export all components
export {
  BoxFlexInlineComponent as default
};
