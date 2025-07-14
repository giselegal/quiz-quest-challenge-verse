import { useEffect, useRef } from 'react';
import { useQuizTracking } from './useQuizTracking';

/**
 * Hook para tracking automático de scroll em páginas do quiz
 * Dispara eventos de tracking em marcos importantes (25%, 50%, 75%, 90%)
 */
export const useScrollTracking = (enabled: boolean = true) => {
  const { trackScrollProgress } = useQuizTracking();
  const trackedPercentages = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      // Calcular porcentagem de scroll
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

      // Marcos importantes para tracking
      const milestones = [25, 50, 75, 90];
      
      for (const milestone of milestones) {
        if (scrollPercentage >= milestone && !trackedPercentages.current.has(milestone)) {
          trackedPercentages.current.add(milestone);
          trackScrollProgress(milestone);
          
          console.log(`[Scroll Tracking] ${milestone}% da página visualizada`);
        }
      }
    };

    // Throttle para evitar muitos eventos
    let throttled = false;
    const throttledScroll = () => {
      if (throttled) return;
      throttled = true;
      setTimeout(() => {
        handleScroll();
        throttled = false;
      }, 100);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [enabled, trackScrollProgress]);

  // Reset dos marcos quando a página muda
  const resetTrackedPercentages = () => {
    trackedPercentages.current.clear();
  };

  return {
    resetTrackedPercentages
  };
};

export default useScrollTracking;
