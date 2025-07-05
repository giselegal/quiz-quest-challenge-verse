import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useQuizTracking } from '@/hooks/useQuizTracking';

/**
 * QuizIntroBlock - Componente de introdução do quiz 100% fiel ao original
 * 
 * Props editáveis via editor visual:
 * - title: string - Título principal (suporte a HTML/JSX)
 * - subtitle: string - Texto descritivo 
 * - logoUrl: string - URL do logo
 * - logoAlt: string - Alt text do logo
 * - introImageUrl: string - URL da imagem principal
 * - introImageAlt: string - Alt text da imagem
 * - namePlaceholder: string - Placeholder do input
 * - buttonTextEmpty: string - Texto do botão quando vazio
 * - buttonTextFilled: string - Texto do botão quando preenchido
 * - privacyText: string - Texto da política de privacidade
 * - footerText: string - Texto do rodapé
 * - colors: object - Paleta de cores customizável
 * - onStart: function - Callback ao iniciar quiz
 * 
 * @example
 * <QuizIntroBlock
 *   blockId="quiz-intro-main"
 *   title="<span className='text-[#B89B7A]'>Chega</span> de um guarda-roupa lotado..."
 *   subtitle="Em poucos minutos, descubra seu Estilo Predominante..."
 *   logoUrl="https://example.com/logo.png"
 *   onStart={(nome) => console.log('Iniciando quiz para:', nome)}
 * />
 */

export interface QuizIntroBlockProps {
  // Identificação
  blockId: string;
  className?: string;
  style?: React.CSSProperties;

  // Conteúdo editável - Textos
  title?: string;
  subtitle?: string;
  namePlaceholder?: string;
  buttonTextEmpty?: string;
  buttonTextFilled?: string;
  privacyText?: string;
  footerText?: string;

  // Conteúdo editável - Imagens
  logoUrl?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
  introImageUrl?: string;
  introImageAlt?: string;
  
  // Configurações visuais
  colors?: {
    primary?: string;
    primaryDark?: string;
    secondary?: string;
    background?: string;
    backgroundAlt?: string;
    text?: string;
    textLight?: string;
    border?: string;
  };
  
  // Funcionalidade
  onStart?: (nome: string) => void;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  
  // Layout e responsividade
  maxWidth?: string;
  backgroundGradient?: string;
}

const QuizIntroBlock: React.FC<QuizIntroBlockProps> = ({
  blockId = 'quiz-intro-block',
  className = '',
  style = {},
  
  // Textos padrão idênticos ao original
  title = '<span class="text-[#B89B7A]">Chega</span> de um guarda-roupa lotado e da sensação de que nada combina com <span class="text-[#B89B7A]">Você</span>.',
  subtitle = 'Em poucos minutos, descubra seu <span class="font-semibold text-[#B89B7A]">Estilo Predominante</span> — e aprenda a montar looks que realmente refletem sua <span class="font-semibold text-[#432818]">essência</span>, com praticidade e <span class="font-semibold text-[#432818]">confiança</span>.',
  namePlaceholder = 'Digite seu nome',
  buttonTextEmpty = 'Digite seu nome para continuar',
  buttonTextFilled = 'Quero Descobrir meu Estilo Agora!',
  privacyText = 'Seu nome é necessário para personalizar sua experiência. Ao clicar, você concorda com nossa política de privacidade',
  footerText = `© ${new Date().getFullYear()} Gisele Galvão - Todos os direitos reservados`,

  // Imagens padrão idênticas ao original
  logoUrl = 'https://res.cloudinary.com/dqljyf76t/image/upload/f_webp,q_70,w_120,h_50,c_fit/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
  logoAlt = 'Logo Gisele Galvão',
  logoWidth = 120,
  logoHeight = 50,
  introImageUrl = 'https://res.cloudinary.com/dqljyf76t/image/upload/f_webp,q_85,w_300,c_limit/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.webp',
  introImageAlt = 'Descubra seu estilo predominante e transforme seu guarda-roupa',
  
  // Cores padrão idênticas ao original
  colors = {
    primary: '#B89B7A',
    primaryDark: '#A1835D',
    secondary: '#432818',
    background: '#FEFEFE',
    backgroundAlt: '#F8F5F0',
    text: '#432818',
    textLight: '#6B7280',
    border: '#E5E7EB',
  },
  
  // Funcionalidade
  onStart,
  disabled = false,
  required = true,
  maxLength = 32,
  
  // Layout
  maxWidth = 'max-w-xs sm:max-w-md md:max-w-lg',
  backgroundGradient = 'bg-gradient-to-b from-white to-gray-50',
}) => {
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');
  const { trackUIInteraction, trackCTAClick } = useQuizTracking();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (required && !nome.trim()) {
      setError('Por favor, digite seu nome para continuar');
      // Track erro de validação
      trackUIInteraction('form_validation', 'name_input', 'validation_error', {
        error: 'empty_name'
      });
      return;
    }
    
    setError('');
    
    // Track início do quiz
    trackCTAClick('quiz_start', `Iniciar Quiz - ${nome.trim()}`);
    
    if (onStart) {
      onStart(nome.trim());
    }
    
    // Web Vitals reporting
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.performance.mark('user-interaction');
    }
  };

  // Handler para mudanças no input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNome(value);
    setError('');
    
    // Track interação com o input
    if (value.length > 0 && nome.length === 0) {
      trackUIInteraction('form_field', 'name_input', 'first_input', {
        field: 'name'
      });
    }
  };

  // Handler para clique na imagem
  const handleImageClick = () => {
    trackUIInteraction('intro_image', 'intro_image_click', 'image_clicked');
  };

  // Handler para clique no logo
  const handleLogoClick = () => {
    trackUIInteraction('logo', 'logo_click', 'logo_clicked');
  };

  // Efeito de inicialização para Web Vitals
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.performance.mark('component-mounted');
    }
    
    const reportLcpRendered = () => {
      if (typeof window !== 'undefined' && (window as any).QUIZ_PERF) {
        (window as any).QUIZ_PERF.mark('lcp_rendered');
      }
    };
    
    requestAnimationFrame(() => {
      requestAnimationFrame(reportLcpRendered);
    });
  }, []);

  // Função para renderizar HTML seguro (apenas para título e subtítulo)
  const renderHTML = (htmlString: string) => {
    return <span dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  return (
    <main
      className={`flex flex-col items-center justify-start min-h-screen ${backgroundGradient} py-8 ${className}`}
      data-section="intro"
      data-block-id={blockId}
      style={style}
    >
      {/* Skip link para acessibilidade */}
      <a 
        href="#quiz-form" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-white px-4 py-2 rounded-md shadow-md"
        style={{ color: colors.text }}
      >
        Pular para o formulário
      </a>
      
      <header className={`w-full ${maxWidth} px-4 space-y-8 mx-auto`}>
        {/* Logo centralizado - renderização imediata */}
        <div className="flex flex-col items-center space-y-2">
          <div className="relative">
            <img
              src={logoUrl}
              alt={logoAlt}
              className="h-auto mx-auto cursor-pointer hover:opacity-80 transition-opacity"
              width={logoWidth}
              height={logoHeight}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onClick={handleLogoClick}
              style={{
                objectFit: 'contain',
                maxWidth: '100%',
                aspectRatio: `${logoWidth} / ${logoHeight}`,
              }}
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
              }}
            />
            {/* Barra dourada */}
            <div
              className="h-[3px] rounded-full mt-1.5"
              style={{
                backgroundColor: colors.primary,
                width: '300px',
                maxWidth: '90%',
                margin: '0 auto',
              }}
            />
          </div>
        </div>

        {/* Título principal */}
        <h1
          className="text-2xl font-bold text-center leading-tight px-2 sm:text-3xl md:text-4xl playfair-display"
          style={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 400,
            color: colors.text,
          }}
        >
          {renderHTML(title)}
        </h1>
      </header>

      <section className={`w-full ${maxWidth} px-4 space-y-6 md:space-y-8 mx-auto`}>
        {/* Imagem principal - renderização imediata e LCP */}
        <div className="mt-2 w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto">
          <div
            className="w-full overflow-hidden rounded-lg shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
            style={{ aspectRatio: '1.47', maxHeight: '204px' }}
            onClick={handleImageClick}
          >
            <div 
              className="relative w-full h-full"
              style={{ backgroundColor: colors.backgroundAlt }}
            >
              <img
                src={introImageUrl}
                alt={introImageAlt}
                className="w-full h-full object-contain"
                width={300}
                height={204}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                id="lcp-image"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>

        {/* Texto descritivo */}
        <p 
          className="text-sm text-center leading-relaxed px-2 sm:text-base"
          style={{ color: colors.textLight }}
        >
          {renderHTML(subtitle)}
        </p>

        {/* Formulário - renderização imediata */}
        <div id="quiz-form" className="mt-8">
          <form
            onSubmit={handleSubmit}
            className="w-full space-y-6"
            autoComplete="off"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold mb-1.5"
                style={{ color: colors.text }}
              >
                NOME <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                placeholder={namePlaceholder}
                value={nome}
                onChange={handleInputChange}
                className={cn(
                  "w-full p-2.5 rounded-md border-2 focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-offset-2 focus-visible:ring-offset-2",
                  error 
                    ? "border-red-500 focus:ring-red-500 focus-visible:ring-red-500" 
                    : `focus:ring-[${colors.primaryDark}] focus-visible:ring-[${colors.primaryDark}]`
                )}
                style={{
                  backgroundColor: colors.background,
                  borderColor: error ? '#ef4444' : colors.primary,
                  // focusRingOffsetColor: colors.background, // Removido - não é uma propriedade CSS válida
                }}
                autoFocus
                aria-required="true"
                autoComplete="off"
                inputMode="text"
                maxLength={maxLength}
                aria-invalid={!!error}
                aria-describedby={error ? "name-error" : undefined}
                required={required}
                disabled={disabled}
              />
              {error && (
                <p id="name-error" className="mt-1.5 text-sm text-red-500 font-medium">{error}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={disabled}
              className={cn(
                'w-full py-2 px-3 text-sm font-semibold rounded-md shadow-md transition-all duration-300',
                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                'sm:py-3 sm:px-4 sm:text-base',
                'md:py-3.5 md:text-lg',
                nome.trim() && !disabled
                  ? 'text-white hover:shadow-lg transform hover:scale-[1.01]' 
                  : 'text-white/90 cursor-not-allowed'
              )}
              style={{
                backgroundColor: nome.trim() && !disabled ? colors.primary : `${colors.primary}80`,
                // focusRingColor: colors.primary, // Removido - não é uma propriedade CSS válida
                // focusRingOffsetColor: colors.background, // Removido - não é uma propriedade CSS válida
              }}
              onMouseEnter={(e) => {
                if (nome.trim() && !disabled && colors.primaryDark) {
                  e.currentTarget.style.backgroundColor = colors.primaryDark;
                }
              }}
              onMouseLeave={(e) => {
                if (nome.trim() && !disabled && colors.primary) {
                  e.currentTarget.style.backgroundColor = colors.primary;
                }
              }}
              aria-disabled={!nome.trim() || disabled}
            >
              <span className="flex items-center justify-center gap-2">
                {nome.trim() ? buttonTextFilled : buttonTextEmpty}
              </span>
            </button>

            <p className="text-xs text-center pt-1" style={{ color: colors.textLight }}>
              {renderHTML(privacyText)}
            </p>
          </form>
        </div>
      </section>
      
      {/* Rodapé */}
      <footer className={`w-full ${maxWidth} px-4 mt-auto pt-6 text-center mx-auto`}>
        <p className="text-xs" style={{ color: colors.textLight }}>
          {footerText}
        </p>
      </footer>
    </main>
  );
};

export default QuizIntroBlock;
