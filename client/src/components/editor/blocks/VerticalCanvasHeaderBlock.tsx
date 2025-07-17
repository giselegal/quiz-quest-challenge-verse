import React from 'react';
import { ArrowLeft } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';

// Propriedades específicas do header vertical
interface HeaderProperties {
  logoSrc?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
  progressValue?: number;
  progressMax?: number;
  showProgressBar?: boolean;
  showBackButton?: boolean;
}

// Componente wrapper para integração com o sistema de blocos
interface VerticalCanvasHeaderBlockProps {
  block: {
    id: string;
    type: string;
    properties: HeaderProperties;
  };
  isSelected?: boolean;
  onClick?: () => void;
  onPropertyChange?: (key: string, value: any) => void;
}

const VerticalCanvasHeaderBlock: React.FC<VerticalCanvasHeaderBlockProps> = ({
  block,
  isSelected = false,
  onClick,
  onPropertyChange
}) => {
  // Extrair propriedades do bloco com valores padrão
  const {
    logoSrc = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.png",
    logoAlt = "Logo",
    logoWidth = 96,
    logoHeight = 96,
    progressValue = 7.14,
    progressMax = 100,
    showProgressBar = true,
    showBackButton = true
  } = block.properties;

  const progressPercentage = (progressValue / progressMax) * 100;
  const translateX = 100 - progressPercentage;

  return (
    <div 
      className={`grid gap-4 opacity-100 transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
      onClick={onClick}
      data-component="VerticalCanvasHeader"
    >
      <div className="flex flex-row w-full h-auto justify-center relative">
        {/* Botão de Voltar */}
        {showBackButton && (
          <button 
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary hover:text-foreground h-10 w-10 absolute left-0 z-10"
            onClick={(e) => {
              e.stopPropagation();
              // Callback para voltar
            }}
            type="button"
            aria-label="Voltar"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        )}

        {/* Container Principal */}
        <div className="flex flex-col w-full justify-start items-center gap-4">
          {/* Logo */}
          <img
            width={logoWidth}
            height={logoHeight}
            className="max-w-24 object-cover rounded-lg shadow-sm"
            alt={logoAlt}
            src={logoSrc}
            loading="lazy"
          />

          {/* Barra de Progresso */}
          {showProgressBar && (
            <div
              aria-valuemax={progressMax}
              aria-valuemin={0}
              aria-valuenow={progressValue}
              role="progressbar"
              className="relative w-full overflow-hidden rounded-full bg-zinc-300 h-2 max-w-md"
            >
              <div
                className="progress h-full flex-1 bg-primary transition-all duration-500 ease-out rounded-full"
                style={{
                  width: `${progressPercentage}%`,
                  transform: `translateX(-${translateX}%)`
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerticalCanvasHeaderBlock;
