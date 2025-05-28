import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';
import OptimizedImage from '@/components/ui/optimized-image';
import { preloadImagesByUrls } from '@/utils/imageManager';
import { useIsLowPerformanceDevice } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';

// Design tokens centralizados
const designTokens = {
  colors: {
    primary: '#B89B7A',
    secondary: '#aa6b5d',
    text: '#432818',
    textLight: '#8F7A6A',
    background: '#fffaf7',
    cardBg: '#ffffff',
    accent: '#4CAF50',
    accentHover: '#45a049',
    divider: 'rgba(184, 155, 122, 0.2)',
    highlight: '#f9f4ef',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.1)',
    md: '0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)',
    lg: '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.05)',
    highlight: '0 0 15px rgba(184, 155, 122, 0.15)',
    cta: '0 4px 14px rgba(76, 175, 80, 0.4)',
  },
  transitions: {
    default: 'all 0.3s ease',
    fast: 'all 0.15s ease',
    slow: 'all 0.5s ease',
  },
};

interface BeforeAfterTransformationProps {
  handleCTAClick?: () => void;
}

interface TransformationItem {
  image: string; 
  name: string;
  id: string; 
  width?: number;
  height?: number;
}

// Componente Badge reutilizável
const Badge: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <span 
    className={`absolute z-10 bg-[${designTokens.colors.primary}] text-white text-[0.6rem] font-semibold px-1.5 py-0.5 rounded-full shadow-sm ${className}`}
    style={{ boxShadow: designTokens.shadows.sm }}
  >
    {children}
  </span>
);

// Componente CheckItem reutilizável
const CheckItem: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <li className="flex items-start gap-2.5 text-[#aa6b5d] text-base justify-center md:justify-start group transition-all duration-300 hover:translate-x-1">
    <span className="min-w-[22px] mt-0.5 flex-shrink-0 transform transition-transform group-hover:scale-110">
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="12" fill={designTokens.colors.secondary}/>
        <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
    <span className="group-hover:text-[#432818] transition-colors">{children}</span>
  </li>
);

// Componente NavButton reutilizável
const NavButton: React.FC<{
  direction: 'prev' | 'next';
  onClick: () => void;
}> = ({ direction, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="pointer-events-auto bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-md hover:bg-[#B89B7A]/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#B89B7A] focus:ring-offset-2"
    onClick={onClick}
    aria-label={direction === 'prev' ? 'Anterior' : 'Próxima'}
  >
    {direction === 'prev' ? (
      <ChevronLeft size={22} className="text-[#432818]" />
    ) : (
      <ChevronRight size={22} className="text-[#432818]" />
    )}
  </motion.button>
);

// Dados das transformações
const transformations: TransformationItem[] = [
  {
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_80,w_800/v1745519979/Captura_de_tela_2025-03-31_034324_pmdn8y.webp",
    name: "Adriana",
    id: "transformation-adriana",
    width: 800,
    height: 1000
  }, 
  {
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_80,w_800/v1745522326/Captura_de_tela_2025-03-31_034324_cpugfj.webp",
    name: "Mariangela",
    id: "transformation-mariangela",
    width: 800,
    height: 1000
  }
];

// Hook personalizado para gerenciar o carregamento de imagens
const useImagePreloader = (images: string[], initialIndex = 0) => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    // Pré-carregar a imagem inicial
    if (images.length > 0) {
      preloadImagesByUrls([images[initialIndex]], {
        quality: 90,
      });
      
      // Marcar como carregada após um tempo
      const timer = setTimeout(() => {
        setLoadedImages(prev => ({
          ...prev,
          [images[initialIndex]]: true
        }));
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Função para pré-carregar a próxima imagem
  const preloadNextImage = (currentIndex: number) => {
    if (images.length > 1) {
      const nextIndex = (currentIndex + 1) % images.length;
      const nextImageUrl = images[nextIndex];
      
      preloadImagesByUrls([nextImageUrl], { 
        quality: 80, 
      });
      
      // Marcar como carregada após um tempo
      setTimeout(() => {
        setLoadedImages(prev => ({
          ...prev,
          [nextImageUrl]: true
        }));
      }, 500);
    }
  };
  
  return { loadedImages, setLoadedImages, preloadNextImage };
};

const BeforeAfterTransformation: React.FC<BeforeAfterTransformationProps> = ({ handleCTAClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const isLowPerformance = useIsLowPerformanceDevice();
  const imageUrls = transformations.map(t => t.image);
  const { loadedImages, preloadNextImage } = useImagePreloader(imageUrls, 0);
  
  const activeTransformation = transformations[activeIndex];
  const isImageLoaded = loadedImages[activeTransformation.image];

  // Efeito para desativar o estado de carregamento inicial após um tempo
  useEffect(() => {
    const fallbackLoadingTimer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 1500);

    return () => clearTimeout(fallbackLoadingTimer);
  }, []);

  // Efeito para pré-carregar a próxima imagem quando o índice ativo muda
  useEffect(() => {
    preloadNextImage(activeIndex);
  }, [activeIndex]);

  // Função para navegar entre transformações
  const navigateToTransformation = (index: number) => {
    setActiveIndex(index);
  };

  // O esqueleto de carregamento é mostrado enquanto isLoading é true
  if (isLoading) {
    return (
      <div className="my-8 sm:my-10 md:my-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Título com decoração */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h3 className="text-xl md:text-2xl font-playfair text-[#aa6b5d] inline-block relative">
              Descubra o poder da imagem intencional
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-[#B89B7A]/30"></span>
            </h3>
          </motion.div>
          
          {/* Card principal com skeleton */}
          <Card className="overflow-hidden border border-[#B89B7A]/20 shadow-md hover:shadow-lg transition-shadow duration: 300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6">
              {/* Coluna da imagem */}
              <div className="p-5 md:p-6 flex flex-col items-center">
                <div className="relative w-full max-w-sm mx-auto aspect-[4/5] bg-[#f8f5f0] rounded-lg animate-pulse">
                  <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-10 bg-[#B89B7A] text-white text-xs font-semibold px-4 py-1 rounded-full shadow">
                    Resultados Reais
                  </div>
                </div>
                
                {/* Indicadores de slides */}
                <div className="flex justify-center space-x-2 mt-4">
                  {transformations.map((_, idx) => (
                    <div key={idx} className={`w-2.5 h-2.5 rounded-full ${idx === 0 ? 'bg-[#B89B7A]' : 'bg-gray-300'}`} />
                  ))}
                </div>
              </div>
              
              {/* Coluna de conteúdo */}
              <div className="p-5 md:p-6 bg-white">
                <h4 className="text-lg font-medium text-[#432818] text-center md:text-left mb-4 md:hidden">
                  Transformação Visual com Propósito
                </h4>
                
                <div className="text-gray-700 text-base md:text-lg text-center md:text-left mb-4 bg-[#f8f5f0] h-20 rounded animate-pulse">
                </div>
                
                <div className="bg-[#f9f4ef]/70 rounded-lg p-4 mb-6">
                  <ul className="space-y-4 text-center md:text-left">
                    {Array(4).fill(0).map((_, idx) => (
                      <li key={idx} className="flex items-start gap-2 justify-center md:justify-start">
                        <span className="min-w-[22px] mt-1 flex-shrink-0">
                          <div className="w-5 h-5 bg-[#f8f5f0] rounded-full animate-pulse"></div>
                        </span>
                        <div className="h-5 bg-[#f8f5f0] rounded animate-pulse w-3/4"></div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-col items-center md:items-start">
                  <div className="w-full h-12 max-w-[280px] bg-[#f8f5f0] rounded animate-pulse mb-2"></div>
                  <div className="h-3 w-32 bg-[#f8f5f0] rounded animate-pulse mb-4"></div>
                
                  <div className="w-full h-10 max-w-[280px] bg-[#f8f5f0] rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Layout principal após o carregamento
  return (
    <div className="my-8 sm:my-10 md:my-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Título com decoração */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h3 className="text-xl md:text-2xl font-playfair text-[#aa6b5d] inline-block relative">
            Descubra o poder da imagem intencional
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-[#B89B7A]/30"></span>
          </h3>
        </motion.div>
        
        {/* Card principal com grid layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="overflow-hidden border border-[#B89B7A]/20 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6">
              {/* Coluna da imagem */}
              <div className="p-5 md:p-6 flex flex-col items-center">
                <div className="relative w-full max-w-sm mx-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTransformation.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="relative"
                    >
                      <OptimizedImage
                        src={activeTransformation.image}
                        alt={`Transformação de ${activeTransformation.name}`}
                        width={activeTransformation.width}
                        height={activeTransformation.height}
                        className="w-full h-auto rounded-lg shadow-md"
                        priority={true}
                      />
                      
                      {/* Nome da pessoa */}
                      <Badge className="top-3 right-3 bg-white/90 backdrop-blur-sm text-[#432818] font-medium">
                        {activeTransformation.name}
                      </Badge>
                      
                      {/* Selo 'Resultados Reais' */}
                      <Badge className="bottom-[10%] left-1/2 -translate-x-1/2">
                        Resultados Reais
                      </Badge>
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Navegação */}
                  {transformations.length > 1 && (
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 pointer-events-none">
                      <NavButton 
                        direction="prev" 
                        onClick={() => navigateToTransformation((activeIndex - 1 + transformations.length) % transformations.length)} 
                      />
                      <NavButton 
                        direction="next" 
                        onClick={() => navigateToTransformation((activeIndex + 1) % transformations.length)} 
                      />
                    </div>
                  )}
                </div>
                
                {/* Indicadores de slides */}
                {transformations.length > 1 && (
                  <div className="flex justify-center space-x-3 mt-4">
                    {transformations.map((_, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => navigateToTransformation(idx)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          idx === activeIndex 
                            ? 'bg-[#B89B7A] scale-110' 
                            : 'bg-gray-300 hover:bg-[#B89B7A]/50'
                        }`}
                        aria-label={`Ver transformação ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Coluna de conteúdo */}
              <div className="p-5 md:p-6 bg-white">
                {/* Título mobile */}
                <motion.h4 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-lg font-medium text-[#432818] md:hidden text-center mb-4"
                >
                  Transformação Visual com Propósito
                </motion.h4>
                
                {/* Título desktop */}
                <motion.h4 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-xl font-medium text-[#432818] hidden md:block text-left mb-4"
                >
                  Transformação Visual com Propósito
                </motion.h4>
                
                {/* Texto descritivo */}
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="text-gray-700 text-base md:text-lg text-center md:text-left mb-5"
                >
                  Seu estilo não é apenas sobre roupas — é sobre comunicar quem você é e onde quer chegar.
                </motion.p>
                
                {/* Lista de benefícios */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="bg-[#f9f4ef]/70 backdrop-blur-sm rounded-lg p-5 mb-6 border border-[#B89B7A]/10 hover:border-[#B89B7A]/20 transition-all duration-300 hover:shadow-sm"
                >
                  <ul className="space-y-3.5 text-center md:text-left">
                    <CheckItem>Looks com intenção e identidade</CheckItem>
                    <CheckItem>Cores, modelagens e tecidos a seu favor</CheckItem>
                    <CheckItem>Imagem alinhada aos seus objetivos</CheckItem>
                    <CheckItem>Guarda-roupa funcional, sem compras por impulso</CheckItem>
                  </ul>
                </motion.div>
                
                {/* CTA e informações */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="flex flex-col items-center md:items-start"
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      onClick={handleCTAClick ? handleCTAClick : () => {
                        trackButtonClick('checkout_button', 'Iniciar Checkout', 'transformation_section');
                        window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
                      }}
                      onMouseEnter={() => setIsButtonHovered(true)}
                      onMouseLeave={() => setIsButtonHovered(false)}
                      className="w-full md:w-auto py-4 px-6 rounded-md shadow-md transition-all duration-300 font-semibold text-base mb-2 focus:outline-none focus:ring-2 focus:ring-[#45a049] focus:ring-offset-2"
                      style={{
                        background: "linear-gradient(to right, #4CAF50, #45a049)",
                        boxShadow: designTokens.shadows.cta,
                      }}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <motion.div
                          animate={{ 
                            scale: isButtonHovered ? 1.1 : 1,
                            rotate: isButtonHovered ? 10 : 0
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </motion.div>
                        Quero Meu Guia de Estilo
                      </span>
                    </Button>
                  </motion.div>
                  
                  <p className="text-xs text-[#aa6b5d] font-medium text-center md:text-left mb-4">
                    Oferta por tempo limitado
                  </p>
                
                  {/* Métodos de pagamento */}
                  <div className="w-full max-w-[280px] mx-auto md:mx-0 transition-transform duration-300 hover:scale-[1.02]">
                    <img
                      src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp"
                      alt="Métodos de pagamento"
                      className="w-full rounded-lg shadow-sm"
                      loading="lazy"
                      width="400"
                      height="100"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BeforeAfterTransformation;
