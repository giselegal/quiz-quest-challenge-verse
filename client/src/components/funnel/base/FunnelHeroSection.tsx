import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { InlineEditText } from '@/components/editor/blocks/InlineEditText';

export interface FunnelHeroSectionProps {
  // Content props
  logoUrl?: string;
  logoAlt?: string;
  title: string;
  description: string;
  ctaText: string;
  ctaSubtext?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  
  // Visual props
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  
  // Layout props
  layout?: 'side-by-side' | 'stacked' | 'hero-centered';
  imagePosition?: 'left' | 'right' | 'background';
  
  // Behavior props
  onCTAClick?: () => void;
  isEditable?: boolean;
  onPropertyChange?: (key: string, value: any) => void;
  
  // Editor props
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * FunnelHeroSection - Componente reutilizável para seções hero de funis
 * 
 * Este componente é usado tanto no editor (com edição inline) quanto
 * no funil real, garantindo fidelidade visual e funcional.
 * 
 * Features:
 * - Totalmente responsivo
 * - Suporte a edição inline (quando isEditable=true)
 * - Múltiplos layouts flexíveis
 * - Paleta de cores da marca por padrão
 * - Otimizado para conversão
 */
const FunnelHeroSection: React.FC<FunnelHeroSectionProps> = ({
  logoUrl,
  logoAlt = 'Logo da Marca',
  title,
  description,
  ctaText,
  ctaSubtext,
  heroImageUrl,
  heroImageAlt = 'Imagem Hero',
  backgroundColor = '#FAF9F7',
  textColor = '#432818',
  primaryColor = '#B89B7A',
  layout = 'side-by-side',
  imagePosition = 'right',
  onCTAClick,
  isEditable = false,
  onPropertyChange,
  isSelected = false,
  onClick,
  className = '',
}) => {
  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const renderEditableText = (value: string, key: string, className: string, placeholder: string, as?: any) => {
    if (isEditable) {
      return (
        <InlineEditText
          value={value}
          onChange={(newValue) => handlePropertyChange(key, newValue)}
          className={className}
          placeholder={placeholder}
          as={as}
        />
      );
    }
    
    if (as === 'h1') {
      return <h1 className={className}>{value}</h1>;
    }
    if (as === 'p') {
      return <p className={className}>{value}</p>;
    }
    return <div className={className}>{value}</div>;
  };

  const renderLogo = () => {
    if (!logoUrl) return null;
    
    return (
      <div className="text-center md:text-left mb-6">
        {isEditable ? (
          <div className="space-y-2">
            <img
              src={logoUrl}
              alt={logoAlt}
              className="h-12 md:h-16 mx-auto md:mx-0 mb-4"
            />
            <InlineEditText
              value={logoUrl}
              onChange={(value) => handlePropertyChange('logoUrl', value)}
              className="text-sm text-gray-500"
              placeholder="URL do logo"
            />
            <InlineEditText
              value={logoAlt}
              onChange={(value) => handlePropertyChange('logoAlt', value)}
              className="text-sm text-gray-500"
              placeholder="Alt text do logo"
            />
          </div>
        ) : (
          <img
            src={logoUrl}
            alt={logoAlt}
            className="h-12 md:h-16 mx-auto md:mx-0 mb-4"
          />
        )}
      </div>
    );
  };

  const renderContent = () => (
    <div className="order-1 md:order-1 space-y-6">
      {renderLogo()}

      {renderEditableText(
        title,
        'title',
        'text-3xl md:text-4xl lg:text-5xl font-playfair text-center md:text-left leading-tight',
        'Título principal...',
        'h1'
      )}

      {renderEditableText(
        description,
        'description',
        'text-lg md:text-xl text-center md:text-left opacity-80',
        'Descrição envolvente...',
        'p'
      )}

      <div className="flex justify-center md:justify-start">
        <Button
          onClick={onCTAClick}
          size="lg"
          className={cn(
            'px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300',
            'transform hover:scale-105'
          )}
          style={{ 
            backgroundColor: primaryColor,
            color: 'white'
          }}
        >
          {isEditable ? (
            <InlineEditText
              value={ctaText}
              onChange={(value) => handlePropertyChange('ctaText', value)}
              placeholder="Texto do botão"
            />
          ) : (
            <>
              <span className="hidden md:inline">
                {ctaSubtext || ctaText}
              </span>
              <span className="md:hidden">{ctaText}</span>
            </>
          )}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {ctaSubtext && isEditable && (
        <InlineEditText
          value={ctaSubtext}
          onChange={(value) => handlePropertyChange('ctaSubtext', value)}
          className="text-sm text-center md:text-left opacity-70"
          placeholder="Subtexto do botão (opcional)"
        />
      )}
    </div>
  );

  const renderImage = () => {
    if (!heroImageUrl) return null;

    return (
      <div className="order-2 md:order-2 relative">
        <div className="relative rounded-lg overflow-hidden shadow-2xl">
          {isEditable ? (
            <div className="space-y-2">
              <img
                src={heroImageUrl}
                alt={heroImageAlt}
                className="w-full h-auto object-cover"
              />
              <InlineEditText
                value={heroImageUrl}
                onChange={(value) => handlePropertyChange('heroImageUrl', value)}
                className="text-sm text-gray-500"
                placeholder="URL da imagem hero"
              />
              <InlineEditText
                value={heroImageAlt}
                onChange={(value) => handlePropertyChange('heroImageAlt', value)}
                className="text-sm text-gray-500"
                placeholder="Alt text da imagem"
              />
            </div>
          ) : (
            <img
              src={heroImageUrl}
              alt={heroImageAlt}
              className="w-full h-auto object-cover"
            />
          )}
        </div>
      </div>
    );
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'stacked':
        return 'flex flex-col gap-8 items-center text-center';
      case 'hero-centered':
        return 'flex flex-col gap-8 items-center text-center max-w-4xl mx-auto';
      case 'side-by-side':
      default:
        return 'grid md:grid-cols-2 gap-8 items-center';
    }
  };

  return (
    <section 
      className={cn(
        'py-8 md:py-16 px-4 md:px-8 transition-all duration-200',
        isSelected && 'ring-2 ring-blue-500 ring-offset-2',
        className
      )}
      style={{ 
        backgroundColor,
        color: textColor
      }}
      onClick={onClick}
    >
      <div className="max-w-7xl mx-auto">
        <div className={getLayoutClasses()}>
          {imagePosition === 'left' ? (
            <>
              {renderImage()}
              {renderContent()}
            </>
          ) : layout === 'stacked' || layout === 'hero-centered' ? (
            <>
              {renderContent()}
              {renderImage()}
            </>
          ) : (
            <>
              {renderContent()}
              {renderImage()}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FunnelHeroSection;
