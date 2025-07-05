import React from 'react';
import { ArrowRight } from 'lucide-react';
import { InlineEditableText } from './InlineEditableText';
import type { BlockComponentProps } from '@/types/blocks';

/**
 * QuizStartPageBlock - Representa fielmente a etapa 1 do funil real
 * 
 * Extrai e replica todos os elementos visuais da página de início do quiz
 * com edição inline completa de todos os textos.
 */

const QuizStartPageBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  onClick,
  onPropertyChange
}) => {
  if (!block?.properties) {
    return (
      <div className="p-4 border-2 border-red-300 bg-red-50 rounded-lg">
        <p className="text-red-600 font-medium">Erro: Configuração do bloco inválida</p>
      </div>
    );
  }

  const {
    // Conteúdo principal
    logoUrl = 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
    logoAlt = 'Gisele Galvão - Logo da Marca',
    mainTitle = 'Chega de um guarda-roupa lotado e da sensação de que nada combina com você.',
    subtitle = 'Descubra seu Estilo e aprenda a montar looks que realmente refletem sua essência, com praticidade e confiança.',
    ctaText = 'Descobrir Meu Estilo',
    ctaSubtext = '5x R$ 8,83',
    heroImage = 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.jpg',
    heroImageAlt = 'Mulher descobrindo seu estilo autêntico',
    
    // Configurações visuais
    backgroundColor = '#FAF9F7',
    primaryColor = '#B89B7A',
    hoverColor = '#A68A6A',
    textDark = '#432818',
    textMedium = '#8F7A6A'
  } = block.properties;

  const handlePropertyChange = (key: string, value: string) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`
        min-h-screen transition-all duration-200
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
      `}
      style={{ backgroundColor }}
      onClick={handleClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      {/* Hero Section */}
      <section className="py-8 md:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Conteúdo do texto */}
            <div className="order-1 md:order-1 space-y-6">
              {/* Logo */}
              <div className="text-center md:text-left mb-6">
                <img
                  src={logoUrl}
                  alt={logoAlt}
                  className="h-12 md:h-16 mx-auto md:mx-0 mb-4"
                />
              </div>

              {/* Título Principal */}
              <InlineEditableText
                value={mainTitle}
                onSave={(value) => handlePropertyChange('mainTitle', value)}
                className="text-3xl md:text-4xl lg:text-5xl font-playfair leading-tight text-center md:text-left"
                style={{ color: textDark }}
                placeholder="Título principal"
                isTextArea={true}
              />

              {/* Subtítulo */}
              <InlineEditableText
                value={subtitle}
                onSave={(value) => handlePropertyChange('subtitle', value)}
                className="text-lg md:text-xl text-center md:text-left"
                style={{ color: textMedium }}
                placeholder="Subtítulo explicativo"
                isTextArea={true}
              />

              {/* CTA Button */}
              <div className="flex justify-center md:justify-start">
                <button
                  className="px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-white flex items-center gap-2 transform hover:scale-105"
                  style={{ 
                    backgroundColor: primaryColor,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = hoverColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = primaryColor;
                  }}
                >
                  <div className="flex flex-col items-center">
                    <InlineEditableText
                      value={ctaText}
                      onSave={(value) => handlePropertyChange('ctaText', value)}
                      className="hidden md:block"
                      placeholder="Texto do CTA"
                    />
                    <InlineEditableText
                      value={ctaText}
                      onSave={(value) => handlePropertyChange('ctaText', value)}
                      className="md:hidden"
                      placeholder="Texto do CTA"
                    />
                    <InlineEditableText
                      value={ctaSubtext}
                      onSave={(value) => handlePropertyChange('ctaSubtext', value)}
                      className="text-sm opacity-90 hidden md:inline"
                      placeholder="Subtexto do CTA"
                    />
                  </div>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Imagem Hero */}
            <div className="order-2 md:order-2 relative">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt={heroImageAlt}
                  className="w-full h-auto object-cover"
                />
                
                {/* Elementos decorativos */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Badge de qualidade */}
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-2 rounded-full shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">
                      Método Comprovado
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Benefícios */}
      <section className="py-12 px-4 md:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold" style={{ color: textDark }}>Quiz Personalizado</h3>
              <p className="text-sm" style={{ color: textMedium }}>Responda perguntas sobre suas preferências</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold" style={{ color: textDark }}>Análise Completa</h3>
              <p className="text-sm" style={{ color: textMedium }}>Descubra seu estilo único em minutos</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-semibold" style={{ color: textDark }}>Guia Exclusivo</h3>
              <p className="text-sm" style={{ color: textMedium }}>Receba seu guia de estilo personalizado</p>
            </div>
          </div>
        </div>
      </section>

      {/* Prova Social */}
      <section className="py-8 px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-medium mb-4" style={{ color: textMedium }}>
            Mais de 10.000 mulheres já descobriram seu estilo
          </p>
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-xl">★</span>
            ))}
            <span className="ml-2 text-sm" style={{ color: textMedium }}>
              4.9/5 (2.847 avaliações)
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuizStartPageBlock;
