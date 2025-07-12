
import { useEffect, useRef } from 'react';
import { useQuizTracking } from './useQuizTracking';

export const useScrollTracking = (enabled: boolean = true) => {
  const { trackScrollProgress } = useQuizTracking();
  const trackedPercentages = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

      const milestones = [25, 50, 75, 90];
      
      for (const milestone of milestones) {
        if (scrollPercentage >= milestone && !trackedPercentages.current.has(milestone)) {
          trackedPercentages.current.add(milestone);
          trackScrollProgress(milestone);
          
          console.log(`[Scroll Tracking] ${milestone}% da página visualizada`);
        }
      }
    };

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

  const resetTrackedPercentages = () => {
    trackedPercentages.current.clear();
  };

  return {
    resetTrackedPercentages
  };
};

export default useScrollTracking;
