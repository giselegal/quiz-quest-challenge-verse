
import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

// Hook para detectar dispositivos de baixa performance
export function useIsLowPerformanceDevice() {
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    const checkPerformance = () => {
      // Verifica se é um dispositivo móvel
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Verifica memória disponível (se suportado)
      const memory = (navigator as any).deviceMemory;
      const isLowMemory = memory && memory < 4; // Menos de 4GB
      
      // Verifica cores do processador
      const cores = navigator.hardwareConcurrency;
      const isLowCore = cores && cores < 4; // Menos de 4 cores
      
      // Considera dispositivo de baixa performance se for móvel OU tiver baixa memória/cores
      setIsLowPerformance(isMobileDevice || isLowMemory || isLowCore);
    };

    checkPerformance();
  }, []);

  return isLowPerformance;
}
