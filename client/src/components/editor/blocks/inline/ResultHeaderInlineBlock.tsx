import React, { useState, useEffect } from 'react';
import { Award, Users } from 'lucide-react';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import type { BlockComponentProps } from '@/types/blocks';

/**
 * ResultHeaderInlineBlock - Cabeçalho da página de resultado (modular)
 * Renderiza apenas o cabeçalho com logo e título
 */
const ResultHeaderInlineBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    logoUrl = 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
    logoAlt = 'Logo Gisele Galvão',
    logoHeight = '60px',
    userName = 'Querida',
    title = 'Parabéns, {userName}!',
    subtitle = 'Seu resultado personalizado está pronto',
    backgroundColor = '#FFFBF7',
    textColor = '#432818',
    showLogo = true,
    // Propriedades de grid para responsividade
    gridColumns = 1,
    spacing = 'lg'
  } = block.properties;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Classes de espaçamento
  const spacingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12'
  };

  // Classes de grid baseadas na propriedade gridColumns
  const gridClasses = {
    1: 'w-full',
    2: 'w-full md:w-1/2'
  };

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const formattedTitle = title.replace('{userName}', userName);

  return (
    <div
      className={`
        ${gridClasses[gridColumns as keyof typeof gridClasses] || gridClasses[1]}
        ${spacingClasses[spacing as keyof typeof spacingClasses] || spacingClasses.lg}
        transition-all duration-200
        ${isSelected 
          ? 'ring-1 ring-blue-500 bg-blue-50/30' 
          : 'hover:shadow-sm'
        }
        ${className}
      `}
      style={{ backgroundColor }}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      <AnimatedWrapper show={isLoaded}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          {showLogo && logoUrl && (
            <img 
              src={logoUrl} 
              alt={logoAlt}
              style={{ height: logoHeight }}
              className="mx-auto mb-6"
            />
          )}

          {/* Título */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: textColor }}>
            {formattedTitle}
          </h1>
          
          {/* Subtítulo */}
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>

          {/* Linha decorativa */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />
            <Award className="w-6 h-6 opacity-50" style={{ color: textColor }} />
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />
          </div>
        </div>
      </AnimatedWrapper>
    </div>
  );
};

export default ResultHeaderInlineBlock;
