'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useQuizConfig } from '@/hooks/useQuizConfig';

// Design tokens centralizados - apenas os essenciais
const colors = {
  primary: '#B89B7A',
  primaryDark: '#A1835D',
  secondary: '#432818',
  background: '#FEFEFE',
  backgroundAlt: '#F8F5F0',
  text: '#432818',
  textLight: '#6B7280',
  border: '#E5E7EB',
};

// --- Constantes e funções movidas para o escopo do módulo ---
const LOGO_BASE_URL = 'https://ik.imagekit.io/1wxfl3468';
const LOGO_IMAGE_PATH = '/Estilos%20Universais%20Quiz/LOGO%20DA%20MARCA%20GISELE.png';

const INTRO_IMAGE_BASE_URL = 'https://ik.imagekit.io/1wxfl3468';
const INTRO_IMAGE_PATH = '/Estilos%20Universais%20Quiz/GISELE-GALV%C3%83O-POSE-ACESSIBILIDADE.jpg';

// Otimizado para carregamento mais rápido - URLs pré-construídas com ImageKit
const STATIC_LOGO_IMAGE_URLS = {
  webp: `${LOGO_BASE_URL}/tr:f-webp,q-70,w-120,h-50,c-maintain_ratio${LOGO_IMAGE_PATH}`,
  png: `${LOGO_BASE_URL}/tr:f-png,q-70,w-120,h-50,c-maintain_ratio${LOGO_IMAGE_PATH}`,
};

// Imagem LCP: Otimizada para carregamento mais rápido - URLs pré-construídas com ImageKit
const STATIC_INTRO_IMAGE_URLS = {
  avif: `${INTRO_IMAGE_BASE_URL}/tr:f-avif,q-85,w-300,c-at_max${INTRO_IMAGE_PATH}`,
  webp: `${INTRO_IMAGE_BASE_URL}/tr:f-webp,q-85,w-300,c-at_max${INTRO_IMAGE_PATH}`,
  png: `${INTRO_IMAGE_BASE_URL}/tr:f-png,q-85,w-300,c-at_max${INTRO_IMAGE_PATH}`,
};

interface QuizIntroProps {
  onStart: (nome: string) => void;
}

/**
 * QuizIntro - Componente ultra-otimizado da página inicial do quiz
 * Renderização imediata sem estados de carregamento
 * Agora conectado com configurações do SimpleDragDropEditor
 */
type QuizIntroComponent = React.FC<QuizIntroProps>;
const QuizIntro: QuizIntroComponent = ({ onStart }) => {
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');
  
  // Conecta com configurações do editor
  const { getComponentText, isLoading: configLoading, quizConfig } = useQuizConfig();
  
  // Log para demonstrar a conexão funcionando
  useEffect(() => {
    if (!configLoading && quizConfig) {
      console.log('🎯 QuizIntro conectado com SimpleDragDropEditor:', {
        configPages: quizConfig.pages?.length || 0,
        introTitle: getComponentText('intro', 'title', 'Não configurado'),
        hasEditorConfig: !!quizConfig
      });
    }
  }, [configLoading, quizConfig, getComponentText]);
  
  // Função simplificada de submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar se o nome foi preenchido
    if (!nome.trim()) {
      setError('Por favor, digite seu nome para continuar');
      return;
    }
    
    // Limpar qualquer erro anterior
    setError('');
    
    // Iniciar o quiz com o nome fornecido
    onStart(nome);
    
    // Reportar Web Vitals após interação do usuário
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.performance.mark('user-interaction');
    }
  };

  // Efeito de inicialização única - executa apenas uma vez
  useEffect(() => {
    // Reportar Web Vitals
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.performance.mark('component-mounted');
    }
    
    // Reportar que o LCP foi renderizado (para analytics)
    const reportLcpRendered = () => {
      if (typeof window !== 'undefined' && window.QUIZ_PERF) {
        window.QUIZ_PERF.mark('lcp_rendered');
      }
    };
    
    // Usar requestAnimationFrame para garantir que o reporte aconteça após a renderização
    requestAnimationFrame(() => {
      requestAnimationFrame(reportLcpRendered);
    });
  }, []);

  // Renderizar diretamente o conteúdo principal sem estados de carregamento
  return (
    <main
      className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-white to-gray-50 py-8"
      data-section="intro"
    >
      {/* Skip link para acessibilidade */}
      <a 
        href="#quiz-form" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-white text-[#432818] px-4 py-2 rounded-md shadow-md"
      >
        Pular para o formulário
      </a>
      
      <header className="w-full max-w-xs sm:max-w-md md:max-w-lg px-4 space-y-8 mx-auto">
        {/* Logo centralizado - renderização imediata */}
        <div className="flex flex-col items-center space-y-2">
          <div className="relative">
            <picture>
              <source srcSet={STATIC_LOGO_IMAGE_URLS.webp} type="image/webp" />
              <img
                src={STATIC_LOGO_IMAGE_URLS.png}
                alt="Logo Gisele Galvão"
                className="h-auto mx-auto"
                width={120}
                height={50}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                style={{
                  objectFit: 'contain',
                  maxWidth: '100%',
                  aspectRatio: '120 / 50',
                }}
              />
            </picture>
            {/* Barra dourada */}
            <div
              className="h-[3px] bg-[#B89B7A] rounded-full mt-1.5"
              style={{
                width: '300px',
                maxWidth: '90%',
                margin: '0 auto',
              }}
            />
          </div>
        </div>

        {/* Título principal com configuração dinâmica do editor */}
        <h1
          className="text-2xl font-bold text-center leading-tight px-2 sm:text-3xl md:text-4xl playfair-display text-[#432818]"
          style={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 400,
          }}
        >
          {/* Usa texto do editor ou fallback para o texto padrão */}
          {!configLoading && getComponentText('intro', 'title') ? (
            getComponentText('intro', 'title')
          ) : (
            <>
              <span className="text-[#B89B7A]">Chega</span> de um guarda-roupa lotado e da sensação de que nada combina com{' '}
              <span className="text-[#B89B7A]">Você</span>.
            </>
          )}
        </h1>
      </header>

      <section className="w-full max-w-xs sm:max-w-md md:max-w-lg px-4 space-y-6 md:space-y-8 mx-auto">
        {/* Imagem principal - renderização imediata e LCP */}
        <div className="mt-2 w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto">
          <div
            className="w-full overflow-hidden rounded-lg shadow-sm"
            style={{ aspectRatio: '1.47', maxHeight: '204px' }}
          >
            <div className="relative w-full h-full bg-[#F8F5F0]">
              <picture>
                <source
                  srcSet={STATIC_INTRO_IMAGE_URLS.avif}
                  type="image/avif"
                />
                <source
                  srcSet={STATIC_INTRO_IMAGE_URLS.webp}
                  type="image/webp"
                />
                <img
                  src={STATIC_INTRO_IMAGE_URLS.png}
                  alt="Descubra seu estilo predominante e transforme seu guarda-roupa"
                  className="w-full h-full object-contain"
                  width={300}
                  height={204}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  id="lcp-image"
                />
              </picture>
            </div>
          </div>
        </div>

        {/* Texto descritivo */}
        <p className="text-sm text-center leading-relaxed px-2 sm:text-base text-gray-600">
          Em poucos minutos, descubra seu{' '}
          <span className="font-semibold text-[#B89B7A]">
            Estilo Predominante
          </span>{' '}
          — e aprenda a montar looks que realmente refletem sua{' '}
          <span className="font-semibold text-[#432818]">
            essência
          </span>, com
          praticidade e{' '}
          <span className="font-semibold text-[#432818]">
            confiança
          </span>.
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
                className="block text-xs font-semibold text-[#432818] mb-1.5"
              >
                NOME <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                  if (error) setError('');
                }}
                className={cn(
                  "w-full p-2.5 bg-[#FEFEFE] rounded-md border-2 focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-offset-2 focus-visible:ring-offset-2 focus:ring-offset-[#FEFEFE] focus-visible:ring-offset-[#FEFEFE]",
                  error 
                    ? "border-red-500 focus:ring-red-500 focus-visible:ring-red-500" 
                    : "border-[#B89B7A] focus:ring-[#A1835D] focus-visible:ring-[#A1835D]"
                )}
                autoFocus
                aria-required="true"
                autoComplete="off"
                inputMode="text"
                maxLength={32}
                aria-invalid={!!error}
                aria-describedby={error ? "name-error" : undefined}
                required
              />
              {error && (
                <p id="name-error" className="mt-1.5 text-sm text-red-500 font-medium">{error}</p>
              )}
            </div>
            
            <button
              type="submit"
              className={cn(
                'w-full py-2 px-3 text-sm font-semibold rounded-md shadow-md transition-all duration-300',
                'focus:outline-none focus:ring-2 focus:ring-[#B89B7A] focus:ring-offset-2',
                'sm:py-3 sm:px-4 sm:text-base',
                'md:py-3.5 md:text-lg',
                nome.trim() 
                  ? 'bg-[#B89B7A] text-white hover:bg-[#A1835D] active:bg-[#947645] hover:shadow-lg transform hover:scale-[1.01]' 
                  : 'bg-[#B89B7A]/50 text-white/90 cursor-not-allowed'
              )}
              aria-disabled={!nome.trim()}
            >
              <span className="flex items-center justify-center gap-2">
                {nome.trim() ? 'Quero Descobrir meu Estilo Agora!' : 'Digite seu nome para continuar'}
              </span>
            </button>

            <p className="text-xs text-center text-gray-500 pt-1">
              Seu nome é necessário para personalizar sua experiência. Ao clicar, você concorda com nossa{' '}
              <a 
                href="#" 
                className="text-[#B89B7A] hover:text-[#A1835D] underline focus:outline-none focus:ring-1 focus:ring-[#B89B7A] rounded"
              >
                política de privacidade
              </a>
            </p>
          </form>
        </div>
      </section>
      
      {/* Rodapé */}
      <footer className="w-full max-w-xs sm:max-w-md md:max-w-lg px-4 mt-auto pt-6 text-center mx-auto">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Gisele Galvão - Todos os direitos reservados
        </p>
      </footer>
    </main>
  );
};

export default QuizIntro;
